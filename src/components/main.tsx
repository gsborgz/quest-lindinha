import Sidebar from '@components/sidebar';

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-[93%] w-full flex flex-row bg-blue-50 dark:bg-slate-800'>
      <section className='w-full container p-5 text-slate-700 dark:text-neutral-50'>
        <Sidebar />

        { children }
      </section>
    </main>
  );
}