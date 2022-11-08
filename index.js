//============================================================================
// Basic Config
//============================================================================
const express = require('express');
// instantiate express
const app = express();
app.set('port', process.env.PORT || 3000);

//============================================================================
// Middleware
//============================================================================
// `express.json` parses application/json request data and
//  adds it to the request object as request.body
app.use(express.json());
// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
const requestLogger = require('./middleware/request_logger');
app.use(requestLogger);
//============================================================================
// ROUTES
//============================================================================
// Redirect
app.get('/', (req, res) => {
	res.redirect('/api/');
});
/* START CONTROLLERS HERE */
const usersController = require('./controllers/users');
app.use('/api/users/', usersController);
const charactersController = require('./controllers/character');
app.use('/api/characters/', charactersController);
const cardsController = require('./controllers/cards');
app.use('/api/cards', cardsController);
const storiesController = require('./controllers/stories');
app.use('/api/stories', storiesController);
const events = require('./controllers/events');
app.use('/api/events', events);
const npcs = require('./controllers/npcs');
app.use('/api/npcs', npcs);
/* END CONTROLLERS HERE */

const { handleErrors } = require('./middleware/custom_errors');
app.use(handleErrors);
//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
