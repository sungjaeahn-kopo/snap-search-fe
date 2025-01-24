"use client"

import { Container } from "@mui/material";
import { useRouter } from 'next/navigation';
import styled from "styled-components";
interface HeaderProps {
  platformName: string;
}

const PlatformTitle = styled.div`
  font-family: "SUIT";
  font-weight: 700;
  font-size: 24px;
  color: #333333;
  cursor: pointer;
`;

const Header = ({ platformName }: HeaderProps) => {
  const router = useRouter();

  const handleHeaderClick = () => {
    router.push("/"); // 루트 URL로 이동
  };

  return (
    <Container sx={{ py: 4 }}>
      <PlatformTitle onClick={handleHeaderClick}>{platformName}</PlatformTitle>
    </Container>
  );
};

export default Header;
