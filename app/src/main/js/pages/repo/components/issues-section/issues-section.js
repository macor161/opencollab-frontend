import React, { Component } from 'react'
import { Collection, CollectionItem } from 'react-materialize'


import { IssuesStore } from './issues-store'

export class IssuesSection extends Component {

  
  
    constructor(props) {
      super(props)
      this.store = new IssuesStore(props.repo)
    }
  
    render() {
      return (
        <div className="code section">
            <Collection header="Active issues">
              {this.store.issues.map(issue => 
                <CollectionItem href="#" key={issue.id}>{issue.name}</CollectionItem>
              )}
            </Collection>
        </div>
      )
    }
  }
