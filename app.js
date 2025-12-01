// AGILE Project Manager - Main Application
class AgileProjectManager {
    constructor() {
        this.stories = [];
        this.sprints = [];
        this.teamMembers = [];
        this.standups = [];
        this.currentEditingStory = null;
        this.currentEditingSprint = null;

        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderBacklog();
        this.renderSprints();
        this.renderKanban();
        this.renderTeam();
        this.renderReports();
    }

    // Data Persistence
    loadData() {
        const data = localStorage.getItem('agileProjectData');
        if (data) {
            const parsed = JSON.parse(data);
            this.stories = parsed.stories || [];
            this.sprints = parsed.sprints || [];
            this.teamMembers = parsed.teamMembers || [];
            this.standups = parsed.standups || [];
        }
    }

    saveData() {
        const data = {
            stories: this.stories,
            sprints: this.sprints,
            teamMembers: this.teamMembers,
            standups: this.standups
        };
        localStorage.setItem('agileProjectData', JSON.stringify(data));
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Story Modal
        document.getElementById('addStoryBtn').addEventListener('click', () => this.openStoryModal());
        document.getElementById('storyForm').addEventListener('submit', (e) => this.saveStory(e));
        document.getElementById('cancelStoryBtn').addEventListener('click', () => this.closeModal('storyModal'));

        // Team Modal
        document.getElementById('addTeamMemberBtn').addEventListener('click', () => this.openTeamModal());
        document.getElementById('teamForm').addEventListener('submit', (e) => this.saveTeamMember(e));
        document.getElementById('cancelTeamBtn').addEventListener('click', () => this.closeModal('teamModal'));

        // Sprint Modal
        document.getElementById('createSprintBtn').addEventListener('click', () => this.openSprintModal());
        document.getElementById('sprintForm').addEventListener('submit', (e) => this.saveSprint(e));
        document.getElementById('cancelSprintBtn').addEventListener('click', () => this.closeModal('sprintModal'));

        // Close modals on X or outside click
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                modal.classList.remove('active');
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Standup
        document.getElementById('addStandupBtn').addEventListener('click', () => this.addStandup());

        // Backlog Filters
        document.getElementById('searchStories').addEventListener('input', () => this.renderBacklog());
        document.getElementById('filterPriority').addEventListener('change', () => this.renderBacklog());
        document.getElementById('filterStatus').addEventListener('change', () => this.renderBacklog());

        // Kanban Filter
        document.getElementById('kanbanSprintFilter').addEventListener('change', () => this.renderKanban());

        // Reports
        document.getElementById('burndownSprintSelect').addEventListener('change', (e) => this.renderBurndownChart(e.target.value));
        document.getElementById('retroSprintSelect').addEventListener('change', (e) => this.showRetrospective(e.target.value));
        document.getElementById('saveRetroBtn').addEventListener('click', () => this.saveRetrospective());

        // Sprint Duration Auto-Calculate
        document.getElementById('sprintDuration').addEventListener('change', (e) => this.calculateSprintDates(e.target.value));

        // Import/Export
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importInput').click());
        document.getElementById('importInput').addEventListener('change', (e) => this.importData(e));
    }

    // Tab Navigation
    switchTab(tabName) {
        document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');

        // Refresh content when switching tabs
        switch(tabName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'backlog':
                this.renderBacklog();
                break;
            case 'sprint':
                this.renderSprints();
                break;
            case 'kanban':
                this.renderKanban();
                break;
            case 'team':
                this.renderTeam();
                break;
            case 'reports':
                this.renderReports();
                break;
        }
    }

    // Modal Management
    openStoryModal(story = null) {
        this.currentEditingStory = story;
        const modal = document.getElementById('storyModal');
        const form = document.getElementById('storyForm');

        // Populate assignee dropdown
        const assigneeSelect = document.getElementById('storyAssignee');
        assigneeSelect.innerHTML = '<option value="">Unassigned</option>';
        this.teamMembers.forEach(member => {
            assigneeSelect.innerHTML += `<option value="${member.id}">${member.name}</option>`;
        });

        if (story) {
            document.getElementById('storyModalTitle').textContent = 'Edit User Story';
            document.getElementById('storyTitle').value = story.title;
            document.getElementById('storyUserType').value = story.userType || '';
            document.getElementById('storyGoal').value = story.goal || '';
            document.getElementById('storyBenefit').value = story.benefit || '';
            document.getElementById('storyDescription').value = story.description || '';
            document.getElementById('storyAcceptance').value = story.acceptance || '';
            document.getElementById('storyPoints').value = story.points;
            document.getElementById('storyPriority').value = story.priority;
            document.getElementById('storyAssignee').value = story.assignee || '';
        } else {
            document.getElementById('storyModalTitle').textContent = 'Add User Story';
            form.reset();
        }

        modal.classList.add('active');
    }

