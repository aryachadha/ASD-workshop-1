const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "..", "db.json");

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function getAllProducts() {
    await delay(1500);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function getProductById(id) {
    const products = await getAllProducts();
    return products.find((product) => product.id === id);
}

async function saveProducts(products) {
    await fs.writeFile(
        filePath,
        JSON.stringify(products, null, 2)
    );
}

async function createProduct(product) {
    const products = await getAllProducts();
    const ids = products.map((item) => item.id);

    const newId = ids.length > 0
        ? Math.max(...ids) + 1
        : 1;

    const newProduct = {
        id: newId,
        ...product
    };

    products.push(newProduct);
    await saveProducts(products);
    return newProduct;
}

async function updateProduct(id, productData) {
    const products = await getAllProducts();
    const index = products.findIndex(
        (product) => product.id === id
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        id,
        ...productData
    };

    await saveProducts(products);
    return products[index];
}

async function patchProduct(id, productData) {
    const products = await getAllProducts();

    const index = products.findIndex(
        (product) => product.id === id
    );
    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...productData,
        id
    };

    await saveProducts(products);

    return products[index];
}


async function deleteProduct(id) {
    const products = await getAllProducts();

    const index = products.findIndex(
        (product) => product.id === id
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];
    products.splice(index, 1);
    await saveProducts(products);
    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};