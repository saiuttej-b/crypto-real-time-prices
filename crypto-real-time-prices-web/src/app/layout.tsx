import { StoreProvider } from "@/components/StoreProvider";
import { theme } from "@/lib/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cryptocurrency Tracker",
  description: "Track the latest cryptocurrency prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={roboto.className}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
