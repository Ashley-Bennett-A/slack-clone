(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(22)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n,s=a(0),o=a.n(s),r=a(9),i=a.n(r),c=(a(15),a(1)),l=a(2),u=a(4),m=a(3),g=a(5),h=(a(16),a(17),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={origin:void 0},a}return Object(g.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.sender===this.props.user?this.setState({origin:!0}):this.setState({origin:!1})}},{key:"timeFormatter",value:function(){return this.props.date.slice(11,19)}},{key:"avatarLoad",value:function(){if(!this.props.avatar)return"https://i.ya-webdesign.com/images/default-avatar-png-6.png"}},{key:"render",value:function(){var e,t;return this.state.origin?(e="Sent",t="Right"):(e="Recieved",t="Left"),o.a.createElement("li",{className:"MessageCont "+t,key:this.props.mKey},o.a.createElement("div",{className:"userInfo"},o.a.createElement("img",{className:"MessageAvatar",src:this.avatarLoad(),alt:"avatar"})),o.a.createElement("div",null,o.a.createElement("p",{className:"MessageBody "+e},this.props.body),o.a.createElement("p",{className:"MessageDate "+t},this.timeFormatter()," ",this.props.sender)))}}]),t}(s.Component)),p=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={messages:[],user:null},a.autoScroll=function(){a.messagesEnd.scrollIntoView({behaviour:"smooth"})},a}return Object(g.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.setState({messages:this.props.messages,user:this.props.user}),this.autoScroll()}},{key:"componentDidUpdate",value:function(){this.autoScroll()}},{key:"render",value:function(e){var t=this;return o.a.createElement("div",{className:"MessagesContainer"},this.state.messages.map(function(e){return o.a.createElement(h,{user:t.state.user.id,avatar:t.state.user.avatarUrl,sender:e.senderId,body:e.parts[0].payload.content,date:e.createdAt})}),o.a.createElement("div",{ref:function(e){t.messagesEnd=e}}))}}]),t}(s.Component),d=(a(18),function(e){return o.a.createElement("div",{className:"SendContainer"},o.a.createElement("input",{className:"sendBar",type:"text",placeholder:"Say something...",onChange:e.changeHandler}),o.a.createElement("i",{className:"fas fa-paper-plane sendButton",onClick:e.submitter}))}),f=(a(19),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(l.a)(t,[{key:"nameSpliter",value:function(){return this.props.status.split(" ")}},{key:"statusChecker",value:function(){return"online"===this.nameSpliter()[1]?"online":"offline"}},{key:"render",value:function(){return o.a.createElement("div",{className:"UserStatus "+this.statusChecker()},o.a.createElement("p",null,this.nameSpliter()[0]))}}]),t}(s.Component)),v=(a(20),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={messages:[],value:"",messageToSend:"",user:null,usersInRoom:0,usersAreActive:"offline",currentRoom:null,peopleInRoom:{},messagesLoaded:!1,test:[],peopleOffline:[]},a.send=function(e){e.preventDefault(),a.state.user.sendSimpleMessage({text:a.state.value,roomId:a.state.currentRoom}),a.setState({value:""})},a.createRoom=function(){a.state.user.createRoom({name:"New ".concat(a.state.user.id," Room"),private:!1,addUserIds:["AB","CR"],customData:{foo:42}}).then(function(e){console.log("Created room called ".concat(e.name))}).catch(function(e){console.log("Error creating room ".concat(e))})},a.handleChange=function(e){a.setState({value:e.target.value})},a}return Object(g.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.manager.connect().then(function(t){e.setState({currentRoom:e.props.room,user:t,messagesLoaded:!0}),e.state.user.subscribeToRoomMultipart({roomId:e.props.room,hooks:{onMessage:function(a){var n=e.state.messages;n.push(a),e.setState({usersInRoom:t.users.length,messages:n})},onPresenceChanged:function(t,a){e.setState({user:e.state.user});var s,o=[],r=[];Object.keys(e.state.user.presenceStore).length===e.state.usersInRoom&&Object.keys(e.state.user.presenceStore).forEach(function(t){n=e.state.user.presenceStore[t],"online"===(s=t+" "+n).split(" ")[1]?o.push(s):r.push(s)}),e.setState({test:o,peopleOffline:r}),e.setState({peopleInRoom:e.state.user.presenceStore}),a.name===e.props.manager.userId&&e.setState({usersAreActive:t.current})}},messageLimit:100})}).catch(function(e){return console.log(e)})}},{key:"componentWillUnmount",value:function(){console.log("unsubbed"),console.log(this.props.user.roomSubscriptions)}},{key:"render",value:function(){return o.a.createElement("div",{className:"RoomContainer"},o.a.createElement("h1",null,"Room ",this.state.currentRoom,"(",this.state.usersInRoom,"users)"," ")," ",o.a.createElement("div",{className:"UserContainer"}," ",this.state.test.map(function(e){return o.a.createElement(f,{status:e})})," ",this.state.peopleOffline.map(function(e){return o.a.createElement(f,{status:e})})," ")," ",this.state.messagesLoaded?o.a.createElement(p,{messages:this.state.messages,user:this.state.user}):o.a.createElement("h1",null," No messages ")," ",o.a.createElement(d,{changeHandler:this.handleChange,submitter:this.send})," ")}}]),t}(o.a.Component)),y=a(6),b=a.n(y),E=(a(21),function(e){return e.loginFail?o.a.createElement("div",{className:"login"},o.a.createElement("input",{type:"text",placeholder:"Case sensitive ID please...",onChange:e.changeHandler}),o.a.createElement("i",{type:"submit",className:"true",onClick:e.loggin},"Login")):o.a.createElement("div",{className:"login"},o.a.createElement("input",{type:"text",placeholder:"Case sensitive ID please....",onChange:e.changeHandler}),o.a.createElement("i",{type:"submit",className:"false",onClick:e.loggin},"Login"))}),S=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={rooms:[],user:null,currentRoom:null,manager:null,loggedIn:!1,logInValue:"",logInFail:!1},a.roomChange=function(e){a.setState({room:null});var t=e.target.id;setTimeout(function(){return a.setState({room:o.a.createElement(v,{room:t,manager:a.state.manager,user:a.state.user})})},100)},a.handleLogInChange=function(e){a.setState({logInValue:e.target.value})},a.loggin=function(e){e.preventDefault(),a.setState({logInFail:!1});var t=new b.a.TokenProvider({url:"https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e26280f8-acac-4da9-9e2a-80cd549547f8/token"}),n=new b.a.ChatManager({instanceLocator:"v1:us1:e26280f8-acac-4da9-9e2a-80cd549547f8",userId:a.state.logInValue,tokenProvider:t});n.connect().then(function(e){a.setState({user:e,rooms:e.rooms,currentRoom:e.rooms[0].id,manager:n,logInFail:!1});var t;t=a.state.currentRoom,a.setState({loggedIn:!0,room:o.a.createElement(v,{room:t,manager:a.state.manager,user:a.state.user})})}).catch(function(e){console.log(e),a.setState({logInFail:!0})})},a}return Object(g.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},this.state.loggedIn?console.log("Logging in"):o.a.createElement(E,{loggin:this.loggin,loginFail:this.state.logInFail,changeHandler:this.handleLogInChange}),this.state.logInFail?o.a.createElement("h1",null," No user by that ID.Try again. "):console.log("Successfully Logged in"),o.a.createElement("div",{className:"roomList"},this.state.rooms.map(function(t){return o.a.createElement("i",{className:"roomNames",key:t.id,id:t.id,onClick:e.roomChange},t.name)})),this.state.room)}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,1,2]]]);
//# sourceMappingURL=main.e4011a52.chunk.js.map