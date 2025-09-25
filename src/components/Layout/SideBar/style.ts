import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { media } from "@/constants/media";

export const Container = styled(motion.div)`
  display: flex;
  height: 100%;
`;

export const Sidebar = styled(motion.div)`
  width: 260px;
  height: 100vh;
  border-right: 1px solid #dddce3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  z-index: 101;

  ${media.mobile} {
    position: fixed;
    top: 0;
    left: 0;
    border-right: 1px solid #dddce3;
  }
`;

export const Backdrop = styled(motion.div)`
  display: none;

  ${media.mobile} {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
`;

export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 40px;
  cursor: pointer;
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
width: 260px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 56px;
  gap: 10px;
  background-color: white;

  &:hover {
    color: black;
    background-color: #f6f8fb;
    cursor: pointer;
  }
`;

export const UserIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ConsultationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

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

export const ConsultationItem = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  padding: 6px 8px;
  background-color: ${({ selected }) => (selected ? "#F6F8FB" : "transparent")};
  border-radius: 8px;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#E9F1FF" : "#E9F1FF")};
  }

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
  &:hover {
    background-color: #e8ecf1;
  }
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

  ${media.mobile} {
    width: 100%;
    padding-top: 56px;
    height: 100%;
    box-sizing: border-box;
  }
`;

export const MenuSelectIcon = styled.img`
  padding: 2x;
`;

export const Paddding = styled.div`
  padding: 0 15px;
`;
