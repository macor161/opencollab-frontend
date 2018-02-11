import { observable } from 'mobx'

import { list } from '../../lib/repo'

export class HomeStore {

    @observable isLoading = true
    @observable repos = []


    init() {
        list().then(repos => {
            this.repos = repos
            this.isLoading = false
        })
    }

    constructor() {
        this.init()
    }



}