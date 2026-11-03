import {BottomNav, CreateTask, Home, Welcome } from './components';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState(()  => {
    const savedTasks = localStorage.getItem('taskify-tasks');
    return  savedTasks ? JSON.parse(savedTasks) : []; 
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('taskify-username') || "";
  });
  const [editingTasks, setEditingTasks] = useState(null)
  const [currentPage, setCurrentPage] = useState('welcome');

  useEffect(() => {
    localStorage.setItem('taskify-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taskify-username', username);
  },[username]);

  //updating tasks
const handleSaveTask = (taskData) => {
        if(editingTasks){
          setTasks((prev) => prev.map((t) => (t.id === editingTasks.id ? {...taskData, id: t.id, completed: t.completed} : t)));
          setEditingTasks(null);
        }
        else{
          setTasks((prev) => [...prev, {...taskData, id: Date.now(), completed: false}]);
        }
        setCurrentPage('home');
}

//deleting tasks
const handleDeleteTasks = (id) => {
setTasks((prev) => prev.filter((t) => t.id !== id));
};

const handleEditTask = (task) => {
        setEditingTasks(task);
        setCurrentPage('create');
    };

    const handleToggleComplete = (id) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };

  
  const addTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      ...newTaskData,
      completed: false
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setCurrentPage("home");
  };
  return (
    <>
  <div className="app-container">
      {/* changing screens*/}
      {currentPage === "welcome" && (
        <Welcome 
        taskNumber={tasks.length} 
        onStart={(name) => {
            if (name) setUsername(name); 
            setCurrentPage("home");}}/>
      )}
      {currentPage === "home" && (
        <Home 
        username={username}
        tasks={tasks}
        onDelete={handleDeleteTasks}
        onEdit={handleEditTask}
        onToggle={handleToggleComplete}
        goToCreate={()=>{setEditingTasks(null); setCurrentPage('create');}} />
      )} 
        {currentPage === "create" && (
          <CreateTask 
           tasksCount={tasks.length}
           onSave={handleSaveTask}
           editingTasks={editingTasks}/>

        )}
      

     
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
    </>
  );
}

export default App;
