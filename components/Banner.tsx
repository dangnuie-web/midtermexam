'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = [1, 2, 3, 4, 5];

  return (
    <div style={{ marginBottom: '40px', width: '100%', maxWidth: '764px', flexShrink: 0 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '764 / 240',
        }}
      >
        {/* 배너 */}
        <Image
          src={`/Banner/Banner0${banners[currentIndex]}.jpg`}
          alt={`배너 ${currentIndex + 1}`}
          fill
          style={{ objectFit: 'cover', borderRadius: '10px' }}
        />

        {/* 페이지네이션*/}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
          }}
        >
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor:
                  currentIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}