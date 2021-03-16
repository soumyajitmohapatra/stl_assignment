import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const StateContext = createContext();

export const State = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        console.error("error");
      }
    });
  }, [user]);

  return <StateContext.Provider value={user}>{children}</StateContext.Provider>;
};
