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

9. Init project in the main directory - ```firebase init```

10. Deploy the fulfillment webhook provided in the functions folder using Google Cloud Functions for Firebase by running
```firebase deploy --only functions``` 
11. Copy the Function URL (conversationComponent): https://us-central1-YOUR_PROJECT.cloudfunctions.net/conversationComponent

12. In Dialogflow console select Fulfillment from the left navigation menu. Enable Webhook, set the value of URL to the Function URL from the previous step, then click Save.

13. Select Integrations from the left navigation menu and open the Settings menu for Actions on Google.

14. Click Test.

15. Click View to open the Actions on Google simulator.

16. Type Talk to my test app in the simulator, or say OK Google, talk to my test app to any Actions on Google enabled device signed into your developer account.
