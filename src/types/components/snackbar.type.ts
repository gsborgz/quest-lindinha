export type SnackbarProps = {
  message: string;
  type: SnackbarType;
}

export type SnackbarData = SnackbarProps & {
  open: boolean;
  openSnackbar: (message: string, type: SnackbarType, duration?: number) => void;
}

export enum SnackbarType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}