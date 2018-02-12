import { observable } from 'mobx'

import { createRepo } from '../../lib/repo'

export class NewRepoStore {

    @observable isLoading = false

    @observable name = ''
    @observable description = ''
    @observable includeReadme = false


    createRepo() {
        this.isLoading = true
        
        return createRepo({ 
            name: this.name,
            includeReadme: this.includeReadme
        })
        .then(result => {
            this.isLoading = false
            // TODO: Redirect
        })
    }


}