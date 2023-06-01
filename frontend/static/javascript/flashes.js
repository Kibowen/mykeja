$(document).ready(function() {
    var message = find(".flashes");

    if (message.length) {
      message.show();
      setTimeout(function() {
        message.hide();
      }, 3000);
    }
  });