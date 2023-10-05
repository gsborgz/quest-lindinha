export type InputProps = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  initialValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}