import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";
import { CustomAlert } from "../../components/CustomAlert";
import { useState } from "react";

export function Home() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  return (
    <Container>
      <Sidebar onShowSuccessAlert={() => setShowSuccessAlert(true)} />
      <CustomAlert
        open={showSuccessAlert}
        title="Sucesso!"
        message="PsicoBank ativado!"
        type={'success'}
        onClose={() => setShowSuccessAlert(false)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

