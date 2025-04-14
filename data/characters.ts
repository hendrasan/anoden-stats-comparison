import { Character, StatLevelKey } from '@/types/character';
import charactersData from './characters-complete.json';

const sortedCharactersData = [...charactersData].sort((a, b) => a.name.localeCompare(b.name));
export const characters: Character[] = sortedCharactersData as Character[];

export const getMaxStatValuesPerLevelKey = () => {
  const levels: StatLevelKey[] = [
    "base",
    "ls5",
    "ls15",
    "ls30",
    "ls50",
    "ls75",
    "ls105",
    "ls140",
    "ls175",
    "ls215",
    "ls255",
    "ls80sa",
    "ls255sa",
  ];

  return levels.reduce((acc, level) => {
    const validChars = characters.filter((char) => char.stats);

    const maxHP = validChars
      .map((char) => char.stats[level]?.HP || 0)
      .reduce((max, current) => Math.max(max, current), 0);

    const maxMP = validChars
      .map((char) => char.stats[level]?.MP || 0)
      .reduce((max, current) => Math.max(max, current), 0);

    const maxMainStat = validChars
      .map((char) => {
        const stats = char.stats[level];
        if (!stats) return 0;
        return Math.max(
          stats.PWR || 0,
          stats.INT || 0,
          stats.SPD || 0,
          stats.SPR || 0,
          stats.END || 0,
          stats.LCK || 0
        );
      })
      .reduce((max, current) => Math.max(max, current), 0);

    return {
      ...acc,
      [level]: {
        HP: maxHP,
        MP: maxMP,
        mainStat: maxMainStat,
      },
    };
  }, {} as Record<StatLevelKey, { HP: number; MP: number; mainStat: number }>);
};

console.log(getMaxStatValuesPerLevelKey());