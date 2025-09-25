import { useSidebarStore } from "@/stores/sidebar";
import * as S from "./style";
import hamburgerIcon from "@/assets/hamburger.svg";
import { useChatRoomsStore } from "@/stores";
import { useParams } from "react-router-dom";

const Header = () => {
  const { toggle } = useSidebarStore();

  const { id } = useParams<{ id: string }>();
  const chatRooms = useChatRoomsStore((state) => state.chatRooms);
  const currentRoom = chatRooms.find((room) => room.id == Number(id));

  return (
    <S.Header>
      <S.HamburgerButton onClick={toggle}>
        <img src={hamburgerIcon} alt="menu" />
      </S.HamburgerButton>
      <S.Title>{currentRoom?.roomName}</S.Title>
    </S.Header>
  );
};

export default Header;
