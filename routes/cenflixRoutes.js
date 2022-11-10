const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const cenflix = require("../controllers/cenflixController");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const {Authentication} = require("../middlewares/auth.js");
router.use(cookieParser());

router.use(
    session({
        secret: "mera dil ye pukary ajaaaaaa",
        resave: false,
        saveUninitialized: true,
        cookie: { path: "/", httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
);

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/images") },
    filename: function (req, file, cb) { cb(null, file.originalname) }
})

const upload = multer({ storage: storage });

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res) => { res.render("homePage"); });
router.get("/signIn", (req, res) => { res.render("signIn");});
router.post("/signIn", cenflix.signIn);
router.get("/signUp", (req, res) => { res.render("signUp"); });
router.post("/signUp", cenflix.signUp);
router.get("/userView", cenflix.userView);
router.get("/viewMovies", Authentication, cenflix.viewMovies);
router.get("/viewMovies/printMovie", Authentication, cenflix.generatePDF);
router.get("/viewMovies/Sorting", Authentication, cenflix.viewMoviesBySorting);
router.post("/viewMovies/searchMovie", Authentication, cenflix.viewMoviesBySearch);
router.get("/viewMovies/parentalGuidance", Authentication, cenflix.viewMoviesByPG);
router.get("/viewMovies/movieType", Authentication, cenflix.viewMoviesByMT);
router.get("/viewMovies/tabularView", Authentication, cenflix.viewMoviesTabular);
router.get("/addMovies", Authentication, (req, res) => { res.render("addMovies"); });
router.post("/addMovies", Authentication, upload.single("moviePoster"), cenflix.addMovies);
router.get("/viewMovies/:id", Authentication, cenflix.deleteMovie);
router.get("/updateMovies/:id", Authentication, cenflix.showUpdateMovie);
router.post("/updateMovies/:id", Authentication, upload.single("moviePoster"), cenflix.UpdateMovie);

router.get("/logout", (req,res)=>{
    req.session.admin = null;
    req.cookies.CurrentRole = "";
    res.redirect("/");
})

router.get("/logoutUser", (req,res)=>{
    req.session.user = null;
    req.cookies.CurrentRole = "";
    res.redirect("/");
})

module.exports = router;