
// types/navigation.ts
export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Signup: undefined;
    ProfileSetup: undefined;
    Home: undefined;
  
    // If you don't pass params, keep as undefined
    MatchInfo: undefined | { matchId?: string };
    Payment: undefined | { matchId?: string };
  };
  