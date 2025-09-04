import { Controller } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { colors } from "../../../styles/colors";
import { PersonType } from "../../../utils/enums/PersonType";
import { accountSchema } from "../../../utils/validators/accountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const Label = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: 500,
  marginBottom: 4,
}));

const Required = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  color: theme.palette.error.main,
  display: "inline",
}));

const WarningBox = styled(Box)(({ theme }) => ({
  background: colors.warning,
  borderRadius: 8,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
}));

const WarningTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: 700,
  color: colors.warningText,
  marginBottom: theme.spacing(1),
}));

const WarningItem = styled(Typography)(({ theme }) => ({
  color: colors.warningText,
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: 400,
  marginBottom: 2,
}));

type AccountForm = z.infer<typeof accountSchema>;

const PROFESSIONAL_OPTIONS = [
  { value: "joao_silva", label: "João Silva" },
];

const BANK_OPTIONS = [
  { value: "001", label: "Banco do Brasil" },
  { value: "237", label: "Bradesco" },
  { value: "104", label: "Caixa Econômica" },
  { value: "341", label: "Itaú" },
];

const ACCOUNT_TYPE_OPTIONS = [
  { value: "CONTA_CORRENTE", label: "Conta Corrente" },
  { value: "CONTA_POUPANCA", label: "Conta Poupança" },
];

const PERSON_TYPE_OPTIONS = [
  { value: "FISICA", label: "Pessoa Física" },
  { value: "JURIDICA", label: "Pessoa Jurídica" },
];

const STATE_OPTIONS = [
  { value: "SP", label: "São Paulo" },
  { value: "RJ", label: "Rio de Janeiro" },
];

type RegisterAccountProps = {
  register: any;
  control: any;
  watch: any;
  errors: any;
  setValue: any;
};

export function RegisterAccount({
  register,
  control,
  watch,
  errors,
  setValue,
}: RegisterAccountProps) {
  const personType = watch("personType");

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

        <WarningBox>
          <WarningTitle variant="subtitle1">
            Atenção!!! Verifique atentamente a cada dado preenchido no cadastro de sua conta.
          </WarningTitle>
          <WarningItem>
            • Caso queira cadastrar uma conta de banco CNPJ, verifique se a sua conta corrente é CNPJ e preencha o CPF correto do responsável da conta.
          </WarningItem>
          <WarningItem>
            • O preenchimento incorreto das informações pode trazer transtornos no momento da transferência do valor para essa conta corrente.
          </WarningItem>
          <WarningItem>
            • Se possível preencha com calma para não ocorrer erros.
          </WarningItem>
        </WarningBox>

        <Box display="flex" gap={2} mb={2}>
          <Box flex={1}>
            <Label>
              Profissional: <Required>*</Required>
            </Label>
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

        <Box display="flex" gap={2} mb={2}>
          <Box flex={1}>
            <Label>
              Banco <Required>*</Required>
            </Label>
            <FormControl fullWidth error={!!errors.bank} size="small">
              <Controller
                name="bank"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    size="small"
                    inputProps={{ "aria-label": "Banco" }}
                    renderValue={(selected) =>
                      selected ? BANK_OPTIONS.find(opt => opt.value === selected)?.label : "Selecione"
                    }
                  >
                    {BANK_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <Label>
              Tipo de Conta <Required>*</Required>
            </Label>
            <FormControl fullWidth error={!!errors.accountType} size="small">
              <Controller
                name="accountType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    size="small"
                    inputProps={{ "aria-label": "Tipo de Conta" }}
                    renderValue={(selected) =>
                      selected ? ACCOUNT_TYPE_OPTIONS.find(opt => opt.value === selected)?.label : "Selecione"
                    }
                  >
                    {ACCOUNT_TYPE_OPTIONS.map((opt) => (
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

        <Box display="flex" gap={2} mb={2}>
          <Box flex={1}>
            <Label>
              Agência <Required>*</Required>
            </Label>
            <TextField
              {...register("agency")}
              placeholder="0001"
              error={!!errors.agency}
              fullWidth
              size="small"
            />
          </Box>
          <Box flex={1}>
            <Label>
              Conta com Dígito <Required>*</Required>
            </Label>
            <TextField
              {...register("accountNumber")}
              placeholder="123456-7"
              error={!!errors.accountNumber}
              fullWidth
              size="small"
            />
          </Box>
        </Box>

        <Box display="flex" gap={2} mb={2}>
          <Box flex={1}>
            <Label>
              Tipo de Pessoa <Required>*</Required>
            </Label>
            <FormControl fullWidth size="small">
              <Controller
                name="personType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    displayEmpty
                    size="small"
                    inputProps={{ "aria-label": "Tipo de Pessoa" }}
                    renderValue={(selected) =>
                      selected ? PERSON_TYPE_OPTIONS.find(opt => opt.value === selected)?.label : "Selecione"
                    }
                  >
                    {PERSON_TYPE_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          {personType === "FISICA" ? (
            <>
              <Box flex={1}>
                <Label>
                  CPF <Required>*</Required>
                </Label>
                <TextField
                  {...register("cpf")}
                  placeholder="123.456.789-00"
                  error={!!errors.cpf}
                  fullWidth
                  size="small"
                />
              </Box>
              <Box flex={1}>
                <Label>
                  Telefone <Required>*</Required>
                </Label>
                <TextField
                  {...register("phone")}
                  placeholder="(34) 99999-9999"
                  error={!!errors.phone}
                  fullWidth
                  size="small"
                />
              </Box>
            </>
          ) : (
            <>
              <Box flex={1}>
                <Label>
                  CNPJ <Required>*</Required>
                </Label>
                <TextField
                  {...register("cnpj")}
                  placeholder="__.___.___/____-__"
                  error={!!errors.cnpj}
                  fullWidth
                  size="small"
                />
              </Box>
              <Box flex={1}>
                <Label>
                  Telefone <Required>*</Required>
                </Label>
                <TextField
                  {...register("phone")}
                  placeholder="(__) _____-____"
                  error={!!errors.phone}
                  fullWidth
                  size="small"
                />
              </Box>
            </>
          )}
        </Box>

        {personType === "FISICA" && (
          <Box mb={2}>
            <Label>
              Nome Completo <Required>*</Required>
            </Label>
            <TextField
              {...register("fullName")}
              placeholder="Digite aqui"
              error={!!errors.fullName}
              fullWidth
              size="small"
            />
          </Box>
        )}

        {personType === "JURIDICA" && (
          <Box display="flex" gap={2} mb={2}>
            <Box flex={1}>
              <Label>
                Nome do responsável pela conta <Required>*</Required>
              </Label>
              <TextField
                {...register("responsibleName")}
                placeholder="Digite aqui"
                error={!!errors.responsibleName}
                fullWidth
                size="small"
              />
            </Box>
            <Box flex={1}>
              <Label>
                CPF do responsável pela conta <Required>*</Required>
              </Label>
              <TextField
                {...register("responsibleCpf")}
                placeholder="___.___.___-__"
                error={!!errors.responsibleCpf}
                fullWidth
                size="small"
              />
            </Box>
          </Box>
        )}

        {personType === "JURIDICA" && (
          <Box mb={2}>
            <Label>
              Razão Social <Required>*</Required>
            </Label>
            <TextField
              {...register("companyName")}
              placeholder="Digite aqui"
              error={!!errors.companyName}
              fullWidth
              size="small"
            />
          </Box>
        )}

        <Box display="flex" gap={2} mb={2}>
          <Box flex={1}>
            <Label>
              CEP <Required>*</Required>
            </Label>
            <TextField
              {...register("cep")}
              placeholder="__.___-___"
              error={!!errors.cep}
              fullWidth
              size="small"
            />
          </Box>
          <Box flex={1}>
            <Label>
              Estado <Required>*</Required>
            </Label>
            <FormControl fullWidth error={!!errors.state} size="small">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    size="small"
                    inputProps={{ "aria-label": "Estado" }}
                    renderValue={(selected) =>
                      selected ? STATE_OPTIONS.find(opt => opt.value === selected)?.label : "Selecione"
                    }
                  >
                    {STATE_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <Label>
              Cidade <Required>*</Required>
            </Label>
            <TextField
              {...register("city")}
              placeholder="Digite aqui"
              error={!!errors.city}
              fullWidth
              size="small"
            />
          </Box>
        </Box>

        <Box display="flex" gap={2} mb={2}>
          <Box flex={2}>
            <Label>
              Endereço <Required>*</Required>
            </Label>
            <TextField
              {...register("address")}
              placeholder="Digite aqui"
              error={!!errors.address}
              fullWidth
              size="small"
            />
          </Box>
          <Box flex={1}>
            <Label>
              Número <Required>*</Required>
            </Label>
            <TextField
              {...register("number")}
              placeholder="Digite aqui"
              error={!!errors.number}
              fullWidth
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterAccount;