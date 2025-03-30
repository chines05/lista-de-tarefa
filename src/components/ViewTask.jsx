import {
  ChevronLeftIcon,
  CheckCircle2,
  Clock,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function ViewTask({ tasks, handleEditTask, handleDeleteTask }) {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const task = tasks.find((task) => task.id === Number(taskId));
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title || "");
  const [editedDescription, setEditedDescription] = useState(
    task?.description || ""
  );

  if (!task) {
    return (
      <div className="bg-slate-800 text-white p-6 rounded-lg text-center">
        Tarefa não encontrada
      </div>
    );
  }

  const handleSave = () => {
    handleEditTask(task.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    handleDeleteTask(task.id);
    navigate("/");
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-slate-900 p-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-400 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Save size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-400 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 text-xl font-bold"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 min-h-[150px]"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-white">{task.title}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.isCompleted
                    ? "bg-green-900 text-green-200"
                    : "bg-yellow-900 text-yellow-200"
                }`}
              >
                {task.isCompleted ? "Concluída" : "Pendente"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              {task.isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-400" />
              )}
              <span>
                {task.isCompleted ? "Concluído em " : "Criado em "}
                {new Date(task.id).toLocaleDateString()}
              </span>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-slate-300 mb-2">
                Descrição
              </h2>
              <p className="text-slate-200 whitespace-pre-line">
                {task.description || "Nenhuma descrição fornecida"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewTask;
