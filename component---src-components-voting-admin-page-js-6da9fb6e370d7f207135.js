(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"+1s0":function(e,t,a){"use strict";a.r(t);var n=a("t8Zj"),l=a("q1tI"),c=a.n(l),r=a("VtrM"),i=a("Rq/j"),o=a("ZACD");var u=({currentMeeting:e,updatePatch:t})=>c.a.createElement("div",null,c.a.createElement("h2",null,"Mötesinfo"),c.a.createElement("h3",null,e.name),e.description&&c.a.createElement("p",{style:{whiteSpace:"pre-line"}},e.description),c.a.createElement("h3",null,"Detaljer"),c.a.createElement("ul",null,c.a.createElement("li",null,e.enable_speaker_requests?"Talarlista aktiverad":"Talarlista inaktiverad"),c.a.createElement("li",null,e.open_attendance?"Öppen incheckning":"Stängd incheckning"),c.a.createElement("li",null,"Mötesdata rensas: "+e.clear_data)),c.a.createElement(i.b,null,c.a.createElement(i.a,{onClick:()=>t({enable_speaker_requests:!e.enable_speaker_requests})},e.enable_speaker_requests?"Inaktivera talarlista":"Aktivera talarlista"),c.a.createElement(i.a,{onClick:()=>t({open_attendance:!e.open_attendance})},e.open_attendance?"Stäng självincheckning":"Öppna självincheckning"))),m=a("ReHE"),s=a("Tgqd"),d=a("zGz4"),b=a("G7rm");let p=0;const E=(e={})=>(p+=1,{text:"",...e,key:p});var v=({currentMeeting:e,create:t,updateData:a,update:r})=>{const{0:i,1:o}=Object(l.useState)(a?a.question:""),{0:u,1:m}=Object(l.useState)(a?a.alternatives.map(e=>E(e)):[E(),E()]),{0:s,1:d}=Object(l.useState)(!a||a.open);return c.a.createElement("div",null,c.a.createElement("label",null,"Fråga",c.a.createElement("input",{value:i,onChange:e=>{o(e.target.value)}})),c.a.createElement("hr",null),c.a.createElement("ul",null,u.map((e,t)=>c.a.createElement("li",{key:e.key},c.a.createElement("input",{value:e.text,onChange:e=>{const a=e.target.value;m(e=>[].concat(Object(n.a)(e.slice(0,t)),[{...e[t],text:a}],Object(n.a)(e.slice(t+1))))}}),c.a.createElement("button",{type:"button",onClick:()=>{m(e=>[].concat(Object(n.a)(e.slice(0,t)),Object(n.a)(e.slice(t+1))))}},"X")))),c.a.createElement("button",{type:"button",onClick:()=>{m(e=>[].concat(Object(n.a)(e),[E()]))}},"Lägg till alternativ"),c.a.createElement("hr",null),c.a.createElement("label",null,c.a.createElement("input",{type:"checkbox",checked:s,onChange:()=>d(e=>!e)}),"Nuvarande frågan"),c.a.createElement("hr",null),c.a.createElement("button",{type:"button",onClick:()=>{a?r(a.id,{question:i,open:s,alternatives:u,meeting:e.id}):t({question:i,open:s,alternatives:u,meeting:e.id})}},a?"Uppdatera omröstning":"Skapa ny omröstning"))};var g=({currentMeeting:e,voteId:t})=>{const{data:a}=Object(r.b)(()=>t&&"/voting/admin-votes/"+t+"/"),n=(a?a.alternatives.map(e=>e.num_votes):[]).reduce((e,t)=>e+t,0);return c.a.createElement("div",null,c.a.createElement("ul",null,a&&a.alternatives.map(e=>c.a.createElement("li",{key:e.text},e.text+": "+e.num_votes,n?" ("+(e.num_votes?Math.round(1e3*e.num_votes/n)/10:0)+"%)":""))),c.a.createElement("p",null,"Summa: ",n))},k=a("QaCa");var j=({currentMeeting:e})=>{const{data:t,mutate:a}=Object(r.b)("/voting/admin-votes/?event_id="+e.id),u=async e=>{const{data:l}=await Object(o.f)("/voting/admin-votes/",e);return a([].concat(Object(n.a)(t),[l])),l},m=async(e,l)=>{const{data:c}=await Object(o.g)("/voting/admin-votes/"+e+"/",l);return a([].concat(Object(n.a)(t.filter(t=>t.id!==e)),[c])),c},[p]=Object(d.a)(v),[E]=Object(d.a)(g),j=Object(d.b)(),[h]=Object(b.a)();return Object(l.useEffect)(j,[t]),c.a.createElement("div",null,c.a.createElement("h2",null,"Omröstningar"),c.a.createElement(i.a,{onClick:()=>p("Ny omröstning",{currentMeeting:e,create:u})},"Ny omröstning"),c.a.createElement(k.a,null,t&&t.filter(t=>t.meeting===e.id).map(t=>c.a.createElement(k.c,{title:t.question,subtitle:t.open?"Active":void 0,key:t.id,buttons:[c.a.createElement(k.b,{onClick:()=>h("Vill du se resultatet?",(function(){(async e=>{await j(),E('Resultat av "'+e.question+'"',{voteId:e.id})})(t)}),j),iconComponent:s.a,text:"Resultat",key:"results"}),c.a.createElement(k.b,{onClick:()=>p('Uppdatera "'+t.question+'"',{currentMeeting:e,update:m,updateData:t}),iconComponent:s.d,text:"Uppdatera omröstning",key:"update"})]}))))};var h=({currentMeeting:e})=>{const{0:t,1:a}=Object(l.useState)(""),{data:u,mutate:m}=Object(r.b)(()=>"/voting/attendants/?meeting_id="+e.id,{refreshInterval:4e3});return null===u?c.a.createElement(c.a.Fragment,null):c.a.createElement("div",null,c.a.createElement("h2",null,"Deltagare"),c.a.createElement("form",{onSubmit:async l=>{l.preventDefault(),a("");const{data:c}=await Object(o.f)("/voting/attendants/",{user_username:t,meeting_id:e.id});m([].concat(Object(n.a)(u),[c]))}},c.a.createElement("input",{value:t,onChange:e=>a(e.target.value)})),c.a.createElement("div",null,c.a.createElement(i.b,null,c.a.createElement("p",null,"Röstlängd: "+(u?u.length:0)),c.a.createElement(i.a,{onClick:async()=>{await Object(o.b)("/voting/attendants/clear/?meeting_id="+e.id),m([])}},"Återställ deltagarlista"))),c.a.createElement(k.a,null,u&&u.map(t=>c.a.createElement(k.c,{title:t.user.pretty_name,key:t.id,buttons:[c.a.createElement(k.b,{onClick:async()=>{await Object(o.b)("/voting/attendants/"+t.id,{meeting_id:e.id}),m(u.filter(e=>e.id!==t.id))},iconComponent:s.l,text:"Ta bort deltagare",key:"remove"})]}))))},O=a("zw+i");a("8k0H");var y=({meeting:e})=>{const{data:t,mutate:a}=Object(r.b)(()=>e&&"/voting/speakers/?meeting_id="+e.id,{refreshInterval:4e3});return c.a.createElement("div",null,c.a.createElement("h2",null,"Talarlista"),c.a.createElement(k.a,null,t&&t.map(e=>c.a.createElement(k.c,{title:e.user.pretty_name,subtitle:e.prioritized?"Replik":null,key:e.id,buttons:[c.a.createElement(k.b,{onClick:async()=>{await Object(o.b)("/voting/speakers/"+e.id),a(t.filter(t=>t.id!==e.id))},iconComponent:s.l,text:"Ta bort från talarlista",key:"remove"})]}))))},f=a("INns"),C=a("noUn");var _=({create:e})=>c.a.createElement(C.a,{endpoint:"/voting/admin-meetings/",customFetcher:e}),q=a("r90U");t.default=({pageContext:{title:e}})=>{const{0:t,1:a}=Object(l.useState)(null),{data:i,mutate:s}=Object(r.b)("/voting/admin-meetings/"),[b]=Object(d.a)(_),p=Object(d.b)(),E=i?Object(n.a)(i).reverse():null;return Object(l.useEffect)(()=>{t&&a(E.find(e=>e.id===t.id))},[E]),c.a.createElement(q.a,null,c.a.createElement(O.a,null,c.a.createElement(O.b,{fullWidth:!0},c.a.createElement(f.a,{title:e,choice:t,setChoice:a,choices:E,label:"name",action:()=>{b("Nytt möte",{create:async e=>{await(async e=>{const{data:t}=await Object(o.f)("/voting/admin-meetings/",e);s([].concat(Object(n.a)(i),[t]))})(e),p()}})},actionLabel:"Nytt möte",noChoicesLabel:"Det finns inga möten just nu."})),t&&c.a.createElement(c.a.Fragment,null,c.a.createElement(O.b,null,c.a.createElement(u,{currentMeeting:t,updatePatch:async e=>{const{data:a}=await Object(o.e)("/voting/admin-meetings/"+t.id+"/",e);s([].concat(Object(n.a)(i.filter(e=>e.id!==t.id)),[a]))}})),c.a.createElement(O.b,null,c.a.createElement(j,{currentMeeting:t})),c.a.createElement(O.b,null,c.a.createElement(m.a,{event:t})),c.a.createElement(O.b,null,c.a.createElement(h,{currentMeeting:t})),c.a.createElement(O.b,null,c.a.createElement(y,{meeting:t})))))}},G7rm:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var n=a("q1tI"),l=a.n(n),c=a("zGz4"),r=a("Rq/j"),i=a("Y7rJ"),o=a.n(i);const u=({text:e,onAccept:t,onDecline:a})=>{const n=Object(c.b)();return l.a.createElement("div",{className:o.a.confirmation},l.a.createElement("p",null,e),l.a.createElement(r.a,{onClick:()=>{a(),n()}},"Nej"),l.a.createElement(r.a,{onClick:()=>{t(),n()}},"Ja"))};function m(){const[e,t]=Object(c.a)(u);return[(t,a,n)=>{e("",{text:t,onAccept:a,onDecline:n})},t]}u.defaultProps={text:"Är du säker?",onAccept:()=>{},onDecline:()=>{}}},ReHE:function(e,t,a){"use strict";var n=a("t8Zj"),l=a("q1tI"),c=a.n(l),r=a("Tgqd"),i=a("QaCa"),o=a("VtrM"),u=a("ZACD");t.a=({event:e})=>{const{0:t,1:a}=Object(l.useState)(""),{data:m,mutate:s}=Object(o.b)("/checkin/doorkeepers/?event_id="+e.id);return c.a.createElement("div",null,c.a.createElement("h2",null,"Dörrvakter"),c.a.createElement("form",{onSubmit:l=>{l.preventDefault(),a(""),(async e=>{const{data:t}=await Object(u.f)("/checkin/doorkeepers/",e);s([].concat(Object(n.a)(m),[t]))})({user_username:t,event_id:e.id})}},c.a.createElement("input",{value:t,onChange:e=>a(e.target.value)})),c.a.createElement(i.a,null,m&&m.map(e=>c.a.createElement(i.c,{title:e.user.pretty_name,key:e.id,buttons:[c.a.createElement(i.b,{onClick:()=>(async e=>{await Object(u.b)("/checkin/doorkeepers/"+e+"/"),s(m.filter(t=>t.id!==e))})(e.id),iconComponent:r.l,text:"Ta bort dörrvakt",key:"remove"})]}))))}},kRcL:function(e,t,a){e.exports={label:"form-module--label--1j4rO",inputWrapper:"form-module--inputWrapper--tEZjQ",required:"form-module--required--1ei65"}},noUn:function(e,t,a){"use strict";var n=a("q1tI"),l=a.n(n),c=a("ZACD"),r=a("X0yR"),i=a("kRcL"),o=a.n(i);var u=({value:e,onChange:t,type:a,label:n,required:c,min_value:i,max_value:u,min_length:m,max_length:s})=>{const d=e=>{t(e.target.value)},b={datetime:l.a.createElement(r.a,{value:e,onChange:t}),date:l.a.createElement("input",{type:"date",value:e,onChange:d}),boolean:l.a.createElement("input",{type:"checkbox",checked:e,onChange:e=>{t(e.target.checked)}}),integer:l.a.createElement("input",{type:"number",value:e,onChange:d,max:u,min:i})},p=Object.prototype.hasOwnProperty.call(b,a)?b[a]:l.a.createElement("input",{value:e,onChange:d,maxLength:s,minLength:m});return l.a.createElement("label",{className:o.a.label},""+n,c&&l.a.createElement("span",{className:o.a.required},"*"),l.a.createElement("div",{className:o.a.inputWrapper},p))},m=a("Rq/j");const s=({endpoint:e,method:t,customFetcher:a,onSubmit:r,defaults:i})=>{const{0:o,1:s}=Object(n.useState)(),{0:d,1:b}=Object(n.useState)(i),{0:p,1:E}=Object(n.useState)({});return Object(n.useEffect)(()=>{Object(c.d)(e).then(e=>{const t=e.data.actions.POST,a=Object.keys(t).map(e=>({key:e,...t[e]})).filter(e=>!e.read_only);s(a)}).catch(e=>{})},e),l.a.createElement("form",{onSubmit:n=>{n.preventDefault(),r(),a?a(d).catch(e=>{e.response&&E(e.response.data)}):Object(c.a)({endpoint:e,method:t,data:d})}},o&&o.map(e=>l.a.createElement(l.a.Fragment,{key:e.key},l.a.createElement(u,Object.assign({},e,{onChange:t=>{((e,t)=>{b(a=>({...a,[e]:t}))})(e.key,t)},value:d[e.key]})),Object.prototype.hasOwnProperty.call(p,e.key)&&l.a.createElement("div",null,p[e.key].join(", ")))),l.a.createElement(m.a,{type:"submit",onClick:()=>{}},"Submit"))};s.defaultProps={method:"POST",customFetcher:null,onSubmit:()=>{},defaults:{}};t.a=s}}]);
//# sourceMappingURL=component---src-components-voting-admin-page-js-6da9fb6e370d7f207135.js.map