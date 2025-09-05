import { useRef, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import TitleIcon from "@mui/icons-material/Title";
import { colors } from "../../../styles/colors";
import { InsertButton } from "../../../components/InsertButton";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const SecondaryTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: 600,
  fontSize: 18,
}));

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

type ChannelsProps = {
  register: any;
  control: any;
  watch: any;
  errors: any;
  setValue: any;
};

export function Channels({ register, control, watch, errors, setValue }: ChannelsProps) {
  const professional = watch("professional");
  const [dynamicMark, setDynamicMark] = useState<string>("");
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [isEmpty, setIsEmpty] = useState(true);

  const DYNAMIC_OPTIONS = [
    { value: "NOME_CLIENTE", label: "Nome do Cliente", token: "{{NOME_CLIENTE}}" },
    { value: "CPF_CLIENTE", label: "CPF do Cliente", token: "{{CPF_CLIENTE}}" },
    { value: "TELEFONE_CLIENTE", label: "Telefone do Cliente", token: "{{TELEFONE_CLIENTE}}" },
  ];

  useEffect(() => {
    if (typeof watch("message") === "undefined") {
      setValue("message", "");
    }
  }, [setValue, watch]);

  const onEditorInput = () => {
    const html = editorRef.current?.innerHTML ?? "";
    const plainText = editorRef.current?.textContent ?? "";
    setValue("message", html, { shouldValidate: true, shouldDirty: true });
    setIsEmpty(plainText.trim() === "");
  };

  const exec = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value || undefined);
    onEditorInput();
    editorRef.current?.focus();
  };

  const formatHeading = (tag: string) => {
    if (tag === "P") exec("formatBlock", "<p>");
    else exec("formatBlock", `<${tag.toLowerCase()}>`);
  };

  const insertLink = () => {
    const url = window.prompt("Insira a URL:");
    if (url) {
      exec("createLink", url);
    }
  };

  const insertTokenAtCursor = (token: string) => {
    const el = editorRef.current;
    if (!el) return;

    try {
      el.focus();
      const successful = document.execCommand("insertText", false, token);
      if (!successful) {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
          el.appendChild(document.createTextNode(token));
        } else {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          const node = document.createTextNode(token);
          range.insertNode(node);
          range.setStartAfter(node);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    } catch (e) {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) {
        el.appendChild(document.createTextNode(token));
      } else {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const node = document.createTextNode(token);
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }

    onEditorInput();
  };

  const handleInsertClick = () => {
    if (!dynamicMark) return;
    const opt = DYNAMIC_OPTIONS.find((o) => o.value === dynamicMark);
    if (opt) insertTokenAtCursor(opt.token);
  };

  const insertBullet = () => {
    document.execCommand("insertUnorderedList");
    onEditorInput();
  };

  const insertNumbered = () => {
    document.execCommand("insertOrderedList");
    onEditorInput();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 2 }}>
        {/* Hidden controller to register message field */}
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <Typography fontFamily="Roboto, Arial, sans-serif" fontWeight={700} fontSize={22} mb={2}>
          Preencha os itens a seguir para configurar o PsicoBank
        </Typography>

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

        <Box mb={2}>
          <SecondaryTitle>Enviar cobrança por email:</SecondaryTitle>
        </Box>

        <WarningBox>
          <Typography fontFamily="Roboto, Arial, sans-serif" fontWeight={500} fontSize={14} sx={{ color: colors.infoText}}>
            Esse é a mensagem por e-mail que seus clientes irão receber. Clique no campo de texto para editar o conteúdo da mensagem e depois siga para o próximo passo. 
          </Typography>
        </WarningBox>

        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <Box flex={1}>
            <Label>Marcação dinâmica</Label>
            <Box display="flex" gap={2} alignItems="center" mb={2}>
            <FormControl fullWidth size="small">
              <Select
                value={dynamicMark}
                onChange={(e) => setDynamicMark(e.target.value as string)}
                inputProps={{ "aria-label": "Marcação dinâmica" }}
                renderValue={(selected) =>
                  selected
                    ? DYNAMIC_OPTIONS.find((o) => o.value === selected)?.label
                    : "Marcação dinâmica"
                }
              >
                {DYNAMIC_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <InsertButton title="Inserir" onClick={handleInsertClick} />
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap={2} alignItems="center" mb={2}>
          {/* ...other fields if any... */}
        </Box>

        <Box mb={1}>
          <Label>Conteúdo da mensagem:</Label>
        </Box>

        <Box
          sx={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 1,
            overflow: "hidden",
            mb: 1,
            background: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 0.5 }}>
            <Tooltip title="Desfazer">
              <IconButton size="small" onClick={() => exec("undo")}>
                <UndoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refazer">
              <IconButton size="small" onClick={() => exec("redo")}>
                <RedoIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Formato">
              <IconButton size="small" onClick={() => {  }}>
                <TitleIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                size="small"
                displayEmpty
                value=""
                onChange={(e) => {
                  const tag = (e.target.value as string) || "P";
                  formatHeading(tag);
                }}
                renderValue={() => "Formato"}
              >
                <MenuItem value="P" style={{ fontSize: 14 }}>
                  Parágrafo
                </MenuItem>
                <MenuItem value="H1" style={{ fontSize: 24, fontWeight: "bold" }}>
                  Título 1
                </MenuItem>
                <MenuItem value="H2" style={{ fontSize: 20, fontWeight: "bold" }}>
                  Título 2
                </MenuItem>
                <MenuItem value="H3" style={{ fontSize: 18, fontWeight: "bold" }}>
                  Título 3
                </MenuItem>
                <MenuItem value="H4" style={{ fontSize: 16, fontWeight: "bold" }}>
                  Título 4
                </MenuItem>
                <MenuItem value="H5" style={{ fontSize: 14, fontWeight: "bold" }}>
                  Título 5
                </MenuItem>
                <MenuItem value="H6" style={{ fontSize: 12, fontWeight: "bold" }}>
                  Título 6
                </MenuItem>
              </Select>
            </FormControl>

            <Tooltip title="Negrito">
              <IconButton size="small" onClick={() => exec("bold")}>
                <FormatBoldIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Itálico">
              <IconButton size="small" onClick={() => exec("italic")}>
                <FormatItalicIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Alinhar à esquerda">
              <IconButton size="small" onClick={() => exec("justifyLeft")}>
                <FormatAlignLeftIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Centralizar">
              <IconButton size="small" onClick={() => exec("justifyCenter")}>
                <FormatAlignCenterIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Alinhar à direita">
              <IconButton size="small" onClick={() => exec("justifyRight")}>
                <FormatAlignRightIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Lista desordenada">
              <IconButton size="small" onClick={insertBullet}>
                <FormatListBulletedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Lista ordenada">
              <IconButton size="small" onClick={insertNumbered}>
                <FormatListNumberedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Inserir link">
              <IconButton size="small" onClick={insertLink}>
                <LinkIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ p: 1 }}>
            <Box
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={onEditorInput}
              onBlur={onEditorInput}
              tabIndex={0}
              style={{
                minHeight: 180,
                outline: "none",
                padding: 8,
                borderRadius: 4,
                border: "1px solid rgba(0,0,0,0.06)",
                background: "#fff",
                fontFamily: "Roboto, Arial, sans-serif",
                fontSize: 14,
              }}
            >
              {isEmpty && (
                <Box sx={{ color: "rgba(0,0,0,0.4)" }}>
                  Digite o conteúdo do e-mail aqui. Você pode inserir marcações dinâmicas com o botão "+ Inserir".
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Channels;
