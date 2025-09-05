import { Controller } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { maskCPF, maskCNPJ, maskPhone, maskCEP, maskAgency, maskBankAccount, maskNumber } from "../../../utils/maskUtils";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { colors } from "../../../styles/colors";
import Grid from "@mui/material/Grid";

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

const DisabledLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 4,
  color: colors.textInactive,
}));

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
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
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

        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DisabledLabel>
              Profissional: <Required>*</Required>
            </DisabledLabel>
            <FormControl fullWidth error={!!errors.professional} size="small">
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
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, md: 6 }}>
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
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
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
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Label>
              Agência <Required>*</Required>
            </Label>
            <Controller
              name="agency"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={maskAgency(field.value || "")}
                  onChange={e => field.onChange(maskAgency(e.target.value))}
                  placeholder="0001"
                  error={!!errors.agency}
                  fullWidth
                  inputMode='numeric'
                  size="small"
                />)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Label>
              Conta com Dígito <Required>*</Required>
            </Label>
            <Controller
              name="accountNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={maskBankAccount(field.value || "")}
                  onChange={e => field.onChange(maskBankAccount(e.target.value))}
                  placeholder="123456-7"
                  error={!!errors.accountNumber}
                  fullWidth
                  size="small"
                />)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Label>
              Tipo de Pessoa <Required>*</Required>
            </Label>
            <FormControl fullWidth error={!!errors.personType} size="small">
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
          </Grid>
          {personType === "FISICA" ? (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <Label>
                  CPF <Required>*</Required>
                </Label>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={maskCPF(field.value || "")}
                      onChange={e => field.onChange(maskCPF(e.target.value))}
                      placeholder="123.456.789-00"
                      error={!!errors.cpf}
                      fullWidth
                      inputMode='numeric'
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Label>
                  Telefone <Required>*</Required>
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={maskPhone(field.value || "")}
                      onChange={e => field.onChange(maskPhone(e.target.value))}
                      placeholder="(99) 99999-9999"
                      error={!!errors.phone}
                      fullWidth
                      inputMode='numeric'
                      size="small"
                    />
                  )}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <Label>
                  CNPJ <Required>*</Required>
                </Label>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={maskCNPJ(field.value || "")}
                      onChange={e => field.onChange(maskCNPJ(e.target.value))}
                      placeholder="12.345.678/0001-90"
                      error={!!errors.cnpj}
                      fullWidth
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Label>
                  Telefone <Required>*</Required>
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={maskPhone(field.value || "")}
                      onChange={e => field.onChange(maskPhone(e.target.value))}
                      placeholder="(99) 99999-9999"
                      error={!!errors.phone}
                      fullWidth
                      inputMode='numeric'
                      size="small"
                    />
                  )}
                />
              </Grid>
            </>
          )}
        </Grid>

        {personType === "FISICA" && (
          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 12 }}>
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
            </Grid>
          </Grid>
        )}

        {personType === "JURIDICA" && (
          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 6 }}>
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
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Label>
                CPF do responsável pela conta <Required>*</Required>
              </Label>
              <Controller
                name="responsibleCpf"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="___.___.___-__"
                    value={maskCPF(field.value || "")}
                    onChange={e => field.onChange(maskCPF(e.target.value))}
                    error={!!errors.responsibleCpf}
                    fullWidth
                    size="small"
                  />
                )}
              />
            </Grid>
          </Grid>
        )}

        {personType === "JURIDICA" && (
          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 12 }}>
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
            </Grid>
          </Grid>
        )}

        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Label>
              CEP <Required>*</Required>
            </Label>
            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={maskCEP(field.value || "")}
                  onChange={e => field.onChange(maskCEP(e.target.value))}
                  placeholder="12345-678"
                  error={!!errors.cep}
                  fullWidth
                  inputMode='numeric'
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
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
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
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
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, md: 10 }}>
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
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Label>
              Número <Required>*</Required>
            </Label>
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={maskNumber(field.value || "")}
                  onChange={e => field.onChange(maskNumber(e.target.value))}
                  placeholder="Digite aqui"
                  error={!!errors.number}
                  fullWidth
                  inputMode='numeric'
                  size="small"
                />)}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterAccount;