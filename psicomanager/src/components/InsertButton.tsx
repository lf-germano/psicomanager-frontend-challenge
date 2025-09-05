import styled from "styled-components";
import { colors } from "../styles/colors";
import { FiPlus } from "react-icons/fi";

interface InsertButtonProps {
    title: string;
    onClick: () => void;
}

export function InsertButton({ title, onClick }: InsertButtonProps) {
  return <BorderButton onClick={onClick}>
    <FiPlus fontSize={40} color={colors.accent} />
    {title}
    </BorderButton>;
}

const BorderButton = styled.button`
  min-width: 124px;
  padding: 0rem 2rem;
  background: transparent;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  border: 1px solid ${colors.accent};
  align-items: center;
  display: flex;
  color: ${colors.accent};
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  cursor: pointer;
`;