import { Typography, Box } from "@mui/material";
import { ReactComponent as Iago } from "../assets/images/psico-iago.svg";
import { MainButton } from "./MainButton";
import { colors } from "../styles/colors";
interface InstructionViewProps {
    onClick: () => void;
}

export function InstructionView({ onClick }: InstructionViewProps) {
    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
            sx={{ boxSizing: "border-box" }}
        >
            <Iago style={{ width: "100%", maxWidth: "300px", marginBottom: "1rem" }} />
            <Typography
                color={colors.textPrimary}
                fontSize={20}
                fontFamily="Roboto, Arial, sans-serif"
                fontWeight={700}
                variant="h6"
                gutterBottom>
                Olá!
            </Typography>
            <Typography
                color={colors.lighterText}
                fontSize={20}
                fontFamily="Roboto, Arial, sans-serif"
                fontWeight={500}
                variant="body1"
                gutterBottom
                align="center">
                Clique no botão para começar a<br />
                usar os benefícios financeiros<br />
                do PsicoManager!
            </Typography>
            <MainButton
                title="Ativar o PsicoBank"
                onClick={onClick}
                disabled={false}
            />
        </Box>
    );
}