'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Banner from '@/components/Banner';
import Image from 'next/image';
import { deletePost, getPost, type Post } from '@/lib/posts';

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(async ({ id }) => {
      setId(id);
      const p = await getPost(id);
      setPost(p ?? null);
    });
  }, [params]);

  return (
    <>
      <Banner />

      <div
        style={{
          width: '100%',
          maxWidth: '764px',
          height: '600px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
      >
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px',
        }}>
          {post ? (
            <>
              <h1 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>
                {post.title}
              </h1>
              <div style={{ height: '1px', backgroundColor: '#E5E5E5', marginBottom: '20px' }} />
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
              }}>
                {post.images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      height: '150px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={image}
                      alt={`이미지 ${index + 1}`}
                      fill
                      sizes="300px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                gap: '30px',
                alignItems: 'flex-start',
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', gap: '12px', flex: '0 0 auto' }}>
                  <div style={{ width: '20px', height: '20px', flexShrink: 0 }}>
                    <Image
                      src="/icons/ic_profile.png"
                      alt="Author"
                      width={20}
                      height={20}
                    />
                  </div>

                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: '#333333' }}>
                      {post.writer}
                    </p>
                  </div>
                </div>

                <p style={{
                  flex: 1,
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0',
                }}>
                  {post.contents}
                </p>
              </div>
            </>
          ) : (
            <h1>글이 없습니다</h1>
          )}
        </div>

        
      </div>

      <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          padding: '20px',
          borderTop: '1px solid #E5E5E5',
        }}>
          <button 
            onClick={() => router.push('/')}
            style={{ backgroundColor: 'var(--color-main)', color: '#FFFFFF' }}
          >
            글목록
          </button>

          <button 
            onClick={() => router.push(`/posts/${id}/edit`)}
            style={{ backgroundColor: '#CCCCCC', color: '#FFFFFF' }}
          >
            수정
          </button>

          <button
            onClick={async () => {
              if (id === null) return;
              if (!window.confirm('삭제하시겠습니까?')) return;
              await deletePost(id);
              alert('삭제되었습니다.');
              router.push('/');
            }}
            style={{ backgroundColor: '#CCCCCC', color: '#FFFFFF' }}
          >
            삭제
          </button>
        </div>

    </>
  );
}