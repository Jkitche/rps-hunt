import './style.css';
import './app';
import {CType, Character} from './character';
import {app} from './app';
import {NUM_CHARACTERS} from './constants';
import {characters} from './game';
import {Text} from 'pixi.js';
import {FrameTimeAnalyzer} from './frame';

for (let i = 0; i < NUM_CHARACTERS * 3; i++) {
  const ctype =
    i % 3 === 0 ? CType.ROCK : i % 3 === 1 ? CType.PAPER : CType.SCISSOR;
  characters[i] = new Character(ctype);
  characters[i].initSprite();
  characters[i].randomizePosition();
  characters[i].graphics.moveTo(
    characters[i].sprite?.x || 0,
    characters[i].sprite?.y || 0
  );

  // @ts-ignore
  app.stage.addChild(characters[i].sprite);
  app.stage.addChild(characters[i].graphics);
}

const text = new Text(`Num Rocks: 0 | Num Papers: 0 | Num Scissors: 0`, {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0xffffff,
  align: 'center',
});

text.x = 10;
text.y = 10;

app.stage.addChild(text);

const frameTimeAnalyzer = new FrameTimeAnalyzer();
app.ticker.add(() => {
  frameTimeAnalyzer.startFrame();
  const numRocks = characters.filter(character => {
    return character.type === CType.ROCK;
  }).length;
  const numPapers = characters.filter(character => {
    return character.type === CType.PAPER;
  }).length;
  const numScissors = characters.filter(character => {
    return character.type === CType.SCISSOR;
  }).length;

  characters.forEach(character => {
    if (character.type === CType.ROCK) {
      character.target = character.findClosestCharacter(CType.SCISSOR);
    }
    if (character.type === CType.PAPER) {
      character.target = character.findClosestCharacter(CType.ROCK);
    }
    if (character.type === CType.SCISSOR) {
      character.target = character.findClosestCharacter(CType.PAPER);
    }
    character.moveTowardsTarget();
  });
  frameTimeAnalyzer.endFrame();
  text.text = `Num Rocks: ${numRocks} | Num Papers: ${numPapers} | Num Scissors: ${numScissors}\nFrametime: ${frameTimeAnalyzer.getAverageFrameTime()}`;
});
