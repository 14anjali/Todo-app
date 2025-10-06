

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
      className={`flex justify-between items-center bg-white border rounded-lg p-4 shadow hover:shadow-md transition
        ${draggingId === task.id ? "opacity-50 scale-105" : "opacity-100 scale-100"}
        ${hoverId === task.id ? "bg-blue-100 border-blue-400" : "bg-white"}`}
    >
      {editing.id === task.id ? (
        <>
          <input
            type="text"
            value={editing.text}
            onChange={(e) => setEditing({ ...editing, text: e.target.value })}
            className="flex-grow border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div className="flex gap-2">
            <button
              onClick={() => saveTask(task.id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => deleteTask(task.id)}
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
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500"
            />
            <span className={`flex-grow font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
              {task.text}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updateTask(task.id)}
              disabled={task.completed}
              className={`px-3 py-1 rounded transition ${
                task.completed ? "bg-blue-300 cursor-not-allowed text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              disabled={task.completed}
              className={`px-3 py-1 rounded transition ${
                task.completed ? "bg-red-300 cursor-not-allowed text-white" : "bg-red-500 hover:bg-red-600 text-white"
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
