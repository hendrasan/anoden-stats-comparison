// export interface Character {
//   name: string;
//   PWR: number;
//   INT: number;
//   SPD: number;
//   END: number;
//   SPR: number;
//   LCK: number;
//   HP: number;
//   MP: number;
// }

export type Stats = {
  PWR: number;
  INT: number;
  SPD: number;
  SPR: number;
  END: number;
  LCK: number;
  HP: number;
  MP: number;
};

export type StatLevelKey =
  | "base"
  | "ls5"
  | "ls15"
  | "ls30"
  | "ls50"
  | "ls75"
  | "ls105"
  | "ls140"
  | "ls175"
  | "ls215"
  | "ls255"
  | "ls80sa"
  | "ls255sa";

export type Character = {
  name: string;
  stats: Record<StatLevelKey, Stats>;
};