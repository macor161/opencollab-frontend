import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main/main'
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
  module.hot.accept('./components/main/main.js', () => {
	  const newRoot = require('./components/main/main').default
	  render(newRoot)
  })
}