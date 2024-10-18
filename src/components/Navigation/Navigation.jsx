 import { NavLink } from "react-router-dom";
 import clsx from "clsx";
 import s from "./Navigation.module.css"

const makeLinkClass=({isActive})=>{
    return clsx(s.link, isActive && s.active)
}

export default function Navigation() {
    return(
        <nav className={s.nav}>
            <NavLink to="/" className={makeLinkClass}>Home</NavLink>
            <NavLink to="/movies" className={makeLinkClass}>Movies</NavLink>
        </nav>
    )
}
