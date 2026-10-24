import "./globals.css";
export const metadata = { title: "Zyro Panel", description: "Node.js and Python hosting control center" };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="id"><body>{children}</body></html>;
}