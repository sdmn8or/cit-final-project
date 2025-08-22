let wishlistItems = []

export async function GET() {
  return Response.json({
    success: true,
    data: wishlistItems,
    total: wishlistItems.length,
  })
}

export async function POST(request) {
  const body = await request.json()
  const { productId } = body

  // Check if item already exists in wishlist
  const existingItem = wishlistItems.find((item) => item.productId === productId)

  if (!existingItem) {
    const newItem = {
      id: Date.now(),
      productId,
      name: "Basic Crew Neck Tee", // This would normally be fetched from product data
      price: 44.0,
      image: "/images/headphones.png",
      addedAt: new Date().toISOString(),
    }
    wishlistItems.push(newItem)

    return Response.json({
      success: true,
      message: "Item added to wishlist",
      data: wishlistItems,
    })
  }

  return Response.json(
    {
      success: false,
      message: "Item already in wishlist",
    },
    { status: 400 },
  )
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get("productId")

  wishlistItems = wishlistItems.filter((item) => item.productId !== Number.parseInt(productId))

  return Response.json({
    success: true,
    message: "Item removed from wishlist",
    data: wishlistItems,
  })
}
