import '@src/assets/globals.css';
import { Inter } from 'next/font/google';
import GlobalProviders from '@src/providers/global.provider';
import Header from '@src/components/header.component';
import Footer from '@src/components/footer.component';
import { MenuProvider } from '@src/providers/menu.provider';
import Main from '@src/components/main.component';
import Sidebar from '@src/components/sidebar.component';
import ModalContainer from '@src/components/modal-container.component';
import SnackbarContainer from '@src/components/snackbar-container.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Quest',
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
