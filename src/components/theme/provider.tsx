import { ThemeProvider as NextThemeProvider } from "next-themes";

import type { ThemeProviderProps } from "next-themes";

/* ============================================================================================= */

const ThemeProvider = (props: ThemeProviderProps): ReturnType<typeof NextThemeProvider> => (
  <NextThemeProvider
    attribute="class"
    enableColorScheme
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    storageKey="ui-theme"
    themes={["light", "dark"]}
    {...props}
  />
);

/* ============================================================================================= */

export default ThemeProvider;
