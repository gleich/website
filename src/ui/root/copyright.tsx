'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Copyright() {
  return (
    <footer className="bottom-0 my-10 flex w-full flex-col items-center justify-center text-sm font-bold">
      <Image
        src="/icons/usa.svg"
        alt="United States Flag"
        width={23.25}
        height={16.25}
      />
      <p>
        <span className="pr-0.5">©</span> Matt Gleich{' '}
        {new Date().getFullYear()}
      </p>
      <Link href="https://github.com/gleich/website" target="_blank">
        gleich/website
      </Link>
    </footer>
  );
}
