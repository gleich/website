'use client';

import Link from 'next/link';

export default function Copyright() {
  return (
    <>
      <style jsx>
        {`
          .copyright {
            width: 100%;
            text-align: center;
            bottom: 0;
            margin: 40px 0px;
          }
        `}
      </style>
      <div className="copyright">
        © Matt Gleich {new Date().getFullYear()} ·{' '}
        <Link href="https://github.com/gleich/website" target="_blank">
          gleich/website
        </Link>
      </div>
    </>
  );
}
