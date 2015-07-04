# Web Push Notifications Demo

A full-stack application demonstrating the use of web push notifications, with complete set-up instructions. Built against Chrome 45,

The code borrows heavily (read: steals shamelessly) from Matt Gaunt's [HTML5 Rocks](http://www.html5rocks.com/) tutorial, [Push Notifications on the Open Web](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web). A few things differ from what is shown in the tutorial:

- I've added a back-end (a very, very simple Sinatra application).
- I'm making use of the notifications.data attribute (which was not available prior to Chrome 44) to direct the user to a specific location when he clicks on a notification.
- I've removed a bunch of feature checks are removed to simplify the code. In a real app that stuff should probably go back in.

## Set up

- In the [Google Developers Console](https://console.developers.google.com):
  - Create a project
  - Get the Project Number (in the Overview section)
  - Generate a public API access server key under APIs & auth -> Credentials
  - Enable the messaging API: APIs & auth -> Mobile APIs -> Cloud Messaging for Android -> Enable API

- Clone this repository

- Set shell variables for your Project Number and API Key:
  - `export PUSH_PROJECT_NUMBER="YOUR PROJECT NUMBER"`
  - `export PUSH_API_KEY="YOUR API KEY"`

- Also set the `gcm_sender_id` parameter in `manifest.json` with your Project Number

- Within the repository directory, run `gem install sinatra` and then `ruby app.rb`.

## Testing

You need to visit the page so the service worker will be initialized, and you'll need to grant permission for notifications. Note also that you must be signed in to Chrome in order to register for push notifications. Then you can test notifications either by clicking the "Notify Me" button, or with `curl http://localhost:4567/push`, which will work with or without a tab open for the app.

## To do

- Clicking notification should open existing client window if present (instead of a new window)
- Fix the UI
- Associate registrations with users
- Send a real notification payload once Chrome implements it (it appears that [work has begun](https://code.google.com/p/chromium/issues/detail?id=486040) as of June 24th, 2015.
- Try not to fail silently when there is no network connection

## Reading and Resources

- Service Workers: [Repository](https://github.com/slightlyoff/ServiceWorker), [Specification](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html)
- Push API: [Repository](https://github.com/w3c/push-api), [Specification](http://w3c.github.io/push-api/)
- Notifications API: [Repository](https://github.com/whatwg/notifications), [Specification](https://notifications.spec.whatwg.org/)
- Fetch API: [Repository](https://github.com/whatwg/fetch), [Specification](https://fetch.spec.whatwg.org/)
- Matt Gaunt, [Push Notifications on the Open Web](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web)
- Matt Gaunt, [Introduction to Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
- Matt Gaunt, [Introduction to Fetch](http://updates.html5rocks.com/2015/03/introduction-to-fetch)
- Jake Archibald, [Javascript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
- The [Mozilla Developer Network](https://developer.mozilla.org/en-US/) has helpful articles on all the relevant topics and APIs