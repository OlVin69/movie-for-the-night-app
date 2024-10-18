import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return(
    <div>
       <p>Unfortunatly, there are no such page</p> 
       <Link to="/">Go back to home page!</Link>
        </div>)
}
