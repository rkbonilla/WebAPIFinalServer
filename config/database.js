if (process.env.NODE_ENV === "production") {
    module.exports = { mongoURI: "mongodb+srv://rkbonilla:dbpassword@cluster0.0fdarcx.mongodb.net/?retryWrites=true&w=majority" }
}
else {
    module.exports = { mongoURI: "mongodb+srv://rkbonilla:dbpassword@cluster0.0fdarcx.mongodb.net/?retryWrites=true&w=majority" }
}