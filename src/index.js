const app = require('./app')
 
const PORT = process.env.DB_PORT || 3001


app.listen(PORT, () => {
  console.log(`success to listen at port ${PORT}`);
})
