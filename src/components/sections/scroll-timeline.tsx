'use client';

import { useRef, useState, useEffect, useCallback, type ElementRef, type ReactNode } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: ReactNode;
}

interface ScrollTimelineProps {
  items: TimelineItem[];
}

export function ScrollTimeline({ items }: ScrollTimelineProps) {
  const containerRef = useRef<ElementRef<'div'>>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());

  // Track scroll position to fill the vertical line progressively
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;

    // How far the viewport center has traveled through the container
    const viewportCenter = window.innerHeight / 2;
    const progress = Math.min(
      Math.max((-containerTop + viewportCenter) / containerHeight, 0),
      1
    );
    setLineHeight(progress * 100);

    // Check which nodes have been reached
    const newActiveNodes = new Set<number>();
    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const nodeY = rect.top + rect.height * 0.3;
      if (nodeY < viewportCenter + 50) {
        newActiveNodes.add(index);
      }
    });
    setActiveNodes(newActiveNodes);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  // Scroll listener for line progression
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical line - background track */}
      <div
        className="absolute left-6 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />

      {/* Vertical line - filled portion */}
      <div
        className="absolute left-6 top-0 w-0.5 bg-primary transition-[height] duration-100 ease-out md:left-1/2 md:-translate-x-1/2"
        style={{ height: `${lineHeight}%` }}
        aria-hidden="true"
      />

      {/* Timeline items */}
      <div className="space-y-16 md:space-y-24">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isVisible = visibleItems.has(index);
          const isActive = activeNodes.has(index);
          return (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="relative"
            >
              {/* Node circle */}
              <div
                className={cn(
                  'absolute left-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-all duration-500',
                  'md:left-1/2',
                  isActive
                    ? 'border-primary bg-primary scale-125'
                    : 'border-muted-foreground/30 bg-background'
                )}
                aria-hidden="true"
              >
                {isActive && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                )}
              </div>

              {/* Content card */}
              <div
                className={cn(
                  'ml-14 transition-all duration-700 ease-out',
                  // Desktop: alternate left/right
                  'md:ml-0 md:w-[calc(50%-2.5rem)]',
                  isLeft ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4',
                  // Animation states
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : cn(
                        'translate-y-8 opacity-0',
                        isLeft ? 'md:-translate-x-4' : 'md:translate-x-4'
                      )
                )}
              >
                <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">{item.title}</h3>
                  <p className="mb-4 text-muted-foreground">{item.description}</p>
                  <ul className="space-y-2">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
