(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"2YQ3":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),o=a("r90U"),r=a("zw+i"),c=a("VtrM"),s=a("QaCa"),u=a("Tgqd");t.default=({pageContext:e})=>{const{data:t}=Object(c.b)("/keylog/keys/");return l.a.createElement(o.a,null,l.a.createElement(r.a,null,l.a.createElement(r.b,null,l.a.createElement("h1",null,e.title),t&&l.a.createElement(s.a,null,t.map(e=>l.a.createElement(s.c,{title:e.name,subtitle:e.status?"Upptagen ("+e.status.taken_by.pretty_name+")":"Tillgänglig",buttons:[l.a.createElement(s.b,{iconComponent:u.g,text:"Mer information",onClick:()=>{},key:"infobutton"})],key:e.id,color:e.color}))))))}},QaCa:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return u}));var n=a("q1tI"),l=a.n(n),o=a("ubHu"),r=a.n(o);const c=({children:e})=>l.a.createElement("ul",{className:r.a.list},e),s=({title:e,subtitle:t,buttons:a,color:n})=>l.a.createElement("li",{className:n?r.a.listItemColor:"",style:{borderColor:n}},l.a.createElement("div",{className:r.a.listText},l.a.createElement("h3",null,e),l.a.createElement("p",null,t)),l.a.createElement("div",{className:r.a.listButtons},a));s.defaultProps={color:null};const u=({href:e,onClick:t,iconComponent:a,text:n,shown:o})=>o?l.a.createElement(l.a.Fragment,null,e?l.a.createElement("a",{className:r.a.listButton,href:e,onClick:t,title:n},l.a.createElement(a,null)):l.a.createElement("button",{className:r.a.listButton,type:"button",onClick:t,title:n},l.a.createElement(a,null))):l.a.createElement(l.a.Fragment,null);u.defaultProps={shown:!0}}}]);
//# sourceMappingURL=component---src-components-keylog-page-js-73b3890edf87e012441e.js.map