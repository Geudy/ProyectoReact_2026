import { ThemeProvider } from './ThemeContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}
