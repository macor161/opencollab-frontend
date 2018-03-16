import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { headerStore } from './header-store'

import './header.css'

@observer
class Header extends Component {

	render(){
		return(
			<div className="header">
				<div className="container">
					<Link to="/" className="main-logo">OpenCollab {/*Frontend*/}</Link>

					<div className="available-tokens">
						<strong>{headerStore.availableRepoTokens && headerStore.availableRepoTokens.toString()}</strong> tokens
					</div>
					<div className="main-menu">
						<Link to="/new-repo" className="plus">+</Link>
						<Link to="/" className="user" />
					</div>
				</div>
			</div>
		)
	}
}

export default Header
