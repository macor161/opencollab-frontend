import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main'
import { AppContainer } from 'react-hot-loader'

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	)
}
 
render(Main)

if (module.hot) {
  module.hot.accept('./components/main.js', () => {
	  const newRoot = require('./components/main').default
	  render(newRoot)
  })
}