import { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { ImageIcon, ExternalLink, Trash2 } from 'lucide-react';

interface PuckImageFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

export function PuckImageField({
  value,
  onChange,
  label = 'Image URL',
  required = false
}: PuckImageFieldProps) {
  const [showUploader, setShowUploader] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleImageUploaded = (imageUrl: string) => {
    setInputValue(imageUrl);
    onChange(imageUrl);
    setShowUploader(false);
  };

  const handleImageRemoved = () => {
    setInputValue('');
    onChange('');
  };

  const handleToggleUploader = () => {
    setShowUploader(!showUploader);
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-stone-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {/* URL Input */}
      <div className="relative">
        <div className="flex">
          <input
            type="url"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border rounded-l-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            required={required}
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleImageRemoved}
              className="px-3 py-2 text-red-600 transition-colors bg-red-100 border border-l-0 rounded-r-lg border-stone-300 hover:bg-red-200"
              aria-label="Remove image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Preview */}
        {inputValue && (
          <div className="mt-2">
            <div className="relative overflow-hidden border rounded-lg aspect-video border-stone-200 bg-stone-50">
              <img
                src={inputValue}
                alt="Image preview"
                className="object-cover w-full h-full"
                onError={() => {
                  // Handle broken images
                  console.warn('Failed to load image:', inputValue);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Upload/External Link Toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleToggleUploader}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            showUploader
              ? 'bg-sage-100 text-sage-700 border border-sage-300'
              : 'bg-stone-100 text-stone-700 border border-stone-300 hover:bg-stone-200'
          }`}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          {showUploader ? 'Hide Uploader' : 'Upload Image'}
        </button>

        {inputValue && (
          <a
            href={inputValue}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 text-sm font-medium transition-colors border rounded-lg text-sage-700 bg-sage-50 border-sage-300 hover:bg-sage-100"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Image
          </a>
        )}
      </div>

      {/* Image Uploader */}
      {showUploader && (
        <div className="p-4 border rounded-lg border-stone-200 bg-stone-50">
          <p className="mb-3 text-sm text-stone-600">
            Upload an image from your device. Note: For production use, you would need to integrate with a file storage service like Supabase Storage, AWS S3, or similar.
          </p>
          <ImageUploader
            onImageUploaded={handleImageUploaded}
            currentImageUrl={inputValue}
            onImageRemoved={handleImageRemoved}
          />
        </div>
      )}

      {/* Helper text */}
      <p className="text-xs text-stone-500">
        You can either paste an image URL from an external service or upload an image directly.
        For best results, use high-quality images (recommended: 1200x800px or larger, under 5MB).
      </p>
    </div>
  );
}