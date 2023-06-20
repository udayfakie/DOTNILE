import React from "react";
import Apis from "../Apis";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <div>
        <Logo to="/">DotNile</Logo>
      </div>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/service">Service</StyledNavLink>
      <StyledNavLink to="/documentation">Documentation</StyledNavLink>
      <StyledNavLink to="/about">About</StyledNavLink>

    </Container>
  );
};

export default Navbar;

const Container = styled.nav`
  background-color: black;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 6px;
`;
const StyledNavLink = styled(NavLink)`
  color: #fff;
  margin: 10px;
`;
const Logo = styled(NavLink)`
  color: yellow;
`;
