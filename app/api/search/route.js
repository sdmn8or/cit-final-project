export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const category = searchParams.get("category")

  if (!query) {
    return Response.json(
      {
        success: false,
        message: "Search query is required",
      },
      { status: 400 },
    )
  }

  // Dummy search results
  const allProducts = [
    {
      id: 1,
      name: "Basic Crew Neck Tee",
      price: 44.0,
      color: "Black",
      image: "/images/headphones.png",
      category: "clothing",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 199.99,
      color: "Black",
      image: "/images/headphones.png",
      category: "electronics",
    },
    // Add more products
  ]

  // Simple search implementation
  let results = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )

  if (category) {
    results = results.filter((product) => product.category === category)
  }

  return Response.json({
    success: true,
    data: results,
    total: results.length,
    query,
  })
}
