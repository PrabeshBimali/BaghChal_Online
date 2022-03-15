// Use less component


import { createContext, useEffect, useState } from "react";
import io from 'socket.io-client';

export const SocketContext = createContext();

const Socket = ({children}) => {
    const [ socket, setSocket ] = useState()
    
    useEffect(()=>{
        const connection = io.connect('http://localhost:5000')
        setSocket(connection)
    }, [])

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket