import { Link } from "react-router-dom"
function Navigation(){
    return (
        <div className="flex justify-between py-3">
                <h1 className="font-bold text-3xl mb-4">PyReact</h1>
            <button className="bg-indigo-500 px-3 py-2 rounded-lg">
                <Link to="register">Register</Link>
            </button>
            
        </div> 
    )
}
export default Navigation;