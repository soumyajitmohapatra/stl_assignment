import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { StateContext } from "../context/State.js";

import VectorArt from "../Images/2807611.png";

import Loader from "../components/Loader";

function Signin({ children, box, font }) {
  const [loading, setLoading] = useState(false);
  const user = useContext(StateContext);
  const history = useHistory();

 
  function signOut() {
    if (user) {
      auth.signOut().then(() => history.push("/"));
    }
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timing);
  }, []);
  return (
    <Section>
      <Container>
        <ImageContainer>
          <div className="img-holder">
            <img width="600" height="100%" src={VectorArt} alt="welcom"></img>
          </div>
        </ImageContainer>
        <UserProfile>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="toggle">{children}</div>
              <Welcome>
                <h1>Wellcome {user.displayName} !</h1>
              </Welcome>
              <div className="wrapper">
                <Avtar>
                  <img src={user.photoURL} alt="profile_img"></img>
                </Avtar>
                <h1>Name: {user.displayName}</h1>
                <h1>
                  UserName: {user.displayName.substr(0, 2)}.
                  {user.email.substr(0, 5)}.{getRandomInt(1000)}
                </h1>
                <h1>Email: {user.email}</h1>
                <h1>PhoneNumber: {user.PhoneNumber}</h1>
                <Logout>
                  <button onClick={signOut}>logout</button>
                </Logout>
              </div>
            </>
          )}
        </UserProfile>
      </Container>
    </Section>
  );
}

export default Signin;

const Logout = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  button {
    padding: 0.7rem 0;
    width: 100%;
    cursor: pointer;
    border: none;
    background: #a32af3;
    color: white;
    border-radius: 8px;
    outline: none;
    font-weight: 500;
    box-sizing: border-box;
    text-align: center;
    @media (max-width: 990px) {
      width: 66%;
    }
  }
`;
const Section = styled.section`
  height: 100vh;
  color: ${(font) => font.theme.fontColor};
  display: flex;
  flex-direction: column;
  text-align: center;
  .toggle {
    margin-top: 0.5rem;
  }
`;

const UserProfile = styled.div`
  flex-grow: 3;

  .wrapper {
    background: ${(box) => box.theme.boxBackground};
    margin: 1rem auto;
    width: 40vw;
    border-radius: 1rem;
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    @media (max-width: 990px) {
      display: block;
      width: 100vw;
    }
  }
`;
const Container = styled.div`
  display: flex;
  @media (max-width: 990px) {
    display: block;
    width: 100vw;
  }
`;
const Avtar = styled.div`
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
`;

const ImageContainer = styled.div`
  flex-grow: 1;
  max-width: 35vw;
  background: ${(box) => box.theme.boxBackground};
  height: 100vh;
  .img-holder {
    display: flex;
    justify-content: center;
    margin-top: 10rem;
    image {
      object-fit: contain;
    }
  }
  @media (max-width: 990px) {
    display: none;
  }
`;

const Welcome = styled.div`
  margin: 3rem auto;
`;
