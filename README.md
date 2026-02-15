# Lebob FLL Robotics Team website.
## Contributing
### Issues
- Issues are used for telling other contributors what to fix (issues the code has)
- To create an issue, go to the **issues** tab on our repository and click **new issue**
- If you want to work on an issue, assign yourself and comment on the issue to tell other contributors that you are doing the issue
### Branches
- Before starting your work, make sure to create a new branch by running:
    `git checkout -b <branch-name>`
    `git push origin -u <branch-name>`
- `<branch-name>` should be named in the format of `<your-name>/<branch-scope>`
- `<branch-scope>` should be a short, fully lowercase description of what your change is doing. *e.g. fixing bugs* 
### Commits
- After doing all your changes to the code, run:
    ```git add .
    git commit -m "<your-commit-message>"
    git push origin <branch-name>
    ```
- This will commit (save) your work and put your changes onto the online branch.
### Pull Requests
- When all your work is finished, and you want it to be merged to main, you can make a pull request (pr)
- To create a pr, go to the **pull requests** tab on our repository and click **new pull request**
- Name it something descriptive and appropiate and then click **create**
- Ping someone to review your code
- They can tell you to fix certain things by leaving a review which you can do by editing the code and commiting again.
### Pushing
- Before you can push, someone else has to review your changes.
- A check will then run to see if your code works.
- If it doesn't work you will need to fix your code.
- Otherwise, you can click **merge** to push your code to main.
## Dependencies
Run this to be able to test your code.
`pnpm install`
## Run (Development)
You can run this command if you want to test the code:
`npm run dev`

Wait for it to say build successful then go onto your browser at **localhost:4000** to see the website.
The changes you make will be updated as you save your work.
