import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as single_url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  console.log(useParams());
  const {id} = useParams(); 
  const history = useHistory();

  const {single_product_loading: loading, single_product_error: error, single_product: product, fetchSingleProduct} = useProductsContext();

  useEffect(() => {
    console.log("id param changed", id);
    fetchSingleProduct(id)
  }, [])

   //console.log(product);

  useEffect(() => {
  if(error) {
    setTimeout(() => {
   history.push('/')
  },3000)
   }
  },[error])

  if(loading) {
    return <Loading/>
  }
  if (error) {
    return <Error />
  }
  const {title, category, description, image, rating, price, id:SKU } = product
  return <Wrapper>
    <PageHero title={title} product/>
    <div className="section section-center page">
      <Link to="/products" className="btn">back to products</Link>
      <div className="product-center">
        <img src={image}/>
        <section className='content'>
          <h2>{title}</h2>
          <Stars />
          <h5 className='price'>{price}€</h5>
          <p className='desc'>{description}</p>
          <p className="info">
            <span>Available: </span>
            {rating > 0 ? 'In stock': 'out of stock'}
          </p>
         <hr/ >
         {rating > 0 && <AddToCart/>}
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
