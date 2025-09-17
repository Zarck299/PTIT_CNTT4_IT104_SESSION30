import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  useEffect(() => {
    axios
      .get<Task[]>("http://localhost:3000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await axios.post<Task>("http://localhost:3000/tasks", {
        name: newTask,
        completed: false,
      });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
    }
  };
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
  const toggleComplete = async (task: Task) => {
    try {
      const updated = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:3000/tasks/${task.id}`, updated);
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };
  const deleteCompleted = async () => {
    for (const t of tasks.filter((task) => task.completed)) {
      await axios.delete(`http://localhost:3000/tasks/${t.id}`);
    }
    setTasks(tasks.filter((task) => !task.completed));
  };
  const deleteAll = async () => {
    for (const t of tasks) {
      await axios.delete(`http://localhost:3000/tasks/${t.id}`);
    }
    setTasks([]);
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div
      style={{
        width: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Quản lý công việc
      </h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nhập tên công việc"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Thêm công việc
        </button>
      </div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: filter === "all" ? "#2563eb" : "#fff",
            color: filter === "all" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: filter === "completed" ? "#2563eb" : "#fff",
            color: filter === "completed" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Hoàn thành
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: filter === "active" ? "#2563eb" : "#fff",
            color: filter === "active" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Đang thực hiện
        </button>
      </div>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {filteredTasks.map((task) => (
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
                onChange={() => toggleComplete(task)}
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
                style={{
                  border: "none",
                  background: "none",
                  color: "orange",
                  marginRight: "10px",
                }}
              >
                ✏
              </button>
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

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={deleteCompleted}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            background: "red",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Xóa công việc hoàn thành
        </button>
        <button
          onClick={deleteAll}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            background: "red",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Xóa tất cả công việc
        </button>
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
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
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
