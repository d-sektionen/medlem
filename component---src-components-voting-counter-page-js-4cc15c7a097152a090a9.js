(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{INns:function(e,t,a){"use strict";var n=a("t8Zj"),l=a("q1tI"),c=a.n(l),r=a("ubHu"),i=a.n(r),o=a("Rq/j");const s=({title:e,choices:t,categorizedChoices:a,choice:l,setChoice:r,label:s,action:u,actionLabel:m,noChoicesLabel:d})=>{const E=[].concat(Object(n.a)(t||[]),Object(n.a)(Object.keys(a).reduce((e,t)=>[].concat(Object(n.a)(e),Object(n.a)(a[t])),[])));return c.a.createElement("div",{className:i.a.titleChooser},c.a.createElement("h1",null,e),c.a.createElement("div",{className:i.a.actions},E.length?c.a.createElement("div",{className:i.a.selectContainer},c.a.createElement("select",{onChange:e=>{const t=e.target.value,a=""===t?null:E.filter(e=>""+e.id===t)[0];r(a)},value:l?l.id:""},c.a.createElement("option",{hidden:!0,value:""}),t.sort().map(e=>c.a.createElement("option",{value:e.id,key:e.id},e[s])),Object.keys(a).sort().map(e=>c.a.createElement("optgroup",{label:e,key:e},a[e].sort().map(e=>c.a.createElement("option",{value:e.id,key:e.id},e[s]))))),null===l&&c.a.createElement("div",{className:i.a.hint},"Välj ett objekt")):c.a.createElement("span",null,d),u&&c.a.createElement(o.a,{onClick:u},m)))};s.defaultProps={categorizedChoices:{},choices:[],action:null,actionLabel:"",choice:null,noChoicesLabel:"",setChoice:()=>{},label:""},t.a=s},QaCa:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"b",(function(){return s}));var n=a("q1tI"),l=a.n(n),c=a("ubHu"),r=a.n(c);const i=({children:e})=>l.a.createElement("ul",{className:r.a.list},e),o=({title:e,subtitle:t,buttons:a,color:n})=>l.a.createElement("li",{className:n?r.a.listItemColor:"",style:{borderColor:n}},l.a.createElement("div",{className:r.a.listText},l.a.createElement("h3",null,e),l.a.createElement("p",null,t)),l.a.createElement("div",{className:r.a.listButtons},a));o.defaultProps={color:null};const s=({href:e,onClick:t,iconComponent:a,text:n,shown:c})=>c?l.a.createElement(l.a.Fragment,null,e?l.a.createElement("a",{className:r.a.listButton,href:e,onClick:t,title:n},l.a.createElement(a,null)):l.a.createElement("button",{className:r.a.listButton,type:"button",onClick:t,title:n},l.a.createElement(a,null))):l.a.createElement(l.a.Fragment,null);s.defaultProps={shown:!0}},ReHE:function(e,t,a){"use strict";var n=a("t8Zj"),l=a("q1tI"),c=a.n(l),r=a("Tgqd"),i=a("QaCa"),o=a("VtrM"),s=a("ZACD");t.a=({event:e})=>{const{0:t,1:a}=Object(l.useState)(""),{data:u,mutate:m}=Object(o.b)("/checkin/doorkeepers/?event_id="+e.id);return c.a.createElement("div",null,c.a.createElement("h2",null,"Dörrvakter"),c.a.createElement("form",{onSubmit:l=>{l.preventDefault(),a(""),(async e=>{const{data:t}=await Object(s.f)("/checkin/doorkeepers/",e);m([].concat(Object(n.a)(u),[t]))})({user_username:t,event_id:e.id})}},c.a.createElement("input",{value:t,onChange:e=>a(e.target.value)})),c.a.createElement(i.a,null,u&&u.map(e=>c.a.createElement(i.c,{title:e.user.pretty_name,key:e.id,buttons:[c.a.createElement(i.b,{onClick:()=>(async e=>{await Object(s.b)("/checkin/doorkeepers/"+e+"/"),m(u.filter(t=>t.id!==e))})(e.id),iconComponent:r.l,text:"Ta bort dörrvakt",key:"remove"})]}))))}},kRmr:function(e,t,a){"use strict";a.r(t);var n=a("t8Zj"),l=a("q1tI"),c=a.n(l),r=a("VtrM"),i=(a("Rq/j"),a("ZACD"));var o=({currentMeeting:e,updatePatch:t})=>c.a.createElement("div",null,c.a.createElement("h2",null,"Mötesinfo"),c.a.createElement("h3",null,e.name),e.description&&c.a.createElement("p",{style:{whiteSpace:"pre-line"}},e.description),c.a.createElement("h3",null,"Detaljer"),c.a.createElement("ul",null,c.a.createElement("li",null,e.enable_speaker_requests?"Talarlista aktiverad":"Talarlista inaktiverad"),c.a.createElement("li",null,e.open_attendance?"Öppen incheckning":"Stängd incheckning"),c.a.createElement("li",null,"Mötesdata rensas: "+e.clear_data))),s=(a("ReHE"),a("Tgqd")),u=a("zGz4");var m=({currentMeeting:e,voteId:t})=>{const{data:a}=Object(r.b)(()=>t&&"/voting/admin-votes/"+t+"/"),n=(a?a.alternatives.map(e=>e.num_votes):[]).reduce((e,t)=>e+t,0);return c.a.createElement("div",null,c.a.createElement("ul",null,a&&a.alternatives.map(e=>c.a.createElement("li",{key:e.text},e.text+": "+e.num_votes,n?" ("+(e.num_votes?Math.round(1e3*e.num_votes/n)/10:0)+"%)":""))),c.a.createElement("p",null,"Summa: ",n))},d=a("QaCa");var E=({currentMeeting:e})=>{const{data:t,mutate:a}=Object(r.b)("/voting/admin-votes/?event_id="+e.id),[n]=Object(u.a)(m),i=Object(u.b)();return Object(l.useEffect)(i,[t]),c.a.createElement("div",null,c.a.createElement("h2",null,"Omröstningar"),c.a.createElement(d.a,null,t&&t.filter(t=>t.meeting===e.id).map(e=>c.a.createElement(d.c,{title:e.question,subtitle:e.open?"Active":void 0,key:e.id,buttons:[c.a.createElement(d.b,{onClick:()=>n('Resultat av "'+e.question+'"',{voteId:e.id}),iconComponent:s.a,text:"Resultat",key:"results"})]}))))};var b=({currentMeeting:e})=>{const{0:t,1:a}=Object(l.useState)(""),{data:n,mutate:i}=Object(r.b)(()=>"/voting/attendants/?meeting_id="+e.id,{refreshInterval:4e3});return null===n?c.a.createElement(c.a.Fragment,null):c.a.createElement("div",null,c.a.createElement("h2",null,"Deltagare"),c.a.createElement("div",null,c.a.createElement("p",null,"Röstlängd: "+(n?(e=>e.filter(e=>e.has_voting_rights))(n).length:0))))},v=a("zw+i");a("8k0H");var h=a("INns"),p=a("r90U");t.default=({pageContext:{title:e}})=>{const{0:t,1:a}=Object(l.useState)(null),{data:s,mutate:m}=Object(r.b)("/voting/admin-meetings/"),d=(Object(u.b)(),s?Object(n.a)(s).reverse():null);return Object(l.useEffect)(()=>{t&&a(d.find(e=>e.id===t.id))},[d]),c.a.createElement(p.a,null,c.a.createElement(v.a,null,c.a.createElement(v.b,{fullWidth:!0},c.a.createElement(h.a,{title:e,choice:t,setChoice:a,choices:d,label:"name",noChoicesLabel:"Det finns inga möten just nu."})),t&&c.a.createElement(c.a.Fragment,null,c.a.createElement(v.b,null,c.a.createElement(o,{currentMeeting:t,updatePatch:async e=>{const{data:a}=await Object(i.e)("/voting/admin-meetings/"+t.id+"/",e);m([].concat(Object(n.a)(s.filter(e=>e.id!==t.id)),[a]))}})),c.a.createElement(v.b,null,c.a.createElement(E,{currentMeeting:t})),c.a.createElement(v.b,null,c.a.createElement(b,{currentMeeting:t})))))}}}]);
//# sourceMappingURL=component---src-components-voting-counter-page-js-4cc15c7a097152a090a9.js.map