"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 定義表單驗證規則
const formSchema = z.object({
  name: z.string().min(1, "請輸入餐廳名稱"),
  address: z.string().min(1, "請輸入地址"),
  categories: z.string().min(1, "請至少輸入一個分類"),
});

export function AddRestaurantDialog({ onRefresh }: { onRefresh: () => void }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", address: "", categories: "" as any },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // 🚀 在這裡手動將字串轉換為陣列
      const payload = {
        ...values,
        categories: values.categories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // 送出處理後的資料
      });

      if (res.ok) {
        setOpen(false);
        form.reset();
        onRefresh();
      }
    } catch (error) {
      console.error("新增失敗", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> 新增餐廳
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增我的私藏餐廳</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>餐廳名稱</FormLabel>
                  <FormControl>
                    <Input placeholder="例如：巷口拉麵" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地址</FormLabel>
                  <FormControl>
                    <Input placeholder="台北市..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>分類 (用逗號隔開)</FormLabel>
                  <FormControl>
                    <Input placeholder="日式, 拉麵, 午餐" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              儲存餐廳
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
