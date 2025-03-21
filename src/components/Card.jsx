function Card({id, imageUrl, handleCardClick}) {
    
    return (
        <div className="card" onClick={() => handleCardClick(id)}>
            <img src={imageUrl} alt="gif" className="gif"/>
        </div>
    )
}

export default Card; 