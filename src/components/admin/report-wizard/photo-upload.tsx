'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  maxSizeMb?: number;
  label?: string;
}

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch('/api/reports/upload', { method: 'POST', body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error || 'Upload failed');
  }
  const { url } = await res.json();
  return url as string;
}

export function PhotoUpload({
  value,
  onChange,
  multiple = true,
  maxSizeMb = 10,
  label,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setError(null);

      const validFiles: File[] = [];
      for (const file of Array.from(files)) {
        if (file.size > maxSizeMb * 1024 * 1024) {
          setError(`${file.name} dépasse ${maxSizeMb}MB`);
          continue;
        }
        if (!file.type.startsWith('image/')) {
          setError(`${file.name} n'est pas une image`);
          continue;
        }
        validFiles.push(file);
      }

      if (validFiles.length === 0) return;

      setUploading(true);
      try {
        const urls = await Promise.all(validFiles.map(uploadFile));
        onChange(multiple ? [...value, ...urls] : urls.slice(0, 1));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, multiple, maxSizeMb]
  );

  const removePhoto = (index: number) => {
    const next = [...value];
    next.splice(index, 1);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {label && <div className="text-sm font-medium">{label}</div>}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        className={cn(
          'cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors',
          isDragging ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-black',
          uploading && 'pointer-events-none opacity-60'
        )}
      >
        {uploading ? (
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin text-gray-500" />
        ) : (
          <Upload className="mx-auto mb-2 h-5 w-5 text-gray-500" />
        )}
        <div className="text-sm text-gray-700">
          {uploading ? 'Envoi en cours…' : 'Click to choose a file or drag here'}
        </div>
        <div className="mt-1 text-xs text-gray-500">Size limit: {maxSizeMb} MB</div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <div className="text-xs text-red-600">{error}</div>}

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {value.map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-md border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Photo ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(i);
                }}
                className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Retirer la photo"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
