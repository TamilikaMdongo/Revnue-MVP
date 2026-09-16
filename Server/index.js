import express from 'express'
import db from './config/databaseConnection.js'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express();

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
/*db.query("SELECT * FROM transaction", (err, results) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
}); */

const PORT = 5000;
app.get('/', (req,res) =>{
res.send('Server is running on port 5000')
});
app.listen(PORT, () => {
    console.log('Server running on port 5000')
})

app.use('/users', userRoutes)
app.use('/transactions', transactionRoutes)


