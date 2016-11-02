/* ---------- Requirements ---------- */
var express 						= require('express'),
		app									= express(),
		api 								= express.Router();
		bodyParser 					= require('body-parser'),
		mongoose 						= require('mongoose'),
		meetupsController 	= require('./server/controllers/meetups-controller.js');
		captchaController 	= require('./server/controllers/captcha-controller.js');


/* ----- MongoDB ----- */
mongoose.connect('mongodb://localhost:27017/dbtest');


/* ----- Global Variables ----- */
var view = __dirname + '/client/views';
var css = __dirname + '/client/css';
var js = __dirname + '/client/js';
var asset = __dirname + '/client/asset';
var recaptcha = __dirname + '/node_modules/angular-recaptcha/release/';
var port = process.env.PORT || 3000;


/* ----- Middlewares ----- */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/js', express.static(js));
app.use('/css', express.static(css));
app.use('/recaptcha', express.static(recaptcha));
app.use('/api',api);


/* ---------- Routes ---------- */

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/client/views/index.html');
});

app.get('/test', function (req, res) {
	res.sendfile(__dirname + '/client/views/test.html');
});

app.get('/forget-password', function (req, res) {
	res.sendfile(__dirname + '/client/views/forget-password.html');
});

app.get('/kontrol', function (req, res) {
	res.sendfile(__dirname + '/client/views/kontrol.html');
});



/* ---------- API Routes ---------- */

api.route('/meetups')
	.get(meetupsController.list)
	.post(meetupsController.create);

api.route('/')
  .get(function (request,response) {
    response.send({
      developer: 'omerraker'
    });
  });

api.route('/add')
  .post(function (request,response) {
    var post = new Post({
      title: request.body.title,
      content: request.body.content,
      user: request.body.id
    });
    post.save(function (err,xxx) {
      if (err) return response.status(500).send('Error');
      response.status(200).send({status: 'Successfull', id:xxx._id});
    });
  });



app.listen(port, function(){
	console.log('Dinliyor');
})
