'use client';

import { useCallback, useRef } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40',
        active && 'bg-black text-white hover:bg-black hover:text-white'
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadingRef = useRef(false);

  const setLink = useCallback(() => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL du lien', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const onPickImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file || uploadingRef.current) return;
      uploadingRef.current = true;
      const toastId = toast.loading("Envoi de l'image…");
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/blog/upload', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Upload failed');
        editor.chain().focus().setImage({ src: json.url, alt: file.name }).run();
        toast.success('Image ajoutée', { id: toastId });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Échec de l'envoi", {
          id: toastId,
        });
      } finally {
        uploadingRef.current = false;
      }
    },
    [editor]
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b bg-muted/20 px-2 py-1.5">
      <ToolbarButton
        title="Gras"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Italique"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Souligné"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Barré"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-border" />

      <ToolbarButton
        title="Titre 2"
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Titre 3"
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Liste à puces"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Liste numérotée"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Citation"
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-border" />

      <ToolbarButton title="Lien" active={editor.isActive('link')} onClick={setLink}>
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Image"
        disabled={uploadingRef.current}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploadingRef.current ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </ToolbarButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPickImage}
      />

      <span className="mx-1 h-5 w-px bg-border" />

      <ToolbarButton
        title="Annuler"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Rétablir"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
        },
      }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg' } }),
      Placeholder.configure({
        placeholder: 'Rédigez votre article ici…',
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'blog-content min-h-[360px] max-w-none px-4 py-3 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-md border">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
