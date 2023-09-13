export type StatusSelectProps<T> = {
  model: string;
  status: T[];
  selectedStatus: T;
  onClick: (status: T) => void;
}