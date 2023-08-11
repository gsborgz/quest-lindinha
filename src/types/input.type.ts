export type InputProps = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}