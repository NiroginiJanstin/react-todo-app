import './App.css';
import TodoList from './components/TodoList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <TodoList />
      <ToastContainer/>
    </div>
  );
}

export default App;
