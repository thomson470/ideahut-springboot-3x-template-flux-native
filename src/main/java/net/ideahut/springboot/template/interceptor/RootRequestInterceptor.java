package net.ideahut.springboot.template.interceptor;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.server.ServerWebExchange;

import net.ideahut.springboot.admin.AdminHandler;
import net.ideahut.springboot.api.ApiAccess;
import net.ideahut.springboot.api.ApiUser;
import net.ideahut.springboot.api.WebFluxApiService;
import net.ideahut.springboot.audit.AuditInfo;
import net.ideahut.springboot.context.RequestContext;
import net.ideahut.springboot.exception.ResultRuntimeException;
import net.ideahut.springboot.helper.FrameworkHelper;
import net.ideahut.springboot.helper.ObjectHelper;
import net.ideahut.springboot.helper.WebFluxHelper;
import net.ideahut.springboot.interceptor.WebFluxHandlerInterceptor;
import net.ideahut.springboot.mapper.DataMapper;
import net.ideahut.springboot.object.Result;
import net.ideahut.springboot.template.AppConstants;
import net.ideahut.springboot.template.Application;
import reactor.core.publisher.Mono;

@Component
public class RootRequestInterceptor implements WebFluxHandlerInterceptor, InitializingBean {

	private Set<String> allowPaths;
	private Set<String> skipPaths;
	
	private final DataMapper dataMapper;
	private final AdminHandler adminHandler;
	private final WebFluxApiService apiService;
	
	
	// set false, agar ApiService tidak melakukan pengecekan (development)
	// default ApiAccess Role = PUBLIC
	private static final boolean IS_API_SERVICE_CHECK = false;
	private static final boolean IS_ALLOW_ALL_REQUEST = true;
	
	@Autowired
	RootRequestInterceptor(
		DataMapper dataMapper,
		AdminHandler adminHandler,
		WebFluxApiService apiService
	) {
		this.dataMapper = dataMapper;
		this.adminHandler = adminHandler;
		this.apiService = apiService;
	}
	
	@Override
	public void afterPropertiesSet() throws Exception {
		allowPaths = new LinkedHashSet<>(Arrays.asList("/**"));
		skipPaths = new LinkedHashSet<>();
		skipPaths.add(adminHandler.getApiPath() + "/**");
		if (adminHandler.isWebEnabled()) {
			skipPaths.add(adminHandler.getWebPath() + "/**");
		}
	}
	
	@Override
	public Set<String> allowPaths() {
		return allowPaths;
	}

	@Override
	public Set<String> skipPaths() {
		return skipPaths;
	}

	@Override
	public Mono<Void> preHandle(ServerWebExchange exchange, Object handler) {
		if (!Application.isReady()) {
			exchange.getResponse().setStatusCode(HttpStatus.SERVICE_UNAVAILABLE);
			return null;
		}
		if (ObjectHelper.isInstance(HandlerMethod.class, handler)) {
			try {
				ApiAccess apiAccess = getApiAccess(exchange, (HandlerMethod) handler);
				String auditor = "";
				if (Boolean.TRUE.equals(apiAccess.getIsConsumer())) {
					auditor += "CONSUMER::" + apiAccess.getConsumerId();
				}
				auditor += "ROLE::" + apiAccess.getApiRole();
				ApiUser apiUser = apiAccess.getApiUser();
				if (apiUser != null) {
					auditor += "USER::" + apiUser.getId() + "::" + apiUser.getUsername();
				}
				AuditInfo.context().setAuditor(auditor);
				RequestContext.currentContext().setAttribute(ApiAccess.CONTEXT, apiAccess);
			} catch (Exception e) {
				Result result = FrameworkHelper.getErrorAsResult(e);
				return WebFluxHelper.sendToClient(dataMapper, exchange, result);
			}
		}
		return null;
	}
	
	private ApiAccess getApiAccess(ServerWebExchange exchange, HandlerMethod handlerMethod) {
		boolean isPublic = FrameworkHelper.isPublic(handlerMethod);
		ApiAccess apiAccess;
		if (IS_API_SERVICE_CHECK) {
			apiAccess = apiService.getApiAccess(exchange.getRequest(), isPublic);
			if (apiAccess == null) {
				apiAccess = new ApiAccess();
				apiAccess.setApiRole(AppConstants.Default.API_ROLE);
			}
			if (!IS_ALLOW_ALL_REQUEST) {
				if (!isPublic) {
					boolean allowed = apiService.isApiRequestAllowed(apiAccess, handlerMethod);
					if (!allowed) {
						throw ResultRuntimeException.of(Result.error("REQ-00", "Request is not allowed"));
					}
				} else { /**/ }
			}
		} else {
			apiAccess = new ApiAccess();
			apiAccess.setApiRole(AppConstants.Default.API_ROLE);
		}
		return apiAccess;
	}

}