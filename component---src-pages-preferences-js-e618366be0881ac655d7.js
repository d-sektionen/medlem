(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{189:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(41),l=(a(190),a(2)),i=a.n(l),u=a(6),c=a.n(u),o=a(62),m=a(191),d=a.n(m),f=function(e){function t(t){var a;return a=e.call(this,t)||this,t.user.profile||(t.user.profile={}),a.state={liuCardId:t.user.profile.liu_card_id,firstName:t.user.first_name,lastName:t.user.last_name,errors:{}},a.handleChange=a.handleChange.bind(c()(c()(a))),a.handleSubmit=a.handleSubmit.bind(c()(c()(a))),a}i()(t,e);var a=t.prototype;return a.handleChange=function(e,t){var a;this.setState(((a={})[e]=t.target.value,a))},a.handleSubmit=function(e){var t=this,a=this.props,n=a.setLoading,r=a.setUser;this.setState({error:void 0,success:void 0,errors:{}}),n(!0),Object(o.d)("/account/user/me/",{first_name:this.state.firstName,last_name:this.state.lastName,profile:{liu_card_id:this.state.liuCardId}}).then(function(e){n(!1),e.status<300&&(t.setState({success:"Ändringarna har sparats."}),r(e.data))}).catch(function(e){console.log(e),n(!1),e.response?400===e.response.status?t.setState({errors:e.response.data}):t.setState({error:"Något gick fel."}):t.setState({error:"Nätverksfel."})}),e.preventDefault()},a.render=function(){var e=this,t=this.props.user,a=this.state,n=a.firstName,s=a.lastName,l=a.liuCardId,i=a.errors,u=a.error,c=a.success;return r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,0!==t.sections.length?"Du är medlem i "+t.sections.map(function(e){return e.name}).join(", ")+".":"Du saknar sektionsmedlemsskap."),r.a.createElement("div",null,r.a.createElement("label",{className:d.a.inputLabel},"Förnamn:",r.a.createElement("input",{value:n,onChange:function(t){return e.handleChange("firstName",t)}})),i.first_name&&r.a.createElement("div",{className:d.a.error},i.first_name)),r.a.createElement("div",null,r.a.createElement("label",{className:d.a.inputLabel},"Efternamn:",r.a.createElement("input",{value:s,onChange:function(t){return e.handleChange("lastName",t)}})),i.last_name&&r.a.createElement("div",{className:d.a.error},i.last_name)),r.a.createElement("div",null,r.a.createElement("label",{className:d.a.inputLabel},"LiU-kortnummer:",r.a.createElement("input",{value:l,onChange:function(t){return e.handleChange("liuCardId",t)}})),i.profile&&i.profile.liu_card_id&&r.a.createElement("div",{className:d.a.error},i.profile.liu_card_id)),r.a.createElement("div",null,r.a.createElement("input",{type:"submit",value:"Spara",className:d.a.submit+" button"})),r.a.createElement("div",null,u&&r.a.createElement("div",{className:d.a.error},u),c&&r.a.createElement("div",{className:d.a.success},c)))},t}(n.Component);t.default=function(){return r.a.createElement(s.a.Consumer,null,function(e){return r.a.createElement(s.b.Consumer,null,function(t){var a=t.user,n=t.set;return r.a.createElement(f,{user:a,setUser:n,setLoading:e.set})})})}},190:function(e,t,a){var n=a(33).f,r=Function.prototype,s=/^\s*function ([^ (]*)/;"name"in r||a(25)&&n(r,"name",{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})},191:function(e,t,a){e.exports={inputLabel:"preferences-module--inputLabel--37O6A",submit:"preferences-module--submit--2ALR0",error:"preferences-module--error--2-qsf",success:"preferences-module--success--1uRT2"}}}]);
//# sourceMappingURL=component---src-pages-preferences-js-e618366be0881ac655d7.js.map