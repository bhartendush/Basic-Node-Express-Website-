var express = require('express');
var path    = require('path');
var bodyParser = require('body-parser');
var nodeMailer  = require('nodemailer');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', function(req,res){
	res.render('index', {title:'Welcome'});
});

app.get('/about', function(req,res){
	res.render('about');
});

app.get('/contact', function(req,res){
	res.render('contact');
});

app.post('/contact/send', function(req,res){
	var transporter = nodeMailer.createTransport({
		service:'Gmail',
		auth: {
			user:'bhartendu7285@gmail.com',
			pass: 'your Password'
		}
	});

	var mailOptions = {
		from:'Bhartendu <bhartendu7285@gmail.com>',
		to:'bhartendu7285@gmail.com',
		subject:' website Submission',
		text: 'You have a submission with following details.... Name:'+req.body.name+ 'Email:' +req.body.email+ 'Message' +req.body.message,
		html:'<p>You have a submission with following details.... </p><ul><li>Name:' +req.body.name+'</li><li>Email:'+req.body.email+'</li><li>Message:'+req.body.message+' </li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent:' +info.response);
			res.redirect('/');
		}
	})
});

app.listen(3000)
	console.log('listening to port 3000....');
