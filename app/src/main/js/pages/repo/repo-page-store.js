import { observable, action } from 'mobx'

export const SECTION = {
    CODE: 'CODE',
    ISSUES: 'ISSUES',
    PULL_REQUESTS: 'PULL_REQUESTS',
    SETTINGS: 'SETTINGS'
}


export class RepoPageStore {

    @observable currentSection = SECTION.CODE

    @action setCurrentSection(section) { this.currentSection = section }
}


