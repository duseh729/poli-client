import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useMenuStore } from "@/stores";

type MenuContainerProps = {
  top?: number;
  left?: number;
};

const MenuPortal = ({ children }: { children: React.ReactNode }) => {
  const { menuPosition } = useMenuStore();

  if (!menuPosition) return null;

  return ReactDOM.createPortal(
    <MenuContainer top={menuPosition.top} left={menuPosition.left}>
      {children}
    </MenuContainer>,
    document.body
  );
};

const MenuContainer = styled.div<MenuContainerProps>`
  position: fixed;
  z-index: 1000;
  top: ${({ top }) => (top ? `${top}px` : "0")};
  left: ${({ left }) => (left ? `${left}px` : "0")};
`;

export default MenuPortal;
