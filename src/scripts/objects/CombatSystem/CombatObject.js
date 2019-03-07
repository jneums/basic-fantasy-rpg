import processCombatObject from './processCombatObject';


 /**
  * CombatObject - Create anytime you want to modify health
  * of self or enemy. e.g. melee attack, heal, eating.
  *
  * @param  {string} attacker name
  * @param  {string} target name
  * @return {CombatObject}
  */
 export default function CombatObject (attacker = '', target = '') {
   // attacker and target are set at construction,
   // no reason to change them so no setter methods.
   this.attacker = function() {
     return attacker;
   }
   this.target = function() {
     return target;
   }

   this.process = processCombatObject.bind(this);
   // e.g. 'hit', 'miss', 'parry'
   let status = 'hit';
   this.status = () => status;
   this.setStatus = (newStatus = 'hit') => status = newStatus;

   // e.g. 'stun', 'hot', 'dot', 'heal'
   let type = 'autoAttack';
   this.type = () => type;
   this.setType = (newType = 'autoAttack') => type = newType;

   // e.g. 'ranged', 'melee'
   let range = 'melee';
   this.range = () => range;
   this.setRange = (newRange = 'melee') => range = newRange;

   // e.g. 'fire', 'nature', 'shadow'
   let damageType = 'physical';
   this.damageType = () => damageType;
   this.setDamageType = (newDT = 'physical') => damageType = newDT;

   // e.g. 10, -10 (can be negative, in the case of healing)
   let amount = 0;
   this.amount = () => amount;
   this.setAmount = (newAmt = 0) => amount = newAmt;

   // either 'main' or 'off'
   let hand = 'main';
   this.hand = () => hand;
   this.setHand = (newHand = 'main') => hand = newHand;

   // use for specific abilities that generate threat on
   // top of the normal threat from dmg
   let bonusThreat = 0;
   this.bonusThreat = () => bonusThreat;
   this.setBonusThreat = (newThreat = 0) => bonusThreat = newThreat;

   // modified by armor, shield blcok, spalls, etc.
   let mitigationAmount = 0;
   this.mitigationAmount = () => mitigationAmount;
   this.setMitigationAmount = (newAmt = 0) => mitigationAmount = newAmt;

   // read only, used to sort and parse combat log.
   let time = Date.now();
   this.time = () => time;

}
