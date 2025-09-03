import styled from "styled-components";

export function Finances() {
  return (
    <Container>
      <h1>Financeiro</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  border: 2px solid #FF0000;
  background: transparent;
  color: #00FF00;
  border-radius: 8px;
  font-size: 1rem;
  transition: 0.2s;

  &:hover {
    background: #0000FF;
    color: white;
  }
`;
