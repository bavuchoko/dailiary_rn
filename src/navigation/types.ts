export type HomeStackParamList = {
  Splash: undefined;
  Main: undefined;
  DiaryRead: {
    date?: string;
  } | undefined;
  YearCalendar: {
    date: string;
  };
  MonthCalendar: {
    year: number;
    month: number;
    date?: string;
  };
};

