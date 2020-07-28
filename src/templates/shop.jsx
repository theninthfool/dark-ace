import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'


import Layout from '../components/layout'
import SEO from '../components/seo'


const ImgWrapper = styled.div`

`


const Shop = ({data}) => {
  return (
    <Layout>
        <SEO title="Shop" />
        <h1>The Shop</h1>
    </Layout>
  )
}

export const query = graphql`
query {
  file(relativePath: { eq: "motto.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default Shop