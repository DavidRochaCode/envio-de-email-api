import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
routes(app)

app.listen(3005, ()=>{
    console.log("Servidor inciado na porta 3005")
})