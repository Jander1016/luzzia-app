import { useState } from 'react';
import { apiClient } from '../lib/api-client';
import type { ContactFormData } from '../types/prices';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      await apiClient.post('/contacts', formData);
      setMessage('success::¡Gracias! Te contactaremos pronto.');
      setFormData({ email: '', name: '' });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Error al enviar. Intenta nuevamente.';
      setMessage(`error::${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const [type, text] = message.split('::');
  const isError = type === 'error';
  const isSuccess = type === 'success';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Únete a Luzzia</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Enviando...' : 'Suscribirse'}
        </button>
        
        {message && (
          <p className={`text-sm p-2 rounded ${
            isError ? 'bg-red-50 text-red-800 border border-red-200' :
            isSuccess ? 'bg-green-50 text-green-800 border border-green-200' :
            'bg-gray-50 text-gray-800'
          }`}>
            {text}
          </p>
        )}
      </form>
    </div>
  );
}