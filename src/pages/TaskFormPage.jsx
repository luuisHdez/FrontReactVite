import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const TaskFormPage = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm(); 
    const navigate = useNavigate();
    const { id } = useParams(); // Destructuring for easier access to id

    useEffect(() => {
       const loadTask = async () => {
        if (id) {
            const data = await getTask(id);
            if (data) { // Checking if data is not undefined or null
                setValue("title", data.title);
                setValue("description", data.description);
            }
        }
       };
       
       loadTask();
    }, [id, setValue]); // Added setValue to the dependencies array

    const onSubmit = async (data) => {
        try {
            if (id) {
                await updateTask(id, data);
                toast.success('Task updated successfully');
            } else {
                await createTask(data);
                toast.success('Task created successfully');
            }
        } catch (error) {
            toast.error('An error occurred');
            console.error("There was an error!", error);
        } finally {
            navigate("/tasks");
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text" 
                    placeholder="title"
                    {...register("title", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" 
                />
                {errors.title && <span>This field is required</span>}
                
                <textarea 
                    rows="3" 
                    placeholder="description"
                    {...register("description", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                ></textarea>
                {errors.description && <span>This field is required</span>}
                
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
            </form>
            
            {id && (
                <div className="flex justify-end">
                    <button 
                        className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                        onClick={async () => {
                            if (window.confirm("Are you sure?")) {
                                await deleteTask(id);
                                toast.success('Task deleted successfully');
                                navigate("/tasks");
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}   
        </div>
    );                 
};

export default TaskFormPage;