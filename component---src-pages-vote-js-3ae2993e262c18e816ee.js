(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{188:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),o=n(41),r=n(2),i=n.n(r),l=n(6),c=n.n(l),u=n(62),d=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={checkedId:-1},n.onAlternativeChecked=n.onAlternativeChecked.bind(c()(c()(n))),n.placeVote=n.placeVote.bind(c()(c()(n))),n.showMessage=n.props.onMessage,n}i()(t,e);var n=t.prototype;return n.onAlternativeChecked=function(e){this.setState({checkedId:e})},n.placeVote=function(){var e=this.props,t=e.setLoading,n=e.vote,a=this.showMessage,s={vote_id:n.id,alternative_id:this.state.checkedId};t(!0),Object(u.c)("/voting/made_votes/",s).then(function(e){t(!1),a("Tack!","Din röst har registrerats")}).catch(function(e){t(!1),a("Ett fel uppstod",e)})},n.render=function(){var e=this,t=this.props.vote,n=this.state.checkedId,a=-1===n,o=a?"Välj ett alternativ":"Rösta";return s.a.createElement("div",null,s.a.createElement("strong",null,t.question),s.a.createElement("ul",null,t.alternatives.map(function(t){var a=t.text,o=t.id;return s.a.createElement("li",{key:o},s.a.createElement("label",null,s.a.createElement("input",{type:"radio",checked:n===o,onChange:function(){return e.onAlternativeChecked(o)}})," ",a))})),s.a.createElement("button",{type:"button",disabled:a,onClick:this.placeVote},o))},t}(a.Component),h=function(e){var t=e.votes,n=e.onMessage,a=e.setLoading;if(0===t.length)return s.a.createElement("div",null,"Det finns ingen aktiv omröstning");var o=t[0];return o.has_voted?s.a.createElement("p",null,"Du har redan röstat i den nuvarande omröstningen."):s.a.createElement(d,{vote:o,onMessage:n,setLoading:a})},g=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={message:null,displayReloadCloseText:!1},n.showMessage=n.showMessage.bind(c()(c()(n))),n.closeMessage=n.closeMessage.bind(c()(c()(n))),n.onRequestFailed=n.onRequestFailed.bind(c()(c()(n))),n}i()(t,e);var n=t.prototype;return n.showMessage=function(e,t,n){this.setState({displayReloadCloseText:n,message:{title:e,content:t}})},n.closeMessage=function(){this.setState({message:null})},n.onRequestFailed=function(){this.showMessage("Något gick fel","Logga ut eller refresha eller nåt.",!0)},n.render=function(){var e=this,t=this.props.setLoading;if(null!==this.state.message){var n=this.state,a=n.displayReloadCloseText,o=n.message,r=o.title,i=o.content;return s.a.createElement(s.a.Fragment,null,s.a.createElement("h3",null,r),s.a.createElement("p",null,i),s.a.createElement("button",{type:"button",onClick:this.closeMessage},a?"Ladda om sidan":"Stäng"))}return s.a.createElement(u.a,{endpoint:"/voting/votes/?current=true",onError:this.onRequestFailed},function(n){return s.a.createElement(s.a.Fragment,null,s.a.createElement("h1",null,"D-cide"),s.a.createElement(h,{votes:n,onMessage:e.showMessage,setLoading:t}))})},t}(a.Component);t.default=function(){return s.a.createElement(o.a.Consumer,null,function(e){return s.a.createElement(g,{setLoading:e.set})})}}}]);
//# sourceMappingURL=component---src-pages-vote-js-3ae2993e262c18e816ee.js.map