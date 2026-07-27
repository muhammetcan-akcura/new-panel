import ClientWrapper from '@/components/ClientWrapper';
import './globals.css';

export const metadata = {
  title: 'StreamPanel - Provider Panel',
  description: 'Social Media Services & Stream Provider Panel',
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
