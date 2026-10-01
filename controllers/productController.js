const productService = require("../services/productService");

async function getAllProducts(req, res, next) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);

    } catch (error) {
        next(error);
    }
}

async function getProductById(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json(product);

    } catch (error) {
        next(error);
    }
}

async function createProduct(req, res, next) {
    try {
        const product = await productService.createProduct(
            req.body
        );
        res.status(201).json(product);

    } catch (error) {
        next(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await productService.updateProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json(product);

    } catch (error) {
        next(error);
    }
}

async function patchProduct(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await productService.patchProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json(product);

    } catch (error) {
        next(error);
    }
}

async function deleteProduct(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully",
            product
        });

    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};