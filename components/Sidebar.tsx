'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();
    const islistActive = pathname === '/';
    const isnewActive = pathname === '/posts/create';

  return (
    <aside
    className="w-full max-w-191 lg:w-50 lg:max-w-none shrink-0 flex flex-row lg:flex-col items-center lg:items-stretch justify-between lg:justify-start gap-4 lg:gap-0 h-auto lg:h-[calc(100vh-74px)] p-5 lg:pb-12.5"
    style={{
      overflow: 'hidden',
      borderRadius: '10px',
      background: '#FFFFFF',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.05)',
    }}
  >

    {/* 로고 */}
      <div className="mb-0 lg:mb-5" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <Image
        src="/icons/ic_logo.png"
        alt="로고"
        width={24}
        height={24}
        />
        <span style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '18px',
          fontWeight: '800',
          color: 'var(--color-text-primary)',
        }}>
          TALKR
        </span>
      </div>

    {/* 밑줄 */}
      <div className="hidden lg:block" style={{
        borderBottom: `1px solid var(--color-border)`,
        marginBottom: '20px',
      }} />

    {/* 메뉴 */}
     <nav className="flex flex-row lg:flex-col gap-3">
        <Link href="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: islistActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
        textDecoration: 'none',
        }}>
        <Image 
            src={islistActive ? "/icons/ic_list-active.png" : "/icons/ic_list.png"}      
            alt="전체 글 보기"
            width={20}
            height={20}
        />
        <span style={{
          fontFamily: 'var(--font-primary)',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.01em',
        }}></span>
        전체 글 보기
        </Link>
        
        <Link href="/posts/create" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: isnewActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
        textDecoration: 'none',
        }}>
        <Image 
            src={isnewActive ? "/icons/ic_new-active.png" : "/icons/ic_new.png"}      
            alt="새 글 작성"
            width={20}
            height={20}
        />
        <span style={{
          fontFamily: 'var(--font-primary)',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.01em',
        }}></span>
        새 글 작성
        </Link>
      </nav>
    </aside>
  );
}