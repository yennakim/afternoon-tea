import React from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import logo from '../public/img/afternoonTeaLogo.png';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image
        src={logo}
        className="img"
        width={900}
        height={900}
        alt="Afternoon Tea Logo"
      />
      <Button
        variant="outline-success"
        type="button"
        size="lg"
        className="copy-btn"
        onClick={signIn}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
