const Message  = ({text, color}) => {
    if (text === null)
        return null
    
    const messageStyler = {
        color: color
    }

    return(
        <p 
            className="message"
            style={messageStyler}
        >
            {text}
        </p>
    )
} 

export default Message