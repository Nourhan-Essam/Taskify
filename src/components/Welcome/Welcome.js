import './Welcome.css'
import { useState } from 'react'

const Welcome = ({taskNumber = 0, tasks = []}) => {
    const [statsType, setStatsType] = useState('day');

   
const now = new Date();
now.setHours(0,0,0,0);
const overdueTasksCount = tasks.filter((task) => {
    if(task.completed || !task.endDate) return false;

    const taskDate = new Date(task.endDate);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate < now;
}).length;


const subtasksStats = tasks.reduce(
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
    const completedTasksCount = tasks.filter(t => t.completed).length;
    const totalTasksCount = tasks.length;
    const completionRate = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
    const activeTasksCount = totalTasksCount - completedTasksCount;
    return(
            <div className='stats-section'>
                <div className='stats-header'>
                    <h3>Task Statistics</h3>
                    <div className="stats-toggle">
                            <button 
                                className={`toggle-btn ${statsType === 'day' ? 'active' : ''}`}
                                onClick={() => setStatsType('day')}
                            >
                                Today
                            </button>
                            <button 
                                className={`toggle-btn ${statsType === 'week' ? 'active' : ''}`}
                                onClick={() => setStatsType('week')}
                            >
                                This Week
                            </button>
                        </div>
                    </div>

                    
                    <div className="stats-grid">
                        <div className="stat-box">
                            <span className="stat-number">{totalTasksCount}</span>
                            <span className="stat-label">Total ({statsType === 'day' ? 'Today' : 'Week'})</span>
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
                            <span className="stat-number">{completionRate}%</span>
                            <span className="stat-label">Success Rate</span>
                        </div>

                        <div className="stat-box">
                            <span className="stat-number">{overdueTasksCount}</span>
                            <span className="stat-label">Overdue</span>
                        </div>


                        <div className='stat-box'>
                            <span className='stat-number'>
                                {subtasksStats.completed} / {subtasksStats.total}
                            </span>
                            <span className="stat-label">Subtasks Done</span>
                        </div>
                    </div>
                </div>
            // </div>
    
    );
}
export default Welcome;