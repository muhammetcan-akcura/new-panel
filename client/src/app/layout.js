import ClientWrapper from '@/components/ClientWrapper';
import './globals.css';

export const metadata = {
  title: 'fblivepanel - Provider Panel',
  description: 'Facebook Views & Live Stream Provider Panel',
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
