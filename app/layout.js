import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/card.scss";
import "./css/globals.scss";
import ClientLayout from "./components/client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Srikanth - Full Stack Developer",
  logo: "/app/favicon.png",
  description:
    "This is the portfolio of Srikanth. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
      {process.env.NEXT_PUBLIC_GTM && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      )}
    </html>
  );
}
