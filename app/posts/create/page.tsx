'use client';

import { useRouter } from 'next/navigation';
import PostForm, { type PostFormValues } from '@/components/PostForm';
import { addPost } from '@/lib/posts';

export default function CreatePostPage() {
  const router = useRouter();

  const handleSubmit = async (values: PostFormValues) => {
    const newPost = await addPost(values);
    alert('글이 등록되었습니다.');
    router.push(`/posts/${newPost._id}`);
  };

  return <PostForm mode="create" onSubmit={handleSubmit} onCancel={() => router.push('/')} />;
}
