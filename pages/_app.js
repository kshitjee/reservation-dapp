import '../styles/globals.css'
import Navbar from '../components/Navbar'
import LoginPage from '../components/Login_General'



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
