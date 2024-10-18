import { Link, useLocation } from "react-router-dom";

export default function MovieItem({item}) {

    const location = useLocation();

    return(
        <div>
            <Link to={`/movies/${item.id}`} state={location}>{item.title}</Link>    
        </div>
    )
}
