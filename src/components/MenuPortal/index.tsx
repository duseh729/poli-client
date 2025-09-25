import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useMenuStore } from "@/stores";

const MenuPortal = ({ children }: { children: React.ReactNode }) => {
  const { menuPosition } = useMenuStore();

  if (!menuPosition) return null;

  return ReactDOM.createPortal(<div>{children}</div>, document.body);
};

export default MenuPortal;
