import './style.css';
import './app';
import {CType, Character} from './character';
import {app} from './app';
import {NUM_CHARACTERS} from './constants';
import {objects} from './game';
import {Text} from 'pixi.js';

for (let i = 0; i < NUM_CHARACTERS * 3; i++) {
  const ctype =
    i % 3 === 0 ? CType.ROCK : i % 3 === 1 ? CType.PAPER : CType.SCISSOR;
  objects[i] = new Character(ctype, i);

  objects[i].initSprite();
  objects[i].randomizePosition();

  // @ts-ignore
  app.stage.addChild(objects[i].sprite);
}

const findClosestFromIterator = (character: Character) => {
  if (character.type === CType.ROCK) {
    const closest = objects.filter(object => {
      return object.type === CType.SCISSOR;
    });
    character.target = character.findClosestCharacter(closest);
  }
  if (character.type === CType.PAPER) {
    const closest = objects.filter(object => {
      return object.type === CType.ROCK;
    });
    character.target = character.findClosestCharacter(closest);
  }
  if (character.type === CType.SCISSOR) {
    const closest = objects.filter(object => {
      return object.type === CType.PAPER;
    });
    character.target = character.findClosestCharacter(closest);
  }
};

const text = new Text(`Num Rocks: 0 | Num Papers: 0 | Num Scissors: 0`, {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0xffffff,
  align: 'center',
});

text.x = 10;
text.y = 10;

app.stage.addChild(text);

let frame = 0;

app.ticker.add(() => {
  frame++;
  const numRocks = objects.filter(object => {
    return object.type === CType.ROCK;
  }).length;
  const numPapers = objects.filter(object => {
    return object.type === CType.PAPER;
  }).length;
  const numScissors = objects.filter(object => {
    return object.type === CType.SCISSOR;
  }).length;
  text.text = `Num Rocks: ${numRocks} | Num Papers: ${numPapers} | Num Scissors: ${numScissors}\nFrame: ${frame}`;
  objects.forEach(object => {
    findClosestFromIterator(object);
    object.moveTowardsTarget();
  });
});
