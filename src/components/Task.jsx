import { Check, ChevronRightIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Task({ tasks, handleTask, handleDeleteTask }) {
  const navigate = useNavigate();

  if (tasks.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 text-center">
        <p className="text-slate-400">Nenhuma tarefa encontrada</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <ul className="divide-y divide-slate-700">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 hover:bg-slate-750 transition-colors"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleTask(task.id)}
                className={`flex-1 text-left flex items-center gap-3 ${
                  task.isCompleted ? "text-slate-400" : "text-white"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    task.isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-slate-500"
                  }`}
                >
                  {task.isCompleted && <Check size={14} />}
                </span>
                <span
                  className={`${task.isCompleted ? "line-through italic" : ""}`}
                >
                  {task.title}
                </span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/task/${task.id}`)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <ChevronRightIcon size={18} />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Task;
