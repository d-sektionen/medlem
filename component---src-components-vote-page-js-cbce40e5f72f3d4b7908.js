(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{238:function(e,t,n){"use strict";n.r(t);var a=n(1),l=n.n(a),s=n(27),r=n(50);class c extends a.Component{constructor(e){super(e),this.state={checkedId:-1};const{onMessage:t}=this.props;this.onAlternativeChecked=this.onAlternativeChecked.bind(this),this.placeVote=this.placeVote.bind(this),this.showMessage=t}onAlternativeChecked(e){this.setState({checkedId:e})}placeVote(){const{setLoading:e,vote:t}=this.props,{checkedId:n}=this.state,{showMessage:a}=this,l={vote_id:t.id,alternative_id:n};e(!0),Object(r.e)("/voting/made_votes/",l).then(()=>{e(!1),a("Tack!","Din röst har registrerats")}).catch(t=>{e(!1),a("Ett fel uppstod",t)})}render(){const{vote:e}=this.props,{checkedId:t}=this.state,n=-1===t,a=n?"Välj ett alternativ":"Rösta";return l.a.createElement("div",null,l.a.createElement("strong",null,e.question),l.a.createElement("ul",null,e.alternatives.map(({text:e,id:n})=>l.a.createElement("li",{key:n},l.a.createElement("label",null,l.a.createElement("input",{type:"radio",checked:t===n,onChange:()=>this.onAlternativeChecked(n)})," "+e)))),l.a.createElement("button",{type:"button",disabled:n,onClick:this.placeVote},a))}}var i=c;var o=({showMessage:e,setLoading:t})=>{const[n,a]=Object(r.f)({endpoint:"/voting/votes/?current=true"});if(a&&e("Något gick fel","Logga ut eller refresha eller nåt.",!0),!n)return l.a.createElement(l.a.Fragment,null);if(0===n.length)return l.a.createElement("div",null,"Det finns ingen aktiv omröstning");const s=n[0];return s.has_voted?l.a.createElement("p",null,"Du har redan röstat i den nuvarande omröstningen."):l.a.createElement(i,{vote:s,onMessage:e,setLoading:t})};var u=()=>{const e=Object(a.useContext)(s.a)[1],[t,n]=Object(a.useState)(null),[r,c]=Object(a.useState)(!1);if(null!==t){const{title:e,content:a}=t;return l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",null,e),l.a.createElement("p",null,a),l.a.createElement("button",{type:"button",onClick:()=>n(null)},r?"Ladda om sidan":"Stäng"))}return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"D-cide"),l.a.createElement(o,{showMessage:(e,t,a)=>{c(a),n({title:e,content:t})},setLoading:e}))},d=n(51),h=n(43);t.default=()=>l.a.createElement(d.a,null,l.a.createElement(h.a,null,l.a.createElement(h.b,null,l.a.createElement(u,null))))}}]);
//# sourceMappingURL=component---src-components-vote-page-js-cbce40e5f72f3d4b7908.js.map