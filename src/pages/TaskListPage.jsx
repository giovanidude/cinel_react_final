import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';

Modal.setAppElement('#root');

const url = `http://localhost:3001/tasks`;

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar as tarefas:', error);
      });
  };

  const toggleTaskStatus = (id, done) => {
    axios
      .patch(`${url}/${id}`, { done: !done })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error('Erro ao atualizar o status da tarefa:', error);
      });
  };

  const openModal = (taskId) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const deleteTask = () => {
    if (taskToDelete) {
      axios
        .delete(`${url}/${taskToDelete}`)
        .then(() => {
          fetchTasks();
          closeModal();
        })
        .catch((error) => {
          console.error('Erro ao excluir a tarefa:', error);
        });
    }
  };

  return (
    <div className="task-list">
      <h1 className="page-title">Suas Tarefas</h1>
      <div className="task-list-container">
        {tasks.length === 0 ? (
          <p>Nenhuma tarefa encontrada.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.done ? 'done' : ''}`}
            >
              <div className="task-card-header">
                <h4>{task.title}</h4>
                <p>{task.description || 'Sem descrição'}</p>
              </div>
              <div className="task-card-footer">
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTaskStatus(task.id, task.done)}
                  />
                  <span>Concluída</span>
                </label>
                <p>
                  <strong>Prioridade:</strong> {task.priority}
                </p>
              </div>
              <div className="task-card-footer">
                <button
                  className="button"
                  onClick={() => navigate(`/editar/${task.id}`)}
                >
                  Editar
                </button>
                <button
                  className="button remove"
                  onClick={() => openModal(task.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Tem certeza que deseja excluir esta tarefa?</h2>
        <div>
          <button className="button remove" onClick={deleteTask}>
            Sim
          </button>
          <button className="button" onClick={closeModal}>
            Não
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TaskListPage;