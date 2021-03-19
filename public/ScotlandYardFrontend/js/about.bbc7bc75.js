(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"14bd":function(t,e,n){"use strict";n("6fd0")},"6fd0":function(t,e,n){},f820:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{id:"about"}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{attrs:{md:"7"}},[n("div",[n("h1",[t._v("About")])]),n("v-divider"),n("h3",{staticStyle:{"font-weight":"bold"}},[t._v("Description")]),n("p",[t._v(' Scotland Yard is a board game in which a team of players, as police, cooperate to track down a player controlling a criminal around a board representing the streets of London, first published in 1983. It is named after Scotland Yard, the headquarters of London\'s Metropolitan Police Service. Scotland Yard is an asymmetric board game, with the detective players cooperatively solving a variant of the pursuit-evasion problem. The game is published by Ravensburger in most of Europe and Canada and by Milton Bradley in the United States. It received the "Spiel des Jahres" (Game of the Year) award in 1983. ')]),n("h3",{staticStyle:{"font-weight":"bold"}},[t._v("Rules")]),n("h4",[t._v("Object of the game")]),n("p",[t._v(" If you are Mister X,you must stay undercover to escape from your pursuers until the detectives can no longer move. However if you are a detective, your purpose is to catch Mister X by moving onto the playing area where he is currently hiding. ")]),n("h4",[t._v("Mr.X starting positions")]),n("p",[t._v("35, 45, 51, 71, 78, 104, 106, 127, 132, 146, 166, 170 and 172")]),n("h4",[t._v("Setup")]),n("h5",[t._v(" Every detective receives the following tickets when the game begins: ")]),n("ul",[n("li",[t._v("11 Taxi")]),n("li",[t._v(" 8 Bus")]),n("li",[t._v(" 4 Underground")])]),n("h5",[t._v("Mister X gets:")]),n("ul",[n("li",[t._v("99 Taxi")]),n("li",[t._v("99 Bus")]),n("li",[t._v("99 Underground")]),n("li",[t._v(" 2 Black")])]),n("button",{staticClass:"standard-button",on:{click:t.backToMenu}},[t._v(" Back to Main Menu ")]),t.$store.getters.gameRunning?n("button",{staticClass:"standard-button",attrs:{id:"back-to-game"},on:{click:t.backToGame}},[t._v(" Back to Game ")]):t._e()],1)],1)],1)},r=[],i={name:"About",methods:{backToMenu:function(){this.$router.push("/")},backToGame:function(){this.$router.push("/game")}}},o=i,s=(n("14bd"),n("2877")),c=n("6544"),u=n.n(c),l=n("62ad"),d=(n("99af"),n("4de4"),n("b64b"),n("2ca0"),n("20f6"),n("4b85"),n("a15b"),n("498a"),n("2b0e"));function f(t){return d["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,n){var a=n.props,r=n.data,i=n.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),e(a.tag,r,i)}})}var v=n("d9f7"),p=f("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var n,a=e.props,r=e.data,i=e.children,o=r.attrs;return o&&(r.attrs={},n=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),t(a.tag,Object(v["a"])(r,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(n||[])}),i)}}),g=n("ce7e"),b=(n("4160"),n("caad"),n("13d5"),n("4ec9"),n("d3b7"),n("ac1f"),n("2532"),n("3ca3"),n("5319"),n("159b"),n("ddb0"),n("ade3")),h=n("5530"),y=n("80d2"),m=["sm","md","lg","xl"],j=["start","end","center"];function w(t,e){return m.reduce((function(n,a){return n[t+Object(y["u"])(a)]=e(),n}),{})}var _=function(t){return[].concat(j,["baseline","stretch"]).includes(t)},S=w("align",(function(){return{type:String,default:null,validator:_}})),k=function(t){return[].concat(j,["space-between","space-around"]).includes(t)},C=w("justify",(function(){return{type:String,default:null,validator:k}})),O=function(t){return[].concat(j,["space-between","space-around","stretch"]).includes(t)},M=w("alignContent",(function(){return{type:String,default:null,validator:O}})),B={align:Object.keys(S),justify:Object.keys(C),alignContent:Object.keys(M)},x={align:"align",justify:"justify",alignContent:"align-content"};function P(t,e,n){var a=x[t];if(null!=n){if(e){var r=e.replace(t,"");a+="-".concat(r)}return a+="-".concat(n),a.toLowerCase()}}var T=new Map,G=d["a"].extend({name:"v-row",functional:!0,props:Object(h["a"])(Object(h["a"])(Object(h["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:_}},S),{},{justify:{type:String,default:null,validator:k}},C),{},{alignContent:{type:String,default:null,validator:O}},M),render:function(t,e){var n=e.props,a=e.data,r=e.children,i="";for(var o in n)i+=String(n[o]);var s=T.get(i);return s||function(){var t,e;for(e in s=[],B)B[e].forEach((function(t){var a=n[t],r=P(e,t,a);r&&s.push(r)}));s.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(b["a"])(t,"align-".concat(n.align),n.align),Object(b["a"])(t,"justify-".concat(n.justify),n.justify),Object(b["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),T.set(i,s)}(),t(n.tag,Object(v["a"])(a,{staticClass:"row",class:s}),r)}}),E=Object(s["a"])(o,a,r,!1,null,"2779b149",null);e["default"]=E.exports;u()(E,{VCol:l["a"],VContainer:p,VDivider:g["a"],VRow:G})}}]);
//# sourceMappingURL=about.bbc7bc75.js.map