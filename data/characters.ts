import { Character } from '@/types/character';
import charactersData from './characters.json';

const sortedCharactersData = [...charactersData].sort((a, b) => a.name.localeCompare(b.name));
export const characters: Character[] = sortedCharactersData;