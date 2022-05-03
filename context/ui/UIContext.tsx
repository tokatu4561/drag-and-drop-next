import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  isDragging: boolean;

  // Methods
  closeSideMenu: () => void;
  openSideMenu: () => void;

  endDragging: () => void;
  startDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
