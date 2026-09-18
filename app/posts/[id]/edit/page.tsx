'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm, { type PostFormValues } from '@/components/PostForm';
import { getPost, updatePost, type Post } from '@/lib/posts';

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    params.then(async ({ id }) => {
      setId(id);
      const p = await getPost(id);
      setPost(p ?? null);
    });
  }, [params]);

  const handleSubmit = async (values: PostFormValues) => {
    if (id === null) return;
    await updatePost(id, values.password, values);
    alert('글이 수정되었습니다.');
    router.push(`/posts/${id}`);
  };

  if (post === undefined) return null;
  if (post === null) return <h1>글이 없습니다</h1>;

  return (
    <PostForm
      mode="edit"
      initialPost={post}
      onSubmit={handleSubmit}
      onCancel={() => router.push(`/posts/${id}`)}
    />
  );
}
