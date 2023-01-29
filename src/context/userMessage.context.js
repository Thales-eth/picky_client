import { createContext, useState } from "react"

const MessageContext = createContext()

const MessageProviderWrapper = (props) => {

    const [showMessage, setShowMessage] = useState({
        show: false,
        title: 'Title',
        text: 'Message'
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <MessageContext.Provider value={{ showMessage, setShowMessage, show, setShow, handleClose, handleShow }}>
            {props.children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProviderWrapper }