import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  styled,
} from "@mui/material";
import { IoMdCheckmark } from "react-icons/io";
import { colors } from "../styles/colors";

interface CustomStepperProps {
  activeStep: number;
  steps: string[];
  mainColor: string; 
  baseColor: string; 
  skeletonColor: string;
}

const CustomStepConnector = styled(StepConnector)<{ skeletonColor: string }>(
  ({ skeletonColor }) => ({
    "&.MuiStepConnector-root": {
      zIndex: 0,
    },
    "& .MuiStepConnector-line": {
      height: 4,
      border: "none",
      backgroundColor: skeletonColor, 
      borderRadius: 2,
      marginLeft: "-15px", 
      marginRight: "-15px", 
    },
  })
);

const CustomStepper: React.FC<CustomStepperProps> = ({
  activeStep,
  steps,
  mainColor,
  baseColor,
  skeletonColor,
}) => {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<CustomStepConnector skeletonColor={skeletonColor} />}
      sx={{ width: "100%" }}
    >
      {steps.map((label, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <Step key={label} completed={isCompleted}>
            <StepLabel
              StepIconComponent={() => {
                if (isCompleted) {
                  return (
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: baseColor,
                        border: `3px solid ${mainColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1, 
                      }}
                    >
                      <IoMdCheckmark
                        style={{ color: mainColor, fontSize: 20 }}
                      />
                    </div>
                  );
                }

                if (isActive) {
                  return (
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: baseColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          backgroundColor: skeletonColor,
                          zIndex: 1,
                        }}
                      />
                    </div>
                  );
                }
                
                return (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor: skeletonColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        backgroundColor: baseColor,
                      }}
                    />
                  </div>
                );
              }}
            >
              <span
                style={{
                  color: isCompleted
                    ? mainColor
                    : isActive
                    ? colors.textPrimary
                    : colors.textInactive,
                  fontSize: "16px",
                  maxWidth: "90px",
                  fontWeight: isActive || isCompleted ? 700 : 400,
                  fontFamily: 'Desktop/Body 4 Bold'
                }}
              >
                {label}
              </span>
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default CustomStepper;
