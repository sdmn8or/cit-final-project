"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Heart,
  BarChart3,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState([])
  const [products, setProducts] = useState([])
  const [specialOffers, setSpecialOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true)
        console.log("[v0] Starting to fetch products from API...")

        const [newArrivalsRes, productsRes, specialOffersRes] = await Promise.all([
          fetch("/api/products/new-arrivals"),
          fetch("/api/products"),
          fetch("/api/products?category=special-offers"),
        ])

        console.log("[v0] API responses:", {
          newArrivals: newArrivalsRes.status,
          products: productsRes.status,
          specialOffers: specialOffersRes.status,
        })

        if (!newArrivalsRes.ok || !productsRes.ok || !specialOffersRes.ok) {
          throw new Error("Failed to fetch products")
        }

        const newArrivalsData = await newArrivalsRes.json()
        const productsData = await productsRes.json()
        const specialOffersData = await specialOffersRes.json()

        console.log("[v0] API data received:", {
          newArrivals: newArrivalsData,
          products: productsData,
          specialOffers: specialOffersData,
        })

        setNewArrivals(newArrivalsData.data || [])
        setProducts(productsData.data?.slice(0, 4) || []) // Limit to 4 for grid display
        setSpecialOffers(specialOffersData.data?.slice(0, 4) || []) // Limit to 4 for grid display
      } catch (err) {
        console.error("[v0] Error fetching products:", err)
        setError(err.message)

        const fallbackProducts = [
          {
            id: 1,
            name: "Basic Crew Neck Tee",
            price: 44.0,
            color: "Black",
            image: "/placeholder.svg?height=300&width=300",
            isNew: true,
          },
          {
            id: 2,
            name: "Designer Handbag",
            price: 89.0,
            color: "Brown",
            image: "/placeholder.svg?height=300&width=300",
            isNew: false,
          },
          {
            id: 3,
            name: "Wireless Headphones",
            price: 129.0,
            color: "White",
            image: "/placeholder.svg?height=300&width=300",
            isNew: true,
          },
          {
            id: 4,
            name: "Smart Watch",
            price: 199.0,
            color: "Silver",
            image: "/placeholder.svg?height=300&width=300",
            isNew: false,
          },
          {
            id: 5,
            name: "Running Shoes",
            price: 79.0,
            color: "Blue",
            image: "/placeholder.svg?height=300&width=300",
            isNew: true,
          },
          {
            id: 6,
            name: "Laptop Backpack",
            price: 59.0,
            color: "Gray",
            image: "/placeholder.svg?height=300&width=300",
            isNew: false,
          },
          {
            id: 7,
            name: "Coffee Mug",
            price: 15.0,
            color: "White",
            image: "/placeholder.svg?height=300&width=300",
            isNew: false,
          },
          {
            id: 8,
            name: "Desk Lamp",
            price: 45.0,
            color: "Black",
            image: "/placeholder.svg?height=300&width=300",
            isNew: true,
          },
        ]

        console.log("[v0] Using fallback data with", fallbackProducts.length, "products")
        setNewArrivals(fallbackProducts)
        setProducts(fallbackProducts.slice(0, 4))
        setSpecialOffers(fallbackProducts.slice(4, 8))
      } finally {
        setLoading(false)
        console.log("[v0] Finished loading products")
      }
    }

    fetchAllProducts()
  }, [])

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      })

      if (response.ok) {
        console.log("Product added to cart successfully")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const handleAddToWishlist = async (productId) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })

      if (response.ok) {
        console.log("Product added to wishlist successfully")
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-black">OREBI</h1>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-black">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Shop
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Contacts
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Journal
              </a>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Bottom Navigation Row */}
          <div className="flex items-center justify-between h-12 border-t border-gray-100">
            {/* Shop by Category */}
            <div className="flex items-center">
              <Menu className="w-4 h-4 mr-2" />
              <span className="text-gray-600 text-sm">Shop by Category</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input placeholder="Search Products" className="pl-4 pr-10 w-full border-gray-200 text-sm" />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Empty space for balance */}
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-5xl font-bold text-black mb-4">Final Offer</h2>
              <p className="text-lg text-gray-600 mb-8">Up to 50% sale for all furniture items!</p>
              <Button className="bg-black text-white px-8 py-3 hover:bg-gray-800">Shop Now</Button>
            </div>
            <div className="flex-1 flex justify-end">
              <img src="/images/headphones.png" alt="Premium Headphones" className="w-96 h-80 object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Two years warranty */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                <span className="text-lg font-bold text-black">2</span>
              </div>
              <span className="text-gray-600 text-sm">Two years warranty</span>
            </div>

            {/* Free shipping */}
            <div className="flex items-center space-x-3">
              <Truck className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600 text-sm">Free shipping</span>
            </div>

            {/* Return policy */}
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600 text-sm">Return policy in 30 days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 mb-16">
            {/* Left Section - Phones Sale (Pendant Lights) */}
            <div
              className="relative rounded-lg overflow-hidden bg-gray-100"
              style={{
                width: "780px",
                height: "780px",
                backgroundImage: "url('/images/pendant-lights.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white mb-2">Phones Sale</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-white text-sm">Up to</span>
                  <span className="text-5xl font-bold text-white">30%</span>
                </div>
                <p className="text-white text-sm mb-6">sale for all phones!</p>
                <Button className="bg-black text-white px-6 py-2 w-fit hover:bg-gray-800">Shop Now</Button>
              </div>
            </div>

            {/* Right Section - Two stacked boxes */}
            <div className="flex flex-col gap-6">
              {/* Electronics Sale with Clock Background */}
              <div
                className="relative rounded-lg overflow-hidden bg-gray-100"
                style={{
                  width: "784px",
                  height: "370px",
                  backgroundImage: "url('/images/wall-clock.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Electronics Sale</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-white text-sm">Up to</span>
                    <span className="text-4xl font-bold text-white">70%</span>
                  </div>
                  <p className="text-white text-sm mb-4">sale for all electronics!</p>
                  <Button className="bg-black text-white px-6 py-2 w-fit hover:bg-gray-800">Shop Now</Button>
                </div>
              </div>

              {/* Furniture Offer with Lamp Background */}
              <div
                className="relative rounded-lg overflow-hidden bg-gray-100"
                style={{
                  width: "784px",
                  height: "370px",
                  backgroundImage: "url('/images/table-lamp.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Furniture Offer</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-white text-sm">Up to</span>
                    <span className="text-4xl font-bold text-white">50%</span>
                  </div>
                  <p className="text-white text-sm mb-4">sale for all furniture items!</p>
                  <Button className="bg-black text-white px-6 py-2 w-fit hover:bg-gray-800">Shop Now</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-black mb-8">New Arrivals</h3>

            {/* Navigation arrows and product grid container */}
            <div className="relative">
              {/* Left arrow */}
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Right arrow */}
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* Product Grid */}
              {loading ? (
                <div className="grid grid-cols-4 gap-6">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">Error loading products: {error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-6">
                  {newArrivals.map((product) => (
                    <div key={product.id} className="group cursor-pointer relative">
                      {/* Product Card */}
                      <div className="bg-gray-100 rounded-lg p-6 mb-4 group-hover:bg-gray-200 transition-colors relative overflow-hidden">
                        {/* New Badge */}
                        {product.isNew && (
                          <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded z-20">
                            New
                          </div>
                        )}

                        {/* Product Image */}
                        <img
                          src={product.image || "/placeholder.svg?height=300&width=300"}
                          alt={product.name}
                          className="w-full h-48 object-contain mb-4"
                        />

                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <div className="flex flex-col space-y-3 bg-white rounded-lg p-2 shadow-lg">
                            <button
                              onClick={() => handleAddToWishlist(product.id)}
                              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn"
                            >
                              <Heart className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn">
                              <BarChart3 className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                            </button>
                            <button
                              onClick={() => handleAddToCart(product.id)}
                              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn"
                            >
                              <ShoppingCart className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <h4 className="font-medium text-black mb-1">{product.name}</h4>
                      <p className="text-gray-600 text-sm mb-1">${product.price.toFixed(2)}</p>
                      <p className="text-gray-500 text-xs">{product.color}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Phone of the Year Section */}
          <div
            className="rounded-lg mb-16 relative overflow-hidden"
            style={{
              height: "400px",
              backgroundImage: "url('/images/phone-year-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Optional overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-white bg-opacity-10"></div>

            {/* Content positioned over the background */}
            <div className="relative z-10 h-full flex items-center justify-end pr-12">
              <div className="max-w-md">
                <h3 className="text-4xl font-bold text-black mb-4">Phone of the year</h3>
                <p className="text-gray-700 mb-8">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.
                </p>
                <Button className="bg-black text-white px-8 py-3 hover:bg-gray-800">Shop Now</Button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {products.map((product, index) => (
              <div key={product.id || index} className="group cursor-pointer relative">
                <div className="bg-gray-50 rounded-lg p-6 mb-4 group-hover:bg-gray-100 transition-colors relative overflow-hidden">
                  <img
                    src={product.image || `/placeholder.svg?height=200&width=200&query=${product.name}`}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                  />

                  {/* Hover Actions */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="flex flex-col space-y-3 bg-white rounded-lg p-2 shadow-lg">
                      <button
                        onClick={() => handleAddToWishlist(product.id)}
                        className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn"
                      >
                        <Heart className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn">
                        <BarChart3 className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn"
                      >
                        <ShoppingCart className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                      </button>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-black mb-1">{product.name}</h4>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Special Offers */}
          <div>
            <h3 className="text-3xl font-bold text-black mb-8">Special Offers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {specialOffers.map((product, index) => (
                <div key={product.id || index} className="group cursor-pointer relative">
                  <div className="bg-gray-50 rounded-lg p-6 mb-4 group-hover:bg-gray-100 transition-colors relative overflow-hidden">
                    <img
                      src={product.image || `/placeholder.svg?height=200&width=200&query=${product.name}`}
                      alt={product.name}
                      className="w-full h-48 object-contain"
                    />

                    {/* Hover Actions */}
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="flex flex-col space-y-3 bg-white rounded-lg p-2 shadow-lg">
                        <button
                          onClick={() => handleAddToWishlist(product.id)}
                          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn"
                        >
                          <Heart className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn">
                          <BarChart3 className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors group/btn"
                        >
                          <ShoppingCart className="w-4 h-4 text-gray-600 group-hover/btn:text-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-black mb-1">{product.name}</h4>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-5 gap-8 mb-12">
            {/* MENU Column */}
            <div>
              <h5 className="font-semibold text-black mb-6 text-sm uppercase tracking-wide">MENU</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Journal
                  </a>
                </li>
              </ul>
            </div>

            {/* SHOP Column */}
            <div>
              <h5 className="font-semibold text-black mb-6 text-sm uppercase tracking-wide">SHOP</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Category 1
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Category 2
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Category 3
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Category 4
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Category 5
                  </a>
                </li>
              </ul>
            </div>

            {/* HELP Column */}
            <div>
              <h5 className="font-semibold text-black mb-6 text-sm uppercase tracking-wide">HELP</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Special E-shop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Secure Payments
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information Column */}
            <div>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="font-medium text-black">(052) 611-5711</p>
                <p>company@domain.com</p>
                <p className="leading-relaxed">575 Crescent Ave, Quakertown, PA 19951</p>
              </div>
            </div>

            {/* OREBI Logo Column */}
            <div className="flex justify-end">
              <h1 className="text-2xl font-bold text-black">OREBI</h1>
            </div>
          </div>

          {/* Bottom Section with Social Icons and Copyright */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v11.452zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.911-2.168 2.911-1.024 0-1.518.769-1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">2020 Orebi Minimal eCommerce Figma Template by Adveits</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
