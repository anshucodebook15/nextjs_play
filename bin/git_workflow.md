# Git Workflow for AI Agents

## 1. Core rules

- Read AGENTS.md, CONTRIBUTING.md, the PR template, and relevant project documentation before making changes.
- Follow repository conventions over the defaults in this guide.
- Keep each branch focused on one task.
- Preserve existing user changes and unrelated files.
- Never commit credentials, tokens, private keys, local environment files, or sensitive logs.
- Never claim that checks passed unless they actually ran and passed.
- Explain material risks, unresolved failures, and checks you could not run.
- Do not push, merge, delete remote branches, or publish releases unless the user’s request authorizes those actions.
- Do not use destructive Git commands without explicit authorization.
- Prefer commands that preserve work and make recovery straightforward.

## 2. Inspect the repository first

Run:

    git status --short --branch
    git branch --show-current
    git remote -v
    git log -8 --oneline --decorate

Then identify:

- The repository’s default branch.
- The current branch and its upstream.
- Existing staged, unstaged, and untracked changes.
- Whether a merge, rebase, or cherry-pick is already in progress.
- The package manager, test commands, and required CI checks.
- Any existing pull request associated with the current branch.

Do not assume the default branch is named main.

Do not reset, stash, overwrite, or commit existing changes merely to obtain a clean working tree. If existing work overlaps with the requested task, inspect it and preserve it. Ask for direction only when the overlap prevents safe progress.

Be careful when printing remote URLs: redact embedded credentials.

## 3. Choose a branch name

Follow the repository’s established convention.

If none exists, use:

    codex/<type>/<short-description>

Examples:

    codex/feat/customer-search
    codex/fix/login-redirect
    codex/refactor/payment-validation
    codex/docs/local-setup
    codex/test/cart-discounts
    codex/chore/update-tooling

With a ticket:

    codex/fix/eng-142-login-redirect

Naming rules:

- Use lowercase letters and hyphens.
- Keep the description short and specific.
- Include a ticket identifier when available.
- Avoid spaces, vague names, and personal names.
- Use one branch per independently reviewable task.

## 4. Create the branch from the correct base

For a new task, fetch current remote references:

    git fetch origin

When starting from a clean working tree and the task should use the latest remote base:

    git switch -c codex/fix/login-redirect origin/main

Replace origin and main with the verified remote and base branch.

If already working on the task’s intended branch, continue there. Do not create an unnecessary replacement branch.

If the current working tree contains unrelated work, prefer a separate worktree:

    git worktree add -b codex/fix/login-redirect ../frontend-login-fix origin/main

Verify the destination is suitable before creating it.

Avoid changing the base of an existing task without understanding which commits and changes belong to it.

## 5. Implement the change

Before editing:

1. Understand the requested behavior.
2. Locate the relevant implementation and existing tests.
3. Read framework-specific documentation required by the repository.
4. Identify the smallest coherent change that solves the problem.

During implementation:

- Match existing architecture and style.
- Avoid unrelated refactoring, formatting, and dependency updates.
- Add or update meaningful tests when behavior changes justify them.
- Update documentation when usage or configuration changes.
- Keep generated files consistent with repository conventions.

Use these commands to inspect progress:

    git diff --stat
    git diff
    git status --short

## 6. Validate and review your own changes

Run checks appropriate to the change, such as:

- Targeted tests.
- Type checking.
- Linting.
- A production build.
- Integration or end-to-end checks when needed.

Use the repository’s actual commands.

Before committing, inspect:

    git diff --check
    git diff
    git status --short

Review for:

- Correctness and edge cases.
- Regressions and unintended behavior.
- Authentication, authorization, and data exposure.
- Error handling.
- Compatibility and migration requirements.
- Unnecessary complexity.
- Missing or misleading documentation.
- Accidental secrets, debug output, and unrelated files.

If a check fails, determine whether the failure was introduced by the change. Fix relevant failures and report any existing or environmental failures precisely.

