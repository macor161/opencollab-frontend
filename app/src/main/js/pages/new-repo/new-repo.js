import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from 'react-materialize'

import './new-repo.css'


class NewRepoPage extends Component {

	render(){
		return(
			<div className="new-repo page">
                <div className="container-md">
				    <h2>Create a new repository</h2>
                    <p className="subhead-description">
                        A repository contains all the files for your project, including the revision history.
                    </p>
                    <hr />

                    <Input />
                </div>
			</div>
		)
	}
}

export default NewRepoPage