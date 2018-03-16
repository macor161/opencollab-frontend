import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button, Input, Preloader, Breadcrumb, MenuItem, Icon, Card, Badge } from 'react-materialize'
import { Dropdown } from 'semantic-ui-react'
import { default as c } from 'classnames'
import { Router, Route } from 'react-router-dom'
import { bind } from 'bind-decorator'

import { history } from '../../lib/history'

import { CodeSection } from './components/code-section/code-section'
import { IssuesSection } from './components/issues-section/issues-section'
import { NewIssueSection } from './components/new-issue-section/new-issue-section'
import { PullRequestsSection } from './components/pull-requests-section/pull-requests-section'
import { SettingsSection } from './components/settings-section/settings-section'

import { RepoPageStore, SECTION } from './repo-page-store'

import './repo-page.css'

@observer
class RepoPage extends Component {

  store
  cloneDropdown


  constructor(props) {
    super(props)
    this.store = new RepoPageStore(props.match.params.id)
    this.state = { isCloneDropdownOpen: false }

    if (props.match.params.section) {
      this.store.setCurrentSection(
        props.match.params.section.toUpperCase().replace('-', '_'), 
        props.match.params.subSection)
    }

    window.repoPageStore = this.store
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.match.params.section)
      this.store.setCurrentSection(nextProps.match.params.section.toUpperCase().replace('-', '_'))
  }

  @bind handleClickOutside(event) {
    if (this.cloneDropdown && !this.cloneDropdown.ref.contains(event.target)) {
      this.closeCloneDropdown()
    }
  }

  selectSection(section) {
    if (this.store.currentSection !== section)
      history.push(`/repo/${this.props.match.params.id}/${section.toLowerCase().replace('_', '-')}`)
  }

  @bind openCloneDropdown() {
    this.setState({ isCloneDropdownOpen: true })
  }

  @bind closeCloneDropdown() {
    this.setState({ isCloneDropdownOpen: false })
  }

  render() {
    return (
      <div className="repo page">
        <div className="container">
          <Breadcrumb>
            <MenuItem>Repositories</MenuItem>
            <MenuItem>{this.store.repoName}</MenuItem>
          </Breadcrumb>
          
          <p className="subhead-description">{this.store.repoDescription}</p>
          <Dropdown 
            floating 
            ref={node => this.cloneDropdown = node}
            className="clone-dropdown-container" 
            icon=''
            open={this.state.isCloneDropdownOpen}
            trigger={<Button className="clone-btn" onClick={this.openCloneDropdown}>Clone or download <Icon small>arrow_drop_down</Icon></Button>}
          >
            <Dropdown.Menu>
              <div className="clone-dropdown">
                <h3>Clone with Mango <Icon>help_outline</Icon></h3>
                <Input type="text" value={`mango://${this.store.repoStatus.mangoAddress}`} />
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <div className="tabs">
            <Button 
              className={c('tab', { 'active': this.store.currentSection === SECTION.CODE })}
              onClick={() => this.selectSection(SECTION.CODE)}>
              Code
            </Button>
            <Button 
              className={c('tab', { 'active': this.store.currentSection === SECTION.ISSUES || this.store.currentSection === SECTION.NEW_ISSUE })}
              onClick={() => this.selectSection(SECTION.ISSUES)}>
              Issues <Badge>{this.store.issueCount}</Badge>
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
          <Router history={history}>
            <div>
              <Route exact path="/repo/:id" render={() => <CodeSection repo={this.store.dirName} />} />
              <Route exact path="/repo/:id/code" render={() => <CodeSection repo={this.store.dirName} />} />
              <Route exact path="/repo/:id/issues" render={() =><IssuesSection repo={this.store.dirName}/>} />
              <Route exact path="/repo/:id/issues/new" render={() =><NewIssueSection repo={this.store.dirName}/>} />
              <Route exact path="/repo/:id/pull-requests" component={PullRequestsSection} />
              <Route exact path="/repo/:id/settings" component={SettingsSection} />
            </div>
          </Router>          
        </div>
      </div>
    )
  }
}

export default RepoPage