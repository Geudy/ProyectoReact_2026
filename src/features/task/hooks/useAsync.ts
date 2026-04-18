import { useState, useCallback, useRef, useEffect } from 'react';

interface AsyncState<T> {
    loading: boolean;
    error: null | Error;
    value: T | null;
}
    
export function useAsync<T, Args extends any[]>(asyncFn: (...args: Args) => Promise<T>) {
    const [state, setState] = useState<AsyncState<T>>({ loading: false, error: null, value: null });
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    const run = useCallback(async (...args: Args) => {
        if (abortRef.current) {
            abortRef.current.abort(); 
        }
        const controller = new AbortController();
        abortRef.current = controller;
        setState({ loading: true, error: null, value: null });
        try {
            const value = await asyncFn(...args);
            setState({ loading: false, error: null, value });
            return value;
        } catch (error) {
            if ((error as any)?.name === 'AbortError') {
                return;
            }
            setState({ loading: false, error: error as Error, value: null });
            throw error;
        }
    }, [asyncFn]);

    return { ...state, run, abort: () => abortRef.current?.abort() };
}
