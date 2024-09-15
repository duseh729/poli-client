import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.div`
  width: 260px;
  border-right: 1px solid #c0cbd9;
  margin: 20px 20px 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 40px;
`;

export const SidebarButtonIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const SidebarButton = styled.button`
  display: flex;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #4e5867;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  background-color: #f6f8fb;

  &:hover {
    background-color: #0059ff;
    color: #ffffff;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 20px;
  gap: 10px;
`;

export const UserIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ConsultationList = styled.div`
  margin-top: 20px;
  flex: 1;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c0cbd9;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f6f8fb;
  }
`;

export const ConsultationItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const ConsultationItemText = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #2e3034;
  font-weight: 700;
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ConsultationTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #808996;
  padding-top: 12px;
  border-top: 1px solid #dddce3;
`;

export const UserNameText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #4e5867;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F6F8FB;
  border: 1px solid #E8ECF1;
  cursor: pointer;
  color: #808996;
  font-size: 16px;
  font-weight: 500;
  width: 230px;
  padding: 12px 16px;
  border-radius: 12px;
  position: absolute;
  bottom: 60px;
  left: 20px;
  gap: 10px;

  &:hover {
    color: black;
  }
`;

export const LogoutIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const OutletContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;