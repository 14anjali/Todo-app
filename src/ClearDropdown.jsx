import { useState, useRef, useEffect } from "react";

export default function ClearDropdown({ tasks, setTasks }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleClearAll = () => {
    if (tasks.length === 0) return;
    if (!window.confirm("Are you sure you want to delete all tasks?")) return;

    setTasks([]);
    localStorage.removeItem("tasks"); // update storage
    setOpen(false);
  };

  const handleClearCompleted = () => {
    const completedTasks = tasks.filter((t) => t.completed);
    if (completedTasks.length === 0) return;
    if (!window.confirm("Delete all completed tasks?")) return;

    const activeTasks = tasks.filter((t) => !t.completed);
    setTasks(activeTasks);
    localStorage.setItem("tasks", JSON.stringify(activeTasks));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block text-left mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-semibold flex items-center justify-center"
      >
        Clear ▾
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            onClick={handleClearAll}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Clear All
          </button>
          <button
            onClick={handleClearCompleted}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
}
