'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await axios.get('https://derananews-api.vercel.app/api/articles');
      setArticles(data);
      setTotalArticles(data.length); // Set total articles count for pagination
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://derananews-api.vercel.app/api/articles/${id}`);
      setArticles(articles.filter(article => article._id !== id)); // Remove deleted article from UI
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">News Articles</h1>
        
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title"
            className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />
        </div>

        <div className="flex justify-end mb-4">
          <a 
            href="/create"
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md shadow hover:bg-indigo-700 transition duration-300"
          >
            Create New Article
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map(article => (
            <div key={article._id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{article.title}</h2>
                <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: article.content.substring(0, 100) }}></p>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/edit/${article._id}`} 
                    className="text-indigo-600 hover:text-indigo-800 transition duration-200"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(article._id)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md disabled:bg-gray-300 mr-2"
          >
            Prev
          </button>
          <span className="text-lg font-medium text-gray-700">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md disabled:bg-gray-300 ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
