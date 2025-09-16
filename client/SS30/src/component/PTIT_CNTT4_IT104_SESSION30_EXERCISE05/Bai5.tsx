import { useState, useEffect } from "react";
import type {ChangeEvent, FormEvent} from "react";
interface Task {
  id: number;
  name: string;
}

export default function AddTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fetchTasks = async () => {
    return [
      { id: 1, name: "Học React" },
      { id: 2, name: "Làm bài tập TypeScript" },
    ];
  };

  const addTaskAPI = async (task: Task) => {
    return task;
  };
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (taskName.trim() === "") {
      setError("Tên công việc không được để trống");
      return;
    }
    if (tasks.some((t) => t.name === taskName.trim())) {
      setError("Tên công việc không được trùng");
      return;
    }
    const newTask: Task = { id: Date.now(), name: taskName.trim() };
    const savedTask = await addTaskAPI(newTask);

    setTasks([...tasks, savedTask]);
    setTaskName("");
    setError("");
    const inputEl = document.getElementById("task-input") as HTMLInputElement;
    inputEl?.focus();
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>
        Ứng dụng quản lý công việc
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          id="task-input"
          type="text"
          value={taskName}
          onChange={handleChange}
          placeholder="Nhập tên công việc"
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Thêm công việc
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
          {error}
        </p>
      )}

      <ul style={{ marginTop: "20px", padding: 0, listStyle: "none" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: "10px",
              marginBottom: "8px",
              background: "#f8f9fa",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
