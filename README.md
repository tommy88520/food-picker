# 🍴 今天吃什麼 (Food Picker) — 全端決策工具

這是一個基於 **Next.js 15** 開發的全端 Web 應用，旨在解決現代人的「抉擇困難症」。使用者可以建立個人專屬的餐廳清單，並透過趣味的轉盤動畫隨機抽選下一餐。

## ✨ 核心特色

- **全端開發 (Full-Stack)：** 從 UI 到後端 API 與雲端資料庫完整串接。
- **會員系統 (Auth)：** 支援註冊登入，每位使用者擁有獨立且私有的餐廳數據。
- **視覺化抽籤：** 使用 Framer Motion 打造順暢、具物理感的隨機旋轉輪盤。
- **地理資訊 (Maps)：** 預留 Google Maps API 接口，抽中後支援一鍵導航。

## 🛠 技術棧 (Tech Stack)

- **前端:** Next.js 15 (App Router), Tailwind CSS, **shadcn/ui**, Framer Motion
- **後端:** Next.js Route Handlers, **NextAuth.js** (Authentication)
- **資料庫:** **MongoDB** (Atlas 雲端託管)
- **ORM:** **TypeORM** (Entity 與 Schema 管理)
- **狀態管理:** Zustand (Client-side global state)

## 📅 開發計畫 (Roadmap)

### 第一階段：核心 MVP 基礎 (進行中)

- [x] Next.js 專案初始化與 shadcn/ui 設定
- [x] MongoDB Atlas & TypeORM 連線配置
- [ ] 會員註冊、登入系統 (NextAuth.js + Bcrypt 加密)
- [ ] 餐廳 CRUD API 實作 (透過 TypeORM 存取 MongoDB)
- [ ] 基礎輪盤組件與隨機演算法

### 第二階段：地圖功能增強

- [ ] 整合 Google Places Autocomplete (新增餐廳時自動補全地址)
- [ ] 儲存經緯度 (Lat/Lng) 座標至資料庫
- [ ] 實作「地點檢視」小地圖與 Google Maps 一鍵導航

### 第三階段：智慧優化與分析

- [ ] **冷卻機制：** 剛吃過的餐廳在 24h 內不會重複出現在輪盤中
- [ ] **飲食統計：** 視覺化紀錄使用者最近一週的飲食習慣與類別
- [ ] **分享功能：** 支援將餐廳名單匯出為 JSON 或分享連結

## 📂 專案目錄結構

```text
src/
├── app/              # Next.js App Router (頁面與 API 路由)
├── components/       # UI 元件 (使用 shadcn/ui)
├── entities/         # TypeORM 實體定義 (User, Restaurant)
├── lib/              # 工具函式與資料庫連線 (db.ts, auth.ts)
├── store/            # Zustand 狀態管理
└── types/            # TypeScript 型別定義
```

## 🚀 快速啟動 (Quick Start)

請按照以下步驟在本地端啟動專案：

### 1. 複製專案並安裝套件

```bash
git clone [https://github.com/your-username/food-picker.git](https://github.com/your-username/food-picker.git)

cd food-picker

npm install
```
