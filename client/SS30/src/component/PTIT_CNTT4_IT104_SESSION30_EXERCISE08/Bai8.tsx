import { useState } from "react";

interface Task {
  id: number;
  name: string;
}

export default function EditTaskApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Quét nhà" },
    { id: 2, name: "Giặt quần áo" },
    { id: 3, name: "Nấu cơm" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");
  const updateTaskAPI = async (task: Task): Promise<Task> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(task), 500)
    );
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
  const handleUpdate = async () => {
    if (!editTask) return;

    if (editName.trim() === "") {
      setError("Tên công việc không được để trống");
      return;
    }

    if (tasks.some((t) => t.name === editName.trim() && t.id !== editTask.id)) {
      setError("Tên công việc không được trùng");
      return;
    }

    const updatedTask = { ...editTask, name: editName.trim() };
    const savedTask = await updateTaskAPI(updatedTask);

    setTasks(tasks.map((t) => (t.id === savedTask.id ? savedTask : t)));
    setShowModal(false);
    setEditTask(null);
    setEditName("");
    setError("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", textAlign: "center" }}>
      <h2>Quản lý công việc</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              border: "1px solid #ddd",
              marginBottom: "6px",
              borderRadius: "4px",
            }}
          >
            {task.name}
            <button
              onClick={() => handleOpenModal(task)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#007bff",
              }}
            >
              ✏️ Sửa
            </button>
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
              width: "300px",
            }}
          >
            <h3>Sửa công việc</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {error && (
              <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
            )}
            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button
                onClick={handleCancel}
                style={{
                  marginRight: "10px",
                  padding: "6px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
              <button
                onClick={handleUpdate}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
