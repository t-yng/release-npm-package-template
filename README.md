## About
This is template to release npm packages automatically in GitHub Action.

This template considers default branch is protected and prohibit pushing directory.

## Release flow
1. You create pull request by GitHub Action manually.
    - update version of package.json.
    - This pull request will be auto merged.
2. The release workflow will be triggered when the pull request is merged.
    - make new version git tag.
    - publish npm package
    - create release note.
