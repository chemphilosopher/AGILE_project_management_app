# AGILE Project Management — Course Outline

A hands-on curriculum for learning AGILE project management. Every concept in this
course is paired with a lab exercise performed in the **AGILE Project Manager**
application in this repository, so learners practice each ceremony and artifact
immediately after learning it.

---

## Course at a Glance

| | |
|---|---|
| **Title** | AGILE Project Management: Theory and Practice |
| **Level** | Beginner to Intermediate — no prior AGILE experience required |
| **Duration** | 24 contact hours (8 modules × 3 hours), plus ~12 hours of lab work |
| **Format** | Instructor-led with hands-on labs; also deliverable as self-paced |
| **Class size** | 6–24 learners, working in teams of 4–6 |
| **Prerequisites** | Basic computer literacy and a modern web browser. No coding required. |
| **Lab environment** | `index.html` from this repository, opened in any modern browser |

### Who this course is for

- New Scrum Masters, Product Owners, and team members joining an agile team
- Traditional/waterfall project managers transitioning to iterative delivery
- Developers, designers, and QA engineers who want to understand the process they work inside
- Students and career changers building a portfolio artifact (a full simulated project)

### Course-level learning outcomes

By the end of the course, a learner can:

1. Explain the four values and twelve principles of the Agile Manifesto, and judge
   whether a given practice supports or undermines them.
2. Write user stories in standard format with testable acceptance criteria.
3. Estimate work in relative story points using the Fibonacci scale and planning poker.
4. Plan, execute, and close a time-boxed sprint against a measured team capacity.
5. Run all four Scrum ceremonies: planning, daily standup, review, and retrospective.
6. Visualize and manage flow on a Kanban board, including WIP limits and bottlenecks.
7. Read a burndown and velocity chart, and use velocity to forecast future sprints.
8. Choose between Scrum, Kanban, and hybrid approaches for a given context.

### Assessment model

| Component | Weight | Description |
|---|---|---|
| Lab completion | 40% | 8 graded labs, one per module (see rubrics per module) |
| Capstone project | 35% | Three full simulated sprints on a team project (Module 8) |
| Knowledge checks | 15% | Short quiz at the end of each module |
| Participation | 10% | Ceremony facilitation, standup contribution, retro engagement |

**Passing threshold:** 70% overall, with lab completion no lower than 60%.

---

## Module 1 — Why AGILE? Foundations and Mindset

**Duration:** 3 hours (2h instruction, 1h lab)

### Learning objectives
- Describe the failure modes of sequential/waterfall delivery that AGILE responds to
- Recite and interpret the four values of the Agile Manifesto
- Map each of the twelve principles to a concrete team behavior
- Distinguish "doing agile" (following ceremonies) from "being agile" (mindset)

### Topics
1. A short history: from the 1990s software crisis to Snowbird, 2001
2. The cost-of-change curve and why late feedback is expensive
3. The four values, read as *preferences*, not prohibitions — "X over Y" still values Y
4. The twelve principles, grouped into four themes:
   - Customer value and early delivery (principles 1–3)
   - Collaboration and people (4–6, 11)
   - Sustainable, technically excellent delivery (7–10)
   - Reflection and adaptation (12)
5. Empirical process control: transparency, inspection, adaptation
6. Common anti-patterns: "water-scrum-fall", velocity as a productivity target,
   standups as status reports to a manager

### Lab 1 — Set up your team
1. Open `index.html` in your browser. Confirm the Dashboard tab loads.
2. Go to the **Team** tab and add 4–6 members, one per learner in your group.
3. Assign realistic roles: exactly one Product Owner, one Scrum Master, and the
   remainder split between Developer, Designer, and QA Engineer.
4. Set each member's capacity in hours per sprint (use 60h for a 2-week sprint at
   80% availability — discuss why 100% is never the right number).
5. Click **Export Data** in the header and save the JSON. This is your team baseline.

**Deliverable:** exported JSON containing a complete team roster.
**Rubric:** all roles filled (40%), capacities justified in writing (40%), export produced (20%).

### Knowledge check
- Give an example of a decision where "responding to change" and "following a plan"
  genuinely conflict, and explain how you would resolve it.
