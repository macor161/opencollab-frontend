import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './header.css'


class Header extends Component {

	render(){
		return(
			<div className="header">
				<div className="container">
					<Link to="/" className="main-logo">OpenCollab {/*Frontend*/}</Link>

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
