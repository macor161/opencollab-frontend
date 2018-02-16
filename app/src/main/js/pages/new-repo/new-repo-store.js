import { observable } from 'mobx'

import { create } from '../../lib/repo'
import { history } from '../../lib/history'

export class NewRepoStore {

    @observable isLoading = false

    @observable name = ''
    @observable description = ''
    @observable includeReadme = false
    @observable includeLicense = false


    async createRepo() {
        this.isLoading = true
        
        let result = await create({ 
            name: this.name,
            description: this.description,
            includeReadme: this.includeReadme,
            includeLicense: this.includeLicense
        })
        
        this.isLoading = false
        history.push(`/repo/${this.name}`)
        
    }


}