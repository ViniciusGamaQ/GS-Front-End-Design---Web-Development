import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FutureWork Connect",
  description: "Conectando talentos do futuro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50`}>
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}