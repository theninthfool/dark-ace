import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

// import Slideshow from '../components/slideshow'
import HorizontalScroll from '../components/horizontal-scroll'
import Youtube from '../components/youtube'

import SEO from "../components/seo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 100%;

   & > * {
     margin-top: 1.5rem;
   }
`

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-top: 60px;
`

const ImgWrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 100%;
  align-self: center;
`

const Banner = styled.div`
  // margin-top: 5vh;
  margin-bottom: 5vh;
  width: 100vw;
  max-width: 1500px;
  align-self: center;
`


const IndexPage = ({data}) => {

  const preOrders = data.allShopifyCollection.edges
  .find(({node}) =>  node.handle === 'pre-order')
  .node.products

  const standards = data.allShopifyCollection.edges
  .find(({node}) =>  node.handle === 'standards')
  .node.products

  return (
    <>
      <SEO title="Home" />
      <Container>
        <Banner>
          <Img fluid={data.parked.childImageSharp.fluid} />
        </Banner>
        <Title>Pre-Order</Title>
        <HorizontalScroll products={preOrders} />
        <Title>Dark Ace Standards</Title>
        <HorizontalScroll products={standards} />
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
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  parked: file(relativePath: { eq: "parked.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  allShopifyCollection {
    edges {
      node {
        handle 
        products {
          handle
          title
          shopifyId
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          thumbs: images {
            localFile {
              childImageSharp {
                fixed(height: 60, width: 48) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default IndexPage
