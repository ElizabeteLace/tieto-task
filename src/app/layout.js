import localFont from "next/font/local";
import "./globals.scss";

const robustaTL = localFont({
  src: "./fonts/relative-book-trial.woff2",
  variable: "--font-tl-medium",
  weight: "400",
});
const robustaTLBold = localFont({
  src: "./fonts/relative-bold-trial.woff2",
  variable: "--font-tl-pro",
  weight: "700",
});

export const metadata = {
  title: "Art shuffle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robustaTL.variable} ${robustaTLBold.variable}`}>
        {children}
      </body>
    </html>
  );
}
