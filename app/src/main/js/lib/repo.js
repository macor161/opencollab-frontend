import fs from 'fs-extra'
import opencollab from 'opencollab-lib'

export function createRepo(opts) {
    let repoPath = `tmp/repos/${opts.name}.git`
    return fs.mkdirp(repoPath + '/.git')
            .then(() => opencollab.init(repoPath))
            .then(result => {
                console.log('Repo created at: ', result)
            })
            .catch(e => console.log('error: ', e))
}