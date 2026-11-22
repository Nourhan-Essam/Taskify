import './CreateTask.css'
import { useState, useEffect } from 'react';

const CreateTask = ({ onSave, editingTasks, addTasks, tasksCount = 0 }) => {
    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    const currentMonth = todayDate.getMonth();
    const currentDay = todayDate.getDate();

    const formattedToday = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
    
    const [task, setTask] = useState("");
    const [subTaskInput, setSubTaskInput] = useState('');
    const [subTasks, setSubTasks] = useState([]);
    const [startDate, setStartDate] = useState(formattedToday);
    const [endDate, setEnddate] = useState(formattedToday);
    const [selectedDate, setSelectedDate] = useState(formattedToday); 
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState(editingTasks ? editingTasks.description : '');
    const [categoryInput, setCategoryInput] = useState('');

    useEffect(() => {
        if(editingTasks){
            setTask(editingTasks.task || "");
            setStartDate(editingTasks.startDate || formattedToday);
            setEnddate(editingTasks.endDate || formattedToday);
            setPriority(editingTasks.priority || "");
            setSelectedDate(editingTasks.date || formattedToday);
            setCategoryInput(editingTasks.category || "");
            setSubTasks(editingTasks.subTasks || []);
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

    const handleAddSubTask = (e) =>{
        e.preventDefault();
        if(!subTaskInput.trim()) return;

        const newSubTaskItem = {
            id: Date.now(),
            text: subTaskInput,
            completed: false
        };
        setSubTasks([...subTasks, newSubTaskItem]);
        setSubTaskInput('');
    };
    
    const handleRemoveSubTask = (id) => {
        setSubTasks(subTasks.filter(sub => sub.id !== id));
    };

    const handleTasks = (e) => {
        e.preventDefault();
        if(!task.trim()) return;
        
        const newTask = {
            task: task,          
            description: description,
            startDate: startDate, 
            endDate: endDate,    
            category: categoryInput.trim(),
            priority: priority,
            date: selectedDate,
            subTasks: subTasks
        };
    
        onSave(newTask);
        setCategoryInput('');
        setSubTasks([]);
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

                {/* add sub tasks section*/}
                <div className="input-group">
                    <label>Sub-Tasks</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                            type="text"
                            placeholder="Add a small step..."
                            value={subTaskInput}
                            onChange={(e) => setSubTaskInput(e.target.value)}
                        />
                        <button 
                            className="subtask-add-btn"
                            type="button" 
                            onClick={handleAddSubTask}
                            style={{ padding: '0 15px', cursor: 'pointer' }}
                        >
                            + Add
                        </button>
                    </div>

                    {/* show added sub tasks*/}
                    {subTasks.length > 0 && (
                        <ul style={{ marginTop: '8px', listStyle: 'none', padding: 0 }}>
                            {subTasks.map((sub) => (
                                <li key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', marginBottom: '4px', borderRadius: '6px', fontSize: '12px' }}>
                                    <span>• {sub.text}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveSubTask(sub.id)}
                                        style={{ background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
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
                
                    <div className="form-group">
  <label>Category</label>
  <input 
    type="text"
    placeholder="e.g. Work, Study, Personal..."
    value={categoryInput}
    onChange={(e) => setCategoryInput(e.target.value)}
    className="custom-category-input"
  />
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