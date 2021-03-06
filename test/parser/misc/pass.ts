import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Misc - pass', () => {
  for (const arg of [
    '123',
    'x;"foo"',
    'false',
    '0x123',
    '0456',
    'null',
    '0o123',
    'x;"foo"',
    '0b1010',

    '[ 1 ]',
    `if (a) {
}`,
    `a.b('c').
d('e',
    /*@ngInject*/
    function(f) {
        return f;
    }).
g('h',
    /*@ngInject*/
    function(i) {
        return i;
    })`,
    `if (a) {
  b();
  c();
  d();
} else {
  e();
  f();
  g();
}`,
    `for([a,b[a],{c,d=e,[f]:[g,h().a,(1).i,...j[2]]}] in 3);`,
    `1 - 2`,
    `a: while (true) { continue a }`,
    `a >>= 1`,
    `(function* () { yield *a })`,
    `({ get: 1 })`,
    `(class {prototype() {}})`,
    `({a: b = c = 1} = 2)`,
    ``
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }
});
