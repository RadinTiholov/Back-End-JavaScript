import './App.css';
import { Todo } from './components/Todo/Todo';
import { useEffect, useState } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/tasks')
            .then(res => res.json())
            .then(res => setTasks(Object.values(res)))
    }, [])

    const createTask = (text) => {
        fetch('http://localhost:3030/jsonstore/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"text" : text})
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
    return (
        <div className="backgound-layer">
            {/* Todo */}
            <Todo tasks={tasks} createTask = {createTask} deleteTask = {deleteTask}/>
        </div>

    );
}

export default App;
