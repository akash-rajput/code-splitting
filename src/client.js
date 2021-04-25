
import { Octokit } from '@octokit/core';
const GITHUB_ACCESS_TOKEN = `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`;
export const octokit = new Octokit({
auth : GITHUB_ACCESS_TOKEN,
});