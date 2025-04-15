import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());
function passwordCheck(req, res, next) {
  app.use(express.static(__dirname));
  const password = req.body.Password;
  console.log(req.body);
  if (password ==="ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
  console.log(req.body);
});
app.use(passwordCheck);
// app.use(express.static(path.join(__dirname, 'public')));
app.post("/check", (req, res) => {
  // app.use(express.static(__dirname));
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/index1.html");
  } else {
    // res.redirect("/msg=Incorrect password");
    // res.sendFile(__dirname + "/public/index.html");
    res.send(`<script>alert('Incorrect password');window.location.href="/login.html"</script>`);
    // res.sendFile(__dirname+"/public/index.html");
    //Alternatively res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
