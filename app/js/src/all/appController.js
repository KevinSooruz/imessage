// http://pankajparashar.com/posts/todo-app-react-js/

/*----------------------------------------------------
    Application complète
-----------------------------------------------------*/

"use strict";

var time;
var time2;

var IMessage = React.createClass({
    displayName: "IMessage",

    getInitialState: function getInitialState() {
        // Initialisation des données

        return {

            items: []

        };
    },
    loadItemsFromServer: function loadItemsFromServer() {
        // Récupération des données via l'objet XHR

        var that = this;

        xhrGet(this.props.url).then(function (response) {

            that.setState({

                items: response

            });
        }, function (status) {

            console.log("Error load items", status);
        });
    },
    componentDidMount: function componentDidMount() {
        // Lancement de la récupération des données

        this.loadItemsFromServer();
    },
    updateItems: function updateItems(newItem) {
        // Ajout d'une nouvelle donnée

        this.clearElement();

        var allItems = this.state.items.concat([newItem]);

        this.setState({

            items: allItems

        });

        time = setTimeout(this.responseMessage, 500);
    },
    removeItem: function removeItem(idElem) {
        // Suppression d'une donnée

        this.state.items.splice(idElem, 1);
        this.setState({});

        this.clearElement();
    },
    clearElement: function clearElement() {

        clearTimeout(time);
        clearTimeout(time2);

        var allItems = this.state.items;
        var newIndex = allItems.length - 1;

        if (this.state.items[newIndex].text === "...") {

            allItems.splice(newIndex, 1);
            this.setState({});
        }
    },
    responseMessage: function responseMessage() {

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
    randomMessage: function randomMessage(newIndex) {

        var that = this;
        var responses = ["Do you want to lunch with me ?", "I buy a new car !! A Ford Raptor ! ;)", "Have you recently spoke to paul ?", "The weather is good today. Do you want to go snowboarding ? Snow is good right now !", "I'm the best !! HAHA !!", "What do you think about this app ?", "Will you come to my party ?", "Movie tonight ?", "Yes, it's a ReactJS App"];

        var maxResponses = responses.length;
        var indexResponse = Math.floor(Math.random() * maxResponses);

        time2 = setTimeout(function () {

            that.state.items[newIndex].text = responses[indexResponse];
            that.setState({});
        }, 2000);
    },
    render: function render() {

        return React.createElement(
            "div",
            { id: "imessagesBox" },
            React.createElement(IMessageBanner, null),
            React.createElement(IMessageList, { items: this.state.items, onRemove: this.removeItem }),
            React.createElement(IMessageForm, { onFormSubmit: this.updateItems })
        );
    }

});

/*----------------------------------------------------
    Titre
-----------------------------------------------------*/

var IMessageBanner = React.createClass({
    displayName: "IMessageBanner",

    render: function render() {

        return React.createElement(
            "div",
            { id: "banner" },
            React.createElement(
                "h3",
                null,
                "IMessage React JS"
            )
        );
    }

});

/*----------------------------------------------------
    Liste des actions
-----------------------------------------------------*/

var IMessageList = React.createClass({
    displayName: "IMessageList",

    render: function render() {

        var onRemove = this.props.onRemove;

        var createItem = this.props.items.map(function (itemText, i) {

            return React.createElement(IMessageListItem, { key: i, idElem: i, itemData: itemText, onRemove: onRemove });
        });

        return React.createElement(
            "ul",
            { id: "listIMessage" },
            createItem
        );
    }

});

/*----------------------------------------------------
    Application seule
-----------------------------------------------------*/

var IMessageListItem = React.createClass({
    displayName: "IMessageListItem",

    handleClick: function handleClick() {
        // Suppression d'une donnée depuis le bouton

        this.props.onRemove(this.props.idElem);
    },
    render: function render() {

        var classesLi;
        var button = "";

        if (this.props.itemData.important === "oui") {
            // affichage ou non de la class important

            classesLi = this.props.itemData.classMessage + " important";
        } else {

            classesLi = this.props.itemData.classMessage;
        }

        if (this.props.itemData.classMessage === "blue") {
            // Affichage du bouton de suppression

            button = React.createElement("i", { className: "glyphicon glyphicon-remove", onClick: this.handleClick });
        }

        return React.createElement(
            "li",
            { className: classesLi },
            React.createElement(
                "span",
                { className: "contentLi" },
                this.props.itemData.text,
                " ",
                button
            )
        );
    }

});

/*----------------------------------------------------
   Formulaire
-----------------------------------------------------*/

var IMessageForm = React.createClass({
    displayName: "IMessageForm",

    handleSubmit: function handleSubmit(e) {
        // Ajout d'une donnée depuis le formulaire

        e.preventDefault();

        var text = this.refs.text.value.trim();
        var important = this.refs.important.checked;

        if (!text) {

            return;
        }

        if (important === true) {

            important = "oui";
        } else {

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
    render: function render() {

        return React.createElement(
            "div",
            { id: "footer" },
            React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement("input", { type: "checkbox", ref: "important" }),
                " ",
                React.createElement(
                    "span",
                    { className: "importantButton" },
                    "important"
                ),
                React.createElement("input", { className: "form-control", type: "text", ref: "text", placeholder: "iMessage" }),
                React.createElement(
                    "button",
                    { type: "submit" },
                    "Envoyer"
                )
            )
        );
    }

});

/*----------------------------------------------------
    Affichage global
-----------------------------------------------------*/

ReactDOM.render(React.createElement(IMessage, { url: "app/js/src/json/data.json" }), document.getElementById("imessage"));
