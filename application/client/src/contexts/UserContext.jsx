import { createContext, useState, useEffect } from "react";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          mode: "cors",
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data.payload;
          setUser({ ...userData });
        }else{
            setUser({loggedIn: false})
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
