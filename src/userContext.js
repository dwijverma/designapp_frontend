import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch the user data on component mount (i.e., app load or page refresh)
  useEffect(() => {
    fetch("http://localhost:5000/auth/user", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (`${Object.keys(data)[0]}` !== "error") {
          if (data) {
            setUser(data); // Set the user in context
          }
        } else {
          setUser(null);
          console.log("error recived from backend while authentication ");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
