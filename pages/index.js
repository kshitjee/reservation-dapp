import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header.js'

export default function Home() {
  return (
    <Header
      heading="Login to your account"
      paragraph="Don't have an account yet? "
      linkName="Signup"
      linkUrl="/signup"
    />
  )
}
