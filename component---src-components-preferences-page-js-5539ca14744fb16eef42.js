(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{vwZb:function(e,t,a){"use strict";a.r(t);var r=a("q1tI"),n=a.n(r),s=a("8k0H"),l=(a("pS08"),a("n7j8"),a("ZACD")),i=a("sM+Y"),u=a.n(i);function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var o=function(e){var t,a;function r(t){var a;return a=e.call(this,t)||this,t.user.profile||(t.user.profile={}),a.state={infomailSubscriber:t.user.profile.infomail_subscriber,liuCardId:t.user.profile.liu_card_id,firstName:t.user.first_name,lastName:t.user.last_name,errors:{}},a.handleChange=a.handleChange.bind(c(a)),a.handleSubmit=a.handleSubmit.bind(c(a)),a}a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var s=r.prototype;return s.handleChange=function(e,t,a){var r,n;void 0===a&&(a=!1),a?this.setState(((r={})[e]=t.target.checked,r)):this.setState(((n={})[e]=t.target.value,n))},s.handleSubmit=function(e){var t=this,a=this.props,r=a.setLoading,n=a.setUser;this.setState({error:void 0,success:void 0,errors:{}}),r(!0),Object(l.e)("/account/user/me/",{first_name:this.state.firstName,last_name:this.state.lastName,profile:{liu_card_id:this.state.liuCardId,infomail_subscriber:this.state.infomailSubscriber}}).then((function(e){r(!1),e.status<300&&(t.setState({success:"Ändringarna har sparats."}),n(e.data))})).catch((function(e){console.log(e),r(!1),e.response?400===e.response.status?t.setState({errors:e.response.data}):t.setState({error:"Något gick fel."}):t.setState({error:"Nätverksfel."})})),e.preventDefault()},s.render=function(){var e=this,t=this.props,a=t.user,r=t.title,s=this.state,l=s.firstName,i=s.lastName,c=s.liuCardId,o=s.infomailSubscriber,m=s.errors,d=s.error,p=s.success;return n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("h1",null,r),n.a.createElement("p",null,n.a.createElement("strong",null,a.membership?"Du är sektionsmedlem.":"Du saknar sektionsmedlemsskap.")),n.a.createElement("div",null,n.a.createElement("label",{className:u.a.inputLabel},"Förnamn:",n.a.createElement("input",{value:l,onChange:function(t){return e.handleChange("firstName",t)}})),m.first_name&&n.a.createElement("div",{className:u.a.error},m.first_name)),n.a.createElement("div",null,n.a.createElement("label",{className:u.a.inputLabel},"Efternamn:",n.a.createElement("input",{value:i,onChange:function(t){return e.handleChange("lastName",t)}})),m.last_name&&n.a.createElement("div",{className:u.a.error},m.last_name)),n.a.createElement("div",null,n.a.createElement("label",{className:u.a.inputLabel},"LiU-kortnummer:",n.a.createElement("input",{value:c,onChange:function(t){return e.handleChange("liuCardId",t)}})),m.profile&&m.profile.liu_card_id&&n.a.createElement("div",{className:u.a.error},m.profile.liu_card_id)),n.a.createElement("div",null,n.a.createElement("label",{className:u.a.inputLabel},"Prenumerera på veckomailet:",n.a.createElement("input",{type:"checkbox",checked:o,onChange:function(t){return e.handleChange("infomailSubscriber",t,!0)}})),m.profile&&m.profile.infomail_subscriber&&n.a.createElement("div",{className:u.a.error},m.profile.infomail_subscriber)),n.a.createElement("div",null,n.a.createElement("input",{type:"submit",value:"Spara",className:u.a.submit+" button"})),n.a.createElement("div",null,d&&n.a.createElement("div",{className:u.a.error},d),p&&n.a.createElement("div",{className:u.a.success},p)))},r}(r.Component),m=a("r90U"),d=a("zw+i");t.default=function(e){var t=e.pageContext.title,a=Object(r.useContext)(s.a)[1],l=Object(r.useContext)(s.b),i=l[0],u=l[1];return n.a.createElement(m.a,null,n.a.createElement(d.a,null,n.a.createElement(d.b,null,n.a.createElement(o,{user:i,setUser:u,setLoading:a,title:t}))))}}}]);
//# sourceMappingURL=component---src-components-preferences-page-js-5539ca14744fb16eef42.js.map