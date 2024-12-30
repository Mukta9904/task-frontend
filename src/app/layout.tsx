import "./globals.css";
import {Providers} from "./providers";

export const metadata = {
  title: 'Task Management App',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
    <body>
      <Providers>
        {children}
      </Providers>
    </body>
  </html>
  );
}
