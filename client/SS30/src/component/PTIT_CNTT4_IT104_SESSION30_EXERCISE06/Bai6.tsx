import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface Task {
  id: number;
  name: string;
}

export default function LoadingApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchTasks = async () => {
    return new Promise<Task[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Học React" },
          { id: 2, name: "Làm bài tập TypeScript" },
        ]);
      }, 1500);
    });
  };

  const addTaskAPI = async (task: Task) => {
    return new Promise<Task>((resolve) => {
      setTimeout(() => resolve(task), 800);
    });
  };
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setLoading(false);
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

    setError("");
    setLoading(true);

    const newTask: Task = { id: Date.now(), name: taskName.trim() };
    const savedTask = await addTaskAPI(newTask);

    setTasks([...tasks, savedTask]);
    setTaskName("");
    setLoading(false);

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
            backgroundColor: "#007bff",
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
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #ccc",
              borderTop: "4px solid #007bff",
              borderRadius: "50%",
              margin: "0 auto",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p>Đang tải dữ liệu...</p>
          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : (
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
      )}
    </div>
  );
}
