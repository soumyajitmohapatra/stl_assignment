import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

function MailPrompt() {
  const history = useHistory();

  const [counter, setCounter] = useState(20);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    counter > 1 &&
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
  }, [counter]);

  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 20000);
    return () => clearTimeout(timing);
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      history.push("/");
    }, 27000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [history]);
  return (
    <Section>
      <Container>
        <h1>
          {loading ? (
            <>
              <h2>Sending Verification Link in {counter} sec </h2>
            </>
          ) : (
            <>
              <div>
                <h1>Verification link has been sent to your email-Id</h1>
                <Link to="/">Go to Homepage</Link>
              </div>
            </>
          )}
        </h1>
      </Container>
    </Section>
  );
}

export default MailPrompt;

const Section = styled.section``;

const Container = styled.div`
  width: 50%;
  margin: 10rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
