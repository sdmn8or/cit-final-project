export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const limit = searchParams.get("limit")

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Basic Crew Neck Tee",
      price: 44.0,
      originalPrice: 55.0,
      color: "Black",
      image: "/images/basic-crew-neck-tee.png",
      isNew: true,
      category: "clothing",
      description: "Comfortable cotton crew neck tee perfect for everyday wear.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Gray"],
      inStock: true,
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      color: "Black",
      image: "/images/headphones.png",
      isNew: true,
      category: "electronics",
      description: "Premium wireless headphones with noise cancellation.",
      colors: ["Black", "White", "Silver"],
      inStock: true,
      rating: 4.8,
      reviews: 256,
    },
    {
      id: 3,
      name: "Modern Table Lamp",
      price: 89.99,
      originalPrice: 120.0,
      color: "White",
      image: "/images/table-lamp.png",
      isNew: false,
      category: "home",
      description: "Elegant modern table lamp with adjustable brightness.",
      colors: ["White", "Black", "Gold"],
      inStock: true,
      rating: 4.3,
      reviews: 89,
    },
    {
      id: 4,
      name: "Pendant Light Set",
      price: 159.99,
      originalPrice: 199.99,
      color: "Gold",
      image: "/images/pendant-lights.png",
      isNew: false,
      category: "home",
      description: "Set of 3 modern pendant lights for kitchen or dining room.",
      colors: ["Gold", "Black", "Silver"],
      inStock: true,
      rating: 4.6,
      reviews: 167,
    },
    {
      id: 5,
      name: "Wall Clock",
      price: 34.99,
      originalPrice: 45.99,
      color: "Black",
      image: "/images/wall-clock.png",
      isNew: false,
      category: "home",
      description: "Minimalist wall clock with silent movement.",
      colors: ["Black", "White", "Wood"],
      inStock: true,
      rating: 4.2,
      reviews: 94,
    },
    {
      id: 6,
      name: "Phone of the Year",
      price: 899.99,
      originalPrice: 999.99,
      color: "Space Gray",
      image: "/images/phone-of-year.png",
      isNew: true,
      category: "electronics",
      description: "Latest smartphone with advanced camera and performance.",
      colors: ["Space Gray", "Gold", "Silver"],
      inStock: true,
      rating: 4.9,
      reviews: 512,
    },
  ]

  let filteredProducts = products

  // Filter by category if specified
  if (category) {
    filteredProducts = products.filter((product) => product.category === category)
  }

  // Limit results if specified
  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number.parseInt(limit))
  }

  return Response.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
  })
}
