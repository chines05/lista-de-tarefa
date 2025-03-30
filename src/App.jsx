// App.jsx
import { useState } from "react";
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import { Routes, Route } from "react-router-dom";
import ViewTask from "./components/ViewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId, newTitle, newDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-700 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-slate-100">
          Gerenciador de Tarefas
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-8">
                <AddTask handleAddTask={handleAddTask} />
                <Task
                  tasks={tasks}
                  handleTask={handleTask}
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
            }
          />
          <Route
            path="/task/:taskId"
            element={
              <ViewTask
                tasks={tasks}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
