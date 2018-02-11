import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './header.css'


class Header extends Component {

	render(){
		return(
			<div className="header" style={{ marginTop: 20 }}>
				<h1>OpenCollab Frontend</h1>

				<Link to="/new-repo">+</Link>
			</div>
		)
	}
}

export default Header
