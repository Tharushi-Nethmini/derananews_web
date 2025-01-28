'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';  // Ensure you're using the correct useRouter
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../components/Editor'), { ssr: false });

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://derananews-api.vercel.app/api/articles', {
        title,
        content,
        author,
      });

      console.log('Response:', res);  // Log the full response for debugging

      if (res.status === 201) {
        console.log('Redirecting to home...');
        router.push('/');
      } else {
        console.log('Failed to create article');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create New Article</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-gray-700 text-sm font-medium mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-gray-700 text-sm font-medium mb-2">
              Content
            </label>
            <Editor value={content} onChange={setContent} />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 px-8 rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Create Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
