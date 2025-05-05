import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          marginRight: '15px',
          textDecoration: 'none',
          color: isActive ? 'yellow' : 'white',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        Lista de Tarefas
      </NavLink>
      <NavLink
        to="/nova"
        style={({ isActive }) => ({
          marginRight: '15px',
          textDecoration: 'none',
          color: isActive ? 'yellow' : 'white',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        Criar Tarefa
      </NavLink>
    </nav>
  );
}

export default NavBar;