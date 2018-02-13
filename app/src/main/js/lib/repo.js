import fs from 'fs-extra'
import opencollab from 'opencollab-lib'
import shell from 'shelljs'

const REPOS_PATH = 'tmp/repos'

shell.config.execPath = shell.which('node')

export function createRepo(opts) {
    let repoPath = `${REPOS_PATH}/${opts.name}.git`
    let includeReadme = !!opts.includeReadme

    return fs.mkdirp(repoPath)
            .then(() => exec('git init', { cwd: repoPath }))
            .then(res => opencollab.init(repoPath))
            .then(result => {
                console.log('Repo created at: ', result)
                if (includeReadme) {
                    return fs.writeFile(repoPath + '/README.md', `# ${opts.name}`)
                             .then(() => exec(`git add README.md`, { cwd: repoPath }))
                             .then(res => exec(`git commit -m Initial`, { cwd: repoPath }))
                             .then(res => exec(`git remote add origin mango://${result}`, { cwd: repoPath }))
                             .then(res => exec(`git push --set-upstream origin master`, { cwd: repoPath }))                             
                }
            })

}


export function list() {
    return fs.readdir(REPOS_PATH)
    .then(items => items.filter(item => fs.lstatSync(`${REPOS_PATH}/${item}`).isDirectory()))
    .then(directories => Promise.all(directories.map(dir => opencollab.status(`${REPOS_PATH}/${dir}`))))    
}



function exec(command, opts) {
    return new Promise((resolve, reject) => {
        shell.exec(command, opts, (code, stdout, stderr) => {
            if (code !== 0) {
                reject(stderr)
            }
            else
                resolve({ code, stdout })
        })
    })
}