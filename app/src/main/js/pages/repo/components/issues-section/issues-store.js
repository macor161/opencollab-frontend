import { observable } from 'mobx'
import * as repos from '../../../../lib/repo'


export class IssuesStore {
    
    repoName

    @observable issues = []


    constructor(repoName) {
        this.repoName = repoName
        this.init()
    }

    async init() {
        this.issues = await repos.listIssues(this.repoName)
    }

}