import { useState, useEffect } from 'react';
import { useEditMode } from '../contexts/EditModeContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface InlineEditorProps {
  content: string;
  onSave: (newContent: string) => Promise<void>;
  className?: string;
  placeholder?: string;
}

export function InlineEditor({ content, onSave, className = '', placeholder = 'Click to edit' }: InlineEditorProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Update editedContent when content prop changes
  useEffect(() => {
    if (!isEditing) {
      setEditedContent(content);
    }
  }, [content, isEditing]);

  const handleClick = () => {
    if (isEditMode && !isEditing && !isSaving) {
      setIsEditing(true);
      setEditedContent(content);
      setSaveError(null);
    }
  };

  const handleSave = async () => {
    if (isSaving) return; // Prevent double-saves
    
    // Validate content is not empty
    const trimmedContent = editedContent.replace(/<[^>]*>/g, '').trim();
    if (!trimmedContent) {
      setSaveError('Content cannot be empty');
      return;
    }
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      await onSave(editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save changes. Please try again.';
      setSaveError(errorMessage);
      // Don't exit editing mode on error so user can retry
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
    setSaveError(null);
  };

  if (isEditing) {
    return (
      <div className="relative">
        <div className="border-2 border-blue-500 rounded-lg">
          <ReactQuill
            value={editedContent}
            onChange={setEditedContent}
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
                ['clean'],
              ],
            }}
          />
        </div>
        {saveError && (
          <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
            <div className="flex items-center justify-between">
              <span>{saveError}</span>
              <button
                type="button"
                onClick={() => setSaveError(null)}
                className="ml-2 text-red-500 hover:text-red-700"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: isEditMode ? 'pointer' : 'default',
        outline: isEditMode && isHovered ? '2px solid #3b82f6' : 'none',
        outlineOffset: '4px',
        borderRadius: '4px',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {isEditMode && isHovered && (
        <div className="absolute top-0 right-0 px-2 py-1 text-xs text-white bg-blue-600 rounded-bl-lg rounded-tr-lg">
          {placeholder}
        </div>
      )}
    </div>
  );
}
