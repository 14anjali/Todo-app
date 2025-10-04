function TodoFilter({ currentFilter, onChange }) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${
              currentFilter === filter.value
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