## 7. Stage deliberately and commit

Stage specific files or selected hunks:

    git add src/auth/redirect.ts
    git add -p

Inspect exactly what will be committed:

    git diff --cached --stat
    git diff --cached
    git diff --cached --check

Avoid blindly running git add . in a working tree that may contain unrelated changes.

Follow the repository’s commit convention. If none exists, use:

    <type>(<optional-scope>): <imperative description>

Examples:

    fix(auth): preserve the return URL after login
    feat(search): add customer email filtering
    docs: clarify local database setup

Keep commits logically coherent. Do not amend existing commits unless authorized or clearly part of the agreed workflow.

## 8. Push and open a pull request

When publishing is authorized:

    git push -u origin codex/fix/login-redirect

Use the repository’s PR template.

A useful PR description includes:

### Problem

Explain the concrete bug or requested capability.

### Change

Explain the resulting behavior and important implementation decisions.

### Validation

List the checks actually run and their results.

### Risks or rollout

Include migrations, compatibility concerns, deployment dependencies,
or known limitations when relevant.

Verify:

- The PR targets the correct base branch.
- The title describes the outcome.
- The diff contains only intended changes.
- Required issues are linked.
- The PR is marked as draft if work or validation is incomplete.

With GitHub CLI:

    gh pr create --base main --head codex/fix/login-redirect --title "Fix login return URL" --body-file pr-body.md

Use an actual file for multiline descriptions, and keep temporary files out of commits.

Do not fabricate reviewer approval, CI results, or issue links.

## 9. Review a pull request

Fetch the current PR state and review its latest diff.

Understand:

- What behavior the PR intends to change.
- The base branch and scope.
- Related code, callers, tests, and configuration.
- CI results and existing review discussions.

Prioritize actionable findings:

1. Security issues or data loss.
2. Incorrect behavior and regressions.
3. Broken compatibility or deployment behavior.
4. Important performance problems.
5. Maintainability issues with concrete consequences.

For each finding, provide:

- Severity.
- File and precise line location.
- The condition that triggers the problem.
- The practical impact.
- A suggested correction when useful.

Distinguish verified defects from questions or uncertain concerns.

Avoid filling the review with subjective style preferences already covered by tooling.

If no actionable findings are found, say so and describe any material validation gaps. Do not imply that absence of findings guarantees correctness.

Publish review comments or submit approval only when authorized.

## 10. Address review feedback

For each requested change:

1. Verify the feedback against the current code.
2. Implement a focused correction.
3. Run relevant checks.
4. Review the resulting diff.
5. Commit and push when authorized.
6. Explain how the feedback was addressed.

Prefer follow-up commits on shared review branches.

If feedback conflicts with requirements or would introduce a defect, explain the conflict with evidence.

Do not resolve discussions while leaving the underlying issue unaddressed.

## 11. Update a branch safely

Fetch before deciding how to update:

    git fetch origin

For a shared branch, merging the base is usually safer than rewriting history:

    git merge origin/main

For a private branch, rebase may be appropriate if repository policy allows it:

    git rebase origin/main

Before rebasing:

- Verify the working tree is ready.
- Understand which commits will be rewritten.
- Confirm whether anyone else depends on the branch.
- Create a backup reference if useful.

If rewritten commits were already published, updating the remote requires authorization:

    git push --force-with-lease

Never use plain --force.

If --force-with-lease rejects the push, inspect the remote changes. Do not bypass the protection.

## 12. Resolve conflicts

Start with:

    git status

For each conflicted file:

- Read both sides and the surrounding code.
- Understand the intent of each change.
- Produce the correct combined behavior.
- Remove all conflict markers.
- Run relevant checks.

Stage resolved files:

    git add path/to/resolved-file

Continue the active operation as appropriate:

    git merge --continue
    git rebase --continue
    git cherry-pick --continue

