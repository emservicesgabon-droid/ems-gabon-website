export interface Stat {
  id: string;
  value: number;
  suffix: string;
  labelKey: string;
  icon: string;
}

export const stats: Stat[] = [
  {
    id: "clients",
    value: 200,
    suffix: "+",
    labelKey: "home.stats_clients",
    icon: "Users",
  },
  {
    id: "years",
    value: 10,
    suffix: "+",
    labelKey: "home.stats_years",
    icon: "CalendarCheck",
  },
  {
    id: "projects",
    value: 500,
    suffix: "+",
    labelKey: "home.stats_projects",
    icon: "FolderCheck",
  },
  {
    id: "support",
    value: 10000,
    suffix: "+",
    labelKey: "home.stats_support",
    icon: "Headphones",
  },
];
