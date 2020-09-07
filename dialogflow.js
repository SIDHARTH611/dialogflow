const fetch = require('node-fetch');
const Headers = require('fetch-headers');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
	function userhandler(agent){
		const id = agent.parameters.id;
		agent.add(`hello ${id}`);
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('token', 'f05b47750ff0912:e49eb1325342b1b');

		const init = {
			method: 'GET',
			headers
		};

		fetch(`https://timepass.erpnext.com/api/resource/Customer/${id}`, init)
		.then((response) => {
			return response.text(); // or .json() or .blob() ...
		})
		.then((text) => {
			console.log(text); 
		})
		.catch((e) => {
			console.log(e); 
		});
	}

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();

  intentMap.set('user_info', userhandler);
  agent.handleRequest(intentMap);
});
