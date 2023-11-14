import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "@/pages/components/theme-provider";
import { useTheme } from "next-themes";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <ThemeProvider>
      <RecoilRoot>
        <Component
          className={`${isDarkTheme ? "text-light" : "text-dark"}`}
          {...pageProps}
        />
        <Toaster />
      </RecoilRoot>
    </ThemeProvider>
  );
}
