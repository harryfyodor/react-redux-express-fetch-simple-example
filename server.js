/*
import 'babel-polyfill'
import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App, { rootReducer } from './client.js'
import { renderToString } from 'react-dom/server'

const app = Express()
const port = 3000

let initial = {
	items: [1,2,3]
}

app.get("/", (res, req) => {
	let initialState = initial

	const html = renderToString(
		<Provider>
			<App />
		</Provider>
	)

	const finalState = store.getState()

	res.send(renderFullPage(html, finalState))
})

app.get("/api/postItem", (res, req) => {
	console.log(req);
})

const renderFullPage = (html, initialState) => {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<title>EXAMPLE</title>
			</head>
			<body>
				<div id="root">${html}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				<script>
				<script src="client.js"></script>
			</body>
		</html>
		`
}

app.listen(port)

*/
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