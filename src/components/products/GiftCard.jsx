import React, { useState } from 'react'
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

import styled from 'styled-components'
import Img from 'gatsby-image'
import { useShopify } from '../../hooks/useShopify'
import { useCheckout } from '../../hooks/useCheckout'


import { colors, BrandButton, DarkBrandButton } from '../../utils/styles';
import { formatPrice } from '../../utils/helpers';



const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;

  width: 80vw;
  max-width: 350px;
`

const ImgContainer = styled.div`
  width: 100%;
  box-shadow: 0 0 8px ${colors.brand};

  position: relative;
`

const OverLay = styled.div`
  display: ${({open}) => open ? 'block' : 'none'};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background: ${colors.brandTransparent};
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
    flex: 1 1 25%;

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

  const { giftCard } = useShopify()
  const { images, variants } = giftCard

  const {
    variant,
    status,
    addToCart,
    setVariant
  } = useCheckout(giftCard)

  const [listOpen, setListOpen] = useState(false);

  const handleAddToCart = () => {
    if (status !== 'Adding') {
      addToCart(variant.shopifyId, 1)
    }
  }

  const toggleListOpen = () => setListOpen(!listOpen)

  const price = <div>{formatPrice(variant.priceV2)}</div>
  const icon = listOpen ? <BsCaretDown/> : <BsCaretUp/>;

 
  return (
      <ProductContainer>
        <ImgContainer onClick={toggleListOpen}>
          <Img 
            fluid={images[0].localFile.childImageSharp.fluid} 
            alt={'Gift Card'}
          />
          <OverLay open={listOpen}/>
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
            <CurrentPrice onClick={toggleListOpen}>
              {price}{icon}
            </CurrentPrice>
          </ListControls>
          <BrandButton onClick={handleAddToCart}>Add To Cart</BrandButton>
        </ButtonContainer>
      </ProductContainer>
  )
}


export default GiftCard
