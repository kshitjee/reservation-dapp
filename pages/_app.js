import '../styles/globals.css'
import Navbar from '../components/Navbar'
import LoginPage from '../components/Login_General'
import addAuction from '../components/addAuction'


function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Navbar /> */}
      <addAuction />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
