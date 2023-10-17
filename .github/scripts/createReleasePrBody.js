module.exports = async ({ context, github, base = "main" }) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  // マージ済みのプルリクエストの一覧を取得
  const mergedPrs = await getMergedPulls(github, owner, repo, base);

  const changeLogs = mergedPrs
    .map((pr) => `- #${pr.number} by @${pr.user.login}`)
    .join("\n");

  const body = `## 変更内容
${changeLogs}
`;

  return body;
};

/**
 * リリースするマージ済みのプルリクエストの一覧を取得する
 */
const getMergedPulls = async (github, owner, repo, base) => {
  // 最新のタグを取得
  const tags = await github.rest.repos.listTags({
    owner: owner,
    repo: repo,
  });

  let head = null;
  // タグが存在すればそれをベースに、存在しなければ最初のコミットをベースにする
  if (tags.data.length > 0) {
    head = tags.data[0].name;
  } else {
    const commits = await github.rest.repos.listCommits({
      owner: owner,
      repo: repo,
      direction: "asc",
    });
    head = commits.data[0].sha;
  }

  // マージ済みのコミットのshaの一覧を取得
  const mergedCommitShaList = await github.rest.repos
    .compareCommits({
      owner,
      repo,
      base: head,
      head: base,
    })
    .then((res) => res.data.commits)
    .then((commits) => {
      return commits.filter((commit) => {
        return commit.parents.length > 1;
      });
    })
    .then((commits) => {
      return commits.map((commit) => commit.sha);
    });

  // マージされたプルリクエストの一覧を取得
  const mergedPulls = await github.rest.pulls
    .list({
      owner,
      repo,
      state: "closed",
      base,
      sort: "asc",
    })
    .then((res) => res.data)
    .then((pulls) => {
      return pulls.filter((pr) => {
        return mergedCommitShaList.includes(pr.merge_commit_sha);
      });
    });

  return mergedPulls;
};
