webpackJsonp([0],{36:function(t,i,e){function s(t){e(91)}var n=e(34)(e(93),e(95),s,"data-v-6b1fb345",null);t.exports=n.exports},85:function(t,i,e){"use strict";var s=e(2),n=e(5),a=e(15),o=s.constructorInherit(a,{callback:{},config:{status:"loading",positionMethod:"",positionLocation:"center"},data:{}});o.prototype.moduleDomCreate=function(){var t=this.opts.config,i="",e="",s=t.status,a=t.positionMethod,o=t.positionLocation;"loading"===s&&(e="g-loading-run ","fixed"===a&&(e+="g-loading-fixed g-loading-"+o),"absolute"===a&&(e+="g-loading-absolute g-loading-"+o),i='\n            <div class="g-loading-body">\n                <div class="g-loading-run-icon iconfont icon-jiazaizhong"></div>\n            </div>\n        '),"over"===s&&(e="g-loading-over ","fixed"===a&&(e+="g-loading-fixed g-loading-"+o),"absolute"===a&&(e+="g-loading-absolute g-loading-"+o),i='\n            <div class="g-loading-body">\n                <div class="g-loading-over-icon iconfont icon-meiyoushuju"></div>\n                <div class="g-loading-over-text">没有数据了</div>\n            </div>\n        '),this.moduleDom=n.createElement({style:this.opts.config.moduleDomStyle,customAttribute:this.opts.config.moduleDomCustomAttribute,attribute:{className:"g-loading "+e,innerHTML:i}})},o.prototype.power=function(){},t.exports=o},91:function(t,i,e){var s=e(92);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(33)("117424b4",s,!0)},92:function(t,i,e){i=t.exports=e(32)(void 0),i.push([t.i,".g-view[data-v-6b1fb345]{padding-top:.625rem}.page-button[data-v-6b1fb345],.page-input[data-v-6b1fb345],.page-sign-loading[data-v-6b1fb345]{margin-top:.625rem}",""])},93:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e(16),n=e(35),a=e(94),o=e(85),d=[],r=null;i.default={name:"sign-in",data:function(){return{username:"",password:"",isShowPassword:!1,isSign:!1}},methods:{fnIsShowPassword:function(){this.isShowPassword=!this.isShowPassword},fnClear:function(t){this[t]=""},fnSign:function(t){var i=this;d.forEach(function(t){t.validateSave()});var e=!0;d.forEach(function(t){t.isValidateSuccess||(e=!1)}),e&&!this.isSign&&(i.isSign=!0,r.moduleDomShow(),n({url:"/api/sign/",type:"post",data:{power:t,username:i.username,password:i.password||"Shopex123"}}).then(function(t){"success"===t.status&&new s({config:{alert:{content:t.message}}}),i.isSign=!1,r.moduleDomHide()}))}},mounted:function(){document.querySelectorAll(".validate").forEach(function(t){var i=new a({element:t});d.push(i)}),r=new o({wrap:".page-sign-loading",config:{moduleDomIsRender:!1}})}}},94:function(t,i,e){"use strict";function s(t){this.opts=t||{},this.element=a.getDomArray(this.opts.element)[0],this.hintClass=this.opts.hintClass||"g-validate-form-hint",this.eventsType=this.opts.eventsType||"blur",this.validateType=this.element.dataset.validate||"undefined",this.validateHintTxt=this.element.dataset.hint||"undefined",this.init()}var n=e(2),a=e(5);s.prototype.init=function(){this.render(),this.validateEvents()},s.prototype.render=function(){this.renderWrap(),this.renderHint()},s.prototype.renderWrap=function(){this.wrapDom=this.element.parentNode,this.wrapDom&&"static"===getComputedStyle(this.wrapDom).position&&(this.wrapDom.style.position="relative")},s.prototype.renderHint=function(){this.hintDom=document.createElement("span"),this.hintDom.classList.add(this.hintClass)},s.prototype.renderHintAdd=function(t){if(this.element.offsetWidth){var i=t||{};this.hintDom.innerHTML=i.txt||"本项必填",this.wrapDom.appendChild(this.hintDom)}},s.prototype.renderHintRemove=function(){this.wrapDom.querySelector("."+this.hintClass)&&this.wrapDom.removeChild(this.hintDom)},s.prototype.validateSave=function(){var t=this,i=t.validateType.split(" "),e=t.validateHintTxt.split(" "),s=this.element.value;this.isValidateSuccess=!0,i.forEach(function(i,a){"no-empty"===i&&t.isValidateSuccess&&(n.isEmpty(s)?(t.renderHintAdd({txt:e[a]}),t.isValidateSuccess=!1):(t.renderHintRemove(),t.isValidateSuccess=!0)),"no-zero"===i&&t.isValidateSuccess&&(n.isZero(s)?(t.renderHintAdd({txt:e[a]}),t.isValidateSuccess=!1):(t.renderHintRemove(),t.isValidateSuccess=!0)),"yes-positive-integer"===i&&t.isValidateSuccess&&(n.isPositiveInteger(s)?(t.renderHintRemove(),t.isValidateSuccess=!0):(t.renderHintAdd({txt:e[a]}),t.isValidateSuccess=!1))})},s.prototype.validateEvents=function(){var t=this;t.element&&t.element.addEventListener(t.eventsType,function(){t.validateSave()})},t.exports=s},95:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"g-view"},[e("div",{staticClass:"page-input"},[e("label",{staticClass:"g-input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"g-input-input validate",attrs:{"data-validate":"no-empty","data-hint":"本项必填",type:"tel",name:"username",id:"username",placeholder:"请输入账号,只输入数字亦可"},domProps:{value:t.username},on:{input:function(i){i.target.composing||(t.username=i.target.value)}}}),t._v(" "),e("span",{staticClass:"g-input-icon iconfont icon-qingkong",on:{click:function(i){t.fnClear("username")}}}),t._v(" "),e("span",{staticClass:"g-input-icon g-input-hint iconfont icon-bitian"})])]),t._v(" "),e("div",{staticClass:"page-input"},[e("label",{staticClass:"g-input"},["checkbox"==(t.isShowPassword?"text":"password")?e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"g-input-input validate",attrs:{"data-validate":"no-empty","data-hint":"本项必填",name:"password",id:"password",placeholder:"请输入密码,考虑安全未默认",type:"checkbox"},domProps:{checked:Array.isArray(t.password)?t._i(t.password,null)>-1:t.password},on:{change:function(i){var e=t.password,s=i.target,n=!!s.checked;if(Array.isArray(e)){var a=t._i(e,null);s.checked?a<0&&(t.password=e.concat([null])):a>-1&&(t.password=e.slice(0,a).concat(e.slice(a+1)))}else t.password=n}}}):"radio"==(t.isShowPassword?"text":"password")?e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"g-input-input validate",attrs:{"data-validate":"no-empty","data-hint":"本项必填",name:"password",id:"password",placeholder:"请输入密码,考虑安全未默认",type:"radio"},domProps:{checked:t._q(t.password,null)},on:{change:function(i){t.password=null}}}):e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"g-input-input validate",attrs:{"data-validate":"no-empty","data-hint":"本项必填",name:"password",id:"password",placeholder:"请输入密码,考虑安全未默认",type:t.isShowPassword?"text":"password"},domProps:{value:t.password},on:{input:function(i){i.target.composing||(t.password=i.target.value)}}}),t._v(" "),e("span",{staticClass:"g-input-icon iconfont icon-qingkong",on:{click:function(i){t.fnClear("password")}}}),t._v(" "),e("span",{staticClass:"g-input-icon iconfont",class:{"icon-zhengyan":t.isShowPassword,"icon-biyan":!t.isShowPassword},on:{click:t.fnIsShowPassword}})])]),t._v(" "),"signIn"===this.$route.name?e("div",{staticClass:"page-button"},[e("div",{staticClass:"g-button",class:{"g-button-cancel":t.isSign},on:{click:function(i){t.fnSign("signIn")}}},[e("div",{staticClass:"g-button-text"},[t._v("签到")])])]):e("div",{staticClass:"page-button"},[e("div",{staticClass:"g-button",class:{"g-button-cancel":t.isSign},on:{click:function(i){t.fnSign("signOut")}}},[e("div",{staticClass:"g-button-text"},[t._v("签退")])])]),t._v(" "),e("div",{staticClass:"page-sign-loading g-font-color-highlight"})])},staticRenderFns:[]}}});
//# sourceMappingURL=sign.0.chunk.4edaaf1303319bb69ff3.js.map