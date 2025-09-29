import { useState } from "react";

function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const[editingIndex,setEditingIndex]=useState(null)
  const[editingText,setEditingText]=useState('')

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (deletedIndex) => {
    setTasks(tasks.filter((_, index) => index !== deletedIndex));
  };
 const updateTask=(index)=>{
    setEditingIndex(index)
    setEditingText(tasks[index])
 }
 const saveTask=(index)=>{
    const updatedTasks =[...tasks]
    updatedTasks[index]=editingText
    setTasks(updatedTasks)
    setEditingIndex(null)
    setEditingText('')
 }

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
  {tasks.map((item, index) => (
    <li
      key={index}
      className="flex justify-between items-center bg-gray-50 border rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition"
    >
      {editingIndex === index ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="flex-grow border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div className="flex gap-2">
            <button
              onClick={() => saveTask(index)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => deleteTask(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              ✕
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="flex-grow text-gray-700 font-medium">{item}</span>
          <div className="flex gap-2">
            <button
              onClick={() => updateTask(index)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTask(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
