import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BsFillCaretDownFill } from "react-icons/bs";
import { colors } from "../styles/colors";

const UserMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container ref={ref} onClick={() => setOpen((prev) => !prev)}>
      <Circle>AB</Circle>
      <BsFillCaretDownFill size={16} color={colors.secondary} />
      <Dropdown $open={open}>
        <DropdownItem>Perfil</DropdownItem>
        <DropdownItem>Configurações</DropdownItem>
        <DropdownItem>Sair</DropdownItem>
      </Dropdown>
    </Container>
  );
};

export default UserMenu;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.info};
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  user-select: none;
`;

const Dropdown = styled.ul<{ $open: boolean }>`
  position: absolute;
  top: 48px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: ${({ $open }) => ($open ? "block" : "none")};
  z-index: 100;
`;

const DropdownItem = styled.li`
  padding: 10px 15px;
  font-size: 14px;
  color: #999;
  cursor: not-allowed;
  &:hover {
    background: #f2f2f2;
  }
`;

