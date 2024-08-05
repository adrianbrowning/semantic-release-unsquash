import { verifyConditions as originalChangeLog } from '@semantic-release/changelog';
import { analyzeCommits as originalAnalyzeCommits } from '@semantic-release/commit-analyzer';
import { verifyConditions as originalGit } from '@semantic-release/git';
import { verifyConditions as originalGitHub } from '@semantic-release/github';
import { generateNotes as originalGenerateNotes } from '@semantic-release/release-notes-generator';

import { modifySquashedCommits } from './get-unsquashed-commits';

export async function analyzeCommits(pluginConfig, context) {
  const { commitAnalyzerConfig } = pluginConfig || {};
  const commits = modifySquashedCommits(context);

  return originalAnalyzeCommits(commitAnalyzerConfig ?? {}, {
    ...context,
    commits,
  });
}

export async function generateNotes(pluginConfig, context) {
  const { notesGeneratorConfig } = pluginConfig || {};
  const commits = modifySquashedCommits(context);

  return originalGenerateNotes(notesGeneratorConfig ?? {}, {
    ...context,
    commits,
  });
}

export async function generateChangelog(pluginConfig, context) {
  const { changeLogConfig } = pluginConfig || {};
  const commits = modifySquashedCommits(context);

  return originalChangeLog(changeLogConfig ?? {}, {
    ...context,
    commits,
  });
}

export async function generateGit(pluginConfig, context) {
  const { gitConfig } = pluginConfig || {};
  const commits = modifySquashedCommits(context);

  return originalGit(gitConfig ?? {}, {
    ...context,
    commits,
  });
}

export async function generateGitHub(pluginConfig, context) {
  const { gitHubConfig } = pluginConfig || {};
  const commits = modifySquashedCommits(context);

  return originalGitHub(gitHubConfig ?? {}, {
    ...context,
    commits,
  });
}
