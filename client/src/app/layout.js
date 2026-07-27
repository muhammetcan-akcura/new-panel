import ClientWrapper from '@/components/ClientWrapper';
import './globals.css';

export const metadata = {
  title: 'fblivePanel - Facebook Live Stream Provider Panel',
  description: 'Facebook Live Stream Provider Panel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
