import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageWrapper } from '../../components/PageWrapper';
import {
  ArrowLeft, Upload, Image, Trash2, Search, Grid, List,
  Link as LinkIcon, FileText, X
} from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export function MediaLibrary() {
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkAuth();
    loadMedia();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/admin/login');
  };

  const loadMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `uploads/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from('media_library')
        .insert({
          title: uploadTitle || file.name,
          description: uploadDescription,
          file_path: publicUrl,
          file_type: file.type,
          file_size: file.size,
        });

      if (insertError) throw insertError;

      setShowUploadModal(false);
      setUploadTitle('');
      setUploadDescription('');
      loadMedia();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const item = media.find(m => m.id === id);
      if (!item) return;

      const fileName = item.file_path.split('/').pop();
      if (fileName) {
        await supabase.storage.from('media').remove([`uploads/${fileName}`]);
      }

      await supabase.from('media_library').delete().eq('id', id);
      loadMedia();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete file');
    }
  };

  const filteredMedia = media.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-stone-600">Loading...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => navigate('/admin')} className="inline-flex items-center mb-4 space-x-2 text-sage-700 hover:text-sage-800">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="font-serif text-4xl font-bold text-stone-900">Media Library</h1>
            <p className="text-stone-600">Manage images and files</p>
          </div>
          <button onClick={() => setShowUploadModal(true)} className="inline-flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-sage-600 hover:bg-sage-700">
            <Upload className="w-4 h-4" />
            <span>Upload File</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative w-64">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-sage-100 text-sage-700' : 'text-stone-400'}`}>
              <Grid className="w-5 h-5" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-sage-100 text-sage-700' : 'text-stone-400'}`}>
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="py-12 text-center">
            <Image className="w-16 h-16 mx-auto mb-4 text-stone-300" />
            <h3 className="mb-2 font-serif text-xl font-semibold text-stone-900">No files found</h3>
            <p className="text-stone-600">{searchTerm ? 'Try adjusting your search terms' : 'Upload your first file'}</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {filteredMedia.map((item) => (
              <div key={item.id} className="relative overflow-hidden bg-white rounded-lg shadow-sm group hover:shadow-md">
                <div className="aspect-square">
                  {item.file_type?.startsWith('image/') ? (
                    <img src={item.file_path} alt={item.title} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-stone-100">
                      <FileText className="w-12 h-12 text-stone-400" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => navigator.clipboard.writeText(item.file_path)} className="p-2 text-white rounded-lg bg-white/20 hover:bg-white/30">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-white rounded-lg bg-red-500/80 hover:bg-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium truncate text-stone-900">{item.title}</p>
                  <p className="text-xs text-stone-500">{formatFileSize(item.file_size)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMedia.map((item) => (
              <div key={item.id} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-lg">
                  {item.file_type?.startsWith('image/') ? (
                    <img src={item.file_path} alt={item.title} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-stone-100">
                      <FileText className="w-6 h-6 text-stone-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 ml-4">
                  <p className="text-sm font-medium truncate text-stone-900">{item.title}</p>
                  <p className="text-xs text-stone-500">{formatFileSize(item.file_size)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigator.clipboard.writeText(item.file_path)} className="p-2 text-stone-400 hover:text-stone-600">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-stone-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-bold text-stone-900">Upload File</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-1 text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer border-stone-300 hover:border-sage-500">
                <Upload className="w-8 h-8 mb-2 text-stone-400" />
                <p className="text-sm text-stone-600">Click to select a file</p>
              </div>
              <input ref={fileInputRef} type="file" onChange={handleUpload} className="hidden" accept="image/*,.pdf,.doc,.docx" />
              <div>
                <label className="block mb-1 text-sm font-medium text-stone-700">Title (optional)</label>
                <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" placeholder="File title" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-stone-700">Description (optional)</label>
                <textarea value={uploadDescription} onChange={(e) => setUploadDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" rows={3} placeholder="Describe this file" />
              </div>
              {uploading && <p className="text-sm text-stone-600">Uploading...</p>}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
