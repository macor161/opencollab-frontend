import GitHub from 'github-api'

const github = new GitHub()

/**
 * Returns basic repo information for a GitHub repository URL
 * @param {string} repoUrl 
 */
export async function getRepoInfo(repoUrl) {
    
    const info = getGithubRepoInfoFromUrl(repoUrl)

    const repo = await github.getRepo( info.owner, info.repo)

    const repoInfo = await repo.getDetails()

    return repoInfo.data
}


/**
 * Extract owner and repo from GitHub repository URL
 * @param {string} repoUrl 
 */
export function getGithubRepoInfoFromUrl(repoUrl) {
    if (typeof repoUrl !== 'string') 
        throw('Invalid URL')

    // Remove first and last /
    if (repoUrl[0] === '/')
        repoUrl = repoUrl.substr(1, repoUrl.length - 1)

    if (repoUrl[repoUrl.length - 1] === '/')
        repoUrl = repoUrl.substr(0, repoUrl.length - 1)

    let parts = repoUrl.split('/')

    if (parts.length < 2)
        throw 'Invalid URL'
    
    return { 
        owner: parts[parts.length - 2], 
        repo: parts[parts.length - 1] 
    }
}