(function(e){function t(t){for(var r,i,s=t[0],c=t[1],l=t[2],d=0,u=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&u.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);m&&m(t);while(u.length)u.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},i={app:0},a={app:0},o=[];function s(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"543d0a72"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise((function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"30a057da"}[e]+".css",a=c.p+r,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var l=o[s],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===r||d===a))return t()}var u=document.getElementsByTagName("style");for(s=0;s<u.length;s++){l=u[s],d=l.getAttribute("data-href");if(d===r||d===a)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||a,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete i[e],m.parentNode.removeChild(m),n(o)},m.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){i[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=o);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=s(e);var u=new Error;l=function(t){d.onerror=d.onload=null,clearTimeout(m);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,n[1](u)}a[e]=void 0}};var m=setTimeout((function(){l({type:"timeout",target:d})}),12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var m=d;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"02a8":function(e,t,n){},"034f":function(e,t,n){"use strict";n("85ec")},"084b":function(e,t,n){},"1ad0":function(e,t,n){e.exports=n.p+"img/Taxi.961d9b12.svg"},"1b80":function(e,t,n){"use strict";n("336e")},"1eb2":function(e,t,n){"use strict";n("084b")},2283:function(e,t,n){},"2ebd":function(e,t,n){},"31e8":function(e,t,n){var r={"./Black.svg":"e499","./Bus.svg":"bb11","./Taxi.svg":"1ad0","./Underground.svg":"6187","./black_small.svg":"9bec","./bus_small.svg":"76f1","./taxi_small.svg":"a546","./underground_small.svg":"5c65"};function i(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}i.keys=function(){return Object.keys(r)},i.resolve=a,e.exports=i,i.id="31e8"},"336e":function(e,t,n){},5652:function(e,t,n){},"568f":function(e,t,n){"use strict";n("c457")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("f9e3"),n("2dd8"),n("5b52");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{staticClass:"main"},[e.websocketError?n("v-alert",{staticClass:"alert",attrs:{border:"bottom",dense:"",elevation:"16",outlined:"",prominent:"",text:"",type:"error"}},[e._v("Connecting to Websocket failed")]):e._e(),n("Header"),e.isMounted?n("div",[n("router-view",{attrs:{model:e.model}})],1):e._e(),n("Footer")],1)},a=[],o=(n("a9e3"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app-bar",{attrs:{id:"header",color:"#93b2e0",dense:"",fixed:""}},[n("v-toolbar-items",[n("v-btn",{attrs:{to:"/",text:""},on:{click:e.callHome}},[n("v-icon",[e._v("mdi-home")])],1),n("v-btn",{attrs:{to:"/about",text:""},on:{click:e.callAbout}},[n("v-icon",[e._v("mdi-help")])],1),e.$store.getters.gameRunning?n("v-btn",{attrs:{text:""},on:{click:e.callUndo}},[n("v-icon",[e._v("mdi-undo")])],1):e._e(),e.$store.getters.gameRunning?n("v-btn",{attrs:{text:""},on:{click:e.callRedo}},[n("v-icon",[e._v("mdi-redo")])],1):e._e()],1),e.$store.getters.gameRunning?n("v-spacer"):e._e(),e.$store.getters.gameRunning?n("v-btn",{attrs:{text:""},on:{click:e.callHideUi}},[n("v-icon",[e._v("mdi-television-guide")])],1):e._e()],1)}),s=[],c={methods:{sendObjectOverWebsocket:function(e,t){var n={event:t,data:e};this.$store.getters.getWebsocket.readyState===WebSocket.OPEN?(console.log("send: "+JSON.stringify(n)),this.$store.getters.getWebsocket.send(JSON.stringify(n))):console.log("Could not send data. Websocket is not open.")},sendMessageOverWebsocket:function(e){var t={event:e};this.$store.getters.getWebsocket.readyState===WebSocket.OPEN?this.$store.getters.getWebsocket.send(JSON.stringify(t)):console.log("Could not send data. Websocket is not open.")}}},l={name:"Header",mixins:[c],methods:{callHome:function(){this.sendObjectOverWebsocket({id:Number(window.$cookies.get("id"))},"deregister")},callAbout:function(){this.sendObjectOverWebsocket({id:Number(window.$cookies.get("id"))},"deregister")},callUndo:function(){this.sendMessageOverWebsocket("undo")},callRedo:function(){this.sendMessageOverWebsocket("redo")},callHideUi:function(){this.$store.dispatch("setShowUi",!this.$store.getters.getShowUi)},menuItems:function(){return this.menu}}},d=l,u=(n("61b2"),n("2877")),m=n("6544"),f=n.n(m),g=n("40dc"),p=n("8336"),v=n("132d"),b=n("2fa4"),y=n("2a7f"),h=Object(u["a"])(d,o,s,!1,null,"8c02d008",null),_=h.exports;f()(h,{VAppBar:g["a"],VBtn:p["a"],VIcon:v["a"],VSpacer:b["a"],VToolbarItems:y["a"]});var w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-footer",{attrs:{id:"footer",padless:"",dense:"",fixed:""}},[n("v-col",{staticClass:"text-center",attrs:{cols:"4"}},[n("a",{attrs:{href:"https://github.com/tim-koehler/ScotlandYard",target:"_blank"}},[e._v("ScotlandYard Core")])]),n("v-col",{staticClass:"text-center",attrs:{cols:"4"}},[n("a",{attrs:{href:"https://github.com/roland-burke/ScotlandYardServer",target:"_blank"}},[e._v("ScotlandYard Server")])]),n("v-col",{staticClass:"text-center",attrs:{cols:"4"}},[n("a",{attrs:{href:"https://github.com/roland-burke/ScotlandYardFrontend",target:"_blank"}},[e._v("ScotlandYard Frontend")])])],1)},k=[],C={name:"Footer"},x=C,S=n("62ad"),E=n("553a"),O=Object(u["a"])(x,w,k,!1,null,null,null),$=O.exports;f()(O,{VCol:S["a"],VFooter:E["a"]});var N=n("1157"),T=n.n(N),P={name:"App",data:function(){return{interval:null,model:null,websocketError:!1,isMounted:!1}},beforeDestroyed:function(){this.sendObjectOverWebsocket({id:Number(window.$cookies.get("id"))},"deregister")},mounted:function(){var e=this;console.log("MOUNTED");var t=new WebSocket("ws://localhost:9000/ws");this.$store.dispatch("setWebsocket",t),t.onerror=function(){e.websocketError=!0},t.onmessage=function(t){e.websocketError=!1;var n=T.a.parseJSON(t.data);console.log(n),"ModelChanged"===n.event?(e.model=n,e.$store.dispatch("setGameRunning",e.model.gameRunning)):"register"===n.event?e.handleRegister(n.id):"lobby-change"===n.event?(console.log("player: "+JSON.stringify(e.$store.getters.lobby.player)),e.$store.dispatch("updateLobbyPlayer",n.player),console.log("player_after_update: "+JSON.stringify(e.$store.getters.lobby.player))):"StartGame"===n.event?(e.$store.dispatch("setGameRunning",!0),e.$router.push("/game")):"GameFinished"===n.event&&(window.$cookies.set("id",-1,"3h"),e.$store.dispatch("setGameRunning",!1))},t.onopen=function(){e.websocketError=!1,e.isMounted=!0,setInterval((function(){e.sendMessageOverWebsocket("ping")}),1e4)},t.onclose=function(){clearInterval(e.interval),e.websocketError=!0,e.sendObjectOverWebsocket({id:Number(window.$cookies.get("id"))},"deregister")}},methods:{handleRegister:function(e){window.$cookies.set("id",e,"3h")},removeCookies:function(){window.$cookies.remove("id")}},mixins:[c],components:{Header:_,Footer:$}},j=P,R=(n("034f"),n("0798")),W=n("7496"),M=Object(u["a"])(j,i,a,!1,null,null,null),B=M.exports;f()(M,{VAlert:R["a"],VApp:W["a"]});n("d3b7");var A=n("8c4f"),D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{staticClass:"d-flex align-items-center justify-content-center"},[n("div",{staticClass:"index-wrapper"},[e._m(0),n("div",{staticClass:"row my-3 d-flex justify-content-center"},[n("router-link",{staticClass:"main-menu-button",attrs:{to:"/lobby"}},[e._v("Start Game")])],1),e._m(1),n("div",{staticClass:"row d-flex justify-content-center"},[n("router-link",{staticClass:"main-menu-button",attrs:{to:"/about"}},[e._v("About")])],1)])])},L=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row my-3 d-flex justify-content-center"},[n("h3",[e._v("Scotland Yard")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row my-3 d-flex justify-content-center"},[n("label",{staticClass:"main-menu-button"},[n("input",{attrs:{type:"file"}}),e._v(" Load Game ")])])}],U={name:"MainMenu"},I=U,Y=(n("1eb2"),Object(u["a"])(I,D,L,!1,null,"0a2067bf",null)),H=Y.exports,V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.$store.getters.gameRunning?n("div",{staticClass:"container-fluid lobby-wrapper",attrs:{id:"lobby"}},[e._v(" Game has already started! ")]):n("div",{staticClass:"container-fluid lobby-wrapper",attrs:{id:"lobby"}},[e._m(0),n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-8 lobby-panel"},[e._m(1),e._l(e.$store.getters.lobby.player.length,(function(t,r){return n("PlayerSettings",{key:r,attrs:{componentid:r,enabled:e.checkEnabled(r)}})}))],2),e._m(2)]),n("div",{staticClass:"row"},[n("div",{staticClass:"col d-flex justify-content-center lobby-bottom-panel"},[n("div",{staticClass:"d-flex justify-content-center"},[n("button",{staticClass:"standard-button",on:{click:e.setPlayerReady}},[e._v(" "+e._s(e.readyButtonText)+" ")])])])])])},G=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row d-flex justify-content-center"},[n("h1",[e._v("Lobby")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"d-flex justify-content-center",staticStyle:{"margin-top":"1em"}},[n("h3",[e._v("Player")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-lg-3 lobby-panel d-flex flex-column"},[n("div",{staticClass:"d-flex justify-content-center",staticStyle:{"margin-top":"1em"}},[n("h3",[e._v("Settings")])]),n("div",{staticClass:"player-item"},[n("label",[e._v("Rounds: 24")]),n("br"),n("label",[e._v("Max Player: 7")]),n("h6",[e._v("Detective Tickets:")]),n("ul",[n("li",[e._v("11 Taxi")]),n("li",[e._v(" 8 Bus")]),n("li",[e._v(" 4 Underground")])]),n("h6",[e._v("Mr.X Tickets:")]),n("ul",[n("li",[e._v("99 Taxi")]),n("li",[e._v("99 Bus")]),n("li",[e._v("99 Underground")]),n("li",[e._v(" 2 Black")])])])])}],X=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row player-item d-flex justify-content-between align-items-center"},[n("div",{staticClass:"player-item-content"},[e.changeName?e._e():n("label",{staticStyle:{"margin-right":"10px"}},[e._v("Name:")]),e.changeName?n("v-text-field",{attrs:{type:"text",minlength:"3",max:"30",label:"Name"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.switchView(t)}},model:{value:e.playerName,callback:function(t){e.playerName=t},expression:"playerName"}}):e._e(),e.changeName?e._e():n("label",{staticStyle:{"min-width":"9em"}},[e._v(e._s(e.getPlayerName))]),0!=e.componentid?n("div",{staticClass:"d-flex justify-content-end"},[e.enabled?n("button",{staticClass:"standard-button-small",on:{click:e.switchView}},[e._v(" Change Name ")]):e._e()]):e._e()],1),n("div",{staticClass:"player-item-content"},[0!=e.componentid&&e.enabled?n("v-col",{attrs:{cols:"11"}},[n("v-select",{attrs:{id:"name-select",items:e.colors.slice(1),"item-text":"name","item-value":"value",label:"Player Color","return-object":"",outlined:""},on:{change:function(t){return e.onChange(t)}},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1):n("label",[e._v(e._s(e.playerColor.name))]),n("div",{staticClass:"color-preview",style:{"background-color":e.playerColor.value}})],1),n("div",{staticClass:"player-item-content justify-content-end"},[n("label",{staticStyle:{"margin-right":"10px"}},[e._v("Ready:")]),e.playerReady?n("div",{staticClass:"ready-field-green"}):n("div",{staticClass:"ready-field-red"})])])},F=[],J=(n("7db0"),n("b0c0"),{name:"PlayerSettings",mixins:[c],props:{componentid:Number,enabled:Boolean},data:function(){return{changeName:!1,playerName:"empty",selected:this.playerColor,colors:[{name:"black",value:"#000000"},{name:"blue",value:"#0000ff"},{name:"green",value:"#1c8c1c"},{name:"orange",value:"#de991b"},{name:"pink",value:"#ff00ff"},{name:"red",value:"#ff0000"},{name:"light-blue",value:"#0ddeff"}]}},mounted:function(){this.enabled=this.$store.getters.lobby.player[this.componentid].id===Number(window.$cookies.get("id")),this.playerName=this.getPlayerName},methods:{switchView:function(){this.changeName=!this.changeName,!1===this.changeName&&(this.$store.dispatch("updateClientPlayerName",this.playerName),this.sendObjectOverWebsocket({player:this.$store.getters.lobby.player},"lobby-change"))},onChange:function(){console.log("OnChange"),this.$store.dispatch("setPlayerColor",this.selected.value),this.sendObjectOverWebsocket({player:this.$store.getters.lobby.player},"lobby-change")},getClientPlayer:function(){return this.$store.getters.lobby.player[this.componentid]},getColorObject:function(e){var t=this.colors.find((function(t){return t.value===e}));if(void 0===t){var n={name:"black",value:"#000000"};return n}return t}},computed:{getPlayerName:function(){return this.$store.getters.lobby.player[this.componentid].name},playerReady:function(){return this.$store.getters.lobby.player[this.componentid].ready},playerColor:function(){if(this.$store.getters.lobby.player[this.componentid].id===Number(window.$cookies.get("id"))){var e=this.$store.getters.clientPlayer.color;return this.getColorObject(e)}var t=this.$store.getters.lobby.player[this.componentid].color;return this.getColorObject(t)}}}),K=J,q=(n("8d21"),n("b974")),z=n("8654"),Q=Object(u["a"])(K,X,F,!1,null,"38cbbdbc",null),Z=Q.exports;f()(Q,{VCol:S["a"],VSelect:q["a"],VTextField:z["a"]});var ee={name:"lobby",mixins:[c],data:function(){return{readyButtonText:"Ready"}},methods:{setPlayerReady:function(){this.$store.getters.clientReady?(this.$store.dispatch("setClientPlayerUnReady"),this.readyButtonText="Ready"):(this.$store.dispatch("setClientPlayerReady"),this.readyButtonText="Unready"),this.sendPlayerData()},sendPlayerData:function(){this.sendObjectOverWebsocket({player:this.$store.getters.lobby.player},"lobby-change")},checkEnabled:function(e){return this.$store.getters.lobby.player[e].id===Number(window.$cookies.get("id"))},handler:function(){this.sendObjectOverWebsocket({id:Number(window.$cookies.get("id"))},"deregister")}},mounted:function(){console.log("LOBBY MOUNTED"),console.log("lobby: "+JSON.stringify(this.$store.getters.lobby)),console.log("gameRunning: "+this.$store.getters.gameRunning),this.$store.getters.gameRunning||(window.$cookies.isKey("id")?this.sendObjectOverWebsocket({id:Number(window.$cookies.get("id"))},"register"):this.sendObjectOverWebsocket({id:-1},"register"))},created:function(){window.addEventListener("beforeunload",this.handler)},components:{PlayerSettings:Z}},te=ee,ne=(n("643d"),Object(u["a"])(te,V,G,!1,null,"7d9f7799",null)),re=ne.exports,ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{position:"relative","overflow-x":"hidden"},attrs:{id:"game-wrapper-total"}},[e.$store.getters.getWinningDialog?n("div",{staticClass:"winning-background"}):e._e(),null!==e.model?n("Map",{ref:"Map",attrs:{playersdata:e.model.player}}):e._e(),n("div",{staticClass:"container-fluid",staticStyle:{overflow:"hidden",position:"absolute",top:"0","pointer-events":"none"}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col d-flex justify-content-center"},[n("div",{staticStyle:{"padding-top":"40px"}},[e.$store.getters.getShowUi?n("div",{staticClass:"justify-content-center"},[null!==e.model?n("div",[n("HeadLine",{attrs:{round:e.model.round,color:e.extractCurrentPlayer.color,name:e.extractCurrentPlayer.name,win:e.model.win}})],1):n("div",[n("v-progress-circular",{attrs:{width:3,indeterminate:""}})],1)]):e._e()])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-2"},[e.$store.getters.getShowUi?n("div",{staticClass:"history-wrapper",attrs:{id:"history-wrapper"}},[null!==e.model?n("div",[n("History",{ref:"History",attrs:{historyobject:e.model.history}})],1):n("div",[n("v-progress-circular",{attrs:{width:3,indeterminate:""}})],1)]):e._e()]),n("div",{staticClass:"col-lg-8 d-flex justify-content-center",staticStyle:{"z-index":"5"},attrs:{id:"win"}},[n("Win",{attrs:{model:e.model}})],1),n("div",{staticClass:"col-lg-2 d-flex justify-content-end"},[e.$store.getters.getShowUi?n("div",{staticClass:"stats-wrapper",attrs:{id:"stats-wrapper"}},[null!==e.model?n("div",[n("Stats",{ref:"Stats",attrs:{playersdata:e.model.player}})],1):n("div",[n("v-progress-circular",{attrs:{width:3,indeterminate:""}})],1)]):e._e()])]),n("div",{staticClass:"row fixed-bottom",staticStyle:{"z-index":"1"}},[e.$store.getters.getShowUi?n("div",{staticClass:"col d-flex justify-content-center w-25"},[n("div",[null!==e.model?n("div",[n("Controls",{ref:"Controls",attrs:{model:e.model,name:e.extractCurrentPlayer.name}})],1):n("div",[n("v-progress-circular",{attrs:{width:3,indeterminate:""}})],1)])]):e._e()])])],1)},ae=[],oe=n("b85c"),se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game-round justify-content-center"},[e._v(" Round: "+e._s(e.round)+" - Current Player:"),n("span",{style:"white-space: pre-wrap; color: "+e.color},[e._v(" "+e._s(e.name))]),n("br"),e.win?n("div",{staticClass:"d-flex justify-content-center"},[n("h5",[e._v("Game finished!")])]):e._e()])},ce=[],le={name:"HeadLine",props:{round:Number,color:String,name:String,win:Boolean}},de=le,ue=(n("6605"),Object(u["a"])(de,se,ce,!1,null,"b4b65eb8",null)),me=ue.exports,fe=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._m(0),e._l(e.playersdata.players,(function(t,i){return r("div",{key:i},[r("div",{staticClass:"stats-item"},[r("div",["MrX"===t.name?r("b",[e._v(e._s(t.name)+" Last seen: "+e._s(t.lastSeen))]):e._e(),"MrX"!==t.name?r("b",[r("span",{style:"color: "+t.color},[e._v(e._s(t.name))]),e._v(" Station: "+e._s(t.station))]):e._e()]),r("div",[r("div",{staticClass:"stats-ticket"},[r("img",{staticClass:"ticket-icon-stats",attrs:{src:n("a546")}}),r("div",{staticStyle:{"min-width":"3em"}},[e._v(" "+e._s(t.tickets.taxi)+" ")])]),r("div",{staticClass:"stats-ticket"},[r("img",{staticClass:"ticket-icon-stats",attrs:{src:n("76f1")}}),r("div",{staticStyle:{"min-width":"3em"}},[e._v(" "+e._s(t.tickets.bus)+" ")])]),r("div",{staticClass:"stats-ticket"},[r("img",{staticClass:"ticket-icon-stats",attrs:{src:n("5c65")}}),r("div",{staticStyle:{"min-width":"3em"}},[e._v(" "+e._s(t.tickets.underground)+" ")])]),"MrX"===t.name?r("div",[r("div",{staticClass:"stats-ticket"},[r("img",{staticClass:"ticket-icon-stats",attrs:{src:n("9bec")}}),r("div",{staticStyle:{"min-width":"3em"}},[e._v(" "+e._s(t.tickets.black)+" ")])])]):e._e()])])])}))],2)},ge=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"d-flex justify-content-center"},[n("h3",[e._v("Stats")])])}],pe={name:"Stats",props:{playersdata:Object}},ve=pe,be=(n("b9a4"),Object(u["a"])(ve,fe,ge,!1,null,"76e3344a",null)),ye=be.exports,he=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h3",[e._v("History")]),e._l(e.getReversedHistory(),(function(e,t){return r("div",{key:t,staticClass:"d-flex justify-content-center"},[r("div",{staticClass:"history-item"},[r("img",{staticClass:"ticket-icon",attrs:{src:n("31e8")("./"+e.ticketType+".svg")}})])])}))],2)},_e=[],we=(n("fb6a"),{name:"History",props:{historyobject:Object},methods:{getReversedHistory:function(){return this.historyobject.history.slice().reverse()}}}),ke=we,Ce=(n("1b80"),Object(u["a"])(ke,he,_e,!1,null,"8376a19e",null)),xe=Ce.exports,Se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"map-wrapper",staticClass:"map-wrapper",attrs:{id:"map-wrapper"}},[n("v-alert",{staticStyle:{"z-index":"40","margin-top":"3em"},attrs:{dismissible:"",color:"red",border:"left",elevation:"4","colored-border":"",icon:"mdi-alert-circle-outline"},model:{value:e.alert,callback:function(t){e.alert=t},expression:"alert"}},[e._v(" It's not your turn! ")]),n("canvas",{ref:"canvas",attrs:{id:"canvas",width:"2570",height:"1926"},on:{dblclick:function(t){return e.movePlayer(t)}}})],1)},Ee=[],Oe={name:"Map",mixins:[c],props:{playersdata:Object},data:function(){return{alert:!1}},methods:{movePlayer:function(e){if(console.log(this.$store.getters.gameRunning),this.$store.getters.gameRunning){var t=Number(window.$cookies.get("id"));if(-1!==t&&this.extractCurrentPlayer.id===t){var n=this.getXY(e),r=this.$store.getters.getCurrentTicketType,i={event:"move",ticketType:r,x:parseInt(n.x),y:parseInt(n.y)};console.log(i),this.sendObjectOverWebsocket(i,"move"),this.redraw()}else this.alert=!0}},getXY:function(e){var t=this.$refs["canvas"],n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}},handleMapDrag:function(){var e=T()("#map-wrapper"),t=T()("#canvas");T()("#canvas").draggable({drag:function(n,r){var i=20,a=document.getElementById("header").offsetHeight,o=document.getElementById("footer").offsetHeight,s=e.width(),c=t.width(),l=e.height(),d=t.height(),u=s-c-i,m=l-d-i-o;r.position.top>i+a&&(r.position.top=i+a),r.position.left>i&&(r.position.left=i),r.position.top<m&&(r.position.top=m),r.position.left<u&&(r.position.left=u)},scroll:!1})},redraw:function(){var e=this,t=this.$refs["canvas"];t.style.position="absolute";var r=t.getContext("2d"),i=new Image;i.id="map",i.src=n("ee3f"),i.onload=function(){r.drawImage(i,0,0);var t=e.playersdata.players[0],n=Number(window.$cookies.get("id"));t.isVisible||t.id===n?(r.beginPath(),r.arc(t.x,t.y,26,0,2*Math.PI,!1),r.lineWidth=10,r.strokeStyle=t.color,r.stroke()):"never"!==t.lastSeen&&(r.beginPath(),r.arc(t.lastSeenX,t.lastSeenY,26,0,2*Math.PI,!1),r.lineWidth=10,r.strokeStyle="#969696",r.stroke());for(var a=0;a<e.playersdata.players.length;a++){var o=e.playersdata.players[a];"MrX"!==o.name&&(r.beginPath(),r.arc(o.x,o.y,26,0,2*Math.PI,!1),r.lineWidth=10,r.strokeStyle=o.color,r.stroke())}}}},watch:{playersdata:function(){this.redraw()}},mounted:function(){this.handleMapDrag(),this.redraw()},computed:{extractCurrentPlayer:function(){var e,t=Object(oe["a"])(this.playersdata.players);try{for(t.s();!(e=t.n()).done;){var n=e.value;if(!0===n.current)return n}}catch(r){t.e(r)}finally{t.f()}return null}}},$e=Oe,Ne=(n("7c93"),Object(u["a"])($e,Se,Ee,!1,null,"cd9b298a",null)),Te=Ne.exports;f()(Ne,{VAlert:R["a"]});var Pe=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"game-controls",attrs:{id:"game-controls"}},[r("div",{staticClass:"d-flex justify-content-center currentPlayerName"},[r("label",[e._v(">")]),r("span",{style:"color: "+e.getClientColor()},[e._v(e._s(e.getClientName()))]),r("label",[e._v("<")])]),r("div",[r("label",[r("input",{staticClass:"ticket-radio",attrs:{type:"radio",checked:"true",id:"taxi",value:"t",name:"transport"},on:{change:e.commitSelectedTicketType}}),r("img",{staticClass:"ticket-icon",attrs:{src:n("1ad0")}})])]),r("div",[r("label",[r("input",{staticClass:"ticket-radio",attrs:{type:"radio",id:"bus",value:"b",name:"transport"},on:{change:e.commitSelectedTicketType}}),r("img",{staticClass:"ticket-icon",attrs:{src:n("bb11")}})])]),r("div",[r("label",[r("input",{staticClass:"ticket-radio",attrs:{type:"radio",id:"underground",value:"u",name:"transport"},on:{change:e.commitSelectedTicketType}}),r("img",{staticClass:"ticket-icon",attrs:{src:n("6187")}})])]),r("div",[r("label",["MrX"==e.name?r("div",[r("input",{staticClass:"ticket-radio",attrs:{type:"radio",id:"black",value:"x",name:"transport"},on:{change:e.commitSelectedTicketType}}),r("img",{staticClass:"ticket-icon",attrs:{src:n("e499")}})]):r("div",[r("input",{staticClass:"ticket-radio",attrs:{disabled:"true",type:"radio",id:"black",value:"x",name:"transport"},on:{change:e.commitSelectedTicketType}}),r("img",{staticClass:"ticket-icon",staticStyle:{opacity:"40%"},attrs:{src:n("e499")}})])])])])},je=[],Re={name:"Controls",data:function(){return{oldName:String}},props:{name:String,model:Object},methods:{commitSelectedTicketType:function(){for(var e=document.getElementsByName("transport"),t=0,n=e.length;t<n;t++)e[t].checked&&this.$store.dispatch("setCurrentTicketType",e[t].value)},getClientColor:function(){var e=Number(window.$cookies.get("id"));if(-1!=e){console.log(this.model.player.players);var t=this.model.player.players.find((function(t){return t.id===e}));return void 0===t?"#000000":t.color}return console.warn("Player id = -1! in clientPlayer"),"#000000"},getClientName:function(){var e=Number(window.$cookies.get("id"));if(-1!=e){console.log(this.model.player.players);var t=this.model.player.players.find((function(t){return t.id===e}));return void 0===t?"Spectator":t.name}return console.warn("Player id = -1! in getClientName"),"Spectator"}},watch:{name:function(){this.name!==this.oldname&&(document.getElementsByName("transport")[3].checked=!1,document.getElementsByName("transport")[2].checked=!1,document.getElementsByName("transport")[1].checked=!1,document.getElementsByName("transport")[0].checked=!0,this.$store.dispatch("setCurrentTicketType",document.getElementsByName("transport")[0].value),this.oldName=this.name)}}},We=Re,Me=(n("b95c"),Object(u["a"])(We,Pe,je,!1,null,"ec3c3540",null)),Be=Me.exports,Ae=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.$store.getters.getWinningDialog?r("div",{staticClass:"winning-dialog col d-flex flex-column justify-content-between",attrs:{id:"winning-dialog"}},[r("div",{staticClass:"d-flex justify-content-end",attrs:{id:"close-button"}},[r("v-btn",{attrs:{elevation:"9",fab:"",color:"red",small:""},on:{click:e.manageWinningDialog}},[r("v-icon",[e._v("mdi-close-circle")])],1)],1),r("div",{staticClass:"row d-flex justify-content-center"},[r("div",{staticClass:"col"},[r("div",{staticClass:"row d-flex justify-content-center",attrs:{id:"winning-row"}},["MrX"===e.model.winningPlayer?r("h1",{attrs:{id:"winning-title"}},[e._v(" MrX Won!!! ")]):r("h1",{attrs:{id:"winning-title"}},[e._v("Detectives Won!!!")])]),r("v-divider"),r("div",{staticClass:"row d-flex justify-content-center",attrs:{id:"winning-subtitle"}},["MrX"===e.model.winningPlayer?r("div",[e._v(" MrX escaped successfully ")]):r("div",[e._v(" MrX was caught at Station: "+e._s(e.extractCurrentPlayer.station)+" ")])])],1)]),r("div",{staticClass:"row d-flex justify-content-center",staticStyle:{"padding-top":"2.5em"},attrs:{id:"win-image"}},["MrX"===e.model.winningPlayer?r("img",{attrs:{width:250,height:250,src:n("56eb"),alt:e.MrX}}):r("img",{attrs:{width:250,height:250,src:n("e6ee"),alt:e.Detective}})]),e._m(0)]):e._e()},De=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row d-flex justify-content-center align-items-center align-self-center",staticStyle:{"padding-top":"2em"},attrs:{id:"win-button"}},[n("a",{attrs:{href:"/"}},[n("button",{staticClass:"standard-button"},[e._v("Main Menu")])])])}],Le={name:"Win",props:{model:Object},data:function(){return{setWinOnce:!1}},watch:{model:function(){this.model.win&&!this.setWinOnce&&(this.$store.dispatch("setWinningDialog",!0),this.setWinOnce=!0)}},computed:{extractCurrentPlayer:function(){var e,t=Object(oe["a"])(this.model.player.players);try{for(t.s();!(e=t.n()).done;){var n=e.value;if(!0===n.current)return n}}catch(r){t.e(r)}finally{t.f()}return null}},methods:{manageWinningDialog:function(){this.$store.dispatch("setWinningDialog",!1)}}},Ue=Le,Ie=(n("6ad9"),n("ce7e")),Ye=Object(u["a"])(Ue,Ae,De,!1,null,"0660512c",null),He=Ye.exports;f()(Ye,{VBtn:p["a"],VDivider:Ie["a"],VIcon:v["a"]});var Ve={name:"Game",props:{model:Object},data:function(){return{audio:null}},watch:{model:function(){console.log(JSON.stringify(this.model,null,2))}},computed:{extractCurrentPlayer:function(){var e,t=Object(oe["a"])(this.model.player.players);try{for(t.s();!(e=t.n()).done;){var n=e.value;if(!0===n.current)return n}}catch(r){t.e(r)}finally{t.f()}}},components:{Map:Te,Stats:ye,History:xe,HeadLine:me,Controls:Be,Win:He}},Ge=Ve,Xe=(n("568f"),n("490a")),Fe=Object(u["a"])(Ge,ie,ae,!1,null,null,null),Je=Fe.exports;f()(Fe,{VProgressCircular:Xe["a"]}),r["a"].use(A["a"]);var Ke=[{path:"/",name:"MainMenu",component:H},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/lobby",name:"Lobby",component:re},{path:"/game",name:"Game",component:Je}],qe=new A["a"]({mode:"history",base:"/",routes:Ke}),ze=qe,Qe=n("2f62");r["a"].use(Qe["a"]);var Ze=new Qe["a"].Store({state:{gameRunning:!1,currentTicketType:"t",websocket:Object,showUi:!0,showWinningDialog:!1,lobby:{maxPlayers:7,clientId:0,player:[]}},mutations:{SET_GAME_RUNNING:function(e,t){e.gameRunning=t},SET_PLAYER_READY:function(e,t){var n=Number(window.$cookies.get("id"));if(-1!=n){var r=e.lobby.player.find((function(e){return e.id===n}));r.ready=t}else console.warn("Player id = -1! in setReady")},UPDATE_LOBBY:function(e,t){e.lobby=t},UPDATE_LOBBY_PLAYER:function(e,t){e.lobby.player=t},UPDATE_LOBBY_CLIENTID:function(e,t){e.lobby.clientId=t},SET_CURRENT_TICKET_TYPE:function(e,t){e.currentTicketType=t},SET_PLAYER_COLOR:function(e,t){var n=Number(window.$cookies.get("id"));if(-1!=n){var r=e.lobby.player.find((function(e){return e.id===n}));r.color=t}else console.warn("Player id = -1! in setColor")},UPDATE_CLIENT_PLAYER_NAME:function(e,t){var n=Number(window.$cookies.get("id"));if(-1!=n){var r=e.lobby.player.find((function(e){return e.id===n}));r.name=t}else console.warn("Player id = -1! in updateName")},SET_WEBSOCKET:function(e,t){e.websocket=t},SET_SHOW_UI:function(e,t){e.showUi=t},SET_SHOW_WINNING_DIALOG:function(e,t){e.showWinningDialog=t}},actions:{setGameRunning:function(e,t){e.commit("SET_GAME_RUNNING",t)},setClientPlayerReady:function(e){e.commit("SET_PLAYER_READY",!0)},setClientPlayerUnReady:function(e){e.commit("SET_PLAYER_READY",!1)},updateLobby:function(e,t){e.commit("UPDATE_LOBBY",t)},updateLobbyPlayer:function(e,t){e.commit("UPDATE_LOBBY_PLAYER",t)},updateClientPlayerName:function(e,t){e.commit("UPDATE_CLIENT_PLAYER_NAME",t)},lobbySetClientId:function(e,t){e.commit("UPDATE_LOBBY_CLIENTID",t)},setPlayerColor:function(e,t){e.commit("SET_PLAYER_COLOR",t)},setCurrentTicketType:function(e,t){e.commit("SET_CURRENT_TICKET_TYPE",t)},setWebsocket:function(e,t){e.commit("SET_WEBSOCKET",t)},setShowUi:function(e,t){e.commit("SET_SHOW_UI",t)},setWinningDialog:function(e,t){e.commit("SET_SHOW_WINNING_DIALOG",t)}},getters:{gameRunning:function(e){return e.gameRunning},lobby:function(e){return e.lobby},clientPlayer:function(e){var t=Number(window.$cookies.get("id"));if(-1!=t){var n=e.lobby.player.find((function(e){return e.id===t}));return n}return console.warn("Player id = -1! in clientPlayer"),null},clientReady:function(e){var t=Number(window.$cookies.get("id"));if(-1!=t){var n=e.lobby.player.find((function(e){return e.id===t}));return n.ready}return console.warn("Player id = -1! in setReady"),-1},getCurrentTicketType:function(e){return e.currentTicketType},getWebsocket:function(e){return e.websocket},getShowUi:function(e){return e.showUi},getWinningDialog:function(e){return e.showWinningDialog}}}),et=n("f309"),tt=n("fcf4");r["a"].use(et["a"]);var nt=new et["a"]({theme:{themes:{light:{primary:"93b2e0",secondary:tt["a"].grey.darken1,accent:tt["a"].shades.black,error:tt["a"].red.accent3}}}}),rt=n("2b27"),it=n.n(rt),at=n("9483");Object(at["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({router:ze,store:Ze,vuetify:nt,VueCookies:it.a,render:function(e){return e(B)}}).$mount("#app")},"56eb":function(e,t,n){e.exports=n.p+"img/mrx-win.91444ed5.png"},"5c65":function(e,t,n){e.exports=n.p+"img/underground_small.de4b32bf.svg"},6187:function(e,t,n){e.exports=n.p+"img/Underground.9751aa5a.svg"},"61b2":function(e,t,n){"use strict";n("5652")},"643d":function(e,t,n){"use strict";n("e3a8")},6605:function(e,t,n){"use strict";n("2ebd")},"6ad9":function(e,t,n){"use strict";n("9d3b")},"75ad":function(e,t,n){},"76f1":function(e,t,n){e.exports=n.p+"img/bus_small.985e2be6.svg"},"7c93":function(e,t,n){"use strict";n("c989")},"85ec":function(e,t,n){},"8d21":function(e,t,n){"use strict";n("2283")},"9bec":function(e,t,n){e.exports=n.p+"img/black_small.0e9b3244.svg"},"9d3b":function(e,t,n){},a546:function(e,t,n){e.exports=n.p+"img/taxi_small.8a76b141.svg"},b95c:function(e,t,n){"use strict";n("75ad")},b9a4:function(e,t,n){"use strict";n("02a8")},bb11:function(e,t,n){e.exports=n.p+"img/Bus.8d9ccbd8.svg"},c457:function(e,t,n){},c989:function(e,t,n){},e3a8:function(e,t,n){},e499:function(e,t,n){e.exports=n.p+"img/Black.7f00415e.svg"},e6ee:function(e,t,n){e.exports=n.p+"img/detective-win.e29fdf90.png"},ee3f:function(e,t,n){e.exports=n.p+"img/map_large.26b2c88f.webp"}});
//# sourceMappingURL=app.230bc40f.js.map