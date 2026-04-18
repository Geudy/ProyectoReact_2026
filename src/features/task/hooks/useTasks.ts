"use client";
import { useReducer, useCallback, useMemo } from "react";
import { Task, TaskStatus } from "../utils/mockData";

type State = {
    tasks: Task[];
    filter: "all" | TaskStatus;
    sortByStatus: boolean;
};

type Action =
    | { type: "ADD_TASK"; payload: Task }
    | { type: "DELETE_TASK"; payload: string }
    | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
    | { type: "SET_FILTER"; payload: "all" | TaskStatus }
    | { type: "SORT_BY_STATUS" };

function tasksReducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_TASK":
            return { ...state, tasks: [action.payload, ...state.tasks] };
        case "DELETE_TASK":
            return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((t) =>
                    t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
                ),
            };
        case "SET_FILTER":
            return { ...state, filter: action.payload };
        case "SORT_BY_STATUS": {
            const statusOrder = ["todo", "in_progress", "done"];
            const sortedTasks = [...state.tasks].sort((a, b) =>
                statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
            );
            return { ...state, tasks: sortedTasks, sortByStatus: true };
        }
        default:
            return state;
    }
}

export function useTasks(mockTasks: Task[]) {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: mockTasks,
        filter: "all",
        sortByStatus: false,
    });

    const filteredTasks = useMemo(() => {
        if (state.filter === 'all') return state.tasks;
        return state.tasks.filter(task => task.status === state.filter);
    }, [state.tasks, state.filter]);

    const sortedTasks = useMemo(() => {
        const statusOrder = ["todo", "in_progress", "done"];
        return [...state.tasks].sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    }, [state.tasks]);

    const stats = useMemo(() => ({
        total: state.tasks.length,
        byStatus: {
            todo: state.tasks.filter(t => t.status === 'todo').length,
            in_progress: state.tasks.filter(t => t.status === 'in_progress').length,
            done: state.tasks.filter(t => t.status === 'done').length,
        },
    }), [state.tasks]);

    const addTask = useCallback((task: Task) => {
        dispatch({ type: "ADD_TASK", payload: task });
    }, []);

    const deleteTask = useCallback((id: string) => {
        dispatch({ type: "DELETE_TASK", payload: id });
    }, []);

    const updateTask = useCallback((id: string, updates: Partial<Task>) => {
        dispatch({ type: "UPDATE_TASK", payload: { id, updates } });
    }, []);

    const setFilter = useCallback((filter: "all" | TaskStatus) => {
        dispatch({ type: "SET_FILTER", payload: filter });
    }, []);

    const sortByStatus = useCallback(() => {
        dispatch({ type: "SORT_BY_STATUS" });
    }, []);

    return {
        tasks: state.tasks,
        filter: state.filter,
        filteredTasks,
        sortedTasks,
        stats,
        addTask,
        deleteTask,
        updateTask,
        setFilter,
        sortByStatus,
    };
}