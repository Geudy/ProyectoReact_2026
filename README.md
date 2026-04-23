# TaskFlow - Administrador de Proyectos y Tareas 📋

[![TypeScript](https://img.shields.io/badge/TypeScript-97.1%25-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61dafb)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](#licencia)

Proyecto avanzado de administración de proyectos y tareas construido con **Next.js 16+**, **React 19**, **TypeScript**, **Zustand** y **Tailwind CSS**. Implementa patrones modernos como Atomic Design, Feature-Based Architecture y testing con Vitest.

## 📚 Tabla de Contenidos

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Pantallas en Ejecución](#pantallas-en-ejecución)
- [Testing](#testing)
- [Patrones de Diseño](#patrones-de-diseño)
- [Contribuir](#contribuir)

---

## ✨ Características

✅ **Gestión Completa de Proyectos** - Crear, editar y eliminar proyectos  
✅ **Tablero Kanban Interactivo** - Organizar tareas por columnas de estado  
✅ **Sistema de Filtros Avanzados** - Filtrar por estado, prioridad y asignado  
✅ **Estado Global Persistente** - Datos sincronizados con localStorage  
✅ **Tema Claro/Oscuro** - Soporte para preferencias de usuario  
✅ **Responsive Design** - Optimizado para móvil y escritorio  
✅ **Testing Automatizado** - Cobertura con Vitest + React Testing Library  
✅ **Accesibilidad (A11y)** - WCAG compliant con roles ARIA  
✅ **Performance Optimizado** - React.memo, useMemo, lazy loading  

---

## 🏗️ Arquitectura

### Diagrama General

```
TaskFlow (Next.js App Router)
│
├── 📱 Presentación (Next.js Pages)
│   ├── app/
│   │   ├── layout.tsx         (Layout raíz con Providers)
│   │   ├── page.tsx           (Dashboard principal)
│   │   └── projects/          (Páginas de proyectos)
│   │
│   └── components/            (Atomic Design)
│       ├── atoms/             (Botones, inputs, tags)
│       ├── molecules/         (Card, TaskItem, Header)
│       └── organisms/         (Kanban, ProjectList, Filters)
│
├── 🧠 Lógica de Negocio (Features)
│   ├── features/task/         (Lógica de tareas)
│   │   ├── types.ts
│   │   ├── hooks/
│   │   └── services/
│   ├── features/projects/     (Lógica de proyectos)
│   └── features/tickets/      (Lógica de tickets)
│
├── 🔄 Estado Global
│   ├── store/
│   │   └── kanbanStore.ts     (Zustand - Persistente)
│   └── context/
│       ├── FiltersContext.tsx (Filtros locales)
│       └── ThemeContext.tsx    (Tema app)
│
├── 🪝 Custom Hooks
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   ├── useFilters.ts
│   │   └── useTheme.ts
│
└── 📦 Datos & Utils
    ├── data/                  (Mock JSON)
    ├── shared/                (Componentes reutilizables)
    └── utils/                 (Funciones auxiliares)
```

### Flujo de Datos

```
User Interaction
    ↓
Component Event Handler
    ↓
Zustand Store / Context
    ↓
Persistent Storage (localStorage)
    ↓
UI Re-render (React)
```

---

## 📂 Estructura de Carpetas

```
ProyectoReact_2026/
├── taskflow-next/
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── layout.tsx          # Layout raíz con Providers
│   │   │   ├── page.tsx            # Página principal
│   │   │   ├── globals.css         # Estilos globales
│   │   │   └── projects/           # Rutas de proyectos
│   │   │
│   │   ├── components/             # Componentes por Atomic Design
│   │   │   ├── atoms/              # Elementos básicos
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Badge.tsx
│   │   │   ├── molecules/          # Componentes pequeños
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   └── Header.tsx
│   │   │   └── organisms/          # Componentes grandes
│   │   │       ├── Kanban.tsx
│   │   │       ├── ProjectList.tsx
│   │   │       └── FilterBar.tsx
│   │   │
│   │   ├── features/               # Lógica de negocio
│   │   │   ├── task/
│   │   │   │   ├── types.ts        # Tipos de tareas
│   │   │   │   ├── hooks/          # useTask, useTaskFilters
│   │   │   │   └── services/       # Lógica de tareas
│   │   │   ├── projects/
│   │   │   │   ├── types.ts
│   │   │   │   ├── hooks/
│   │   │   │   └── services/
│   │   │   └── tickets/
│   │   │       ├── types.ts
│   │   │       └── ...
│   │   │
│   │   ├── store/                  # Estado global (Zustand)
│   │   │   ├── kanbanStore.ts      # Store principal persistente
│   │   │   └── types.ts            # Tipos del store
│   │   │
│   │   ├── context/                # Context API
│   │   │   ├── FiltersContext.tsx  # Contexto de filtros
│   │   │   └── ThemeContext.tsx    # Contexto de tema
│   │   │
│   │   ├── hooks/                  # Custom Hooks globales
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useFilters.ts
│   │   │   └── useTheme.ts
│   │   │
│   │   ├── data/                   # Datos mock
│   │   │   ├── projects.json
│   │   │   └── tickets.json
│   │   │
│   │   ├── shared/                 # Componentes compartidos
│   │   │   ├── Layout/
│   │   │   └── Navigation/
│   │   │
│   │   ├── utils/                  # Funciones auxiliares
│   │   │   ├── helpers.ts
│   │   │   ├── validators.ts
│   │   │   └── formatters.ts
│   │   │
│   │   └── types/                  # Tipos globales
│   │       └── index.ts
│   │
│   ├── __tests__/                  # Tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── vitest.config.ts
│   └── next.config.ts
│
├── README.md                        # Este archivo
└── .gitignore
```

---

## 🛠️ Tecnologías

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Framework** | Next.js | 16.2.4 |
| **Librería UI** | React | 19.2.4 |
| **Lenguaje** | TypeScript | ^5 |
| **Estilos** | Tailwind CSS | ^4 |
| **Estado Global** | Zustand | ^4 |
| **Testing** | Vitest | ^1 |
| **Testing UI** | React Testing Library | ^16 |
| **Linting** | ESLint | ^9 |
| **Postcss** | @tailwindcss/postcss | ^4 |

---

## 📖 Patrones de Diseño

### 1. **Atomic Design** 🔬

Organización jerárquica de componentes para máxima reutilización:

- **Atoms**: Elementos básicos (Button, Input, Badge)
- **Molecules**: Combinaciones simples (TaskCard, Header)
- **Organisms**: Componentes complejos (Kanban, ProjectList)
- **Templates**: Layouts de página
- **Pages**: Páginas Next.js finales

```typescript
// atoms/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md' 
}) => {
  // Implementación
}
```

### 2. **Feature-Based Architecture** 🏢

Lógica de negocio separada por dominio:

```
features/
├── task/         (Task, TaskItem, TaskList)
├── projects/     (Project, ProjectCard, ProjectForm)
└── tickets/      (Ticket, TicketBoard, TicketList)
```

Cada feature contiene:
- **types.ts** - Tipos y interfaces
- **hooks/** - Custom hooks
- **services/** - Lógica de negocio
- **components/** - Componentes feature-específicos

### 3. **Global State Management** 🔄

**Zustand** para estado persistente:

```typescript
// store/kanbanStore.ts
interface KanbanStore {
  tasks: Task[];
  projects: Project[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  getTasks: () => Task[];
}

export const useKanbanStore = create<KanbanStore>(
  persist(
    (set, get) => ({
      tasks: [],
      projects: [],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task]
      })),
      // ...
    }),
    { name: 'kanban-store' }
  )
);
```

### 4. **Context API** 🎨

Para estado local y preferencias:

```typescript
// context/FiltersContext.tsx
interface FiltersContextType {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

export const FiltersContext = React.createContext<FiltersContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters debe usarse dentro de FiltersProvider');
  }
  return context;
};
```

### 5. **Custom Hooks** 🪝

Lógica reutilizable y declarativa:

```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = typeof window !== 'undefined' 
      ? window.localStorage.getItem(key) 
      : null;
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue] as const;
}
```

### 6. **Separación Lógica-Presentación** 🎭

```typescript
// Container: Lógica
// features/task/containers/TaskListContainer.tsx
export const TaskListContainer = () => {
  const { tasks, updateTask } = useKanbanStore();
  const { filters } = useFilters();
  
  const filteredTasks = useMemo(() => 
    applyFilters(tasks, filters), 
    [tasks, filters]
  );

  return <TaskListPresentation tasks={filteredTasks} onUpdate={updateTask} />;
};

// Presentational: Solo UI
// features/task/components/TaskListPresentation.tsx
interface TaskListPresentationProps {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskListPresentation: React.FC<TaskListPresentationProps> = ({
  tasks,
  onUpdate
}) => (
  <ul>
    {tasks.map(task => (
      <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
    ))}
  </ul>
);
```

---

## 📸 Pantallas en Ejecución
<img width="1360" height="486" alt="image" src="https://github.com/user-attachments/assets/ce4fe0e3-264c-4456-8d6a-fd935b55223b" />
<img width="1328" height="680" alt="image" src="https://github.com/user-attachments/assets/433fec7f-fe1a-43b9-9135-b52a62933dbb" />
<img width="1260" height="626" alt="image" src="https://github.com/user-attachments/assets/72c63029-b8a2-4374-acaf-b2615b671399" />
<img width="1183" height="564" alt="image" src="https://github.com/user-attachments/assets/400e845b-2873-47c9-9899-7d1ea7480401" />
<img width="1165" height="561" alt="image" src="https://github.com/user-attachments/assets/8b574842-6f88-4c34-959f-03f9e2ba23e8" />
<img width="1243" height="597" alt="image" src="https://github.com/user-attachments/assets/49136e0d-cdbb-427c-aee3-9c1f87b8fbd7" />


---

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Geudy/ProyectoReact_2026.git
cd ProyectoReact_2026
```

2. **Navegar a la carpeta del proyecto**
```bash
cd taskflow-next
```

3. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

4. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

---

## 💻 Uso

### Crear un Proyecto
```typescript
import { useKanbanStore } from '@/store/kanbanStore';

function CreateProjectForm() {
  const { addProject } = useKanbanStore();
  
  const handleSubmit = (data: ProjectFormData) => {
    addProject({
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Filtrar Tareas
```typescript
import { useFilters } from '@/context/FiltersContext';
import { useKanbanStore } from '@/store/kanbanStore';

function TaskListContainer() {
  const { tasks } = useKanbanStore();
  const { filters } = useFilters();
  
  const filtered = useMemo(() => 
    tasks.filter(task => 
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority)
    ),
    [tasks, filters]
  );

  return <TaskList tasks={filtered} />;
}
```

### Usar Custom Hook
```typescript
function MyComponent() {
  const [user, setUser] = useLocalStorage('user', null);
  
  return (
    <button onClick={() => setUser({ name: 'John' })}>
      Save User
    </button>
  );
}
```

---

## 🧪 Testing

### Estructura de Tests
```bash
__tests__/
├── unit/           # Pruebas unitarias (componentes, hooks)
├── integration/    # Pruebas de integración
└── e2e/           # Pruebas end-to-end
```

### Ejemplo: Test de Componente
```typescript
// __tests__/unit/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/Button';

describe('Button', () => {
  it('debe renderizar con texto', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('debe aplicar variant correcto', () => {
    render(<Button variant="secondary">Click</Button>);
    expect(screen.getByText('Click')).toHaveClass('btn-secondary');
  });
});
```

### Ejecutar Tests
```bash
# Todos los tests
npm run test

# Con cobertura
npm run test -- --coverage

# En modo watch
npm run test -- --watch

# Tests específicos
npm run test -- Button.test.tsx
```

---

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor Next.js en puerto 3000

# Producción
npm run build        # Build optimizado
npm run start        # Sirve la versión de producción

# Testing
npm run test         # Ejecuta pruebas con Vitest
npm run test:ui      # Abre UI de Vitest

# Linting
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores automáticos
```

---

## 🎯 Decisiones Arquitectónicas

| Decisión | Razón |
|----------|-------|
| **Zustand** | Estado global simple, ligero y con persistencia nativa |
| **Atomic Design** | Escalabilidad, reutilización y mantenimiento facilitado |
| **Feature-Based** | Organización lógica por dominio, fácil búsqueda |
| **Context API** | Filtros y tema que no necesitan persistencia global |
| **Vitest** | Compatible con ES modules, mejor velocidad que Jest |
| **React.memo/useMemo** | Optimización de renders innecesarios |
| **TypeScript Strict** | Type safety 100%, menos bugs en producción |
| **Tailwind CSS** | Utility-first, desarrollo rápido, archivo final optimizado |

## 🚀 Optimizaciones de Performance

### React Optimizations
```typescript
// Memo para componentes costosos
const TaskCard = React.memo(({ task, onUpdate }) => {
  // Solo re-renderiza si props cambian
});

// useMemo para cálculos costosos
const filtered = useMemo(() => 
  tasks.filter(condition), 
  [tasks]
);

// Lazy loading de componentes
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Next.js Optimizations
- Image optimization con `next/image`
- Dynamic imports para code splitting
- Static generation donde sea posible
- API routes para operaciones backend

## 👨‍💻 Autor

**Geudy** - Estudiante de React Avanzado 2026

- GitHub: [@Geudy](https://github.com/Geudy)
- Email: [Tu email]
