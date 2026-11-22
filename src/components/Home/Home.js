import TaskCard from "../TaskCard/TaskCard";
import HomeHeader from "./HomeHeader/HomeHeader";
import './Home.css'

const Home = ({ username,tasks, onEdit, onDelete, onToggle, filter, setFilter, onToggleSubTask, handleClearCompleted}) => {
    return(
       <>
            <HomeHeader username={username} taskNumber={tasks.length} />
            <div className="tasks-section">
               {/* شريط التحكم المجمع (العنوان + الفلتر + زرار الحذف) */}
              <div className="tasks-top-bar">
                    <div className="title-and-filters">
                        <h3 className="section-title">Today's Tasks</h3>
                        
                        {/* زراير الفلترة جنب العنوان في نفس السطر */}
                        <div className="filter-buttons-container">
                            <button 
                                className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                                onClick={() => setFilter('All')}
                            >
                                All
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'Active' ? 'active' : ''}`}
                                onClick={() => setFilter('Active')}
                            >
                                In Progress
                            </button>
                            <button 
                                className={`filter-btn ${filter === 'Completed' ? 'active' : ''}`}
                                onClick={() => setFilter('Completed')}
                            >
                                Completed
                            </button>
                        </div>
                    </div>

                    {/* زرار مسح المكتمل في أقصى اليمين */}
                    <button onClick={handleClearCompleted} className="clear-completed-btn">
                        🧹 Clear Completed
                    </button>
                </div>

                <div className="tasks-list">
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks for today yet, time to relax! ☕</p>
                        </div>
                    ) : (
                        tasks.map((item) => (
                            <TaskCard 
                                key={item.id}
                                task={item}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggle={onToggle}
                                onToggleSubTask={onToggleSubTask}
                            />
                        ))
                    )}
                </div>


            </div>
        </>
    )
}
export default Home;