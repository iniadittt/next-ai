import React from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'

const Index = () => {
    return (
        <>
            <Navigasi/>
            <div className="jumbotron mt-5 pt-5 container">
                <h1 className="display-4">Aditya Bayu Aji</h1>
                <p className="lead">Project Artificial Intelligence untuk tugas akhir matakuliah Artificial Intelligence</p>
                <hr className="my-4"/>
                <Link href='/ai' className="btn btn-dark px-3" role="button">Coba AI</Link>
            </div> 
        </>
    )
}

export default Index