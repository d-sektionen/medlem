(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{235:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),u=(n(24),n(222),n(43)),c=n(247),l=function(e){var t=e.setCurrentMeeting,n=e.currentMeeting,u=Object(a.useState)(""),l=u[0],i=u[1],o=Object(c.a)({endpoint:"/voting/meetings/"}),s=o[0],m=s.list,f=s.create,d=o[1],v=d?[].concat(d).reverse():null;return Object(a.useEffect)(function(){m()},[]),Object(a.useEffect)(function(){v&&v.length?null===n&&t(Object.assign({},v[0])):t(null)},[v]),null===v?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",null,r.a.createElement("h2",null,"Möten"),v&&v.length&&r.a.createElement("select",{value:n?n.id:void 0,onChange:function(e){return t(v.find(function(t){return""+t.id===e.target.value}))}},v.map(function(e){return r.a.createElement("option",{value:e.id,key:e.id},e.name)})),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),i(""),f({name:l}).then(function(e){t(e.data)})}},r.a.createElement("input",{value:l,onChange:function(e){i(e.target.value)}})))},i=n(272),o=n(10),s=n(31),m=0,f=function(e){return void 0===e&&(e={}),m+=1,Object.assign({text:""},e,{key:m})},d=function(e){var t=e.currentMeeting,n=e.create,u=e.updateData,c=e.update,l=Object(a.useState)(u?u.question:""),i=l[0],o=l[1],s=Object(a.useState)(u?u.alternatives.map(function(e){return f(e)}):[f(),f()]),m=s[0],d=s[1],v=Object(a.useState)(!u||u.open),b=v[0],E=v[1];return r.a.createElement("div",null,r.a.createElement("label",null,"Fråga",r.a.createElement("input",{value:i,onChange:function(e){o(e.target.value)}})),r.a.createElement("hr",null),r.a.createElement("ul",null,m.map(function(e,t){return r.a.createElement("li",{key:e.key},r.a.createElement("input",{value:e.text,onChange:function(e){var n=e.target.value;d(function(e){return[].concat(e.slice(0,t),[Object.assign({},e[t],{text:n})],e.slice(t+1))})}}),r.a.createElement("button",{type:"button",onClick:function(){d(function(e){return[].concat(e.slice(0,t),e.slice(t+1))})}},"X"))})),r.a.createElement("button",{type:"button",onClick:function(){d(function(e){return[].concat(e,[f()])})}},"Lägg till alternativ"),r.a.createElement("hr",null),r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",checked:b,onChange:function(){return E(function(e){return!e})}}),"Nuvarande frågan"),r.a.createElement("hr",null),r.a.createElement("button",{type:"button",onClick:function(){u?c(u.id,{question:i,open:b,alternatives:m,meeting:t.id}):n({question:i,open:b,alternatives:m,meeting:t.id})}},u?"Uppdatera omröstning":"Skapa ny omröstning"))},v=n(319);n(231);var b=({currentMeeting:e,voteId:t})=>{const n=Object(a.useRef)(null),[c]=Object(u.g)({endpoint:`/voting/votes/${t}/`});return Object(a.useEffect)(()=>{if(!n.current)return;const e={labels:c?c.alternatives.map(e=>e.text):[],datasets:[{name:"Some Data",type:"bar",values:c?c.alternatives.map(e=>e.num_votes):[]}]};new v.a(n.current,{title:c?c.question:[],data:e,type:"pie",height:400,colors:["#20407C","#E5398D","#754022","#70BD44","#F7E623"]})}),r.a.createElement("div",null,r.a.createElement("div",{ref:n}),r.a.createElement("p",null,"Summa: ",(c?c.alternatives.map(e=>e.num_votes):[]).reduce((e,t)=>e+t,0)))},E=function(e){var t=e.currentMeeting,n=Object(c.a)({endpoint:"/voting/votes/"}),u=n[0],l=u.list,i=u.update,m=u.create,f=n[1],v=Object(s.a)(d)[0],E=Object(s.a)(b)[0],p=Object(s.b)();return Object(a.useEffect)(p,[f]),Object(a.useEffect)(function(){t&&l({event_id:t.id})},[t]),null===f?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",null,r.a.createElement("h2",null,"Omröstningar"),r.a.createElement("button",{onClick:function(){return v("Ny omröstning",{currentMeeting:t,create:m})},type:"button"},"Ny omröstning"),r.a.createElement("ul",null,f.filter(function(e){return e.meeting===t.id}).map(function(e){return r.a.createElement("li",{key:e.id},e.question,r.a.createElement(o.a,{onClick:function(){return E('Resultat av "'+e.question+'"',{voteId:e.id})}}),r.a.createElement(o.d,{onClick:function(){return v('Uppdatera "'+e.question+'"',{currentMeeting:t,update:i,updateData:e})}}),e.open&&r.a.createElement(o.b,null))})))},p=n(258),g=function(e){var t=e.currentMeeting,n=Object(a.useState)(""),u=n[0],l=n[1],i=Object(c.a)({endpoint:"/voting/attendants/"}),s=i[0],m=s.list,f=s.destroy,d=s.create,v=i[1];return Object(a.useEffect)(function(){t&&m({meeting_id:t.id})},[t]),null===v?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",null,r.a.createElement("h2",null,"Deltagare"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),l(""),d({user_username:u,meeting_id:t.id})}},r.a.createElement("input",{value:u,onChange:function(e){return l(e.target.value)}})),r.a.createElement("p",null,"Röstlängd: ",v.length),r.a.createElement(p.a,null,v.map(function(e){return r.a.createElement(p.c,{title:e.user.pretty_name,key:e.id,buttons:[r.a.createElement(p.b,{onClick:function(){return f(e.id,{meeting_id:t.id})},iconComponent:o.k,text:"Ta bort deltagare",key:"remove"})]})})))},j=n(32),O=function(){var e=Object(a.useState)(null),t=e[0],n=e[1];return r.a.createElement(j.a,null,r.a.createElement(j.b,null,r.a.createElement(l,{currentMeeting:t,setCurrentMeeting:n})),r.a.createElement(j.b,null,r.a.createElement(E,{currentMeeting:t})),r.a.createElement(j.b,null,r.a.createElement(g,{currentMeeting:t})),r.a.createElement(j.b,null,r.a.createElement(i.a,{event:t})))};t.default=function(){return r.a.createElement(O,null)}},247:function(e,t,n){"use strict";n(55),n(72),n(24);var a=n(1),r=n(18),u=n(43),c=function(){var e;return(e=Object.prototype.hasOwnProperty).call.apply(e,arguments)},l=function(e,t){var n=Object.assign({},e);return["endpoint","url"].forEach(function(e){c(n,e)&&(n=Object.assign({},n,{[e]:""+n[e]+t+"/"}))}),n};t.a=function(e){var t=Object(a.useContext)(r.a)[1],n=Object(a.useState)(null),i=n[0],o=n[1],s=Object(a.useState)(null),m=s[0],f=s[1];return[{list:function(n){return void 0===n&&(n={}),t(!0),Object(u.a)(Object.assign({},e,{params:Object.assign({},c(e,"params")?e.params:{},n),method:"get"})).then(function(e){return f(null),o(e.data),t(!1),Promise.resolve(e)}).catch(function(e){return f(e),t(!1),Promise.reject(e)})},retrieve:function(n,a){return void 0===a&&(a={}),t(!0),Object(u.a)(Object.assign({},l(e,n),{params:Object.assign({},c(e,"params")?e.params:{},a),method:"get"})).then(function(e){return f(null),o(function(t){return[].concat(t.filter(function(e){return e.id!==n}),[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return f(e),t(!1),Promise.reject(e)})},update:function(n,a){return void 0===a&&(a={}),t(!0),Object(u.a)(Object.assign({},l(e,n),{data:a,method:"put"})).then(function(e){return f(null),o(function(t){return[].concat(t.filter(function(e){return e.id!==n}),[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return f(e),t(!1),Promise.reject(e)})},create:function(n){return void 0===n&&(n={}),t(!0),Object(u.a)(Object.assign({},e,{data:n,method:"post"})).then(function(e){return f(null),o(function(t){return[].concat(t,[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return f(e),t(!1),Promise.reject(e)})},destroy:function(n,a){return void 0===a&&(a={}),t(!0),Object(u.a)(Object.assign({},l(e,n),{data:a,method:"delete"})).then(function(e){return f(null),o(function(e){return e.filter(function(e){return e.id!==n})}),t(!1),Promise.resolve(e)}).catch(function(e){return f(e),t(!1),Promise.reject(e)})}},i,m]}},258:function(e,t,n){"use strict";n.d(t,"a",function(){return l}),n.d(t,"c",function(){return i}),n.d(t,"b",function(){return o});var a=n(1),r=n.n(a),u=n(23),c=n.n(u),l=function(e){var t=e.children;return r.a.createElement("ul",{className:c.a.list},t)},i=function(e){var t=e.title,n=e.subtitle,a=e.buttons;return r.a.createElement("li",null,r.a.createElement("div",{className:c.a.listText},r.a.createElement("h3",null,t),r.a.createElement("p",null,n)),r.a.createElement("div",{className:c.a.listButtons},a))},o=function(e){var t=e.onClick,n=e.iconComponent,a=e.text;return e.shown?r.a.createElement("button",{type:"button",onClick:t,title:a},r.a.createElement(n,null)):r.a.createElement(r.a.Fragment,null)};o.defaultProps={shown:!0}},272:function(e,t,n){"use strict";var a=n(1),r=n.n(a),u=n(10),c=n(247),l=n(258);t.a=function(e){var t=e.event,n=Object(a.useState)(""),i=n[0],o=n[1],s=Object(c.a)({endpoint:"/checkin/doorkeepers/"}),m=s[0],f=m.list,d=m.destroy,v=m.create,b=s[1];return Object(a.useEffect)(function(){t&&f({event_id:t.id})},[t]),null===b?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",null,r.a.createElement("h2",null,"Dörrvakter"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),o(""),v({user_username:i,event_id:t.id})}},r.a.createElement("input",{value:i,onChange:function(e){return o(e.target.value)}})),r.a.createElement(l.a,null,b.map(function(e){return r.a.createElement(l.c,{title:e.user.pretty_name,key:e.id,buttons:[r.a.createElement(l.b,{onClick:function(){return d(e.id)},iconComponent:u.k,text:"Ta bort dörrvakt",key:"remove"})]})})))}}}]);
//# sourceMappingURL=component---src-components-voting-admin-page-js-17c4e1e5f7d50b4107b7.js.map