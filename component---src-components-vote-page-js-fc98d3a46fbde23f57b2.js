(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{INns:function(t,e,n){"use strict";n("AqHK"),n("OeI1");var r=n("q1tI"),a=n.n(r),i=n("ubHu"),o=n.n(i),c=n("Rq/j");e.a=function(t){var e=t.title,n=t.choices,r=t.choice,i=t.setChoice,u=t.label,l=t.action,s=t.actionLabel;return a.a.createElement("div",{className:o.a.titleChooser},a.a.createElement("h1",null,e),n&&a.a.createElement("select",{onChange:function(t){var e=t.target.value,r=""===e?null:n.filter((function(t){return""+t.id===e}))[0];i(r)},value:r?r.id:""},a.a.createElement("option",{value:""}),n.map((function(t){return a.a.createElement("option",{value:t.id,key:t.id},t[u])}))),l&&a.a.createElement(c.a,{onClick:l},s))}},QaCa:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return u})),n.d(e,"b",(function(){return l}));var r=n("q1tI"),a=n.n(r),i=n("ubHu"),o=n.n(i),c=function(t){var e=t.children;return a.a.createElement("ul",{className:o.a.list},e)},u=function(t){var e=t.title,n=t.subtitle,r=t.buttons;return a.a.createElement("li",null,a.a.createElement("div",{className:o.a.listText},a.a.createElement("h3",null,e),a.a.createElement("p",null,n)),a.a.createElement("div",{className:o.a.listButtons},r))},l=function(t){var e=t.href,n=t.onClick,r=t.iconComponent,i=t.text;return t.shown?a.a.createElement(a.a.Fragment,null,e?a.a.createElement("a",{className:o.a.listButton,href:e,onClick:n,title:i},a.a.createElement(r,null)):a.a.createElement("button",{className:o.a.listButton,type:"button",onClick:n,title:i},a.a.createElement(r,null))):a.a.createElement(a.a.Fragment,null)};l.defaultProps={shown:!0}},RJWs:function(t,e,n){n("rzGZ"),n("Dq+y"),n("q8oJ"),n("C9fy"),n("6kNP"),n("8npG"),n("LagC"),n("pJf4"),n("JHok"),n("pS08"),n("m210"),n("4DPX");var r=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",o=r.toStringTag||"@@toStringTag";function c(t,e,n,r){var a=e&&e.prototype instanceof s?e:s,i=Object.create(a.prototype),o=new k(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(a,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw i;return L()}for(n.method=a,n.arg=i;;){var o=n.delegate;if(o){var c=E(o,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=u(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(t,n,o),i}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=c;var l={};function s(){}function f(){}function h(){}var m={};m[a]=function(){return this};var p=Object.getPrototypeOf,d=p&&p(p(x([])));d&&d!==e&&n.call(d,a)&&(m=d);var v=h.prototype=s.prototype=Object.create(m);function g(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function y(t){var e;this._invoke=function(r,a){function i(){return new Promise((function(e,i){!function e(r,a,i,o){var c=u(t[r],t,a);if("throw"!==c.type){var l=c.arg,s=l.value;return s&&"object"==typeof s&&n.call(s,"__await")?Promise.resolve(s.__await).then((function(t){e("next",t,i,o)}),(function(t){e("throw",t,i,o)})):Promise.resolve(s).then((function(t){l.value=t,i(l)}),(function(t){return e("throw",t,i,o)}))}o(c.arg)}(r,a,e,i)}))}return e=e?e.then(i,i):i()}}function E(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=u(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var a=r.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function b(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function x(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:L}}function L(){return{value:void 0,done:!0}}return f.prototype=v.constructor=h,h.constructor=f,h[o]=f.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,o in t||(t[o]="GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},g(y.prototype),y.prototype[i]=function(){return this},t.AsyncIterator=y,t.async=function(e,n,r,a){var i=new y(c(e,n,r,a));return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},g(v),v[o]="Generator",v[a]=function(){return this},v.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=x,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(b),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return o.type="throw",o.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],o=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),b(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;b(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:x(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},"Z/Vw":function(t,e,n){"use strict";n.r(e);n("v9g0");var r=n("q1tI"),a=n.n(r),i=n("VtrM"),o=n("r90U"),c=n("zw+i"),u=n("INns"),l=(n("YbXK"),n("cFtU"),n("q8oJ"),n("C9fy"),n("m210"),n("4DPX"),n("rzGZ"),n("MIFh"),n("6kNP"),n("8npG"),n("OeI1"),n("AqHK"),n("kD0k")),s=n.n(l),f=(n("ls82"),n("rT79")),h=n("QaCa"),m=n("Rq/j"),p=n("8k0H"),d=n("ZACD");function v(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function g(t,e,n,r,a,i,o){try{var c=t[i](o),u=c.value}catch(l){return void n(l)}c.done?e(u):Promise.resolve(u).then(r,a)}function y(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var i=t.apply(e,n);function o(t){g(i,r,a,o,c,"next",t)}function c(t){g(i,r,a,o,c,"throw",t)}o(void 0)}))}}var E=function(t){var e=t.meeting,n=Object(i.b)((function(){return e&&"/voting/speakers/?meeting_id="+e.id})),o=n.data,c=n.mutate,u=Object(r.useContext)(p.b)[0],l=e.attending?"Talarlista är inaktiverad för mötet.":"Du måste vara registrerad på mötet för att kunna skriva upp dig på talarlistan.";return a.a.createElement("div",null,a.a.createElement("h2",null,"Talarlista"),e.attending&&e.enable_speaker_requests?a.a.createElement(m.b,null,a.a.createElement(m.a,{onClick:y(s.a.mark((function t(){var n,r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.f)("/voting/speakers/",{meeting_id:e.id});case 2:n=t.sent,r=n.data,c([].concat(v(o),[r]));case 5:case"end":return t.stop()}}),t)})))},"Jag vill tala!"),a.a.createElement(m.a,{onClick:y(s.a.mark((function t(){var n,r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.f)("/voting/speakers/",{meeting_id:e.id,prioritized:!0});case 2:n=t.sent,r=n.data,c([].concat(v(o),[r]));case 5:case"end":return t.stop()}}),t)})))},"Replik!")):a.a.createElement("p",null,l),a.a.createElement(h.a,null,o&&o.map((function(t){return a.a.createElement(h.c,{title:t.user.pretty_name,subtitle:t.prioritized?"Replik":null,key:t.id,buttons:[a.a.createElement(h.b,{shown:u.id===t.user.id,onClick:y(s.a.mark((function n(){var r;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.prioritized?"&prioritized":"",n.next=3,Object(d.b)("/voting/speakers/?meeting_id="+e.id+r);case 3:c(o.filter((function(e){return e.id!==t.id})));case 4:case"end":return n.stop()}}),n)}))),iconComponent:f.l,text:"Lämna talarlista",key:"remove"})]})}))))};n("pJf4");function w(t,e,n,r,a,i,o){try{var c=t[i](o),u=c.value}catch(l){return void n(l)}c.done?e(u):Promise.resolve(u).then(r,a)}function b(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var i=t.apply(e,n);function o(t){w(i,r,a,o,c,"next",t)}function c(t){w(i,r,a,o,c,"throw",t)}o(void 0)}))}}var k=function(t){var e=t.currentMeeting,n=t.revalidate;return a.a.createElement("div",null,a.a.createElement("h2",null,"Mötesinfo"),a.a.createElement("h3",null,e.name),a.a.createElement("p",null,a.a.createElement("strong",null,e.attending?"Du deltar på mötet.":"Du är inte registrerad på mötet.")),e.description&&a.a.createElement("p",{style:{whiteSpace:"pre-line"}},e.description),e.open_attendance&&a.a.createElement("p",null,e.attending?a.a.createElement(m.a,{onClick:b(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.b)("/voting/attend/?meeting_id="+e.id);case 2:n();case 3:case"end":return t.stop()}}),t)})))},"Lämna röstlängden"):a.a.createElement(m.a,{onClick:b(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.f)("/voting/attend/",{meeting_id:e.id});case 2:n();case 3:case"end":return t.stop()}}),t)})))},"Gå med i röstlängden")))};function x(t,e,n,r,a,i,o){try{var c=t[i](o),u=c.value}catch(l){return void n(l)}c.done?e(u):Promise.resolve(u).then(r,a)}var L=function(t){var e=t.vote,n=Object(r.useState)(-1),i=n[0],o=n[1],c=Object(r.useState)(!1),u=c[0],l=c[1],f=function(){var t,n=(t=s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={vote_id:e.id,alternative_id:i},t.next=3,Object(d.f)("/voting/made_votes/",n);case 3:l(!0);case 4:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,a){var i=t.apply(e,n);function o(t){x(i,r,a,o,c,"next",t)}function c(t){x(i,r,a,o,c,"throw",t)}o(void 0)}))});return function(){return n.apply(this,arguments)}}(),h=-1===i,m=h?"Välj ett alternativ":"Rösta",p=u?"Tack för din röst!":"Du har röstat i omröstningen.";return a.a.createElement("div",null,a.a.createElement("strong",null,e.question),e.has_voted||u?a.a.createElement("p",null,p):a.a.createElement(a.a.Fragment,null,a.a.createElement("ul",null,e.alternatives.map((function(t){var e=t.text,n=t.id;return a.a.createElement("li",{key:n},a.a.createElement("label",null,a.a.createElement("input",{type:"radio",checked:i===n,onChange:function(){return o(n)}})," "+e))}))),a.a.createElement("button",{type:"button",disabled:h,onClick:f},m)))},j=function(t){var e=t.meeting,n=Object(i.b)((function(){return"/voting/votes/?meeting_id="+e.id})),o=n.data,c=(n.error,n.revalidate);return Object(r.useEffect)((function(){c()}),[e]),a.a.createElement("div",null,a.a.createElement("h2",null,"Rösta"),o&&a.a.createElement(a.a.Fragment,null,0===o.length&&a.a.createElement("p",null,"Det finns ingen aktiv omröstning"),o.map((function(t){return a.a.createElement(L,{key:t.id,vote:t})}))))};e.default=function(t){var e=t.pageContext.title,n=Object(r.useState)(null),l=n[0],s=n[1],f=Object(i.b)("/voting/meetings/"),h=f.data,m=f.revalidate;return Object(r.useEffect)((function(){l&&s(h.find((function(t){return t.id===l.id})))}),[h]),a.a.createElement(o.a,null,a.a.createElement(c.a,null,a.a.createElement(c.b,{fullWidth:!0},a.a.createElement(u.a,{title:e,choice:l,setChoice:s,choices:h,label:"name"})),l&&a.a.createElement(a.a.Fragment,null,a.a.createElement(c.b,null,a.a.createElement(k,{currentMeeting:l,revalidate:m})),a.a.createElement(c.b,null,a.a.createElement(j,{meeting:l})),a.a.createElement(c.b,null,a.a.createElement(E,{meeting:l})))))}},kD0k:function(t,e,n){t.exports=n("RJWs")}}]);
//# sourceMappingURL=component---src-components-vote-page-js-fc98d3a46fbde23f57b2.js.map