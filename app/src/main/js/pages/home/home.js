import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { HomeStore } from './home-store'
//import fs from 'fs'

@observer class Home extends Component {

	store

	constructor(props) {
		super(props)

		this.store = new HomeStore()	

	}

	render() {
		return(
			<div className="home page">
				<div className="container container-md">
					<h2>My Repositories</h2>
					<br />
					{this.store.repos.map((repo, i) =>
						<Link to={`/repo/${repo.name}`} key={i}>{repo.name}</Link>
					)}

				</div>
			</div>
		)
	}
}

export default Home