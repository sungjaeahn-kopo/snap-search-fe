import { Typography } from "@mui/material";
import styled from "styled-components";
interface HeaderProps {
  platformName: string;
}

const HeaderWrapper = styled.header`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;
const PlatformTitle = styled.div`
  font-family: "SUIT";
  font-weight: 700;
  font-size: 24px;
  color: #333333;
`;

const Header = ({ platformName }: HeaderProps) => {
  return (
    <Typography component="div">
      <PlatformTitle>{platformName}</PlatformTitle>
    </Typography>
  );
};

export default Header;
