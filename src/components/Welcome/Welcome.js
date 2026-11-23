import './Welcome.css';
import { useState, useMemo } from 'react';

const normalizeToMidnight = (dateValue) => {
    if (!dateValue) return null;
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return null;
    parsed.setHours(0, 0, 0, 0);
    return parsed;
};

const getTaskDate = (task) => {
    return normalizeToMidnight(task?.endDate ?? task?.dueDate ?? task?.date);
};
const formatShortDate = (dateObj) => {
    if (!dateObj) return '';
    return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
};

const Welcome = ({ taskNumber = 0, tasks = [] }) => {
    const [statsType, setStatsType] = useState('day');

    const { scopedTasks, todayStart, weekRangeLabel } = useMemo(() => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // بداية الأسبوع (الأحد = 0). لو حابة يبدأ من السبت: (startOfToday.getDay() + 1) % 7
        const dayOfWeek = startOfToday.getDay();
        const startOfWeek = new Date(startOfToday);
        startOfWeek.setDate(startOfToday.getDate() - dayOfWeek);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const filtered = tasks.filter((task) => {
            const taskDate = getTaskDate(task);
            if (!taskDate) return false;

            if (statsType === 'day') {
                return taskDate.getTime() === startOfToday.getTime();
            }

            const taskTime = taskDate.getTime();
            return taskTime >= startOfWeek.getTime() && taskTime <= endOfWeek.getTime();
        });
            const weekRangeLabel = `${formatShortDate(startOfWeek)} – ${formatShortDate(endOfWeek)}`;
        return {
            scopedTasks: filtered,
            todayStart: startOfToday,
            weekRangeLabel,
        };
    }, [tasks, statsType]);

    // المهام المتأخرة (غير مكتملة وتاريخها أقدم من اليوم) من إجمالي المهام
    const overdueTasksCount = useMemo(() => {
        return tasks.filter((task) => {
            if (task.completed) return false;
            const taskDate = getTaskDate(task);
            if (!taskDate) return false;
            return taskDate.getTime() < todayStart.getTime();
        }).length;
    }, [tasks, todayStart]);

    
    // إحصائيات الـ Subtasks للمهام في النطاق المختار (Today أو This Week)
    const subtasksStats = useMemo(() => {
        return scopedTasks.reduce(
            (acc, task) => {
                const subs = Array.isArray(task.subtasks)
                    ? task.subtasks
                    : Array.isArray(task.subTasks)
                    ? task.subTasks
                    : [];

                const doneCount = subs.filter((sub) =>
                    Boolean(sub.completed ?? sub.done ?? sub.isCompleted)
                ).length;

                acc.completed += doneCount;
                acc.total += subs.length;
                return acc;
            },
            { completed: 0, total: 0 }
        );
    }, [scopedTasks]);

    const completedTasksCount = scopedTasks.filter((t) => Boolean(t.completed)).length;
    const totalTasksCount = scopedTasks.length;
    const activeTasksCount = totalTasksCount - completedTasksCount;

    const progressData = useMemo(() => {
        let totalUnits = 0;
        let completedUnits = 0;

        scopedTasks.forEach((task) => {
            const subs = Array.isArray(task.subtasks)
                ? task.subtasks
                : Array.isArray(task.subTasks)
                ? task.subTasks
                : [];

            if (subs.length > 0) {
                totalUnits += subs.length;
                if (task.completed) {
                    completedUnits += subs.length;
                } else {
                    completedUnits += subs.filter((sub) =>
                        Boolean(sub.completed ?? sub.done ?? sub.isCompleted)
                    ).length;
                }
            } else {
                totalUnits += 1;
                if (task.completed) {
                    completedUnits += 1;
                }
            }
        });

        const percentage =
            totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

        return { percentage, completedUnits, totalUnits };
    }, [scopedTasks]);




    

    return (
        <div className="stats-section">
            <div className="stats-header">
                <h3>Task Statistics</h3>
                {statsType === 'week' && (
            <span className="week-range-pill">{weekRangeLabel}</span>
        )}
                <div className="stats-toggle">
                    <button
                        type="button"
                        className={`toggle-btn ${statsType === 'day' ? 'active' : ''}`}
                        onClick={() => setStatsType('day')}
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        className={`toggle-btn ${statsType === 'week' ? 'active' : ''}`}
                        onClick={() => setStatsType('week')}
                    >
                        This Week
                    </button>
                </div>
            </div>

            <div className="dashboard-progress">
                <div className="progress-top">
                    <span className="progress-label">
                        {statsType === 'day' ? "Today's Progress" : "This Week's Progress"}
                    </span>
                    <span className="progress-value">
                        {progressData.percentage}% Completed ({progressData.completedUnits}/{progressData.totalUnits})
                    </span>
                </div>
                <div
                    className="progress-track"
                    role="progressbar"
                    aria-valuenow={progressData.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className={`progress-fill ${progressData.percentage === 100 ? 'is-complete' : ''}`}
                        style={{ width: `${progressData.percentage}%` }}
                    />
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-box">
                    <span className="stat-number">{totalTasksCount}</span>
                    <span className="stat-label">
                        Total ({statsType === 'day' ? 'Today' : 'Week'})
                    </span>
                </div>

                <div className="stat-box">
                    <span className="stat-number">{activeTasksCount}</span>
                    <span className="stat-label">Active</span>
                </div>

                <div className="stat-box">
                    <span className="stat-number">{completedTasksCount}</span>
                    <span className="stat-label">Completed</span>
                </div>

                <div className="stat-box">
                    <span className="stat-number">{progressData.percentage}%</span>
                    <span className="stat-label">Success Rate</span>
                </div>

                <div className={`stat-box ${overdueTasksCount > 0 ? 'has-overdue' : ''}`}>
                    <span className="stat-number">{overdueTasksCount}</span>
                    <span className="stat-label">Overdue</span>
                </div>

                <div className="stat-box">
                    <span className="stat-number">
                        {subtasksStats.completed} / {subtasksStats.total}
                    </span>
                    <span className="stat-label">Subtasks Done</span>
                </div>
            </div>
        </div>
    );
};

export default Welcome;