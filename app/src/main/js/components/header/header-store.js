import { observable } from 'mobx'

class HeaderStore {

    @observable availableRepoTokens = ''


}


export const headerStore = new HeaderStore()