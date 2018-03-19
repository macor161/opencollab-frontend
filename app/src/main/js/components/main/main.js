import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'

import { history } from '../../lib/history'

import Header from '../header/header'
import Home from '../../pages/home/home'
import NewRepoPage from '../../pages/new-repo/new-repo'
import ImportGithubRepoPage from '../../pages/import-github-repo/import-github-repo'
import RepoPage from '../../pages/repo/repo-page'


import './main.css'


class Main extends Component {
	render() {
		return(
			<Router history={history}>
				<div>
					<Header />
					<Route exact path="/" component={Home} />
					<Route exact path="/new-repo" component={NewRepoPage} />
					<Route exact path="/import-github-repo" component={ImportGithubRepoPage} />
					<Route exact path="/repo/:id" component={RepoPage} />
					<Route exact path="/repo/:id/:section" component={RepoPage} />
					<Route exact path="/repo/:id/:section/:subSection" component={RepoPage} />
				</div>
			</Router>
		)
	}
}

export default Main
