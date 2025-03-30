import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import { Routes, Route } from "react-router-dom";
import ViewTask from "./components/ViewTask";
import Task from "./components/Task";

interface ITask {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // UTILIZANDO UMA API EXTERNA PARA PEGAR AS TAREFAS
  // useEffect(() => {
  //   const fecthTasks = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const data = await response.json();
  //     setTasks(data);
  //   };
  //   fecthTasks();
  // }, []);

  const handleAddTask = (title: string, description: string) => {
    const newTask: ITask = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (
    taskId: number,
    newTitle: string,
    newDescription: string
  ) => {
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
