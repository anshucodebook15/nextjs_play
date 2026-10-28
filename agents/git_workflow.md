# Git Workflow Guide for AI Agents

Instructions for any AI agent (Claude Code, Copilot agent, Cursor, etc.) working in this repository. Follow these rules unless the human explicitly overrides them in the current task.

---

## 0. Core Principles

1. **Never work directly on `main` / `master` / `develop` / release branches.** Always use a feature branch.
2. **Small, focused changes.** One branch = one purpose. One commit = one logical change.
3. **Inspect before you act.** Run `git status`, `git branch --show-current`, and `git log --oneline -5` before any write operation.
4. **Never destroy work silently.** No `reset --hard`, `clean -fd`, `push --force`, `branch -D`, or `checkout .` without explicit human approval.
5. **Never rewrite shared history.** Only rebase/amend commits that exist only on your local or personal feature branch.
6. **Never commit secrets.** No `.env`, API keys, tokens, private keys, credentials, or large binaries.
7. **Ask when unsure.** If the repo state is unexpected (dirty tree, detached HEAD, unknown branch), stop and report rather than guess.

---

## 1. Pre-flight Checklist (run before starting any task)

```bash
git status                       # Is the tree clean? Any untracked/modified files?
git branch --show-current        # Which branch am I on?
git remote -v                    # Which remotes exist?
git fetch --all --prune          # Sync remote refs (safe, read-only for working tree)
git log --oneline -5             # Recent history
git stash list                   # Any forgotten stashes?
```

Decision table:

| Situation                             | Action                                                    |
| ------------------------------------- | --------------------------------------------------------- |
| Clean tree, on default branch         | Pull latest, create feature branch                        |
| Dirty tree you did not create         | **Stop.** Ask the human. Do not stash/discard on your own |
| Dirty tree from your own earlier work | Commit it or continue; don't mix with a new task          |
| Detached HEAD                         | Create a branch from it (`git switch -c <name>`) or ask   |
| Mid-merge / mid-rebase                | Resolve or abort (see §9); don't start new work           |

---

## 2. Branch Naming

### Format

```
<type>/<ticket-id>-<short-kebab-description>
```

- Lowercase only, words separated by hyphens, no spaces or special characters.
- Keep under ~50 characters.
- Include the ticket/issue ID when one exists (`PROJ-123`, `gh-456`).
- Describe the _what_, not the _who_.

### Types

| Prefix              | Use for                                                             |
| ------------------- | ------------------------------------------------------------------- |
| `feature/`          | New functionality                                                   |
| `fix/` or `bugfix/` | Bug fixes                                                           |
| `hotfix/`           | Urgent production fixes (branch from production/main)               |
| `refactor/`         | Code restructuring with no behavior change                          |
| `docs/`             | Documentation only                                                  |
| `test/`             | Adding or fixing tests only                                         |
| `chore/`            | Tooling, dependencies, config, CI                                   |
| `perf/`             | Performance improvements                                            |
| `release/`          | Release preparation (`release/1.4.0`)                               |
| `ai/` or `claude/`  | _(Optional)_ Agent-authored work, if the team wants it identifiable |

### Examples

```
feature/PROJ-142-user-avatar-upload
fix/PROJ-201-null-pointer-on-login
refactor/extract-payment-service
docs/update-api-readme
chore/bump-eslint-9
```

### Anti-patterns

`my-branch`, `test`, `fix`, `new-stuff`, `Feature/AddThing` (mixed case), `john-work`, `fix_login bug`.

---

## 3. Creating a Branch

```bash
git switch main                      # or the repo's default branch
git pull --ff-only origin main       # fast-forward only; fail instead of creating merge commits
git switch -c feature/PROJ-142-user-avatar-upload
```

Rules:

- Always branch from the up-to-date default branch (or the branch the human specifies).
- Use `git switch -c` (modern) rather than `git checkout -b`; both are acceptable.
- Verify with `git branch --show-current` before making changes.
- Push early with upstream tracking so work is backed up:
  ```bash
  git push -u origin HEAD
  ```

---

## 4. Making Commits

### Before committing

```bash
git status                  # Review what changed
git diff                    # Review unstaged changes
git diff --staged           # Review staged changes (do this right before committing)
```

