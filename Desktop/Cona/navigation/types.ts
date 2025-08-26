 // navigation/types.ts
export type RootStackParamList = {
    // auth / onboarding
    Splash?: undefined;
    SignIn: undefined;
    SignUp: undefined;
  
    // main tabs
    MainTabs: undefined;
  
    // extra stack routes
    EditProfile: undefined;
    MatchEnd?: { matchId?: string };
    MatchInfo?: { matchId?: string };
    Payment?: { matchId?: string };
    DevMenu: undefined;
    Settings: undefined;
  };
  
  export type MainTabParamList = {
    Home: undefined;
    AllMatches: undefined;
    Create: undefined;
    Profile: undefined;
  };
  