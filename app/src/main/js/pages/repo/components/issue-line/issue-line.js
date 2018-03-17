import React, { Component } from 'react'
import { Collection, CollectionItem } from 'react-materialize'

import './issue-line.css'

export class IssueLine extends Component {

    state = { tokensToStake: 0 }
    
  
    render = () =>
      <CollectionItem className="issue">
        <div className="id">#{this.props.issue.id + 1}</div>
        <div className="main-content">
          <div className="name">{this.props.issue.name}</div>
          <div className="desc">{this.props.issue.description}</div>
        </div>
      </CollectionItem>
  
  }