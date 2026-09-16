import express from 'express'
import multer from "multer";
import { createTransaction, getTransaction, uploadFile, income} from '../controllers/transactionControllers.js';
const router = express.Router();


router.use((req, res, next) => {
  console.log("🔥 TRANSACTION ROUTER HIT:", req.method, req.url);
  next();
});

router.post('/', createTransaction);
router.get('/:user_id',getTransaction);
router.get('/income', income)
const upload = multer({ dest: "uploads/" });


router.post("/upload", upload.single("file"), uploadFile);

export default router;