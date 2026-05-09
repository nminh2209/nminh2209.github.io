# Usage

@split.md [file-paths] [--max-lines=300]

## Context

- Target files: $ARGUMENTS (specific file paths or empty for lint-based detection)
- Max lines threshold: Default 300 lines per file

## Role & Purpose

The split command agent specializes in refactoring oversized files into maintainable, logically-separated components while preserving functionality and code quality.

**This agent operates under strict procedural discipline**: You MUST follow the [Process Workflow](#process-workflow) steps sequentially and adhere to all [Ground Rules & Constraints](#ground-rules--constraints) without deviation or exception. Each step must be completed and verified before proceeding to the next. If instructions conflict or are unclear, stop and ask for clarification rather than making assumptions or improvising solutions.

This agent operates in the code maintenance phase of the development topology, ensuring files remain readable and manageable as the codebase grows. Success maintains code organization and developer productivity, while failure can introduce breaking changes or reduce code maintainability. The rigid adherence to established process and constraints minimizes risk and ensures safe, incremental splitting.

## Input Structure

### Required Inputs
- File paths (optional): Specific files to split, or empty to auto-detect from linting
- Maximum line threshold: Default 300 lines for code files (TypeScript, JavaScript, etc.), configurable via --max-lines parameter
- **File Type Rule**: The 300 lines rule applies to code files only. Documentation files (`.md`, `.yaml`, `.yml`, `.json`, etc.) are exempt from this threshold
- **Priority Rule**: If lint configuration specifies a different max file length than the default 300, always follow the lint configuration

### Expected Input Formats
- File paths: Absolute or relative paths to TypeScript, JavaScript, or other code files
- Line threshold: Integer value representing maximum acceptable file length for code files
- Files must be trackable by git and have valid syntax
- Code file extensions include: `.ts`, `.tsx`, `.js`, `.jsx`, `.py`, `.java`, `.go`, `.rs`, `.c`, `.cpp`, etc.
- Documentation file extensions (exempt): `.md`, `.yaml`, `.yml`, `.json`, `.txt`, `.xml`, etc.

### Context Acquisition Strategy
- Reference CLAUDE.md for project structure and conventions
- Examine existing file patterns and naming conventions in the target directory
- Check package.json for available lint, test, and build scripts
- Analyze import/export patterns to understand dependencies

## Process Workflow

1. **Initial Assessment**
   - Run `git status` to check current repository state
   - Check lint configuration files for max file length rules (e.g., eslint config, tslint config)
   - If lint specifies max file length, use that value instead of default 300
   - If no files specified, run `pnpm lint` to identify potential issues
   - Scan specified files or project for code files exceeding max-lines threshold
   - **Skip documentation files** (`.md`, `.yaml`, `.yml`, `.json`, etc.) - they are exempt from line limits
   - Create todo list with identified files and planned split strategy

2. **File Analysis Phase**
   - For each target file, analyze structure and identify logical split points
   - Map imports, exports, and internal dependencies
   - Identify natural boundaries (classes, functions, feature groups)
   - Determine semantic naming for split files

3. **Pre-Split Refactoring**
   - Reorganize the original file to group related code sections together
   - Move code blocks that will belong in the same split file adjacent to each other
   - Maintain all existing functionality and behavior during reorganization
   - Run tests to verify functionality remains intact after reorganization

4. **Safe Copy Strategy**
   - Use `cp` command to create backup of original file as `filename.original`
   - Use `cp` command to create initial split files with semantic names
   - Never start with manual file creation or direct edits

5. **Content Separation**
   - Edit each split file to remove sections that belong in other files
   - Maintain proper import/export statements in each file
   - Ensure each split file has complete, valid syntax
   - Update import statements in files that reference the original

5. **Dependency Resolution**
   - Update all files that import from the original file
   - Add necessary imports to each split file
   - Ensure no circular dependencies are introduced

6. **Validation Phase**
   - Run unit tests or relevant test suites for affected areas
   - Execute lint checks to ensure code quality standards
   - Perform type checking if TypeScript files are involved
   - Verify no compilation or runtime errors

7. **Final Cleanup**
   - Check line counts of all split files to ensure they meet threshold
   - Remove backup files if all tests pass
   - Clean up any temporary files created during process

8. **Stop**
   - Confirm all files are below max-lines threshold and tests pass

## Ground Rules & Constraints

**DO:**
- Always use `cp` command first to create file copies before any manual edits
- Apply the 300 lines rule to code files only (TypeScript, JavaScript, Python, etc.)
- Skip documentation files (`.md`, `.yaml`, `.yml`, `.json`, etc.) - they are exempt from line limits
- Check and follow lint configuration for max file length limits over default values
- Maintain original functionality and behavior after splitting
- Preserve existing code style and conventions
- Run comprehensive tests after each split operation
- Keep related functionality together when possible
- Update all import statements that reference split files
- Use semantic, descriptive names for split files
- Verify git can track all new files properly

**DON'T:**
- Start with manual file creation or Write commands
- Split documentation files (`.md`, `.yaml`, `.yml`, `.json`, etc.) based on line count
- Split files in the middle of logical units (functions, classes)
- Create circular dependencies between split files
- Ignore test failures or linting errors
- Split files smaller than 50 lines unless specifically requested
- Modify files that are not directly related to the split
- Proceed if git status shows uncommitted changes that could conflict
- Split generated or auto-generated files

## Output Delivery Structure

### Implementation Codes
- Split source files with semantic naming (e.g., `user-service.ts` → `user-service-core.ts`, `user-service-validators.ts`)
- Updated import/export statements in all affected files
- Preserved original file functionality across split components

### Validation Artifacts  
- Successful lint check results for all modified files
- Test execution results confirming no regressions
- Type checking results if applicable
- Line count verification for all split files

### Configuration Updates
- Updated import paths in configuration files if necessary
- Modified build or bundling configs if they reference specific files

## Logging

Log the results at the end of run to `/docs/notes/<YYYY-MM-DD>/{descriptive_name}-split.md` file, including original file paths, split file names, line count reductions, test results, and any issues encountered during the splitting process.
