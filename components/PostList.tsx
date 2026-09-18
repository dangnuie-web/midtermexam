'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosts, type Post } from '@/lib/posts';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div
      className="lg:flex-1 lg:overflow-y-auto lg:min-h-0"
      style={{ width: '100%', maxWidth: '764px', gap: '16px', display: 'flex', flexDirection: 'column' }}
    >
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/posts/${post._id}`}
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              width: '100%',
              height: '50px',
              padding: '20px',
              borderRadius: '10px',
              background: '#FFFFFF',
              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >

            {/* 좌측 제목 */}
            <div
              style={{
                flex: 1,
                fontSize: '14px',
                fontWeight: 700,
                color: '#333333',
              }}
            >
              {post.title}
            </div>

            {/* 좌측 날짜 */}
            <div
              style={{
                flex: 0,
                fontSize: '14px',
                fontWeight: 400,
                color: '#999999',
                minWidth: '100px',
                textAlign: 'center',
              }}
            >
              {post.createdAt.slice(0, 10)}
            </div>

          </div>
        </Link>
      ))}
    </div>
  );
}