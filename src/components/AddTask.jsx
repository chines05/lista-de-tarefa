import { useState } from "react";
import { Plus } from "lucide-react";

function AddTask({ handleAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    handleAddTask(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Adicionar Nova Tarefa
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Título
            </label>
            <input
              id="title"
              type="text"
              placeholder="Digite o título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Descrição (Opcional)
            </label>
            <textarea
              id="description"
              placeholder="Digite a descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 min-h-[100px]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Adicionar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
