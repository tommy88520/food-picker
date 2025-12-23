import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { User } from "@/entities/User";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    const db = await getDb();
    const repo = db.getMongoRepository(User);

    // 檢查重複註冊
    const existingUser = await repo.findOneBy({ email });
    console.log(existingUser)
    if (existingUser) {
      return NextResponse.json({ message: "此 Email 已被註冊" }, { status: 400 });
    }

    // 密碼加密
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = repo.create({
      email,
      password: hashedPassword,
      name: name || email.split("@")[0],
    });

    await repo.save(newUser);
    return NextResponse.json({ message: "註冊成功" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "註冊出錯", error: String(error) }, { status: 500 });
  }
}