let cartItems = []

export async function GET() {
  return Response.json({
    success: true,
    data: cartItems,
    total: cartItems.length,
    subtotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  })
}

export async function POST(request) {
  const body = await request.json()
  const { productId, quantity = 1, size, color } = body

  // Check if item already exists in cart
  const existingItemIndex = cartItems.findIndex(
    (item) => item.productId === productId && item.size === size && item.color === color,
  )

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    cartItems[existingItemIndex].quantity += quantity
  } else {
    // Add new item to cart
    const newItem = {
      id: Date.now(),
      productId,
      quantity,
      size,
      color,
      price: 44.0, // This would normally be fetched from product data
      name: "Basic Crew Neck Tee", // This would normally be fetched from product data
      image: "/images/headphones.png",
    }
    cartItems.push(newItem)
  }

  return Response.json({
    success: true,
    message: "Item added to cart",
    data: cartItems,
  })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const itemId = searchParams.get("id")

  if (itemId) {
    cartItems = cartItems.filter((item) => item.id !== Number.parseInt(itemId))
  } else {
    cartItems = [] // Clear entire cart
  }

  return Response.json({
    success: true,
    message: itemId ? "Item removed from cart" : "Cart cleared",
    data: cartItems,
  })
}
