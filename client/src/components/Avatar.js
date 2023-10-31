const Avatar = ({ imageURL, marginLeft, mine, onDelete, pressOption, ...props }) => {
    return (
        <div className='user-avatar' style={marginLeft !== undefined ? { marginLeft: marginLeft, textAlign: "center" } : { textAlign: "center" }}>
            <img src={imageURL} alt={imageURL} {...props} />
            {mine && <div className='delete-btn' onClick={onDelete}>
                <img src='/icons8-delete-trash-100.png'></img>
            </div>}
            {
                pressOption ?
                <span style={{position: "absolute", top: 0, left: 0, width: "100%"}}>Press here to start chat</span> : <span></span>
            }
        </div>
    )
}

export default Avatar;