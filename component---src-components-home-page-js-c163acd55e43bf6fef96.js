(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{QaCa:function(e,t,a){"use strict";a.d(t,"a",(function(){return m})),a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return o}));var n=a("q1tI"),l=a.n(n),r=a("ubHu"),s=a.n(r);const m=({children:e})=>l.a.createElement("ul",{className:s.a.list},e),i=({title:e,subtitle:t,buttons:a,color:n})=>l.a.createElement("li",{className:n?s.a.listItemColor:"",style:{borderColor:n}},l.a.createElement("div",{className:s.a.listText},l.a.createElement("h3",null,e),l.a.createElement("p",null,t)),l.a.createElement("div",{className:s.a.listButtons},a));i.defaultProps={color:null};const o=({href:e,onClick:t,iconComponent:a,text:n,shown:r})=>r?l.a.createElement(l.a.Fragment,null,e?l.a.createElement("a",{className:s.a.listButton,href:e,onClick:t,title:n},l.a.createElement(a,null)):l.a.createElement("button",{className:s.a.listButton,type:"button",onClick:t,title:n},l.a.createElement(a,null))):l.a.createElement(l.a.Fragment,null);o.defaultProps={shown:!0}},"i+UT":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),r=a("VtrM"),s=a("Tgqd"),m=a("8k0H"),i=a("r90U"),o=a("zw+i"),u=a("ZACD"),c=a("Rq/j"),d=a("sI90"),p=a.n(d);var b=()=>{const{0:e,1:t}=Object(n.useState)(!0),{0:a,1:r}=Object(n.useState)(!1),{0:s,1:m}=Object(n.useState)(2019),{0:i,1:o}=Object(n.useState)("Empty"),{0:d,1:b}=Object(n.useState)(""),{0:E,1:g}=Object(n.useState)(""),{0:f,1:k}=Object(n.useState)(""),{0:v,1:h}=Object(n.useState)("");Object(n.useEffect)(()=>{Object(u.c)("/membership/request/").then(()=>{r(!0),h(null),t(!0)}).catch(e=>{t(!0),e.response&&404===e.response.status?(r(!1),h(null)):e.response&&e.response.data&&h(e.response.data)})},[]);return l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",null,"Bli medlem"),e&&!a&&l.a.createElement(l.a.Fragment,null,l.a.createElement("p",null,"Nu drar din tid tillsammans med oss i D-sektionen igång, och ett utmärkt sätt att få ut det mesta av din universitetstid är att bli medlem i sektionen."),l.a.createElement("p",null,"Att bli medlem i D-sektionen ger med sig en massa fördelar. Först och främst ger det dig möjlighet att delta under alla roliga evenemang vi anordnar under läsåren. Du har också möjlighet att använda de webbtjänster vi erbjuder på vår hemsida, samt om du vill kunna gå på och påverka under våra sektionsmöten där beslut tas kring sektionens framtida verksamhet."),l.a.createElement("p",null,"Ett medlemskap i D-sektionen är helt gratis. Vi finansieras via sponsoravtal, bidrag från studentkåren LinTek och universitetet, samt betalningar under enskilda event. För att bli medlem i D-sektionen registrerar du dig via följande formulär:"),l.a.createElement("form",{onSubmit:e=>{e.preventDefault(),Object(u.f)("/membership/request/",{first_name:d,last_name:E,program:i,starting_year:s,message:f}).then(()=>{h(null),r(!0)}).catch(e=>{e.response&&e.response.data&&h(e.response.data)})}},l.a.createElement("label",{className:p.a.inputLabel},"Förnamn",l.a.createElement("input",{value:d,onChange:e=>b(e.target.value)}),v&&v.first_name&&v.first_name.join(", ")),l.a.createElement("label",{className:p.a.inputLabel},"Efternamn",l.a.createElement("input",{value:E,onChange:e=>g(e.target.value)}),v&&v.last_name&&v.last_name.join(", ")),l.a.createElement("label",{className:p.a.inputLabel},"Program",l.a.createElement("select",{value:i,onChange:e=>o(e.target.value)},l.a.createElement("option",{value:"Empty"}),l.a.createElement("option",{value:"D"},"Datateknik (D)"),l.a.createElement("option",{value:"U"},"Mjukvaruteknik (U)"),l.a.createElement("option",{value:"IT"},"Informationsteknologi (IT)"),l.a.createElement("option",{value:"IP"},"Innovativ Programmering (IP)"),l.a.createElement("option",{value:"CS"},"Masterprogram (CS)")),v&&v.program&&v.program.join(", ")),l.a.createElement("label",{className:p.a.inputLabel},"Startår",l.a.createElement("input",{type:"number",value:s,onChange:e=>m(parseInt(e.target.value,10))}),v&&v.starting_year&&v.starting_year.join(", ")),l.a.createElement("label",{className:p.a.inputLabel},"Övrig information (kan lämnas tom)",l.a.createElement("textarea",{value:f,onChange:e=>k(e.target.value)}),v&&v.message&&v.message.join(", ")),l.a.createElement(c.a,{type:"submit"},"Skicka förfrågan"))),e&&a&&l.a.createElement(l.a.Fragment,null,l.a.createElement("p",null,"Tack för din medlemsförfrågan, den kommer behandlas så snart som möjligt."),l.a.createElement(c.a,{onClick:()=>{window.confirm("Är du säker på att du vill återkalla din medlemsförfrågan?")&&Object(u.b)("/membership/request/").then(()=>{r(!1),h(null)}).catch(e=>{e.response&&e.response.data&&h(e.response.data)})}},"Återkalla medlemsförfrågan")),v&&v.detail)},E=a("QaCa");t.default=()=>{const{data:e}=Object(r.b)("https://d-sektionen.se/wp-json/wp/v2/posts?per_page=6"),{0:t}=Object(n.useContext)(m.b),a=t.first_name?`Hej ${t.first_name}!`:"Hej!";return l.a.createElement(i.a,null,l.a.createElement(o.a,null,!t.membership&&l.a.createElement(o.b,null,l.a.createElement(b,null)),l.a.createElement(o.b,null,l.a.createElement("h1",null,a),l.a.createElement("p",null,"Välkommen till D-sektionens medlemssida. I sidomenyn finns våra tjänster för medlemmar."),l.a.createElement("h2",null,"Senaste nytt från ",l.a.createElement("a",{href:"https://d-sektionen.se"},"d-sektionen.se")),l.a.createElement(E.a,null,e&&e.map(e=>l.a.createElement(E.c,{key:e.id,title:e.title.rendered,subtitle:new Date(e.date).toLocaleDateString(),buttons:[l.a.createElement(E.b,{key:"link",text:"Läs mer",iconComponent:s.e,href:e.link})]}))))))}},sI90:function(e,t,a){e.exports={inputLabel:"membership-module--inputLabel--_Isdy"}}}]);
//# sourceMappingURL=component---src-components-home-page-js-c163acd55e43bf6fef96.js.map