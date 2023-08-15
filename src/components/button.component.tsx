import { ButtonProps } from '@/types/button.type';
import Link from 'next/link';

export default function Button(props: ButtonProps) {
  const gray ='bg-gray-300';
  const teal = 'bg-teal-400';
  const textWhite = 'text-white';

  return (
    <>
      { props.to ? (
        <Link href={ props.to } className={ `${props.primary ? teal : (props.secondary ? gray : props.bgColor)} ${props.textColor || textWhite} font-bold py-2 px-4 rounded w-full flex items-center justify-center` }>
          { props.label }
        </Link>
      ) : (
        <button type={ props.type } className={ `${props.primary ? teal : (props.secondary ? gray : props.bgColor)} ${props.textColor || textWhite} font-bold py-2 px-4 rounded w-full` } onClick={ props.onClick }>
          { props.label }
        </button>
      ) }
    </>
  );
}