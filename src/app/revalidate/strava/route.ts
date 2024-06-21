import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { env } from 'process';

export async function POST(request: Request) {
  if (
    request.headers.get('Authorization') ==
    'Bearer ' + env.REVALIDATE_TOKEN
  ) {
    console.log('Revalidation on strava triggered');
    revalidateTag('strava');
    return NextResponse.json({ revalidated: true }, { status: 202 });
  }
  return NextResponse.json(
    { revalidated: false },
    { status: 401, statusText: 'Invalided Authorization Token' },
  );
}
