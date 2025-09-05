import { Controller } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { colors } from "../../../styles/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const Label = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: 14,
  fontWeight: 700,
  marginBottom: 4,
}));

const DisabledLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 4,
  color: colors.textInactive,
}));

const SecondaryTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: 600,
  fontSize: 18,
}));

const Required = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  color: theme.palette.error.main,
  display: "inline",
}));

const WarningBox = styled(Box)(({ theme }) => ({
  background: colors.infoBackground,
  borderRadius: 8,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  display: "flex",
  alignItems: "center",
}));

const PROFESSIONAL_OPTIONS = [
  { value: "joao_silva", label: "João Silva" },
];

type PaymentTypeProps = {
  register: any;
  control: any;
  watch: any;
  errors: any;
  setValue: any;
};

export function PaymentType({
  register,
  control,
  watch,
  errors,
  setValue,
}: PaymentTypeProps) {
  const chargeFine = watch("chargeFine");

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 2 }}>
        <Typography
          fontFamily="Roboto, Arial, sans-serif"
          fontWeight={700}
          fontSize={22}
          mb={2}
        >
          Preencha os itens a seguir para configurar o PsicoBank
        </Typography>

       <Box display="flex" gap={2} mb={2}>
                 <Box flex={1}>
                   <DisabledLabel>
                     Profissional: <Required>*</Required>
                   </DisabledLabel>
                   <FormControl fullWidth>
                     <Controller
                       name="professional"
                       control={control}
                       render={({ field }) => (
                         <Select
                           {...field}
                           disabled
                           value={field.value}
                           displayEmpty
                           inputProps={{ "aria-label": "Profissional" }}
                           size="small"
                           style={{ backgroundColor: colors.skeletonGray }}
                         >
                           {PROFESSIONAL_OPTIONS.map((opt) => (
                             <MenuItem key={opt.value} value={opt.value}>
                               {opt.label}
                             </MenuItem>
                           ))}
                         </Select>
                       )}
                     />
                   </FormControl>
                 </Box>
               </Box>
       
               <Box mb={2}>
                 <SecondaryTitle>Forma de pagamento da cobrança</SecondaryTitle>
               </Box>
       
               <WarningBox>
                 <Typography fontFamily="Roboto, Arial, sans-serif" fontWeight={500} fontSize={14} sx={{ color: colors.infoText}}>
                 Escolha quais as opções de pagamento que estarão disponíveis para o seu cliente no link das mensagens de cobrança;  
                 </Typography>
               </WarningBox>

        <Box mb={2}>
          <Label>
            Disponibilizar meios de pagamento: <Required>*</Required>
          </Label>
          <FormGroup>
            <Controller
              name="paymentTypes.pix"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: colors.primary }}
                      checked={!!field.value}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                  }
                  label="Pix"
                />
              )}
            />
            <Controller
              name="paymentTypes.card"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: colors.primary }}
                      checked={!!field.value}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                  }
                  label="Cartão"
                />
              )}
            />
            <Controller
              name="paymentTypes.bankSlip"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: colors.primary }}
                      checked={!!field.value}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                  }
                  label="Boleto bancário"
                />
              )}
            />
          </FormGroup>
        </Box>

        <Box mb={2}>
          <Label>Definir multas e juros para todos os boletos após o vencimento</Label>
          <FormControlLabel
            control={<Checkbox style={{color: colors.primary}} {...register("chargeFine")} />}
            label="Cobrar multa"
          />
          <Typography marginTop={2} fontSize={16} color={colors.textPrimary}>
            Valor da multa em %:
          </Typography>
          <Controller
            name="fineValue"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                placeholder="0,00"
                disabled={!chargeFine}
                fullWidth={false}
                size="small"
                error={!!errors.valorMulta}
                sx={{ mt: 1 }}
              />
            )}
          />
        </Box>

        <Box mb={2}>
          <FormControlLabel
            control={<Checkbox style={{color: colors.primary}} {...register("chargeInterest")} />}
            label="Cobrar juros por dia de atraso (valor 1% ao mês)"
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default PaymentType;
