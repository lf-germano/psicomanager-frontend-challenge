import { Box, Typography, Slide } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { colors } from "../styles/colors";
import { useEffect, useState } from "react";

type CustomAlertProps = {
  open: boolean;
  title: string;
  message: string;
  type: "error" | "success"
  onClose?: () => void;
};

export function CustomAlert({ open, title, message, type, onClose }: CustomAlertProps) {
  const [show, setShow] = useState(open);
  const backgroundColor = type === "error" ? colors.errorBackground : colors.successBackground;
  const mainColor = type === "error" ? colors.error : colors.success;
  
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
          bgcolor: backgroundColor,
          borderLeft: `6px solid ${mainColor}`,
          boxShadow: 3,
          display: "flex",
          alignItems: "flex-start",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Box alignContent={"center"} height={"auto"} sx={{ pr: 2, pt: 0.5 }}>
          {type == "error" ?
          <WarningIcon sx={{ color: colors.error, fontSize: 32 }} />
          :
          <CheckCircleIcon sx={{ color: colors.success, fontSize: 32 }} />
          }
        </Box>
        <Box>
          <Typography
            fontFamily="Roboto, Arial, sans-serif"
            fontWeight={500}
            color={mainColor}
            fontSize={18}
            mb={0.5}
          >
            {title}
          </Typography>
          <Typography
            fontFamily="Roboto, Arial, sans-serif"
            fontWeight={400}
            color={mainColor}
            fontSize={15}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Slide>
  );
}

export default CustomAlert;