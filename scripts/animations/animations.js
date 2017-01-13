define([
  './beat',
  './cuddle',
  './death1',
  './death2',
  './death3',
  './deathwall',
  './defi',
  './eat',
  './feed',
  './happy1',
  './idle1',
  './idle2',
  './idle3',
  './idle4',
  './love',
  './music',
  './play',
  './sad1',
  './sad2',
  './sad3',
  './sleep',
  './spreng',
  './suicide',
  './todo',
  './train',
  './training',
], function(
  beat,
  cuddle,
  death1,
  death2,
  death3,
  deathwall,
  defi,
  eat,
  feed,
  happy1,
  idle1,
  idle2,
  idle3,
  idle4,
  love,
  music,
  play,
  sad1,
  sad2,
  sad3,
  sleep,
  spreng,
  suicide,
  todo,
  train,
  training
){
  return {
    beat: beat,
    cuddle: cuddle,
    death: ["wrandom", [10, death1], [10, death2], [1, death3]],
    death1: death1,
    death2: death2,
    death3: death3,
    deathwall: deathwall,
    defi: defi,
    eat: eat,
    feed: feed,
    happy1,
    idle: ["wrandom", [10, idle1], [10, idle2], [2, idle3]],
    idle1: idle1,
    idle2: idle2,
    idle3: idle3,
    idle4: idle4, //TODO rename
    love: love,
    music: music,
    play: play,
    sad1: sad1,
    sad2: sad2,
    sad3: sad3,
    sleep: sleep,
    spreng: spreng,
    suicide: suicide,
    train: train,
    training: training,
    missing: train,
    todo: todo,
    TODO: todo,
    stat_satiety_low: ["wrandom", [10, todo]],
    stat_satiety_high: ["wrandom", [10, idle4]],
    stat_energy_low: ["wrandom", [10, todo]],
    stat_energy_high: ["wrandom", [10, todo]],
    stat_happy_low: ["wrandom", [10, sad1], [5, sad2], [1, sad3]],
    stat_happy_high: ["wrandom", [10, happy1]],
  }
});
