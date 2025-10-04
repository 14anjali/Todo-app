import { useEffect, useState } from "react";
import TodoFilter from "./TodoFilter";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [editing, setEditing] = useState({ id: null, text: "" });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: task.trim(), completed: false },
      ]);
      setTask("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) setEditing({ id: id, text: taskToEdit.text });
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editing.text } : task
      )
    );
    setEditing({ id: null, text: "" });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-purple-700 mb-8">
          Task Manager
        </h1>
        <div className="space-y-4 text-gray-600">
          <p>
            Total Tasks:{" "}
            <span className="font-semibold">{tasks.length}</span>
          </p>
          <p>
            Completed:{" "}
            <span className="font-semibold">
              {tasks.filter((t) => t.completed).length}
            </span>
          </p>
          <p>
            Pending:{" "}
            <span className="font-semibold">
              {tasks.filter((t) => !t.completed).length}
            </span>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Input */}
          <div className="flex mb-6 shadow-sm">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="flex-grow border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={addTask}
              className="bg-purple-600 text-white px-6 rounded-r-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Add
            </button>
          </div>

          {/* Filter */}
          <TodoFilter currentFilter={filter} onChange={setFilter} />

          {/* Task List */}
          <ul className="mt-6 space-y-3">
            {filteredTasks.length === 0 && (
              <p className="text-center text-gray-500">
                No tasks in this filter
              </p>
            )}

            {filteredTasks.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                {editing.id === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editing.text}
                      onChange={(e) =>
                        setEditing({ ...editing, text: e.target.value })
                      }
                      className="flex-grow border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveTask(item.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => deleteTask(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        ✕
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center flex-grow gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleComplete(item.id)}
                        className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                      />
                      <span
                        className={`flex-grow font-medium ${
                          item.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateTask(item.id)}
                        disabled={item.completed}
                        className={`px-3 py-1 rounded transition ${
                          item.completed
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTask(item.id)}
                        disabled={item.completed}
                        className={`px-3 py-1 rounded transition ${
                          item.completed
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        ✕
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Todo;
