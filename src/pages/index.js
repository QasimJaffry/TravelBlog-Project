import React from "react"
import { Link } from "gatsby"
import Nav from '../components/nav/index'
import Featured from '../components/featured/index'
import Home from '../components/Home/index'
import Layout from "../components/layout"
import Footer from '../components/Footer/index'
import './index.css';
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
  <Nav />
  <Featured />
  <Home />
  
  <Link to='/blog' className='viewmore'>View More</Link>
  <Footer />
  </Layout>
)

export default IndexPage
