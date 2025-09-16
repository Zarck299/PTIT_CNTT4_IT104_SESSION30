import { useState } from 'react'
interface Task {
    id: number,
    name: string,
    completed: boolean
}
export default function Ex09() {
    const [task, setTask] = useState<Task[]>([
        { id: 1, name: "Quét nhà", completed: false },
        { id: 2, name: "Giặt quần áo", completed: true },
        { id: 3, name: "Nấu cơm", completed: false },
    ]);
    const [filter, setFilter] = useState<"all" | "completed" | "inProgress">("all");
    const filteredTask = task.filter((task) =>{
        if(filter === "completed"){
            return task.completed
        } 
        if(filter === "inProgress"){
            return !task.completed
        }
        return true
    })
    const toggleTask = (id: number)=>{
        setTask(
        task.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
    }
  return (
    <div style={{ width: "400px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Quản lý công việc</h2>

      {/* Filter */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            background: filter === "all" ? "#2563eb" : "#fff",
            color: filter === "all" ? "#fff" : "#000",
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            background: filter === "completed" ? "#2563eb" : "#fff",
            color: filter === "completed" ? "#fff" : "#000",
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Hoàn thành
        </button>
        <button
          onClick={() => setFilter("inProgress")}
          style={{
            background: filter === "inProgress" ? "#2563eb" : "#fff",
            color: filter === "inProgress" ? "#fff" : "#000",
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Đang thực hiện
        </button>
      </div>

      {/* Danh sách công việc */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTask.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              background: "#f9f9f9",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              style={{ marginRight: "10px" }}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
