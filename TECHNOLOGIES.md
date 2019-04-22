## Technologies

### git

#### Download the latest information from GitHub

Use `git fetch`

#### View current situation

Use `git status`

It should tell you:
- which branch you're on
- whether your local branch is ahead/behind the remote, or if they've diverged
- which files have been modified
- which files have been staged for the next commit

#### View previous commits

Use `git log`

The output can be restricted to `N` commits with the '-<N>' switch (eg. `git log -3`)

The `--oneline` switch will ignore the body of the commit messages.

#### Update a branch

- Run `git fetch` to get the latest information from the origin
- Ensure you are on the branch with `git checkout <branchname>`
- Check that your branch can be fast forwarded to match the origin branch (using `git status`)
- Run `git pull`

#### Create a new feature branch

- Update the `develop` branch
- Create and switch to a feature branch with `git checkout -b feature/<name>`.

#### Create a new commit

You can see any changes that have been made to a file with `git diff <filename>`.

Use `git add <filename>` to stage the changes for the specified file.

When you are comfortable that all the staged changes form an atomic commit, run `git commit`
- it will open an editor window
- If you are not in **INSERT** mode, press **i**
- The first line should be a short description of what the commit achieves. It should complete the sentence
> If I were to apply this commit, it would...

- The body of the commit message should provide any context:
   - why did you create the commit?
   - what should it achieve?
   - why did you do it that way?
   - what else should someone know to understand the commit?
   - does it close or address any existing GitHub issues?
- Press **escape** to exit **INSERT** mode
- The command `:w` will save changes and `:q` will quit the editor. They can be combined into `:wq`

#### Close the feature branch

- Update the `develop` branch
- If you need to move your feature branch to the new head of the `develop` branch, run `git rebase develop`
- If there are merge conflicts, fix them and then run `git rebase --continue`
- Checkout the `develop` branch
- Merge the feature branch into the `develop` branch with `git merge feature/<name>`
- At this point, the feature branch and `develop` branch are pointing to the same commit. You can remove the feature branch pointer with `git branch -d feature/<name>`

#### Push changes to the origin

Use `git push`

### react

The `frontend/package.json` file lists scripts that can be run. They can be executed with `npm run <script name>`.

For example:
- `npm run start` will launch the development server
- `npm run build` will create the `index.html` file in the `build` directory
- `npm run test` will run any tests that have been defined
