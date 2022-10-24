const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const cenflix = require("../controllers/cenflixController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/images") },
    filename: function (req, file, cb) { cb(null, file.originalname) }
})
const upload = multer({ storage: storage });

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res) => { res.render("homePage"); });

router.get("/signIn", (req, res) => {
    res.render("signIn");
})
router.post("/signIn", cenflix.signIn);

router.get("/signUp", (req, res) => { res.render("signUp"); });
router.post("/signUp", cenflix.signUp);

router.get("/viewMovies", cenflix.viewMovies);
router.get("/viewMovies/printMovie", cenflix.generatePDF);

router.get("/viewMovies/Sorting", cenflix.viewMoviesBySorting);
router.post("/viewMovies/searchMovie", cenflix.viewMoviesBySearch);
router.get("/viewMovies/parentalGuidance", cenflix.viewMoviesByPG);
router.get("/viewMovies/movieType", cenflix.viewMoviesByMT);

router.get("/addMovies", (req, res) => { res.render("addMovies"); });
router.post("/addMovies", upload.single("moviePoster"), cenflix.addMovies);

router.get("/viewMovies/:id", cenflix.deleteMovie);

router.get("/updateMovies/:id", cenflix.showUpdateMovie);

router.post("/updateMovies/:id",upload.single("moviePoster"), cenflix.UpdateMovie);

module.exports = router;