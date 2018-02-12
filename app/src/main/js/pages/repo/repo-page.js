import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button, Input, Preloader, Breadcrumb, MenuItem } from 'react-materialize'
import { default as c } from 'classnames'

import './repo-page.css'

@observer
class RepoPage extends Component {

    store

    constructor(props) {
        super(props)
    }

	render(){
		return(
            <div className="repo page">
                <div className="container">
                    <Breadcrumb>
                        <MenuItem>Repositories</MenuItem>
                        <MenuItem>{this.props.match.params.id}</MenuItem>
                    </Breadcrumb>
                </div>
			</div>
		)
	}
}

export default RepoPage