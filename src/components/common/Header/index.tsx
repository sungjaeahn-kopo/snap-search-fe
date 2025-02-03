"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
interface HeaderProps {
  platformName: string;
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1100;
  padding: 16px;
  height: 70px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
`;

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
    <HeaderContainer>
      <PlatformTitle onClick={handleHeaderClick}>{platformName}</PlatformTitle>
    </HeaderContainer>
  );
};

export default Header;
