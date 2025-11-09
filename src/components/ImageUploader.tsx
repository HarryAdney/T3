import { useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImageUrl?: string;
  onImageRemoved?: () => void;
}

export function ImageUploader({
  onImageUploaded,
  currentImageUrl,
  onImageRemoved
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      // In a real implementation, you would upload to your storage service
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      onImageUploaded(imageUrl);
    } catch (error) {
      setUploadError('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onImageRemoved?.();
  };

  if (currentImageUrl) {
    return (
      <div className="relative">
        <div className="overflow-hidden border rounded-lg aspect-video border-stone-200 bg-stone-50">
          <img
            src={currentImageUrl}
            alt="Uploaded image"
            className="object-cover w-full h-full"
          />
        </div>
        <button
          onClick={handleRemoveImage}
          className="absolute p-1 text-white transition-colors bg-red-600 rounded-full top-2 right-2 hover:bg-red-700"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="block">
        <div className="p-6 text-center transition-colors border-2 border-dashed rounded-lg cursor-pointer border-stone-300 hover:border-sage-400">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <div className="flex flex-col items-center">
            {isUploading ? (
              <div className="w-8 h-8 mb-3 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
            ) : (
              <Upload className="w-8 h-8 mb-3 text-stone-400" />
            )}
            <p className="mb-1 text-sm text-stone-600">
              {isUploading ? 'Uploading...' : 'Click to upload an image'}
            </p>
            <p className="text-xs text-stone-500">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      </label>

      {uploadError && (
        <div className="flex items-center mt-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          {uploadError}
        </div>
      )}
    </div>
  );
}