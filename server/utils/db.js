// โค้ดนี้อยู่ในไฟล์ server/utils/db.js
import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/posts",
});

export { pool };
