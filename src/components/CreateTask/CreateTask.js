import './CreateTask.css'
import { useState, useEffect } from 'react';

const CreateTask = ({ onSave, editingTasks, addTasks, tasksCount = 0 }) => {
    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    const currentMonth = todayDate.getMonth();
    const currentDay = todayDate.getDate();

    const formattedToday = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
    
    const [task, setTask] = useState("");
    const [startDate, setStartDate] = useState(formattedToday);
    const [endDate, setEnddate] = useState(formattedToday);
    const [selectedDate, setSelectedDate] = useState(formattedToday); 
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState(editingTasks ? editingTasks.description : '');

    useEffect(() => {
        if(editingTasks){
            setTask(editingTasks.task || "");
            setStartDate(editingTasks.startDate || formattedToday);
            setEnddate(editingTasks.endDate || formattedToday);
            setPriority(editingTasks.priority || "");
            setSelectedDate(editingTasks.date || formattedToday);
        }
    }, [editingTasks, formattedToday]);

    const generateDays = () => {
        let daysArray = [];
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 1; i <= totalDays; i++) {
            const d = new Date(currentYear, currentMonth, i);
            
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const formattedDate = `${yyyy}-${mm}-${dd}`;

            daysArray.push({
                dayNumber: i,
                dayName: d.toLocaleDateString('en-US', {weekday: 'short'}),
                fullDate: formattedDate,
            });
        }
        return daysArray;
    };
    
    const daysList = generateDays();
   
    const handleTasks = (e) => {
        e.preventDefault();
        if(!task.trim()) return;
        
        const newTask = {
            task: task,          
            description: description,
            startDate: startDate, 
            endDate: endDate,    
            priority: priority,
            date: selectedDate
        };
    
        onSave(newTask);
    }

    return(
        <>
       <div className="create-task-container">

            <div className="create-task-top-section">
                <div className="tasks-counter-card">
                    <h3>{tasksCount}/10 Tasks</h3>
                    <p>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="days-strip">
                    {daysList.map((item, index) => (
                        <div 
                            key={index} 
                            className={`day-item ${selectedDate === item.fullDate ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedDate(item.fullDate);
                                setStartDate(item.fullDate); 
                            }}
                        >
                            <span>{item.dayNumber}</span>
                            <small>{item.dayName}</small>
                        </div>
                    ))}
                </div>
            </div>
            <div className="create-task-content">
                <div className="input-group">
                    <label>Task Name</label>
                    <input 
                        type="text" 
                        placeholder='Task Title Here' 
                        value={task} 
                        onChange={(e) => setTask(e.target.value)} 
                    />

                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="description here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                
                <div className="time-inputs-row">
                    <div className="input-group">
                        <label>Start Time</label>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <label>End Time</label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEnddate(e.target.value)} 
                        />
                    </div>
                </div>
                
                <div className="input-group">
                    <label>Priority</label>
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="">Select Priority</option>
                        <option value="First">First</option>
                        <option value="Second">Second</option>
                        <option value="Third">Third</option>
                    </select>
                </div>

                <button type="button" onClick={handleTasks} className="create-btn">
                   {editingTasks ? "Update Task" : "Create Task"}
                </button>
            </div>
        </div>
        </>
    )
}

export default CreateTask;