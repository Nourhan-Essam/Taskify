import { useState } from 'react'
import './TaskCard.css'
import CreateTask from '../CreateTask/CreateTask'

const TaskCard = ({task, onEdit, onDelete, onToggle}) => {

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
                    <div className="task-dates">
                        <span>📅 {task.startDate || 'No start date'}</span>
                        {task.enddate && <span> → {task.enddate}</span>}
                    </div>
                </div>
            </div>

           
            <div className="task-right-section">
                {task.priority && (
                    <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                        {task.priority}
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