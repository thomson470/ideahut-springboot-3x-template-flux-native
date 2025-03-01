const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/KeyValue-C3xHT236.js","assets/QTd-DXLfw5qC.js","assets/index-DcSSbfia.js","assets/index-G0ic_0eP.css","assets/format-7tzsHQMc.js","assets/QTooltip-BL5VitKI.js","assets/QTable-D1wjFgjy.js","assets/ClosePopup-B0l3xx1n.js"])))=>i.map(i=>d[i]);
import{_ as T,ag as P,Y as N,Z as n,r as y,a0 as p,$ as q,ac as U,f as t,a5 as r,ah as R,F as B,a3 as D,a4 as h,a6 as u,a2 as x,aa as F,a7 as f,a8 as b,ae as k,G as j,C as w,ab as v,ai as A,aj as Q,ak as g,Q as O,al as I,am as E}from"./index-DcSSbfia.js";import{Q as K,b as C,a as L,e as G}from"./format-7tzsHQMc.js";import{Q as S}from"./QTooltip-BL5VitKI.js";import{Q as Y,a as Z}from"./QTable-D1wjFgjy.js";import{Q as _}from"./QForm-DR8hte4h.js";import{T as z}from"./TouchPan-BXNfZX2j.js";import{C as H}from"./ClosePopup-B0l3xx1n.js";let l;const J={components:{KeyValue:P(()=>E(()=>import("./KeyValue-C3xHT236.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])))},setup(){return{APP:N,util:n,handler:y(null),table:y({rows:[],filters:{},columns:[],loading:!1,pagination:{page:1,rowsPerPage:30,sortBy:"topic",descending:!1,count:!0}}),dialog:y({view:p.dialog.init(()=>l.dialog.view),properties:p.dialog.init(()=>l.dialog.properties),search:p.dialog.init(()=>l.dialog.search)}),option:y({boolean:["","true","false"]})}},created(){l=this,l.handler=l.$route.query.handler,l.table.columns=[{name:"topic",label:l.$t("label.topic"),field:"topic",align:"left",sortable:!0},{name:"isReply",label:l.$t("label.reply"),field:"isReply",align:"left",sortable:!0},{name:"keyType",label:l.$t("label.key_type"),field:"keyType",align:"left",sortable:!0},{name:"keySerializer",label:l.$t("label.key_serializer"),field:"keySerializer",align:"left",sortable:!0},{name:"valueType",label:l.$t("label.value_type"),field:"valueType",align:"left",sortable:!0},{name:"valueSerializer",label:l.$t("label.value_serializer"),field:"valueSerializer",align:"left",sortable:!0}],l.on_refresh_click()},methods:{do_request(e){let{page:i,rowsPerPage:d,sortBy:a,descending:m}=l.get_pagination(e),s={name:l.handler,index:i,size:d,order:(m?"-":"")+a};Object.keys(l.table.filters).forEach(c=>{s[c]=l.table.filters[c]}),l.table.loading=!0,q.call({path:"/kafka/senders",params:s,onFinish(){l.table.loading=!1},onSuccess(c){if(n.isObject(c)){l.table.rows=n.isArray(c.data)?c.data:[];let o=l.table.pagination;if(o.page=c.index,o.rowsPerPage=c.size,n.isNumber(c.records))o.rowsNumber=c.records;else{let V=c.index*c.size;l.table.rows.length!==c.size?o.rowsNumber=V:o.rowsNumber=V+1}}}})},get_pagination(e){let i=e?.pagination?e.pagination:l.table.pagination;return i?(l.table.pagination=i,i):l.table.pagination},on_refresh_click(){l.table.rows?.length||l.table.pagination.page>1&&(l.table.pagination.page=1),l.do_request({pagination:l.table.pagination})},on_view_click(e){let i=[];for(const a of e.cols)i.push({label:a.label,value:n.isFunction(a.format)?a.format(e.row[a.field],e.row):e.row[a.field]});let d=[];e.row.isReply===!0&&d.push({icon:e.row.isRunning?"stop":"play_arrow",label:l.$t(e.row.isRunning?"label.stop":"label.start"),color:e.row.isRunning?"pink-10":"purple-10",click:()=>l.on_start_stop_click(e)}),d.push({icon:"lightbulb",color:"teal-10",label:l.$t("label.properties"),click:()=>l.on_properties_click(e)}),p.dialog.show(l.dialog.view,{search:!1,rows:i,color:{close:"red"},actions:d})},on_properties_click(e){p.dialog.show(l.dialog.properties,{title:l.$t("label.properties"),name:l.handler,topic:e.row.topic,rows:[],onRefresh:l.get_properties})},get_properties(e){let i=n.isObject(e)?e:{};n.apply(i.onStart),q.call({path:"/kafka/sender/properties",params:{name:i.parameters.name,topic:i.parameters.topic},onFinish(){n.apply(i.onFinish)},onSuccess(d){if(n.isObject(d)){let a=[];Object.keys(d).forEach(m=>{a.push({label:m,value:d[m]})}),n.sort.array(a,"label"),n.apply(i.onData,a)}},notify:!0})},on_start_stop_click(e){let i=e.row,d=l.dialog.view.parameters.actions[0];p.confirm(function(){d.loading=!0,q.call({path:"/kafka/sender/"+(i.isRunning?"stop":"start"),method:"post",params:{name:l.handler,topic:i.topic},onFinish(){d.loading=!1},onSuccess(){i.isRunning=!i.isRunning,d.icon=i.isRunning?"stop":"play_arrow",d.label=l.$t(i.isRunning?"label.stop":"label.start"),d.color=i.isRunning?"pink-10":"purple-10"}})},"confirm."+(i.isRunning?"stop":"start"))},on_search_reset_click(){l.table.filters={}},on_search_filter_click(){let e=l.table.filters;n.isString(e.topicName)&&e.topicName!==""||delete e.topicName,n.isString(e.isReply)&&e.isReply!==""||delete e.isReply,n.isString(e.keyType)&&e.keyType!==""||delete e.keyType,n.isString(e.keySerializer)&&e.keySerializer!==""||delete e.keySerializer,n.isString(e.valueType)&&e.valueType!==""||delete e.valueType,n.isString(e.valueSerializer)&&e.valueSerializer!==""||delete e.valueSerializer,l.do_request({pagination:l.table.pagination}),p.dialog.hide(l.dialog.search)},on_search_dialog_click(){p.dialog.show(l.dialog.search)}}},M={class:"full-width row flex-center text-accent q-gutter-sm"},W={class:"text-subtitle2"},X={class:"col-6 q-pr-xs text-left"},$={class:"col-6 q-pl-xs text-right"};function ee(e,i,d,a,m,s){const c=D("KeyValue");return h(),U(B,null,[t(Y,{class:"table-sticky-header q-ma-sm",rows:a.table.rows,columns:a.table.columns,loading:a.table.loading,selection:"single",dense:e.$q.screen.lt.md,"no-data-label":e.$t("error.data_not_available"),"rows-per-page-label":" ","rows-per-page-options":[10,20,30,40,50],"binary-state-sort":"",separator:"cell",pagination:a.table.pagination,"onUpdate:pagination":i[0]||(i[0]=o=>a.table.pagination=o),onRequest:s.do_request,bordered:""},{"top-right":r(()=>[t(u,{glossy:"",round:"",dense:"",class:"q-ma-none q-ml-md",color:"deep-orange",icon:"search",onClick:s.on_search_dialog_click},{default:r(()=>[Object.keys(a.table.filters).length?(h(),x(G,{key:0,class:"led-green",floating:""})):F("",!0),t(S,null,{default:r(()=>[f(b(e.$t("label.search")),1)]),_:1})]),_:1},8,["onClick"]),t(u,{glossy:"",round:"",dense:"",class:"q-ma-none q-ml-md",color:"indigo",icon:"refresh",loading:a.table.loading,onClick:s.on_refresh_click},{default:r(()=>[t(S,null,{default:r(()=>[f(b(e.$t("label.refresh")),1)]),_:1})]),_:1},8,["loading","onClick"])]),"no-data":r(({message:o})=>[k("div",M,[t(j,{size:"2em",name:"block"}),k("span",W,b(o),1)])]),"body-selection":r(o=>[t(u,{glossy:"",round:"",dense:"",size:"sm",class:"q-ma-none q-ml-xs q-mr-sm",color:"deep-purple",icon:"visibility",onClick:V=>s.on_view_click(o)},{default:r(()=>[t(S,null,{default:r(()=>[f(b(e.$t("label.view")),1)]),_:1})]),_:2},1032,["onClick"])]),_:1},8,["rows","columns","loading","dense","no-data-label","pagination","onRequest"]),t(R,{modelValue:a.dialog.view.show,"onUpdate:modelValue":i[1]||(i[1]=o=>a.dialog.view.show=o),"transition-show":"scale","transition-hide":"fade","backdrop-filter":"blur(1px)"},{default:r(()=>[w(t(c,{parameters:a.dialog.view.parameters,style:v(a.dialog.view.style)},null,8,["parameters","style"]),[[z,a.dialog.view.onDrag,void 0,{mouse:!0}]])]),_:1},8,["modelValue"]),t(R,{modelValue:a.dialog.properties.show,"onUpdate:modelValue":i[2]||(i[2]=o=>a.dialog.properties.show=o),"transition-show":"scale","transition-hide":"fade","backdrop-filter":"blur(1px)"},{default:r(()=>[w(t(c,{parameters:a.dialog.properties.parameters,style:v(a.dialog.properties.style)},null,8,["parameters","style"]),[[z,a.dialog.properties.onDrag,void 0,{mouse:!0}]])]),_:1},8,["modelValue"]),t(R,{modelValue:a.dialog.search.show,"onUpdate:modelValue":i[9]||(i[9]=o=>a.dialog.search.show=o),"transition-show":"scale","transition-hide":"fade","backdrop-filter":"blur(1px)",persistent:""},{default:r(()=>[t(A,{style:v("width: "+(e.$q.screen.lt.md?"100%;":"50%;")+a.dialog.search.style)},{default:r(()=>[w((h(),x(Q,{class:"q-pa-none header-main",style:v(a.APP?.color?.header?"background: "+a.APP.color.header+" !important;":"")},{default:r(()=>[t(K,{class:"q-pr-none"},{default:r(()=>[t(C,null,{default:r(()=>[t(L,{class:"text-h6 text-white"},{default:r(()=>[f(b(e.$t("label.search")),1)]),_:1})]),_:1}),t(C,{side:""},{default:r(()=>[w((h(),x(u,{class:"text-caption text-white q-pl-xs q-pr-xs q-mr-xs",flat:"",round:"",glossy:"",icon:"close"},{default:r(()=>[t(S,null,{default:r(()=>[f(b(e.$t("label.close")),1)]),_:1})]),_:1})),[[H]])]),_:1})]),_:1})]),_:1},8,["style"])),[[z,a.dialog.search.onDrag,void 0,{mouse:!0}]]),t(Q,{style:{"max-height":"70vh"},class:"q-pa-xs q-mt-xs scroll"},{default:r(()=>[t(_,{onSubmit:s.on_search_filter_click,onReset:s.on_search_reset_click},{default:r(()=>[t(g,{modelValue:a.table.filters.topicName,"onUpdate:modelValue":i[3]||(i[3]=o=>a.table.filters.topicName=o),type:"text",label:e.$t("label.topic"),filled:"",class:"q-mb-xs"},null,8,["modelValue","label"])]),_:1},8,["onSubmit","onReset"]),t(_,{onSubmit:s.on_search_filter_click,onReset:s.on_search_reset_click},{default:r(()=>[t(g,{modelValue:a.table.filters.keyType,"onUpdate:modelValue":i[4]||(i[4]=o=>a.table.filters.keyType=o),type:"text",label:e.$t("label.key_type"),filled:"",class:"q-mb-xs"},null,8,["modelValue","label"])]),_:1},8,["onSubmit","onReset"]),t(_,{onSubmit:s.on_search_filter_click,onReset:s.on_search_reset_click},{default:r(()=>[t(g,{modelValue:a.table.filters.keySerializer,"onUpdate:modelValue":i[5]||(i[5]=o=>a.table.filters.keySerializer=o),type:"text",label:e.$t("label.key_serializer"),filled:"",class:"q-mb-xs"},null,8,["modelValue","label"])]),_:1},8,["onSubmit","onReset"]),t(_,{onSubmit:s.on_search_filter_click,onReset:s.on_search_reset_click},{default:r(()=>[t(g,{modelValue:a.table.filters.valueType,"onUpdate:modelValue":i[6]||(i[6]=o=>a.table.filters.valueType=o),type:"text",label:e.$t("label.value_type"),filled:"",class:"q-mb-xs"},null,8,["modelValue","label"])]),_:1},8,["onSubmit","onReset"]),t(_,{onSubmit:s.on_search_filter_click,onReset:s.on_search_reset_click},{default:r(()=>[t(g,{modelValue:a.table.filters.valueSerializer,"onUpdate:modelValue":i[7]||(i[7]=o=>a.table.filters.valueSerializer=o),type:"text",label:e.$t("label.value_serializer"),filled:"",class:"q-mb-xs"},null,8,["modelValue","label"])]),_:1},8,["onSubmit","onReset"]),t(Z,{modelValue:a.table.filters.isReply,"onUpdate:modelValue":i[8]||(i[8]=o=>a.table.filters.isReply=o),label:e.$t("label.reply"),options:a.option.boolean,filled:"",class:"q-mb-xs"},null,8,["modelValue","label","options"])]),_:1}),t(O),t(I,{class:"row"},{default:r(()=>[k("div",X,[t(u,{label:e.$t("label.reset"),color:"orange","no-caps":"",glossy:"",onClick:s.on_search_reset_click},null,8,["label","onClick"])]),k("div",$,[t(u,{label:e.$t("label.filter"),color:"purple","no-caps":"",glossy:"",onClick:s.on_search_filter_click},null,8,["label","onClick"])])]),_:1})]),_:1},8,["style"])]),_:1},8,["modelValue"])],64)}const ne=T(J,[["render",ee]]);export{ne as default};
