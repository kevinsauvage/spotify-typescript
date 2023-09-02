import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, expiresIn } = body || {};

    if (!accessToken) {
      return NextResponse.json({ error: 'Missing accessToken' }, { status: 401 });
    }

    if (!expiresIn) {
      return NextResponse.json({ error: 'Missing expiresIn' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true }, { status: 200 });

    response.cookies.set({
      httpOnly: true,
      maxAge: expiresIn,
      name: 'spotify_token',
      value: accessToken,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || error.toString() }, { status: 500 });
    }

    return NextResponse.json({}, { status: 500 });
  }
}
