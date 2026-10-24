import "./globals.css";
export const metadata = {
  title: "Zyro Panel",
  description: "Custom Node.js and Python hosting panel dashboard"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body>{children}</body></html>;
}