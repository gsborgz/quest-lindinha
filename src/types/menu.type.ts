export type MenuData = {
  menuActive: boolean;
  toggleMenu: () => void;
}

export type SidebarButtonProps = {
  menuActive: boolean;
  action: () => void;
  label: string;
  ariaLabel?: string;
  icon: JSX.Element;
}

export type SidebarLinkProps = {
  to: string;
  label: string;
  icon: JSX.Element;
  menuActive: boolean;
}

export type SidebarItem = {
  label: string;
  icon: JSX.Element;
  to?: string;
  arialLabel?: string;
  action?: () => void;
  menuActive: boolean;
}