import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export default function Bai3() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    axios.get<Task[]>("http://localhost:3000/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch API:", err);
      });
  }, []);

  return (
    <div
      style={{
        width: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Quản lý công việc
      </h2>

      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                style={{ marginRight: "10px" }}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#888" : "#000",
                }}
              >
                {task.name}
              </span>
            </div>
            <div>
              <button style={{ border: "none", background: "none", color: "orange", marginRight: "8px" }}>✏</button>
              <button style={{ border: "none", background: "none", color: "red" }}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
