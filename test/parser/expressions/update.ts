import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Update', () => {
  // Invalid cases
  for (const arg of [
    'foo\n++',
    'if (foo\n++);',
    '++([])',
    '([])++',
    'if (a) a\n--;',
    '(((x)))\n++;',
    'a\n--',
    '(x)\n--;',
    '(((x)))\n--;',
    'class x extends ++a {}',
    'class x extends --a {}',
    '({}--)',
    '++(x) => b',
    '++x => b',
    `if (a
  ++b);`,
    `if (a
    ++
    b);`,
    'x.foo++.bar',
    `a
++`,
    `function f(){ return a
  ++; }`,
    `let x = () => a
  ++;`,
    `z=[b
    ++c];`,
    `for (;b
      ++c;);`,
    `z={x:b
        ++c};`,
    `(b
          ++c);`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Valid cases
  for (const arg of [
    '+a++ / 1',
    '({}.x++)',
    '[].x++',
    '(this.x++)',
    'this.x++',
    'let x = () => a++;',
    'a++',
    'function f(){ return a++; }',
    '(x)++;',
    '(((x)))++;',
    'if (a) a++;',
    '++{}.foo',
    '++/b/.c',
    '++\nfoo;',
    'foo\n++bar',
    '++\nfoo;',
    '+a++ / 1',
    'a=b\n++c',
    'a,b\n++c',
    'a++\nb',
    'a\n++\nb',
    'a.a--',
    '++a.a',
    'foo\n++bar',
    '--a.a',
    'bar++',
    '++this.x',
    '(this.x++)',
    '++(x);',
    '(x)++;',
    'a\n++b',
    '++\na',
    'a = ++a',
    'y = x--',
    'typeof a++',
    'typeof ++a',
    `new b
    ++c;`,
    `() => b
    ++c;`,
    `while (true) {b
      ++c};`
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
