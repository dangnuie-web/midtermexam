import Banner from '@/components/Banner';
import PostList from '@/components/PostList';

export default function Home() {
  return (
    <div className="flex flex-col w-full lg:h-[calc(100vh-74px)]" style={{ maxWidth: '764px' }}>
      <Banner />
      <PostList />
    </div>
  );
}