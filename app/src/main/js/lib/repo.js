import fs from 'fs-extra'
import opencollab from 'opencollab-lib'

const REPOS_PATH = 'tmp/repos'

export function createRepo(opts) {
    let repoPath = `${REPOS_PATH}/${opts.name}.git`
    return fs.mkdirp(repoPath + '/.git')
            .then(() => opencollab.init(repoPath))
            .then(result => {
                console.log('Repo created at: ', result)
            })
            .catch(e => console.log('error: ', e))
}


export function list() {
    return fs.readdir(REPOS_PATH)
    .then(items => items.filter(item => fs.lstatSync(`${REPOS_PATH}/${item}`).isDirectory()))
    .then(directories => Promise.all(directories.map(dir => opencollab.status(`${REPOS_PATH}/${dir}`))))    
}