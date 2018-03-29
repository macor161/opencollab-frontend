import { observable } from 'mobx'
import OpenCollab from 'opencollab-lib'
import * as repos from '../../../../lib/repo'
import { history } from '../../../../lib/history'


export class NewIssueStore {
    
    repoName

    @observable isLoading = false

    @observable issue = {
        name: '',
        content: ''
    }


    constructor(repoName) {
        this.repoName = repoName
        this.init()
    }

    async init() {
       this.repo = new OpenCollab(repos.getRepoPath(this.repoName))
    }

    async createIssue() {
        this.isLoading = true
        
        try {
            let result = await this.repo.newIssue(
                this.issue.name,
                this.getIssueDescription(this.issue.content),
                this.issue.content
            )
        } catch(e) {
            console.log('Error creating issue: ', e)
        }
        
        this.isLoading = false
        history.push(`/repo/${this.repoName}/issues`)
    }


    getIssueDescription(content) {
        return content
                .substring(0, 150)
                .replace(new RegExp('#', 'g'), '')
    }

}