const labelMapping = {
  feat: "Type: Feature",
  fix: "Type: Bug",
  docs: "Type: Documentation",
  refactor: "Type: Refactoring",
  perf: "Type: Performance",
  deps: "Type: Dependencies",
  chore: "Type: Chore",
};

module.exports = async ({ context, github, branch }) => {
  const { owner, repo, number } = context.issue;
  const prefix = branch.split("/")[0];
  const label = labelMapping[prefix];

  if (label) {
    await github.rest.issues.addLabels({
      owner,
      repo,
      issue_number: number,
      labels: [label],
    });
  }
};
