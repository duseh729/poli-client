import { useSidebarStore } from "@/stores/sidebar";
import * as S from "./style";
import hamburgerIcon from "@/assets/hamburger.svg";

const Header = () => {
  const { toggle } = useSidebarStore();

  return (
    <S.Header>
      <S.HamburgerButton onClick={toggle}>
        <img src={hamburgerIcon} alt="menu" />
      </S.HamburgerButton>
    </S.Header>
  );
};

export default Header;