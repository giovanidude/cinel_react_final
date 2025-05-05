import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const url = `http://localhost:3001/tasks`;

function CreateTaskPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('baixa');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(url, {
        title,
        description,
        priority,
        done: false,
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao criar a tarefa:', error);
      });
  };

  return (
    <div>
      <h1 className="page-title">Nova Tarefa</h1>
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

          <button type="submit" className="button">
            Criar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskPage;