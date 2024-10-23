'use client'

import { useProductsAndCart } from "@/hooks/useProductsAndCart"
import { ProductCard } from "@/components/productCard"
import { Loader } from "./ui/loader"
import { CartSection } from "./cart-section"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"

export function Products(): JSX.Element {
  const { products, loading, cart, addToCart, removeFromCart } = useProductsAndCart()

  if (loading) {
    return <Loader />
  }

  return (
    <div className="relative w-full">
      <div className="container mx-auto px-4 py-12">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                cartQuantity={cart.get(product.id)?.quantity || 0}
                onAddToCart={() => addToCart(product)}
                onRemoveFromCart={() => removeFromCart(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Flechas de navegación personalizadas */}
        <button className="swiper-button-prev absolute left-4 top-1/2 z-10 transform -translate-y-1/2 p-3 bg-transparent hover:bg-transparent rounded-full shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="hsl(46, 80%, 60%)">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="swiper-button-next absolute right-4 top-1/2 z-10 transform -translate-y-1/2 p-3 bg-transparent hover:bg-transparent rounded-full shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="hsl(46, 80%, 60%)">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <CartSection cart={cart} />
    </div>
  )
}

