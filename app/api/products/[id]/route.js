export async function GET(request, { params }) {
  const { id } = params

  // Dummy product data (same as above but filtered by ID)
  const products = [
    {
      id: 1,
      name: "Basic Crew Neck Tee",
      price: 44.0,
      originalPrice: 55.0,
      color: "Black",
      image: "/images/headphones.png",
      isNew: true,
      category: "clothing",
      description: "Comfortable cotton crew neck tee perfect for everyday wear.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Gray"],
      inStock: true,
      rating: 4.5,
      reviews: 128,
      specifications: {
        material: "100% Cotton",
        fit: "Regular",
        care: "Machine wash cold",
      },
    },
    // Add more products as needed
  ]

  const product = products.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return Response.json({ success: false, message: "Product not found" }, { status: 404 })
  }

  return Response.json({
    success: true,
    data: product,
  })
}
