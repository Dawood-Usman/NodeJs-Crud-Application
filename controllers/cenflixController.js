const connection = require("../config/config");
const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };

const express = require("express");
const app = express();


const signIn = (req, res) => {

    const UserName = req.body.Name;
    const Password = req.body.Password;
    const Role = req.body.role;

    let TableName = "";
    Role == "admin" ? TableName = "ADMIN" : TableName = "USER";

    console.log(UserName, " ", Password, " ", Role, " ", TableName);

    const Query = `SELECT UserName, Password FROM ${TableName} WHERE UserName = '${UserName}' AND Password = '${Password}'`;
    connection.query(Query, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {

            if (Role == "admin") {
                const admin = { username: UserName, password: Password };
                req.session.admin = admin;
                res.cookie("CurrentRole", "Admin");
                res.redirect("/viewMovies");
            }
            else if (Role == "user") {
                const user = { username: UserName, password: Password };
                req.session.user = user;
                res.cookie("CurrentRole", "User");
                res.redirect("/userView");
            }

        }
        else {
            res.send("Wrong Credientials!");
        }
    })
}

const signUp = (req, res) => {

    const Name = req.body.FName + " " + req.body.LName;
    const UserName = req.body.Username;
    const Email = req.body.Email;
    const Cnic = req.body.cnic;
    const Password = req.body.Password;

    const Query = `INSERT INTO USER VALUES('${Name}','${UserName}','${Email}','${Cnic}','${Password}')`;
    connection.query(Query, function (err, result) {
        if (err) throw err;
        res.redirect("/signIn");
    })

}

const viewMovies = (req, res) => {

    const dataCountQuery = "SELECT COUNT(*) FROM Movies";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 2;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM MOVIES LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("viewMovies", {
                moviesData: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages
            });
        })
    })
}

const userView = (req, res) => {

    const dataCountQuery = "SELECT COUNT(*) FROM Movies";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 2;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM MOVIES LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("userView", {
                moviesData: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages
            });
        })
    })
}

const viewMoviesTabular = (req, res) => {

    const dataCountQuery = "SELECT COUNT(*) FROM Movies";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 2;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM MOVIES LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("tablularView", {
                moviesData: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages
            });
        })
    })
}

const generatePDF = (req, res) => {

    const dataCountQuery = "SELECT COUNT(*) FROM Movies";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 2;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM MOVIES LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render(
                "viewMovies",
                {
                    moviesData: result,
                    pages: totalPages,
                    CurrentPage: pageNo,
                    lastPage: totalPages
                },
                function (err, html) {
                    pdf
                        .create(html, options)
                        .toFile("PDF_Uploads/MovieDetail.pdf", function (err, result) {
                            if (err) return console.log(err);
                            else {
                                var allMoviesPdf = fs.readFileSync("PDF_Uploads/MovieDetail.pdf");
                                res.header("content-type", "application/pdf");
                                res.send(allMoviesPdf);
                            }
                        });
                }
            );
        })
    })
}

const viewMoviesBySorting = (req, res) => {

    const dataCountQuery = "SELECT COUNT(*) FROM Movies";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let sorting = req.query.sorting;
        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 2;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM MOVIES ORDER BY MovieName ${sorting} LIMIT ${startLimit}, ${dataPerPages} `;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("viewMovies", {
                moviesData: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages
            });
        })
    })
}

const viewMoviesBySearch = (req, res) => {

    const dataCountQuery = "SELECT COUNT(*) FROM Movies";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let searchedMovie = req.body.searchedMovie;
        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 2;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM MOVIES WHERE MovieName LIKE '%${searchedMovie}%' LIMIT ${startLimit}, ${dataPerPages} `;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("viewMovies", {
                moviesData: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages
            });
        })
    })
}

const viewMoviesByPG = (req, res) => {

    const dataCountQuery = "SELECT COUNT(*) FROM Movies";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let parentalGuidance = req.query.PG;
        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 2;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM MOVIES WHERE MoviePG = ${parentalGuidance} LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("viewMovies", {
                moviesData: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages
            });
        })
    })
}

const viewMoviesByMT = (req, res) => {

    const dataCountQuery = "SELECT COUNT(*) FROM Movies";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let movieType = req.query.MT;
        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 2;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM MOVIES WHERE MovieType = '${movieType}' LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("viewMovies", {
                moviesData: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages
            });
        })
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

const UpdateMovie = (req, res) => {

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
    userView,
    viewMovies,
    viewMoviesBySorting,
    viewMoviesBySearch,
    viewMoviesByPG,
    viewMoviesByMT,
    viewMoviesTabular,
    generatePDF,
    addMovies,
    showUpdateMovie,
    UpdateMovie,
    deleteMovie
}
