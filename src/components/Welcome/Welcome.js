import './Welcome.css'
import { useState } from 'react'

const Welcome = ({onStart, taskNumber = 0}) => {
    const [nameInput, setNameInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(nameInput.trim() !== ""){
            onStart(nameInput);
        }
    };
    return(
       <div className='welcome-screen'>
        <div className="welcome-illustration">
                <img 
                    src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-illustration-download-in-svg-png-gif-file-formats--task-planning-schedule-management-pack-business-illustrations-6430776.png" 
                    alt="Welcome Illustration" 
                />
                </div>
                <div className='welcome-content'>
                    <h1 className='welcome-title'>You Have <span className="highlight-count">{taskNumber} Pending</span> Tasks to Complete</h1>
                    <p className="welcome-subtitle">
                    A workspace to manage your daily tasks smoothly and to complete them ASAP.
                </p>
                <input 
                    type="text" 
                    placeholder="Enter your name..." 
                    value={nameInput} 
                    onChange={(e) => setNameInput(e.target.value)}
                    className="name-input"
                />
                </div>
                <div className="welcome-footer">
                <button className="lets-start-btn" onClick={handleSubmit}>
                    Let's Start
                </button>
            </div>
       </div>
    )
}
export default Welcome;