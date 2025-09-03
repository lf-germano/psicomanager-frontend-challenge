import styled from "styled-components";
import { ReactComponent as HeaderLogo } from "../assets/images/header-logo.svg";
import { colors } from "../styles/colors";
import SearchBar from "./Searchbar";
import UserMenu from "./UserMenu";
import { ReactComponent as BellIcon } from "../assets/icons/bell-icon.svg";
import { ReactComponent as CameraIcon } from "../assets/icons/camera-icon.svg";

export function Navbar() {
  return (
    <Nav>
      <LeftSection>
      <Logo>
        <HeaderLogo style={{ height: "32px" }} />
      </Logo>
      <SearchBar />
      </LeftSection>
      <NavLinks>
        <CameraIcon />
        <BellIcon />
        <UserMenu />
      </NavLinks>
    </Nav>
  );
}

const Nav = styled.nav`
  width: 100%;
  background: #f5f5f5;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.border};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #0077ff;
    }
  }
`;