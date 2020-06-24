import * as t from 'assert';
import { recovery } from '../../src/escaya';

describe('Recovery - Misc', () => {
  // Testing function declartations to make sure we don't
  // fail short
  for (const arg of [
    'function x',
    'function x (',
    'function x ()',
    'function x () {',
    'function x () {}',
    'function x (y {}',
    'function x (y z {}',
    'function x (y z ',
    'function x (y z {',
    'function x y z {}',
    'function x () {}',
    'function x () {}',
    'function x (= {}',
    'function x (x = {}',
    'function x ( = y) {}',
    'function x ( (/ 67)) {}',
    'function x (y = z - ) {}',
    'function x (y = z -  {}',
    'function a() {"}',
    'function a() {"string"}',
    'function a() {"directive"',
    'function a() {"use strict";',
    'function a() {"use strict;',
    'function a() {"use strictt";',
    'function a() {"use strictt"}',
    'function a() {"recovery"}',
    'function a() "recovery"',
    'function a() {"recovery"',
    'function a() "recovery"}',
    'function a() "recovery" = foo}',
    'function a(.) {}',
    'function a(..) {}',
    'function a(...) {}',
    'function a(..a) {}',
    'function a({},a) {}',
    'function a({},a {}',
    'function x ([a]) {}',
    'function x ([a=) {}',
    'function x ([a= {}',
    'function x (}',
    'function (}',
    'function x (',
    'function function'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Import / Export in both module goal and script

  for (const arg of [
    'export {',
    'export from !',
    'export from 1',
    'export !!{',
    'export {//// comment and more',
    'export {!',
    'export }',
    'export £',
    'import [ foo ] from "foo.js"',
    'import * foo from "foo.js";;',
    'import { foo as bar',
    'export * as',
    'export * from 1',
    'export * as x from abc',
    'export * as ',
    'export * as ****** 89779 ',
    'export %&/()=?',
    'export * as {[]@£',
    'export * as ;;;;',
    'export * as **',
    'import { [123] } from "foo"',
    'export * as x from',
    'export * as x as ****** from 1',
    'export * as x from abc',
    'import { [12 } from "foo"',
    'import { [123[[[ } from "foo"',
    'export function async() { }',
    'export function func() { };',
    'export { };',
    'export function set(x) { value = x };',
    'export let value = 0;',
    'export default function*() {}',
    'export default function*() ',
    'export function foo() { return 42 }',
    'export default 42;',
    'export let  1;',
    'export function s) { a ',
    'export function get_a() { return a };',
    'export {get}; function get() {};',
    'export default x;',
    'export lt async function *f(){} foo',
    'export async f40 }',
    'export var w = 41;',
    'expo42;',
    'export const z = "hello world";',
    'function f()port { f };',
    'export let x = 0;',
    "export { .js';",
    'export * from',
    'export var foo;',
    'export function goo() {};',
    'export let hoo;',
    'export const joo = 42;',
    'export default (function koo() {});',
    'export var y = 0;',
    'export const z = 0;',
    'export function func() { };',
    'export { };',
    'export function foo () { return "foo"; }',
    'export { };',
    'export f};',
    'export let= 0;',
    'export default}',
    'export functio()  return 42 }',
    'export  42;',
    'export let  1;',
    'export fu { a ',
    'export function get_a() { return a };',
    'export {get',
    'export default ;',
    'export lt async ){ foo',
    'export async }',
    'export  = 41;',
    'export const z = hello world";',
    'function { f };',
    'exportt x = 0;',
    "export {{{{{{{{{{{{ .js';}}}}",
    '!!! export from switch(export x from "y") {',
    'export * from',
    'export var foo;',
    'export function };',
    'export function ;',
    'export function {;}',
    'export {;}',
    'export /&()=[{][{{8[]}89[{8909lkj/    j]{[]let hoo;',
    'export const joo = 42;',
    'export default (function koo() {});',
    'export var y = 0;',
    'export const z = 0;',
    'export function func() { };',
    'export { };',
    'export function foo () { return "foo"; }',
    'import { x as 1 } from "x";',
    'import [ foo ] from "foo.js"',
    'import * foofrom "foo.js";;',
    'import { foo as bar',
    'import { foo, , } from "module";',
    'import { };',
    'import {;',
    'import {x}, {y} from "foo";',
    'import * as x, {y} from "foo";',
    'import / as a from "foo";',
    'import * as a from 12;',
    'import { x }, def from "foo";',
    'import {};',
    'import { foo as switch from "module";',
    'import { 123 } from "foo";',
    'import a, *= from foo"',
    'import a, ** from "foo"',
    'import ghost from [];',
    'import { [123 from foo',
    'import { x as   from "x";',
    'import [ foo  from "foo.js"',
    'import * foo ;;',
    'import { ',
    'import { foo, , } from "module";',
    'import { ;',
    'import {;',
    'import {x}, {y} from "foo";',
    'import * as x, {y} from "foo";',
    'import / foo";',
    'import / ;',
    'import * as a from 12;',
    'import { x }, def from "foo";',
    'import {};',
    'import { foo as switch } from "module";',
    'import { 123 } from "foo";',
    'import a, *= from "foo"',
    'importa, ** from "foo"',
    'import ghost from [];',
    'import { [123] } from "foo"',
    "import { a ,,, from 'foo';",
    "import { , c, } from 'baz';",
    "import * as fobar.js';",
    'import {,t, from } from "baz"',
    "import {} from 'x'",
    'import {a} ',
    "import {a as b} from 'x'",
    "import {a,b,} from 'x'",
    "import m ;;'baz';",
    'import $o"',
    'import ;{} from "foo";',
    "import n from 'n.js';",
    'import at async from "foo";',
    "import { 'm.js';",
    "import { a } from 'foo';",
    "import { a, b ,,,,,,, !!!!! //} from 'baz';",
    "import * as foob from 'bar.js';",
    'import { aset, set,;; from } from "baz"',
    "import {}x'",
    "import {a} from 'x'",
    "import {a as b} from 'x'",
    "import {a,,n from 'x'",
    "import foo, * as bar from 'baz';",
    'import $ from "foo"',
    'importv [ { from "foo";',
    "import **//  from 'n.js';",
    'import a from "module";',
    'import async from "foo";',
    "import { } from 'm.js';",
    "import { a } from 'foo';",
    "import { a, b as d, c, } ;;from 'baz';",
    "import * as;;;;;;;;;;;;;; foob from 'bar.js';",
    'import { as, get, s from  from "baz',
    "import {} from 'x'",
    "import a} from 'x'",
    "import a as b} from 'x'",
    "import {a,[[[[[[[[[[------2b,} from 'x'",
    'import foo, * as ',
    'import foo, * as $s',
    'import $ ',
    'import { foo";',
    "import }}}}}}}{ /*asdf*/ a / ? : c n from 'n.js';",
    'import "module";',
    'import module";',
    'import async from "foo";',
    "import { } from 'm.js';",
    'export const boo = 5;',
    'import {ns hree";',
    'export let = 0;',
    'export var y = 0;',
    'export const z = 0;',
    'export default x;',
    'export function func() { };',
    'var x; export default x = ',
    'export {  } from  ||',
    "export * from 'soms;",
    'var foo; export { foo as for };',
    'export { arguments }}}}} from @$£€€$£@',
    "export { for } from 'm.js';",
    "export { yield '",
    "export { yield '",
    "export { yield '",
    'export {{{{{ yield ',
    'export {{{{{ }}}} yield ',
    'export { static',
    "export { let } from 'm.js'",
    "export * as arguments from 'm.js'",
    "export * as await from 'm.js'",
    "export * as default from '",
    "export * as  from 'm.js'",
    "export * as '",
    'export * as defaul',
    'function _default() { }; export ',
    'function* g(',
    "export { a as b } from 'm.js';",
    "export { a as b  from 'm.js';",
    "export  a as b } from 'm.js';",
    "export  a as b  from 'm.js';",
    "export  a as b  ';",
    'export { a as b } from ',
    "export { a as b } from ';",
    "export * from / +'p.js';",
    'export var ----foo;',
    'export !!function goo() {};',
    'export let hoo;',
    'export const joo = 42;',
    'export default (;;;;;;;;',
    'export var 0;',
    'export cons',
    'export function func() { };',
    'export { };',
    'export function foo () { return "foo"; }',
    'export function *g() {',
    'export let x = y, {...',
    'export ;;;;',
    'export default function (',
    'export var {x} = a, {y',
    'export  = obj;',
    'export default () => {}',
    'export { encrypt }\nvar encrypt',
    'function encrypt() {} let decrypt; export { encrypt, decrypt }',
    'export const const5 = { ',
    'export const const6 =  ]',
    'function x() {  "a" ? ((this',
    'export {',
    "export var var1 = 'string';",
    "export default 'default';",
    'export var var2;',
    'export var var',
    'function _default() { }; export default _default',
    'function* g() { }; export default g',
    'export function *g() { } if (true) { }',
    'export let x = y, {...z} = y;',
    'export let x = y, [...z] = y;',
    'export default function () {}',
    'export var {x = a, {y} = obj;',
    'export var {x} = a, y = obj;',
    'export var {x',
    'export default () => {',
    'export `{',
    'export `',
    'export { encrypt }\nvar encrypt',
    'export * as default from m.js',
    'function encrypt() { { encrypt, decrypt }',
    'export const const5 = { }',
    'export const const6 = [ ]',
    'function x() {  "a" ? ((this)) : ((true));  }',
    'export {};',
    "export var ';",
    "export defaault';",
    'export var var2;',
    'export = 5, var4'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Misc test cases

  for (const arg of [
    'let {',
    'let a = {',
    'let !!()=',
    'let /asdfasdf',
    'let a[',
    'let }',
    'const let {',
    'let /(&)=',
    'const ....',
    'const ...',
    'YT',
    '¤',
    'let {',
    'let }',
    'try () {',
    'try (',
    'try {}',
    'switch',
    'switch(',
    'switch()',
    'switch {',
    'for',
    'for {',
    'for( {',
    'for( {}',
    'for( }',
    'break !!',
    'function',
    'function (',
    'function {}',
    'function {',
    'function }',
    '"use strict"; for(let in foo) {}',
    '"use strict"; for(let !) {}',
    'for({x = y} in foo',
    'for({x = y} in foo);',
    'for(let {x = y} in foo',
    'for(const {x = y} in foo);',
    'for(let a,b,c in x) {}',
    'for(let a,{,c in x) {}',
    'for(var a,c in x) {}',
    'for(var a,,c in x) {}',
    'for(var a,,,,,,,,,,,,,,,c in x) {}',
    'for(a,{,c in x) {}',
    'for ((a,b) in c);',
    'function arguments(){}v:switch(x){default:}let arguments=l',
    '({__proto__: a, __proto__: b});',
    '({__proto__: a, __proto__: b});',
    '({__proto__: a, __proto__:});',
    '({__proto__: a, : b});',
    '({__pto__: b});',
    `async
    function test(){
        await foo();
    }`,
    `async
    function test(
        await foo(;
    }`,
    `async
    function test(){
        await foo();
    }`,
    'for({x = 0} = 0 of {});',
    'a?.?.',
    'a?.b?.',
    'a?.a?.``',
    'a?.a?``',
    '',
    '(a b c',
    '(a, b c',
    '(a, b, c,',
    'x(a b c',
    'x(a, b c',
    'x(a, b, c,',
    'a(b;c;',
    'a(b;c;)',
    '',
    'new Date/++;',
    '([(x().foo)]) => x',
    '([(x().foo)]) => ',
    '([(x().)]) => x',
    '([(x(.o) => x',
    'new Date++;',
    'r(let.a of 0);',
    'for ( a ) { }',
    'var a = if (b) { c }',
    'var a = if b { c }',
    'var a = 0b12',
    `async ({x} = await bar) => {}`,
    `let z = async ({x} = await bar) => {}`,
    `async ({x} = await bar);`,
    'function foo(a, ...b, c) { }',
    'function foo(a, ...b, ) { }',
    'function foo(a, ...[b], ) { }',
    'function foo(a, ...{b}, ) { }',
    'function foo(...a, ...b) { }',
    'function foo(a, ...{b} = 20) { }',
    'function foo(a, ...b = 20) { }',
    'function * foo(o) { ({...{ x = yield }} = o); }',
    'var {...r = {a: 2}} = {a: 1, b: 2};',
    'var {...r, b} = {a: 1, b: 2};',
    'var {...r, ...e} = {a: 1, b: 2};',
    'var {...= {a: 2}} = {a: 1, b: 2};',
    'var {... 2};',
    'var {...r, ...e} = {a: 1,',
    '({...new Object()} = {a: 1, b: 2});',
    '(function * (o) { ({ ...{ x: yield } } = o); })()',
    'var [...x = 20] = 20;',
    'var [...[...x = 20]] = 20;',
    'var {x}',
    'var {x, y}',
    'var {x}  y}',
    'var {foo:bar, bar:baz}',
    'var [x]',
    'var [x, y]',
    'var [x] = [], [x, y]',
    'for (of of of of){}',
    'for ; of){}',
    'for (of of []; of; of){}',
    'for (ofof){}',
    'for (var of of){}',
    'for n of){}',
    'for (',
    'for (var of in){}',
    'for (var of.of of of){}',
    'for (of[of of of){}',
    'do function foo() { } while (false); ',
    `async ({} + 1) => x;`,
    '({a=b => x',
    '({a=b}(x)) => x',
    '([{a=.x) => x',
    '([{a=b[x]) => x',
    '([{a= => x',
    'for (let() of y);',
    'var [(x)v;',
    'var {(x)} = v;',
    'con(x)] = v;',
    'const} = v;',
    `(a,b,)`,
    'x y}',
    `(...x);`,
    `(a,b,)`,
    `([{a=b}.x]) => x`,
    `({a: {a=b}.x}) => x`,
    `[...[x].map(y, z)] = a;`,
    `({ident: {x}.join("")}) => x`,
    `({"x": [y].slice(0)} = x)`,
    `({"x": [y].) => x`,
    `({"x: [y].) => x`,
    'let z = async ({x} = await bar) => {}',
    'async nc function g(x=(await z)=y){}   }',
    '(x=(await z)=y)',
    '(x=(yield z)=y)',
    'function *f(x=(yif(x=(yield z)=y){}',
    `(a,)`,
    `(a = b,)`,
    '(a',
    'a[5',
    'a[5 + 6',
    'a.',
    '()',
    "a.'l'",
    'new -a',
    '(a:) --b',
    '(a: --b',
    'a-- ++ € {[  $',
    '1: null',
    '+-!~',
    '+-!~((',
    'a)',
    'a]',
    '.l',
    '1.l',
    'a + * b',
    'a ? b',
    'a ? b :',
    '%a',
    'a in instanceof b.l',
    '- false = 3',
    'a + typeof b += c in d',
    'typeof a &= typeof b',
    'a(*a)',
    'a(.length)',
    'new a(5',
    '(function a{})',
    'try a; catch(e) {}',
    'try {} catch',
    'try {}ly a()',
    'try {} catch(e)',
    'try { finally',
    'try {} finally {',
    'try {} catch ...) {}',
    'switch () {}',
    'case 5:',
    'default:',
    'var a = 0b',
    'var a = 0b0112___',
    'var a = 0b0_112__',
    'var a = 0b1.2',
    'var a = 0b12__1',
    'var a = 0b1e2',
    'var a = 12.12.12',
    'var a = 12e23.23e2',
    'var a = 23e23e23',
    'var a = 12e',
    'var a = 12e1a',
    'var a = 0xFH',
    'var a = 0x345aef3_',
    'var a = 0x345___aef3_',
    'var a = 0x345aef3n_',
    'var a = 035424n',
    'var a = 035424_',
    'var a = 03_54_24',
    'var a = 0x',
    'function f() { if (--a()) do with(1) try {} catch(ke) { f() ; g() } while (a in b) else {} }',
    'function f() { if (--a()) do with(1) try {} catg() } while (a in b) else {} }',
    'function f() { if (--a()) do with(1) try {} catch(ke) } while (a in blse {} }',
    'function f() { if try {} catch(ke) { f() ; g() } while (a in b) else {} }',
    'function f { if (--a()) ) try {} catch(ke) { f() ; g() } while (a else {} }',
    'try {',
    'try }',
    '"foo" | "bar" = ("foo");',
    '({a =       ,,,',
    ',,,',
    'n, op, val,',
    '\n]',
    `({a({e: a.b})`,
    `({a({e: a.)`,
    `x \n isnt y`,
    '/*asdff lkadf',
    'dd //',
    'swithc //',
    'try (//',
    'catch 3',
    '(][{}])',
    '@£€${[fdasfd',
    '-------------*',
    '-3',
    '-£',
    '& dsakjfl &/{ = daf switch( foo',
    '%H',
    '#',
    '{ // }',
    '/*{/**adsf*/}',
    '******** [',
    'F/',
    '[',
    ']/a-3',
    '&/ switch( try( function',
    '¤jd',
    '{[',
    '[}',
    '=)(/',
    '[{]',
    'function [{ catch',
    '/a',
    '_;;;;;;',
    ' ',
    '\\67 = x',
    'while (\\67 = adfh [}',
    'do while f /- -asdf',
    '{€',
    'class ........',
    'class ;;;;',
    'class a ;;;;',
    '..,m.--[[[',
    ']}',
    '( 98 swithc do while break continue return )[[]} return package',
    '1,[',
    '1n[',
    '"',
    '"`',
    '`aa',
    '`aa`=b',
    'Ø',
    '*/*/*/*/**/-3 = s switch(try catch',
    'aaaaaaaaa {[',
    '\\\\s',
    ':4',
    '_',
    '?:a',
    '?:',
    '(a, (b)) => 42',
    '((... = []) => })',
    '((...a = []) => {',
    '((...a = []) => {}',
    'var a = 0b12',
    'var a = 0b',
    'var a = 0b2___',
    'var a = 0b0_112__',
    'var a = 0b1.2',
    'var a = 0b12__1',
    'var a =',
    'var  12.12.12',
    'var a = 12e23.23e2',
    'var a = 23e23e23',
    'var a = 12e',
    'var2e1a',
    'var FH',
    'var a345aef3_',
    'var a aef3_',
    'vaaef3n_',
    'var5424n',
    'var a 424_',
    'var a3_54_24',
    'var a = ',
    'var a = 0b12',
    'var a = 0b',
    'var a = 2___',
    'var a = __',
    'var a = 0b1.2',
    'var a = 02__1',
    'var a = 0e2',
    'var a = 12.12.12',
    'var a = 12e23.',
    'var a = 233e',
    'var a = 12e',
    'var a = 12e1a',
    'var a = 0xFH',
    'var a = 0x345aef3_',
    'var a _= 0_x3__',
    'const a = 0x3',
    'var / a = 035424n',
    'var = a = 035424_',
    'var 24 a = 03_54_24',
    'var + a = 0x',
    '0x1_',
    '/\\S',
    '0xFin y',
    'with (a) let [x] = y',
    'with (a) let [x',
    'with (a) let [',
    'with ( let [x= y',
    'with () let [x] = y',
    'with ( let [x] = y',
    'with a) let [x] = y',
    'with a) let [x] = y',
    'with (a)  [x] = y',
    'with (a) let  = y',
    'with (a) let [x] = y',
    'with (a) let [x] = y',
    'async functio',
    'async function x await: ',
    '[([b])] = t',
    '[([b])] = t;',
    '[([b] = t;',
    '[( = t;',
    'b])] = t;',
    '(true ? x : y)++',
    '(true ? x : y)++',
    '(true ? x : y)++(true ? x : y)++',
    '(true ? x : y)++(true ? x : y)++',
    'switch(true ? x : y)++(true ? x : y)++',
    'try(true ? x : y)++(true ? x : y)++',
    'for(true ? x : y)++(true ? x : y)++',
    'class(true ? x : y)++(true ? x : y)++',
    '[(true ? x : y)++(true ? x : y)++',
    '[(x) = ',
    '(((x,) = 5',
    '(((x,x) = 5',
    '(((x,)) = 5',
    '(,x))) = 5',
    '(,x))) = ,,,,,,,,',
    'va@£$luev',
    'new Date++;',
    'function(true ? x : y)++(true ? x : y)++',
    'async function *a() { await: b}',
    'async function a*() { await: b}',
    '"use strict"; async function a*() { await: b}',
    'async function() { await: b}',
    'async function() { yield: b}',
    'async function *a() { yield: b}',
    'async function a*() { yield: b}',
    '"use strict"; async function() { package: b}',
    'var',
    'var a',
    'var a {',
    'var a {}',
    'var a, {',
    'continue',
    '/',
    '/aa',
    'let }',
    '[',
    '[/]',
    '/]',
    '{}',
    '}',
    '{',
    '{)',
    '}(',
    '{while){break;}',
    '{while){break;}',
    '{function a',
    '{)}',
    '{({',
    '{{{}',
    '{{}}',
    '{{',
    '{{}',
    '{{}',
    `() =>`,
    `() =>
    ? foo`,
    `() =>
    ? foo :`,
    `() =>
    ? foo :
    bar`,
    `() =>
    * acorn`,
    '"use strict"; class package',
    '"use strict"; class package {}',
    '"use strict class package {}',
    '"use strict" class package {}',
    'use strict"; class package {}',
    'class x { a() {}, a() {},,, }',
    'class x { a() {}, a() { }',
    'class x { = a() {}, a() { }',
    'class x { ????? a() {}, a() { }',
    'class x { ;;;;;;;;;;;;; a() {}, a() { }',
    'class x { ;;;;;;;;;;;;; a() {} ;;;;; { }',
    'class x { ;;;;;;;;;;;;; }',
    'class x { ;;;;;;;;;;;;; ',
    'class x { %&/78932464lsdf ',
    'class x { Y & ',
    'class x { = ',
    'class x { / ',
    'class x { =** ',
    'class x { ** ',
    'class x { /a/() {} ',
    'class x  = ',
    'class x  ** ',
    'class x { a() {}, a() {},,, }',
    'class x { a() {}, a() { }',
    'class x { = a() {}, a() { }',
    'class x { ????? a() {}, a() { }',
    'class x { ;;;;//;;;;;;;;; a() {}, a() { }',
    'class x { ;;/a;;;;;;;;;; a() {} ;;;;; { }',
    'class x { ;;;;;;/***/;;;;;;; }',
    'class x { ;;;;;;;;;;;;; ',
    'class x { %;;& / ;7;893;2464;{€[; [;{;];l;s;;;;d;f ',
    'class x { Y & ',
    'class x { = ',
    'class x { / ',
    'class x { / ///class x { / ///////',
    'class x { =** ',
    'class x  ** ',
    'class x  =** ',
    'class  { ** ',
    'class x { /a/() {} ',
    'class x  = ',
    'class x  ** ',
    `() => {}.\n** x`,
    `() => {}[\n** x`,
    '() => {}\n`` x',
    '() => {}``\n** x',
    `() => {}\n[ x`,
    `() => {}? x `,
    `() => {}? x : `,
    `() => {}? x : bar`,
    `() => {}* x`,
    `() => {}\n? x `,
    `() => {}\n? x : `,
    `() => {}\n? x : bar`,
    `() => {}\n* x`,
    `() => {}\n. x`,
    `() => {}\n* x`,
    `() => {}?\n x `,
    `() => {}\n?\n x : `,
    `() => {}\n?\n x : bar`,
    `() => {}\n*\n x`,
    `() => {}\n.\n x`,
    `() => {}\n*\n x`,
    `() => {}.\n** x`,
    `() => {}.\n** x`,
    `() => {}.\n** x`,
    `() =>\n** x`,
    `()\n =>\n**\n x`,
    `() =>\n** x`,
    `( =>`,
    '{while{}',
    '{while }',
    'switch a case b;',
    'switch case default foo',
    'switch() { case foo: default: bar}',
    'switch(x { case foo: default: bar}',
    'switch(x) { case foo default: bar}',
    'switch() { case }',
    'switch() { case foo: default: bar',
    'switch()  case foo: default: bar',
    'switch() { case foo: default: bar}',
    'switch() { case foo: default',
    'switch',
    'switch()',
    'switch)',
    'switch){break;}',
    'switch){break;}',
    'switch break;}',
    'switch)}',
    'switch({',
    'switch }',
    'switch){}',
    'switch{}',
    'switch ()',
    'switch a case b;',
    'switch case default foo',
    'switch() { case foo: default: bar}',
    'switch(x { case foo: default: bar}',
    'switch(x) { case foo default: bar}',
    'switch() { case }',
    'switch() { case foo: default: bar',
    'switch()  case foo: default: bar',
    'switch() { case foo: default: bar}',
    'switch() { case foo: default',
    'switch',
    'return function from ',
    'do x while loop',
    'do(',
    'do(while',
    'do crazy stuffs while( {}',
    '{[ do crazy}',
    'class function return x;',
    ';;;',
    'let -xx;',
    'const { = y;',
    'switch ( {][[$€£ @ €',
    'switch a case b;',
    'switch case ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;default foo',
    'switch() { ca${$[{€se foo: default: bar}',
    'switch(x Å{[]} { case foo: default: bar}',
    'switch(x) { case foo default: bar}',
    'switch() { case }',
    'switch(/&() [] { case foo: default: bar',
    'switch(  case foo: (/ ]][] default: ',
    'switch() { case foo: default: bar}',
    'switch() { case foo: default',
    'switch',
    'switch()',
    'switch)',
    'switch ((/&))',
    'switch ([)',
    'switch ({(/&))',
    'switch (!(/&))',
    'switch [){break;}',
    'switch){break;}',
    'switch break;}',
    'switch)}',
    'a:',
    'a:=',
    'a = class {',
    'try ()',
    'try catch()',
    'try() catch()',
    'try() catch()[}',
    'try() catch()[[]}',
    'try() catch()[{]}',
    'try() catch(){}',
    'try catch finaly',
    'try {',
    'try {]',
    'try {}',
    'try {!',
    'try {!s',
    'try {} catch(){}',
    'try {} catch(){',
    'try {! catch(',
    'try {!s ------------',
    'try {} {{}}',
    'try {!',
    'try {!s48757249()!! catch() {}',
    'try { throw [',
    'try { throw [,',
    'try { throw [,]',
    'try { throw [,]; ',
    'try { throw [,]; } ',
    'try { throw [,]; } catch ',
    'try { throw [,]; } catch (',
    'try { throw [,]; } catch ([x',
    'try { throw [,]; } catch ([x = ',
    'try { throw [,]; } catch ([x = 23',
    'try { throw [,]; } catch ([x = 23]',
    'try { throw [,]; } catch ([x = 23]) }',
    'try { throw [,]; } catch ([x = 23]) {}',
    'try { catch ([x = 23]) {}',
    'let {',
    'class a@£$',
    'class {£',
    'class £{',
    'class { }',
    'class  } }',
    'class (x) {',
    'class (x {',
    'class ( {',
    'class }',
    'class x(',
    'class',
    'class {',
    'class {} }',
    'class x } }',
    'class x {',
    'class }',
    'class x(',
    'class x()',
    'class x() [',
    'class { x() {}}',
    'class { x() }}',
    'class { x() }}',
    'class { x() {',
    'class { x(x) {}}',
    'class { x(x y) {}}',
    'class { x( {}',
    'class x(/678 {}}',
    'class x() [{[}]',
    'yield3 3',
    'function *a( { foo}',
    '(let }',
    ')',
    '(',
    '(a =let {',
    '(a =',
    '(...)',
    '(...',
    '...)',
    '../s.)',
    '{ let',
    ' }[]{',
    '[a',
    '}[',
    '[]{',
    '[{[{',
    'await',
    '+---6',
    'a = 67',
    'a /= //////67',
    'a /= /',
    'a /= //////67',
    '1 = 2 / 3',
    '1 *',
    '2 /=',
    'a ? b',
    'a ? b :',
    'let }',
    '79[s'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }
});
