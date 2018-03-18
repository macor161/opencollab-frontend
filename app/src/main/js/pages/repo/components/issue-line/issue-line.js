import React, { Component } from 'react'
import { Collection, CollectionItem } from 'react-materialize'
import { default as c } from 'classnames'

import { repoStore } from '../../repo-page-store'

import './issue-line.css'

export class IssueLine extends Component {

    state = { 
      tokensToStake: 0, 
      isStaking: false 
    }

    totalStake = () => this.props.issue.totalStake.plus(this.state.tokensToStake)

    startStaking = () => this.setState({ isStaking: true })

    saveStake = async () => { 
      await repoStore.saveStake(this.props.issue)
      this.setState({ tokensToStake: 0, isStaking: false })      
    }

    cancelStake = () => {
      this.setState({ tokensToStake: 0, isStaking: false })
      repoStore.cancelStake()
    }

    incStake = () => {
      this.setState({ tokensToStake: this.state.tokensToStake + 1 }, this.prepareStake)
    }

    decStake = () => {
      if (this.state.tokensToStake > 0) {
        this.setState({ tokensToStake: this.state.tokensToStake - 1 }, this.prepareStake)
      }
    }
    
    prepareStake = () => {
      repoStore.tokensToStake = this.state.tokensToStake
    }
    
  
    render = () =>
      <CollectionItem className="issue-line">
        <div className="id">#{this.props.issue.id + 1}</div>
        <div className="main-content">
          <div className="name">{this.props.issue.name}</div>
          <div className="desc">{this.props.issue.description}</div>
        </div>
        <div className="staked-tokens">
          <strong>{this.totalStake().toString()}</strong> tokens
        </div>
        <div className={c("edit-stake", { 'voting': this.state.isStaking })}>
          <img 
            className="edit-stake-btn" 
            src={require('./images/vote.svg')} 
            onClick={this.startStaking}
          />
          <div className="voting-buttons">
            <div className="arrows">
              <img 
                className="arrow-up" 
                src={require('./images/arrow-up.svg')} 
                onClick={this.incStake} 
              />
              <img 
                className="arrow-down" 
                src={require('./images/arrow-down.svg')} 
                onClick={this.decStake} 
              />
            </div>

            <img 
              className="ok-btn" 
              src={require('./images/ok.png')} 
              onClick={this.saveStake}
            />

            <img 
              className="cancel-btn" 
              src={require('./images/cancel.png')} 
              onClick={this.cancelStake}
            />            
          </div>
        </div>        
      </CollectionItem>
  
  }