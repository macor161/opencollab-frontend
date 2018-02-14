import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'react-materialize'

import { HomeStore } from './home-store'

import './home.css'

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
						<Card key={repo.name}>
							<span className="card-title">
								{repo.name}
								<Icon className="star-btn">ic_star_border</Icon>
							</span>
							<div className="content">
								<Link to={`/repo/${repo.name}`} key={i}>{repo.name}</Link>
							</div>
						</Card>
					)}

				</div>
			</div>
		)
	}
}

export default Home