import * as cheerio from 'cheerio';

import fs from "fs";

const url = "https://anothereden.wiki/w/Stats_Index";
const outputFile = "data/characters-complete.json";

const response = await fetch(url);
const body = await response.text();
const $ = cheerio.load(body);
const characters = [];

const stats = ["PWR", "INT", "SPD", "SPR", "END", "LCK", "HP", "MP"];

stats.forEach((stat) => {
  $(
    `.tabber__panel[title="${stat}"] .wikitable tbody tr:not(:nth-child(1))`
  ).each((i, row) => {
    const name = $(row).find("td:nth-child(2) a").text().replace(" ", " ");
    const baseValue = $(row).find("td:nth-child(3)").text();
    const ls5Value = $(row).find("td:nth-child(4)").text();
    const ls15Value = $(row).find("td:nth-child(5)").text();
    const ls30Value = $(row).find("td:nth-child(6)").text();
    const ls50Value = $(row).find("td:nth-child(7)").text();
    const ls75Value = $(row).find("td:nth-child(8)").text();
    const ls105Value = $(row).find("td:nth-child(9)").text();
    const ls140Value = $(row).find("td:nth-child(10)").text();
    const ls175Value = $(row).find("td:nth-child(11)").text();
    const ls215Value = $(row).find("td:nth-child(12)").text();
    const ls255Value = $(row).find("td:nth-child(13)").text();
    const ls80saValue = $(row).find("td:nth-child(14)").text();
    const ls255saValue = $(row).find("td:nth-child(15)").text();

    const character = characters.find((c) => c.name === name);
    if (character) {
      character.stats.base[stat] = parseInt(baseValue);
      character.stats.ls5[stat] = parseInt(ls5Value);
      character.stats.ls15[stat] = parseInt(ls15Value);
      character.stats.ls30[stat] = parseInt(ls30Value);
      character.stats.ls50[stat] = parseInt(ls50Value);
      character.stats.ls75[stat] = parseInt(ls75Value);
      character.stats.ls105[stat] = parseInt(ls105Value);
      character.stats.ls140[stat] = parseInt(ls140Value);
      character.stats.ls175[stat] = parseInt(ls175Value);
      character.stats.ls215[stat] = parseInt(ls215Value);
      character.stats.ls255[stat] = parseInt(ls255Value);
      character.stats.ls80sa[stat] = parseInt(ls80saValue);
      character.stats.ls255sa[stat] = parseInt(ls255saValue);
    } else {
      characters.push({
        name,
        stats: {
          base: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(baseValue),
          },
          ls5: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls5Value),
          },
          ls15: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls15Value),
          },
          ls30: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls30Value),
          },
          ls50: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls50Value),
          },
          ls75: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls75Value),
          },
          ls105: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls105Value),
          },
          ls140: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls140Value),
          },
          ls175: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls175Value),
          },
          ls215: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls215Value),
          },
          ls255: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls255Value),
          },
          ls80sa: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls80saValue),
          },
          ls255sa: {
            PWR: 0, INT: 0, SPD: 0, SPR: 0, END: 0, LCK: 0, HP: 0, MP: 0,
            [stat]: parseInt(ls255saValue),
          },
        },
      });
    }
  });
});

const json = JSON.stringify(characters, null, 2);

fs.writeFile(outputFile, json, "utf-8", function (e) {
  if (e) {
    console.error("Error writing file:", e);
  } else {
    console.log("File written successfully.");
  }
});