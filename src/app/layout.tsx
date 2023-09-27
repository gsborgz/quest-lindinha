import '@/assets/globals.css';
import { Inter } from 'next/font/google';
import GlobalProviders from '@/providers/global.provider';
import Header from '@/components/header.component';
import Footer from '@/components/footer.component';
import { MenuProvider } from '@/providers/menu.provider';
import Main from '@/components/main.component';
import Sidebar from '@/components/sidebar.component';
import ModalContainer from '@/components/modal-container.component';
import SnackbarContainer from '@/components/snackbar-container.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Quest',
  description: 'An app to help you achieve your goals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={ `${inter.className} h-screen`}>
        <GlobalProviders>
          <MenuProvider>
            <Header />

            <Sidebar />

            <Main>
              <SnackbarContainer />

              <ModalContainer />

              { children }
            </Main>
          </MenuProvider>

          <Footer />
        </GlobalProviders>
      </body>
    </html>
  )
}
