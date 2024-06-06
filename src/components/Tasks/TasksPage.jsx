import { TaskList } from "../Tasks/TaskList"
import { useNavigate } from "react-router-dom";

export function TasksPage() {

    const navigate = useNavigate();

    const addTasks = () => {
        navigate('/tasks/create');
    };

    return (
        
        <div>
            <button 
                    className="inline-flex items-center 
                            rounded-md px-4 py-2 text-xs 
                            font-medium text-green-700 border-2 
                            border-green-700 shadow-lg hover:bg-green-700 
                            hover:text-white transition duration-300"
                            onClick={addTasks}>
                        Add New
                </button>
            <div className="mt-4">
            <TaskList />
            </div>
                
        </div>
        
    )
}
export default TasksPage;