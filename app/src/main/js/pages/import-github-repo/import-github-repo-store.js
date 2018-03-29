import { observable } from 'mobx'

import OpenCollab from 'opencollab-lib'
import * as repos from '../../lib/repo'
import { history } from '../../lib/history'
import * as github from '../../lib/github'
import { default as _} from 'lodash'


export class ImportGithubRepoStore {

    @observable isLoading = false

    @observable name = ''
    @observable description = ''

    @observable repoUrl = ''

    @observable tokenAmount = 2000000

    @observable voterRewardPercentage = 5
    @observable voterPenaltyPercentage = 20

    @observable includeReadme = false
    @observable includeLicense = false

    @observable isModalOpen = false

    selectedRepo

    async importBasicInfo() {
        const repoInfo = await github.getRepoInfo(this.repoUrl)
        this.name = repoInfo.name
        this.description = repoInfo.description
        this.selectedRepo = repoInfo
        this.isModalOpen = false
    }

    async createRepo() {
        this.isLoading = true
        
        
        try {
            let result = await repos.importFromGithub({ 
                url: this.selectedRepo.clone_url,
                name: this.name,
                description: this.description,
                includeReadme: this.includeReadme,
                includeLicense: this.includeLicense,
                tokenCount: this.tokenAmount
            })

        } catch(e) {
            console.log('Error creating repo: ', e)
        }

        const repo = new OpenCollab(repos.getRepoPath(this.name))

        try {
            const issues = _(await github.getRepoIssues(this.selectedRepo.full_name))
                            .sortBy('number')
                            .value()

            for(var issue of issues) {
                await repo.newIssue(
                    issue.title,
                    issue.body.substring(0, 150).replace(new RegExp('#', 'g'), ''),
                    issue.body,
                    issue.state === 'open'
                )
            }
        } catch(e) {
            console.log('Error importing issues: ', e)
        }
        
        this.isLoading = false
        history.push(`/repo/${this.name}`)
        
    }


}