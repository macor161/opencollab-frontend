import { observable } from 'mobx'
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
       
    }

    async createIssue() {
        this.isLoading = true
        
        try {
            let result = await repos.createIssue({ 
                repoName: this.repoName,
                name: this.issue.name,
                description: this.getIssueDescription(this.issue.content),
                content: this.issue.content
            })
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