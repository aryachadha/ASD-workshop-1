const express = require("express");
const productRoutes = require("./routes/productRoutes");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/products", productRoutes);

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal Server Error"
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});