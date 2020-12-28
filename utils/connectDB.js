const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    console.log(`**MongoDB connected: ${connect.connection.host}\n`.america)
  } catch (error) {
    console.error(`${error}`.red)
    process.exit(1)
  }
}

module.exports = connectDB
