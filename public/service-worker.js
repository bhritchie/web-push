"use strict";

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  event.waitUntil(
    fetch("/message").then(function(response) {

      response.json().then(function(data) {

        var title = 'My app message:';
        var body = data.message;
        var icon = '/icon-192x192.png';
        var tag = 'simple-push-demo-notification-tag';
        var data = { link: "/notification-link" }
        
        self.registration.showNotification(title, {
          body: body,
          icon: icon,
          tag: tag,
          data: data
        });
      });
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url === self.registration.scope && 'focus' in client) {
        return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.link);
      }
    })
  );
});