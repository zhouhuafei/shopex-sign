webpackJsonp([1],{84:function(t,s,a){function n(t){a(85)}var e=a(34)(a(87),a(88),n,"data-v-5cb95b92",null);t.exports=e.exports},85:function(t,s,a){var n=a(86);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(33)("c1b71728",n,!0)},86:function(t,s,a){s=t.exports=a(32)(void 0),s.push([t.i,".logs[data-v-5cb95b92]{margin:.3125rem}.logs .logs-name[data-v-5cb95b92]{text-align:center}",""])},87:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=a(35);s.default={name:"logs",data:function(){return{nowPage:1,nowCount:200,resultData:[]}},components:{},mounted:function(){var t=this;n({url:"/api/logs/",method:"post",data:{nowPage:this.nowPage,nowCount:this.nowCount}}).then(function(s){"success"===s.status&&(t.resultData=s.result.data)})}}},88:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"g-view"},t._l(t.resultData,function(s){return a("div",{staticClass:"logs"},[a("div",{staticClass:"logs-name"},[t._v(t._s(s.username))]),t._v(" "),a("div",{staticClass:"logs-msg"},[t._v(t._s(s.signMessage))]),t._v(" "),a("div",{staticClass:"logs-tail"},[t._v(t._s(s.smallTail))])])}))},staticRenderFns:[]}}});
//# sourceMappingURL=logs.1.chunk.596a733dc2d128b21556.js.map