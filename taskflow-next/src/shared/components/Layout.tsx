import type { ReactNode } from 'react';
import Image from "next/image";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <header
                style={{
                    backgroundColor: '#1e293b',
                    color: '#fff',
                    padding: '16px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Image
                    src="/imagen_Titulo.png"
                    alt="Logo Título"
                    width={48}
                    height={48}
                />
                <h1 style={{ margin: 0, fontSize: '20px' }}>Dashboard de tareas</h1>
            </header>
            <main style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>{children}</main>
        </div>
    );
}

export default Layout;