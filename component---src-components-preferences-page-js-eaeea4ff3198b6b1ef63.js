"use strict";(self.webpackChunkmedlem=self.webpackChunkmedlem||[]).push([[202],{3819:function(e,t,n){n.d(t,{Z:function(){return d}});var a={};n.r(a),n.d(a,{__:function(){return s},cW:function(){return c}});var r=n(7294),l=n(8043),i=n(780),s="form-module--Label--ab587",c="form-module--inputWrapper--1111e";var o=e=>{let{value:t,onChange:n,type:l,label:o,required:u,min_value:m,max_value:d,min_length:p,max_length:h}=e;const f=e=>{n(e.target.value)},b={datetime:r.createElement(i.Z,{value:t,onChange:n}),date:r.createElement("input",{type:"date",value:t,onChange:f}),boolean:r.createElement("input",{type:"checkbox",checked:t,onChange:e=>{n(e.target.checked)}}),integer:r.createElement("input",{type:"number",value:t,onChange:f,max:d,min:m})},E=Object.prototype.hasOwnProperty.call(b,l)?b[l]:r.createElement("input",{value:t,onChange:f,maxLength:h,minLength:p});return r.createElement("label",{className:s},""+o,u&&r.createElement("span",{className:a.Required},"*"),r.createElement("div",{className:c},E))},u=n(7580);const m=e=>{let{endpoint:t,method:n,customFetcher:a,onSubmit:i,defaults:s}=e;const{0:c,1:m}=(0,r.useState)(),{0:d,1:p}=(0,r.useState)(s),{0:h,1:f}=(0,r.useState)({});return(0,r.useEffect)((()=>{(0,l.jz)(t).then((e=>{const t=e.data.actions.POST,n=Object.keys(t).map((e=>({key:e,...t[e]}))).filter((e=>!e.read_only));m(n)})).catch((e=>{}))}),t),r.createElement("form",{onSubmit:e=>{e.preventDefault(),i(),a?a(d).catch((e=>{e.response&&f(e.response.data)})):(0,l.ZP)({endpoint:t,method:n,data:d})}},c&&c.map((e=>r.createElement(r.Fragment,{key:e.key},r.createElement(o,Object.assign({},e,{onChange:t=>{((e,t)=>{p((n=>({...n,[e]:t})))})(e.key,t)},value:d[e.key]})),Object.prototype.hasOwnProperty.call(h,e.key)&&r.createElement("div",null,h[e.key].join(", "))))),r.createElement(u.zx,{type:"submit",onClick:()=>{}},"Submit"))};m.defaultProps={method:"POST",customFetcher:null,onSubmit:()=>{},defaults:{}};var d=m},8857:function(e,t,n){n.d(t,{Z:function(){return c}});var a=n(7294),r=n(8829),l=n(7580),i=n(6102);const s=e=>{let{text:t,onAccept:n,onDecline:s}=e;const c=(0,r._)();return a.createElement("div",{className:i.y5},a.createElement("p",null,t),a.createElement(l.zx,{onClick:()=>{s(),c()}},"Nej"),a.createElement(l.zx,{onClick:()=>{n(),c()}},"Ja"))};function c(){const[e,t]=(0,r.Z)(s);return[(t,n,a)=>{e("",{text:t,onAccept:n,onDecline:a})},t]}s.defaultProps={text:"Är du säker?",onAccept:()=>{},onDecline:()=>{}}},9340:function(e,t,n){n.r(t),n.d(t,{default:function(){return x}});var a=n(7294),r=n(2525),l=n(7326),i=n(1721),s=n(8043),c="preferences-module--Error--64b4f",o="preferences-module--inputLabel--8938d",u=n(7580);var m=function(e){function t(t){var n;return n=e.call(this,t)||this,t.user.profile||(t.user.profile={}),n.state={infomailSubscriber:t.user.profile.infomail_subscriber,liuCardId:t.user.profile.liu_card_id,firstName:t.user.first_name,lastName:t.user.last_name,errors:{}},n.handleChange=n.handleChange.bind((0,l.Z)(n)),n.handleSubmit=n.handleSubmit.bind((0,l.Z)(n)),n}(0,i.Z)(t,e);var n=t.prototype;return n.handleChange=function(e,t,n){void 0===n&&(n=!1),n?this.setState({[e]:t.target.checked}):this.setState({[e]:t.target.value})},n.handleSubmit=function(e){const{setLoading:t,setUser:n}=this.props;this.setState({error:void 0,success:void 0,errors:{}}),t(!0),(0,s.gz)("/account/profile/",{first_name:this.state.firstName,last_name:this.state.lastName,liu_card_id:this.state.liuCardId,infomail_subscriber:this.state.infomailSubscriber}).then((e=>{t(!1),e.status<300&&(this.setState({success:"Ändringarna har sparats."}),n((t=>({...t,first_name:e.data.firstName,last_name:e.data.lastName,profile:{...t.profile,liu_card_id:e.data.liu_card_id,infomail_subscriber:e.data.infomail_subscriber}}))))})).catch((e=>{console.log(e),t(!1),e.response?400===e.response.status&&this.getFormErrorText(e.response):this.setState({error:"Nätverksfel."})})),e.preventDefault()},n.getFormErrorText=function(e){var t;return null!==(t=e.data)&&void 0!==t&&t.liu_card_id?{errors:{profile:{liu_card_id:"Det angivna LiU IDt är för långt."}}}:{error:"Något gick fel."}},n.render=function(){const{user:e}=this.props,{firstName:t,lastName:n,liuCardId:r,infomailSubscriber:l,errors:i,error:s,success:m}=this.state;return a.createElement("form",{onSubmit:this.handleSubmit},a.createElement("h2",null,"Profil"),a.createElement("p",null,a.createElement("strong",null,e.membership?"Du är sektionsmedlem.":"Du saknar sektionsmedlemsskap.")),a.createElement("div",null,a.createElement("label",{className:o},"Förnamn:",a.createElement("input",{value:t,onChange:e=>this.handleChange("firstName",e)})),i.first_name&&a.createElement("div",{className:c},i.first_name)),a.createElement("div",null,a.createElement("label",{className:o},"Efternamn:",a.createElement("input",{value:n,onChange:e=>this.handleChange("lastName",e)})),i.last_name&&a.createElement("div",{className:c},i.last_name)),a.createElement("div",null,a.createElement("label",{className:o},"LiU-kortnummer:",a.createElement("input",{value:r,onChange:e=>this.handleChange("liuCardId",e)})),i.profile&&i.profile.liu_card_id&&a.createElement("div",{className:c},i.profile.liu_card_id)),a.createElement("div",null,a.createElement("label",{className:o},"Prenumerera på veckomailet:",a.createElement("input",{type:"checkbox",checked:l,onChange:e=>this.handleChange("infomailSubscriber",e,!0)})),i.profile&&i.profile.infomail_subscriber&&a.createElement("div",{className:c},i.profile.infomail_subscriber)),a.createElement("div",null,a.createElement(u.zx,{type:"submit"},"Spara")),a.createElement("div",null,s&&a.createElement("div",{className:c},s),m&&a.createElement("div",{className:"preferences-module--Success--2a5c9"},m)))},t}(a.Component),d=n(746),p=n(1288),h=n(5785),f=n(2132),b=n(2777),E=n(3541),v=n(8857),g=n(3819);var _=e=>{let{create:t}=e;return a.createElement(g.Z,{endpoint:"/account/calendar-subscriptions/",customFetcher:t,defaults:{include_bookings:!0,include_events_attending:!0,include_events_not_attending:!0}})},k=n(8829);var C=e=>{let{url:t}=e;return a.createElement(a.Fragment,null,a.createElement("p",null,"Denna webbadress kan importeras i ditt kalenderprogram. Länken kommer automatiskt hållas uppdaterad med nya händelser."),a.createElement("div",{className:"preferences-module--calendarSubNotice--f06ca"},a.createElement("input",{value:t,readOnly:!0}),a.createElement(u.zx,{onClick:()=>{navigator.clipboard.writeText(t)}},"Kopiera")))};const y=e=>{const t=[];e.include_bookings&&t.push("bokningar"),e.include_events_attending&&t.push("anmälda evenemang"),e.include_events_not_attending&&t.push("oanmälda evenemang");const n=t.join(", ");return n.charAt(0).toUpperCase()+n.substring(1)};var N=()=>{const[e]=(0,k.Z)(_),[t]=(0,k.Z)(C),[n]=(0,v.Z)(),r=(0,k._)(),{data:l,mutate:i}=(0,f.ZP)("/account/calendar-subscriptions/");return a.createElement("div",null,a.createElement("h2",null,"Kalenderprenumerationer"),a.createElement(E.aV,null,l&&l.map((e=>a.createElement(E.HC,{title:y(e),key:e.id,buttons:[a.createElement(E.zj,{iconComponent:b.XKb,text:"Visa länk",onClick:()=>{t("Prenumerationslänk",{url:e.url})},key:"view"}),a.createElement(E.zj,{iconComponent:b.Ybf,text:"Ta bort prenumeration",onClick:()=>{n("Är du säker på att du vill ta bort prenumerationen?",(async()=>{await(0,s.IV)("/account/calendar-subscriptions/"+e.id+"/"),i(l.filter((t=>t.id!==e.id)))}))},key:"delete"})]})))),a.createElement(u.zx,{onClick:()=>{e("Ny prenumeration",{create:async e=>{const{data:t}=await(0,s.v_)("/account/calendar-subscriptions/",e);i([].concat((0,h.Z)(l),[t])),r()}})}},"Ny prenumeration"))},S=n(7333);var x=e=>{let{pageContext:{title:t}}=e;const n=(0,a.useContext)(r.pV)[1],{0:l,1:i}=(0,a.useContext)(r.St);return a.createElement(d.Z,null,a.createElement(p.T,null,a.createElement(p.P,{fullWidth:!0},a.createElement(S.Z,{title:t})),a.createElement(p.P,null,a.createElement(m,{user:l,setUser:i,setLoading:n})),a.createElement(p.P,null,a.createElement(N,null))))}}}]);
//# sourceMappingURL=component---src-components-preferences-page-js-eaeea4ff3198b6b1ef63.js.map