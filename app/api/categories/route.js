export async function GET() {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      description: "Latest gadgets and electronic devices",
      image: "/images/category-electronics.jpg",
      productCount: 45,
    },
    {
      id: 2,
      name: "Clothing",
      slug: "clothing",
      description: "Fashion and apparel for all occasions",
      image: "/images/category-clothing.jpg",
      productCount: 128,
    },
    {
      id: 3,
      name: "Home & Living",
      slug: "home",
      description: "Furniture and home decor items",
      image: "/images/category-home.jpg",
      productCount: 67,
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      slug: "sports",
      description: "Sports equipment and outdoor gear",
      image: "/images/category-sports.jpg",
      productCount: 89,
    },
    {
      id: 5,
      name: "Beauty & Health",
      slug: "beauty",
      description: "Beauty products and health essentials",
      image: "/images/category-beauty.jpg",
      productCount: 156,
    },
  ]

  return Response.json({
    success: true,
    data: categories,
    total: categories.length,
  })
}
