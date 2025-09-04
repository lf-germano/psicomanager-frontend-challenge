import styled from "styled-components";
import { colors } from "../styles/colors";

interface MainButtonProps {
    title: string;
    disabled: boolean;
    onClick: () => void;
}

export function MainButton({ title, onClick, disabled }: MainButtonProps) {
  return <BorderButton onClick={onClick} disabled={disabled}>{title}</BorderButton>;
}

const BorderButton = styled.button<{ disabled: boolean }>`
  min-width: 124px;
  padding: 0.75rem 1.5rem;
  background: ${colors.markerBlue};
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;