(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{INns:function(e,t,a){"use strict";var n=a("KQm4"),l=a("q1tI"),i=a.n(l),c=a("ubHu"),r=a.n(c),o=a("Rq/j");const s=({title:e,choices:t,categorizedChoices:a,choice:l,setChoice:c,label:s,action:m,actionLabel:u,noChoicesLabel:d})=>{const E=[].concat(Object(n.a)(t||[]),Object(n.a)(Object.keys(a).reduce((e,t)=>[].concat(Object(n.a)(e),Object(n.a)(a[t])),[])));return i.a.createElement("div",{className:r.a.titleChooser},i.a.createElement("h1",null,e),i.a.createElement("div",{className:r.a.actions},E.length?i.a.createElement("div",{className:r.a.selectContainer},i.a.createElement("select",{onChange:e=>{const t=e.target.value,a=""===t?null:E.filter(e=>""+e.id===t)[0];c(a)},value:l?l.id:""},i.a.createElement("option",{hidden:!0,value:""}),t.sort().map(e=>i.a.createElement("option",{value:e.id,key:e.id},e[s])),Object.keys(a).sort().map(e=>i.a.createElement("optgroup",{label:e,key:e},a[e].sort().map(e=>i.a.createElement("option",{value:e.id,key:e.id},e[s]))))),null===l&&i.a.createElement("div",{className:r.a.hint},"Välj ett objekt")):i.a.createElement("span",null,d),m&&i.a.createElement(o.a,{onClick:m},u)))};s.defaultProps={categorizedChoices:{},choices:[],action:null,actionLabel:"",choice:null,noChoicesLabel:"",setChoice:()=>{},label:""},t.a=s},QaCa:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"c",(function(){return o})),a.d(t,"b",(function(){return s}));var n=a("q1tI"),l=a.n(n),i=a("ubHu"),c=a.n(i);const r=({children:e})=>l.a.createElement("ul",{className:c.a.list},e),o=({title:e,subtitle:t,buttons:a,color:n})=>l.a.createElement("li",{className:n?c.a.listItemColor:"",style:{borderColor:n}},l.a.createElement("div",{className:c.a.listText},l.a.createElement("h3",null,e),l.a.createElement("p",null,t)),l.a.createElement("div",{className:c.a.listButtons},a));o.defaultProps={color:null};const s=({href:e,onClick:t,iconComponent:a,text:n,shown:i})=>i?l.a.createElement(l.a.Fragment,null,e?l.a.createElement("a",{className:c.a.listButton,href:e,onClick:t,title:n},l.a.createElement(a,null)):l.a.createElement("button",{className:c.a.listButton,type:"button",onClick:t,title:n},l.a.createElement(a,null))):l.a.createElement(l.a.Fragment,null);s.defaultProps={shown:!0}},"Z/Vw":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),i=a("VtrM"),c=a("r90U"),r=a("zw+i"),o=a("INns"),s=a("KQm4"),m=a("Tgqd"),u=a("QaCa"),d=a("Rq/j"),E=a("8k0H"),b=a("ZACD");var p=({meeting:e})=>{const{data:t,mutate:a}=Object(i.b)(()=>e&&"/voting/speakers/?meeting_id="+e.id),{0:c}=Object(n.useContext)(E.b),r=e.attending?"Talarlista är inaktiverad för mötet.":"Du måste vara registrerad på mötet för att kunna skriva upp dig på talarlistan.";return l.a.createElement("div",null,l.a.createElement("h2",null,"Talarlista"),e.attending&&e.enable_speaker_requests?l.a.createElement(d.b,null,l.a.createElement(d.a,{onClick:async()=>{const{data:n}=await Object(b.f)("/voting/speakers/",{meeting_id:e.id});a([].concat(Object(s.a)(t),[n]))}},"Jag vill tala!"),l.a.createElement(d.a,{onClick:async()=>{const{data:n}=await Object(b.f)("/voting/speakers/",{meeting_id:e.id,prioritized:!0});a([].concat(Object(s.a)(t),[n]))}},"Replik!")):l.a.createElement("p",null,r),l.a.createElement(u.a,null,t&&t.map(n=>l.a.createElement(u.c,{title:n.user.pretty_name,subtitle:n.prioritized?"Replik":null,key:n.id,buttons:[l.a.createElement(u.b,{shown:c.id===n.user.id,onClick:async()=>{const l=n.prioritized?"&prioritized":"";await Object(b.b)(`/voting/speakers/?meeting_id=${e.id}${l}`),a(t.filter(e=>e.id!==n.id))},iconComponent:m.m,text:"Lämna talarlista",key:"remove"})]}))))};var g=({currentMeeting:e,revalidate:t})=>l.a.createElement("div",null,l.a.createElement("h2",null,"Mötesinfo"),l.a.createElement("h3",null,e.name),l.a.createElement("p",null,l.a.createElement("strong",null,e.attending?"Du deltar på mötet.":"Du är inte registrerad på mötet.")),e.description&&l.a.createElement("p",{style:{whiteSpace:"pre-line"}},e.description),e.open_attendance&&l.a.createElement("p",null,e.attending?l.a.createElement(d.a,{onClick:async()=>{await Object(b.b)("/voting/attend/?meeting_id="+e.id),t()}},"Lämna röstlängden"):l.a.createElement(d.a,{onClick:async()=>{await Object(b.f)("/voting/attend/",{meeting_id:e.id}),t()}},"Gå med i röstlängden")));var v=({vote:e})=>{const{0:t,1:a}=Object(n.useState)(-1),{0:i,1:c}=Object(n.useState)(!1),r=-1===t,o=r?"Välj ett alternativ":"Rösta",s=i?"Tack för din röst!":"Du har röstat i omröstningen.";return l.a.createElement("div",null,l.a.createElement("strong",null,e.question),e.has_voted||i?l.a.createElement("p",null,s):l.a.createElement(l.a.Fragment,null,l.a.createElement("ul",null,e.alternatives.map(({text:e,id:n})=>l.a.createElement("li",{key:n},l.a.createElement("label",null,l.a.createElement("input",{type:"radio",checked:t===n,onChange:()=>a(n)})," "+e)))),l.a.createElement("button",{type:"button",disabled:r,onClick:async()=>{const a={vote_id:e.id,alternative_id:t};await Object(b.f)("/voting/made_votes/",a),c(!0)}},o)))};var h=({meeting:e})=>{const{data:t,error:a,revalidate:c}=Object(i.b)(()=>"/voting/votes/?meeting_id="+e.id);return Object(n.useEffect)(()=>{c()},[e]),l.a.createElement("div",null,l.a.createElement("h2",null,"Rösta"),t&&l.a.createElement(l.a.Fragment,null,0===t.length&&l.a.createElement("p",null,"Det finns ingen aktiv omröstning"),t.map(e=>l.a.createElement(v,{key:e.id,vote:e}))))};t.default=({pageContext:{title:e}})=>{const{0:t,1:a}=Object(n.useState)(null),{data:s,revalidate:m}=Object(i.b)("/voting/meetings/");return Object(n.useEffect)(()=>{t&&a(s.find(e=>e.id===t.id))},[s]),l.a.createElement(c.a,null,l.a.createElement(r.a,null,l.a.createElement(r.b,{fullWidth:!0},l.a.createElement(o.a,{title:e,choice:t,setChoice:a,choices:s,label:"name",noChoicesLabel:"Det finns inga möten just nu."})),t&&l.a.createElement(l.a.Fragment,null,l.a.createElement(r.b,null,l.a.createElement(g,{currentMeeting:t,revalidate:m})),l.a.createElement(r.b,null,l.a.createElement(h,{meeting:t})),l.a.createElement(r.b,null,l.a.createElement(p,{meeting:t})))))}}}]);
//# sourceMappingURL=component---src-components-vote-page-js-674706dbb4ab640dcd6d.js.map