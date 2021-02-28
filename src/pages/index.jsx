import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import ProductListing from '../components/products/product-listing'
import GiftCard from '../components/products/GiftCard'
import Youtube from '../components/youtube'
import SEO from "../components/seo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //Having align-items set to center prevents side scrolling for products

  width: 100%;
  text-align: center;
`

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0;
`

const ImgWrapper = styled.div`
  width: 100%;
  align-self: center;
`

const Banner = styled.div`
  width: 100%;
  align-self: center;
`

const StyledProductListing = styled(ProductListing)`
  margin-bottom: 30px;
`


const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <Container>
        <Banner>
          <Img fluid={data.parked.childImageSharp.fluid} />
        </Banner>
        <StyledProductListing />
        <GiftCard style={{marginTop: '30px'}}/>
        <Title>2020 Ledgestone Commercial</Title>
        <Youtube style={{alignSelf: 'center'}} />
        <ImgWrapper>
          <Img fluid={data.motto.childImageSharp.fluid} />
        </ImgWrapper>
      </Container>

    </>
  )
}

export const query = graphql`
query {
   motto: file(relativePath: { eq: "motto.png" }) {
    childImageSharp {
      fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  parked: file(relativePath: { eq: "parked.png" }) {
    childImageSharp {
      fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  winterWizards: file(relativePath: { eq: "winter-wizards.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default IndexPage
