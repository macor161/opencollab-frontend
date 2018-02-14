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
		window.homeStore = this.store
	}

	render() {
		return(
			<div className="home page">
				<div className="container container-md">
					<h2>My Repositories</h2>
					<br />
					{this.store.repos.map((repo, i) =>
						<Card 
							key={repo.name} 
							actions={[
								<Link key="view" to={`/repo/${repo.name}`}>View repository</Link>, 
								<Link key="issues" to={`/repo/${repo.name}/issues`}>{repo.issueCount.toString()} issues</Link>
							]}>
							<span className="card-title">
								{repo.name}
								<Icon className="star-btn">ic_star_border</Icon>
							</span>
							<div className="content">
								{repo.description}
							</div>
						</Card>
					)}

				</div>
			</div>
		)
	}
}

export default Home