(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{INns:function(e,t,a){"use strict";var n=a("q1tI"),l=a.n(n),i=a("ubHu"),r=a.n(i),c=a("Rq/j");t.a=({title:e,choices:t,choice:a,setChoice:n,label:i,action:s,actionLabel:m})=>l.a.createElement("div",{className:r.a.titleChooser},l.a.createElement("h1",null,e),l.a.createElement("div",{className:r.a.actions},t&&l.a.createElement("div",{className:r.a.selectContainer},l.a.createElement("select",{onChange:e=>{const a=e.target.value,l=""===a?null:t.filter(e=>""+e.id===a)[0];n(l)},value:a?a.id:""},l.a.createElement("option",{value:""}),t.map(e=>l.a.createElement("option",{value:e.id,key:e.id},e[i]))),null===a&&l.a.createElement("div",{className:r.a.hint},"Välj ett objekt")),s&&l.a.createElement(c.a,{onClick:s},m)))},QaCa:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return m}));var n=a("q1tI"),l=a.n(n),i=a("ubHu"),r=a.n(i);const c=({children:e})=>l.a.createElement("ul",{className:r.a.list},e),s=({title:e,subtitle:t,buttons:a})=>l.a.createElement("li",null,l.a.createElement("div",{className:r.a.listText},l.a.createElement("h3",null,e),l.a.createElement("p",null,t)),l.a.createElement("div",{className:r.a.listButtons},a)),m=({href:e,onClick:t,iconComponent:a,text:n,shown:i})=>i?l.a.createElement(l.a.Fragment,null,e?l.a.createElement("a",{className:r.a.listButton,href:e,onClick:t,title:n},l.a.createElement(a,null)):l.a.createElement("button",{className:r.a.listButton,type:"button",onClick:t,title:n},l.a.createElement(a,null))):l.a.createElement(l.a.Fragment,null);m.defaultProps={shown:!0}},"Z/Vw":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),i=a("VtrM"),r=a("r90U"),c=a("zw+i"),s=a("INns"),m=a("t8Zj"),o=a("Tgqd"),u=a("QaCa"),d=a("Rq/j"),E=a("8k0H"),b=a("ZACD");var g=({meeting:e})=>{const{data:t,mutate:a}=Object(i.b)(()=>e&&"/voting/speakers/?meeting_id="+e.id),{0:r}=Object(n.useContext)(E.b),c=e.attending?"Talarlista är inaktiverad för mötet.":"Du måste vara registrerad på mötet för att kunna skriva upp dig på talarlistan.";return l.a.createElement("div",null,l.a.createElement("h2",null,"Talarlista"),e.attending&&e.enable_speaker_requests?l.a.createElement(d.b,null,l.a.createElement(d.a,{onClick:async()=>{const{data:n}=await Object(b.f)("/voting/speakers/",{meeting_id:e.id});a([].concat(Object(m.a)(t),[n]))}},"Jag vill tala!"),l.a.createElement(d.a,{onClick:async()=>{const{data:n}=await Object(b.f)("/voting/speakers/",{meeting_id:e.id,prioritized:!0});a([].concat(Object(m.a)(t),[n]))}},"Replik!")):l.a.createElement("p",null,c),l.a.createElement(u.a,null,t&&t.map(n=>l.a.createElement(u.c,{title:n.user.pretty_name,subtitle:n.prioritized?"Replik":null,key:n.id,buttons:[l.a.createElement(u.b,{shown:r.id===n.user.id,onClick:async()=>{const l=n.prioritized?"&prioritized":"";await Object(b.b)("/voting/speakers/?meeting_id="+e.id+l),a(t.filter(e=>e.id!==n.id))},iconComponent:o.l,text:"Lämna talarlista",key:"remove"})]}))))};var p=({currentMeeting:e,revalidate:t})=>l.a.createElement("div",null,l.a.createElement("h2",null,"Mötesinfo"),l.a.createElement("h3",null,e.name),l.a.createElement("p",null,l.a.createElement("strong",null,e.attending?"Du deltar på mötet.":"Du är inte registrerad på mötet.")),e.description&&l.a.createElement("p",{style:{whiteSpace:"pre-line"}},e.description),e.open_attendance&&l.a.createElement("p",null,e.attending?l.a.createElement(d.a,{onClick:async()=>{await Object(b.b)("/voting/attend/?meeting_id="+e.id),t()}},"Lämna röstlängden"):l.a.createElement(d.a,{onClick:async()=>{await Object(b.f)("/voting/attend/",{meeting_id:e.id}),t()}},"Gå med i röstlängden")));var v=({vote:e})=>{const{0:t,1:a}=Object(n.useState)(-1),{0:i,1:r}=Object(n.useState)(!1),c=-1===t,s=c?"Välj ett alternativ":"Rösta",m=i?"Tack för din röst!":"Du har röstat i omröstningen.";return l.a.createElement("div",null,l.a.createElement("strong",null,e.question),e.has_voted||i?l.a.createElement("p",null,m):l.a.createElement(l.a.Fragment,null,l.a.createElement("ul",null,e.alternatives.map(({text:e,id:n})=>l.a.createElement("li",{key:n},l.a.createElement("label",null,l.a.createElement("input",{type:"radio",checked:t===n,onChange:()=>a(n)})," "+e)))),l.a.createElement("button",{type:"button",disabled:c,onClick:async()=>{const a={vote_id:e.id,alternative_id:t};await Object(b.f)("/voting/made_votes/",a),r(!0)}},s)))};var k=({meeting:e})=>{const{data:t,error:a,revalidate:r}=Object(i.b)(()=>"/voting/votes/?meeting_id="+e.id);return Object(n.useEffect)(()=>{r()},[e]),l.a.createElement("div",null,l.a.createElement("h2",null,"Rösta"),t&&l.a.createElement(l.a.Fragment,null,0===t.length&&l.a.createElement("p",null,"Det finns ingen aktiv omröstning"),t.map(e=>l.a.createElement(v,{key:e.id,vote:e}))))};t.default=({pageContext:{title:e}})=>{const{0:t,1:a}=Object(n.useState)(null),{data:m,revalidate:o}=Object(i.b)("/voting/meetings/");return Object(n.useEffect)(()=>{t&&a(m.find(e=>e.id===t.id))},[m]),l.a.createElement(r.a,null,l.a.createElement(c.a,null,l.a.createElement(c.b,{fullWidth:!0},l.a.createElement(s.a,{title:e,choice:t,setChoice:a,choices:m,label:"name"})),t&&l.a.createElement(l.a.Fragment,null,l.a.createElement(c.b,null,l.a.createElement(p,{currentMeeting:t,revalidate:o})),l.a.createElement(c.b,null,l.a.createElement(k,{meeting:t})),l.a.createElement(c.b,null,l.a.createElement(g,{meeting:t})))))}}}]);
//# sourceMappingURL=component---src-components-vote-page-js-ed375cbe26681443ff0a.js.map