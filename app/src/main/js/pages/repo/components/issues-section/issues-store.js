import { observable, observe } from 'mobx'
import { default as _ } from 'lodash'

import OpenCollab from 'opencollab-lib'
import { repoStore } from '../../repo-page-store'
import * as repos from '../../../../lib/repo'


export class IssuesStore {
    
    repoName
    repo

    @observable issues = []


    constructor(repoName) {
        this.repoName = repoName
        this.init()
    }

    async init() {
        this.repo = new OpenCollab(repos.getRepoPath(this.repoName))
        observe(repoStore, 'availableTokens', change => this.updateIssues())
        
    }


    async updateIssues() {
        this.issues = _(await this.repo.issues(this.repoName))
                        .filter(issue => issue.active)
                        .sortBy('id')
                        .reverse()
                        .value()
    }

}