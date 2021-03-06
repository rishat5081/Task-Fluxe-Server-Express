var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Database = require("./DB_Sequelize/models"),
  cors = require("cors");

var companyRouter = require("./routes/Company/company");
var invoiceRouter = require("./routes/Invoice/invoice");
var producLaunchRouter = require("./routes/Product Launch/productLaunch");
var supplierRouter = require("./routes/Supplier/supplier");
var supplierComparisonRouter = require("./routes/Supplier Comparison/supplierComparison");
var webControllerRouter = require("./routes/Web Controllers/webControllers");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("*", cors());

app.use("/company", companyRouter);
app.use("/controller", webControllerRouter);
app.use("/supplier", supplierRouter);
app.use("/invoice", invoiceRouter);
app.use("/productLaunch", producLaunchRouter);
app.use("/supplierComparison", supplierComparisonRouter);

app.get("/", async (req, res) => {
  res.send(
    `<div style="display:flex;text-align:center; margin:auto"> <h1>Task Fluxe </h1> </div>`
  );
});

app.get("*", (req, res) => {
  res.send(
    `<div style="display:flex;text-align:center; margin:auto"> <h1>Task Fluxe </h1> </div>`
  );
});
/**
 * Syncing the database
 */
// Database.sequelize.query("SET FOREIGN_KEY_CHECKS=1;");
// Database.sequelize
//   .sync({ force: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// Database.sequelize.query("SET FOREIGN_KEY_CHECKS=0;");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
