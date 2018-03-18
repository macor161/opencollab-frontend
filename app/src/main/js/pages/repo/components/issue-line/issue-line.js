import React, { Component } from 'react'
import { Collection, CollectionItem } from 'react-materialize'
import { default as c } from 'classnames'

import './issue-line.css'

export class IssueLine extends Component {

    state = { 
      tokensToStake: 0, 
      isVoting: false 
    }


    startVote = () => this.setState({ isVoting: true })
    
  
    render = () =>
      <CollectionItem className="issue-line">
        <div className="id">#{this.props.issue.id + 1}</div>
        <div className="main-content">
          <div className="name">{this.props.issue.name}</div>
          <div className="desc">{this.props.issue.description}</div>
        </div>
        <div className="staked-tokens">
          <strong>{this.props.issue.totalStake.toString()}</strong> tokens
        </div>
        <div className={c("edit-stake", { 'voting': this.state.isVoting })}>
          <img 
            className="edit-stake-btn" 
            src={require('./images/vote.svg')} 
            onClick={this.startVote}
          />
          <div className="voting-buttons">
            <div className="arrows">
              <img className="arrow-up" src={require('./images/arrow-up.svg')} />
              <img className="arrow-down" src={require('./images/arrow-down.svg')} />
            </div>

            <img 
              className="ok-btn" 
              src={require('./images/ok.png')} 
              onClick={this.startVote}
            />

            <img 
              className="cancel-btn" 
              src={require('./images/cancel.png')} 
              onClick={this.startVote}
            />            
          </div>
        </div>        
      </CollectionItem>
  
  }