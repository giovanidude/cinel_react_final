import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import TaskListPage from './pages/TaskListPage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';

function App() {

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/nova" element={<CreateTaskPage />} />
          <Route path="/editar/:id" element={<EditTaskPage />} />
          <Route path="*" element={<h3>404 - Página não encontrada</h3>} />
        </Routes>
      </main>
    </>
  )
}

export default App