- **Stage explicitly**: `git add path/to/file` or `git add -p` (interactive hunks). Avoid blind `git add .` / `git add -A` unless you've verified the status output and `.gitignore` is correct.
- Never stage generated files, build output, `node_modules`, `.env`, IDE configs, or OS junk.
- Run the project's formatter, linter, and tests **before** committing.

### Commit message format (Conventional Commits)

```
<type>(<optional scope>): <imperative summary, max 72 chars>

<optional body: explain WHY, not just what. Wrap at 72 chars.>

<optional footer: Closes #123 / BREAKING CHANGE: ...>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Good:

```
fix(auth): prevent crash when session token is missing

The login handler dereferenced user.session without a null check,
causing a 500 for expired sessions. Return 401 instead.

Closes #201
```

Bad: `fixed stuff`, `WIP`, `update`, `asdf`, `final final v2`.

### Commit hygiene

- Imperative mood: "add", "fix", "remove" (not "added", "fixes").
- One logical change per commit; split unrelated changes.
- Don't commit commented-out code or debug prints.
- Don't use `--no-verify` to bypass hooks. If a hook fails, fix the cause.
- Don't add `Co-authored-by` or attribution lines unless the team's convention requires it.
- Never amend or rebase commits that have already been pushed to a shared branch.

---

## 5. Keeping Your Branch Up to Date

Check the team convention first (`CONTRIBUTING.md`). Default recommendation:

```bash
git fetch origin
git rebase origin/main        # for private feature branches: keeps history linear
# OR
git merge origin/main         # if the branch is shared, or the team prefers merge commits
```

| Use **rebase** when                              | Use **merge** when                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| Branch is only yours                             | Others have based work on your branch                                           |
| Team prefers linear history                      | Branch already has an open, reviewed PR with comments you want to keep anchored |
| You haven't pushed yet, or can safely force-push | You must not rewrite history                                                    |

After rebasing a branch that was already pushed:

```bash
git push --force-with-lease     # NEVER plain --force
```

Only do this on your own feature branch, and only with human awareness if a PR is under review.

---

## 6. Merging

### Merge strategies

| Strategy     | Command               | Result                    | When                                            |
| ------------ | --------------------- | ------------------------- | ----------------------------------------------- |
| Fast-forward | `git merge --ff-only` | Linear, no merge commit   | Default for tiny, up-to-date branches           |
| Merge commit | `git merge --no-ff`   | Preserves branch topology | Long-lived or multi-commit features             |
| Squash       | `git merge --squash`  | One commit on target      | Noisy WIP history; team uses squash-merge       |
| Rebase-merge | via PR UI             | Linear, commits replayed  | Teams that want linear history with all commits |

### Local merge procedure

```bash
git switch main
git pull --ff-only origin main
git merge --no-ff feature/PROJ-142-user-avatar-upload
# resolve conflicts if any (see §9), run tests
git push origin main        # Only if the human has authorized direct pushes; normally merge via PR
```

**Default rule for agents: do not merge into protected branches locally. Merge through a pull request.**

---

## 7. Raising a Pull Request

### Before opening

- [ ] Branch is rebased/merged with the latest target branch
- [ ] All tests, linters, type checks, and build pass locally
- [ ] Diff reviewed by you line by line: `git diff origin/main...HEAD`
- [ ] No unrelated changes, secrets, debug code, or stray files
- [ ] Commits are clean and well-described
- [ ] Docs, changelog, and tests updated where relevant

### Open the PR (GitHub CLI)

```bash
git push -u origin HEAD
gh pr create \
  --base main \
  --title "feat(profile): add avatar upload" \
  --body-file .github/pr_body.md \
  --draft            # open as draft if work is incomplete
```

Other platforms: `glab mr create` (GitLab), or the web UI.

### PR title

Same style as a commit subject: `type(scope): summary`. Under 72 characters.

### PR description template

```markdown
## Summary

What does this PR do, in 1–3 sentences?

## Motivation / Context

Why is this needed? Link the issue: Closes #123

## Changes

- Bullet list of the notable changes
- Mention any new dependencies or config

## How to Test

1. Step-by-step reproduction / verification
2. Expected result

