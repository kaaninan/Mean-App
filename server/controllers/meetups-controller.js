var Meetup = require('../models/meetup');
var unirest = require('unirest');

module.exports.create = function(req, res) {
    var meetup = new Meetup(req.body);
    meetup.save(function(err, result) {
        res.json(result);
    });
}

module.exports.list = function(req, res) {
    Meetup.find({}, function(err, results) {
        res.json(results);
    });
}


module.exports.control = function(req, res) {

    unirest.post('https://www.google.com/recaptcha/api/siteverify')
        .header('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            secret: '6Le13AoUAAAAANXjenfUkzziarYKxxtBAhPtzLD_',
            response: req.body.response
        })
        .end(function(response) {
            // console.log(response.body.success);
            console.log(response.body);
            res.status(200).send({
                status: response.body.success
            });
        });

}
