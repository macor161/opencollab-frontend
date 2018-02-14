import { observable, action } from 'mobx'
import * as repos from '../../lib/repo'

export const SECTION = {
    CODE: 'CODE',
    ISSUES: 'ISSUES',
    PULL_REQUESTS: 'PULL_REQUESTS',
    SETTINGS: 'SETTINGS'
}


export class RepoPageStore {

    @observable currentSection = SECTION.CODE

    @observable repoStatus = {}

    @observable dirName = ' '
    @observable repoName = ''
    @observable repoDescription = ''

    @action setCurrentSection(section) { this.currentSection = section }



    constructor(name) {
        this.dirName = name
        this.init()
    }

    async init() {
        this.repoStatus = await repos.status(this.dirName)

        this.repoStatus.contract.getName().then(name => this.repoName = name)
        this.repoStatus.contract.getDescription().then(desc => this.repoDescription = desc)
    }
}


