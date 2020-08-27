import React, { useState } from "react";
import { Row, Form, Button } from 'react-bootstrap';

export default function Login(props) {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>LOGIN</h1>
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
            variant="primary"
            onClick={() => props.handleLogin({ username, password })}
          >
            Login
          </Button>
        </Form>
      </Row>
    </div>
  );
}