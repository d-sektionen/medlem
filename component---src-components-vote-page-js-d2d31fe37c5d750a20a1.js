(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{INns:function(t,e,n){"use strict";n("AqHK"),n("OeI1");var r=n("q1tI"),a=n.n(r),o=n("ubHu"),i=n.n(o),c=n("Rq/j");e.a=function(t){var e=t.title,n=t.choices,r=t.choice,o=t.setChoice,l=t.label,u=t.action,s=t.actionLabel;return a.a.createElement("div",{className:i.a.titleChooser},a.a.createElement("h1",null,e),n&&a.a.createElement("select",{onChange:function(t){var e=t.target.value,r=""===e?null:n.filter((function(t){return""+t.id===e}))[0];o(r)},value:r?r.id:""},a.a.createElement("option",{value:""}),n.map((function(t){return a.a.createElement("option",{value:t.id,key:t.id},t[l])}))),u&&a.a.createElement(c.a,{onClick:u},s))}},QaCa:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return u}));var r=n("q1tI"),a=n.n(r),o=n("ubHu"),i=n.n(o),c=function(t){var e=t.children;return a.a.createElement("ul",{className:i.a.list},e)},l=function(t){var e=t.title,n=t.subtitle,r=t.buttons;return a.a.createElement("li",null,a.a.createElement("div",{className:i.a.listText},a.a.createElement("h3",null,e),a.a.createElement("p",null,n)),a.a.createElement("div",{className:i.a.listButtons},r))},u=function(t){var e=t.href,n=t.onClick,r=t.iconComponent,o=t.text;return t.shown?a.a.createElement(a.a.Fragment,null,e?a.a.createElement("a",{className:i.a.listButton,href:e,onClick:n,title:o},a.a.createElement(r,null)):a.a.createElement("button",{className:i.a.listButton,type:"button",onClick:n,title:o},a.a.createElement(r,null))):a.a.createElement(a.a.Fragment,null)};u.defaultProps={shown:!0}},RJWs:function(t,e,n){n("rzGZ"),n("Dq+y"),n("q8oJ"),n("C9fy"),n("6kNP"),n("8npG"),n("LagC"),n("pJf4"),n("JHok"),n("pS08"),n("m210"),n("4DPX");var r=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function c(t,e,n,r){var a=e&&e.prototype instanceof s?e:s,o=Object.create(a.prototype),i=new k(r||[]);return o._invoke=function(t,e,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return L()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=E(i,n);if(c){if(c===u)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=l(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===u)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(t,n,i),o}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=c;var u={};function s(){}function f(){}function h(){}var d={};d[a]=function(){return this};var p=Object.getPrototypeOf,m=p&&p(p(x([])));m&&m!==e&&n.call(m,a)&&(d=m);var v=h.prototype=s.prototype=Object.create(d);function g(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function y(t){var e;this._invoke=function(r,a){function o(){return new Promise((function(e,o){!function e(r,a,o,i){var c=l(t[r],t,a);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"==typeof s&&n.call(s,"__await")?Promise.resolve(s.__await).then((function(t){e("next",t,o,i)}),(function(t){e("throw",t,o,i)})):Promise.resolve(s).then((function(t){u.value=t,o(u)}),(function(t){return e("throw",t,o,i)}))}i(c.arg)}(r,a,e,o)}))}return e=e?e.then(o,o):o()}}function E(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return u;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var r=l(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,u;var a=r.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,u):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,u)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function b(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function x(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:L}}function L(){return{value:void 0,done:!0}}return f.prototype=v.constructor=h,h.constructor=f,h[i]=f.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},g(y.prototype),y.prototype[o]=function(){return this},t.AsyncIterator=y,t.async=function(e,n,r,a){var o=new y(c(e,n,r,a));return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},g(v),v[i]="Generator",v[a]=function(){return this},v.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=x,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(b),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,u):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),u},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),b(n),u}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;b(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:x(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),u}},t}(t.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},"Z/Vw":function(t,e,n){"use strict";n.r(e);n("v9g0");var r=n("q1tI"),a=n.n(r),o=n("VtrM"),i=(n("pS08"),n("AqHK"),n("n7j8"),n("ZACD"));function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var l=function(t){var e,n;function r(e){var n;(n=t.call(this,e)||this).state={checkedId:-1};var r=n.props.onMessage;return n.onAlternativeChecked=n.onAlternativeChecked.bind(c(n)),n.placeVote=n.placeVote.bind(c(n)),n.showMessage=r,n}n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var o=r.prototype;return o.onAlternativeChecked=function(t){this.setState({checkedId:t})},o.placeVote=function(){var t=this.props,e=t.setLoading,n=t.vote,r=this.state.checkedId,a=this.showMessage,o={vote_id:n.id,alternative_id:r};e(!0),Object(i.f)("/voting/made_votes/",o).then((function(){e(!1),a("Tack!","Din röst har registrerats")})).catch((function(t){e(!1),a("Ett fel uppstod",t)}))},o.render=function(){var t=this,e=this.props.vote,n=this.state.checkedId,r=-1===n,o=r?"Välj ett alternativ":"Rösta";return a.a.createElement("div",null,a.a.createElement("strong",null,e.question),a.a.createElement("ul",null,e.alternatives.map((function(e){var r=e.text,o=e.id;return a.a.createElement("li",{key:o},a.a.createElement("label",null,a.a.createElement("input",{type:"radio",checked:n===o,onChange:function(){return t.onAlternativeChecked(o)}})," "+r))}))),a.a.createElement("button",{type:"button",disabled:r,onClick:this.placeVote},o))},r}(r.Component),u=function(t){var e=t.showMessage,n=t.setLoading,r=Object(o.b)("/voting/votes/?current=true"),i=r.data;if(r.error&&e("Något gick fel","Logga ut eller refresha eller nåt.",!0),!i)return a.a.createElement(a.a.Fragment,null);if(0===i.length)return a.a.createElement("div",null,"Det finns ingen aktiv omröstning");var c=i[0];return c.has_voted?a.a.createElement("p",null,"Du har redan röstat i den nuvarande omröstningen."):a.a.createElement(l,{vote:c,onMessage:e,setLoading:n})},s=n("8k0H"),f=function(){var t=Object(r.useContext)(s.a)[1],e=Object(r.useState)(null),n=e[0],o=e[1],i=Object(r.useState)(!1),c=i[0],l=i[1];if(null!==n){var f=n.title,h=n.content;return a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,f),a.a.createElement("p",null,h),a.a.createElement("button",{type:"button",onClick:function(){return o(null)}},c?"Ladda om sidan":"Stäng"))}return a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"Rösta"),a.a.createElement(u,{showMessage:function(t,e,n){l(n),o({title:t,content:e})},setLoading:t}))},h=n("r90U"),d=n("zw+i"),p=n("INns"),m=(n("YbXK"),n("cFtU"),n("q8oJ"),n("C9fy"),n("m210"),n("4DPX"),n("rzGZ"),n("MIFh"),n("6kNP"),n("8npG"),n("OeI1"),n("kD0k")),v=n.n(m),g=(n("ls82"),n("rT79")),y=n("QaCa"),E=n("Rq/j");function w(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function b(t,e,n,r,a,o,i){try{var c=t[o](i),l=c.value}catch(u){return void n(u)}c.done?e(l):Promise.resolve(l).then(r,a)}function k(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){b(o,r,a,i,c,"next",t)}function c(t){b(o,r,a,i,c,"throw",t)}i(void 0)}))}}var x=function(t){var e=t.meeting,n=Object(o.b)((function(){return e&&"/voting/speakers/?meeting_id="+e.id})),c=n.data,l=n.mutate,u=Object(r.useContext)(s.b)[0];return a.a.createElement("div",null,a.a.createElement("h2",null,"Talarlista"),a.a.createElement(E.a,{onClick:k(v.a.mark((function t(){var n,r;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(i.f)("/voting/speakers/",{meeting_id:e.id});case 2:n=t.sent,r=n.data,l([].concat(w(c),[r]));case 5:case"end":return t.stop()}}),t)})))},"Jag vill tala!"),a.a.createElement(y.a,null,c&&c.map((function(t){return a.a.createElement(y.c,{title:t.user.pretty_name,key:t.id,buttons:[a.a.createElement(y.b,{shown:u.id===t.user.id,onClick:k(v.a.mark((function n(){return v.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(i.b)("/voting/speakers/?meeting_id="+e.id);case 2:l(c.filter((function(e){return e.id!==t.id})));case 3:case"end":return n.stop()}}),n)}))),iconComponent:g.l,text:"Lämna talarlista",key:"remove"})]})}))))};n("pJf4");function L(t,e,n,r,a,o,i){try{var c=t[o](i),l=c.value}catch(u){return void n(u)}c.done?e(l):Promise.resolve(l).then(r,a)}function j(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){L(o,r,a,i,c,"next",t)}function c(t){L(o,r,a,i,c,"throw",t)}i(void 0)}))}}var _=function(t){var e=t.currentMeeting,n=t.revalidate;return a.a.createElement("div",null,a.a.createElement("h2",null,"Mötesinfo"),a.a.createElement("h3",null,e.name),a.a.createElement("p",null,a.a.createElement("strong",null,e.attending?"Du deltar på mötet.":"Du är inte registrerad på mötet.")),e.description&&a.a.createElement("p",{style:{whiteSpace:"pre-line"}},e.description),e.open_attendance&&a.a.createElement("p",null,e.attending?a.a.createElement(E.a,{onClick:j(v.a.mark((function t(){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(i.b)("/voting/attend/?meeting_id="+e.id);case 2:n();case 3:case"end":return t.stop()}}),t)})))},"Lämna röstlängden"):a.a.createElement(E.a,{onClick:j(v.a.mark((function t(){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(i.f)("/voting/attend/",{meeting_id:e.id});case 2:n();case 3:case"end":return t.stop()}}),t)})))},"Gå med i röstlängden")))};e.default=function(){var t=Object(r.useState)(null),e=t[0],n=t[1],i=Object(o.b)("/voting/meetings/"),c=i.data,l=i.revalidate;return Object(r.useEffect)((function(){e&&n(c.find((function(t){return t.id===e.id})))}),[c]),a.a.createElement(h.a,null,a.a.createElement(d.a,null,a.a.createElement(d.b,{fullWidth:!0},a.a.createElement(p.a,{title:"D-cide",choice:e,setChoice:n,choices:c,label:"name"})),e&&a.a.createElement(a.a.Fragment,null,a.a.createElement(d.b,null,a.a.createElement(_,{currentMeeting:e,revalidate:l})),a.a.createElement(d.b,null,a.a.createElement(f,null)),e.enable_speaker_requests&&a.a.createElement(d.b,null,a.a.createElement(x,{meeting:e})))))}},kD0k:function(t,e,n){t.exports=n("RJWs")}}]);
//# sourceMappingURL=component---src-components-vote-page-js-d2d31fe37c5d750a20a1.js.map