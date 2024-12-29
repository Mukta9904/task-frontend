import { useContext, createContext } from "react";
interface Task {
    _id: string;
    title: string;
    priority: number;
    status: 'pending' | 'finished';
    startTime: Date;
    endTime: Date;
}
interface FormContextType {
    tasks: Task[] | undefined;
    setTasks: (tasks: Task[]) => void;
    isFormOpen: boolean;
    setIsFormOpen: (open: boolean) => void;
    currentTask: Task | null;
    setCurrentTask: (task: Task | null) => void;
}
export const FormContext = createContext<FormContextType>({
    tasks: [],
    setTasks: () => {},
    isFormOpen: false,
    setIsFormOpen: () => {},
    currentTask: null,
    setCurrentTask: () => {}
});

export const useFormContext = () => useContext(FormContext);