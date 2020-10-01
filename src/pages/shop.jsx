import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import HorizontalScroll from '../components/horizontal-scroll'


const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
`


const ProductsPage = ({ data }) => {

  const preOrders = data.allShopifyCollection.edges
                  .find(({node}) =>  node.handle === 'pre-order')
                  .node.products

  const standards = data.allShopifyCollection.edges
  .find(({node}) =>  node.handle === 'standards')
  .node.products


  
  return (
    <>
      <Title>Pre-Order</Title>
      <HorizontalScroll products={preOrders} />
      <div style={{height: '2.5rem'}}></div>
      <Title>Dark Ace Standards</Title>
      <HorizontalScroll products={standards} />
    </>
  )
}

export default ProductsPage

export const query = graphql`
  {
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