var express = require('express');
var socket = require('socket.io');
//App setup
var app = new express();
var server = app.listen(3000,function(){
    console.log('Server connected on http://localhost:3000');
});

//Static file

app.use(express.static('public'));


//scokets setup

var io = new socket(server);

//Make socket connection
io.on('connection',function(socket){
    console.log('Socket connected successfully');

    io.on('disconnect', function(socket) {
        
        console.log('Socket disconnected',socket.id);
    });

    //Receive message
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    })
    socket.on('logoff',function(data){
        socket.broadcast.emit('logoff',data);
    })
    socket.on('user-left',function(data){
        socket.broadcast.emit('user-left',data);
    })
})

