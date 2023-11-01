'use client'

import { StatusSelectProps } from '@/types/components/status-select.type';
import { DictionaryContext } from '@/providers/dictionary.provider';
import { useContext } from 'react';

export default function StatusSelect<T>(props: StatusSelectProps<T>) {
  const { locale } = useContext(DictionaryContext);

  return (
    <section className='flex gap-[0.15rem]'>
      { props.status.map((status, index) => (
        <button key={ `${status}-${index}` } type='button' onClick={ () => props.onClick(status) } className={ `flex items-center justify-center shadow-md p-2 w-28 ${bgColor(status, props.selectedStatus)} ${rounded(props.status.length, index)}`}>
          { locale(`${props.model}.status.${status}`) }
        </button>
      )) }
    </section>
  );
}

function bgColor<T>(status: T, selectedStatus: T) {
  if (status === selectedStatus) {
    return 'bg-slate-300 dark:bg-gray-600';
  }

  return 'bg-slate-100 dark:bg-slate-700';
}

function rounded(statusLength: number, index: number): string {
  if (index === 0) {
    return 'rounded-l-xl';
  }

  if (index === statusLength - 1) {
    return 'rounded-r-xl';
  }

  if (statusLength === 1) {
    return 'rounded-xl';
  }

  return '';
}