(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(2),a=n(15),o=n.n(a),u=n(6),s=n(3),i=n(4),l=n.n(i),d="/api/persons",f=function(){return l.a.get(d).then((function(e){return e.data}))},b=function(e){return l.a.post(d,e).then((function(e){return e.data}))},j=function(e){return l.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},h=function(e){return l.a.put("".concat(d,"/").concat(e.id),e).then((function(e){return e.data}))},m=(n(38),function(e){var t=e.setNewName,n=e.newName,c=e.setNewNumber,a=e.newNumber,o=e.handleSubmit;return Object(r.jsxs)("form",{onSubmit:o,children:[Object(r.jsx)("h2",{children:"Add new"}),Object(r.jsxs)("div",{children:["name:"," ",Object(r.jsx)("input",{onChange:function(e){return t(e.target.value)},value:n}),Object(r.jsx)("br",{}),"phone no:"," ",Object(r.jsx)("input",{onChange:function(e){return c(e.target.value)},value:a})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})}),O=function(e){var t=e.handleFilter,n=e.filterField;return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{onChange:t,value:n})]})},v=function(e){var t=e.persons,n=e.filtered,c=e.filterField,a=e.deletePerson;return Object(r.jsx)("ul",{children:(""===c?t:n).map((function(e){return Object(r.jsxs)("li",{children:[e.name," - ",e.number,Object(r.jsx)("button",{onClick:function(){return a(e)},children:"delete"})]},e.name)}))})},p=function(e){var t=e.message,n=e.error;return t?Object(r.jsx)("div",{className:n?"error":"success",children:t}):null},x=function(){var e=Object(c.useState)([]),t=Object(s.a)(e,2),n=t[0],a=t[1],o=Object(c.useState)(n),i=Object(s.a)(o,2),l=i[0],d=i[1],x=Object(c.useState)(""),w=Object(s.a)(x,2),N=w[0],g=w[1],S=Object(c.useState)(""),y=Object(s.a)(S,2),k=y[0],C=y[1],F=Object(c.useState)(""),I=Object(s.a)(F,2),P=I[0],D=I[1],E=Object(c.useState)(""),J=Object(s.a)(E,2),L=J[0],T=J[1],A=Object(c.useState)(!1),B=Object(s.a)(A,2),q=B[0],z=B[1];Object(c.useEffect)((function(){f().then((function(e){a(e)}))}),[]);var G=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];T(e),t?(z(!0),setTimeout((function(){z(!1),T(null)}),2e3)):setTimeout((function(){T(null)}),2e3)};return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(p,{message:L,error:q}),Object(r.jsx)(O,{handleFilter:function(e){g(e.target.value);var t=n.filter((function(t){return-1!==t.name.toLowerCase().search(e.target.value.toLowerCase())}));d(t)},filterField:N}),Object(r.jsx)(m,{setNewName:C,newName:k,setNewNumber:D,newNumber:P,handleSubmit:function(e){if(e.preventDefault(),k&&P){var t=n.find((function(e){return e.name===k}));if(t){if(window.confirm("".concat(k," already exists, update phone number?"))){var r=Object(u.a)(Object(u.a)({},t),{},{number:P});h(r).then((function(e){var t=n.map((function(e){return e.id!==r.id?e:r}));a(t),C(""),D(""),G("".concat(r.name," updated successfully"))})).catch((function(e){404===e.response.status?G("Information of ".concat(k," has already been removed from server"),!0):400===e.response.status&&G(e.response.data.error,!0)}))}}else b({name:k,number:P}).then((function(e){a(n.concat(e)),C(""),D(""),G("".concat(e.name," added successfully"))})).catch((function(e){console.log(e.response.data),G(e.response.data.error,!0)}))}}}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(v,{filtered:l,persons:n,filterField:N,deletePerson:function(e){window.confirm("Delete ".concat(e.name," ?"))&&j(e.id).then((function(t){var r=n.filter((function(t){return t.id!==e.id}));a(r),G("".concat(e.name," deleted successfully"))})).catch((function(t){404===t.response.status&&G("Information of ".concat(e.name," has already been removed from server"),!0)}))}})]})};o.a.render(Object(r.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.1063c64b.chunk.js.map