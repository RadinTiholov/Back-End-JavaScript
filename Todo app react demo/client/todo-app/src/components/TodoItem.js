import {useState} from 'react';

export const TodoItem = (props) => {
const [status, setStatus] = useState(props.isCompleted);
function changeStatusOnPress() {
    fetch(`http://localhost:3030/jsonstore/todos/${props._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...props, isCompleted: !status})
    })
    .then(setStatus(!status));
}

    return (
        <tr className={status ? "todo is-completed" : "todo"}>
                    <td>{props.text}</td>
                    <td>{status ? "Completed" : "Incompleted"}</td>
                    <td className="todo-action">
                      <button onClick={changeStatusOnPress} className="btn todo-btn">Change status</button>
                    </td>
        </tr>
    )
}