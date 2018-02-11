import React, { Component } from 'react'
import Header from '../header/header'
import Home from '../../pages/home/home'
import NewRepoPage from '../../pages/new-repo/new-repo'
import {
	HashRouter as Router,
	Route,
  } from 'react-router-dom'


import './main.css'


class Main extends Component {
	render() {
		return(
			<Router>
				<div>
					<Header />
					<Route exact path="/" component={Home} />
					<Route exact path="/new-repo" component={NewRepoPage} />
				</div>
			</Router>
		)
	}
}

export default Main