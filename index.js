const express = require("express");
const mongoose = require("mongoose");
const swaggerDocs = require("./swagger");
require("dotenv").config();

const userRoutes = require("./src/routes/userRoutes");
const mangaRoutes = require("./src/routes/mangaRoutes");
const chapterRoutes = require("./src/routes/chapterRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const favoriteMangaRoutes = require("./src/routes/favoriteMangaRoutes");

const app = express();
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/mangas", mangaRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/favorites", favoriteMangaRoutes);

// API documentation
swaggerDocs(app);

mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT || 5000, () =>
            console.log(`Server running on port ${process.env.PORT || 5000}`),
        );
    })
    .catch(err => console.error(err));
