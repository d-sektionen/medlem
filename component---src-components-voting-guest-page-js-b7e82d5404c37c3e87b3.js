(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{INns:function(e,t,a){"use strict";var n=a("KQm4"),l=a("q1tI"),i=a.n(l),c=a("ubHu"),r=a.n(c),s=a("Rq/j");const o=({title:e,choices:t,categorizedChoices:a,choice:l,setChoice:c,label:o,action:u,actionLabel:m,noChoicesLabel:d})=>{const b=[].concat(Object(n.a)(t||[]),Object(n.a)(Object.keys(a).reduce((e,t)=>[].concat(Object(n.a)(e),Object(n.a)(a[t])),[])));return i.a.createElement("div",{className:r.a.titleChooser},i.a.createElement("h1",null,e),i.a.createElement("div",{className:r.a.actions},b.length?i.a.createElement("div",{className:r.a.selectContainer},i.a.createElement("select",{onChange:e=>{const t=e.target.value,a=""===t?null:b.filter(e=>""+e.id===t)[0];c(a)},value:l?l.id:""},i.a.createElement("option",{hidden:!0,value:""}),t.sort().map(e=>i.a.createElement("option",{value:e.id,key:e.id},e[o])),Object.keys(a).sort().map(e=>i.a.createElement("optgroup",{label:e,key:e},a[e].sort().map(e=>i.a.createElement("option",{value:e.id,key:e.id},e[o]))))),null===l&&i.a.createElement("div",{className:r.a.hint},"Välj ett objekt")):i.a.createElement("span",null,d),u&&i.a.createElement(s.a,{onClick:u},m)))};o.defaultProps={categorizedChoices:{},choices:[],action:null,actionLabel:"",choice:null,noChoicesLabel:"",setChoice:()=>{},label:""},t.a=o},QaCa:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return o}));var n=a("q1tI"),l=a.n(n),i=a("ubHu"),c=a.n(i);const r=({children:e})=>l.a.createElement("ul",{className:c.a.list},e),s=({title:e,subtitle:t,buttons:a,color:n})=>l.a.createElement("li",{className:n?c.a.listItemColor:"",style:{borderColor:n}},l.a.createElement("div",{className:c.a.listText},l.a.createElement("h3",null,e),l.a.createElement("p",null,t)),l.a.createElement("div",{className:c.a.listButtons},a));s.defaultProps={color:null};const o=({href:e,onClick:t,iconComponent:a,text:n,shown:i})=>i?l.a.createElement(l.a.Fragment,null,e?l.a.createElement("a",{className:c.a.listButton,href:e,onClick:t,title:n},l.a.createElement(a,null)):l.a.createElement("button",{className:c.a.listButton,type:"button",onClick:t,title:n},l.a.createElement(a,null))):l.a.createElement(l.a.Fragment,null);o.defaultProps={shown:!0}},"Qs+A":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),i=a("VtrM"),c=a("r90U"),r=a("zw+i"),s=a("INns"),o=a("KQm4"),u=a("Tgqd"),m=a("QaCa"),d=a("Rq/j"),b=a("8k0H"),E=a("ZACD");var p=({meeting:e})=>{const{data:t,mutate:a}=Object(i.b)(()=>e&&"/voting/speakers/?meeting_id="+e.id),{0:c}=Object(n.useContext)(b.b),r=e.attending?"Talarlista är inaktiverad för mötet.":"Du måste vara registrerad på mötet för att kunna skriva upp dig på talarlistan.";return l.a.createElement("div",null,l.a.createElement("h2",null,"Talarlista"),e.attending&&e.enable_speaker_requests?l.a.createElement(d.b,null,l.a.createElement(d.a,{onClick:async()=>{const{data:n}=await Object(E.f)("/voting/speakers/",{meeting_id:e.id});a([].concat(Object(o.a)(t),[n]))}},"Jag vill tala!"),l.a.createElement(d.a,{onClick:async()=>{const{data:n}=await Object(E.f)("/voting/speakers/",{meeting_id:e.id,prioritized:!0});a([].concat(Object(o.a)(t),[n]))}},"Replik!")):l.a.createElement("p",null,r),l.a.createElement(m.a,null,t&&t.map(n=>l.a.createElement(m.c,{title:n.user.pretty_name,subtitle:n.prioritized?"Replik":null,key:n.id,buttons:[l.a.createElement(m.b,{shown:c.id===n.user.id,onClick:async()=>{const l=n.prioritized?"&prioritized":"";await Object(E.b)(`/voting/speakers/?meeting_id=${e.id}${l}`),a(t.filter(e=>e.id!==n.id))},iconComponent:u.l,text:"Lämna talarlista",key:"remove"})]}))))};var g=({currentMeeting:e,revalidate:t})=>l.a.createElement("div",null,l.a.createElement("h2",null,"Mötesinfo"),l.a.createElement("h3",null,e.name),l.a.createElement("p",null,l.a.createElement("strong",null,e.attending?"Du deltar på mötet som gäst.":"Du är inte registrerad på mötet.")),e.description&&l.a.createElement("p",{style:{whiteSpace:"pre-line"}},e.description));t.default=({pageContext:{title:e}})=>{const{0:t,1:a}=Object(n.useState)(null),{data:o,revalidate:u}=Object(i.b)("/voting/guest-meetings/");return Object(n.useEffect)(()=>{t&&a(o.find(e=>e.id===t.id))},[o]),l.a.createElement(c.a,null,l.a.createElement(r.a,null,l.a.createElement(r.b,{fullWidth:!0},l.a.createElement(s.a,{title:e,choice:t,setChoice:a,choices:o,label:"name",noChoicesLabel:"Det finns inga möten tillgängliga just nu. Du kan bara se möten du blivit inbjuden till."})),t&&l.a.createElement(l.a.Fragment,null,l.a.createElement(r.b,null,l.a.createElement(g,{currentMeeting:t,revalidate:u})),l.a.createElement(r.b,null,l.a.createElement(p,{meeting:t})))))}}}]);
//# sourceMappingURL=component---src-components-voting-guest-page-js-b7e82d5404c37c3e87b3.js.map