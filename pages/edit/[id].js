'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';  // You need to use useRouter here

const Edit = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();
  const { id } = router.query;  // Access the dynamic ID from the URL

  useEffect(() => {
    if (!id) return;  // If id is not available yet, wait until it's available

    // Fetch the article data
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`https://derananews-api.vercel.app/api/articles/${id}`);
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);  // Effect will run whenever id changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://derananews-api.vercel.app/api/articles/${id}`, {
        title,
        content,
        author,
      });

      if (res.status === 200) {
        console.log('Article updated successfully');
        router.push('/'); // Redirect to homepage after successful update
      } else {
        console.log('Failed to update article');
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Edit Article</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter the article title"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="author" className="text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter the author's name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter the article content"
            rows="6"
          />
        </div>

        <div className="flex justify-center">
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition duration-300 w-full sm:w-auto"
          >
            Update Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
