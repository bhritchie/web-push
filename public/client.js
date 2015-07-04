var pushEnabled = false

function saveSubscription(subscription) {
  console.log("running saveSubscription")
  console.log(subscription)
  fetch("/subscription", {method: "post", headers: { "Content-type": "application/json; charset=UTF-8" }, body: subscription.endpoint })
}

function subscribe() {
  console.log("running subscribe")
  var pushButton = document.querySelector('#toggle-push');
  var pushButtonLabel = document.querySelector('#toggle-push-label');
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then(function(subscription) {
        pushEnabled = true;
        pushButtonLabel.textContent = 'Disable Push Messages';
        pushButton.disabled = false;
        return saveSubscription(subscription);
      })
      .catch(function(error) {
        console.log(error)
        if (Notification.permission === 'denied') {
          console.debug('Permission for Notifications was denied');
          pushButton.disabled = true;
        } else {
          console.debug('Unable to subscribe to push.', error);
          pushButton.disabled = false;
          pushButtonLabel.textContent = 'Enable Push Messages';
        }
      });
  });
}

function initialiseState() {

  if (Notification.permission === 'denied') {
    console.warn('The user has blocked notifications.');
    return;
  }

  // We need the service worker registration to check for a subscription
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    console.log("getting subscription")
    // Do we already have a push message subscription?
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {

        console.log("got subscription: ", subscription)

        // Enable UI for subscribing and unsubscribing from push messages.
        var pushButton = document.querySelector('#toggle-push');
        var pushButtonLabel = document.querySelector('#toggle-push-label');
        pushButton.disabled = false;

        if (!subscription) {
          // We aren't subscribed to push, so set UI to allow the user to enable push  
          return;
        }
        
        saveSubscription(subscription);

        // Set UI to show they have subscribed for push messages
        pushButtonLabel.textContent = 'Disable Push Messages';
        pushEnabled = true;
      })
      .catch(function(err) {  
        console.warn('Error during getSubscription()', err);  
      });  
  });  
}

window.addEventListener('load', function() {
  var pushButton = document.querySelector('#toggle-push');
  pushButton.addEventListener('click', function() {
    if (pushEnabled) {
      unsubscribe();
    } else {
      subscribe();
    }
  });

  // Initialize service worker if browser supports it
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: "/" })
    .then(initialiseState);
  } else {  
    console.warn('Service workers aren\'t supported in this browser.');  
  } 
});