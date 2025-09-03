import styled from "styled-components";

export function Navbar() {
  return (
    <Nav>
      <Logo>PsicoManager</Logo>
      <NavLinks>
        <a href="/">Início</a>
        <a href="/finances">Financeiro</a>
        <a href="/profile">Perfil</a>
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
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const NavLinks = styled.div`
  a {
    margin-left: 2rem;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #0077ff;
    }
  }
`;