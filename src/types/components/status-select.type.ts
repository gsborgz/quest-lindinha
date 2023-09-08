export type StatusSelectProps<T> = {
  status: T[];
  selectedStatus: T;
  onClick: (status: T) => void;
}