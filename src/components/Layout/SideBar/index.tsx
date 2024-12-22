/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import * as S from "./style.ts";
import poliSmBox from "@/assets/poli-sm-box.svg";
import chatLogo from "@/assets/chat.svg";
import userLogo from "@/assets/user.svg";
import logoutLogo from "@/assets/logout.svg";
import trash from "@/assets/trash.svg";
import menuSelect from "@/assets/menu-select.svg";
import { useUserStore } from "@/stores/user";
import { getChatRooms, removeChatRoom } from "@/api/chat";
import { useChatRoomsStore, useMenuStore } from "@/stores";
import { ChatRoom } from "@/types/chat.ts";
import { getDynamicPath } from "@/utils/routes.ts";
import { ROUTES } from "@/constants/routes.ts";
import MenuPortal from "@/components/MenuPortal/index.tsx";

const LeftSideBar = () => {
  const [consultations, setConsultations] = useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false);

  const { userName, clearUser, userId } = useUserStore();
  const { setChatRooms, clearChatRooms } = useChatRoomsStore();
  const navigate = useNavigate();
  const location = useLocation();

  const { setMenuPosition } = useMenuStore();

  useEffect(() => {
    fetchChatRooms();
  }, [userId, location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".menu-select")) {
        setMenuPosition(null);
      }
    };

    const handleScroll = () => {
      setMenuPosition(null);
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [setMenuPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".user-icon-container")) {
        handleHideLogout();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const hanldeToggleLogoutVisibility = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLogoutVisible((prev) => !prev);
  };

  const handleHideLogout = () => {
    setIsLogoutVisible(false);
  };

  const handleMenuClick = (event: React.MouseEvent, roomId: number) => {
    event.stopPropagation();
    setSelectedRoomId(roomId);
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + rect.height + 10,
      left: rect.right - 20,
    });
  };

  const fetchChatRooms = async () => {
    try {
      const response = await getChatRooms();
      setChatRooms(response);
      setConsultations(response);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleConsultationClick = (consulation: ChatRoom) => {
    navigate(getDynamicPath(ROUTES.CHAT_ID, { id: consulation.id }), {
      state: {
        roomName: consulation.roomName,
      },
    });
  };

  const handleDeleteRoom = async () => {
    if (selectedRoomId === null) return;
    try {
      const currentPathId = Number(location.pathname.split("/").pop());
      if (currentPathId === selectedRoomId) {
        navigate(ROUTES.MAIN);
      }

      await removeChatRoom(selectedRoomId);
      await fetchChatRooms();
      setMenuPosition(null);
      setSelectedRoomId(null);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleLogout = () => {
    clearUser();
    clearChatRooms();
    navigate(ROUTES.HOME);
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
          <S.Paddding>
            <S.LogoImage src={poliSmBox} alt="POLI Small Box Logo" />
            <S.SidebarButton onClick={() => navigate("/chat")}>
              <S.SidebarButtonIcon src={chatLogo} alt="Chat Icon" />
              <S.SidebarText>새 상담 시작</S.SidebarText>
            </S.SidebarButton>
          </S.Paddding>
          <S.Line />
          <S.Paddding>
            <S.ConsultationTitle>상담 목록</S.ConsultationTitle>
            <S.ConsultationList>
              {consultations?.map((consultation) => (
                <S.ConsultationItem
                  key={consultation.id}
                  onClick={() => handleConsultationClick(consultation)}
                >
                  <S.ConsultationItemText>
                    {consultation.roomName}
                  </S.ConsultationItemText>
                  <S.MenuSelectIcon
                    src={menuSelect}
                    alt="menu-select"
                    onClick={(e) => handleMenuClick(e, consultation.id)}
                  />
                </S.ConsultationItem>
              ))}
            </S.ConsultationList>
          </S.Paddding>
        </div>
        {isLogoutVisible && (
          <S.LogoutButton
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={handleLogout}
          >
            <S.LogoutIcon src={logoutLogo} alt="Logout Icon" />
            로그아웃
          </S.LogoutButton>
        )}
        <S.UserContainer>
          <S.UserIcon
            src={userLogo}
            alt="User Icon"
            onClick={hanldeToggleLogoutVisibility}
          />
          <S.UserNameText>{userName}</S.UserNameText>
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
      <MenuPortal>
        <S.MenuSelect className="menu-select" onClick={handleDeleteRoom}>
          <img src={trash} alt="trash" />
          <S.MenuSelectText>삭제하기</S.MenuSelectText>
        </S.MenuSelect>
      </MenuPortal>
    </S.Container>
  );
};

export default LeftSideBar;
