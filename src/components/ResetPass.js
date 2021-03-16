import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

import { auth } from "../firebase";

function ResetPass({ children }) {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset link sent to your mail");
        history.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <Section>
      <Container>
        <div>
          <Toggler>{children}</Toggler>
          <FormContainer>
            <form>
              <label htmlFor="user_mail">Name: </label>
              <input
                type="mail"
                id="user_mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </form>
            <button onClick={handleClick}>Reset password</button>
            <Link to="/">Go to homePage</Link>
          </FormContainer>
        </div>
      </Container>
    </Section>
  );
}

export default ResetPass;

const Section = styled.section``;
const Container = styled.div`
  width: 70%;
  margin: 2rem auto;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
`;
const Toggler = styled.div`
  margin-bottom: 5rem;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  form {
    display: flex;
    label {
      display: block;
      font-weight: bold;
      margin: 14px 0 4px;
      color: ${(font) => font.theme.fontColor};
    }
    input {
      width: 100%;
      height: 2.5rem;
      font-size: 18px;
      border: none;
      border-bottom: 2px solid ${(font) => font.theme.fontColor};
      background: transparent;
      font-weight: 400;
      line-height: 24px;
      box-sizing: border-box;
    }
  }
  button {
    margin: 2rem;
    padding: 0.7rem 3rem;
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
  a{
    color: ${(font) => font.theme.fontColor};
    
  }
`;
