import React, { Component } from 'react'
import Header from './header/header'
import Home from '../pages/home/home'
import {
	HashRouter as Router,
	Route,
  } from 'react-router-dom'


class Main extends Component {
	render() {
		return(
			<Router>
				<div>
					<Header />
					<Route exact path="/" component={Home} />
				</div>
			</Router>
		)
	}
}

export default Main
