import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { Restaurant } from "@/entities/Restaurant";

export async function POST(req: NextRequest) {
  try {
    // 1. 取得資料庫連線
    const db = await getDb();
    const repo = db.getMongoRepository(Restaurant);

    // 2. 解析前端傳來的資料
    const body = await req.json();
    const { name, categories, address, location, userId } = body;

    // 3. 建立並儲存實體
    const newRestaurant = repo.create({
      name,
      categories,
      address,
      location: location || { lat: 0, lng: 0 }, // 第二階段會帶入真實經緯度
      userId,
      rating: 5,
    });

    await repo.save(newRestaurant);

    return NextResponse.json({ message: "餐廳新增成功", data: newRestaurant }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "新增失敗", error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const repo = db.getMongoRepository(Restaurant);
    
    // 取得所有餐廳 (之後會加上 .find({ where: { userId } }))
    const restaurants = await repo.find();
    
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ message: "讀取失敗", error: String(error) }, { status: 500 });
  }
}