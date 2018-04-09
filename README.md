# music-mike
Actions on Google and Dialogflow DJ - Music Mike let's you listen the music right from Google Assistant.

# Setup

1. Create project on [Actions on Google Console](https://console.actions.google.com/).

2. Choose the Dialogflow option.

3. Click on the gear icon -> Select Export and Import -> Restore from .zip.

4. Restore from the music-mike.zip file in this repo.

5. Clone the repo to your computer.

6. Get into the folder.

7. Install dependencies in functions folder - ```npm install```

8. Create a Firebase project in the Firebase Console.

9. Init project
Deploy the fulfillment webhook provided in the functions folder using Google Cloud Functions for Firebase:
Create a Firebase project in the Firebase Console if you don't have one already.
Follow the instructions to set up and initialize Firebase SDK for Cloud Functions. Make sure to reply "N" when asked to overwrite existing files by the Firebase CLI. 1.Run firebase deploy --only functions and take note of the endpoint where the fulfillment webhook has been published. It should look like Function URL (conversationComponent): https://us-central1-YOUR_PROJECT.cloudfunctions.net/conversationComponent
Go back to the Dialogflow console and select Fulfillment from the left navigation menu. Enable Webhook, set the value of URL to the Function URL from the previous step, then click Save.
Select Integrations from the left navigation menu and open the Settings menu for Actions on Google.
Click Test.
Click View to open the Actions on Google simulator.
Type Talk to my test app in the simulator, or say OK Google, talk to my test app to any Actions on Google enabled device signed into your developer account.
