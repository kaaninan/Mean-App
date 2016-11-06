/* ---------- Requirements ---------- */
var express = require('express');
var express_session = require('express-session');
var app = express();
var api = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser')();
var connect_ensure_login = require('connect-ensure-login')
var meetupsController = require('./server/controllers/meetups-controller.js');
var loginController = require('./server/controllers/login-controller.js');


// passport
passport.use(new Strategy(
    function(username, password, cb) {
        loginController.findByUsername(username, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != password) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
    loginController.findById(id, function(err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

/* ----- MongoDB ----- */
mongoose.connect('mongodb://localhost:27017/dbtest');

/* ----- Global Variables ----- */
var view = __dirname + '/client/views';
var css = __dirname + '/client/css';
var js = __dirname + '/client/js';
var asset = __dirname + '/client/asset';
var modules = __dirname + '/node_modules/';
var port = process.env.PORT || 3000;


app.set('views', view)
app.set('view engine', 'ejs');


/* ----- Middlewares ----- */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser);
app.use(express_session({
    secret: 'awsomeSecret',
    resave: false,
    saveUninitialized: false
}));
app.use('/js', express.static(js));
app.use('/css', express.static(css));
app.use('/asset', express.static(asset));
app.use('/modules', express.static(modules));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', api);


/* ---------- Routes ---------- */

app.get('/', function(req, res) {
    if (req.user) res.redirect('/' + req.user.type);
    var title = "Sisteme Giriş";
    res.render('login', {
        title: title
    });
});

app.get('/forget', function(req, res) {
    var title = "Şifremi Unuttum";
    res.render('forget', {
        title: title
    });
});


app.get('/admin', connect_ensure_login.ensureLoggedIn('/'),
    function(req, res) {
        if (req.user.type == "admin") {
            var title = "Yönetim Paneli";
            res.render('admin/index', {
                title: title,
                username: req.user.displayName
            });
        } else {
            res.redirect('/' + req.user.type);
        }
    });

app.get('/ogretmen', connect_ensure_login.ensureLoggedIn('/'),
    function(req, res) {
        if (req.user.type == "ogretmen") {
            var title = "Öğretmen Paneli";
            res.render('ogretmen/index', {
                title: title,
                username: req.user.displayName
            });
        } else {
            res.redirect('/' + req.user.type);
        }
    });

app.get('/ogrenci', connect_ensure_login.ensureLoggedIn('/'),
    function(req, res) {
        if (req.user.type == "ogrenci") {
            var title = "Öğrenci Paneli";
            res.render('ogrenci/index', {
                title: title,
                username: req.user.displayName
            });
        } else {
            res.redirect('/' + req.user.type);
        }
    });


app.get('/kontrol', function(req, res) {
    res.sendfile(__dirname + '/client/views/kontrol.html');
});

app.get('/profile',
    connect_ensure_login.ensureLoggedIn('/'),
    function(req, res) {
        res.sendfile(__dirname + '/client/views/kontrol.html');
    });


app.get('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/');
    });



/* ---------- API Routes ---------- */



api.route('/login')
    .post(passport.authenticate('local', {
        failureRedirect: '/kontrol'
    }), function(req, res) {
        console.log("Giriş Yapıldı: " + req.user);
        res.status(200).send({
            login: "true",
            user: req.user
        });
    });


api.route('/meetups')
    .get(meetupsController.list)
    .post(meetupsController.create);

api.route('/captcha')
    .post(meetupsController.control);

api.route('/add')
    .post(function(request, response) {
        var post = new Post({
            title: request.body.title,
            content: request.body.content,
            user: request.body.id
        });
        post.save(function(err, xxx) {
            if (err) return response.status(500).send('Error');
            response.status(200).send({
                status: 'Successfull',
                id: xxx._id
            });
        });
    });



app.listen(port, function() {
    console.log('Started');
})
