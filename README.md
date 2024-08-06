** This is a fork of [semantic-release-unsquash](https://www.npmjs.com/package/semantic-release-unsquash) **

# **@gingacodemonkey/semantic-release-unsquash**

A tiny wrapper for [commit-analyzer](https://github.com/semantic-release/commit-analyzer) and [release-notes-generator](https://github.com/semantic-release/release-notes-generator) which works with squashed MRs

[![npm latest version](https://img.shields.io/npm/v/@gingacodemonkey/semantic-release-unsquash/latest.svg)](https://www.npmjs.com/package/@gingacodemonkey/semantic-release-unsquash)

## Install

```bash
$ pnpm add -D @gingacodemonkey/semantic-release-unsquash
$ npm install -D @gingacodemonkey/semantic-release-unsquash
```

## Usage

The plugin does not have it`s own configuration, but it passes configuration to wrapped plugins

```json
{
  "plugins": [
    ["semantic-release-unsquash", {
      "commitAnalyzerConfig": {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
        }
      },
      "notesGeneratorConfig": {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
        },
        "writerOpts": {
          "commitsSort": ["subject", "scope"]
        }
      }
    }]
  ]
}
```

### Usage with Github

GitHub automatically adds a list of squashed commit messages to the squash commit message.

### Usage with GitLab

To use this plugin with GitLab, you need to go to your project settings and in the **Merge Requests** section update the **Squash commit message template** field to the following:

```ruby
%{title}

%{all_commits}
```
