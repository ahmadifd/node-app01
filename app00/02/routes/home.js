import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send('Hello Farshid Ahmadi');
});

export default router;
