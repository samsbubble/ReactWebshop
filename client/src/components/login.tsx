import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { useHistory } from "react-router-dom";


const LoginStyle = styled.div`
@media all and (min-width: 480px) {
    .Login {
      padding: 60px 0;
    }
  
    .Login form {
      margin: 0 auto;
      max-width: 420px;
    }
  }
`;


type FormData = {
    quizId: string;
    quizName: string;
  }
  
  type FormErrors = {
    email?: string;
    password?: string;
  }

export function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event : React.FormEvent) {
      event.preventDefault();
    }

    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(e.target.value);
        setErrors((prev) =>({ ...prev, ...validateEmail(value) }))
    }
  
    const validateEmail = (value: string) : FormErrors => {
        const regEmail : RegExp = /^[a-zA-z]+@[a-z]+.[a-z]+$/;
        if(!regEmail.test(value)) {
          return {email: "Not a valid email"};
        }
        return {email: undefined};
    }  

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(e.target.value);
        setErrors((prev) =>({ ...prev, ...validatePassword(value) }))
      }

    const validatePassword = (value: string) : FormErrors =>{
        if (password.length < 4) {
          return {password: "The password must be longer than 4"};
        } 
        return {password: undefined};
      }

    return (
        <LoginStyle>
        <Container className="justify-content-center">
            <div className="Login text-left" >
                <Form onSubmit={handleSubmit} >
                <h1>Log in</h1>
                <p>
                    Please enter your email and password to log in to your Pibu care account.
                </p>  <hr></hr>
                <Form.Group className="lg" controlId="email">
                    <Form.Label >Email</Form.Label>
                    <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={handleInputEmail}
                    />
                    {errors.email ? <span style={{color: "red"}}>{errors.email}</span> : null}
                </Form.Group>
                <Form.Group className="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    value={password}
                    onChange={handleInputPassword}
                    />
                    {errors.password ? <span style={{color: "red"}}>{errors.password}</span> : null}
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
                <Button block size="lg" className="btn-secondary" type="cancel" onClick={ () => history.goBack()}>
                    Cancel
                </Button>
                </Form>
            </div>
        </Container>
        </LoginStyle>
    );
  }
