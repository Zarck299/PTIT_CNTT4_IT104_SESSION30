import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Bai1() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
  axios.get<Task[]>("http://localhost:3000/tasks")
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
}, []);
  const addTask = async () => {
    if (!title.trim()) {
      alert("Tên công việc không được để trống!");
      return;
    }
    if (tasks.some(t => t.title === title.trim())) {
      alert("Tên công việc đã tồn tại!");
      return;
    }

    const newTask = { title: title.trim(), completed: false };
    const res = await axios.post<Task>("http://localhost:3000/tasks", newTask);

    setTasks([...tasks, res.data]);
    setTitle("");
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>📋 Quản lý công việc</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nhập công việc..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px" }}>
          Thêm
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              padding: "8px 12px",
              marginBottom: 8,
              border: "1px solid #ddd",
              borderRadius: 6,
              textAlign: "left",
              background: task.completed ? "#d4f7dc" : "#f9f9f9"
            }}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
