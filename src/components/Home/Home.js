import TaskCard from "../TaskCard/TaskCard";
import HomeHeader from "./HomeHeader/HomeHeader";
import './Home.css'

const Home = ({ username,tasks, onEdit, onDelete, onToggle, goToCreate}) => {
    return(
       <>
            <HomeHeader username={username} taskNumber={tasks.length} />
            <div className="tasks-section">
                <h3 className="section-title">Today's Tasks</h3>
                
                <div className="tasks-list">
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks for today yet!</p>
                        </div>
                    ) : (
                        tasks.map((item) => (
                            <TaskCard 
                                key={item.id}
                                task={item}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggle={onToggle}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;