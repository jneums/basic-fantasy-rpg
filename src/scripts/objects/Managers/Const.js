export default function Const() {

  const constants = {
    MOVEMENT_SPEED:    40,
    MELEE_RANGE:       25,
    BODY_PULL_RANGE:   75,
    CAST_RANGE:       150,
    MAX_AOE_TARGETS:    4,

    MAX_RAGE:         100,
    RAGE_DUMP_VALUE:   30,
    CHARGE_MIN_DIST:   50,
    CHARGE_MAX_DIST:  125,
    CHARGE_SPEED:     500
  }

  return Object.freeze(constants);

}
