import "reflect-metadata";
import { DataSource } from "typeorm";
import { Restaurant } from "@/entities/Restaurant"; 
import { User} from "@/entities/User"

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGODB_URI, 
  // 🚀 移除 useNewUrlParser 和 useUnifiedTopology
  // 因為新版驅動已經預設開啟，填寫反而會報型別錯誤
  
  synchronize: true, 
  logging: true,
  entities: [Restaurant, User],
  
  // 💡 如果你使用的是 MongoDB Atlas，通常只需要 url 即可
  // 某些版本可能需要加這行來確保連線穩定
  authSource: "admin", 
});

let isInitialized = false;

export const getDb = async () => {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      isInitialized = true;
      console.log("Data Source has been initialized!");
    } catch (err) {
      console.error("Error during Data Source initialization", err);
    }
  }
  return AppDataSource;
};