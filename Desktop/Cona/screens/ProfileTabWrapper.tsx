// screens/ProfileTabWrapper.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

import ProfileScreen from './ProfileScreen';
import ProfileEmptyScreen from './ProfileEmptyScreen';

export default function ProfileTabWrapper() {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!alive) return;

      if (!user) {
        setHasProfile(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('full_name, phone, avatar_url')
        .eq('id', user.id)
        .single();

      // consider it "has profile" if any of the main fields are present
      setHasProfile(!!(data && (data.full_name || data.phone || data.avatar_url)));
      setLoading(false);
    })();

    // optional: listen for auth changes (logout/login)
    const sub = supabase.auth.onAuthStateChange(() => {
      // you could re-run the query here if you want
    });

    return () => {
      alive = false;
      sub.data.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null; // or a tiny loader if you prefer

  return hasProfile ? <ProfileScreen /> : <ProfileEmptyScreen />;
}
