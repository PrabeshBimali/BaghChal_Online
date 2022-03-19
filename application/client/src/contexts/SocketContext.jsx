// Use less component


import { createContext, useEffect, useState } from "react";
import io from 'socket.io-client';

export const SocketContext = createContext();

const Socket = ({children}) => {
    const [ socket, setSocket ] = useState()
    
    useEffect(()=>{
        const connection = io('http://localhost:5000', {
            withCredentials: true,
            autoConnect: false
        }).connect()
        setSocket(connection)
    }, [])

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default Socket