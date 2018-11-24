var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    createdAt: formattedTime,
    text: message.text,
    from: message.from,
  });
  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var $messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'user',
    text: $messageTextBox.val(),
  }, function () {
    $messageTextBox.val('');
  });
});
