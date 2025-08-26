// lib/supabase.ts
// URL polyfill for RN; safe if missing.
try { require('react-native-url-polyfill/auto'); } catch {}

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

type AnyObj = Record<string, any>;
const extra: AnyObj =
  (Constants.expoConfig?.extra as AnyObj) ??
  (Constants.manifest?.extra as AnyObj) ??
  {};

let SUPABASE_URL: string | undefined =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? extra.EXPO_PUBLIC_SUPABASE_URL;
let SUPABASE_ANON_KEY: string | undefined =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? extra.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Local dev fallback (lib/env.ts)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  try {
    const local = require('./env').default || require('./env');
    SUPABASE_URL = SUPABASE_URL ?? local.SUPABASE_URL;
    SUPABASE_ANON_KEY = SUPABASE_ANON_KEY ?? local.SUPABASE_ANON_KEY;
    // minimal masked debug
    const mask = (s?: string) => (s ? s.slice(0, 12) + '…' : 'missing');
    console.log('[Supabase] using local env fallback:', {
      url: mask(SUPABASE_URL),
      anon: mask(SUPABASE_ANON_KEY),
    });
  } catch {
    // ignore
  }
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Missing Supabase env. Check app.json -> expo.extra or create lib/env.ts with { SUPABASE_URL, SUPABASE_ANON_KEY }'
  );
  throw new Error('supabaseUrl is required.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
