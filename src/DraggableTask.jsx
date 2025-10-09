function DraggableTask({
  task,
  editing,
  setEditing,
  toggleComplete,
  deleteTask,
  updateTask,
  saveTask,
  draggingId,
  hoverId,
  setDraggingId,
  setHoverId,
  onDrop
}) {
  return (
    <li
      draggable
      onDragStart={(e) => setDraggingId(task.id)}
      onDragOver={(e) => {
        e.preventDefault();
        if (task.id !== hoverId) setHoverId(task.id);
      }}
      onDrop={(e) => onDrop(e, task.id)}
      className={`flex justify-between items-center border rounded-lg p-4 shadow hover:shadow-md transition
        ${draggingId === task.id ? "opacity-50 scale-105" : "opacity-100 scale-100"}
        ${hoverId === task.id ? "bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-600" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"}`}
    >
      {editing.id === task.id ? (
        <>
          <input
            type="text"
            value={editing.text}
            onChange={(e) => setEditing({ ...editing, text: e.target.value })}
            className="flex-grow border border-gray-300 dark:border-gray-600 rounded p-2 mr-2 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 transition-colors duration-300"
          />
          <div className="flex gap-2">
            <button
              onClick={() => saveTask(task.id)}
              className="bg-green-500 dark:bg-green-600 text-white px-3 py-1 rounded hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300"
            >
              Save
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-300"
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
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="h-5 w-5 text-purple-600 dark:text-purple-400 focus:ring-purple-500"
            />
            <span className={`flex-grow font-medium transition-colors duration-300 
              ${task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-200"}`}>
              {task.text}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updateTask(task.id)}
              disabled={task.completed}
              className={`px-3 py-1 rounded transition-colors duration-300 ${
                task.completed
                  ? "bg-blue-300 dark:bg-blue-700 cursor-not-allowed text-white"
                  : "bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white"
              }`}
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              disabled={task.completed}
              className={`px-3 py-1 rounded transition-colors duration-300 ${
                task.completed
                  ? "bg-red-300 dark:bg-red-700 cursor-not-allowed text-white"
                  : "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white"
              }`}
            >
              ✕
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default DraggableTask;
