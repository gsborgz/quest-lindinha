'use client'

import { useDictionary } from '@src/hooks/dictionary.hook';
import Image from 'next/image';

export default function Custom404() {
  const { locale } = useDictionary();
  
  return (
    <section className='flex flex-col items-center justify-center h-[93%] gap-1'>
      <Image src='/images/notfound-1.svg' alt='opening image' width={400} height={400} className='ml-16' priority />

      <span className="text-lg font-medium">{ locale('text.page_not_found') }</span>
    </section>
  );
}