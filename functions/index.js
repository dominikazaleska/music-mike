// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');

// Constants for Dialogflow Agent Actions
const WELCOME = 'input.welcome';
const ITEM_SELECTED = 'item.selected';
const MUSIC_GENRE = 'music.genre';
const ELECTRONIC = 'electronic';
const ROCK = 'rock';
const JAZZ = 'jazz';
const MEDIA_STATUS = 'media.status';
const SUGGESTIONS = 'suggestions';
const BYE_CARD = 'bye.card';
const BYE_RESPONSE = 'bye.response';
const NORMAL_ASK = 'normal.ask';
const NORMAL_BYE = 'normal.bye';

// Constants for list and carousel selection
const SELECTION_KEY_JAZZ = 'jazz';
const SELECTION_KEY_ELECTRONIC = 'electronic';
const SELECTION_KEY_ROCK = 'rock';

// Constant for image URLs
const IMG_URL_MUSIC_MIKE = 'https://firebasestorage.googleapis.com/v0/b/music-listener-5f886.appspot.com/o/music-mike.png?alt=media&token=89e92dbd-9d74-49ed-82b6-9ae367891823';
const IMG_URL_ELECTRONIC = 'https://firebasestorage.googleapis.com/v0/b/music-listener-5f886.appspot.com/o/electronic.png?alt=media&token=9dbf1a56-9c89-4b67-8702-fe5fdbb11dbf';
const IMG_URL_ROCK = 'https://firebasestorage.googleapis.com/v0/b/music-listener-5f886.appspot.com/o/rock.png?alt=media&token=500f4e3a-b54d-4b06-b4a6-8dc1b00e89db';
const IMG_URL_JAZZ = 'https://firebasestorage.googleapis.com/v0/b/music-listener-5f886.appspot.com/o/jazz.png?alt=media&token=7b98e672-d494-44be-95f8-bc4fb4f3846c';

const ELECTRONIC_SOURCE = 'https://firebasestorage.googleapis.com/v0/b/music-listener-5f886.appspot.com/o/Sunspot_NL_-_08_-_Volcanic.mp3?alt=media&token=467ec80e-b23d-4a14-8514-25ceb5849fbc';
const ROCK_SOURCE = 'https://firebasestorage.googleapis.com/v0/b/music-listener-5f886.appspot.com/o/Cambo_-_03_-_Travel.mp3?alt=media&token=2bdc5779-a872-40e8-b8cb-d6600b3636e4';
const JAZZ_SOURCE = 'https://firebasestorage.googleapis.com/v0/b/music-listener-5f886.appspot.com/o/Split_Phase_-_38_-_Galaxies.mp3?alt=media&token=1859193f-f347-4c6f-bcee-028ad4dad711';

const intentSuggestions = [
    'Rock',
    'Electronic',
    'Jazz'
];

