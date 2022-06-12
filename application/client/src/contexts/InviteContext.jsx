import { createContext, useState, useEffect, useContext } from "react";
import { SocketContext } from "./SocketContext";

export const InContext = createContext();

const InviteContext = ({ children }) => {
    const socket = useContext(SocketContext)
    const [invites, setInvites] = useState([]);

  useEffect(() => {
    async function updateLobby(){
        await socket.on('private_lobby_update', (data)=>{
            setInvites(data)
        })
    }

    updateLobby()
  }, [socket]);

  return (
    <InContext.Provider value={{ invites, setInvites }}>
      {children}
    </InContext.Provider>
  );
};

export default InviteContext;
