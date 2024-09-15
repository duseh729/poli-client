/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import * as S from "./LeftSideBar.ts";
import poliSmBox from "@/assets/poli-sm-box.svg";
import chatLogo from "@/assets/chat.svg";
import userLogo from "@/assets/user.svg";
import logoutLogo from "@/assets/logout.svg";
import { useUserStore } from "@/stores/user";
import { getChatRooms } from "@/api/chat";
import { useChatRoomsStore } from "@/stores";
import { ChatRoom } from "@/types/chat.ts";

const LeftSideBar = () => {
  const [consultations, setConsultations] = useState<ChatRoom[]>([]);
  const { userId, clearUser } = useUserStore();
  const { setChatRooms, clearChatRooms } = useChatRoomsStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchChatRooms();
  }, [userId, location]);

  const fetchChatRooms = async () => {
    try {
      if (userId) {
        const response = await getChatRooms();
        setChatRooms(response);
        setConsultations(response);
      }
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
    }
  };

  const handleConsultationClick = (id: number) => {
    navigate(`/chat/${id}`);
  };

  const handleLogout = () => {
    clearUser();
    clearChatRooms();
    navigate("/");
  };

  return (
    <S.Container
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <S.Sidebar>
        <div>
          <S.LogoImage src={poliSmBox} alt="POLI Small Box Logo" />
          <S.SidebarButton onClick={() => navigate("/chat")}>
            <S.SidebarButtonIcon src={chatLogo} alt="Chat Icon" />새 상담 시작
          </S.SidebarButton>
          <S.ConsultationTitle>상담 목록</S.ConsultationTitle>
          <S.ConsultationList>
            {consultations?.map((consultation) => (
              <S.ConsultationItem key={consultation.id} onClick={() => handleConsultationClick(consultation.id)}>
                <S.ConsultationItemText>{consultation.roomName}</S.ConsultationItemText>
              </S.ConsultationItem>
            ))}
          </S.ConsultationList>
        </div>
        <S.LogoutButton onClick={handleLogout}>
          <S.LogoutIcon src={logoutLogo} alt="Logout Icon" />
          로그아웃
        </S.LogoutButton>
        <S.UserContainer>
          <S.UserIcon src={userLogo} alt="User Icon" />
          <S.UserNameText>{userId}</S.UserNameText>
        </S.UserContainer>
      </S.Sidebar>
      <S.OutletContainer
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </S.OutletContainer>
    </S.Container>
  );
};

export default LeftSideBar;