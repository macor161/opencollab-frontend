import { observable, action, computed, observe } from 'mobx'
import * as repos from '../../lib/repo'
import * as opencollab from 'opencollab-lib'

import { headerStore } from '../../components/header/header-store'

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

    @observable availableTokens = null

    @computed get availableTokensString() {
        return this.availableTokens != null ? this.availableTokens.toString() : ''
    }

    @computed get issueCount() {
        return this.repoStatus.issueCount != null ? this.repoStatus.issueCount.toString() : ''
    }

    @action setCurrentSection(section, subSection) { 
        if (section === SECTION.ISSUES && subSection === 'new')
            this.currentSection = SECTION.NEW_ISSUE
        else
            this.currentSection = section 
    }


    async updateAvailableTokens() {
        const account = await opencollab.getAccount()
        const maintainer = await this.repoStatus.contract.mangoRepo.getMaintainer(0)
        this.availableTokens = await this.repoStatus.contract.mangoRepo.balanceOf(account)
        headerStore.availableRepoTokens = this.availableTokens
    }

    @action inc() {
        this.availableTokens = this.availableTokens.add(1)
    }


    constructor(name) {
        this.dirName = name

        // Update header tokens on availableTokens change
        this.tokenChangeDisposer = observe(this, 'availableTokens', change => headerStore.availableRepoTokens = this.availableTokens)

        this.init()
    }

    async init() {
        this.repoStatus = await repos.status(this.dirName)

        this.repoName = this.repoStatus.name
        this.repoDescription = this.repoStatus.description

        this.updateAvailableTokens()
        console.log('repo: ', this.repoStatus)
    }


    destroy() {
        this.tokenChangeDisposer()
    }
}


