import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { auth, googleProvider, database } from "../firebase";
//Image
import home from "../Images/Home.png";
import { FaGoogle } from "react-icons/fa";

function Signin({ children, box, font }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth.user.emailVerified) {
          history.push(`/user=${auth.user.displayName}`);
          history.go(0);
        }else{
          alert("please verify")
        }
      })
      .catch((error) => alert(error.message));
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleProvider)
      .then((auth) => {
        auth.user.updateProfile({ displayName: auth.user.displayName });
        database
          .collection("users")
          .doc(auth.user.uid)
          .set({
            name: auth.user.displayName,
            userName: auth.user.displayName.substr(0, 4),
            image: auth.user.photoURL,
          });
        history.push(`/user=${auth.user.displayName}`);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Section>
      <Container>
        <ImageContainer>
          <div className="img-holder">
            <img src={home} alt="Vector Art (Office)"></img>
          </div>
        </ImageContainer>
        <FormContainer>
          <div className="toggle">{children}</div>
          <div className="form-wrapper">
            <div className="form">
              <Title>
                <h1>
                  Sign in to <em>XYZ</em>
                </h1>
              </Title>
              <GoogleBtn>
                <button onClick={signInWithGoogle}>
                  <span style={{ marginRight: ".7rem " }}>
                    <FaGoogle />
                  </span>
                  Sign in With Google
                </button>
              </GoogleBtn>
              <Divider>
                <h4>
                  <em>Or</em>
                </h4>
              </Divider>
              <form action="#">
                <fieldset>
                  <label htmlFor="login" className="">
                    Email Address
                  </label>
                  <input
                    id="login"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="password" className="password">
                    Password
                    <Link to="/resetPass">Forgot password?</Link>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>

                <SignInBtn>
                  <button onClick={signIn}>Sign in</button>
                </SignInBtn>
                <div style={{ marginTop: "1.5rem" }}>
                  Not a member? <Link to="/signup">Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </FormContainer>
      </Container>
    </Section>
  );
}

export default Signin;

const Divider = styled.div`
  height: 2rem;
  width: 100%;
  margin: 1rem auto;
  border-bottom: 0.5px solid #e6e0e0;
  border-top: 0.5px solid #e6e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    color: gray;
    font-weight: normal;
  }
`;

const GoogleBtn = styled.div`
  align-items: center;
  button {
    padding: 0.7rem 0;
    width: 100%;
    cursor: pointer;
    border: none;
    background: #2a75f3;
    color: white;
    border-radius: 8px;
    outline: none;
    font-weight: 500;
    box-sizing: border-box;
    text-align: center;
    svg {
      vertical-align: middle;
    }
  }
`;
const FormContainer = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  @media (max-width: 990px) {
    width: 100vw;
  }
  .toggle {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .form-wrapper {
    background: ${(box) => box.theme.boxBackground};

    margin: 5rem auto;
    min-width: 40vw;
    border-radius: 1rem;
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: center;
    @media (max-width: 990px) {
      min-width: 90vw;
      margin: 1.5rem auto;
    }
    .form {
      min-width: 80%;

      a {
        font-weight: 500;
        font-size: 14px;
        color: #4f3cc9;
        text-decoration: none;
      }
      fieldset {
        border: none;
        margin: 1rem 0;
        padding: 0;
      }

      label {
        display: block;
        font-weight: bold;
        margin: 14px 0 4px;
        color: ${(font) => font.theme.fontColor};

        a {
          font-weight: normal;
          float: right;
          position: relative;
          top: 6px;
          font-size: 14px;
          color: #4f3cc9;
          text-decoration: none;
        }
      }
      input {
        width: 100%;
        height: 2.5rem;
        font-size: 18px;
        outline: none;
        border: none;
        background: #e8f0fe;
        font-weight: 400;
        line-height: 24px;
        box-sizing: border-box;
        padding: 10px 16px;
        outline: none;
        border-radius: 8px;
      }
    }
  }
`;
const SignInBtn = styled.div`
  margin: 0.8rem auto;
  button {
    padding: 0.7rem 6rem;
    cursor: pointer;
    border: none;
    background: #ea4c89;
    color: white;
    border-radius: 8px;
    outline: none;
    font-weight: 500;
    box-sizing: border-box;
    text-align: center;
    &:hover,
    &:focus {
      background: #ed6398;
    }
  }
`;

const Section = styled.section`
  color: ${(font) => font.theme.fontColor};
`;

const Container = styled.div`
  display: flex;
`;
const Title = styled.div`
  margin-bottom: 1.6rem;
  h1 {
    font-style: italic;
  }
`;

const ImageContainer = styled.div`
  flex-grow: 1;
  max-width: 35vw;
  background: #f1cdd7;
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
