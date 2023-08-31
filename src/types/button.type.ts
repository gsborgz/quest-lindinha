export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  textColor?: string;
  label?: string;
  primary?: boolean;
  secondary?: boolean;
  icon?: JSX.Element;
  full?: boolean;
  onClick?: () => void;
  to?: string;
}