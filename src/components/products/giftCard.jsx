import React, { useState, useContext } from 'react'
import { StoreContext } from '../../context/StoreContextProvider'
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

import { breakpoints, colors, BrandButton, DarkBrandButton } from '../../utils/styles';
import { formatPrice } from '../../utils/helpers';



const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;

  width: 70vw;
  max-width: 300px;
`

const ImgContainer = styled.div`
  width: 100%;
  box-shadow: 0 0 8px ${colors.brand};

  position: relative;



  @media (max-width: ${breakpoints.tablet}) {}

  // .gatsby-image-wrapper {}
`

const ButtonContainer = styled.div`
  display: flex;
  
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;

`


const ListControls = styled.div`
  display: flex;
  align-items: center;
  
  div {
    margin-right: 7px;
  }
`

const CurrentPrice = styled(BrandButton)`
  display: flex;
`


const List = styled.div`
  position: absolute;
  top: 0;

  display: ${({open}) => open ? 'flex' : 'none'};
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;


  .list-child {
    background: ${colors.darkGradient};

    border: 1px solid ${colors.lightest};
    color: ${colors.lightest};

    padding: 10px;
    margin: 5px;

    &:hover {
      background-color: red
    }
  }
}
`



const GiftCard = () => {
  const data = useStaticQuery(graphql`
  query GetGiftCard {
    shopifyProduct(handle: {eq: "dark-ace-gift-card"}) {
      handle
      images {
        id
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        localFile {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      variants {
        shopifyId
        priceV2 {
          amount
          currencyCode
        }
      }
    }
  }
`)

  const { images, variants } = data.shopifyProduct;

  const { addVariantToCart } = useContext(StoreContext)

  const [variant, setVariant] = useState(variants[0]);
  const [listOpen, setListOpen] = useState(false);

  const handleAddToCart = () => {
    addVariantToCart(variant.shopifyId, 1)
  }

  const toggleListOpen = () => {
    setListOpen(!listOpen)
  }

  const price = <div>{formatPrice(variant.priceV2)}</div>;
  const icon = listOpen ? <BsCaretDown/> : <BsCaretUp/>;

 
  return (
      <ProductContainer>
        <ImgContainer onClick={toggleListOpen}>
          <Img 
            fluid={images[0].localFile.childImageSharp.fluid} 
            alt={'Gift Card'}
          />
          <List open={listOpen}>
            { variants.map(v => {
              const price = formatPrice(v.priceV2)
              return (
                <DarkBrandButton 
                  className='list-child' 
                  key={v.shopifyId}
                  onClick={() => setVariant(v)}
                >
                  {price}
                </DarkBrandButton>
              )
            })}
          </List>
        </ImgContainer>
        <ButtonContainer>
          <ListControls>
            {/* <div>Amount:</div> */}
            <CurrentPrice onClick={toggleListOpen}>{price}{icon}</CurrentPrice>
          </ListControls>
          <BrandButton onClick={handleAddToCart}>Add To Cart</BrandButton>
        </ButtonContainer>
      </ProductContainer>
  )
}


export default GiftCard
