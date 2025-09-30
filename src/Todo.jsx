import { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
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
    setEditingIndex(id);
    setEditingText(taskToEdit.text);
  };
  const saveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editingText } : task
    );

    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
          My To-Do List
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Write your task here..."
            className="flex-grow border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={addTask}
            className="bg-purple-600 text-white px-6 rounded-r-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Add
          </button>
        </div>

        <ul>
          {tasks.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-50 border rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition"
            >
              {editingIndex === item.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
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
                  {/* Checkbox + task text */}
                  <div className="flex items-center flex-grow gap-3 ">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleComplete(item.id)}
                    />
                    <span
                      className={`flex-grow font-medium ${
                        item.completed
                          ? "line-through text-gray-500"
                          : "text-gray-700 "
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>

                  {/* Buttons */}
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
    </div>
  );
}

export default Todo;
