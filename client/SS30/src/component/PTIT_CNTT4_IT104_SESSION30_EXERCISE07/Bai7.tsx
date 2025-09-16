import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const fetchTasks = async (): Promise<Task[]> => {
    return [
      { id: 1, name: "Học React", completed: false },
      { id: 2, name: "Làm bài tập TypeScript", completed: true },
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

    const newTask: Task = {
      id: Date.now(),
      name: taskName.trim(),
      completed: false,
    };
    const savedTask = await addTaskAPI(newTask);

    setTasks([...tasks, savedTask]);
    setTaskName("");
    setError("");

    const inputEl = document.getElementById("task-input") as HTMLInputElement;
    inputEl?.focus();
  };
  const toggleTask = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    if (updated.every((t) => t.completed)) {
      setShowModal(true);
    }
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
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black",
              }}
            >
              {task.name}
            </span>
          </li>
        ))}
      </ul>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <h3>Hoàn thành công việc</h3>
            <p>Tất cả công việc đã được hoàn thành.</p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
