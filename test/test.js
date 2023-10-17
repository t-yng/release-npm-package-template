const { Octokit } = require("octokit");
const createReleasePrBody = require("../.github/scripts/createReleasePrBody");

const octokit = new Octokit({
  auth: "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",
});

(async () => {
  const body = await createReleasePrBody({
    context: {
      repo: {
        owner: "t-yng",
        repo: "release-npm-package-template",
      },
    },
    github: octokit,
  });

  console.log(body);
})();
