// Copyright 2020 Universitätsklinikum Schleswig-Holstein, R. Wendlandt
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const {TextView, contentView} = require('tabris');
const Paho = require('./paho-mqtt');

// create client-ID
const clientId = 'Assetfinder_' + Math.random().toString(16).substr(2, 8);
const statusTopic = '/HealthCAT/Assetfinder/' + clientId;

// Create a client instance
const client = new Paho.Client('ws://mqtt.eclipse.org:80/mqtt', clientId);

// Show status on simple TextView
const textView = new TextView({
  centerX: true, top: '100',
  font: '24px'
}).appendTo(contentView);

textView.text = 'connecting...';


client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  textView.text = 'MQTT Connected!';
  // eslint-disable-next-line no-undef
  console.log('MQTT Connected!');
  client.subscribe('/HealthCAT/Assetfinder/#');
  let message = new Paho.Message('online');
  message.destinationName = statusTopic;
  client.send(message);
}

// called when a message arrives
function onMessageArrived(message) {
  // eslint-disable-next-line no-undef
  console.log("onMessageArrived:"+message.payloadString);
}

