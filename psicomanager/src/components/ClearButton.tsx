import styled from "styled-components";
import { colors } from "../styles/colors";

interface ClearButtonProps {
    title: string;
    onClick: () => void;
}

export function ClearButton({ title, onClick }: ClearButtonProps) {
  return <BorderButton onClick={onClick}>{title}</BorderButton>;
}

const BorderButton = styled.button`
  min-width: 124px;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid ${colors.info};
  color: ${colors.info};
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  cursor: pointer;
`;