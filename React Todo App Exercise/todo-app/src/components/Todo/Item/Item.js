export const Item = (props) => {
    return (
        <div className="card mb-3" style={{ backgroundColor: "lightblue" }}>
            <div className="card-body">
                <div className="row">
                    {/* Form */}
                    <div className="col-9">
                        <h5 className="card-title">{props.text}</h5>
                    </div>
                    <div className="col-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <button onClick={props.onEditOpen.bind(this, props._id, props.text)}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    <div className="col-2">
                        <button onClick={props.onDeleteClick.bind(this, props._id)}>
                            <i className ="fa-solid fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}