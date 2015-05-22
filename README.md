# Web Push Notifications Demo

A full-stack application demonstrating the use of web push notifications. Built against Chrome 45.

The code borrows heavily (read: steals shamelessly) from the the Mat Gaunt's [HTML5 Rocks](http://www.html5rocks.com/) tutorial, [Push Notifications on the Open Web](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web). A few things are different from what is shown in the tutorial:

- A back-end is added (a very, very simple Sinatra application)
- Makes use of the notifications.data attribute (not available prior to Chrome 44) to direct the user to a specific location when he clicks on the ntification
- A bunch of feature checks are removed to simplify the code. In a real app that stuff should go back in.

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

- Also set the gcm_sender_id parameter in manifest.json with your Project Number

- Within the repository directory, run `gem install sinatra` and then `ruby app.rb`.

## Testing

To test notifications with or without a tab open for the app: `curl http://localhost:4567/push`

## To do

- Clicking notification should open existing client window if present
- Fix the UI
- Add a button to push notifications from the page
- Associate registrations with users
- Send a real notification payload once Chrome/GCM implements that