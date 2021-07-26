const app = require('./app')
const dbConnect = require('./config/db')

const PORT = process.env.DB_PORT || 3001

dbConnect() 

app.listen(PORT, () => {
  console.log(`success to listen at port ${PORT}`);
})
