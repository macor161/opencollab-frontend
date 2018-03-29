import { observable, action, computed, observe } from 'mobx'
import * as repos from '../../lib/repo'
import OpenCollab from 'opencollab-lib'

import { headerStore } from '../../components/header/header-store'

export const SECTION = {
    CODE: 'CODE',
    ISSUES: 'ISSUES',
    NEW_ISSUE: 'NEW_ISSUE',
    PULL_REQUESTS: 'PULL_REQUESTS',
    SETTINGS: 'SETTINGS'
}


class RepoPageStore {

    @observable currentSection = SECTION.CODE

    @observable repoStatus = {}

    @observable dirName = ' '
    @observable repoName = ''
    @observable repoDescription = ''

    @observable availableTokens = null
    @observable tokensToStake = 0


    @computed get availableTokensString() {
        return this.availableTokens != null ? this.availableTokens.minus(this.tokensToStake).toString() : ''
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

    @action async saveStake(issue) {
        //const response = await this.repoStatus.contract.mangoRepo.stakeIssue(issue.id, this.tokensToStake)
        await this.repo.stakeIssue(issue.id, this.tokensToStake)

        this.updateAvailableTokens()
    }

    @action async cancelStake() {
        this.tokensToStake = 0
    }


    @action async updateAvailableTokens() {        
        const account = await this.repo.getWeb3Account()
        const maintainer = await this.repoStatus.contract.mangoRepo.getMaintainer(0)
        this.availableTokens = await this.repoStatus.contract.mangoRepo.balanceOf(account)
        this.tokensToStake = 0
    }



    constructor() {
        // Update header tokens on availableTokens change
        this.tokenChangeDisposer = observe(this, 'availableTokens', change => headerStore.availableRepoTokens = this.availableTokens)

    }

    async setRepo(name) {
        this.dirName = name
        this.currentSection = SECTION.CODE
        this.repo = new OpenCollab(repos.getRepoPath(name))
        this.repoStatus = await this.repo.status()

        this.repoName = this.repoStatus.name
        this.repoDescription = this.repoStatus.description

        this.updateAvailableTokens()        
    }


    destroy() {
        this.availableTokens = null
        this.tokenChangeDisposer()
    }
}


export const repoStore = new RepoPageStore()
