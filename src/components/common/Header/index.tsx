"use client";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { teamStore } from "./../../../stores/teamStore";
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
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
  transition: all 0.3s ease-in-out;
  gap: 12px;
`;

const PlatformTitle = styled.div`
  font-family: "SUIT";
  font-weight: 700;
  font-size: 24px;
  color: #333333;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const TeamLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: opacity 0.3s ease-in-out;
`;

const Header = observer(({ platformName }: HeaderProps) => {
  const router = useRouter();
  const handleHeaderClick = () => {
    router.push("/"); // 루트 URL로 이동
  };

  return (
    <HeaderContainer>
      <PlatformTitle onClick={handleHeaderClick}>{platformName}</PlatformTitle>
      {teamStore.isScrolled && teamStore.teamLogo && <TeamLogo src={teamStore.teamLogo} alt="Team Logo" />}
    </HeaderContainer>
  );
});

export default Header;
