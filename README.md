# Lebob FLL Robotics Team Website
The recommended code editor for beginners is VSCode.
Install VSCode [here](https://code.visualstudio.com/download).
## Contributing
### Issues
- Issues are used for telling other contributors what to fix (issues the code has)
- To create an issue, go to the **issues** tab on our repository and click **new issue**
- If you want to work on an issue, assign yourself and comment on the issue to tell other contributors that you are doing the issue
### Cloning the Repo
- To begin making changes on the repository, you must clone it to your device locally first. There are two ways of doing this:
1. In Visual Studio Code (VSC)
   - Upon opening VSC, you will be met with a welcome tab with some actions you can do
         - If you are on a previous codespace, enter <kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd> to open a new window
   - Then, click `Clone Git Repository`, follow the instructions, and enter [this URL](https://github.com/Lebob-Robotics/Lebob-Website)
     <img width="1800" height="1274" alt="image" src="https://github.com/user-attachments/assets/2864f51c-42a0-4988-97e9-2a162eb22664" />
     
   - You can now continue with the rest of the instructions
2. In Terminal 
   - If you can't find the `Clone Git Repository`, or don't have or use VSC, then follow this:
   - Navigate in your file manager to the folder you want this project to be in
   - **Right-click** the folder, and select open in terminal
   - Enter `git clone https://github.com/Lebob-Robotics/Lebob-Website` in the terminal, and it should have cloned
   - You can now navigate to `Lebob-Website` in your code editor and check if it has cloned
3. Before continuing, see [dependencies](#dependencies) to be able to run the website.

### Terminal
- Most commands will be run in terminal
- To open terminal in VSC, enter <kbd>Ctrl/Cmd</kbd> + <kbd>`</kbd>
- You can also search up terminal as an app on your computer and it will show up.

### Branches
- Before starting your work, make sure to create a new branch by running:
    ```git switch -b <branch-name>
    git push origin -u <branch-name>```
- `<branch-name>` should be named in the format of `<your-name>/<branch-scope>`
- `<branch-scope>` should be a short, fully lowercase description of what your change is doing. *e.g. fixing bugs*
  
### Commits
- After doing all your changes to the code, run:
    ```git add .
    git commit -m "<your-commit-message>"
    git push origin <branch-name>
    ```
<img width="173" height="249" alt="image" src="https://github.com/user-attachments/assets/9924c18d-8fa2-4ff9-8d6a-e3d3c9b729f1" />

- This will commit (save) your work and put your changes onto the online branch.
  
### Pull Requests
- When all your work is finished, and you want it to be merged to main, you can make a pull request (pr)
- To create a pr, go to the **pull requests** tab on our repository and click **new pull request**
<img width="2516" height="710" alt="image" src="https://github.com/user-attachments/assets/7874d7f7-76d8-49d1-b860-a28bcbccea69" />

- Name it something descriptive and appropiate and then click **create**
- Ping someone to review your code
- They can tell you to fix certain things by leaving a review which you can do by editing the code and commiting again.

### Pushing
- Before you can push, someone else has to review your changes. (and accept them)
- A check will then run to see if your code works.
- If it doesn't work you will need to fix your code.
- Otherwise, you can click **merge** to push your code to main.
- To get the latest code from the repo, enter:
  ```git pull origin main
  git checkout <your-branch-name>
  git merge main
  ```
- If there are conflicts, click **Resolve in merge editor**, click the double checkmark in the incoming window, and click **Complete merge**
- Commit the merge and push to your branch

## Dependencies
- node.js: [Install (latest)](https://nodejs.org/en/download/current)
- pnpm: run `npm install pnpm`
These are both needed to run the website.
## Run (Development)
You can run this command if you want to test the code:
`pnpm run dev`

Wait for it to say `✅ Starting...` then enter the link it tells you to to see the website locally on your laptop.
The changes you make will be updated as you save your work.

<img width="552.5" height="345.5" align="center" alt="image" src="https://github.com/user-attachments/assets/0c917561-a855-41c0-8b02-70e063f22702" />
