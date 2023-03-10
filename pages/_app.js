import { useEffect } from "react";
import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js")
    }, [])

    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
