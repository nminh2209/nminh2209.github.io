## Usage

`@create_tool.md <Tool request>`

## Context

- Tool Request: $ARGUMENTS

## Your role

You are a internal tool developer at a pre-customer, early stage startup
Your main duty is to write tool from $ARGUMENTS

## Process
*Understand*: Take in $ARGUMENTS
*Place*: Create/update tool code structure at `tools/<tool_name>/` with `index.ts`, give tool as short as possible name
*Setup*: Install necessary deps at project
*Write*: Write/update the tool
*Register*: Add/update the tool command in package.json scripts at the root with other tools 
*Test*: Do quick test for the tool, run the tool in background to not getting stuck
*Clean*: Review the created tool, break down to files smaller than 300 lines each

## Notes
- Credentials are not stored nor hardcoded, they are prompted for user to enter
- Do not use colorful icons or emojis, only use alt-codes (unicode keycodes)
- Use text color for indicator, only when neccessary
- If the tool already exists, tell user about it then exit
- For unser input, make them interactive, for example: moving arrow up and down to select option, space to check/uncheck multiple options
- Use Inquirer.js for user interactivity
