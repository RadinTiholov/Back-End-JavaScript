import './App.css';
import { Todo } from './components/Todo/Todo';
import useFetch from './hooks/useFetch';
import {TaskContext} from './contexts/TaskContext';

function App() {
    const [tasks, setTasks] = useFetch('http://localhost:3030/jsonstore/tasks');

    const createTask = (text) => {
        fetch('http://localhost:3030/jsonstore/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "text": text })
        })
            .then(res => res.json())
            .then(res => setTasks(state => [...state, res]))
    }
    const deleteTask = (id) => {
        fetch('http://localhost:3030/jsonstore/tasks/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => setTasks(state => state.filter(x => x._id !== id)))
    }
    const updateTask = (id, text) => {
        fetch('http://localhost:3030/jsonstore/tasks/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "text": text, '_id': id })
        })
            .then(res => res.json())
            .then(res => {
                const tempTasks = [...tasks].map(x => x._id === res._id ? { ...x, "text": res.text } : x);
                setTasks(tempTasks)
            })
    }
    return (
        <div className="backgound-layer">
            <TaskContext.Provider value={tasks}>
                <Todo createTask={createTask} deleteTask={deleteTask} updateTask={updateTask} />
            </TaskContext.Provider>
        </div>

    );
}

export default App;
