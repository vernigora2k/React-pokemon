import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
        <div className="navbar-brand">
            Pokemons app
        </div>

        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/"
                    exact
                >
                    Main page
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/details"
                >
                    Details page
                </NavLink>
            </li>
        </ul>
    </nav>
)