export default (function Const() {

  const constants = {
    MOVEMENT_SPEED:    50,
    MELEE_RANGE:       25,
    BODY_PULL_RANGE:   75,
    CAST_RANGE:       150,
    MAX_AOE_TARGETS:    4,

    MAX_RAGE:         100,
    RAGE_DUMP_VALUE:   30,
    CHARGE_MIN_DIST:   75,
    CHARGE_MAX_DIST:  150,
    CHARGE_SPEED:     500,

    LOOTING_RANGE:     30,

  }

  return Object.freeze(constants);

})()
