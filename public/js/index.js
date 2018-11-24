var socket = io();

function scrollToBottom() {
  // Selectors
  var $messages = jQuery('#messages');
  var $newMessage = $messages.children('li:last-child');

  // Heights
  var clientHeight = $messages.prop('clientHeight');
  var scrollTop = $messages.prop('scrollTop');
  var scrollHeight = $messages.prop('scrollHeight');
  var newMessageHeight = $newMessage.innerHeight();
  var lastMessageHeight = $newMessage.prev().innerHeight();

  // Math
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
      scrollHeight) {
    $messages.scrollTop(scrollHeight);
  }
}

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
  scrollToBottom();
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
