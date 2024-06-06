import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
    const navigate = useNavigate();

    // Definir la función de navegación
    const modifyTasks = () => {
        navigate(`/tasks/${task.id}`);
    };

    return (
        <div
            className="bg-zinc-800 p-3 hover:bg-zinc-700 
            hover:cursor-pointer flex justify-between items-center border-2 
            border-white-700"
        >
            <div className="flex-1">
                <h1 className="font-bold uppercase">{task.title}</h1>
                <p className="text-slate-400">{task.description}</p>
            </div>

            <div className="flex space-x-2">
                <button
                    className="inline-flex items-center 
                        rounded-md px-4 py-2 text-xs 
                        font-medium text-blue-700 border-2 
                        border-blue-700 shadow-lg hover:bg-blue-700 
                        hover:text-white transition duration-300"
                    onClick={(e) => { modifyTasks(); }}
                >
                    Modify
                </button>
            </div>
        </div>
    );
}
