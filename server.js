var Express = require('express') 
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
//var express = require('body-parser')
var bodyParser = require('body-parser')

var app = new Express()
var port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

var items = [
	"first",
	"second",
	"third"
]

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

//app.use(Express.bodyParser())
app.post("/send", function(req, res) {
	console.log(req.body)
	items.push(req.body.item);
	console.log("New item " + req.body.item)
	res.json({ status: 'ok' })
})

app.get("/list", function(req, res) {
	res.json({ "items" : items })
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
