import Sidebar from '@/components/Sidebar';
import './globals.css';

export const metadata = {
  title: 'TALKR',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5"
        style={{
          margin: 0,
          padding: 20,
          paddingTop: '24px',
          fontFamily: 'var(--font-primary)',
          backgroundColor: 'var(--color-bg)',
          minHeight: '100vh',
        }}
      >
        <Sidebar />
        <main
          className="w-full flex flex-col items-center"
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}