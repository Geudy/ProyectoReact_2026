import { TaskListContainer } from '../../components/organisms/TaskListContainer';
import { ThemeProvider } from '../../context/ThemeContext';
import { FiltersProvider } from '../../context/FiltersContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tareas',
    description: 'Gestión de tareas en TaskFlow',
};

export default function TaskPage() {
    return (
        <ThemeProvider>
            <FiltersProvider>
                <main>
                    <TaskListContainer />
                </main>
            </FiltersProvider>
        </ThemeProvider>
    );
}