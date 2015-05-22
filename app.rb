require 'sinatra'
require 'json'
require 'restclient'

PROJECT_NUMBER = ENV["PUSH_PROJECT_NUMBER"]
API_KEY = ENV["PUSH_API_KEY"]
ENDPOINT = "https://android.googleapis.com/gcm/send"

get "/" do
  erb :index
end

#Use subscription info to push a notification via GCM
get "/push" do
  puts "called GET /push"
  file = File.open "registration.dat", "r"
  registrationId = file.gets
  file.close

  result = RestClient.post ENDPOINT, { 'registration_ids' => [registrationId] }.to_json, :content_type => :json, :accept => :json, :authorization => "key=#{API_KEY}"
  p result
  204
end

#Save the subscription - only one at a time!
post "/subscription" do
  puts "called POST /subscription"
  registrationId = request.body.read.split('/').last
  file = File.open "registration.dat", "w"
  file.puts registrationId
  file.close
  204
end

# Since there is currently no support for a push notification payload,
# we create an endpoint to fetch the notification content from the service worker
get "/message" do
  content_type :json
  { message: (0...20).map{65.+(rand(26)).chr}.join }.to_json # String of random characters
end

# To check that the notification.data attribute is being used correctly
get "/notification-link" do
  "A notification sent you here"
end