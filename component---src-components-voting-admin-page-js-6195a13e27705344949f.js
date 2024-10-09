"use strict";(self.webpackChunkmedlem=self.webpackChunkmedlem||[]).push([[406],{8803:function(e,t,n){var a=n(5785),l=n(7294),r=n(2777),c=n(3541),i=n(2132),u=n(8043);t.Z=e=>{let{event:t}=e;const{0:n,1:o}=(0,l.useState)(""),{data:m,mutate:s}=(0,i.ZP)("/checkin/doorkeepers/?event_id="+t.id);return l.createElement("div",null,l.createElement("h2",null,"Dörrvakter"),l.createElement("form",{onSubmit:e=>{e.preventDefault(),o(""),(async e=>{const{data:t}=await(0,u.v_)("/checkin/doorkeepers/",e);s([].concat((0,a.Z)(m),[t]))})({user_username:n,event_id:t.id})}},l.createElement("input",{value:n,placeholder:"LiU-ID",onChange:e=>o(e.target.value)})),l.createElement(c.aV,null,m&&m.map((e=>l.createElement(c.HC,{title:e.user.pretty_name,key:e.id,buttons:[l.createElement(c.zj,{onClick:()=>(async e=>{await(0,u.IV)("/checkin/doorkeepers/"+e+"/"),s(m.filter((t=>t.id!==e)))})(e.id),iconComponent:r.Ybf,text:"Ta bort dörrvakt",key:"remove"})]})))))}},3819:function(e,t,n){n.d(t,{Z:function(){return d}});var a={};n.r(a),n.d(a,{__:function(){return i},cW:function(){return u}});var l=n(7294),r=n(8043),c=n(780),i="form-module--Label--ab587",u="form-module--inputWrapper--1111e";var o=e=>{let{value:t,onChange:n,type:r,label:o,required:m,min_value:s,max_value:d,min_length:p,max_length:v}=e;const E=e=>{n(e.target.value)},g={datetime:l.createElement(c.Z,{value:t,onChange:n}),date:l.createElement("input",{type:"date",value:t,onChange:E}),boolean:l.createElement("input",{type:"checkbox",checked:t,onChange:e=>{n(e.target.checked)}}),integer:l.createElement("input",{type:"number",value:t,onChange:E,max:d,min:s})},h=Object.prototype.hasOwnProperty.call(g,r)?g[r]:l.createElement("input",{value:t,onChange:E,maxLength:v,minLength:p});return l.createElement("label",{className:i},""+o,m&&l.createElement("span",{className:a.Required},"*"),l.createElement("div",{className:u},h))},m=n(7580);const s=e=>{let{endpoint:t,method:n,customFetcher:a,onSubmit:c,defaults:i}=e;const{0:u,1:s}=(0,l.useState)(),{0:d,1:p}=(0,l.useState)(i),{0:v,1:E}=(0,l.useState)({});return(0,l.useEffect)((()=>{(0,r.jz)(t).then((e=>{const t=e.data.actions.POST,n=Object.keys(t).map((e=>({key:e,...t[e]}))).filter((e=>!e.read_only));s(n)})).catch((e=>{}))}),t),l.createElement("form",{onSubmit:e=>{e.preventDefault(),c(),a?a(d).catch((e=>{e.response&&E(e.response.data)})):(0,r.ZP)({endpoint:t,method:n,data:d})}},u&&u.map((e=>l.createElement(l.Fragment,{key:e.key},l.createElement(o,Object.assign({},e,{onChange:t=>{((e,t)=>{p((n=>({...n,[e]:t})))})(e.key,t)},value:d[e.key]})),Object.prototype.hasOwnProperty.call(v,e.key)&&l.createElement("div",null,v[e.key].join(", "))))),l.createElement(m.zx,{type:"submit",onClick:()=>{}},"Submit"))};s.defaultProps={method:"POST",customFetcher:null,onSubmit:()=>{},defaults:{}};var d=s},8857:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(7294),l=n(8829),r=n(7580),c=n(6102);const i=e=>{let{text:t,onAccept:n,onDecline:i}=e;const u=(0,l._)();return a.createElement("div",{className:c.y5},a.createElement("p",null,t),a.createElement(r.zx,{onClick:()=>{i(),u()}},"Nej"),a.createElement(r.zx,{onClick:()=>{n(),u()}},"Ja"))};function u(){const[e,t]=(0,l.Z)(i);return[(t,n,a)=>{e("",{text:t,onAccept:n,onDecline:a})},t]}i.defaultProps={text:"Är du säker?",onAccept:()=>{},onDecline:()=>{}}},7907:function(e,t,n){n.r(t),n.d(t,{default:function(){return P}});var a=n(5785),l=n(7294),r=n(2132),c=n(7580),i=n(8043);var u=e=>{let{currentMeeting:t,updatePatch:n}=e;return l.createElement("div",null,l.createElement("h2",null,"Mötesinfo"),l.createElement("h3",null,t.name),t.description&&l.createElement("p",{style:{whiteSpace:"pre-line"}},t.description),l.createElement("h3",null,"Detaljer"),l.createElement("ul",null,l.createElement("li",null,t.enable_speaker_requests?"Talarlista aktiverad":"Talarlista inaktiverad"),l.createElement("li",null,t.open_attendance?"Öppen incheckning":"Stängd incheckning"),l.createElement("li",null,"Mötesdata rensas: "+t.clear_data)),l.createElement(c.hE,null,l.createElement(c.zx,{onClick:()=>n({enable_speaker_requests:!t.enable_speaker_requests})},t.enable_speaker_requests?"Inaktivera talarlista":"Aktivera talarlista"),l.createElement(c.zx,{onClick:()=>n({open_attendance:!t.open_attendance})},t.open_attendance?"Stäng självincheckning":"Öppna självincheckning")))},o=n(8803),m=n(2777),s=n(8829),d=n(8857);let p=0;const v=function(e){return void 0===e&&(e={}),p+=1,{text:"",...e,key:p}};var E=e=>{let{currentMeeting:t,create:n,updateData:r,update:c}=e;const{0:i,1:u}=(0,l.useState)(r?r.question:""),{0:o,1:m}=(0,l.useState)(r?r.alternatives.map((e=>v(e))):[v(),v()]),{0:s,1:d}=(0,l.useState)(!r||r.open);return l.createElement("div",null,l.createElement("label",null,"Fråga",l.createElement("input",{value:i,onChange:e=>{u(e.target.value)}})),l.createElement("hr",null),l.createElement("ul",null,o.map(((e,t)=>l.createElement("li",{key:e.key},l.createElement("input",{value:e.text,onChange:e=>{const n=e.target.value;m((e=>[].concat((0,a.Z)(e.slice(0,t)),[{...e[t],text:n}],(0,a.Z)(e.slice(t+1)))))}}),l.createElement("button",{type:"button",onClick:()=>{m((e=>[].concat((0,a.Z)(e.slice(0,t)),(0,a.Z)(e.slice(t+1)))))}},"X"))))),l.createElement("button",{type:"button",onClick:()=>{m((e=>[].concat((0,a.Z)(e),[v()])))}},"Lägg till alternativ"),l.createElement("hr",null),l.createElement("label",null,l.createElement("input",{type:"checkbox",checked:s,onChange:()=>d((e=>!e))}),"Nuvarande frågan"),l.createElement("hr",null),l.createElement("button",{type:"button",onClick:()=>{r?c(r.id,{question:i,open:s,alternatives:o,meeting:t.id}):n({question:i,open:s,alternatives:o,meeting:t.id})}},r?"Uppdatera omröstning":"Skapa ny omröstning"))};var g=e=>{let{currentMeeting:t,voteId:n}=e;const{data:a}=(0,r.ZP)((()=>n&&"/voting/admin-votes/"+n+"/")),c=(a?a.alternatives.map((e=>e.num_votes)):[]).reduce(((e,t)=>e+t),0);return l.createElement("div",null,l.createElement("ul",null,a&&a.alternatives.map((e=>l.createElement("li",{key:e.text},e.text+": "+e.num_votes,c?" ("+(e.num_votes?Math.round(1e3*e.num_votes/c)/10:0)+"%)":"")))),l.createElement("p",null,"Summa: ",c))},h=n(3541);var k=e=>{let{currentMeeting:t}=e;const{data:n,mutate:u}=(0,r.ZP)("/voting/admin-votes/?event_id="+t.id),o=async e=>{const{data:t}=await(0,i.v_)("/voting/admin-votes/",e);return u([].concat((0,a.Z)(n),[t])),t},p=async(e,t)=>{const{data:l}=await(0,i.gz)("/voting/admin-votes/"+e+"/",t);return u([].concat((0,a.Z)(n.filter((t=>t.id!==e))),[l])),l},[v]=(0,s.Z)(E),[k]=(0,s.Z)(g),y=(0,s._)(),[f]=(0,d.Z)();return(0,l.useEffect)(y,[n]),l.createElement("div",null,l.createElement("h2",null,"Omröstningar"),l.createElement(c.zx,{onClick:()=>v("Ny omröstning",{currentMeeting:t,create:o})},"Ny omröstning"),l.createElement(h.aV,null,n&&n.filter((e=>e.meeting===t.id)).map((e=>l.createElement(h.HC,{title:e.question,subtitle:e.open?"Active":void 0,key:e.id,buttons:[l.createElement(h.zj,{onClick:()=>f("Vill du se resultatet?",(function(){(async e=>{await y(),k('Resultat av "'+e.question+'"',{voteId:e.id})})(e)}),y),iconComponent:m.orK,text:"Resultat",key:"results"}),l.createElement(h.zj,{onClick:()=>v('Uppdatera "'+e.question+'"',{currentMeeting:t,update:p,updateData:e}),iconComponent:m.IYd,text:"Uppdatera omröstning",key:"update"})]})))))};const y=e=>e.filter((e=>e.has_voting_rights));var f=e=>{let{currentMeeting:t}=e;const{0:n,1:u}=(0,l.useState)(""),[o]=(0,d.Z)(),p=(0,s._)(),{data:v,mutate:E}=(0,r.ZP)((()=>"/voting/attendants/?meeting_id="+t.id),{refreshInterval:4e3});return null===v?l.createElement(l.Fragment,null):l.createElement("div",null,l.createElement("h2",null,"Deltagare"),l.createElement("form",{onSubmit:async e=>{e.preventDefault(),u("");const{data:l}=await(0,i.v_)("/voting/attendants/",{user_username:n,meeting_id:t.id,has_voting_rights:!0});E([].concat((0,a.Z)(v),[l]))}},l.createElement("input",{value:n,placeholder:"LiU-ID",onChange:e=>u(e.target.value)})),l.createElement("div",null,l.createElement(c.hE,null,l.createElement("p",null,"Röstlängd: "+(v?y(v).length:0)),l.createElement(c.zx,{onClick:()=>o("Är du säker på att du vill ta bort alla deltagare?",(async()=>{await(0,i.IV)("/voting/attendants/clear/?meeting_id="+t.id),E([])}),p)},"Återställ deltagarlista"))),l.createElement(h.aV,null,v&&y(v).map((e=>l.createElement(h.HC,{title:e.user.pretty_name,key:e.id,buttons:[l.createElement(h.zj,{onClick:async()=>{await(0,i.IV)("/voting/attendants/"+e.id,{meeting_id:t.id}),E(v.filter((t=>t.id!==e.id)))},iconComponent:m.Ybf,text:"Ta bort deltagare",key:"remove"})]})))))},b=n(1288);n(2525);var _=e=>{let{meeting:t}=e;const{data:n,mutate:a}=(0,r.ZP)((()=>t&&"/voting/speakers/?meeting_id="+t.id),{refreshInterval:4e3});return l.createElement("div",null,l.createElement("h2",null,"Talarlista"),l.createElement(h.aV,null,n&&n.map((e=>l.createElement(h.HC,{title:e.user.pretty_name,subtitle:e.prioritized?"Replik":null,key:e.id,buttons:[l.createElement(h.zj,{onClick:async()=>{await(0,i.IV)("/voting/speakers/"+e.id),a(n.filter((t=>t.id!==e.id)))},iconComponent:m.Ybf,text:"Ta bort från talarlista",key:"remove"})]})))))},C=n(7333),Z=n(3819);var x=e=>{let{create:t}=e;return l.createElement(Z.Z,{endpoint:"/voting/admin-meetings/",customFetcher:t})},S=n(746);var P=e=>{let{pageContext:{title:t}}=e;const{0:n,1:c}=(0,l.useState)(null),{data:m,mutate:d}=(0,r.ZP)("/voting/admin-meetings/"),[p]=(0,s.Z)(x),v=(0,s._)(),E=m?(0,a.Z)(m).reverse():null;return(0,l.useEffect)((()=>{n&&c(E.find((e=>e.id===n.id)))}),[E]),l.createElement(S.Z,null,l.createElement(b.T,null,l.createElement(b.P,{fullWidth:!0},l.createElement(C.Z,{title:t,choice:n,setChoice:c,choices:E,label:"name",action:()=>{p("Nytt möte",{create:async e=>{await(async e=>{const{data:t}=await(0,i.v_)("/voting/admin-meetings/",e);d([].concat((0,a.Z)(m),[t]))})(e),v()}})},actionLabel:"Nytt möte",noChoicesLabel:"Det finns inga möten just nu."})),n&&l.createElement(l.Fragment,null,l.createElement(b.P,null,l.createElement(u,{currentMeeting:n,updatePatch:async e=>{const{data:t}=await(0,i.r$)("/voting/admin-meetings/"+n.id+"/",e);d([].concat((0,a.Z)(m.filter((e=>e.id!==n.id))),[t]))}})),l.createElement(b.P,null,l.createElement(k,{currentMeeting:n})),l.createElement(b.P,null,l.createElement(o.Z,{event:n})),l.createElement(b.P,null,l.createElement(f,{currentMeeting:n})),l.createElement(b.P,null,l.createElement(_,{meeting:n})))))}}}]);
//# sourceMappingURL=component---src-components-voting-admin-page-js-6195a13e27705344949f.js.map