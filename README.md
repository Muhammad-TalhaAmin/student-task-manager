# Student Task Management Application

## Project Description

Student Task Manager is a simple web application that helps students add, organize, and track their daily tasks. It was built by a two-person team as a collaborative Git and GitHub assignment, to demonstrate a real development workflow: branches, issues, pull requests, code reviews, merge conflict resolution, tags, and releases.

Repository: https://github.com/Muhammad-TalhaAmin/student-task-manager

---

## Team Members

| Name | Roll No. | GitHub Username |
|---|---|---|
| Muhammad Talha | BSDSF25M009 | [Muhammad-TalhaAmin](https://github.com/Muhammad-TalhaAmin) |
| Shahryar Khalid | BSDSF25M012 | [Shahryar Khalid ](https://github.com/shahryarkhalid-cmd) |

---

## Features

- Add new tasks with a title and an optional description
- Mark tasks as completed (and undo)
- Delete tasks
- Search tasks by title or description
- Filter tasks by status: All, Pending, Completed
- Tasks are saved in the browser using localStorage
- Simple and clean interface
- Responsive design for mobile and desktop

---

## Technologies

- HTML
- CSS
- JavaScript
- Git
- GitHub

---

## Git Workflow

1. Create the project and initialize Git
2. Make meaningful commits and push `main` to GitHub
3. Create a feature branch for each feature
4. Create GitHub Issues to describe the work
5. Open a Pull Request from each feature branch into `main`
6. Review the code, approve, and merge
7. Pull the latest `main` before starting new work
8. Create and resolve a merge conflict
9. Practise recovery commands (stash, restore, reset, revert)
10. Create the `v1.0.0` tag and a GitHub Release

---

## Branches

| Branch | Purpose |
|---|---|
| `main` | Stable, merged code |
| `feature/task-form` | Task input form |
| `feature/task-style` | Styling and responsive layout |
| `feature/task-search` | Search functionality |
| `docs/readme-title-system` | README title change (merge conflict demo) |
| `docs/readme-title-application` | README title change (merge conflict demo) |
| `docs/final-readme` | Final README documentation |

---

## Git Commands Demonstrated

| Area | Commands |
|---|---|
| Setup | `git --version`, `git config` |
| Basics | `git init`, `git status`, `git add`, `git commit`, `git log`, `git show` |
| Branching | `git branch`, `git switch`, `git merge` |
| Comparing | `git diff`, `git diff --staged`, `git blame` |
| Remote | `git remote -v`, `git clone`, `git push`, `git fetch`, `git pull` |
| Recovery | `git stash`, `git restore`, `git reset`, `git revert` |
| Versioning | `git tag`, `git push --tags` |

---

## GitHub Features Demonstrated

- Public repository with a remote connection
- Collaborators
- Issues with descriptions and acceptance criteria
- Pull Requests with descriptions
- Code reviews with comments and approvals
- Linking Pull Requests to Issues (`Closes #<issue-number>`), which closes the issue on merge
- Merge conflict creation and resolution
- Tags
- GitHub Releases

---

## How to Run

1. Clone or download the repository:
```bash
   git clone https://github.com/Muhammad-TalhaAmin/student-task-manager.git
```
2. Open the project folder.
3. Open `index.html` in your web browser.
4. Start adding and managing your tasks.

No installation or build step is needed.

---

## Project Structure

```text
student-task-manager/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Screenshots

Screenshots of each step (Git configuration, commits, branches, pull requests, code reviews, merge conflict, recovery commands, tag, release, and the final application) are included in the submitted Word document, and are also included below.

### Project Setup and First Commits

| Screenshot | Preview |
|---|---|
| Initial project | ![Initial Project](screenshots/InitialProject.png) |
| Initial status | ![Initial Status](screenshots/InitialStatus.png) |
| Files added (staged) | ![Files Addition](screenshots/.filesAddition.png) |
| Status before the first commit | ![Before 1st Commit](screenshots/before1stcommit.png) |
| First commit | ![1st Commit](screenshots/1stcommit.png) |
| Commit history | ![History](screenshots/history.png) |
| First preview | ![1st Preview](screenshots/1stPreview.png) |

### Comparing and Recovery Commands

| Screenshot | Preview |
|---|---|
| `git diff` | ![git diff](screenshots/git-diff.png) |
| `git stash` | ![git stash](screenshots/git-stash.png) |
| `git restore` | ![git restore](screenshots/gitRestore.png) |
| `git reset` | ![git reset](screenshots/git-reset.jpeg) |
| `git revert` | ![git revert](screenshots/git-revert.jpeg) |

### Issues, Pull Requests, and Reviews

| Screenshot | Preview |
|---|---|
| GitHub Issues | ![Issues](screenshots/Issues.png) |
| Task form feature | ![Task Form](screenshots/task-form.png) |
| Task form pull request | ![Task Form Pull Request](screenshots/task-form-pullrequest.png) |
| Task style feature | ![Task Style](screenshots/task-style.png) |
| Task search branch | ![Task Search Branch](screenshots/task-search-branch.jpeg) |
| Task search pull request | ![Task Search Pull Request](screenshots/task-search-PR.jpeg) |
| Merging and reviewing | ![Merging and Reviewing](screenshots/mergingAndReviewing.png) |
| Task input form merge | ![Task Input Form Merge](screenshots/task-input-form-merge.png) |

### Merge Conflict Resolution

| Screenshot | Preview |
|---|---|
| Merge conflict | ![Merge Conflict](screenshots/MergeConflict.jpeg) |
| Resolve conflict | ![Resolve Conflict](screenshots/ResolveConflict.jpeg) |
| Successful merge | ![Successful Merge](screenshots/successful-merge.jpeg) |

### Tag and Release

| Screenshot | Preview |
|---|---|
| `git tag` | ![Tag](screenshots/tag.png) |
| GitHub Release | ![Release](screenshots/release.png) |
| `v1.0.0` version | ![v1.0.0](screenshots/v1.0.0..png) |

### Final Application

![Final Preview](screenshots/Final_preview.png)

---

## Version History

| Version | Description |
|---|---|
| v1.0.0 | First stable release: add, complete, delete, search, filter, and responsive design |

---

## Contributors

- **Muhammad Talha** (BSDSF25M009): project setup, task form, pull request reviews, documentation, tag and release
- **Shahryar Khalid** (BSDSF25M012): styling, task functionality, pull request reviews, conflict resolution