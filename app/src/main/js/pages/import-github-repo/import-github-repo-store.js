import { observable } from 'mobx'

import { create } from '../../lib/repo'
import { history } from '../../lib/history'

export class ImportGithubRepoStore {

    @observable isLoading = false

    @observable name = ''
    @observable description = ''

    @observable tokenAmount = 2000000

    @observable voterRewardPercentage = 5
    @observable voterPenaltyPercentage = 20

    @observable includeReadme = false
    @observable includeLicense = false

    test() {}
    async createRepo() {
        this.isLoading = true
        
        try {
            let result = await create({ 
                name: this.name,
                description: this.description,
                includeReadme: this.includeReadme,
                includeLicense: this.includeLicense,
                tokenCount: this.tokenAmount
            })
        } catch(e) {
            console.log('Error creating repo: ', e)
        }
        
        this.isLoading = false
        history.push(`/repo/${this.name}`)
        
    }


}