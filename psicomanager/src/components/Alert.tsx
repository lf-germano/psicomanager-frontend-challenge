import { Box, Typography, Slide } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { colors } from "../styles/colors";
import { useEffect, useState } from "react";

type AlertProps = {
  open: boolean;
  title: string;
  message: string;
  onClose?: () => void;
};

export function Alert({ open, title, message, onClose }: AlertProps) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
    if (open) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Slide direction="left" in={show} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          top: 32,
          right: 32,
          zIndex: 9999,
          minWidth: 320,
          maxWidth: 400,
          bgcolor: colors.errorBackground,
          borderLeft: `6px solid ${colors.error}`,
          boxShadow: 3,
          display: "flex",
          alignItems: "flex-start",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Box sx={{ pr: 2, pt: 0.5 }}>
          <WarningAmberRoundedIcon sx={{ color: colors.error, fontSize: 32 }} />
        </Box>
        <Box>
          <Typography
            fontFamily="Roboto, Arial, sans-serif"
            fontWeight={700}
            color={colors.error}
            fontSize={18}
            mb={0.5}
          >
            {title}
          </Typography>
          <Typography
            fontFamily="Roboto, Arial, sans-serif"
            fontWeight={400}
            color={colors.error}
            fontSize={15}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Slide>
  );
}

export default Alert;