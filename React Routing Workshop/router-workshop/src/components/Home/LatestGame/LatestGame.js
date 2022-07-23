export const LatestGame = (props) => {
    return (
        <div className="game">
          <div className="image-wrap">
            <img src={props.imageUrl} alt='img'/>
          </div>
          <h3>{props.title}</h3>
          <div className="rating">
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
          </div>
          <div className="data-buttons">
            <a href={'/details/' + props._id} className="btn details-btn">
              Details
            </a>
          </div>
        </div>
    )
}