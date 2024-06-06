import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/tasks.api";
import { TaskCard } from "./TaskCard";
export function TaskList() {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
            async function loadTasks() {
            const res = await getAllTasks(); 
            setTasks(res);
    }
    loadTasks();
}, []);
useEffect(() => {
}, [tasks]);
   
return (
    <div className="grid gap-4 p-2 rounded-md">
        {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} />
        ))}
    </div>
);
}