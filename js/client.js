var socket = io.connect("127.0.0.1:8000");

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});
