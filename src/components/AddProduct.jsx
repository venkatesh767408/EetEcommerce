import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const AddProduct = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        price: '',
        description: '',
        brand: '',
        model: '',
        color: '',
        category: '',
        discount: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [filters, setFilters] = useState({ category: '', brand: '' });
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const fileInputRef = useRef(null);

    // Fetch products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                params: { ...filters, page: pagination.page, limit: pagination.limit },
            });
            setProducts(response.data.products);
            setPagination((prev) => ({
                ...prev,
                totalPages: response.data.pagination.totalPages,
            }));
        } catch (error) {
            toast.error('Error fetching products: ' + error.message, { toastId: 'fetch-error' });
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
                setImagePreview(reader.result);
            };
            reader.onerror = (error) => {
                toast.error('Error processing image: ' + error.message, { toastId: 'image-error' });
            };
            reader.readAsDataURL(file);
        } else {
            toast.warn('No image selected.', { toastId: 'image-warn' });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/products/${editingProductId}`, formData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                toast.success('Product updated successfully', { toastId: 'update-success' });
            } else {
                const response = await axios.post('http://localhost:5000/api/products/create', formData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                toast.success(response.data.message, { toastId: 'add-success' });
            }
            resetForm();
            fetchProducts();
        } catch (error) {
            const errorMsg = isEditing ? 'Error updating product' : 'Error adding product';
            toast.error(`${errorMsg}: ${error.response?.data?.message || error.message}`, {
                toastId: isEditing ? 'update-error' : 'add-error',
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle edit product
    const handleEdit = (product) => {
        setIsEditing(true);
        setEditingProductId(product._id);
        setFormData({
            title: product.title,
            image: product.image,
            price: product.price,
            description: product.description,
            brand: product.brand,
            model: product.model,
            color: product.color,
            category: product.category,
            discount: product.discount,
        });
        setImagePreview(product.image);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Open delete confirmation modal
    const openDeleteModal = (productId) => {
        setProductToDelete(productId);
        setIsDeleteModalOpen(true);
    };

    // Handle delete product
    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`http://localhost:5000/api/products/${productToDelete}`);
            toast.success('Product deleted successfully', { toastId: 'delete-success' });
            fetchProducts();
        } catch (error) {
            toast.error('Error deleting product: ' + (error.response?.data?.message || error.message), {
                toastId: 'delete-error',
            });
        } finally {
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
            setDeleting(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: '',
            image: '',
            price: '',
            description: '',
            brand: '',
            model: '',
            color: '',
            category: '',
            discount: '',
        });
        setImagePreview(null);
        setIsEditing(false);
        setEditingProductId(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    // Trigger file input click
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Fetch products on mount and when filters/pagination change
    useEffect(() => {
        fetchProducts();
    }, [filters, pagination.page]);

    return (
        <div className="p-6 text-black bg-white min-h-screen">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                theme="light"
            />
            <div className="bg-white rounded-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-5xl font-bold mb-10 font-sans">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                            className="w-full p-3 bg-gray-100 rounded-xl border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Image</label>
                        <div className="relative">
                            {imagePreview ? (
                                <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData((prev) => ({ ...prev, image: '' }));
                                            setImagePreview(null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={handleImageClick}
                                    className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                                >
                                    <svg
                                        className="w-12 h-12 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 9a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 010 1.414l-5.414 5.414a1 1 0 01-1.414 0L5 14.414a1 1 0 01-.293-.707V9a2 2 0 01-2-2z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6" />
                                    </svg>
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                            {formData.image && <span className="mt-2 text-sm text-gray-600">Image uploaded</span>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                            className="w-full p-3 bg-gray-100 rounded-xl border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                            className="w-full p-3 bg-gray-100 rounded-xl border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                            className="w-full p-3 bg-gray-100 rounded-xl border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                            className="w-full p-3 bg-gray-100 rounded-xl border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Color</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                            className="w-full p-3 bg-gray-100 rounded-xl border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                            className="w-full p-3 bg-gray-100 rounded-xl border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Discount (%)</label>
                        <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                            className="w-full p-3 bg-gray-100 rounded-xl border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300"
                        />
                    </div>
                    <div className="md:col-span-2 flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-400 text-black font-semibold cursor-pointer p-3 rounded-lg disabled:bg-gray-300 flex items-center justify-center transition relative"
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-gray-800"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 5.291 8l2-2z"
                                        ></path>
                                    </svg>
                                    <span>{isEditing ? 'Updating...' : 'Adding...'}</span>
                                </div>
                            ) : (
                                isEditing ? 'Update Product' : 'Add Product'
                            )}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full bg-gray-200 text-gray-800 font-semibold p-3 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Products</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <svg
                            className="animate-spin h-10 w-10 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 5.291 8l2-2z"
                            ></path>
                        </svg>
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-gray-600 text-center">No products found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="border relative border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white"
                            >
                                <div className="flex gap-2 absolute top-3 right-3 text-2xl">
                                    <MdEdit
                                        className="cursor-pointer text-yellow-400 hover:scale-110"
                                        onClick={() => handleEdit(product)}
                                    />
                                    <MdDelete
                                        className="cursor-pointer text-red-500 hover:scale-110"
                                        onClick={() => openDeleteModal(product._id)}
                                    />
                                </div>
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-48 cursor-pointer hover:scale-105 transition duration-300 object-cover mb-3 mt-9 rounded-lg"
                                    />
                                )}
                                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                                <p className="text-gray-600 text-[20px] line-clamp-2">{product.description}</p>
                                <p className="font-semibold text-2xl text-gray-800">${product.price}</p>
                                <div className="mt-4 grid grid-cols-2">
                                    <p className="text-[20px]">
                                        <span className="font-semibold text-[20px] text-gray-500">Brand:</span> {product.brand}
                                    </p>
                                    <p className="text-[20px]">
                                        <span className="font-semibold text-[20px] text-gray-500">Model:</span> {product.model}
                                    </p>
                                    <p className="text-[20px]">
                                        <span className="font-semibold text-[20px] text-gray-500">Color:</span> {product.color}
                                    </p>
                                    <p className="text-[20px]">
                                        <span className="font-semibold text-[20px] text-gray-500">Category:</span> {product.category}
                                    </p>
                                    <p className="text-[20px]">
                                        <span className="font-semibold text-[20px] text-gray-500">Discount:</span> {product.discount}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full bg-gray-200 text-gray-800 font-semibold p-3 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="w-full bg-red-500 text-white font-semibold p-3 rounded-lg hover:bg-red-600 transition disabled:bg-red-300"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProduct;