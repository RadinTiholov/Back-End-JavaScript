export const EditModal = (props) => {
    return (
        <div className="row">
            <div className="col-10">
                <label htmlFor="inputAdd" className="sr-only">
                    Task
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputAdd"
                    value={props.task.text}
                    onChange={props.editOnChange}
                />
            </div>
            <div className="col-2">
                <button type="submit" className="btn btn-primary mb-2" onClick = {props.onEdit.bind(this, props.task.id, props.task.text)}>Edit</button>
            </div>
        </div>
    )
}