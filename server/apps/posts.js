import { Router } from "express";
import sql from "../utils/db.js";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const status = req.query.status;
  const keywords = req.query.keywords;
  const page = req.query.page;

  const result = await sql`
  SELECT * FROM posts
  `

  return res.json({
    data: result,
  });
});

postRouter.get("/:id", async (req, res) => {
  const postId = req.params.id;

  const result = await sql`
  SELECT * FROM posts
  WHERE id = ${req.params.id}`

  return res.json({
    data: result[0],
  });
});

postRouter.post("/", async (req, res) => {
  const hasPublished = req.body.status === "published";
  const newPost = {
    ...req.body,
    category: req.body.category ? req.body.category : "",
    created_at: new Date(),
    updated_at: new Date(),
    published_at: hasPublished ? new Date() : null,
  };

  await sql`
  INSERT INTO posts (title, content, status, category, created_at, updated_at, published_at)
  VALUES (${newPost.title}, ${newPost.content}, ${newPost.status}, ${newPost.category}, ${newPost.created_at}, ${newPost.updated_at}, ${newPost.published_at})
`;

  return res.json({
    message: "Post has been created.",
  });
});

postRouter.put("/:id", async (req, res) => {
  const hasPublished = req.body.status === "published";

  const updatedPost = {
    ...req.body,
    updated_at: new Date(),
    published_at: hasPublished ? new Date() : null,
  };
  const postId = req.params.id;

  await sql`
  UPDATE posts
  SET title = ${updatedPost.title},
      content = ${updatedPost.content},
      status = ${updatedPost.status},
      updated_at = ${updatedPost.updated_at},
      published_at = ${updatedPost.published_at}
  WHERE id = ${postId}
`;

  return res.json({
    message: `Post ${postId} has been updated.`,
  });
});

postRouter.delete("/:id", async (req, res) => {
  const postId = req.params.id;

  await sql`
  DELETE FROM posts
  WHERE id = ${postId}
`;

  return res.json({
    message: `Post ${postId} has been deleted.`,
  });
});

export default postRouter;
