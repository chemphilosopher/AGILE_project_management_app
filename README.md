# AGILE Project Management App

A comprehensive web-based application for managing projects using the AGILE methodology. Built with vanilla JavaScript, HTML5, and CSS3 - no dependencies required!

## About AGILE Methodology

AGILE is an iterative approach to project management and software development that helps teams deliver value to customers faster and with fewer headaches. Instead of betting everything on a "big bang" launch, an agile team delivers work in small, consumable increments.

### Core AGILE Values (Agile Manifesto)

1. **Individuals and interactions** over processes and tools
2. **Working software** over comprehensive documentation
3. **Customer collaboration** over contract negotiation
4. **Responding to change** over following a plan

### Key AGILE Principles

- Satisfy the customer through early and continuous delivery
- Welcome changing requirements, even late in development
- Deliver working software frequently (weeks rather than months)
- Business people and developers work together daily
- Build projects around motivated individuals
- Face-to-face conversation is the most efficient method
- Working software is the primary measure of progress
- Sustainable development with constant pace
- Continuous attention to technical excellence
- Simplicity - maximize the amount of work not done
- Self-organizing teams produce the best results
- Regular reflection and adjustment of behavior

## Features

This application implements all essential AGILE practices:

### 1. Product Backlog Management
- Create and manage user stories in the format: "As a [user type], I want to [goal] so that [benefit]"
- Prioritize stories (High, Medium, Low)
- Estimate effort using story points (Fibonacci sequence: 1, 2, 3, 5, 8, 13, 21)
- Add acceptance criteria for each story
- Search and filter capabilities
- Assign stories to team members

### 2. Sprint Planning & Management
- Create time-boxed sprints (1-4 weeks)
- Define sprint goals
- Move stories from backlog to sprint
- Track sprint progress with real-time statistics
- Start, complete, and manage multiple sprints
- Automatic sprint capacity tracking

### 3. Kanban Board
- Visual workflow with 4 columns: To Do, In Progress, Review, Done
- Drag-and-drop story cards between columns
- Filter by current sprint or view all stories
- Real-time story counts per column
- Supports both Scrum and Kanban methodologies

### 4. Team Management
- Add team members with roles:
  - Product Owner
  - Scrum Master
  - Developer
  - Designer
  - QA Engineer
- Define capacity (hours per sprint)
- Track story assignments per team member
- View team workload distribution

### 5. Daily Standup Tracking
- Record daily standup updates for each team member
- Three key questions:
  - What did you do yesterday?
  - What will you do today?
  - Any blockers?
- View today's standup history
- Promotes transparency and quick issue identification

### 6. Sprint Reports & Analytics
- **Burndown Chart**: Visual representation of work remaining vs. time
- **Velocity Chart**: Story points completed per sprint (last 5 sprints)
- Track team velocity for better sprint planning
- Historical performance data

### 7. Sprint Retrospectives
- Capture lessons learned after each sprint
- Three key sections:
  - What went well?
  - What could be improved?
  - Action items
- View historical retrospectives
- Continuous improvement focus

### 8. Dashboard
- Current sprint overview with progress tracking
- Days remaining in sprint
- Team velocity metrics
- Team capacity overview
- Recent standup updates
- At-a-glance project health

### 9. Data Management
- **Export**: Download all project data as JSON
- **Import**: Restore from previous backups
- **Auto-save**: All changes automatically saved to browser localStorage
- Data persists between sessions

## Getting Started

### Installation

1. Clone or download this repository
2. No installation or build process required!
3. Simply open `index.html` in any modern web browser

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project folder
cd AGILE_project_management_app

# Open in browser (macOS)
open index.html

# Or (Linux)
xdg-open index.html

