import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
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
    console.log(tasks); 
}, [tasks]);
   
    return <div className=" grid grid-tols-3 gap-3">
            {tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} />
               
))}
    </div>;
};