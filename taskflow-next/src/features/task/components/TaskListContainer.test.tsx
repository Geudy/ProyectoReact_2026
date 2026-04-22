import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskListContainer } from './TaskListContainer';

jest.mock('../hooks', () => ({
  useTasks: () => ({
    filteredTasks: [],
    filter: '',
    setFilter: jest.fn(),
    addTask: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn(),
    sortByStatus: jest.fn(),
    stats: { total: 0, byStatus: { todo: 0, in_progress: 0, done: 0 } },
  }),
}));
jest.mock('../hooks/useForm', () => ({
  useForm: () => ({
    values: { titulo: '', descripcion: '' },
    errors: {},
    touched: {},
    isSubmitting: false,
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    submit: (cb: any) => cb({ titulo: '', descripcion: '' }),
  }),
}));
jest.mock('../hooks/useAsync', () => ({
  useAsync: () => ({ run: jest.fn(), loading: false, error: null }),
}));


describe('TaskListContainer', () => {
  it('renderiza correctamente el formulario y mensaje de no tareas', () => {
    render(<TaskListContainer />);
    expect(screen.getByPlaceholderText('Título')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('No hay tareas para mostrar')).toBeInTheDocument();
    expect(screen.getByText('Agregar tarea')).toBeInTheDocument();
  });

  it('muestra errores de validación si los campos están vacíos', async () => {
    render(<TaskListContainer />);
    fireEvent.blur(screen.getByPlaceholderText('Título'));
    fireEvent.blur(screen.getByPlaceholderText('Descripción'));
  });
});
