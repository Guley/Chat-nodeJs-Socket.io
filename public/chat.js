//make connection for server side

var socket = io.connect('http://localhost:3000');
 var logoffTimer;
 var userList = [];

//Query Dom

var message = document.getElementById('message');
    handle  = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');
    clients = document.getElementById('clients');
    
//emit events
var logoffTimer;
var gettingOutTimer;

btn.addEventListener('click',function(){
    var rand = Math.floor((Math.random() * 1000) + 1);
    this.handle = (handle.value == '' )?'Anonymous-'+rand:handle.value;

   
    if(userList.indexOf(this.handle) === -1) {
        userList.push(this.handle)   
    } 

    if(message.value == ''){
        alert('Please type your message')
        return;
    }
    handle.disabled = "disabled";
    socket.emit('chat',{
        'message':message.value,
        'handle':this.handle
    });
    message.value = '';
    handle.value =  this.handle;
})
message.addEventListener('keypress',function(){
    this.handle = (handle.value == '' )?'Anonymous-'+rand:handle.value;
    clearTimeout(logoffTimer);
    logoffTimer = setTimeout(function(){
        socket.emit("logoff", {});
    }, 60 * 30);
    console.log(this.handle)
    socket.emit('typing',this.handle)

})
 
//listen on event
socket.on('chat',function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><stong>'+data.handle+'</strong>: '+data.message+'</p>';
})
socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+data+' is typing....</em></p>';
})
socket.on('logoff',function(data){
    feedback.innerHTML = "";
})
socket.on('user-left',function(data){
    feedback.innerHTML = '<p><em>'+data+' is left from chat..</em></p>';
    clearTimeout(gettingOutTimer);
    gettingOutTimer = setTimeout(function(){
        socket.emit("logoff", {});
    }, 60 * 30);
})
