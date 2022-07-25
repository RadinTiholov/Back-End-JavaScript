export const Item = (props) => {
    return(
        <div className="card mb-3" style={{ backgroundColor: "lightblue" }}>
                    <div className="card-body">
                      <div className="row">
                        {/* Form */}
                        <div className="col-10">
                          <h5 className="card-title">{props.text}</h5>
                        </div>
                        <div className="col-2">
                          <button type="button" className="btn-close" aria-label="Close" onClick={props.onDeleteClick.bind(this, props._id)}/>
                        </div>
                      </div>
                    </div>
                  </div>
    )
}