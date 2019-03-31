export default function Level(item) {


      // increase lvl:
      this.lvlUp = function() {
        for (let stat in item._statBonus) {
          item._statBonus[stat] += 2;
        }
        item._dmg.min += 2;
        item._dmg.max += 2;
        item._ilvl += 1;
        item._sell *= 1.5;
        _colorIndex++
      }

      this.getColor = function() {
        return COLORS[_colorIndex]
      }

      this.getTint = function() {
        return COLORS[TINTS[_colorIndex]]
      }

      let _colorIndex = 0;

}
