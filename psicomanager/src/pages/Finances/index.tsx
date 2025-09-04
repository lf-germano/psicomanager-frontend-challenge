import styled from "styled-components";
import { FiX } from "react-icons/fi";
import CustomStepper from "../../components/CustomStepper";
import { colors } from "../../styles/colors";
import RegisterAccount from "./pages/RegisterAccount";
import Channels from "./pages/Channels";
import PaymentType from "./pages/PaymentType";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { ClearButton } from "../../components/ClearButton";
import { MainButton } from "../../components/MainButton";

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
        <CloseIcon color={colors.info} size={30} onClick={onClose} title="Fechar" />
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
        <ClearButton title="Cancelar" onClick={handleCancel} />
        <MainButton title="Próximo" onClick={handleNext} disabled={activeStep === steps.length - 1} />
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
  font-color: ${colors.textPrimary};
`;

const CloseIcon = styled(IoClose)`
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

