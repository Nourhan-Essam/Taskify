
import './CreateTaskHeader.css'


const CreateTaskHeader = ({ completedTasksCount = 0, totalTasksCount = 0 }) => {
    //default Date
    const today = new Date();
    const dayNumber = today.getDate();
    const monthName = today.toLocaleString('en-US', {month: 'long'});
    const year = today.getFullYear();

    const dateFormate = `${dayNumber} ${monthName}, ${year}`;
    return(
        <div className="create-task-header">
            <div className="header-info">
                <span className="tasks-count">{completedTasksCount}/{totalTasksCount} Tasks</span>
                <span className="task-date">{dateFormate}</span>
            </div>
        </div>
    )
}
export default CreateTaskHeader;