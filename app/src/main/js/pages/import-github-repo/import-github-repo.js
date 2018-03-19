import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button, Input, Preloader } from 'react-materialize'
import { Modal, Header } from 'semantic-ui-react'
import { default as c } from 'classnames'

import { ImportGithubRepoStore } from './import-github-repo-store'

import './import-github-repo.css'

@observer
class ImportGithubRepoPage extends Component {

  store

  constructor(props) {
    super(props)
    this.store = new ImportGithubRepoStore()
    window.importGithubRepoStore = this.store
  }

  render() {
    return (
      <div className={c("new-repo", "page", { "loading": this.store.isLoading })}>
        <div className="container-md">
          <h2>Import a repository from GitHub</h2>
          <p className="subhead-description">
            A repository contains all the files for your project, including the revision history.
          </p>


          <Modal trigger={<Button className="repo-select-btn">Select repository</Button>}>
            <Modal.Header>Select your GitHub Repository</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <p>We've found the following gravatar image associated with your e-mail address.</p>
                <p>Is it okay to use this photo?</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>          

          <br />

          <Input
            label="Repository Name"
            value={this.store.name}
            onChange={e => this.store.name = e.target.value}
          />

          <Input
            label="Repository Description"
            value={this.store.description}
            onChange={e => this.store.description = e.target.value}
          />

          <br />

          <Input
            label="Number of tokens to create"
            type="number"
            className="token-amount"
            value={this.store.tokenAmount}
            onChange={e => this.store.tokenAmount = parseInt(e.target.value || 0)}
          />

          <Input
            label="Voter reward percentage"
            type="number"
            className="voter-reward-pct"
            value={this.store.voterRewardPercentage}
            onChange={e => this.store.voterRewardPercentage = parseFloat(e.target.value || 0)}
          />

          <Input
            label="Voter penalty percentage"
            type="number"
            className="voter-penalty-pct"
            value={this.store.voterPenaltyPercentage}
            onChange={e => this.store.voterPenaltyPercentage = parseFloat(e.target.value || 0)}
          />

          <br />


          <div className="btn-container">
            <Button waves='light' className="create-btn" onClick={() => this.store.createRepo()}>Import repository</Button>
            <Button className="cancel lighten-5">Cancel</Button>
          </div>
        </div>
        <div className="loading-container"><Preloader /></div>
      </div>
    )
  }
}

export default ImportGithubRepoPage