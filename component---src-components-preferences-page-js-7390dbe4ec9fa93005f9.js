(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{G7rm:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a("q1tI"),r=a.n(n),l=a("zGz4"),c=a("Rq/j"),s=a("Y7rJ"),i=a.n(s);const o=({text:e,onAccept:t,onDecline:a})=>{const n=Object(l.b)();return r.a.createElement("div",{className:i.a.confirmation},r.a.createElement("p",null,e),r.a.createElement(c.a,{onClick:()=>{a(),n()}},"Nej"),r.a.createElement(c.a,{onClick:()=>{t(),n()}},"Ja"))};function u(){const[e,t]=Object(l.a)(o);return[(t,a,n)=>{e("",{text:t,onAccept:a,onDecline:n})},t]}o.defaultProps={text:"Är du säker?",onAccept:()=>{},onDecline:()=>{}}},kRcL:function(e,t,a){e.exports={label:"form-module--label--1D42h",inputWrapper:"form-module--inputWrapper--1aGr5",required:"form-module--required--1fgVY"}},noUn:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),l=a("ZACD"),c=a("X0yR"),s=a("kRcL"),i=a.n(s);var o=({value:e,onChange:t,type:a,label:n,required:l,min_value:s,max_value:o,min_length:u,max_length:m})=>{const d=e=>{t(e.target.value)},p={datetime:r.a.createElement(c.a,{value:e,onChange:t}),date:r.a.createElement("input",{type:"date",value:e,onChange:d}),boolean:r.a.createElement("input",{type:"checkbox",checked:e,onChange:e=>{t(e.target.checked)}}),integer:r.a.createElement("input",{type:"number",value:e,onChange:d,max:o,min:s})},b=Object.prototype.hasOwnProperty.call(p,a)?p[a]:r.a.createElement("input",{value:e,onChange:d,maxLength:m,minLength:u});return r.a.createElement("label",{className:i.a.label},""+n,l&&r.a.createElement("span",{className:i.a.required},"*"),r.a.createElement("div",{className:i.a.inputWrapper},b))},u=a("Rq/j");const m=({endpoint:e,method:t,customFetcher:a,onSubmit:c,defaults:s})=>{const{0:i,1:m}=Object(n.useState)(),{0:d,1:p}=Object(n.useState)(s),{0:b,1:h}=Object(n.useState)({});return Object(n.useEffect)(()=>{Object(l.d)(e).then(e=>{const t=e.data.actions.POST,a=Object.keys(t).map(e=>({key:e,...t[e]})).filter(e=>!e.read_only);m(a)}).catch(e=>{})},e),r.a.createElement("form",{onSubmit:n=>{n.preventDefault(),c(),a?a(d).catch(e=>{e.response&&h(e.response.data)}):Object(l.a)({endpoint:e,method:t,data:d})}},i&&i.map(e=>r.a.createElement(r.a.Fragment,{key:e.key},r.a.createElement(o,Object.assign({},e,{onChange:t=>{((e,t)=>{p(a=>({...a,[e]:t}))})(e.key,t)},value:d[e.key]})),Object.prototype.hasOwnProperty.call(b,e.key)&&r.a.createElement("div",null,b[e.key].join(", ")))),r.a.createElement(u.a,{type:"submit",onClick:()=>{}},"Submit"))};m.defaultProps={method:"POST",customFetcher:null,onSubmit:()=>{},defaults:{}};t.a=m},"sM+Y":function(e,t,a){e.exports={inputLabel:"preferences-module--inputLabel--1lXCa",error:"preferences-module--error--LGCZX",success:"preferences-module--success--2LP8p",calendarSubNotice:"preferences-module--calendarSubNotice--2K4Ut"}},vwZb:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),l=a("8k0H"),c=a("JX7q"),s=a("dI71"),i=a("ZACD"),o=a("sM+Y"),u=a.n(o),m=a("Rq/j");var d=function(e){function t(t){var a;return a=e.call(this,t)||this,t.user.profile||(t.user.profile={}),a.state={infomailSubscriber:t.user.profile.infomail_subscriber,liuCardId:t.user.profile.liu_card_id,firstName:t.user.first_name,lastName:t.user.last_name,errors:{}},a.handleChange=a.handleChange.bind(Object(c.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(c.a)(a)),a}Object(s.a)(t,e);var a=t.prototype;return a.handleChange=function(e,t,a=!1){a?this.setState({[e]:t.target.checked}):this.setState({[e]:t.target.value})},a.handleSubmit=function(e){const{setLoading:t,setUser:a}=this.props;this.setState({error:void 0,success:void 0,errors:{}}),t(!0),Object(i.g)("/account/profile/",{first_name:this.state.firstName,last_name:this.state.lastName,liu_card_id:this.state.liuCardId,infomail_subscriber:this.state.infomailSubscriber}).then(e=>{t(!1),e.status<300&&(this.setState({success:"Ändringarna har sparats."}),a(t=>({...t,first_name:e.data.firstName,last_name:e.data.lastName,profile:{...t.profile,liu_card_id:e.data.liu_card_id,infomail_subscriber:e.data.infomail_subscriber}})))}).catch(e=>{console.log(e),t(!1),e.response?400===e.response.status?this.setState({errors:e.response.data}):this.setState({error:"Något gick fel."}):this.setState({error:"Nätverksfel."})}),e.preventDefault()},a.render=function(){const{user:e}=this.props,{firstName:t,lastName:a,liuCardId:n,infomailSubscriber:l,errors:c,error:s,success:i}=this.state;return r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("h2",null,"Profil"),r.a.createElement("p",null,r.a.createElement("strong",null,e.membership?"Du är sektionsmedlem.":"Du saknar sektionsmedlemsskap.")),r.a.createElement("div",null,r.a.createElement("label",{className:u.a.inputLabel},"Förnamn:",r.a.createElement("input",{value:t,onChange:e=>this.handleChange("firstName",e)})),c.first_name&&r.a.createElement("div",{className:u.a.error},c.first_name)),r.a.createElement("div",null,r.a.createElement("label",{className:u.a.inputLabel},"Efternamn:",r.a.createElement("input",{value:a,onChange:e=>this.handleChange("lastName",e)})),c.last_name&&r.a.createElement("div",{className:u.a.error},c.last_name)),r.a.createElement("div",null,r.a.createElement("label",{className:u.a.inputLabel},"LiU-kortnummer:",r.a.createElement("input",{value:n,onChange:e=>this.handleChange("liuCardId",e)})),c.profile&&c.profile.liu_card_id&&r.a.createElement("div",{className:u.a.error},c.profile.liu_card_id)),r.a.createElement("div",null,r.a.createElement("label",{className:u.a.inputLabel},"Prenumerera på veckomailet:",r.a.createElement("input",{type:"checkbox",checked:l,onChange:e=>this.handleChange("infomailSubscriber",e,!0)})),c.profile&&c.profile.infomail_subscriber&&r.a.createElement("div",{className:u.a.error},c.profile.infomail_subscriber)),r.a.createElement("div",null,r.a.createElement(m.a,{type:"submit"},"Spara")),r.a.createElement("div",null,s&&r.a.createElement("div",{className:u.a.error},s),i&&r.a.createElement("div",{className:u.a.success},i)))},t}(n.Component),p=a("r90U"),b=a("zw+i"),h=a("KQm4"),f=a("VtrM"),E=a("Tgqd"),v=a("QaCa"),g=a("G7rm"),k=a("noUn");var _=({create:e})=>r.a.createElement(k.a,{endpoint:"/account/calendar-subscriptions/",customFetcher:e,defaults:{include_bookings:!0,include_events_attending:!0,include_events_not_attending:!0}}),C=a("zGz4");var N=({url:e})=>r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Denna webbadress kan importeras i ditt kalenderprogram. Länken kommer automatiskt hållas uppdaterad med nya händelser."),r.a.createElement("div",{className:u.a.calendarSubNotice},r.a.createElement("input",{value:e,readOnly:!0}),r.a.createElement(m.a,{onClick:()=>{navigator.clipboard.writeText(e)}},"Kopiera")));const j=e=>{const t=[];e.include_bookings&&t.push("bokningar"),e.include_events_attending&&t.push("anmälda evenemang"),e.include_events_not_attending&&t.push("oanmälda evenemang");const a=t.join(", ");return a.charAt(0).toUpperCase()+a.substring(1)};var y=()=>{const[e]=Object(C.a)(_),[t]=Object(C.a)(N),[a]=Object(g.a)(),n=Object(C.b)(),{data:l,mutate:c}=Object(f.b)("/account/calendar-subscriptions/");return r.a.createElement("div",null,r.a.createElement("h2",null,"Kalenderprenumerationer"),r.a.createElement(v.a,null,l&&l.map(e=>r.a.createElement(v.c,{title:j(e),key:e.id,buttons:[r.a.createElement(v.b,{iconComponent:E.h,text:"Visa länk",onClick:()=>{t("Prenumerationslänk",{url:e.url})},key:"view"}),r.a.createElement(v.b,{iconComponent:E.m,text:"Ta bort prenumeration",onClick:()=>{a("Är du säker på att du vill ta bort prenumerationen?",async()=>{await Object(i.b)(`/account/calendar-subscriptions/${e.id}/`),c(l.filter(t=>t.id!==e.id))})},key:"delete"})]}))),r.a.createElement(m.a,{onClick:()=>{e("Ny prenumeration",{create:async e=>{const{data:t}=await Object(i.f)("/account/calendar-subscriptions/",e);c([].concat(Object(h.a)(l),[t])),n()}})}},"Ny prenumeration"))},O=a("INns");t.default=({pageContext:{title:e}})=>{const t=Object(n.useContext)(l.a)[1],{0:a,1:c}=Object(n.useContext)(l.b);return r.a.createElement(p.a,null,r.a.createElement(b.a,null,r.a.createElement(b.b,{fullWidth:!0},r.a.createElement(O.a,{title:e})),r.a.createElement(b.b,null,r.a.createElement(d,{user:a,setUser:c,setLoading:t})),r.a.createElement(b.b,null,r.a.createElement(y,null))))}}}]);
//# sourceMappingURL=component---src-components-preferences-page-js-7390dbe4ec9fa93005f9.js.map