import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

import { auth, database } from "../firebase";

//Image
import home from "../Images/Home2.png";

function Signup({ children, boxBackground, font }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [image, setImage] = useState(null);
  const [number, setNumber] = useState("");

  // let file = {};

  const signUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)

        .then((auth) => {
          // storage
          //   .ref(`users/ `)
          //   .put(file)
          //   .then(() => {
          //     console.log("file uploaded");
          //   });
          auth.user.updateProfile({ displayName: name, phoneNumber: +number });
          auth.user.sendEmailVerification();
          database.collection("users").doc(auth.user.uid).set({
            name: name,
            userName: userName,
            phoneNumber: number,
          });
          history.push("/verifyUser");
        })
        .catch((error) => alert(error.message));
    }
  };
  // console.log(` image: ${image}`);

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
                Sign up to <em>XYZ</em>
              </Title>
              <form>
                <div className="form-field-group">
                  <div className="form-field">
                    <fieldset className="user_name">
                      <label htmlFor="user_name">Name</label>
                      <input
                        autoComplete="name"
                        type="text"
                        id="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="form-field">
                    <fieldset className="user_login">
                      <label htmlFor="user_login">Username</label>
                      <input
                        autoCorrect="off"
                        autoCapitalize="off"
                        type="text"
                        id="user_login"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="form-field">
                  <fieldset className="user_email">
                    <label htmlFor="user_email">Email</label>
                    <input
                      type="email"
                      id="user_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </fieldset>
                  <fieldset className="phone_num">
                    <label htmlFor="user_number">Ph. Number</label>
                    <input
                      type="tel"
                      id="user_number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      required
                    />
                  </fieldset>
                </div>
                <div className="form-field">
                  <fieldset className="user_password">
                    <label htmlFor="user_password">Password</label>
                    <input
                      type="password"
                      id="user_password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-field">
                    <label htmlFor="confirm_user_password">
                      Confirm password
                    </label>
                    <input
                      type="text"
                      id="confirm_user_password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </fieldset>
                </div>
                <div className="form-field">
                  <fieldset>
                    <label htmlFor="photo">Upload a photo</label>
                    <input
                      style={{ background: "transparent", paddingLeft: "0" }}
                      id="photo"
                      type="file"
                      onChange={(e) => e.target.files[0]}
                    ></input>
                  </fieldset>
                </div>
              </form>
              <Button>
                <button onClick={signUp}>Sign Up</button>
              </Button>
              <div style={{ marginTop: "1.2rem" }}>
                Already a member? <Link to="/">Sign In</Link>
              </div>
            </div>
          </div>
        </FormContainer>
      </Container>
    </Section>
  );
}

export default Signup;

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
    margin: 0.8rem auto;
    min-width: 40vw;
    border-radius: 1rem;
    padding: 1rem 1rem 1rem 0.4rem;
    display: flex;
    justify-content: center;
    @media (max-width: 990px) {
      min-width: 90vw;
      margin: 1.5rem auto;
    }
    .form {
      min-width: 80%;

      .form-field-group {
        display: flex;
        justify-content: space-between;
        .form-field {
          width: 48%;
        }
      }
      a {
        font-weight: 500;
        font-size: 14px;
        color: #4f3cc9;
        text-decoration: none;
      }
      fieldset {
        border: none;
        margin: 0.1rem 0;
        padding: 0;
        @media (max-width: 990px) {
          margin: 0 0.5rem;
        }
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
const Button = styled.div`
  margin: 1rem auto;
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
  }
`;

const Section = styled.section`
  color: ${(font) => font.theme.fontColor};
`;

const Container = styled.div`
  display: flex;
`;
const Title = styled.h1`
  /* color: ${(props) => props.theme.fontColor}; */
  font-style: italic;
`;

const ImageContainer = styled.div`
  flex-grow: 1;
  max-width: 35vw;
  background: #f2d184;
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
