import { SnackbarProps, SnackbarType } from '@/types/snackbar.type';

export default function Snackbar(props: SnackbarProps) {
  const color = getSnackbarTypeColor(props.type);

  return (
    <div className={ `snackbar ${color} text-neutral-50 font-bold max-w-md text-center p-3 rounded-xl` }>
      <span>{props.message}</span>
    </div>
  );
}

function getSnackbarTypeColor(type: SnackbarType) {
  switch (type) {
    case SnackbarType.ERROR:
      return 'bg-red-500';
    case SnackbarType.WARNING:
      return 'bg-yellow-500';
    case SnackbarType.SUCCESS:
      return 'bg-green-500';
    default:
      return 'bg-cyan-500';
  }
}