Do not blindly accept "ours" or "theirs." Their meaning can be surprising during rebase.

If abandoning the operation is necessary and authorized, use the matching abort command:

    git merge --abort
    git rebase --abort
    git cherry-pick --abort

## 13. Merge a pull request

Merge only when authorized and after verifying:

- The latest PR head is the one that was reviewed.
- Required CI checks pass.
- Required approvals are present.
- Requested changes are addressed.
- Conflicts are resolved.
- The target branch is correct.
- Repository protection and merge policies are satisfied.

Use the repository’s preferred strategy:

- Squash merge: combine the PR into one commit.
- Merge commit: preserve branch commits and merge history.
- Rebase merge: place individual commits onto the base linearly.

Prefer the hosting provider’s PR merge operation so that required checks and review policies are applied.

Never bypass branch protections.

After merging:

- Verify that the PR is actually merged.
- Report the merge result.
- Delete the source branch only when authorized or covered by established repository policy.
- Do not delete a branch or worktree that still contains needed work.

## 14. Git debugging toolkit

### Inspect changes

    git diff
    git diff --cached
    git diff -- path/to/file
    git show <commit>
    git log --oneline --graph --decorate --all

### Compare a branch with its base

    git diff origin/main...HEAD
    git log origin/main..HEAD --oneline

The three-dot diff shows changes from the merge base to HEAD and is useful for understanding PR scope.

### Find when code changed

    git log --follow -- path/to/file
    git log -S "exact text" --oneline -- path/to/file
    git log -G "regular-expression" --oneline -- path/to/file
    git blame -L 20,45 -- path/to/file

Use blame as a navigation tool, not as evidence of fault.

### Diagnose tracking and divergence

    git branch -vv
    git remote show origin
    git rev-list --left-right --count HEAD...origin/main

The last command counts commits unique to HEAD and to origin/main.

### Explain ignored files

    git check-ignore -v path/to/file

### Recover a lost commit

    git reflog
    git show <recovered-commit>
    git branch recovery/lost-work <recovered-commit>

Create a recovery branch before attempting any destructive repair.

Reflog is local and retention is limited; it is not a backup.

### Find a regression with bisect

Start only with a suitable working tree and reproducible pass/fail check:

    git bisect start
    git bisect bad <known-bad-commit>
    git bisect good <known-good-commit>

Test each selected revision and mark it:

    git bisect good
    git bisect bad

Finish with:

    git bisect reset

Use git bisect skip for revisions that cannot be tested.

### Undo a published change

Prefer a new revert commit:

    git revert <commit>

Reverting a merge requires choosing the correct mainline parent. Inspect the history before doing so.

### Unstage a file while retaining its edits

    git restore --staged path/to/file

### Investigate line-ending problems

    git ls-files --eol
    git check-attr -a -- path/to/file

Read .gitattributes before changing line-ending configuration.

### Investigate repository corruption

    git fsck

Inspect the results before attempting repairs or deleting Git objects.

## 15. High-risk operations

Do not run these without explicit authorization and a clear understanding of their effect:

    git reset --hard
    git clean -fd
    git clean -fdx
    git restore <file-with-uncommitted-changes>
    git checkout -- <file-with-uncommitted-changes>
    git push --force
    git branch -D <branch>

Also treat the following as high risk:

- Rewriting shared history.
- Deleting remote branches.
- Removing worktrees containing changes.
- Changing repository remotes.
- Disabling hooks or bypassing branch protections.
- Removing lock files before confirming no Git operation is active.

When cleanup is requested, inspect a dry run first:

    git clean -nd

Use -ndx only when intentionally inspecting ignored files too.

## 16. Final report

When work finishes, report:

- What changed and why.
- The branch name.
- Commits created, if any.
- Checks run and their results.
- The PR link, if created.
- Whether the work is local, pushed, awaiting review, or merged.
- Any remaining blockers or risks.

Keep the report concise and factual.
