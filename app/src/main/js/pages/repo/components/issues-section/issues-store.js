import { observable, observe } from 'mobx'
import { default as _ } from 'lodash'

import { repoStore } from '../../repo-page-store'
import * as repos from '../../../../lib/repo'


export class IssuesStore {
    
    repoName

    @observable issues = []


    constructor(repoName) {
        this.repoName = repoName
        this.init()
    }

    async init() {

        observe(repoStore, 'availableTokens', change => this.updateIssues())
        
    }


    async updateIssues() {
        this.issues = _(await repos.listIssues(this.repoName))
                        .filter(issue => issue.active)
                        .sortBy('id')
                        .reverse()
                        .value()
    }

}