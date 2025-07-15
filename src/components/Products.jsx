import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Products = () => {
    const { products, loading, error: contextError } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
    const brands = ['sony', 'microsoft', 'logitech g', 'song', 'urbanista', 'xiaomi', 'boat', 'samsung', 'amkette'];

    const productsWithBrands = products.map((product, index) => ({
        ...product,
        brand: brands[index % brands.length]
    }));

    useEffect(() => {
        if (products.length > 0) {
            setFilteredProducts(productsWithBrands);
        }
    }, [products]);

    useEffect(() => {
        let filtered = productsWithBrands;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategories.includes(product.category.toLowerCase())
            );
        }

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product =>
                selectedBrands.includes(product.brand.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [selectedCategories, selectedBrands]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const SkeletonCard = () => (
        <div className="border border-gray-500 rounded-lg p-3 animate-pulse">
            <div className="h-40 w-full bg-gray-700 rounded mb-2"></div>
            <div className="mt-5 space-y-2 pb-7">
                <div className="flex justify-between">
                    <div className="h-3 w-24 bg-gray-700 rounded"></div>
                    <div className="h-3 w-16 bg-gray-700 rounded"></div>
                </div>
                <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
                <div className="flex justify-between absolute bottom-0 w-[calc(100%-24px)]">
                    <div className="h-5 w-16 bg-gray-700 rounded"></div>
                    <div className="h-4 w-20 bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white md:flex gap-3 max-w-7xl mx-auto p-4">
            <div className="lg:w-[20%] md:w-[30%] border border-gray-500 rounded-lg md:sticky bg-black top-4 h-fit">
                <div className="p-3">
                    <h2 className="font-bold text-xl">Category</h2>
                    <div className="pl-5 mt-3 space-y-2">
                        {categories.map(cat => (
                            <label key={cat} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="accent-green-500 rounded-xl"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                <span>{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="p-3">
                    <h2 className="font-bold text-xl">Brand</h2>
                    <div className="pl-5 mt-3 space-y-2">
                        {brands.map(brand => (
                            <label key={brand} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="accent-green-500 rounded-xl"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                />
                                <span>{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:w-[80%] md:mt-0 mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {loading && Array(6).fill().map((_, index) => <SkeletonCard key={index} />)}
                {contextError && <p className="text-red-500">{contextError}</p>}

                {!loading && !contextError && filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="border border-gray-500 rounded-lg p-3 h-fit relative cursor-pointer hover:bg-gray-900 transition-colors"
                    >
                        <Link to={`/products/product/${product.id}`} className="block text-white no-underline">
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.title || 'Product'}
                                    className="h-40 w-full object-contain mb-2 transition-transform duration-300 ease-in-out hover:scale-105"
                                />
                            )}
                            <div className="mt-5 space-y-2 pb-7">
                                <div className="flex justify-between">
                                    <p className="text-gray-500 text-[12px] text-center font-italic">{product.category}</p>
                                    <p className="text-[12px]">⭐⭐⭐⭐⭐</p>
                                </div>
                                <p className="text-sm font-medium text-[15px] leading-[20px] line-clamp-1 font-inter">
                                    {product.title || 'No Title'}
                                </p>
                                <div className="flex justify-between absolute bottom-0 w-[calc(100%-24px)]">
                                    <p className="font-bold text-[20px]">$ {product.price}</p>
                                    <p className="text-sm text-gray-400">{product.brand}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
