// http://pankajparashar.com/posts/todo-app-react-js/

/*----------------------------------------------------
    Application complète
-----------------------------------------------------*/

var time;
var time2;

var IMessage = React.createClass({
    
    getInitialState: function(){ // Initialisation des données
        
        return{
            
            items: []
            
        };
        
    },
    loadItemsFromServer: function(){ // Récupération des données via l'objet XHR
        
        var that = this;
        
        xhrGet(this.props.url).then(function(response){
            
            that.setState({
                
                items: response
                
            });
            
        }, function(status){
            
            console.log("Error load items", status);
            
        });
        
    },
    componentDidMount: function(){ // Lancement de la récupération des données
        
        this.loadItemsFromServer();
        
    },
    updateItems: function(newItem){ // Ajout d'une nouvelle donnée
        
        this.clearElement();
        
        var allItems = this.state.items.concat([newItem]);
        
        this.setState({
            
            items: allItems
            
        });
        
        time = setTimeout(this.responseMessage, 500);
        
    },
    removeItem: function(idElem){ // Suppression d'une donnée
    
        this.state.items.splice(idElem, 1);
        this.setState({});
        
        this.clearElement();
    
    },
    clearElement: function(){
    
        clearTimeout(time);
        clearTimeout(time2);
        
        var allItems = this.state.items;
        var newIndex = allItems.length - 1;
        
        if(this.state.items[newIndex].text === "..."){
            
            allItems.splice(newIndex, 1);
            this.setState({});
            
        }
    
    },
    responseMessage: function(){
        
        var randomItem = {
            
            text: "...",
            important: "",
            classMessage: ""
            
        };
        
        var allItems = this.state.items.concat([randomItem]);
        var newIndex = allItems.length - 1;
        var that = this;
        
        this.setState({
            
            items: allItems
            
        });
        
        this.randomMessage(newIndex);
        
    },
    randomMessage: function(newIndex){
        
        var that = this;
        var responses = ["Do you want to lunch with me ?", "I buy a new car !! A Ford Raptor ! ;)", "Have you recently spoke to paul ?", "The weather is good today. Do you want to go snowboarding ? Snow is good right now !", "I'm the best !! HAHA !!", "What do you think about this app ?", "Will you come to my party ?", "Movie tonight ?", "Yes, it's a ReactJS App"];
        
        var maxResponses = responses.length;
        var indexResponse = Math.floor((Math.random() * maxResponses));
        
        time2 = setTimeout(function(){
            
            that.state.items[newIndex].text = responses[indexResponse];
            that.setState({});
            
        }, 2000);
        
    },
    render: function(){
        
        return(
        
            <div id="imessagesBox">
                <IMessageBanner />
                <IMessageList items={this.state.items} onRemove={this.removeItem} />
                <IMessageForm onFormSubmit={this.updateItems} />
            </div>
        
        );
        
    }
    
});

/*----------------------------------------------------
    Titre
-----------------------------------------------------*/

var IMessageBanner = React.createClass({
    
    render: function(){
        
        return(
        
            <div id="banner">
                <h3>IMessage React JS</h3>
            </div>
            
        );
        
    }
    
});

/*----------------------------------------------------
    Liste des actions
-----------------------------------------------------*/

var IMessageList = React.createClass({
    
    render: function(){
        
        var onRemove = this.props.onRemove;
        
        var createItem = this.props.items.map(function(itemText, i){
            
            return(
            
                <IMessageListItem key={i} idElem={i} itemData={itemText} onRemove={onRemove}></IMessageListItem>
            
            );
            
        });
        
        return(
        
            <ul id="listIMessage">
                {createItem}
            </ul>
            
        );
        
    }
        
});

/*----------------------------------------------------
    Application seule
-----------------------------------------------------*/

var IMessageListItem = React.createClass({
    
    handleClick: function(){ // Suppression d'une donnée depuis le bouton
        
        this.props.onRemove(this.props.idElem);
        
    },
    render: function(){
        
        var classesLi;
        var button = "";
        
        if(this.props.itemData.important === "oui"){ // affichage ou non de la class important
            
            classesLi = this.props.itemData.classMessage + " important";
            
        }else{
            
            classesLi = this.props.itemData.classMessage;
        
        }
        
        if(this.props.itemData.classMessage === "blue"){ // Affichage du bouton de suppression
            
            button = <i className="glyphicon glyphicon-remove" onClick={this.handleClick}></i>;
            
        }
            
        return(
            
            <li className={classesLi}>
                <span className="contentLi">{this.props.itemData.text} {button}</span>
            </li>
            
        );
        
    }
    
});

/*----------------------------------------------------
   Formulaire
-----------------------------------------------------*/

var IMessageForm = React.createClass({
    
    handleSubmit: function(e){ // Ajout d'une donnée depuis le formulaire
        
        e.preventDefault();
        
        var text = this.refs.text.value.trim();
        var important = this.refs.important.checked;
        
        if(!text){
            
            return;
            
        }
        
        if(important === true){
            
            important = "oui";
            
        }else{
            
            important = "";
            
        }
        
        this.props.onFormSubmit({
            
            text: text,
            important: important,
            classMessage: "blue"
            
        });
        
        this.refs.text.value = "";
        this.refs.important.checked = false;
        
    },
    render: function(){
        
        return(
        
            <div id="footer">
                <form onSubmit={this.handleSubmit}>
                    <input type="checkbox" ref="important" /> <span className="importantButton">important</span>
                    <input className="form-control" type="text" ref="text" placeholder="iMessage" />
                    <button type="submit">Envoyer</button>
                </form>
            </div>
            
        );
        
    }
    
});

/*----------------------------------------------------
    Affichage global
-----------------------------------------------------*/

ReactDOM.render(
    
    <IMessage url="app/js/src/json/data.json" />,
    document.getElementById("imessage")

);