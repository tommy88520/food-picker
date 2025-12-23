"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AddRestaurantDialog } from "@/components/dialog/add-restaurant-dialog";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { data: session, status } = useSession();
  const [restaurants, setRestaurants] = useState([]);

  // 取得餐廳清單

  const fetchRestaurants = async () => {
    const res = await fetch("/api/restaurants");
    const data = await res.json();
    setRestaurants(data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchRestaurants();
    }
  }, [status]);

  if (status === "loading")
    return <div className="p-10 text-center">載入中...</div>;

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center py-6 border-b mb-8">
        <h1 className="text-2xl font-bold text-orange-600">🍴 今天吃什麼</h1>
        <div className="space-x-4">
          {session ? (
            <>
              <span className="text-sm text-slate-600">
                你好, {session.user?.name}
              </span>
              <Button variant="outline" onClick={() => signOut()}>
                登出
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">登入</Button>
              </Link>
              <Link href="/register">
                <Button>註冊</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {session ? (
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              我的私藏餐廳 ({restaurants.length})
            </h2>
            <AddRestaurantDialog onRefresh={fetchRestaurants} />
          </div>

          {/* 餐廳清單展示區域 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {restaurants.map((r: any) => (
              <div key={r.id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold">{r.name}</h3>
                <p className="text-sm text-slate-500">
                  {r.categories?.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">不再為下一餐煩惱</h2>
          <p className="text-slate-500 mb-8">登入以建立你的專屬轉盤</p>
          <Link href="/register">
            <Button size="lg">立即開始使用</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
