//make connection for server side

var socket = io.connect('http://localhost:3000');
 var logoffTimer;
//Query Dom

var message = document.getElementById('message');
    handle  = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');
//emit events
var logoffTimer;
btn.addEventListener('click',function(){
    socket.emit('chat',{
        'message':message.value,
        'handle':handle.value
    });
})
message.addEventListener('keypress',function(){
    clearTimeout(logoffTimer);
    logoffTimer = setTimeout(function(){
        socket.emit("logoff", { reason: "Logged off due to inactivity" });
    }, 60 * 30);
    socket.emit('typing',handle.value)

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





