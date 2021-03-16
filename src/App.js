import React, { useState, useContext, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
///React Icons
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
///component
// import { auth } from "./firebase";
import { lightTheme, darkTheme, GlobalStyles } from "./components/Theme";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { StateContext } from "./context/State.js";
import Loader from "./components/Loader";
import ResetPass from "./components/ResetPass";
import MailPrompt from "./components/MailPrompt";

const UserProfile = React.lazy(() => import("./components/User"));

function App(props) {
  const user = useContext(StateContext);

  const icon =
    props.theme === "light" ? <HiMoon size={30} /> : <CgSun size={30} />;
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <Route exact path="/">
            <Signin>
              <Toggle onClick={themeToggler}>{icon}</Toggle>
            </Signin>
          </Route>
          <Route exact path="/signup">
            <Signup>
              <Toggle onClick={themeToggler}>{icon}</Toggle>
            </Signup>
          </Route>
          <Route exact path="/resetPass">
            <ResetPass>
              <Toggle onClick={themeToggler}>{icon}</Toggle>
            </ResetPass>
          </Route>
          <Route exact path="/verifyUser">
            <MailPrompt />
          </Route>
          <Route exact path={`/user=${user.displayName}`}>
            <Suspense fallback={<Loader />}>
              <UserProfile>
                <Toggle onClick={themeToggler}>{icon}</Toggle>
              </UserProfile>
            </Suspense>
          </Route>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;

const Toggle = styled.button`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.titleColor};
  color: ${(props) => props.theme.pageBackground};
  &:focus {
    outline: none;
  }
  transition: all 1s ease;
`;
