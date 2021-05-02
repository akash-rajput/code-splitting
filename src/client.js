
import { Octokit } from '@octokit/core';

export const REPO = 'code-splitting';
export const REPO_OWNER = 'akash-rajput';
const GITHUB_ACCESS_TOKEN = `KEEP_THE_TOKEN_SAFE`;

export const octokit = new Octokit({
auth : GITHUB_ACCESS_TOKEN,
});