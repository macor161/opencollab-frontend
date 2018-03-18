import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
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

	render = () =>
    <div className="header">
      <div className="container">
        <Link to="/" className="main-logo">OpenCollab {/*Frontend*/}</Link>

        <div className="main-menu">
          { this.tokensVisible() &&
            <div className="available-tokens">
              <strong>{repoStore.availableTokensString}</strong> tokens
            </div>
          }	
          <Dropdown text='+' className="new-repo-btn">
            <Dropdown.Menu>
            <Dropdown.Item><Link to="/new-repo">Create a new repository</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/import-github-repo">Import from GitHub</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>				
          <Link to="/" className="user" />
        </div>
      </div>
    </div>

}

export default Header
