import { observable } from 'mobx'
import * as repos from '../../../../lib/repo'


export class CodeSectionStore {
    
    repoName

    @observable files = []

    constructor(repoName) {
        this.repoName = repoName
        this.init()
    }

    async init() {
        this.files = await repos.listFiles(this.repoName)
    }

}