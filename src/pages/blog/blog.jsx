import React, { useState, useEffect } from 'react';
import { Trash2, Plus, ArrowLeft } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: null, imagePreview: null });

  // Załaduj posty z localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blogPosts');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  // Zapisz posty do localStorage
  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = () => {
    if (formData.title.trim() && formData.description.trim() && formData.image) {
      const newPost = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        image: formData.image
      };
      savePosts([newPost, ...posts]);
      setFormData({ title: '', description: '', image: null, imagePreview: null });
      setView('home');
    }
  };

  const handleDeletePost = (id) => {
    savePosts(posts.filter(p => p.id !== id));
    setView('home');
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      image: post.image,
      imagePreview: post.image
    });
    setView('edit');
  };

  const handleUpdatePost = () => {
    if (formData.title.trim() && formData.description.trim() && formData.image) {
      const updated = posts.map(p =>
        p.id === selectedPost.id
          ? { ...p, title: formData.title, description: formData.description, image: formData.image }
          : p
      );
      savePosts(updated);
      setFormData({ title: '', description: '', image: null, imagePreview: null });
      setView('home');
    }
  };

  // Strona główna
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-black from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-white">Blog</h1>
            <button
              onClick={() => {
                setFormData({ title: '', description: '', image: null, imagePreview: null });
                setSelectedPost(null);
                setView('create');
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <Plus size={20} /> Nowy post
            </button>
          </div>

          {/* Lista postów */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">Brak postów. Stwórz swój pierwszy post!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    setView('details');
                  }}
                  className="bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition cursor-pointer shadow-lg"
                >
                  <div className="h-48 overflow-hidden bg-slate-700">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-gray-300 text-sm line-clamp-3">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Strona tworzenia postu
  if (view === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition"
          >
            <ArrowLeft size={20} /> Wróć
          </button>

          <div className="bg-slate-800 rounded-lg p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-white mb-6">Nowy post</h1>

            {/* Podgląd zdjęcia */}
            {formData.imagePreview && (
              <div className="mb-6">
                <img src={formData.imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
              </div>
            )}

            {/* Input zdjęcia */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Zdjęcie</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Input tytułu */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Tytuł</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Wpisz tytuł postu..."
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Input opisu */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-3">Opis</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Wpisz opis postu..."
                rows="6"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none transition resize-none"
              />
            </div>

            {/* Przyciski */}
            <div className="flex gap-4">
              <button
                onClick={handleAddPost}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Opublikuj
              </button>
              <button
                onClick={() => setView('home')}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Strona szczegółów postu
  if (view === 'details' && selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition"
          >
            <ArrowLeft size={20} /> Wróć
          </button>

          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-xl">
            <div className="h-96 overflow-hidden">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-6">{selectedPost.title}</h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 whitespace-pre-wrap">{selectedPost.description}</p>

              {/* Przyciski akcji */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleEditPost(selectedPost)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDeletePost(selectedPost.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Trash2 size={20} /> Usuń
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Strona edycji postu
  if (view === 'edit' && selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <button
            onClick={() => setView('details')}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition"
          >
            <ArrowLeft size={20} /> Wróć
          </button>

          <div className="bg-slate-800 rounded-lg p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-white mb-6">Edytuj post</h1>

            {/* Podgląd zdjęcia */}
            {formData.imagePreview && (
              <div className="mb-6">
                <img src={formData.imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
              </div>
            )}

            {/* Input zdjęcia */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Zmień zdjęcie</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Input tytułu */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Tytuł</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Input opisu */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-3">Opis</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="6"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none transition resize-none"
              />
            </div>

            {/* Przyciski */}
            <div className="flex gap-4">
              <button
                onClick={handleUpdatePost}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Zapisz zmiany
              </button>
              <button
                onClick={() => setView('details')}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}