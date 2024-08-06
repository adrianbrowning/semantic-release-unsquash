export function modifySquashedCommits(context) {
  const { commits } = context;
  const { logger } = context;

  const modifiedCommits = [];

  for (const commit of commits) {
    // logger.log('Commit: ' + commit.body);
    // logger.log('Subject: ' + commit.subject);
    // logger.log('Message: ' + commit.message);
    const commitLines = commit.message.split('\n').reduce(
      (acc, commit) => {
        commit = commit.replace('\r', '');
        if (commit.startsWith('*')) {
          acc.push([commit]);
          return acc;
        }

        acc.at(-1).push(commit);

        return acc;
      },
      [[]],
    );
    for (const pCommit of commitLines) {
      if (pCommit.length < 2) {
        logger.log('Skipping github commit: ' + commit.message);
        const newCommit = {
          ...commit,
        };
        modifiedCommits.push(newCommit);
        continue;
      }

      const [subject, ...body] = pCommit;
      const newBody = body.filter(Boolean).join('\n').trim();
      const newCommit = {
        ...commit,
        subject: subject.replace('* ', ''),
        body: newBody,
        message: newBody,
        type: newBody.match(/^(.*?):/)?.[1],
      };
      logger.log('Modified commit: ' + newCommit.message);
      modifiedCommits.push(newCommit);
    }
  }

  return modifiedCommits;
}
