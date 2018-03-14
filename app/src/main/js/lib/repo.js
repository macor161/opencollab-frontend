import fs from 'fs-extra'
import opencollab from 'opencollab-lib'
import shell from 'shelljs'

const REPOS_PATH = 'tmp/repos'

shell.config.execPath = shell.which('node')

export async function create(opts) {
    let repoPath = `${REPOS_PATH}/${opts.name}.git`
    let includeReadme = !!opts.includeReadme
    let includeLicense = !!opts.includeLicense

    await fs.mkdirp(repoPath)
    await exec('git init', { cwd: repoPath })
    let result = await opencollab.init(repoPath, opts)

    console.log('Repo created at: ', result)

    if (includeReadme) {
        await fs.writeFile(repoPath + '/README.md', `# ${opts.name}\n`)
        await exec(`git add README.md`, { cwd: repoPath })        
    }

    if (includeLicense) {
        await fs.writeFile(repoPath + '/LICENSE', mitLicense)
        await exec(`git add LICENSE`, { cwd: repoPath })  
    }

    if (includeReadme || includeLicense) 
        await exec(`git commit -m Initial`, { cwd: repoPath })
    

    await exec(`git remote add origin mango://${result}`, { cwd: repoPath })
    await exec(`git push --set-upstream origin master`, { cwd: repoPath })

}

export async function listFiles(repoName) {
    let files = await fs.readdir(`${REPOS_PATH}/${repoName}.git`)
    return files.filter(file => file.indexOf('.') !== 0)
}


export async function list() {
    let items = await fs.readdir(REPOS_PATH)
    let directories = items.filter(item => fs.lstatSync(`${REPOS_PATH}/${item}`).isDirectory())
    return Promise.all(directories.map(dir => opencollab.status(`${REPOS_PATH}/${dir}`)))
}

export async function listIssues(repoName) {
    return opencollab.issues(`${REPOS_PATH}/${repoName}.git`)
}

export async function createIssue(repoName, name, description, content) {
    return await opencollab.newIssue(`${REPOS_PATH}/${repoName}.git`, name, description, content)
}

export async function status(repo) {
    return opencollab.status(`${REPOS_PATH}/${repo}.git`)
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



const mitLicense = `
Copyright 2018

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`