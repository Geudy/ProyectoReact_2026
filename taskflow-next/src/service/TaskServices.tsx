// Simulación de tareas en "base de datos"
interface TaskData {
    id: number;
    title: string;
    completed: boolean;
    projectId: number;
}
const mockTasks: TaskData[] = [
    { id: 1, title: 'Entrergar tarea 1', completed: false, projectId: 1 },
    { id: 2, title: 'Entregar tarea 2', completed: true, projectId: 1 },
    { id: 3, title: 'Entregar tarea 3', completed: false, projectId: 2 },
];

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
export const taskService = {
    
    async fetchTasks(signal?: AbortSignal) {
        await delay(1500);

        if (signal?.aborted) {
            throw new DOMException('Aborted', 'AbortError');
        }

        return mockTasks;
    },

    async fetchTasksByProject(projectId: number, signal?: AbortSignal) {
        await delay(1200);

        if (signal?.aborted) {
            throw new DOMException('Aborted', 'AbortError');
        }

        return mockTasks.filter(t => t.projectId === projectId);
    },

    async createTask(taskData: Omit<TaskData, 'id'>, signal?: AbortSignal) {
        await delay(800);

        if (signal?.aborted) {
            throw new DOMException('Aborted', 'AbortError');
        }

        const newTask = {
            id: Date.now(),
            ...taskData,
            completed: false
        };

        mockTasks.push(newTask);
        return newTask;
    },

    async updateTask(id: number, updates: Partial<TaskData>, signal?: AbortSignal) {
        await delay(600);

        if (signal?.aborted) {
            throw new DOMException('Aborted', 'AbortError');
        }

        const task = mockTasks.find(t => t.id === id);
        if (!task) throw new Error('Task not found');

        Object.assign(task, updates);
        return task;
    }
};
