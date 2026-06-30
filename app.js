const express = require("express");
const app = express();

let tickersObj = {}
require("dotenv").config();
const logger = require("morgan");
const path = require("path");
const cookieParser = require('cookie-parser')
const CMC_Fetch = require("./CMC_API_Fetch");
const CMC_META_FETCH = require('./CMC_META_FETCH')
app.use(express.json());
app.use(cookieParser())
const nodemailer = require('nodemailer')
app.set('verificationCodes', {})
const { updateDatabase } = require('./updateDatabase')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const homeRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const registerUserRouter = require("./routes/userRegister");
const loginPageRouter = require("./routes/loginPage");
const loginDataValidationRouter = require('./routes/loginDataValidation')
const authMiddleware = require('./middleware/authMiddleware')
const aboutPageRouter = require('./routes/aboutPage')
const logoutRouter = require('./routes/logout')
const verificationRouter = require('./routes/sendCode')
const verifyCodeRouter = require('./routes/verifyCode')
const getCoinsRouter = require('./routes/getCoins')
const coinInfoRouter = require('./routes/coinInfo');
const { setInterval } = require("timers");

async function main() {
  app.use(express.static(path.join(__dirname, "public")));
  app.use(logger("dev"));
  app.use("/", homeRouter);
  app.use("/api/register", registerRouter);
  app.use("/register", registerUserRouter);
  app.use("/login", loginPageRouter);
  app.use('/login/dataValidation', loginDataValidationRouter)
  app.use('/about', authMiddleware, aboutPageRouter)
  app.use('/logout', logoutRouter)
  app.use('/api/send-code', verificationRouter)
  app.use('/api/verify-code', verifyCodeRouter)
  app.use('/api/coins', getCoinsRouter)
  app.use('/coin-info', coinInfoRouter)
  CMC_Fetch();
  /* CMC_META_FETCH() */

  try {
    updateDatabase()
    setInterval(updateDatabase, 1000 * 60 * 30)
  } catch (error) {
    console.error(error.message)
  }

  app.listen(process.env.PORT, (error) => {
    if (error) {
      console.log("Error, ", error.message);
    } else {
      console.log(`server start on port: ${process.env.PORT}`);
    }
  });
}

main();