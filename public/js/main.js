// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId({sID, message}){
    //debugger;
    vm.socketID = sID;
}

function runDisconntectMessage(packet){
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg){
    // take the incoming message and push it into the Vue instance
    // into the message array
    vm.messages.push(msg);
}

// this is our main Vue instance
const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        nickName: ""
    },

    methods: {
        dispatchMessage(){
            // emit a message event and send the message to the server
            console.log('handle send message');

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickName || "anonymous"
                // || is called a double pipe operator or an "or" operator
                // if this.nickName is set, use it as the value
                // or just make name "anonymous"
    
            })
            
            this.message = "";
        },

        submit(){
            console.log('handle send message');

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickName || "anonymous"
            })

            this.message = "";
        }
    },
    
    components: {
        newmessage: ChatMessage
    },

    mounted: function() {
        console.log('mounted');
    }
}).$mount("#app");

// some cebet handling -> these events are coming from the server
socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconntectMessage);
socket.addEventListener('new_message', appendNewMessage);
