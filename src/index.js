import { analyzeCommits as originalAnalyzeCommits } from '@semantic-release/commit-analyzer';
import { generateNotes as originalGenerateNotes } from '@semantic-release/release-notes-generator';

import { modifySquashedCommits } from './get-unsquashed-commits.js';

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
