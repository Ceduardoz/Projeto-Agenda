require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Segurança e sessão
const helmet = require("helmet");
const session = require("express-session");
const flash = require("connect-flash");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

// Conecta ao MongoDB
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("Conectei a base de dados!");
    app.emit("pronto");
  })
  .catch((err) => console.error(err));

// Middlewares
app.use(helmet({ contentSecurityPolicy: false })); // Segurança

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());

// Sessão
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 semana
  }),
);

// Flash messages
app.use(flash());

// CSRF
app.use(csrf());

// Middleware próprio
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middleware/middleware");
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);

// Variáveis globais para views
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  res.locals.user = req.session.user || null;
  next();
});

// Rotas
const routes = require("./routes");
app.use(routes);

// Start server
app.on("pronto", () => {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("Servido na porta", PORT);
  });
});
