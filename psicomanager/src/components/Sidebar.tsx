import { useState } from "react";
import { Finances } from "../pages/Finances";
import styled, { css } from "styled-components";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { colors } from "../styles/colors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../utils/validators/accountSchema";
import { z } from "zod";
import { PersonType } from "../utils/enums/PersonType";
import { InstructionView } from "./InstructionView";

type AccountFormValues = z.infer<typeof accountSchema>;

export function Sidebar() {
  const [active, setActive] = useState<string>("finances");
  const [showFinances, setShowFinances] = useState(false);
  const [showFinanceButton, setShowFinanceButton] = useState(active === "finances");

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    mode: "onChange",
    defaultValues: {
      professional: "joao_silva",
      bank: "",
      accountType: "",
      agency: "",
      accountNumber: "",
      personType: PersonType.FISICA,
      phone: "",
      cep: "",
      state: "",
      city: "",
      address: "",
      number: "",
      cpf: "",
      cnpj: "",
      responsibleName: "",
      responsibleCpf: "",
      message: "", 
      fullName: "",
      companyName: "",
    },
  });

  const handleIconClick = (name: string) => {
    setActive(name);
    if (name === "finances") {
      setShowFinanceButton(true);
    } else {
      setShowFinanceButton(false);
    }
  };

  const handleCloseModal = () => {
    setShowFinances(false);
    setShowFinanceButton(true); 
  };

  return (
    <>
      <SideNav>
        <IconButton
          active={active === "dashboard"}
          onClick={() => handleIconClick("dashboard")}
          title="Painel"
        >
          <FaTachometerAlt color={active === "dashboard" ? "#fff" : colors.textPrimary} size={22} />
          <IconText active={active === "dashboard"}>Painel</IconText>
        </IconButton>
        <IconButton
          active={active === "clients"}
          onClick={() => handleIconClick("clients")}
          title="Clientes"
        >
          <FaUsers color={active === "clients" ? "#fff" : colors.textPrimary} size={22} />
          <IconText active={active === "clients"}>Clientes</IconText>
        </IconButton>
        <IconButton
          active={active === "agenda"}
          onClick={() => handleIconClick("agenda")}
          title="Agenda"
        >
          <FaCalendarAlt color={active === "agenda" ? "#fff" : colors.textPrimary} size={22} />
          <IconText active={active === "agenda"}>Agenda</IconText>
        </IconButton>
        <IconButton
          active={active === "finances"}
          onClick={() => handleIconClick("finances")}
          title="Financeiro"
        >
          <FaMoneyBillAlt color={active === "finances" ? "#fff" : colors.textPrimary} size={22} />
          <IconText active={active === "finances"}>Financeiro</IconText>
        </IconButton>
        <IconButton
          active={active === "reports"}
          onClick={() => handleIconClick("reports")}
          title="Relatórios"
        >
          <FaFileAlt color={active === "reports" ? "#fff" : colors.textPrimary} size={22} />
          <IconText active={active === "reports"}>Relatórios</IconText>
        </IconButton>
        <IconButton
          active={active === "marketing"}
          onClick={() => handleIconClick("marketing")}
          title="Marketing"
        >
          <FaBullhorn color={active === "marketing" ? "#fff" : colors.textPrimary} size={22} />
          <IconText active={active === "marketing"}>Marketing</IconText>
        </IconButton>
        <IconButton
          active={active === "settings"}
          onClick={() => handleIconClick("settings")}
          title="Configuração"
        >
          <MdSettings color={active === "settings" ? "#fff" : colors.textPrimary} size={22} />
          <IconText active={active === "settings"}>Configuração</IconText>
        </IconButton>
        <IconButton
          active={active === "clinic"}
          onClick={() => handleIconClick("clinic")}
          title="Minha Clínica"
        >
          <FaBuilding color={active === "clinic" ? "#fff" : colors.textPrimary} size={22} />
          <IconText active={active === "clinic"}>Minha clínica</IconText>
        </IconButton>
        {/* Add more icons here */}
      </SideNav>
      
      {/* When finances is active, show a button that opens the Finances modal */}
      {showFinanceButton && (
        <InstructionView onClick={() => { setShowFinances(true); }} />
      )}

      {showFinances && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Finances onClose={handleCloseModal} form={form} />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const SideNav = styled.div`
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px; 
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 8px 0 8px; 
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  border-right: 1px solid ${colors.border};
  z-index: 100;
`;

const IconButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-size: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  padding: 1rem 0; 
  ${({ active }) =>
    active &&
    css`
      background: ${colors.accent};
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    `}
  &:hover {
    background: #e0e0e0;
    border-radius: 8px;
  }
  &:focus {
    background: ${colors.accent};
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
`;

const FinanceButton = styled.button`
  margin: 1rem;
  padding: 0.75rem 1.25rem;
  background: ${colors.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 400px;
  min-height: 300px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
`;

const IconText = styled.p<{ active?: boolean }>`
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
  margin-top: 0.12rem;
  text-align: center;
  color: ${({ active }) => (active ? "#fff" : colors.textPrimary)};
`;