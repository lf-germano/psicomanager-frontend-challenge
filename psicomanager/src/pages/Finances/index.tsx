import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import CustomStepper from "../../components/CustomStepper";
import { colors } from "../../styles/colors";
import RegisterAccount from "./pages/RegisterAccount";
import Channels from "./pages/Channels";
import PaymentType from "./pages/PaymentType";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../../utils/validators/accountSchema";
import Alert from "../../components/Alert";
import { useState } from "react";
import { ClearButton } from "../../components/ClearButton";
import { MainButton } from "../../components/MainButton";
import { PersonType } from "../../utils/enums/PersonType";
import { z } from "zod";

type AccountFormValues = z.infer<typeof accountSchema>;

type FinancesProps = {
  onClose?: () => void;
  form: UseFormReturn<AccountFormValues>;
};

const steps = [
  "Cadastrar uma conta",
  "Canais de envio e Mensagem de cobrança",
  "Forma de pagamento da cobrança",
];

export function Finances({ onClose, form }: FinancesProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = form;

  const collectErrorMessages = (errorsObj: any): string[] => {
    const messages: string[] = [];
    for (const key in errorsObj) {
      if (errorsObj[key]?.message) {
        messages.push(`${key}: ${errorsObj[key].message}`);
      }
      if (typeof errorsObj[key] === "object" && errorsObj[key] !== null && !Array.isArray(errorsObj[key])) {
        messages.push(...collectErrorMessages(errorsObj[key]));
      }
    }
    return messages;
  };

  const handleNext = async () => {
    console.log("handleNext");
    console.log("activeStep", activeStep);
    if (activeStep === 0) {
      const valid = await trigger();
      if (!valid) {
        const errorList = collectErrorMessages(errors);
        console.log("Validation errors:", errorList);
        setAlertOpen(true);
        return;
      }
    }
    if (activeStep === 1) {
      const message = watch("message") || "";
      const tempElem = document.createElement("div");
      tempElem.innerHTML = message;
      const plainText = tempElem.textContent || "";
      if (!plainText.trim()) {
        console.log("Validation error: message is empty");
        setAlertOpen(true);
        return;
      }
    }
    if (activeStep === steps.length - 1) {
      const formData = watch();
      console.log("Final form data:", formData);  
      if (onClose) onClose();
      return;
    }

    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleCancel = () => {
    if (activeStep === 0) {
      if (onClose) onClose();
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  let PageContent;
  if (activeStep === 0)
    PageContent = (
      <RegisterAccount
        register={register}
        control={control}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />
    );
  else if (activeStep === 1)
    PageContent = (
      <Channels
        register={register}
        control={control}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />
    );
  else PageContent = (
        <PaymentType 
        register={register}
        control={control}
        watch={watch}
        errors={errors}
        setValue={setValue}
        />
  );

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
        <MainButton title={activeStep == steps.length - 1 ? "Concluir" : "Próximo"} onClick={handleNext} disabled={activeStep === steps.length - 1} />
      </Footer>
      <Alert
        open={alertOpen}
        title="Atenção!"
        message="Os campos obrigatórios não foram preenchidos"
        onClose={() => setAlertOpen(false)}
      />
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

