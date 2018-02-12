import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button, Input, Preloader } from 'react-materialize'
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
                <div className="container-md">
                    <h2>My repo</h2>
                </div>
			</div>
		)
	}
}

export default RepoPage