## Screenshots / Output (if UI or CLI change)

## Risks & Rollback

Anything reviewers should be careful about? How to revert?

## Checklist

- [ ] Tests added/updated
- [ ] Docs updated
- [ ] No breaking changes (or documented below)
```

### PR size

Aim for under ~400 changed lines. If larger, split into stacked PRs or explain why it can't be split.

---

## 8. Reviewing a Pull Request (as an AI reviewer)

### Procedure

```bash
gh pr checkout <number>                 # or: git fetch origin pull/<n>/head:pr-<n>
git diff origin/main...HEAD --stat      # scope overview
git diff origin/main...HEAD             # full diff
git log origin/main..HEAD --oneline     # commit list
```

Then run the project's tests, linter, and build against the PR branch.

### Review checklist

| Area              | Questions                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Correctness**   | Does it do what the description says? Edge cases, null/empty inputs, off-by-one, concurrency, error paths? |
| **Tests**         | New behavior covered? Tests meaningful (not just asserting mocks)? Regressions covered?                    |
| **Security**      | Input validation, injection, authz/authn, secrets, unsafe deserialization, new dependencies?               |
| **Design**        | Fits existing architecture? Right abstraction level? Duplicated logic?                                     |
| **Readability**   | Clear names, small functions, useful comments (why, not what)?                                             |
| **Performance**   | N+1 queries, unnecessary loops/allocations, blocking calls?                                                |
| **Compatibility** | Breaking API/schema changes? Migrations reversible?                                                        |
| **Scope**         | Any unrelated changes? Leftover debug code, TODOs, commented code?                                         |
| **Docs**          | README/API docs/changelog updated?                                                                         |

### Comment style

- Be specific: reference file and line; explain the problem and suggest a fix.
- Label severity: `blocker:`, `suggestion:`, `nit:`, `question:`, `praise:`.
- Critique code, not people. Prefer questions to commands when intent is unclear.
- Don't approve what you haven't verified; state what you did and did not check.

### Review output format

```markdown
**Verdict:** Approve / Request changes / Comment

**Summary:** One paragraph on overall quality and risk.

**Blockers**

- `path/file.py:42` — description + suggested fix

**Suggestions / Nits**

- ...

