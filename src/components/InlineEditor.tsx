import { useState } from 'react';
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

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
      setEditedContent(content);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
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
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
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
