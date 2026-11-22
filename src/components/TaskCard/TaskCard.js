import './TaskCard.css'
import { useState } from 'react';

const TaskCard = ({task, onEdit, onDelete, onToggle, onToggleSubTask}) => {
    const [showSubtasks, setShowSubtasks] = useState(false);
    if (!task) return null;
   const getCategoryClass = (cat) => {
  if (!cat) return 'default';
  const lower = cat.toLowerCase();
  if (lower.includes('work') || lower.includes('dev') || lower.includes('work')) return 'work';
  if (lower.includes('personal') || lower.includes('care') || lower.includes('personal')) return 'personal';
  if (lower.includes('learn') || lower.includes('study') || lower.includes('learning')) return 'learning';
  return 'default';

};


// تأكدي إن السطور دي جوه TaskCard بالشكل ده:
const subTasksList = task.subTasks || [];
const totalSubTasks = subTasksList.length;
const completedSubTasks = subTasksList.filter(sub => sub.completed).length;
const progressPercentage = totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0;

return(
  
  <div className={`task-card ${task.completed ? 'completed' : ''}`}>
           
            <div className="task-left-section">
                <input 
                    type="checkbox" 
                    checked={task.completed || false} 
                    onChange={() => onToggle(task.id)}
                    className="task-checkbox"
                />
                <div className="task-info">
                    <h4 className="task-title">{task.task}</h4>
                    {task.description && (
                        <p className="task-desc">{task.description}</p>
                    )}
                    
{/* زرار الـ Toggle والـ Progress Bar الصغير */}
                   {/* قسم الـ Sub-tasks والتوجل */}
                    {totalSubTasks > 0 && (
                        <div className="subtasks-wrapper">
                            <div 
                                className="subtasks-toggle-header"
                                onClick={() => setShowSubtasks(!showSubtasks)}
                            >
                                <span>Sub-tasks ({completedSubTasks}/{totalSubTasks})</span>
                                <span className="toggle-arrow">{showSubtasks ? '▲ Hide' : '▼ Show'}</span>
                            </div>

                            {/* شريط التقدم */}
                            <div className="subtasks-progress-bar-bg">
                                <div 
                                    className="subtasks-progress-bar-fill"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* قائمة الـ Sub-tasks */}
                    {totalSubTasks > 0 && showSubtasks && (
                        <div className="subtasks-dropdown-list">
                            {subTasksList.map((sub) => (
                                <label key={sub.id} className={`subtask-item ${sub.completed ? 'completed' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={sub.completed || false}
                                        onChange={() => onToggleSubTask(task.id, sub.id)}
                                        className="subtask-checkbox"
                                    />
                                    <span>{sub.text}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    <div className="task-dates">
                        <span>📅 {task.startDate || 'No start date'}</span>
                        {(task.endDate || task.enddate) && (
                            <span> → {task.endDate || task.enddate}</span>
                        )}
                    </div>
                </div>
            </div>

           
            <div className="task-right-section">
                {task.priority && (
                    <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                        {task.priority}
                    </span>
                )}
               {task.category && (
  <span className={`task-category-tag ${getCategoryClass(task.category)}`}>
    {task.category}
  </span>
)}
                <div className="task-actions">
                    <button 
                        onClick={() => onEdit(task)} 
                        className="icon-btn edit-btn" 
                        title="update"
                    >
                        ✏️
                    </button>
                    <button 
                        onClick={() => onDelete(task.id)} 
                        className="icon-btn delete-btn" 
                        title="delete"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
        
)
}
export default TaskCard;