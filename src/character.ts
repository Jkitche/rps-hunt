import {Sprite} from 'pixi.js';
import {app} from './app';
import {PAPER_WHITE, ROCK_WHITE, SCISSOR_WHITE} from './assets';
import {CATCH_DISTANCE, SPEED_MOD} from './constants';
import {objects} from './game';

export enum CType {
  ROCK,
  PAPER,
  SCISSOR,
}

export class Character {
  type: CType = CType.ROCK;
  sprite?: Sprite;
  target: Character | undefined | null;
  index: number;

  constructor(type: CType, index: number) {
    this.type = type;
    this.index = index;
  }

  private getTexture = () => {
    let asset = ROCK_WHITE;
    switch (this.type) {
      case CType.ROCK:
        asset = ROCK_WHITE;
        break;
      case CType.PAPER:
        asset = PAPER_WHITE;
        break;
      case CType.SCISSOR:
        asset = SCISSOR_WHITE;
        break;
    }
    return asset;
  };

  initSprite = () => {
    this.sprite = Sprite.from(this.getTexture());
    this.sprite.width = 25;
    this.sprite.height = 25;
  };

  catchTarget = () => {
    if (this.sprite && this.target?.sprite) {
      const {x, y} = this.target.sprite;
      app.stage.removeChild(this.target.sprite);
      this.target.sprite = Sprite.from(this.getTexture());
      app.stage.addChild(this.target.sprite);
      this.target.sprite.x = x;
      this.target.sprite.y = y;
      this.target.sprite.width = 25;
      this.target.sprite.height = 25;
      this.target.type = this.type;
    }
  };

  randomizePosition = () => {
    const appContainer = document.getElementById('app');
    const width = appContainer?.offsetWidth || 0;
    const height = appContainer?.offsetHeight || 0;

    const widthMultiplier = Math.random() > 0.5 ? 1 : -1;
    const heightMultiplier = Math.random() > 0.5 ? 1 : -1;

    const middleX = width / 2;
    const middleY = height / 2;

    const xValue = Math.floor(Math.random() * 500);
    const yValue = Math.floor(Math.random() * 500);

    if (this.sprite) {
      this.sprite.x = middleX + widthMultiplier * xValue;
      this.sprite.y = middleY + heightMultiplier * yValue;
    }
  };

  getTargetType = () => {
    switch (this.type) {
      case CType.ROCK:
        return CType.PAPER;
      case CType.PAPER:
        return CType.SCISSOR;
      case CType.SCISSOR:
        return CType.ROCK;
    }
  };

  moveTowardsTarget = () => {
    if (this.sprite && this.target && this.target?.sprite) {
      const deltaX = this.target.sprite?.x - this.sprite.x;
      const deltaY = this.target.sprite?.y - this.sprite.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance <= CATCH_DISTANCE) {
        this.catchTarget();
        return;
      }

      const ratio = SPEED_MOD / distance;
      const moveX = deltaX * ratio;
      const moveY = deltaY * ratio;

      this.sprite.x += moveX;
      this.sprite.y += moveY;
    }
  };

  getDistanceToCharacter = (toCharacter: Character) => {
    const deltaX = toCharacter?.sprite?.x || 0 - (this.sprite?.x || 0);
    const deltaY = toCharacter?.sprite?.y || 0 - (this.sprite?.y || 0);

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  findClosestCharacter(characters: Character[]) {
    if (characters && characters.length === 0) {
      return null;
    }

    let closestCharacter: Character = characters[0];
    let closestDistance: number = this.getDistanceToCharacter(closestCharacter);

    if (characters && characters.length > 0) {
      characters.forEach(character => {
        const distance = this.getDistanceToCharacter(character);
        if (distance < closestDistance) {
          closestCharacter = character;
          closestDistance = distance;
        }
      });
    }

    return closestCharacter;
  }
}
