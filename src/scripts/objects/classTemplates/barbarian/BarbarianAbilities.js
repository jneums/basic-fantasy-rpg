import shout from './abilities/shout';
import precision from './abilities/precision';
import rush from './abilities/rush';
import gore from './abilities/gore';
import intimidate from './abilities/intimidate';
import hobble from './abilities/hobble';

export default class BarbarianAbilities {
  constructor(character) {
    let abilities = ['dodge', 'block', 'parry'];
    this.getAbilities = () => abilities;

    this.shout = shout.bind(character);
    this.precision = precision.bind(character);
    this.rush = rush.bind(character);
    this.gore = gore.bind(character);
    this.intimidate = intimidate.bind(character);
    this.hobble = hobble.bind(character);
  }
}
