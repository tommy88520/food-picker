import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Restaurant } from "@/entities/Restaurant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // 1. 取得當前 Session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "請先登入" }, { status: 401 });
    }

    const db = await getDb();
    const repo = db.getMongoRepository(Restaurant);
    const body = await req.json();

    // 2. 建立餐廳，並綁定 session 中的 user id
    const newRestaurant = repo.create({
      ...body,
      userId: (session.user as any).id, // 🚀 自動綁定登入者 ID
      rating: body.rating || 5,
      createdAt: new Date(),
    });

    await repo.save(newRestaurant);
    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "新增失敗", error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json([], { status: 401 });

    const db = await getDb();
    const repo = db.getMongoRepository(Restaurant);

    // 3. 唯有屬於該使用者的餐廳才會被撈出來
    const restaurants = await repo.find({
      where: { userId: (session.user as any).id }
    });

    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ message: "讀取失敗" }, { status: 500 });
  }
}