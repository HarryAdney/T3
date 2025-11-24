import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'blockquote',
  'code-block',
  'color',
  'background',
];

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ql-container {
        font-size: 16px;
        font-family: inherit;
      }
      .ql-editor {
        min-height: 300px;
        max-height: 600px;
        overflow-y: auto;
      }
      .ql-editor p,
      .ql-editor h1,
      .ql-editor h2,
      .ql-editor h3 {
        margin-bottom: 1em;
      }
      .ql-toolbar {
        background: #f5f5f4;
        border-radius: 0.5rem 0.5rem 0 0;
      }
      .ql-container {
        border-radius: 0 0 0.5rem 0.5rem;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
