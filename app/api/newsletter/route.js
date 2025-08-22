const subscribers = []

export async function POST(request) {
  const body = await request.json()
  const { email } = body

  if (!email || !email.includes("@")) {
    return Response.json(
      {
        success: false,
        message: "Valid email address is required",
      },
      { status: 400 },
    )
  }

  // Check if email already exists
  const existingSubscriber = subscribers.find((sub) => sub.email === email)

  if (existingSubscriber) {
    return Response.json(
      {
        success: false,
        message: "Email already subscribed",
      },
      { status: 400 },
    )
  }

  // Add new subscriber
  const newSubscriber = {
    id: Date.now(),
    email,
    subscribedAt: new Date().toISOString(),
    status: "active",
  }

  subscribers.push(newSubscriber)

  return Response.json({
    success: true,
    message: "Successfully subscribed to newsletter",
    data: newSubscriber,
  })
}
