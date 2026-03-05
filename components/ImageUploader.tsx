'use client';

import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import Image from 'next/image';

// 📝 Configurações de validação
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

interface ImageUploaderProps {
  currentImageUrl?: string;
  onImageUploadSuccess?: (newImageUrl: string) => void;
  onUploadStart?: () => void;
  className?: string;
}

interface UploadError {
  type: 'validation' | 'upload' | 'network';
  message: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onImageUploadSuccess,
  onUploadStart,
  className = ""
}) => {
  // 🎯 Estados do componente
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState<UploadError | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // 🔍 Função de validação de arquivo
  const validateFile = useCallback((file: File): UploadError | null => {
    // Validação de tipo MIME
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        type: 'validation',
        message: `Tipo de arquivo não suportado: ${file.type}. Apenas JPG, PNG e WEBP são permitidos.`
      };
    }

    // Validação de extensão (segurança adicional)
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return {
        type: 'validation',
        message: `Extensão de arquivo não permitida: ${fileExtension}`
      };
    }

    // Validação de tamanho
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        type: 'validation',
        message: `Arquivo muito grande (${(file.size / 1024 / 1024).toFixed(2)}MB). Tamanho máximo: ${MAX_FILE_SIZE_MB}MB.`
      };
    }

    // Validação de arquivo vazio
    if (file.size === 0) {
      return {
        type: 'validation',
        message: 'Arquivo está vazio ou corrompido.'
      };
    }

    return null;
  }, []);

  // 📁 Handler para seleção de arquivo
  const handleFileSelect = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(currentImageUrl || null);
      return;
    }

    // Validação do arquivo
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setPreviewUrl(currentImageUrl || null);
      return;
    }

    // Criar preview
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);

    // Cleanup do URL anterior se existir
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [currentImageUrl, validateFile]);

  // 📤 Handler para upload
  const handleUpload = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setError({
        type: 'validation',
        message: 'Por favor, selecione uma imagem para upload.'
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);
    onUploadStart?.();

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // Simulação de progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Nota: Este endpoint precisa ser criado no servidor
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Erro HTTP: ${response.status}`);
      }

      // ✅ Upload bem-sucedido
      setSelectedFile(null);
      setPreviewUrl(data.imageUrl);
      onImageUploadSuccess?.(data.imageUrl);
      
      // Reset do input file
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err: any) {
      console.error('Erro no upload:', err);
      
      const errorType: UploadError['type'] = 
        err.name === 'TypeError' ? 'network' : 'upload';
      
      setError({
        type: errorType,
        message: err.message || 'Falha no upload. Tente novamente.'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [selectedFile, onUploadStart, onImageUploadSuccess]);

  const getErrorColor = (type: UploadError['type']) => {
    switch (type) {
      case 'validation': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'network': return 'text-red-600 bg-red-50 border-red-200';
      case 'upload': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        📸 Upload de Imagem
      </h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label 
            htmlFor="file-upload" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Selecionar Imagem
          </label>
          <input
            id="file-upload"
            type="file"
            accept={ALLOWED_MIME_TYPES.join(', ')}
            onChange={handleFileSelect}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-medium
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">
            Formatos: JPG, PNG, WEBP • Máximo: {MAX_FILE_SIZE_MB}MB
          </p>
        </div>

        {previewUrl && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Preview:</h3>
            <div className="relative w-full h-48 border border-gray-300 rounded-md overflow-hidden bg-gray-50">
              <Image
                src={previewUrl}
                alt="Preview da imagem"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {error && (
          <div className={`p-3 border rounded-md ${getErrorColor(error.type)}`}>
            <div className="flex items-start">
              <span className="text-lg mr-2">
                {error.type === 'validation' ? '⚠️' : '❌'}
              </span>
              <div>
                <p className="text-sm font-medium">
                  {error.type === 'validation' ? 'Erro de Validação' : 
                   error.type === 'network' ? 'Erro de Conexão' : 'Erro de Upload'}
                </p>
                <p className="text-sm mt-1">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Enviando...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedFile || uploading || !!error}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors
                      ${!selectedFile || uploading || !!error
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      }`}
        >
          {uploading ? '📤 Enviando...' : '🚀 Fazer Upload'}
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
