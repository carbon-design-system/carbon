const core = require('@actions/core');
const github = require('@actions/github');
const { request } = require("@octokit/request");
let githubtoken = core.getInput('GITHUB_TOKEN', {required: true});
const octokit = github.getOctokit(githubtoken);


async function run() {
  let owner = core.getInput('OWNER', {required: true});
  let repo = core.getInput('REPO_NAME', {required: true})

  if (repo.length <= 0 || owner.length <= 0 ) {
    core.setFailed('Invalid owner and repo details mentioned on action.yml');
    return;
  }

  let releaseDetails = await getReleases(
    owner,
    repo
  )

  let commitsRange = await getCommitsBetweenTwoTags(
    releaseDetails[1],
    releaseDetails[0],
    owner,
    repo,
  )

  let pullRequestList = []

  await Promise.all(
    commitsRange.map(async x => {
      let pullReqNumber = await getPullRequestForCommit(
        owner,
        repo,
        x.sha
      )

      if (!pullRequestList.includes(pullReqNumber[0])) {
        pullRequestList.push(pullReqNumber[0])
      }

    })
  )
  pullRequestList.map(prNumber => {
    sendComments(
      owner,
      repo,
      prNumber,
      `Hey there! ${releaseDetails[0]} was just released that references this issue/PR.`
    )
  })
}

run().catch((error) => {
  console.log(error);
  core.setFailed(`Error while executing the github action ${error}`)
  process.exit(1);
});


function sendComments(orgName, repoName, issue_number, message) {
  console.log(`Executing sendComments fn - issue Number - ${issue_number}`);
  return octokit.rest.issues.createComment({
    owner: orgName,
    repo: repoName,
    issue_number: issue_number,
    body: message
  })
    .then(() => console.log(`Successfully posted comment on the Pull Request ${issue_number}`))
    .catch(err => console.log(`Error on running sending comments ${err}`))

}

async function getReleases(owner, repo) {
  console.log('Executing getRelease fn');
  const result = await request(`GET /repos/${owner}/${repo}/releases`, {
    owner: owner,
    repo: repo,
    headers: {
      authorization: `token ${githubtoken}`,
    }
  })

  let releasesArray = result.data.map(x => x.tag_name);
  return releasesArray
}

async function getCommitsBetweenTwoTags(startCommit, endCommit, owner, repo) {
  console.log(`Executing getCommitsBetweenTwoTags fn - ${startCommit} - ${endCommit}}`);
  const result = await request(`GET /repos/${owner}/${repo}/compare/${startCommit}...${endCommit}`, {
    headers: {
      authorization: `token ${githubtoken}`,
    },
  })

  return result.data.commits
}

async function getPullRequestForCommit(owner, repo, commit) {
  console.log(`Executing getPullRequestForCommit fn - ${commit}`);
  const result = await request(`GET /repos/${owner}/${repo}/commits/${commit}/pulls`);
  return result.data.map(x => x.number);
}
