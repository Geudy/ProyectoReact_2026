
"use client";
import Layout from "@/shared/components/Layout";
import Tabs from "@/shared/components/Tabs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AppProviders } from "@/context/AppProviders";
const Loading = dynamic(() => import("./task/loading"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/task");
    }, 2000);
  };

  return (
    <AppProviders>
      <Layout>
        <Tabs defaultTab="tareas">
          <Tabs.List>
            <Tabs.Tab id="tareas">Tareas</Tabs.Tab>
            <Tabs.Tab id="proyectos">Proyectos</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel id="tareas">
              {loading ? (
                <Loading />
              ) : (
                <Link
                  href="/task"
                  className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                  onClick={handleClick}
                >
                  Ir a Tareas
                </Link>
              )}
            </Tabs.Panel>
            <Tabs.Panel id="proyectos">
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Bienvenido al Dashboard de tareas</h2>
              <p style={{ fontSize: '16px', color: '#555' }}>
                Aquí puedes gestionar tus tareas de manera eficiente. Agrega nuevas tareas, edítalas o elimínalas según sea necesario.
              </p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </Layout>
    </AppProviders>
  );
}