exports.conversationComponent = functions.https.onRequest((req, res) => {
  const app = new DialogflowApp({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Welcome
  function welcome (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse({speech: 'Hi there!', displayText: 'Hello there!'})
      .addSimpleResponse({
        speech: 'I am the Music Mike. What music do we listen today?',
        displayText: 'I am the Music Mike. What tunes do we listen today?'})
      .addBasicCard(app.buildBasicCard(`I am the Music Mike. I'm here to tune you input.`) 
        .setSubtitle('You\'re perfect DJ for today')
        .setTitle('Music Mike')
        .setImage(IMG_URL_MUSIC_MIKE, 'Music Mike'))
    )
  }

  function normalAsk (app) {
    app.ask('Ask me to play music');
  }

  // Suggestions
  function suggestions (app) {
    app.ask(app
      .buildRichResponse()
      .addSimpleResponse('Choose the music you want to listen')
      .addSuggestions(intentSuggestions))
  }

  // List
  function musicGenre (app) {
    app.askWithList(app.buildRichResponse()
      .addSimpleResponse('What do You want to listen? ')
      .addSuggestions(intentSuggestions),
      // Build a list
      app.buildList('Choose from below:')
        // Add the first item to the list
        .addItems(app.buildOptionItem(SELECTION_KEY_ROCK,
          ['rock', 'listen to rock', 'rock music'])
          .setTitle('Rock')
          .setDescription('Feel the best of rock experience')
          .setImage(IMG_URL_ROCK, 'Rock Music'))
        // Add the second item to the list
        .addItems(app.buildOptionItem(SELECTION_KEY_ELECTRONIC,
          ['electronic', 'listen to electronic music', 'electronic music'])
          .setTitle('Electronic music')
          .setDescription('Feel the beat')
          .setImage(IMG_URL_ELECTRONIC, 'Electronic Music')
        )
        // Add third item to the list
        .addItems(app.buildOptionItem(SELECTION_KEY_JAZZ,
          ['jazz', 'listen to jazz music', 'jazz music'])
          .setTitle('Jazz music')
          .setDescription('Let\'s Jazz')
          .setImage(IMG_URL_JAZZ, 'Jazz Music')
        )
    );
  }

  // React to list or carousel selection
  function itemSelected (app) {
    const param = app.getSelectedOption();
    console.log('USER SELECTED: ' + param);
    if (!param) {
      app.ask('Choose some music');
    } else if (param === SELECTION_KEY_ROCK) {
      rock (app);
    } else if (param === SELECTION_KEY_JAZZ) {
      jazz (app);
    } else if (param === SELECTION_KEY_ELECTRONIC) {
      electronic (app);
    } else {
      app.ask('You selected an unknown music');
    }
  }

  function electronic (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse('Let\'s listen some electronic music')
      .addMediaResponse(app.buildMediaResponse()
        .addMediaObjects(
          app.buildMediaObject('Sunspot', ELECTRONIC_SOURCE)
            .setDescription('Volcanic')
            .setImage(IMG_URL_ELECTRONIC, app.Media.ImageType.ICON)
        ))
      .addSuggestions(intentSuggestions)
    );
  }

  function rock (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse('Let\'s listen some rock music')
      .addMediaResponse(app.buildMediaResponse()
        .addMediaObjects(
          app.buildMediaObject('Travel', ROCK_SOURCE)
            .setDescription('Cambo')
            .setImage(IMG_URL_ROCK, app.Media.ImageType.ICON)
        ))
      .addSuggestions(intentSuggestions)
    );
  }

  function jazz (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse('Let\'s listen some jazz music')
      .addMediaResponse(app.buildMediaResponse()
        .addMediaObjects(
          app.buildMediaObject('Galaxies', JAZZ_SOURCE)
            .setDescription('Split Phase')
            .setImage(IMG_URL_JAZZ, app.Media.ImageType.ICON)
        ))
      .addSuggestions(intentSuggestions)
    );
  }

  // Handle a media status event
  function mediaStatus (app) {
    const status = app.getMediaStatus();
    const simpleResponse = status === app.Media.Status.FINISHED
      ? 'Hope you enjoyed the tunes!'
      : 'Maybe again?';
    app.ask(app.buildRichResponse()
      .addSimpleResponse(simpleResponse)
      .addSuggestions(intentSuggestions));
  }

  // Leave conversation with card
  function byeCard (app) {
    app.tell(app.buildRichResponse()
      .addSimpleResponse('Goodbye :)')
      .addBasicCard(app.buildBasicCard('Bye, see you next time')));
  }

  // Leave conversation with SimpleResponse
  function byeResponse (app) {
    app.tell({speech: 'Okay see you later',
      displayText: 'OK see you later!'});
  }

  // Leave conversation
  function normalBye (app) {
    app.tell('Okay see you later!');
  }

  const actionMap = new Map();
  actionMap.set(WELCOME, welcome);
  actionMap.set(MUSIC_GENRE, musicGenre);
  actionMap.set(ITEM_SELECTED, itemSelected);
  actionMap.set(SUGGESTIONS, suggestions);
  actionMap.set(ELECTRONIC, electronic);
  actionMap.set(ROCK, rock);
  actionMap.set(JAZZ, jazz);
  actionMap.set(MEDIA_STATUS, mediaStatus);
  actionMap.set(NORMAL_ASK, normalAsk);
  actionMap.set(BYE_CARD, byeCard);
  actionMap.set(NORMAL_BYE, normalBye);
  actionMap.set(BYE_RESPONSE, byeResponse);

  app.handleRequest(actionMap);
});
