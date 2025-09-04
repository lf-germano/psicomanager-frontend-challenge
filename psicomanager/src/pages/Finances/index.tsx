import styled from "styled-components";
import { FiX } from "react-icons/fi";
import CustomStepper from "../../components/CustomStepper";
import { colors } from "../../styles/colors";
import RegisterAccount from "./pages/RegisterAccount";
import Channels from "./pages/Channels";
import PaymentType from "./pages/PaymentType";
import { useState } from "react";

type FinancesProps = {
  onClose?: () => void;
};

const steps = [
  "Cadastrar uma conta",
  "Canais de envio e Mensagem de cobrança",
  "Forma de pagamento da cobrança",
];

export function Finances({ onClose }: FinancesProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  const handleClear = () => {
    setActiveStep(0);
  };

  let PageContent;
  if (activeStep === 0) PageContent = <RegisterAccount />;
  else if (activeStep === 1) PageContent = <Channels />;
  else PageContent = <PaymentType />;

  return (
    <Container>
      <Header>
        <Title>Ativar o PsicoBank</Title>
        <CloseIcon onClick={onClose} title="Fechar" />
      </Header>
      <CustomStepper
        steps={steps}
        activeStep={activeStep}
        mainColor={colors.markerBlue}
        baseColor={colors.lightBlue}
        skeletonColor={colors.skeletonGray}
      />
      <Content>{PageContent}</Content>
      <Footer>
        <ClearButton onClick={handleCancel}>Cancelar</ClearButton>
        <MainButton onClick={handleNext} disabled={activeStep === steps.length - 1}>
          Próximo
        </MainButton>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2rem;
  width: 50rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CloseIcon = styled(FiX)`
  cursor: pointer;
  font-size: 2rem;
  color: ${colors.markerBlue};
`;

const Content = styled.div`
  flex: 1;
  margin: 2rem 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ClearButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid ${colors.lightBlue};
  color: ${colors.lightBlue};
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;

const MainButton = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${colors.markerBlue};
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
