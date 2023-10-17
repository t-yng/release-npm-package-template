const { Octokit } = require("octokit");
const addPrLabel = require("../.github/scripts/add-pr-label");

const octokit = new Octokit({
  // Personal Access Token
  auth: process.env.PAT,
});

(async () => {
  await addPrLabel({
    context: {
      issue: {
        owner: "t-yng",
        repo: "release-npm-package-template",
        number: 5,
      },
    },
    github: octokit,
    branch: "chore/release-note-format",
  });
})();
