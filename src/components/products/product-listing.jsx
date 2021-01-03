import React from "react"
import styled from 'styled-components'
import { useStaticQuery, graphql } from "gatsby"

import ProductListingItem from './product-listing-item'

import { breakpoints, colors } from '../../utils/styles';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0;


  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: nowrap;
    justify-content: ${props => props.isSingleItem ? 'center' : 'flex-start'};
    overflow-x: auto;
  }
`

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0;

  &.sale-text {
    -webkit-text-stroke: 1px ${colors.brand};
    font-weight: bold;
    font-size: 2.5rem;
    color: ${colors.lightest};
    text-shadow:
    -1px -1px 0 ${colors.brand},  
    1px -1px 0 ${colors.brand},
    -1px 1px 0 ${colors.brand},
      1px 1px 6px ${colors.lightest};
  }
`

const Text = styled.p`
  width: 80%;
  max-width: 400px;
  align-self: center;
  margin-top: 0;


  font-size: 1.25rem;
`


const ProductListing = ({ className, isFeature, isGiftCard }) => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyCollection {
        edges {
          node {
            handle 
            products {
              handle
              title
              shopifyId
              variants {
                image { 
                  id
                }
                id
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
                id
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              thumbs: images {
                id
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
  `)

  const filterdProducts = collection => (
    data.allShopifyCollection.edges
        .find(({node}) =>  node.handle === collection).node.products
  )
  
  const standards = filterdProducts('standards');
  const preOrder = filterdProducts('pre-order');
  const specials = filterdProducts('specials');
  const giftCard = filterdProducts('gift-cards');


  return (
    <>

      <Title>Feature</Title>
      <Container 
        className={className} 
        isSingleItem={preOrder.length === 1}
      >
        {preOrder.map(node => 
          <ProductListingItem 
            product={node} 
            isSingleItem={preOrder.length === 1}
            isFeature={isFeature}
            showThumbs={false}
            isGiftCard={isGiftCard} 
            key={node.shopifyId}
          />)
        }
      </Container>
      <Text>
          For every Listen to Metal Hoodie purchased, 20 meals will 
          be donated to those in need through the St.Louis Food Bank, 
          Operation Food Search. Also, you will be entered 
          into a raffle to win a brand new Prodigy practice bag! 
        </Text>

      <Title>Specials</Title>
      <Container 
        className={className} 
        isSingleItem={specials.length === 1}
      >
        {specials.map(node => 
          <ProductListingItem 
            product={node} 
            isSingleItem={specials.length === 1}
            isFeature={isFeature}
            showThumbs={false}
            isGiftCard={isGiftCard} 
            key={node.shopifyId}
          />)
        }
      </Container>
      <Title>Standards</Title>
      <Container 
        className={className} 
        isSingleItem={standards.length === 1}
      >
        {standards.map(node => 
          <ProductListingItem 
            product={node} 
            isSingleItem={standards.length === 1}
            isFeature={false}
            showThumbs={true}
            isGiftCard={false} 
            key={node.shopifyId}
          />)
        }
      </Container>
      <Title>Gift Card</Title>
      <Container 
        className={className} 
        isSingleItem={true}
      >
        {giftCard.map(node => 
          <ProductListingItem 
            product={node} 
            isSingleItem={true}
            isFeature={false}
            showThumbs={false}
            isGiftCard={true} 
            key={node.shopifyId}
          />)
        }
      </Container>
    </>
  )
}

export default ProductListing
