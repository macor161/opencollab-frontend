import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { headerStore } from './header-store'
import { repoStore } from '../../pages/repo/repo-page-store'

import './header.css'
import { isNumber } from 'util';

@observer
class Header extends Component {

	/**
	 * Returns true if tokens must be shown
	 * in the header bar.
	 */
	tokensVisible() {
		return repoStore.availableTokensString
	}

	render(){
		return(
			<div className="header">
				<div className="container">
					<Link to="/" className="main-logo">OpenCollab {/*Frontend*/}</Link>

					<div className="main-menu">
						{ this.tokensVisible() &&
							<div className="available-tokens">
								<strong>{repoStore.availableTokensString}</strong> tokens
							</div>
						}					
						<Link to="/new-repo" className="plus">+</Link>
						<Link to="/" className="user" />
					</div>
				</div>
			</div>
		)
	}
}

export default Header
