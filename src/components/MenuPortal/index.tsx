import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useMenuStore } from "@/stores";

const MenuWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 110; /* Ensure it's above other elements */
`;

const MenuPortal = ({ children }: { children: React.ReactNode }) => {
  const { menuPosition } = useMenuStore();

  if (!menuPosition) return null;

  return ReactDOM.createPortal(
    <MenuWrapper top={menuPosition.top} left={menuPosition.left}>
      {children}
    </MenuWrapper>,
    document.body
  );
};

export default MenuPortal;