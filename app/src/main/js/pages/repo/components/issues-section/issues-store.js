import { observable } from 'mobx'
import { default as _ } from 'lodash'

import * as repos from '../../../../lib/repo'


export class IssuesStore {
    
    repoName

    @observable issues = []


    constructor(repoName) {
        this.repoName = repoName
        this.init()
    }

    async init() {
        const issues = _(await repos.listIssues(this.repoName))
                        .filter(issue => issue.active)
                        .sortBy('id')
                        .reverse()
                        .value()

        console.log('issues: ', issues)
        this.issues = issues
    }

}