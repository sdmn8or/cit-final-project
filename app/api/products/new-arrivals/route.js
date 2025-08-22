export async function GET() {
  const newArrivals = [
    {
      id: 1,
      name: "Basic Crew Neck Tee",
      price: 44.0,
      originalPrice: 55.0,
      color: "Black",
      image: "/images/headphones.png",
      isNew: true,
      category: "clothing",
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
    },
  ]

  return Response.json({
    success: true,
    data: newArrivals,
    total: newArrivals.length,
  })
}
