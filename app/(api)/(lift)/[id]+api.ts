import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id)
    return Response.json({ error: "Missing required fields" }, { status: 400 });

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
        SELECT
            lifts.lift_id,
            lifts.origin_address,
            lifts.destination_address,
            lifts.origin_latitude,
            lifts.origin_longitude,
            lifts.destination_latitude,
            lifts.destination_longitude,
            lifts.lift_time,
            lifts.fare_price,
            lifts.payment_status,
            lifts.created_at,
            'driver', json_build_object(
                'driver_id', drivers.id,
                'first_name', drivers.first_name,
                'last_name', drivers.last_name,
                'profile_image_url', drivers.profile_image_url,
                'car_image_url', drivers.car_image_url,
                'car_seats', drivers.car_seats,
                'rating', drivers.rating
            ) AS driver 
        FROM 
            lifts
        INNER JOIN
            drivers ON lifts.driver_id = drivers.id
        WHERE 
            lifts.user_id = ${id}
        ORDER BY 
            lifts.created_at DESC;
    `;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching recent lifts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
