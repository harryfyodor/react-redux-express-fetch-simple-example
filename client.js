import 'babel-polyfill'
import React from 'react'
import { combineReducers } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index.js'
import App from './components/App.js'
import configureStore from './store/configureStore'

const store = configureStore()

// render
render(
	<Provider store={store}>
		<App />
	</Provider>,
  document.getElementById('root')
)