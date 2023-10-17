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

## Generate Release Note
1. Add label to a pull request depends on branch name like `feat/xxxxx`.
2. Generate Release Note change logs depends on .github/release.yml

### Branch Prefix Rule

|prefix|Title|Description|Emoji|
|--|--|--|--|
|feat|Features|A new feature|✨|
|fix|Bug Fixes|A bug Fix|🐛|
|docs|Documentation|Documentation only changes|📚|
|refactor|Code Refactoring|A code change that neither fixes a bug nor adds a feature|📦|
|perf|Performance Improvements|A code change that improves performance|🚀|
|ci|CI|Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)|👷|
|deps|Update Dependencies|Updates dependencies|⬆️|
|chore|Chores	Other changes that don't modify src or test files|🔧|
