'use client'

import React, { useEffect, useState } from 'react';

type Props = React.PropsWithChildren<{
  attribute?: any;
  defaultTheme?: any;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}>;

export default function ThemeProviderClient(props: Props) {
  const { children } = props;
  const [ThemeProvider, setThemeProvider] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Dynamically import the actual ThemeProvider only on the client.
    import('./theme-provider').then((mod) => {
      setThemeProvider(() => mod.ThemeProvider);
    });
  }, []);

  if (!ThemeProvider) {
    // While loading, render children without theme provider to avoid server-side script injection.
    return <>{children}</>;
  }

  const Provider = ThemeProvider;
  return <Provider {...props}>{children}</Provider>;
}
