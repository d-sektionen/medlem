(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{vwZb:function(e,a,t){"use strict";t.r(a);var r=t("q1tI"),n=t.n(r),s=t("8k0H"),i=(t("pS08"),t("n7j8"),t("ZACD")),l=t("sM+Y"),u=t.n(l);function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var o=function(e){var a,t;function r(a){var t;return t=e.call(this,a)||this,a.user.profile||(a.user.profile={}),t.state={infomailSubscriber:a.user.profile.infomail_subscriber,liuCardId:a.user.profile.liu_card_id,firstName:a.user.first_name,lastName:a.user.last_name,errors:{}},t.handleChange=t.handleChange.bind(c(t)),t.handleSubmit=t.handleSubmit.bind(c(t)),t}t=e,(a=r).prototype=Object.create(t.prototype),a.prototype.constructor=a,a.__proto__=t;var s=r.prototype;return s.handleChange=function(e,a,t){var r,n;void 0===t&&(t=!1),t?this.setState(((r={})[e]=a.target.checked,r)):this.setState(((n={})[e]=a.target.value,n))},s.handleSubmit=function(e){var a=this,t=this.props,r=t.setLoading,n=t.setUser;this.setState({error:void 0,success:void 0,errors:{}}),r(!0),Object(i.e)("/account/user/me/",{first_name:this.state.firstName,last_name:this.state.lastName,profile:{liu_card_id:this.state.liuCardId,infomail_subscriber:this.state.infomailSubscriber}}).then((function(e){r(!1),e.status<300&&(a.setState({success:"Ändringarna har sparats."}),n(e.data))})).catch((function(e){console.log(e),r(!1),e.response?400===e.response.status?a.setState({errors:e.response.data}):a.setState({error:"Något gick fel."}):a.setState({error:"Nätverksfel."})})),e.preventDefault()},s.render=function(){var e=this,a=this.props.user,t=this.state,r=t.firstName,s=t.lastName,i=t.liuCardId,l=t.infomailSubscriber,c=t.errors,o=t.error,m=t.success;return n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("div",null,a.membership?"Du är sektionsmedlem.":"Du saknar sektionsmedlemsskap."),n.a.createElement("div",null,n.a.createElement("label",{className:u.a.inputLabel},"Förnamn:",n.a.createElement("input",{value:r,onChange:function(a){return e.handleChange("firstName",a)}})),c.first_name&&n.a.createElement("div",{className:u.a.error},c.first_name)),n.a.createElement("div",null,n.a.createElement("label",{className:u.a.inputLabel},"Efternamn:",n.a.createElement("input",{value:s,onChange:function(a){return e.handleChange("lastName",a)}})),c.last_name&&n.a.createElement("div",{className:u.a.error},c.last_name)),n.a.createElement("div",null,n.a.createElement("label",{className:u.a.inputLabel},"LiU-kortnummer:",n.a.createElement("input",{value:i,onChange:function(a){return e.handleChange("liuCardId",a)}})),c.profile&&c.profile.liu_card_id&&n.a.createElement("div",{className:u.a.error},c.profile.liu_card_id)),n.a.createElement("div",null,n.a.createElement("label",{className:u.a.inputLabel},"Prenumerera på veckomailet:",n.a.createElement("input",{type:"checkbox",checked:l,onChange:function(a){return e.handleChange("infomailSubscriber",a,!0)}})),c.profile&&c.profile.infomail_subscriber&&n.a.createElement("div",{className:u.a.error},c.profile.infomail_subscriber)),n.a.createElement("div",null,n.a.createElement("input",{type:"submit",value:"Spara",className:u.a.submit+" button"})),n.a.createElement("div",null,o&&n.a.createElement("div",{className:u.a.error},o),m&&n.a.createElement("div",{className:u.a.success},m)))},r}(r.Component),m=t("r90U"),d=t("zw+i");a.default=function(){var e=Object(r.useContext)(s.a)[1],a=Object(r.useContext)(s.b),t=a[0],i=a[1];return n.a.createElement(m.a,null,n.a.createElement(d.a,null,n.a.createElement(d.b,null,n.a.createElement(o,{user:t,setUser:i,setLoading:e}))))}}}]);
//# sourceMappingURL=component---src-components-preferences-page-js-3a5ce1219314fed1f34c.js.map