(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{234:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(10),i=(n(320),n(85),n(43));var o=n(222),u=n.n(o),l=function(e){var t=e.onSubmit,n=Object(a.useRef)(null),c=function(e,t){var n=Object(a.useState)(""),r=n[0],c=n[1],i=RegExp("^[A-Za-z0-9]+$"),o=function(t){var n=String.fromCharCode(t.keyCode);"Enter"===t.key?c(function(n){return""!==n&&e({text:n,shift:t.shiftKey}),""}):"Backspace"===t.key?c(function(e){return e.slice(0,-1)}):i.test(n)&&c(function(e){return e.length>20?e:""+e+n})};return Object(a.useEffect)(function(){return t?(t.current.addEventListener("keydown",o),function(){t.current.removeEventListener("keydown",o)}):function(){}},[e,t]),r}(t,n);return r.a.createElement("div",{ref:n,tabIndex:0,className:u.a.textField},c)},s=function(e){var t=e.onSubmit,n=Object(a.useState)(""),c=n[0],i=n[1];return r.a.createElement("input",{className:u.a.textField,onChange:function(e){i(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&i(function(e){return""!==e&&t({text:e}),""})},value:c})};var f={FiUserCheck:c.n,FiUserX:c.o},d=n(31),v=n(290),m=function(e){var t=e.onSubmit,n=Object(a.useRef)(null),c=Object(d.b)(),i=new v.BrowserQRCodeReader;return Object(a.useEffect)(function(){return i.decodeFromInputVideoDevice(void 0,n.current).then(function(e){t({text:e.text}),c()}).catch(function(e){return console.error(e)}),function(){return i.reset()}},[]),r.a.createElement("video",{ref:n,muted:!0,style:{display:"block"}})},b=n(44);var E=function(e){var t=e.events,n=Object(a.useState)(t[0]),o=n[0],v=n[1],E=Object(a.useState)(0),p=E[0],k=E[1],g=function(){var e=Object(a.useState)(null),t=e[0],n=e[1],r=null;return Object(a.useEffect)(function(){return function(){clearTimeout(r)}},[]),[t,function(e){clearTimeout(r),r=setTimeout(function(){n(null)},1500),n(e)}]}(),h=g[0],w=g[1],y=function(e,t){var n=Object(a.useState)(function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(a){return console.log(a),t}}),r=n[0],c=n[1];return[r,function(t){try{var n=t instanceof Function?t(r):t;c(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(a){console.log(a)}}]}("checkin-compatibility-mode",!1),O=y[0],S=y[1],j=function(e){var t=Object(a.useState)(!1),n=t[0],r=t[1];function c(t){t.key===e&&r(!0)}var i=function(t){t.key===e&&r(!1)};return Object(a.useEffect)(function(){return window.addEventListener("keydown",c),window.addEventListener("keyup",i),function(){window.removeEventListener("keydown",c),window.removeEventListener("keyup",i)}},[]),n}("Shift"),x=!O&&j?(p+1)%o.actions.length:p,C=function(e){var t=e.text;!function(e,t,n,a){var o=function(t,n,a){var i=a?r.a.createElement(c.q,null):r.a.createElement(c.b,null),o=f[n];e({text:t||(a?"Okänt fel.":"Allt gick väl, men det är oklart vad som faktiskt hände."),icon:o?r.a.createElement(o,null):i,class:a?u.a.fail:u.a.success})};Object(i.f)("/checkin/register/",{event:t,identifier:n,action:a}).then(function(e){var t,n;if(e.data){var a=e.data;t=a.detail,n=a.icon}o(t,n,!1)}).catch(function(e){var t,n;if(e.response&&e.response.data){var a=e.response.data;t=a.detail,n=a.icon}o(t,n,!0)})}(w,o.id,t,x)},N=Object(d.a)(m)[0];return o?r.a.createElement("div",{className:u.a.container+" "+(h&&h.class)},r.a.createElement("h1",null,"Bleep Bloop"),r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",checked:O,onChange:function(){return S(function(e){return!e})}}),"Kompatibilitetsläge"),r.a.createElement(b.b,{iconComponent:c.p,text:"QR",onClick:function(){return N("QR-registrering",{onSubmit:C},{noPadding:!0})}}),r.a.createElement("div",{className:u.a.controlContainer},r.a.createElement("select",{onChange:function(e){v(t.filter(function(t){return""+t.id===e.target.value})[0])},value:o.id},t.map(function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)})),O?r.a.createElement(s,{onSubmit:C}):r.a.createElement(l,{onSubmit:C}),o.actions.length>0&&r.a.createElement("select",{onChange:function(e){k(parseInt(e.target.value,10))},value:x,disabled:o.actions.length<2},o.actions.map(function(e,t){return r.a.createElement("option",{key:e,value:t},e)}))),o.actions.length>1&&!O&&r.a.createElement("p",null,"Håll ner shift för att temporärt byta funktion."),r.a.createElement("div",{className:u.a.feedback},h&&h.icon,r.a.createElement("p",null,h&&h.text))):"Du är inte dörrvakt på något evenemang."};t.default=function(){var e=Object(i.g)({endpoint:"/checkin/events/"})[0];return e?r.a.createElement(E,{events:e.reverse()}):null}}}]);
//# sourceMappingURL=component---src-components-checkin-page-js-c9d193193fb06333a8e1.js.map