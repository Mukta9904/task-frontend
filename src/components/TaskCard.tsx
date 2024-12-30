"use client";

import { Button, Card, Spacer } from "@nextui-org/react";
import { useFormContext } from "@/context/formContext";
import axios from "axios";

const TaskCard = ({ task }: any) => {
  const { setIsFormOpen, setCurrentTask,tasks, setTasks} = useFormContext();
  const handleEdit = ()=>{
    setCurrentTask(task)
    setIsFormOpen(true);
  }
  const handleDelete = async ()=>{
    if (typeof window !== "undefined") {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task._id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        const newTasks = tasks?.filter((t)=> t._id !== task._id)
        setTasks(newTasks || []);
      }
    }
  }
  return (
    <Card className="p-4 flex flex-col justify-between items-center gap-2">
      <p className="text-gray-500 text-left w-full pl-5">Task</p>
      <h3 className="font-bold text-blue-500 text-left w-full pl-5 text-lg">{task.title}</h3>
      <div className="flex  pl-5 justify-center items-center">
      <div className=" flex flex-col gap-2">
      <p >Priority: {task.priority}</p>
      <p className="text-gray-400 underline underline-offset-8">Start Time</p>
      <p>{new Date(task.startTime).toLocaleString()}</p>
      </div>
      <div className=" flex flex-col gap-2">
      <p className={task.status === "pending" ? "text-red-600 mr-5 text-center border-1 border-red-500 bg-white rounded-full  bg-opacity-90":"text-green-600 border-1 border-green-500 bg-white rounded-full text-center mr-4  bg-opacity-90"}>{task?.status.charAt(0).toUpperCase() + task?.status.slice(1)}</p>
      <p className="text-gray-400 underline underline-offset-8">End Time</p>
      <p>{new Date(task.endTime).toLocaleString()}</p>
      </div>
      </div>
      <Spacer y={0.5} />
      <div className="flex items-center justify-center space-x-2">
        <Button size="sm" color="default" onPress={handleEdit}>Edit</Button>
        <Button size="sm" color="danger" onPress={handleDelete}>Delete</Button>
      </div>
    </Card>
  );
};

export default TaskCard;