    openTeamModal() {
        const modal = document.getElementById('teamModal');
        document.getElementById('teamForm').reset();
        modal.classList.add('active');
    }

    openSprintModal() {
        const modal = document.getElementById('sprintModal');
        document.getElementById('sprintForm').reset();

        // Set default dates
        const today = new Date();
        const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
        document.getElementById('sprintStart').value = today.toISOString().split('T')[0];
        document.getElementById('sprintEnd').value = twoWeeksLater.toISOString().split('T')[0];

        modal.classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    // User Story Management
    saveStory(e) {
        e.preventDefault();

        const story = {
            id: this.currentEditingStory ? this.currentEditingStory.id : Date.now().toString(),
            title: document.getElementById('storyTitle').value,
            userType: document.getElementById('storyUserType').value,
            goal: document.getElementById('storyGoal').value,
            benefit: document.getElementById('storyBenefit').value,
            description: document.getElementById('storyDescription').value,
            acceptance: document.getElementById('storyAcceptance').value,
            points: parseInt(document.getElementById('storyPoints').value),
            priority: document.getElementById('storyPriority').value,
            assignee: document.getElementById('storyAssignee').value,
            status: this.currentEditingStory ? this.currentEditingStory.status : 'backlog',
            sprintId: this.currentEditingStory ? this.currentEditingStory.sprintId : null,
            createdAt: this.currentEditingStory ? this.currentEditingStory.createdAt : Date.now()
        };

        if (this.currentEditingStory) {
            const index = this.stories.findIndex(s => s.id === this.currentEditingStory.id);
            this.stories[index] = story;
        } else {
            this.stories.push(story);
        }

        this.saveData();
        this.closeModal('storyModal');
        this.renderBacklog();
        this.renderKanban();
        this.renderDashboard();
    }

    deleteStory(storyId) {
        if (confirm('Are you sure you want to delete this story?')) {
            this.stories = this.stories.filter(s => s.id !== storyId);
            this.saveData();
            this.renderBacklog();
            this.renderKanban();
            this.renderDashboard();
        }
    }

    moveStoryToSprint(storyId, sprintId) {
        const story = this.stories.find(s => s.id === storyId);
        if (story) {
            story.sprintId = sprintId;
            story.status = 'ready';
            this.saveData();
            this.renderSprints();
            this.renderBacklog();
        }
    }

    updateStoryStatus(storyId, newStatus) {
        const story = this.stories.find(s => s.id === storyId);
        if (story) {
            story.status = newStatus;
            this.saveData();
            this.renderKanban();
            this.renderDashboard();
        }
    }

    // Sprint Management
    saveSprint(e) {
        e.preventDefault();

        const sprint = {
            id: Date.now().toString(),
            name: document.getElementById('sprintName').value,
            goal: document.getElementById('sprintGoal').value,
            startDate: document.getElementById('sprintStart').value,
            endDate: document.getElementById('sprintEnd').value,
            status: 'planned',
            retrospective: null
        };

        this.sprints.push(sprint);
        this.saveData();
        this.closeModal('sprintModal');
        this.renderSprints();
        this.renderReports();
    }

    startSprint(sprintId) {
        // End any currently active sprint
        this.sprints.forEach(s => {
            if (s.status === 'active') s.status = 'completed';
        });

        const sprint = this.sprints.find(s => s.id === sprintId);
        if (sprint) {
            sprint.status = 'active';
            this.saveData();
            this.renderSprints();
            this.renderDashboard();
        }
    }

    completeSprint(sprintId) {
        const sprint = this.sprints.find(s => s.id === sprintId);
        if (sprint) {
            sprint.status = 'completed';

            // Move incomplete stories back to backlog
            this.stories.forEach(story => {
                if (story.sprintId === sprintId && story.status !== 'done') {
                    story.sprintId = null;
                    story.status = 'backlog';
                }
            });

            this.saveData();
            this.renderSprints();
            this.renderDashboard();
        }
    }

    deleteSprint(sprintId) {
        if (confirm('Are you sure you want to delete this sprint? Stories will be moved back to backlog.')) {
            // Move stories back to backlog
            this.stories.forEach(story => {
                if (story.sprintId === sprintId) {
                    story.sprintId = null;
                    story.status = 'backlog';
                }
            });

            this.sprints = this.sprints.filter(s => s.id !== sprintId);
            this.saveData();
            this.renderSprints();
            this.renderBacklog();
        }
    }

    calculateSprintDates(weeks) {
        const startInput = document.getElementById('sprintStart');
        const endInput = document.getElementById('sprintEnd');

        if (startInput.value) {
            const start = new Date(startInput.value);
            const end = new Date(start.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
            endInput.value = end.toISOString().split('T')[0];
        }
    }

    // Team Management
    saveTeamMember(e) {
        e.preventDefault();

        const member = {
            id: Date.now().toString(),
            name: document.getElementById('memberName').value,
            email: document.getElementById('memberEmail').value,
            role: document.getElementById('memberRole').value,
            capacity: parseInt(document.getElementById('memberCapacity').value)
        };

        this.teamMembers.push(member);
        this.saveData();
        this.closeModal('teamModal');
        this.renderTeam();
        this.renderDashboard();
    }

    deleteTeamMember(memberId) {
        if (confirm('Are you sure you want to remove this team member?')) {
            this.teamMembers = this.teamMembers.filter(m => m.id !== memberId);

            // Unassign stories
            this.stories.forEach(story => {
                if (story.assignee === memberId) {
                    story.assignee = null;
                }
            });

            this.saveData();
            this.renderTeam();
            this.renderBacklog();
        }
    }

    // Daily Standup
    addStandup() {
        const memberId = document.getElementById('standupMember').value;
        const yesterday = document.getElementById('standupYesterday').value;
        const today = document.getElementById('standupToday').value;
        const blockers = document.getElementById('standupBlockers').value;

        if (!memberId || !yesterday || !today) {
            alert('Please fill in all required fields');
            return;
        }

        const member = this.teamMembers.find(m => m.id === memberId);
        const standup = {
            id: Date.now().toString(),
            memberId,
            memberName: member.name,
            yesterday,
            today,
            blockers,
            date: new Date().toISOString()
        };

        this.standups.unshift(standup);

        // Keep only last 50 standups
        if (this.standups.length > 50) {
            this.standups = this.standups.slice(0, 50);
        }

        this.saveData();

        // Clear form
        document.getElementById('standupYesterday').value = '';
        document.getElementById('standupToday').value = '';
        document.getElementById('standupBlockers').value = '';

        this.renderDashboard();
    }

    // Render Functions
    renderDashboard() {
        // Current Sprint Info
        const activeSprint = this.sprints.find(s => s.status === 'active');
        const currentSprintInfo = document.getElementById('currentSprintInfo');

        if (activeSprint) {
            const sprintStories = this.stories.filter(s => s.sprintId === activeSprint.id);
            const totalPoints = sprintStories.reduce((sum, s) => sum + s.points, 0);
            const completedPoints = sprintStories.filter(s => s.status === 'done').reduce((sum, s) => sum + s.points, 0);
            const progress = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

            const daysRemaining = Math.ceil((new Date(activeSprint.endDate) - new Date()) / (1000 * 60 * 60 * 24));

            currentSprintInfo.innerHTML = `
                <h3>${activeSprint.name}</h3>
                <p><strong>Goal:</strong> ${activeSprint.goal}</p>
                <p><strong>Duration:</strong> ${activeSprint.startDate} to ${activeSprint.endDate}</p>
                <p><strong>Days Remaining:</strong> ${daysRemaining}</p>
                <p><strong>Stories:</strong> ${sprintStories.length} (${totalPoints} points)</p>
            `;

            // Update progress
            document.querySelector('.progress-fill').style.width = `${progress}%`;
            document.querySelector('.progress-text').textContent = `${progress}% Complete`;
        } else {
            currentSprintInfo.innerHTML = '<p class="no-data">No active sprint</p>';
            document.querySelector('.progress-fill').style.width = '0%';
            document.querySelector('.progress-text').textContent = '0% Complete';
        }

        // Velocity
        const completedSprints = this.sprints.filter(s => s.status === 'completed');
        let avgVelocity = 0;
        if (completedSprints.length > 0) {
            const velocities = completedSprints.map(sprint => {
                const sprintStories = this.stories.filter(s => s.sprintId === sprint.id && s.status === 'done');
                return sprintStories.reduce((sum, s) => sum + s.points, 0);
            });
            avgVelocity = Math.round(velocities.reduce((a, b) => a + b, 0) / velocities.length);
        }
        document.querySelector('#velocityInfo .metric-value').textContent = avgVelocity;

        // Team Capacity
        document.getElementById('teamMemberCount').textContent = this.teamMembers.length;

        // Standup Updates
        this.renderStandupList();

        // Update standup member dropdown
        const standupMemberSelect = document.getElementById('standupMember');
        standupMemberSelect.innerHTML = '<option value="">Select team member...</option>';
        this.teamMembers.forEach(member => {
            standupMemberSelect.innerHTML += `<option value="${member.id}">${member.name}</option>`;
        });
    }

    renderStandupList() {
        const standupList = document.getElementById('standupList');
        const today = new Date().toDateString();
        const todayStandups = this.standups.filter(s => new Date(s.date).toDateString() === today);

        if (todayStandups.length === 0) {
            standupList.innerHTML = '<p class="no-data">No standup updates today</p>';
            return;
        }

        standupList.innerHTML = todayStandups.map(standup => `
            <div class="standup-item">
                <div class="standup-header">${standup.memberName} - ${new Date(standup.date).toLocaleTimeString()}</div>
                <div class="standup-section"><strong>Yesterday:</strong> ${standup.yesterday}</div>
                <div class="standup-section"><strong>Today:</strong> ${standup.today}</div>
                ${standup.blockers ? `<div class="standup-section"><strong>Blockers:</strong> ${standup.blockers}</div>` : ''}
            </div>
        `).join('');
    }

    renderBacklog() {
        const backlogList = document.getElementById('backlogList');

        // Apply filters
        const searchTerm = document.getElementById('searchStories').value.toLowerCase();
        const priorityFilter = document.getElementById('filterPriority').value;
        const statusFilter = document.getElementById('filterStatus').value;

        let filteredStories = this.stories.filter(story => {
            const matchesSearch = story.title.toLowerCase().includes(searchTerm) ||
                                 (story.description && story.description.toLowerCase().includes(searchTerm));
            const matchesPriority = !priorityFilter || story.priority === priorityFilter;
            const matchesStatus = !statusFilter || story.status === statusFilter;

            return matchesSearch && matchesPriority && matchesStatus;
        });

        // Sort by priority and creation date
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        filteredStories.sort((a, b) => {
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return b.createdAt - a.createdAt;
        });

        if (filteredStories.length === 0) {
            backlogList.innerHTML = '<p class="no-data">No stories found</p>';
            return;
        }

        backlogList.innerHTML = filteredStories.map(story => {
            const assignee = this.teamMembers.find(m => m.id === story.assignee);
            const sprint = this.sprints.find(s => s.id === story.sprintId);

            return `
                <div class="story-card" data-story-id="${story.id}">
                    <div class="story-card-header">
                        <div class="story-title">${story.title}</div>
                        <div class="story-badges">
                            <span class="badge badge-priority-${story.priority}">${story.priority.toUpperCase()}</span>
                            <span class="badge badge-points">${story.points} pts</span>
                            <span class="badge badge-status">${story.status}</span>
                        </div>
                    </div>
                    ${story.userType && story.goal ? `
                        <div class="story-description">
                            As a <strong>${story.userType}</strong>, I want to <strong>${story.goal}</strong>
                            ${story.benefit ? ` so that <strong>${story.benefit}</strong>` : ''}
                        </div>
                    ` : ''}
                    ${story.description ? `<div class="story-description">${story.description}</div>` : ''}
                    <div class="story-meta">
                        ${assignee ? `<span>👤 ${assignee.name}</span>` : '<span>👤 Unassigned</span>'}
                        ${sprint ? `<span>🏃 ${sprint.name}</span>` : ''}
                        <span>📅 Created ${new Date(story.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div class="story-actions">
                        <button class="btn btn-small btn-primary" onclick="app.openStoryModal(app.stories.find(s => s.id === '${story.id}'))">Edit</button>
                        <button class="btn btn-small btn-danger" onclick="app.deleteStory('${story.id}')">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderSprints() {
        const sprintsList = document.getElementById('sprintsList');

        if (this.sprints.length === 0) {
            sprintsList.innerHTML = '<p class="no-data">No sprints created yet</p>';
            return;
        }

        // Sort sprints by date
        const sortedSprints = [...this.sprints].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

        sprintsList.innerHTML = sortedSprints.map(sprint => {
            const sprintStories = this.stories.filter(s => s.sprintId === sprint.id);
            const totalPoints = sprintStories.reduce((sum, s) => sum + s.points, 0);
            const completedPoints = sprintStories.filter(s => s.status === 'done').reduce((sum, s) => sum + s.points, 0);
            const progress = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

            return `
                <div class="sprint-card ${sprint.status === 'active' ? 'active' : ''}">
                    <div class="sprint-card-header">
                        <div class="sprint-info">
                            <h3>${sprint.name} ${sprint.status === 'active' ? '🟢 ACTIVE' : sprint.status === 'completed' ? '✅ COMPLETED' : '📋 PLANNED'}</h3>
                            <div class="sprint-dates">${sprint.startDate} to ${sprint.endDate}</div>
                        </div>
                        <div class="sprint-actions">
                            ${sprint.status === 'planned' ? `
                                <button class="btn btn-small btn-success" onclick="app.startSprint('${sprint.id}')">Start Sprint</button>
                            ` : ''}
                            ${sprint.status === 'active' ? `
                                <button class="btn btn-small btn-primary" onclick="app.completeSprint('${sprint.id}')">Complete Sprint</button>
                            ` : ''}
                            ${sprint.status !== 'active' ? `
                                <button class="btn btn-small btn-danger" onclick="app.deleteSprint('${sprint.id}')">Delete</button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="sprint-goal"><strong>Goal:</strong> ${sprint.goal}</div>
                    <div class="sprint-stats">
                        <div class="sprint-stat">
                            <div class="sprint-stat-value">${sprintStories.length}</div>
                            <div class="sprint-stat-label">Stories</div>
                        </div>
                        <div class="sprint-stat">
                            <div class="sprint-stat-value">${totalPoints}</div>
                            <div class="sprint-stat-label">Total Points</div>
                        </div>
                        <div class="sprint-stat">
                            <div class="sprint-stat-value">${completedPoints}</div>
                            <div class="sprint-stat-label">Completed Points</div>
                        </div>
                        <div class="sprint-stat">
                            <div class="sprint-stat-value">${progress}%</div>
                            <div class="sprint-stat-label">Progress</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderKanban() {
        const filter = document.getElementById('kanbanSprintFilter').value;
        let stories;

        if (filter === 'current') {
            const activeSprint = this.sprints.find(s => s.status === 'active');
            stories = activeSprint ? this.stories.filter(s => s.sprintId === activeSprint.id) : [];
        } else {
            stories = this.stories;
        }

        const columns = {
            'todo': stories.filter(s => s.status === 'ready' || s.status === 'backlog'),
            'in-progress': stories.filter(s => s.status === 'in-progress'),
            'review': stories.filter(s => s.status === 'review'),
            'done': stories.filter(s => s.status === 'done')
        };

        // Update counts
        Object.keys(columns).forEach(status => {
            document.getElementById(`count-${status}`).textContent = columns[status].length;
        });

        // Render cards
        Object.keys(columns).forEach(status => {
            const container = document.getElementById(`kanban-${status}`);

            if (columns[status].length === 0) {
                container.innerHTML = '<p class="no-data">No stories</p>';
                return;
            }

            container.innerHTML = columns[status].map(story => {
                const assignee = this.teamMembers.find(m => m.id === story.assignee);
                return `
                    <div class="kanban-card" draggable="true" data-story-id="${story.id}">
                        <div class="kanban-card-title">${story.title}</div>
                        <div class="kanban-card-meta">
                            <span class="badge badge-points">${story.points} pts</span>
                            <span class="badge badge-priority-${story.priority}">${story.priority}</span>
                        </div>
                        ${assignee ? `<div class="kanban-card-meta">👤 ${assignee.name}</div>` : ''}
                    </div>
                `;
            }).join('');
        });

        // Setup drag and drop
        this.setupKanbanDragDrop();
    }

    setupKanbanDragDrop() {
        const cards = document.querySelectorAll('.kanban-card');
        const columns = document.querySelectorAll('.kanban-cards');

        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', card.innerHTML);
                e.dataTransfer.setData('storyId', card.dataset.storyId);
                card.classList.add('dragging');
            });

            card.addEventListener('dragend', (e) => {
                card.classList.remove('dragging');
            });
        });

        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                column.classList.add('drag-over');
            });

            column.addEventListener('dragleave', (e) => {
                column.classList.remove('drag-over');
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('drag-over');

                const storyId = e.dataTransfer.getData('storyId');
                const newStatus = column.id.replace('kanban-', '');

                // Map kanban columns to story statuses
                const statusMap = {
                    'todo': 'ready',
                    'in-progress': 'in-progress',
                    'review': 'review',
                    'done': 'done'
                };

                this.updateStoryStatus(storyId, statusMap[newStatus]);
            });
        });
    }

    renderTeam() {
        const teamList = document.getElementById('teamList');

        if (this.teamMembers.length === 0) {
            teamList.innerHTML = '<p class="no-data">No team members added yet</p>';
            return;
        }

        teamList.innerHTML = this.teamMembers.map(member => {
            const assignedStories = this.stories.filter(s => s.assignee === member.id);
            const activeStories = assignedStories.filter(s => s.status !== 'done');

            return `
                <div class="team-member-card">
                    <div class="team-member-header">
                        <div class="team-member-info">
                            <h3>${member.name}</h3>
                            <div class="team-member-role">${this.formatRole(member.role)}</div>
                        </div>
                        <button class="btn btn-small btn-danger" onclick="app.deleteTeamMember('${member.id}')">Remove</button>
                    </div>
                    <div class="team-member-details">
                        <div>📧 ${member.email}</div>
                        <div>⏱️ ${member.capacity}h capacity/sprint</div>
                        <div>📊 ${activeStories.length} active stories (${assignedStories.length} total)</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    formatRole(role) {
        const roles = {
            'product-owner': 'Product Owner',
            'scrum-master': 'Scrum Master',
            'developer': 'Developer',
            'designer': 'Designer',
            'qa': 'QA Engineer'
        };
        return roles[role] || role;
    }

    renderReports() {
        // Populate sprint dropdowns
        const burndownSelect = document.getElementById('burndownSprintSelect');
        const retroSelect = document.getElementById('retroSprintSelect');

        const sprintOptions = this.sprints
            .filter(s => s.status !== 'planned')
            .map(s => `<option value="${s.id}">${s.name}</option>`)
            .join('');

        burndownSelect.innerHTML = '<option value="">Select a sprint...</option>' + sprintOptions;
        retroSelect.innerHTML = '<option value="">Select a sprint...</option>' + sprintOptions;

        // Render velocity chart for all completed sprints
        this.renderVelocityChart();
    }

    renderBurndownChart(sprintId) {
        if (!sprintId) return;

        const sprint = this.sprints.find(s => s.id === sprintId);
        if (!sprint) return;

        const sprintStories = this.stories.filter(s => s.sprintId === sprintId);
        const totalPoints = sprintStories.reduce((sum, s) => sum + s.points, 0);

        const canvas = document.getElementById('burndownChart');
        const ctx = canvas.getContext('2d');

        // Calculate sprint duration in days
        const startDate = new Date(sprint.startDate);
        const endDate = new Date(sprint.endDate);
        const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        // Simple burndown chart visualization
        canvas.width = 800;
        canvas.height = 400;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(50, 350);
        ctx.lineTo(750, 350); // X axis
        ctx.moveTo(50, 50);
        ctx.lineTo(50, 350); // Y axis
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw ideal burndown line
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(750, 350);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.fillText('Story Points', 10, 30);
        ctx.fillText('Days', 700, 380);
        ctx.fillText(totalPoints.toString(), 15, 60);
        ctx.fillText('0', 35, 355);
        ctx.fillText(`Day ${duration}`, 720, 355);

        // Add note
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.fillText('Gray dashed line shows ideal burndown', 250, 30);
    }

    renderVelocityChart() {
        const completedSprints = this.sprints.filter(s => s.status === 'completed').slice(-5);

        if (completedSprints.length === 0) return;

        const canvas = document.getElementById('velocityChart');
        const ctx = canvas.getContext('2d');

        canvas.width = 800;
        canvas.height = 400;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const velocities = completedSprints.map(sprint => {
            const sprintStories = this.stories.filter(s => s.sprintId === sprint.id && s.status === 'done');
            return {
                name: sprint.name,
                points: sprintStories.reduce((sum, s) => sum + s.points, 0)
            };
        });

        const maxPoints = Math.max(...velocities.map(v => v.points), 1);
        const barWidth = 600 / velocities.length;
        const heightScale = 300 / maxPoints;

        // Draw bars
        velocities.forEach((v, i) => {
            const x = 100 + i * barWidth;
            const height = v.points * heightScale;
            const y = 350 - height;

            ctx.fillStyle = '#2563eb';
            ctx.fillRect(x, y, barWidth - 20, height);

            // Labels
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.save();
            ctx.translate(x + (barWidth - 20) / 2, 370);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText(v.name, 0, 0);
            ctx.restore();

            // Points on top of bars
            ctx.fillText(v.points.toString(), x + (barWidth - 20) / 2 - 10, y - 5);
        });

        // Y axis
        ctx.beginPath();
        ctx.moveTo(80, 50);
        ctx.lineTo(80, 350);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Title
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.fillText('Velocity (Story Points Completed per Sprint)', 200, 30);
    }

    showRetrospective(sprintId) {
        if (!sprintId) {
            document.getElementById('retroSection').style.display = 'flex';
            document.getElementById('retroDisplay').style.display = 'none';
            return;
        }

        const sprint = this.sprints.find(s => s.id === sprintId);
        if (!sprint) return;

        if (sprint.retrospective) {
            // Show existing retrospective
            document.getElementById('retroSection').style.display = 'none';
            document.getElementById('retroDisplay').style.display = 'block';
            document.getElementById('retroDisplay').innerHTML = `
                <div class="card">
                    <h4>What went well</h4>
                    <p>${sprint.retrospective.wentWell}</p>
                </div>
                <div class="card mt-20">
                    <h4>What could be improved</h4>
                    <p>${sprint.retrospective.improve}</p>
                </div>
                <div class="card mt-20">
                    <h4>Action items</h4>
                    <p>${sprint.retrospective.actions}</p>
                </div>
            `;
        } else {
            // Show form to create retrospective
            document.getElementById('retroSection').style.display = 'flex';
            document.getElementById('retroDisplay').style.display = 'none';
            document.getElementById('retroWentWell').value = '';
            document.getElementById('retroImprove').value = '';
            document.getElementById('retroActions').value = '';
        }
    }

    saveRetrospective() {
        const sprintId = document.getElementById('retroSprintSelect').value;
        if (!sprintId) {
            alert('Please select a sprint');
            return;
        }

        const sprint = this.sprints.find(s => s.id === sprintId);
        if (!sprint) return;

        sprint.retrospective = {
            wentWell: document.getElementById('retroWentWell').value,
            improve: document.getElementById('retroImprove').value,
            actions: document.getElementById('retroActions').value,
            date: new Date().toISOString()
        };

        this.saveData();
        this.showRetrospective(sprintId);
        alert('Retrospective saved successfully!');
    }

    // Import/Export
    exportData() {
        const data = {
            stories: this.stories,
            sprints: this.sprints,
            teamMembers: this.teamMembers,
            standups: this.standups,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `agile-project-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                if (confirm('This will replace all existing data. Continue?')) {
                    this.stories = data.stories || [];
                    this.sprints = data.sprints || [];
                    this.teamMembers = data.teamMembers || [];
                    this.standups = data.standups || [];

                    this.saveData();

                    // Refresh all views
                    this.renderDashboard();
                    this.renderBacklog();
                    this.renderSprints();
                    this.renderKanban();
                    this.renderTeam();
                    this.renderReports();

                    alert('Data imported successfully!');
                }
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AgileProjectManager();
});
