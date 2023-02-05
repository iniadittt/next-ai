import React from 'react'
import Link from 'next/link'

const Navigasi = () => {
    return (
        <nav className="navbar fixed-top bg-body-tertiary bg-dark">
            <div className="container">
                <Link className="navbar-brand text-white" href='/'>ADITYA ARTIFICIAL INTELLIGENCE</Link>
            </div>
        </nav>
    )
}

export default Navigasi