import { NextResponse } from 'next/server';
import { signJWT } from '@/lib/jwt';

export async function POST(req) {
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: 'Token missing' }, { status: 400 });
  }
  try {
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await userInfoRes.json();
    if (!user || !user.email) {
      return NextResponse.json({ error: 'Invalid Google token' }, { status: 400 });
    }
    const jwt = signJWT(
      {
        sub: user.sub,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: 60 * 60 * 24 }
    );
    return NextResponse.json({ token: jwt, user });
  } catch (err) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
