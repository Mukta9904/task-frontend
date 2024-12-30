"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import AddTaskForm from "@/components/AddTaskForm";
import TaskCard from "@/components/TaskCard";
import axios from "axios";
import { FormContext } from "@/context/formContext";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/react";
import Wrapper from "@/components/Wrapper";
import Logout from "@/components/Logout";

interface Task {
  _id: string;
  title: string;
  priority: number;
  status: "pending" | "finished";
  startTime: Date;
  endTime: Date;
}
interface Filters {
  priority?: number;
  status?: string;
  sortBy?: string;
  order?: string;
}
const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<Filters>({
    priority: undefined,
    status: undefined,
    sortBy: undefined,
    order: undefined,
  });

  // Fetch tasks from backend with filters applied
  const fetchTasks = async (appliedFilters = filters) => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const queryParams = new URLSearchParams();
        for (const key in appliedFilters) {
          if (
            appliedFilters.hasOwnProperty(key) &&
            appliedFilters[key as keyof Filters]
          ) {
            queryParams.append(
              key,
              appliedFilters[key as keyof Filters] as string
            );
          }
        }
        const query = queryParams.toString();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/?${query}`,
          { headers }
        );
        if (response.status === 200) {
          setTasks(response.data);
        }
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    console.log(key, value);

    const updatedFilters = { ...filters, [key]: value };

    Object.keys(updatedFilters).forEach((filterKey: string) => {
      if (!updatedFilters[filterKey as keyof Filters]) {
        delete updatedFilters[filterKey as keyof Filters];
      }
    });

    setFilters(updatedFilters);
    fetchTasks(updatedFilters);
  };

  const handleIsOpen = () => {
    setCurrentTask(null);
    setIsFormOpen(!isFormOpen);
  };

  return (
    <Wrapper>
      <FormContext.Provider
        value={{
          isFormOpen,
          setIsFormOpen,
          tasks,
          setTasks,
          currentTask,
          setCurrentTask,
        }}
      >
        <div className="flex h-full bg-black text-white">
          <Sidebar />
          <main className="p-8 w-full">
            <h1 className="text-2xl my-5 font-bold">Task List</h1>
            <Button
              onPress={handleIsOpen}
              className="rounded-full text-lg font-bold"
              color="default"
              size="lg"
            >
              Add Task
            </Button>
            {/* Filters Section */}
            <div className="flex  items-center gap-4 my-4">
              <Select
                label="Priority"
                value={filters?.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
                className="text-black w-52"
              >
                <SelectItem key={1}>1</SelectItem>
                <SelectItem key={2}>2</SelectItem>
                <SelectItem key={3}>3</SelectItem>
                <SelectItem key={4}>4</SelectItem>
                <SelectItem key={5}>5</SelectItem>
                {/* Add more options as needed */}
              </Select>
              <Select
                label="Status"
                value={filters?.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="text-black w-52"
              >
                <SelectItem key="pending">Pending</SelectItem>
                <SelectItem key="finished">Finished</SelectItem>
              </Select>
              <Select
                label="Sort By"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="text-black w-52"
              >
                <SelectItem key="startTime">Start Time</SelectItem>
                <SelectItem key="endTime">End Time</SelectItem>
              </Select>
              <Select
                label="Order"
                value={filters.order}
                onChange={(e) => handleFilterChange("order", e.target.value)}
                className="text-black w-52"
              >
                <SelectItem key="asc">Ascending</SelectItem>
                <SelectItem key="desc">Descending</SelectItem>
              </Select>
            </div>

            {/* Task Cards */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {tasks && tasks.length > 0 ? (
                tasks.map((task) => <TaskCard key={task?._id} task={task} />)
              ) : (
                <p>No tasks found.</p>
              )}
            </div>

            {isFormOpen && <AddTaskForm />}
          </main>
          <Logout />
        </div>
      </FormContext.Provider>
    </Wrapper>
  );
};

export default Tasks;
