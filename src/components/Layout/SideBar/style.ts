import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  height: 100%;
`;

export const Sidebar = styled.div`
  width: 260px;
  border-right: 1px solid #dddce3;
  padding: 20px 0 0 0;
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
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  width: 228px;
  box-sizing: border-box;
  background-color: #f6f8fb;
  font-family: "Wanted Sans";

  &:hover {
    background-color: #e8ecf1;
  }
`;

export const SidebarText = styled.span`
  font-size: 16px;
  color: #4e5867;
  font-weight: 700;
  font-family: "Wanted Sans";
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 56px;
  gap: 10px;

  &:hover {
    color: black;
    background-color: #f6f8fb;
  }
`;

export const UserIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const ConsultationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  flex: 1;
  height: 600px;
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
  justify-content: space-between;
  cursor: pointer;
  position: relative;
`;

export const ConsultationItemText = styled.p`
  display: inline-block;
  max-width: 100%;
  font-size: 14px;
  color: #2e3034;
  font-weight: 500;
  margin: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.5;
`;

export const MenuSelect = styled.div`
  display: flex;
  width: 228px;
  height: 48px;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  background-color: #f6f8fb;
  border: 1px solid #e8ecf1;
  border-radius: 12px;
  cursor: pointer;
`;

export const MenuSelectText = styled.span`
  border-radius: 12px;
  font-size: 16px;
  color: #808996;
  font-weight: 500;
`;

export const ConsultationTitle = styled.h2`
  font-weight: 500;
  color: #808996;
  padding: 12px 0 20px 0;
  font-size: 14px;
`;

export const Line = styled.div`
  height: 1px;
  background-color: #dddce3;
`;

export const UserNameText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #4e5867;
`;

export const LogoutButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f6f8fb;
  border: 1px solid #e8ecf1;
  cursor: pointer;
  color: #808996;
  font-size: 16px;
  font-weight: 500;
  width: 230px;
  padding: 12px 16px;
  border-radius: 12px;
  position: absolute;
  bottom: 60px;
  left: 15px;
  gap: 10px;
  z-index: 100;
  font-family: "Wanted Sans";
  &:hover {
    background-color: #e8ecf1;
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

export const MenuSelectIcon = styled.img`
  padding: 2x;
`;

export const Paddding = styled.div`
  padding: 0 15px;
`;
