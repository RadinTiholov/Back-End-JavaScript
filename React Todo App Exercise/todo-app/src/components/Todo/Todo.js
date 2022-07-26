import { useState } from "react";
import { EditModal } from "./EditModal/EditModal";
import { Item } from "./Item/Item"

export const Todo = (props) => {
    const [textInputAdd, setTextInputAdd] = useState('');
    const [textInputEdit, setTextInputEdit] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const onCreateClick = (e) => {
        e.preventDefault();

        props.createTask(textInputAdd);
    }
    const onDeleteClick = (id, e) => {
        e.preventDefault();
        props.deleteTask(id);
    }
    const inputOnChange = (e) => {
        setTextInputAdd(e.target.value)
    }

    const onEditOpen = (id, text, e) => {
        e.preventDefault();
        setTextInputEdit({"id": id, "text": text})
        setIsEditing(true);
    }
    const onEdit = (id, text, e) => {
        e.preventDefault();
        props.updateTask(id, text);
        setIsEditing(false);
    }
    const editOnChange = (e) => {
        const tempTask = {...textInputEdit};
        tempTask['text'] = e.target.value;
        setTextInputEdit(tempTask)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h1 className="card-title text-center mb-5 fw-bold">Todo App</h1>
                            <div className="row">
                                {/* Add Form */}
                                <div className="col-10">
                                    <label htmlFor="inputAdd" className="sr-only">
                                        Task
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAdd"
                                        placeholder="Task"
                                        value={textInputAdd}
                                        onChange={inputOnChange}
                                    />
                                </div>
                                <div className="col-2">
                                    <button type="submit" className="btn btn-primary mb-2" onClick={onCreateClick}>Add</button>
                                </div>

                            </div>
                            {/* Edit Form */}
                            {isEditing ? <EditModal onEdit = {onEdit} task = {textInputEdit} editOnChange = {editOnChange}/> : null}
                            {/* Tasks */}
                            <h2 className="card-title text-center mb-5 fw-bold">Tasks</h2>
                            {/* Task */}
                            {props.tasks.map(x => <Item key={x._id} {...x} onDeleteClick={onDeleteClick} onEditOpen = {onEditOpen}/>)}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}