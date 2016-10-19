/**
 * Created by nomantufail on 10/19/2016.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
app.get('/', function(req, res){
    res.send('index.html');
});

var users = [];
io.on('connection', function(socket){
    users.push(socket.id);
    io.emit('users changed', users);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        users.remove(socket.id);
        io.emit('users changed', users);
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});