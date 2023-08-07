export type MenuData = {
  menuActive: boolean;
  toggleMenu: () => void;
}

export type SidebarButtonProps = {
  menuActive: boolean;
  action: () => void;
  label: string;
  'aria-label': string;
  icon: JSX.Element;
}

export type SidebarLinkProps = {
  to: string;
  label: string;
  icon: JSX.Element;
  menuActive: boolean;
}