import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";

export function Home() {
  return (
    <Container>
      <Sidebar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

