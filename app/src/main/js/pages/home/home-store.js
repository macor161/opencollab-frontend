import { observable } from 'mobx'

import { list } from '../../lib/repo'

export class HomeStore {

    @observable isLoading = true
    @observable repos = []


    async init() {
        let repos = await list()
        this.repos = repos
        this.isLoading = false        
    }

    constructor() {
        this.init()
    }



}