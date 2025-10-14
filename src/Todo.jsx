import { useEffect, useState } from "react";
import TodoFilter from "./TodoFilter";
import DraggableTask from "./DraggableTask";
import ProgressBar from "./ProgressCircle";
import ClearDropdown from "./ClearDropdown";

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

  const [draggingId, setDraggingId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task.trim(), completed: false }]);
      setTask("");
    }
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Start editing task
  const updateTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) setEditing({ id: id, text: taskToEdit.text });
  };

  // Save edited task
  const saveTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, text: editing.text } : t))
    );
    setEditing({ id: null, text: "" });
  };

  // Filtered tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // Drag & Drop handlers
  const onDrop = (e, id) => {
    e.preventDefault();
    const dragId = draggingId || e.dataTransfer.getData("text/plain");
    if (!dragId || dragId === id) return;

    const newTasks = [...tasks];
    const dragIndex = newTasks.findIndex((t) => t.id === Number(dragId));
    const dropIndex = newTasks.findIndex((t) => t.id === id);

    const [draggedTask] = newTasks.splice(dragIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);

    setTasks(newTasks);
    setDraggingId(null);
    setHoverId(null);
  };

    
return (
    <div className="min-h-screen flex flex-col md:flex-row 
                    bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md 
                        shadow-2xl p-6 rounded-2xl border border-purple-100 dark:border-gray-700 
                        mb-6 md:mb-0">
        <h1 className="text-3xl font-bold text-purple-700 mb-8 dark:text-purple-400 text-center md:text-left">
          Task Manager
        </h1>
        <div className="space-y-4 text-gray-700 dark:text-gray-200 text-center md:text-left">
          <p>
            Total Tasks: <span className="font-semibold text-purple-600 dark:text-purple-400">{tasks.length}</span>
          </p>
          <p>
            Completed: <span className="font-semibold text-green-600 dark:text-green-400">{tasks.filter((t) => t.completed).length}</span>
          </p>
          <p>
            Pending: <span className="font-semibold text-yellow-500 dark:text-yellow-400">{tasks.filter((t) => !t.completed).length}</span>
          </p>
        </div>

        <div className="mt-8 flex justify-center md:justify-start">
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-purple-500/20 rounded-full"></div>
            <ProgressBar
              completed={tasks.filter(t => t.completed).length}
              total={tasks.length}
              size={130}
              strokeWidth={12}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto w-full">
          {/* Input + Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="flex-grow border border-gray-300 dark:border-gray-600 rounded-lg p-3 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 
                         shadow-md hover:shadow-lg transition-all duration-300"
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-500 dark:to-indigo-400 
                         text-white px-6 py-3 rounded-lg hover:opacity-90 active:scale-95 
                         transition font-semibold flex items-center justify-center shadow-md"
            >
              Add
            </button>
            <ClearDropdown tasks={tasks} setTasks={setTasks} />
          </div>

          {/* Filter */}
          <TodoFilter currentFilter={filter} onChange={setFilter} />

          {/* Task List */}
          <ul className="mt-6 space-y-3">
            {filteredTasks.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
                No tasks in this filter
              </p>
            )}

            {filteredTasks.map((task) => (
              <DraggableTask
                key={task.id}
                task={task}
                editing={editing}
                setEditing={setEditing}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
                updateTask={updateTask}
                saveTask={saveTask}
                draggingId={draggingId}
                hoverId={hoverId}
                setDraggingId={setDraggingId}
                setHoverId={setHoverId}
                onDrop={onDrop}
              />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Todo;