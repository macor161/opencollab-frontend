import { observable, action } from 'mobx'
import * as repos from '../../lib/repo'

export const SECTION = {
    CODE: 'CODE',
    ISSUES: 'ISSUES',
    NEW_ISSUE: 'NEW_ISSUE',
    PULL_REQUESTS: 'PULL_REQUESTS',
    SETTINGS: 'SETTINGS'
}


export class RepoPageStore {

    @observable currentSection = SECTION.CODE

    @observable repoStatus = {}

    @observable dirName = ' '
    @observable repoName = ''
    @observable repoDescription = ''

    @action setCurrentSection(section, subSection) { 
        if (section === SECTION.ISSUES && subSection === 'new')
            this.currentSection = SECTION.NEW_ISSUE
        else
            this.currentSection = section 
    }



    constructor(name) {
        this.dirName = name
        this.init()
    }

    async init() {
        this.repoStatus = await repos.status(this.dirName)

        this.repoName = this.repoStatus.name
        this.repoDescription = this.repoStatus.description
    }
}


