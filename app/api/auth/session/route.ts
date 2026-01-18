import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAuthSession();
    
    if (!session) {
      return NextResponse.json(
        { session: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { session },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
