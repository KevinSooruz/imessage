"use strict";function getXMLHttpRequest(){var xhr=null;if(!window.XMLHttpRequest&&!window.ActiveXObject)return console.log("Votre navigateur ne supporte pas l'objet XMLHTTPRequest..."),null;if(window.ActiveXObject)try{xhr=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){xhr=new ActiveXObject("Microsoft.XMLHTTP")}else xhr=new XMLHttpRequest;return xhr}function xhrGet(url){var promise=new Promise(function(resolve,reject){var xhr=getXMLHttpRequest();xhr.onreadystatechange=function(){if(4===xhr.readyState&&(200===xhr.status||0===xhr.status)){var data=JSON.parse(xhr.responseText);return resolve(data)}},xhr.open("GET",url,!0),xhr.send(null)});return promise}var time,time2,IMessage=React.createClass({displayName:"IMessage",getInitialState:function(){return{items:[]}},loadItemsFromServer:function(){var that=this;xhrGet(this.props.url).then(function(response){that.setState({items:response})},function(status){console.log("Error load items",status)})},componentDidMount:function(){this.loadItemsFromServer()},updateItems:function(newItem){this.clearElement();var allItems=this.state.items.concat([newItem]);this.setState({items:allItems}),time=setTimeout(this.responseMessage,500)},removeItem:function(idElem){this.state.items.splice(idElem,1),this.setState({}),this.clearElement()},clearElement:function(){clearTimeout(time),clearTimeout(time2);var allItems=this.state.items,newIndex=allItems.length-1;"..."===this.state.items[newIndex].text&&(allItems.splice(newIndex,1),this.setState({}))},responseMessage:function(){var randomItem={text:"...",important:"",classMessage:""},allItems=this.state.items.concat([randomItem]),newIndex=allItems.length-1;this.setState({items:allItems}),this.randomMessage(newIndex)},randomMessage:function(newIndex){var that=this,responses=["Do you want to lunch with me ?","I buy a new car !! A Ford Raptor ! ;)","Have you recently spoke to paul ?","The weather is good today. Do you want to go snowboarding ? Snow is good right now !","I'm the best !! HAHA !!","What do you think about this app ?","Will you come to my party ?","Movie tonight ?","Yes, it's a ReactJS App"],maxResponses=responses.length,indexResponse=Math.floor(Math.random()*maxResponses);time2=setTimeout(function(){that.state.items[newIndex].text=responses[indexResponse],that.setState({})},2e3)},render:function(){return React.createElement("div",{id:"imessagesBox"},React.createElement(IMessageBanner,null),React.createElement(IMessageList,{items:this.state.items,onRemove:this.removeItem}),React.createElement(IMessageForm,{onFormSubmit:this.updateItems}))}}),IMessageBanner=React.createClass({displayName:"IMessageBanner",render:function(){return React.createElement("div",{id:"banner"},React.createElement("h3",null,"IMessage React JS"))}}),IMessageList=React.createClass({displayName:"IMessageList",render:function(){var onRemove=this.props.onRemove,createItem=this.props.items.map(function(itemText,i){return React.createElement(IMessageListItem,{key:i,idElem:i,itemData:itemText,onRemove:onRemove})});return React.createElement("ul",{id:"listIMessage"},createItem)}}),IMessageListItem=React.createClass({displayName:"IMessageListItem",handleClick:function(){this.props.onRemove(this.props.idElem)},render:function(){var classesLi,button="";return classesLi="oui"===this.props.itemData.important?this.props.itemData.classMessage+" important":this.props.itemData.classMessage,"blue"===this.props.itemData.classMessage&&(button=React.createElement("i",{className:"glyphicon glyphicon-remove",onClick:this.handleClick})),React.createElement("li",{className:classesLi},React.createElement("span",{className:"contentLi"},this.props.itemData.text," ",button))}}),IMessageForm=React.createClass({displayName:"IMessageForm",handleSubmit:function(e){e.preventDefault();var text=this.refs.text.value.trim(),important=this.refs.important.checked;text&&(important=important===!0?"oui":"",this.props.onFormSubmit({text:text,important:important,classMessage:"blue"}),this.refs.text.value="",this.refs.important.checked=!1)},render:function(){return React.createElement("div",{id:"footer"},React.createElement("form",{onSubmit:this.handleSubmit},React.createElement("input",{type:"checkbox",ref:"important"})," ",React.createElement("span",{className:"importantButton"},"important"),React.createElement("input",{className:"form-control",type:"text",ref:"text",placeholder:"iMessage"}),React.createElement("button",{type:"submit"},"Envoyer")))}});ReactDOM.render(React.createElement(IMessage,{url:"app/js/src/json/data.json"}),document.getElementById("imessage"));