- Why does the Manifesto say "working software" rather than "completed tasks"?

### Reading
- [The Agile Manifesto](https://agilemanifesto.org/) and its [twelve principles](https://agilemanifesto.org/principles.html)
- Repository `README.md`, sections *About AGILE Methodology* and *Getting Started*

---

## Module 2 — The Product Backlog and User Stories

**Duration:** 3 hours (1.5h instruction, 1.5h lab)

### Learning objectives
- Write user stories in the "As a… I want… so that…" format
- Write acceptance criteria that are objectively testable
- Apply the INVEST heuristic to evaluate story quality
- Split an oversized story (an epic) into independently valuable slices

### Topics
1. The backlog as a living, ordered list — not a requirements document
2. Story anatomy: title, role, goal, benefit, description, acceptance criteria
3. **INVEST**: Independent, Negotiable, Valuable, Estimable, Small, Testable
4. Acceptance criteria styles: checklist and Given/When/Then
5. The Definition of Done vs. per-story acceptance criteria — one is global, one is local
6. Story splitting patterns: by workflow step, by business rule, by data variation,
   by happy path vs. edge case, by platform
7. Prioritization: value vs. effort, MoSCoW, and why the PO owns the order

### Lab 2 — Build a product backlog
Working from the provided project brief (an online bookstore, appendix A):
1. In the **Product Backlog** tab, create at least 12 user stories.
2. Each story must have: proper "As a / I want / so that" phrasing, a description,
   and at least two acceptance criteria.
3. Set priority (High / Medium / Low) on every story; no more than a third may be High.
4. Deliberately write one oversized epic, then split it into three smaller stories
   and delete the original. Document the splitting pattern you used.
5. Use the search/filter box to verify you can find stories by keyword.

**Deliverable:** a backlog of 12+ stories, plus a one-paragraph note on your split.
**Rubric:** format correctness (30%), testable criteria (30%), priority discipline (20%),
split quality (20%).

### Knowledge check
- Rewrite this as a user story: "Add a password reset button."
- Which INVEST letter does the story "Refactor the database layer" most clearly violate?

---

## Module 3 — Estimation and Story Points

**Duration:** 3 hours (1.5h instruction, 1.5h lab)

### Learning objectives
- Explain why relative estimation outperforms absolute time estimation
- Run a planning poker session and resolve estimate disagreements productively
- Apply the Fibonacci scale consistently across a backlog
- Identify stories too large to estimate and route them back for splitting

### Topics
1. Why humans are bad at absolute estimates and comparatively good at relative ones
2. Story points as a blend of effort, complexity, and uncertainty — not hours
3. The Fibonacci scale (1, 2, 3, 5, 8, 13, 21) and why the gaps widen
4. Reference stories: anchoring the scale with a known "3"
5. Planning poker mechanics: simultaneous reveal, discussion of outliers, re-vote
6. Estimation anti-patterns: manager anchoring, converting points to hours,
   comparing velocity between teams
7. When 13 means "split it" and 21 means "we don't understand it yet"

### Lab 3 — Estimate the backlog
1. As a team, pick one medium story from Lab 2 and declare it your reference **3**.
2. Run planning poker on every remaining story. Reveal simultaneously; whenever the
   high and low estimates differ by more than one step, both voters explain, then re-vote.
3. Record the agreed points on each story in the **Product Backlog** tab.
4. Any story estimated 13 or 21 must be split and re-estimated before you finish.
5. Record the total backlog points — you will forecast against this in Module 6.

**Deliverable:** fully estimated backlog with no story above 8 points.
**Rubric:** consistency against the reference story (40%), all stories estimated (30%),
large stories split (30%).

### Knowledge check
- Team A averages 40 points per sprint; Team B averages 15. Which team is more
  productive? Defend your answer.
- Why does the scale skip 4, 6, and 7?

### Reference: estimation guidelines used in this app

| Points | Meaning |
|---|---|
| 1 | Trivial, under an hour |
| 2 | Simple, a few hours |
| 3 | Moderate, half a day |
| 5 | Complex, about a day |
| 8 | Very complex, two to three days |
| 13 | Consider breaking down |
| 21 | Too large — must be broken down |

---

## Module 4 — Sprint Planning and Time-boxing

**Duration:** 3 hours (1.5h instruction, 1.5h lab)

### Learning objectives
- Explain the purpose of a fixed-length iteration and why the length must not flex
- Compute team capacity and convert it into a realistic sprint commitment
- Write a sprint goal that gives the team decision-making authority
- Facilitate a sprint planning meeting with clear inputs and outputs

### Topics
1. The time-box: fixed duration, fixed team, variable scope — and never the reverse
2. Choosing a sprint length (1–4 weeks) and the trade-offs of each
3. Capacity planning: availability, holidays, support duty, the 10–20% buffer
4. The sprint goal as a single coherent objective, not a list of tickets
5. Sprint planning in two parts: *what* (PO-led selection) and *how* (team-led breakdown)
6. The sprint commitment as a forecast, not a promise
7. Handling mid-sprint scope change: the goal is protected, the backlog is not

### Lab 4 — Plan and start Sprint 1
1. In the **Sprint Board** tab, create a sprint: name it, set a 2-week duration, and
   write a sprint goal that describes an outcome, not a task list.
2. Compute your team's capacity from the member records you created in Lab 1.
3. Pull stories from the backlog into the sprint, highest priority first, until the
   committed points match your capacity forecast. First sprint with no history:
   commit conservatively and write down why you chose that number.
4. Click **Start Sprint**.
5. Verify the Dashboard now shows the current sprint, its progress, and days remaining.

**Deliverable:** an active sprint with a written goal and a documented capacity calculation.
**Rubric:** goal quality (35%), capacity reasoning (35%), commitment matches capacity (30%).

### Knowledge check
- Mid-sprint, the PO asks to add an urgent story. What are the team's legitimate options?
- Why is extending a sprint by three days to "finish everything" harmful?

---

## Module 5 — Sprint Execution, Kanban, and Daily Standups

**Duration:** 3 hours (1h instruction, 2h lab — this module simulates a full sprint)

### Learning objectives
- Move work across a visual board and keep the board a truthful reflection of reality
- Apply WIP limits and explain how they improve throughput
- Identify a bottleneck from board state alone
- Run a 15-minute daily standup focused on the sprint goal, not on individuals

### Topics
1. Visualizing flow: To Do → In Progress → Review → Done
2. Work in progress limits and Little's Law — why starting less finishes more
3. Pull vs. push: work is taken when capacity frees, not assigned in advance
4. Reading the board: a column that grows is a bottleneck; a stalled card is a blocker
5. The daily standup: three questions, 15 minutes, standing, team-facing
6. Standup anti-patterns: reporting to the Scrum Master, solving problems in the
   meeting, skipping the blockers question
7. The Scrum Master's real job: removing impediments, not tracking status
8. Scrum vs. Kanban: iteration-based commitment vs. continuous flow

### Lab 5 — Simulate a sprint (accelerated)
Each "day" is compressed into roughly 10 minutes of class time; run 10 simulated days.

1. Agree a WIP limit for the In Progress column (suggested: 1 per developer). The app
   does not enforce this — the team enforces it, which is the point.
2. On each simulated day:
   - Every member records a standup on the **Dashboard** tab: yesterday, today, blockers.
   - Move cards on the **Kanban** tab by dragging between columns. Respect the WIP limit.
   - The instructor injects one disruption per few days from the event deck (appendix B):
     a sick team member, a production incident, an ambiguous requirement, a failed review.
3. When a card is blocked, say so explicitly in the standup and leave the card in place.
   Do not move it forward to look productive.
4. At the end of each simulated day, note the count in each column.

**Deliverable:** 10 days of standup records, a completed board, and a per-day column count log.
**Rubric:** standup completeness (30%), WIP discipline (30%), board truthfulness (20%),
blocker handling (20%).

### Knowledge check
- Your Review column holds six cards while In Progress holds one. What is happening,
  and what should the team do tomorrow?
- Why is "I'm still working on the same thing" three days running a signal, not a failure?

---

## Module 6 — Metrics: Burndown, Velocity, and Forecasting

**Duration:** 3 hours (1.5h instruction, 1.5h lab)

### Learning objectives
- Read a burndown chart and diagnose the four classic shapes
- Compute velocity and use a rolling average to forecast a release date
- Explain why velocity is a planning input and never a performance target
- Choose the right metric for the question being asked

### Topics
1. The burndown chart: ideal line vs. actual, and what the gap means
2. Four burndown shapes and their diagnoses:
   - Flat then cliff — work not being decomposed or updated until the end
   - Above the line throughout — over-commitment
   - Below the line early — under-commitment, or points inflation
   - Steady tracking — healthy
3. Velocity: points completed per sprint, and why partial credit is not given
4. Rolling three-sprint average and the range forecast (optimistic/likely/pessimistic)
5. Forecasting a release: remaining backlog points ÷ velocity = sprints remaining
6. Goodhart's Law: "when a measure becomes a target, it ceases to be a good measure"
7. Flow metrics as an alternative lens: cycle time, throughput, WIP age

### Lab 6 — Close the sprint and read the charts
1. In the **Sprint Board** tab, click **Complete Sprint**. Stories not finished return
   to the backlog — note how many points were lost, and do not award partial credit.
2. Go to the **Reports** tab, select your sprint, and study the **burndown chart**.
   Write a diagnosis: which of the four shapes is it, and what caused it?
3. Study the **velocity chart**. With only one sprint, note what you cannot yet conclude.
4. Using your total backlog points from Lab 3 and your Sprint 1 velocity, produce a
   naive release forecast. Then list three reasons that forecast is likely wrong.

**Deliverable:** a one-page sprint metrics report with burndown diagnosis and forecast.
**Rubric:** correct chart reading (40%), causal reasoning (30%), forecast caveats (30%).

### Knowledge check
- A manager offers a bonus for beating last sprint's velocity. Predict what happens to
  the estimates over the next three sprints.
- Why does an unfinished 8-point story score zero rather than 6?

---

## Module 7 — Review, Retrospective, and Continuous Improvement

**Duration:** 3 hours (1.5h instruction, 1.5h lab)

### Learning objectives
- Distinguish the sprint review (product inspection) from the retrospective (process inspection)
- Facilitate a retrospective that produces owned, specific action items
- Create the psychological safety that makes honest retrospectives possible
- Track action items across sprints so improvement compounds

### Topics
1. Sprint review: demo working software to stakeholders, gather feedback, adapt the backlog
2. Retrospective structure: set the stage, gather data, generate insight, decide what to
   do, close
3. Formats: Start/Stop/Continue, Mad/Sad/Glad, 4Ls, sailboat, timeline
4. The Prime Directive and why blame destroys the data you need
5. Turning complaints into action items: specific, owned, and small enough to finish
   inside the next sprint
6. Following through: revisiting last sprint's action items *first*, every time
7. When retrospectives go stale — rotating facilitators and changing format

### Lab 7 — Run a retrospective
1. In the **Reports** tab, select your completed sprint and open the retrospective section.
2. As a team, fill in all three fields:
   - **What went well** — at least three specific items
   - **What could be improved** — at least three, phrased about the system, not people
   - **Action items** — exactly two or three, each with a named owner and a due sprint
3. Save the retrospective.
4. Peer review: exchange retrospectives with another team and grade their action items
   against the "specific, owned, achievable next sprint" test. Return written feedback.

**Deliverable:** a saved retrospective plus written peer feedback on another team's.
**Rubric:** specificity (30%), blameless framing (25%), action item quality (25%),
peer review quality (20%).

### Knowledge check
- Convert "communication was bad this sprint" into a usable action item.
- Why review last sprint's action items at the *start* of the next retrospective?

---

## Module 8 — Scaling, Tailoring, and Capstone

**Duration:** 3 hours instruction + capstone project (approximately 6 hours across two sprints)

### Learning objectives
- Compare Scrum, Kanban, and Scrumban and select one for a given context
- Describe how agile practice changes across multiple coordinating teams
- Recognize where agile practice is a poor fit and say so
- Deliver a complete, evidenced multi-sprint project

### Topics
1. Scrum vs. Kanban vs. Scrumban: commitment cadence, roles, and change policy
2. A brief tour of scaling frameworks (SAFe, LeSS, Scrum@Scale) and their trade-offs;
   the general warning that scaling frameworks add the ceremony agile removed
3. Coordinating dependencies: scrum of scrums, shared Definition of Done
4. Distributed and asynchronous teams: what breaks and what compensates
5. Where agile fits poorly: fixed-scope regulated contracts, hardware lead times,
   true one-shot deliverables
6. Sustaining change: agile adoption as a change-management problem, not a tool rollout

### Capstone project
Run **two more full sprints** (Sprints 2 and 3) on your team project, applying
everything from Modules 1–7 without instructor prompting.

Requirements:
- Each sprint has a written goal, a capacity-based commitment, daily standups for every
  simulated day, and a completed board.
- Velocity from prior sprints must visibly inform the next sprint's commitment.
- Each sprint closes with a burndown diagnosis and a retrospective.
- Retrospective action items from Sprint 2 must be revisited in Sprint 3, with evidence
  of whether they worked.
- Export the final JSON as your submission artifact.

### Capstone deliverables
1. Exported project JSON (complete data for all three sprints)
2. A 4–6 page project report containing:
   - Product vision and prioritized backlog rationale
   - Per-sprint: goal, commitment, actual, velocity, burndown diagnosis
   - Retrospective summary and the measured effect of each action item
   - A methodology recommendation: would you run this project as Scrum, Kanban, or a
     hybrid, and why?
3. A 10-minute team presentation with a live demo of the board and reports

### Capstone rubric

| Criterion | Weight |
|---|---|
| Backlog and estimation quality | 20% |
| Sprint execution discipline (standups, board truthfulness, WIP) | 20% |
| Correct use of metrics for forecasting | 20% |
| Retrospective depth and demonstrated follow-through | 20% |
| Report and presentation clarity | 20% |

---

## Schedule Variants

### A. Eight-week evening course (recommended)
One 3-hour module per week, capstone sprints run between weeks 6–8 as homework.

### B. Three-day intensive
| Day | Content |
|---|---|
| 1 | Modules 1–3 (mindset, backlog, estimation) |
| 2 | Modules 4–6 (planning, execution simulation, metrics) |
| 3 | Modules 7–8 (retrospective, scaling) + single-sprint capstone |

Trade-off: the compressed capstone runs one sprint instead of three, so learners do not
experience velocity stabilizing or action items compounding. Call this out explicitly.

### C. One-day executive overview
Modules 1, 4, 6, and 7 at a summary level, with Labs 1 and 4 only. Aimed at sponsors and
managers who need to *support* agile teams rather than work in one. Emphasize Module 6's
Goodhart's Law section — misused metrics are the most common way leadership damages a
healthy team.

### D. Self-paced
All eight modules with labs completed solo, simulating a five-person team single-handedly.
Planning poker and the retrospective peer review are replaced with written reflection.
Estimated 30 hours total.

---

## Instructor Notes

### Environment setup
Confirm before the first session that every learner can open `index.html` and see the
Dashboard. See `LAUNCH.md` for platform-specific launch commands and `GUI_DESCRIPTION.md`
for a walkthrough of the interface. No installation, network access, or account is
required — the app is a single static page with browser `localStorage` persistence.

### Data management across sessions
Data lives in browser `localStorage`, which is per-browser and per-machine. Learners who
switch machines will find their project gone. Make **Export Data** at the end of every
session a mandatory step, and **Import Data** at the start of the next one. Have the
instructor keep a copy of each team's export as a recovery point.

### Facilitation guidance
- Rotate the Scrum Master role between modules so every learner facilitates at least once.
- Resist correcting a team mid-sprint. Over-commitment in Sprint 1 is the most valuable
  lesson in the course, and it only lands if they feel it in the burndown.
- The disruption event deck (appendix B) matters more than it looks — a sprint with no
  surprises teaches nothing about responding to change.
- Watch for teams moving cards to Done to look productive. Name it in the retrospective
  rather than in the moment.

### Common learner difficulties
| Difficulty | Response |
|---|---|
| Converting story points back into hours | Return to the reference story; ask which is bigger, not how long |
| Writing acceptance criteria as tasks | Ask "how would a tester prove this?" |
| Standups becoming status reports | Have the team face each other, not the facilitator |
| Retrospectives naming individuals | Restate the complaint as a property of the system |
| Treating the sprint commitment as a contract | Revisit Module 4: forecast, not promise |

---

## Appendix A — Capstone Project Brief

**Project: an online bookstore.**

The client sells books online. They currently take orders by phone and email, and want a
web storefront. Known stakeholders: customers browsing and buying, the warehouse team
fulfilling orders, and a marketing lead who wants promotions and recommendations. The
client mentions, in no particular order: search, a shopping cart, guest checkout, customer
reviews, wish lists, stock levels, discount codes, order tracking, and "something with
recommendations, like the big sites have."

The brief is deliberately unordered and incomplete. Part of the exercise is for the Product
Owner to impose priority and ask clarifying questions rather than build everything.

Alternative briefs, if a group prefers a different domain: a clinic appointment scheduler,
a community food-bank inventory system, or a conference organizer's session planner.

---

## Appendix B — Disruption Event Deck

Draw one card every two or three simulated days during Lab 5 and the capstone sprints.

1. A team member is out sick for the next three days. Recompute capacity.
2. Production incident — one developer loses a full day to firefighting.
3. The PO discovers a story's acceptance criteria are ambiguous. It goes back to To Do.
4. A story fails review and returns to In Progress.
5. A dependency on another team is late; one story is blocked until the sprint's last day.
6. A stakeholder requests an urgent new story mid-sprint. The team must decide.
7. A story turns out to be twice its estimate. Nothing may be re-estimated mid-sprint.
8. Good news: a story was simpler than expected and finishes in half the time. Now what
   does the team pull?

---

## Appendix C — Course-to-App Feature Map

| Module | App tab | Features exercised |
|---|---|---|
| 1 | Team | Add members, roles, capacity; Export Data |
| 2 | Product Backlog | Create stories, acceptance criteria, priority, search/filter |
| 3 | Product Backlog | Story point assignment (Fibonacci) |
| 4 | Sprint Board | Create sprint, sprint goal, move stories to sprint, Start Sprint |
| 5 | Kanban, Dashboard | Drag-and-drop workflow, standup entry, sprint progress |
| 6 | Sprint Board, Reports | Complete Sprint, burndown chart, velocity chart |
| 7 | Reports | Retrospective capture and history |
| 8 | All | Full multi-sprint cycle; Export Data for submission |

---

## Appendix D — Glossary

**Acceptance criteria** — Testable conditions that determine whether a story is complete.
**Backlog** — The ordered list of everything that might be built.
**Burndown chart** — Work remaining plotted against time in a sprint.
**Capacity** — The hours a team realistically has available in a sprint.
**Definition of Done** — Team-wide quality bar every story must meet.
**Epic** — A story too large to fit in one sprint; must be split.
**Impediment** — Anything blocking the team that the Scrum Master should remove.
**Increment** — The working product produced by a sprint.
**Kanban** — A flow-based method built on visualizing work and limiting WIP.
**Planning poker** — Simultaneous-reveal relative estimation technique.
**Product Owner** — Owns the backlog order and the definition of value.
**Retrospective** — Team inspection of its own process at sprint end.
**Scrum Master** — Facilitates the process and removes impediments.
**Sprint** — A fixed-length iteration producing a potentially releasable increment.
**Sprint goal** — The single objective giving a sprint coherence.
**Story point** — A relative unit of effort, complexity, and uncertainty.
**Time-box** — A fixed duration that does not extend.
**Velocity** — Story points completed per sprint, used for forecasting.
**WIP limit** — A cap on concurrent items in a workflow state.
**User story** — A unit of value phrased from the user's perspective.

---

## Appendix E — Further Reading

- [The Agile Manifesto](https://agilemanifesto.org/) — the four values and twelve principles
- [The Scrum Guide](https://scrumguides.org/) — the authoritative definition of Scrum
- [Atlassian Agile Coach](https://www.atlassian.com/agile) — practical guides per ceremony
- [Monday.com AGILE Guide](https://monday.com/blog/rnd/agile-project-management/)
- Repository docs: `README.md` (features and best practices), `LAUNCH.md` (running the app),
  `GUI_DESCRIPTION.md` (interface walkthrough)
