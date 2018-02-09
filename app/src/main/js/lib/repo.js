import fs from 'fs-extra'
import opencollab from 'opencollab-lib'

export function createRepo(opts) {
    let repoPath = `tmp/repos/${opts.name}.git/.git`
    return fs.mkdirp(repoPath)
            .then(() => opencollab.init(repoPath))
            .then(result => {
                console.log('Repo created at: ', result)
            })
}