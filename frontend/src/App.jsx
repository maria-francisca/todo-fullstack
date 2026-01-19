import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
  changeTitle,
} from "./api/taskApi";

const App = () => {
  const queryClient = useQueryClient();
  const [view, setView] = useState("listar");
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");;

  /* LISTAR TODAS AS TAREFAS */
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  /* CRIAR TAREFA */
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setView("listar");
    },
  });

  /* APAGAR TAREFA */
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  /* MARCAR COMO COMPLETA */
  const toggleMutation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  /* MUDAR TíTULO */
  const changeTitleMutation = useMutation({
    mutationFn: changeTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEditId(null);
      setEditTitle("");
    },
  });

  return (
    <div className="min-h-screen flex bg-indigo-300 text-black p-6">
      
      {/* Menu */}
      <aside className="sidebar">
        <ul className="sidebar_list">
          <li className="sidebar_element group" onClick={() => setView("listar")}>
            <div className="sidebar_hide">
              <p className="sidebar_text">Listar Tarefas</p>
            </div>
          </li>
          <li className="sidebar_element group" onClick={() => setView("criar")}>
            <div className="sidebar_hide">
              <p className="sidebar_text">Criar Tarefas</p>
            </div>
          </li>
        </ul>
      </aside>


      <main className="flex-1 p-6">

        <h1 className="text-6xl flex font-bebas text-black text-center mb-10">Tarefas</h1>

        {/* Lista de tarefas */}
        {view === "listar"  && (
          <>
            {tasksQuery.isLoading && (
              <div className="p-6 text-black">A carregar...</div>
            )}

            {tasksQuery.isError && (
              <div className="p-6 text-red-500">Erro ao carregar</div>
            )}

            {tasksQuery.data && (
              <table className="min-w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="text-left px-4 py-2 text-black">Título</th>
                    <th className="text-left px-4 py-2 text-black">Estado</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksQuery.data.map((task) => (
                    <tr key={task.id} className="border-b hover:bg-gray-100">

                      <td className={`px-4 py-2 text-black`}>
                        {editId === task.id ? (
                          <input
                            autoFocus
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        ) : (
                          <span
                            onClick={() => {
                              setEditId(task.id);
                              setEditTitle(task.title);
                            }}
                            className="cursor-pointer hover:bg-yellow-100 px-1"
                          >
                            {task.title}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-2">
                        {task.completed ? (
                          <span className="text-green-600 font-bold">Completa</span>
                        ) : (
                          <span className="text-red-600 font-bold">Pendente</span>
                        )}
                      </td>


                      <td className="px-4 py-2 flex justify-center gap-2">
                        { !task.completed && (
                          <button
                            onClick={() =>
                              toggleMutation.mutate({ id: task.id, completed: true })
                            }
                            className="table_finish group text-black font-bold  "
                          >
                            Concluir
                          </button>
                        )}

                        {/* Se tiver a editar, aparece SALVAR */}
                        {/* Caso contrário, aparece EDITAR */}
                        {editId === task.id ? (
                          <button
                            onClick={() => changeTitleMutation.mutate({ id: task.id, title: editTitle })}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Salvar
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditId(task.id);
                              setEditTitle(task.title);
                            }}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Editar
                          </button>
                        )}

                        <button
                          onClick={() => deleteMutation.mutate(task.id)}
                          className="table_delete text-black font-bold"
                        >
                          Apagar
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {/* Criar tarefas */}
        { view === "criar" && (
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título aqui..."
              className="bg-white border border-gray-300 px-3 py-2 rounded w-100"
            />
            <button
              onClick={() => createMutation.mutate(title)}
              className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
            >
              Criar
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
