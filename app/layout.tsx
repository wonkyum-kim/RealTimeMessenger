import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import './globals.css';

export const metadata = {
  title: 'Real time messenger',
  description: 'Real time messenger',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
