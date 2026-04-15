import Layout from './shared/components/Layout';
import Tabs from './shared/components/Tabs';
import { TaskListContainer } from './features/task';

function App() {
  return (
    <Layout>
      <Tabs defaultTab="tasks">
        <Tabs.List>
          <Tabs.Tab id="tasks">Mis Tareas</Tabs.Tab>
          <Tabs.Tab id="projects">Proyectos</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel id="tasks">
            <TaskListContainer />
          </Tabs.Panel>
          <Tabs.Panel id="projects">
            <p style={{ color: '#94a3b8', padding: '32px', textAlign: 'center' }}>
              Próximamente: Módulo de Proyectos
              Sesión 1 — Arquitectura y Patrones de Componentes 25
            </p>
          </Tabs.Panel>
          <Tabs.Panel id="stats">
            <p style={{ color: '#94a3b8', padding: '32px', textAlign: 'center' }}>
              Próximamente: Estadísticas
            </p>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </Layout>
  );
}
export default App;