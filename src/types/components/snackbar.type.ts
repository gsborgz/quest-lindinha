export type SnackbarProps = {
  message: string;
  type: SnackbarType;
}

export type OpenSnackbarFunction = (message: string, type: SnackbarType, duration?: number) => void;

export type SnackbarData = SnackbarProps & {
  open: boolean;
  openSnackbar: OpenSnackbarFunction;
}

export enum SnackbarType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}