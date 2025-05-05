import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const url = `http://localhost:3001/tasks`;

function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('baixa');
  const [done, setDone] = useState(false);

  useEffect(() => {
    axios
      .get(`${url}/${id}`)
      .then((response) => {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setDone(task.done);
      })
      .catch((error) => {
        console.error('Erro ao carregar a tarefa:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${url}/${id}`, {
        title,
        description,
        priority,
        done,
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao atualizar a tarefa:', error);
      });
  };

  return (
    <div>
      <h1 className="page-title">Editar Tarefa</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-field">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="priority">Prioridade:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="baixa">Baixa</option>
              <option value="média">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="form-field">
            <label>
              <input
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
              />
              Concluída
            </label>
          </div>

          <button type="submit" className="submit-button">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTaskPage;