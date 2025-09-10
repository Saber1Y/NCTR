import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";

// Since we have a `not-found.tsx` file at the root of the `app` folder,
// a layout file is required, even if it's just passing children through.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
