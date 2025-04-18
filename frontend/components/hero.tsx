// app/components/Hero.tsx
'use client';

import { Button } from '@/components/ui/button';
import { getHeroData } from '@/lib/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface RichText {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

interface HeroData {
  tagline: string;
  title: RichText[];
  description: RichText[];
  button1Label: string;
  button1Link: string;
  button2Label: string;
  button2Link: string;
  backgroundImage?: string | null;
  stat?: {
    value: string;
    label: string;
  }[];
}

function renderRichText(content: RichText[]) {
  return content.map((block, index) => (
    <p key={index} className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-black">
      {block.children.map((child, i) => (
        <span key={i}>{child.text}</span>
      ))}
    </p>
  ));
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getHeroData();
      setHeroData(data);
    }
    fetchData();
  }, []);

  if (!heroData) return null;

  return (
    <div className="relative bg-white dark:bg-gray-950 overflow-hidden">
      {/* Full background image */}
      {heroData.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroData.backgroundImage}
            alt="Background"
            fill
            className="object-cover opacity-80 dark:opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/40 dark:from-gray-950/80 dark:via-gray-950/60 dark:to-gray-950/40"></div>
        </div>
      )}
  
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          {/* Text Section */}
          <div>
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">
              {heroData.tagline}
            </h2>
  
            <div className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              {renderRichText(heroData.title)}
            </div>
  
            <div className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              {renderRichText(heroData.description)}
            </div>
  
            <div className="mt-8 flex gap-4">
              <Button 
              asChild 
              size= "lg"
              className="bg-red-600 hover:bg-red-700 text-white">
                <a href={heroData.button1Link}>{heroData.button1Label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /> 
                </a>
              </Button>
              <Button asChild 
              variant="outline"
              size= "lg"
              className="bg-white border-gray-300 hover:bg-gray-100 text-gray-900 dark:boreder-gray-700 dark:hover:bg-gray-800 dark:text-black"
              >
                <a href={heroData.button2Link}
                className="flex items-center">
                  {heroData.button2Label}
                  <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
              </Button>
            </div>
  
            {heroData.stat && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroData.stat.map((s, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                    <p className="text-gray-600 dark:text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
  
          {/* Empty right column to balance layout */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
} 
