import React from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Register(props) {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>REGISTRATION</h1>
      <Row className="flex-center">
        <Form>
          <Form.Control
            type="text"
            placeholder="username"
            style={{ marginBottom: "1rem" }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="password"
            style={{ marginBottom: "1rem" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => props.handleRegister({ username, password })}
          >
            Sign up
          </Button>
        </Form>
      </Row>
    </div>
  );
}