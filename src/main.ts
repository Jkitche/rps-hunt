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

for (let i = 0; i < NUM_CHARACTERS * 3; i++) {
  const object = objects[i];
  let closest;
  switch (object.type) {
    case CType.ROCK:
      closest = objects.find(object => object.type === CType.SCISSOR);
      break;
    case CType.PAPER:
      closest = objects.find(object => object.type === CType.ROCK);
      break;
    case CType.SCISSOR:
      closest = objects.find(object => object.type === CType.PAPER);
      break;
  }
  // @ts-ignore
  objects[i].target = objects[i].findClosestCharacter(closest);
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

let frame = 0;

app.ticker.add(() => {
  frame++;
  const numRocks = objects.filter(object => {
    return object.type === CType.ROCK;
  }).length;
  const numPapers = objects.filter(object => {
    return object.type === CType.ROCK;
  }).length;
  const numScissors = objects.filter(object => {
    return object.type === CType.ROCK;
  }).length;
  text.text = `Num Rocks: ${numRocks} | Num Papers: ${numPapers} | Num Scissors: ${numScissors}\nFrame: ${frame}`;
  objects.forEach(object => {
    object.moveTowardsTarget();
  });
});
