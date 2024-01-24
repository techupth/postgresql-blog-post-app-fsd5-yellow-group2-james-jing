// Creating PostgreSQL Client here
import postgres from "postgres";

const sql = postgres('postgresql://postgres:jimmy1234@localhost:5432/blog')

export default sql