import Head from 'next/head'
import Image from 'next/image'
import Dashboard from '../components/Dashboard_general'
import LoginPage from '../components/Login_General'
import Navbar from '../components/Navbar.js'
import styles from '../styles/Home.module.css'
import makebid from '../components/Makebid'
import LandingPage from './LandingPage'

export default function Home() {
  return (
    <>
      <LandingPage />
    </> 
  )
}
