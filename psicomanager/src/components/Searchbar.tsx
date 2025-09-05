import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { HiSearch } from "react-icons/hi";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useMediaQuery } from "react-responsive"; 

const mockClients = [
  "Lucas Germano",
  "Amanda Silva",
  "Bruno Oliveira",
  "Carla Souza",
  "Daniel Ferreira",
  "Eduarda Mendes",
];

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ maxWidth: 600 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]);

  const filteredClients = query
    ? mockClients.filter((client) =>
        client.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleArrowClick = () => {
    if (!query) {
      setShowSuggestions(true);
    }
  };

  const handleMobileExpand = () => {
    if (isMobile && !isMobileExpanded) {
      setIsMobileExpanded(true);
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      if (isMobile) setIsMobileExpanded(false);
    }, 150);
  };

  return (
    <Container ref={containerRef} $isMobile={isMobile}>
      <SearchWrapper
        $isMobile={isMobile}
        $isMobileExpanded={isMobileExpanded}
        onClick={handleMobileExpand}
      >
        <HiSearch size={22} color={colors.info} style={{ marginRight: 2 }} />
        {(!isMobile || isMobileExpanded) && (
          <Input
            type="text"
            placeholder="Buscar clientes"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
            autoFocus={isMobile && isMobileExpanded}
          />
        )}
        <IconButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleArrowClick();
            if (isMobile && !isMobileExpanded) setIsMobileExpanded(true);
          }}
        >
          <BsFillCaretDownFill size={22} color={colors.info} />
        </IconButton>
      </SearchWrapper>

      {showSuggestions && (
        <SuggestionsBox>
          {(query
            ? filteredClients
            : [...mockClients].sort((a, b) => a.localeCompare(b))
          ).map((client, idx) => (
            <SuggestionItem
              key={idx}
              onMouseDown={() => {
                setQuery(client);
                setShowSuggestions(false);
                if (isMobile) setIsMobileExpanded(false);
              }}
            >
              {client}
            </SuggestionItem>
          ))}
        </SuggestionsBox>
      )}
    </Container>
  );
};

const Container = styled.div<{ $isMobile?: boolean }>`
  position: relative;
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  max-width: 200px;
`;

const SearchWrapper = styled.div<{
  $isMobile?: boolean;
  $isMobileExpanded?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1.5px solid ${colors.border};
  border-radius: 10px;
  padding: 0px 10px;
  background: white;
  width: ${({ $isMobile, $isMobileExpanded }) =>
    $isMobile && !$isMobileExpanded ? "48px" : "100%"};
  min-width: 48px;
  transition: width 0.2s;
  cursor: ${({ $isMobile, $isMobileExpanded }) =>
    $isMobile && !$isMobileExpanded ? "pointer" : "default"};
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 0; 
  padding: 5px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  text-align: left;
  &::placeholder {
    color: ${colors.info};
    font-weight: 500;
    font-family: "Roboto", sans-serif;
  }
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const SuggestionsBox = styled.ul`
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  max-height: 150px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
  }
`;

export default SearchBar;
