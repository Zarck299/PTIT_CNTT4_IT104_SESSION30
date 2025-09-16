import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export default function DeleteApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  useEffect(() => {
    axios.get<Task[]>("http://localhost:3000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);
  const confirmDelete = (task: Task) => {
    setTaskToDelete(task);
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };
  const handleDelete = async () => {
    if (taskToDelete) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskToDelete.id}`);
        setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      } finally {
        setShowModal(false);
        setTaskToDelete(null);
      }
    }
  };

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

      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
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
              <button
                style={{ border: "none", background: "none", color: "red" }}
                onClick={() => confirmDelete(task)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && taskToDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Xác nhận</h3>
            <p>
              Bạn có chắc chắn muốn xóa công việc{" "}
              <b>{taskToDelete.name}</b> không?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={handleCancel}
                style={{
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  background: "#f5f5f5",
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border: "none",
                  background: "red",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
