// types/navigation.ts
export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Signup: undefined;
  
    Home: undefined;
    AllMatches: undefined;
    MatchInfo: undefined | { matchId?: string };
    EndMatch: { matchId?: string } | undefined;
  
    Profile: undefined;
    Payment: undefined | { matchId?: string };
  };
  