**Verified:** tests run (pass/fail), manual checks performed
**Not verified:** anything you couldn't check
```

### Responding to review feedback (as the author)

- Address every comment: fix it, or reply with a reason.
- Push new commits (or `fixup!` commits) rather than rewriting history mid-review, unless asked.
- Re-request review after changes. Don't resolve other people's threads yourself.

---

## 9. Conflict Resolution

```bash
git status                       # lists "both modified" files
```

1. Open each conflicted file; find `<<<<<<<`, `=======`, `>>>>>>>` markers.
2. **Understand both sides** (`git log -p --merge -- <file>`, `git show :2:<file>` ours, `git show :3:<file>` theirs). Do not blindly pick one side.
3. Edit to the correct combined result; remove all markers.
4. `git add <file>` then continue:
   - Merge: `git commit` (or `git merge --continue`)
   - Rebase: `git rebase --continue`
5. Re-run tests and the build. A conflict-free merge can still be semantically broken.

Escape hatches:

```bash
git merge --abort
git rebase --abort
git cherry-pick --abort
```

Useful settings:

```bash
git config rerere.enabled true          # remember conflict resolutions
git config merge.conflictstyle zdiff3   # shows the common ancestor in markers
```

Never resolve lockfile conflicts (`package-lock.json`, `yarn.lock`, `poetry.lock`) by hand-editing; resolve `package.json`/`pyproject.toml`, then regenerate the lockfile.

---

## 10. Git Debugging Techniques

### 10.1 Understand the current state

```bash
git status -sb                         # short status with branch
git log --oneline --graph --decorate --all -20
git diff                               # unstaged
git diff --staged                      # staged
git diff main...HEAD                   # what my branch adds vs main (three dots)
git show <sha>                         # one commit's content
git show <sha> --stat                  # files touched
git branch -vv                         # upstream tracking and ahead/behind
git reflog                             # every HEAD movement, your safety net
```

### 10.2 Find who/when/why a line changed

```bash
git blame -L 40,60 path/file.py        # per-line author/commit
git blame -w -C -C path/file.py        # ignore whitespace, follow moved code
git log -p -- path/file.py             # history of a file with diffs
git log -L 40,60:path/file.py          # history of specific line range
git log --follow -- path/file.py       # follow across renames
git log -S"functionName" --oneline     # commits that added/removed this string (pickaxe)
git log -G"regex" --oneline            # commits whose diff matches regex
git log --grep="keyword" -i            # search commit messages
git log --author="name" --since="2 weeks ago"
```

### 10.3 Find the commit that introduced a bug: `git bisect`

```bash
git bisect start
git bisect bad                         # current commit is broken
git bisect good v1.2.0                 # last known good commit/tag
# git checks out a midpoint; test it, then:
git bisect good    # or: git bisect bad
# ...repeat until it names the first bad commit
git bisect reset                       # return to your original branch
```

Automate with a test script (exit 0 = good, 1–127 except 125 = bad, 125 = skip):

```bash
git bisect start HEAD v1.2.0
git bisect run ./scripts/test_repro.sh
```

### 10.4 Undo and recover (choose the _safest_ tool that works)

| Goal                                       | Command                                        | Safe on shared history?                     |
| ------------------------------------------ | ---------------------------------------------- | ------------------------------------------- |
| Discard unstaged changes to one file       | `git restore path/file`                        | n/a (local, **destructive**: confirm first) |
| Unstage a file                             | `git restore --staged path/file`               | yes                                         |
| Fix last commit message/content (unpushed) | `git commit --amend`                           | **no** if pushed                            |
| Undo last commit, keep changes staged      | `git reset --soft HEAD~1`                      | no if pushed                                |
| Undo last commit, keep changes unstaged    | `git reset --mixed HEAD~1`                     | no if pushed                                |
| Undo a pushed/shared commit                | `git revert <sha>`                             | **yes** (creates inverse commit)            |
| Revert a merge commit                      | `git revert -m 1 <merge-sha>`                  | yes                                         |
| Discard everything (DESTRUCTIVE)           | `git reset --hard <ref>`                       | needs human approval                        |
| Recover "lost" commits/branch              | `git reflog` then `git switch -c rescue <sha>` | yes                                         |
| Temporarily shelve work                    | `git stash push -u -m "msg"` / `git stash pop` | yes                                         |
| Copy one commit to another branch          | `git cherry-pick <sha>`                        | yes                                         |
| Bring back a deleted file                  | `git restore --source=<sha> path/file`         | yes                                         |

**Reflog is your safety net**: committed work is almost always recoverable for ~90 days even after a bad reset or deleted branch.

### 10.5 Cleaning up commits before PR (own branch only)

```bash
git rebase -i origin/main              # squash/reword/reorder/drop
git commit --fixup <sha>               # mark a fix for an earlier commit
git rebase -i --autosquash origin/main
```

### 10.6 Common problems and fixes

| Symptom                                   | Diagnosis                     | Fix                                                                                                                                        |
| ----------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `rejected: non-fast-forward`              | Remote has commits you lack   | `git fetch`, then `git rebase origin/<branch>` (or merge); never blind force-push                                                          |
| `fatal: not a git repository`             | Wrong directory               | `pwd`; `cd` to repo root; `git rev-parse --show-toplevel`                                                                                  |
| "Your local changes would be overwritten" | Dirty tree blocks switch/pull | Commit or `git stash push -u`, then retry                                                                                                  |
| Detached HEAD                             | Checked out a SHA/tag         | `git switch -c new-branch` to keep work, or `git switch -` to leave                                                                        |
| Committed to wrong branch                 | Work sits on `main`           | `git branch feature/x` (new branch at current commit) → `git switch feature/x`; then reset `main` to `origin/main` **with human approval** |
| Committed a secret                        | Exposed credential            | **Rotate the secret first.** Then remove from history (`git filter-repo`) with human approval; assume it's compromised                     |
| Huge file committed                       | Repo bloat / push rejected    | Remove, use Git LFS or `git filter-repo`; coordinate with human                                                                            |
| Accidentally staged wrong files           | Index has extras              | `git restore --staged <file>`                                                                                                              |
| `.gitignore` not working                  | File already tracked          | `git rm --cached <file>` then commit                                                                                                       |
| Merge commit mess / wrong merge           | Bad merge pushed              | `git revert -m 1 <merge-sha>` (don't rewrite shared history)                                                                               |
| Line-ending / whitespace noise in diff    | CRLF vs LF                    | Add `.gitattributes` (`* text=auto`); `git diff -w` to inspect                                                                             |
| Submodule out of sync                     | Detached pointer              | `git submodule update --init --recursive`                                                                                                  |
| Auth failure on push                      | Credentials/SSH               | `git remote -v`; `ssh -T git@github.com`; `gh auth status`                                                                                 |
| Hook blocking commit                      | pre-commit failure            | Read the hook output and fix the cause; don't use `--no-verify`                                                                            |

### 10.7 Inspect without changing anything (safe commands)

`status`, `log`, `diff`, `show`, `blame`, `branch -vv`, `reflog`, `fetch`, `ls-files`, `rev-parse`, `describe`, `shortlog`, `grep`, `remote -v`, `config --list`. Prefer these when investigating.

### 10.8 Debugging mindset for agents

1. Reproduce → 2. Read the **full error message** → 3. Inspect state (§10.1) → 4. Form a hypothesis → 5. Make the _smallest_ reversible change → 6. Verify → 7. If stuck after two failed attempts, stop and report what you tried and the current state. Don't escalate to destructive commands to "make the error go away."

---

## 11. Actions Requiring Explicit Human Approval

Never run these without being told to in the current task:

- `git push --force` / `--force-with-lease` to a branch with an open PR or other contributors
- `git reset --hard`, `git clean -fd`, `git checkout -- .`, `git restore .`
- `git branch -D`, deleting remote branches (`git push origin --delete`)
- `git rebase` / `commit --amend` on already-pushed shared commits
- `git filter-repo`, `git filter-branch`, BFG (history rewriting)
- Pushing to or merging into `main`/`master`/`release/*`/protected branches
- `git stash drop` / `git stash clear`
- Changing git config globally, remotes, hooks, or branch protection
- Tagging or publishing releases
- Bypassing hooks/CI (`--no-verify`, `[skip ci]`)

---

## 12. Standard End-to-End Task Flow (copy this)

```text
1. PRE-FLIGHT      git status / branch --show-current / fetch --all --prune
2. SYNC            git switch main && git pull --ff-only
3. BRANCH          git switch -c <type>/<ticket>-<description>
4. IMPLEMENT       Small edits; run tests/lint continuously
5. REVIEW SELF     git diff; remove debug code; confirm scope
6. COMMIT          git add <specific files>; Conventional Commit message
7. SYNC AGAIN      git fetch; git rebase origin/main (resolve conflicts, re-test)
8. PUSH            git push -u origin HEAD   (--force-with-lease only if rebased after push)
9. PULL REQUEST    gh pr create (title, template body, link issue, draft if WIP)
10. CI + REVIEW    Fix failures; respond to every comment; push follow-up commits
11. MERGE          Via PR UI per team strategy (squash/merge/rebase); delete branch after
12. CLEANUP        git switch main && git pull; git branch -d <branch>; git fetch --prune
13. REPORT         Summarize: branch, commits, PR link, tests run, anything unverified
```

---

## 13. Useful Config Defaults

```bash
git config --global pull.ff only            # never create surprise merge commits on pull
git config --global fetch.prune true
git config --global push.autoSetupRemote true
git config --global rebase.autosquash true
git config --global rerere.enabled true
git config --global merge.conflictstyle zdiff3
git config --global init.defaultBranch main
```

_(Only suggest these to the human; don't change global config unprompted.)_

---

## 14. Final Report Template (after finishing a task)

```markdown
**Branch:** feature/PROJ-142-user-avatar-upload
**PR:** <link> (draft / ready)
**Commits:** N (list subjects)
**Changes:** brief summary of files/areas touched
**Verification:** tests/lint/build commands run and results
**Not done / risks:** anything skipped, assumptions made, follow-ups
**Needs human decision:** (e.g., force-push required, conflicting design choice)
```
