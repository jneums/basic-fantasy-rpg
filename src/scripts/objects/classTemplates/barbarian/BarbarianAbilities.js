import CombatObject from '../../CombatSystem/CombatObject';
import battleCry from './abilities/battleCry';
import savageBlow from './abilities/savageBlow';
import rush from './abilities/rush';
import gore from './abilities/gore';
import intimidate from './abilities/intimidate';
import hobble from './abilities/hobble';

export default class BarbarianAbilities {
  constructor(character) {
    let abilities = ['dodge', 'block', 'parry'];
    this.getAbilities = () => abilities;

    this.battleCry = battleCry.bind(character);
    this.savageBlow = savageBlow.bind(character);
    this.rush = rush.bind(character);
    this.gore = gore.bind(character);
    this.intimidate = intimidate.bind(character);
    this.hobble = hobble.bind(character);
  }
}
