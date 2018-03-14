import React, { Component } from 'react'
import { Collection, CollectionItem } from 'react-materialize'
import { Link } from 'react-router-dom'

import { NewIssueStore } from './new-issue-store'

import './new-issue-section.css'



export class IssuesSection extends Component {

  
    constructor(props) {
      super(props)
      this.store = new NewIssueStore(props.repo)
    }
   
  
    render() {
      return (
        <div className="section new-issue">
          new issue
        </div>
      )
    }
  }
