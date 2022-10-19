const connection = require("../config/config");

const signIn = (req, res) => {

    const UserName = req.body.Name;
    const Password = req.body.Password;

    const Query = `SELECT UserName, Password FROM ADMIN WHERE UserName = '${UserName}' AND Password = '${Password}'`;
    connection.query(Query, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.redirect("/viewMovies");
        }
    })
}

const signUp = (req, res) => {

    const Name = req.body.FName + " " + req.body.LName;
    const UserName = req.body.Username;
    const Email = req.body.Email;
    const Cnic = req.body.cnic;
    const Password = req.body.Password;

    const Query = `INSERT INTO ADMIN VALUES('${Name}','${UserName}','${Email}','${Cnic}','${Password}')`;
    connection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/signIn");
    })
    
}

const viewMovies = (req, res) => {
    const Query = "SELECT * FROM MOVIES";
    connection.query(Query, function (err, result) {
        if (err) throw err;
        res.render("viewMovies", { moviesData: result });
    })
}

const addMovies = (req, res) => {

    if (!req.file) {
        return req.statusCode(404).send("No File Recieved!");
    }

    const movieName = req.body.movieName;
    const movieDuration = req.body.movieDuration;
    const parentalGuidance = req.body.parentalGuidance;
    const movieType = req.body.movieType;
    const movieDescription = req.body.movieDescription;
    const moviePosterPath = req.file.originalname;

    const Query = `INSERT INTO MOVIES  ( MovieName, MoviePG, MovieType, MovieDuration, MovieDescription, MoviePoster) VALUES ('${movieName}','${parentalGuidance}','${movieType}','${movieDuration}','${movieDescription}','${moviePosterPath}' )`;
    connection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/viewMovies");
    })
}

const showUpdateMovie = (req, res) => {
    const movieID = req.params.id;
    const Query = `SELECT * FROM MOVIES WHERE MovieID = ${movieID}`;
    connection.query(Query, function (err, result) {
        if (err) throw err;
        res.render("updateMovies", { movieData: result });
    })
}

const UpdateMovie = (req,res)=>{

    if (!req.file) {
        return req.send("No File Recieved!");
    }

    const movieID = req.params.id;
    const movieName = req.body.movieName;
    const movieDuration = req.body.movieDuration;
    const parentalGuidance = req.body.parentalGuidance;
    const movieType = req.body.movieType;
    const movieDescription = req.body.movieDescription;
    const moviePosterPath = req.file.originalname;

    const Query = `UPDATE MOVIES SET MovieName = '${movieName}', MoviePG = '${parentalGuidance}', MovieType = '${movieType}', MovieDuration = '${movieDuration}', MovieDescription = '${movieDescription}', MoviePoster = '${moviePosterPath}' where MovieID = '${movieID}'`;
    connection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/viewMovies");
    })
}


const deleteMovie = (req, res) => {
    const movieID = req.params.id;
    const Query = `DELETE FROM MOVIES WHERE MovieID = ${movieID}`;
    connection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/viewMovies");
    })
}


module.exports = {
    signIn, 
    signUp,
    viewMovies,
    addMovies,
    showUpdateMovie,
    UpdateMovie,
    deleteMovie
}
