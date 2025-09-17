import { useState } from "react";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Quét nhà", completed: false },
    { id: 2, name: "Giặt quần áo", completed: true },
    { id: 3, name: "Nấu cơm", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");
  const addTask = () => {
    if (!newTask.trim()) return;
    const newItem: Task = { id: Date.now(), name: newTask.trim(), completed: false };
    setTasks([...tasks, newItem]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const deleteCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const deleteAll = () => {
    setTasks([]);
  };
  const handleOpenModal = (task: Task) => {
    setEditTask(task);
    setEditName(task.name);
    setShowModal(true);
    setError("");
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditTask(null);
    setEditName("");
    setError("");
  };

  const handleUpdate = () => {
    if (!editTask) return;

    if (editName.trim() === "") {
      setError("Tên công việc không được để trống");
      return;
    }

    if (tasks.some((t) => t.name === editName.trim() && t.id !== editTask.id)) {
      setError("Tên công việc không được trùng");
      return;
    }

    setTasks(tasks.map(t => t.id === editTask.id ? { ...t, name: editName.trim() } : t));
    setShowModal(false);
    setEditTask(null);
    setEditName("");
    setError("");
  };
  const filteredTasks = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", textAlign: "center" }}>
      <h2>Quản lý công việc</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nhập tên công việc"
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
          Thêm công việc
        </button>
      </div>

      <div style={{ marginBottom: "15px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => setFilter("all")} style={{ padding: "6px 12px", background: filter==="all"?"#007bff":"#f1f1f1", color: filter==="all"?"#fff":"#000" }}>Tất cả</button>
        <button onClick={() => setFilter("completed")} style={{ padding: "6px 12px", background: filter==="completed"?"#007bff":"#f1f1f1", color: filter==="completed"?"#fff":"#000" }}>Hoàn thành</button>
        <button onClick={() => setFilter("active")} style={{ padding: "6px 12px", background: filter==="active"?"#007bff":"#f1f1f1", color: filter==="active"?"#fff":"#000" }}>Đang thực hiện</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}>
            <label style={{ flex: 1, textAlign: "left" }}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} style={{ marginRight: "8px" }} />
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.name}</span>
            </label>
            <div>
              <button onClick={() => handleOpenModal(task)} style={{ marginRight: "10px", border: "none", background: "transparent", cursor: "pointer" }}>✏️</button>
              <button onClick={() => deleteTask(task.id)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "red" }}>🗑</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={deleteCompleted} style={{ padding: "8px 10px", background: "red", color: "#fff", border: "none", borderRadius: "4px" }}>
          Xóa công việc hoàn thành
        </button>
        <button onClick={deleteAll} style={{ padding: "8px 10px", background: "red", color: "#fff", border: "none", borderRadius: "4px" }}>
          Xóa tất cả công việc
        </button>
      </div>

      {showModal && editTask && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
            <h3>Sửa công việc</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button onClick={handleCancel} style={{ marginRight: "10px", padding: "6px 12px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>Hủy</button>
              <button onClick={handleUpdate} style={{ padding: "6px 12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cập nhật</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
