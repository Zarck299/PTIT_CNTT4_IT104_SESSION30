import { useState } from 'react'

export default function Bai2() {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Quét nhà", completed: false },
        { id: 2, name: "Giặt quần áo", completed: true },
        { id: 3, name: "Nấu cơm", completed: false },
    ]);
    const [filter, setFilter] = useState("all");
    const [newTask, setNewTask] = useState("");
    const addTask = () => {
        if (!newTask.trim()) return;
        const task = {
            id: Date.now(),
            name: newTask,
            completed: false,
        };
        setTasks([...tasks, task]);
        setNewTask("");
    }
    const toggleTask = (id: number) => {
        setTasks(
            tasks.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };
    const deleteTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter((t) => !t.completed));
    };

    const clearAll = () => {
        setTasks([]);
    };
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });
    return (
<div className="todo-app">
      <h2>Quản lý công việc</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Nhập tên công việc"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Thêm công việc</button>
      </div>
      <div className="filter-section">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Hoàn thành
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Đang thực hiện
        </button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((t) => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            <span>{t.name}</span>
            <button onClick={() => deleteTask(t.id)}>🗑</button>
          </li>
        ))}
      </ul>
      <div className="action-section">
        <button onClick={clearCompleted}>Xóa công việc hoàn thành</button>
        <button onClick={clearAll}>Xóa tất cả công việc</button>
      </div>
    </div>
  );
}
