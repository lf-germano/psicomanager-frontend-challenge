import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import CustomStepper from "../../components/CustomStepper";
import { colors } from "../../styles/colors";
import RegisterAccount from "./pages/RegisterAccount";
import Channels from "./pages/Channels";
import PaymentType from "./pages/PaymentType";
import { UseFormReturn } from "react-hook-form";
import { accountSchema } from "../../utils/validators/accountSchema";
import { channelsSchema } from "../../utils/validators/channelsSchema";
import { paymentTypeSchema } from "../../utils/validators/paymentTypeSchema";
import { CustomAlert } from "../../components/CustomAlert";
import { useState } from "react";
import { ClearButton } from "../../components/ClearButton";
import { MainButton } from "../../components/MainButton";
import { z } from "zod";
import { PsicoBankForm } from "../../utils/validators/psicobankFormSchema";

type AccountFormValues = z.infer<typeof accountSchema>;

type FinancesProps = {
  onClose?: () => void;
  form: UseFormReturn<PsicoBankForm>;
  onSuccess: () => void; 
};

const steps = [
  "Cadastrar uma conta",
  "Canais de envio e Mensagem de cobrança",
  "Forma de pagamento da cobrança",
];

export function Finances({ onClose, form, onSuccess }: FinancesProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

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

  const handleFormSent = (data: AccountFormValues) => {
    console.log("Formulário completo enviado:", data);
    onSuccess();
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const result = await accountSchema.safeParseAsync(watch());
      if (!result.success) {
        setErrorAlertOpen(true);
        return;
      }
    } else if (activeStep === 1) {
      const result = await channelsSchema.safeParseAsync({ message: watch("message") });
      if (!result.success) {
        setErrorAlertOpen(true);
        return;
      }
    } else if (activeStep === 2) {
      const result = await paymentTypeSchema.safeParseAsync({
        paymentTypes: watch("paymentTypes"),
        chargeFine: watch("chargeFine"),
        fineValue: watch("fineValue"),
        chargeInterest: watch("chargeInterest"),
      });
      if (!result.success) {
        console.log(result.error.issues);
        setErrorAlertOpen(true);
        return;
      }
      console.log("Final validation passed");
      handleFormSent(watch());
      return;
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
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
        <MainButton title={activeStep == steps.length - 1 ? "Concluir" : "Próximo"} onClick={handleNext} disabled={false} />
      </Footer>
      <CustomAlert
        open={errorAlertOpen}
        title="Atenção!"
        message="Os campos obrigatórios não foram preenchidos"
        type={'error'}
        onClose={() => setErrorAlertOpen(false)}
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
  max-width: 100vw;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 1rem;
    width: 100vw;
    min-width: 0;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.textPrimary};

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const CloseIcon = styled(IoClose)`
  cursor: pointer;
  font-size: 2rem;
  color: ${colors.markerBlue};
`;

const Content = styled.div`
  flex: 1;
  margin: 2rem 0;

  @media (max-width: 600px) {
    margin: 1rem 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
    button {
      width: 100%;
    }
  }
`;

