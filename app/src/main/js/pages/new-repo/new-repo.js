import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button, Input, Preloader } from 'react-materialize'
import { default as c } from 'classnames'

import { NewRepoStore } from './new-repo-store'

import './new-repo.css'

@observer
class NewRepoPage extends Component {

    store

    constructor(props) {
        super(props)
        this.store = new NewRepoStore()
        window.newRepoStore = this.store
    }

	render(){
		return(
            <div className={c("new-repo", "page", { "loading" : this.store.isLoading })}>
                <div className="container-md">
				    <h2>Create a new repository</h2>
                    <p className="subhead-description">
                        A repository contains all the files for your project, including the revision history.
                    </p>
                    <br />

                    <Input 
                        label="Repository Name" 
                        value={this.store.name} 
                        onChange={e => this.store.name = e.target.value } 
                    />

                    <Input 
                        label="Repository Description" 
                        value={this.store.description} 
                        onChange={e => this.store.description = e.target.value } 
                    />

                    <br />

                    <Input 
                        label="Number of tokens to create"
                        type="number"
                        className="token-amount"
                        value={this.store.tokenAmount}
                        onChange={e => this.store.tokenAmount = parseInt(e.target.value || 0) } 
                    />

                    <Input 
                        label="Voter reward percentage"
                        type="number"
                        className="voter-reward-pct"
                        value={this.store.voterRewardPercentage}
                        onChange={e => this.store.voterRewardPercentage = parseFloat(e.target.value || 0) } 
                    />

                    <Input 
                        label="Voter penalty percentage"
                        type="number"
                        className="voter-penalty-pct"
                        value={this.store.voterPenaltyPercentage}
                        onChange={e => this.store.voterPenaltyPercentage = parseFloat(e.target.value || 0) } 
                    />                    

                    <br />
                    <Input 
                        type='checkbox' 
                        label='Initialize this repository with a README' 
                        checked={this.store.includeReadme}
                        onChange={e => this.store.includeReadme = e.target.checked } 
                        className='filled-in' 
                    />
                    <br />
                    <Input 
                        type='checkbox' 
                        label='Initialize this repository with an MIT license' 
                        checked={this.store.includeLicense}
                        onChange={e => this.store.includeLicense = e.target.checked } 
                        className='filled-in' 
                    />                    

                    <div className="btn-container">
                        <Button waves='light' className="create-btn" onClick={() => this.store.createRepo()}>Create repository</Button> 
                        <Button className="cancel lighten-5">Cancel</Button>
                    </div>
                </div>
                <div className="loading-container"><Preloader /></div>
			</div>
		)
	}
}

export default NewRepoPage