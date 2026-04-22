
# TaskFlow - Administrador de Proyectos y Tareas

Proyecto construido con Next.js 14+, React, Zustand, Atomic Design y pruebas con Vitest + React Testing Library.

## Estructura y Arquitectura

- **Next.js App Router**: Navegación y layouts modernos.
- **Atomic Design**: Componentes organizados en `src/components/atoms`, `molecules`, `organisms`.
- **Feature-based**: Lógica de dominio en `src/features/task`, `features/projects`, `features/tickets`.
- **Store global**: Zustand en `src/store/kanbanStore.ts` para estado persistente de tareas.
- **Context API**: Filtros y tema (`src/context/FiltersContext.tsx`, `ThemeContext.tsx`).
- **Hooks avanzados**: `useLocalStorage`, `useDebounce`, `useFilters` en `src/hooks`.
- **Datos mock**: JSON en `src/data/projects.json` y `tickets.json`.
- **Tests**: Vitest + React Testing Library (`*.test.tsx`).
- **Optimización**: React.memo, useMemo, lazy, Suspense.
- **Accesibilidad**: Roles y aria-labels en componentes clave.

## Estructura de carpetas

```
src/
	app/           # Páginas y layouts Next.js
	components/    # Atoms, molecules, organisms (Atomic Design)
	features/      # Lógica de dominio (task, projects, tickets)
	store/         # Zustand store global
	context/       # Contextos globales
	hooks/         # Custom hooks
	data/          # Mock JSON
	shared/        # Componentes compartidos
```

## Principales decisiones

- **Zustand** para estado global y persistencia localStorage.
- **Atomic Design** para escalabilidad y reutilización UI.
- **Tests** migrados a Vitest para velocidad y compatibilidad moderna.
- **Metadata dinámica** por página usando Next.js 14+.
- **Separación de lógica y presentación**: containers vs presentational.

## Scripts principales

- `npm run dev` — desarrollo
- `npm run build` — build producción
- `npm run test` — pruebas unitarias/integración (Vitest)

---
