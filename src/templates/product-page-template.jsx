import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'


import ProductForm from '../components/products/product-form'

import SEO from '../components/seo'

const Title = styled.h1`
  margin: 1rem auto;
  color: white;
  width: 90%;
`

const Subtitle = styled.h2`
  margin: 1rem auto;
  color: white;
  width: 90%;
`

const Container = styled.div`
  display: flex;
  // align-items: center;
  margin: 3rem auto;
  color: white;
  width: 90%;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }


`
const ImgContainer = styled.div`
  // flex: 0 1 80%;
  width: 100%;
  max-width: 600px;
  min-width: 300px;
`

const FormContainer = styled.div`
  // height: 100%;
  width: 100%;
  & > * {
    // margin: 1rem;
  }
  
`

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const {
    variants: [initialVariant],
  } = product

  const [imageFluid, setImageFluid] = useState(initialVariant.image.localFile.childImageSharp.fluid)

  console.log(product.tags)
  const isPreOrder = product.tags.includes('pre-order')

  return (
    <>
      <SEO title={product.title} description={product.description} />
        <Title>{product.title}</Title>
        {isPreOrder ? <Subtitle>This is a pre order item</Subtitle> : null}
        <Container>
          <ImgContainer>
            <Img
                fluid={imageFluid}
                key={product.images[0].id}
                alt={product.title}
              />
          </ImgContainer>
          <FormContainer>
            <ProductForm product={product} setImageFluid={setImageFluid} />
            <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}}/>
          </FormContainer>
        </Container>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      tags
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
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
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage