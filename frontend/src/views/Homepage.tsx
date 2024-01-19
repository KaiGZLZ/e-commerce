
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import PrincipalTabs from '../components/PrincipalTabs'
import ProductGrid from '../components/ProductGrid'
import { useDispatch } from 'react-redux'
import { setCart } from '../redux/slices/cartSlice'
import CartFloatButton from '../components/CartFloatButton'
import FooterComponent from '../components/FooterComponent'



const arrayImages = [
  'https://pczatelca.com/images/slides/banner1.jpg',
  'https://pczatelca.com/images/slides/banner2.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
]


const arrayImages2 = [
  'https://pczatelca.com/images/slides/banner1.jpg',
  'https://pczatelca.com/images/slides/banner2.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
]



const arrayImages3 = [
  'https://pczatelca.com/images/slides/banner1.jpg',
  'https://pczatelca.com/images/slides/banner2.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner1.jpg',
  'https://pczatelca.com/images/slides/banner2.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
  'https://pczatelca.com/images/slides/banner3.jpg',
]


function HomePage() {

  const dispatch = useDispatch()

  useEffect(() => {
    const cart = localStorage.getItem('cart')

    if (cart) {
      const newCart = JSON.parse(cart)
      dispatch(setCart(newCart))
    }
  }, [])

  return <>
    <Navbar />
    <Carousel images={arrayImages} />
    <PrincipalTabs images={arrayImages2} images2={arrayImages3} />
    <ProductGrid />
    <FooterComponent  />
    <CartFloatButton />
  </>
}

export default HomePage