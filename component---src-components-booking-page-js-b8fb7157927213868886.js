(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{232:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(30),i=n(43),c=n(42),u=n(226),l=n.n(u),s=n(35),m=n(33),d=n(367);n(227);function f(e){void 0===e&&(e=0);var t=new Date;return t.setHours(t.getHours()+2+e+Math.round(t.getMinutes()/60)),t.setMinutes(0),t}var b=function(e){var t=e.booking,n=e.item,o=e.createBooking,i=e.updateBooking,c=void 0===t,u=Object(a.useState)(t?t.description:""),l=u[0],m=u[1],b=Object(a.useState)(t?t.start:f()),g=b[0],p=b[1],v=Object(a.useState)(t?t.end:f(2)),k=v[0],E=v[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Bokning av ",n.name,"."),r.a.createElement("div",null,r.a.createElement(d.a,{selectsStart:!0,selected:g,startDate:g,endDate:k,onChange:function(e){return p(e)},minDate:new Date,maxDate:k,showTimeSelect:!0,timeFormat:"HH:mm",timeIntervals:15,dateFormat:"MMMM d, yyyy h:mm aa",timeCaption:"time"}),r.a.createElement(d.a,{selectsEnd:!0,selected:k,startDate:g,endDate:k,onChange:function(e){return E(e)},minDate:g,showTimeSelect:!0,timeFormat:"HH:mm",timeIntervals:15,dateFormat:"MMMM d, yyyy h:mm aa",timeCaption:"time"})),r.a.createElement("textarea",{value:l,onChange:function(e){return m(e.target.value)}}),r.a.createElement(s.a,{onClick:function(){(c?o({item_id:n.id,description:l,start:g,end:k}):i(t.id,{item_id:t.item.id,description:l,start:g,end:k})).then(function(e){console.log(e.data)}).catch(function(e){console.log(e.response.data)})}},"Save"))},g=function(e){var t=e.item,n=e.setItem,a=e.createBooking,o=Object(c.e)({endpoint:"/booking/items/"})[0],i=Object(m.a)(b)[0];return r.a.createElement(r.a.Fragment,null,r.a.createElement("select",{className:l.a.items,onChange:function(e){var t=e.target.value;n(""===t?null:o.filter(function(e){return""+e.id===t})[0])},value:t?t.id:""},r.a.createElement("option",{value:""},"Alla"),o&&o.map(function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)})),t&&r.a.createElement("p",null,t.description),t?r.a.createElement(s.a,{onClick:function(){return i("Boka "+t.name,{item:t,createBooking:a})}},"Boka ",t.name):r.a.createElement("p",null,"Välj ett objekt för att kunna boka."))},p=(n(23),n(316),n(265)),v=n.n(p),k=(n(284),n(252)),E=n(9);v.a.locale("sv");var h=function(e){return e.toLocaleDateString("sv-SE",{month:"short",day:"numeric",hour:"numeric",minute:"numeric"})},j=function(e){var t=e.booking;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Bokning av ",t.item.name,"."),r.a.createElement("p",null,v()(t.start).to(t.end,!0),", ",h(t.start)+" - "+h(t.end)),r.a.createElement("p",null,t.description))},O=n(17);v.a.locale("sv");var y=function(e){var t=e.item,n=e.bookings,o=e.listBookings,i=e.updateBooking,c=e.destroyBooking,u=Object(a.useContext)(O.b)[0],l=Object(a.useState)(!1),s=l[0],d=l[1],f=Object(m.a)(b)[0],g=Object(m.a)(j)[0];return Object(a.useEffect)(function(){o({item:t?t.id:void 0,future:!0,user:s?"me":void 0})},[t,s]),r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",onClick:function(e){d(e.target.checked)},value:s})," Visa endast mina bokningar.")),r.a.createElement(k.a,null,n&&n.map(function(e){return Object.assign({},e,{start:new Date(e.start),end:new Date(e.end)})}).sort(function(e,t){return e.start-t.start}).map(function(e){return r.a.createElement(k.c,{title:e.user.pretty_name,subtitle:(t?"":e.item.name+", ")+v()(e.start).calendar(),buttons:[r.a.createElement(k.b,{shown:e.user.username===u.username||u.privileges.booking_admin,iconComponent:E.k,text:"Ta bort bokning",onClick:function(){c(e.id)},key:"delete"}),r.a.createElement(k.b,{shown:e.user.username===u.username||u.privileges.booking_admin,iconComponent:E.c,text:"Redigera",onClick:function(){f("Redigera bokning av "+e.item.name,{booking:e,item:e.item,updateBooking:i})},key:"edit"}),r.a.createElement(k.b,{iconComponent:E.f,text:"Mer information",onClick:function(){g("Bokningsinformation",{booking:e})},key:"info"})],key:e.id})})))},C=n(243),B=function(){var e=Object(a.useState)(null),t=e[0],n=e[1],c=Object(C.a)({endpoint:"/booking/bookings/"}),u=c[0],l=u.list,s=u.create,m=u.destroy,d=u.update,f=c[1];return r.a.createElement(i.a,null,r.a.createElement(o.a,null,r.a.createElement(o.b,null,r.a.createElement(g,{setItem:n,item:t,createBooking:s})),r.a.createElement(o.b,null,r.a.createElement(y,{item:t,bookings:f,listBookings:l,updateBooking:d,destroyBooking:m}))))};t.default=function(){return r.a.createElement(B,null)}},243:function(e,t,n){"use strict";n(53),n(70),n(23);var a=n(1),r=n(17),o=n(42),i=function(){var e;return(e=Object.prototype.hasOwnProperty).call.apply(e,arguments)},c=function(e,t){var n=Object.assign({},e);return["endpoint","url"].forEach(function(e){i(n,e)&&(n=Object.assign({},n,{[e]:""+n[e]+t+"/"}))}),n};t.a=function(e){var t=Object(a.useContext)(r.a)[1],n=Object(a.useState)(null),u=n[0],l=n[1],s=Object(a.useState)(null),m=s[0],d=s[1];return[{list:function(n){return void 0===n&&(n={}),t(!0),Object(o.a)(Object.assign({},e,{params:Object.assign({},i(e,"params")?e.params:{},n),method:"get"})).then(function(e){return d(null),l(e.data),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})},retrieve:function(n,a){return void 0===a&&(a={}),t(!0),Object(o.a)(Object.assign({},c(e,n),{params:Object.assign({},i(e,"params")?e.params:{},a),method:"get"})).then(function(e){return d(null),l(function(t){return[].concat(t.filter(function(e){return e.id!==n}),[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})},update:function(n,a){return void 0===a&&(a={}),t(!0),Object(o.a)(Object.assign({},c(e,n),{data:a,method:"put"})).then(function(e){return d(null),l(function(t){return[].concat(t.filter(function(e){return e.id!==n}),[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})},create:function(n){return void 0===n&&(n={}),t(!0),Object(o.a)(Object.assign({},e,{data:n,method:"post"})).then(function(e){return d(null),l(function(t){return[].concat(t,[e.data])}),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})},destroy:function(n,a){return void 0===a&&(a={}),t(!0),Object(o.a)(Object.assign({},c(e,n),{data:a,method:"delete"})).then(function(e){return d(null),l(function(e){return e.filter(function(e){return e.id!==n})}),t(!1),Promise.resolve(e)}).catch(function(e){return d(e),t(!1),Promise.reject(e)})}},u,m]}},252:function(e,t,n){"use strict";n.d(t,"a",function(){return c}),n.d(t,"c",function(){return u}),n.d(t,"b",function(){return l});var a=n(1),r=n.n(a),o=n(22),i=n.n(o),c=function(e){var t=e.children;return r.a.createElement("ul",{className:i.a.list},t)},u=function(e){var t=e.title,n=e.subtitle,a=e.buttons;return r.a.createElement("li",null,r.a.createElement("div",{className:i.a.listText},r.a.createElement("h3",null,t),r.a.createElement("p",null,n)),r.a.createElement("div",{className:i.a.listButtons},a))},l=function(e){var t=e.onClick,n=e.iconComponent,a=e.text;return e.shown?r.a.createElement("button",{type:"button",onClick:t,title:a},r.a.createElement(n,null)):r.a.createElement(r.a.Fragment,null)};l.defaultProps={shown:!0}}}]);
//# sourceMappingURL=component---src-components-booking-page-js-b8fb7157927213868886.js.map