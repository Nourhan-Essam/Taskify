import './HomeHeader.css'


const HomeHeader = ({username, taskNumber})=>{
   

    return(
      <div className="taskify-custom-header">
            <div className="taskify-header-text">
                <h2>Hi, {username}</h2>
                <p>{taskNumber} {taskNumber === 1 ? 'task' : 'tasks'} for you today</p>
            </div>

            <div className="taskify-header-img">
                <img 
                    src="/Images/home.png" 
                    alt="Task Illustration" 
                />
            </div>
        </div>
    )
}
export default HomeHeader;