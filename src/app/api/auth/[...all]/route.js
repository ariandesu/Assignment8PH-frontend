/* eslint-disable */
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = auth.handler;
export const POST = auth.handler;