# Or (Windows)
start index.html
```

### Quick Start Guide

#### Step 1: Add Team Members
1. Navigate to the **Team** tab
2. Click "+ Add Team Member"
3. Fill in name, email, role, and capacity
4. Click "Add Member"

#### Step 2: Create User Stories
1. Go to the **Product Backlog** tab
2. Click "+ Add User Story"
3. Fill in the story details:
   - Title (e.g., "User Login")
   - User story format: As a... I want to... So that...
   - Description and acceptance criteria
   - Story points (effort estimation)
   - Priority level
   - Assign to team member
4. Click "Save Story"

#### Step 3: Create a Sprint
1. Navigate to the **Sprint Board** tab
2. Click "+ Create Sprint"
3. Enter sprint name, goal, and dates
4. Click "Create Sprint"

#### Step 4: Plan Your Sprint
1. In the Sprint Board, click "Start Sprint" on your created sprint
2. Drag stories from the backlog into the sprint
3. Ensure total story points match team capacity

#### Step 5: Execute Sprint
1. Go to the **Kanban** tab
2. Drag stories through the workflow:
   - To Do → In Progress → Review → Done
3. Update story status as work progresses

#### Step 6: Daily Standups
1. Visit the **Dashboard** tab daily
2. Each team member records their standup:
   - What they did yesterday
   - What they'll do today
   - Any blockers
3. View team updates in real-time

#### Step 7: Complete Sprint & Retrospective
1. When sprint ends, go to **Sprint Board**
2. Click "Complete Sprint"
3. Navigate to **Reports** tab
4. Select the completed sprint
5. Fill in retrospective:
   - What went well
   - What to improve
   - Action items
6. Click "Save Retrospective"

## AGILE Best Practices Implemented

### User Stories
The app enforces the standard user story format:
> "As a [type of user], I want [goal] so that [benefit]"

This ensures stories are user-centric and deliver clear value.

### Story Points (Fibonacci Sequence)
Story points use Fibonacci numbers (1, 2, 3, 5, 8, 13, 21) which:
- Reflect increasing uncertainty for larger tasks
- Prevent false precision in estimates
- Are relative (not time-based)

### Sprint Time-boxing
Sprints are fixed-duration iterations (typically 2 weeks):
- Creates rhythm and predictability
- Forces prioritization
- Enables regular inspection and adaptation

### Kanban Workflow
The board visualizes work in progress:
- Identifies bottlenecks
- Limits work in progress (WIP)
- Improves flow efficiency

### Definition of Done
Each story can have acceptance criteria defining when it's complete:
- Ensures shared understanding
- Maintains quality standards
- Reduces rework

### Sprint Retrospectives
Regular reflection enables continuous improvement:
- Team discusses what worked and what didn't
- Identifies concrete action items
- Fosters psychological safety

### Velocity Tracking
Historical velocity helps with planning:
- Shows team's average story points per sprint
- Improves estimation accuracy
- Enables realistic commitments

### Daily Standups
Brief daily synchronization:
- Keeps team aligned
- Surfaces impediments quickly
- Promotes transparency

## Technical Details

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS Custom Properties
- **Storage**: Browser localStorage API
- **No Dependencies**: Works offline, no npm or build tools needed

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any modern browser with ES6 and localStorage support

### Data Storage
All data is stored locally in your browser using localStorage:
- Automatic save on every change
- Data persists between sessions
- Export/import for backup and portability
- No server or database required

### File Structure
```
AGILE_project_management_app/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── app.js              # Application logic and functionality
└── README.md           # This file
```

## Usage Tips

### Estimation Guidelines
- **1 point**: Trivial task, < 1 hour
- **2 points**: Simple task, few hours
- **3 points**: Moderate task, half day
- **5 points**: Complex task, 1 day
- **8 points**: Very complex, 2-3 days
- **13 points**: Consider breaking down
- **21 points**: Too large - definitely break down

### Sprint Planning Tips
1. Don't overcommit - use historical velocity
2. Include buffer for unexpected issues (10-20%)
3. Prioritize high-value stories first
4. Ensure stories have clear acceptance criteria
5. Have team estimate collaboratively

### Kanban Best Practices
1. Limit work in progress (WIP)
2. Move cards only when truly done
3. Review blocked items daily
4. Keep cards updated with latest status

### Team Roles
- **Product Owner**: Prioritizes backlog, defines vision
- **Scrum Master**: Facilitates ceremonies, removes blockers
- **Development Team**: Self-organizing, cross-functional

## Export/Import Data

### Export
1. Click "Export Data" in the header
2. Saves a JSON file with all your data
3. Use for backups or moving between devices

### Import
1. Click "Import Data" in the header
2. Select a previously exported JSON file
3. Confirms before replacing existing data
4. All your sprints, stories, and team data restored

## Customization

The app is built with CSS custom properties for easy theming. Edit `styles.css`:

```css
:root {
    --primary-color: #2563eb;        /* Main brand color */
    --success-color: #10b981;        /* Success/complete */
    --warning-color: #f59e0b;        /* In progress */
    --danger-color: #ef4444;         /* High priority */
    /* ...and more */
}
```

## Contributing

This is an open-source project. Contributions are welcome!

## Resources

Learn more about AGILE:
- [Agile Manifesto](https://agilemanifesto.org/)
- [Scrum Guide](https://scrumguides.org/)
- [Monday.com AGILE Guide](https://monday.com/blog/rnd/agile-project-management/)
- [Atlassian AGILE Resources](https://www.atlassian.com/agile)

## License

This project is open source and available for educational and commercial use.

## Support

For issues, questions, or feature requests, please open an issue in the repository.

---

**Built with AGILE principles in mind - iterative, collaborative, and user-focused.**

*Start managing your projects the AGILE way today!*
