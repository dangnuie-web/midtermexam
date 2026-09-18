'use client';

import { useRef, useState } from 'react';
import { resolveImageUrl, type Post } from '@/lib/posts';
import { uploadImage } from '@/lib/upload';

const inputStyle = (disabled?: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '12px',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  color: disabled ? '#999999' : 'var(--color-text-primary)',
  backgroundColor: disabled ? 'var(--color-border)' : 'transparent',
  fontFamily: 'var(--font-primary)',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  cursor: disabled ? 'not-allowed' : 'text',
});

export interface PostFormValues {
  title: string;
  writer: string;
  contents: string;
  password: string;
  images: string[];
}

interface PostFormProps {
  mode: 'create' | 'edit';
  initialPost?: Post;
  onSubmit: (values: PostFormValues) => void;
  onCancel: () => void;
}

export default function PostForm({ mode, initialPost, onSubmit, onCancel }: PostFormProps) {
  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const [title, setTitle] = useState(initialPost?.title ?? '');
  const [contents, setContents] = useState(initialPost?.contents ?? '');
  const [writer, setWriter] = useState(initialPost?.writer ?? '');
  const authorLocked = mode === 'edit';
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<(string | null)[]>(() => {
    const base = initialPost?.images ?? [];
    return [0, 1, 2].map((i) => base[i] ?? null);
  });
  const [uploadingSlots, setUploadingSlots] = useState<boolean[]>([false, false, false]);

  const handleImageSelect = async (index: number, file: File | undefined) => {
    if (!file) return;
    setUploadingSlots((prev) => prev.map((v, i) => (i === index ? true : v)));
    try {
      const path = await uploadImage(file);
      setImages((prev) => prev.map((img, i) => (i === index ? path : img)));
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploadingSlots((prev) => prev.map((v, i) => (i === index ? false : v)));
    }
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.map((img, i) => (i === index ? null : img)));
    const input = fileInputRefs[index].current;
    if (input) input.value = '';
  };

  const handleSubmit = () => {
    if (!title.trim() || !contents.trim() || !writer.trim() || !password.trim()) {
      alert('제목, 내용, 작성자, 비밀번호를 모두 입력해주세요.');
      return;
    }

    onSubmit({
      title: title.trim(),
      writer: writer.trim(),
      contents: contents.trim(),
      password: password.trim(),
      images: images.filter((image): image is string => image !== null),
    });
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          maxWidth: '764px',
          padding: '30px',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.05)',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {mode === 'edit' ? '글 수정' : '새 글 작성'}
        </h1>
        <div style={{ height: '2px', backgroundColor: 'var(--color-main)', marginBottom: '30px' }} />

        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <label style={{ minWidth: '60px', marginTop: '12px', whiteSpace: 'nowrap' }}>제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            style={inputStyle()}
          />
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <label style={{ minWidth: '60px', marginTop: '12px', whiteSpace: 'nowrap' }}>내용</label>
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            placeholder="내용을 입력해주세요"
            style={{
              ...inputStyle(),
              height: '220px',
              resize: 'none',
              fontFamily: 'var(--font-primary)',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <label style={{ minWidth: '60px', marginTop: '12px', whiteSpace: 'nowrap' }}>이미지</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {images.map((image, index) => (
              <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                <input
                  ref={fileInputRefs[index]}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageSelect(index, e.target.files?.[0])}
                  style={{ display: 'none' }}
                />
                {uploadingSlots[index] ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}
                  >
                    업로드 중...
                  </div>
                ) : image ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageUrl(image)}
                      alt={`업로드 이미지 ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '20px',
                        height: '20px',
                        minWidth: 0,
                        padding: 0,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRefs[index].current?.click()}
                    style={{
                      width: '100%',
                      height: '100%',
                      minWidth: 0,
                      padding: 0,
                      border: '1px dashed var(--color-border)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <label style={{ width: '70px', marginTop: '12px' }}>작성자</label>
            <input
              value={writer}
              onChange={authorLocked ? undefined : (e) => setWriter(e.target.value)}
              disabled={authorLocked}
              placeholder="작성자를 입력해주세요"
              style={inputStyle(authorLocked)}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <label style={{ width: '70px', marginTop: '12px' }}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              style={inputStyle()}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: 'var(--color-main)', color: '#FFFFFF' }}
        >
          {mode === 'edit' ? '수정' : '등록'}
        </button>

        <button
          onClick={onCancel}
          style={{ backgroundColor: '#CCCCCC', color: '#FFFFFF' }}
        >
          취소
        </button>
      </div>
    </>
  );
}
