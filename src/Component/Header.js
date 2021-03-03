import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        
          <div>
                <nav>
                        <ul>
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            <li>
                            <Link to="/shop">Shop</Link>
                            </li>
                            <li>
                            <Link to="/login">Log In</Link>
                            </li>
                        </ul>
                </nav>
          </div>
    )
}
