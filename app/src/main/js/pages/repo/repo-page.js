import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button, Input, Preloader, Breadcrumb, MenuItem } from 'react-materialize'
import { default as c } from 'classnames'
import {
	HashRouter as Router,
	Route,
  } from 'react-router-dom'

import { CodeSection } from './components/code-section/code-section'
import { IssuesSection } from './components/issues-section/issues-section'
import { PullRequestsSection } from './components/pull-requests-section/pull-requests-section'
import { SettingsSection } from './components/settings-section/settings-section'
import { RepoPageStore, SECTION } from './repo-page-store'

import './repo-page.css'

@observer
class RepoPage extends Component {

  store


  constructor(props) {
    super(props)
    this.store = new RepoPageStore()

    if (props.match.params.section) {
      this.store.setCurrentSection(props.match.params.section.toUpperCase().replace('-', '_'))
    }
  }

  selectSection(section) {
    if (this.store.currentSection !== section)
      this.props.history.push(`/repo/${this.props.match.params.id}/${section.toLowerCase().replace('_', '-')}`)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.match.params.section)
      this.store.setCurrentSection(nextProps.match.params.section.toUpperCase().replace('-', '_'))
  }

  render() {
    return (
      <div className="repo page">
        <div className="container">
          <Breadcrumb>
            <MenuItem>Repositories</MenuItem>
            <MenuItem>{this.props.match.params.id}</MenuItem>
          </Breadcrumb>

          <div className="tabs">
            <Button 
              className={c('tab', { 'active': this.store.currentSection === SECTION.CODE })}
              onClick={() => this.selectSection(SECTION.CODE)}>
              Code
            </Button>
            <Button 
              className={c('tab', { 'active': this.store.currentSection === SECTION.ISSUES })}
              onClick={() => this.selectSection(SECTION.ISSUES)}>
              Issues
            </Button>
            <Button 
              className={c('tab', { 'active': this.store.currentSection === SECTION.PULL_REQUESTS })}
              onClick={() => this.selectSection(SECTION.PULL_REQUESTS)}>
              Pull Requests
            </Button>
            <Button 
              className={c('tab', { 'active': this.store.currentSection === SECTION.SETTINGS })}
              onClick={() => this.selectSection(SECTION.SETTINGS)}>
              Settings
            </Button>
          </div>
          <Router>
            <div>
              <Route exact path="/repo/:id" component={CodeSection} />
              <Route exact path="/repo/:id/code" component={CodeSection} />
              <Route exact path="/repo/:id/issues" component={IssuesSection} />
              <Route exact path="/repo/:id/pull-requests" component={PullRequestsSection} />
              <Route exact path="/repo/:id/settings" component={SettingsSection} />
            </div>
          </Router>          
        </div>
      </div>
    )
  }
}

export default withRouter(RepoPage)