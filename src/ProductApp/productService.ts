import productRepository from "./productRepository";

interface Product {
    id: string;
    name: string;
    img: string;
    description: string;
}

interface IProductOk {
    status: "ok";
    product: Product;
}

interface IProductError {
    status: "error";
    message: string;
}

const products: {
    id: number;
    name: string;
    img: string;
    description: string;
}[] = [
    {
        id: 1,
        name: 'Mila',
        img: 'https://sputnik.kz/img/1024/24/10242489_147:82:1498:1568_1920x0_80_0_0_149c713da4cffa1fb7bee655c2484b24.jpg',
        description: 'For sale, cheap, 175 cm'
    },
    {
        id: 2,
        name: 'Yarik Tek',
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Bundesarchiv_Bild_101I-299-1805-16,_Nordfrankreich,_Panzer_VI_%28Tiger_I%29_cropped.jpg',
        description: 'For sale, expensive, 182 cm'
    },
    {
        id: 3,
        name: 'Nikita',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZvViAs8p5cJ_SnrYg_yNrycXq1CGlXNDVlA&s',
        description: 'Not for sale, priceless, one meter with a cap'
    },
];

async function getProductById(id: number): Promise<IProductOk | IProductError> {
    try {
        const product = await productRepository.getProductById(id);
        if (!product) {
            return { status: "error", message: "Product not found" };
        }
        return { status: "ok", product: product };
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function getAllProducts(max?: number, category?: string): Promise<IProductOk | IProductError> {
    try {
        const products = await productRepository.getAllProducts(max, category);
        if (!products) {
            return { status: "error", message: "No products found" };
        }
        return { status: "ok", product: products };
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

const productService = {
    getProductById,
    getAllProducts,
};

export default productService;
