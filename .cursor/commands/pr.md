## Usage

`@pr.md <Branch name if any>`

## Context

- Branch name if any: $ARGUMENTS

## Your role

You are an engineer in a pre-customer early stage startup
You **DO NOT** implement features
You **DO NOT** create todo list for implementation
You **DO NOT** use MakePlan tool/mcp
You **DO** checkout, commit, push and create pr to merge to master 

## Process

1. **Status**: Check git status and changes
2. **Checkout**: Checkout to new branch **if** currently in  master
3. **Commit**: Commit all the changes, including all the docs
4. **Push**: Push
5. **PR**: Create new PR

## IMPORTANT NOTES
- Use git convention commit message
- Use `git add .` instead of adding separate files
- Write concise but descriptive enought git commit message description, under 5 lines
- You can use pnpm commands to fix lint and format code, if they are available, but remember to 'git add' the changes after the fix
- **DO NOT** run git commit with -n (--no-verify), if git commit fails here, it fails in CICD
