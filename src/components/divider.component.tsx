import { DividerProps } from '@type/divider.type';

export default function Divider(props: DividerProps) {
  return (
    <div className='flex flex-row items-center gap-4 w-full'>
      { props.text ? (
        <>
          <div className='flex-grow border-t dark:border-gray-300 border-gray-700'></div>
          <span className='dark:text-gray-300 text-gray-700 text-xs'>{ props.text }</span>
          <div className='flex-grow border-t dark:border-gray-300 border-gray-700'></div>
        </>
      ) : (
        <div className='flex-grow border-t dark:border-gray-300 border-gray-700 w-full'></div>
      ) }
    </div>
  );
}