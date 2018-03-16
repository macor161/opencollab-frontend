import React, { Component } from 'react'
import { Collection, CollectionItem, Button, Input, Preloader } from 'react-materialize'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { default as c } from 'classnames'

import { NewIssueStore } from './new-issue-store'

import './new-issue-section.css'


@observer
export class NewIssueSection extends Component {

  
    constructor(props) {
      super(props)
      this.store = new NewIssueStore(props.repo)
    }
   
  
    render() {
      return (
        <div className={c("section", "new-issue", { "loading" : this.store.isLoading })}>
          <h2>New Issue</h2>
          <br />
          <Input 
              label="Issue name" 
              value={this.store.issue.name} 
              onChange={e => this.store.issue.name = e.target.value } 
          />
          <br />
          <Input 
              type='textarea'
              label="Issue description" 
              value={this.store.issue.content} 
              onChange={e => this.store.issue.content = e.target.value } 
          />
          <br />
          <div className="btn-container">
              <Button waves='light' className="create-btn" onClick={() => this.store.createIssue()}>
                Submit new issue
              </Button> 
              <Button className="cancel lighten-5">Cancel</Button>
          </div> 
          <div className="loading-container"><Preloader /></div>         
        </div>
      )
    }
  }
