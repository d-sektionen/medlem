(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{230:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(32),o=n(43),c=n(42),u=n(220),l=n.n(u),s=n(34),m=n(31),d=n(252),f=n.n(d),b=(n(256),n(318),n(321),function(e){var t=e.value,n=e.onChange;return r.a.createElement("div",null,r.a.createElement("input",{type:"date",value:t.format("YYYY-MM-DD"),onChange:function(e){var a=e.target.value,r=parseInt(a.slice(0,4),10),i=parseInt(a.slice(5,7),10)-1,o=parseInt(a.slice(8,10),10);if(o&&i&&r){var c=f()(t).set({year:r,month:i,date:o});n(c)}}}),r.a.createElement("input",{type:"time",value:t.format("HH:mm"),onChange:function(e){var a=e.target.value,r=parseInt(a.slice(0,2),10),i=parseInt(a.slice(3,5),10);if(!Number.isNaN(r)&&!Number.isNaN(i)){var o=f()(t).set({hour:r,minute:i});n(o)}}}))}),v=n(17);function g(e){void 0===e&&(e=0);var t=new Date;return t.setHours(t.getHours()+2+e+Math.round(t.getMinutes()/60)),t.setMinutes(0),t}var p=function(e){var t=e.booking,n=e.item,i=e.createBooking,o=e.updateBooking,c=void 0===t,u=Object(a.useContext)(v.b)[0],d=Object(m.b)(),p=Object(a.useState)(t?t.description:""),k=p[0],E=p[1],h=Object(a.useState)(t?t.start:g()),j=h[0],y=h[1],O=Object(a.useState)(t?t.end:g(2)),w=O[0],C=O[1],B=Object(a.useState)({}),x=B[0],N=B[1],P=t?t.user.pretty_name:u.pretty_name;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Bokning av "+n.name+" för "+P+"."),r.a.createElement("div",null,r.a.createElement("div",null,x.start),r.a.createElement(b,{value:f()(j),onChange:y}),r.a.createElement("div",null,x.end),r.a.createElement(b,{value:f()(w),onChange:C})),r.a.createElement("div",null,r.a.createElement("div",null,x.description),r.a.createElement("textarea",{className:l.a.description,value:k,onChange:function(e){return E(e.target.value)}})),r.a.createElement("div",null,x.non_field_errors),r.a.createElement(s.a,{onClick:function(){(c?i({item_id:n.id,description:k,start:j,end:w}):o(t.id,{item_id:t.item.id,description:k,start:j,end:w})).then(function(){d()}).catch(function(e){N(e.response.data)})}},"Save"))};n(23);f.a.locale("sv");var k=function(e){return e.toLocaleDateString("sv-SE",{month:"short",day:"numeric",hour:"numeric",minute:"numeric"})},E=function(e){var t=e.booking;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Bokning av ",t.item.name," för ",t.user.pretty_name,"."),r.a.createElement("p",null,f()(t.start).to(t.end,!0),", ",k(t.start)+" - "+k(t.end)),r.a.createElement("p",null,t.description))},h=n(226),j=n.n(h),y=function(e,t){for(var n=function(e,t){var n=f()(e).startOf("day"),a=f.a.duration(e.diff(n)),r=f.a.duration(t.diff(e));return a.add(r).days()}(e,t),a=[[e,t]],r=1;r<=n;r+=1)a[r]=[f()(a[r-1][0]).add(1,"d").startOf("day"),a[r-1][1]],a[r-1][1]=f()(a[r-1][0]).endOf("day");return a},O=function(e){return 50*e.weekday()+50},w=function(e){var t=f()(e).startOf("day");return 10*f.a.duration(e.diff(t)).asHours()},C=function(e){var t=e.itemId,n=Object(c.f)({endpoint:"/booking/bookings/?item="+t})[0],i=Object(m.a)(E)[0],o=Object(a.useState)(f()().week()),u=o[0],l=o[1],s=f()();return r.a.createElement("div",null,r.a.createElement("div",null,"Vecka ",u,r.a.createElement("button",{type:"button",onClick:function(){return l(function(e){return e-1})}},"-"),r.a.createElement("button",{type:"button",onClick:function(){return l(f()().week())}},"nu"),r.a.createElement("button",{type:"button",onClick:function(){return l(function(e){return e+1})}},"+")),r.a.createElement("svg",{version:"1.1",viewBox:"0 0 400 240",xmlns:"http://www.w3.org/2000/svg"},n&&n.filter(function(e){var t=e.start,n=e.end,a=f()(t).week(),r=f()(n).week();return a===u||r===u}).map(function(e){var t=f()(e.start),n=f()(e.end),a=y(t,n);return r.a.createElement("g",{className:j.a.booking,key:e.id},a.filter(function(e){var t=e[0];return f()(t).week()===u}).map(function(t){var n,a,o=t[0],c=t[1];return r.a.createElement("rect",{key:e.id+", "+o.day(),x:O(o),y:w(o),width:"50",height:(n=o,a=c,10*f.a.duration(a.diff(n)).asHours()),stroke:"white",onClick:function(){return i("Bokningsinformation",{booking:Object.assign({},e,{start:new Date(e.start),end:new Date(e.end)})})}})}))}),r.a.createElement("g",{className:j.a.timeIndicators},[6,12,18].map(function(e){return r.a.createElement("g",{key:e},r.a.createElement("text",{x:"0",y:10*e-2},("0"+e).slice(-2),":00"),r.a.createElement("line",{x1:"0",y1:10*e,x2:"400",y2:10*e}))})),s.week()===u&&r.a.createElement("line",{x1:O(s),x2:O(s)+50,y1:w(s),y2:w(s),className:j.a.nowMarker}),r.a.createElement("line",{x1:"50",y1:"0",x2:"50",y2:"240",stroke:"lightgray"})))},B=function(e){var t=e.item,n=e.setItem,a=e.createBooking,i=Object(c.f)({endpoint:"/booking/items/"})[0],o=Object(m.a)(p)[0];return r.a.createElement(r.a.Fragment,null,r.a.createElement("select",{className:l.a.items,onChange:function(e){var t=e.target.value;n(""===t?null:i.filter(function(e){return""+e.id===t})[0])},value:t?t.id:""},r.a.createElement("option",{value:""},"Alla"),i&&i.map(function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)})),t?r.a.createElement("div",null,r.a.createElement("h2",null,"Beskrivning"),r.a.createElement("p",{className:l.a.itemDescription},t.description),r.a.createElement("h2",null,"Tillgänglighet"),r.a.createElement(C,{itemId:t.id}),r.a.createElement("h2",null,"Boka"),t.terms&&r.a.createElement("p",null,"Genom att boka "+t.name+" godkänner du ",r.a.createElement("a",{href:t.terms,target:"_blank",rel:"noopener noreferrer"},"bokningsavtalet"),"."),r.a.createElement(s.a,{onClick:function(){return o("Boka "+t.name,{item:t,createBooking:a})}},"Boka "+t.name)):r.a.createElement("p",null,"Välj ett objekt för att kunna boka."))},x=(n(322),n(253)),N=n(9);f.a.locale("sv");var P=function(e){var t=e.item,n=e.bookings,i=e.listBookings,o=e.updateBooking,c=e.destroyBooking,u=Object(a.useContext)(v.b)[0],l=Object(a.useState)(!1),s=l[0],d=l[1],b=Object(m.a)(p)[0],g=Object(m.a)(E)[0];return Object(a.useEffect)(function(){i({item:t?t.id:void 0,future:!0,user:s?"me":void 0})},[t,s]),r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",onClick:function(e){d(e.target.checked)},value:s})," Visa endast mina bokningar.")),r.a.createElement(x.a,null,n&&n.map(function(e){return Object.assign({},e,{start:new Date(e.start),end:new Date(e.end)})}).sort(function(e,t){return e.start-t.start}).map(function(e){return r.a.createElement(x.c,{title:e.user.pretty_name,subtitle:(t?"":e.item.name+", ")+f()(e.start).calendar(),buttons:[r.a.createElement(x.b,{shown:e.user.username===u.username||u.privileges.booking_admin,iconComponent:N.k,text:"Ta bort bokning",onClick:function(){c(e.id)},key:"delete"}),r.a.createElement(x.b,{shown:e.user.username===u.username||u.privileges.booking_admin,iconComponent:N.c,text:"Redigera",onClick:function(){b("Redigera bokning av "+e.item.name,{booking:e,item:e.item,updateBooking:o})},key:"edit"}),r.a.createElement(x.b,{iconComponent:N.f,text:"Mer information",onClick:function(){g("Bokningsinformation",{booking:e})},key:"info"})],key:e.id})})))},S=n(243),_=function(){var e=Object(a.useState)(null),t=e[0],n=e[1],c=Object(S.a)({endpoint:"/booking/bookings/"}),u=c[0],l=u.list,s=u.create,m=u.destroy,d=u.update,f=c[1];return r.a.createElement(o.a,null,r.a.createElement(i.a,null,r.a.createElement(i.b,null,r.a.createElement(B,{setItem:n,item:t,createBooking:s})),r.a.createElement(i.b,null,r.a.createElement(P,{item:t,bookings:f,listBookings:l,updateBooking:d,destroyBooking:m}))))};t.default=function(){return r.a.createElement(_,null)}},243:function(e,t,n){"use strict";n(53),n(70),n(23);var a=n(1),r=n(17),i=n(42),o=function(){var e;return(e=Object.prototype.hasOwnProperty).call.apply(e,arguments)},c=function(e,t){var n=Object.assign({},e);return["endpoint","url"].forEach(function(e){o(n,e)&&(n=Object.assign({},n,{[e]:""+n[e]+t+"/"}))}),n};t.a=function(e){var t=Object(a.useContext)(r.a)[1],n=Object(a.useState)(null),u=n[0],l=n[1],s=Object(a.useState)(null),m=s[0],d=s[1];return[{list:function(n){return void 0===n&&(n={}),t(!0),Object(i.a)(Object.assign({},e,{params:Object.assign({},o(e,"params")?e.params:{},n),method:"get"})).then(function(e){return d(null),l(e.data),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})},retrieve:function(n,a){return void 0===a&&(a={}),t(!0),Object(i.a)(Object.assign({},c(e,n),{params:Object.assign({},o(e,"params")?e.params:{},a),method:"get"})).then(function(e){return d(null),l(function(t){return[].concat(t.filter(function(e){return e.id!==n}),[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})},update:function(n,a){return void 0===a&&(a={}),t(!0),Object(i.a)(Object.assign({},c(e,n),{data:a,method:"put"})).then(function(e){return d(null),l(function(t){return[].concat(t.filter(function(e){return e.id!==n}),[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})},create:function(n){return void 0===n&&(n={}),t(!0),Object(i.a)(Object.assign({},e,{data:n,method:"post"})).then(function(e){return d(null),l(function(t){return[].concat(t,[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})},destroy:function(n,a){return void 0===a&&(a={}),t(!0),Object(i.a)(Object.assign({},c(e,n),{data:a,method:"delete"})).then(function(e){return d(null),l(function(e){return e.filter(function(e){return e.id!==n})}),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})}},u,m]}},253:function(e,t,n){"use strict";n.d(t,"a",function(){return c}),n.d(t,"c",function(){return u}),n.d(t,"b",function(){return l});var a=n(1),r=n.n(a),i=n(22),o=n.n(i),c=function(e){var t=e.children;return r.a.createElement("ul",{className:o.a.list},t)},u=function(e){var t=e.title,n=e.subtitle,a=e.buttons;return r.a.createElement("li",null,r.a.createElement("div",{className:o.a.listText},r.a.createElement("h3",null,t),r.a.createElement("p",null,n)),r.a.createElement("div",{className:o.a.listButtons},a))},l=function(e){var t=e.onClick,n=e.iconComponent,a=e.text;return e.shown?r.a.createElement("button",{type:"button",onClick:t,title:a},r.a.createElement(n,null)):r.a.createElement(r.a.Fragment,null)};l.defaultProps={shown:!0}}}]);
//# sourceMappingURL=component---src-components-booking-page-js-4be2576cb4897a448c12.js.map