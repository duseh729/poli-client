import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as S from "./style.ts";
import poliSmBox from "@/assets/poli-sm-box.svg";
import chatLogo from "@/assets/chat.svg";
import userLogo from "@/assets/user.svg";
import logoutLogo from "@/assets/logout.svg";
import trash from "@/assets/trash.svg";
import menuSelect from "@/assets/menu-select.svg";
import { useUserStore } from "@/stores/user";
import { useChatRooms, useRemoveChatRoom } from "@/api/chat";
import { useChatRoomsStore, useMenuStore } from "@/stores";
import { ChatRoom } from "@/types/chat.ts";
import { getDynamicPath } from "@/utils/routes.ts";
import { ROUTES } from "@/constants/routes.tsx";
import MenuPortal from "@/components/MenuPortal/index.tsx";
import { useSidebarStore } from "@/stores/sidebar";
import Header from "../Header/index.tsx";
import { AnimatePresence } from "framer-motion";

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const LeftSideBar = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false);

  const { userName, clearUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: consultations = [] } = useChatRooms();
  const { mutate: removeChatRoom, isPending } = useRemoveChatRoom();

  const { setMenuPosition } = useMenuStore();
  const chatRooms = useChatRoomsStore((state) => state.chatRooms);

  const profileFooterRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 방 ID 읽기

  const { isOpen, close } = useSidebarStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      // Add a dummy history state when the sidebar opens
      window.history.pushState(null, "", location.pathname);

      const handlePopState = () => {
        close(); // Close the sidebar on back button press
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isOpen, isMobile, close, location.pathname]);

  useEffect(() => {
    if (profileFooterRef.current) {
      setFooterHeight(profileFooterRef.current.offsetHeight);
    }
  }, []);

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
    setMenuPosition(null);
    setIsLogoutVisible((prev) => !prev);
  };

  const handleHideLogout = () => {
    setIsLogoutVisible(false);
  };

  const handleMenuClick = (event: React.MouseEvent, roomId: number) => {
    event.stopPropagation();
    setIsLogoutVisible(false);
    setSelectedRoomId(roomId);
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.top - rect.height - 35,
      left: rect.right - 160,
    });
  };

  const handleConsultationClick = (consultation: ChatRoom) => {
    setSelectedRoomId(consultation.id); // 여기에 선택 상태 업데이트 추가
    navigate(getDynamicPath(ROUTES.CHAT_ID, { id: consultation.id }), {
      state: {
        roomName: consultation.roomName,
      },
    });
    if (isMobile) {
      close();
    }
  };

  const handleDeleteRoom = () => {
    if (isPending) {
      return;
    }

    if (selectedRoomId === null) {
      return;
    }

    try {
      const currentPathId = Number(location.pathname.split("/").pop());
      if (currentPathId === selectedRoomId) {
        navigate(ROUTES.MAIN);
      }

      removeChatRoom(selectedRoomId);
      setMenuPosition(null);
      setSelectedRoomId(null);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleLogout = () => {
    clearUser();
    toast.success("로그아웃에 성공했습니다", {
      duration: 2000,
      style: {
        background: "#28a745",
        color: "#fff",
        fontSize: "16px",
      },
    });

    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    if (id) {
      setSelectedRoomId(Number(id));
    }
  }, [id]);

  return (
    <>
      <Header />
      <S.Container
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {isOpen && isMobile && (
            <S.Backdrop
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <S.Sidebar
          variants={sidebarVariants}
          initial={false}
          animate={isOpen || !isMobile ? "open" : "closed"}
        >
          <div>
            <S.Paddding>
              <div style={{ paddingTop: 20 }}>
                <S.LogoImage
                  src={poliSmBox}
                  alt="POLI Small Box Logo"
                  onClick={() => {
                    navigate(ROUTES.MAIN, { state: { showNextScreen: 1 } });
                    if (isMobile) {
                      close();
                    }
                  }}
                />
              </div>
              <S.SidebarButton
                onClick={() => {
                  navigate(ROUTES.MAIN, { state: { showNextScreen: 2 } });
                  if (isMobile) {
                    close();
                  }
                }}
              >
                <S.SidebarButtonIcon src={chatLogo} alt="Chat Icon" />
                <S.SidebarText>새 상담 시작</S.SidebarText>
              </S.SidebarButton>
            </S.Paddding>
            <S.Line />
            <S.Paddding>
              <S.ConsultationTitle>상담 목록</S.ConsultationTitle>
              <S.ConsultationList
                style={{ height: `calc(100vh - ${footerHeight}px - 225px)` }}
              >
                {chatRooms?.map((consultation) => (
                  <S.ConsultationItem
                    key={consultation.id}
                    selected={consultation.id === selectedRoomId} // 선택된 방인지 확인
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
          <S.UserContainer
            onClick={hanldeToggleLogoutVisibility}
            ref={profileFooterRef}
          >
            <S.UserIcon src={userLogo} alt="User Icon" />
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
    </>
  );
};

export default LeftSideBar;
