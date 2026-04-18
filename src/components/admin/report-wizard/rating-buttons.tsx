'use client';

import { cn } from '@/lib/utils';

interface RatingButtonsProps {
  value?: number;
  onChange: (value: number) => void;
  max?: number;
}

export function RatingButtons({ value, onChange, max = 10 }: RatingButtonsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: max + 1 }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className={cn(
            'h-9 w-9 rounded-md border text-sm font-medium transition-colors',
            value === i
              ? 'border-black bg-black text-white'
              : 'border-gray-300 bg-white text-gray-900 hover:border-black'
          )}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
