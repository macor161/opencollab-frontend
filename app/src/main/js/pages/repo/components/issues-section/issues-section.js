import React, { Component } from 'react'
import { Collection, CollectionItem } from 'react-materialize'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { IssuesStore } from './issues-store'

import './issues-sections.css'


const Header = ({ repo }) => 
  <div className="issues-header">
    <h4>Active issues</h4>
    <Link className="add-link" to={`/repo/${repo}/issues/new`}>+</Link>
  </div>


@observer
export class IssuesSection extends Component {

  
    constructor(props) {
      super(props)
      this.store = new IssuesStore(props.repo)
    }
   
  
    render() {
      return (
        <div className="section issues">
            <Collection header={<Header repo={this.props.repo}/>}>
              {this.store.issues.map(issue => 
                <CollectionItem href="#" key={issue.id}>{issue.name}</CollectionItem>
              )}
            </Collection>
        </div>
      )
    }
  }
