(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{232:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),l=n(17),c=n(37),i=n.n(c),o=n(6),u=n.n(o),s=n(42),d=function(e){function t(t){var n;(n=e.call(this,t)||this).state={checkedId:-1};var a=n.props.onMessage;return n.onAlternativeChecked=n.onAlternativeChecked.bind(i()(n)),n.placeVote=n.placeVote.bind(i()(n)),n.showMessage=a,n}u()(t,e);var n=t.prototype;return n.onAlternativeChecked=function(e){this.setState({checkedId:e})},n.placeVote=function(){var e=this.props,t=e.setLoading,n=e.vote,a=this.state.checkedId,r=this.showMessage,l={vote_id:n.id,alternative_id:a};t(!0),Object(s.e)("/voting/made_votes/",l).then(function(){t(!1),r("Tack!","Din röst har registrerats")}).catch(function(e){t(!1),r("Ett fel uppstod",e)})},n.render=function(){var e=this,t=this.props.vote,n=this.state.checkedId,a=-1===n,l=a?"Välj ett alternativ":"Rösta";return r.a.createElement("div",null,r.a.createElement("strong",null,t.question),r.a.createElement("ul",null,t.alternatives.map(function(t){var a=t.text,l=t.id;return r.a.createElement("li",{key:l},r.a.createElement("label",null,r.a.createElement("input",{type:"radio",checked:n===l,onChange:function(){return e.onAlternativeChecked(l)}})," "+a))})),r.a.createElement("button",{type:"button",disabled:a,onClick:this.placeVote},l))},t}(a.Component),h=function(e){var t=e.showMessage,n=e.setLoading,a=Object(s.f)({endpoint:"/voting/votes/?current=true"}),l=a[0];if(a[1]&&t("Något gick fel","Logga ut eller refresha eller nåt.",!0),!l)return r.a.createElement(r.a.Fragment,null);if(0===l.length)return r.a.createElement("div",null,"Det finns ingen aktiv omröstning");var c=l[0];return c.has_voted?r.a.createElement("p",null,"Du har redan röstat i den nuvarande omröstningen."):r.a.createElement(d,{vote:c,onMessage:t,setLoading:n})},m=function(){var e=Object(a.useContext)(l.a)[1],t=Object(a.useState)(null),n=t[0],c=t[1],i=Object(a.useState)(!1),o=i[0],u=i[1];if(null!==n){var s=n.title,d=n.content;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,s),r.a.createElement("p",null,d),r.a.createElement("button",{type:"button",onClick:function(){return c(null)}},o?"Ladda om sidan":"Stäng"))}return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"D-cide"),r.a.createElement(h,{showMessage:function(e,t,n){u(n),c({title:e,content:t})},setLoading:e}))},v=n(43),p=n(31);t.default=function(){return r.a.createElement(v.a,null,r.a.createElement(p.a,null,r.a.createElement(p.b,null,r.a.createElement(m,null))))}}}]);
//# sourceMappingURL=component---src-components-vote-page-js-0e1e12f882be0aefec04.js.map