import MainLayout from '@/components/layout/Mainlayout';
import './globals.css';

export const metadata = {
  title: 'TikTok Clone',
  description: 'A TikTok-like video sharing platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}