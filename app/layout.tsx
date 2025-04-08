// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Huy Nguyen Portfolio',
  description: 'AI Engineer Portfolio Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
