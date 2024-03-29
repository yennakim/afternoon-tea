/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import logo from '../public/img/afternoonTeaLogo.png';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="color">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image
              src={logo}
              className="img"
              width={75}
              height={75}
              alt="Afternoon Tea Logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto color">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Teas</Nav.Link>
            </Link>
            <Link passHref href="/teaParty">
              <Nav.Link>Tea Parties</Nav.Link>
            </Link>
            <Link passHref href="/addTea">
              <Nav.Link>Add Tea</Nav.Link>
            </Link>
            <Link href="/food/addFood" passHref>
              <Nav.Link>Add Food</Nav.Link>
            </Link>
            <Link passHref href="/myPosts">
              <Nav.Link>My Posts</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
