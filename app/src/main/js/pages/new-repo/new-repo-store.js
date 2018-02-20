import { observable } from 'mobx'

import { create } from '../../lib/repo'
import { history } from '../../lib/history'

export class NewRepoStore {

    @observable isLoading = false

    @observable name = ''
    @observable description = ''

    @observable voterRewardPercentage = 5
    @observable voterPenaltyPercentage = 20

    @observable includeReadme = false
    @observable includeLicense = false


    async createRepo() {
        this.isLoading = true
        
        try {
            let result = await create({ 
                name: this.name,
                description: this.description,
                includeReadme: this.includeReadme,
                includeLicense: this.includeLicense
            })
        } catch(e) {
            console.log('Error creating repo: ', e)
        }
        
        this.isLoading = false
        history.push(`/repo/${this.name}`)
        
    }


}