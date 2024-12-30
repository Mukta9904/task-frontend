import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Switch, Button, DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, now, parseAbsolute } from "@internationalized/date";
import { useFormContext } from "@/context/formContext";
import axios from "axios";
interface Task {
  _id?: string;
  title?: string;
  priority?: number;
  status?: "pending" | "finished";
  startTime?: Date;
  endTime?: Date;
}

const AddTaskForm = () => {
  const { currentTask, isFormOpen, setIsFormOpen, tasks, setTasks } =
    useFormContext();
  const [isEditing] = React.useState(currentTask?._id);
  const { handleSubmit, control, watch } = useForm();
  const onSubmit = async (data: Task) => {
    try {
      const token = localStorage.getItem("token");
      if (isEditing) {
        try {
          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/${currentTask?._id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            const newTasks = tasks?.map((task) =>
              task._id === currentTask?._id ? response.data : task
            );
            setTasks(newTasks || []);
            setIsFormOpen(!isFormOpen);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 201) {
            setTasks([...(tasks || []), response.data]);
            setIsFormOpen(!isFormOpen);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const watchStatus = watch("status", currentTask?.status || "pending");
  return (
    <div
      className={`fixed top-0 left-0 w-full items-center justify-center h-full bg-black bg-opacity-90 z-50 ${
        isFormOpen ? "flex" : "hidden"
      }`}
    >
      <form
        className="bg-black p-6 rounded-2xl flex justify-center items-center flex-col gap-5 border-slate-700 border-1 md:w-[400px] md:h-[450px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Task Title */}
        <p className="font-bold text-4xl text-gray-200">
          {isEditing ? "Edit the task" : "Add new task"}
        </p>
        <Controller
          name="title"
          control={control}
          defaultValue={currentTask?.title || ""}
          render={({ field }) => (
            <Input
              required
              {...field}
              label="Task Title"
              placeholder="Enter task title"
            />
          )}
        />
        {/* Task Status and Priority */}
        <div className="flex gap-6 items-center w-full">
          {/* Task Status */}
          <div className="flex items-center justify-around gap-2">
            <label className="text-white">Status:</label>
            <Controller
              name="status"
              defaultValue={currentTask?.status || "pending"}
              control={control}
              render={({ field }) => (
                <Switch
                  color="success"
                  {...field}
                  checked={field.value === "finished"}
                  {...(currentTask?.status === "finished" && {
                    defaultSelected: true,
                  })}
                  onChange={(e) =>
                    field.onChange(e.target.checked ? "finished" : "pending")
                  }
                  size="sm"
                />
              )}
            />
            <span className="text-gray-300 text-sm">
              {watchStatus
                ? watchStatus.charAt(0).toUpperCase() + watchStatus.slice(1)
                : "Pending"}
            </span>
          </div>

          {/* Task Priority */}
          <div className="flex items-center gap-2">
            <label htmlFor="priority" className="text-white">
              Priority:
            </label>
            <Controller
              name="priority"
              control={control}
              defaultValue={currentTask?.priority || 1}
              render={({ field }) => (
                <select
                  {...field}
                  className="bg-slate-700 text-white rounded-md px-2 py-1"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              )}
            />
          </div>
        </div>
        {/* Task Start Time */}
        <Controller
          name="startTime"
          control={control}
          defaultValue={
            currentTask?.startTime
              ? parseAbsolute(
                  currentTask?.startTime?.toString(),
                  getLocalTimeZone()
                )
              : now(getLocalTimeZone())
          }
          render={({ field }) => (
            <DatePicker
              hideTimeZone
              {...field}
              label="Start Time"
              onChange={(date) => field.onChange(date)}
            />
          )}
        />

        {/* Task End Time */}
        <Controller
          name="endTime"
          control={control}
          defaultValue={
            currentTask?.endTime
              ? parseAbsolute(
                  currentTask?.endTime?.toString(),
                  getLocalTimeZone()
                )
              : now(getLocalTimeZone())
          }
          render={({ field }) => (
            <DatePicker
              hideTimeZone
              {...field}
              label="End Time"
              onChange={(date) => field.onChange(date)}
            />
          )}
        />

        {/* Submit Button */}
        <div className="flex gap-4 ">
          <Button color="default" type="submit">
            {isEditing ? "Edit Task" : "Add Task"}
          </Button>
          <Button
            color="danger"
            onPress={() => {
              setIsFormOpen(!isFormOpen);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
