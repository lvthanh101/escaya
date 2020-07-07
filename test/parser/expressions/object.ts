import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Object', () => {
  // Invalid cases
  for (const arg of [
    '([a.b]) => 0',
    '(["a"]) = []',
    '({"a"}) = 0;',
    '([a]) = 0',
    '({a}) = {}',
    '[...rest,] = {};',
    '(true ? { x = true } : { x = false })',
    '({x+=y})',
    '({*1(){}} = x);',
    '({*foo(){}} = x);',
    '({*"expr"(){}} = x);',
    'var {x:y+1} = {};',
    '({set 8(y){})',
    '({get 8(){})',
    '({,} = {});',
    'var {x:y--} = {};',
    'function foo() { return {}; }; var {x:foo().x} = {};',
    'class foo { method() { ({x:super()} = {}); } }',
    '({a: ({d = 1,c = 1}.c) = 2} = {});',
    '({a: {d = 1,c = 1}.c = 2} = {});',
    '({...a, ...b, ...c} = {...a, ...b, ...c})',
    '({x = 42, y = 15})',
    '({x: { y = 10 } })',
    '({ a, b }) = {a: 1, b: 2}',
    '({*a([a.b]){}})',
    '({*: x(){}})',
    'async x*(){}',
    '({...{a,b}} = foo)',
    '({...[a,b]} = foo)',
    '({...[a, b]} = x)',
    '({...{a, b}} = x)',
    '( {...{}} = {} )',
    '({...{}} = {})',
    'async get *x(){}',
    '({set a({e: a.b}){}})',
    '({...x = 1} = {})',
    '({a:a,b,(c), a: {b} });',
    '({ 1:a,b = {c} = d });',
    'x = { set f(...y) {} }',
    '({get x() {}}) => {}',
    'let {...x, ...y} = {}',
    '({...x,}) => z"',
    '({...rest, b} = {})',
    '(([a, ...b = 0]) => {})',
    '(({a, ...b = 0}) => {})',
    '0, {...rest, b} = {}',
    '({...obj1,...obj2} = foo)',
    '({...(a,b)} = foo)',
    '({...{a,b}} = foo)',
    '({"foo": this} = x)',
    //'({await} = x);',
    '({enum} = x);',
    '({case});',
    '({static [expr',
    '({static [expr',
    'x({get "abc": x});',
    'x({get 123: x});',
    '({ [x] });',
    '({ *[x] });',
    '({catch(){}}) => x;',
    '({const}) => x;',
    '({do}) => x;',
    '({790: false} = x)',
    '({   async *[woops',
    '({static [expr"',
    '({[foo]() {}} = y)',
    '+{f(){}==',
    '+{...x)',
    'x/{c:/ /=>',
    '({3200: fail() = x}) => x',
    // '({static}) => x;',
    /*`async function f(){
      (fail = class A {
        [await foo](){};
        "x"(){}
      }) => {}
    }`,*/
    '({static * await(){}});',
    '({static async * catch(){}});',
    '({static async * async(){}});',
    '({static async async(){}});',
    '({static set async(x){}});',
    '({"foo": (x) = (1) = "bar"})',
    '{x: foo + y, bar} = doo',
    '({..."foo"=x}) => x',
    //'s = {foo: yield /x/}',
    '({break}) => null',
    '({[a] = b});',
    '({true = x} = y)',
    '({debugger}) => x;',
    '({default} = x);',
    '{*15(){}} = x',
    '{*[expr](){}} = x',
    'x = {5};',
    '({x=y})',
    '{x: [..] = y}',
    '({false} = x);',
    '({for} = x);',
    '({null} = x);',
    '({790: null}) => x',
    '({790: null} = x)',
    '({**=f(){}})',
    '({async **=f(){}})',
    '({3200: fail() = x}) => x',
    '({3200: fail() = x} = x)',
    '({a: b()} = x) => y',
    '+{f(){}==',
    '+{...x)',
    '{x: foo + y, bar} = doo',
    '{x} *= y',
    'x={...x=y}=z',
    '({...a+b}) => x',
    '({...a=b}) => x',
    '({...{a, b}}) => x',
    '({...a, ...b} = x)',
    '({...[a, b]} = x)',
    '({foo = 10})',
    '({eval = x});',
    '({a = 0});',
    '({a} += 0);',
    '({a = b})',
    '({1: ({}) += (1)});',
    '({1: ({}) = (1)});',
    '({ a = 0 });',
    '({*[expr](){}}) = x',
    '({...{b = 0}.x} = {});',
    '({a: {b = 0}.x} = {});',
    '({a: {a=b}.x}) => x',
    '({a: 0} = 0);',
    '({a=b}.x) => x',
    '({a,,a} = 0)',
    '({a:function} = 0)',
    '({ x: { get x() {} } } = { x: {} });',
    'fn = ({text = default, ...props}) => text + props.children',
    '({var} = 0)',
    '({a=b}[x]) => x',
    '({a=b}(x)) => x',
    '({}) = 1',
    '({...})',
    '({get a(){}} = 0)',
    '({[a] = b});',
    '({a:  2 /= 3 })',
    '({1:  2 /= 3 })',
    '({[a]:  2 /= 3 })',
    'o = {key: typeof = a}',
    'x = {key: typeof = a}',
    'x = {key: bar.foo + x = y}',
    '({x=1} = {y=1});',
    '({x: y={z=1}}={})',
    '({a:{x = y}.z} = x);',
    '({x=1}),',
    '({[]*+})',
    '{...{...{x, y}}} = {}',
    '{...{x, y}} = {}',
    '({y={x={}={}={}={}={}={}={}={}}={}}),',
    '({a=1, b=2, c=3, x=({}={})}),',
    '({ a = 42, b: c = d, })',
    '({x=y, [-9]:0})',
    '((({w = x} >(-9)',
    '({x: catch}) => null',
    '({x: continue}) => null',
    '({x: false}) => null',
    '({x: catch}) => null',
    '({x: switch}) => null',
    'x = {key: bar.foo + x = y}',
    '({a: (b) = 0} = 1) => x',
    '({a: (b.x) = 0} = 1) => x',
    '({x=1, y={z={1}}})',
    '({a:{x = y}.z} = x);',
    '({x=y, [-9]:0})',
    '++({x=1})',
    '[{x=1, y = ({z=2} = {})}];',
    'while ({x={y=2}}={}) {1};',
    'with ({x=1}) {};',
    '({x=1} = {y=1});',
    '({x: y={z=1}}={})',
    '(({ x = 10 } = { x = 20 }) => x)({})',
    '[{ x = 10 }]',
    'x > (0, {a = b} );',
    '[{a=0},...0]',
    '(a = b) = {};',
    '({,a,} = 0)',
    '({ set: s(a, b) { } })',
    '({ set s() { } })',
    '({this} = x)',
    '({[foo]: bar()} = baz)',
    '({[foo]: a + b} = baz)',
    '({[foo]: bar()}) => baz',
    '({[foo]: a + b}) => baz',
    '({ident: [foo, bar] += x})',
    '({x: const}) => null',
    '({[a,b]:0})',
    '({a:(b = 0)} = 1)',
    'x={...new} => x',
    // 'x={...true} => x',
    '({static [expr',
    '({set * bar(x){})',
    '({get foo(x){}});',
    '({foo += bar})',
    'x={...new}',
    '({...obj1,} = foo)',
    '({...{a,b}} = foo)',
    '({...[a,b]} = foo)',
    '({a}) = 0',
    '({ obj:20 }) = 42',
    '({a: [a + 1] = []});',
    '[((a)] = [];',
    '({set a([a.b]){}})',
    '({ x: [(x, y)] } = { x: [] });',
    '({ new: super() } = {})',
    '({ new: x } = { new: super() } = {})',
    '({a({e: a.b}){}})',
    '({a: b => []} = [2])',
    '({a = {}})',
    '({a = []})',
    '({a: ({1})})',
    '({a: ({x = (y)})})',
    '({a: 0, b = 0});',
    // '({a: b += 0} = {})',
    '({ 42 }) = obj',
    '({(a)} = 0)',
    '({e: a.b}) => 0',
    '({get ',
    '({a({e: a.b}){}})',
    '({foo() {}} = {});',
    '({...{a,b}}) => {}',
    '({...{a,b}}) => {}',
    '({...(a,b)} = foo)',
    '({...(obj)}) => {}',
    '({...(a,b)}) => {}',
    // '!{f([b, a], {b}) {}}',
    '({...[a,b]}) => {}',
    // '({ a (,) {} })',
    // '({ a (b,,) {} })',
    '({a:(b = 0)} = 1)',
    '({ x }) = { x: 5 };',
    '({a}) = 1;',
    '({start, stop}) = othernode;',
    '({a, b}) = {a: 1, b:2};',
    '({b}) = b;',
    '({a}) = 2;',
    '({ src: ([dest]) } = obj)',
    '({[1,2]:3})',
    '({foo(...a,) {}})',
    '({ a:{} }) = 3;',
    '({a: b = 0, c = 0});',
    '({ set prop() {} })',
    '({a:this}=0)',
    '({ *a })',
    '({ *a: 0 })',
    '({ *[0]: 0 })',
    '({ a (b, ...c,) {} })',
    '({x = ({y=1}) => y})',
    '(({x=1})) => x',
    '({async get : 0})',
    '({get foo( +})',
    '({static x: 0})',
    '({*x: 0})',
    '({static x(){}})',
    '({e=[]}==(;',
    '({x=1}[-1]);',
    '++({x=1})',
    '((({w = x} >(-9)',
    '({ set x(...a){} })',
    '({ get x(...a){} })',
    '({x=1}.abc)',
    'const z = {x={y=1}}={};',
    'const {x={y=33}}={};',
    '({ [...a] = [] })',
    '({ [...a] = [] })',
    '({...{x} }= {});',
    '(({x:y}) += x)',
    '({foo: {x:y} += x})',
    '[(a = 0)] = 1',
    '(...a)',
    'a = {"a"} = b',
    '({x:y} += x)',
    '({x}) = foo',
    '({12n:  a + b = c / (d)})',
    '({12n:  [a].b.(c)})',
    '({12n:  a + b = c })',
    '({12n = a })',
    '({12n = 1 })',
    '({1} ? a : b)',
    '({1} ? a : b)',
    '{ x : y * 2 } = {}',
    '{ get x() {} } = {}',
    '{ set x() {} } = {}',
    '{ x: y() } = {}',
    '{ this } = {}',
    '{ x: this } = {}',
    '{ x: this = 1 } = {}',
    '{ super } = {}',
    '{ x: super } = {}',
    '{ x: super = 1 } = {}',
    '{ new.target } = {}',
    '{ x: new.target } = {}',
    '{ x: new.target = 1 } = {}',
    '{ import.meta } = {}',
    '{ x: import.meta } = {}',
    '{ x: import.meta = 1 } = {}',
    '{ x: 50 } = {}',
    '{ x: (50) } = {}',
    '{ x: ([y]) } = {}',
    '{ x: ([y] = []) } = {}',
    '{ x: ({y}) } = {}',
    '{ x: ({y} = {}) } = {}',
    '{ x: (++y) } = {}',
    '[ (...[a]) ] = {}',
    '[ ...([a]) ] = {}',
    '[ ...([a] = []) = {}',
    '[ ...[ ( [ a ] ) ] ] = {}',
    '[ ([a]) ] = {}',
    '[ (...[a]) ] = {}',
    '[ ([a] = []) ] = {}',
    '[ (++y) ] = {}',
    '[ ...(++y) ] = {}',
    'a = { x: [(x, y)] } = { x: [] };',
    'a = { x: [(x, y)] } = {};',
    'a = { x: [(x, y)] } = { 1: [] = [(a = b)] };',
    'a = { x: [(x, y)] } = undefined',
    'a = { x: [(x, y)] } = null',
    'a = { x: [(x, y)] } = 51',
    'a = { x: [(x, y)] } = false',
    'a = { x: [(x, y)] } = b',
    'a = { x: [(x, y)] } = { x: null }',
    'x = { [a]: {} /= a }',
    'x = { a: {} /= a }',
    'x = { a: {} ++a }',
    '({get +:3})',
    '({ , })',
    '({async set foo(value) { }})',
    's = {"foo": yield a = x} = x',
    's = {"foo": yield /fail/g = x} = x',
    'async function g() {   s = {"foo": await a = x} = x   }',
    'async function g() {   s = {"foo": await /brains/ = x} = x   }',
    '({"x": y+z} = x)',
    '({"x": 600..xyz}) => x',
    '({"x": 600}) => x',
    '({...a+b} = x)',
    '({...a=b} = x)',
    '({3200: x() = x}) => x',
    '({foo: x() = x} = x)',
    '({"foo": x() = a} = b) => c',
    '({a({e: a.b}){}})',
    '({...(x) }) => {}',
    '({1}) = {}',
    '({"x": y+z}) => x',
    '({"x": [y + x]}) => x',
    '({async async});',
    '({x: {..} = y})',
    '({x: [..]})',
    '({x: {..}})',
    '({ async get : 0 }',
    '({get +:3})',
    '({get bar(x) {})',
    '({  async get x(){} })',
    '({ async get *x(){} })',
    '({ get *x(){} })',
    's = {"foo": yield /fail/g = x} = x',
    'x = { async f: function() {} }',
    '({...(obj)}) => {}',
    '({[fgrumpy] 1(){}})',
    '({"x": y+z} = x)',
    '({[foo]-(a) {}})',
    '({a([a.b]){}})',
    '({async 8(){});',
    '({get 8(){});',
    '({set 8(){});',
    '({get [x](y){});',
    '({get "x"(){})',
    '({"foo": x() = x}) => x',
    '({"foo": x() = 1}) => x',
    '({"foo": x() = x} = x)',
    '({"x": {a: y + x}}) => x',
    '({"x": {a: y + x}.slice(0)} = x)',
    '({"x": {a: y + x}.slice(0)}) => x',
    '({"x": [y + x]} = x)',
    '({"x": [y + x]}) => x',
    '({3200: x() = a} = b) => c',
    'x={..."foo".foo=x} = x',
    'x={..."foo"=x} = x',
    '({0} = 0)',
    '({1}) = {}',
    '({"a"}) = 0;',
    '(["x"]) = 0',
    '({+2 : x}) = {};',
    '({[x] = 42, y = 15})',
    '({get *"x"(){}})',
    '({set *5(ident){}})',
    '({get *5(){}})',
    '({set 8(y){})',
    '({,} = {});',
    '({1(){}} = x);',
    '({"expr"(){}} = x);',
    '({"foo": {1 = 2}});',
    '({"foo": {x} = [1] = "bar"});',
    '({"foo": [x] = [1] = "bar"});',
    '({"foo": (x) = [1] = "bar"});',
    '({"foo": 1 = 2});',
    '({"foo": [1 = 2]});',
    '({"foo": [1 = 2] = foo});',
    '({"foo": [1 = 2]} = foo);',
    '{...rest, b} = {}',
    '({async set foo(){}});',
    '({x:y;a:b})',
    '({x:y;})',
    '({;x:y,a:b})',
    '({;}',
    '({a: b => []} = [2])',
    '({b => []} = [2])',
    '({a: b + c} = [2])',
    '({[a]: b => []} = [2])',
    '({a: [foo]-(a) {}})',
    '({*ident: x})',
    '({get bar(x) {})',
    '({get 1n(){}})=0',
    '({get "a"(){}})=0',
    '({* async x(){}})',
    '({* get x(){}})',
    '({* set x(){}})',
    '({*async x(){}})',
    '({ a: () {}a })',
    '({ x*(){} })',
    '({*get x(){}})',
    '({{eval}) => x);',
    '({0} = 0)',
    '({a.b} = 0)',
    '({a,,} = 0)',
    '({function} = 0)',
    '({ *[yield iter]() {} })',
    '({ 5 }) => {}',
    '({get a(){}})=0',
    '({a} += 0);',
    '({a({e: a.b}){}})',
    'x = (argument1, {...[ y = 5 ] }) => {};',
    '({a}) = 0',
    '(x=1)=y',
    '([a]) = []',
    '({a}) = {}',
    '({a}) = 0;',
    '([x]) = 0',
    '([a.b]) => 0',
    '(["a"]) = []',
    '({"a"}) = 0;',
    '([a]) = 0',
    '({a}) = {}',
    '[...rest,] = {};',
    '(true ? { x = true } : { x = false })',
    '({x+=y})',
    '({*1(){}} = x);',
    '({*foo(){}} = x);',
    '({*"expr"(){}} = x);',
    'var {x:y+1} = {};',
    '({set 8(y){})',
    '({get 8(){})',
    '({a: ({d = 1,c = 1}.c) = 2} = {});',
    '({a: {d = 1,c = 1}.c = 2} = {});',
    '({...a, ...b, ...c} = {...a, ...b, ...c})',
    '({x = 42, y = 15})',
    '({x: { y = 10 } })',
    '({ a, b }) = {a: 1, b: 2}',
    '({*a([a.b]){}})',
    '({ident: [foo, bar].join("") = x} = x)',
    '({Object = 0, String = 0}) = {};',
    '({b}) = b;',
    '([b]) = b;',
    '({ obj:20 }) = 42',
    '(1 + 1) = 10',
    '[...a, ] = b',
    '({ x } = {x: ...[1,2,3]})',
    '({...x = 1} = {})',
    '({a:a,b,(c), a: {b} });',
    '({ 1:a,b = {c} = d });',
    'x = { set f(...y) {} }',
    '({get x() {}}) => {}',
    '({...x,}) => z"',
    '({...rest, b} = {})',
    '(([a, ...b = 0]) => {})',
    '(({a, ...b = 0}) => {})',
    '({...obj1,...obj2} = foo)',
    '({...(a,b)} = foo)',
    '({...{a,b}} = foo)',
    '({ [x] });',
    '({ *[x] });',
    '({ "string" });',
    '({ *"string" });',
    '({a ...b})',
    '({...obj1,} = foo)',
    '({...a,} = {});',
    '({...a,} = {});',
    '({foo += bar})',
    '({"x" = 42, y = 15})',
    '({[x] = 42, y = 15})',
    '(1 + 1) = 10',
    '"foo": (x) = (1) = "bar"',
    '({...obj1,a} = foo)',
    '({ , })',
    '({ * *x(){} })',
    '({ a: () {}a })',
    '({ a: ()a })',
    '[a, ...]',
    '[..., ]',
    '[..., ...]',
    '[ (...a)]',
    '[...let',
    '({[a = b]*+})',
    '({e=[]}==(;',
    '({x=y}[-9])',
    //'new {x=1}={}',
    'new {x=1}',
    'typeof {x=1}',
    'typeof ({x=1})',
    '({x=y, [-9]:0})',
    '((({w = x} >(-9)',
    'delete ({x=1})',
    '++({x=1})',
    '({ *set x(y){} })',
    //'!{x=1}={}',
    '({get +:3})',
    '({ , })',
    '({a: b + c} = [2])',
    '({a ...b})',
    '({...a,} = {});',
    '({*+})',
    '({[b], x})',
    '({a:{x = y}.z} = x);',
    '({[b]}})',
    '[...{a = b} = c] = x',
    's = {s: true = x}',
    'x({a=b});',
    '{x: {..} = y}',
    '{a,,b}',
    '({typeof x} = x)',
    '({[x].length} = x)',
    '({function(){}} = x)',
    '({delete x.y} = x)',
    '({async ()=>x} = x)',
    '({class{}} = x)',
    '({...} / foo)',
    '({foo += bar})'
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
    '({}=x);',
    '({a:v=b}=c);',
    '({...{}})',
    '({...a, obj: x})',
    '({obj: x, ...a})',
    '({obj, ...a})',
    '({catch: x});',
    '({...obj,})',
    '({...obj,})',
    's = {foo: yield}',
    //'s = {foo: yield /x/}',
    's = {foo: yield / x}',
    's = {foo: yield /x/g}',
    'wrap({get 123(){}});',
    '({get await(){}});',
    '({await: x}) => x;',
    '({async: x}) => x;',
    '({async(){}});',
    'x({get "foo"(){}});',
    'x({async} = x);',
    'x({get} = x);',
    '({x} = foo )',
    'x = {get} = x',
    'x = {a:b, c:d}',
    'x = {a, c:d}',
    'x = {a, c:d} = x',
    'x = {a:b, c} = x',
    '({ [a]: {} [a] })',
    'x = {15:b}',
    'x = {.9:a, 0x84:b, 0b1:c, 0o27:d, 1e234:e}',
    'x = {1:b, 0:d}',
    'x = {"a":b}',
    'x = {"a":b, "c":d}',
    'x = {[a]:b}',
    'x = {[a]:b, [15]:d}',
    'x = { *a() {} }',
    'x = {0(){}}',
    'x = {.9(){}, 0x84(){}, 0b1(){}, 0o27(){}, 1e234(){}}',
    'x = {"foo"(){}}',
    'x = {async foo(){}}',
    'x = {async async(){}}',
    'x = {async "foo"(){}}',
    'x = {async 100(){}}',
    'x = {async [foo](){}}',
    'x = {async foo(){}, async bar(){}}',
    'x = {async foo(){}, bar(){}}',
    'x = {foo(){}, async bar(){}}',
    'x = {*foo(){}}',
    'x = {*get(){}}',
    'x = {*set(){}}',
    'x = {*async(){}}',
    'x = {*"foo"(){}}',
    'x = {*123(){}}',
    'x = {*[foo](){}}',
    'x = {* foo(){},*bar(){}}',
    'x = {* foo(){}, bar(){}}',
    'x = {foo(){}, *bar(){}}',
    'x = {get foo(){}}',
    'x = {get get(){}}',
    'x = {get foo(){}, get bar(){}}',
    'x = {get foo(){}, bar(){}}',
    'x = {foo(){}, get bar(){}}',
    'x = {get [foo](){}}',
    'x = {get [foo](){}, get [bar](){}}',
    'x = {get [foo](){}, [bar](){}}',
    'x = {[foo](){}, get [bar](){}}',
    'x = {get 123(){}}',
    'x = {set foo(a){}}',
    'x = {set get(a){}}',
    'x = {foo: typeof x}',
    'x = {foo: true / false}',
    'x = {await}  = x',
    'x = {eval}',
    'x = {"x": [y]}',
    'x = {"x": [y]} = x',
    'x = {"x": [y + x]}',
    'x = {"x": [y].slice(0)}',
    'x = {"x": {y: z}}',
    'x = {"x": {y: z}} = x',
    'x = {"x": {a: y + x}}',
    'x = {"x": {a: y + x}.slice(0)}',
    'x = {"x": 600}',
    'x = {"x": 600..xyz}',
    'x = {...y}',
    'x = {x, ...y}',
    'x = {...a=b}',
    'x = {a, ...y, b}',
    'x = {...y, b}',
    'x = {get "foo"(){}}',
    'a = { x: y = function x() {}, x: fn = function() {} } = b',
    'a = { w, a: x } = b',
    'a = {...src.y.x} = b',
    'a = { y: x = 1 } = b',
    'a = { y = function x() {}, fn = function() {} } = b',
    'a = { w, x, y } = b',
    'a = { w, x, y = a ? x : b } = b',
    'a = { w, x, y = c } = b',
    'a = { w, x = b, y } = b',
    'a = { x: x[yield] } = b',
    'a = { x: [ x ] } = b',
    'a = { x: [x = yield] } = b',
    'a = { x: { x = yield } } = b',
    'a = { x: { y } } = b',
    'a = {...rest} = b',
    'a = {...src.y} = b',
    'a = {...src.y.x} = b',
    'x = { [a]: { "a": { "a": [] ? a : b } } }',
    'x = { [a]: {x} = y }',
    'x = { [a]: {x} = y.z }',
    'x = { [a]: [x] = y.z }',
    'x = { "a": [([] ? a : b.c[d])] / 2 }',
    'x = { "a": { "a": { "a": [] ? a : b } } }',
    'x = { "a": {x} = y }',
    'x = { "a": {x} = y.z }',
    'x = { "a": [x] = y.z }',
    '(x = { a: {x} = y }) / y.z',
    '(x = { a: x = y }) / y.z',
    '(x = { a: (x) = y }) / y.z',
    '(x = { a: x = (y) }) / y.z',
    '(x = { a: (x = (y)) }) / y.z',
    '(x = { "a": {x} = y }) / y.z',
    '(x = { "a": x = y }) / y.z',
    '(x = { "a": (x) = y }) / y.z',
    '(x = { "a": x = (y) }) / y.z',
    '(x = { "a": (x = (y)) }) / y.z',
    '(x = { [a]: {x} = y }) / y.z',
    '(x = { [a]: x = y }) / y.z',
    '(x = { [a]: (x) = y }) / y.z',
    '(x = { [a]: x = (y) }) / y.z',
    '(x = { [a]: (x = (y)) }) / y.z',
    'x = { "a": ([] ? a : b.c[d]) }',
    'x = {"d": {}[d] += a}',
    'x = {d: {}[d] += a}',
    'x = x = {[d]: {}[d] += a}',
    'x = { "a": [] ? a : b.c[d] }',
    'x = { "a": [] ? a : b / 2 - 2}',
    'x = { "a": [] ? a : b }',
    'x = {d: {}[d] += a}',
    'x = {"string": {}[d] += a}',
    'x = {["d"]: {}[d] += a}',
    '({ key: bar + x })',
    '({ key: bar/x })',
    '({ key: bar, foo: zoo })',
    '({ } = { })',
    '({  ...undefined })',
    '({  ...1 in {} })',
    '({ set foo(b){}, set bar(d){} })',
    '({ set foo(c){}, bar(){} })',
    '({ foo: typeof x })',
    '({ foo: true / false })',
    '({ ...y  })',
    '({ a: 1, ...y  })',
    '({  b: 1, ...y  })',
    '({ a: 1, ...y, b: 1 })',
    '({ ...1 })',
    '({ set foo(v) {} })',
    '({ 1: 1, 2: 2 })',
    '({ async 100(){} })',
    '({ method({ arrow = () => {} }) {} })',
    '({ method({ x: y, }) {} })',
    '({ async *method([x] = g[Symbol.iterator] = function() {}) {} })',
    '({ async *method([...x] = {}) {} })',
    '({ async *method([...async] = {}) {} })',
    '({ async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {} })',
    '({ async *method({ x: y = thrower() } = {}) {} })',
    '({ async *method([x = 23]) {} })',
    '({ async *method([_, x]) {} })',
    '({ [++counter]: ++counter, [++counter]: ++counter, [++counter]: ++counter, [++counter]: ++counter })',
    '({ async *method(a, b,) {} })',
    '({ eval: 7 })',
    '({ if: 4 })',
    '({ foo: bar = 5 + baz })',
    '({ get foo() {} })',
    '({ a,1:b })',
    '({ 1:a,b })',
    '({ foo: 1, get foo() {} })',
    '({ 1: 1, get 1() {} })',
    '({ method(a, b,) {} })',
    '({ method(x = y, y) {} })',
    '({ async method(x, y = x, z = y) {} })',
    '({ *id() {} })',
    '({ *[anonSym]() {} })',
    '({ *method(a,) {} })',
    '({ async static(){} })',
    '({ method(a,) {} })',
    '({ foo: 1, foo: 2 })',
    '({ async *method(x, y = x, z = y) {} })',
    '({ async *method([[...x] = function() {}()] = [[2, 1, 3]]) {} })',
    '({ async *method([[x, y, z] = [4, 5, 6]] = [[7, 8, 9]]) {} })',
    '({ async *method([...x]) {} })',
    '({ async *method([x]) {} })',
    '({ async *method([[,] = g()]) {} })',
    '({ *method([[x, async, z] = [4, 5, 6]]) {} })',
    '({eval});',
    '({async x() {}});',
    '({async *x() {}});',
    '({async get() {}});',
    '({get x() {}});',
    '({set x(y) {}});',
    '({get() {}});',
    '({set() {}});',
    '({async() {}});',
    '({await() {}});',
    '({async = async} = x);',
    '({async});',
    '({x});',
    '([a,,...rest] = {})',
    '({} = 0);',
    '({y}) => x;',
    '({ a: 1 }).a === 1',
    '({ responseText: text } = res)',
    '(({a = {b} = {b: 42}}) => a.b)({})',
    '({ x : [ y = 10 ] = {} })',
    '({ x : [ foo().y = 10 ] = {} })',
    '({ x : [ foo()[y] = 10 ] = {} })',
    '({ x : [ y.z = 10 ] = {} })',
    '({ x : [ y[z] = 10 ] = {} })',
    '({ x : x, y : y })',
    '({ x : y, ...z })',
    '({ x : y = 1, ...z })',
    '({...x})',
    '({x, ...y})',
    '({x = 1} = {});',
    '({x, y = 1, z = 2} = {});',
    'x = {__proto__(){}, __proto__: 2}',
    'x = {__proto__(){}, __proto__(){}}',
    'x = {async __proto__(){}, *__proto__(){}}',
    '({x} = 0)',
    '({x,} = 0)',
    '({x,y,} = 0)',
    '({x,y} = 0)',
    '({x = 0} = 1)',
    '({x = 0,} = 1)',
    '({x: y = z = 0} = 1)',
    '({x: [y] = 0} = 1)',
    '({a:let} = 0);',
    '({let} = 0);',
    '({a:yield} = 0);',
    '({yield} = 0);',
    '({yield = 0} = 0);',
    '(a) = {}',
    '({x: ((y, z) => z).x})',
    '({ ...d.x })',
    '({ x: (foo.bar) })',
    '({foo: y, a:{bar: x}}) => x;',
    '({y, a:{x}}) => x;',
    '({b, c, d, ...{a} })',
    '({a, ...b} = {})',
    '[a,b=0,[c,...a[0]]={}]=0;',
    '(a.b = {});',
    '({ x: [ x ] } = { x: null });',
    '[{a=0},{a=0}] = 0',
    '({a: (b) = c} = [2])',
    '({...x = y, y})',
    '({ident: [foo].length} = x)',
    '({ident: [foo].length = x} = x)',
    '({a:b,...obj}) => {}',
    '({x, ...y} = {x, ...y})',
    '([ { x : foo().y } ])',
    '([ { x : foo()[y] } ])',
    '([ { x : x.y } ])',
    '[ { x : foo().y = 10 } = {} ]',
    '[ { x : y = 10 } = {} ]',
    '[{ x, y, z } = { x: 44, y: 55, z: 66 }]',
    '({ x: (y) = [] })',
    '[ { x : foo()[y] = 10 } = {} ]',
    '[ { x : x.y = 10 } = {} ]',
    '({*id() {}})',
    '({*await() {}})',
    '({ async get(){} })',
    '({ method(x = y, y) {} })',
    '({ async *method(...a) {} })',
    '({ if: 4 })',
    '({ eval: 7 })',
    '({async foo() {}})',
    '({ async static(){} })',
    '({ async : 0 })',
    '[{eval}.x] = [];',
    '([ { x : y } ])',
    '({ __proto__: 2 })',
    '({ x, y, z () {} })',
    '({ a: 1, ...y, b: 1 })',
    '({ key: bar.foo + x })',
    '({ key: bar.foo = x })',
    '({ async: async.await + x })',
    '({ async: async??await + x })',
    '({ async: async?.await + x })',
    '({async x() {}, async *x() {}, get x() {}, set x(y) {}, set() {}, get() {}});',
    '({typeof: x} = y);',
    'x({async get(){}});',
    '({async, foo})',
    'x({a:b, c:d}=obj);',
    'x({a, b}=obj);',
    'o = {key: bar.foo + x}',
    'x({[a]:b}=obj);',
    'x({[a]:b, [15]:d}=obj);',
    '({ [key++]: y, ...x } = { 1: 1, a: 1 })',
    '({ [++key]: y, [++key]: z, ...rest} = {2: 2, 3: 3})',
    '({ [left()]: y, ...x} = right())',
    '({ [(() => 1)()]: a, ...rest } = { 1: a })',
    '({ [1]: bar, ...rest } = foo)',
    '({topLeft: {x: x1, y: y1}, bottomRight: {x: x2, y: y2}} = rect)',
    '({ 3: foo, 5: bar } = [0, 1, 2, 3, 4, 5, 6])',
    '({ [fn()]: x, ...y } = z)',
    '({ident})',
    '({key: a.b} = c)',
    '({123: expr})',
    '({123: a.b} = c)',
    '({[key]: expr})',
    '({[key]: a.b} = c)',
    '({...key = x})',
    '({...key.prop} = x)',
    'x = {ident,}',
    '({ ident: x })',
    '(x = {eval})',
    '({ a, b: x })',
    '({ident = x} = y)',
    '({a: {b: c} = 0})',
    '({a: {a: b.x} = 0})',
    '({a: {b} = 0})',
    '({a: {b}})',
    '({a: {b}, c})',
    '({a: [b.x] = 0})',
    '({a: [b] = 0})',
    '({a: (b.x) = 0} = 1)',
    '({a: (b) = 0} = 1)',
    '({ ...async () => { }})',
    'x = {get:b}',
    'x = {async:b}',
    'x = {a, b}',
    'x = {a, b} = x',
    '({x: async (y,w) => z})',
    '({ident: a[b]})',
    '({ident: a(b)})',
    '({ident: [],})',
    '({ident: ident = expr})',
    '({ident: (ident) = expr})',
    '({ident: a.b = expr})',
    '({ident: a[b] = expr})',
    '({ident: [] = expr,})',
    '({ident: {} = expr,})',
    'o = {key: bar + x}',
    'o = {key: bar = x}',
    'o = {key: bar.foo + x}',
    'o = {a: b} = d',
    'x = {x: a}',
    'o = {key: eval = a}',
    'o = {key: bar = a}',
    '({foo: true ** false});',
    '({eval} = x)',
    '({await})',
    '({ a, b: x })',
    '({eval} = x);',
    `x = { ...y }`,
    `x = { ...z = y}`,
    `x = { ...y, b: 1}`,
    `x = { a: 1, ...y, b: 1}`,
    '({eval});',
    '({eval = x} = y)',
    'x = {300: x}',
    '({[foo]: x} = y)',
    '({...x=y})',
    '({...x+y})',
    '({...x, ...y});',
    '({...x.y} = z)',
    '({...x, y});',
    '([{x = y}] = z)',
    '[{x = y}] = z',
    'x = {...y}',
    'x = {...a + b}',
    'x = {...[a, b]}',
    'x = {...{a, b}}',
    'x = {...a,}',
    'x = {...y, b}',
    'x = {a, ...y, b}',
    'z = {x, ...y}',
    '({obj: x, ...a})',
    '({...a, obj: x})',
    '({...{}})',
    '({...obj,})',
    '({...a})',
    '({...obj,})',
    '({a: {b} = c})',
    'x = {10: y}',
    '({...a} = x)',
    '({...[a, b]})',
    '[{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};',
    '({[foo()] : (z)} = z = {});',
    '({a: 1, a: 2})',
    '({b: x, a: 1, a: 2})',
    '({x=1} = {});',
    '({foo: typeof x});',
    '({foo: true / false});',
    'x({a}=obj);',
    'x({a:b}=obj);',
    'x({a, b}=obj);',
    'x({a:b, c:d}=obj);',
    'x({a, c:d}=obj);',
    'x({a:b, c}=obj);',
    'x({a=b}=c);',
    'x({a:v=b}=c);',
    '({"x": y+z})',
    '({"x": [y]})',
    '({"x": [y]} = x)',
    '({"x": [y]}) => x',
    '({"x": [y + x]})',
    '({"x": [y].slice(0)})',
    '({"x": {y: z}})',
    '({"x": {y: z}} = x)',
    '({"x": {a: y + x}})',
    '({"x": {a: y + x}.slice(0)})',
    '({"x": 600})',
    'x({[a]:b}=obj);',
    'x({[a]:b, [15]:d}=obj);',
    'x, {foo, bar} = doo',
    'x, {foo = y, bar} = doo',
    '({a, b} = c = d)',
    'a={"b":c=d}',
    's = {"foo": this}',
    '({x:let} = null)',
    '({x:let})',
    'x({"a":b}=obj);',
    '({x:let}) => null',
    'x({set "foo"(a){}});',
    'x({set 123(a){}});',
    '({ a = 42, [b]: c.d } = e);',
    '({790: null})',
    'x({foo(){}, *bar(){}});',
    'x({*set(){}});',
    '({   async *[ha+ha](){}   })',
    'x({async * foo(){}, bar(){}});',
    'x({get});',
    'x({a:b, c});',
    'x({a:b, c} = y);',
    'x({a});',
    'x({set:b});',
    'x({a, b});',
    'foo({c=3} = {})',
    '({[a]:b})',
    '({get get(){}});',
    '({set set(x){}});',
    '({get foo(){}});',
    'x = { y = function x() {}, fn = function() {} }= z',
    '([a,,...rest] = {})',
    'function a({x: y, z: { a: b } }) {};',
    '({var: x} = 0)',
    '({f: function({x} = {x: 10}) {}});',
    '({f({x} = {x: 10}) {}});',
    'function x(a, { b }){};',
    '(function x({ a, b }){});',
    '(let[a] = b);',
    '({...obj}) => {}',
    '({a,...obj} = foo)',
    '({...obj} = foo)',
    'x ={ x = 1 }= z',
    'x ={ x: [ x ] } = { x: undefined }= z',
    '[{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];',
    '({ z : { __proto__: x, __proto__: y } = z })',
    '({ async(x, y) {}});',
    '[{a: b} = [c]]',
    '({ x } = (y));',
    '({ typeof(x, y) {}});',
    '({ x() {}, x: 1});',
    '({ *x() {}, get x() {}});',
    '({ x() {}, y() {}, x() {} })',
    '({ x() {}, x: 1 })',
    '({ x: 1, x() {} })',
    '({ x: 1, *x() {} })',
    '({async})',
    '({async: await})',
    '({async: (await) ? yield : foo})',
    '({async: true})',
    '({async() { }})',
    '({async foo() { }})',
    '({foo() { }})',
    '({x, y, z () {}})',
    '({async delete() {}})',
    '({async [foo](){}})',
    '({async 100(){}})',
    '({throw(x, y) {}});',
    '({package(x, y) {}});',
    '({package(x, y) {}});',
    '({this(x, y) {}});',
    '({switch(x, y) {}});',
    '({}=x);',
    '({a:v=b}=c);',
    '({a=b}=c);',
    'x({[a]:b}=obj);',
    '({key: bar = x})',
    'x = {x: a}',
    '({[a]:b, [15]:d}=obj);',
    'x={async f(){}}',
    's = {s: true}',
    '({ a, b: x })',
    '({key: {}})',
    '({key: {a} = x})',
    '({a:b}=obj);',
    '({1:  {}.b ? c : d })',
    '({ a: {prop: 1}.prop } = {})',
    '({1:  + b })',
    '({[a]:  + b })',
    '({a:  + b })',
    '({...(obj)} = foo)',
    '({...(obj)} = foo),({...obj} = foo),({...obj.x} = foo),({...{}.x} = foo),({...[].x} = foo)',
    '({[a]:  {}.b ? c : d })',
    '({a:  {}.b = c ? d : e })',
    '({a:  {}.b ? c : d })',
    '({a: (a).b ? c : d })',
    'x({1:b, 2:d});',
    'x = ({[a]:b});',
    'x = ({[a]:b, [15]:d});',
    '({[a]:b}=obj);',
    'x = {__proto__: a, __proto__: b} = y',
    '({__proto__: a, __proto__: b} = x)',
    '({...a}) => x',
    '({y:y2} = {y:y2-2})',
    '({yield: 10 });',
    '({[foo]: x} = x) => y',
    '({[foo](){}, get [bar](){}});',
    '({ toast(a, b = 10, c) {}  });',
    '({ x([ a, b ]){} });',
    'x = { method() { }};;',
    'x = { [5 + 5]: foo }',
    '({get [x]() {}, set [x](v) {}});',
    '({a:  b.c })',
    '({a:  b.c  = d })',
    '({a:  b.c  = d  ? e : f })',
    'x({a:b=x}=y);',
    'x({a:b, c}=obj);',
    'x({a, c:d}=obj);',
    '({   async *x(){}   })',
    '({   async *1(){}   })',
    'x({async foo(){}, bar(){}});',
    'x({async foo(){}});',
    'x({async [foo](){}});',
    'x({async foo(){}, async bar(){}});',
    'x({set [foo](a){}});',
    'x = {a, b} = y',
    'x({get});',
    'x({a, c:d});',
    'x({set:b});',
    'x({a});',
    'x({a:b, c:d});',
    'x({set});',
    'for ({x=y} of a) b',
    'x({get "foo"(){}});',
    'x({get 123(){}});',
    '({set async(x){}});',
    '({ async async(){} });',
    '({ async case(){} });',
    '({ async false(){} });',
    '({get arguments(){}});',
    '({arguments: x} = y);',
    'x({"a":b, "c":d});',
    'x({1:b, 0:d});',
    'x({15:b});',
    'x({foo(){}, async bar(){}});',
    'x= { get prototype(){} }',
    'x= { set prototype(x){} }',
    'x= { async prototype(){} }',
    'x({async * foo(){}, bar(){}});',
    'x({*"foo"(){}});',
    'x({[a]:b, [15]:d});',
    '({...{}})',
    `x = {
      *""() {},
    }`
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