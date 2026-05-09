# Usage

@edit-brief.md <brief-file-path> [original-requirements-context]

## Context

Brief file path: $ARGUMENTS (first argument - path to the brief file to be edited)
Original requirements context: $ARGUMENTS (optional second argument - additional context about original requirements)

# Role & Purpose

The Edit Brief Command reviews and refines development briefs to ensure they are implementable, appropriately scoped, and aligned with codebase realities. This command operates as a quality gate in the development workflow, transforming over-engineered or under-specified briefs into focused, actionable development plans. Success ensures downstream implementation proceeds efficiently with clear scope and technical alignment, while failure results in implementation delays and scope creep.

# Input Structure

**Required Inputs:**
- Brief file path containing the development brief to be reviewed
- Access to original requirements context (from brief file or provided context)

**Expected Input Formats:**
- Brief files in markdown format following standard brief structure
- Original requirements accessible within the brief or as additional context
- Codebase files automatically discovered through pattern analysis

# Process Workflow

1. **Git Status Check** - Run `git status` to verify current repository state and identify any uncommitted changes that might affect analysis
2. **Brief Analysis** - Read the provided brief file and extract original requirements, scope boundaries, and implementation approach
3. **Requirements Alignment Check** - Compare brief against original requirements to ensure business goals and scope boundaries remain intact
4. **Codebase Pattern Discovery** - Search relevant files for existing architectural patterns, conventions, and implementation constraints
5. **Implementation Feasibility Review** - Validate technical approaches against current codebase capabilities and discovered patterns
6. **Brief Refinement Execution** - Make targeted edits to improve implementability while maintaining business alignment
7. **File Generation** - Create revised file with appropriate versioning suffix
8. **Stop** - Complete execution with refined brief and concise edit summary

# Ground Rules & Constraints

**DO:**
- Work exclusively within the constraints of provided brief and discovered codebase patterns
- Preserve original business requirements and acceptance criteria alignment
- Follow existing codebase patterns and architectural conventions discovered through analysis
- Focus on business outcomes rather than technical implementation details in acceptance criteria
- Create concise edit summaries at the top of revised files

**DON'T:**
- Expand scope beyond the original requirements or brief boundaries
- Request additional context beyond what can be discovered through file analysis
- Include rigid implementation prescriptions that constrain developer flexibility
- Make cosmetic changes that don't address scope, feasibility, or clarity issues
- Overwrite original brief files

# Output Delivery Structure

**Implementation Codes:**
- Single revised brief file with `-revised-{no}` suffix (where {no} increments for subsequent revisions)
- Concise edit summary at the top of the file explaining key changes made
- Preserved original file structure with targeted improvements only

**Documentation:**
- Edit summary in revised file header explaining reasoning behind modifications
- Implementation considerations based on codebase pattern analysis

# Logging

Log the brief editing results to `/docs/notes/<YYYY-MM-DD>/edit-brief-<brief-name>.md` file, including original brief analysis findings, specific refinements made, and implementation considerations discovered during codebase pattern analysis.