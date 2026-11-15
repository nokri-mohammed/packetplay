#!/usr/bin/env bun
// @bun
var Uc=Object.create;var{getPrototypeOf:Hc,defineProperty:wo,getOwnPropertyNames:Gc}=Object;var bo=Object.prototype.hasOwnProperty;function Jc(t){return this[t]}var Yc,Wc,Zc=(t,e,n)=>{var i=t!=null&&typeof t==="object";if(i){var o=e?Yc??=new WeakMap:Wc??=new WeakMap,r=o.get(t);if(r)return r}n=t!=null?Uc(Hc(t)):{};let s=e||!t||!t.__esModule||!bo.call(t,"default")?wo(n,"default",{value:t,enumerable:!0}):n;if(t&&typeof t==="object"||typeof t==="function"){for(let l of Gc(t))if(!bo.call(s,l))wo(s,l,{get:Jc.bind(t,l),enumerable:!0})}if(i)o.set(t,s);return s};var k=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var o1=import.meta.require;var B=k(function(r5){var Qn=Symbol.for("yaml.alias"),Fo=Symbol.for("yaml.document"),r1=Symbol.for("yaml.map"),Co=Symbol.for("yaml.pair"),Xn=Symbol.for("yaml.scalar"),s1=Symbol.for("yaml.seq"),Yt=Symbol.for("yaml.node.type"),Qc=(t)=>!!t&&typeof t==="object"&&t[Yt]===Qn,Xc=(t)=>!!t&&typeof t==="object"&&t[Yt]===Fo,t5=(t)=>!!t&&typeof t==="object"&&t[Yt]===r1,e5=(t)=>!!t&&typeof t==="object"&&t[Yt]===Co,_o=(t)=>!!t&&typeof t==="object"&&t[Yt]===Xn,n5=(t)=>!!t&&typeof t==="object"&&t[Yt]===s1;function xo(t){if(t&&typeof t==="object")switch(t[Yt]){case r1:case s1:return!0}return!1}function i5(t){if(t&&typeof t==="object")switch(t[Yt]){case Qn:case r1:case Xn:case s1:return!0}return!1}var o5=(t)=>(_o(t)||xo(t))&&!!t.anchor;r5.ALIAS=Qn;r5.DOC=Fo;r5.MAP=r1;r5.NODE_TYPE=Yt;r5.PAIR=Co;r5.SCALAR=Xn;r5.SEQ=s1;r5.hasAnchor=o5;r5.isAlias=Qc;r5.isCollection=xo;r5.isDocument=Xc;r5.isMap=t5;r5.isNode=i5;r5.isPair=e5;r5.isScalar=_o;r5.isSeq=n5});var w0=k(function(F5){var rt=B(),ft=Symbol("break visit"),Eo=Symbol("skip children"),Pt=Symbol("remove node");function l1(t,e){let n=$o(e);if(rt.isDocument(t)){if(Be(null,t.contents,n,Object.freeze([t]))===Pt)t.contents=null}else Be(null,t,n,Object.freeze([]))}l1.BREAK=ft;l1.SKIP=Eo;l1.REMOVE=Pt;function Be(t,e,n,i){let o=Mo(t,e,n,i);if(rt.isNode(o)||rt.isPair(o))return Lo(t,i,o),Be(t,o,n,i);if(typeof o!=="symbol"){if(rt.isCollection(e)){i=Object.freeze(i.concat(e));for(let r=0;r<e.items.length;++r){let s=Be(r,e.items[r],n,i);if(typeof s==="number")r=s-1;else if(s===ft)return ft;else if(s===Pt)e.items.splice(r,1),r-=1}}else if(rt.isPair(e)){i=Object.freeze(i.concat(e));let r=Be("key",e.key,n,i);if(r===ft)return ft;else if(r===Pt)e.key=null;let s=Be("value",e.value,n,i);if(s===ft)return ft;else if(s===Pt)e.value=null}}return o}async function a1(t,e){let n=$o(e);if(rt.isDocument(t)){if(await Re(null,t.contents,n,Object.freeze([t]))===Pt)t.contents=null}else await Re(null,t,n,Object.freeze([]))}a1.BREAK=ft;a1.SKIP=Eo;a1.REMOVE=Pt;async function Re(t,e,n,i){let o=await Mo(t,e,n,i);if(rt.isNode(o)||rt.isPair(o))return Lo(t,i,o),Re(t,o,n,i);if(typeof o!=="symbol"){if(rt.isCollection(e)){i=Object.freeze(i.concat(e));for(let r=0;r<e.items.length;++r){let s=await Re(r,e.items[r],n,i);if(typeof s==="number")r=s-1;else if(s===ft)return ft;else if(s===Pt)e.items.splice(r,1),r-=1}}else if(rt.isPair(e)){i=Object.freeze(i.concat(e));let r=await Re("key",e.key,n,i);if(r===ft)return ft;else if(r===Pt)e.key=null;let s=await Re("value",e.value,n,i);if(s===ft)return ft;else if(s===Pt)e.value=null}}return o}function $o(t){if(typeof t==="object"&&(t.Collection||t.Node||t.Value))return Object.assign({Alias:t.Node,Map:t.Node,Scalar:t.Node,Seq:t.Node},t.Value&&{Map:t.Value,Scalar:t.Value,Seq:t.Value},t.Collection&&{Map:t.Collection,Seq:t.Collection},t);return t}function Mo(t,e,n,i){if(typeof n==="function")return n(t,e,i);if(rt.isMap(e))return n.Map?.(t,e,i);if(rt.isSeq(e))return n.Seq?.(t,e,i);if(rt.isPair(e))return n.Pair?.(t,e,i);if(rt.isScalar(e))return n.Scalar?.(t,e,i);if(rt.isAlias(e))return n.Alias?.(t,e,i);return}function Lo(t,e,n){let i=e[e.length-1];if(rt.isCollection(i))i.items[t]=n;else if(rt.isPair(i))if(t==="key")i.key=n;else i.value=n;else if(rt.isDocument(i))i.contents=n;else{let o=rt.isAlias(i)?"alias":"scalar";throw Error(`Cannot replace node with ${o} parent`)}}F5.visit=l1;F5.visitAsync=a1});var ti=k(function(M5){var So=B(),x5=w0(),E5={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},$5=(t)=>t.replace(/[!,[\]{}]/g,(e)=>E5[e]);class bt{constructor(t,e){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},bt.defaultYaml,t),this.tags=Object.assign({},bt.defaultTags,e)}clone(){let t=new bt(this.yaml,this.tags);return t.docStart=this.docStart,t}atDocument(){let t=new bt(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:bt.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},bt.defaultTags);break}return t}add(t,e){if(this.atNextDocument)this.yaml={explicit:bt.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},bt.defaultTags),this.atNextDocument=!1;let n=t.trim().split(/[ \t]+/),i=n.shift();switch(i){case"%TAG":{if(n.length!==2){if(e(0,"%TAG directive should contain exactly two parts"),n.length<2)return!1}let[o,r]=n;return this.tags[o]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,n.length!==1)return e(0,"%YAML directive should contain exactly one part"),!1;let[o]=n;if(o==="1.1"||o==="1.2")return this.yaml.version=o,!0;else{let r=/^\d+\.\d+$/.test(o);return e(6,`Unsupported YAML version ${o}`,r),!1}}default:return e(0,`Unknown directive ${i}`,!0),!1}}tagName(t,e){if(t==="!")return"!";if(t[0]!=="!")return e(`Not a valid tag: ${t}`),null;if(t[1]==="<"){let r=t.slice(2,-1);if(r==="!"||r==="!!")return e(`Verbatim tags aren't resolved, so ${t} is invalid.`),null;if(t[t.length-1]!==">")e("Verbatim tags must end with a >");return r}let[,n,i]=t.match(/^(.*!)([^!]*)$/s);if(!i)e(`The ${t} tag has no suffix`);let o=this.tags[n];if(o)try{return o+decodeURIComponent(i)}catch(r){return e(String(r)),null}if(n==="!")return t;return e(`Could not resolve tag: ${t}`),null}tagString(t){for(let[e,n]of Object.entries(this.tags))if(t.startsWith(n))return e+$5(t.substring(n.length));return t[0]==="!"?t:`!<${t}>`}toString(t){let e=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],n=Object.entries(this.tags),i;if(t&&n.length>0&&So.isNode(t.contents)){let o={};x5.visit(t.contents,(r,s)=>{if(So.isNode(s)&&s.tag)o[s.tag]=!0}),i=Object.keys(o)}else i=[];for(let[o,r]of n){if(o==="!!"&&r==="tag:yaml.org,2002:")continue;if(!t||i.some((s)=>s.startsWith(r)))e.push(`%TAG ${o} ${r}`)}return e.join(`
`)}}bt.defaultYaml={explicit:!1,version:"1.2"};bt.defaultTags={"!!":"tag:yaml.org,2002:"};M5.Directives=bt});var c1=k(function(j5){var Ao=B(),S5=w0();function A5(t){if(/[\x00-\x19\s,[\]{}]/.test(t)){let n=`Anchor must not contain whitespace or control characters: ${JSON.stringify(t)}`;throw Error(n)}return!0}function Do(t){let e=new Set;return S5.visit(t,{Value(n,i){if(i.anchor)e.add(i.anchor)}}),e}function jo(t,e){for(let n=1;;++n){let i=`${t}${n}`;if(!e.has(i))return i}}function D5(t,e){let n=[],i=new Map,o=null;return{onAnchor:(r)=>{n.push(r),o??(o=Do(t));let s=jo(e,o);return o.add(s),s},setAnchors:()=>{for(let r of n){let s=i.get(r);if(typeof s==="object"&&s.anchor&&(Ao.isScalar(s.node)||Ao.isCollection(s.node)))s.node.anchor=s.anchor;else{let l=Error("Failed to resolve repeated object (this should not happen)");throw l.source=r,l}}},sourceObjects:i}}j5.anchorIsValid=A5;j5.anchorNames=Do;j5.createNodeAnchors=D5;j5.findNewAnchor=jo});var ei=k(function(I5){function b0(t,e,n,i){if(i&&typeof i==="object")if(Array.isArray(i))for(let o=0,r=i.length;o<r;++o){let s=i[o],l=b0(t,i,String(o),s);if(l===void 0)delete i[o];else if(l!==s)i[o]=l}else if(i instanceof Map)for(let o of Array.from(i.keys())){let r=i.get(o),s=b0(t,i,o,r);if(s===void 0)i.delete(o);else if(s!==r)i.set(o,s)}else if(i instanceof Set)for(let o of Array.from(i)){let r=b0(t,i,o,o);if(r===void 0)i.delete(o);else if(r!==o)i.delete(o),i.add(r)}else for(let[o,r]of Object.entries(i)){let s=b0(t,i,o,r);if(s===void 0)delete i[o];else if(s!==r)i[o]=s}return t.call(e,n,i)}I5.applyReviver=b0});var te=k(function(B5){var q5=B();function Po(t,e,n){if(Array.isArray(t))return t.map((i,o)=>Po(i,String(o),n));if(t&&typeof t.toJSON==="function"){if(!n||!q5.hasAnchor(t))return t.toJSON(e,n);let i={aliasCount:0,count:1,res:void 0};n.anchors.set(t,i),n.onCreate=(r)=>{i.res=r,delete n.onCreate};let o=t.toJSON(e,n);if(n.onCreate)n.onCreate(o);return o}if(typeof t==="bigint"&&!n?.keep)return Number(t);return t}B5.toJS=Po});var p1=k(function(U5){var V5=ei(),Oo=B(),K5=te();class No{constructor(t){Object.defineProperty(this,Oo.NODE_TYPE,{value:t})}clone(){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));if(this.range)t.range=this.range.slice();return t}toJS(t,{mapAsMap:e,maxAliasCount:n,onAnchor:i,reviver:o}={}){if(!Oo.isDocument(t))throw TypeError("A document argument is required");let r={anchors:new Map,doc:t,keep:!0,mapAsMap:e===!0,mapKeyWarned:!1,maxAliasCount:typeof n==="number"?n:100},s=K5.toJS(this,"",r);if(typeof i==="function")for(let{count:l,res:a}of r.anchors.values())i(a,l);return typeof o==="function"?V5.applyReviver(o,{"":s},"",s):s}}U5.NodeBase=No});var F0=k(function(Z5){var G5=c1(),J5=w0(),Ve=B(),Y5=p1(),W5=te();class To extends Y5.NodeBase{constructor(t){super(Ve.ALIAS);this.source=t,Object.defineProperty(this,"tag",{set(){throw Error("Alias nodes cannot have tags")}})}resolve(t,e){if(e?.maxAliasCount===0)throw ReferenceError("Alias resolution is disabled");let n;if(e?.aliasResolveCache)n=e.aliasResolveCache;else if(n=[],J5.visit(t,{Node:(o,r)=>{if(Ve.isAlias(r)||Ve.hasAnchor(r))n.push(r)}}),e)e.aliasResolveCache=n;let i=void 0;for(let o of n){if(o===this)break;if(o.anchor===this.source)i=o}if(i&&e){let{anchors:o,doc:r,maxAliasCount:s}=e,l=o.get(i);if(!l)W5.toJS(i,null,e),l=o.get(i);if(l?.res===void 0)throw ReferenceError("This should not happen: Alias anchor was not resolved?");if(s>=0){if(l.count+=1,l.aliasCount===0)l.aliasCount=f1(r,i,o);if(l.count*l.aliasCount>s)throw ReferenceError("Excessive alias count indicates a resource exhaustion attack")}}return i}toJSON(t,e){if(!e)return{source:this.source};let n=this.resolve(e.doc,e);if(!n){let i=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw ReferenceError(i)}return e.anchors.get(n).res}toString(t,e,n){let i=`*${this.source}`;if(t){if(G5.anchorIsValid(this.source),t.options.verifyAliasOrder&&!t.anchors.has(this.source)){let o=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw Error(o)}if(t.implicitKey)return`${i} `}return i}}function f1(t,e,n){if(Ve.isAlias(e)){let i=e.resolve(t),o=n&&i&&n.get(i);return o?o.count*o.aliasCount:0}else if(Ve.isCollection(e)){let i=0;for(let o of e.items){let r=f1(t,o,n);if(r>i)i=r}return i}else if(Ve.isPair(e)){let i=f1(t,e.key,n),o=f1(t,e.value,n);return Math.max(i,o)}return 1}Z5.Alias=To});var nt=k(function(i6){var X5=B(),t6=p1(),e6=te(),n6=(t)=>!t||typeof t!=="function"&&typeof t!=="object";class $e extends t6.NodeBase{constructor(t){super(X5.SCALAR);this.value=t}toJSON(t,e){return e?.keep?this.value:e6.toJS(this.value,t,e)}toString(){return String(this.value)}}$e.BLOCK_FOLDED="BLOCK_FOLDED";$e.BLOCK_LITERAL="BLOCK_LITERAL";$e.PLAIN="PLAIN";$e.QUOTE_DOUBLE="QUOTE_DOUBLE";$e.QUOTE_SINGLE="QUOTE_SINGLE";i6.Scalar=$e;i6.isScalarValue=n6});var C0=k(function(p6){var s6=F0(),Me=B(),Io=nt(),l6="tag:yaml.org,2002:";function a6(t,e,n){if(e){let i=n.filter((r)=>r.tag===e),o=i.find((r)=>!r.format)??i[0];if(!o)throw Error(`Tag ${e} not found`);return o}return n.find((i)=>i.identify?.(t)&&!i.format)}function c6(t,e,n){if(Me.isDocument(t))t=t.contents;if(Me.isNode(t))return t;if(Me.isPair(t)){let f=n.schema[Me.MAP].createNode?.(n.schema,null,n);return f.items.push(t),f}if(t instanceof String||t instanceof Number||t instanceof Boolean||typeof BigInt<"u"&&t instanceof BigInt)t=t.valueOf();let{aliasDuplicateObjects:i,onAnchor:o,onTagObj:r,schema:s,sourceObjects:l}=n,a=void 0;if(i&&t&&typeof t==="object")if(a=l.get(t),a)return a.anchor??(a.anchor=o(t)),new s6.Alias(a.anchor);else a={anchor:null,node:null},l.set(t,a);if(e?.startsWith("!!"))e=l6+e.slice(2);let c=a6(t,e,s.tags);if(!c){if(t&&typeof t.toJSON==="function")t=t.toJSON();if(!t||typeof t!=="object"){let f=new Io.Scalar(t);if(a)a.node=f;return f}c=t instanceof Map?s[Me.MAP]:(Symbol.iterator in Object(t))?s[Me.SEQ]:s[Me.MAP]}if(r)r(c),delete n.onTagObj;let u=c?.createNode?c.createNode(n.schema,t,n):typeof c?.nodeClass?.from==="function"?c.nodeClass.from(n.schema,t,n):new Io.Scalar(t);if(e)u.tag=e;else if(!c.default)u.tag=c.tag;if(a)a.node=u;return u}p6.createNode=c6});var u1=k(function(h6){var u6=C0(),Ot=B(),d6=p1();function ni(t,e,n){let i=n;for(let o=e.length-1;o>=0;--o){let r=e[o];if(typeof r==="number"&&Number.isInteger(r)&&r>=0){let s=[];s[r]=i,i=s}else i=new Map([[r,i]])}return u6.createNode(i,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw Error("This should not happen, please report a bug.")},schema:t,sourceObjects:new Map})}var zo=(t)=>t==null||typeof t==="object"&&!!t[Symbol.iterator]().next().done;class qo extends d6.NodeBase{constructor(t,e){super(t);Object.defineProperty(this,"schema",{value:e,configurable:!0,enumerable:!1,writable:!0})}clone(t){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));if(t)e.schema=t;if(e.items=e.items.map((n)=>Ot.isNode(n)||Ot.isPair(n)?n.clone(t):n),this.range)e.range=this.range.slice();return e}addIn(t,e){if(zo(t))this.add(e);else{let[n,...i]=t,o=this.get(n,!0);if(Ot.isCollection(o))o.addIn(i,e);else if(o===void 0&&this.schema)this.set(n,ni(this.schema,i,e));else throw Error(`Expected YAML collection at ${n}. Remaining path: ${i}`)}}deleteIn(t){let[e,...n]=t;if(n.length===0)return this.delete(e);let i=this.get(e,!0);if(Ot.isCollection(i))return i.deleteIn(n);else throw Error(`Expected YAML collection at ${e}. Remaining path: ${n}`)}getIn(t,e){let[n,...i]=t,o=this.get(n,!0);if(i.length===0)return!e&&Ot.isScalar(o)?o.value:o;else return Ot.isCollection(o)?o.getIn(i,e):void 0}hasAllNullValues(t){return this.items.every((e)=>{if(!Ot.isPair(e))return!1;let n=e.value;return n==null||t&&Ot.isScalar(n)&&n.value==null&&!n.commentBefore&&!n.comment&&!n.tag})}hasIn(t){let[e,...n]=t;if(n.length===0)return this.has(e);let i=this.get(e,!0);return Ot.isCollection(i)?i.hasIn(n):!1}setIn(t,e){let[n,...i]=t;if(i.length===0)this.set(n,e);else{let o=this.get(n,!0);if(Ot.isCollection(o))o.setIn(i,e);else if(o===void 0&&this.schema)this.set(n,ni(this.schema,i,e));else throw Error(`Expected YAML collection at ${n}. Remaining path: ${i}`)}}}h6.Collection=qo;h6.collectionFromPath=ni;h6.isEmptyPath=zo});var _0=k(function(w6){var k6=(t)=>t.replace(/^(?!$)(?: $)?/gm,"#");function ii(t,e){if(/^\n+$/.test(t))return t.substring(1);return e?t.replace(/^(?! *$)/gm,e):t}var v6=(t,e,n)=>t.endsWith(`
`)?ii(n,e):n.includes(`
`)?`
`+ii(n,e):(t.endsWith(" ")?"":" ")+n;w6.indentComment=ii;w6.lineComment=v6;w6.stringifyComment=k6});var Ro=k(function(x6){function _6(t,e,n="flow",{indentAtStart:i,lineWidth:o=80,minContentWidth:r=20,onFold:s,onOverflow:l}={}){if(!o||o<0)return t;if(o<r)r=0;let a=Math.max(1+r,1+o-e.length);if(t.length<=a)return t;let c=[],u={},f=o-e.length;if(typeof i==="number")if(i>o-Math.max(2,r))c.push(0);else f=o-i;let d=void 0,h=void 0,m=!1,p=-1,g=-1,y=-1;if(n==="block"){if(p=Bo(t,p,e.length),p!==-1)f=p+a}for(let w;w=t[p+=1];){if(n==="quoted"&&w==="\\"){switch(g=p,t[p+1]){case"x":p+=3;break;case"u":p+=5;break;case"U":p+=9;break;default:p+=1}y=p}if(w===`
`){if(n==="block")p=Bo(t,p,e.length);f=p+e.length+a,d=void 0}else{if(w===" "&&h&&h!==" "&&h!==`
`&&h!=="\t"){let C=t[p+1];if(C&&C!==" "&&C!==`
`&&C!=="\t")d=p}if(p>=f)if(d)c.push(d),f=d+a,d=void 0;else if(n==="quoted"){while(h===" "||h==="\t")h=w,w=t[p+=1],m=!0;let C=p>y+1?p-2:g-1;if(u[C])return t;c.push(C),u[C]=!0,f=C+a,d=void 0}else m=!0}h=w}if(m&&l)l();if(c.length===0)return t;if(s)s();let v=t.slice(0,c[0]);for(let w=0;w<c.length;++w){let C=c[w],F=c[w+1]||t.length;if(C===0)v=`
${e}${t.slice(0,F)}`;else{if(n==="quoted"&&u[C])v+=`${t[C]}\\`;v+=`
${e}${t.slice(C+1,F)}`}}return v}function Bo(t,e,n){let i=e,o=e+1,r=t[o];while(r===" "||r==="\t")if(e<o+n)r=t[++e];else{do r=t[++e];while(r&&r!==`
`);i=e,o=e+1,r=t[o]}return i}x6.FOLD_BLOCK="block";x6.FOLD_FLOW="flow";x6.FOLD_QUOTED="quoted";x6.foldFlowLines=_6});var E0=k(function(j6){var St=nt(),ee=Ro(),h1=(t,e)=>({indentAtStart:e?t.indent.length:t.indentAtStart,lineWidth:t.options.lineWidth,minContentWidth:t.options.minContentWidth}),g1=(t)=>/^(%|---|\.\.\.)/m.test(t);function S6(t,e,n){if(!e||e<0)return!1;let i=e-n,o=t.length;if(o<=i)return!1;for(let r=0,s=0;r<o;++r)if(t[r]===`
`){if(r-s>i)return!0;if(s=r+1,o-s<=i)return!1}return!0}function x0(t,e){let n=JSON.stringify(t);if(e.options.doubleQuotedAsJSON)return n;let{implicitKey:i}=e,o=e.options.doubleQuotedMinMultiLineLength,r=e.indent||(g1(t)?"  ":""),s="",l=0;for(let a=0,c=n[a];c;c=n[++a]){if(c===" "&&n[a+1]==="\\"&&n[a+2]==="n")s+=n.slice(l,a)+"\\ ",a+=1,l=a,c="\\";if(c==="\\")switch(n[a+1]){case"u":{s+=n.slice(l,a);let u=n.substr(a+2,4);switch(u){case"0000":s+="\\0";break;case"0007":s+="\\a";break;case"000b":s+="\\v";break;case"001b":s+="\\e";break;case"0085":s+="\\N";break;case"00a0":s+="\\_";break;case"2028":s+="\\L";break;case"2029":s+="\\P";break;default:if(u.substr(0,2)==="00")s+="\\x"+u.substr(2);else s+=n.substr(a,6)}a+=5,l=a+1}break;case"n":if(i||n[a+2]==='"'||n.length<o)a+=1;else{s+=n.slice(l,a)+`

`;while(n[a+2]==="\\"&&n[a+3]==="n"&&n[a+4]!=='"')s+=`
`,a+=2;if(s+=r,n[a+2]===" ")s+="\\";a+=1,l=a+1}break;default:a+=1}}return s=l?s+n.slice(l):n,i?s:ee.foldFlowLines(s,r,ee.FOLD_QUOTED,h1(e,!1))}function oi(t,e){if(e.options.singleQuote===!1||e.implicitKey&&t.includes(`
`)||/[ \t]\n|\n[ \t]/.test(t))return x0(t,e);let n=e.indent||(g1(t)?"  ":""),i="'"+t.replace(/'/g,"''").replace(/\n+/g,`$&
${n}`)+"'";return e.implicitKey?i:ee.foldFlowLines(i,n,ee.FOLD_FLOW,h1(e,!1))}function Ke(t,e){let{singleQuote:n}=e.options,i;if(n===!1)i=x0;else{let o=t.includes('"'),r=t.includes("'");if(o&&!r)i=oi;else if(r&&!o)i=x0;else i=n?oi:x0}return i(t,e)}var ri;try{ri=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{ri=/\n+(?!\n|$)/g}function d1({comment:t,type:e,value:n},i,o,r){let{blockQuote:s,commentString:l,lineWidth:a}=i.options;if(!s||/\n[\t ]+$/.test(n))return Ke(n,i);let c=i.indent||(i.forceBlockIndent||g1(n)?"  ":""),u=s==="literal"?!0:s==="folded"||e===St.Scalar.BLOCK_FOLDED?!1:e===St.Scalar.BLOCK_LITERAL?!0:!S6(n,a,c.length);if(!n)return u?`|
`:`>
`;let f,d;for(d=n.length;d>0;--d){let F=n[d-1];if(F!==`
`&&F!=="\t"&&F!==" ")break}let h=n.substring(d),m=h.indexOf(`
`);if(m===-1)f="-";else if(n===h||m!==h.length-1){if(f="+",r)r()}else f="";if(h){if(n=n.slice(0,-h.length),h[h.length-1]===`
`)h=h.slice(0,-1);h=h.replace(ri,`$&${c}`)}let p=!1,g,y=-1;for(g=0;g<n.length;++g){let F=n[g];if(F===" ")p=!0;else if(F===`
`)y=g;else break}let v=n.substring(0,y<g?y+1:g);if(v)n=n.substring(v.length),v=v.replace(/\n+/g,`$&${c}`);let C=(p?c?"2":"1":"")+f;if(t){if(C+=" "+l(t.replace(/ ?[\r\n]+/g," ")),o)o()}if(!u){let F=n.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`),x=!1,A=h1(i,!0);if(s!=="folded"&&e!==St.Scalar.BLOCK_FOLDED)A.onOverflow=()=>{x=!0};let M=ee.foldFlowLines(`${v}${F}${h}`,c,ee.FOLD_BLOCK,A);if(!x)return`>${C}
${c}${M}`}return n=n.replace(/\n+/g,`$&${c}`),`|${C}
${c}${v}${n}${h}`}function A6(t,e,n,i){let{type:o,value:r}=t,{actualString:s,implicitKey:l,indent:a,indentStep:c,inFlow:u}=e;if(l&&r.includes(`
`)||u&&/[[\]{},]/.test(r))return Ke(r,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))return l||u||!r.includes(`
`)?Ke(r,e):d1(t,e,n,i);if(!l&&!u&&o!==St.Scalar.PLAIN&&r.includes(`
`))return d1(t,e,n,i);if(g1(r)){if(a==="")return e.forceBlockIndent=!0,d1(t,e,n,i);else if(l&&a===c)return Ke(r,e)}let f=r.replace(/\n+/g,`$&
${a}`);if(s){let d=(p)=>p.default&&p.tag!=="tag:yaml.org,2002:str"&&p.test?.test(f),{compat:h,tags:m}=e.doc.schema;if(m.some(d)||h?.some(d))return Ke(r,e)}return l?f:ee.foldFlowLines(f,a,ee.FOLD_FLOW,h1(e,!1))}function D6(t,e,n,i){let{implicitKey:o,inFlow:r}=e,s=typeof t.value==="string"?t:Object.assign({},t,{value:String(t.value)}),{type:l}=t;if(l!==St.Scalar.QUOTE_DOUBLE){if(/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(s.value))l=St.Scalar.QUOTE_DOUBLE}let a=(u)=>{switch(u){case St.Scalar.BLOCK_FOLDED:case St.Scalar.BLOCK_LITERAL:return o||r?Ke(s.value,e):d1(s,e,n,i);case St.Scalar.QUOTE_DOUBLE:return x0(s.value,e);case St.Scalar.QUOTE_SINGLE:return oi(s.value,e);case St.Scalar.PLAIN:return A6(s,e,n,i);default:return null}},c=a(l);if(c===null){let{defaultKeyType:u,defaultStringType:f}=e.options,d=o&&u||f;if(c=a(d),c===null)throw Error(`Unsupported default string type ${d}`)}return c}j6.stringifyString=D6});var $0=k(function(R6){var O6=c1(),ne=B(),N6=_0(),T6=E0();function I6(t,e){let n=Object.assign({blockQuote:!0,commentString:N6.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},t.schema.toStringOptions,e),i;switch(n.collectionStyle){case"block":i=!1;break;case"flow":i=!0;break;default:i=null}return{anchors:new Set,doc:t,flowCollectionPadding:n.flowCollectionPadding?" ":"",indent:"",indentStep:typeof n.indent==="number"?" ".repeat(n.indent):"  ",inFlow:i,options:n}}function z6(t,e){if(e.tag){let o=t.filter((r)=>r.tag===e.tag);if(o.length>0)return o.find((r)=>r.format===e.format)??o[0]}let n=void 0,i;if(ne.isScalar(e)){i=e.value;let o=t.filter((r)=>r.identify?.(i));if(o.length>1){let r=o.filter((s)=>s.test);if(r.length>0)o=r}n=o.find((r)=>r.format===e.format)??o.find((r)=>!r.format)}else i=e,n=t.find((o)=>o.nodeClass&&i instanceof o.nodeClass);if(!n){let o=i?.constructor?.name??(i===null?"null":typeof i);throw Error(`Tag not resolved for ${o} value`)}return n}function q6(t,e,{anchors:n,doc:i}){if(!i.directives)return"";let o=[],r=(ne.isScalar(t)||ne.isCollection(t))&&t.anchor;if(r&&O6.anchorIsValid(r))n.add(r),o.push(`&${r}`);let s=t.tag??(e.default?null:e.tag);if(s)o.push(i.directives.tagString(s));return o.join(" ")}function B6(t,e,n,i){if(ne.isPair(t))return t.toString(e,n,i);if(ne.isAlias(t)){if(e.doc.directives)return t.toString(e);if(e.resolvedAliases?.has(t))throw TypeError("Cannot stringify circular structure without alias nodes");else{if(e.resolvedAliases)e.resolvedAliases.add(t);else e.resolvedAliases=new Set([t]);t=t.resolve(e.doc)}}let o=void 0,r=ne.isNode(t)?t:e.doc.createNode(t,{onTagObj:(a)=>o=a});o??(o=z6(e.doc.schema.tags,r));let s=q6(r,o,e);if(s.length>0)e.indentAtStart=(e.indentAtStart??0)+s.length+1;let l=typeof o.stringify==="function"?o.stringify(r,e,n,i):ne.isScalar(r)?T6.stringifyString(r,e,n,i):r.toString(e,n,i);if(!s)return l;return ne.isScalar(r)||l[0]==="{"||l[0]==="["?`${s} ${l}`:`${s}
${e.indent}${l}`}R6.createStringifyContext=I6;R6.stringify=B6});var Uo=k(function(H6){var Wt=B(),Vo=nt(),Ko=$0(),M0=_0();function U6({key:t,value:e},n,i,o){let{allNullValues:r,doc:s,indent:l,indentStep:a,options:{commentString:c,indentSeq:u,simpleKeys:f}}=n,d=Wt.isNode(t)&&t.comment||null;if(f){if(d)throw Error("With simple keys, key nodes cannot have comments");if(Wt.isCollection(t)||!Wt.isNode(t)&&typeof t==="object")throw Error("With simple keys, collection cannot be used as a key value")}let h=!f&&(!t||d&&e==null&&!n.inFlow||Wt.isCollection(t)||(Wt.isScalar(t)?t.type===Vo.Scalar.BLOCK_FOLDED||t.type===Vo.Scalar.BLOCK_LITERAL:typeof t==="object"));n=Object.assign({},n,{allNullValues:!1,implicitKey:!h&&(f||!r),indent:l+a});let m=!1,p=!1,g=Ko.stringify(t,n,()=>m=!0,()=>p=!0);if(!h&&!n.inFlow&&g.length>1024){if(f)throw Error("With simple keys, single line scalar must not span more than 1024 characters");h=!0}if(n.inFlow){if(r||e==null){if(m&&i)i();return g===""?"?":h?`? ${g}`:g}}else if(r&&!f||e==null&&h){if(g=`? ${g}`,d&&!m)g+=M0.lineComment(g,n.indent,c(d));else if(p&&o)o();return g}if(m)d=null;if(h){if(d)g+=M0.lineComment(g,n.indent,c(d));g=`? ${g}
${l}:`}else if(g=`${g}:`,d)g+=M0.lineComment(g,n.indent,c(d));let y,v,w;if(Wt.isNode(e))y=!!e.spaceBefore,v=e.commentBefore,w=e.comment;else if(y=!1,v=null,w=null,e&&typeof e==="object")e=s.createNode(e);if(n.implicitKey=!1,!h&&!d&&Wt.isScalar(e))n.indentAtStart=g.length+1;if(p=!1,!u&&a.length>=2&&!n.inFlow&&!h&&Wt.isSeq(e)&&!e.flow&&!e.tag&&!e.anchor)n.indent=n.indent.substring(2);let C=!1,F=Ko.stringify(e,n,()=>C=!0,()=>p=!0),x=" ";if(d||y||v){if(x=y?`
`:"",v){let A=c(v);x+=`
${M0.indentComment(A,n.indent)}`}if(F===""&&!n.inFlow){if(x===`
`&&w)x=`

`}else x+=`
${n.indent}`}else if(!h&&Wt.isCollection(e)){let A=F[0],M=F.indexOf(`
`),j=M!==-1,V=n.inFlow??e.flow??e.items.length===0;if(j||!V){let W=!1;if(j&&(A==="&"||A==="!")){let q=F.indexOf(" ");if(A==="&"&&q!==-1&&q<M&&F[q+1]==="!")q=F.indexOf(" ",q+1);if(q===-1||M<q)W=!0}if(!W)x=`
${n.indent}`}}else if(F===""||F[0]===`
`)x="";if(g+=x+F,n.inFlow){if(C&&i)i()}else if(w&&!C)g+=M0.lineComment(g,n.indent,c(w));else if(p&&o)o();return g}H6.stringifyPair=U6});var si=k(function(W6){var Ho=o1("process");function J6(t,...e){if(t==="debug")console.log(...e)}function Y6(t,e){if(t==="debug"||t==="warn")if(typeof Ho.emitWarning==="function")Ho.emitWarning(e);else console.warn(e)}W6.debug=J6;W6.warn=Y6});var v1=k(function(t8){var k1=B(),Go=nt(),m1="<<",y1={identify:(t)=>t===m1||typeof t==="symbol"&&t.description===m1,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new Go.Scalar(Symbol(m1)),{addToJSMap:Jo}),stringify:()=>m1},X6=(t,e)=>(y1.identify(e)||k1.isScalar(e)&&(!e.type||e.type===Go.Scalar.PLAIN)&&y1.identify(e.value))&&t?.doc.schema.tags.some((n)=>n.tag===y1.tag&&n.default);function Jo(t,e,n){let i=Yo(t,n);if(k1.isSeq(i))for(let o of i.items)li(t,e,o);else if(Array.isArray(i))for(let o of i)li(t,e,o);else li(t,e,i)}function li(t,e,n){let i=Yo(t,n);if(!k1.isMap(i))throw Error("Merge sources must be maps or map aliases");let o=i.toJSON(null,t,Map);for(let[r,s]of o)if(e instanceof Map){if(!e.has(r))e.set(r,s)}else if(e instanceof Set)e.add(r);else if(!Object.prototype.hasOwnProperty.call(e,r))Object.defineProperty(e,r,{value:s,writable:!0,enumerable:!0,configurable:!0});return e}function Yo(t,e){return t&&k1.isAlias(e)?e.resolve(t.doc,t):e}t8.addMergeToJSMap=Jo;t8.isMergeKey=X6;t8.merge=y1});var ci=k(function(a8){var o8=si(),Wo=v1(),r8=$0(),Zo=B(),ai=te();function s8(t,e,{key:n,value:i}){if(Zo.isNode(n)&&n.addToJSMap)n.addToJSMap(t,e,i);else if(Wo.isMergeKey(t,n))Wo.addMergeToJSMap(t,e,i);else{let o=ai.toJS(n,"",t);if(e instanceof Map)e.set(o,ai.toJS(i,o,t));else if(e instanceof Set)e.add(o);else{let r=l8(n,o,t),s=ai.toJS(i,r,t);if(r in e)Object.defineProperty(e,r,{value:s,writable:!0,enumerable:!0,configurable:!0});else e[r]=s}}return e}function l8(t,e,n){if(e===null)return"";if(typeof e!=="object")return String(e);if(Zo.isNode(t)&&n?.doc){let i=r8.createStringifyContext(n.doc,{});i.anchors=new Set;for(let r of n.anchors.keys())i.anchors.add(r.anchor);i.inFlow=!0,i.inStringifyKey=!0;let o=t.toString(i);if(!n.mapKeyWarned){let r=JSON.stringify(o);if(r.length>40)r=r.substring(0,36)+'..."';o8.warn(n.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`),n.mapKeyWarned=!0}return o}return JSON.stringify(e)}a8.addPairToJSMap=s8});var ie=k(function(d8){var Qo=C0(),p8=Uo(),f8=ci(),w1=B();function u8(t,e,n){let i=Qo.createNode(t,void 0,n),o=Qo.createNode(e,void 0,n);return new b1(i,o)}class b1{constructor(t,e=null){Object.defineProperty(this,w1.NODE_TYPE,{value:w1.PAIR}),this.key=t,this.value=e}clone(t){let{key:e,value:n}=this;if(w1.isNode(e))e=e.clone(t);if(w1.isNode(n))n=n.clone(t);return new b1(e,n)}toJSON(t,e){let n=e?.mapAsMap?new Map:{};return f8.addPairToJSMap(e,n,this)}toString(t,e,n){return t?.doc?p8.stringifyPair(this,t,e,n):JSON.stringify(this)}}d8.Pair=b1;d8.createPair=u8});var pi=k(function(v8){var Le=B(),Xo=$0(),F1=_0();function m8(t,e,n){return(e.inFlow??t.flow?k8:y8)(t,e,n)}function y8({comment:t,items:e},n,{blockItemPrefix:i,flowChars:o,itemIndent:r,onChompKeep:s,onComment:l}){let{indent:a,options:{commentString:c}}=n,u=Object.assign({},n,{indent:r,type:null}),f=!1,d=[];for(let m=0;m<e.length;++m){let p=e[m],g=null;if(Le.isNode(p)){if(!f&&p.spaceBefore)d.push("");if(C1(n,d,p.commentBefore,f),p.comment)g=p.comment}else if(Le.isPair(p)){let v=Le.isNode(p.key)?p.key:null;if(v){if(!f&&v.spaceBefore)d.push("");C1(n,d,v.commentBefore,f)}}f=!1;let y=Xo.stringify(p,u,()=>g=null,()=>f=!0);if(g)y+=F1.lineComment(y,r,c(g));if(f&&g)f=!1;d.push(i+y)}let h;if(d.length===0)h=o.start+o.end;else{h=d[0];for(let m=1;m<d.length;++m){let p=d[m];h+=p?`
${a}${p}`:`
`}}if(t){if(h+=`
`+F1.indentComment(c(t),a),l)l()}else if(f&&s)s();return h}function k8({items:t},e,{flowChars:n,itemIndent:i}){let{indent:o,indentStep:r,flowCollectionPadding:s,options:{commentString:l}}=e;i+=r;let a=Object.assign({},e,{indent:i,inFlow:!0,type:null}),c=!1,u=0,f=[];for(let m=0;m<t.length;++m){let p=t[m],g=null;if(Le.isNode(p)){if(p.spaceBefore)f.push("");if(C1(e,f,p.commentBefore,!1),p.comment)g=p.comment}else if(Le.isPair(p)){let v=Le.isNode(p.key)?p.key:null;if(v){if(v.spaceBefore)f.push("");if(C1(e,f,v.commentBefore,!1),v.comment)c=!0}let w=Le.isNode(p.value)?p.value:null;if(w){if(w.comment)g=w.comment;if(w.commentBefore)c=!0}else if(p.value==null&&v?.comment)g=v.comment}if(g)c=!0;let y=Xo.stringify(p,a,()=>g=null);if(c||(c=f.length>u||y.includes(`
`)),m<t.length-1)y+=",";else if(e.options.trailingComma){if(e.options.lineWidth>0)c||(c=f.reduce((v,w)=>v+w.length+2,2)+(y.length+2)>e.options.lineWidth);if(c)y+=","}if(g)y+=F1.lineComment(y,i,l(g));f.push(y),u=f.length}let{start:d,end:h}=n;if(f.length===0)return d+h;else{if(!c){let m=f.reduce((p,g)=>p+g.length+2,2);c=e.options.lineWidth>0&&m>e.options.lineWidth}if(c){let m=d;for(let p of f)m+=p?`
${r}${o}${p}`:`
`;return`${m}
${o}${h}`}else return`${d}${s}${f.join(" ")}${s}${h}`}}function C1({indent:t,options:{commentString:e}},n,i,o){if(i&&o)i=i.replace(/^\n+/,"");if(i){let r=F1.indentComment(e(i),t);n.push(r.trimStart())}}v8.stringifyCollection=m8});var re=k(function(x8){var b8=pi(),F8=ci(),C8=u1(),oe=B(),_1=ie(),_8=nt();function L0(t,e){let n=oe.isScalar(e)?e.value:e;for(let i of t)if(oe.isPair(i)){if(i.key===e||i.key===n)return i;if(oe.isScalar(i.key)&&i.key.value===n)return i}return}class tr extends C8.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(t){super(oe.MAP,t);this.items=[]}static from(t,e,n){let{keepUndefined:i,replacer:o}=n,r=new this(t),s=(l,a)=>{if(typeof o==="function")a=o.call(e,l,a);else if(Array.isArray(o)&&!o.includes(l))return;if(a!==void 0||i)r.items.push(_1.createPair(l,a,n))};if(e instanceof Map)for(let[l,a]of e)s(l,a);else if(e&&typeof e==="object")for(let l of Object.keys(e))s(l,e[l]);if(typeof t.sortMapEntries==="function")r.items.sort(t.sortMapEntries);return r}add(t,e){let n;if(oe.isPair(t))n=t;else if(!t||typeof t!=="object"||!("key"in t))n=new _1.Pair(t,t?.value);else n=new _1.Pair(t.key,t.value);let i=L0(this.items,n.key),o=this.schema?.sortMapEntries;if(i){if(!e)throw Error(`Key ${n.key} already set`);if(oe.isScalar(i.value)&&_8.isScalarValue(n.value))i.value.value=n.value;else i.value=n.value}else if(o){let r=this.items.findIndex((s)=>o(n,s)<0);if(r===-1)this.items.push(n);else this.items.splice(r,0,n)}else this.items.push(n)}delete(t){let e=L0(this.items,t);if(!e)return!1;return this.items.splice(this.items.indexOf(e),1).length>0}get(t,e){let i=L0(this.items,t)?.value;return(!e&&oe.isScalar(i)?i.value:i)??void 0}has(t){return!!L0(this.items,t)}set(t,e){this.add(new _1.Pair(t,e),!0)}toJSON(t,e,n){let i=n?new n:e?.mapAsMap?new Map:{};if(e?.onCreate)e.onCreate(i);for(let o of this.items)F8.addPairToJSMap(e,i,o);return i}toString(t,e,n){if(!t)return JSON.stringify(this);for(let i of this.items)if(!oe.isPair(i))throw Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);if(!t.allNullValues&&this.hasAllNullValues(!1))t=Object.assign({},t,{allNullValues:!0});return b8.stringifyCollection(this,t,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:t.indent||"",onChompKeep:n,onComment:e})}}x8.YAMLMap=tr;x8.findPair=L0});var Ue=k(function(S8){var M8=B(),er=re(),L8={collection:"map",default:!0,nodeClass:er.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(t,e){if(!M8.isMap(t))e("Expected a mapping for this tag");return t},createNode:(t,e,n)=>er.YAMLMap.from(t,e,n)};S8.map=L8});var se=k(function(T8){var D8=C0(),j8=pi(),P8=u1(),E1=B(),O8=nt(),N8=te();class nr extends P8.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(t){super(E1.SEQ,t);this.items=[]}add(t){this.items.push(t)}delete(t){let e=x1(t);if(typeof e!=="number")return!1;return this.items.splice(e,1).length>0}get(t,e){let n=x1(t);if(typeof n!=="number")return;let i=this.items[n];return!e&&E1.isScalar(i)?i.value:i}has(t){let e=x1(t);return typeof e==="number"&&e<this.items.length}set(t,e){let n=x1(t);if(typeof n!=="number")throw Error(`Expected a valid index, not ${t}.`);let i=this.items[n];if(E1.isScalar(i)&&O8.isScalarValue(e))i.value=e;else this.items[n]=e}toJSON(t,e){let n=[];if(e?.onCreate)e.onCreate(n);let i=0;for(let o of this.items)n.push(N8.toJS(o,String(i++),e));return n}toString(t,e,n){if(!t)return JSON.stringify(this);return j8.stringifyCollection(this,t,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(t.indent||"")+"  ",onChompKeep:n,onComment:e})}static from(t,e,n){let{replacer:i}=n,o=new this(t);if(e&&Symbol.iterator in Object(e)){let r=0;for(let s of e){if(typeof i==="function"){let l=e instanceof Set?s:String(r++);s=i.call(e,l,s)}o.items.push(D8.createNode(s,void 0,n))}}return o}}function x1(t){let e=E1.isScalar(t)?t.value:t;if(e&&typeof e==="string")e=Number(e);return typeof e==="number"&&Number.isInteger(e)&&e>=0?e:null}T8.YAMLSeq=nr});var He=k(function(B8){var z8=B(),ir=se(),q8={collection:"seq",default:!0,nodeClass:ir.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(t,e){if(!z8.isSeq(t))e("Expected a sequence for this tag");return t},createNode:(t,e,n)=>ir.YAMLSeq.from(t,e,n)};B8.seq=q8});var S0=k(function(U8){var V8=E0(),K8={identify:(t)=>typeof t==="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:(t)=>t,stringify(t,e,n,i){return e=Object.assign({actualString:!0},e),V8.stringifyString(t,e,n,i)}};U8.string=K8});var $1=k(function(G8){var or=nt(),rr={identify:(t)=>t==null,createNode:()=>new or.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new or.Scalar(null),stringify:({source:t},e)=>typeof t==="string"&&rr.test.test(t)?t:e.options.nullStr};G8.nullTag=rr});var fi=k(function(W8){var Y8=nt(),sr={identify:(t)=>typeof t==="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:(t)=>new Y8.Scalar(t[0]==="t"||t[0]==="T"),stringify({source:t,value:e},n){if(t&&sr.test.test(t)){let i=t[0]==="t"||t[0]==="T";if(e===i)return t}return e?n.options.trueStr:n.options.falseStr}};W8.boolTag=sr});var Ge=k(function(X8){function Q8({format:t,minFractionDigits:e,tag:n,value:i}){if(typeof i==="bigint")return String(i);let o=typeof i==="number"?i:Number(i);if(!isFinite(o))return isNaN(o)?".nan":o<0?"-.inf":".inf";let r=Object.is(i,-0)?"-0":JSON.stringify(i);if(!t&&e&&(!n||n==="tag:yaml.org,2002:float")&&/^-?\d/.test(r)&&!r.includes("e")){let s=r.indexOf(".");if(s<0)s=r.length,r+=".";let l=e-(r.length-s-1);while(l-- >0)r+="0"}return r}X8.stringifyNumber=Q8});var di=k(function(r7){var e7=nt(),ui=Ge(),n7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:(t)=>t.slice(-3).toLowerCase()==="nan"?NaN:t[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:ui.stringifyNumber},i7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:(t)=>parseFloat(t),stringify(t){let e=Number(t.value);return isFinite(e)?e.toExponential():ui.stringifyNumber(t)}},o7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(t){let e=new e7.Scalar(parseFloat(t)),n=t.indexOf(".");if(n!==-1&&t[t.length-1]==="0")e.minFractionDigits=t.length-n-1;return e},stringify:ui.stringifyNumber};r7.float=o7;r7.floatExp=i7;r7.floatNaN=n7});var gi=k(function(u7){var lr=Ge(),M1=(t)=>typeof t==="bigint"||Number.isInteger(t),hi=(t,e,n,{intAsBigInt:i})=>i?BigInt(t):parseInt(t.substring(e),n);function ar(t,e,n){let{value:i}=t;if(M1(i)&&i>=0)return n+i.toString(e);return lr.stringifyNumber(t)}var c7={identify:(t)=>M1(t)&&t>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(t,e,n)=>hi(t,2,8,n),stringify:(t)=>ar(t,8,"0o")},p7={identify:M1,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(t,e,n)=>hi(t,0,10,n),stringify:lr.stringifyNumber},f7={identify:(t)=>M1(t)&&t>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(t,e,n)=>hi(t,2,16,n),stringify:(t)=>ar(t,16,"0x")};u7.int=p7;u7.intHex=f7;u7.intOct=c7});var cr=k(function(F7){var m7=Ue(),y7=$1(),k7=He(),v7=S0(),w7=fi(),mi=di(),yi=gi(),b7=[m7.map,k7.seq,v7.string,y7.nullTag,w7.boolTag,yi.intOct,yi.int,yi.intHex,mi.floatNaN,mi.floatExp,mi.float];F7.schema=b7});var fr=k(function(S7){var _7=nt(),x7=Ue(),E7=He();function pr(t){return typeof t==="bigint"||Number.isInteger(t)}var L1=({value:t})=>JSON.stringify(t),$7=[{identify:(t)=>typeof t==="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:(t)=>t,stringify:L1},{identify:(t)=>t==null,createNode:()=>new _7.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:L1},{identify:(t)=>typeof t==="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:(t)=>t==="true",stringify:L1},{identify:pr,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(t,e,{intAsBigInt:n})=>n?BigInt(t):parseInt(t,10),stringify:({value:t})=>pr(t)?t.toString():JSON.stringify(t)},{identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:(t)=>parseFloat(t),stringify:L1}],M7={default:!0,tag:"",test:/^/,resolve(t,e){return e(`Unresolved plain scalar ${JSON.stringify(t)}`),t}},L7=[x7.map,E7.seq].concat($7,M7);S7.schema=L7});var vi=k(function(P7){var A0=o1("buffer"),ki=nt(),D7=E0(),j7={identify:(t)=>t instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(t,e){if(typeof A0.Buffer==="function")return A0.Buffer.from(t,"base64");else if(typeof atob==="function"){let n=atob(t.replace(/[\n\r]/g,"")),i=new Uint8Array(n.length);for(let o=0;o<n.length;++o)i[o]=n.charCodeAt(o);return i}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),t},stringify({comment:t,type:e,value:n},i,o,r){if(!n)return"";let s=n,l;if(typeof A0.Buffer==="function")l=s instanceof A0.Buffer?s.toString("base64"):A0.Buffer.from(s.buffer).toString("base64");else if(typeof btoa==="function"){let a="";for(let c=0;c<s.length;++c)a+=String.fromCharCode(s[c]);l=btoa(a)}else throw Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=ki.Scalar.BLOCK_LITERAL),e!==ki.Scalar.QUOTE_DOUBLE){let a=Math.max(i.options.lineWidth-i.indent.length,i.options.minContentWidth),c=Math.ceil(l.length/a),u=Array(c);for(let f=0,d=0;f<c;++f,d+=a)u[f]=l.substr(d,a);l=u.join(e===ki.Scalar.BLOCK_LITERAL?`
`:" ")}return D7.stringifyString({comment:t,type:e,value:l},i,o,r)}};P7.binary=j7});var A1=k(function(z7){var S1=B(),wi=ie(),N7=nt(),T7=se();function ur(t,e){if(S1.isSeq(t))for(let n=0;n<t.items.length;++n){let i=t.items[n];if(S1.isPair(i))continue;else if(S1.isMap(i)){if(i.items.length>1)e("Each pair must have its own sequence indicator");let o=i.items[0]||new wi.Pair(new N7.Scalar(null));if(i.commentBefore)o.key.commentBefore=o.key.commentBefore?`${i.commentBefore}
${o.key.commentBefore}`:i.commentBefore;if(i.comment){let r=o.value??o.key;r.comment=r.comment?`${i.comment}
${r.comment}`:i.comment}i=o}t.items[n]=S1.isPair(i)?i:new wi.Pair(i)}else e("Expected a sequence for this tag");return t}function dr(t,e,n){let{replacer:i}=n,o=new T7.YAMLSeq(t);o.tag="tag:yaml.org,2002:pairs";let r=0;if(e&&Symbol.iterator in Object(e))for(let s of e){if(typeof i==="function")s=i.call(e,String(r++),s);let l,a;if(Array.isArray(s))if(s.length===2)l=s[0],a=s[1];else throw TypeError(`Expected [key, value] tuple: ${s}`);else if(s&&s instanceof Object){let c=Object.keys(s);if(c.length===1)l=c[0],a=s[l];else throw TypeError(`Expected tuple with one key, not ${c.length} keys`)}else l=s;o.items.push(wi.createPair(l,a,n))}return o}var I7={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:ur,createNode:dr};z7.createPairs=dr;z7.pairs=I7;z7.resolvePairs=ur});var Fi=k(function(U7){var hr=B(),bi=te(),D0=re(),V7=se(),gr=A1();class Se extends V7.YAMLSeq{constructor(){super();this.add=D0.YAMLMap.prototype.add.bind(this),this.delete=D0.YAMLMap.prototype.delete.bind(this),this.get=D0.YAMLMap.prototype.get.bind(this),this.has=D0.YAMLMap.prototype.has.bind(this),this.set=D0.YAMLMap.prototype.set.bind(this),this.tag=Se.tag}toJSON(t,e){if(!e)return super.toJSON(t);let n=new Map;if(e?.onCreate)e.onCreate(n);for(let i of this.items){let o,r;if(hr.isPair(i))o=bi.toJS(i.key,"",e),r=bi.toJS(i.value,o,e);else o=bi.toJS(i,"",e);if(n.has(o))throw Error("Ordered maps must not include duplicate keys");n.set(o,r)}return n}static from(t,e,n){let i=gr.createPairs(t,e,n),o=new this;return o.items=i.items,o}}Se.tag="tag:yaml.org,2002:omap";var K7={collection:"seq",identify:(t)=>t instanceof Map,nodeClass:Se,default:!1,tag:"tag:yaml.org,2002:omap",resolve(t,e){let n=gr.resolvePairs(t,e),i=[];for(let{key:o}of n.items)if(hr.isScalar(o))if(i.includes(o.value))e(`Ordered maps must not include duplicate keys: ${o.value}`);else i.push(o.value);return Object.assign(new Se,n)},createNode:(t,e,n)=>Se.from(t,e,n)};U7.YAMLOMap=Se;U7.omap=K7});var wr=k(function(J7){var mr=nt();function yr({value:t,source:e},n){if(e&&(t?kr:vr).test.test(e))return e;return t?n.options.trueStr:n.options.falseStr}var kr={identify:(t)=>t===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new mr.Scalar(!0),stringify:yr},vr={identify:(t)=>t===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new mr.Scalar(!1),stringify:yr};J7.falseTag=vr;J7.trueTag=kr});var br=k(function(ep){var Z7=nt(),Ci=Ge(),Q7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:(t)=>t.slice(-3).toLowerCase()==="nan"?NaN:t[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ci.stringifyNumber},X7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:(t)=>parseFloat(t.replace(/_/g,"")),stringify(t){let e=Number(t.value);return isFinite(e)?e.toExponential():Ci.stringifyNumber(t)}},tp={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(t){let e=new Z7.Scalar(parseFloat(t.replace(/_/g,""))),n=t.indexOf(".");if(n!==-1){let i=t.substring(n+1).replace(/_/g,"");if(i[i.length-1]==="0")e.minFractionDigits=i.length}return e},stringify:Ci.stringifyNumber};ep.float=tp;ep.floatExp=X7;ep.floatNaN=Q7});var Cr=k(function(cp){var Fr=Ge(),j0=(t)=>typeof t==="bigint"||Number.isInteger(t);function D1(t,e,n,{intAsBigInt:i}){let o=t[0];if(o==="-"||o==="+")e+=1;if(t=t.substring(e).replace(/_/g,""),i){switch(n){case 2:t=`0b${t}`;break;case 8:t=`0o${t}`;break;case 16:t=`0x${t}`;break}let s=BigInt(t);return o==="-"?BigInt(-1)*s:s}let r=parseInt(t,n);return o==="-"?-1*r:r}function _i(t,e,n){let{value:i}=t;if(j0(i)){let o=i.toString(e);return i<0?"-"+n+o.substr(1):n+o}return Fr.stringifyNumber(t)}var rp={identify:j0,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(t,e,n)=>D1(t,2,2,n),stringify:(t)=>_i(t,2,"0b")},sp={identify:j0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(t,e,n)=>D1(t,1,8,n),stringify:(t)=>_i(t,8,"0")},lp={identify:j0,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(t,e,n)=>D1(t,0,10,n),stringify:Fr.stringifyNumber},ap={identify:j0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(t,e,n)=>D1(t,2,16,n),stringify:(t)=>_i(t,16,"0x")};cp.int=lp;cp.intBin=rp;cp.intHex=ap;cp.intOct=sp});var xi=k(function(gp){var O1=B(),j1=ie(),P1=re();class Ae extends P1.YAMLMap{constructor(t){super(t);this.tag=Ae.tag}add(t){let e;if(O1.isPair(t))e=t;else if(t&&typeof t==="object"&&"key"in t&&"value"in t&&t.value===null)e=new j1.Pair(t.key,null);else e=new j1.Pair(t,null);if(!P1.findPair(this.items,e.key))this.items.push(e)}get(t,e){let n=P1.findPair(this.items,t);return!e&&O1.isPair(n)?O1.isScalar(n.key)?n.key.value:n.key:n}set(t,e){if(typeof e!=="boolean")throw Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof e}`);let n=P1.findPair(this.items,t);if(n&&!e)this.items.splice(this.items.indexOf(n),1);else if(!n&&e)this.items.push(new j1.Pair(t))}toJSON(t,e){return super.toJSON(t,e,Set)}toString(t,e,n){if(!t)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},t,{allNullValues:!0}),e,n);else throw Error("Set items must all have null values")}static from(t,e,n){let{replacer:i}=n,o=new this(t);if(e&&Symbol.iterator in Object(e))for(let r of e){if(typeof i==="function")r=i.call(e,r,r);o.items.push(j1.createPair(r,null,n))}return o}}Ae.tag="tag:yaml.org,2002:set";var hp={collection:"map",identify:(t)=>t instanceof Set,nodeClass:Ae,default:!1,tag:"tag:yaml.org,2002:set",createNode:(t,e,n)=>Ae.from(t,e,n),resolve(t,e){if(O1.isMap(t))if(t.hasAllNullValues(!0))return Object.assign(new Ae,t);else e("Set items must all have null values");else e("Expected a mapping for this tag");return t}};gp.YAMLSet=Ae;gp.set=hp});var $i=k(function(bp){var kp=Ge();function Ei(t,e){let n=t[0],i=n==="-"||n==="+"?t.substring(1):t,o=(s)=>e?BigInt(s):Number(s),r=i.replace(/_/g,"").split(":").reduce((s,l)=>s*o(60)+o(l),o(0));return n==="-"?o(-1)*r:r}function _r(t){let{value:e}=t,n=(s)=>s;if(typeof e==="bigint")n=(s)=>BigInt(s);else if(isNaN(e)||!isFinite(e))return kp.stringifyNumber(t);let i="";if(e<0)i="-",e*=n(-1);let o=n(60),r=[e%o];if(e<60)r.unshift(0);else if(e=(e-r[0])/o,r.unshift(e%o),e>=60)e=(e-r[0])/o,r.unshift(e);return i+r.map((s)=>String(s).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var vp={identify:(t)=>typeof t==="bigint"||Number.isInteger(t),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(t,e,{intAsBigInt:n})=>Ei(t,n),stringify:_r},wp={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:(t)=>Ei(t,!1),stringify:_r},xr={identify:(t)=>t instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(t){let e=t.match(xr.test);if(!e)throw Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,n,i,o,r,s,l]=e.map(Number),a=e[7]?Number((e[7]+"00").substr(1,3)):0,c=Date.UTC(n,i-1,o,r||0,s||0,l||0,a),u=e[8];if(u&&u!=="Z"){let f=Ei(u,!1);if(Math.abs(f)<30)f*=60;c-=60000*f}return new Date(c)},stringify:({value:t})=>t?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""};bp.floatTime=wp;bp.intTime=vp;bp.timestamp=xr});var $r=k(function(Op){var xp=Ue(),Ep=$1(),$p=He(),Mp=S0(),Lp=vi(),Er=wr(),Mi=br(),N1=Cr(),Sp=v1(),Ap=Fi(),Dp=A1(),jp=xi(),Li=$i(),Pp=[xp.map,$p.seq,Mp.string,Ep.nullTag,Er.trueTag,Er.falseTag,N1.intBin,N1.intOct,N1.int,N1.intHex,Mi.floatNaN,Mi.floatExp,Mi.float,Lp.binary,Sp.merge,Ap.omap,Dp.pairs,jp.set,Li.intTime,Li.floatTime,Li.timestamp];Op.schema=Pp});var Tr=k(function(Kp){var Ar=Ue(),Tp=$1(),Dr=He(),Ip=S0(),zp=fi(),Si=di(),Ai=gi(),qp=cr(),Bp=fr(),jr=vi(),P0=v1(),Pr=Fi(),Or=A1(),Mr=$r(),Nr=xi(),T1=$i(),Lr=new Map([["core",qp.schema],["failsafe",[Ar.map,Dr.seq,Ip.string]],["json",Bp.schema],["yaml11",Mr.schema],["yaml-1.1",Mr.schema]]),Sr={binary:jr.binary,bool:zp.boolTag,float:Si.float,floatExp:Si.floatExp,floatNaN:Si.floatNaN,floatTime:T1.floatTime,int:Ai.int,intHex:Ai.intHex,intOct:Ai.intOct,intTime:T1.intTime,map:Ar.map,merge:P0.merge,null:Tp.nullTag,omap:Pr.omap,pairs:Or.pairs,seq:Dr.seq,set:Nr.set,timestamp:T1.timestamp},Rp={"tag:yaml.org,2002:binary":jr.binary,"tag:yaml.org,2002:merge":P0.merge,"tag:yaml.org,2002:omap":Pr.omap,"tag:yaml.org,2002:pairs":Or.pairs,"tag:yaml.org,2002:set":Nr.set,"tag:yaml.org,2002:timestamp":T1.timestamp};function Vp(t,e,n){let i=Lr.get(e);if(i&&!t)return n&&!i.includes(P0.merge)?i.concat(P0.merge):i.slice();let o=i;if(!o)if(Array.isArray(t))o=[];else{let r=Array.from(Lr.keys()).filter((s)=>s!=="yaml11").map((s)=>JSON.stringify(s)).join(", ");throw Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`)}if(Array.isArray(t))for(let r of t)o=o.concat(r);else if(typeof t==="function")o=t(o.slice());if(n)o=o.concat(P0.merge);return o.reduce((r,s)=>{let l=typeof s==="string"?Sr[s]:s;if(!l){let a=JSON.stringify(s),c=Object.keys(Sr).map((u)=>JSON.stringify(u)).join(", ");throw Error(`Unknown custom tag ${a}; use one of ${c}`)}if(!r.includes(l))r.push(l);return r},[])}Kp.coreKnownTags=Rp;Kp.getTags=Vp});var Pi=k(function(Zp){var Di=B(),Gp=Ue(),Jp=He(),Yp=S0(),I1=Tr(),Wp=(t,e)=>t.key<e.key?-1:t.key>e.key?1:0;class ji{constructor({compat:t,customTags:e,merge:n,resolveKnownTags:i,schema:o,sortMapEntries:r,toStringDefaults:s}){this.compat=Array.isArray(t)?I1.getTags(t,"compat"):t?I1.getTags(null,t):null,this.name=typeof o==="string"&&o||"core",this.knownTags=i?I1.coreKnownTags:{},this.tags=I1.getTags(e,this.name,n),this.toStringOptions=s??null,Object.defineProperty(this,Di.MAP,{value:Gp.map}),Object.defineProperty(this,Di.SCALAR,{value:Yp.string}),Object.defineProperty(this,Di.SEQ,{value:Jp.seq}),this.sortMapEntries=typeof r==="function"?r:r===!0?Wp:null}clone(){let t=Object.create(ji.prototype,Object.getOwnPropertyDescriptors(this));return t.tags=this.tags.slice(),t}}Zp.Schema=ji});var Ir=k(function(ef){var Xp=B(),Oi=$0(),O0=_0();function tf(t,e){let n=[],i=e.directives===!0;if(e.directives!==!1&&t.directives){let a=t.directives.toString(t);if(a)n.push(a),i=!0;else if(t.directives.docStart)i=!0}if(i)n.push("---");let o=Oi.createStringifyContext(t,e),{commentString:r}=o.options;if(t.commentBefore){if(n.length!==1)n.unshift("");let a=r(t.commentBefore);n.unshift(O0.indentComment(a,""))}let s=!1,l=null;if(t.contents){if(Xp.isNode(t.contents)){if(t.contents.spaceBefore&&i)n.push("");if(t.contents.commentBefore){let u=r(t.contents.commentBefore);n.push(O0.indentComment(u,""))}o.forceBlockIndent=!!t.comment,l=t.contents.comment}let a=l?void 0:()=>s=!0,c=Oi.stringify(t.contents,o,()=>l=null,a);if(l)c+=O0.lineComment(c,"",r(l));if((c[0]==="|"||c[0]===">")&&n[n.length-1]==="---")n[n.length-1]=`--- ${c}`;else n.push(c)}else n.push(Oi.stringify(t.contents,o));if(t.directives?.docEnd)if(t.comment){let a=r(t.comment);if(a.includes(`
`))n.push("..."),n.push(O0.indentComment(a,""));else n.push(`... ${a}`)}else n.push("...");else{let a=t.comment;if(a&&s)a=a.replace(/^\n+/,"");if(a){if((!s||l)&&n[n.length-1]!=="")n.push("");n.push(O0.indentComment(r(a),""))}}return n.join(`
`)+`
`}ef.stringifyDocument=tf});var N0=k(function(ff){var of=F0(),Je=u1(),Ft=B(),rf=ie(),sf=te(),lf=Pi(),af=Ir(),Ni=c1(),cf=ei(),pf=C0(),Ti=ti();class Ii{constructor(t,e,n){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Ft.NODE_TYPE,{value:Ft.DOC});let i=null;if(typeof e==="function"||Array.isArray(e))i=e;else if(n===void 0&&e)n=e,e=void 0;let o=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},n);this.options=o;let{version:r}=o;if(n?._directives){if(this.directives=n._directives.atDocument(),this.directives.yaml.explicit)r=this.directives.yaml.version}else this.directives=new Ti.Directives({version:r});this.setSchema(r,n),this.contents=t===void 0?null:this.createNode(t,i,n)}clone(){let t=Object.create(Ii.prototype,{[Ft.NODE_TYPE]:{value:Ft.DOC}});if(t.commentBefore=this.commentBefore,t.comment=this.comment,t.errors=this.errors.slice(),t.warnings=this.warnings.slice(),t.options=Object.assign({},this.options),this.directives)t.directives=this.directives.clone();if(t.schema=this.schema.clone(),t.contents=Ft.isNode(this.contents)?this.contents.clone(t.schema):this.contents,this.range)t.range=this.range.slice();return t}add(t){if(Ye(this.contents))this.contents.add(t)}addIn(t,e){if(Ye(this.contents))this.contents.addIn(t,e)}createAlias(t,e){if(!t.anchor){let n=Ni.anchorNames(this);t.anchor=!e||n.has(e)?Ni.findNewAnchor(e||"a",n):e}return new of.Alias(t.anchor)}createNode(t,e,n){let i=void 0;if(typeof e==="function")t=e.call({"":t},"",t),i=e;else if(Array.isArray(e)){let p=(y)=>typeof y==="number"||y instanceof String||y instanceof Number,g=e.filter(p).map(String);if(g.length>0)e=e.concat(g);i=e}else if(n===void 0&&e)n=e,e=void 0;let{aliasDuplicateObjects:o,anchorPrefix:r,flow:s,keepUndefined:l,onTagObj:a,tag:c}=n??{},{onAnchor:u,setAnchors:f,sourceObjects:d}=Ni.createNodeAnchors(this,r||"a"),h={aliasDuplicateObjects:o??!0,keepUndefined:l??!1,onAnchor:u,onTagObj:a,replacer:i,schema:this.schema,sourceObjects:d},m=pf.createNode(t,c,h);if(s&&Ft.isCollection(m))m.flow=!0;return f(),m}createPair(t,e,n={}){let i=this.createNode(t,null,n),o=this.createNode(e,null,n);return new rf.Pair(i,o)}delete(t){return Ye(this.contents)?this.contents.delete(t):!1}deleteIn(t){if(Je.isEmptyPath(t)){if(this.contents==null)return!1;return this.contents=null,!0}return Ye(this.contents)?this.contents.deleteIn(t):!1}get(t,e){return Ft.isCollection(this.contents)?this.contents.get(t,e):void 0}getIn(t,e){if(Je.isEmptyPath(t))return!e&&Ft.isScalar(this.contents)?this.contents.value:this.contents;return Ft.isCollection(this.contents)?this.contents.getIn(t,e):void 0}has(t){return Ft.isCollection(this.contents)?this.contents.has(t):!1}hasIn(t){if(Je.isEmptyPath(t))return this.contents!==void 0;return Ft.isCollection(this.contents)?this.contents.hasIn(t):!1}set(t,e){if(this.contents==null)this.contents=Je.collectionFromPath(this.schema,[t],e);else if(Ye(this.contents))this.contents.set(t,e)}setIn(t,e){if(Je.isEmptyPath(t))this.contents=e;else if(this.contents==null)this.contents=Je.collectionFromPath(this.schema,Array.from(t),e);else if(Ye(this.contents))this.contents.setIn(t,e)}setSchema(t,e={}){if(typeof t==="number")t=String(t);let n;switch(t){case"1.1":if(this.directives)this.directives.yaml.version="1.1";else this.directives=new Ti.Directives({version:"1.1"});n={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":if(this.directives)this.directives.yaml.version=t;else this.directives=new Ti.Directives({version:t});n={resolveKnownTags:!0,schema:"core"};break;case null:if(this.directives)delete this.directives;n=null;break;default:{let i=JSON.stringify(t);throw Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(e.schema instanceof Object)this.schema=e.schema;else if(n)this.schema=new lf.Schema(Object.assign(n,e));else throw Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:t,jsonArg:e,mapAsMap:n,maxAliasCount:i,onAnchor:o,reviver:r}={}){let s={anchors:new Map,doc:this,keep:!t,mapAsMap:n===!0,mapKeyWarned:!1,maxAliasCount:typeof i==="number"?i:100},l=sf.toJS(this.contents,e??"",s);if(typeof o==="function")for(let{count:a,res:c}of s.anchors.values())o(c,a);return typeof r==="function"?cf.applyReviver(r,{"":l},"",l):l}toJSON(t,e){return this.toJS({json:!0,jsonArg:t,mapAsMap:!1,onAnchor:e})}toString(t={}){if(this.errors.length>0)throw Error("Document with errors cannot be stringified");if("indent"in t&&(!Number.isInteger(t.indent)||Number(t.indent)<=0)){let e=JSON.stringify(t.indent);throw Error(`"indent" option must be a positive integer, not ${e}`)}return af.stringifyDocument(this,t)}}function Ye(t){if(Ft.isCollection(t))return!0;throw Error("Expected a YAML collection as document contents")}ff.Document=Ii});var T0=k(function(hf){class z1 extends Error{constructor(t,e,n,i){super();this.name=t,this.code=n,this.message=i,this.pos=e}}class zr extends z1{constructor(t,e,n){super("YAMLParseError",t,e,n)}}class qr extends z1{constructor(t,e,n){super("YAMLWarning",t,e,n)}}var df=(t,e)=>(n)=>{if(n.pos[0]===-1)return;n.linePos=n.pos.map((l)=>e.linePos(l));let{line:i,col:o}=n.linePos[0];n.message+=` at line ${i}, column ${o}`;let r=o-1,s=t.substring(e.lineStarts[i-1],e.lineStarts[i]).replace(/[\n\r]+$/,"");if(r>=60&&s.length>80){let l=Math.min(r-39,s.length-79);s="\u2026"+s.substring(l),r-=l-1}if(s.length>80)s=s.substring(0,79)+"\u2026";if(i>1&&/^ *$/.test(s.substring(0,r))){let l=t.substring(e.lineStarts[i-2],e.lineStarts[i-1]);if(l.length>80)l=l.substring(0,79)+`\u2026
`;s=l+s}if(/[^ ]/.test(s)){let l=1,a=n.linePos[1];if(a?.line===i&&a.col>o)l=Math.max(1,Math.min(a.col-o,80-r));let c=" ".repeat(r)+"^".repeat(l);n.message+=`:

${s}
${c}
`}};hf.YAMLError=z1;hf.YAMLParseError=zr;hf.YAMLWarning=qr;hf.prettifyError=df});var I0=k(function(wf){function vf(t,{flow:e,indicator:n,next:i,offset:o,onError:r,parentIndent:s,startOnNewline:l}){let a=!1,c=l,u=l,f="",d="",h=!1,m=!1,p=null,g=null,y=null,v=null,w=null,C=null,F=null;for(let M of t){if(m){if(M.type!=="space"&&M.type!=="newline"&&M.type!=="comma")r(M.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space");m=!1}if(p){if(c&&M.type!=="comment"&&M.type!=="newline")r(p,"TAB_AS_INDENT","Tabs are not allowed as indentation");p=null}switch(M.type){case"space":if(!e&&(n!=="doc-start"||i?.type!=="flow-collection")&&M.source.includes("\t"))p=M;u=!0;break;case"comment":{if(!u)r(M,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let j=M.source.substring(1)||" ";if(!f)f=j;else f+=d+j;d="",c=!1;break}case"newline":if(c){if(f)f+=M.source;else if(!C||n!=="seq-item-ind")a=!0}else d+=M.source;if(c=!0,h=!0,g||y)v=M;u=!0;break;case"anchor":if(g)r(M,"MULTIPLE_ANCHORS","A node can have at most one anchor");if(M.source.endsWith(":"))r(M.offset+M.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0);g=M,F??(F=M.offset),c=!1,u=!1,m=!0;break;case"tag":{if(y)r(M,"MULTIPLE_TAGS","A node can have at most one tag");y=M,F??(F=M.offset),c=!1,u=!1,m=!0;break}case n:if(g||y)r(M,"BAD_PROP_ORDER",`Anchors and tags must be after the ${M.source} indicator`);if(C)r(M,"UNEXPECTED_TOKEN",`Unexpected ${M.source} in ${e??"collection"}`);C=M,c=n==="seq-item-ind"||n==="explicit-key-ind",u=!1;break;case"comma":if(e){if(w)r(M,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`);w=M,c=!1,u=!1;break}default:r(M,"UNEXPECTED_TOKEN",`Unexpected ${M.type} token`),c=!1,u=!1}}let x=t[t.length-1],A=x?x.offset+x.source.length:o;if(m&&i&&i.type!=="space"&&i.type!=="newline"&&i.type!=="comma"&&(i.type!=="scalar"||i.source!==""))r(i.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space");if(p&&(c&&p.indent<=s||i?.type==="block-map"||i?.type==="block-seq"))r(p,"TAB_AS_INDENT","Tabs are not allowed as indentation");return{comma:w,found:C,spaceBefore:a,comment:f,hasNewline:h,anchor:g,tag:y,newlineAfterProp:v,end:A,start:F??A}}wf.resolveProps=vf});var q1=k(function(Ff){function zi(t){if(!t)return null;switch(t.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(t.source.includes(`
`))return!0;if(t.end){for(let e of t.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of t.items){for(let n of e.start)if(n.type==="newline")return!0;if(e.sep){for(let n of e.sep)if(n.type==="newline")return!0}if(zi(e.key)||zi(e.value))return!0}return!1;default:return!0}}Ff.containsNewline=zi});var qi=k(function(Ef){var _f=q1();function xf(t,e,n){if(e?.type==="flow-collection"){let i=e.end[0];if(i.indent===t&&(i.source==="]"||i.source==="}")&&_f.containsNewline(e))n(i,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}Ef.flowIndentCheck=xf});var Bi=k(function(Lf){var Br=B();function Mf(t,e,n){let{uniqueKeys:i}=t.options;if(i===!1)return!1;let o=typeof i==="function"?i:(r,s)=>r===s||Br.isScalar(r)&&Br.isScalar(s)&&r.value===s.value;return e.some((r)=>o(r.key,n))}Lf.mapIncludes=Mf});var Hr=k(function(Of){var Rr=ie(),Af=re(),Vr=I0(),Df=q1(),Kr=qi(),jf=Bi(),Ur="All mapping items must start at the same column";function Pf({composeNode:t,composeEmptyNode:e},n,i,o,r){let l=new(r?.nodeClass??Af.YAMLMap)(n.schema);if(n.atRoot)n.atRoot=!1;let a=i.offset,c=null;for(let u of i.items){let{start:f,key:d,sep:h,value:m}=u,p=Vr.resolveProps(f,{indicator:"explicit-key-ind",next:d??h?.[0],offset:a,onError:o,parentIndent:i.indent,startOnNewline:!0}),g=!p.found;if(g){if(d){if(d.type==="block-seq")o(a,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key");else if("indent"in d&&d.indent!==i.indent)o(a,"BAD_INDENT",Ur)}if(!p.anchor&&!p.tag&&!h){if(c=p.end,p.comment)if(l.comment)l.comment+=`
`+p.comment;else l.comment=p.comment;continue}if(p.newlineAfterProp||Df.containsNewline(d))o(d??f[f.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else if(p.found?.indent!==i.indent)o(a,"BAD_INDENT",Ur);n.atKey=!0;let y=p.end,v=d?t(n,d,p,o):e(n,y,f,null,p,o);if(n.schema.compat)Kr.flowIndentCheck(i.indent,d,o);if(n.atKey=!1,jf.mapIncludes(n,l.items,v))o(y,"DUPLICATE_KEY","Map keys must be unique");let w=Vr.resolveProps(h??[],{indicator:"map-value-ind",next:m,offset:v.range[2],onError:o,parentIndent:i.indent,startOnNewline:!d||d.type==="block-scalar"});if(a=w.end,w.found){if(g){if(m?.type==="block-map"&&!w.hasNewline)o(a,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings");if(n.options.strict&&p.start<w.found.offset-1024)o(v.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key")}let C=m?t(n,m,w,o):e(n,a,h,null,w,o);if(n.schema.compat)Kr.flowIndentCheck(i.indent,m,o);a=C.range[2];let F=new Rr.Pair(v,C);if(n.options.keepSourceTokens)F.srcToken=u;l.items.push(F)}else{if(g)o(v.range,"MISSING_CHAR","Implicit map keys need to be followed by map values");if(w.comment)if(v.comment)v.comment+=`
`+w.comment;else v.comment=w.comment;let C=new Rr.Pair(v);if(n.options.keepSourceTokens)C.srcToken=u;l.items.push(C)}}if(c&&c<a)o(c,"IMPOSSIBLE","Map comment with trailing content");return l.range=[i.offset,a,c??a],l}Of.resolveBlockMap=Pf});var Gr=k(function(Bf){var Tf=se(),If=I0(),zf=qi();function qf({composeNode:t,composeEmptyNode:e},n,i,o,r){let l=new(r?.nodeClass??Tf.YAMLSeq)(n.schema);if(n.atRoot)n.atRoot=!1;if(n.atKey)n.atKey=!1;let a=i.offset,c=null;for(let{start:u,value:f}of i.items){let d=If.resolveProps(u,{indicator:"seq-item-ind",next:f,offset:a,onError:o,parentIndent:i.indent,startOnNewline:!0});if(!d.found)if(d.anchor||d.tag||f)if(f?.type==="block-seq")o(d.end,"BAD_INDENT","All sequence items must start at the same column");else o(a,"MISSING_CHAR","Sequence item without - indicator");else{if(c=d.end,d.comment)l.comment=d.comment;continue}let h=f?t(n,f,d,o):e(n,d.end,u,null,d,o);if(n.schema.compat)zf.flowIndentCheck(i.indent,f,o);a=h.range[2],l.items.push(h)}return l.range=[i.offset,a,c??a],l}Bf.resolveBlockSeq=qf});var We=k(function(Kf){function Vf(t,e,n,i){let o="";if(t){let r=!1,s="";for(let l of t){let{source:a,type:c}=l;switch(c){case"space":r=!0;break;case"comment":{if(n&&!r)i(l,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let u=a.substring(1)||" ";if(!o)o=u;else o+=s+u;s="";break}case"newline":if(o)s+=a;r=!0;break;default:i(l,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=a.length}}return{comment:o,offset:e}}Kf.resolveEnd=Vf});var Wr=k(function(Xf){var Hf=B(),Gf=ie(),Jr=re(),Jf=se(),Yf=We(),Yr=I0(),Wf=q1(),Zf=Bi(),Ri="Block collections are not allowed within flow collections",Vi=(t)=>t&&(t.type==="block-map"||t.type==="block-seq");function Qf({composeNode:t,composeEmptyNode:e},n,i,o,r){let s=i.start.source==="{",l=s?"flow map":"flow sequence",c=new(r?.nodeClass??(s?Jr.YAMLMap:Jf.YAMLSeq))(n.schema);c.flow=!0;let u=n.atRoot;if(u)n.atRoot=!1;if(n.atKey)n.atKey=!1;let f=i.offset+i.start.source.length;for(let g=0;g<i.items.length;++g){let y=i.items[g],{start:v,key:w,sep:C,value:F}=y,x=Yr.resolveProps(v,{flow:l,indicator:"explicit-key-ind",next:w??C?.[0],offset:f,onError:o,parentIndent:i.indent,startOnNewline:!1});if(!x.found){if(!x.anchor&&!x.tag&&!C&&!F){if(g===0&&x.comma)o(x.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${l}`);else if(g<i.items.length-1)o(x.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${l}`);if(x.comment)if(c.comment)c.comment+=`
`+x.comment;else c.comment=x.comment;f=x.end;continue}if(!s&&n.options.strict&&Wf.containsNewline(w))o(w,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(g===0){if(x.comma)o(x.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${l}`)}else{if(!x.comma)o(x.start,"MISSING_CHAR",`Missing , between ${l} items`);if(x.comment){let A="";t:for(let M of v)switch(M.type){case"comma":case"space":break;case"comment":A=M.source.substring(1);break t;default:break t}if(A){let M=c.items[c.items.length-1];if(Hf.isPair(M))M=M.value??M.key;if(M.comment)M.comment+=`
`+A;else M.comment=A;x.comment=x.comment.substring(A.length+1)}}}if(!s&&!C&&!x.found){let A=F?t(n,F,x,o):e(n,x.end,C,null,x,o);if(c.items.push(A),f=A.range[2],Vi(F))o(A.range,"BLOCK_IN_FLOW",Ri)}else{n.atKey=!0;let A=x.end,M=w?t(n,w,x,o):e(n,A,v,null,x,o);if(Vi(w))o(M.range,"BLOCK_IN_FLOW",Ri);n.atKey=!1;let j=Yr.resolveProps(C??[],{flow:l,indicator:"map-value-ind",next:F,offset:M.range[2],onError:o,parentIndent:i.indent,startOnNewline:!1});if(j.found){if(!s&&!x.found&&n.options.strict){if(C)for(let q of C){if(q===j.found)break;if(q.type==="newline"){o(q,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}if(x.start<j.found.offset-1024)o(j.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else if(F)if("source"in F&&F.source?.[0]===":")o(F,"MISSING_CHAR",`Missing space after : in ${l}`);else o(j.start,"MISSING_CHAR",`Missing , or : between ${l} items`);let V=F?t(n,F,j,o):j.found?e(n,j.end,C,null,j,o):null;if(V){if(Vi(F))o(V.range,"BLOCK_IN_FLOW",Ri)}else if(j.comment)if(M.comment)M.comment+=`
`+j.comment;else M.comment=j.comment;let W=new Gf.Pair(M,V);if(n.options.keepSourceTokens)W.srcToken=y;if(s){let q=c;if(Zf.mapIncludes(n,q.items,M))o(A,"DUPLICATE_KEY","Map keys must be unique");q.items.push(W)}else{let q=new Jr.YAMLMap(n.schema);q.flow=!0,q.items.push(W);let E=(V??M).range;q.range=[M.range[0],E[1],E[2]],c.items.push(q)}f=V?V.range[2]:j.end}}let d=s?"}":"]",[h,...m]=i.end,p=f;if(h?.source===d)p=h.offset+h.source.length;else{let g=l[0].toUpperCase()+l.substring(1),y=u?`${g} must end with a ${d}`:`${g} in block collection must be sufficiently indented and end with a ${d}`;if(o(f,u?"MISSING_CHAR":"BAD_INDENT",y),h&&h.source.length!==1)m.unshift(h)}if(m.length>0){let g=Yf.resolveEnd(m,p,n.options.strict,o);if(g.comment)if(c.comment)c.comment+=`
`+g.comment;else c.comment=g.comment;c.range=[i.offset,p,g.offset]}else c.range=[i.offset,p,p];return c}Xf.resolveFlowCollection=Qf});var Zr=k(function(cu){var eu=B(),nu=nt(),iu=re(),ou=se(),ru=Hr(),su=Gr(),lu=Wr();function Ki(t,e,n,i,o,r){let s=n.type==="block-map"?ru.resolveBlockMap(t,e,n,i,r):n.type==="block-seq"?su.resolveBlockSeq(t,e,n,i,r):lu.resolveFlowCollection(t,e,n,i,r),l=s.constructor;if(o==="!"||o===l.tagName)return s.tag=l.tagName,s;if(o)s.tag=o;return s}function au(t,e,n,i,o){let r=i.tag,s=!r?null:e.directives.tagName(r.source,(d)=>o(r,"TAG_RESOLVE_FAILED",d));if(n.type==="block-seq"){let{anchor:d,newlineAfterProp:h}=i,m=d&&r?d.offset>r.offset?d:r:d??r;if(m&&(!h||h.offset<m.offset))o(m,"MISSING_CHAR","Missing newline after block sequence props")}let l=n.type==="block-map"?"map":n.type==="block-seq"?"seq":n.start.source==="{"?"map":"seq";if(!r||!s||s==="!"||s===iu.YAMLMap.tagName&&l==="map"||s===ou.YAMLSeq.tagName&&l==="seq")return Ki(t,e,n,o,s);let a=e.schema.tags.find((d)=>d.tag===s&&d.collection===l);if(!a){let d=e.schema.knownTags[s];if(d?.collection===l)e.schema.tags.push(Object.assign({},d,{default:!1})),a=d;else{if(d)o(r,"BAD_COLLECTION_TYPE",`${d.tag} used for ${l} collection, but expects ${d.collection??"scalar"}`,!0);else o(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${s}`,!0);return Ki(t,e,n,o,s)}}let c=Ki(t,e,n,o,s,a),u=a.resolve?.(c,(d)=>o(r,"TAG_RESOLVE_FAILED",d),e.options)??c,f=eu.isNode(u)?u:new nu.Scalar(u);if(f.range=c.range,f.tag=s,a?.format)f.format=a.format;return f}cu.composeCollection=au});var Hi=k(function(hu){var Ui=nt();function fu(t,e,n){let i=e.offset,o=uu(e,t.options.strict,n);if(!o)return{value:"",type:null,comment:"",range:[i,i,i]};let r=o.mode===">"?Ui.Scalar.BLOCK_FOLDED:Ui.Scalar.BLOCK_LITERAL,s=e.source?du(e.source):[],l=s.length;for(let p=s.length-1;p>=0;--p){let g=s[p][1];if(g===""||g==="\r")l=p;else break}if(l===0){let p=o.chomp==="+"&&s.length>0?`
`.repeat(Math.max(1,s.length-1)):"",g=i+o.length;if(e.source)g+=e.source.length;return{value:p,type:r,comment:o.comment,range:[i,g,g]}}let a=e.indent+o.indent,c=e.offset+o.length,u=0;for(let p=0;p<l;++p){let[g,y]=s[p];if(y===""||y==="\r"){if(o.indent===0&&g.length>a)a=g.length}else{if(g.length<a)n(c+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator");if(o.indent===0)a=g.length;if(u=p,a===0&&!t.atRoot)n(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=g.length+y.length+1}for(let p=s.length-1;p>=l;--p)if(s[p][0].length>a)l=p+1;let f="",d="",h=!1;for(let p=0;p<u;++p)f+=s[p][0].slice(a)+`
`;for(let p=u;p<l;++p){let[g,y]=s[p];c+=g.length+y.length+1;let v=y[y.length-1]==="\r";if(v)y=y.slice(0,-1);if(y&&g.length<a){let C=`Block scalar lines must not be less indented than their ${o.indent?"explicit indentation indicator":"first line"}`;n(c-y.length-(v?2:1),"BAD_INDENT",C),g=""}if(r===Ui.Scalar.BLOCK_LITERAL)f+=d+g.slice(a)+y,d=`
`;else if(g.length>a||y[0]==="\t"){if(d===" ")d=`
`;else if(!h&&d===`
`)d=`

`;f+=d+g.slice(a)+y,d=`
`,h=!0}else if(y==="")if(d===`
`)f+=`
`;else d=`
`;else f+=d+y,d=" ",h=!1}switch(o.chomp){case"-":break;case"+":for(let p=l;p<s.length;++p)f+=`
`+s[p][0].slice(a);if(f[f.length-1]!==`
`)f+=`
`;break;default:f+=`
`}let m=i+o.length+e.source.length;return{value:f,type:r,comment:o.comment,range:[i,m,m]}}function uu({offset:t,props:e},n,i){if(e[0].type!=="block-scalar-header")return i(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:o}=e[0],r=o[0],s=0,l="",a=-1;for(let d=1;d<o.length;++d){let h=o[d];if(!l&&(h==="-"||h==="+"))l=h;else{let m=Number(h);if(!s&&m)s=m;else if(a===-1)a=t+d}}if(a!==-1)i(a,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${o}`);let c=!1,u="",f=o.length;for(let d=1;d<e.length;++d){let h=e[d];switch(h.type){case"space":c=!0;case"newline":f+=h.source.length;break;case"comment":if(n&&!c)i(h,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");f+=h.source.length,u=h.source.substring(1);break;case"error":i(h,"UNEXPECTED_TOKEN",h.message),f+=h.source.length;break;default:{let m=`Unexpected token in block scalar header: ${h.type}`;i(h,"UNEXPECTED_TOKEN",m);let p=h.source;if(p&&typeof p==="string")f+=p.length}}}return{mode:r,indent:s,chomp:l,comment:u,length:f}}function du(t){let e=t.split(/\n( *)/),n=e[0],i=n.match(/^( *)/),r=[i?.[1]?[i[1],n.slice(i[1].length)]:["",n]];for(let s=1;s<e.length;s+=2)r.push([e[s],e[s+1]]);return r}hu.resolveBlockScalar=fu});var Ji=k(function(_u){var Gi=nt(),mu=We();function yu(t,e,n){let{offset:i,type:o,source:r,end:s}=t,l,a,c=(d,h,m)=>n(i+d,h,m);switch(o){case"scalar":l=Gi.Scalar.PLAIN,a=ku(r,c);break;case"single-quoted-scalar":l=Gi.Scalar.QUOTE_SINGLE,a=vu(r,c);break;case"double-quoted-scalar":l=Gi.Scalar.QUOTE_DOUBLE,a=wu(r,c);break;default:return n(t,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${o}`),{value:"",type:null,comment:"",range:[i,i+r.length,i+r.length]}}let u=i+r.length,f=mu.resolveEnd(s,u,e,n);return{value:a,type:l,comment:f.comment,range:[i,u,f.offset]}}function ku(t,e){let n="";switch(t[0]){case"\t":n="a tab character";break;case",":n="flow indicator character ,";break;case"%":n="directive indicator character %";break;case"|":case">":{n=`block scalar indicator ${t[0]}`;break}case"@":case"`":{n=`reserved character ${t[0]}`;break}}if(n)e(0,"BAD_SCALAR_START",`Plain value cannot start with ${n}`);return Qr(t)}function vu(t,e){if(t[t.length-1]!=="'"||t.length===1)e(t.length,"MISSING_CHAR","Missing closing 'quote");return Qr(t.slice(1,-1)).replace(/''/g,"'")}function Qr(t){let e=/(.*?)\r?\n/sy,n=e.exec(t);if(!n)return t;let i,o;try{i=new RegExp("(?<![ \t])[ \t]+$"),o=new RegExp("^[ \t]+|(?<![ \t])[ \t]+$","g")}catch{i=/[ \t]+$/,o=/^[ \t]+|[ \t]+$/g}let r=n[1].replace(i,""),s=" ",l=e.lastIndex;while(n=e.exec(t)){let c=n[1].replace(o,"");if(c==="")if(s===`
`)r+=s;else s=`
`;else r+=s+c,s=" ";l=e.lastIndex}let a=/[ \t]*(.*)/sy;return a.lastIndex=l,n=a.exec(t),r+s+(n?.[1]??"")}function wu(t,e){let n="";for(let i=1;i<t.length-1;++i){let o=t[i];if(o==="\r"&&t[i+1]===`
`)continue;if(o===`
`){let{fold:r,offset:s}=bu(t,i);n+=r,i=s}else if(o==="\\"){let r=t[++i],s=Fu[r];if(s)n+=s;else if(r===`
`){r=t[i+1];while(r===" "||r==="\t")r=t[++i+1]}else if(r==="\r"&&t[i+1]===`
`){r=t[++i+1];while(r===" "||r==="\t")r=t[++i+1]}else if(r==="x"||r==="u"||r==="U"){let l=r==="x"?2:r==="u"?4:8;n+=Cu(t,i+1,l,e),i+=l}else{let l=t.substr(i-1,2);e(i-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${l}`),n+=l}}else if(o===" "||o==="\t"){let r=i,s=t[i+1];while(s===" "||s==="\t")s=t[++i+1];if(s!==`
`&&!(s==="\r"&&t[i+2]===`
`))n+=i>r?t.slice(r,i+1):o}else n+=o}if(t[t.length-1]!=='"'||t.length===1)e(t.length,"MISSING_CHAR",'Missing closing "quote');return n}function bu(t,e){let n="",i=t[e+1];while(i===" "||i==="\t"||i===`
`||i==="\r"){if(i==="\r"&&t[e+2]!==`
`)break;if(i===`
`)n+=`
`;e+=1,i=t[e+1]}if(!n)n=" ";return{fold:n,offset:e}}var Fu={"0":"\x00",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"\t",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","\t":"\t"};function Cu(t,e,n,i){let o=t.substr(e,n),s=o.length===n&&/^[0-9a-fA-F]+$/.test(o)?parseInt(o,16):NaN;try{return String.fromCodePoint(s)}catch{let l=t.substr(e-2,n+2);return i(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${l}`),l}}_u.resolveFlowScalar=yu});var ts=k(function(Au){var De=B(),Xr=nt(),Eu=Hi(),$u=Ji();function Mu(t,e,n,i){let{value:o,type:r,comment:s,range:l}=e.type==="block-scalar"?Eu.resolveBlockScalar(t,e,i):$u.resolveFlowScalar(e,t.options.strict,i),a=n?t.directives.tagName(n.source,(f)=>i(n,"TAG_RESOLVE_FAILED",f)):null,c;if(t.options.stringKeys&&t.atKey)c=t.schema[De.SCALAR];else if(a)c=Lu(t.schema,o,a,n,i);else if(e.type==="scalar")c=Su(t,o,e,i);else c=t.schema[De.SCALAR];let u;try{let f=c.resolve(o,(d)=>i(n??e,"TAG_RESOLVE_FAILED",d),t.options);u=De.isScalar(f)?f:new Xr.Scalar(f)}catch(f){let d=f instanceof Error?f.message:String(f);i(n??e,"TAG_RESOLVE_FAILED",d),u=new Xr.Scalar(o)}if(u.range=l,u.source=o,r)u.type=r;if(a)u.tag=a;if(c.format)u.format=c.format;if(s)u.comment=s;return u}function Lu(t,e,n,i,o){if(n==="!")return t[De.SCALAR];let r=[];for(let l of t.tags)if(!l.collection&&l.tag===n)if(l.default&&l.test)r.push(l);else return l;for(let l of r)if(l.test?.test(e))return l;let s=t.knownTags[n];if(s&&!s.collection)return t.tags.push(Object.assign({},s,{default:!1,test:void 0})),s;return o(i,"TAG_RESOLVE_FAILED",`Unresolved tag: ${n}`,n!=="tag:yaml.org,2002:str"),t[De.SCALAR]}function Su({atKey:t,directives:e,schema:n},i,o,r){let s=n.tags.find((l)=>(l.default===!0||t&&l.default==="key")&&l.test?.test(i))||n[De.SCALAR];if(n.compat){let l=n.compat.find((a)=>a.default&&a.test?.test(i))??n[De.SCALAR];if(s.tag!==l.tag){let a=e.tagString(s.tag),c=e.tagString(l.tag),u=`Value may be parsed as either ${a} or ${c}`;r(o,"TAG_RESOLVE_FAILED",u,!0)}}return s}Au.composeScalar=Mu});var es=k(function(Pu){function ju(t,e,n){if(e){n??(n=e.length);for(let i=n-1;i>=0;--i){let o=e[i];switch(o.type){case"space":case"comment":case"newline":t-=o.source.length;continue}o=e[++i];while(o?.type==="space")t+=o.source.length,o=e[++i];break}}return t}Pu.emptyScalarPosition=ju});var os=k(function(Vu){var Nu=F0(),Tu=B(),Iu=Zr(),ns=ts(),zu=We(),qu=es(),Bu={composeNode:is,composeEmptyNode:Yi};function is(t,e,n,i){let o=t.atKey,{spaceBefore:r,comment:s,anchor:l,tag:a}=n,c,u=!0;switch(e.type){case"alias":if(c=Ru(t,e,i),l||a)i(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":if(c=ns.composeScalar(t,e,a,i),l)c.anchor=l.source.substring(1);break;case"block-map":case"block-seq":case"flow-collection":try{if(c=Iu.composeCollection(Bu,t,e,n,i),l)c.anchor=l.source.substring(1)}catch(f){let d=f instanceof Error?f.message:String(f);i(e,"RESOURCE_EXHAUSTION",d)}break;default:{let f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;i(e,"UNEXPECTED_TOKEN",f),u=!1}}if(c??(c=Yi(t,e.offset,void 0,null,n,i)),l&&c.anchor==="")i(l,"BAD_ALIAS","Anchor cannot be an empty string");if(o&&t.options.stringKeys&&(!Tu.isScalar(c)||typeof c.value!=="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str"))i(a??e,"NON_STRING_KEY","With stringKeys, all keys must be strings");if(r)c.spaceBefore=!0;if(s)if(e.type==="scalar"&&e.source==="")c.comment=s;else c.commentBefore=s;if(t.options.keepSourceTokens&&u)c.srcToken=e;return c}function Yi(t,e,n,i,{spaceBefore:o,comment:r,anchor:s,tag:l,end:a},c){let u={type:"scalar",offset:qu.emptyScalarPosition(e,n,i),indent:-1,source:""},f=ns.composeScalar(t,u,l,c);if(s){if(f.anchor=s.source.substring(1),f.anchor==="")c(s,"BAD_ALIAS","Anchor cannot be an empty string")}if(o)f.spaceBefore=!0;if(r)f.comment=r,f.range[2]=a;return f}function Ru({options:t},{offset:e,source:n,end:i},o){let r=new Nu.Alias(n.substring(1));if(r.source==="")o(e,"BAD_ALIAS","Alias cannot be an empty string");if(r.source.endsWith(":"))o(e+n.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let s=e+n.length,l=zu.resolveEnd(i,s,t.strict,o);if(r.range=[e,s,l.offset],l.comment)r.comment=l.comment;return r}Vu.composeEmptyNode=Yi;Vu.composeNode=is});var ss=k(function(Wu){var Hu=N0(),rs=os(),Gu=We(),Ju=I0();function Yu(t,e,{offset:n,start:i,value:o,end:r},s){let l=Object.assign({_directives:e},t),a=new Hu.Document(void 0,l),c={atKey:!1,atRoot:!0,directives:a.directives,options:a.options,schema:a.schema},u=Ju.resolveProps(i,{indicator:"doc-start",next:o??r?.[0],offset:n,onError:s,parentIndent:0,startOnNewline:!0});if(u.found){if(a.directives.docStart=!0,o&&(o.type==="block-map"||o.type==="block-seq")&&!u.hasNewline)s(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")}a.contents=o?rs.composeNode(c,o,u,s):rs.composeEmptyNode(c,u.end,i,null,u,s);let f=a.contents.range[2],d=Gu.resolveEnd(r,f,!1,s);if(d.comment)a.comment=d.comment;return a.range=[n,f,d.offset],a}Wu.composeDoc=Yu});var Wi=k(function(id){var Qu=o1("process"),Xu=ti(),td=N0(),z0=T0(),ls=B(),ed=ss(),nd=We();function q0(t){if(typeof t==="number")return[t,t+1];if(Array.isArray(t))return t.length===2?t:[t[0],t[1]];let{offset:e,source:n}=t;return[e,e+(typeof n==="string"?n.length:1)]}function as(t){let e="",n=!1,i=!1;for(let o=0;o<t.length;++o){let r=t[o];switch(r[0]){case"#":e+=(e===""?"":i?`

`:`
`)+(r.substring(1)||" "),n=!0,i=!1;break;case"%":if(t[o+1]?.[0]!=="#")o+=1;n=!1;break;default:if(!n)i=!0;n=!1}}return{comment:e,afterEmptyLine:i}}class cs{constructor(t={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(e,n,i,o)=>{let r=q0(e);if(o)this.warnings.push(new z0.YAMLWarning(r,n,i));else this.errors.push(new z0.YAMLParseError(r,n,i))},this.directives=new Xu.Directives({version:t.version||"1.2"}),this.options=t}decorate(t,e){let{comment:n,afterEmptyLine:i}=as(this.prelude);if(n){let o=t.contents;if(e)t.comment=t.comment?`${t.comment}
${n}`:n;else if(i||t.directives.docStart||!o)t.commentBefore=n;else if(ls.isCollection(o)&&!o.flow&&o.items.length>0){let r=o.items[0];if(ls.isPair(r))r=r.key;let s=r.commentBefore;r.commentBefore=s?`${n}
${s}`:n}else{let r=o.commentBefore;o.commentBefore=r?`${n}
${r}`:n}}if(e){for(let o=0;o<this.errors.length;++o)t.errors.push(this.errors[o]);for(let o=0;o<this.warnings.length;++o)t.warnings.push(this.warnings[o])}else t.errors=this.errors,t.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:as(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(t,e=!1,n=-1){for(let i of t)yield*this.next(i);yield*this.end(e,n)}*next(t){if(Qu.env.LOG_STREAM)console.dir(t,{depth:null});switch(t.type){case"directive":this.directives.add(t.source,(e,n,i)=>{let o=q0(t);o[0]+=e,this.onError(o,"BAD_DIRECTIVE",n,i)}),this.prelude.push(t.source),this.atDirectives=!0;break;case"document":{let e=ed.composeDoc(this.options,this.directives,t,this.onError);if(this.atDirectives&&!e.directives.docStart)this.onError(t,"MISSING_CHAR","Missing directives-end/doc-start indicator line");if(this.decorate(e,!1),this.doc)yield this.doc;this.doc=e,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(t.source);break;case"error":{let e=t.source?`${t.message}: ${JSON.stringify(t.source)}`:t.message,n=new z0.YAMLParseError(q0(t),"UNEXPECTED_TOKEN",e);if(this.atDirectives||!this.doc)this.errors.push(n);else this.doc.errors.push(n);break}case"doc-end":{if(!this.doc){this.errors.push(new z0.YAMLParseError(q0(t),"UNEXPECTED_TOKEN","Unexpected doc-end without preceding document"));break}this.doc.directives.docEnd=!0;let e=nd.resolveEnd(t.end,t.offset+t.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),e.comment){let n=this.doc.comment;this.doc.comment=n?`${n}
${e.comment}`:e.comment}this.doc.range[2]=e.offset;break}default:this.errors.push(new z0.YAMLParseError(q0(t),"UNEXPECTED_TOKEN",`Unsupported token ${t.type}`))}}*end(t=!1,e=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(t){let n=Object.assign({_directives:this.directives},this.options),i=new td.Document(void 0,n);if(this.atDirectives)this.onError(e,"MISSING_CHAR","Missing directives-end indicator line");i.range=[0,e,e],this.decorate(i,!1),yield i}}}id.Composer=cs});var us=k(function(ud){var rd=Hi(),sd=Ji(),ld=T0(),ps=E0();function ad(t,e=!0,n){if(t){let i=(o,r,s)=>{let l=typeof o==="number"?o:Array.isArray(o)?o[0]:o.offset;if(n)n(l,r,s);else throw new ld.YAMLParseError([l,l+1],r,s)};switch(t.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return sd.resolveFlowScalar(t,e,i);case"block-scalar":return rd.resolveBlockScalar({options:{strict:e}},t,i)}}return null}function cd(t,e){let{implicitKey:n=!1,indent:i,inFlow:o=!1,offset:r=-1,type:s="PLAIN"}=e,l=ps.stringifyString({type:s,value:t},{implicitKey:n,indent:i>0?" ".repeat(i):"",inFlow:o,options:{blockQuote:!0,lineWidth:-1}}),a=e.end??[{type:"newline",offset:-1,indent:i,source:`
`}];switch(l[0]){case"|":case">":{let c=l.indexOf(`
`),u=l.substring(0,c),f=l.substring(c+1)+`
`,d=[{type:"block-scalar-header",offset:r,indent:i,source:u}];if(!fs(d,a))d.push({type:"newline",offset:-1,indent:i,source:`
`});return{type:"block-scalar",offset:r,indent:i,props:d,source:f}}case'"':return{type:"double-quoted-scalar",offset:r,indent:i,source:l,end:a};case"'":return{type:"single-quoted-scalar",offset:r,indent:i,source:l,end:a};default:return{type:"scalar",offset:r,indent:i,source:l,end:a}}}function pd(t,e,n={}){let{afterKey:i=!1,implicitKey:o=!1,inFlow:r=!1,type:s}=n,l="indent"in t?t.indent:null;if(i&&typeof l==="number")l+=2;if(!s)switch(t.type){case"single-quoted-scalar":s="QUOTE_SINGLE";break;case"double-quoted-scalar":s="QUOTE_DOUBLE";break;case"block-scalar":{let c=t.props[0];if(c.type!=="block-scalar-header")throw Error("Invalid block scalar header");s=c.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:s="PLAIN"}let a=ps.stringifyString({type:s,value:e},{implicitKey:o||l===null,indent:l!==null&&l>0?" ".repeat(l):"",inFlow:r,options:{blockQuote:!0,lineWidth:-1}});switch(a[0]){case"|":case">":fd(t,a);break;case'"':Zi(t,a,"double-quoted-scalar");break;case"'":Zi(t,a,"single-quoted-scalar");break;default:Zi(t,a,"scalar")}}function fd(t,e){let n=e.indexOf(`
`),i=e.substring(0,n),o=e.substring(n+1)+`
`;if(t.type==="block-scalar"){let r=t.props[0];if(r.type!=="block-scalar-header")throw Error("Invalid block scalar header");r.source=i,t.source=o}else{let{offset:r}=t,s="indent"in t?t.indent:-1,l=[{type:"block-scalar-header",offset:r,indent:s,source:i}];if(!fs(l,"end"in t?t.end:void 0))l.push({type:"newline",offset:-1,indent:s,source:`
`});for(let a of Object.keys(t))if(a!=="type"&&a!=="offset")delete t[a];Object.assign(t,{type:"block-scalar",indent:s,props:l,source:o})}}function fs(t,e){if(e)for(let n of e)switch(n.type){case"space":case"comment":t.push(n);break;case"newline":return t.push(n),!0}return!1}function Zi(t,e,n){switch(t.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":t.type=n,t.source=e;break;case"block-scalar":{let i=t.props.slice(1),o=e.length;if(t.props[0].type==="block-scalar-header")o-=t.props[0].source.length;for(let r of i)r.offset+=o;delete t.props,Object.assign(t,{type:n,source:e,end:i});break}case"block-map":case"block-seq":{let o={type:"newline",offset:t.offset+e.length,indent:t.indent,source:`
`};delete t.items,Object.assign(t,{type:n,source:e,end:[o]});break}default:{let i="indent"in t?t.indent:-1,o="end"in t&&Array.isArray(t.end)?t.end.filter((r)=>r.type==="space"||r.type==="comment"||r.type==="newline"):[];for(let r of Object.keys(t))if(r!=="type"&&r!=="offset")delete t[r];Object.assign(t,{type:n,indent:i,source:e,end:o})}}}ud.createScalarToken=cd;ud.resolveAsScalar=ad;ud.setScalarValue=pd});var ds=k(function(yd){var md=(t)=>("type"in t)?R1(t):B1(t);function R1(t){switch(t.type){case"block-scalar":{let e="";for(let n of t.props)e+=R1(n);return e+t.source}case"block-map":case"block-seq":{let e="";for(let n of t.items)e+=B1(n);return e}case"flow-collection":{let e=t.start.source;for(let n of t.items)e+=B1(n);for(let n of t.end)e+=n.source;return e}case"document":{let e=B1(t);if(t.end)for(let n of t.end)e+=n.source;return e}default:{let e=t.source;if("end"in t&&t.end)for(let n of t.end)e+=n.source;return e}}}function B1({start:t,key:e,sep:n,value:i}){let o="";for(let r of t)o+=r.source;if(e)o+=R1(e);if(n)for(let r of n)o+=r.source;if(i)o+=R1(i);return o}yd.stringify=md});var ms=k(function(wd){var Qi=Symbol("break visit"),vd=Symbol("skip children"),hs=Symbol("remove item");function je(t,e){if("type"in t&&t.type==="document")t={start:t.start,value:t.value};gs(Object.freeze([]),t,e)}je.BREAK=Qi;je.SKIP=vd;je.REMOVE=hs;je.itemAtPath=(t,e)=>{let n=t;for(let[i,o]of e){let r=n?.[i];if(r&&"items"in r)n=r.items[o];else return}return n};je.parentCollection=(t,e)=>{let n=je.itemAtPath(t,e.slice(0,-1)),i=e[e.length-1][0],o=n?.[i];if(o&&"items"in o)return o;throw Error("Parent collection not found")};function gs(t,e,n){let i=n(e,t);if(typeof i==="symbol")return i;for(let o of["key","value"]){let r=e[o];if(r&&"items"in r){for(let s=0;s<r.items.length;++s){let l=gs(Object.freeze(t.concat([[o,s]])),r.items[s],n);if(typeof l==="number")s=l-1;else if(l===Qi)return Qi;else if(l===hs)r.items.splice(s,1),s-=1}if(typeof i==="function"&&o==="key")i=i(e,t)}}return typeof i==="function"?i(e,t):i}wd.visit=je});var V1=k(function(Md){var Xi=us(),Fd=ds(),Cd=ms(),t2="\uFEFF",e2="\x02",n2="\x18",i2="\x1F",_d=(t)=>!!t&&("items"in t),xd=(t)=>!!t&&(t.type==="scalar"||t.type==="single-quoted-scalar"||t.type==="double-quoted-scalar"||t.type==="block-scalar");function Ed(t){switch(t){case t2:return"<BOM>";case e2:return"<DOC>";case n2:return"<FLOW_END>";case i2:return"<SCALAR>";default:return JSON.stringify(t)}}function $d(t){switch(t){case t2:return"byte-order-mark";case e2:return"doc-mode";case n2:return"flow-error-end";case i2:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(t[0]){case" ":case"\t":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}Md.createScalarToken=Xi.createScalarToken;Md.resolveAsScalar=Xi.resolveAsScalar;Md.setScalarValue=Xi.setScalarValue;Md.stringify=Fd.stringify;Md.visit=Cd.visit;Md.BOM=t2;Md.DOCUMENT=e2;Md.FLOW_END=n2;Md.SCALAR=i2;Md.isCollection=_d;Md.isScalar=xd;Md.prettyToken=Ed;Md.tokenType=$d});var r2=k(function(Kd){var B0=V1();function At(t){switch(t){case void 0:case" ":case`
`:case"\r":case"\t":return!0;default:return!1}}var ys=new Set("0123456789ABCDEFabcdef"),Rd=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),K1=new Set(",[]{}"),Vd=new Set(` ,[]{}
\r	`),o2=(t)=>!t||Vd.has(t);class ks{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(t,e=!1){if(t){if(typeof t!=="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+t:t,this.lineEndPos=null}this.atEnd=!e;let n=this.next??"stream";while(n&&(e||this.hasChars(1)))n=yield*this.parseNext(n)}atLineEnd(){let t=this.pos,e=this.buffer[t];while(e===" "||e==="\t")e=this.buffer[++t];if(!e||e==="#"||e===`
`)return!0;if(e==="\r")return this.buffer[t+1]===`
`;return!1}charAt(t){return this.buffer[this.pos+t]}continueScalar(t){let e=this.buffer[t];if(this.indentNext>0){let n=0;while(e===" ")e=this.buffer[++n+t];if(e==="\r"){let i=this.buffer[n+t+1];if(i===`
`||!i&&!this.atEnd)return t+n+1}return e===`
`||n>=this.indentNext||!e&&!this.atEnd?t+n:-1}if(e==="-"||e==="."){let n=this.buffer.substr(t,3);if((n==="---"||n==="...")&&At(this.buffer[t+3]))return-1}return t}getLine(){let t=this.lineEndPos;if(typeof t!=="number"||t!==-1&&t<this.pos)t=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=t;if(t===-1)return this.atEnd?this.buffer.substring(this.pos):null;if(this.buffer[t-1]==="\r")t-=1;return this.buffer.substring(this.pos,t)}hasChars(t){return this.pos+t<=this.buffer.length}setNext(t){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=t,null}peek(t){return this.buffer.substr(this.pos,t)}*parseNext(t){switch(t){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let t=this.getLine();if(t===null)return this.setNext("stream");if(t[0]===B0.BOM)yield*this.pushCount(1),t=t.substring(1);if(t[0]==="%"){let e=t.length,n=t.indexOf("#");while(n!==-1){let o=t[n-1];if(o===" "||o==="\t"){e=n-1;break}else n=t.indexOf("#",n+1)}while(!0){let o=t[e-1];if(o===" "||o==="\t")e-=1;else break}let i=(yield*this.pushCount(e))+(yield*this.pushSpaces(!0));return yield*this.pushCount(t.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){let e=yield*this.pushSpaces(!0);return yield*this.pushCount(t.length-e),yield*this.pushNewline(),"stream"}return yield B0.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let t=this.charAt(0);if(!t&&!this.atEnd)return this.setNext("line-start");if(t==="-"||t==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let e=this.peek(3);if((e==="---"||e==="...")&&At(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,e==="---"?"doc":"stream"}if(this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!At(this.charAt(1)))this.indentNext=this.indentValue;return yield*this.parseBlockStart()}*parseBlockStart(){let[t,e]=this.peek(2);if(!e&&!this.atEnd)return this.setNext("block-start");if((t==="-"||t==="?"||t===":")&&At(e)){let n=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=n,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let t=this.getLine();if(t===null)return this.setNext("doc");let e=yield*this.pushIndicators();switch(t[e]){case"#":yield*this.pushCount(t.length-e);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(o2),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return e+=yield*this.parseBlockScalarHeader(),e+=yield*this.pushSpaces(!0),yield*this.pushCount(t.length-e),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let t,e,n=-1;do{if(t=yield*this.pushNewline(),t>0)e=yield*this.pushSpaces(!1),this.indentValue=n=e;else e=0;e+=yield*this.pushSpaces(!0)}while(t+e>0);let i=this.getLine();if(i===null)return this.setNext("flow");if(n!==-1&&n<this.indentNext&&i[0]!=="#"||n===0&&(i.startsWith("---")||i.startsWith("..."))&&At(i[3])){if(!(n===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield B0.FLOW_END,yield*this.parseLineStart()}let o=0;while(i[o]===",")o+=yield*this.pushCount(1),o+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(o+=yield*this.pushIndicators(),i[o]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-o),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(o2),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let r=this.charAt(1);if(this.flowKey||At(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let t=this.charAt(0),e=this.buffer.indexOf(t,this.pos+1);if(t==="'")while(e!==-1&&this.buffer[e+1]==="'")e=this.buffer.indexOf("'",e+2);else while(e!==-1){let o=0;while(this.buffer[e-1-o]==="\\")o+=1;if(o%2===0)break;e=this.buffer.indexOf('"',e+1)}let n=this.buffer.substring(0,e),i=n.indexOf(`
`,this.pos);if(i!==-1){while(i!==-1){let o=this.continueScalar(i+1);if(o===-1)break;i=n.indexOf(`
`,o)}if(i!==-1)e=i-(n[i-1]==="\r"?2:1)}if(e===-1){if(!this.atEnd)return this.setNext("quoted-scalar");e=this.buffer.length}return yield*this.pushToIndex(e+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let t=this.pos;while(!0){let e=this.buffer[++t];if(e==="+")this.blockScalarKeep=!0;else if(e>"0"&&e<="9")this.blockScalarIndent=Number(e)-1;else if(e!=="-")break}return yield*this.pushUntil((e)=>At(e)||e==="#")}*parseBlockScalar(){let t=this.pos-1,e=0,n;t:for(let o=this.pos;n=this.buffer[o];++o)switch(n){case" ":e+=1;break;case`
`:t=o,e=0;break;case"\r":{let r=this.buffer[o+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break t}if(!n&&!this.atEnd)return this.setNext("block-scalar");if(e>=this.indentNext){if(this.blockScalarIndent===-1)this.indentNext=e;else this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let o=this.continueScalar(t+1);if(o===-1)break;t=this.buffer.indexOf(`
`,o)}while(t!==-1);if(t===-1){if(!this.atEnd)return this.setNext("block-scalar");t=this.buffer.length}}let i=t+1;n=this.buffer[i];while(n===" ")n=this.buffer[++i];if(n==="\t"){while(n==="\t"||n===" "||n==="\r"||n===`
`)n=this.buffer[++i];t=i-1}else if(!this.blockScalarKeep)do{let o=t-1,r=this.buffer[o];if(r==="\r")r=this.buffer[--o];let s=o;while(r===" ")r=this.buffer[--o];if(r===`
`&&o>=this.pos&&o+1+e>s)t=o;else break}while(!0);return yield B0.SCALAR,yield*this.pushToIndex(t+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let t=this.flowLevel>0,e=this.pos-1,n=this.pos-1,i;while(i=this.buffer[++n])if(i===":"){let o=this.buffer[n+1];if(At(o)||t&&K1.has(o))break;e=n}else if(At(i)){let o=this.buffer[n+1];if(i==="\r")if(o===`
`)n+=1,i=`
`,o=this.buffer[n+1];else e=n;if(o==="#"||t&&K1.has(o))break;if(i===`
`){let r=this.continueScalar(n+1);if(r===-1)break;n=Math.max(n,r-2)}}else{if(t&&K1.has(i))break;e=n}if(!i&&!this.atEnd)return this.setNext("plain-scalar");return yield B0.SCALAR,yield*this.pushToIndex(e+1,!0),t?"flow":"doc"}*pushCount(t){if(t>0)return yield this.buffer.substr(this.pos,t),this.pos+=t,t;return 0}*pushToIndex(t,e){let n=this.buffer.slice(this.pos,t);if(n)return yield n,this.pos+=n.length,n.length;else if(e)yield"";return 0}*pushIndicators(){let t=0;t:while(!0){switch(this.charAt(0)){case"!":t+=yield*this.pushTag(),t+=yield*this.pushSpaces(!0);continue t;case"&":t+=yield*this.pushUntil(o2),t+=yield*this.pushSpaces(!0);continue t;case"-":case"?":case":":{let e=this.flowLevel>0,n=this.charAt(1);if(At(n)||e&&K1.has(n)){if(!e)this.indentNext=this.indentValue+1;else if(this.flowKey)this.flowKey=!1;t+=yield*this.pushCount(1),t+=yield*this.pushSpaces(!0);continue t}}}break t}return t}*pushTag(){if(this.charAt(1)==="<"){let t=this.pos+2,e=this.buffer[t];while(!At(e)&&e!==">")e=this.buffer[++t];return yield*this.pushToIndex(e===">"?t+1:t,!1)}else{let t=this.pos+1,e=this.buffer[t];while(e)if(Rd.has(e))e=this.buffer[++t];else if(e==="%"&&ys.has(this.buffer[t+1])&&ys.has(this.buffer[t+2]))e=this.buffer[t+=3];else break;return yield*this.pushToIndex(t,!1)}}*pushNewline(){let t=this.buffer[this.pos];if(t===`
`)return yield*this.pushCount(1);else if(t==="\r"&&this.charAt(1)===`
`)return yield*this.pushCount(2);else return 0}*pushSpaces(t){let e=this.pos-1,n;do n=this.buffer[++e];while(n===" "||t&&n==="\t");let i=e-this.pos;if(i>0)yield this.buffer.substr(this.pos,i),this.pos=e;return i}*pushUntil(t){let e=this.pos,n=this.buffer[e];while(!t(n))n=this.buffer[++e];return yield*this.pushToIndex(e,!1)}}Kd.Lexer=ks});var s2=k(function(Hd){class vs{constructor(){this.lineStarts=[],this.addNewLine=(t)=>this.lineStarts.push(t),this.linePos=(t)=>{let e=0,n=this.lineStarts.length;while(e<n){let o=e+n>>1;if(this.lineStarts[o]<t)e=o+1;else n=o}if(this.lineStarts[e]===t)return{line:e+1,col:1};if(e===0)return{line:0,col:t};let i=this.lineStarts[e-1];return{line:e,col:t-i+1}}}}Hd.LineCounter=vs});var l2=k(function(Wd){var Jd=o1("process"),ws=V1(),Yd=r2();function le(t,e){for(let n=0;n<t.length;++n)if(t[n].type===e)return!0;return!1}function bs(t){for(let e=0;e<t.length;++e)switch(t[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Cs(t){switch(t?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function U1(t){switch(t.type){case"document":return t.start;case"block-map":{let e=t.items[t.items.length-1];return e.sep??e.start}case"block-seq":return t.items[t.items.length-1].start;default:return[]}}function Ze(t){if(t.length===0)return[];let e=t.length;t:while(--e>=0)switch(t[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break t}while(t[++e]?.type==="space");return t.splice(e,t.length)}function H1(t,e){if(e.length<1e5)Array.prototype.push.apply(t,e);else for(let n=0;n<e.length;++n)t.push(e[n])}function Fs(t){if(t.start.type==="flow-seq-start"){for(let e of t.items)if(e.sep&&!e.value&&!le(e.start,"explicit-key-ind")&&!le(e.sep,"map-value-ind")){if(e.key)e.value=e.key;if(delete e.key,Cs(e.value))if(e.value.end)H1(e.value.end,e.sep);else e.value.end=e.sep;else H1(e.start,e.sep);delete e.sep}}}class _s{constructor(t){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Yd.Lexer,this.onNewLine=t}*parse(t,e=!1){if(this.onNewLine&&this.offset===0)this.onNewLine(0);for(let n of this.lexer.lex(t,e))yield*this.next(n);if(!e)yield*this.end()}*next(t){if(this.source=t,Jd.env.LOG_TOKENS)console.log("|",ws.prettyToken(t));if(this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=t.length;return}let e=ws.tokenType(t);if(!e){let n=`Not a YAML token: ${t}`;yield*this.pop({type:"error",offset:this.offset,message:n,source:t}),this.offset+=t.length}else if(e==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=e,yield*this.step(),e){case"newline":if(this.atNewLine=!0,this.indent=0,this.onNewLine)this.onNewLine(this.offset+t.length);break;case"space":if(this.atNewLine&&t[0]===" ")this.indent+=t.length;break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":if(this.atNewLine)this.indent+=t.length;break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=t.length}}*end(){while(this.stack.length>0)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let t=this.peek(1);if(this.type==="doc-end"&&t?.type!=="doc-end"){while(this.stack.length>0)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!t)return yield*this.stream();switch(t.type){case"document":return yield*this.document(t);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(t);case"block-scalar":return yield*this.blockScalar(t);case"block-map":return yield*this.blockMap(t);case"block-seq":return yield*this.blockSequence(t);case"flow-collection":return yield*this.flowCollection(t);case"doc-end":return yield*this.documentEnd(t)}yield*this.pop()}peek(t){return this.stack[this.stack.length-t]}*pop(t){let e=t??this.stack.pop();if(!e)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield e;else{let n=this.peek(1);if(e.type==="block-scalar")e.indent="indent"in n?n.indent:0;else if(e.type==="flow-collection"&&n.type==="document")e.indent=0;if(e.type==="flow-collection")Fs(e);switch(n.type){case"document":n.value=e;break;case"block-scalar":n.props.push(e);break;case"block-map":{let i=n.items[n.items.length-1];if(i.value){n.items.push({start:[],key:e,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=e;else{Object.assign(i,{key:e,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{let i=n.items[n.items.length-1];if(i.value)n.items.push({start:[],value:e});else i.value=e;break}case"flow-collection":{let i=n.items[n.items.length-1];if(!i||i.value)n.items.push({start:[],key:e,sep:[]});else if(i.sep)i.value=e;else Object.assign(i,{key:e,sep:[]});return}default:yield*this.pop(),yield*this.pop(e)}if((n.type==="document"||n.type==="block-map"||n.type==="block-seq")&&(e.type==="block-map"||e.type==="block-seq")){let i=e.items[e.items.length-1];if(i&&!i.sep&&!i.value&&i.start.length>0&&bs(i.start)===-1&&(e.indent===0||i.start.every((o)=>o.type!=="comment"||o.indent<e.indent))){if(n.type==="document")n.end=i.start;else n.items.push({start:i.start});e.items.splice(-1,1)}}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let t={type:"document",offset:this.offset,start:[]};if(this.type==="doc-start")t.start.push(this.sourceToken);this.stack.push(t);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(t){if(t.value)return yield*this.lineEnd(t);switch(this.type){case"doc-start":{if(bs(t.start)!==-1)yield*this.pop(),yield*this.step();else t.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":t.start.push(this.sourceToken);return}let e=this.startBlockValue(t);if(e)this.stack.push(e);else yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(t){if(this.type==="map-value-ind"){let e=U1(this.peek(2)),n=Ze(e),i;if(t.end)i=t.end,i.push(this.sourceToken),delete t.end;else i=[this.sourceToken];let o={type:"block-map",offset:t.offset,indent:t.indent,items:[{start:n,key:t,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(t)}*blockScalar(t){switch(this.type){case"space":case"comment":case"newline":t.props.push(this.sourceToken);return;case"scalar":if(t.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let e=this.source.indexOf(`
`)+1;while(e!==0)this.onNewLine(this.offset+e),e=this.source.indexOf(`
`,e)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(t){let e=t.items[t.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,e.value){let n="end"in e.value?e.value.end:void 0;if((Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment")n?.push(this.sourceToken);else t.items.push({start:[this.sourceToken]})}else if(e.sep)e.sep.push(this.sourceToken);else e.start.push(this.sourceToken);return;case"space":case"comment":if(e.value)t.items.push({start:[this.sourceToken]});else if(e.sep)e.sep.push(this.sourceToken);else{if(this.atIndentedComment(e.start,t.indent)){let i=t.items[t.items.length-2]?.value?.end;if(Array.isArray(i)){H1(i,e.start),i.push(this.sourceToken),t.items.pop();return}}e.start.push(this.sourceToken)}return}if(this.indent>=t.indent){let n=!this.onKeyLine&&this.indent===t.indent,i=n&&(e.sep||e.explicitKey)&&this.type!=="seq-item-ind",o=[];if(i&&e.sep&&!e.value){let r=[];for(let s=0;s<e.sep.length;++s){let l=e.sep[s];switch(l.type){case"newline":r.push(s);break;case"space":break;case"comment":if(l.indent>t.indent)r.length=0;break;default:r.length=0}}if(r.length>=2)o=e.sep.splice(r[1])}switch(this.type){case"anchor":case"tag":if(i||e.value)o.push(this.sourceToken),t.items.push({start:o}),this.onKeyLine=!0;else if(e.sep)e.sep.push(this.sourceToken);else e.start.push(this.sourceToken);return;case"explicit-key-ind":if(!e.sep&&!e.explicitKey)e.start.push(this.sourceToken),e.explicitKey=!0;else if(i||e.value)o.push(this.sourceToken),t.items.push({start:o,explicitKey:!0});else this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]});this.onKeyLine=!0;return;case"map-value-ind":if(e.explicitKey)if(!e.sep)if(le(e.start,"newline"))Object.assign(e,{key:null,sep:[this.sourceToken]});else{let r=Ze(e.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]})}else if(e.value)t.items.push({start:[],key:null,sep:[this.sourceToken]});else if(le(e.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]});else if(Cs(e.key)&&!le(e.sep,"newline")){let r=Ze(e.start),{key:s,sep:l}=e;l.push(this.sourceToken),delete e.key,delete e.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:s,sep:l}]})}else if(o.length>0)e.sep=e.sep.concat(o,this.sourceToken);else e.sep.push(this.sourceToken);else if(!e.sep)Object.assign(e,{key:null,sep:[this.sourceToken]});else if(e.value||i)t.items.push({start:o,key:null,sep:[this.sourceToken]});else if(le(e.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]});else e.sep.push(this.sourceToken);this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let r=this.flowScalar(this.type);if(i||e.value)t.items.push({start:o,key:r,sep:[]}),this.onKeyLine=!0;else if(e.sep)this.stack.push(r);else Object.assign(e,{key:r,sep:[]}),this.onKeyLine=!0;return}default:{let r=this.startBlockValue(t);if(r){if(r.type==="block-seq"){if(!e.explicitKey&&e.sep&&!le(e.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else if(n)t.items.push({start:o});this.stack.push(r);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(t){let e=t.items[t.items.length-1];switch(this.type){case"newline":if(e.value){let n="end"in e.value?e.value.end:void 0;if((Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment")n?.push(this.sourceToken);else t.items.push({start:[this.sourceToken]})}else e.start.push(this.sourceToken);return;case"space":case"comment":if(e.value)t.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(e.start,t.indent)){let i=t.items[t.items.length-2]?.value?.end;if(Array.isArray(i)){H1(i,e.start),i.push(this.sourceToken),t.items.pop();return}}e.start.push(this.sourceToken)}return;case"anchor":case"tag":if(e.value||this.indent<=t.indent)break;e.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==t.indent)break;if(e.value||le(e.start,"seq-item-ind"))t.items.push({start:[this.sourceToken]});else e.start.push(this.sourceToken);return}if(this.indent>t.indent){let n=this.startBlockValue(t);if(n){this.stack.push(n);return}}yield*this.pop(),yield*this.step()}*flowCollection(t){let e=t.items[t.items.length-1];if(this.type==="flow-error-end"){let n;do yield*this.pop(),n=this.peek(1);while(n?.type==="flow-collection")}else if(t.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":if(!e||e.sep)t.items.push({start:[this.sourceToken]});else e.start.push(this.sourceToken);return;case"map-value-ind":if(!e||e.value)t.items.push({start:[],key:null,sep:[this.sourceToken]});else if(e.sep)e.sep.push(this.sourceToken);else Object.assign(e,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":if(!e||e.value)t.items.push({start:[this.sourceToken]});else if(e.sep)e.sep.push(this.sourceToken);else e.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let i=this.flowScalar(this.type);if(!e||e.value)t.items.push({start:[],key:i,sep:[]});else if(e.sep)this.stack.push(i);else Object.assign(e,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":t.end.push(this.sourceToken);return}let n=this.startBlockValue(t);if(n)this.stack.push(n);else yield*this.pop(),yield*this.step()}else{let n=this.peek(2);if(n.type==="block-map"&&(this.type==="map-value-ind"&&n.indent===t.indent||this.type==="newline"&&!n.items[n.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&n.type!=="flow-collection"){let i=U1(n),o=Ze(i);Fs(t);let r=t.end.splice(1,t.end.length);r.push(this.sourceToken);let s={type:"block-map",offset:t.offset,indent:t.indent,items:[{start:o,key:t,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=s}else yield*this.lineEnd(t)}}flowScalar(t){if(this.onNewLine){let e=this.source.indexOf(`
`)+1;while(e!==0)this.onNewLine(this.offset+e),e=this.source.indexOf(`
`,e)+1}return{type:t,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(t){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let e=U1(t),n=Ze(e);return n.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;let e=U1(t),n=Ze(e);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(t,e){if(this.type!=="comment")return!1;if(this.indent<=e)return!1;return t.every((n)=>n.type==="newline"||n.type==="space")}*documentEnd(t){if(this.type!=="doc-mode"){if(t.end)t.end.push(this.sourceToken);else t.end=[this.sourceToken];if(this.type==="newline")yield*this.pop()}}*lineEnd(t){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:if(t.end)t.end.push(this.sourceToken);else t.end=[this.sourceToken];if(this.type==="newline")yield*this.pop()}}}Wd.Parser=_s});var Ls=k(function(rh){var xs=Wi(),Qd=N0(),R0=T0(),Xd=si(),th=B(),eh=s2(),Es=l2();function $s(t){let e=t.prettyErrors!==!1;return{lineCounter:t.lineCounter||e&&new eh.LineCounter||null,prettyErrors:e}}function nh(t,e={}){let{lineCounter:n,prettyErrors:i}=$s(e),o=new Es.Parser(n?.addNewLine),r=new xs.Composer(e),s=Array.from(r.compose(o.parse(t)));if(i&&n)for(let l of s)l.errors.forEach(R0.prettifyError(t,n)),l.warnings.forEach(R0.prettifyError(t,n));if(s.length>0)return s;return Object.assign([],{empty:!0},r.streamInfo())}function Ms(t,e={}){let{lineCounter:n,prettyErrors:i}=$s(e),o=new Es.Parser(n?.addNewLine),r=new xs.Composer(e),s=null;for(let l of r.compose(o.parse(t),!0,t.length))if(!s)s=l;else if(s.options.logLevel!=="silent"){s.errors.push(new R0.YAMLParseError(l.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}if(i&&n)s.errors.forEach(R0.prettifyError(t,n)),s.warnings.forEach(R0.prettifyError(t,n));return s}function ih(t,e,n){let i=void 0;if(typeof e==="function")i=e;else if(n===void 0&&e&&typeof e==="object")n=e;let o=Ms(t,n);if(!o)return null;if(o.warnings.forEach((r)=>Xd.warn(o.options.logLevel,r)),o.errors.length>0)if(o.options.logLevel!=="silent")throw o.errors[0];else o.errors=[];return o.toJS(Object.assign({reviver:i},n))}function oh(t,e,n){let i=null;if(typeof e==="function"||Array.isArray(e))i=e;else if(n===void 0&&e)n=e;if(typeof n==="string")n=n.length;if(typeof n==="number"){let o=Math.round(n);n=o<1?void 0:o>8?{indent:8}:{indent:o}}if(t===void 0){let{keepUndefined:o}=n??e??{};if(!o)return}if(th.isDocument(t)&&!i)return t.toString(n);return new Qd.Document(t,i,n).toString(n)}rh.parse=ih;rh.parseAllDocuments=nh;rh.parseDocument=Ms;rh.stringify=oh});var U0=k(function(rl){Object.defineProperty(rl,"__esModule",{value:!0});rl.regexpCode=rl.getEsmExportName=rl.getProperty=rl.safeStringify=rl.stringify=rl.strConcat=rl.addCodeArg=rl.str=rl._=rl.nil=rl._Code=rl.Name=rl.IDENTIFIER=rl._CodeOrName=void 0;class tn{}rl._CodeOrName=tn;rl.IDENTIFIER=/^[a-z$_][a-z$_0-9]*$/i;class t0 extends tn{constructor(t){super();if(!rl.IDENTIFIER.test(t))throw Error("CodeGen: name must be a valid identifier");this.str=t}toString(){return this.str}emptyStr(){return!1}get names(){return{[this.str]:1}}}rl.Name=t0;class Dt extends tn{constructor(t){super();this._items=typeof t==="string"?[t]:t}toString(){return this.str}emptyStr(){if(this._items.length>1)return!1;let t=this._items[0];return t===""||t==='""'}get str(){var t;return(t=this._str)!==null&&t!==void 0?t:this._str=this._items.reduce((e,n)=>`${e}${n}`,"")}get names(){var t;return(t=this._names)!==null&&t!==void 0?t:this._names=this._items.reduce((e,n)=>{if(n instanceof t0)e[n.str]=(e[n.str]||0)+1;return e},{})}}rl._Code=Dt;rl.nil=new Dt("");function il(t,...e){let n=[t[0]],i=0;while(i<e.length)x2(n,e[i]),n.push(t[++i]);return new Dt(n)}rl._=il;var _2=new Dt("+");function ol(t,...e){let n=[K0(t[0])],i=0;while(i<e.length)n.push(_2),x2(n,e[i]),n.push(_2,K0(t[++i]));return jg(n),new Dt(n)}rl.str=ol;function x2(t,e){if(e instanceof Dt)t.push(...e._items);else if(e instanceof t0)t.push(e);else t.push(Ng(e))}rl.addCodeArg=x2;function jg(t){let e=1;while(e<t.length-1){if(t[e]===_2){let n=Pg(t[e-1],t[e+1]);if(n!==void 0){t.splice(e-1,3,n);continue}t[e++]="+"}e++}}function Pg(t,e){if(e==='""')return t;if(t==='""')return e;if(typeof t=="string"){if(e instanceof t0||t[t.length-1]!=='"')return;if(typeof e!="string")return`${t.slice(0,-1)}${e}"`;if(e[0]==='"')return t.slice(0,-1)+e.slice(1);return}if(typeof e=="string"&&e[0]==='"'&&!(t instanceof t0))return`"${t}${e.slice(1)}`;return}function Og(t,e){return e.emptyStr()?t:t.emptyStr()?e:ol`${t}${e}`}rl.strConcat=Og;function Ng(t){return typeof t=="number"||typeof t=="boolean"||t===null?t:K0(Array.isArray(t)?t.join(","):t)}function Tg(t){return new Dt(K0(t))}rl.stringify=Tg;function K0(t){return JSON.stringify(t).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}rl.safeStringify=K0;function Ig(t){return typeof t=="string"&&rl.IDENTIFIER.test(t)?new Dt(`.${t}`):il`[${t}]`}rl.getProperty=Ig;function zg(t){if(typeof t=="string"&&rl.IDENTIFIER.test(t))return new Dt(`${t}`);throw Error(`CodeGen: invalid export name: ${t}, use explicit $id name mapping`)}rl.getEsmExportName=zg;function qg(t){return new Dt(t.toString())}rl.regexpCode=qg});var L2=k(function(cl){Object.defineProperty(cl,"__esModule",{value:!0});cl.ValueScope=cl.ValueScopeName=cl.Scope=cl.varKinds=cl.UsedValueState=void 0;var J=U0();class ll extends Error{constructor(t){super(`CodeGen: "code" for ${t} not defined`);this.value=t.value}}var nn;(function(t){t[t.Started=0]="Started",t[t.Completed=1]="Completed"})(nn||(cl.UsedValueState=nn={}));cl.varKinds={const:new J.Name("const"),let:new J.Name("let"),var:new J.Name("var")};class $2{constructor({prefixes:t,parent:e}={}){this._names={},this._prefixes=t,this._parent=e}toName(t){return t instanceof J.Name?t:this.name(t)}name(t){return new J.Name(this._newName(t))}_newName(t){let e=this._names[t]||this._nameGroup(t);return`${t}${e.index++}`}_nameGroup(t){var e,n;if(((n=(e=this._parent)===null||e===void 0?void 0:e._prefixes)===null||n===void 0?void 0:n.has(t))||this._prefixes&&!this._prefixes.has(t))throw Error(`CodeGen: prefix "${t}" is not allowed in this scope`);return this._names[t]={prefix:t,index:0}}}cl.Scope=$2;class M2 extends J.Name{constructor(t,e){super(e);this.prefix=t}setValue(t,{property:e,itemIndex:n}){this.value=t,this.scopePath=J._`.${new J.Name(e)}[${n}]`}}cl.ValueScopeName=M2;var Xg=J._`\n`;class al extends $2{constructor(t){super(t);this._values={},this._scope=t.scope,this.opts={...t,_n:t.lines?Xg:J.nil}}get(){return this._scope}name(t){return new M2(t,this._newName(t))}value(t,e){var n;if(e.ref===void 0)throw Error("CodeGen: ref must be passed in value");let i=this.toName(t),{prefix:o}=i,r=(n=e.key)!==null&&n!==void 0?n:e.ref,s=this._values[o];if(s){let c=s.get(r);if(c)return c}else s=this._values[o]=new Map;s.set(r,i);let l=this._scope[o]||(this._scope[o]=[]),a=l.length;return l[a]=e.ref,i.setValue(e,{property:o,itemIndex:a}),i}getValue(t,e){let n=this._values[t];if(!n)return;return n.get(e)}scopeRefs(t,e=this._values){return this._reduceValues(e,(n)=>{if(n.scopePath===void 0)throw Error(`CodeGen: name "${n}" has no value`);return J._`${t}${n.scopePath}`})}scopeCode(t=this._values,e,n){return this._reduceValues(t,(i)=>{if(i.value===void 0)throw Error(`CodeGen: name "${i}" has no value`);return i.value.code},e,n)}_reduceValues(t,e,n={},i){let o=J.nil;for(let r in t){let s=t[r];if(!s)continue;let l=n[r]=n[r]||new Map;s.forEach((a)=>{if(l.has(a))return;l.set(a,nn.Started);let c=e(a);if(c){let u=this.opts.es5?cl.varKinds.var:cl.varKinds.const;o=J._`${o}${u} ${a} = ${c};${this.opts._n}`}else if(c=i===null||i===void 0?void 0:i(a))o=J._`${o}${c}${this.opts._n}`;else throw new ll(a);l.set(a,nn.Completed)})}return o}}cl.ValueScope=al});var T=k(function(ut){Object.defineProperty(ut,"__esModule",{value:!0});ut.or=ut.and=ut.not=ut.CodeGen=ut.operators=ut.varKinds=ut.ValueScopeName=ut.ValueScope=ut.Scope=ut.Name=ut.regexpCode=ut.stringify=ut.getProperty=ut.nil=ut.strConcat=ut.str=ut._=void 0;var L=U0(),Q=L2(),ce=U0();Object.defineProperty(ut,"_",{enumerable:!0,get:function(){return ce._}});Object.defineProperty(ut,"str",{enumerable:!0,get:function(){return ce.str}});Object.defineProperty(ut,"strConcat",{enumerable:!0,get:function(){return ce.strConcat}});Object.defineProperty(ut,"nil",{enumerable:!0,get:function(){return ce.nil}});Object.defineProperty(ut,"getProperty",{enumerable:!0,get:function(){return ce.getProperty}});Object.defineProperty(ut,"stringify",{enumerable:!0,get:function(){return ce.stringify}});Object.defineProperty(ut,"regexpCode",{enumerable:!0,get:function(){return ce.regexpCode}});Object.defineProperty(ut,"Name",{enumerable:!0,get:function(){return ce.Name}});var cn=L2();Object.defineProperty(ut,"Scope",{enumerable:!0,get:function(){return cn.Scope}});Object.defineProperty(ut,"ValueScope",{enumerable:!0,get:function(){return cn.ValueScope}});Object.defineProperty(ut,"ValueScopeName",{enumerable:!0,get:function(){return cn.ValueScopeName}});Object.defineProperty(ut,"varKinds",{enumerable:!0,get:function(){return cn.varKinds}});ut.operators={GT:new L._Code(">"),GTE:new L._Code(">="),LT:new L._Code("<"),LTE:new L._Code("<="),EQ:new L._Code("==="),NEQ:new L._Code("!=="),NOT:new L._Code("!"),OR:new L._Code("||"),AND:new L._Code("&&"),ADD:new L._Code("+")};class pe{optimizeNodes(){return this}optimizeNames(t,e){return this}}class fl extends pe{constructor(t,e,n){super();this.varKind=t,this.name=e,this.rhs=n}render({es5:t,_n:e}){let n=t?Q.varKinds.var:this.varKind,i=this.rhs===void 0?"":` = ${this.rhs}`;return`${n} ${this.name}${i};`+e}optimizeNames(t,e){if(!t[this.name.str])return;if(this.rhs)this.rhs=n0(this.rhs,t,e);return this}get names(){return this.rhs instanceof L._CodeOrName?this.rhs.names:{}}}class D2 extends pe{constructor(t,e,n){super();this.lhs=t,this.rhs=e,this.sideEffects=n}render({_n:t}){return`${this.lhs} = ${this.rhs};`+t}optimizeNames(t,e){if(this.lhs instanceof L.Name&&!t[this.lhs.str]&&!this.sideEffects)return;return this.rhs=n0(this.rhs,t,e),this}get names(){let t=this.lhs instanceof L.Name?{}:{...this.lhs.names};return an(t,this.rhs)}}class ul extends D2{constructor(t,e,n,i){super(t,n,i);this.op=e}render({_n:t}){return`${this.lhs} ${this.op}= ${this.rhs};`+t}}class dl extends pe{constructor(t){super();this.label=t,this.names={}}render({_n:t}){return`${this.label}:`+t}}class hl extends pe{constructor(t){super();this.label=t,this.names={}}render({_n:t}){return`break${this.label?` ${this.label}`:""};`+t}}class gl extends pe{constructor(t){super();this.error=t}render({_n:t}){return`throw ${this.error};`+t}get names(){return this.error.names}}class ml extends pe{constructor(t){super();this.code=t}render({_n:t}){return`${this.code};`+t}optimizeNodes(){return`${this.code}`?this:void 0}optimizeNames(t,e){return this.code=n0(this.code,t,e),this}get names(){return this.code instanceof L._CodeOrName?this.code.names:{}}}class pn extends pe{constructor(t=[]){super();this.nodes=t}render(t){return this.nodes.reduce((e,n)=>e+n.render(t),"")}optimizeNodes(){let{nodes:t}=this,e=t.length;while(e--){let n=t[e].optimizeNodes();if(Array.isArray(n))t.splice(e,1,...n);else if(n)t[e]=n;else t.splice(e,1)}return t.length>0?this:void 0}optimizeNames(t,e){let{nodes:n}=this,i=n.length;while(i--){let o=n[i];if(o.optimizeNames(t,e))continue;im(t,o.names),n.splice(i,1)}return n.length>0?this:void 0}get names(){return this.nodes.reduce((t,e)=>Oe(t,e.names),{})}}class fe extends pn{render(t){return"{"+t._n+super.render(t)+"}"+t._n}}class yl extends pn{}class H0 extends fe{}H0.kind="else";class Qt extends fe{constructor(t,e){super(e);this.condition=t}render(t){let e=`if(${this.condition})`+super.render(t);if(this.else)e+="else "+this.else.render(t);return e}optimizeNodes(){super.optimizeNodes();let t=this.condition;if(t===!0)return this.nodes;let e=this.else;if(e){let n=e.optimizeNodes();e=this.else=Array.isArray(n)?new H0(n):n}if(e){if(t===!1)return e instanceof Qt?e:e.nodes;if(this.nodes.length)return this;return new Qt(Fl(t),e instanceof Qt?[e]:e.nodes)}if(t===!1||!this.nodes.length)return;return this}optimizeNames(t,e){var n;if(this.else=(n=this.else)===null||n===void 0?void 0:n.optimizeNames(t,e),!(super.optimizeNames(t,e)||this.else))return;return this.condition=n0(this.condition,t,e),this}get names(){let t=super.names;if(an(t,this.condition),this.else)Oe(t,this.else.names);return t}}Qt.kind="if";class e0 extends fe{}e0.kind="for";class kl extends e0{constructor(t){super();this.iteration=t}render(t){return`for(${this.iteration})`+super.render(t)}optimizeNames(t,e){if(!super.optimizeNames(t,e))return;return this.iteration=n0(this.iteration,t,e),this}get names(){return Oe(super.names,this.iteration.names)}}class vl extends e0{constructor(t,e,n,i){super();this.varKind=t,this.name=e,this.from=n,this.to=i}render(t){let e=t.es5?Q.varKinds.var:this.varKind,{name:n,from:i,to:o}=this;return`for(${e} ${n}=${i}; ${n}<${o}; ${n}++)`+super.render(t)}get names(){let t=an(super.names,this.from);return an(t,this.to)}}class S2 extends e0{constructor(t,e,n,i){super();this.loop=t,this.varKind=e,this.name=n,this.iterable=i}render(t){return`for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})`+super.render(t)}optimizeNames(t,e){if(!super.optimizeNames(t,e))return;return this.iterable=n0(this.iterable,t,e),this}get names(){return Oe(super.names,this.iterable.names)}}class on extends fe{constructor(t,e,n){super();this.name=t,this.args=e,this.async=n}render(t){return`${this.async?"async ":""}function ${this.name}(${this.args})`+super.render(t)}}on.kind="func";class rn extends pn{render(t){return"return "+super.render(t)}}rn.kind="return";class wl extends fe{render(t){let e="try"+super.render(t);if(this.catch)e+=this.catch.render(t);if(this.finally)e+=this.finally.render(t);return e}optimizeNodes(){var t,e;return super.optimizeNodes(),(t=this.catch)===null||t===void 0||t.optimizeNodes(),(e=this.finally)===null||e===void 0||e.optimizeNodes(),this}optimizeNames(t,e){var n,i;return super.optimizeNames(t,e),(n=this.catch)===null||n===void 0||n.optimizeNames(t,e),(i=this.finally)===null||i===void 0||i.optimizeNames(t,e),this}get names(){let t=super.names;if(this.catch)Oe(t,this.catch.names);if(this.finally)Oe(t,this.finally.names);return t}}class sn extends fe{constructor(t){super();this.error=t}render(t){return`catch(${this.error})`+super.render(t)}}sn.kind="catch";class ln extends fe{render(t){return"finally"+super.render(t)}}ln.kind="finally";class bl{constructor(t,e={}){this._values={},this._blockStarts=[],this._constants={},this.opts={...e,_n:e.lines?`
`:""},this._extScope=t,this._scope=new Q.Scope({parent:t}),this._nodes=[new yl]}toString(){return this._root.render(this.opts)}name(t){return this._scope.name(t)}scopeName(t){return this._extScope.name(t)}scopeValue(t,e){let n=this._extScope.value(t,e);return(this._values[n.prefix]||(this._values[n.prefix]=new Set)).add(n),n}getScopeValue(t,e){return this._extScope.getValue(t,e)}scopeRefs(t){return this._extScope.scopeRefs(t,this._values)}scopeCode(){return this._extScope.scopeCode(this._values)}_def(t,e,n,i){let o=this._scope.toName(e);if(n!==void 0&&i)this._constants[o.str]=n;return this._leafNode(new fl(t,o,n)),o}const(t,e,n){return this._def(Q.varKinds.const,t,e,n)}let(t,e,n){return this._def(Q.varKinds.let,t,e,n)}var(t,e,n){return this._def(Q.varKinds.var,t,e,n)}assign(t,e,n){return this._leafNode(new D2(t,e,n))}add(t,e){return this._leafNode(new ul(t,ut.operators.ADD,e))}code(t){if(typeof t=="function")t();else if(t!==L.nil)this._leafNode(new ml(t));return this}object(...t){let e=["{"];for(let[n,i]of t){if(e.length>1)e.push(",");if(e.push(n),n!==i||this.opts.es5)e.push(":"),L.addCodeArg(e,i)}return e.push("}"),new L._Code(e)}if(t,e,n){if(this._blockNode(new Qt(t)),e&&n)this.code(e).else().code(n).endIf();else if(e)this.code(e).endIf();else if(n)throw Error('CodeGen: "else" body without "then" body');return this}elseIf(t){return this._elseNode(new Qt(t))}else(){return this._elseNode(new H0)}endIf(){return this._endBlockNode(Qt,H0)}_for(t,e){if(this._blockNode(t),e)this.code(e).endFor();return this}for(t,e){return this._for(new kl(t),e)}forRange(t,e,n,i,o=this.opts.es5?Q.varKinds.var:Q.varKinds.let){let r=this._scope.toName(t);return this._for(new vl(o,r,e,n),()=>i(r))}forOf(t,e,n,i=Q.varKinds.const){let o=this._scope.toName(t);if(this.opts.es5){let r=e instanceof L.Name?e:this.var("_arr",e);return this.forRange("_i",0,L._`${r}.length`,(s)=>{this.var(o,L._`${r}[${s}]`),n(o)})}return this._for(new S2("of",i,o,e),()=>n(o))}forIn(t,e,n,i=this.opts.es5?Q.varKinds.var:Q.varKinds.const){if(this.opts.ownProperties)return this.forOf(t,L._`Object.keys(${e})`,n);let o=this._scope.toName(t);return this._for(new S2("in",i,o,e),()=>n(o))}endFor(){return this._endBlockNode(e0)}label(t){return this._leafNode(new dl(t))}break(t){return this._leafNode(new hl(t))}return(t){let e=new rn;if(this._blockNode(e),this.code(t),e.nodes.length!==1)throw Error('CodeGen: "return" should have one node');return this._endBlockNode(rn)}try(t,e,n){if(!e&&!n)throw Error('CodeGen: "try" without "catch" and "finally"');let i=new wl;if(this._blockNode(i),this.code(t),e){let o=this.name("e");this._currNode=i.catch=new sn(o),e(o)}if(n)this._currNode=i.finally=new ln,this.code(n);return this._endBlockNode(sn,ln)}throw(t){return this._leafNode(new gl(t))}block(t,e){if(this._blockStarts.push(this._nodes.length),t)this.code(t).endBlock(e);return this}endBlock(t){let e=this._blockStarts.pop();if(e===void 0)throw Error("CodeGen: not in self-balancing block");let n=this._nodes.length-e;if(n<0||t!==void 0&&n!==t)throw Error(`CodeGen: wrong number of nodes: ${n} vs ${t} expected`);return this._nodes.length=e,this}func(t,e=L.nil,n,i){if(this._blockNode(new on(t,e,n)),i)this.code(i).endFunc();return this}endFunc(){return this._endBlockNode(on)}optimize(t=1){while(t-- >0)this._root.optimizeNodes(),this._root.optimizeNames(this._root.names,this._constants)}_leafNode(t){return this._currNode.nodes.push(t),this}_blockNode(t){this._currNode.nodes.push(t),this._nodes.push(t)}_endBlockNode(t,e){let n=this._currNode;if(n instanceof t||e&&n instanceof e)return this._nodes.pop(),this;throw Error(`CodeGen: not in block "${e?`${t.kind}/${e.kind}`:t.kind}"`)}_elseNode(t){let e=this._currNode;if(!(e instanceof Qt))throw Error('CodeGen: "else" without "if"');return this._currNode=e.else=t,this}get _root(){return this._nodes[0]}get _currNode(){let t=this._nodes;return t[t.length-1]}set _currNode(t){let e=this._nodes;e[e.length-1]=t}}ut.CodeGen=bl;function Oe(t,e){for(let n in e)t[n]=(t[n]||0)+(e[n]||0);return t}function an(t,e){return e instanceof L._CodeOrName?Oe(t,e.names):t}function n0(t,e,n){if(t instanceof L.Name)return i(t);if(!o(t))return t;return new L._Code(t._items.reduce((r,s)=>{if(s instanceof L.Name)s=i(s);if(s instanceof L._Code)r.push(...s._items);else r.push(s);return r},[]));function i(r){let s=n[r.str];if(s===void 0||e[r.str]!==1)return r;return delete e[r.str],s}function o(r){return r instanceof L._Code&&r._items.some((s)=>s instanceof L.Name&&e[s.str]===1&&n[s.str]!==void 0)}}function im(t,e){for(let n in e)t[n]=(t[n]||0)-(e[n]||0)}function Fl(t){return typeof t=="boolean"||typeof t=="number"||t===null?!t:L._`!${A2(t)}`}ut.not=Fl;var om=Cl(ut.operators.AND);function rm(...t){return t.reduce(om)}ut.and=rm;var sm=Cl(ut.operators.OR);function lm(...t){return t.reduce(sm)}ut.or=lm;function Cl(t){return(e,n)=>e===L.nil?n:n===L.nil?e:L._`${A2(e)} ${t} ${A2(n)}`}function A2(t){return t instanceof L.Name?t:L._`(${t})`}});var z=k(function(jl){Object.defineProperty(jl,"__esModule",{value:!0});jl.checkStrictMode=jl.getErrorPath=jl.Type=jl.useFunc=jl.setEvaluated=jl.evaluatedPropsToName=jl.mergeEvaluated=jl.eachItem=jl.unescapeJsonPointer=jl.escapeJsonPointer=jl.escapeFragment=jl.unescapeFragment=jl.schemaRefOrVal=jl.schemaHasRulesButRef=jl.schemaHasRules=jl.checkUnknownRules=jl.alwaysValidSchema=jl.toHash=void 0;var D=T(),$l=U0();function fm(t){let e={};for(let n of t)e[n]=!0;return e}jl.toHash=fm;function um(t,e){if(typeof e=="boolean")return e;if(Object.keys(e).length===0)return!0;return Ml(t,e),!Ll(e,t.self.RULES.all)}jl.alwaysValidSchema=um;function Ml(t,e=t.schema){let{opts:n,self:i}=t;if(!n.strictSchema)return;if(typeof e==="boolean")return;let o=i.RULES.keywords;for(let r in e)if(!o[r])Dl(t,`unknown keyword: "${r}"`)}jl.checkUnknownRules=Ml;function Ll(t,e){if(typeof t=="boolean")return!t;for(let n in t)if(e[n])return!0;return!1}jl.schemaHasRules=Ll;function dm(t,e){if(typeof t=="boolean")return!t;for(let n in t)if(n!=="$ref"&&e.all[n])return!0;return!1}jl.schemaHasRulesButRef=dm;function hm({topSchemaRef:t,schemaPath:e},n,i,o){if(!o){if(typeof n=="number"||typeof n=="boolean")return n;if(typeof n=="string")return D._`${n}`}return D._`${t}${e}${D.getProperty(i)}`}jl.schemaRefOrVal=hm;function gm(t){return Sl(decodeURIComponent(t))}jl.unescapeFragment=gm;function mm(t){return encodeURIComponent(P2(t))}jl.escapeFragment=mm;function P2(t){if(typeof t=="number")return`${t}`;return t.replace(/~/g,"~0").replace(/\//g,"~1")}jl.escapeJsonPointer=P2;function Sl(t){return t.replace(/~1/g,"/").replace(/~0/g,"~")}jl.unescapeJsonPointer=Sl;function ym(t,e){if(Array.isArray(t))for(let n of t)e(n);else e(t)}jl.eachItem=ym;function xl({mergeNames:t,mergeToName:e,mergeValues:n,resultToName:i}){return(o,r,s,l)=>{let a=s===void 0?r:s instanceof D.Name?(r instanceof D.Name?t(o,r,s):e(o,r,s),s):r instanceof D.Name?(e(o,s,r),r):n(r,s);return l===D.Name&&!(a instanceof D.Name)?i(o,a):a}}jl.mergeEvaluated={props:xl({mergeNames:(t,e,n)=>t.if(D._`${n} !== true && ${e} !== undefined`,()=>{t.if(D._`${e} === true`,()=>t.assign(n,!0),()=>t.assign(n,D._`${n} || {}`).code(D._`Object.assign(${n}, ${e})`))}),mergeToName:(t,e,n)=>t.if(D._`${n} !== true`,()=>{if(e===!0)t.assign(n,!0);else t.assign(n,D._`${n} || {}`),O2(t,n,e)}),mergeValues:(t,e)=>t===!0?!0:{...t,...e},resultToName:Al}),items:xl({mergeNames:(t,e,n)=>t.if(D._`${n} !== true && ${e} !== undefined`,()=>t.assign(n,D._`${e} === true ? true : ${n} > ${e} ? ${n} : ${e}`)),mergeToName:(t,e,n)=>t.if(D._`${n} !== true`,()=>t.assign(n,e===!0?!0:D._`${n} > ${e} ? ${n} : ${e}`)),mergeValues:(t,e)=>t===!0?!0:Math.max(t,e),resultToName:(t,e)=>t.var("items",e)})};function Al(t,e){if(e===!0)return t.var("props",!0);let n=t.var("props",D._`{}`);if(e!==void 0)O2(t,n,e);return n}jl.evaluatedPropsToName=Al;function O2(t,e,n){Object.keys(n).forEach((i)=>t.assign(D._`${e}${D.getProperty(i)}`,!0))}jl.setEvaluated=O2;var El={};function km(t,e){return t.scopeValue("func",{ref:e,code:El[e.code]||(El[e.code]=new $l._Code(e.code))})}jl.useFunc=km;var j2;(function(t){t[t.Num=0]="Num",t[t.Str=1]="Str"})(j2||(jl.Type=j2={}));function vm(t,e,n){if(t instanceof D.Name){let i=e===j2.Num;return n?i?D._`"[" + ${t} + "]"`:D._`"['" + ${t} + "']"`:i?D._`"/" + ${t}`:D._`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`}return n?D.getProperty(t).toString():"/"+P2(t)}jl.getErrorPath=vm;function Dl(t,e,n=t.opts.strictSchema){if(!n)return;if(e=`strict mode: ${e}`,n===!0)throw Error(e);t.self.logger.warn(e)}jl.checkStrictMode=Dl});var xt=k(function(Ol){Object.defineProperty(Ol,"__esModule",{value:!0});var K=T(),Tm={data:new K.Name("data"),valCxt:new K.Name("valCxt"),instancePath:new K.Name("instancePath"),parentData:new K.Name("parentData"),parentDataProperty:new K.Name("parentDataProperty"),rootData:new K.Name("rootData"),dynamicAnchors:new K.Name("dynamicAnchors"),vErrors:new K.Name("vErrors"),errors:new K.Name("errors"),this:new K.Name("this"),self:new K.Name("self"),scope:new K.Name("scope"),json:new K.Name("json"),jsonPos:new K.Name("jsonPos"),jsonLen:new K.Name("jsonLen"),jsonPart:new K.Name("jsonPart")};Ol.default=Tm});var G0=k(function(zl){Object.defineProperty(zl,"__esModule",{value:!0});zl.extendErrors=zl.resetErrorsCount=zl.reportExtraError=zl.reportError=zl.keyword$DataError=zl.keywordError=void 0;var S=T(),ue=z(),ct=xt();zl.keywordError={message:({keyword:t})=>S.str`must pass "${t}" keyword validation`};zl.keyword$DataError={message:({keyword:t,schemaType:e})=>e?S.str`"${t}" keyword must be ${e} ($data)`:S.str`"${t}" keyword is invalid ($data)`};function zm(t,e=zl.keywordError,n,i){let{it:o}=t,{gen:r,compositeRule:s,allErrors:l}=o,a=Il(t,e,n);if(i!==null&&i!==void 0?i:s||l)Nl(r,a);else Tl(o,S._`[${a}]`)}zl.reportError=zm;function qm(t,e=zl.keywordError,n){let{it:i}=t,{gen:o,compositeRule:r,allErrors:s}=i,l=Il(t,e,n);if(Nl(o,l),!(r||s))Tl(i,ct.default.vErrors)}zl.reportExtraError=qm;function Bm(t,e){t.assign(ct.default.errors,e),t.if(S._`${ct.default.vErrors} !== null`,()=>t.if(e,()=>t.assign(S._`${ct.default.vErrors}.length`,e),()=>t.assign(ct.default.vErrors,null)))}zl.resetErrorsCount=Bm;function Rm({gen:t,keyword:e,schemaValue:n,data:i,errsCount:o,it:r}){if(o===void 0)throw Error("ajv implementation error");let s=t.name("err");t.forRange("i",o,ct.default.errors,(l)=>{if(t.const(s,S._`${ct.default.vErrors}[${l}]`),t.if(S._`${s}.instancePath === undefined`,()=>t.assign(S._`${s}.instancePath`,S.strConcat(ct.default.instancePath,r.errorPath))),t.assign(S._`${s}.schemaPath`,S.str`${r.errSchemaPath}/${e}`),r.opts.verbose)t.assign(S._`${s}.schema`,n),t.assign(S._`${s}.data`,i)})}zl.extendErrors=Rm;function Nl(t,e){let n=t.const("err",e);t.if(S._`${ct.default.vErrors} === null`,()=>t.assign(ct.default.vErrors,S._`[${n}]`),S._`${ct.default.vErrors}.push(${n})`),t.code(S._`${ct.default.errors}++`)}function Tl(t,e){let{gen:n,validateName:i,schemaEnv:o}=t;if(o.$async)n.throw(S._`new ${t.ValidationError}(${e})`);else n.assign(S._`${i}.errors`,e),n.return(!1)}var Ne={keyword:new S.Name("keyword"),schemaPath:new S.Name("schemaPath"),params:new S.Name("params"),propertyName:new S.Name("propertyName"),message:new S.Name("message"),schema:new S.Name("schema"),parentSchema:new S.Name("parentSchema")};function Il(t,e,n){let{createErrors:i}=t.it;if(i===!1)return S._`{}`;return Vm(t,e,n)}function Vm(t,e,n={}){let{gen:i,it:o}=t,r=[Km(o,n),Um(t,n)];return Hm(t,e,r),i.object(...r)}function Km({errorPath:t},{instancePath:e}){let n=e?S.str`${t}${ue.getErrorPath(e,ue.Type.Str)}`:t;return[ct.default.instancePath,S.strConcat(ct.default.instancePath,n)]}function Um({keyword:t,it:{errSchemaPath:e}},{schemaPath:n,parentSchema:i}){let o=i?e:S.str`${e}/${t}`;if(n)o=S.str`${o}${ue.getErrorPath(n,ue.Type.Str)}`;return[Ne.schemaPath,o]}function Hm(t,{params:e,message:n},i){let{keyword:o,data:r,schemaValue:s,it:l}=t,{opts:a,propertyName:c,topSchemaRef:u,schemaPath:f}=l;if(i.push([Ne.keyword,o],[Ne.params,typeof e=="function"?e(t):e||S._`{}`]),a.messages)i.push([Ne.message,typeof n=="function"?n(t):n]);if(a.verbose)i.push([Ne.schema,s],[Ne.parentSchema,S._`${u}${f}`],[ct.default.data,r]);if(c)i.push([Ne.propertyName,c])}});var Hl=k(function(Kl){Object.defineProperty(Kl,"__esModule",{value:!0});Kl.boolOrEmptySchema=Kl.topBoolOrEmptySchema=void 0;var Bl=G0(),Rl=T(),Zm=xt(),Qm={message:"boolean schema is false"};function Xm(t){let{gen:e,schema:n,validateName:i}=t;if(n===!1)Vl(t,!1);else if(typeof n=="object"&&n.$async===!0)e.return(Zm.default.data);else e.assign(Rl._`${i}.errors`,null),e.return(!0)}Kl.topBoolOrEmptySchema=Xm;function ty(t,e){let{gen:n,schema:i}=t;if(i===!1)n.var(e,!1),Vl(t);else n.var(e,!0)}Kl.boolOrEmptySchema=ty;function Vl(t,e){let{gen:n,data:i}=t;Bl.reportError({gen:n,keyword:"false schema",data:i,schema:!1,schemaCode:!1,schemaValue:!1,params:{},it:t},Qm,void 0,e)}});var T2=k(function(Gl){Object.defineProperty(Gl,"__esModule",{value:!0});Gl.getRules=Gl.isJSONType=void 0;var ny=["string","number","integer","boolean","null","object","array"],iy=new Set(ny);function oy(t){return typeof t=="string"&&iy.has(t)}Gl.isJSONType=oy;function ry(){let t={number:{type:"number",rules:[]},string:{type:"string",rules:[]},array:{type:"array",rules:[]},object:{type:"object",rules:[]}};return{types:{...t,integer:!0,boolean:!0,null:!0},rules:[{rules:[]},t.number,t.string,t.array,t.object],post:{rules:[]},all:{},keywords:{}}}Gl.getRules=ry});var I2=k(function(Zl){Object.defineProperty(Zl,"__esModule",{value:!0});Zl.shouldUseRule=Zl.shouldUseGroup=Zl.schemaHasRulesForType=void 0;function ly({schema:t,self:e},n){let i=e.RULES.types[n];return i&&i!==!0&&Yl(t,i)}Zl.schemaHasRulesForType=ly;function Yl(t,e){return e.rules.some((n)=>Wl(t,n))}Zl.shouldUseGroup=Yl;function Wl(t,e){var n;return t[e.keyword]!==void 0||((n=e.definition.implements)===null||n===void 0?void 0:n.some((i)=>t[i]!==void 0))}Zl.shouldUseRule=Wl});var J0=k(function(o3){Object.defineProperty(o3,"__esModule",{value:!0});o3.reportTypeError=o3.checkDataTypes=o3.checkDataType=o3.coerceAndCheckDataType=o3.getJSONTypes=o3.getSchemaTypes=o3.DataType=void 0;var Xl=T2(),t3=I2(),e3=G0(),_=T(),un=z(),i0;(function(t){t[t.Correct=0]="Correct",t[t.Wrong=1]="Wrong"})(i0||(o3.DataType=i0={}));function py(t){let e=n3(t.type);if(e.includes("null")){if(t.nullable===!1)throw Error("type: null contradicts nullable: false")}else{if(!e.length&&t.nullable!==void 0)throw Error('"nullable" cannot be used without "type"');if(t.nullable===!0)e.push("null")}return e}o3.getSchemaTypes=py;function n3(t){let e=Array.isArray(t)?t:t?[t]:[];if(e.every(Xl.isJSONType))return e;throw Error("type must be JSONType or JSONType[]: "+e.join(","))}o3.getJSONTypes=n3;function fy(t,e){let{gen:n,data:i,opts:o}=t,r=uy(e,o.coerceTypes),s=e.length>0&&!(r.length===0&&e.length===1&&t3.schemaHasRulesForType(t,e[0]));if(s){let l=q2(e,i,o.strictNumbers,i0.Wrong);n.if(l,()=>{if(r.length)dy(t,e,r);else B2(t)})}return s}o3.coerceAndCheckDataType=fy;var i3=new Set(["string","number","integer","boolean","null"]);function uy(t,e){return e?t.filter((n)=>i3.has(n)||e==="array"&&n==="array"):[]}function dy(t,e,n){let{gen:i,data:o,opts:r}=t,s=i.let("dataType",_._`typeof ${o}`),l=i.let("coerced",_._`undefined`);if(r.coerceTypes==="array")i.if(_._`${s} == 'object' && Array.isArray(${o}) && ${o}.length == 1`,()=>i.assign(o,_._`${o}[0]`).assign(s,_._`typeof ${o}`).if(q2(e,o,r.strictNumbers),()=>i.assign(l,o)));i.if(_._`${l} !== undefined`);for(let c of n)if(i3.has(c)||c==="array"&&r.coerceTypes==="array")a(c);i.else(),B2(t),i.endIf(),i.if(_._`${l} !== undefined`,()=>{i.assign(o,l),hy(t,l)});function a(c){switch(c){case"string":i.elseIf(_._`${s} == "number" || ${s} == "boolean"`).assign(l,_._`"" + ${o}`).elseIf(_._`${o} === null`).assign(l,_._`""`);return;case"number":i.elseIf(_._`${s} == "boolean" || ${o} === null
              || (${s} == "string" && ${o} && ${o} == +${o})`).assign(l,_._`+${o}`);return;case"integer":i.elseIf(_._`${s} === "boolean" || ${o} === null
              || (${s} === "string" && ${o} && ${o} == +${o} && !(${o} % 1))`).assign(l,_._`+${o}`);return;case"boolean":i.elseIf(_._`${o} === "false" || ${o} === 0 || ${o} === null`).assign(l,!1).elseIf(_._`${o} === "true" || ${o} === 1`).assign(l,!0);return;case"null":i.elseIf(_._`${o} === "" || ${o} === 0 || ${o} === false`),i.assign(l,null);return;case"array":i.elseIf(_._`${s} === "string" || ${s} === "number"
              || ${s} === "boolean" || ${o} === null`).assign(l,_._`[${o}]`)}}}function hy({gen:t,parentData:e,parentDataProperty:n},i){t.if(_._`${e} !== undefined`,()=>t.assign(_._`${e}[${n}]`,i))}function z2(t,e,n,i=i0.Correct){let o=i===i0.Correct?_.operators.EQ:_.operators.NEQ,r;switch(t){case"null":return _._`${e} ${o} null`;case"array":r=_._`Array.isArray(${e})`;break;case"object":r=_._`${e} && typeof ${e} == "object" && !Array.isArray(${e})`;break;case"integer":r=s(_._`!(${e} % 1) && !isNaN(${e})`);break;case"number":r=s();break;default:return _._`typeof ${e} ${o} ${t}`}return i===i0.Correct?r:_.not(r);function s(l=_.nil){return _.and(_._`typeof ${e} == "number"`,l,n?_._`isFinite(${e})`:_.nil)}}o3.checkDataType=z2;function q2(t,e,n,i){if(t.length===1)return z2(t[0],e,n,i);let o,r=un.toHash(t);if(r.array&&r.object){let s=_._`typeof ${e} != "object"`;o=r.null?s:_._`!${e} || ${s}`,delete r.null,delete r.array,delete r.object}else o=_.nil;if(r.number)delete r.integer;for(let s in r)o=_.and(o,z2(s,e,n,i));return o}o3.checkDataTypes=q2;var gy={message:({schema:t})=>`must be ${t}`,params:({schema:t,schemaValue:e})=>typeof t=="string"?_._`{type: ${t}}`:_._`{type: ${e}}`};function B2(t){let e=my(t);e3.reportError(e,gy)}o3.reportTypeError=B2;function my(t){let{gen:e,data:n,schema:i}=t,o=un.schemaRefOrVal(t,i,"type");return{gen:e,keyword:"type",data:n,schema:i.type,schemaCode:o,schemaValue:o,parentSchema:i,params:{},it:t}}});var p3=k(function(a3){Object.defineProperty(a3,"__esModule",{value:!0});a3.assignDefaults=void 0;var Et=T(),l3=z();function Cy(t,e){let{properties:n,items:i}=t.schema;if(e==="object"&&n)for(let o in n)s3(t,o,n[o].default);else if(e==="array"&&Array.isArray(i))i.forEach((o,r)=>s3(t,r,o.default))}a3.assignDefaults=Cy;function s3(t,e,n){let{gen:i,compositeRule:o,data:r,opts:s}=t;if(n===void 0)return;let l=Et._`${r}${Et.getProperty(e)}`;if(o){l3.checkStrictMode(t,`default is ignored for: ${l}`);return}let a=Et._`${l} === undefined`;if(s.useDefaults==="empty")a=Et._`${a} || ${l} === null || ${l} === ""`;i.if(a,Et._`${l} = ${Et.stringify(n)}`)}});var $t=k(function(h3){Object.defineProperty(h3,"__esModule",{value:!0});h3.validateUnion=h3.validateArray=h3.usePattern=h3.callValidateCode=h3.schemaProperties=h3.allSchemaProperties=h3.noPropertyInData=h3.propertyInData=h3.isOwnProperty=h3.hasPropFunc=h3.reportMissingProp=h3.checkMissingProp=h3.checkReportMissingProp=void 0;var O=T(),o0=z(),de=xt(),f3=z();function _y(t,e){let{gen:n,data:i,it:o}=t;n.if(V2(n,i,e,o.opts.ownProperties),()=>{t.setParams({missingProperty:O._`${e}`},!0),t.error()})}h3.checkReportMissingProp=_y;function xy({gen:t,data:e,it:{opts:n}},i,o){return O.or(...i.map((r)=>O.and(V2(t,e,r,n.ownProperties),O._`${o} = ${r}`)))}h3.checkMissingProp=xy;function Ey(t,e){t.setParams({missingProperty:e},!0),t.error()}h3.reportMissingProp=Ey;function u3(t){return t.scopeValue("func",{ref:Object.prototype.hasOwnProperty,code:O._`Object.prototype.hasOwnProperty`})}h3.hasPropFunc=u3;function R2(t,e,n){return O._`${u3(t)}.call(${e}, ${n})`}h3.isOwnProperty=R2;function $y(t,e,n,i){let o=O._`${e}${O.getProperty(n)} !== undefined`;return i?O._`${o} && ${R2(t,e,n)}`:o}h3.propertyInData=$y;function V2(t,e,n,i){let o=O._`${e}${O.getProperty(n)} === undefined`;return i?O.or(o,O.not(R2(t,e,n))):o}h3.noPropertyInData=V2;function d3(t){return t?Object.keys(t).filter((e)=>e!=="__proto__"):[]}h3.allSchemaProperties=d3;function My(t,e){return d3(e).filter((n)=>!o0.alwaysValidSchema(t,e[n]))}h3.schemaProperties=My;function Ly({schemaCode:t,data:e,it:{gen:n,topSchemaRef:i,schemaPath:o,errorPath:r},it:s},l,a,c){let u=c?O._`${t}, ${e}, ${i}${o}`:e,f=[[de.default.instancePath,O.strConcat(de.default.instancePath,r)],[de.default.parentData,s.parentData],[de.default.parentDataProperty,s.parentDataProperty],[de.default.rootData,de.default.rootData]];if(s.opts.dynamicRef)f.push([de.default.dynamicAnchors,de.default.dynamicAnchors]);let d=O._`${u}, ${n.object(...f)}`;return a!==O.nil?O._`${l}.call(${a}, ${d})`:O._`${l}(${d})`}h3.callValidateCode=Ly;var Sy=O._`new RegExp`;function Ay({gen:t,it:{opts:e}},n){let i=e.unicodeRegExp?"u":"",{regExp:o}=e.code,r=o(n,i);return t.scopeValue("pattern",{key:r.toString(),ref:r,code:O._`${o.code==="new RegExp"?Sy:f3.useFunc(t,o)}(${n}, ${i})`})}h3.usePattern=Ay;function Dy(t){let{gen:e,data:n,keyword:i,it:o}=t,r=e.name("valid");if(o.allErrors){let l=e.let("valid",!0);return s(()=>e.assign(l,!1)),l}return e.var(r,!0),s(()=>e.break()),r;function s(l){let a=e.const("len",O._`${n}.length`);e.forRange("i",0,a,(c)=>{t.subschema({keyword:i,dataProp:c,dataPropType:o0.Type.Num},r),e.if(O.not(r),l)})}}h3.validateArray=Dy;function jy(t){let{gen:e,schema:n,keyword:i,it:o}=t;if(!Array.isArray(n))throw Error("ajv implementation error");if(n.some((a)=>o0.alwaysValidSchema(o,a))&&!o.opts.unevaluated)return;let s=e.let("valid",!1),l=e.name("_valid");e.block(()=>n.forEach((a,c)=>{let u=t.subschema({keyword:i,schemaProp:c,compositeRule:!0},l);if(e.assign(s,O._`${s} || ${l}`),!t.mergeValidEvaluated(u,l))e.if(O.not(s))})),t.result(s,()=>t.reset(),()=>t.error(!0))}h3.validateUnion=jy});var F3=k(function(w3){Object.defineProperty(w3,"__esModule",{value:!0});w3.validateKeywordUsage=w3.validSchemaType=w3.funcKeywordCode=w3.macroKeywordCode=void 0;var H=T(),Te=xt(),y3=$t(),k3=G0();function Hy(t,e){let{gen:n,keyword:i,schema:o,parentSchema:r,it:s}=t,l=e.macro.call(s.self,o,r,s),a=v3(n,i,l);if(s.opts.validateSchema!==!1)s.self.validateSchema(l,!0);let c=n.name("valid");t.subschema({schema:l,schemaPath:H.nil,errSchemaPath:`${s.errSchemaPath}/${i}`,topSchemaRef:a,compositeRule:!0},c),t.pass(c,()=>t.error(!0))}w3.macroKeywordCode=Hy;function Gy(t,e){var n;let{gen:i,keyword:o,schema:r,parentSchema:s,$data:l,it:a}=t;Yy(a,e);let c=!l&&e.compile?e.compile.call(a.self,r,s,a):e.validate,u=v3(i,o,c),f=i.let("valid");t.block$data(f,d),t.ok((n=e.valid)!==null&&n!==void 0?n:f);function d(){if(e.errors===!1){if(p(),e.modifying)m3(t);g(()=>t.error())}else{let y=e.async?h():m();if(e.modifying)m3(t);g(()=>Jy(t,y))}}function h(){let y=i.let("ruleErrs",null);return i.try(()=>p(H._`await `),(v)=>i.assign(f,!1).if(H._`${v} instanceof ${a.ValidationError}`,()=>i.assign(y,H._`${v}.errors`),()=>i.throw(v))),y}function m(){let y=H._`${u}.errors`;return i.assign(y,null),p(H.nil),y}function p(y=e.async?H._`await `:H.nil){let v=a.opts.passContext?Te.default.this:Te.default.self,w=!(("compile"in e)&&!l||e.schema===!1);i.assign(f,H._`${y}${y3.callValidateCode(t,u,v,w)}`,e.modifying)}function g(y){var v;i.if(H.not((v=e.valid)!==null&&v!==void 0?v:f),y)}}w3.funcKeywordCode=Gy;function m3(t){let{gen:e,data:n,it:i}=t;e.if(i.parentData,()=>e.assign(n,H._`${i.parentData}[${i.parentDataProperty}]`))}function Jy(t,e){let{gen:n}=t;n.if(H._`Array.isArray(${e})`,()=>{n.assign(Te.default.vErrors,H._`${Te.default.vErrors} === null ? ${e} : ${Te.default.vErrors}.concat(${e})`).assign(Te.default.errors,H._`${Te.default.vErrors}.length`),k3.extendErrors(t)},()=>t.error())}function Yy({schemaEnv:t},e){if(e.async&&!t.$async)throw Error("async keyword in sync schema")}function v3(t,e,n){if(n===void 0)throw Error(`keyword "${e}" failed to compile`);return t.scopeValue("keyword",typeof n=="function"?{ref:n}:{ref:n,code:H.stringify(n)})}function Wy(t,e,n=!1){return!e.length||e.some((i)=>i==="array"?Array.isArray(t):i==="object"?t&&typeof t=="object"&&!Array.isArray(t):typeof t==i||n&&typeof t>"u")}w3.validSchemaType=Wy;function Zy({schema:t,opts:e,self:n,errSchemaPath:i},o,r){if(Array.isArray(o.keyword)?!o.keyword.includes(r):o.keyword!==r)throw Error("ajv implementation error");let s=o.dependencies;if(s===null||s===void 0?void 0:s.some((l)=>!Object.prototype.hasOwnProperty.call(t,l)))throw Error(`parent schema must have dependencies of ${r}: ${s.join(",")}`);if(o.validateSchema){if(!o.validateSchema(t[r])){let a=`keyword "${r}" value is invalid at path "${i}": `+n.errorsText(o.validateSchema.errors);if(e.validateSchema==="log")n.logger.error(a);else throw Error(a)}}}w3.validateKeywordUsage=Zy});var x3=k(function(C3){Object.defineProperty(C3,"__esModule",{value:!0});C3.extendSubschemaMode=C3.extendSubschemaData=C3.getSubschema=void 0;var ot=T(),dn=z();function ek(t,{keyword:e,schemaProp:n,schema:i,schemaPath:o,errSchemaPath:r,topSchemaRef:s}){if(e!==void 0&&i!==void 0)throw Error('both "keyword" and "schema" passed, only one allowed');if(e!==void 0){let l=t.schema[e];return n===void 0?{schema:l,schemaPath:ot._`${t.schemaPath}${ot.getProperty(e)}`,errSchemaPath:`${t.errSchemaPath}/${e}`}:{schema:l[n],schemaPath:ot._`${t.schemaPath}${ot.getProperty(e)}${ot.getProperty(n)}`,errSchemaPath:`${t.errSchemaPath}/${e}/${dn.escapeFragment(n)}`}}if(i!==void 0){if(o===void 0||r===void 0||s===void 0)throw Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');return{schema:i,schemaPath:o,topSchemaRef:s,errSchemaPath:r}}throw Error('either "keyword" or "schema" must be passed')}C3.getSubschema=ek;function nk(t,e,{dataProp:n,dataPropType:i,data:o,dataTypes:r,propertyName:s}){if(o!==void 0&&n!==void 0)throw Error('both "data" and "dataProp" passed, only one allowed');let{gen:l}=e;if(n!==void 0){let{errorPath:c,dataPathArr:u,opts:f}=e,d=l.let("data",ot._`${e.data}${ot.getProperty(n)}`,!0);a(d),t.errorPath=ot.str`${c}${dn.getErrorPath(n,i,f.jsPropertySyntax)}`,t.parentDataProperty=ot._`${n}`,t.dataPathArr=[...u,t.parentDataProperty]}if(o!==void 0){let c=o instanceof ot.Name?o:l.let("data",o,!0);if(a(c),s!==void 0)t.propertyName=s}if(r)t.dataTypes=r;function a(c){t.data=c,t.dataLevel=e.dataLevel+1,t.dataTypes=[],e.definedProperties=new Set,t.parentData=e.data,t.dataNames=[...e.dataNames,c]}}C3.extendSubschemaData=nk;function ik(t,{jtdDiscriminator:e,jtdMetadata:n,compositeRule:i,createErrors:o,allErrors:r}){if(i!==void 0)t.compositeRule=i;if(o!==void 0)t.createErrors=o;if(r!==void 0)t.allErrors=r;t.jtdDiscriminator=e,t.jtdMetadata=n}C3.extendSubschemaMode=ik});var K2=k(function(GE,E3){E3.exports=function t(e,n){if(e===n)return!0;if(e&&n&&typeof e=="object"&&typeof n=="object"){if(e.constructor!==n.constructor)return!1;var i,o,r;if(Array.isArray(e)){if(i=e.length,i!=n.length)return!1;for(o=i;o--!==0;)if(!t(e[o],n[o]))return!1;return!0}if(e.constructor===RegExp)return e.source===n.source&&e.flags===n.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===n.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===n.toString();if(r=Object.keys(e),i=r.length,i!==Object.keys(n).length)return!1;for(o=i;o--!==0;)if(!Object.prototype.hasOwnProperty.call(n,r[o]))return!1;for(o=i;o--!==0;){var s=r[o];if(!t(e[s],n[s]))return!1}return!0}return e!==e&&n!==n}});var M3=k(function(JE,$3){var he=$3.exports=function(t,e,n){if(typeof e=="function")n=e,e={};n=e.cb||n;var i=typeof n=="function"?n:n.pre||function(){},o=n.post||function(){};hn(e,i,o,t,"",t)};he.keywords={additionalItems:!0,items:!0,contains:!0,additionalProperties:!0,propertyNames:!0,not:!0,if:!0,then:!0,else:!0};he.arrayKeywords={items:!0,allOf:!0,anyOf:!0,oneOf:!0};he.propsKeywords={$defs:!0,definitions:!0,properties:!0,patternProperties:!0,dependencies:!0};he.skipKeywords={default:!0,enum:!0,const:!0,required:!0,maximum:!0,minimum:!0,exclusiveMaximum:!0,exclusiveMinimum:!0,multipleOf:!0,maxLength:!0,minLength:!0,pattern:!0,format:!0,maxItems:!0,minItems:!0,uniqueItems:!0,maxProperties:!0,minProperties:!0};function hn(t,e,n,i,o,r,s,l,a,c){if(i&&typeof i=="object"&&!Array.isArray(i)){e(i,o,r,s,l,a,c);for(var u in i){var f=i[u];if(Array.isArray(f)){if(u in he.arrayKeywords)for(var d=0;d<f.length;d++)hn(t,e,n,f[d],o+"/"+u+"/"+d,r,o,u,i,d)}else if(u in he.propsKeywords){if(f&&typeof f=="object")for(var h in f)hn(t,e,n,f[h],o+"/"+u+"/"+sk(h),r,o,u,i,h)}else if(u in he.keywords||t.allKeys&&!(u in he.skipKeywords))hn(t,e,n,f,o+"/"+u,r,o,u,i)}n(i,o,r,s,l,a,c)}}function sk(t){return t.replace(/~/g,"~0").replace(/\//g,"~1")}});var Y0=k(function(j3){Object.defineProperty(j3,"__esModule",{value:!0});j3.getSchemaRefs=j3.resolveUrl=j3.normalizeId=j3._getFullPath=j3.getFullPath=j3.inlineRef=void 0;var L3=z(),lk=K2(),ak=M3(),ck=new Set(["type","format","pattern","maxLength","minLength","maxProperties","minProperties","maxItems","minItems","maximum","minimum","uniqueItems","multipleOf","required","enum","const"]);function pk(t,e=!0){if(typeof t=="boolean")return!0;if(e===!0)return!U2(t);if(!e)return!1;return S3(t)<=e}j3.inlineRef=pk;var fk=new Set(["$ref","$recursiveRef","$recursiveAnchor","$dynamicRef","$dynamicAnchor"]);function U2(t){for(let e in t){if(fk.has(e))return!0;let n=t[e];if(Array.isArray(n)&&n.some(U2))return!0;if(typeof n=="object"&&U2(n))return!0}return!1}function S3(t){let e=0;for(let n in t){if(n==="$ref")return 1/0;if(e++,ck.has(n))continue;if(typeof t[n]=="object")L3.eachItem(t[n],(i)=>e+=S3(i));if(e===1/0)return 1/0}return e}function A3(t,e="",n){if(n!==!1)e=r0(e);let i=t.parse(e);return D3(t,i)}j3.getFullPath=A3;function D3(t,e){return t.serialize(e).split("#")[0]+"#"}j3._getFullPath=D3;var uk=/#\/?$/;function r0(t){return t?t.replace(uk,""):""}j3.normalizeId=r0;function dk(t,e,n){return n=r0(n),t.resolve(e,n)}j3.resolveUrl=dk;var hk=/^[a-z_][-a-z0-9._]*$/i;function gk(t,e){if(typeof t=="boolean")return{};let{schemaId:n,uriResolver:i}=this.opts,o=r0(t[n]||e),r={"":o},s=A3(i,o,!1),l={},a=new Set;return ak(t,{allKeys:!0},(f,d,h,m)=>{if(m===void 0)return;let p=s+d,g=r[m];if(typeof f[n]=="string")g=y.call(this,f[n]);v.call(this,f.$anchor),v.call(this,f.$dynamicAnchor),r[d]=g;function y(w){let C=this.opts.uriResolver.resolve;if(w=r0(g?C(g,w):w),a.has(w))throw u(w);a.add(w);let F=this.refs[w];if(typeof F=="string")F=this.refs[F];if(typeof F=="object")c(f,F.schema,w);else if(w!==r0(p))if(w[0]==="#")c(f,l[w],w),l[w]=f;else this.refs[w]=p;return w}function v(w){if(typeof w=="string"){if(!hk.test(w))throw Error(`invalid anchor "${w}"`);y.call(this,`#${w}`)}}}),l;function c(f,d,h){if(d!==void 0&&!lk(f,d))throw u(h)}function u(f){return Error(`reference "${f}" resolves to more than one schema`)}}j3.getSchemaRefs=gk});var W0=k(function(Y3){Object.defineProperty(Y3,"__esModule",{value:!0});Y3.getData=Y3.KeywordCxt=Y3.validateFunctionCode=void 0;var mn=Hl(),gn=J0(),l0=I2(),ge=J0(),I3=p3(),It=F3(),s0=x3(),b=T(),N=xt(),z3=Y0(),st=z(),Tt=G0();function bk(t){if(R3(t)){if(V3(t),B3(t)){_k(t);return}}q3(t,()=>mn.topBoolOrEmptySchema(t))}Y3.validateFunctionCode=bk;function q3({gen:t,validateName:e,schema:n,schemaEnv:i,opts:o},r){if(o.code.es5)t.func(e,b._`${N.default.data}, ${N.default.valCxt}`,i.$async,()=>{t.code(b._`"use strict"; ${O3(n,o)}`),Ck(t,o),t.code(r)});else t.func(e,b._`${N.default.data}, ${Fk(o)}`,i.$async,()=>t.code(O3(n,o)).code(r))}function Fk(t){return b._`{${N.default.instancePath}="", ${N.default.parentData}, ${N.default.parentDataProperty}, ${N.default.rootData}=${N.default.data}${t.dynamicRef?b._`, ${N.default.dynamicAnchors}={}`:b.nil}}={}`}function Ck(t,e){t.if(N.default.valCxt,()=>{if(t.var(N.default.instancePath,b._`${N.default.valCxt}.${N.default.instancePath}`),t.var(N.default.parentData,b._`${N.default.valCxt}.${N.default.parentData}`),t.var(N.default.parentDataProperty,b._`${N.default.valCxt}.${N.default.parentDataProperty}`),t.var(N.default.rootData,b._`${N.default.valCxt}.${N.default.rootData}`),e.dynamicRef)t.var(N.default.dynamicAnchors,b._`${N.default.valCxt}.${N.default.dynamicAnchors}`)},()=>{if(t.var(N.default.instancePath,b._`""`),t.var(N.default.parentData,b._`undefined`),t.var(N.default.parentDataProperty,b._`undefined`),t.var(N.default.rootData,N.default.data),e.dynamicRef)t.var(N.default.dynamicAnchors,b._`{}`)})}function _k(t){let{schema:e,opts:n,gen:i}=t;q3(t,()=>{if(n.$comment&&e.$comment)U3(t);if(Lk(t),i.let(N.default.vErrors,null),i.let(N.default.errors,0),n.unevaluated)xk(t);K3(t),Dk(t)});return}function xk(t){let{gen:e,validateName:n}=t;t.evaluated=e.const("evaluated",b._`${n}.evaluated`),e.if(b._`${t.evaluated}.dynamicProps`,()=>e.assign(b._`${t.evaluated}.props`,b._`undefined`)),e.if(b._`${t.evaluated}.dynamicItems`,()=>e.assign(b._`${t.evaluated}.items`,b._`undefined`))}function O3(t,e){let n=typeof t=="object"&&t[e.schemaId];return n&&(e.code.source||e.code.process)?b._`/*# sourceURL=${n} */`:b.nil}function Ek(t,e){if(R3(t)){if(V3(t),B3(t)){$k(t,e);return}}mn.boolOrEmptySchema(t,e)}function B3({schema:t,self:e}){if(typeof t=="boolean")return!t;for(let n in t)if(e.RULES.all[n])return!0;return!1}function R3(t){return typeof t.schema!="boolean"}function $k(t,e){let{schema:n,gen:i,opts:o}=t;if(o.$comment&&n.$comment)U3(t);Sk(t),Ak(t);let r=i.const("_errs",N.default.errors);K3(t,r),i.var(e,b._`${r} === ${N.default.errors}`)}function V3(t){st.checkUnknownRules(t),Mk(t)}function K3(t,e){if(t.opts.jtd)return N3(t,[],!1,e);let n=gn.getSchemaTypes(t.schema),i=gn.coerceAndCheckDataType(t,n);N3(t,n,!i,e)}function Mk(t){let{schema:e,errSchemaPath:n,opts:i,self:o}=t;if(e.$ref&&i.ignoreKeywordsWithRef&&st.schemaHasRulesButRef(e,o.RULES))o.logger.warn(`$ref: keywords ignored in schema at path "${n}"`)}function Lk(t){let{schema:e,opts:n}=t;if(e.default!==void 0&&n.useDefaults&&n.strictSchema)st.checkStrictMode(t,"default is ignored in the schema root")}function Sk(t){let e=t.schema[t.opts.schemaId];if(e)t.baseId=z3.resolveUrl(t.opts.uriResolver,t.baseId,e)}function Ak(t){if(t.schema.$async&&!t.schemaEnv.$async)throw Error("async schema in sync schema")}function U3({gen:t,schemaEnv:e,schema:n,errSchemaPath:i,opts:o}){let r=n.$comment;if(o.$comment===!0)t.code(b._`${N.default.self}.logger.log(${r})`);else if(typeof o.$comment=="function"){let s=b.str`${i}/$comment`,l=t.scopeValue("root",{ref:e.root});t.code(b._`${N.default.self}.opts.$comment(${r}, ${s}, ${l}.schema)`)}}function Dk(t){let{gen:e,schemaEnv:n,validateName:i,ValidationError:o,opts:r}=t;if(n.$async)e.if(b._`${N.default.errors} === 0`,()=>e.return(N.default.data),()=>e.throw(b._`new ${o}(${N.default.vErrors})`));else{if(e.assign(b._`${i}.errors`,N.default.vErrors),r.unevaluated)jk(t);e.return(b._`${N.default.errors} === 0`)}}function jk({gen:t,evaluated:e,props:n,items:i}){if(n instanceof b.Name)t.assign(b._`${e}.props`,n);if(i instanceof b.Name)t.assign(b._`${e}.items`,i)}function N3(t,e,n,i){let{gen:o,schema:r,data:s,allErrors:l,opts:a,self:c}=t,{RULES:u}=c;if(r.$ref&&(a.ignoreKeywordsWithRef||!st.schemaHasRulesButRef(r,u))){o.block(()=>G3(t,"$ref",u.all.$ref.definition));return}if(!a.jtd)Pk(t,e);o.block(()=>{for(let d of u.rules)f(d);f(u.post)});function f(d){if(!l0.shouldUseGroup(r,d))return;if(d.type){if(o.if(ge.checkDataType(d.type,s,a.strictNumbers)),T3(t,d),e.length===1&&e[0]===d.type&&n)o.else(),ge.reportTypeError(t);o.endIf()}else T3(t,d);if(!l)o.if(b._`${N.default.errors} === ${i||0}`)}}function T3(t,e){let{gen:n,schema:i,opts:{useDefaults:o}}=t;if(o)I3.assignDefaults(t,e.type);n.block(()=>{for(let r of e.rules)if(l0.shouldUseRule(i,r))G3(t,r.keyword,r.definition,e.type)})}function Pk(t,e){if(t.schemaEnv.meta||!t.opts.strictTypes)return;if(Ok(t,e),!t.opts.allowUnionTypes)Nk(t,e);Tk(t,t.dataTypes)}function Ok(t,e){if(!e.length)return;if(!t.dataTypes.length){t.dataTypes=e;return}e.forEach((n)=>{if(!H3(t.dataTypes,n))H2(t,`type "${n}" not allowed by context "${t.dataTypes.join(",")}"`)}),zk(t,e)}function Nk(t,e){if(e.length>1&&!(e.length===2&&e.includes("null")))H2(t,"use allowUnionTypes to allow union type keyword")}function Tk(t,e){let n=t.self.RULES.all;for(let i in n){let o=n[i];if(typeof o=="object"&&l0.shouldUseRule(t.schema,o)){let{type:r}=o.definition;if(r.length&&!r.some((s)=>Ik(e,s)))H2(t,`missing type "${r.join(",")}" for keyword "${i}"`)}}}function Ik(t,e){return t.includes(e)||e==="number"&&t.includes("integer")}function H3(t,e){return t.includes(e)||e==="integer"&&t.includes("number")}function zk(t,e){let n=[];for(let i of t.dataTypes)if(H3(e,i))n.push(i);else if(e.includes("integer")&&i==="number")n.push("integer");t.dataTypes=n}function H2(t,e){let n=t.schemaEnv.baseId+t.errSchemaPath;e+=` at "${n}" (strictTypes)`,st.checkStrictMode(t,e,t.opts.strictTypes)}class G2{constructor(t,e,n){if(It.validateKeywordUsage(t,e,n),this.gen=t.gen,this.allErrors=t.allErrors,this.keyword=n,this.data=t.data,this.schema=t.schema[n],this.$data=e.$data&&t.opts.$data&&this.schema&&this.schema.$data,this.schemaValue=st.schemaRefOrVal(t,this.schema,n,this.$data),this.schemaType=e.schemaType,this.parentSchema=t.schema,this.params={},this.it=t,this.def=e,this.$data)this.schemaCode=t.gen.const("vSchema",J3(this.$data,t));else if(this.schemaCode=this.schemaValue,!It.validSchemaType(this.schema,e.schemaType,e.allowUndefined))throw Error(`${n} value must be ${JSON.stringify(e.schemaType)}`);if("code"in e?e.trackErrors:e.errors!==!1)this.errsCount=t.gen.const("_errs",N.default.errors)}result(t,e,n){this.failResult(b.not(t),e,n)}failResult(t,e,n){if(this.gen.if(t),n)n();else this.error();if(e){if(this.gen.else(),e(),this.allErrors)this.gen.endIf()}else if(this.allErrors)this.gen.endIf();else this.gen.else()}pass(t,e){this.failResult(b.not(t),void 0,e)}fail(t){if(t===void 0){if(this.error(),!this.allErrors)this.gen.if(!1);return}if(this.gen.if(t),this.error(),this.allErrors)this.gen.endIf();else this.gen.else()}fail$data(t){if(!this.$data)return this.fail(t);let{schemaCode:e}=this;this.fail(b._`${e} !== undefined && (${b.or(this.invalid$data(),t)})`)}error(t,e,n){if(e){this.setParams(e),this._error(t,n),this.setParams({});return}this._error(t,n)}_error(t,e){(t?Tt.reportExtraError:Tt.reportError)(this,this.def.error,e)}$dataError(){Tt.reportError(this,this.def.$dataError||Tt.keyword$DataError)}reset(){if(this.errsCount===void 0)throw Error('add "trackErrors" to keyword definition');Tt.resetErrorsCount(this.gen,this.errsCount)}ok(t){if(!this.allErrors)this.gen.if(t)}setParams(t,e){if(e)Object.assign(this.params,t);else this.params=t}block$data(t,e,n=b.nil){this.gen.block(()=>{this.check$data(t,n),e()})}check$data(t=b.nil,e=b.nil){if(!this.$data)return;let{gen:n,schemaCode:i,schemaType:o,def:r}=this;if(n.if(b.or(b._`${i} === undefined`,e)),t!==b.nil)n.assign(t,!0);if(o.length||r.validateSchema){if(n.elseIf(this.invalid$data()),this.$dataError(),t!==b.nil)n.assign(t,!1)}n.else()}invalid$data(){let{gen:t,schemaCode:e,schemaType:n,def:i,it:o}=this;return b.or(r(),s());function r(){if(n.length){if(!(e instanceof b.Name))throw Error("ajv implementation error");let l=Array.isArray(n)?n:[n];return b._`${ge.checkDataTypes(l,e,o.opts.strictNumbers,ge.DataType.Wrong)}`}return b.nil}function s(){if(i.validateSchema){let l=t.scopeValue("validate$data",{ref:i.validateSchema});return b._`!${l}(${e})`}return b.nil}}subschema(t,e){let n=s0.getSubschema(this.it,t);s0.extendSubschemaData(n,this.it,t),s0.extendSubschemaMode(n,t);let i={...this.it,...n,items:void 0,props:void 0};return Ek(i,e),i}mergeEvaluated(t,e){let{it:n,gen:i}=this;if(!n.opts.unevaluated)return;if(n.props!==!0&&t.props!==void 0)n.props=st.mergeEvaluated.props(i,t.props,n.props,e);if(n.items!==!0&&t.items!==void 0)n.items=st.mergeEvaluated.items(i,t.items,n.items,e)}mergeValidEvaluated(t,e){let{it:n,gen:i}=this;if(n.opts.unevaluated&&(n.props!==!0||n.items!==!0))return i.if(e,()=>this.mergeEvaluated(t,b.Name)),!0}}Y3.KeywordCxt=G2;function G3(t,e,n,i){let o=new G2(t,n,e);if("code"in n)n.code(o,i);else if(o.$data&&n.validate)It.funcKeywordCode(o,n);else if("macro"in n)It.macroKeywordCode(o,n);else if(n.compile||n.validate)It.funcKeywordCode(o,n)}var qk=/^\/(?:[^~]|~0|~1)*$/,Bk=/^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;function J3(t,{dataLevel:e,dataNames:n,dataPathArr:i}){let o,r;if(t==="")return N.default.rootData;if(t[0]==="/"){if(!qk.test(t))throw Error(`Invalid JSON-pointer: ${t}`);o=t,r=N.default.rootData}else{let c=Bk.exec(t);if(!c)throw Error(`Invalid JSON-pointer: ${t}`);let u=+c[1];if(o=c[2],o==="#"){if(u>=e)throw Error(a("property/index",u));return i[e-u]}if(u>e)throw Error(a("data",u));if(r=n[e-u],!o)return r}let s=r,l=o.split("/");for(let c of l)if(c)r=b._`${r}${b.getProperty(st.unescapeJsonPointer(c))}`,s=b._`${s} && ${r}`;return s;function a(c,u){return`Cannot access ${c} ${u} levels up, current level is ${e}`}}Y3.getData=J3});var yn=k(function(Q3){Object.defineProperty(Q3,"__esModule",{value:!0});class Z3 extends Error{constructor(t){super("validation failed");this.errors=t,this.ajv=this.validation=!0}}Q3.default=Z3});var Z0=k(function(t9){Object.defineProperty(t9,"__esModule",{value:!0});var a0=Y0();class X3 extends Error{constructor(t,e,n,i){super(i||`can't resolve reference ${n} from id ${e}`);this.missingRef=a0.resolveUrl(t,e,n),this.missingSchema=a0.normalizeId(a0.getFullPath(t,this.missingRef))}}t9.default=X3});var X0=k(function(i9){Object.defineProperty(i9,"__esModule",{value:!0});i9.resolveSchema=i9.getCompilingSchema=i9.resolveRef=i9.compileSchema=i9.SchemaEnv=void 0;var X=T(),Hk=yn(),Ie=xt(),tt=Y0(),kn=z(),e9=W0();class Q0{constructor(t){var e;this.refs={},this.dynamicAnchors={};let n;if(typeof t.schema=="object")n=t.schema;this.schema=t.schema,this.schemaId=t.schemaId,this.root=t.root||this,this.baseId=(e=t.baseId)!==null&&e!==void 0?e:tt.normalizeId(n===null||n===void 0?void 0:n[t.schemaId||"$id"]),this.schemaPath=t.schemaPath,this.localRefs=t.localRefs,this.meta=t.meta,this.$async=n===null||n===void 0?void 0:n.$async,this.refs={}}}i9.SchemaEnv=Q0;function Y2(t){let e=n9.call(this,t);if(e)return e;let n=tt.getFullPath(this.opts.uriResolver,t.root.baseId),{es5:i,lines:o}=this.opts.code,{ownProperties:r}=this.opts,s=new X.CodeGen(this.scope,{es5:i,lines:o,ownProperties:r}),l;if(t.$async)l=s.scopeValue("Error",{ref:Hk.default,code:X._`require("ajv/dist/runtime/validation_error").default`});let a=s.scopeName("validate");t.validateName=a;let c={gen:s,allErrors:this.opts.allErrors,data:Ie.default.data,parentData:Ie.default.parentData,parentDataProperty:Ie.default.parentDataProperty,dataNames:[Ie.default.data],dataPathArr:[X.nil],dataLevel:0,dataTypes:[],definedProperties:new Set,topSchemaRef:s.scopeValue("schema",this.opts.code.source===!0?{ref:t.schema,code:X.stringify(t.schema)}:{ref:t.schema}),validateName:a,ValidationError:l,schema:t.schema,schemaEnv:t,rootId:n,baseId:t.baseId||n,schemaPath:X.nil,errSchemaPath:t.schemaPath||(this.opts.jtd?"":"#"),errorPath:X._`""`,opts:this.opts,self:this},u;try{this._compilations.add(t),e9.validateFunctionCode(c),s.optimize(this.opts.code.optimize);let f=s.toString();if(u=`${s.scopeRefs(Ie.default.scope)}return ${f}`,this.opts.code.process)u=this.opts.code.process(u,t);let h=Function(`${Ie.default.self}`,`${Ie.default.scope}`,u)(this,this.scope.get());if(this.scope.value(a,{ref:h}),h.errors=null,h.schema=t.schema,h.schemaEnv=t,t.$async)h.$async=!0;if(this.opts.code.source===!0)h.source={validateName:a,validateCode:f,scopeValues:s._values};if(this.opts.unevaluated){let{props:m,items:p}=c;if(h.evaluated={props:m instanceof X.Name?void 0:m,items:p instanceof X.Name?void 0:p,dynamicProps:m instanceof X.Name,dynamicItems:p instanceof X.Name},h.source)h.source.evaluated=X.stringify(h.evaluated)}return t.validate=h,t}catch(f){if(delete t.validate,delete t.validateName,u)this.logger.error("Error compiling schema, function code:",u);throw f}finally{this._compilations.delete(t)}}i9.compileSchema=Y2;function Gk(t,e,n){var i;n=tt.resolveUrl(this.opts.uriResolver,e,n);let o=t.refs[n];if(o)return o;let r=Wk.call(this,t,n);if(r===void 0){let s=(i=t.localRefs)===null||i===void 0?void 0:i[n],{schemaId:l}=this.opts;if(s)r=new Q0({schema:s,schemaId:l,root:t,baseId:e})}if(r===void 0)return;return t.refs[n]=Jk.call(this,r)}i9.resolveRef=Gk;function Jk(t){if(tt.inlineRef(t.schema,this.opts.inlineRefs))return t.schema;return t.validate?t:Y2.call(this,t)}function n9(t){for(let e of this._compilations)if(Yk(e,t))return e}i9.getCompilingSchema=n9;function Yk(t,e){return t.schema===e.schema&&t.root===e.root&&t.baseId===e.baseId}function Wk(t,e){let n;while(typeof(n=this.refs[e])=="string")e=n;return n||this.schemas[e]||vn.call(this,t,e)}function vn(t,e){let n=this.opts.uriResolver.parse(e),i=tt._getFullPath(this.opts.uriResolver,n),o=tt.getFullPath(this.opts.uriResolver,t.baseId,void 0);if(Object.keys(t.schema).length>0&&i===o)return J2.call(this,n,t);let r=tt.normalizeId(i),s=this.refs[r]||this.schemas[r];if(typeof s=="string"){let l=vn.call(this,t,s);if(typeof(l===null||l===void 0?void 0:l.schema)!=="object")return;return J2.call(this,n,l)}if(typeof(s===null||s===void 0?void 0:s.schema)!=="object")return;if(!s.validate)Y2.call(this,s);if(r===tt.normalizeId(e)){let{schema:l}=s,{schemaId:a}=this.opts,c=l[a];if(c)o=tt.resolveUrl(this.opts.uriResolver,o,c);return new Q0({schema:l,schemaId:a,root:t,baseId:o})}return J2.call(this,n,s)}i9.resolveSchema=vn;var Zk=new Set(["properties","patternProperties","enum","dependencies","definitions"]);function J2(t,{baseId:e,schema:n,root:i}){var o;if(((o=t.fragment)===null||o===void 0?void 0:o[0])!=="/")return;for(let l of t.fragment.slice(1).split("/")){if(typeof n==="boolean")return;let a=n[kn.unescapeFragment(l)];if(a===void 0)return;n=a;let c=typeof n==="object"&&n[this.opts.schemaId];if(!Zk.has(l)&&c)e=tt.resolveUrl(this.opts.uriResolver,e,c)}let r;if(typeof n!="boolean"&&n.$ref&&!kn.schemaHasRulesButRef(n,this.RULES)){let l=tt.resolveUrl(this.opts.uriResolver,e,n.$ref);r=vn.call(this,i,l)}let{schemaId:s}=this.opts;if(r=r||new Q0({schema:n,schemaId:s,root:i,baseId:e}),r.schema!==r.root.schema)return r;return}});var r9=k(function(t$,nv){nv.exports={$id:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",description:"Meta-schema for $data reference (JSON AnySchema extension proposal)",type:"object",required:["$data"],properties:{$data:{type:"string",anyOf:[{format:"relative-json-pointer"},{format:"json-pointer"}]}},additionalProperties:!1}});var eo=k(function(e$,d9){var iv=RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu),Z2=RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u),ov=RegExp.prototype.test.bind(/^\d*$/u),ze=RegExp.prototype.test.bind(/^[\da-f]{2}$/iu),Q2=RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu),l9=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u),X2=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u),rv=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u),dt=Array(256);for(let e=0;e<256;e++)dt[e]="%"+"0123456789ABCDEF"[e>>4]+"0123456789ABCDEF"[e&15];function lt(t){if(t<2048)return dt[192|t>>6]+dt[128|t&63];if(t<65536)return dt[224|t>>12]+dt[128|t>>6&63]+dt[128|t&63];return dt[240|t>>18]+dt[128|t>>12&63]+dt[128|t>>6&63]+dt[128|t&63]}function sv(t){let e="",n=0,i=0;for(i=0;i<t.length;i++){if(n=t[i].charCodeAt(0),n===48)continue;if(!(n>=48&&n<=57||n>=65&&n<=70||n>=97&&n<=102))return"";e+=t[i];break}for(i+=1;i<t.length;i++){if(n=t[i].charCodeAt(0),!(n>=48&&n<=57||n>=65&&n<=70||n>=97&&n<=102))return"";e+=t[i]}return e}var lv=RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/),av=RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/),cv=RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/),pv=RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);function fv(t){if(t.length===0)return!1;for(let e=0;e<t.length;e++){if(cv(t[e]))continue;if(t[e]==="%"&&e+2<t.length&&ze(t.slice(e+1,e+3))){e+=2;continue}return!1}return!0}function s9(t){let e=-1,n=0,i=-1,o=0;for(let l=0;l<t.length;l++)if(t[l]==="0"){if(i===-1)i=l;if(o++,o>n)n=o,e=i}else i=-1,o=0;if(n<2)return t.join(":");let r=t.slice(0,e).join(":"),s=t.slice(e+n).join(":");return r+"::"+s}function uv(t){let e=t.indexOf("::");if(e!==-1&&t.indexOf("::",e+1)!==-1)return;let n=e===-1?t.split(":"):t.slice(0,e).split(":"),i=e===-1?[]:t.slice(e+2).split(":");if(e!==-1){if(n.length===1&&n[0]==="")n.length=0;if(i.length===1&&i[0]==="")i.length=0}let o=n.concat(i),r=0;for(let l=0;l<o.length;l++){let a=o[l];if(a==="")return;if(a.indexOf(".")!==-1){if(l!==o.length-1||e!==-1&&i.length===0||!Z2(a))return;r+=2;continue}if(!lv(a))return;o[l]=parseInt(a,16).toString(16),r++}if(e===-1){if(r!==8)return;return s9(o)}if(r>=8)return;let s=o.slice(0,n.length);for(let l=r;l<8;l++)s.push("0");for(let l=n.length;l<o.length;l++)s.push(o[l]);return s9(s)}function W2(t){let e=t[0]==="["&&t[t.length-1]==="]";if((t[0]==="["||t[t.length-1]==="]")&&!e)return{host:t,isIPV6:!1,error:!0};let i=e?t.slice(1,-1):t;if(e&&av(i))return i=i.toLowerCase(),{host:`[${i}]`,escapedHost:i,isIPV6:!1,isIPVFuture:!0};if(dv(i,":")<2)return{host:t,isIPV6:!1,error:e};let o="",r=i.indexOf("%");if(r!==-1){let l=i.slice(r,r+3).toLowerCase()==="%25"?3:1;if(o=i.slice(r+l),!fv(o))return{host:t,isIPV6:!1,error:!0};i=i.slice(0,r)}let s=uv(i);if(s===void 0)return{host:t,isIPV6:!1,error:!0};return{host:s+(o?"%"+o:""),escapedHost:s+(o?"%25"+o:""),isIPV6:!0}}function dv(t,e){let n=0;for(let i=0;i<t.length;i++)if(t[i]===e)n++;return n}function a9(t){let e=t,n=[],i=-1,o=0;while(o=e.length){if(o===1)if(e===".")break;else if(e==="/"){n.push("/");break}else{n.push(e);break}else if(o===2){if(e[0]==="."){if(e[1]===".")break;else if(e[1]==="/"){e=e.slice(2);continue}}else if(e[0]==="/"){if(e[1]==="."||e[1]==="/"){n.push("/");break}}}else if(o===3){if(e==="/.."){if(n.length!==0)n.pop();n.push("/");break}}if(e[0]==="."){if(e[1]==="."){if(e[2]==="/"){e=e.slice(3);continue}}else if(e[1]==="/"){e=e.slice(2);continue}}else if(e[0]==="/"){if(e[1]==="."){if(e[2]==="/"){e=e.slice(2);continue}else if(e[2]==="."){if(e[3]==="/"){if(e=e.slice(3),n.length!==0)n.pop();continue}}}}if((i=e.indexOf("/",1))===-1){n.push(e);break}else n.push(e.slice(0,i)),e=e.slice(i)}return n.join("")}function hv(t){if(t===""||t[0]==="/")return a9(t);let e=t.split("/"),n=e.length-1,i=[],o=!1;for(let r=0;r<=n;r++){let s=e[r];if(s==="."||s===".."){if(s==="..")if(i.length!==0&&i[i.length-1]!=="..")i.pop();else i.push("..");o=r===n}else i.push(s)}if(o&&i[i.length-1]!=="..")i.push("");if(i.length===0||i[0]===""||i[0].includes(":"))i.unshift(".");return i.join("/")}var gv={"@":"%40","/":"%2F","?":"%3F","#":"%23",":":"%3A"},mv=/[@/?#:]/g,yv=/[@/?#]/g;function c9(t,e){let n=e?yv:mv;return n.lastIndex=0,t.replace(n,(i)=>gv[i])}function p9(t,e=!1){if(t.indexOf("%")===-1)return t;let n="";for(let i=0;i<t.length;i++){if(t[i]==="%"&&i+2<t.length){let o=t.slice(i+1,i+3);if(ze(o)){let r=o.toUpperCase(),s=String.fromCharCode(parseInt(r,16));if(e&&Q2(s))n+=s;else n+="%"+r;i+=2;continue}}n+=t[i]}return n}function kv(t){let e="";for(let n=0;n<t.length;n++){let i=t[n];if(i==="%"&&n+2<t.length){let o=t.slice(n+1,n+3);if(ze(o)){let r=o.toUpperCase(),s=String.fromCharCode(parseInt(r,16));if(s!=="."&&Q2(s))e+=s;else e+="%"+r;n+=2;continue}}if(l9(i))e+=i;else{let o=t.charCodeAt(n);if(o<128)e+=u9(o)?i:dt[o];else if(o<55296||o>57343)e+=lt(o);else if(o<=56319&&n+1<t.length){let r=t.charCodeAt(n+1);if(r>=56320&&r<=57343)e+=lt(65536+(o-55296<<10)+(r-56320)),n++;else e+=lt(65533)}else e+=lt(65533)}}return e}function vv(t,e=!1){let n="",i=e&&t[0]!=="/";for(let o=0;o<t.length;o++){let r=t[o];if(r==="%"&&o+2<t.length){let s=t.slice(o+1,o+3);if(ze(s)){n+="%"+s.toUpperCase(),o+=2;continue}}if(r==="/")i=!1;if(l9(r)&&(r!==":"||!i))n+=r;else{let s=t.charCodeAt(o);if(s<128)n+=dt[s];else if(s<55296||s>57343)n+=lt(s);else if(s<=56319&&o+1<t.length){let l=t.charCodeAt(o+1);if(l>=56320&&l<=57343)n+=lt(65536+(s-55296<<10)+(l-56320)),o++;else n+=lt(65533)}else n+=lt(65533)}}return n}function to(t,e){let n="";for(let i=0;i<t.length;i++){let o=t[i];if(o==="%"&&i+2<t.length){let r=t.slice(i+1,i+3);if(ze(r)){n+="%"+r.toUpperCase(),i+=2;continue}}if(e(o))n+=o;else{let r=t.charCodeAt(i);if(r<128)n+=dt[r];else if(r<55296||r>57343)n+=lt(r);else if(r<=56319&&i+1<t.length){let s=t.charCodeAt(i+1);if(s>=56320&&s<=57343)n+=lt(65536+(r-55296<<10)+(s-56320)),i++;else n+=lt(65533)}else n+=lt(65533)}}return n}function f9(t){return to(t,rv)}function wv(t){return to(t,X2)}function bv(t){return to(t,X2)}function u9(t){return t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122||t===42||t===43||t===45||t===46||t===47||t===64||t===95}function Fv(t){let e="";for(let n=0;n<t.length;n++){let i=t[n];if(i==="%"&&n+2<t.length){let o=t.slice(n+1,n+3);if(ze(o)){let r=o.toUpperCase(),s=String.fromCharCode(parseInt(r,16));if(Q2(s))e+=s;else e+="%"+r;n+=2;continue}}if(X2(i))e+=i;else{let o=t.charCodeAt(n);if(o<128)e+=u9(o)?i:dt[o];else if(o<55296||o>57343)e+=lt(o);else if(o<=56319&&n+1<t.length){let r=t.charCodeAt(n+1);if(r>=56320&&r<=57343)e+=lt(65536+(o-55296<<10)+(r-56320)),n++;else e+=lt(65533)}else e+=lt(65533)}}return e}function Cv(t){let e="";for(let n=0;n<t.length;n++){if(t[n]==="%"&&n+2<t.length){let i=t.slice(n+1,n+3);if(ze(i)){e+="%"+i.toUpperCase(),n+=2;continue}}e+=escape(t[n])}return e}function _v(t){let e=[];if(t.userinfo!==void 0)e.push(f9(t.userinfo)),e.push("@");if(t.host!==void 0){let n=t.host;if(!Z2(n)){let i=W2(n);if(i.isIPV6!==!0&&i.isIPVFuture!==!0)n=p9(n,!0),i=W2(n);if(i.isIPV6===!0||i.isIPVFuture===!0)n=`[${i.escapedHost}]`;else n=c9(n,!1)}e.push(n)}if(typeof t.port==="number"||typeof t.port==="string"){let n=String(t.port);if(!ov(n))throw TypeError("URI port is malformed.");e.push(":"),e.push(n)}return e.length?e.join(""):void 0}d9.exports={nonSimpleDomain:pv,recomposeAuthority:_v,reescapeHostDelimiters:c9,normalizePercentEncoding:p9,normalizePathEncoding:kv,serializePathEncoding:vv,normalizeQueryFragmentEncoding:Fv,encodeUserinfo:f9,encodeQuery:wv,encodeFragment:bv,escapePreservingEscapes:Cv,removeDotSegments:a9,removeDotSegmentsRelative:hv,isIPv4:Z2,isUUID:iv,normalizeIPv6:W2,stringArrayToHexStripped:sv}});var k9=k(function(n$,y9){var{isUUID:xv}=eo(),Ev=/^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu,$v=["http","https","ws","wss","urn","urn:uuid"];function Mv(t){return $v.indexOf(t)!==-1}function no(t){if(t.secure===!0)return!0;else if(t.secure===!1)return!1;else if(t.scheme)return t.scheme.length===3&&(t.scheme[0]==="w"||t.scheme[0]==="W")&&(t.scheme[1]==="s"||t.scheme[1]==="S")&&(t.scheme[2]==="s"||t.scheme[2]==="S");else return!1}function h9(t){if(!t.host)t.error=t.error||"HTTP URIs must have a host.";return t}function g9(t){let e=String(t.scheme).toLowerCase()==="https";if(t.port===(e?443:80)||t.port==="")t.port=void 0;if(!t.path)t.path="/";return t}function Lv(t){return t.secure=no(t),t.resourceName=(t.path||"/")+(t.query?"?"+t.query:""),t.path=void 0,t.query=void 0,t}function Sv(t){if(t.port===(no(t)?443:80)||t.port==="")t.port=void 0;if(typeof t.secure==="boolean")t.scheme=t.secure?"wss":"ws",t.secure=void 0;if(t.resourceName){let e=t.resourceName.indexOf("?"),n=e===-1?t.resourceName:t.resourceName.slice(0,e);t.path=n&&n!=="/"?n:void 0,t.query=e===-1?void 0:t.resourceName.slice(e+1),t.resourceName=void 0}return t.fragment=void 0,t}function Av(t,e){if(!t.path)return t.error="URN can not be parsed",t;let n=t.path.match(Ev);if(n&&n[0]===t.path){let i=e.scheme||t.scheme||"urn";t.nid=n[1].toLowerCase(),t.nss=n[2];let o=`${i}:${e.nid||t.nid}`,r=io(o);if(t.path=void 0,r)t=r.parse(t,e)}else t.error=t.error||"URN can not be parsed.";return t}function Dv(t,e){if(t.nid===void 0)throw Error("URN without nid cannot be serialized");let n=e.scheme||t.scheme||"urn",i=t.nid.toLowerCase(),o=`${n}:${e.nid||i}`,r=io(o);if(r)t=r.serialize(t,e);let s=t,l=t.nss;return s.path=`${i||e.nid}:${l}`,e.skipEscape=!0,s}function jv(t,e){let n=t;if(n.uuid=n.nss,n.nss=void 0,!e.tolerant&&(!n.uuid||!xv(n.uuid)))n.error=n.error||"UUID is not valid.";return n}function Pv(t){let e=t;return e.nss=(t.uuid||"").toLowerCase(),e}var m9={scheme:"http",domainHost:!0,parse:h9,serialize:g9},Ov={scheme:"https",domainHost:m9.domainHost,parse:h9,serialize:g9},wn={scheme:"ws",domainHost:!0,parse:Lv,serialize:Sv},Nv={scheme:"wss",domainHost:wn.domainHost,parse:wn.parse,serialize:wn.serialize},Tv={scheme:"urn",parse:Av,serialize:Dv,skipNormalize:!0},Iv={scheme:"urn:uuid",parse:jv,serialize:Pv,skipNormalize:!0},bn={http:m9,https:Ov,ws:wn,wss:Nv,urn:Tv,"urn:uuid":Iv};Object.setPrototypeOf(bn,null);function io(t){return t&&(bn[t]||bn[t.toLowerCase()])||void 0}y9.exports={wsIsSecure:no,SCHEMES:bn,isValidSchemeName:Mv,getSchemeHandler:io}});var D9=k(function(i$,xn){var{normalizeIPv6:C9,removeDotSegments:e1,removeDotSegmentsRelative:_9,recomposeAuthority:zv,normalizePercentEncoding:oo,normalizePathEncoding:qv,serializePathEncoding:v9,normalizeQueryFragmentEncoding:w9,encodeQuery:Bv,encodeFragment:Rv,reescapeHostDelimiters:Vv,isIPv4:x9,nonSimpleDomain:Kv}=eo(),{SCHEMES:E9,getSchemeHandler:ro}=k9(),$9=/^[A-Za-z][A-Za-z0-9+.-]*$/u,Uv=/[\0-\x20"#/:<>?@[\\\]^`{|}\x7F]/u;function b9(t){let e=String(t);if(!$9.test(e))throw TypeError("URI scheme is malformed.");return e}function Hv(t,e){if(typeof t==="string")t=ew(t,e);else if(typeof t==="object")t=Cn(qe(t,e),e);return t}function Gv(t,e,n){let i=n?Object.assign({scheme:"null"},n):{scheme:"null"},{parsed:o,malformedAuthorityOrPort:r,malformedPercentEncoding:s,malformedSchemeSpecific:l,malformedHost:a,malformedScheme:c}=Fn(t,i),{parsed:u,malformedAuthorityOrPort:f,malformedPercentEncoding:d,malformedSchemeSpecific:h,malformedHost:m,malformedScheme:p}=Fn(e,i);if(r||f||s||d||l||h||a||m||c||p)throw Error(o.error||u.error||"URI is malformed.");let g=M9(o,u,i,!0),y=ro(n&&n.scheme||g.scheme),v=g.host,w=v!==void 0&&v!==""&&(x9(v)||C9(v).isIPV6);if(S9(g,n||{},y,w))throw Error("URI host is malformed.");L9(g,n||{},y,w);let C=v&&v.indexOf("%")!==-1&&!/\P{ASCII}/u.test(v);if(g.error&&!C)throw Error(g.error);return i.skipEscape=!0,qe(g,i)}function M9(t,e,n,i){let o={};if(!i)t=Cn(qe(t,n),n),e=Cn(qe(e,n),n);if(n=n||{},!n.tolerant&&e.scheme)o.scheme=e.scheme,o.userinfo=e.userinfo,o.host=e.host,o.port=e.port,o.path=e1(e.path||""),o.query=e.query;else{if(e.userinfo!==void 0||e.host!==void 0||e.port!==void 0)o.userinfo=e.userinfo,o.host=e.host,o.port=e.port,o.path=e1(e.path||""),o.query=e.query;else{if(!e.path)if(o.path=t.path,e.query!==void 0)o.query=e.query;else o.query=t.query;else{if(e.path[0]==="/")o.path=e1(e.path);else{let r=t.userinfo!==void 0||t.host!==void 0||t.port!==void 0;if(r&&!t.path)o.path="/"+e.path;else if(!t.path)o.path=e.path;else o.path=t.path.slice(0,t.path.lastIndexOf("/")+1)+e.path;o.path=t.scheme===void 0&&!r&&o.path[0]!=="/"?_9(o.path):e1(o.path)}o.query=e.query}o.userinfo=t.userinfo,o.host=t.host,o.port=t.port}o.scheme=t.scheme}return o.fragment=e.fragment,o}function Jv(t,e,n){let i=F9(t,n),o=F9(e,n);return i!==void 0&&o!==void 0&&i===o}function qe(t,e){let n={host:t.host,scheme:t.scheme,userinfo:t.userinfo,port:t.port,path:t.path,query:t.query,nid:t.nid,nss:t.nss,uuid:t.uuid,fragment:t.fragment,reference:t.reference,resourceName:t.resourceName,secure:t.secure,error:""},i=Object.assign({},e),o=[];if(n.scheme)n.scheme=b9(n.scheme);let r=ro(i.scheme||n.scheme);if(r&&r.serialize)r.serialize(n,i);let s=n.userinfo!==void 0||n.host!==void 0||n.port!==void 0,l=(n.scheme===void 0||i.reference==="suffix")&&!s,a=!i.skipEscape&&l;if(n.path!==void 0)if(!i.skipEscape)n.path=v9(n.path,a);else n.path=oo(n.path);if(i.reference!=="suffix"&&n.scheme)n.scheme=b9(n.scheme),o.push(n.scheme,":");let c=zv(n);if(c!==void 0){if(i.reference!=="suffix")o.push("//");if(o.push(c),n.path&&n.path[0]!=="/")o.push("/")}if(n.path!==void 0){let u=n.path;if(!i.absolutePath&&(!r||!r.absolutePath))u=l&&u[0]!=="/"?_9(u):e1(u);if(l)u=v9(u,!0);if(c===void 0&&u[0]==="/"&&u[1]==="/")u="/%2F"+u.slice(2);o.push(u)}if(n.query!==void 0)o.push("?",Bv(n.query));if(n.fragment!==void 0)o.push("#",Rv(n.fragment));return o.join("")}var Yv=/^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u,Wv=/^(?:[^#/:?]+:)?\/\/([^/?#]*)/,Zv=/^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;function Qv(t,e){if(e[2]!==void 0&&t.path&&t.path[0]!=="/")return'URI path must start with "/" when authority is present.';if(typeof t.port==="number"&&(t.port<0||t.port>65535))return"URI port is malformed.";return}function t1(t){if(t===void 0)return!1;let e=t.indexOf("%");while(e!==-1){if(e+2>=t.length||!/^[\da-f]{2}$/iu.test(t.slice(e+1,e+3)))return!0;e=t.indexOf("%",e+3)}return!1}function _n(t){return t[0]==="["&&t[t.length-1]==="]"}function Xv(t){let e=t[4];return t1(t[3])||e!==void 0&&!_n(e)&&t1(e)||t1(t[6])||t1(t[7])||t1(t[8])}function L9(t,e,n,i){if(S9(t,e,n,i))return t.error=t.error||"URI host is malformed.",!0;if(!e.unicodeSupport&&(!n||!n.unicodeSupport)&&t.host&&!_n(t.host)&&(e.domainHost||n&&n.domainHost)&&i===!1&&Kv(t.host)){let o;try{o=new URL("http://"+t.host)}catch(r){return t.error=t.error||"Host's domain name can not be converted to ASCII: "+r,!0}if(!tw(o))return t.error=t.error||"URI host is malformed.",!0;t.host=o.hostname}return!1}function S9(t,e,n,i){return Boolean(t.host&&i===!1&&!_n(t.host)&&(e.domainHost||n&&n.domainHost)&&Uv.test(t.host))}function tw(t){return t.username===""&&t.password===""&&t.port===""&&t.pathname==="/"&&t.search===""&&t.hash===""&&t.hostname!==""}function Fn(t,e){let n=Object.assign({},e),i={scheme:void 0,userinfo:void 0,host:"",port:void 0,path:"",query:void 0,fragment:void 0},o=!1,r=!1,s=!1,l=!1,a=!1,c=!1,u=!1;if(n.reference==="suffix")if(n.scheme)t=n.scheme+":"+t;else t="//"+t;let f=t.match(Wv);if(f!==null&&f[1].indexOf("\\")!==-1)i.error="URI authority must not contain a literal backslash.",o=!0;let d=t.match(Zv);if(d!==null){let m=d[1],p=m.replace(/[\t\n\r]/g,"");if(p.length>=2){if(p.slice(0,2)!=="//")i.error=i.error||"URI authority must not contain a literal backslash.",o=!0;else if(m.length!==p.length)i.error=i.error||"URI authority introducer must not contain whitespace.",o=!0}}let h=t.match(Yv);if(h){if(i.scheme=h[1],i.userinfo=h[3],i.host=h[4],i.port=parseInt(h[5],10),i.path=h[6]||"",i.query=h[7],i.fragment=h[8],i.scheme!==void 0)if($9.test(i.scheme))i.scheme=i.scheme.toLowerCase();else i.error=i.error||"URI scheme is malformed.",c=!0;if(r=Xv(h),r)i.error=i.error||"URI contains malformed percent-encoding.";if(isNaN(i.port))i.port=h[5];let m=Qv(i,h);if(m!==void 0)i.error=i.error||m,o=!0;if(i.host)if(x9(i.host)===!1){let y=_n(i.host),v=i.host.indexOf("[")!==-1||i.host.indexOf("]")!==-1,w=C9(i.host);if(u=w.isIPV6||w.isIPVFuture===!0,a=v&&(!y||w.error===!0),i.host=u?w.host:w.host.toLowerCase(),a)i.error=i.error||"URI host is malformed.",o=!0}else u=!0;if(i.scheme===void 0&&i.userinfo===void 0&&i.host===void 0&&i.port===void 0&&i.query===void 0&&!i.path)i.reference="same-document";else if(i.scheme===void 0)i.reference="relative";else if(i.fragment===void 0)i.reference="absolute";else i.reference="uri";if(n.reference&&n.reference!=="suffix"&&n.reference!==i.reference)i.error=i.error||"URI is not a "+n.reference+" reference.";let p=ro(n.scheme||i.scheme);if(!a)l=L9(i,n,p,u);if(t.indexOf("%")!==-1&&i.host!==void 0&&!a){let g=u?i.host:oo(i.host,!0);if(!u)g=oo(g.toLowerCase());i.host=u||n.scheme!=="null"?Vv(g,u):g}if(!p||p&&!p.skipNormalize){if(i.path)i.path=qv(i.path);if(i.query)i.query=w9(i.query);if(i.fragment)i.fragment=w9(i.fragment)}if(p&&p.parse){if(p.parse(i,n),p===E9.urn&&i.nid===void 0)s=!0}}else i.error=i.error||"URI can not be parsed.";return{parsed:i,malformedAuthorityOrPort:o,malformedPercentEncoding:r,malformedSchemeSpecific:s,malformedHost:l,malformedScheme:c}}function Cn(t,e){return Fn(t,e).parsed}function ew(t,e){return A9(t,e).normalized}function A9(t,e){let{parsed:n,malformedAuthorityOrPort:i,malformedPercentEncoding:o,malformedSchemeSpecific:r,malformedHost:s,malformedScheme:l}=Fn(t,e);return{normalized:i||o||r||s||l?t:qe(n,e),malformedAuthorityOrPort:i,malformedPercentEncoding:o,malformedSchemeSpecific:r,malformedHost:s,malformedScheme:l}}function F9(t,e){if(typeof t!=="string"&&typeof t!=="object")return;let n;try{n=typeof t==="string"?t:qe(t,e)}catch{return}let{normalized:i,malformedAuthorityOrPort:o,malformedPercentEncoding:r,malformedSchemeSpecific:s,malformedHost:l,malformedScheme:a}=A9(n,e);return o||r||s||l||a?void 0:i}var so={SCHEMES:E9,normalize:Hv,resolve:Gv,resolveComponent:M9,equal:Jv,serialize:qe,parse:Cn};xn.exports=so;xn.exports.default=so;xn.exports.fastUri=so});var O9=k(function(P9){Object.defineProperty(P9,"__esModule",{value:!0});var j9=D9();j9.code='require("ajv/dist/runtime/uri").default';P9.default=j9});var U9=k(function(Xt){Object.defineProperty(Xt,"__esModule",{value:!0});Xt.CodeGen=Xt.Name=Xt.nil=Xt.stringify=Xt.str=Xt._=Xt.KeywordCxt=void 0;var iw=W0();Object.defineProperty(Xt,"KeywordCxt",{enumerable:!0,get:function(){return iw.KeywordCxt}});var p0=T();Object.defineProperty(Xt,"_",{enumerable:!0,get:function(){return p0._}});Object.defineProperty(Xt,"str",{enumerable:!0,get:function(){return p0.str}});Object.defineProperty(Xt,"stringify",{enumerable:!0,get:function(){return p0.stringify}});Object.defineProperty(Xt,"nil",{enumerable:!0,get:function(){return p0.nil}});Object.defineProperty(Xt,"Name",{enumerable:!0,get:function(){return p0.Name}});Object.defineProperty(Xt,"CodeGen",{enumerable:!0,get:function(){return p0.CodeGen}});var ow=yn(),q9=Z0(),B9=T2(),zt=X0(),R9=T(),qt=Y0(),me=J0(),c0=z(),N9=r9(),rw=O9(),V9=(t,e)=>new RegExp(t,e);V9.code="new RegExp";var sw=["removeAdditional","useDefaults","coerceTypes"],lw=new Set(["validate","serialize","parse","wrapper","root","schema","keyword","pattern","formats","validate$data","func","obj","Error"]),aw={errorDataPath:"",format:"`validateFormats: false` can be used instead.",nullable:'"nullable" keyword is supported by default.',jsonPointers:"Deprecated jsPropertySyntax can be used instead.",extendRefs:"Deprecated ignoreKeywordsWithRef can be used instead.",missingRefs:"Pass empty schema with $id that should be ignored to ajv.addSchema.",processCode:"Use option `code: {process: (code, schemaEnv: object) => string}`",sourceCode:"Use option `code: {source: true}`",strictDefaults:"It is default now, see option `strict`.",strictKeywords:"It is default now, see option `strict`.",uniqueItems:'"uniqueItems" keyword is always validated.',unknownFormats:"Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",cache:"Map is used as cache, schema object as key.",serialize:"Map is used as cache, schema object as key.",ajvErrors:"It is default now."},cw={ignoreKeywordsWithRef:"",jsPropertySyntax:"",unicode:'"minLength"/"maxLength" account for unicode characters by default.'},T9=200;function pw(t){var e,n,i,o,r,s,l,a,c,u,f,d,h,m,p,g,y,v,w,C,F,x,A,M,j;let V=t.strict,W=(e=t.code)===null||e===void 0?void 0:e.optimize,q=W===!0||W===void 0?1:W||0,E=(i=(n=t.code)===null||n===void 0?void 0:n.regExp)!==null&&i!==void 0?i:V9,P=(o=t.uriResolver)!==null&&o!==void 0?o:rw.default;return{strictSchema:(s=(r=t.strictSchema)!==null&&r!==void 0?r:V)!==null&&s!==void 0?s:!0,strictNumbers:(a=(l=t.strictNumbers)!==null&&l!==void 0?l:V)!==null&&a!==void 0?a:!0,strictTypes:(u=(c=t.strictTypes)!==null&&c!==void 0?c:V)!==null&&u!==void 0?u:"log",strictTuples:(d=(f=t.strictTuples)!==null&&f!==void 0?f:V)!==null&&d!==void 0?d:"log",strictRequired:(m=(h=t.strictRequired)!==null&&h!==void 0?h:V)!==null&&m!==void 0?m:!1,code:t.code?{...t.code,optimize:q,regExp:E}:{optimize:q,regExp:E},loopRequired:(p=t.loopRequired)!==null&&p!==void 0?p:T9,loopEnum:(g=t.loopEnum)!==null&&g!==void 0?g:T9,meta:(y=t.meta)!==null&&y!==void 0?y:!0,messages:(v=t.messages)!==null&&v!==void 0?v:!0,inlineRefs:(w=t.inlineRefs)!==null&&w!==void 0?w:!0,schemaId:(C=t.schemaId)!==null&&C!==void 0?C:"$id",addUsedSchema:(F=t.addUsedSchema)!==null&&F!==void 0?F:!0,validateSchema:(x=t.validateSchema)!==null&&x!==void 0?x:!0,validateFormats:(A=t.validateFormats)!==null&&A!==void 0?A:!0,unicodeRegExp:(M=t.unicodeRegExp)!==null&&M!==void 0?M:!0,int32range:(j=t.int32range)!==null&&j!==void 0?j:!0,uriResolver:P}}class En{constructor(t={}){this.schemas={},this.refs={},this.formats=Object.create(null),this._compilations=new Set,this._loading={},this._cache=new Map,t=this.opts={...t,...pw(t)};let{es5:e,lines:n}=this.opts.code;this.scope=new R9.ValueScope({scope:{},prefixes:lw,es5:e,lines:n}),this.logger=mw(t.logger);let i=t.validateFormats;if(t.validateFormats=!1,this.RULES=B9.getRules(),I9.call(this,aw,t,"NOT SUPPORTED"),I9.call(this,cw,t,"DEPRECATED","warn"),this._metaOpts=hw.call(this),t.formats)uw.call(this);if(this._addVocabularies(),this._addDefaultMetaSchema(),t.keywords)dw.call(this,t.keywords);if(typeof t.meta=="object")this.addMetaSchema(t.meta);fw.call(this),t.validateFormats=i}_addVocabularies(){this.addKeyword("$async")}_addDefaultMetaSchema(){let{$data:t,meta:e,schemaId:n}=this.opts,i=N9;if(n==="id")i={...N9},i.id=i.$id,delete i.$id;if(e&&t)this.addMetaSchema(i,i[n],!1)}defaultMeta(){let{meta:t,schemaId:e}=this.opts;return this.opts.defaultMeta=typeof t=="object"?t[e]||t:void 0}validate(t,e){let n;if(typeof t=="string"){if(n=this.getSchema(t),!n)throw Error(`no schema with key or ref "${t}"`)}else n=this.compile(t);let i=n(e);if(!("$async"in n))this.errors=n.errors;return i}compile(t,e){let n=this._addSchema(t,e);return n.validate||this._compileSchemaEnv(n)}compileAsync(t,e){if(typeof this.opts.loadSchema!="function")throw Error("options.loadSchema should be a function");let{loadSchema:n}=this.opts;return i.call(this,t,e);async function i(c,u){await o.call(this,c.$schema);let f=this._addSchema(c,u);return f.validate||r.call(this,f)}async function o(c){if(c&&!this.getSchema(c))await i.call(this,{$ref:c},!0)}async function r(c){try{return this._compileSchemaEnv(c)}catch(u){if(!(u instanceof q9.default))throw u;return s.call(this,u),await l.call(this,u.missingSchema),r.call(this,c)}}function s({missingSchema:c,missingRef:u}){if(this.refs[c])throw Error(`AnySchema ${c} is loaded but ${u} cannot be resolved`)}async function l(c){let u=await a.call(this,c);if(!this.refs[c])await o.call(this,u.$schema);if(!this.refs[c])this.addSchema(u,c,e)}async function a(c){let u=this._loading[c];if(u)return u;try{return await(this._loading[c]=n(c))}finally{delete this._loading[c]}}}addSchema(t,e,n,i=this.opts.validateSchema){if(Array.isArray(t)){for(let r of t)this.addSchema(r,void 0,n,i);return this}let o;if(typeof t==="object"){let{schemaId:r}=this.opts;if(o=t[r],o!==void 0&&typeof o!="string")throw Error(`schema ${r} must be string`)}return e=qt.normalizeId(e||o),this._checkUnique(e),this.schemas[e]=this._addSchema(t,n,e,i,!0),this}addMetaSchema(t,e,n=this.opts.validateSchema){return this.addSchema(t,e,!0,n),this}validateSchema(t,e){if(typeof t=="boolean")return!0;let n;if(n=t.$schema,n!==void 0&&typeof n!="string")throw Error("$schema must be a string");if(n=n||this.opts.defaultMeta||this.defaultMeta(),!n)return this.logger.warn("meta-schema not available"),this.errors=null,!0;let i=this.validate(n,t);if(!i&&e){let o="schema is invalid: "+this.errorsText();if(this.opts.validateSchema==="log")this.logger.error(o);else throw Error(o)}return i}getSchema(t){let e;while(typeof(e=z9.call(this,t))=="string")t=e;if(e===void 0){let{schemaId:n}=this.opts,i=new zt.SchemaEnv({schema:{},schemaId:n});if(e=zt.resolveSchema.call(this,i,t),!e)return;this.refs[t]=e}return e.validate||this._compileSchemaEnv(e)}removeSchema(t){if(t instanceof RegExp)return this._removeAllSchemas(this.schemas,t),this._removeAllSchemas(this.refs,t),this;switch(typeof t){case"undefined":return this._removeAllSchemas(this.schemas),this._removeAllSchemas(this.refs),this._cache.clear(),this;case"string":{let e=z9.call(this,t);if(typeof e=="object")this._cache.delete(e.schema);return delete this.schemas[t],delete this.refs[t],this}case"object":{let e=t;this._cache.delete(e);let n=t[this.opts.schemaId];if(n)n=qt.normalizeId(n),delete this.schemas[n],delete this.refs[n];return this}default:throw Error("ajv.removeSchema: invalid parameter")}}addVocabulary(t){for(let e of t)this.addKeyword(e);return this}addKeyword(t,e){let n;if(typeof t=="string"){if(n=t,typeof e=="object")this.logger.warn("these parameters are deprecated, see docs for addKeyword"),e.keyword=n}else if(typeof t=="object"&&e===void 0){if(e=t,n=e.keyword,Array.isArray(n)&&!n.length)throw Error("addKeywords: keyword must be string or non-empty array")}else throw Error("invalid addKeywords parameters");if(kw.call(this,n,e),!e)return c0.eachItem(n,(o)=>lo.call(this,o)),this;ww.call(this,e);let i={...e,type:me.getJSONTypes(e.type),schemaType:me.getJSONTypes(e.schemaType)};return c0.eachItem(n,i.type.length===0?(o)=>lo.call(this,o,i):(o)=>i.type.forEach((r)=>lo.call(this,o,i,r))),this}getKeyword(t){let e=this.RULES.all[t];return typeof e=="object"?e.definition:!!e}removeKeyword(t){let{RULES:e}=this;delete e.keywords[t],delete e.all[t];for(let n of e.rules){let i=n.rules.findIndex((o)=>o.keyword===t);if(i>=0)n.rules.splice(i,1)}return this}addFormat(t,e){if(typeof e=="string")e=new RegExp(e);return this.formats[t]=e,this}errorsText(t=this.errors,{separator:e=", ",dataVar:n="data"}={}){if(!t||t.length===0)return"No errors";return t.map((i)=>`${n}${i.instancePath} ${i.message}`).reduce((i,o)=>i+e+o)}$dataMetaSchema(t,e){let n=this.RULES.all;t=JSON.parse(JSON.stringify(t));for(let i of e){let o=i.split("/").slice(1),r=t;for(let s of o)r=r[s];for(let s in n){let l=n[s];if(typeof l!="object")continue;let{$data:a}=l.definition,c=r[s];if(a&&c)r[s]=K9(c)}}return t}_removeAllSchemas(t,e){for(let n in t){let i=t[n];if(!e||e.test(n)){if(typeof i=="string")delete t[n];else if(i&&!i.meta)this._cache.delete(i.schema),delete t[n]}}}_addSchema(t,e,n,i=this.opts.validateSchema,o=this.opts.addUsedSchema){let r,{schemaId:s}=this.opts;if(typeof t=="object")r=t[s];else if(this.opts.jtd)throw Error("schema must be object");else if(typeof t!="boolean")throw Error("schema must be object or boolean");let l=this._cache.get(t);if(l!==void 0)return l;n=qt.normalizeId(r||n);let a=qt.getSchemaRefs.call(this,t,n);if(l=new zt.SchemaEnv({schema:t,schemaId:s,meta:e,baseId:n,localRefs:a}),this._cache.set(l.schema,l),o&&!n.startsWith("#")){if(n)this._checkUnique(n);this.refs[n]=l}if(i)this.validateSchema(t,!0);return l}_checkUnique(t){if(this.schemas[t]||this.refs[t])throw Error(`schema with key or id "${t}" already exists`)}_compileSchemaEnv(t){if(t.meta)this._compileMetaSchema(t);else zt.compileSchema.call(this,t);if(!t.validate)throw Error("ajv implementation error");return t.validate}_compileMetaSchema(t){let e=this.opts;this.opts=this._metaOpts;try{zt.compileSchema.call(this,t)}finally{this.opts=e}}}En.ValidationError=ow.default;En.MissingRefError=q9.default;Xt.default=En;function I9(t,e,n,i="error"){for(let o in t){let r=o;if(r in e)this.logger[i](`${n}: option ${o}. ${t[r]}`)}}function z9(t){return t=qt.normalizeId(t),this.schemas[t]||this.refs[t]}function fw(){let t=this.opts.schemas;if(!t)return;if(Array.isArray(t))this.addSchema(t);else for(let e in t)this.addSchema(t[e],e)}function uw(){for(let t in this.opts.formats){let e=this.opts.formats[t];if(e)this.addFormat(t,e)}}function dw(t){if(Array.isArray(t)){this.addVocabulary(t);return}this.logger.warn("keywords option as map is deprecated, pass array");for(let e in t){let n=t[e];if(!n.keyword)n.keyword=e;this.addKeyword(n)}}function hw(){let t={...this.opts};for(let e of sw)delete t[e];return t}var gw={log(){},warn(){},error(){}};function mw(t){if(t===!1)return gw;if(t===void 0)return console;if(t.log&&t.warn&&t.error)return t;throw Error("logger must implement log, warn and error methods")}var yw=/^[a-z_$][a-z0-9_$:-]*$/i;function kw(t,e){let{RULES:n}=this;if(c0.eachItem(t,(i)=>{if(n.keywords[i])throw Error(`Keyword ${i} is already defined`);if(!yw.test(i))throw Error(`Keyword ${i} has invalid name`)}),!e)return;if(e.$data&&!(("code"in e)||("validate"in e)))throw Error('$data keyword must have "code" or "validate" function')}function lo(t,e,n){var i;let o=e===null||e===void 0?void 0:e.post;if(n&&o)throw Error('keyword with "post" flag cannot have "type"');let{RULES:r}=this,s=o?r.post:r.rules.find(({type:a})=>a===n);if(!s)s={type:n,rules:[]},r.rules.push(s);if(r.keywords[t]=!0,!e)return;let l={keyword:t,definition:{...e,type:me.getJSONTypes(e.type),schemaType:me.getJSONTypes(e.schemaType)}};if(e.before)vw.call(this,s,l,e.before);else s.rules.push(l);r.all[t]=l,(i=e.implements)===null||i===void 0||i.forEach((a)=>this.addKeyword(a))}function vw(t,e,n){let i=t.rules.findIndex((o)=>o.keyword===n);if(i>=0)t.rules.splice(i,0,e);else t.rules.push(e),this.logger.warn(`rule ${n} is not defined`)}function ww(t){let{metaSchema:e}=t;if(e===void 0)return;if(t.$data&&this.opts.$data)e=K9(e);t.validateSchema=this.compile(e,!0)}var bw={$ref:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"};function K9(t){return{anyOf:[t,bw]}}});var G9=k(function(H9){Object.defineProperty(H9,"__esModule",{value:!0});var _w={keyword:"id",code(){throw Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID')}};H9.default=_w});var Sn=k(function(Y9){Object.defineProperty(Y9,"__esModule",{value:!0});Y9.callRef=Y9.getValidate=void 0;var Ew=Z0(),Mn=$t(),Y=T(),f0=xt(),Ln=X0(),ye=z(),$w={keyword:"$ref",schemaType:"string",code(t){let{gen:e,schema:n,it:i}=t,{baseId:o,schemaEnv:r,validateName:s,opts:l,self:a}=i,{root:c}=r;if((n==="#"||n==="#/")&&o===c.baseId)return f();let u=Ln.resolveRef.call(a,c,o,n);if(u===void 0)throw new Ew.default(i.opts.uriResolver,o,n);if(u instanceof Ln.SchemaEnv)return d(u);return h(u);function f(){if(r===c)return $n(t,s,r,r.$async);let m=e.scopeValue("root",{ref:c});return $n(t,Y._`${m}.validate`,c,c.$async)}function d(m){let p=J9(t,m);$n(t,p,m,m.$async)}function h(m){let p=e.scopeValue("schema",l.code.source===!0?{ref:m,code:Y.stringify(m)}:{ref:m}),g=e.name("valid"),y=t.subschema({schema:m,dataTypes:[],schemaPath:Y.nil,topSchemaRef:p,errSchemaPath:n},g);t.mergeEvaluated(y),t.ok(g)}}};function J9(t,e){let{gen:n}=t;return e.validate?n.scopeValue("validate",{ref:e.validate}):Y._`${n.scopeValue("wrapper",{ref:e})}.validate`}Y9.getValidate=J9;function $n(t,e,n,i){let{gen:o,it:r}=t,{allErrors:s,schemaEnv:l,opts:a}=r,c=a.passContext?f0.default.this:Y.nil;if(i)u();else f();function u(){if(!l.$async)throw Error("async schema referenced by sync schema");let m=o.let("valid");o.try(()=>{if(o.code(Y._`await ${Mn.callValidateCode(t,e,c)}`),h(e),!s)o.assign(m,!0)},(p)=>{if(o.if(Y._`!(${p} instanceof ${r.ValidationError})`,()=>o.throw(p)),d(p),!s)o.assign(m,!1)}),t.ok(m)}function f(){t.result(Mn.callValidateCode(t,e,c),()=>h(e),()=>d(e))}function d(m){let p=Y._`${m}.errors`;o.assign(f0.default.vErrors,Y._`${f0.default.vErrors} === null ? ${p} : ${f0.default.vErrors}.concat(${p})`),o.assign(f0.default.errors,Y._`${f0.default.vErrors}.length`)}function h(m){var p;if(!r.opts.unevaluated)return;let g=(p=n===null||n===void 0?void 0:n.validate)===null||p===void 0?void 0:p.evaluated;if(r.props!==!0)if(g&&!g.dynamicProps){if(g.props!==void 0)r.props=ye.mergeEvaluated.props(o,g.props,r.props)}else{let y=o.var("props",Y._`${m}.evaluated.props`);r.props=ye.mergeEvaluated.props(o,y,r.props,Y.Name)}if(r.items!==!0)if(g&&!g.dynamicItems){if(g.items!==void 0)r.items=ye.mergeEvaluated.items(o,g.items,r.items)}else{let y=o.var("items",Y._`${m}.evaluated.items`);r.items=ye.mergeEvaluated.items(o,y,r.items,Y.Name)}}}Y9.callRef=$n;Y9.default=$w});var Q9=k(function(Z9){Object.defineProperty(Z9,"__esModule",{value:!0});var Sw=G9(),Aw=Sn(),Dw=["$schema","$id","$defs","$vocabulary",{keyword:"$comment"},"definitions",Sw.default,Aw.default];Z9.default=Dw});var ta=k(function(X9){Object.defineProperty(X9,"__esModule",{value:!0});var ve=T(),ke=ve.operators,An={maximum:{okStr:"<=",ok:ke.LTE,fail:ke.GT},minimum:{okStr:">=",ok:ke.GTE,fail:ke.LT},exclusiveMaximum:{okStr:"<",ok:ke.LT,fail:ke.GTE},exclusiveMinimum:{okStr:">",ok:ke.GT,fail:ke.LTE}},Pw={message:({keyword:t,schemaCode:e})=>ve.str`must be ${An[t].okStr} ${e}`,params:({keyword:t,schemaCode:e})=>ve._`{comparison: ${An[t].okStr}, limit: ${e}}`},Ow={keyword:Object.keys(An),type:"number",schemaType:"number",$data:!0,error:Pw,code(t){let{keyword:e,data:n,schemaCode:i}=t;t.fail$data(ve._`${n} ${An[e].fail} ${i} || isNaN(${n})`)}};X9.default=Ow});var na=k(function(ea){Object.defineProperty(ea,"__esModule",{value:!0});var Bt=T(),Tw={message:({schemaCode:t})=>Bt.str`must be multiple of ${t}`,params:({schemaCode:t})=>Bt._`{multipleOf: ${t}}`},Iw={keyword:"multipleOf",type:"number",schemaType:"number",$data:!0,error:Tw,code(t){let{gen:e,data:n,schemaCode:i,it:o}=t,r=o.opts.multipleOfPrecision,s=e.let("res"),l=r?Bt._`Math.abs(Math.round(${s}) - ${s}) > 1e-${r}`:Bt._`${s} !== parseInt(${s})`;t.fail$data(Bt._`(${i} === 0 || (${s} = ${n}/${i}, ${l}))`)}};ea.default=Iw});var ra=k(function(oa){Object.defineProperty(oa,"__esModule",{value:!0});function ia(t){let e=t.length,n=0,i=0,o;while(i<e)if(n++,o=t.charCodeAt(i++),o>=55296&&o<=56319&&i<e){if(o=t.charCodeAt(i),(o&64512)===56320)i++}return n}oa.default=ia;ia.code='require("ajv/dist/runtime/ucs2length").default'});var aa=k(function(la){Object.defineProperty(la,"__esModule",{value:!0});var ht=T(),sa=z(),Bw=ra(),Rw={message({keyword:t,schemaCode:e}){return ht.str`must NOT have ${t==="maxLength"?"more":"fewer"} than ${e} characters`},params:({schemaCode:t})=>ht._`{limit: ${t}}`},Vw={keyword:["maxLength","minLength"],type:"string",schemaType:"number",$data:!0,error:Rw,code(t){let{keyword:e,data:n,schemaCode:i,it:o}=t,r=e==="maxLength"?ht.operators.GT:ht.operators.LT,s=o.opts.unicode===!1?ht._`${n}.length`:ht._`${sa.useFunc(t.gen,Bw.default)}(${n})`;t.fail$data(ht._`${s} ${r} ${i}`)}};la.default=Vw});var ua=k(function(fa){Object.defineProperty(fa,"__esModule",{value:!0});var ca=$t(),pa=z(),Mt=T(),Uw={message:({schemaCode:t})=>Mt.str`must match pattern "${t}"`,params:({schemaCode:t})=>Mt._`{pattern: ${t}}`},Hw={keyword:"pattern",type:"string",schemaType:"string",$data:!0,error:Uw,code(t){let{gen:e,data:n,$data:i,schema:o,schemaCode:r,it:s}=t,l=s.opts.unicodeRegExp?"u":"";if(i){let{regExp:a}=s.opts.code,c=a.code==="new RegExp"?Mt._`new RegExp`:pa.useFunc(e,a),u=e.let("valid");e.try(()=>e.assign(u,Mt._`${c}(${r}, ${l}).test(${n})`),()=>e.assign(u,!1)),t.fail$data(Mt._`!${u}`)}else{let a=ca.usePattern(t,o);t.fail$data(Mt._`!${a}.test(${n})`)}}};fa.default=Hw});var ha=k(function(da){Object.defineProperty(da,"__esModule",{value:!0});var Rt=T(),Jw={message({keyword:t,schemaCode:e}){return Rt.str`must NOT have ${t==="maxProperties"?"more":"fewer"} than ${e} properties`},params:({schemaCode:t})=>Rt._`{limit: ${t}}`},Yw={keyword:["maxProperties","minProperties"],type:"object",schemaType:"number",$data:!0,error:Jw,code(t){let{keyword:e,data:n,schemaCode:i}=t,o=e==="maxProperties"?Rt.operators.GT:Rt.operators.LT;t.fail$data(Rt._`Object.keys(${n}).length ${o} ${i}`)}};da.default=Yw});var ya=k(function(ma){Object.defineProperty(ma,"__esModule",{value:!0});var Vt=$t(),Kt=T(),ga=z(),Zw={message:({params:{missingProperty:t}})=>Kt.str`must have required property '${t}'`,params:({params:{missingProperty:t}})=>Kt._`{missingProperty: ${t}}`},Qw={keyword:"required",type:"object",schemaType:"array",$data:!0,error:Zw,code(t){let{gen:e,schema:n,schemaCode:i,data:o,$data:r,it:s}=t,{opts:l}=s;if(!r&&n.length===0)return;let a=n.length>=l.loopRequired;if(s.allErrors)c();else u();if(l.strictRequired){let h=t.parentSchema.properties,{definedProperties:m}=t.it;for(let p of n)if((h===null||h===void 0?void 0:h[p])===void 0&&!m.has(p)){let g=s.schemaEnv.baseId+s.errSchemaPath,y=`required property "${p}" is not defined at "${g}" (strictRequired)`;ga.checkStrictMode(s,y,s.opts.strictRequired)}}function c(){if(a||r)t.block$data(Kt.nil,f);else for(let h of n)Vt.checkReportMissingProp(t,h)}function u(){let h=e.let("missing");if(a||r){let m=e.let("valid",!0);t.block$data(m,()=>d(h,m)),t.ok(m)}else e.if(Vt.checkMissingProp(t,n,h)),Vt.reportMissingProp(t,h),e.else()}function f(){e.forOf("prop",i,(h)=>{t.setParams({missingProperty:h}),e.if(Vt.noPropertyInData(e,o,h,l.ownProperties),()=>t.error())})}function d(h,m){t.setParams({missingProperty:h}),e.forOf(h,i,()=>{e.assign(m,Vt.propertyInData(e,o,h,l.ownProperties)),e.if(Kt.not(m),()=>{t.error(),e.break()})},Kt.nil)}}};ma.default=Qw});var va=k(function(ka){Object.defineProperty(ka,"__esModule",{value:!0});var Ut=T(),tb={message({keyword:t,schemaCode:e}){return Ut.str`must NOT have ${t==="maxItems"?"more":"fewer"} than ${e} items`},params:({schemaCode:t})=>Ut._`{limit: ${t}}`},eb={keyword:["maxItems","minItems"],type:"array",schemaType:"number",$data:!0,error:tb,code(t){let{keyword:e,data:n,schemaCode:i}=t,o=e==="maxItems"?Ut.operators.GT:Ut.operators.LT;t.fail$data(Ut._`${n}.length ${o} ${i}`)}};ka.default=eb});var Dn=k(function(ba){Object.defineProperty(ba,"__esModule",{value:!0});var wa=K2();wa.code='require("ajv/dist/runtime/equal").default';ba.default=wa});var _a=k(function(Ca){Object.defineProperty(Ca,"__esModule",{value:!0});var u0=J0(),R=T(),Fa=z(),ob=Dn(),rb={message:({params:{i:t,j:e}})=>R.str`must NOT have duplicate items (items ## ${e} and ${t} are identical)`,params:({params:{i:t,j:e}})=>R._`{i: ${t}, j: ${e}}`},sb={keyword:"uniqueItems",type:"array",schemaType:"boolean",$data:!0,error:rb,code(t){let{gen:e,data:n,$data:i,schema:o,parentSchema:r,schemaCode:s,it:l}=t;if(!i&&!o)return;let a=e.let("valid"),c=r.items?u0.getSchemaTypes(r.items):[];t.block$data(a,u,R._`${s} === false`),t.ok(a);function u(){let m=e.let("i",R._`${n}.length`),p=e.let("j");t.setParams({i:m,j:p}),e.assign(a,!0),e.if(R._`${m} > 1`,()=>(f()?d:h)(m,p))}function f(){return c.length>0&&!c.some((m)=>m==="object"||m==="array")}function d(m,p){let g=e.name("item"),y=u0.checkDataTypes(c,g,l.opts.strictNumbers,u0.DataType.Wrong),v=e.const("indices",R._`{}`);e.for(R._`;${m}--;`,()=>{if(e.let(g,R._`${n}[${m}]`),e.if(y,R._`continue`),c.length>1)e.if(R._`typeof ${g} == "string"`,R._`${g} += "_"`);e.if(R._`typeof ${v}[${g}] == "number"`,()=>{e.assign(p,R._`${v}[${g}]`),t.error(),e.assign(a,!1).break()}).code(R._`${v}[${g}] = ${m}`)})}function h(m,p){let g=Fa.useFunc(e,ob.default),y=e.name("outer");e.label(y).for(R._`;${m}--;`,()=>e.for(R._`${p} = ${m}; ${p}--;`,()=>e.if(R._`${g}(${n}[${m}], ${n}[${p}])`,()=>{t.error(),e.assign(a,!1).break(y)})))}}};Ca.default=sb});var $a=k(function(Ea){Object.defineProperty(Ea,"__esModule",{value:!0});var d0=T(),xa=z(),ab=Dn(),cb={message:"must be equal to constant",params:({schemaCode:t})=>d0._`{allowedValue: ${t}}`},pb={keyword:"const",$data:!0,error:cb,code(t){let{gen:e,data:n,$data:i,schemaCode:o,schema:r}=t;if(i||r&&typeof r=="object")t.fail$data(d0._`!${xa.useFunc(e,ab.default)}(${n}, ${o})`);else t.fail(d0._`${r} !== ${n}`)}};Ea.default=pb});var Sa=k(function(La){Object.defineProperty(La,"__esModule",{value:!0});var Ht=T(),Ma=z(),ub=Dn(),db={message:"must be equal to one of the allowed values",params:({schemaCode:t})=>Ht._`{allowedValues: ${t}}`},hb={keyword:"enum",schemaType:"array",$data:!0,error:db,code(t){let{gen:e,data:n,$data:i,schema:o,schemaCode:r,it:s}=t;if(!i&&o.length===0)throw Error("enum must have non-empty array");let l=o.length>=s.opts.loopEnum,a,c=()=>a!==null&&a!==void 0?a:a=Ma.useFunc(e,ub.default),u;if(l||i)u=e.let("valid"),t.block$data(u,f);else{if(!Array.isArray(o))throw Error("ajv implementation error");let h=e.const("vSchema",r);u=Ht.or(...o.map((m,p)=>d(h,p)))}t.pass(u);function f(){e.assign(u,!1),e.forOf("v",r,(h)=>e.if(Ht._`${c()}(${n}, ${h})`,()=>e.assign(u,!0).break()))}function d(h,m){let p=o[m];return typeof p==="object"&&p!==null?Ht._`${c()}(${n}, ${h}[${m}])`:Ht._`${n} === ${p}`}}};La.default=hb});var Da=k(function(Aa){Object.defineProperty(Aa,"__esModule",{value:!0});var mb=ta(),yb=na(),kb=aa(),vb=ua(),wb=ha(),bb=ya(),Fb=va(),Cb=_a(),_b=$a(),xb=Sa(),Eb=[mb.default,yb.default,kb.default,vb.default,wb.default,bb.default,Fb.default,Cb.default,{keyword:"type",schemaType:["string","array"]},{keyword:"nullable",schemaType:"boolean"},_b.default,xb.default];Aa.default=Eb});var ao=k(function(Pa){Object.defineProperty(Pa,"__esModule",{value:!0});Pa.validateAdditionalItems=void 0;var gt=T(),h0=z(),Mb={message:({params:{len:t}})=>gt.str`must NOT have more than ${t} items`,params:({params:{len:t}})=>gt._`{limit: ${t}}`},Lb={keyword:"additionalItems",type:"array",schemaType:["boolean","object"],before:"uniqueItems",error:Mb,code(t){let{parentSchema:e,it:n}=t,{items:i}=e;if(!Array.isArray(i)){h0.checkStrictMode(n,'"additionalItems" is ignored when "items" is not an array of schemas');return}ja(t,i)}};function ja(t,e){let{gen:n,schema:i,data:o,keyword:r,it:s}=t;s.items=!0;let l=n.const("len",gt._`${o}.length`);if(i===!1)t.setParams({len:e.length}),t.pass(gt._`${l} <= ${e.length}`);else if(typeof i=="object"&&!h0.alwaysValidSchema(s,i)){let c=n.var("valid",gt._`${l} <= ${e.length}`);n.if(gt.not(c),()=>a(c)),t.ok(c)}function a(c){n.forRange("i",e.length,l,(u)=>{if(t.subschema({keyword:r,dataProp:u,dataPropType:h0.Type.Num},c),!s.allErrors)n.if(gt.not(c),()=>n.break())})}}Pa.validateAdditionalItems=ja;Pa.default=Lb});var co=k(function(Ia){Object.defineProperty(Ia,"__esModule",{value:!0});Ia.validateTuple=void 0;var jn=T(),we=z(),Na=$t(),Ab={keyword:"items",type:"array",schemaType:["object","array","boolean"],before:"uniqueItems",code(t){let{schema:e,it:n}=t;if(Array.isArray(e))return Ta(t,"additionalItems",e);if(n.items=!0,we.alwaysValidSchema(n,e))return;t.ok(Na.validateArray(t))}};function Ta(t,e,n=t.schema){let{gen:i,parentSchema:o,data:r,keyword:s,it:l}=t;if(u(o),l.opts.unevaluated&&n.length&&l.items!==!0)l.items=we.mergeEvaluated.items(i,n.length,l.items);let a=i.name("valid"),c=i.const("len",jn._`${r}.length`);n.forEach((f,d)=>{if(we.alwaysValidSchema(l,f))return;i.if(jn._`${c} > ${d}`,()=>t.subschema({keyword:s,schemaProp:d,dataProp:d},a)),t.ok(a)});function u(f){let{opts:d,errSchemaPath:h}=l,m=n.length,p=m===f.minItems&&(m===f.maxItems||f[e]===!1);if(d.strictTuples&&!p){let g=`"${s}" is ${m}-tuple, but minItems or maxItems/${e} are not specified or different at path "${h}"`;we.checkStrictMode(l,g,d.strictTuples)}}}Ia.validateTuple=Ta;Ia.default=Ab});var Ra=k(function(Ba){Object.defineProperty(Ba,"__esModule",{value:!0});var qa=co(),jb={keyword:"prefixItems",type:"array",schemaType:["array"],before:"uniqueItems",code:(t)=>qa.validateTuple(t,"items")};Ba.default=jb});var Ga=k(function(Ha){Object.defineProperty(Ha,"__esModule",{value:!0});var Pn=T(),Va=z(),Ka=$t(),Ua=ao(),Ob={message:({params:{len:t}})=>Pn.str`must NOT have more than ${t} items`,params:({params:{len:t}})=>Pn._`{limit: ${t}}`},Nb={keyword:"items",type:"array",schemaType:["object","boolean"],before:"uniqueItems",error:Ob,code(t){let{schema:e,parentSchema:n,it:i}=t,{prefixItems:o}=n;if(i.items=!0,Va.alwaysValidSchema(i,e))return;if(o)Ua.validateAdditionalItems(t,o);else t.ok(Ka.validateArray(t))}};Ha.default=Nb});var Ya=k(function(Ja){Object.defineProperty(Ja,"__esModule",{value:!0});var Z=T(),be=z(),Ib={message:({params:{min:t,max:e}})=>e===void 0?Z.str`must contain at least ${t} valid item(s)`:Z.str`must contain at least ${t} and no more than ${e} valid item(s)`,params:({params:{min:t,max:e}})=>e===void 0?Z._`{minContains: ${t}}`:Z._`{minContains: ${t}, maxContains: ${e}}`},zb={keyword:"contains",type:"array",schemaType:["object","boolean"],before:"uniqueItems",trackErrors:!0,error:Ib,code(t){let{gen:e,schema:n,parentSchema:i,data:o,it:r}=t,s,l,{minContains:a,maxContains:c}=i;if(r.opts.next)s=a===void 0?1:a,l=c;else s=1;let u=e.const("len",Z._`${o}.length`);if(t.setParams({min:s,max:l}),l===void 0&&s===0){be.checkStrictMode(r,'"minContains" == 0 without "maxContains": "contains" keyword ignored');return}if(l!==void 0&&s>l){be.checkStrictMode(r,'"minContains" > "maxContains" is always invalid'),t.fail();return}if(be.alwaysValidSchema(r,n)){let p=Z._`${u} >= ${s}`;if(l!==void 0)p=Z._`${p} && ${u} <= ${l}`;t.pass(p);return}r.items=!0;let f=e.name("valid");if(l===void 0&&s===1)h(f,()=>e.if(f,()=>e.break()));else if(s===0){if(e.let(f,!0),l!==void 0)e.if(Z._`${o}.length > 0`,d)}else e.let(f,!1),d();t.result(f,()=>t.reset());function d(){let p=e.name("_valid"),g=e.let("count",0);h(p,()=>e.if(p,()=>m(g)))}function h(p,g){e.forRange("i",0,u,(y)=>{t.subschema({keyword:"contains",dataProp:y,dataPropType:be.Type.Num,compositeRule:!0},p),g()})}function m(p){if(e.code(Z._`${p}++`),l===void 0)e.if(Z._`${p} >= ${s}`,()=>e.assign(f,!0).break());else if(e.if(Z._`${p} > ${l}`,()=>e.assign(f,!1).break()),s===1)e.assign(f,!0);else e.if(Z._`${p} >= ${s}`,()=>e.assign(f,!0))}}};Ja.default=zb});var On=k(function(Xa){Object.defineProperty(Xa,"__esModule",{value:!0});Xa.validateSchemaDeps=Xa.validatePropertyDeps=Xa.error=void 0;var g0=T(),Wa=z(),Gt=$t();Xa.error={message:({params:{property:t,depsCount:e,deps:n}})=>g0.str`must have ${e===1?"property":"properties"} ${n} when property ${t} is present`,params:({params:{property:t,depsCount:e,deps:n,missingProperty:i}})=>g0._`{property: ${t},
    missingProperty: ${i},
    depsCount: ${e},
    deps: ${n}}`};var Bb={keyword:"dependencies",type:"object",schemaType:"object",error:Xa.error,code(t){let[e,n]=Rb(t);Za(t,e),Qa(t,n)}};function Rb({schema:t}){let e={},n={};for(let i in t){if(i==="__proto__")continue;let o=Array.isArray(t[i])?e:n;o[i]=t[i]}return[e,n]}function Za(t,e=t.schema){let{gen:n,data:i,it:o}=t;if(Object.keys(e).length===0)return;let r=n.let("missing");for(let s in e){let l=e[s];if(l.length===0)continue;let a=Gt.propertyInData(n,i,s,o.opts.ownProperties);if(t.setParams({property:s,depsCount:l.length,deps:l.join(", ")}),o.allErrors)n.if(a,()=>{for(let c of l)Gt.checkReportMissingProp(t,c)});else n.if(g0._`${a} && (${Gt.checkMissingProp(t,l,r)})`),Gt.reportMissingProp(t,r),n.else()}}Xa.validatePropertyDeps=Za;function Qa(t,e=t.schema){let{gen:n,data:i,keyword:o,it:r}=t,s=n.name("valid");for(let l in e){if(Wa.alwaysValidSchema(r,e[l]))continue;n.if(Gt.propertyInData(n,i,l,r.opts.ownProperties),()=>{let a=t.subschema({keyword:o,schemaProp:l},s);t.mergeValidEvaluated(a,s)},()=>n.var(s,!0)),t.ok(s)}}Xa.validateSchemaDeps=Qa;Xa.default=Bb});var o4=k(function(i4){Object.defineProperty(i4,"__esModule",{value:!0});var Nn=T(),n4=z(),Ub={message:"property name must be valid",params:({params:t})=>Nn._`{propertyName: ${t.propertyName}}`},Hb={keyword:"propertyNames",type:"object",schemaType:["object","boolean"],error:Ub,code(t){let{gen:e,schema:n,data:i,it:o}=t;if(n4.alwaysValidSchema(o,n))return;let r=e.name("valid");e.forIn("key",i,(s)=>{t.setParams({propertyName:s}),t.subschema({keyword:"propertyNames",data:s,dataTypes:["string"],propertyName:s,compositeRule:!0},r),e.if(Nn.not(r),()=>{if(t.error(!0),!o.allErrors)e.break()})}),t.ok(r)}};i4.default=Hb});var po=k(function(r4){Object.defineProperty(r4,"__esModule",{value:!0});var Fe=$t(),et=T(),Jb=xt(),Ce=z(),Yb={message:"must NOT have additional properties",params:({params:t})=>et._`{additionalProperty: ${t.additionalProperty}}`},Wb={keyword:"additionalProperties",type:["object"],schemaType:["boolean","object"],allowUndefined:!0,trackErrors:!0,error:Yb,code(t){let{gen:e,schema:n,parentSchema:i,data:o,errsCount:r,it:s}=t;if(!r)throw Error("ajv implementation error");let{allErrors:l,opts:a}=s;if(s.props=!0,a.removeAdditional!=="all"&&Ce.alwaysValidSchema(s,n))return;let c=Fe.allSchemaProperties(i.properties),u=Fe.allSchemaProperties(i.patternProperties);f(),t.ok(et._`${r} === ${Jb.default.errors}`);function f(){e.forIn("key",o,(g)=>{if(!c.length&&!u.length)m(g);else e.if(d(g),()=>m(g))})}function d(g){let y;if(c.length>8){let v=Ce.schemaRefOrVal(s,i.properties,"properties");y=Fe.isOwnProperty(e,v,g)}else if(c.length)y=et.or(...c.map((v)=>et._`${g} === ${v}`));else y=et.nil;if(u.length)y=et.or(y,...u.map((v)=>et._`${Fe.usePattern(t,v)}.test(${g})`));return et.not(y)}function h(g){e.code(et._`delete ${o}[${g}]`)}function m(g){if(a.removeAdditional==="all"||a.removeAdditional&&n===!1){h(g);return}if(n===!1){if(t.setParams({additionalProperty:g}),t.error(),!l)e.break();return}if(typeof n=="object"&&!Ce.alwaysValidSchema(s,n)){let y=e.name("valid");if(a.removeAdditional==="failing")p(g,y,!1),e.if(et.not(y),()=>{t.reset(),h(g)});else if(p(g,y),!l)e.if(et.not(y),()=>e.break())}}function p(g,y,v){let w={keyword:"additionalProperties",dataProp:g,dataPropType:Ce.Type.Str};if(v===!1)Object.assign(w,{compositeRule:!0,createErrors:!1,allErrors:!1});t.subschema(w,y)}}};r4.default=Wb});var c4=k(function(a4){Object.defineProperty(a4,"__esModule",{value:!0});var l4=W0(),Tn=$t(),m0=z(),s4=po(),Qb={keyword:"properties",type:"object",schemaType:"object",code(t){let{gen:e,schema:n,parentSchema:i,data:o,it:r}=t;if(r.opts.removeAdditional==="all"&&i.additionalProperties===void 0)s4.default.code(new l4.KeywordCxt(r,s4.default,"additionalProperties"));let s=Tn.allSchemaProperties(n);for(let f of s)r.definedProperties.add(f);if(r.opts.unevaluated&&s.length&&r.props!==!0)r.props=m0.mergeEvaluated.props(e,m0.toHash(s),r.props);let l=s.filter((f)=>!m0.alwaysValidSchema(r,n[f]));if(l.length===0)return;let a=e.name("valid");for(let f of l){if(c(f))u(f);else{if(e.if(Tn.propertyInData(e,o,f,r.opts.ownProperties)),u(f),!r.allErrors)e.else().var(a,!0);e.endIf()}t.it.definedProperties.add(f),t.ok(a)}function c(f){return r.opts.useDefaults&&!r.compositeRule&&n[f].default!==void 0}function u(f){t.subschema({keyword:"properties",schemaProp:f,dataProp:f},a)}}};a4.default=Qb});var f4=k(function(p4){Object.defineProperty(p4,"__esModule",{value:!0});var In=$t(),_e=T(),zn=z(),qn=z(),tF={keyword:"patternProperties",type:"object",schemaType:"object",code(t){let{gen:e,schema:n,data:i,parentSchema:o,it:r}=t,{opts:s}=r,l=In.allSchemaProperties(n),a=l.filter((p)=>zn.alwaysValidSchema(r,n[p]));if(l.length===0||a.length===l.length&&(!r.opts.unevaluated||r.props===!0))return;let c=s.strictSchema&&!s.allowMatchingProperties&&o.properties,u=e.name("valid");if(r.props!==!0&&!(r.props instanceof _e.Name))r.props=qn.evaluatedPropsToName(e,r.props);let{props:f}=r;d();function d(){for(let p of l){if(c)h(p);if(r.allErrors)m(p);else e.var(u,!0),m(p),e.if(u)}}function h(p){for(let g in c)if(new RegExp(p).test(g))zn.checkStrictMode(r,`property ${g} matches pattern ${p} (use allowMatchingProperties)`)}function m(p){e.forIn("key",i,(g)=>{e.if(_e._`${In.usePattern(t,p)}.test(${g})`,()=>{let y=a.includes(p);if(!y)t.subschema({keyword:"patternProperties",schemaProp:p,dataProp:g,dataPropType:qn.Type.Str},u);if(r.opts.unevaluated&&f!==!0)e.assign(_e._`${f}[${g}]`,!0);else if(!y&&!r.allErrors)e.if(_e.not(u),()=>e.break())})})}}};p4.default=tF});var h4=k(function(d4){Object.defineProperty(d4,"__esModule",{value:!0});var u4=z(),nF={keyword:"not",schemaType:["object","boolean"],trackErrors:!0,code(t){let{gen:e,schema:n,it:i}=t;if(u4.alwaysValidSchema(i,n)){t.fail();return}let o=e.name("valid");t.subschema({keyword:"not",compositeRule:!0,createErrors:!1,allErrors:!1},o),t.failResult(o,()=>t.reset(),()=>t.error())},error:{message:"must NOT be valid"}};d4.default=nF});var y4=k(function(m4){Object.defineProperty(m4,"__esModule",{value:!0});var g4=$t(),oF={keyword:"anyOf",schemaType:"array",trackErrors:!0,code:g4.validateUnion,error:{message:"must match a schema in anyOf"}};m4.default=oF});var w4=k(function(v4){Object.defineProperty(v4,"__esModule",{value:!0});var xe=T(),k4=z(),sF={message:"must match exactly one schema in oneOf",params:({params:t})=>xe._`{passingSchemas: ${t.passing}}`},lF={keyword:"oneOf",schemaType:"array",trackErrors:!0,error:sF,code(t){let{gen:e,schema:n,parentSchema:i,it:o}=t;if(!Array.isArray(n))throw Error("ajv implementation error");if(o.opts.discriminator&&i.discriminator)return;let r=n,s=e.let("valid",!1),l=e.let("passing",null),a=e.name("_valid");t.setParams({passing:l}),e.block(c),t.result(s,()=>t.reset(),()=>t.error(!0));function c(){r.forEach((u,f)=>{let d;if(k4.alwaysValidSchema(o,u))e.var(a,!0);else d=t.subschema({keyword:"oneOf",schemaProp:f,compositeRule:!0},a);if(f>0)e.if(xe._`${a} && ${s}`).assign(s,!1).assign(l,xe._`[${l}, ${f}]`).else();e.if(a,()=>{if(e.assign(s,!0),e.assign(l,f),d)t.mergeEvaluated(d,xe.Name)})})}}};v4.default=lF});var C4=k(function(F4){Object.defineProperty(F4,"__esModule",{value:!0});var b4=z(),cF={keyword:"allOf",schemaType:"array",code(t){let{gen:e,schema:n,it:i}=t;if(!Array.isArray(n))throw Error("ajv implementation error");let o=e.name("valid");n.forEach((r,s)=>{if(b4.alwaysValidSchema(i,r))return;let l=t.subschema({keyword:"allOf",schemaProp:s},o);t.ok(o),t.mergeEvaluated(l)})}};F4.default=cF});var E4=k(function(x4){Object.defineProperty(x4,"__esModule",{value:!0});var Ee=T(),Bn=z(),fF={message:({params:t})=>Ee.str`must match "${t.ifClause}" schema`,params:({params:t})=>Ee._`{failingKeyword: ${t.ifClause}}`},uF={keyword:"if",schemaType:["object","boolean"],trackErrors:!0,error:fF,code(t){let{gen:e,parentSchema:n,it:i}=t;if(n.then===void 0&&n.else===void 0)Bn.checkStrictMode(i,'"if" without "then" and "else" is ignored');let o=_4(i,"then"),r=_4(i,"else");if(!o&&!r)return;let s=e.let("valid",!0),l=e.name("_valid");if(a(),t.reset(),o&&r){let u=e.let("ifClause");t.setParams({ifClause:u}),e.if(l,c("then",u),c("else",u))}else if(o)e.if(l,c("then"));else e.if(Ee.not(l),c("else"));t.pass(s,()=>t.error(!0));function a(){let u=t.subschema({keyword:"if",compositeRule:!0,createErrors:!1,allErrors:!1},l);t.mergeEvaluated(u)}function c(u,f){return()=>{let d=t.subschema({keyword:u},l);if(e.assign(s,l),t.mergeValidEvaluated(d,s),f)e.assign(f,Ee._`${u}`);else t.setParams({ifClause:u})}}}};function _4(t,e){let n=t.schema[e];return n!==void 0&&!Bn.alwaysValidSchema(t,n)}x4.default=uF});var L4=k(function(M4){Object.defineProperty(M4,"__esModule",{value:!0});var $4=z(),hF={keyword:["then","else"],schemaType:["object","boolean"],code({keyword:t,parentSchema:e,it:n}){if(e.if===void 0)$4.checkStrictMode(n,`"${t}" without "if" is ignored`)}};M4.default=hF});var A4=k(function(S4){Object.defineProperty(S4,"__esModule",{value:!0});var mF=ao(),yF=Ra(),kF=co(),vF=Ga(),wF=Ya(),bF=On(),FF=o4(),CF=po(),_F=c4(),xF=f4(),EF=h4(),$F=y4(),MF=w4(),LF=C4(),SF=E4(),AF=L4();function DF(t=!1){let e=[EF.default,$F.default,MF.default,LF.default,SF.default,AF.default,FF.default,CF.default,bF.default,_F.default,xF.default];if(t)e.push(yF.default,vF.default);else e.push(mF.default,kF.default);return e.push(wF.default),e}S4.default=DF});var fo=k(function(P4){Object.defineProperty(P4,"__esModule",{value:!0});P4.dynamicAnchor=void 0;var y0=T(),PF=xt(),Rn=X0(),D4=Sn(),OF={keyword:"$dynamicAnchor",schemaType:"string",code:(t)=>j4(t,t.schema)};function j4(t,e){let{gen:n,it:i}=t;i.schemaEnv.root.dynamicAnchors[e]=!0;let o=y0._`${PF.default.dynamicAnchors}${y0.getProperty(e)}`,r=i.errSchemaPath==="#"?i.validateName:NF(t);n.if(y0._`!${o}`,()=>n.assign(o,r))}P4.dynamicAnchor=j4;function NF(t){let{schemaEnv:e,schema:n,self:i}=t.it,{root:o,baseId:r,localRefs:s,meta:l}=e.root,{schemaId:a}=i.opts,c=new Rn.SchemaEnv({schema:n,schemaId:a,root:o,baseId:r,localRefs:s,meta:l});return Rn.compileSchema.call(i,c),D4.getValidate(t,c)}P4.default=OF});var uo=k(function(T4){Object.defineProperty(T4,"__esModule",{value:!0});T4.dynamicRef=void 0;var Vn=T(),IF=xt(),Kn=Sn(),zF={keyword:"$dynamicRef",schemaType:"string",code:(t)=>N4(t,t.schema)};function N4(t,e){let{gen:n,keyword:i,it:o}=t;if(e[0]!=="#")throw Error(`"${i}" only supports hash fragment reference`);let r=e.slice(1);if(o.allErrors)s();else{let a=n.let("valid",!1);s(a),t.ok(a)}function s(a){if(o.schemaEnv.root.dynamicAnchors[r]){let c=n.let("_v",Vn._`${IF.default.dynamicAnchors}${Vn.getProperty(r)}`);n.if(c,l(c,a),l(o.validateName,a))}else l(o.validateName,a)()}function l(a,c){return c?()=>n.block(()=>{Kn.callRef(t,a),n.let(c,!0)}):()=>Kn.callRef(t,a)}}T4.dynamicRef=N4;T4.default=zF});var R4=k(function(B4){Object.defineProperty(B4,"__esModule",{value:!0});var z4=fo(),q4=z(),BF={keyword:"$recursiveAnchor",schemaType:"boolean",code(t){if(t.schema)z4.dynamicAnchor(t,"");else q4.checkStrictMode(t.it,"$recursiveAnchor: false is ignored")}};B4.default=BF});var U4=k(function(K4){Object.defineProperty(K4,"__esModule",{value:!0});var V4=uo(),VF={keyword:"$recursiveRef",schemaType:"string",code:(t)=>V4.dynamicRef(t,t.schema)};K4.default=VF});var G4=k(function(H4){Object.defineProperty(H4,"__esModule",{value:!0});var UF=fo(),HF=uo(),GF=R4(),JF=U4(),YF=[UF.default,HF.default,GF.default,JF.default];H4.default=YF});var Y4=k(function(J4){Object.defineProperty(J4,"__esModule",{value:!0});var Un=On(),ZF={keyword:"dependentRequired",type:"object",schemaType:"object",error:Un.error,code:(t)=>Un.validatePropertyDeps(t)};J4.default=ZF});var Q4=k(function(Z4){Object.defineProperty(Z4,"__esModule",{value:!0});var W4=On(),XF={keyword:"dependentSchemas",type:"object",schemaType:"object",code:(t)=>W4.validateSchemaDeps(t)};Z4.default=XF});var ec=k(function(tc){Object.defineProperty(tc,"__esModule",{value:!0});var X4=z(),eC={keyword:["maxContains","minContains"],type:"array",schemaType:"number",code({keyword:t,parentSchema:e,it:n}){if(e.contains===void 0)X4.checkStrictMode(n,`"${t}" without "contains" is ignored`)}};tc.default=eC});var ic=k(function(nc){Object.defineProperty(nc,"__esModule",{value:!0});var iC=Y4(),oC=Q4(),rC=ec(),sC=[iC.default,oC.default,rC.default];nc.default=sC});var rc=k(function(oc){Object.defineProperty(oc,"__esModule",{value:!0});var at=T(),Hn=z(),aC=xt(),cC={message:"must NOT have unevaluated properties",params:({params:t})=>at._`{unevaluatedProperty: ${t.unevaluatedProperty}}`},pC={keyword:"unevaluatedProperties",type:"object",schemaType:["boolean","object"],trackErrors:!0,error:cC,code(t){let{gen:e,schema:n,data:i,errsCount:o,it:r}=t;if(!o)throw Error("ajv implementation error");let{allErrors:s,props:l}=r;if(l instanceof at.Name)e.if(at._`${l} !== true`,()=>e.forIn("key",i,(f)=>e.if(c(l,f),()=>a(f))));else if(l!==!0)e.forIn("key",i,(f)=>l===void 0?a(f):e.if(u(l,f),()=>a(f)));r.props=!0,t.ok(at._`${o} === ${aC.default.errors}`);function a(f){if(n===!1){if(t.setParams({unevaluatedProperty:f}),t.error(),!s)e.break();return}if(!Hn.alwaysValidSchema(r,n)){let d=e.name("valid");if(t.subschema({keyword:"unevaluatedProperties",dataProp:f,dataPropType:Hn.Type.Str},d),!s)e.if(at.not(d),()=>e.break())}}function c(f,d){return at._`!${f} || !${f}[${d}]`}function u(f,d){let h=[];for(let m in f)if(f[m]===!0)h.push(at._`${d} !== ${m}`);return at.and(...h)}}};oc.default=pC});var lc=k(function(sc){Object.defineProperty(sc,"__esModule",{value:!0});var mt=T(),Gn=z(),uC={message:({params:{len:t}})=>mt.str`must NOT have more than ${t} items`,params:({params:{len:t}})=>mt._`{limit: ${t}}`},dC={keyword:"unevaluatedItems",type:"array",schemaType:["boolean","object"],error:uC,code(t){let{gen:e,schema:n,data:i,it:o}=t,r=o.items||0;if(r===!0)return;let s=e.const("len",mt._`${i}.length`);if(n===!1)t.setParams({len:r}),t.fail(mt._`${s} > ${r}`);else if(typeof n=="object"&&!Gn.alwaysValidSchema(o,n)){let a=e.var("valid",mt._`${s} <= ${r}`);e.if(mt.not(a),()=>l(a,r)),t.ok(a)}o.items=!0;function l(a,c){e.forRange("i",c,s,(u)=>{if(t.subschema({keyword:"unevaluatedItems",dataProp:u,dataPropType:Gn.Type.Num},a),!o.allErrors)e.if(mt.not(a),()=>e.break())})}}};sc.default=dC});var cc=k(function(ac){Object.defineProperty(ac,"__esModule",{value:!0});var gC=rc(),mC=lc(),yC=[gC.default,mC.default];ac.default=yC});var fc=k(function(pc){Object.defineProperty(pc,"__esModule",{value:!0});var I=T(),vC={message:({schemaCode:t})=>I.str`must match format "${t}"`,params:({schemaCode:t})=>I._`{format: ${t}}`},wC={keyword:"format",type:["number","string"],schemaType:"string",$data:!0,error:vC,code(t,e){let{gen:n,data:i,$data:o,schema:r,schemaCode:s,it:l}=t,{opts:a,errSchemaPath:c,schemaEnv:u,self:f}=l;if(!a.validateFormats)return;if(o)d();else h();function d(){let m=n.scopeValue("formats",{ref:f.formats,code:a.code.formats}),p=n.const("fDef",I._`${m}[${s}]`),g=n.let("fType"),y=n.let("format");n.if(I._`typeof ${p} == "object" && !(${p} instanceof RegExp)`,()=>n.assign(g,I._`${p}.type || "string"`).assign(y,I._`${p}.validate`),()=>n.assign(g,I._`"string"`).assign(y,p)),t.fail$data(I.or(v(),w()));function v(){if(a.strictSchema===!1)return I.nil;return I._`${s} && !${y}`}function w(){let C=u.$async?I._`(${p}.async ? await ${y}(${i}) : ${y}(${i}))`:I._`${y}(${i})`,F=I._`(typeof ${y} == "function" ? ${C} : ${y}.test(${i}))`;return I._`${y} && ${y} !== true && ${g} === ${e} && !${F}`}}function h(){let m=f.formats[r];if(!m){v();return}if(m===!0)return;let[p,g,y]=w(m);if(p===e)t.pass(C());function v(){if(a.strictSchema===!1){f.logger.warn(F());return}throw Error(F());function F(){return`unknown format "${r}" ignored in schema at path "${c}"`}}function w(F){let x=F instanceof RegExp?I.regexpCode(F):a.code.formats?I._`${a.code.formats}${I.getProperty(r)}`:void 0,A=n.scopeValue("formats",{key:r,ref:F,code:x});if(typeof F=="object"&&!(F instanceof RegExp))return[F.type||"string",F.validate,I._`${A}.validate`];return["string",F,A]}function C(){if(typeof m=="object"&&!(m instanceof RegExp)&&m.async){if(!u.$async)throw Error("async format in sync schema");return I._`await ${y}(${i})`}return typeof g=="function"?I._`${y}(${i})`:I._`${y}.test(${i})`}}}};pc.default=wC});var dc=k(function(uc){Object.defineProperty(uc,"__esModule",{value:!0});var FC=fc(),CC=[FC.default];uc.default=CC});var mc=k(function(hc){Object.defineProperty(hc,"__esModule",{value:!0});hc.contentVocabulary=hc.metadataVocabulary=void 0;hc.metadataVocabulary=["title","description","default","deprecated","readOnly","writeOnly","examples"];hc.contentVocabulary=["contentMediaType","contentEncoding","contentSchema"]});var kc=k(function(yc){Object.defineProperty(yc,"__esModule",{value:!0});var EC=Q9(),$C=Da(),MC=A4(),LC=G4(),SC=ic(),AC=cc(),DC=dc(),Jn=mc(),jC=[LC.default,EC.default,$C.default,(0,MC.default)(!0),DC.default,Jn.metadataVocabulary,Jn.contentVocabulary,SC.default,AC.default];yc.default=jC});var Fc=k(function(wc){Object.defineProperty(wc,"__esModule",{value:!0});wc.DiscrError=void 0;var vc;(function(t){t.Tag="tag",t.Mapping="mapping"})(vc||(wc.DiscrError=vc={}))});var xc=k(function(_c){Object.defineProperty(_c,"__esModule",{value:!0});var Lt=T(),k0=Fc(),Yn=X0(),OC=Z0(),Cc=z(),NC={message:({params:{discrError:t,tagName:e}})=>t===k0.DiscrError.Tag?`tag "${e}" must be string`:`value of tag "${e}" must be in oneOf`,params:({params:{discrError:t,tag:e,tagName:n}})=>Lt._`{error: ${t}, tag: ${n}, tagValue: ${e}}`},TC={keyword:"discriminator",type:"object",schemaType:"object",error:NC,code(t){let{gen:e,data:n,schema:i,parentSchema:o,it:r}=t,{oneOf:s}=o;if(!r.opts.discriminator)throw Error("discriminator: requires discriminator option");let l=i.propertyName;if(typeof l!="string")throw Error("discriminator: requires propertyName");if(i.mapping)throw Error("discriminator: mapping is not supported");if(!s)throw Error("discriminator: requires oneOf keyword");let a=e.let("valid",!1),c=e.const("tag",Lt._`${n}${Lt.getProperty(l)}`);e.if(Lt._`typeof ${c} == "string"`,()=>u(),()=>t.error(!1,{discrError:k0.DiscrError.Tag,tag:c,tagName:l})),t.ok(a);function u(){let h=d();e.if(!1);for(let m in h)e.elseIf(Lt._`${c} === ${m}`),e.assign(a,f(h[m]));e.else(),t.error(!1,{discrError:k0.DiscrError.Mapping,tag:c,tagName:l}),e.endIf()}function f(h){let m=e.name("valid"),p=t.subschema({keyword:"oneOf",schemaProp:h},m);return t.mergeEvaluated(p,Lt.Name),m}function d(){var h;let m={},p=y(o),g=!0;for(let C=0;C<s.length;C++){let F=s[C];if((F===null||F===void 0?void 0:F.$ref)&&!Cc.schemaHasRulesButRef(F,r.self.RULES)){let A=F.$ref;if(F=Yn.resolveRef.call(r.self,r.schemaEnv.root,r.baseId,A),F instanceof Yn.SchemaEnv)F=F.schema;if(F===void 0)throw new OC.default(r.opts.uriResolver,r.baseId,A)}let x=(h=F===null||F===void 0?void 0:F.properties)===null||h===void 0?void 0:h[l];if(typeof x!="object")throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);g=g&&(p||y(F)),v(x,C)}if(!g)throw Error(`discriminator: "${l}" must be required`);return m;function y({required:C}){return Array.isArray(C)&&C.includes(l)}function v(C,F){if(C.const)w(C.const,F);else if(C.enum)for(let x of C.enum)w(x,F);else throw Error(`discriminator: "properties/${l}" must have "const" or "enum"`)}function w(C,F){if(typeof C!="string"||C in m)throw Error(`discriminator: "${l}" values must be unique strings`);m[C]=F}}}};_c.default=TC});var Ec=k(function(cM,zC){zC.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/schema",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/core":!0,"https://json-schema.org/draft/2020-12/vocab/applicator":!0,"https://json-schema.org/draft/2020-12/vocab/unevaluated":!0,"https://json-schema.org/draft/2020-12/vocab/validation":!0,"https://json-schema.org/draft/2020-12/vocab/meta-data":!0,"https://json-schema.org/draft/2020-12/vocab/format-annotation":!0,"https://json-schema.org/draft/2020-12/vocab/content":!0},$dynamicAnchor:"meta",title:"Core and Validation specifications meta-schema",allOf:[{$ref:"meta/core"},{$ref:"meta/applicator"},{$ref:"meta/unevaluated"},{$ref:"meta/validation"},{$ref:"meta/meta-data"},{$ref:"meta/format-annotation"},{$ref:"meta/content"}],type:["object","boolean"],$comment:"This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.",properties:{definitions:{$comment:'"definitions" has been replaced by "$defs".',type:"object",additionalProperties:{$dynamicRef:"#meta"},deprecated:!0,default:{}},dependencies:{$comment:'"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',type:"object",additionalProperties:{anyOf:[{$dynamicRef:"#meta"},{$ref:"meta/validation#/$defs/stringArray"}]},deprecated:!0,default:{}},$recursiveAnchor:{$comment:'"$recursiveAnchor" has been replaced by "$dynamicAnchor".',$ref:"meta/core#/$defs/anchorString",deprecated:!0},$recursiveRef:{$comment:'"$recursiveRef" has been replaced by "$dynamicRef".',$ref:"meta/core#/$defs/uriReferenceString",deprecated:!0}}}});var $c=k(function(pM,qC){qC.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/applicator",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/applicator":!0},$dynamicAnchor:"meta",title:"Applicator vocabulary meta-schema",type:["object","boolean"],properties:{prefixItems:{$ref:"#/$defs/schemaArray"},items:{$dynamicRef:"#meta"},contains:{$dynamicRef:"#meta"},additionalProperties:{$dynamicRef:"#meta"},properties:{type:"object",additionalProperties:{$dynamicRef:"#meta"},default:{}},patternProperties:{type:"object",additionalProperties:{$dynamicRef:"#meta"},propertyNames:{format:"regex"},default:{}},dependentSchemas:{type:"object",additionalProperties:{$dynamicRef:"#meta"},default:{}},propertyNames:{$dynamicRef:"#meta"},if:{$dynamicRef:"#meta"},then:{$dynamicRef:"#meta"},else:{$dynamicRef:"#meta"},allOf:{$ref:"#/$defs/schemaArray"},anyOf:{$ref:"#/$defs/schemaArray"},oneOf:{$ref:"#/$defs/schemaArray"},not:{$dynamicRef:"#meta"}},$defs:{schemaArray:{type:"array",minItems:1,items:{$dynamicRef:"#meta"}}}}});var Mc=k(function(fM,BC){BC.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/unevaluated",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/unevaluated":!0},$dynamicAnchor:"meta",title:"Unevaluated applicator vocabulary meta-schema",type:["object","boolean"],properties:{unevaluatedItems:{$dynamicRef:"#meta"},unevaluatedProperties:{$dynamicRef:"#meta"}}}});var Lc=k(function(uM,RC){RC.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/content",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/content":!0},$dynamicAnchor:"meta",title:"Content vocabulary meta-schema",type:["object","boolean"],properties:{contentEncoding:{type:"string"},contentMediaType:{type:"string"},contentSchema:{$dynamicRef:"#meta"}}}});var Sc=k(function(dM,VC){VC.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/core",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/core":!0},$dynamicAnchor:"meta",title:"Core vocabulary meta-schema",type:["object","boolean"],properties:{$id:{$ref:"#/$defs/uriReferenceString",$comment:"Non-empty fragments not allowed.",pattern:"^[^#]*#?$"},$schema:{$ref:"#/$defs/uriString"},$ref:{$ref:"#/$defs/uriReferenceString"},$anchor:{$ref:"#/$defs/anchorString"},$dynamicRef:{$ref:"#/$defs/uriReferenceString"},$dynamicAnchor:{$ref:"#/$defs/anchorString"},$vocabulary:{type:"object",propertyNames:{$ref:"#/$defs/uriString"},additionalProperties:{type:"boolean"}},$comment:{type:"string"},$defs:{type:"object",additionalProperties:{$dynamicRef:"#meta"}}},$defs:{anchorString:{type:"string",pattern:"^[A-Za-z_][-A-Za-z0-9._]*$"},uriString:{type:"string",format:"uri"},uriReferenceString:{type:"string",format:"uri-reference"}}}});var Ac=k(function(hM,KC){KC.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/format-annotation",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/format-annotation":!0},$dynamicAnchor:"meta",title:"Format vocabulary meta-schema for annotation results",type:["object","boolean"],properties:{format:{type:"string"}}}});var Dc=k(function(gM,UC){UC.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/meta-data",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/meta-data":!0},$dynamicAnchor:"meta",title:"Meta-data vocabulary meta-schema",type:["object","boolean"],properties:{title:{type:"string"},description:{type:"string"},default:!0,deprecated:{type:"boolean",default:!1},readOnly:{type:"boolean",default:!1},writeOnly:{type:"boolean",default:!1},examples:{type:"array",items:!0}}}});var jc=k(function(mM,HC){HC.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/validation",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/validation":!0},$dynamicAnchor:"meta",title:"Validation vocabulary meta-schema",type:["object","boolean"],properties:{type:{anyOf:[{$ref:"#/$defs/simpleTypes"},{type:"array",items:{$ref:"#/$defs/simpleTypes"},minItems:1,uniqueItems:!0}]},const:!0,enum:{type:"array",items:!0},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/$defs/nonNegativeInteger"},minLength:{$ref:"#/$defs/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},maxItems:{$ref:"#/$defs/nonNegativeInteger"},minItems:{$ref:"#/$defs/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},maxContains:{$ref:"#/$defs/nonNegativeInteger"},minContains:{$ref:"#/$defs/nonNegativeInteger",default:1},maxProperties:{$ref:"#/$defs/nonNegativeInteger"},minProperties:{$ref:"#/$defs/nonNegativeIntegerDefault0"},required:{$ref:"#/$defs/stringArray"},dependentRequired:{type:"object",additionalProperties:{$ref:"#/$defs/stringArray"}}},$defs:{nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{$ref:"#/$defs/nonNegativeInteger",default:0},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}}}});var Oc=k(function(Pc){Object.defineProperty(Pc,"__esModule",{value:!0});var GC=Ec(),JC=$c(),YC=Mc(),WC=Lc(),ZC=Sc(),QC=Ac(),XC=Dc(),t_=jc(),e_=["/properties"];function n_(t){return[GC,JC,YC,WC,ZC,e(this,QC),XC,e(this,t_)].forEach((n)=>this.addMetaSchema(n,void 0,!1)),this;function e(n,i){return t?n.$dataMetaSchema(i,e_):i}}Pc.default=n_});var Nc=k(function(yt,go){Object.defineProperty(yt,"__esModule",{value:!0});yt.MissingRefError=yt.ValidationError=yt.CodeGen=yt.Name=yt.nil=yt.stringify=yt.str=yt._=yt.KeywordCxt=yt.Ajv2020=void 0;var o_=U9(),r_=kc(),s_=xc(),l_=Oc(),ho="https://json-schema.org/draft/2020-12/schema";class n1 extends o_.default{constructor(t={}){super({...t,dynamicRef:!0,next:!0,unevaluated:!0})}_addVocabularies(){if(super._addVocabularies(),r_.default.forEach((t)=>this.addVocabulary(t)),this.opts.discriminator)this.addKeyword(s_.default)}_addDefaultMetaSchema(){super._addDefaultMetaSchema();let{$data:t,meta:e}=this.opts;if(!e)return;l_.default.call(this,t),this.refs["http://json-schema.org/schema"]=ho}defaultMeta(){return this.opts.defaultMeta=super.defaultMeta()||(this.getSchema(ho)?ho:void 0)}}yt.Ajv2020=n1;go.exports=yt=n1;go.exports.Ajv2020=n1;Object.defineProperty(yt,"__esModule",{value:!0});yt.default=n1;var a_=W0();Object.defineProperty(yt,"KeywordCxt",{enumerable:!0,get:function(){return a_.KeywordCxt}});var v0=T();Object.defineProperty(yt,"_",{enumerable:!0,get:function(){return v0._}});Object.defineProperty(yt,"str",{enumerable:!0,get:function(){return v0.str}});Object.defineProperty(yt,"stringify",{enumerable:!0,get:function(){return v0.stringify}});Object.defineProperty(yt,"nil",{enumerable:!0,get:function(){return v0.nil}});Object.defineProperty(yt,"Name",{enumerable:!0,get:function(){return v0.Name}});Object.defineProperty(yt,"CodeGen",{enumerable:!0,get:function(){return v0.CodeGen}});var c_=yn();Object.defineProperty(yt,"ValidationError",{enumerable:!0,get:function(){return c_.default}});var p_=Z0();Object.defineProperty(yt,"MissingRefError",{enumerable:!0,get:function(){return p_.default}})});import{writeFile as Bc}from"fs/promises";import{basename as w_,dirname as b_,extname as F_,join as C_}from"path";var ph=Wi(),fh=N0(),uh=Pi(),a2=T0(),dh=F0(),ae=B(),hh=ie(),gh=nt(),mh=re(),yh=se(),Kx=V1(),kh=r2(),vh=s2(),wh=l2(),G1=Ls(),Ss=w0();var bh=ph.Composer,Fh=fh.Document,Ch=uh.Schema,{YAMLError:_h,YAMLParseError:c2,YAMLWarning:xh}=a2,Eh=dh.Alias,{isAlias:$h,isCollection:Mh,isDocument:Lh,isMap:Sh,isNode:Ah,isPair:Dh,isScalar:jh,isSeq:Ph}=ae,Oh=hh.Pair,Nh=gh.Scalar,Th=mh.YAMLMap,Ih=yh.YAMLSeq;var zh=kh.Lexer,qh=vh.LineCounter,Bh=wh.Parser,{parse:p2,parseAllDocuments:Rh,parseDocument:Vh,stringify:f2}=G1,{visit:Kh,visitAsync:Uh}=Ss;import{readdirSync as Hh,readFileSync as Gh}from"fs";var Zt={player:'var Q=typeof window<"u",ne=Q?window:null,Ht=Q?document:null,rt={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},G={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},v={NONE:0,AUTO:1,FORCE:2},I={replace:0,none:1,blend:2},Or=Symbol(),Vs=Symbol(),qs=Symbol(),Me=Symbol(),Xs=Symbol(),b=0.00000000001,Bt=1000000000000,ot=1000,Ut=240,Se="";var Vt=["perspective","translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY"],yn=Vt.reduce((t,e)=>({...t,[e]:e+"("}),{}),L=()=>{},_n=(t)=>t;var vt={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:Ut,loop:0,reversed:!1,alternate:!1,autoplay:!0,persist:!1,duration:ot,delay:0,loopDelay:0,ease:"out(2)",composition:I.replace,modifier:_n,onBegin:L,onBeforeUpdate:L,onUpdate:L,onLoop:L,onPause:L,onComplete:L,onRender:L},ve={current:null,root:Ht},E={defaults:vt,precision:4,timeScale:1,tickThreshold:200,editor:null},Ee={version:"4.5.0",engine:null};if(Q){if(!ne.AnimeJS)ne.AnimeJS=[];ne.AnimeJS.push(Ee)}var j=Date.now,zs=Array.isArray;var se=(t)=>typeof t==="function",it=(t)=>typeof t>"u";var Mn=Math.floor;var Tn=Math.round,V=(t,e,n)=>t<e?e:t>n?n:t,M=(t,e)=>{if(e<0)return t;if(!e)return Tn(t);let n=10**e;return Tn(t*n)/n};var Et=(t,e,n)=>n===1?e:n===0?t:t+(e-t)*n,we=(t)=>t===1/0?Bt:t===-1/0?-Bt:t,Ae=(t)=>t<=b?b:we(M(t,11)),ht=(t)=>zs(t)?[...t]:t;var A=(t,e,n,s="_prev",r="_next")=>{let o=t._head,i=r;if(n)o=t._tail,i=s;while(o){let a=o[i];e(o),o=a}},gt=(t,e,n="_prev",s="_next")=>{let r=e[n],o=e[s];r?r[s]=o:t._head=o,o?o[n]=r:t._tail=r,e[n]=null,e[s]=null},xt=(t,e,n,s="_prev",r="_next")=>{let o=t._tail;while(o&&n&&n(o,e))o=o[s];let i=o?o[r]:t._head;o?o[r]=e:t._head=e,i?i[s]=e:t._tail=e,e[s]=o,e[r]=i};var Sn=(t)=>{let e=Se;for(let n=0,s=Vt.length;n<s;n++){let r=Vt[n],o=t[r];if(o!==void 0){if(r==="translateX"){let i=t.translateY;if(i!==void 0){let a=t.translateZ;if(a!==void 0)e+=`translate3d(${o},${i},${a}) `,n+=2;else e+=`translate(${o},${i}) `,n+=1;continue}}if(r==="scaleX"&&t.scale===void 0){let i=t.scaleY;if(i!==void 0){let a=t.scaleZ;if(a!==void 0)e+=`scale3d(${o},${i},${a}) `,n+=2;else e+=`scale(${o},${i}) `,n+=1;continue}}e+=`${yn[r]}${o}) `}if(r==="rotateZ"){if(t.rotate3d!==void 0)e+=`rotate3d(${t.rotate3d}) `}}if(t.matrix!==void 0)e+=`matrix(${t.matrix}) `;if(t.matrix3d!==void 0)e+=`matrix3d(${t.matrix3d}) `;return e};var tt=(t,e)=>it(t)?e:t;var Ys=()=>({t:G.NUMBER,n:0,u:null,o:null,d:null,s:null});var oo=Ys(),vn=(t,e,n)=>{let{_modifier:s,_fromNumbers:r,_toNumbers:o,_strings:i}=t,a=i[0];for(let u=0,l=o.length;u<l;u++){let p=s(M(Et(r[u],o[u],e),n)),c=i[u+1];a+=`${c?p+c:p}`,t._numbers[u]=p}return a};var qt=(t,e,n,s,r)=>{let{parent:o,duration:i,completed:a,iterationDuration:u,iterationCount:l,_currentIteration:p,_loopDelay:c,_reversed:d,_alternate:h,_hasChildren:f,_delay:g,_currentTime:T}=t,nt=g+u,k=e-g,q=V(T,-g,i),N=V(k,-g,i),_=k-T,O=N>0,K=N>=i,dt=i<=b,Mt=r===v.FORCE,It=0,ft=k,me=0;if(l>1){let Kt=u+(K?0:c),B=~~(N/Kt);if(t._currentIteration=V(B,0,l),K)t._currentIteration--;It=t._currentIteration%2,ft=N-B*Kt||0}let Zt=d^(h&&It),rn=t._ease,X=K?Zt?0:i:Zt?u-ft:ft;if(rn)X=u*rn(X/u)||0;let mt=(o?o.backwards:k<T)?!Zt:!!Zt;if(t._currentTime=k,t._iterationTime=X,t.backwards=mt,O&&!t.began){if(t.began=!0,!n&&!(o&&(mt||!o.began)))t.onBegin(t)}else if(k<=0)t.began=!1;if(!n&&!f&&O&&t._currentIteration!==p)t.onLoop(t);if(Mt||r===v.AUTO&&(e>=(o&&g>0?0:g)&&e<=nt||e<=g&&q>g||e>=nt&&q!==i)||X>=nt&&q!==i||X<=g&&q>0&&!K||e<=q&&q===i&&a||K&&!a&&dt){if(O){if(t.computeDeltaTime(q),!n)t.onBeforeUpdate(t)}if(!f){let Kt=Mt||(mt?_*-1:_)>=E.tickThreshold,B=M(t._offset+(o?o._offset:0)+g+X,12),m=t._head,st,Qt,on,he,ge=0;while(m){let an=m._composition,xe=m._currentTime,cn=m._changeDuration,be=m._absoluteStartTime+m._changeDuration,S=m._nextRep,U=m._prevRep,ln=an!==I.none,ye=U?U._absoluteStartTime+U._changeDuration:0,Ft=U&&U.parent!==m.parent,un=!S||S._isOverridden?be:S.parent===m.parent?be+S._delay:S._absoluteStartTime<S._absoluteUpdateStartTime?S._absoluteStartTime:S._absoluteUpdateStartTime;if((Kt||(xe!==cn||B<=un||U&&!Ft&&(!S||S.parent!==m.parent))&&(xe!==0||B>=m._absoluteStartTime||Ft&&!m._hasFromValue&&!U._isOverridden&&B>=ye||S&&!S._isOverridden&&S.parent===m.parent&&S._currentTime!==0&&X<S._startTime))&&(!U||Ft||X>=m._startTime)&&(!ln||!m._isOverridden&&(!m._isOverlapped||B<=be)&&(!S||S._isOverridden||B<=un)&&(!U||(U._isOverridden||(!Ft?B>=ye+m._delay:B>=m._absoluteStartTime||!m._hasFromValue&&B>=ye))))){let Us=m._currentTime=V(X-m._startTime,0,cn),z=m._ease(Us/m._updateDuration),St=m._modifier,jt=m._valueType,Nt=m._tweenType,pn=Nt===rt.OBJECT,dn=jt===G.NUMBER,_e=dn&&pn||z===0||z===1?-1:E.precision,Y,Dt;if(dn)Y=Dt=St(M(Et(m._fromNumber,m._toNumber,z),_e));else if(jt===G.UNIT)Dt=St(M(Et(m._fromNumber,m._toNumber,z),_e)),Y=`${Dt}${m._unit}`;else if(jt===G.COLOR){let C=m._numbers,te=m._fromNumbers,ee=m._toNumbers,Te=1-z,fn=te[0],mn=te[1],hn=te[2],gn=ee[0],xn=ee[1],bn=ee[2];if(C[0]=St(Math.sqrt(fn*fn*Te+gn*gn*z)),C[1]=St(Math.sqrt(mn*mn*Te+xn*xn*z)),C[2]=St(Math.sqrt(hn*hn*Te+bn*bn*z)),C[3]=St(Et(te[3],ee[3],z)),!m._setter||s)Y=`rgba(${M(C[0],0)},${M(C[1],0)},${M(C[2],0)},${C[3]})`}else if(jt===G.COMPLEX)Y=vn(m,z,_e);if(ln)m._number=Dt;if(!s&&an!==I.blend){let C=m.property;if(st=m.target,m._setter)m._setter(st,Dt,m);else if(pn)st[C]=Y;else if(Nt===rt.ATTRIBUTE)st.setAttribute(C,Y);else if(Qt=st.style,Nt===rt.TRANSFORM){if(st!==on)on=st,he=st[Me];he[C]=Y,ge=1}else if(Nt===rt.CSS)Qt[C]=Y;else if(Nt===rt.CSS_VAR)Qt.setProperty(C,Y);if(O)me=1}else m._value=Y}else if(xe&&U&&!Ft&&X<m._startTime)m._currentTime=0;if(ge&&m._renderTransforms)Qt.transform=Sn(he),ge=0;m=m._next}if(!n&&me)t.onRender(t)}if(!n&&O)t.onUpdate(t)}if(o&&dt){if(!n&&(o.began&&!mt&&k>0&&!a||mt&&k<=b&&a))t.onComplete(t),t.completed=!mt}else if(O&&K){if(l===1/0)t._startTime+=t.duration;else if(t._currentIteration>=l-1){if(t.paused=!0,!a&&!f){if(t.completed=!0,!n&&!(o&&(mt||!o.began)))t.onComplete(t),t._resolve(t)}}}else t.completed=!1;return me},at=(t,e,n,s,r)=>{let o=t._currentIteration;if(qt(t,e,n,s,r),t._hasChildren){let i=t,a=i.backwards,u=s?e:i._iterationTime,l=j(),p=0,c=!0;if(!s&&i._currentIteration!==o){let d=i.iterationDuration;if(A(i,(h)=>{if(!a){if(!h.completed&&!h.backwards&&h._currentTime<h.iterationDuration)qt(h,d,n,1,v.FORCE);h.began=!1,h.completed=!1}else{let f=h.duration,g=h._offset+h._delay,T=g+f;if(!n&&f<=b&&(!g||T===d))h.onComplete(h)}}),!n)i.onLoop(i)}if(A(i,(d)=>{let h=M((u-d._offset)*d._speed,12);if(a&&h>d._delay+d.duration)return;let f=d._fps<i._fps?d.requestTick(l):r;if(p+=qt(d,h,n,s,f),!d.completed&&c)c=!1},a),!n&&p)i.onRender(i);if((c||a)&&i._currentTime>=i.duration){if(i.paused=!0,!i.completed){if(i.completed=!0,!n)i.onComplete(i),i._resolve(i)}}}};class Xt{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._lastTickTime=t,this._startTime=t,this._lastTime=t,this._frameDuration=ot/Ut,this._fps=Ut,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=+t,n=e<b?b:e,s=ot/n;if(n>vt.frameRate)vt.frameRate=n;this._fps=n,this._frameDuration=s}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<b?b:e}requestTick(t){let e=this._frameDuration,n=t-this._lastTickTime,s=e*0.25,r=s<4?s:4;if(n+r<e)return v.NONE;return this._lastTickTime=n>=e?t-n%e:t,v.AUTO}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}}var bt={animation:null,update:L},En=(t)=>{let e=bt.animation;if(!e)e={duration:b,computeDeltaTime:L,_offset:0,_delay:0,_head:null,_tail:null},bt.animation=e,bt.update=()=>{t.forEach((n)=>{for(let s in n){let r=n[s],o=r._head;if(o){let i=o._valueType,a=i===G.COMPLEX||i===G.COLOR?ht(o._fromNumbers):null,u=o._fromNumber,l=r._tail;while(l&&l!==o){if(a)for(let p=0,c=l._numbers.length;p<c;p++)a[p]+=l._numbers[p];else u+=l._number;l=l._prevAdd}o._toNumber=u,o._toNumbers=a}}}),qt(e,1,1,0,v.FORCE)};return e};var wn=(()=>Q?requestAnimationFrame:setImmediate)(),Gs=(()=>Q?cancelAnimationFrame:clearImmediate)();class An extends Xt{constructor(t){super(t);this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=vt,this.paused=!0,this.reqId=0}update(){let t=this._currentTime=j();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,n=this._fps,s=this._head;while(s){let r=s._next;if(!s.paused)at(s,(t-s._startTime)*s._speed*e,0,0,s._fps<n?s.requestTick(t):v.AUTO);else if(gt(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled)s.cancel();s=r}bt.update()}}wake(){if(this.useDefaultMainLoop&&!this.reqId)this.requestTick(j()),this.reqId=wn(kn);return this}pause(){if(!this.reqId)return;return this.paused=!0,Js()}resume(){if(!this.paused)return;return this.paused=!1,A(this,(t)=>t.resetTime()),this.wake()}get speed(){return this._speed*(E.timeScale===1?1:ot)}set speed(t){let e=t*E.timeScale;if(this._speed===e)return;this._speed=e,A(this,(n)=>n.speed=n._speed)}get timeUnit(){return E.timeScale===1?"ms":"s"}set timeUnit(t){let n=t==="s",s=n?0.001:1;if(E.timeScale!==s){E.timeScale=s,E.tickThreshold=200*s;let r=n?0.001:ot;this.defaults.duration*=r,this._speed*=r}}get precision(){return E.precision}set precision(t){E.precision=t}}var w=(()=>{let t=new An(j());if(Q)Ee.engine=t,Ht.addEventListener("visibilitychange",()=>{if(!t.pauseOnDocumentHidden)return;Ht.hidden?t.pause():t.resume()});return t})(),kn=()=>{if(w._head)w.reqId=wn(kn),w.update();else w.reqId=0},Js=()=>(Gs(w.reqId),w.reqId=0,w);var re={_rep:new WeakMap,_add:new Map},Le=(t,e,n="_rep")=>{let s=re[n],r=s.get(t);if(!r)r={},s.set(t,r);return r[e]?r[e]:r[e]={_head:null,_tail:null}},Ws=(t,e)=>t._isOverridden||t._absoluteStartTime>e._absoluteStartTime,ke=(t)=>{t._isOverlapped=1,t._isOverridden=1,t._changeDuration=b,t._currentTime=b},Ln=(t,e)=>{let n=t._composition;if(n===I.replace){let s=t._absoluteStartTime;xt(e,t,Ws,"_prevRep","_nextRep");let r=t._prevRep;if(r){let{parent:o,_absoluteEndTime:i}=r;if(t.parent.id!==o.id&&o.iterationCount>1&&i+(o.duration-o.iterationDuration)>s){ke(r);let l=r._prevRep;while(l&&l.parent.id===o.id)ke(l),l=l._prevRep}let a=t._absoluteUpdateStartTime;if(i>a){let l=r._startTime,p=i-(l+r._updateDuration),c=M(a-p-l,12);if(r._changeDuration=c,r._currentTime=c,r._isOverlapped=1,c<b)ke(r)}let u=t.parent.parent;if(!u||u!==o.parent){let l=!0;if(A(o,(p)=>{if(!p._isOverlapped)l=!1}),l){let p=o.parent;if(p){let c=!0;if(A(p,(d)=>{if(d!==o)A(d,(h)=>{if(!h._isOverlapped)c=!1})}),c)p.cancel()}else o.cancel()}}}}else if(n===I.blend){let s=Le(t.target,t.property,"_add"),r=En(re._add),o=s._head;if(!o)o={...t},o._composition=I.replace,o._updateDuration=b,o._startTime=0,o._numbers=ht(t._fromNumbers),o._number=0,o._next=null,o._prev=null,xt(s,o),xt(r,o);let i=t._toNumber;if(t._fromNumber=o._fromNumber-i,t._toNumber=0,t._numbers=ht(t._fromNumbers),t._number=0,o._fromNumber=i,t._toNumbers.length){let a=ht(t._toNumbers);a.forEach((u,l)=>{t._fromNumbers[l]=o._fromNumbers[l]-u,t._toNumbers[l]=0}),o._fromNumbers=a}xt(s,t,null,"_prevAdd","_nextAdd")}return t},Cn=(t)=>{let e=t._composition;if(e!==I.none){let{target:n,property:s}=t,i=re._rep.get(n)[s];if(gt(i,t,"_prevRep","_nextRep"),e===I.blend){let a=re._add,u=a.get(n);if(!u)return;let l=u[s],p=bt.animation;gt(l,t,"_prevAdd","_nextAdd");let c=l._head;if(c&&c===l._tail){gt(l,c,"_prevAdd","_nextAdd"),gt(p,c);let d=!0;for(let h in u)if(u[h]._head){d=!1;break}if(d)a.delete(n)}}}return t};var Rn=(t)=>(t.paused=!0,t.began=!1,t.completed=!1,t),Ce=(t)=>{if(!t._cancelled)return t;if(t._hasChildren)A(t,Ce);else A(t,(e)=>{if(e._composition!==I.none)Ln(e,Le(e.target,e.property))});return t._cancelled=0,t},Pn=0,Zs=(t,e)=>t._priority>e._priority;class Re extends Xt{constructor(t={},e=null,n=0){super(0);++Pn;let{id:s,delay:r,duration:o,reversed:i,alternate:a,loop:u,loopDelay:l,autoplay:p,frameRate:c,playbackRate:d,priority:h,onComplete:f,onLoop:g,onPause:T,onBegin:nt,onBeforeUpdate:k,onUpdate:q}=t;if(ve.current)ve.current.register(this);let N=e?0:w._lastTickTime,_=e?e.defaults:E.defaults,O=se(r)||it(r)?_.delay:+r,K=se(o)||it(o)?1/0:+o,dt=tt(u,_.loop),Mt=tt(l,_.loopDelay),It=dt===!0||dt===1/0||dt<0?1/0:dt+1,ft=0;if(e)ft=n;else{if(!w.reqId)w.requestTick(j());ft=(w._lastTickTime-w._startTime)*E.timeScale}this.id=!it(s)?s:Pn,this.parent=e,this.duration=we((K+Mt)*It-Mt)||b,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=nt||_.onBegin,this.onBeforeUpdate=k||_.onBeforeUpdate,this.onUpdate=q||_.onUpdate,this.onLoop=g||_.onLoop,this.onPause=T||_.onPause,this.onComplete=f||_.onComplete,this.iterationDuration=K,this.iterationCount=It,this._autoplay=e?!1:tt(p,_.autoplay),this._offset=ft,this._delay=O,this._loopDelay=Mt,this._iterationTime=0,this._currentIteration=0,this._resolve=L,this._running=!1,this._reversed=+tt(i,_.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=tt(a,_.alternate),this._prev=null,this._next=null,this._lastTickTime=N,this._startTime=N,this._lastTime=N,this._fps=tt(c,_.frameRate),this._speed=tt(d,_.playbackRate),this._priority=+tt(h,1)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(!0).play()}get currentTime(){return V(M(this._currentTime,E.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;if(this.pause().seek(+t),!e)this.resume()}get iterationCurrentTime(){return V(M(this._iterationTime,E.precision),0,this.iterationDuration)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return V(M(this._currentTime/this.duration,10),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return V(M(this._iterationTime/this.iterationDuration,10),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*V(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=!1){if(Ce(this),this._reversed&&!this._reverse)this.reversed=!1;if(this._iterationTime=this.iterationDuration,at(this,0,1,~~t,v.FORCE),Rn(this),this._hasChildren)A(this,Rn);return this}init(t=!1){if(this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren)at(this,this.duration,1,~~t,v.FORCE);this.reset(t);let e=this._autoplay;if(e===!0)this.resume();else if(e&&!it(e.linked))e.link(this);return this}resetTime(){let t=1/(this._speed*w._speed);return this._startTime=j()-(this._currentTime+this._delay)*t,this}pause(){if(this.paused)return this;return this.paused=!0,this.onPause(this),this}resume(){if(!this.paused)return this;if(this.paused=!1,this.duration<=b&&!this._hasChildren)at(this,b,0,0,v.FORCE);else{if(!this._running)xt(w,this,Zs),w._hasChildren=!0,this._running=!0;this.resetTime(),this._startTime-=12,w.wake()}return this}restart(){return this.reset().resume()}seek(t,e=0,n=0){Ce(this),this.completed=!1;let s=this.paused;return this.paused=!0,at(this,t+this._delay,~~e,~~n,v.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,n=this.iterationDuration,s=e===1/0?Mn(Bt/n):e;if(this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0)this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress;else this.seek(n*s-this._currentTime);return this.resetTime(),this}play(){if(this._reversed)this.alternate();return this.resume()}reverse(){if(!this._reversed)this.alternate();return this.resume()}cancel(){if(this._hasChildren)A(this,(t)=>t.cancel(),!0);else A(this,Cn);return this._cancelled=1,this.pause()}stretch(t){let e=this.duration,n=Ae(t);if(e===n)return this;let s=t/e,r=t<=b;return this.duration=r?b:n,this.iterationDuration=r?b:Ae(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){at(this,0,1,0,v.AUTO);let t=this._autoplay;if(t&&t.linked&&t.linked===this)t.revert();return this.cancel()}complete(t=0){return this.seek(this.duration,t).cancel()}then(t=L){let e=this.then,n=()=>{this.then=null,t(this),this.then=e,this._resolve=L};return new Promise((s)=>{if(this._resolve=()=>s(n()),this.completed)this._resolve();return this})}}var Pe=(t)=>new Re(t,null,0).init();var $n=4300;var wt=80;var yt=[0.5,1,1.5,2],$e=650,At=(t,e,n)=>t+(e-t)*n;function Ks(t,e){let n=null,s=null;for(let r of t.steps)if(r.startMs<=e&&e<r.endMs)n=r;else if(r.endMs<=e)s=r;return n??s}function Qs(t,e){let n=-1;for(let o=0;o<t.hops.length;o++)if(t.hops[o].startMs<=e)n=o;if(n<0)n=0;let s=t.hops[n];if(!s)return null;let r=Math.min(1,Math.max(0,(e-s.startMs)/s.durMs));return{index:n,hop:s,f:r}}var Dn=(t,e)=>t.length>e?t.slice(0,e-1)+"\u2026":t,Hn=(t)=>Dn(t,22);function Bn(t,e=4,n=26){let s=Object.entries(t),r=s.slice(0,e).map(([o,i])=>{let a=typeof i==="object"&&i!==null?JSON.stringify(i):String(i);return Dn(`${o}: ${a}`,n)});if(s.length>e)r.push(`+${s.length-e} more`);return r}var oe=60;function On(t,e,n,s,r){let o=t-n/2;if(r===1)return{x:o,y:e-oe-s,tetherY:e-oe};return{x:o,y:e+oe,tetherY:e+oe}}var js=0.6;function Un(t,e,n,s){let r=[...t].length*js*s;return{x:e-r/2,y:n-s,w:r,h:s*1.25}}function tr(t,e){return t.x<e.x+e.w&&e.x<t.x+t.w&&t.y<e.y+e.h&&e.y<t.y+t.h}var In=6;function Oe(t,e,n,s,r,o,i){let a=(d,h=n)=>o.filter((f)=>tr({x:d.x,y:d.y,w:h,h:s},f)),u=(d)=>({...d,tetherX:Math.min(Math.max(t,d.x),d.x+n)}),l=(d)=>d>=0&&d+n<=i,p=On(t,e,n,s,r);if(a(p).length===0)return u(p);let c=On(t,e,n,s,r===1?-1:1);if(a(c).length===0)return u(c);for(let d of[p,c]){let h=a(d),f=[];for(let g of h)f.push(g.x-In-(d.x+n)),f.push(g.x+g.w+In-d.x);f.sort((g,T)=>Math.abs(g)-Math.abs(T));for(let g of f){let T={...d,x:d.x+g};if(l(T.x)&&a(T).length===0)return u(T)}}return u(p)}var Ie=8,Vn=8,qn=0.4,er=1.5;function ae(t,e,n){return Math.min(er,Math.max(1,n/(t*e)))}var Fn=300,nr=25;function Xn(t,e){let n=e.startMs+e.typingMs;if(t<n||t>e.endMs)return null;let s=(t-n)/Fn,r=(e.endMs-t)/Fn,o=Math.min(1,Math.max(0,Math.min(s,r)));return{hops:e.hops,opacity:o,offset:-t/nr}}var sr=600;function zn(t,e){return Math.min(1,Math.max(0,(t-e)/sr))}var rr=700,or=900,ir=[0,250],zt=0.6;function Yn(t,e){let n=(t-e)/rr,s=1;if(n>=0&&n<zt)s=0.6+0.55*Math.sin(n/zt*Math.PI/2);else if(n>=zt&&n<1)s=1.15-0.15*Math.sin((n-zt)/(1-zt)*Math.PI/2);let r=[];for(let o of ir){let i=(t-e-o)/or;if(i>=0&&i<1)r.push({r:48+102*i,opacity:0.8*(1-i)})}return{scale:s,rings:r}}var ie=650,ar=6;function cr(t,e){if(t<e||t>e+ie)return{dx:0,dy:0};let n=(t-e)/ie;return{dx:0,dy:-ar*Math.sin(Math.PI*n)+0}}function Gn(t){let e=new Map,n=(s,r)=>{let o=e.get(s);if(o)o.push(r);else e.set(s,[r])};for(let s of t.steps){if(s.mode!=="packet")continue;if(s.typing.length>0)n(s.path[0],s.startMs+s.typing.length*wt);for(let r of s.hops)n(r.to,r.endMs)}for(let s of e.values())s.sort((r,o)=>r-o);return e}function Jn(t,e){let n=-1,s=!1;for(let r of t??[])if(r<=e)n=r,s=!0;return s?cr(e,n):{dx:0,dy:0}}var lr=400;function Wn(t,e){if(e.typingMs<=0||t<e.startMs||t>=e.startMs+e.typingMs)return null;let n=t-e.startMs,s=e.typing.length*wt,r=n>=s,o=Math.min(e.typing.length,Math.floor(n/wt));return{text:e.typing.slice(0,o),caret:!r&&Math.floor(n/lr)%2===0,sent:r}}function Zn(t,e){let n=e,s=Ks(t,n),r=s?s.chapter:0,o=t.chapters[r],i="";if(s){for(let c of s.hops)if(c.endMs<=n&&c.note!==void 0)i=c.note}let a={chapterTitle:o?.title??"",chapterDesc:o?.desc??"",stepLabel:s?.label??"",stepDesc:s?.desc??"",note:i},u=[],l=[];for(let c of t.steps){if(!(c.startMs<=n&&n<c.endMs))continue;if(n<c.startMs+c.typingMs)continue;if(c.mode==="flow"){l.push({stepId:c.id,path:c.path,color:c.color,both:c.both,progress:(n-c.startMs-c.typingMs)/(c.endMs-c.startMs-c.typingMs)});continue}let d=Qs(c,n);if(!d)continue;let{index:h,hop:f,f:g}=d,T=At(f.x1,f.x2,g),nt=At(f.y1,f.y2,g),k=c.hops[h+1];if(k!==void 0&&n>=f.endMs&&n<f.endMs+ie)continue;let N=k!==void 0&&n>=f.endMs+ie;if(u.push({stepId:c.id,x:N?k.x1:At(f.x1,f.x2,g),y:N?k.y1:At(f.y1,f.y2,g),color:c.color,direction:1,label:c.label,data:f.data}),c.both){let _=c.hops[c.hops.length-1-h],O=N?c.hops[c.hops.length-2-h]:void 0;u.push({stepId:c.id,x:O?O.back.x1:At(_.back.x1,_.back.x2,g),y:O?O.back.y1:At(_.back.y1,_.back.y2,g),color:c.color,direction:-1,label:c.label,data:{}})}}let p=[];for(let c of t.steps)for(let d of c.hops)if(d.endMs<=n&&n<d.endMs+$e)p.push({node:d.to,color:c.color,ageMs:n-d.endMs});return{chapter:r,stepId:s?s.id:null,caption:a,packets:u,flows:l,pulses:p}}function Kn(t,e){let n=new Set;if(e==="hop")for(let s of t.steps)for(let r of s.hops)n.add(r.startMs);else if(e==="message")for(let s of t.steps)n.add(s.startMs);else for(let s of t.chapters)n.add(s.startMs);return[...n].sort((s,r)=>s-r)}function Qn(t,e,n){for(let s of Kn(t,n))if(s>e)return s;return t.totalMs}function jn(t,e,n){let s=0;for(let r of Kn(t,n))if(r<e-300)s=r;return s}function ts(t,e){return Math.min(Math.max(e,0),t.totalMs)}function Fe(t,e){let n=yt.indexOf(t);if(n<0)n=0,yt.forEach((s,r)=>{if(Math.abs(s-t)<Math.abs(yt[n]-t))n=r});return yt[Math.min(yt.length-1,Math.max(0,n+e))]}var Nn={" ":"toggle",ArrowRight:"nextHop",ArrowLeft:"prevHop",n:"nextMessage",p:"prevMessage","]":"nextChapter","[":"prevChapter","+":"faster","=":"faster","-":"slower",Home:"restart",f:"follow",F:"follow"};function es(t){return Object.hasOwn(Nn,t)?Nn[t]:null}function ns(t){let e=(n)=>t.totalMs>0?n/t.totalMs*100:0;return{chapters:t.chapters.map((n)=>({index:n.index,title:n.title,startPct:e(n.startMs),endPct:e(n.endMs)})),dots:t.steps.map((n)=>({stepId:n.id,pct:e(n.startMs),color:n.color,chapter:n.chapter}))}}function ss(t,e){return Math.min(Math.max(e,0),1)*t.totalMs}var rs=1;var kt=(t,e,n)=>t+(e-t)*n,os=(t,e,n)=>({x:kt(t.x,e.x,n),y:kt(t.y,e.y,n)}),Ct=(t)=>({x:t.reduce((e,n)=>e+n.x,0)/t.length,y:t.reduce((e,n)=>e+n.y,0)/t.length});function Lt(t,e){return t.get(e)??{x:0,y:0}}function ur(t,e,n){let s=Lt(e,t.path[0]),r=Lt(e,t.path[t.path.length-1]);if(n<t.startMs+t.typingMs)return s;if(n>=t.endMs)return r;if(t.hops.length===0)return s;if(t.mode==="flow"){let p=(n-t.startMs-t.typingMs)/(t.endMs-t.startMs-t.typingMs);return os(s,r,Math.min(1,Math.max(0,p)))}let o=0;for(let p=0;p<t.hops.length;p++)if(t.hops[p].startMs<=n)o=p;let i=t.hops[o],a=t.hops[t.hops.length-1-o];if(n>=i.endMs){let p=Lt(e,i.to);return t.both?Ct([p,Lt(e,a.from)]):p}let u=Math.min(1,Math.max(0,(n-i.startMs)/i.durMs)),l={x:kt(i.x1,i.x2,u),y:kt(i.y1,i.y2,u)};if(!t.both)return l;return Ct([l,{x:kt(a.back.x1,a.back.x2,u),y:kt(a.back.y1,a.back.y2,u)}])}function pr(t){let e=[];for(let n of t.steps){let s=e.find((r)=>r.start===n.startMs);if(s)s.steps.push(n),s.end=Math.max(s.end,n.endMs);else e.push({start:n.startMs,end:n.endMs,steps:[n]})}return e.sort((n,s)=>n.start-s.start)}var Ne=(t,e,n)=>Ct(t.steps.map((s)=>ur(s,e,n)));function dr(t,e,n){let s=pr(t),r=s[0];if(!r)return{x:0,y:0};if(n<r.start)return Ct(r.steps.map((o)=>Lt(e,o.path[0])));for(let o=0;o<s.length;o++){let i=s[o];if(n<i.end)return Ne(i,e,n);let a=s[o+1];if(!a)return Ne(i,e,i.end);if(n<a.start){let u=(n-i.end)/(a.start-i.end);return os(Ne(i,e,i.end),Ct(a.steps.map((l)=>Lt(e,l.path[0]))),u)}}return{x:0,y:0}}function is(t,e,n){let r=[];for(let o=0;o<9;o++){let i=n-400+o*800/8;r.push(dr(t,e,Math.min(t.totalMs,Math.max(0,i))))}return Ct(r)}var Tt=2000,as=36,fr=140,R=(t)=>{let e=document.getElementById(t);if(!e)throw Error(`missing element #${t}`);return e},x=JSON.parse(R("timeline-data").textContent??"{}"),D=document.querySelector("#stage svg"),J=matchMedia("(prefers-reduced-motion: reduce)").matches,$t=x.steps.length,de=Math.max(1,J?$t*Tt:x.totalMs),Ue=(t)=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),cs=141.5,ls=81.9,mr=0.2,hr=1.6,H=R("stage"),De=document.getElementById("grid"),gr=R("zoom-label"),ce=(t)=>Number(H.dataset[t]??0),le=ce("w"),us=ce("h"),ps={x:ce("ox"),y:ce("oy")},y=1,ct=0,lt=0,W=0,Z=0,fe=(t)=>Math.max(mr,Math.min(hr,t)),vs=14,xr=12,br=15,Ve=1;function yr(){Ve=ae(vs,y,Ie),D.style.setProperty("--ts-group",Ve.toFixed(4)),D.style.setProperty("--ts-sub",ae(xr,y,Ie).toFixed(4)),D.style.setProperty("--ts-label",ae(br,y,Vn).toFixed(4)),D.style.setProperty("--sub-op",y<qn?"0":"1")}function ut(){if(yr(),ks.setAttribute("transform",`translate(${ct.toFixed(2)} ${lt.toFixed(2)}) scale(${y.toFixed(4)})`),gr.textContent=`${Math.round(y*100)}%`,De)De.style.backgroundSize=`${cs*y}px ${ls*y}px`,De.style.backgroundPosition=`${ct+ps.x*y-cs*y/2}px ${lt+ps.y*y-ls*y/2}px`}function Es(){let t=H.getBoundingClientRect();if(t.width<=0||t.height<=0)return!1;return W=t.width,Z=t.height,D.setAttribute("viewBox",`0 0 ${W} ${Z}`),!0}function ws(){if(!Es())return;y=fe(Math.min(W/le,Z/us)*0.92),ct=(W-le*y)/2,lt=(Z-us*y)/2,ut()}function Gt(t,e,n){let s=fe(y*n),r=(t-ct)/y,o=(e-lt)/y;ct=t-r*s,lt=e-o*s,y=s}var _t=!1,qe=!1,Xe=0,As=document.getElementById("zoom-follow");function pt(){if(!_t||W<=0||Z<=0)return;let t;if(J){let e=x.steps[Math.max(0,Math.min($t-1,Math.floor(Xe/Tt)))],n=e?.hops[e.hops.length-1];t=n?Pt.get(n.to):void 0}else t=is(x,Pt,Xe);if(!t)return;ct=W/2-y*t.x,lt=Z/2-y*t.y,ut()}function Jt(t){if(_t=t,As?.setAttribute("aria-pressed",String(t)),t){if(!qe)qe=!0,y=Math.max(y,fe(rs));pt()}}var _r="http://www.w3.org/2000/svg",ks=D.querySelector("g.scene"),Ze=document.createElementNS(_r,"g");Ze.setAttribute("pointer-events","none");ks.appendChild(Ze);var Pt=new Map;for(let t of D.querySelectorAll("g[data-node]")){let e=/translate\\(([-\\d.]+),([-\\d.]+)\\)/.exec(t.getAttribute("transform")??""),n=t.getAttribute("data-node");if(e&&n)Pt.set(n,{x:Number(e[1]),y:Number(e[2])})}var Ls=[];for(let t of D.querySelectorAll("text.group-label"))Ls.push({text:t.textContent??"",x:Number(t.getAttribute("x")),y:Number(t.getAttribute("y"))});var Cs=()=>Ls.map((t)=>Un(t.text,t.x,t.y,vs*Ve)),Ke=new Map(x.steps.map((t)=>[t.id,t]));function ds(t,e,n){for(let r=0;r<t.length;r++){let o=e[r+1];if(n<=o){let i=e[r],a=o===i?0:(n-i)/(o-i),u=t[r];return{x:u.x1+(u.x2-u.x1)*a,y:u.y1+(u.y2-u.y1)*a}}}let s=t[t.length-1];return{x:s.x2,y:s.y2}}function fs(t){let e=[0];for(let n of t)e.push(e[e.length-1]+Math.hypot(n.x2-n.x1,n.y2-n.y1));return e}function Tr(t,e,n,s){let r=Ke.get(t);if(!r||r.hops.length===0)return"";let o=r.hops.map((f)=>({x1:f.x1,y1:f.y1,x2:f.x2,y2:f.y2})),i=[...r.hops].reverse().map((f)=>({x1:f.back.x1,y1:f.back.y1,x2:f.back.x2,y2:f.back.y2})),a=fs(o),u=fs(i),l=a[a.length-1],c=s*$n/1000*fr%as,d=(f)=>`<rect x="${(f.x-7).toFixed(1)}" y="${(f.y-4.5).toFixed(1)}" width="14" height="9" rx="2" fill="${e}" fill-opacity="0.9"/>`,h="";for(let f=c;f<=l;f+=as)if(h+=d(ds(o,a,f)),n)h+=d(ds(i,u,f));return h}var ue=12,ze=7.3,He=20,ms=16;function Rs(t){let e=t.length===4?"#"+[...t.slice(1)].map((r)=>r+r).join(""):t,n=parseInt(e.slice(1),16);return(0.299*(n>>16&255)+0.587*(n>>8&255)+0.114*(n&255))/255>0.6?"#0f172a":"#ffffff"}function Mr(t,e,n,s,r,o){let i=Hn(s),a=Bn(r),u=Math.max(i.length,...a.map((T)=>T.length),8),l=Math.round(u*ze+16),p=He+(a.length>0?a.length*ms+8:0),c=Oe(t,e,l,p,o,Cs(),le),d=c.x.toFixed(1),h=c.y.toFixed(1),f=`pk${Sr++}`,g=`<line x1="${t.toFixed(1)}" y1="${e.toFixed(1)}" x2="${c.tetherX.toFixed(1)}" y2="${c.tetherY.toFixed(1)}" stroke="${n}" stroke-opacity="0.5" stroke-width="1.5"/>`;return g+=`<circle cx="${t.toFixed(1)}" cy="${e.toFixed(1)}" r="5" fill="${n}"/>`,g+=`<clipPath id="${f}"><rect x="${d}" y="${h}" width="${l}" height="${p}" rx="6"/></clipPath>`,g+=`<rect class="pk-bg" x="${d}" y="${h}" width="${l}" height="${p}" rx="6" stroke="${n}"/>`,g+=`<g clip-path="url(#${f})"><rect x="${d}" y="${h}" width="${l}" height="${He}" fill="${n}"/></g>`,g+=`<text class="pk-tx" font-size="${ue}" font-weight="700" fill="${Rs(n)}" x="${(c.x+8).toFixed(1)}" y="${(c.y+14).toFixed(1)}">${Ue(i)}</text>`,a.forEach((T,nt)=>{g+=`<text class="pk-tx pk-row" font-size="${ue}" x="${(c.x+8).toFixed(1)}" y="${(c.y+He+6+ms*(nt+0.75)).toFixed(1)}">${Ue(T)}</text>`}),g}var Sr=0,Ps=["stroke","stroke-width","stroke-dasharray","stroke-linecap","stroke-dashoffset","stroke-opacity","marker-end"],hs=new Map;function vr(t){let e=hs.get(t);if(e)return e;let n=D.querySelector("marker#arrow");if(!n)return"url(#arrow)";let s="arrow-"+t.replace(/[^a-zA-Z0-9]/g,""),r=n.cloneNode(!0);return r.setAttribute("id",s),r.querySelector("path")?.setAttribute("fill",t),n.parentNode?.appendChild(r),hs.set(t,`url(#${s})`),`url(#${s})`}var $s=new Map;for(let t of D.querySelectorAll("line[data-link]")){let e=t.getAttribute("data-link");if(!e)continue;let n=Ps.map((s)=>t.getAttribute(s));$s.set(e,{el:t,orig:n,base:Number(t.getAttribute("stroke-opacity")??1)})}function gs(t,e){let n=new Map,s=e?[e]:x.steps;for(let r of s){let o=e?{hops:r.hops,opacity:1,offset:0}:Xn(t,r);if(!o||o.opacity<=0)continue;for(let i of o.hops)if(n.set(i.link,{color:r.color,opacity:o.opacity,offset:o.offset}),r.both)n.set(i.back.link,{color:r.color,opacity:o.opacity,offset:o.offset})}for(let[r,o]of $s){let i=n.get(r);if(!i){Ps.forEach((a,u)=>{let l=o.orig[u];if(l===null||l===void 0)o.el.removeAttribute(a);else o.el.setAttribute(a,l)});continue}o.el.setAttribute("stroke",i.color),o.el.setAttribute("stroke-width","3"),o.el.setAttribute("stroke-dasharray","2 9"),o.el.setAttribute("stroke-linecap","round"),o.el.setAttribute("stroke-dashoffset",i.offset.toFixed(1)),o.el.setAttribute("stroke-opacity",(o.base+(1-o.base)*i.opacity).toFixed(3)),o.el.setAttribute("marker-end",vr(i.color))}}var Er=new Set(x.hidden??[]),Ye=new Map((x.reveals??[]).map((t)=>[t.node,{atMs:t.atMs,stepId:t.stepId}])),Os=new Map;for(let t of Er){let e=[];for(let n of D.querySelectorAll("[data-node],[data-link]")){if(n.getAttribute("data-node")===t)e.push(n);let s=n.getAttribute("data-link");if(s!==null&&s.split("--").includes(t))e.push(n)}Os.set(t,e)}function xs(t){let e=new Map;for(let[n,s]of Os){let r=t(n);for(let o of s)e.set(o,Math.min(e.get(o)??1,r))}for(let[n,s]of e)n.setAttribute("opacity",s.toFixed(3))}var Is=new Map;for(let t of D.querySelectorAll("g[data-node]")){let e=t.getAttribute("data-node");if(e)Is.set(e,{el:t,icon:t.querySelector("use"),orig:t.getAttribute("transform")??""})}var wr=Gn(x);function bs(t){let e="";for(let[n,s]of Is){let r=Ye.get(n),o=t!==null&&r?Yn(t,r.atMs):{scale:1,rings:[]},i=t!==null&&!J?Jn(wr.get(n),t):{dx:0,dy:0},a=s.orig;if(o.scale!==1)a+=` scale(${o.scale.toFixed(3)})`;if(s.el.setAttribute("transform",a),s.icon)if(i.dx!==0||i.dy!==0)s.icon.setAttribute("transform",`translate(${i.dx.toFixed(2)} ${i.dy.toFixed(2)})`);else s.icon.removeAttribute("transform");let u=Pt.get(n),l=r?Ke.get(r.stepId)?.color??"#6b7280":"#6b7280";if(!u)continue;for(let p of o.rings)e+=`<circle cx="${u.x}" cy="${u.y}" r="${p.r.toFixed(1)}" fill="none" stroke="${l}" stroke-width="4" stroke-opacity="${p.opacity.toFixed(3)}"/>`}return e}function ys(t,e,n){let s=Pt.get(t.path[0]);if(!s)return"";let r=Math.max(110,Math.round(t.typing.length*ze+28)),o=26,i=Oe(s.x,s.y,r,o,1,Cs(),le),a=i.x.toFixed(1),u=i.y.toFixed(1),l=`<rect class="pk-bg" x="${a}" y="${u}" width="${r}" height="${o}" rx="13" stroke="${t.color}" stroke-width="${n?3.5:1.5}"/>`;if(l+=`<text class="pk-tx pk-row" font-size="${ue}" x="${(i.x+12).toFixed(1)}" y="${(i.y+17).toFixed(1)}" xml:space="preserve">${Ue(e.text)}</text>`,e.caret){let p=i.x+12+e.text.length*ze+1;l+=`<rect x="${p.toFixed(1)}" y="${(i.y+6).toFixed(1)}" width="1.5" height="14" fill="${t.color}"/>`}if(e.sent){let p=i.x+r-4;l+=`<rect x="${(p-44).toFixed(1)}" y="${(i.y-22).toFixed(1)}" width="44" height="18" rx="5" fill="${t.color}"/>`,l+=`<text class="pk-tx" font-size="${ue-1}" font-weight="700" fill="${Rs(t.color)}" x="${(p-22).toFixed(1)}" y="${(i.y-9).toFixed(1)}" text-anchor="middle">Enter</text>`}return l}function _s(t,e){if(e)return e.typingMs>0?ys(e,{text:e.typing,caret:!1,sent:!0},!1):"";let n="";for(let s of x.steps){let r=t===null?null:Wn(t,s);if(!r)continue;let o=t-s.startMs-s.typing.length*wt;n+=ys(s,r,r.sent&&o<250)}return n}function Ts(t,e){let n=e;for(let s of t.pulses){let r=Pt.get(s.node);if(!r)continue;let o=Math.min(1,s.ageMs/$e);n+=`<circle cx="${r.x}" cy="${r.y}" r="${(48+40*o).toFixed(1)}" fill="none" stroke="${s.color}" stroke-width="4" stroke-opacity="${(1-o).toFixed(2)}"/>`}for(let s of t.flows)n+=Tr(s.stepId,s.color,s.both,s.progress);for(let s of t.packets)n+=Mr(s.x,s.y,s.color,s.label,s.data,s.direction);Ze.innerHTML=n}var Yt={chapter:R("cap-chapter"),chapterDesc:R("cap-chapter-desc"),step:R("cap-step"),stepDesc:R("cap-step-desc"),note:R("cap-note")},Ms="";function Ar(t){let e=JSON.stringify(t);if(e===Ms)return;Ms=e,Yt.chapter.textContent=t.chapterTitle,Yt.chapterDesc.textContent=t.chapterDesc,Yt.step.textContent=t.stepLabel,Yt.stepDesc.textContent=t.stepDesc,Yt.note.textContent=t.note}var kr=R("legend");for(let t of x.tracks){let e=document.createElement("li"),n=document.createElement("span");n.className="dot",n.style.background=t.color,e.append(n,document.createTextNode(t.label)),kr.appendChild(e)}var F=R("bar"),Qe=ns(x),je=document.createElement("div");je.className="playhead";for(let t of Qe.chapters){let e=document.createElement("div");e.className="seg",e.style.left=`${t.startPct}%`,e.style.width=`${Math.max(0,t.endPct-t.startPct)}%`,e.title=t.title,F.appendChild(e)}for(let t of Qe.dots){let e=document.createElement("div");e.className="mark",e.style.left=`${t.pct}%`,e.style.background=t.color,F.appendChild(e)}F.appendChild(je);F.setAttribute("aria-valuemin","0");F.setAttribute("aria-valuemax",String(Math.round(x.totalMs)));function Ge(t){if(!J)return t;let e=Math.min($t-1,Math.floor(t/Tt));return x.steps[e]?.startMs??0}function tn(t){if(!J)return ts(x,t);if($t===0)return 0;if(t>=x.totalMs)return de;let e=0;for(let n of x.steps)if(n.startMs<=t+0.5&&n.startMs>e)e=n.startMs;return Math.max(0,x.steps.findIndex((n)=>n.startMs===e))*Tt}var Lr=J?x.steps.flatMap((t,e)=>t.pause?[(e+1)*Tt-1]:[]):x.steps.filter((t)=>t.pause).map((t)=>t.endMs);function Cr(t){let e=Math.max(0,Math.min($t-1,Math.floor(t/Tt))),n=x.steps[e],s=x.chapters[n?n.chapter:0],r=n?.hops[n.hops.length-1];return{chapter:n?n.chapter:0,stepId:n?n.id:null,caption:{chapterTitle:s?.title??"",chapterDesc:s?.desc??"",stepLabel:n?.label??"",stepDesc:n?.desc??"",note:r?.note??""},packets:n&&r?[{stepId:n.id,x:r.x2,y:r.y2,color:n.color,direction:1,label:n.label,data:r.data}]:[],flows:[],pulses:n&&r?[{node:r.to,color:n.color,ageMs:0}]:[]}}var P=Pe({duration:de,autoplay:!1,onUpdate:()=>Rr(),onComplete:()=>{P.pause(),Ot()}}),Je=0,Be=!1;function en(t){Xe=J?t:Ge(t),pt();let e=J?Cr(t):Zn(x,t);if(J){let r=Math.max(0,Math.min($t-1,Math.floor(t/Tt)));bs(null),Ts(e,_s(null,x.steps[r]??null)),gs(0,x.steps[r]??null),xs((o)=>{let i=Ye.get(o),a=i?Ke.get(i.stepId):void 0;return a&&x.steps.indexOf(a)<=r?1:0})}else Ts(e,bs(t)+_s(t,null)),gs(t,null),xs((r)=>{let o=Ye.get(r);return o?zn(t,o.atMs):0});Ar(e.caption);let n=Ge(t),s=x.totalMs>0?n/x.totalMs*100:0;je.style.left=`${s}%`,F.setAttribute("aria-valuenow",String(Math.round(n))),F.setAttribute("aria-valuetext",[e.caption.chapterTitle,e.caption.stepLabel].filter(Boolean).join(": "))}function Rr(){if(Be)return;Be=!0;let t=P.currentTime;if(!P.paused){for(let e of Lr)if(Je<e&&e<=t){P.pause(),P.seek(e),t=e;break}}Je=t,en(t),Ot(),Be=!1}function Wt(t){let e=Math.max(0,Math.min(de,t));Je=e,P.seek(e),en(e),Ot()}function Pr(){if(!P.paused)P.pause();else{if(P.currentTime>=de-1)Wt(0);P.play()}Ot()}function Rt(t,e){let n=Ge(P.currentTime),s=J&&t==="hop"?"message":t,r=e===1?Qn(x,n,s):jn(x,n,s);Wt(tn(r))}function Fs(t){switch(t){case"toggle":return Pr();case"nextHop":return Rt("hop",1);case"prevHop":return Rt("hop",-1);case"nextMessage":return Rt("message",1);case"prevMessage":return Rt("message",-1);case"nextChapter":return Rt("chapter",1);case"prevChapter":return Rt("chapter",-1);case"faster":return We(Fe(pe,1));case"slower":return We(Fe(pe,-1));case"restart":return Wt(0);case"follow":return Jt(!_t)}}var pe=1,Ss=R("btn-play"),Ns=[...document.querySelectorAll("[data-speed]")];function We(t){pe=t,P.speed=t,Ot()}function Ot(){let t=!P.paused;Ss.dataset.state=t?"playing":"paused",Ss.setAttribute("aria-label",t?"Pause":"Play");for(let e of Ns)e.setAttribute("aria-pressed",String(Number(e.dataset.speed)===pe))}var $r={"btn-play":"toggle","btn-restart":"restart","btn-prev-chapter":"prevChapter","btn-prev-message":"prevMessage","btn-prev-hop":"prevHop","btn-next-hop":"nextHop","btn-next-message":"nextMessage","btn-next-chapter":"nextChapter"};for(let[t,e]of Object.entries($r))document.getElementById(t)?.addEventListener("click",()=>Fs(e));for(let t of Ns)t.addEventListener("click",()=>{let e=Number(t.dataset.speed);if(yt.includes(e))We(e)});document.addEventListener("keydown",(t)=>{if(t.ctrlKey||t.metaKey||t.altKey)return;let e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;if(t.key===" "&&e&&e.tagName==="BUTTON")return;let n=es(t.key);if(!n)return;t.preventDefault(),Fs(n)});var nn=!1;function Ds(t,e){let n=F.getBoundingClientRect();if(n.width<=0)return;let s=(t-n.left)/n.width,r=ss(x,s);if(e){let o=1/0;for(let i of Qe.dots){let a=Math.abs(i.pct/100*n.width-(t-n.left));if(a<10&&a<o)o=a,r=x.steps.find((u)=>u.id===i.stepId).startMs}}Wt(tn(r))}F.addEventListener("pointerdown",(t)=>{nn=!0,F.setPointerCapture(t.pointerId),Ds(t.clientX,!0)});F.addEventListener("pointermove",(t)=>{if(nn)Ds(t.clientX,!1)});var Hs=()=>{nn=!1};F.addEventListener("pointerup",Hs);F.addEventListener("pointercancel",Hs);var sn=(t)=>{let e=H.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}};H.addEventListener("wheel",(t)=>{t.preventDefault();let e=_t?{x:W/2,y:Z/2}:sn(t);Gt(e.x,e.y,t.deltaY<0?1.1:0.9090909090909091),ut(),pt()},{passive:!1});var et=new Map;H.addEventListener("pointerdown",(t)=>{if(t.target.closest(".zoombar"))return;et.set(t.pointerId,sn(t)),H.setPointerCapture(t.pointerId),H.classList.add("drag")});H.addEventListener("pointermove",(t)=>{let e=et.get(t.pointerId);if(!e)return;let n=[...et.values()],s=sn(t);if(et.set(t.pointerId,s),et.size===1){if(_t&&(s.x!==e.x||s.y!==e.y))Jt(!1);ct+=s.x-e.x,lt+=s.y-e.y}else if(et.size===2){let r=[...et.values()],[o,i]=n,[a,u]=r,l=Math.hypot(i.x-o.x,i.y-o.y),p=Math.hypot(u.x-a.x,u.y-a.y),c={x:(o.x+i.x)/2,y:(o.y+i.y)/2},d={x:(a.x+u.x)/2,y:(a.y+u.y)/2};if(_t){if(l>0)Gt(W/2,Z/2,p/l)}else{if(l>0)Gt(c.x,c.y,p/l);ct+=d.x-c.x,lt+=d.y-c.y}}ut(),pt()});var Bs=(t)=>{if(et.delete(t.pointerId),et.size===0)H.classList.remove("drag")};H.addEventListener("pointerup",Bs);H.addEventListener("pointercancel",Bs);R("zoom-in").addEventListener("click",()=>{Gt(W/2,Z/2,1.25),ut(),pt()});R("zoom-out").addEventListener("click",()=>{Gt(W/2,Z/2,0.8),ut(),pt()});R("zoom-fit").addEventListener("click",()=>{Jt(!1),ws()});As?.addEventListener("click",()=>Jt(!_t));new ResizeObserver(()=>{if(Es())ut(),pt()}).observe(H);window.__packetplay={durationMs:x.totalMs,seek:(t)=>{P.pause(),Wt(tn(t))},setFollow:(t,e)=>{if(qe=!0,t&&e!==void 0)y=fe(e);Jt(t),ut(),pt()}};ws();en(0);Ot();\n',icons:{block:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="551.59998px" height="343.79999px" viewBox="0 0 551.59998 343.79999"
	 style="enable-background:new 0 0 551.59998 343.79999;" xml:space="preserve">
<style type="text/css">
	.st0{opacity:0.4;enable-background:new    ;}
	.st1{fill:#CDD9EE;}
	.st2{fill:#B5C5DC;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#6885A9;}
	.st5{fill:#231F20;}
</style>
<g>
	<polygon class="st0" points="309.29999,322.89999 274.60001,316.10001 274,16.2 551.59998,180 	"/>
	<polygon class="st1" points="274.60001,228.8 92.2,119.2 274,9.7 457,119.2 	"/>
	<polygon class="st2" points="90.2,195 274.60001,305.79999 274.60001,305.79999 274.60001,231.3 90.2,120.4 	"/>
	<polygon class="st3" points="288.29999,220.60001 135.7,127.7 303,27 274,9.7 92.2,119.2 274.60001,228.8 	"/>
	<polygon class="st4" points="459,195 274.60001,305.79999 274.60001,305.79999 274.60001,231.3 459,120.4 	"/>
	<path class="st5" d="M467.20001,115.6L467.20001,115.6L274,0L83.00002,115.1l-1,0.6v83.7l192.59998,115.80002L466.20001,200
		l1-0.60001V115.6z M274,9.7l183,109.5L274.60001,228.8L92.20001,119.2L274,9.7z M457,124.1v69.69999L276.70001,302.20001V232.5
		L457,124.1z M272.60001,232.39999v69.69998L92.30001,193.8v-69.7L272.60001,232.39999z"/>
</g>
</svg>
`,cache:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="55.1px" height="57.3px" viewBox="0 0 55.1 57.3" enable-background="new 0 0 55.1 57.3" xml:space="preserve">
<g id="Layer_3">
</g>
<g id="Layer_4">
</g>
<g id="Layer_10">
	<g opacity="0.4" fill="#000000">
		<polygon points="35.6,46 38.3,48.1 25.6,52.1 21.2,53 32,38.9 41.4,44.8 		"/>
	</g>
</g>
<g id="Layer_7">
</g>
<g id="Layer_6">
	<polygon fill="#F2C256" points="31.6,19 18.4,11.1 18.4,33.9 21.2,35.5 21.2,52.1 31.6,31.5 26,28.1 	"/>
	<polygon fill="#FFE4AE" points="18.4,33.9 18.5,33.9 25.6,15.4 18.4,11.1 	"/>
	<polygon fill="none" stroke="#010202" stroke-width="0.5" stroke-linejoin="round" stroke-miterlimit="10" points="31.6,19 
		18.4,11.1 18.4,33.9 21.2,35.5 21.2,52.1 31.6,31.5 26,28.1 	"/>
</g>
<g id="Layer_5">
	<polygon fill="#F7C56B" stroke="#010202" stroke-width="0.4" stroke-linejoin="round" stroke-miterlimit="10" points="18.4,11.1 
		24.5,7.4 37.6,15.3 32,24.3 37.6,27.7 27.2,48.3 21.2,52.1 31.6,31.5 26,28.1 31.6,19 	"/>
	<polygon fill="#754F0C" stroke="#010202" stroke-width="0.4" stroke-miterlimit="10" points="37.6,15.3 31.6,19 26,28.1 31.6,31.5 
		21.2,52.1 27.2,48.3 37.6,27.7 32,24.3 	"/>
	<g id="Layer_12">
	</g>
	<polygon fill="none" stroke="#010202" stroke-width="0.4" stroke-linejoin="round" stroke-miterlimit="10" points="18.4,11.1 
		24.5,7.4 37.6,15.3 32,24.3 37.6,27.7 27.2,48.3 21.2,52.1 31.6,31.5 26,28.1 31.6,19 	"/>
</g>
<g id="Layer_8">
	<polygon fill="#AF7A2E" stroke="#010202" stroke-width="0.4" stroke-linejoin="round" stroke-miterlimit="10" points="31.6,31.5 
		37.6,27.7 32,24.3 26,28.1 	"/>
</g>
<g id="Layer_11">
	<polyline fill="none" stroke="#010202" stroke-width="0.4" stroke-linejoin="round" stroke-miterlimit="10" points="37.6,15.3 
		31.6,19 26,28.1 32,24.3 37.6,15.3 	"/>
</g>
<g id="Layer_9">
	<g>
		<path fill="#010202" d="M24.5,7.4l13.2,7.9l-5.7,9l5.6,3.4L27.2,48.3l-6,3.7V35.5l-2.7-1.6V11.1L24.5,7.4 M24.5,6.6
			c-0.1,0-0.3,0-0.4,0.1l-6,3.7c-0.2,0.1-0.4,0.4-0.4,0.7v22.8c0,0.3,0.1,0.5,0.4,0.7l2.3,1.4v16.1c0,0.3,0.2,0.6,0.4,0.7
			c0.1,0.1,0.3,0.1,0.4,0.1s0.3,0,0.4-0.1l6-3.7c0.1-0.1,0.2-0.2,0.3-0.3l10.4-20.6c0.2-0.4,0.1-0.8-0.3-1l-4.9-3l5.2-8.4
			c0.1-0.2,0.1-0.4,0.1-0.6c-0.1-0.2-0.2-0.4-0.4-0.5l-13.1-8C24.7,6.6,24.6,6.6,24.5,6.6L24.5,6.6z"/>
	</g>
</g>
</svg>
`,cardterminal:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="522.1px" height="616px" viewBox="0 0 522.1 616" enable-background="new 0 0 522.1 616" xml:space="preserve">
<path opacity="0.15" fill="#000000" enable-background="new    " d="M361,583.2c2,23.8-42.9,38.7-104.9,19.3s-117.5-65.6-119.5-89.3
	c-2-23.8,45-38.4,107-19.1C305.5,513.4,359,559.4,361,583.2z"/>
<g id="Layer_1_1_" display="none">
	<polygon display="inline" fill="none" stroke="#A7A9AC" stroke-width="4" stroke-miterlimit="10" points="476.5,431.3 261.1,555.7 
		45.6,431.3 45.6,182.6 261.1,58.2 476.5,182.6 	"/>
</g>
<g id="Layer_2_1_">
	<g>
		<g>
			<g>
				<path fill="#4B6E98" d="M376,146.6v294.5c0,3.1-0.5,5.7-1.4,7.8c-0.9,2.1-2.2,3.7-3.7,4.7l0,0c-0.2,0.1-0.4,0.3-0.6,0.4
					L332,476.1c3.4-1.9,5.5-6.4,5.5-12.7V168.9c0-11.6-7-25-15.7-30L160.5,45.8c-3.3-1.9-6.4-2.3-8.9-1.4l36.3-21.1
					c2.9-2.2,6.8-2.3,11.2,0.2l161.2,93.1c5.7,3.3,10.8,10.3,13.5,18C375.2,138.6,376,142.7,376,146.6z"/>
			</g>
			<g>
				<polygon fill="#0070D9" points="174,390 174,472 306.1,548.3 306.1,466.3 				"/>
			</g>
			<g>
				<polygon fill="#FFC600" points="231.2,435.6 184.4,408.6 184.4,436.6 184.4,437.6 184.4,465.7 231.2,492.7 231.2,463.6 
					231.2,463.6 				"/>
			</g>
			<g>
				<path fill="#6885A9" d="M337.4,182.7v-13.8c0-11.6-7-25-15.7-30L160.5,45.8c-3.3-1.9-6.4-2.3-8.9-1.4l36.3-21.1
					c2.9-2.2,6.8-2.3,11.2,0.2l161.2,93.1c5.7,3.3,10.8,10.3,13.5,18C363.1,151.7,350.9,167.8,337.4,182.7z"/>
			</g>
			<g>
				<polygon fill="#0BB2F3" points="265.5,483.2 255,477.1 255,502.7 265.5,508.8 265.5,495.8 265.5,495.8 				"/>
			</g>
			<g>
				<polygon fill="#0BB2F3" points="265.5,445.6 255,439.5 255,465.1 265.5,471.2 265.5,458.2 265.5,458.2 				"/>
			</g>
			<g>
				<path fill="#CDD9EE" d="M338.2,463.4c0,11.6-7,16.9-15.7,11.9l-161.2-93.1c-8.7-5-15.7-18.5-15.7-30V57.7
					c0-11.6,7-16.9,15.7-11.9l161.2,93.1c8.7,5,15.7,18.5,15.7,30V463.4z"/>
				<path fill="#231F20" d="M328.8,479.1c-2.3,0-4.8-0.7-7.2-2.2l-161.2-93.1c-9.4-5.4-16.7-19.4-16.7-31.8V57.7
					c0-9.6,4.5-15.8,11.5-15.8c2.3,0,4.8,0.7,7.2,2.2l161.2,93.1c9.4,5.4,16.7,19.4,16.7,31.8v294.5
					C340.2,473,335.7,479.1,328.8,479.1z M155.1,45.9c-4.5,0-7.5,4.6-7.5,11.8v294.5c0,10.9,6.6,23.6,14.7,28.3l161.2,93.1
					c1.9,1.1,3.6,1.6,5.2,1.6c4.5,0,7.5-4.6,7.5-11.8V168.9c0-10.9-6.6-23.6-14.7-28.3l-161.2-93C158.5,46.5,156.7,45.9,155.1,45.9z
					"/>
			</g>
			<g>
				<g>
					<path fill="#E6E7E8" d="M307.7,228.2c-1.2,0-2.5-0.4-3.7-1.1L175.7,153c-4.4-2.5-7.8-9-7.8-14.8V89.6c0-5.5,3.1-8,6.1-8
						c1.2,0,2.5,0.4,3.7,1.1l128.3,74c0.6,0.3,1.1,0.7,1.6,1.1c3.7,3.1,6.2,8.7,6.2,13.7v48.7C313.8,225.7,310.8,228.2,307.7,228.2z
						"/>
				</g>
				<g>
					<path fill="#231F20" d="M174,83.6c0.8,0,1.7,0.3,2.7,0.8l65.1,37.6l49.8,28.7l13.4,7.7c0.4,0.3,0.9,0.6,1.3,0.9
						c3.1,2.6,5.5,7.7,5.5,12.1v48.7c0,3.7-1.7,6-4.1,6c-0.8,0-1.8-0.3-2.7-0.8l-34.5-19.9l-21.7-12.5l-14.8-8.6l-49.8-28.7
						l-7.5-4.3c-3.8-2.2-6.8-8-6.8-13.1V89.6C169.9,85.8,171.6,83.6,174,83.6 M174,79.6L174,79.6c-3.9,0-8.1,3.1-8.1,10v48.7
						c0,6.5,3.8,13.6,8.8,16.5l7.5,4.3l49.8,28.7l14.8,8.6l21.7,12.5l34.5,19.9c1.6,0.9,3.1,1.4,4.7,1.4c3.9,0,8.1-3.1,8.1-10v-48.7
						c0-5.5-2.9-11.8-7-15.2c-0.6-0.5-1.2-0.9-1.9-1.3l-13.4-7.7l-49.8-28.7L178.6,81C177.2,80,175.6,79.6,174,79.6L174,79.6z"/>
				</g>
			</g>
			<g>
				<path fill="#FFFFFF" d="M311.8,171.5v9.8l-41.4,24.1l-21.7-12.5l57.5-33.5C309.5,162,311.8,167.1,311.8,171.5z"/>
			</g>
			<g>
				<polygon fill="#FFFFFF" points="291.6,150.7 233.9,184.3 184.2,155.6 241.8,122 				"/>
			</g>
			<g>
				<g>
					<g>
						<g>
							<path fill="#FFFFFF" d="M202.3,228c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2
								c0-5.7,3.2-8.3,6.3-8.3c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2C208.6,225.5,205.5,228,202.3,228z"/>
						</g>
						<g>
							<path fill="#231F20" d="M176.8,182.6c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
								c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C172.5,184.9,174.3,182.6,176.8,182.6 M176.8,178.6
								L176.8,178.6c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
								v-11.2c0-6.8-3.9-14.1-9.2-17.1L181.7,180C180.1,179.1,178.4,178.6,176.8,178.6L176.8,178.6z"/>
						</g>
					</g>
					<g>
						<path fill="#BCBEC0" d="M202.9,198c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4c-1.2-0.7-2.4-1.8-3.4-3.1
							c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2C206.6,204.9,205.1,200.9,202.9,198z"/>
					</g>
				</g>
				<g>
					<g>
						<g>
							<path fill="#FFFFFF" d="M251.2,256.3c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2
								c0-5.7,3.2-8.3,6.3-8.3c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4V248C257.5,253.7,254.3,256.3,251.2,256.3z
								"/>
						</g>
						<g>
							<path fill="#231F20" d="M225.7,210.8c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7V248c0,3.9-1.8,6.3-4.3,6.3
								c-0.9,0-1.8-0.3-2.8-0.9L228.5,242c-4-2.3-7.2-8.4-7.2-13.7v-11.2C221.4,213.1,223.1,210.8,225.7,210.8 M225.7,206.8
								L225.7,206.8c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
								v-11.2c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4C228.9,207.3,227.3,206.8,225.7,206.8L225.7,206.8z"/>
						</g>
					</g>
					<g>
						<path fill="#BCBEC0" d="M251.7,226.2c0.3,1.2,0.5,2.4,0.5,3.6V241c0,5.3-3.2,7.7-7.2,5.4L225.2,235c-1.2-0.7-2.4-1.8-3.4-3.1
							c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2C255.5,233.1,254,229.1,251.7,226.2z"/>
					</g>
				</g>
				<g>
					<g>
						<g>
							<path fill="#FFFFFF" d="M300,284.5c-1.3,0-2.5-0.4-3.8-1.1L276.4,272c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2c0-5.7,3.2-8.3,6.3-8.3
								c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2C306.3,281.9,303.2,284.5,300,284.5z"/>
						</g>
						<g>
							<path fill="#231F20" d="M274.5,239c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
								c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C270.2,241.3,272,239,274.5,239 M274.5,235L274.5,235
								c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3V265
								c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4C277.8,235.5,276.1,235,274.5,235L274.5,235z"/>
						</g>
					</g>
					<g>
						<path fill="#BCBEC0" d="M300.6,254.4c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4
							c-1.2-0.7-2.4-1.8-3.4-3.1c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4V265C304.3,261.3,302.8,257.3,300.6,254.4z
							"/>
					</g>
				</g>
				<g>
					<g>
						<g>
							<g>
								<path fill="#FFFFFF" d="M202.3,274.3c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2
									c0-5.7,3.2-8.3,6.3-8.3c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4V266C208.6,271.8,205.5,274.3,202.3,274.3
									z"/>
							</g>
							<g>
								<path fill="#231F20" d="M176.8,228.9c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7V266c0,3.9-1.8,6.3-4.3,6.3
									c-0.9,0-1.8-0.3-2.8-0.9L179.7,260c-4-2.3-7.2-8.4-7.2-13.7v-11.2C172.5,231.2,174.3,228.9,176.8,228.9 M176.8,224.9
									L176.8,224.9c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
									v-11.2c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4C180.1,225.3,178.4,224.9,176.8,224.9L176.8,224.9z"/>
							</g>
						</g>
						<g>
							<path fill="#BCBEC0" d="M202.9,244.3c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4
								c-1.2-0.7-2.4-1.8-3.4-3.1c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2
								C206.6,251.2,205.1,247.2,202.9,244.3z"/>
						</g>
					</g>
					<g>
						<g>
							<g>
								<path fill="#FFFFFF" d="M251.2,302.5c-1.3,0-2.5-0.4-3.8-1.1L227.5,290c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2
									c0-2.3,0.5-4.3,1.6-5.8c1.1-1.6,2.8-2.5,4.7-2.5c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2
									C257.5,300,254.3,302.5,251.2,302.5z"/>
							</g>
							<g>
								<path fill="#231F20" d="M225.7,257.1c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
									c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C221.4,259.4,223.1,257.1,225.7,257.1 M225.7,253.1
									L225.7,253.1c-2.5,0-4.9,1.2-6.4,3.4c-1.3,1.8-1.9,4.2-1.9,6.9v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4
									c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3V283c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4
									C228.9,253.5,227.3,253.1,225.7,253.1L225.7,253.1z"/>
							</g>
						</g>
						<g>
							<path fill="#BCBEC0" d="M251.7,272.5c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4
								c-1.2-0.7-2.4-1.8-3.4-3.1c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4V283C255.5,279.4,254,275.4,251.7,272.5z"
								/>
						</g>
					</g>
					<g>
						<g>
							<g>
								<path fill="#FFFFFF" d="M300,330.7c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2
									c0-5.7,3.2-8.3,6.3-8.3c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2C306.3,328.2,303.2,330.7,300,330.7z
									"/>
							</g>
							<g>
								<path fill="#231F20" d="M274.5,285.3c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
									c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C270.2,287.6,272,285.3,274.5,285.3 M274.5,281.3
									L274.5,281.3c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
									v-11.2c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4C277.8,281.7,276.1,281.3,274.5,281.3L274.5,281.3z"/>
							</g>
						</g>
						<g>
							<path fill="#BCBEC0" d="M300.6,300.7c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4
								c-1.2-0.7-2.4-1.8-3.4-3.1c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2
								C304.3,307.6,302.8,303.6,300.6,300.7z"/>
						</g>
					</g>
				</g>
				<g>
					<g>
						<g>
							<g>
								<path fill="#FFFFFF" d="M202.3,320.6c-1.3,0-2.5-0.4-3.8-1.1L178.7,308c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2
									c0-5.7,3.2-8.3,6.3-8.3c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2C208.6,318,205.5,320.6,202.3,320.6z
									"/>
							</g>
							<g>
								<path fill="#231F20" d="M176.8,275.1c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
									c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C172.5,277.5,174.3,275.1,176.8,275.1 M176.8,271.1
									L176.8,271.1c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
									V301c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4C180.1,271.6,178.4,271.1,176.8,271.1L176.8,271.1z"/>
							</g>
						</g>
						<g>
							<path fill="#BCBEC0" d="M202.9,290.5c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4
								c-1.2-0.7-2.4-1.8-3.4-3.1c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2
								C206.6,297.5,205.1,293.4,202.9,290.5z"/>
						</g>
					</g>
					<g>
						<g>
							<g>
								<path fill="#FFFFFF" d="M251.2,348.8c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2
									c0-5.7,3.2-8.3,6.3-8.3c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2
									C257.5,346.2,254.3,348.8,251.2,348.8z"/>
							</g>
							<g>
								<path fill="#231F20" d="M225.7,303.3c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
									c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C221.4,305.7,223.1,303.3,225.7,303.3 M225.7,299.3
									L225.7,299.3c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
									v-11.2c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4C228.9,299.8,227.3,299.3,225.7,299.3L225.7,299.3z"/>
							</g>
						</g>
						<g>
							<path fill="#BCBEC0" d="M251.7,318.7c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4
								c-1.2-0.7-2.4-1.8-3.4-3.1c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2C255.5,325.7,254,321.6,251.7,318.7
								z"/>
						</g>
					</g>
					<g>
						<g>
							<g>
								<path fill="#FFFFFF" d="M300,377c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2c0-2.3,0.5-4.3,1.6-5.8
									c1.1-1.6,2.8-2.5,4.7-2.5c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2C306.3,374.4,303.2,377,300,377z"
									/>
							</g>
							<g>
								<path fill="#231F20" d="M274.5,331.5c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
									c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C270.2,333.9,272,331.5,274.5,331.5 M274.5,327.5
									L274.5,327.5c-2.5,0-4.9,1.2-6.4,3.4c-1.3,1.8-1.9,4.2-1.9,6.9V349c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4
									c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3v-11.2c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4
									C277.8,328,276.1,327.5,274.5,327.5L274.5,327.5z"/>
							</g>
						</g>
						<g>
							<path fill="#BCBEC0" d="M300.6,346.9c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4
								c-1.2-0.7-2.4-1.8-3.4-3.1c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2
								C304.3,353.9,302.8,349.8,300.6,346.9z"/>
						</g>
					</g>
				</g>
				<g>
					<g>
						<path fill="#8DC63F" d="M202.3,366.8c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2
							c0-5.7,3.2-8.3,6.3-8.3c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2C208.6,364.3,205.5,366.8,202.3,366.8z
							"/>
					</g>
					<g>
						<path fill="#231F20" d="M176.8,321.4c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
							c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C172.5,323.7,174.3,321.4,176.8,321.4 M176.8,317.4
							L176.8,317.4c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
							v-11.2c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4C180.1,317.9,178.4,317.4,176.8,317.4L176.8,317.4z"/>
					</g>
				</g>
				<g>
					<path fill="#7BA538" d="M202.9,336.8c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4c-1.2-0.7-2.4-1.8-3.4-3.1
						c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2C206.6,343.7,205.1,339.7,202.9,336.8z"/>
				</g>
				<g>
					<g>
						<g>
							<path fill="#FFFFFF" d="M251.2,395.1c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4V356
								c0-5.7,3.2-8.3,6.3-8.3c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4v11.2C257.5,392.5,254.3,395.1,251.2,395.1
								z"/>
						</g>
						<g>
							<path fill="#231F20" d="M225.7,349.6c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7v11.2c0,3.9-1.8,6.3-4.3,6.3
								c-0.9,0-1.8-0.3-2.8-0.9l-19.8-11.4c-4-2.3-7.2-8.4-7.2-13.7v-11.2C221.4,351.9,223.1,349.6,225.7,349.6 M225.7,345.6
								L225.7,345.6c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
								v-11.2c0-6.8-3.9-14.1-9.2-17.1L230.5,347C228.9,346.1,227.3,345.6,225.7,345.6L225.7,345.6z"/>
						</g>
					</g>
					<g>
						<path fill="#BCBEC0" d="M251.7,365c0.3,1.2,0.5,2.4,0.5,3.6v11.2c0,5.3-3.2,7.7-7.2,5.4l-19.8-11.4c-1.2-0.7-2.4-1.8-3.4-3.1
							c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2C255.5,371.9,254,367.9,251.7,365z"/>
					</g>
				</g>
				<g>
					<g>
						<path fill="#D64550" d="M300,423.3c-1.3,0-2.5-0.4-3.8-1.1l-19.8-11.4c-4.6-2.6-8.2-9.4-8.2-15.4v-11.2c0-5.7,3.2-8.3,6.3-8.3
							c1.3,0,2.5,0.4,3.8,1.1l19.8,11.4c4.6,2.6,8.2,9.4,8.2,15.4V415C306.3,420.7,303.2,423.3,300,423.3z"/>
					</g>
					<g>
						<path fill="#231F20" d="M274.5,377.8c0.9,0,1.8,0.3,2.8,0.9l19.8,11.4c4,2.3,7.2,8.4,7.2,13.7V415c0,3.9-1.8,6.3-4.3,6.3
							c-0.9,0-1.8-0.3-2.8-0.9L277.4,409c-4-2.3-7.2-8.4-7.2-13.7v-11.2C270.2,380.1,272,377.8,274.5,377.8 M274.5,373.8
							L274.5,373.8c-4,0-8.3,3.2-8.3,10.3v11.2c0,6.8,3.9,14.1,9.2,17.1l19.8,11.4c1.6,0.9,3.2,1.4,4.8,1.4c4,0,8.3-3.2,8.3-10.3
							v-11.2c0-6.8-3.9-14.1-9.2-17.1l-19.8-11.4C277.8,374.3,276.1,373.8,274.5,373.8L274.5,373.8z"/>
					</g>
				</g>
				<g>
					<path fill="#932E3D" d="M300.6,393.2c0.3,1.2,0.5,2.4,0.5,3.6V408c0,5.3-3.2,7.7-7.2,5.4L274.1,402c-1.2-0.7-2.4-1.8-3.4-3.1
						c1,4.2,3.6,8.3,6.7,10.1l19.8,11.4c4,2.3,7.2-0.1,7.2-5.4v-11.2C304.3,400.1,302.8,396.1,300.6,393.2z"/>
				</g>
			</g>
		</g>
		<g>
			<g>
				<path fill="#231F20" d="M193.1,21.9c1.9,0,4,0.6,6.2,1.9l161.2,93.1c5.7,3.3,10.8,10.3,13.5,18c1.4,3.9,2.2,8.1,2.2,12v294.5
					c0,3.1-0.5,5.7-1.4,7.8c-0.9,2.1-2.2,3.7-3.7,4.7l0,0c-0.2,0.1-0.4,0.3-0.6,0.4L335,474.7c-1.6,1.7-3.7,2.7-6,2.7
					c-1.9,0-4-0.6-6.2-1.9l-16.4-9.5v82l-132.1-76.3v-82l-12.7-7.3c-8.7-5-15.7-18.5-15.7-30V57.9c0-8.4,3.7-13.5,9.1-13.7
					c-0.1,0-0.3,0-0.4,0c-1,0-1.9,0.1-2.7,0.4l36.3-21.1C189.6,22.5,191.3,21.9,193.1,21.9 M193.1,12.9c-3.6,0-7,1.1-9.9,3.2
					l-35.9,20.8l0.1,0.3c-5.9,3.1-10.6,9.9-10.6,20.9v294.5c0,14.9,8.7,31.2,20.2,37.8l8.2,4.7v76.8v5.2l4.5,2.6L301.8,556l13.5,7.8
					V548v-66.4l2.9,1.7c3.6,2.1,7.2,3.1,10.7,3.1c4.3,0,8.3-1.6,11.5-4.4l33.1-19.1h0.2l2.2-1.4c3.1-2,5.6-5.1,7.1-8.8
					c1.4-3.2,2.1-7,2.1-11.2V146.8c0-4.8-0.9-9.9-2.7-15c-3.6-10-10.1-18.6-17.5-22.8l-161-93C200.3,13.9,196.7,12.9,193.1,12.9
					L193.1,12.9z"/>
			</g>
		</g>
	</g>
</g>
</svg>
`,cloud:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="471.7px" height="508.4px" viewBox="0 0 471.7 508.4" enable-background="new 0 0 471.7 508.4" xml:space="preserve">
<g id="Layer_1_1_" display="none">
	<polygon display="inline" fill="none" stroke="#231F20" stroke-miterlimit="10" points="433.1,373 227.3,491.8 21.5,373 
		21.5,135.4 227.3,16.6 433.1,135.4 	"/>
</g>
<path opacity="0.25" fill="#000000" enable-background="new    " d="M381.5,429.4c4.6,30.9-55.3,54.8-141.1,35.6S75.3,390.9,70.7,359.9
	c-4.6-30.9,58.1-54.7,143.9-35.5S376.9,398.5,381.5,429.4z"/>
<g id="Layer_2_1_">
	<g>
		<g>
			<path fill="#A7A9AC" d="M349.6,249.2L284,287c-1.5-7.5-3.8-15-6.7-22.3c-9.3-23.5-24.9-44.5-42.6-54.7l-0.2-0.1
				c-6.5-3.8-12.7-5.7-18.4-6.1l65.5-37.8c5.7,0.4,11.9,2.4,18.4,6.1l0.2,0.1c8.2,4.7,16,11.8,22.9,20.3
				C335.7,208.1,345.4,228.6,349.6,249.2z"/>
		</g>
		<g>
			<path fill="#A7A9AC" d="M281.6,166l-65.5,37.8c-0.9-9.5-3-19.1-5.9-28.6c-10.1-32.4-30.7-62.6-54.6-76.4
				c-8.6-5-16.8-7.3-24.3-7.3c-5.7,0-10.9,1.4-15.6,4l65.8-38l0.1,0.1c10.7-5.9,24.4-5.2,39.5,3.5c14,8.1,26.8,21.7,37.1,38.2
				C270.7,119.1,279.4,143,281.6,166z"/>
		</g>
		<g>
			<path fill="#BCBEC0" d="M317.7,423.6C317.8,423.6,317.8,423.6,317.7,423.6L317.7,423.6L317.7,423.6z"/>
		</g>
		<g>
			<path fill="#D1D3D4" d="M400.9,345.3c0,19.6-6.4,33.6-16.5,39.9l0,0l0,0c-0.4,0.3-0.9,0.5-1.3,0.8l-64.6,37.2
				c10.4-6.2,17-20.2,17-40.2c0-36.7-22.3-79.4-49.9-95.3L284,287l65.5-37.8l1.5,0.8C378.6,265.9,400.9,308.6,400.9,345.3z"/>
		</g>
		<g>
			<path fill="#A7A9AC" d="M334.8,373.3c0.3,3.3,0.5,6.5,0.5,9.7c0,19.9-6.6,34-17,40.2L383,386c0.5-0.2,0.9-0.5,1.3-0.8h0.1l0,0
				c10.2-6.3,16.5-20.3,16.5-39.9c0-14.3-3.4-29.5-9.2-43.7C377.9,329.3,358.5,353.8,334.8,373.3z"/>
		</g>
		<g>
			<path fill="#D1D3D4" d="M323.1,192.5c-7.4,28.7-23.7,53.8-45.8,72.2c-9.3-23.5-24.9-44.5-42.6-54.7l-0.2-0.1
				c-6.5-3.8-12.7-5.7-18.4-6.1l65.5-37.8c5.7,0.4,11.9,2.4,18.4,6.1l0.2,0.1C308.5,176.9,316.2,184,323.1,192.5z"/>
		</g>
		<g>
			<path fill="#D1D3D4" d="M258.3,99.2c-10,29-26.7,54.9-48.1,76c-10.1-32.4-30.7-62.6-54.6-76.4c-8.6-5-16.8-7.3-24.3-7.3
				c-5.7,0-10.9,1.4-15.6,4l65.8-38l0.1,0.1c10.7-5.9,24.4-5.2,39.5,3.5C235.1,69.1,248,82.7,258.3,99.2z"/>
		</g>
		<g>
			<path fill="#231F20" d="M196.9,53.7c7.4,0,15.6,2.4,24.3,7.3c14,8.1,26.8,21.7,37.1,38.2c12.4,19.9,21.1,43.8,23.4,66.8
				c5.7,0.4,11.9,2.4,18.4,6.1l0.2,0.1c8.2,4.7,16,11.8,22.9,20.3c12.6,15.6,22.3,36.1,26.4,56.7l1.5,0.8
				c19.5,11.2,36.3,35.9,44.5,62.3c0,0,0,0,0,0.1c0.3,0.9,0.5,1.7,0.8,2.6c0,0.1,0.1,0.3,0.1,0.4c0.7,2.5,1.3,4.9,1.9,7.4
				c0.1,0.3,0.1,0.5,0.2,0.8c0.1,0.6,0.3,1.3,0.4,1.9c0.1,0.4,0.2,0.9,0.2,1.3c0.1,0.6,0.2,1.2,0.3,1.8c0.1,0.5,0.2,1,0.2,1.6
				c0.1,0.5,0.2,1,0.2,1.5c0.1,1,0.3,2,0.4,2.9c0,0.4,0.1,0.8,0.1,1.2c0.1,0.7,0.1,1.3,0.2,2c0,0.4,0.1,0.9,0.1,1.3
				c0,0.7,0.1,1.3,0.1,2c0,0.4,0,0.8,0.1,1.2c0,0.9,0,1.8,0.1,2.8c0,0.1,0,0.2,0,0.3c0,12.3-2.5,22.3-6.8,29.7
				c-2.6,4.4-5.9,7.9-9.7,10.2l0,0l0,0l0,0c-0.2,0.1-0.4,0.2-0.6,0.3c-0.3,0.2-0.5,0.3-0.8,0.4l-64.6,37.2c-0.2,0.1-0.4,0.2-0.6,0.4
				l0,0h-0.1l0,0c-3.7,2.1-7.9,3.2-12.5,3.2c-6.1,0-12.8-1.9-19.8-6l-182-105c-27.5-15.9-49.9-58.5-49.9-95.3
				c0-27.3,12.4-43.7,30.1-43.7c4.9,0,10.2,1.3,15.8,3.9c-3.3-11.9-5.1-24-5.1-35.7c0-24.8,8.3-42.2,21.4-49.6h-0.1l65.9-38
				C186.2,55,191.3,53.7,196.9,53.7 M196.9,44.7c-7.1,0-13.7,1.7-19.6,5h-0.1h-0.1l-65.9,38l0,0C94.8,97,85.4,117.9,85.4,145
				c0,7.4,0.7,15.1,2,23c-1.3-0.1-2.5-0.2-3.7-0.2c-11.7,0-22,5.5-29,15.4c-6.6,9.3-10.1,22.2-10.1,37.3c0,19.2,5.5,40.4,15.6,59.6
				c10.2,19.5,24,34.9,38.7,43.4l182,105.1c8.2,4.8,16.4,7.2,24.3,7.2c6.1,0,11.7-1.4,16.8-4.3l0,0h0.1l-0.2-0.3l0.2,0.3
				c0.2-0.1,0.5-0.3,0.7-0.4l64.4-37.1c0.2-0.1,0.5-0.3,0.7-0.4l0.2-0.1h0.1c0.1-0.1,0.3-0.2,0.4-0.2l4.6-2.5V390
				c3.2-2.8,6.1-6.2,8.4-10.2c5.3-9,8.1-20.8,8.1-34.3c0-0.2,0-0.3,0-0.5c0-0.9,0-1.9-0.1-2.9c0-0.3,0-0.6,0-1v-0.3
				c0-0.7-0.1-1.4-0.1-2.2c0-0.5-0.1-1-0.1-1.4c-0.1-0.7-0.1-1.4-0.2-2.2v-0.4c0-0.3-0.1-0.6-0.1-0.9c-0.1-1.2-0.3-2.2-0.4-3.2
				c-0.1-0.4-0.1-0.8-0.2-1.2l-0.1-0.4c-0.1-0.6-0.2-1.1-0.3-1.7c-0.1-0.7-0.2-1.3-0.3-1.9c-0.1-0.4-0.2-0.9-0.3-1.3
				c-0.1-0.7-0.3-1.4-0.4-2.1c0-0.2-0.1-0.4-0.1-0.6l-0.1-0.2c-0.6-2.6-1.2-5.3-2-7.9l-0.1-0.2l-0.1-0.2c-0.3-1-0.5-1.9-0.8-2.8
				l-0.1-0.2l0,0c-8.9-28.6-26.6-53.6-46.6-66.1c-4.8-20.4-14.7-40.8-27.4-56.6c-7.8-9.7-16.3-17.2-25.3-22.4l-0.1-0.1h-0.1h-0.1
				c-5-2.9-9.9-4.9-14.8-6.1c-3.2-21.8-11.6-44.1-23.9-63.7C254,76.4,240,62.1,225.2,53.6C215.8,47.5,206.1,44.7,196.9,44.7
				L196.9,44.7z"/>
		</g>
		<g>
			<path fill="#FFFFFF" d="M285.5,287.8L284,287c-6.5-31.8-26.1-63.6-49.3-77l-0.2-0.1c-6.5-3.7-12.7-5.7-18.4-6.1
				c-4.2-42-29.7-87.2-60.5-105C121.8,79.3,94.4,100,94.4,145c0,11.6,1.8,23.8,5.1,35.7c-25.7-12.1-45.9,4.8-45.9,39.8
				c0,36.7,22.3,79.4,49.9,95.3l182,105.1c27.5,15.9,49.9-1,49.9-37.7S313,303.7,285.5,287.8z"/>
			<path fill="#231F20" d="M305.3,428.7L305.3,428.7c-6.6,0-13.6-2.1-20.8-6.2l-182-105.1c-28-16.2-50.9-59.7-50.9-97
				c0-27.7,12.6-45.7,32.1-45.7c4.1,0,8.4,0.8,12.9,2.5c-2.8-11.1-4.2-21.9-4.2-32.3c0-33.7,15.3-55.6,38.9-55.6
				c8,0,16.5,2.6,25.3,7.6c30.4,17.5,56.6,62.4,61.3,104.9c5.7,0.7,11.6,2.8,17.6,6.2l0.2,0.1c23,13.3,43.1,44.3,50.1,77.4l0.7,0.4
				c28,16.2,50.9,59.7,50.9,97c0,13.6-3,25.1-8.8,33.2C322.8,424.4,314.8,428.7,305.3,428.7z M83.7,178.8c-17,0-28.1,16.4-28.1,41.7
				c0,36,21.9,78,48.9,93.5l182,105.1c6.6,3.8,12.9,5.7,18.8,5.7l0,0c8.1,0,15.1-3.7,20-10.7c5.3-7.4,8-18.1,8-30.9
				c0-36-21.9-78-48.9-93.5l-2.2-1.3l-0.2-0.9c-6.5-31.9-26.4-63-48.3-75.7l-0.2-0.1c-6.1-3.5-12-5.5-17.5-5.8l-1.7-0.1l-0.2-1.7
				c-4.2-41.8-29.8-86.2-59.5-103.4c-8.1-4.7-16-7.1-23.3-7.1c-21.2,0-34.9,20.2-34.9,51.6c0,11.2,1.7,23,5.1,35.1l1.2,4.2l-3.9-1.9
				C93.5,180,88.5,178.8,83.7,178.8z"/>
		</g>
		<g>
			<line fill="none" x1="281.6" y1="166" x2="216.1" y2="203.7"/>
			<path fill="#231F20" d="M216.1,205.7c-0.7,0-1.4-0.4-1.7-1c-0.6-1-0.2-2.2,0.7-2.7l65.6-37.8c1-0.6,2.2-0.2,2.7,0.7
				c0.6,1,0.2,2.2-0.7,2.7l-65.6,37.8C216.8,205.7,216.4,205.7,216.1,205.7z"/>
		</g>
		<g>
			<line fill="none" x1="284" y1="287" x2="349.6" y2="249.2"/>
			<path fill="#231F20" d="M284,289c-0.7,0-1.4-0.4-1.7-1c-0.6-1-0.2-2.2,0.7-2.7l65.6-37.8c1-0.6,2.2-0.2,2.7,0.7
				c0.6,1,0.2,2.2-0.7,2.7L285,288.7C284.7,288.9,284.4,289,284,289z"/>
		</g>
	</g>
</g>
</svg>
`,cronjob:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="446.6px" height="470.7px" viewBox="0 0 446.6 470.7" enable-background="new 0 0 446.6 470.7" xml:space="preserve">
<g id="Layer_2_1_">
</g>
<g id="Layer_1_2_">
	<g id="Layer_1_1_" display="none">
		<polygon display="inline" fill="none" stroke="#A7A9AC" stroke-width="4" stroke-miterlimit="10" points="429.9,362.1 
			214.5,486.5 -0.9,362.1 -0.9,113.3 214.5,-11 429.9,113.3 		"/>
	</g>
	<path fill="#F0F7FF" d="M219.1,360.5c9.6,0,19.3,2.4,26.7,6.7c1.4,0.8,2.6,1.6,3.8,2.5c3.5-2.6,5.3-5.7,5.2-9.2
		c-0.1-4.8-4-9.6-10.5-13.4c-1.4-0.8-2.8-1.5-4.4-2.2c-6.2-2.6-13.6-4.1-20.8-4.1c-7.5,0-14.3,1.6-19.2,4.4
		c-4.4,2.5-6.9,5.8-7.2,9.4s1.6,7.4,5.3,10.8c0.1-0.1,0.2-0.1,0.3-0.2c2.7-1.5,5.8-2.7,9.4-3.6C211.3,360.9,215.1,360.5,219.1,360.5
		z"/>
	<path fill="#F0F7FF" d="M303.5,267.4c5.7,0,11.5,1.5,15.9,4c0.7,0.4,1.3,0.8,1.9,1.2c1.6-1.3,2.5-2.9,2.4-4.6
		c-0.1-2.6-2.2-5.2-5.8-7.3c-0.8-0.5-1.6-0.9-2.5-1.2c-3.5-1.5-7.8-2.3-11.9-2.3c-4.3,0-8.1,0.9-10.9,2.5c-2.4,1.4-3.7,3.1-3.9,5
		c-0.1,1.8,0.8,3.7,2.6,5.5c1.6-0.9,3.4-1.6,5.4-2C298.8,267.7,301.1,267.4,303.5,267.4z"/>
	<g id="Layer_2_2_">
		<g>
			<path fill="#231F20" d="M181.9,17.7c8.3,0,16,1.9,22.9,5.4l0,0c1.4,0.7,2.8,1.5,4.1,2.4l24.2,14.1l0,0l0,0l0,0
				c22.3,10.7,36.5,38.8,36.5,79.7c0,58.5-29.3,124.7-69.4,163.5l31,1.3l15.8,23.1c3.2,0.7,6.3,1.5,9.4,2.4l-7.3-4.2v-13.2l0,0l0,0
				l3.2-4.2l0,0l0,0l-21.3-5l-1.4-11.1v-13.2l0,0l0,0l17.8-2.7l0,0l-4.9-5.1v-13.2l0,0l0,0l12.6-7.3l22.3,7.1
				c2.6-0.7,5.4-1.3,8.2-1.7l6-12.9l19.2,0.8l9.3,13.5c3,0.7,5.9,1.5,8.7,2.4l20.8-5.3l14.6,8.4l0,0l0,0v13.2l-3.2,4.2l21.5,4.9
				l1.4,11.1v13.2l-17.8,2.7l4.9,5.1v13.2l-12.6,7.3l0,0l0,0l0,0l-22.3-7.1c-2.6,0.7-5.4,1.3-8.2,1.7l-5.3,11.4v15.5l-5.6,7.2
				l36.8,8.4l2.4,19v22.7l-30.4,4.7l8.3,8.7l0,0l0,0v22.7L312.5,445l0,0l0,0l0,0l-38.2-12.2c-4.5,1.2-9.2,2.2-14,2.9l-10.2,22
				l-32.9-1.4l-15.8-23.1c-5.1-1.1-10-2.5-14.9-4.1l-35.5,9.1l0,0l0,0l-24.9-14.4v-22.7l0,0l0,0l5.6-7.2l0,0l0,0l-36.8-8.4l-2.4-19
				V344v0.1V344l30.4-4.7l0,0l0,0l-8.3-8.7v-19.8c-2-0.9-3.9-1.9-5.7-3.1L83,292.6c-1.5-0.8-3-1.6-4.4-2.6l0,0l0,0
				c-19-12.5-31-39.2-31-76.5c0-49,20.6-103.4,50.8-142.6c11.8-15.3,25.2-28.3,39.3-37.7c2.1-1.4,4.2-2.7,6.3-3.9
				C157.2,21.4,170.2,17.7,181.9,17.7 M181.9,9.7c-13.5,0-27.7,4.3-42.3,12.6c-2.3,1.3-4.5,2.7-6.7,4.2c-14.6,9.7-28.5,23-41.2,39.5
				c-32.3,41.9-52.4,98.4-52.4,147.5c0,19.3,3,36.3,9,50.6c5.9,14.3,14.5,25.2,25.4,32.4c0.2,0.1,0.4,0.2,0.5,0.4
				c1.5,1,3.1,1.9,4.7,2.7l25.7,15c0.6,0.4,1.2,0.8,1.9,1.1v14.9c0,1.1,0.2,2.1,0.6,3.1l-15.7,2.4c-3.9,0.5-7,3.9-7,7.9v22.7
				c0,0.3,0,0.7,0.1,1l2.4,19c0.4,3.3,2.9,6.1,6.2,6.8l25.3,5.8c-0.2,0.7-0.3,1.3-0.3,2V424c0,2.9,1.5,5.5,4,6.9l24.9,14.4
				c1.2,0.7,2.6,1.1,4,1.1c0.2,0,0.4,0,0.6,0c0.5,0,0.9-0.1,1.4-0.2l33.3-8.6c3.4,1,6.8,2,10.3,2.8l14.1,20.6
				c1.4,2.1,3.7,3.4,6.3,3.5l32.9,1.4c0.1,0,0.2,0,0.3,0c3.1,0,5.9-1.8,7.3-4.6l8.4-18.2c2.8-0.5,5.6-1.1,8.3-1.8l35.8,11.4
				c0.8,0.3,1.7,0.4,2.6,0.4c0.2,0,0.4,0,0.6,0c1.2-0.1,2.3-0.4,3.4-1l21.6-12.5c2.5-1.4,4-4.1,4-6.9V410c0-1.1-0.2-2.1-0.6-3.1
				l15.9-2.5c3.9-0.6,6.8-4,6.8-7.9v-22.7c0-0.3,0-0.7-0.1-1l-2.4-19c-0.4-3.3-2.9-6.1-6.2-6.8l-25.3-5.8c0.2-0.7,0.3-1.3,0.3-2
				v-13.8l2.8-6c0.8-0.2,1.6-0.3,2.4-0.5l20,6.4c0.8,0.3,1.7,0.4,2.6,0.4c0.2,0,0.5,0,0.7,0l0,0l0,0c1.1-0.1,2.3-0.5,3.3-1l12.6-7.3
				c2.5-1.4,4-4.1,4-6.9v-12.2l6.1-0.9c3.9-0.6,6.8-4,6.8-7.9v-13.2c0-0.3,0-0.7-0.1-1l-1.4-11.1c-0.4-3.3-2.9-6.1-6.2-6.8
				l-12.1-2.8v-11.8c0-2.9-1.6-5.6-4.1-7l-14.5-8.4c-1.2-0.7-2.6-1.1-4-1.1c-0.7,0-1.3,0.1-2,0.3l-18.6,4.8
				c-1.3-0.4-2.7-0.8-4.1-1.1l-7.5-11c-1.4-2.1-3.7-3.4-6.3-3.5l-19.2-0.8c-0.1,0-0.2,0-0.3,0c-3.1,0-5.9,1.8-7.3,4.6l-4.2,9.1
				c-0.8,0.2-1.6,0.3-2.5,0.5l-20.2-6.4c-0.8-0.3-1.6-0.4-2.4-0.4c-1,0-2,0.2-2.9,0.6c1.8-3.7,3.5-7.5,5.2-11.3
				c13.3-30.9,20.3-62.8,20.3-92.3c0-42.5-14.8-74-40.7-86.7l-23.7-13.9c-1.5-0.9-3-1.8-4.5-2.6c-0.1,0-0.1-0.1-0.2-0.1
				C200.4,11.8,191.4,9.7,181.9,9.7z M218,275.5c1.2-1.4,2.4-2.8,3.6-4.3v0.7c0,0.3,0,0.7,0.1,1l0.3,2.8L218,275.5L218,275.5z"/>
		</g>
		<g>
			<g>
				<path fill="#CDD9EE" d="M232.6,38.9c-16.5-7.9-37.3-6.3-59.9,6.8c-2.1,1.2-4.1,2.5-6.2,3.9C152.3,59,139,72,127.1,87.3
					c-23.5,30.4-41.1,69.9-47.9,109c-2,11.3-3,22.6-3,33.6c0,18.9,3.1,35.1,8.6,48.1s13.5,22.8,23.2,28.9l-26-15.1
					c-1.5-0.8-3-1.6-4.4-2.6l0,0c-9.5-6.2-17.3-16-22.6-29c-5.4-12.9-8.4-28.9-8.4-47.6c0-12.3,1.3-24.9,3.7-37.5
					C57.5,137.3,74.7,99.4,97.4,70c11.9-15.3,25.2-28.3,39.3-37.7c2.1-1.4,4.2-2.7,6.3-3.9c13.6-7.9,26.5-11.6,38.3-11.6
					c8.3,0,16,1.9,22.9,5.4l0,0c1.4,0.7,2.8,1.5,4.1,2.4L232.6,38.9z"/>
			</g>
			<g>
				<path fill="#F0F7FF" d="M232.6,38.9c-16.5-7.9-37.3-6.3-59.9,6.8c-1.7,1-3.4,2-5,3.1c-0.4,0.2-0.8,0.5-1.2,0.8
					C152.3,59,139,72,127.1,87.3c-23.5,30.4-41.1,69.9-47.9,109c-10.3-6-20-13.1-28.9-21c7.2-37.8,24.4-75.7,47.1-105.1
					c11.9-15.3,25.2-28.3,39.3-37.7c0.9-0.6,1.7-1.1,2.6-1.7c1.2-0.8,2.5-1.5,3.7-2.2c13.6-7.9,26.5-11.6,38.3-11.6
					c8.3,0,16,1.9,22.9,5.4l0,0c1.4,0.7,2.8,1.5,4.1,2.4L232.6,38.9z"/>
			</g>
			<g>
				<path fill="#CDD9EE" d="M232.6,38.9c-16.5-7.9-37.3-6.3-59.9,6.8c-1.7,1-3.4,2-5,3.1c-10-5.2-19.4-11.2-28.2-18
					c1.2-0.8,2.5-1.5,3.7-2.2c13.6-7.9,26.5-11.6,38.3-11.6c8.3,0,16,1.9,22.9,5.4l0,0c1.4,0.7,2.8,1.5,4.1,2.4L232.6,38.9z"/>
			</g>
			<g>
				<g>
					<path fill="#6885A9" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M76.3,229.9c0,71,43.2,103.6,96.4,72.9
						s96.4-113.2,96.4-184.2S225.9,15,172.7,45.7S76.3,158.9,76.3,229.9z"/>
					<path fill="#6885A9" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M134.4,315.8L134.4,315.8
						c-36.2,0-59.6-33.7-59.6-86c0-71.4,43.6-154.6,97.2-185.5c13.5-7.8,26.7-11.8,39-11.8c17.6,0,32.5,8,43.1,23
						c10.8,15.3,16.5,37,16.5,62.9c0,71.4-43.6,154.6-97.2,185.5C159.9,311.9,146.8,315.8,134.4,315.8z"/>
				</g>
				<g>
					<path fill="#3E6387" d="M255.7,126.3c0,61.2-37.2,132.2-83,158.7c-13.4,7.7-26,10.8-37.1,9.8c-27.2-2.5-45.9-29.2-45.9-72.6
						c0-61.1,37.2-132.2,83-158.7c10.1-5.8,19.7-9,28.7-9.8C233.1,51,255.7,78.6,255.7,126.3z"/>
					<path fill="#231F20" d="M139.7,296.4c-1.4,0-2.9-0.1-4.3-0.2c-14-1.3-25.9-8.8-34.3-21.6c-8.5-13.1-13-31.2-13-52.4
						c0-61.5,37.6-133.3,83.8-160c10.1-5.8,19.9-9.2,29.3-10c1.5-0.1,3-0.2,4.4-0.2c31.3,0,51.6,29.1,51.6,74.2
						c0,61.5-37.6,133.3-83.8,160C161.8,293,150.4,296.4,139.7,296.4z M205.7,55c-1.4,0-2.8,0.1-4.1,0.2c-8.9,0.8-18.4,4-28.1,9.6
						C128.1,91,91.2,161.6,91.2,222.2c0,41.3,17.1,68.6,44.5,71.1c1.3,0.1,2.7,0.2,4,0.2c10.2,0,21-3.3,32.2-9.8
						c45.4-26.2,82.3-96.8,82.3-157.4C254.2,83,235.2,55,205.7,55z"/>
				</g>
				<g>
					<g>
						<path fill="#E6E7E8" d="M247.3,126.3c0,61.2-37.2,132.2-83,158.7c-10.1,5.8-19.7,9-28.7,9.8c-27.2-2.5-45.9-29.2-45.9-72.6
							c0-61.1,37.2-132.2,83-158.7c10.1-5.8,19.7-9,28.7-9.8C228.6,56.2,247.3,82.9,247.3,126.3z"/>
					</g>
					<g>
						<path fill="#231F20" d="M135.6,296.2h-0.1c-14-1.3-25.9-8.8-34.3-21.6c-8.5-13.1-13-31.2-13-52.4c0-61.5,37.6-133.3,83.8-160
							c10.1-5.8,19.9-9.2,29.3-10h0.1h0.1c14,1.3,25.9,8.8,34.3,21.6c8.5,13.1,13,31.2,13,52.4c0,61.5-37.6,133.3-83.8,160
							c-10.1,5.8-19.9,9.2-29.3,10H135.6z M201.4,55.2c-8.9,0.8-18.3,4-27.9,9.6C128.1,91,91.2,161.6,91.2,222.2
							c0,41.3,17,68.5,44.4,71.1c8.9-0.8,18.3-4,27.9-9.6c45.4-26.2,82.3-96.8,82.3-157.4C245.8,85,228.8,57.8,201.4,55.2z"/>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#231F20" points="178,173.1 186.8,168 186.8,73.4 178,78.5 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M176.5,175.7V77.6l11.8-6.8v98.1L176.5,175.7z M179.5,79.4v91.1l5.8-3.4V76L179.5,79.4z"/>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#231F20" points="182.5,160.2 184.5,167.9 132,220.4 130,212.7 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M131.3,223.3l-3-11.1l55-55l3,11.1L131.3,223.3z M131.6,213.1l1.2,4.4l50.1-50.1l-1.2-4.4L131.6,213.1
							z"/>
					</g>
				</g>
			</g>
			<g>
				<path fill="#231F20" d="M133.8,315.8L133.8,315.8c-9.9,0-19.1-2.6-27.1-7.6l-25.9-15.1c-1.5-0.7-3-1.6-4.4-2.6l-0.8-0.4V290
					c-19.7-13.4-31-41.5-31-77.3c0-47.7,19.5-102.7,51-143.5c12.3-16,25.7-28.8,39.7-38.1c2.1-1.4,4.2-2.7,6.4-4
					c13.5-7.8,26.7-11.8,39-11.8c8.5,0,16.4,1.9,23.6,5.6l0.1,0.1c1.4,0.7,2.8,1.6,4.2,2.4l24.1,14.1c23.7,11.5,37.3,41,37.3,81
					c0,71.4-43.6,154.6-97.2,185.5C159.3,311.9,146.1,315.8,133.8,315.8z M77.9,288L77.9,288c1.4,0.9,2.8,1.7,4.3,2.5l26,15.2
					c7.6,4.8,16.2,7.2,25.6,7.2l0,0c11.8,0,24.5-3.8,37.5-11.4C224,271,266.9,189,266.9,118.6c0-38.9-13-67.4-35.7-78.3l0.4-0.8
					l-0.4,0.7L207,26.1c-1.4-0.9-2.7-1.7-4.1-2.4l-0.1-0.1c-6.7-3.5-14.2-5.2-22.1-5.2c-11.8,0-24.5,3.8-37.5,11.4
					c-2.1,1.2-4.2,2.5-6.2,3.9c-13.7,9.1-26.9,21.7-39,37.4c-31.1,40.3-50.5,94.6-50.5,141.7C47.6,247.9,58.6,275.3,77.9,288
					L77.9,288z"/>
			</g>
			<g>
				<g>
					<g>
						<path fill="#CDD9EE" d="M363.6,241.9l-14.6-8.4l-20.8,5.3c-2.8-0.9-5.8-1.7-8.7-2.4l-9.3-13.5l-19.2-0.8l-6,12.9
							c-2.8,0.4-5.6,1-8.2,1.7l-22.3-7.1l-12.6,7.3l12.3,12.9c-1.2,1.5-2.2,3.1-2.9,4.7l-22.3,3.4l1.4,11.1l23.4,5.3
							c1.1,1.7,2.5,3.4,4.1,5l-9.2,12l14.6,8.4l20.8-5.3c2.8,0.9,5.8,1.7,8.7,2.4l9.3,13.5l19.2,0.8l6-12.9c2.8-0.4,5.6-1,8.2-1.7
							l22.3,7.1l12.6-7.3l-12.3-12.9c1.2-1.5,2.2-3.1,2.9-4.7l22.3-3.5l-1.4-11.1l-23.4-5.3c-1.1-1.7-2.5-3.4-4.1-5L363.6,241.9z
							 M320.5,274.9c-6.9,4-18.9,3.5-26.8-1.1s-8.8-11.5-1.9-15.5s18.9-3.5,26.8,1.1C326.5,264.1,327.4,271,320.5,274.9z"/>
					</g>
					<g>
						<path fill="#231F20" d="M322.2,312.7l-21-0.9l-9.3-13.6c-2.7-0.6-5.3-1.3-7.9-2.1l-20.9,5.4l-16.6-9.6l9.5-12.3
							c-1.1-1.2-2.2-2.5-3.1-3.8l-23.8-5.4l-1.7-13.6l22.9-3.5c0.5-1.1,1.2-2.2,2-3.3l-12.8-13.3l14.8-8.6l22.5,7.2
							c2.3-0.6,4.7-1.1,7.2-1.5l6.1-13.1l21,0.9l9.3,13.6c2.7,0.6,5.3,1.3,7.9,2.1l20.9-5.4l16.6,9.6l-9.5,12.3
							c1.1,1.2,2.2,2.5,3,3.8l23.9,5.4l1.7,13.6l-23,3.6c-0.5,1.1-1.2,2.2-2,3.3l12.8,13.4l-14.8,8.6l-22.5-7.2
							c-2.3,0.6-4.7,1.1-7.1,1.5L322.2,312.7z M302.9,308.9l17.5,0.7l5.9-12.7l0.8-0.1c2.8-0.4,5.5-1,8-1.6l0.4-0.1l22.1,7l10.4-6
							l-11.9-12.5l0.8-1c1.1-1.4,2-2.9,2.7-4.4l0.3-0.8l21.7-3.4l-1.1-8.6l-23-5.2l-0.3-0.5c-1.1-1.6-2.4-3.3-3.9-4.8l-0.9-0.9
							l9-11.7l-12.5-7.2l-20.6,5.3l-0.4-0.1c-2.8-0.9-5.7-1.7-8.6-2.3l-0.6-0.1l-9.2-13.4l-17.5-0.7l-5.9,12.7l-0.8,0.1
							c-2.8,0.4-5.5,1-8.1,1.6l-0.4,0.1l-22.1-7l-10.4,6l11.9,12.4l-0.8,1c-1.1,1.4-2,2.9-2.7,4.4l-0.3,0.8l-21.7,3.4l1.1,8.6
							l23,5.2l0.3,0.5c1.1,1.6,2.4,3.3,3.9,4.8l0.9,0.9l-9,11.7l12.5,7.2l20.6-5.3l0.4,0.1c2.8,0.9,5.7,1.7,8.6,2.3l0.6,0.1
							L302.9,308.9z M308.9,279.1c-5.7,0-11.5-1.5-15.9-4c-4.6-2.7-7.3-6.3-7.3-10.1c0-3.2,1.9-6,5.4-8c3.2-1.9,7.6-2.9,12.4-2.9
							c5.7,0,11.5,1.5,15.9,4c4.6,2.7,7.3,6.3,7.3,10c0,3.2-1.9,6-5.4,8C318.1,278.1,313.7,279.1,308.9,279.1z M303.5,257.2
							c-4.3,0-8.1,0.9-10.9,2.5c-2.5,1.5-3.9,3.3-3.9,5.4c0,2.6,2.1,5.3,5.8,7.5c3.9,2.3,9.2,3.6,14.4,3.6c4.3,0,8.1-0.9,10.9-2.5
							c2.5-1.5,3.9-3.3,3.9-5.4c0-2.6-2.1-5.3-5.8-7.5C313.9,258.5,308.7,257.2,303.5,257.2z"/>
					</g>
				</g>
				<g>
					<g>
						<g>
							<path fill="#4B6E98" d="M251.4,254.5c0.7-1.6,1.7-3.2,2.9-4.7L242,236.9v13.2l4.9,5.1L251.4,254.5z"/>
						</g>
						<g>
							<path fill="#231F20" d="M246.3,256.8l-5.8-6.1v-17.6l15.8,16.5l-0.8,1c-1.1,1.4-2,2.9-2.7,4.4l-0.3,0.8L246.3,256.8z
								 M243.5,249.5l3.9,4.1l3-0.5c0.5-1.1,1.2-2.2,2-3.3l-8.9-9.3V249.5z"/>
						</g>
					</g>
					<g>
						<g>
							<path fill="#4B6E98" d="M356.6,251.1l-2.2,2.8c1.6,1.6,3,3.3,4.1,5l1.9,0.4l3.2-4.2v-13.2L356.6,251.1L356.6,251.1z"/>
						</g>
						<g>
							<path fill="#231F20" d="M361,261l-3.4-0.8l-0.3-0.5c-1.1-1.6-2.4-3.3-3.9-4.8l-0.9-0.9l12.7-16.5v18.2L361,261z M359.4,257.6
								l0.4,0.1l2.3-3v-8.3l-5.8,7.5C357.5,255,358.5,256.3,359.4,257.6z"/>
						</g>
					</g>
					<g>
						<g>
							<path fill="#6885A9" d="M321.2,274.5c-0.8-0.6-1.6-1.2-2.6-1.8c-6.2-3.6-14.8-4.6-21.5-3.1c4.9-5.6,11.4-9.6,18.9-11.5
								c0.9,0.4,1.8,0.8,2.7,1.3C326.3,263.9,327.3,270.5,321.2,274.5z"/>
						</g>
					</g>
					<g>
						<g>
							<path fill="none" d="M321.2,274.5c-0.8-0.6-1.6-1.2-2.6-1.8c-6.2-3.6-14.8-4.6-21.5-3.1c-1.9,0.4-3.7,1.1-5.2,2
								c-0.2,0.1-0.5,0.3-0.7,0.4c-5.4-4.4-5.3-10.2,0.7-13.7c6.1-3.5,16.4-3.5,24.1-0.2c0.9,0.4,1.8,0.8,2.7,1.3
								C326.3,263.9,327.3,270.5,321.2,274.5z"/>
						</g>
						<g>
							<path fill="#231F20" d="M321.1,276.4l-0.9-0.7c-0.7-0.6-1.5-1.1-2.4-1.7c-3.9-2.3-9.2-3.6-14.4-3.6c-2.1,0-4.2,0.2-6.1,0.6
								c-1.8,0.4-3.5,1-4.8,1.8c-0.2,0.1-0.4,0.3-0.6,0.4l-0.9,0.6l-0.9-0.7c-3.1-2.6-4.7-5.7-4.5-8.7c0.2-2.9,2.1-5.5,5.4-7.4
								c3.2-1.9,7.6-2.9,12.4-2.9c4.5,0,9.2,0.9,13.1,2.6c1,0.4,1.9,0.9,2.8,1.4c4.5,2.6,7.2,6.2,7.3,9.8c0.1,3-1.5,5.8-4.6,7.8
								L321.1,276.4z M303.5,267.4c5.7,0,11.5,1.5,15.9,4c0.7,0.4,1.3,0.8,1.9,1.2c1.6-1.3,2.5-2.9,2.4-4.6
								c-0.1-2.6-2.2-5.2-5.8-7.3c-0.8-0.5-1.6-0.9-2.5-1.2c-3.5-1.5-7.8-2.3-11.9-2.3c-4.3,0-8.1,0.9-10.9,2.5
								c-2.4,1.4-3.7,3.1-3.9,5c-0.1,1.8,0.8,3.7,2.6,5.5c1.6-0.9,3.4-1.6,5.4-2C298.8,267.7,301.1,267.4,303.5,267.4z"/>
						</g>
					</g>
					<g>
						<g>
							<path fill="#4B6E98" d="M361,278.8c-0.7,1.6-1.7,3.2-2.9,4.7l7.5,7.8l17.8-2.7v-13.2L361,278.8z"/>
						</g>
						<g>
							<path fill="#231F20" d="M365,293l-8.9-9.3l0.8-1c1.1-1.4,2-2.9,2.7-4.4l0.3-0.8l24.9-3.8V290L365,293z M360,283.4l6,6.3
								l15.7-2.4v-10.2l-19.8,3.1C361.4,281.3,360.8,282.4,360,283.4z"/>
						</g>
					</g>
					<g>
						<g>
							<path fill="#6885A9" d="M362.2,301.2l-4.5,2.6l-22.3-7.1c-2.6,0.7-5.4,1.3-8.2,1.7l-6,12.9l-19.2-0.8l-9.3-13.5
								c-3-0.7-5.9-1.4-8.7-2.4l-20.8,5.3l-7.5-4.3l0,0l-7.1-4.1v13.2l14.6,8.4l20.8-5.3c2.8,0.9,5.8,1.7,8.7,2.4l9.3,13.5l19.2,0.8
								l6-12.9c2.8-0.4,5.6-1,8.2-1.7l22.3,7.1l12.6-7.3v-13.2L362.2,301.2L362.2,301.2z"/>
						</g>
						<g>
							<path fill="#231F20" d="M322.2,325.9l-21-0.9l-9.3-13.6c-2.7-0.6-5.3-1.3-7.9-2.1l-20.9,5.4l-15.8-9.1v-16.7l16.3,9.4
								l20.6-5.3l0.4,0.1c2.8,0.9,5.7,1.7,8.6,2.3l0.6,0.1l9.2,13.4l17.5,0.7l5.9-12.7l0.8-0.1c2.8-0.4,5.5-1,8-1.6l0.4-0.1l22.1,7
								l14.3-8.2v16.7l-13.9,8l-22.5-7.2c-2.3,0.6-4.7,1.1-7.1,1.5L322.2,325.9z M302.9,322.1l17.5,0.7l5.9-12.7l0.8-0.1
								c2.8-0.4,5.5-1,8-1.6l0.4-0.1l22.1,7l11.3-6.5V299l-10.9,6.3l-22.5-7.2c-2.3,0.6-4.7,1.1-7.1,1.5l-6.1,13.1l-21-0.9
								l-9.3-13.6c-2.7-0.6-5.3-1.3-7.9-2.1l-20.9,5.4l-12.8-7.4v9.8l13.3,7.7l20.6-5.3l0.4,0.1c2.8,0.9,5.7,1.7,8.6,2.3l0.6,0.1
								L302.9,322.1z"/>
						</g>
					</g>
					<g>
						<g>
							<path fill="#4B6E98" d="M258,279.4c-1.6-1.6-3-3.3-4.1-5l-23.4-5.3l-1.4-11.1v13.2l1.4,11.1l21.5,4.9L258,279.4z"/>
						</g>
						<g>
							<path fill="#231F20" d="M252.6,288.9l-23.5-5.4l-1.5-12.3V258l3-0.2l1.2,10l23,5.2l0.3,0.5c1.1,1.6,2.4,3.3,3.9,4.8l0.9,0.9
								L252.6,288.9z M231.8,281l19.6,4.5l4.6-6c-1.1-1.2-2.2-2.5-3.1-3.8l-22.4-5.1v0.5L231.8,281z"/>
						</g>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#F0F7FF" points="248.8,291.4 248.8,304.6 263.3,313 263.3,299.8 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M264.8,315.6l-17.6-10.1v-16.7l17.6,10.1V315.6z M250.3,303.8l11.6,6.7v-9.8l-11.6-6.7L250.3,303.8
							L250.3,303.8z"/>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#F0F7FF" points="357.8,303.7 357.8,317 370.4,309.7 370.4,296.4 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M356.3,319.6v-16.7l15.6-9v16.7L356.3,319.6z M359.3,304.6v9.8l9.6-5.5V299L359.3,304.6z"/>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#6885A9" points="363.6,241.9 363.6,255.1 360.4,259.4 358.5,258.9 354.4,253.9 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M361,261l-3.3-0.8l-5.2-6.4l12.6-16.4v18.2L361,261z M359.3,257.6l0.4,0.1l2.3-3v-8.3l-5.8,7.6
							L359.3,257.6z"/>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#6885A9" points="242,236.9 242,250.1 246.8,255.2 251.4,254.5 254.3,249.7 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M246.3,256.8l-5.8-6.1v-17.6l15.7,16.4l-3.9,6.3L246.3,256.8z M243.5,249.5l3.9,4.1l3.1-0.5l1.9-3.2
							l-8.9-9.3V249.5L243.5,249.5z"/>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#6885A9" points="229.1,257.9 229.1,271.2 230.5,282.3 252,287.2 258,279.4 253.9,274.4 230.5,269 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M252.6,288.9l-23.5-5.4l-1.5-12.3V258l3-0.2l1.2,10l22.9,5.2l5.2,6.4L252.6,288.9z M231.8,281
							l19.6,4.5l4.7-6.1l-3-3.7l-22.4-5.1v0.5L231.8,281z"/>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#6885A9" points="383.3,275.4 383.3,288.6 365.5,291.4 358.1,283.6 361,278.8 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M365,293l-8.8-9.2l3.9-6.3l24.7-3.8V290L365,293z M359.9,283.4l6.1,6.4l15.7-2.4v-10.2l-19.9,3.1
							L359.9,283.4z"/>
					</g>
				</g>
			</g>
			<g>
				<g>
					<g>
						<path fill="#CDD9EE" d="M322,315.8l-24.9-14.4l-35.5,9.1c-4.9-1.6-9.9-2.9-14.9-4.1l-15.8-23.1l-32.9-1.4l-10.2,22
							c-4.8,0.7-9.5,1.7-14.1,2.9l-38.2-12.2l-21.6,12.5l21.1,22c-2.1,2.6-3.7,5.3-5,8.1l-38.2,5.9l2.4,19l40,9.1
							c1.9,2.9,4.3,5.8,7,8.6l-15.8,20.5l24.9,14.4l35.5-9.1c4.9,1.6,9.9,2.9,14.9,4.1l15.8,23.1l32.9,1.4l10.2-22
							c4.8-0.7,9.5-1.7,14-2.9l38.2,12.2l21.6-12.5l-20.9-22c2.1-2.6,3.7-5.3,5-8.1l38.2-5.9l-2.4-19l-40.1-9.1
							c-1.9-2.9-4.3-5.8-7-8.6L322,315.8z M248.3,372.3c-11.8,6.8-32.3,5.9-45.8-1.9c-13.6-7.8-15-19.7-3.3-26.5s32.3-5.9,45.8,1.9
							C258.6,353.7,260,365.5,248.3,372.3z"/>
					</g>
					<g>
						<path fill="#231F20" d="M250.5,435.8l-34.6-1.4L200,411.1c-4.8-1.1-9.5-2.4-14.1-3.8l-35.7,9.2l-26.9-15.6l16.1-20.9
							c-2.3-2.4-4.3-4.9-6-7.4l-40.5-9.2l-2.7-21.5l38.8-6c1.1-2.3,2.4-4.5,4-6.7l-21.5-22.5l23.8-13.7l38.4,12.2
							c4.2-1.1,8.5-2,13-2.7l10.3-22.2l34.6,1.4l15.9,23.2c4.8,1.1,9.5,2.4,14.1,3.8l35.7-9.2l26.9,15.6L308.1,336
							c2.3,2.4,4.3,4.9,6,7.4l40.5,9.2l2.7,21.5l-38.8,6c-1.1,2.3-2.4,4.5-4,6.6l21.5,22.5l-23.8,13.7l-38.4-12.2
							c-4.2,1.1-8.5,2-13,2.7L250.5,435.8z M217.5,431.5l31.1,1.3l10.1-21.9l0.8-0.1c4.8-0.7,9.4-1.7,13.9-2.8l0.4-0.1l0.4,0.1
							l37.6,12l19.4-11.2l-20.7-21.6l0.8-1c2-2.5,3.6-5.1,4.8-7.8l0.3-0.8l37.6-5.8l-2.1-16.5l-39.6-9l-0.3-0.5
							c-1.9-2.8-4.2-5.7-6.9-8.4l-0.9-0.9l15.5-20.2L296.8,303l-35.4,9.1L261,312c-4.8-1.6-9.8-2.9-14.8-4l-0.6-0.1l-15.7-23
							l-31.1-1.3l-10.1,21.9l-0.8,0.1c-4.8,0.7-9.5,1.7-13.9,2.8l-0.4,0.1l-38-12.1l-19.4,11.2l20.7,21.6l-0.8,1
							c-2,2.5-3.6,5.1-4.8,7.8l-0.3,0.8l-37.5,5.8l2.1,16.5l39.6,9l0.3,0.5c1.9,2.8,4.2,5.7,6.9,8.4l0.9,0.9L127.7,400l22.9,13.2
							l35.4-9.1l0.4,0.1c4.8,1.6,9.8,2.9,14.8,4l0.6,0.1L217.5,431.5z M228.4,378.4c-9.6,0-19.3-2.4-26.7-6.7
							c-7.6-4.4-12-10.3-12-16.3c0-5,3.1-9.6,8.7-12.8c5.3-3.1,12.7-4.8,20.7-4.8c9.6,0,19.3,2.4,26.7,6.7c7.6,4.4,12,10.3,12,16.3
							c0,5-3.1,9.6-8.7,12.8C243.7,376.7,236.3,378.4,228.4,378.4z M219,340.9c-7.5,0-14.3,1.6-19.2,4.4c-4.6,2.7-7.2,6.3-7.2,10.2
							c0,4.8,3.8,9.8,10.5,13.7c6.9,4,16.1,6.3,25.2,6.3c7.5,0,14.3-1.6,19.2-4.4c4.6-2.7,7.2-6.3,7.2-10.2c0-4.8-3.8-9.8-10.5-13.7
							C237.3,343.1,228.1,340.9,219,340.9z"/>
					</g>
				</g>
				<g>
					<g>
						<path fill="#6885A9" d="M129.9,337.3c1.2-2.8,2.9-5.5,5-8.1l-21.1-22v22.7l8.3,8.7L129.9,337.3z"/>
					</g>
					<g>
						<path fill="#231F20" d="M121.6,340.1l-9.3-9.7v-27l24.6,25.7l-0.8,1c-2,2.5-3.6,5.1-4.8,7.8l-0.3,0.8L121.6,340.1z
							 M115.3,329.2l7.4,7.7l6.2-1c1.1-2.3,2.4-4.5,4-6.7l-17.6-18.4C115.3,310.8,115.3,329.2,115.3,329.2z"/>
					</g>
				</g>
				<g>
					<g>
						<path fill="#4B6E98" d="M309.9,331.5l-3.7,4.8c2.7,2.8,5.1,5.7,7,8.6l3.2,0.7l5.6-7.2v-22.7L309.9,331.5L309.9,331.5z"/>
					</g>
					<g>
						<path fill="#231F20" d="M317,347.3l-4.7-1.1l-0.3-0.5c-1.9-2.8-4.2-5.7-6.9-8.4l-0.9-0.9l19.3-25V339L317,347.3z M314.1,343.6
							l1.7,0.4l4.7-6v-17.7l-12.3,16C310.4,338.6,312.4,341.1,314.1,343.6z"/>
					</g>
				</g>
				<g>
					<g>
						<path fill="#6885A9" d="M249.5,371.6c-1.3-1.1-2.8-2.1-4.5-3.1c-10.5-6.1-25.3-8-36.9-5.3c8.4-9.5,19.6-16.5,32.3-19.6
							c1.6,0.7,3.1,1.4,4.6,2.3C258.1,353.4,259.9,364.7,249.5,371.6z"/>
					</g>
				</g>
				<g>
					<g>
						<path fill="none" d="M249.5,371.6c-1.3-1.1-2.8-2.1-4.5-3.1c-10.5-6.1-25.3-8-36.9-5.3c-3.3,0.8-6.4,1.9-9,3.4
							c-0.4,0.2-0.8,0.5-1.2,0.7c-9.2-7.6-9.1-17.4,1.2-23.4c10.5-6.1,28-6,41.3-0.4c1.6,0.7,3.1,1.4,4.6,2.3
							C258.1,353.4,259.9,364.7,249.5,371.6z"/>
					</g>
					<g>
						<path fill="#231F20" d="M249.4,373.4l-0.9-0.7c-1.2-1-2.7-2-4.3-2.9c-6.9-4-16.1-6.3-25.2-6.3c-3.7,0-7.3,0.4-10.6,1.1
							s-6.1,1.8-8.6,3.2c-0.4,0.2-0.8,0.5-1.1,0.7l-0.9,0.6l-0.9-0.7c-5.1-4.2-7.7-9.2-7.2-14.1c0.4-4.6,3.5-8.8,8.6-11.8
							c5.3-3.1,12.7-4.8,20.7-4.8c7.6,0,15.4,1.5,22,4.3c1.7,0.7,3.3,1.5,4.7,2.3c7.4,4.3,11.8,10.1,12,15.9
							c0.1,4.7-2.5,9.1-7.4,12.4L249.4,373.4z M219.1,360.5c9.6,0,19.3,2.4,26.7,6.7c1.4,0.8,2.6,1.6,3.8,2.5
							c3.5-2.6,5.3-5.7,5.2-9.2c-0.1-4.8-4-9.6-10.5-13.4c-1.4-0.8-2.8-1.5-4.4-2.2c-6.2-2.6-13.6-4.1-20.8-4.1
							c-7.5,0-14.3,1.6-19.2,4.4c-4.4,2.5-6.9,5.8-7.2,9.4s1.6,7.4,5.3,10.8c0.1-0.1,0.2-0.1,0.3-0.2c2.7-1.5,5.8-2.7,9.4-3.6
							C211.3,360.9,215.1,360.5,219.1,360.5z"/>
					</g>
				</g>
				<g>
					<g>
						<path fill="#4B6E98" d="M317.4,378.9c-1.2,2.8-2.9,5.5-5,8.1l12.8,13.3l30.4-4.7V373L317.4,378.9z"/>
					</g>
					<g>
						<path fill="#231F20" d="M324.7,402l-14.2-14.9l0.8-1c2-2.5,3.6-5.1,4.8-7.8l0.3-0.8l40.7-6.3V397L324.7,402z M314.5,386.9
							l11.3,11.8l28.3-4.4v-19.6l-35.7,5.5C317.4,382.6,316.1,384.8,314.5,386.9z"/>
					</g>
				</g>
				<g>
					<g>
						<path fill="#6885A9" d="M319.6,417.2l-7.6,4.4l-38.2-12.2c-4.5,1.2-9.2,2.2-14,2.9l-10.2,22l-32.9-1.4l-15.8-23.1
							c-5.1-1.1-10-2.5-14.9-4.1l-35.5,9.1l-12.8-7.4l0,0l-12.1-7v22.7l24.9,14.4l35.5-9.1c4.9,1.6,9.9,2.9,14.9,4.1l15.8,23.1
							l32.9,1.4l10.2-22c4.8-0.7,9.5-1.7,14-2.9l38.2,12.2l21.6-12.5v-22.7L319.6,417.2L319.6,417.2z"/>
					</g>
					<g>
						<path fill="#231F20" d="M250.5,458.5l-34.6-1.4L200,433.8c-4.8-1.1-9.5-2.4-14.1-3.8l-35.7,9.2L123.9,424v-26.1l26.6,15.4
							l35.4-9.1l0.4,0.1c4.8,1.6,9.8,2.9,14.8,4l0.6,0.1l15.8,23l31.1,1.3l10.1-21.9l0.8-0.1c4.8-0.7,9.4-1.7,13.9-2.8l0.4-0.1
							l38,12.1l23.3-13.4v26.1l-22.9,13.2l-38.4-12.2c-4.2,1.1-8.5,2-13,2.7L250.5,458.5z M217.5,454.1l31.1,1.3l10.1-21.9l0.8-0.1
							c4.8-0.7,9.4-1.7,13.9-2.8l0.4-0.1l0.4,0.1l37.6,12l20.3-11.7v-19.2l-19.9,11.5L273.8,411c-4.2,1.1-8.5,2-13,2.7l-10.3,22.2
							l-34.6-1.4L200,411.2c-4.8-1.1-9.5-2.4-14.1-3.8l-35.7,9.2L127,403.2v19.2l23.6,13.6l35.4-9.1l0.4,0.1c4.8,1.6,9.7,2.9,14.8,4
							l0.6,0.1L217.5,454.1z"/>
					</g>
				</g>
				<g>
					<g>
						<path fill="#4B6E98" d="M141.2,380c-2.7-2.8-5.1-5.7-7-8.6l-40-9.1l-2.4-19V366l2.4,19l36.8,8.4L141.2,380z"/>
					</g>
					<g>
						<path fill="#231F20" d="M131.6,394.9L92.8,386l-2.5-20.2v-22.7l3-0.2l2.2,17.9l39.6,9l0.3,0.5c1.9,2.8,4.2,5.7,6.9,8.4
							l0.9,0.9L131.6,394.9z M95.5,383.6l34.9,8l8.9-11.5c-2.3-2.4-4.3-4.9-6-7.4l-40-9.1v2.2L95.5,383.6z"/>
					</g>
				</g>
				<g>
					<polygon fill="#F0F7FF" points="125.4,400.5 125.4,423.1 150.3,437.5 150.3,414.9 					"/>
					<path fill="#231F20" d="M151.8,440.1L123.9,424v-26.1l27.9,16.1V440.1z M126.9,422.3l21.9,12.7v-19.2l-21.9-12.7V422.3z"/>
				</g>
				<g>
					<polygon fill="#F0F7FF" points="312,421.6 312,444.2 333.6,431.8 333.6,409.1 					"/>
					<path fill="#231F20" d="M310.5,446.8v-26.1l24.6-14.2v26.1L310.5,446.8z M313.5,422.4v19.2l18.6-10.7v-19.2L313.5,422.4z"/>
				</g>
				<g>
					<polygon fill="#6885A9" points="322,315.8 322,338.4 316.4,345.6 313.2,344.9 306.2,336.3 					"/>
					<path fill="#231F20" d="M317,347.3l-4.7-1.1l-8.1-9.9l19.2-25v27.6L317,347.3z M314,343.6l1.8,0.4l4.7-6v-17.7l-12.4,16.1
						L314,343.6z"/>
				</g>
				<g>
					<g>
						<polygon fill="#6885A9" points="91.8,343.2 91.8,365.9 94.1,384.9 131,393.3 141.2,380 134.2,371.3 94.1,362.2 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M131.6,394.9L92.8,386l-2.5-20.2v-22.7l3-0.2l2.2,17.9l39.5,9l8.1,9.9L131.6,394.9z M95.5,383.6
							l34.9,8l8.9-11.6l-6-7.3l-40.1-9.1v2.2L95.5,383.6z"/>
					</g>
				</g>
				<g>
					<g>
						<polygon fill="#6885A9" points="355.6,373 355.6,395.7 325.2,400.4 312.5,387 317.4,378.9 						"/>
					</g>
					<g>
						<path fill="#231F20" d="M324.7,402l-14.1-14.7l5.9-9.7l40.6-6.3V397L324.7,402z M314.4,386.8l11.4,11.9l28.3-4.4v-19.6
							l-35.8,5.5L314.4,386.8z"/>
					</g>
				</g>
			</g>
		</g>
	</g>
</g>
</svg>
`,cube:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="105.4px" height="93.9px" viewBox="0 0 105.4 93.9" enable-background="new 0 0 105.4 93.9" xml:space="preserve">
<g id="Layer_3">
</g>
<g id="Layer_4">
	<polygon fill="#4F6587" stroke="#010202" stroke-linejoin="round" stroke-miterlimit="10" points="80.4,26.2 50.5,44.3 50.5,81.2 
		80.4,63.3 	"/>
	<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="20.7,26.2 50.5,44.3 50.5,81.2 
		20.7,63.3 	"/>
	<polygon fill="#CED8EB" points="50.5,44.2 20.7,26.2 50.3,8.5 80.4,26.2 	"/>
	<polygon fill="#FFFFFF" points="29.9,26.2 54.9,11.2 50.3,8.5 20.7,26.2 50.5,44.2 55.1,41.5 	"/>
	<polygon fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="50.5,44.2 20.7,26.2 50.3,8.5 
		80.4,26.2 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="80.4,55.1 80.4,63.3 56.3,77.8 50.5,83.2 66.4,83.2 98.5,63.8 	"/>
</g>
<g id="Layer_5">
	<g>
		<path d="M50.3,8.5l30.1,17.8v37.1L50.5,81.2L20.7,63.3V26.2L50.3,8.5 M50.3,6.5c-0.4,0-0.7,0.1-1,0.3L19.6,24.5
			c-0.6,0.4-1,1-1,1.7v37.1c0,0.7,0.4,1.4,1,1.7l29.8,17.9c0.3,0.2,0.7,0.3,1,0.3s0.7-0.1,1-0.3l30-17.9c0.6-0.4,1-1,1-1.7V26.2
			c0-0.7-0.4-1.4-1-1.7L51.3,6.7C51,6.6,50.6,6.5,50.3,6.5L50.3,6.5z"/>
	</g>
</g>
</svg>
`,desktop:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="573.5px" height="570.4px" viewBox="0 0 573.5 570.4" enable-background="new 0 0 573.5 570.4" xml:space="preserve">
<g id="Layer_1_1_" display="none">
	<polygon display="inline" fill="none" stroke="#A7A9AC" stroke-width="4" stroke-miterlimit="10" points="482.9,406.6 267.5,530.9 
		52.1,406.6 52.1,157.8 267.5,33.4 482.9,157.8 	"/>
</g>
<g id="Layer_2_1_">
	<g>
		<g>
			<path fill="#4B6E98" d="M344.6,405c-20,0-40.2-5.1-55.4-13.9c-15.6-9-24.6-21.1-24.6-33.2v-10h4c0,10.6,8.2,21.4,22.6,29.7
				c14.7,8.5,34.1,13.3,53.4,13.3l0,0c15.9,0,30.4-3.3,40.8-9.3c10-5.8,15.5-13.6,15.6-22.1v-3.2l4,2v1.2v9.8
				c0,10.1-6.3,19.2-17.6,25.8C376.4,401.5,361.2,405,344.6,405z"/>
			<path fill="#231F20" d="M266.7,347.9c0,10.9,8,22.4,23.6,31.4s35.5,13.6,54.4,13.6c15.7,0,30.6-3.2,41.8-9.6
				c11-6.4,16.5-14.9,16.6-23.8l0,0v9.7c0,0,0,0,0,0.1v0.1l0,0c0,9-5.5,17.6-16.6,24c-11.2,6.5-26.1,9.6-41.8,9.6
				c-18.9,0-38.9-4.6-54.4-13.6c-15.6-9-23.6-20.5-23.6-31.4V347.9 M270.7,347.9h-8v10c0,12.8,9.3,25.5,25.6,34.9
				c15.6,9,36.1,14.1,56.4,14.1c16.9,0,32.5-3.6,43.8-10.1c10.5-6.1,16.9-14.3,18.3-23.5h0.3v-4v-0.1v-0.1v-9.7v-2.5l-2.2-1.1
				l-5.7-2.9l-0.1,6.4c-0.1,7.8-5.3,15-14.6,20.4c-10.1,5.9-24.3,9.1-39.8,9.1c-18.9,0-38-4.8-52.4-13.1
				C278.5,368,270.7,357.8,270.7,347.9L270.7,347.9z"/>
		</g>
		<g>
			<path fill="#B1CAEC" d="M344.6,395c-20,0-40.2-5.1-55.4-13.9c-15.6-9-24.6-21.1-24.6-33.2c0-10.1,6.3-19.3,17.6-25.9
				c11-6.4,26.2-9.9,42.8-9.9c2.6,0,5.3,0.1,7.9,0.3h0.5l70.9,41l0.2,0.9c2.3,11.9-3.9,23.1-17.2,30.7
				C376.4,391.4,361.2,395,344.6,395L344.6,395z"/>
			<path fill="#231F20" d="M325.1,314.2c2.6,0,5.2,0.1,7.8,0.3l69.8,40.3c2.1,10.6-3.2,21.1-16.2,28.6c-11.2,6.5-26.1,9.6-41.8,9.6
				c-18.9,0-38.9-4.6-54.4-13.6c-28.5-16.4-31.6-41.3-6.9-55.6C294.5,317.4,309.4,314.2,325.1,314.2 M325.1,310.2
				c-16.9,0-32.5,3.6-43.8,10.1c-12,6.9-18.6,16.7-18.6,27.6c0,12.8,9.3,25.5,25.6,34.9c15.6,9,36.1,14.1,56.4,14.1
				c16.9,0,32.5-3.6,43.8-10.1c14-8.1,20.6-20.1,18.1-32.9l-0.4-1.8l-1.6-0.9L334.9,311l-0.8-0.5l-0.9-0.1
				C330.5,310.3,327.7,310.2,325.1,310.2L325.1,310.2z"/>
		</g>
		<g>
			<path fill="#4B6E98" d="M362,362.5c-0.3,0-0.7-0.1-1-0.3c-0.6-0.4-1-1-1-1.7v-29.2c0-0.7,0.4-1.4,1-1.7c0.3-0.2,0.7-0.3,1-0.3
				s0.7,0.1,1,0.3l10,5.8c0.6,0.4,1,1,1,1.7v17.7c0,0.7-0.4,1.4-1,1.7l-10,5.8C362.7,362.4,362.4,362.5,362,362.5z"/>
			<path fill="#231F20" d="M362,331.3l10,5.8v17.7l-10,5.8V331.3 M362,327.3c-0.7,0-1.4,0.2-2,0.5c-1.2,0.7-2,2-2,3.5v29.2
				c0,1.4,0.8,2.8,2,3.5c0.6,0.4,1.3,0.5,2,0.5s1.4-0.2,2-0.5l10-5.8c1.2-0.7,2-2,2-3.5V337c0-1.4-0.8-2.7-2-3.5l-10-5.8
				C363.4,327.4,362.7,327.3,362,327.3L362,327.3z"/>
		</g>
		<g>
			<path fill="#6885A9" d="M362,362.5c-0.3,0-0.7-0.1-1-0.3l-50.1-28.9c-0.6-0.4-1-1-1-1.7v-29.2c0-0.7,0.4-1.4,1-1.7
				c0.3-0.2,0.7-0.3,1-0.3s0.7,0.1,1,0.3l50.1,28.9c0.6,0.4,1,1,1,1.7v29.2c0,0.7-0.4,1.4-1,1.7C362.7,362.4,362.4,362.5,362,362.5z
				"/>
			<path fill="#231F20" d="M311.9,302.4l50.1,28.9v29.2l-50.1-28.9V302.4 M311.9,298.4c-0.7,0-1.4,0.2-2,0.5c-1.2,0.7-2,2-2,3.5
				v29.2c0,1.4,0.8,2.8,2,3.5L360,364c0.6,0.4,1.3,0.5,2,0.5s1.4-0.2,2-0.5c1.2-0.7,2-2,2-3.5v-29.2c0-1.4-0.8-2.8-2-3.5l-50.1-28.9
				C313.3,298.5,312.6,298.4,311.9,298.4L311.9,298.4z"/>
		</g>
		<g>
			<g>
				<polygon fill="#B1CAEC" points="473.6,182 195.8,21.4 220.9,6.9 498.6,167.5 498.6,386.7 473.6,401.2 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon fill="#4B6E98" points="473.6,179.7 498.6,165.2 498.6,386.7 473.6,401.2 				"/>
				<path fill="#231F20" d="M496.6,168.7v216.9l-21.1,12.2V180.9L496.6,168.7 M500.6,161.7l-6,3.5l-21.1,12.2l-2,1.2v2.3v216.9v6.9
					l6-3.5l21.1-12.2l2-1.2v-2.3V168.7V161.7L500.6,161.7z"/>
			</g>
		</g>
		<g>
			<polygon fill="#CDD9EE" points="197.8,239.5 197.8,17.9 474,179.2 474,400.7 			"/>
			<path fill="#231F20" d="M199.8,21.4l272.2,159v216.9l-272.2-159L199.8,21.4 M195.8,14.5v6.9v216.9v2.3l2,1.2l272.2,159l6-2.5
				v-0.9V180.5V178l-2-1.2l-272.2-159L195.8,14.5L195.8,14.5z"/>
		</g>
		<g>
			<polygon fill="#F0F7FF" points="436.6,159.7 300.2,295.5 199.9,238.3 199.9,232.9 337.4,101.8 			"/>
		</g>
		<g>
			<polygon fill="#F0F7FF" points="461,173.9 472,180.4 472,240.8 374.5,338.4 324.8,309.8 			"/>
		</g>
		<g>
			<g>
				<polygon fill="#6885A9" points="41,420.8 41,397.4 258.9,523.3 364,462.6 364,486 258.9,546.7 				"/>
				<path fill="#231F20" d="M43,400.9l216,124.7l103-59.5v18.8l-103,59.5L43,419.7V400.9 M39,394v6.9v18.8v2.3l2,1.2l216,124.7
					l2,1.2l2-1.2l103-59.5l2-1.2v-2.3v-18.8v-6.9l-6,3.5L259,521L45,397.4L39,394L39,394z"/>
			</g>
		</g>
		<g>
			<polygon fill="#4B6E98" stroke="#231F20" stroke-width="4" stroke-miterlimit="10" points="362,466.1 362,484.9 258.9,544.3 
				258.9,525.6 			"/>
		</g>
		<g>
			<polygon fill="#B1CAEC" points="39,400.9 146,339.1 366,466.1 258.9,527.9 			"/>
			<path fill="#231F20" d="M146,341.4l216,124.7l-103,59.5L43,400.9L146,341.4 M146,336.8l-2,1.2L41,397.4l-6,3.5l6,3.5l216,124.7
				l2,1.2l2-1.2l103-59.5l6-3.5l-6-3.5L148,337.9L146,336.8L146,336.8z"/>
		</g>
		<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="77,402.6 
			256.1,505.2 329.6,462.6 151.1,359 		"/>
	</g>
	<g>
		<g>
			<path fill="#231F20" d="M221,9.2l271.7,157.3v219.9l-21.1,12.2L404.8,359c0.6,4.4,0,5.7-1.8,9.8v0.6c0,9-5.5,17.6-16.7,24
				c-11.2,6.5-26.1,9.6-41.8,9.6c-18.9,0-38.9-4.6-54.4-13.6c-15.6-9-23.6-20.5-23.6-31.4v-0.2c-1.3-3.2-2-6.6-2-9.9
				c0-10.1,6.3-19.3,17.6-25.9c7.6-4.4,17.1-7.4,27.6-8.9v-10.9c0-0.4,0.1-0.7-24.8-14.8l-85.3-49.2V21.4L221,9.2 M221,0l-4,2.3
				l-21.1,12.2l-4,2.3v4.6v216.9v4.6l4,2.3L302,305.8v0.7c-8.9,1.9-17,4.8-23.6,8.7c-14,8.1-21.6,19.7-21.6,32.8
				c0,3.8,0.7,7.6,2,11.4c0.6,13.8,10.6,27.2,27.5,37c16.2,9.3,37.5,14.7,58.4,14.7c17.6,0,33.9-3.8,45.8-10.7
				c12.9-7.5,20.2-18.1,20.6-30c0.2-0.4,0.3-0.8,0.4-1.2l56,33.4l4,2.3l4-2.3l21.1-12.2l4-2.3v-4.6v-217v-4.6l-4-2.3L225,2.3L221,0
				L221,0z"/>
		</g>
		<g>
			<g>
				<path fill="#231F20" d="M146,341.4l216,124.7v18.8l-103,59.5L43,419.7v-18.8L146,341.4 M146,332.2l-4,2.3L39,394l-4,2.3v4.6
					v18.8v4.6l4,2.3l216,124.7l4,2.3l4-2.3l103-59.5l4-2.3v-4.6v-18.8v-4.6l-4-2.3L150,334.5L146,332.2L146,332.2z"/>
			</g>
		</g>
	</g>
</g>
</svg>
`,diamond:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="113.9px" height="105.8px" viewBox="0 0 113.9 105.8" enable-background="new 0 0 113.9 105.8" xml:space="preserve">
<g id="Layer_8_copy">
	<g id="Layer_3">
	</g>
	<g>
		<polygon fill="#6D84A5" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="14.1,50 58.1,7.5 102.1,50 
			58.1,76.5 		"/>
	</g>
	<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="14.1,50 58.1,76.5 58.1,7.5 	"/>
	<polygon fill="#FFFFFF" points="55.4,24 19.5,49.8 18.5,49.2 55.4,13.7 	"/>
	<polygon fill="#465E7C" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="14.1,50 58.1,96.6 102.1,50 
		58.1,76.5 	"/>
	<polygon fill="#A3B4CC" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="14.1,50 58.1,96.6 58.1,76.5 	
		"/>
</g>
<g id="Layer_4">
	<polygon fill="none" stroke="#000000" stroke-width="2" stroke-linejoin="round" stroke-miterlimit="10" points="58.1,7.5 14.1,50 
		58.1,96.6 102.1,50 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="58.1,97.5 108.3,81.7 85.9,67.3 	"/>
</g>
</svg>
`,dns:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_8_copy" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	 y="0px" width="134px" height="122.4px" viewBox="0 0 134 122.4" enable-background="new 0 0 134 122.4" xml:space="preserve">
<g id="Layer_7_copy">
</g>
<path opacity="0.4" fill="#000000" enable-background="new    " d="M76.1,65.4c-2.8,0-5.6,0.1-8.2,0.3v49.1c2.7,0.1,5.4,0.3,8.2,0.3
	c32,0,57.9-11.1,57.9-24.8C134,76.5,108.1,65.4,76.1,65.4z"/>
<circle fill="#DAE1ED" cx="66.6" cy="61.2" r="53.1"/>
<path fill="#7184A2" d="M116,59.2c0-27.8-22-50.3-49.6-51.1c-28,0.8-50.6,22.6-52.8,50.2c0,0.3,0,0.6,0,0.9
	c0,28.3,22.9,51.2,51.2,51.2S116,87.5,116,59.2z"/>
<path fill="#B9C4D7" d="M104.7,48.6c0-11.6-4.2-22.3-11.2-30.5c-8-6-17.8-9.7-28.5-10C51.4,8.5,39.1,14,29.9,22.8l0,0
	c-9.2,8.8-15.2,20.9-16.3,34.3l0,0c0,0.3,0,0.6,0,0.8c0,3.5,0.4,6.8,1,10.1C22,84.4,38.4,95.7,57.5,95.7
	C83.6,95.7,104.7,74.6,104.7,48.6z"/>
<path fill="#D0D8E9" d="M29.9,22.8L29.9,22.8C22.7,29.6,17.5,38.4,15,48.3c7,12.1,20.1,20.1,35,20.1c22.4,0,40.5-18.1,40.5-40.5
	c0-4.7-0.8-9.1-2.3-13.3C81.4,10.6,73.5,8.2,65,8C51.4,8.5,39.1,14,29.9,22.8z"/>
<circle id="Outline" fill="none" stroke="#000000" stroke-width="3" stroke-miterlimit="10" cx="66.6" cy="61.2" r="53.1"/>
<ellipse fill="none" stroke="#3C506D" stroke-width="2" stroke-miterlimit="10" cx="66.5" cy="46.1" rx="50.4" ry="22.2"/>
<ellipse fill="none" stroke="#3C506D" stroke-width="2" stroke-miterlimit="10" cx="66.5" cy="76.3" rx="50.4" ry="22.2"/>
<ellipse fill="none" stroke="#3C506D" stroke-width="2" stroke-miterlimit="10" cx="66.5" cy="61.2" rx="23.5" ry="53.2"/>
<path opacity="0.4" fill="#000000" enable-background="new    " d="M91.7,85.8H41c-7.2,0-13-5.8-13-13v-5.9c0-7.2,5.8-13,13-13h50.7
	c7.2,0,13,5.8,13,13v5.9C104.7,80,98.9,85.8,91.7,85.8z"/>
<g>
	<path fill="#FFFFFF" d="M96.8,79.4c-20.2,2.2-40.6,2.2-60.9,0c-7.2-0.9-13-7.8-13-14.8c0-1.9,0-3.9,0-5.8c0-7,5.8-13.8,13-14.8
		c20.2-2.2,40.6-2.2,60.9,0c7.2,0.9,13,7.8,13,14.8c0,1.9,0,3.9,0,5.8C109.7,71.7,103.9,78.5,96.8,79.4z"/>
	<path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M96.8,79.4c-20.2,2.2-40.6,2.2-60.9,0
		c-7.2-0.9-13-7.8-13-14.8c0-1.9,0-3.9,0-5.8c0-7,5.8-13.8,13-14.8c20.2-2.2,40.6-2.2,60.9,0c7.2,0.9,13,7.8,13,14.8
		c0,1.9,0,3.9,0,5.8C109.7,71.7,103.9,78.5,96.8,79.4z"/>
</g>
<g>
	<g>
		<path fill="#000000" d="M33,73c0-7.4,0-14.9,0-22.3c2.7-0.4,5.4-0.8,8.1-1.1c2.2-0.3,4.2,0,6,0.9s3.2,2.3,4.2,4.2s1.5,4.1,1.5,6.5
			c0,0.4,0,0.8,0,1.2c0,2.4-0.5,4.6-1.5,6.5s-2.4,3.3-4.1,4.2c-1.8,0.9-3.8,1.2-6,1C38.5,73.8,35.7,73.4,33,73z M39,54.3
			c0,5,0,10.1,0,15.1c0.7,0.1,1.4,0.1,2.1,0.2c1.7,0.1,3.1-0.4,4-1.6s1.4-3.1,1.4-5.6c0-0.4,0-0.7,0-1.1c0-2.5-0.5-4.3-1.4-5.5
			s-2.3-1.7-4.1-1.6C40.4,54.2,39.7,54.2,39,54.3z"/>
		<path fill="#000000" d="M77.2,75.3c-2,0.1-4.1,0.2-6.1,0.2c-3-5.6-6-11.4-9-17c0,5.7,0,11.4,0,17c-2,0-4.1-0.1-6.1-0.2c0-9,0-18,0-27
			c2-0.1,4.1-0.2,6.1-0.2c3,5.6,6,11.4,9,17c0-5.7,0-11.4,0-17c2,0,4.1,0.1,6.1,0.2C77.2,57.3,77.2,66.3,77.2,75.3z"/>
		<path fill="#000000" d="M94.2,67.5c0-0.8-0.3-1.5-0.9-1.9c-0.6-0.5-1.7-0.9-3.3-1.4c-1.6-0.5-2.9-1-3.9-1.5c-3.3-1.6-4.9-4-4.9-6.9
			c0-1.5,0.4-2.8,1.2-3.8c0.8-1.1,2-1.9,3.5-2.3c1.5-0.5,3.2-0.6,5-0.4c1.8,0.2,3.4,0.7,4.9,1.5c1.4,0.8,2.6,1.8,3.3,2.9
			c0.8,1.2,1.2,2.4,1.2,3.8c-2-0.1-4-0.2-6.1-0.3c0-1-0.3-1.8-0.9-2.3c-0.6-0.6-1.5-0.9-2.6-1s-1.9,0.1-2.6,0.5
			c-0.6,0.4-0.9,1-0.9,1.8c0,0.7,0.3,1.3,1,1.8c0.7,0.6,1.9,1.1,3.7,1.7c1.7,0.6,3.2,1.2,4.3,1.8c2.7,1.5,4.1,3.3,4.1,5.8
			c0,1.9-0.8,3.6-2.5,4.9c-1.7,1.4-3.9,2.3-6.8,2.6c-2,0.2-3.9,0.1-5.6-0.6c-1.7-0.6-2.9-1.6-3.8-2.9c-0.8-1.3-1.3-2.8-1.3-4.6
			c2,0,4.1-0.1,6.1-0.2c0,1.4,0.4,2.4,1.1,3s1.8,0.9,3.4,0.7c1-0.1,1.8-0.3,2.4-0.8C93.9,68.8,94.2,68.2,94.2,67.5z"/>
	</g>
</g>
</svg>
`,document:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="451.20001px" height="541.70001px" viewBox="0 0 451.20001 541.70001" enable-background="new 0 0 451.20001 541.70001"
	 xml:space="preserve">
<g id="Layer_2_1_" display="none">
</g>
<g id="Layer_3">
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="331.29999,487.29999 278.10001,493.60001 254.7,358.70001 
		276.10001,359.79999 413.5,440.89999 	"/>
	<polygon fill="#231F20" points="299.89999,257.60001 299.70001,482.29999 278.10001,493.60001 85.5,377.79999 85.5,80.7 
		106.8,66.6 237.7,145 	"/>
	<polygon fill="#CDD9EE" points="95.7,84.2 213.8,155.39999 226,148.39999 107.2,77.3 	"/>
	<polygon fill="#CDD9EE" points="276.10001,252.3 276.10001,480.5 95.8,372.20001 95.8,89.1 212.8,159 	"/>
	<polygon fill="#6885A9" points="281.20001,269.29999 280.20001,480.60001 292.39999,474.5 291.29999,263.20001 	"/>
	<polygon fill="#FFFFFF" points="95.7,84.2 133.3,106.8 156.5,106.9 118.6,84.3 	"/>
	<polygon fill="#FFFFFF" points="143.60001,113 159.60001,122.4 182.7,122.5 166.60001,113 	"/>
	<polygon fill="#8AA4C1" points="219.89999,159.7 279.70001,265.39999 290.60001,259 231.3,153.10001 	"/>
	<polygon fill="#294059" points="253.8,337.29999 118,255.89999 118,237.3 253.8,318.70001 	"/>
	<polygon fill="#294059" points="253.8,371.60001 118,290.20001 118,271.60001 253.8,353 	"/>
	<polygon fill="#294059" points="253.8,404.39999 118,323 118,304.39999 253.8,385.89999 	"/>
	<polygon fill="#294059" points="218.89999,417.29999 118,357.39999 118,338.79999 218.89999,398.70001 	"/>
</g>
<g id="Layer_6">
	<path fill="#231F20" d="M219.89999,159.7L211.2,157.3v75.59999c0,2.89999,1.60001,5.60001,4.10001,7l60.8,34.89999l3.60001-9.39999
		L219.89999,159.7z"/>
	<path fill="#CDD9EE" d="M273.5,265.39999L222.8,236c-2.2-1.3-3.60001-3.7-3.60001-6.3l-0.3-59.90001L273.5,265.39999z"/>
	<g id="Layer_4">
	</g>
</g>
<g id="Layer_1_1_" display="none">
	<g display="inline">
		<path fill="#6885A9" d="M846.90002,308.29999C847,309.19998,847,310.09998,847,311L846.90002,308.29999L846.90002,308.29999z"/>
		<path fill="#231F20" d="M849,311h-3.79999c0-0.79999,0-1.60001-0.09998-2.5l-0.29999-2.10001h4.09998L849,311L849,311z"/>
	</g>
	<g display="inline">
		<path fill="#6885A9" d="M846.90002,212.7C847,213.59999,847,214.5,847,215.39999L846.90002,212.7L846.90002,212.7z"/>
		<path fill="#231F20" d="M849,215.39999h-3.79999c0-0.8,0-1.60001-0.09998-2.5l-0.29999-2.10001h4.09998L849,215.39999
			L849,215.39999z"/>
	</g>
	<path display="inline" fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="
		M846.90002,308.29999C847,309.19998,847,310.09998,847,311L846.90002,308.29999L846.90002,308.29999z"/>
	<path display="inline" fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="
		M846.90002,212.7C847,213.59999,847,214.5,847,215.39999L846.90002,212.7L846.90002,212.7z"/>
	<g display="inline">
		<polygon opacity="0.4" enable-background="new    " points="274,525.29999 239.3,518.5 238.7,218.60001 516.29999,382.39999 		"/>
		<polygon fill="#CCD8EE" points="55.6,498.20001 54.9,498.20001 54.9,498.70001 		"/>
		<polygon fill="#231F20" points="54.4,499.60001 54.4,497.70001 57.5,497.70001 		"/>
		<polygon fill="#CCD8EE" points="55.6,410.29999 54.9,410.29999 54.9,410.70001 		"/>
		<polygon fill="#231F20" points="54.4,411.60001 54.4,409.79999 57.5,409.79999 		"/>
		<polygon fill="#CDD9EE" points="239.3,431.20001 56.9,321.60001 238.7,212.10001 421.70001,321.60001 		"/>
		<polygon fill="#CCD8EE" points="55.6,322.39999 54.9,322.39999 54.9,322.79999 		"/>
		<polygon fill="#B5C5DC" points="54.9,397.39999 239.3,508.20001 239.3,508.20001 239.3,433.70001 54.9,322.79999 		"/>
		<polygon fill="#6885A9" points="267,491.60001 239.3,508.20001 239.3,508.20001 239.3,433.70001 267,417 		"/>
		<path fill="#231F20" d="M46.7,318.10001v83v0.70001L239.3,517.60004l37.99998-22.79999V411L84.1,295.39999L46.7,318.10001z
			 M237.3,504.5L57,396.20001V326.5l180.3,108.29999V504.5z M56.9,321.60001L82.4,306l183,109.5l-26.10001,15.70001L56.9,321.60001z
			 M267.39999,489.29999l-26.10001,15.29999v-69.70001l26.10001-15.29999V489.29999z"/>
	</g>
</g>
<g id="Layer_5">
</g>
</svg>
`,firewall:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="578.5px" height="549.3px" viewBox="0 0 578.5 549.3" enable-background="new 0 0 578.5 549.3" xml:space="preserve">
<g>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="395.6,519.9 331.9,525.6 261.4,235.8 562.9,417 	"/>
	<g>
		<polygon fill="#FFFFFF" points="86.1,378.5 86.4,63.1 185.3,5.8 430.6,148 430.6,463.1 331.4,520.6 		"/>
		<path fill="#231F20" d="M185.3,11.6L425.6,151v309.3l-94.2,54.6L91.1,375.7L91.4,66L185.3,11.6 M185.3,0l-5,2.9l-94,54.4l-5,2.9
			V66L81,375.7v5.8l5,2.9l240.3,139.2l5,2.9l5-2.9l94.2-54.6l5-2.9v-5.8V150.9v-5.8l-5-2.9L190.3,2.9L185.3,0L185.3,0z"/>
	</g>
	<g>
		<polygon fill="#7F1A0A" points="137.5,246.4 99.2,224.3 91.4,228.8 129.6,250.9 129.6,317.2 137.5,312.7 		"/>
		<polygon fill="#7F1A0A" points="150.2,253.7 142.4,258.2 230.8,309.3 230.8,375.6 238.6,371.1 238.6,304.8 		"/>
		<polygon fill="#7F1A0A" points="251.4,312.1 243.5,316.6 331.9,367.7 331.9,434 339.8,429.5 339.8,363.2 		"/>
	</g>
	<polygon fill="#7F1A0A" points="98.9,142.2 91.1,146.7 179.5,197.8 179.5,264.1 187.3,259.6 187.3,193.3 	"/>
	<polygon fill="#7F1A0A" points="200.9,201.1 193.1,205.6 281.5,256.7 281.5,323 289.3,318.5 289.3,252.2 	"/>
	<polygon fill="#7F1A0A" points="303.5,260.4 295.7,264.9 330.9,286.3 330.9,352.6 338.8,348.1 338.8,281.8 	"/>
	<polygon fill="#7F1A0A" points="98.9,304.9 91.1,309.4 179.5,360.4 179.5,426.7 187.3,422.2 187.3,356 	"/>
	<polygon fill="#7F1A0A" points="200.9,363.8 193.1,368.3 281.5,419.3 281.5,485.6 289.3,481.1 289.3,414.8 	"/>
	<polygon fill="#7F1A0A" points="303.5,423 295.7,427.5 330.9,447.2 330.9,513.5 338.8,509 338.8,442.7 	"/>
	<polygon fill="#7F1A0A" points="137.5,83.8 99.2,61.7 91.4,66.2 129.6,88.3 129.6,154.5 137.5,150.1 	"/>
	<g>
		<polygon fill="#F34139" points="129.6,154.5 91.4,132.5 91.4,66.2 129.6,88.3 		"/>
		<polygon fill="#F34139" points="179.5,264.1 91.1,213 91.1,146.7 179.5,197.8 		"/>
		<polygon fill="#F34139" points="281.5,323 193.1,271.9 193.1,205.6 281.5,256.7 		"/>
		<polygon fill="#F34139" points="330.9,352.6 295.7,331.2 295.7,264.9 330.9,286.3 		"/>
		<polygon fill="#F34139" points="179.5,426.7 91.1,375.7 91.1,309.4 179.5,360.4 		"/>
		<polygon fill="#F34139" points="281.5,485.6 193.1,434.6 193.1,368.3 281.5,419.3 		"/>
		<polygon fill="#F34139" points="330.9,513.5 295.7,493.8 295.7,427.5 330.9,447.2 		"/>
		<polygon fill="#F34139" points="331.9,271.4 243.5,220.3 243.5,154 331.9,205.1 		"/>
		<polygon fill="#F34139" points="129.6,317.2 91.4,295.1 91.4,228.8 129.6,250.9 		"/>
		<polygon fill="#F34139" points="230.8,375.6 142.4,324.5 142.4,258.2 230.8,309.3 		"/>
		<polygon fill="#F34139" points="331.9,434 243.5,382.9 243.5,316.6 331.9,367.7 		"/>
		<polygon fill="#F34139" points="230.8,212.9 142.4,161.9 142.4,95.6 230.8,146.7 		"/>
	</g>
	<polygon fill="#7F1A0A" points="150.2,91.1 142.4,95.6 230.8,146.7 230.8,212.9 238.6,208.5 238.6,142.2 	"/>
	<polygon fill="#7F1A0A" points="251.4,149.5 243.5,154 331.9,205.1 331.9,271.4 339.8,266.9 339.8,200.6 	"/>
	<polygon fill="#F77F7F" points="129.6,88.3 223.8,33.6 185.3,11.6 91.4,66 	"/>
	<polygon fill="#F77F7F" points="142.4,95.6 236.6,41 325,92 230.8,146.7 	"/>
	<polygon fill="#F77F7F" points="243.5,154 337.7,99.4 426.1,150.4 331.9,205.1 	"/>
	<polygon fill="#7F1A0A" points="331.4,270.9 425.6,216.3 425.6,150 331.4,204.6 	"/>
	<polygon fill="#7F1A0A" points="331.4,351.3 425.6,296.6 425.6,230.3 331.4,285 	"/>
	<polygon fill="#7F1A0A" points="331.4,433.8 425.6,379.1 425.6,312.8 331.4,367.5 	"/>
	<polygon fill="#7F1A0A" points="331.4,513.9 425.6,459.3 425.6,393 331.4,447.6 	"/>
	<polygon fill="#7F1A0A" points="426.1,150.4 426.1,158.1 331.9,212.7 331.9,205.1 	"/>
	<polygon fill="#7F1A0A" points="223.7,33.7 223.7,41 129.6,95.6 129.6,88.3 	"/>
	<polygon fill="#7F1A0A" points="230.8,146.7 230.8,154 325,99.4 325,92.1 	"/>
	<polygon fill="#6B0C03" points="425.6,224.5 326.4,281.7 331.4,285 425.6,230.3 	"/>
	<polygon fill="#6B0C03" points="425.6,307.3 326.4,364.5 331.4,367.8 425.6,313.2 	"/>
	<polygon fill="#6B0C03" points="425.6,387.1 326.4,444.3 331.4,447.6 425.6,393 	"/>
	<path opacity="0.59" fill="#231F20" enable-background="new    " d="M213.7,512l51.8,3.2l27.8-16.1c0-36.6,0-60.3,0-96.9
		c0-7.9,0-18.9-5.7-28.5c-6.5-11-9.3-11.7-16.8-16.1c-28.6-16.7-75.2-43.4-103.7-60c-2.9,5-5.8,5.1-8.7,10.1L213.7,512z"/>
	<g id="Layer_2_1_">
		<g>
			<path fill="#FF9600" d="M257.5,378.4v96.8c0,4.9-1.6,8.4-4.2,10l-36.4,21c2.5-1.6,4.1-5.1,4.1-10v-96.8c0-9.2-5.6-20-12.5-24
				l-82.4-47.6c-2.7-1.6-5.3-1.9-7.3-1.1l0,0l34.8-20.1c2.3-1.8,5.5-2,9,0.1l82.4,47.6c3.3,1.9,6.2,5.3,8.5,9.3
				C255.9,368.2,257.5,373.5,257.5,378.4z"/>
		</g>
		<g>
			<path fill="#FFD44D" d="M221,446v-46.6c0-9.2-5.6-20-12.5-24l-82.4-47.6c-2.7-1.6-5.3-1.9-7.3-1.1l0,0l34.8-20.1
				c2.3-1.8,5.5-2,9,0.1l82.4,47.6c3.3,1.9,6.2,5.3,8.5,9.3C251.8,395,239.9,423.5,221,446z"/>
		</g>
		<g>
			<g>
				<path fill="#FFFFFF" d="M223.4,374.6c-0.2,0-0.4,0-0.6,0h-0.1h-0.9l0,0c-3.5-0.2-6.9-1.2-9.6-2.8c-3.7-2.1-5.6-5.1-5-8v-36.3
					c0-20.2-12.3-43.6-27.4-52.4c-3.7-2.1-7.2-3.2-10.6-3.2c-0.2,0-0.5,0-0.7,0c-2.7,4.1-4.1,9.9-4.1,16.8v36.4
					c0.2,2.4-1.1,4.5-3.7,6c-0.4,0.3-0.9,0.5-1.4,0.7c-0.3,0.1-0.7,0.3-1,0.4s-0.7,0.2-1.1,0.3c-0.5,0.1-1.1,0.3-1.7,0.4h-0.1
					c-0.3,0-0.6,0.1-0.9,0.1h-0.2c-0.3,0-0.6,0.1-0.8,0.1h-0.2c-0.3,0-0.5,0-0.8,0H152c-0.2,0-0.4,0-0.6,0v-0.9v0.9h-0.1h-0.9l0,0
					c-3.5-0.2-6.9-1.2-9.6-2.8c-3.6-2.1-5.5-5-5.1-7.9v-37.5c0-10.5,2.1-19.7,6.1-26.5c0.1-0.2,1.6-3.5,5.1-7.3l0.3-0.3
					c0.3-0.3,0.6-0.6,0.9-0.9c0.3-0.3,0.6-0.6,0.9-0.9c0.3-0.3,0.6-0.6,1-0.9c0.3-0.3,0.7-0.6,1-0.9c0.2-0.1,0.3-0.3,0.5-0.4
					c0,0,0.2-0.1,0.2-0.2v-0.5h0.6c0.1-0.1,0.4-0.3,0.4-0.3c0.2-0.1,0.3-0.2,0.5-0.4c0.2-0.1,0.4-0.3,0.6-0.4
					c0.2-0.1,0.4-0.3,0.6-0.4c0,0,0.5-0.3,0.7-0.4l0.3-0.2c0.5-0.3,1-0.6,1.5-0.8c0.1-0.1,0.3-0.2,0.4-0.2c0.1-0.1,0.2-0.1,0.4-0.2
					c0.3-0.1,0.6-0.3,0.9-0.4c0.2-0.1,0.3-0.1,0.5-0.2c0.1,0,0.2-0.1,0.3-0.1c0.1-0.1,0.3-0.1,0.5-0.2c0.2-0.1,0.5-0.2,0.7-0.3
					s0.5-0.2,0.7-0.3h0.1c0.3-0.1,0.5-0.2,0.7-0.3c0.3-0.1,0.5-0.2,0.8-0.3h0.1c0.2-0.1,0.5-0.1,0.7-0.2c0.2-0.1,0.5-0.1,0.7-0.2
					l0.3-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0.2-0.1,0.5-0.1,0.7-0.2c0,0,0.1,0,0.2,0c0.3-0.1,0.5-0.1,0.8-0.2c0.3-0.1,0.6-0.1,0.9-0.1
					c1.9-0.5,3.8-0.7,5.8-0.7c1.3,0,2.5,0.1,3.8,0.3c4.5,0.6,9.2,2.3,14,5.1c24.3,14.1,44.2,51.9,44.2,84.3v39.4l-0.1-0.1
					c-0.4,1.7-1.6,3.2-3.6,4.4c-0.4,0.3-0.9,0.5-1.4,0.7c-0.4,0.1-0.7,0.3-1,0.4s-0.7,0.2-1.1,0.3c-0.5,0.1-1.1,0.3-1.7,0.4h-0.1
					c-0.3,0-0.6,0.1-0.9,0.1h-0.2c-0.3,0-0.6,0.1-0.8,0.1h-0.2c-0.3,0-0.6,0-0.9,0L223.4,374.6z"/>
			</g>
			<g>
				<path fill="#231F20" d="M173.9,240.2c1.2,0,2.4,0.1,3.7,0.3c4.3,0.6,8.9,2.2,13.6,5c24.1,13.9,43.7,51.3,43.7,83.5v37.7l0,0
					c0.2,1.9-0.9,3.8-3.3,5.2c-0.4,0.2-0.9,0.5-1.3,0.6c-0.3,0.1-0.6,0.2-1,0.4c-0.3,0.1-0.7,0.2-1,0.3c-0.5,0.1-1,0.2-1.6,0.3l0,0
					c-0.3,0.1-0.6,0.1-1,0.1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.5,0.1-0.8,0.1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.5,0-0.8,0c-0.1,0-0.1,0-0.2,0
					c-0.1,0-0.2,0-0.3,0c-0.2,0-0.4,0-0.6,0l0,0l0,0l0,0l0,0c-3.5-0.1-7.2-1-10-2.7c-3.5-2-5.1-4.7-4.6-7.1v-36.3
					c0-20.5-12.5-44.3-27.8-53.2c-3.9-2.3-7.7-3.3-11-3.3c-0.4,0-0.8,0-1.2,0l0,0l0,0c-2.9,4.2-4.5,10.2-4.5,17.7v36.5
					c0.2,1.9-0.9,3.8-3.3,5.1c-0.4,0.2-0.9,0.5-1.3,0.6c-0.3,0.1-0.6,0.2-1,0.4c-0.3,0.1-0.7,0.2-1,0.3c-0.5,0.1-1,0.2-1.6,0.3l0,0
					c-0.3,0.1-0.6,0.1-1,0.1c-0.1,0-0.1,0-0.2,0c-0.3,0-0.5,0.1-0.8,0.1c-0.1,0-0.2,0-0.2,0c-0.3,0-0.5,0-0.8,0c-0.1,0-0.2,0-0.3,0
					s-0.1,0-0.2,0c-0.2,0-0.4,0-0.6,0l0,0l0,0c0,0,0,0-0.1,0l0,0c-3.5-0.1-7.1-1-10-2.7c-3.4-2-5-4.6-4.6-7v-37.6
					c0-10.8,2.2-19.6,6-26.1l0,0c0,0,1.5-3.3,5-7c0.1-0.1,0.2-0.2,0.3-0.3c0.3-0.3,0.6-0.6,0.9-0.9c0.3-0.3,0.6-0.6,0.9-0.8
					c0.3-0.3,0.6-0.6,0.9-0.8c0.3-0.3,0.7-0.6,1-0.8c0.2-0.1,0.4-0.3,0.5-0.4c0.2-0.1,0.4-0.3,0.5-0.4l0,0c0.2-0.1,0.3-0.2,0.5-0.4
					l0.1-0.1c0.2-0.1,0.3-0.2,0.5-0.4c0.2-0.1,0.4-0.3,0.6-0.4c0.2-0.1,0.4-0.3,0.6-0.4c0.2-0.1,0.4-0.3,0.6-0.4
					c0.1,0,0.2-0.1,0.3-0.1c0.5-0.3,1-0.6,1.5-0.8c0.1-0.1,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.1,0.3-0.2c0.3-0.1,0.6-0.3,0.9-0.4
					c0.2-0.1,0.3-0.1,0.5-0.2c0.1,0,0.2-0.1,0.3-0.1c0.2-0.1,0.3-0.1,0.5-0.2c0.2-0.1,0.5-0.2,0.7-0.3s0.5-0.2,0.7-0.3l0,0
					c0.2-0.1,0.5-0.2,0.7-0.3l0,0c0.2-0.1,0.5-0.2,0.8-0.2c0,0,0,0,0.1,0c0.2-0.1,0.5-0.1,0.7-0.2c0.2-0.1,0.5-0.1,0.7-0.2
					c0.1,0,0.2,0,0.3-0.1c0.2-0.1,0.4-0.1,0.6-0.1c0.2-0.1,0.5-0.1,0.7-0.2c0.1,0,0.1,0,0.2,0c0.3-0.1,0.5-0.1,0.8-0.2
					c0.3-0.1,0.6-0.1,0.9-0.1C170.1,240.4,172,240.2,173.9,240.2 M173.9,238.3L173.9,238.3c-2.1,0-4.1,0.2-6,0.7
					c-0.3,0-0.6,0.1-0.8,0.1c-0.3,0-0.5,0.1-0.8,0.2c-0.1,0-0.1,0-0.2,0c-0.2,0.1-0.5,0.1-0.7,0.2c-0.2,0.1-0.4,0.1-0.7,0.2
					l-0.2,0.1h-0.1c-0.3,0.1-0.5,0.1-0.8,0.2c-0.2,0.1-0.5,0.1-0.7,0.2h-0.1l0,0l0,0c-0.3,0.1-0.5,0.2-0.8,0.3l0,0l0,0
					c-0.2,0.1-0.5,0.2-0.7,0.3h-0.1c-0.2,0.1-0.5,0.2-0.7,0.3c-0.3,0.1-0.5,0.2-0.8,0.3c-0.2,0.1-0.3,0.1-0.5,0.2
					c-0.1,0-0.2,0.1-0.3,0.1c-0.2,0.1-0.3,0.1-0.5,0.2c-0.3,0.1-0.6,0.3-0.9,0.4c-0.1,0.1-0.2,0.1-0.4,0.2c-0.2,0.1-0.3,0.2-0.5,0.2
					c-0.5,0.3-1.1,0.6-1.6,0.9l-0.1,0.1l-0.1,0.1l0,0l0,0c-0.2,0.1-0.4,0.2-0.6,0.3h-0.1l0,0l0,0c-0.2,0.1-0.4,0.3-0.6,0.4
					c-0.2,0.1-0.4,0.3-0.6,0.4c-0.2,0.1-0.4,0.2-0.5,0.4l-0.1,0.1l0,0l0,0H151v1c-0.1,0.1-0.3,0.2-0.4,0.3c-0.4,0.3-0.7,0.6-1.1,0.9
					c-0.4,0.3-0.7,0.6-1,0.9c-0.3,0.3-0.6,0.6-0.9,0.9c-0.3,0.3-0.6,0.6-0.9,1c-0.1,0.1-0.2,0.2-0.3,0.4c-3.4,3.7-5,7-5.3,7.5
					c-4.1,6.9-6.2,16.2-6.2,26.9v37.4c-0.5,3.2,1.6,6.5,5.5,8.8c2.6,1.5,5.8,2.5,9.1,2.8v0.1l1.8,0.1h0.1l0,0l0,0c0.2,0,0.4,0,0.6,0
					h0.2c0.1,0,0.2,0,0.3,0c0.3,0,0.6,0,0.8,0h0.1c0.1,0,0.1,0,0.2,0c0.3,0,0.6,0,0.9-0.1h0.1h0.1c0.3,0,0.6-0.1,0.9-0.1l0,0h0.2
					c0.6-0.1,1.2-0.2,1.8-0.4c0.4-0.1,0.8-0.2,1.1-0.3c0.4-0.1,0.7-0.3,1.1-0.4c0.6-0.2,1.1-0.5,1.5-0.8c2.9-1.7,4.4-4.2,4.2-6.9
					V289c0-6.4,1.3-11.9,3.7-15.8c0.1,0,0.1,0,0.2,0c3.2,0,6.5,1,10.1,3.1c14.8,8.6,26.9,31.7,26.9,51.5V364
					c-0.6,3.3,1.5,6.6,5.5,8.9c2.6,1.5,5.8,2.5,9.1,2.8v0.1l1.8,0.1h0.1l0,0c0.2,0,0.4,0,0.6,0c0.1,0,0.2,0,0.3,0s0.1,0,0.2,0
					c0.3,0,0.6,0,0.9,0h0.1h0.1c0.3,0,0.6,0,0.9-0.1h0.1h0.1c0.3,0,0.6-0.1,0.9-0.1l0,0l0,0l0,0h0.1c0.6-0.1,1.2-0.2,1.8-0.4
					c0.4-0.1,0.7-0.2,1.1-0.3c0.4-0.1,0.7-0.2,1.1-0.4c0.6-0.2,1.1-0.5,1.5-0.8c1.7-1,3-2.3,3.6-3.8l0.6,0.4V367v-37.7
					c0-15.9-4.6-33.4-13-49.4c-8.4-16.1-19.6-28.7-31.6-35.7c-4.9-2.8-9.7-4.6-14.3-5.2C176.5,238.4,175.2,238.3,173.9,238.3
					L173.9,238.3z"/>
			</g>
		</g>
		<g>
			<g>
				<path fill="#D1D3D4" d="M168,271.1L168,271.1L168,271.1c-2.9,4.2-4.5,10.2-4.5,17.7v36.5c0.2,1.9-0.9,3.8-3.3,5.1
					c-0.4,0.2-0.9,0.5-1.3,0.6c-0.3,0.1-0.6,0.2-1,0.4c-0.3,0.1-0.7,0.2-1,0.3c-0.5,0.1-1,0.2-1.6,0.3l0,0c-1.3,0.2-2.7,0.3-4.1,0.3
					v-34.8c0-7.5,1.7-13.5,4.5-17.7C157.5,276.6,163.4,271.7,168,271.1C167.9,271.1,167.9,271.1,168,271.1z"/>
			</g>
			<g>
				<path fill="#D1D3D4" d="M234.9,328.9c0-32.2-19.6-69.5-43.7-83.5c-4.8-2.7-9.3-4.4-13.6-5c-3.3-0.5-6.4-0.3-9.3,0.4
					c-10,1.6-16.7,6.7-20.7,11.1c2.5-1.1,5.3-1.9,8.5-2.4c2.9-0.7,6-0.9,9.3-0.4c4.3,0.6,8.9,2.2,13.6,5
					c24.1,13.9,43.7,51.3,43.7,83.5v36.1c3.3,0.1,6.6-0.5,9-1.9s3.4-3.2,3.3-5.2l0,0L234.9,328.9L234.9,328.9z"/>
			</g>
		</g>
		<g>
			<path fill="#231F20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M174.1,240.2
				c1.2,0,2.4,0.1,3.7,0.3c0.7,0.1,1.4,0.2,2.1,0.4c2.9,0.6,5.8,1.7,8.9,3.2c0.9,0.4,1.8,0.9,2.7,1.4c15,8.6,28.1,26.3,36,46.1
				c0.2,0.6,0.5,1.2,0.7,1.8c0.1,0.2,0.1,0.3,0.2,0.5c4.3,11.5,6.8,23.6,6.8,35l0,0v19.7l10,5.8c3.3,1.9,6.2,5.3,8.5,9.3
				c2.5,4.5,4.1,9.8,4.1,14.7v96.8c0,4.9-1.6,8.4-4.2,10l-36.4,21c-1,0.7-2.2,1-3.5,1c-1.5,0-3.2-0.5-5-1.5l-82.4-47.6
				c-6.9-4-12.5-14.7-12.5-24v-7.8v-89.1c0-5.6,2.1-9.3,5.2-10.6l0,0l0,0l17.8-10.3v-31.5c0-10.8,2.2-19.6,6-26.1l0,0
				c0,0,1.5-3.3,5-7c0.1-0.1,0.2-0.2,0.3-0.3s0.2-0.2,0.2-0.2c0.2-0.2,0.3-0.4,0.5-0.5c0.1-0.1,0.1-0.1,0.1-0.2
				c0.1-0.1,0.1-0.1,0.2-0.2c0.1-0.1,0.3-0.3,0.5-0.4c0.1-0.1,0.2-0.2,0.2-0.2c0.1-0.1,0.3-0.3,0.4-0.4l0.1-0.1
				c0.1-0.1,0.3-0.2,0.4-0.4c0.1-0.1,0.1-0.1,0.2-0.2c0.2-0.2,0.4-0.3,0.6-0.5c0.1-0.1,0.1-0.1,0.2-0.2c0.1-0.1,0.2-0.2,0.4-0.3
				c0.1-0.1,0.2-0.2,0.3-0.3s0.2-0.2,0.4-0.3l0,0c0.2-0.1,0.3-0.2,0.5-0.4l0,0c0,0,0.1,0,0.1-0.1l0,0c0.2-0.1,0.3-0.2,0.5-0.4
				c0.2-0.1,0.3-0.2,0.5-0.3c0.1,0,0.1-0.1,0.2-0.1c0.2-0.1,0.3-0.2,0.5-0.3s0.4-0.2,0.6-0.3l0.1-0.1c0.1,0,0.1-0.1,0.2-0.1
				c0.3-0.2,0.6-0.4,0.9-0.5c0.1-0.1,0.2-0.1,0.3-0.1s0.2-0.1,0.3-0.1c0.1-0.1,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.1,0.3-0.2h0.1
				c0.1,0,0.2-0.1,0.2-0.1c0.2-0.1,0.4-0.2,0.6-0.3c0.2-0.1,0.3-0.1,0.5-0.2c0.1,0,0.1-0.1,0.2-0.1h0.1c0.2-0.1,0.3-0.1,0.5-0.2
				c0.2-0.1,0.5-0.2,0.7-0.3c0.1,0,0.2-0.1,0.2-0.1s0.1,0,0.1-0.1c0.1,0,0.2-0.1,0.3-0.1l0,0c0.2-0.1,0.5-0.2,0.7-0.3l0,0
				c0.1,0,0.2-0.1,0.3-0.1h0.1c0.1,0,0.2-0.1,0.3-0.1c0,0,0,0,0.1,0c0.2-0.1,0.5-0.1,0.7-0.2c0.2-0.1,0.4-0.1,0.6-0.2l0,0
				c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.3-0.1c0.2-0.1,0.4-0.1,0.6-0.1c0.2-0.1,0.5-0.1,0.7-0.2c0.1,0,0.1,0,0.2,0
				c0.3-0.1,0.5-0.1,0.8-0.2c0.3-0.1,0.6-0.1,0.9-0.1C170.3,240.4,172.1,240.2,174.1,240.2 M168.2,271.1L168.2,271.1L168.2,271.1
				c-2.9,4.2-4.5,10.2-4.5,17.7v18.6l44.7,25.8v-5.6c0-20.5-12.5-44.3-27.8-53.2c-3.9-2.3-7.7-3.3-11-3.3
				C169,271,168.6,271,168.2,271.1 M174.1,235.4c-2.3,0-4.5,0.3-6.6,0.8c-0.3,0-0.5,0.1-0.8,0.1c-0.3,0.1-0.6,0.1-0.8,0.2
				c-0.1,0-0.2,0-0.3,0.1c-0.3,0.1-0.5,0.1-0.8,0.2c-0.2,0.1-0.5,0.1-0.7,0.2l-0.3,0.1c0,0,0,0-0.1,0h-0.1l0,0l0,0h-0.1
				c-0.2,0-0.4,0.1-0.5,0.1c-0.2,0.1-0.5,0.1-0.8,0.2h-0.1c-0.1,0-0.2,0.1-0.3,0.1h-0.1l-0.2,0.1h-0.1c-0.1,0-0.2,0.1-0.3,0.1l0,0
				c-0.3,0.1-0.5,0.2-0.8,0.3c0,0-0.1,0-0.1,0.1c-0.1,0-0.2,0.1-0.2,0.1h-0.1l-0.2,0.1l0,0c-0.1,0-0.2,0.1-0.2,0.1
				c-0.3,0.1-0.5,0.2-0.8,0.3c-0.2,0.1-0.4,0.1-0.5,0.2l0,0l0,0c-0.1,0-0.2,0.1-0.3,0.1c-0.2,0.1-0.3,0.2-0.5,0.2
				c-0.2,0.1-0.3,0.2-0.5,0.2l-0.1,0.1h-0.1c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0-0.1,0.1c-0.1,0.1-0.3,0.1-0.4,0.2
				c-0.2,0.1-0.3,0.2-0.5,0.2c-0.1,0-0.2,0.1-0.2,0.1h-0.1h-0.1c-0.1,0-0.2,0.1-0.3,0.1c-0.4,0.2-0.8,0.4-1.1,0.6
				c-0.1,0-0.1,0.1-0.2,0.1h-0.1l-0.1,0.1l0,0c-0.2,0.1-0.4,0.2-0.6,0.4c0,0,0,0-0.1,0c-0.2,0.1-0.4,0.2-0.6,0.4l-0.2,0.2
				c-0.2,0.1-0.4,0.2-0.5,0.4c-0.2,0.1-0.4,0.3-0.6,0.4l0,0c0,0,0,0-0.1,0c0,0,0,0-0.1,0l0,0l0,0c-0.2,0.1-0.3,0.2-0.5,0.4l0,0
				c-0.1,0.1-0.2,0.2-0.3,0.2l-0.1,0.1c-0.1,0.1-0.3,0.2-0.4,0.3h-0.1c-0.1,0.1-0.2,0.2-0.4,0.3c-0.1,0.1-0.1,0.1-0.2,0.2l0,0l0,0
				c-0.2,0.2-0.4,0.4-0.7,0.6l0,0c-0.1,0.1-0.2,0.1-0.2,0.2c-0.1,0.1-0.3,0.3-0.4,0.4l0,0h-0.1l0,0c-0.2,0.1-0.3,0.3-0.5,0.4l0,0
				c-0.1,0.1-0.1,0.1-0.2,0.2l-0.1,0.1c-0.2,0.2-0.3,0.3-0.5,0.5l0,0c-0.1,0.1-0.1,0.1-0.2,0.2c0,0-0.1,0.1-0.2,0.2l0,0l0,0
				c-0.2,0.2-0.4,0.4-0.6,0.6l0,0c-0.1,0.1-0.1,0.1-0.2,0.2l0,0l0,0c-0.1,0.1-0.2,0.2-0.3,0.3c-3.5,3.8-5.2,7.1-5.7,8
				c-4.3,7.4-6.6,17.1-6.6,28.3v28.7l-15.2,8.8c-4.9,2.1-7.8,7.6-7.8,14.8V426v7.8c0,10.9,6.6,23.2,14.9,28.1l82.4,47.6
				c2.5,1.4,4.9,2.1,7.3,2.1c2.1,0,4.2-0.6,6-1.7l36.3-21l0.1-0.1c4.1-2.6,6.4-7.6,6.4-14.1v-96.8c0-5.5-1.7-11.6-4.7-17
				c-2.7-4.9-6.4-8.9-10.3-11.1l-7.7-4.4v-17c0-11.6-2.4-24.3-7.1-36.7l-0.1-0.2c0-0.1-0.1-0.3-0.1-0.4c-0.2-0.6-0.5-1.2-0.7-1.9
				c-4.1-10.3-9.6-20.1-16-28.4c-6.7-8.7-14.3-15.6-22-20.1c-1-0.6-2-1.1-2.9-1.6c-3.4-1.7-6.7-2.9-10-3.6c-0.8-0.2-1.6-0.3-2.4-0.4
				C177,235.5,175.5,235.4,174.1,235.4L174.1,235.4z M168.4,304.6v-15.8c0-5.1,0.9-9.5,2.5-12.9c2.2,0.3,4.7,1.1,7.2,2.6
				c13.1,7.6,24.3,28.3,25.4,46.4L168.4,304.6L168.4,304.6z"/>
		</g>
		<g>
			<path fill="#FFBC00" d="M221,399.4v96.8c0,9.2-5.6,13.5-12.5,9.5L165.7,481l-26.5-15.3l-12.3-7.1l-0.8-0.5
				c-6.9-4-12.5-14.7-12.5-24v-96.8c0-9.2,5.6-13.5,12.5-9.5l25.5,14.7l44.5,25.7l12.3,7.1l0,0C215.4,379.5,221,390.2,221,399.4z"/>
		</g>
		<path fill="#FFD44D" d="M196.1,368.3l-69.2,90.3l-0.8-0.5c-6.9-4-12.5-14.7-12.5-24v-41.9l38.1-49.6L196.1,368.3z"/>
		<path fill="#FFD44D" d="M221,399.4v9.5L165.7,481l-26.5-15.3l69.2-90.3C215.4,379.5,221,390.2,221,399.4z"/>
		<g>
			<path fill="#231F20" d="M213.5,508.2c-1.7,0-3.6-0.5-5.5-1.6L125.6,459c-7.2-4.1-13-15.3-13-24.8v-96.8c0-7.2,3.3-11.9,8.5-11.9
				c1.7,0,3.6,0.5,5.5,1.6l82.4,47.6c7.2,4.1,13,15.3,13,24.8v96.8C222,503.5,218.6,508.2,213.5,508.2z M121.1,327.3
				c-4,0-6.6,3.9-6.6,10v96.8c0,8.9,5.4,19.3,12.1,23.1l82.4,47.6c1.6,0.9,3.1,1.4,4.5,1.4c4,0,6.6-3.9,6.6-10v-96.8
				c0-8.9-5.4-19.3-12.1-23.1l-82.4-47.6C124,327.8,122.5,327.3,121.1,327.3z"/>
		</g>
		<g>
			<g>
				<path fill="#FF9600" d="M184,404.8c0,7.7-3,12.8-7.6,14v25.3c0,1.4-0.2,2.6-0.5,3.7c-1.2,3.7-4.4,5-8.1,2.8
					c-4.8-2.7-8.6-10.1-8.6-16.5v-25.3c-4.6-6.5-7.6-15-7.6-22.8c0-11.8,7.1-17.4,16-12.4c0.1,0,0.2,0.1,0.3,0.1
					C176.7,379,184,392.9,184,404.8z"/>
			</g>
			<g>
				<path fill="#231F20" d="M171.2,452.6c-1.3,0-2.6-0.4-3.9-1.2c-5-2.9-9.1-10.6-9.1-17.3v-25c-4.8-6.9-7.6-15.5-7.6-23.1
					c0-4.5,1-8.3,2.9-11s4.6-4.2,7.8-4.2c2.1,0,4.4,0.6,6.7,1.9c0.1,0,0.2,0.1,0.3,0.2c9.2,5.3,16.7,19.6,16.7,31.9
					c0,7.6-2.8,13-7.6,14.7v24.6c0,1.5-0.2,2.8-0.6,4C175.8,450.9,173.8,452.6,171.2,452.6z M161.3,372.8c-2.5,0-4.7,1.2-6.3,3.4
					c-1.7,2.4-2.6,5.8-2.6,9.9c0,7.3,2.8,15.6,7.5,22.2l0.2,0.2v25.6c0,6,3.6,13,8.1,15.6c1,0.6,2,0.9,2.9,0.9
					c1.7,0,3.1-1.1,3.8-3.2c0.3-1,0.5-2.1,0.5-3.4v-26l0.7-0.2c4.3-1.1,6.9-6,6.9-13c0-11.6-7.1-25.2-15.8-30.2
					c-0.1,0-0.2-0.1-0.2-0.1C165,373.4,163.1,372.8,161.3,372.8z"/>
			</g>
		</g>
		<g>
			<path fill="#231F20" d="M184,404.8c0,7.7-3,12.8-7.6,14v25.3c0,1.4-0.2,2.6-0.5,3.7c-3.1-3.5-5.3-8.9-5.3-13.6v-25.3
				c-4.6-6.5-7.6-15-7.6-22.8c0-5.9,1.7-10.2,4.6-12.4c0.1,0,0.2,0.1,0.3,0.1C176.7,379,184,392.9,184,404.8z"/>
		</g>
	</g>
</g>
</svg>
`,"function-module":`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="183.1px" height="136.6px" viewBox="0 0 183.1 136.6" enable-background="new 0 0 183.1 136.6" xml:space="preserve">
<g id="Layer_8">
	<g id="Layer_1_1_">
		<g id="Layer_3">
		</g>
		<g id="Layer_6">
		</g>
		<g id="Layer_7">
			<polygon opacity="0.4" fill="#000000" enable-background="new    " points="119.4,75.7 124.8,75.7 128.3,68.4 143.5,66.9 146.8,56.5 138.6,39.8 
				88.2,40.5 			"/>
		</g>
		<path fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M116.2,43.3c-4.1-2.1-10.1-2-13.4,0.2
			c-2.6,1.7-2.8,4.2-0.7,6.2c3.3-2.1,9.3-2.2,13.3-0.1c0.9,0.4,1.6,0.9,2.1,1.5l0.1-0.1C120.9,48.8,120.3,45.3,116.2,43.3z"/>
		<g>
			<g>
				<path fill="#90A6BF" d="M139.2,62.9l-2.1,1.4l-11.4-2.9c-1.3,0.4-2.7,0.8-4,1.1L119,69l-9.6,0.1l-5-6.5c-1.5-0.2-3-0.6-4.4-0.9
					L89.7,65l-3.9-1.9l0,0l-3.7-1.8l0.4,6.6l7.5,3.8l10.2-3.3c1.5,0.4,2.9,0.7,4.4,0.9l5,6.5l9.6-0.1l2.6-6.6c1.4-0.3,2.7-0.7,4-1.1
					l11.4,2.9l6.1-4l-0.4-6.6L139.2,62.9L139.2,62.9z"/>
			</g>
		</g>
		<path fill="#6D84A5" stroke="#000000" stroke-miterlimit="10" d="M100,61.8C100,61.8,99.9,61.8,100,61.8L89.7,65h-0.1l0.4,6.6h0.1
			l10.2-3.3l0,0L100,61.8z"/>
		<g>
			<g>
				<polygon fill="#6D84A5" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="71.4,45.1 71.7,51.7 
					72.7,57.2 83.7,59.1 86.4,55 84.2,52.6 72.4,50.6 				"/>
			</g>
		</g>
		<g>
			<g>
				<path fill="#6D84A5" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M82.4,42.7c0.3-0.8,0.8-1.7,1.3-2.5
					l-6.5-6.1l0.4,6.6l2.6,2.4L82.4,42.7z"/>
			</g>
		</g>
		<g>
			<g>
				<polygon fill="#6D84A5" stroke="#000000" stroke-miterlimit="10" points="149,49.3 149.3,56 140.5,57.9 136.6,54.2 137.9,51.7 
									"/>
			</g>
		</g>
		<g>
			<g>
				<path fill="#526E94" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M134.9,38l-1,1.5
					c0.8,0.8,1.6,1.6,2.2,2.4L137,42l1.5-2.2l-0.4-6.6L134.9,38L134.9,38z"/>
			</g>
		</g>
		<g>
			<g>
				<path fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M138.2,33.2l-7.5-3.8l-10.2,3.3
					c-1.5-0.4-2.9-0.7-4.4-0.9l-5-6.5l-9.6,0.1L98.8,32c-1.4,0.3-2.7,0.7-4.1,1.1l-11.4-2.9l-6.1,4l6.5,6.1c-0.6,0.8-1,1.6-1.3,2.5
					l-11,2.2l1,5.5l11.8,2c0.6,0.8,1.4,1.6,2.2,2.4l-4.3,6.3l7.5,3.8l10.2-3.3c1.5,0.4,2.9,0.7,4.4,0.9l5,6.5l9.6-0.1l2.6-6.6
					c1.4-0.3,2.7-0.7,4-1.1l11.4,2.9l6.1-4l-6.5-6.1c0.6-0.8,1-1.6,1.3-2.5l11.1-2.4l-1-5.5l-11.9-2c-0.6-0.8-1.4-1.6-2.2-2.4
					L138.2,33.2z M117.6,50.9c-3.3,2.2-9.3,2.3-13.4,0.2s-4.7-5.5-1.4-7.7s9.3-2.3,13.4-0.2C120.3,45.3,120.9,48.8,117.6,50.9z"/>
			</g>
		</g>
		<path fill="#F4F4F4" d="M116,31.7l-5-6.5l-5.4,0.1l-19.3,38l3.4,1.7l10.2-3.3c1.5,0.4,2.9,0.7,4.4,0.9l0.2,0.2l5.2-10.3
			c-2-0.1-3.9-0.6-5.6-1.4c-4.1-2.1-4.7-5.5-1.4-7.7c2.9-1.9,8.1-2.2,12-0.8l5.2-10.1C118.6,32.2,117.3,32,116,31.7z"/>
		<path fill="#6D84A5" d="M114.8,42.7L114.8,42.7c-3.5,1.1-6.6,2.9-8.8,5.6c3.1-0.5,6.6-0.1,9.3,1.3c0.9,0.4,1.6,0.9,2.1,1.5
			l0.1-0.1c1.4-0.9,2.1-2.1,2.1-3.3v-0.1c0-0.3-0.1-0.6-0.2-0.8c0-0.1-0.1-0.2-0.1-0.3s0-0.1-0.1-0.2c0-0.1-0.1-0.2-0.2-0.3
			c0-0.1-0.1-0.1-0.1-0.2c-0.1-0.1-0.1-0.2-0.2-0.3s-0.1-0.1-0.2-0.2c-0.1-0.1-0.1-0.2-0.2-0.2c-0.1-0.1-0.2-0.2-0.2-0.2
			c-0.1-0.1-0.1-0.1-0.2-0.2c-0.1-0.1-0.2-0.2-0.3-0.2c-0.1-0.1-0.2-0.1-0.2-0.2c-0.1-0.1-0.3-0.2-0.4-0.3c-0.1,0-0.1-0.1-0.2-0.1
			c-0.2-0.1-0.5-0.3-0.7-0.4c-0.2-0.1-0.4-0.2-0.7-0.3C115.3,42.9,115,42.8,114.8,42.7z"/>
		<path fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M116.2,43.3c-4.1-2.1-10.1-2-13.4,0.2
			c-2.6,1.7-2.8,4.2-0.7,6.2c3.3-2.1,9.3-2.2,13.3-0.1c0.9,0.4,1.6,0.9,2.1,1.5l0.1-0.1C120.9,48.8,120.3,45.3,116.2,43.3z"/>
		<g>
			<g>
				<path fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M139.2,62.9l-2.1,1.4l-11.4-2.9
					c-1.3,0.4-2.7,0.8-4,1.1L119,69l-9.6,0.1l-5-6.5c-1.5-0.2-3-0.6-4.4-0.9L89.7,65l-3.9-1.9l0,0l-3.7-1.8l0.4,6.6l7.5,3.8
					l10.2-3.3c1.5,0.4,2.9,0.7,4.4,0.9l5,6.5l9.6-0.1l2.6-6.6c1.4-0.3,2.7-0.7,4-1.1l11.4,2.9l6.1-4l-0.4-6.6L139.2,62.9L139.2,62.9
					z"/>
			</g>
		</g>
		<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="104.4,62.7 104.7,69.3 
			109.8,75.8 109.4,69.2 		"/>
		<polygon fill="#6D84A5" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="119,69 119.4,75.7 122,69.1 
			121.6,62.4 		"/>
		<path fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M125.7,61.4h-0.2l0.4,6.6h0.1l11.4,2.9
			l-0.4-6.6L125.7,61.4z"/>
		<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="72.8,57.2 83.7,59.1 84.5,57.8 
			84.2,52.6 72.4,50.6 		"/>
		<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="85.9,63.1 82.2,61.2 82.6,67.9 
			90.1,71.6 89.7,65 		"/>
		<path fill="#E8EBEF" d="M128.9,30l-7.4,2.4L116,43.3h0.1c4.1,2.1,4.7,5.5,1.4,7.7c-1.6,1.1-3.9,1.6-6.2,1.7l-5.8,11.6l3.8,4.9
			L128.9,30z"/>
		<g>
			<g>
				<path fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M138.2,33.2l-7.5-3.8l-10.2,3.3
					c-1.5-0.4-2.9-0.7-4.4-0.9l-5-6.5l-9.6,0.1L98.8,32c-1.4,0.3-2.7,0.7-4.1,1.1l-11.4-2.9l-6.1,4l6.5,6.1c-0.6,0.8-1,1.6-1.3,2.5
					l-11,2.2l1,5.5l11.8,2c0.6,0.8,1.4,1.6,2.2,2.4l-4.3,6.3l7.5,3.8l10.2-3.3c1.5,0.4,2.9,0.7,4.4,0.9l5,6.5l9.6-0.1l2.6-6.6
					c1.4-0.3,2.7-0.7,4-1.1l11.4,2.9l6.1-4l-6.5-6.1c0.6-0.8,1-1.6,1.3-2.5l11.1-2.4l-1-5.5l-11.9-2c-0.6-0.8-1.4-1.6-2.2-2.4
					L138.2,33.2z M117.6,50.9c-3.3,2.2-9.3,2.3-13.4,0.2s-4.7-5.5-1.4-7.7s9.3-2.3,13.4-0.2C120.3,45.3,120.9,48.8,117.6,50.9z"/>
			</g>
		</g>
	</g>
	<g>
		<path d="M111,25.2l5,6.5l4.4,0.9l10.2-3.3l7.5,3.8l0.4,6.6L137,42l10.9,1.8l1,5.5l0.4,6.6l-8.8,1.9l2.5,2.4l0.4,6.7l-6.1,4L126,68
			l-4,1.1l-2.6,6.6l-9.6,0.1l-5-6.5l-4.4-0.9l-10.2,3.3l-7.5-3.8l-0.4-6.7l1.5-2.1l-10.9-1.8l-1-5.5L71.4,45l8.8-1.8l-2.6-2.4
			l-0.4-6.7l6.1-4L94.7,33l4.1-1.1l2.6-6.6L111,25.2 M112,23.2h-1l-9.6,0.1h-1.3l-0.5,1.2l-2.2,5.7L94.7,31l-10.9-2.8L83,28
			l-0.7,0.5l-6.1,4l-1,0.6l0.1,1.1l0.4,6.7v0.8L76,42l-5,1l-1.7,0.4l0.1,1.7l0.4,6.7v0.1V52l1,5.5l0.3,1.4l1.4,0.2l7.7,1.3l-0.1,0.1
			v0.7l0.4,6.7l0.1,1.1l1,0.5l7.5,3.8l0.7,0.4l0.8-0.2l9.7-3.1l3.2,0.7l4.6,5.9l0.6,0.8h1l9.6-0.1h1.3l0.5-1.2l2.2-5.7l2.6-0.7
			l10.9,2.8l0.9,0.2l0.7-0.5l6.1-4l1-0.6l-0.1-1.2l-0.4-6.7l-0.1-0.8l-0.3-0.3l5.1-1.1l1.7-0.4l-0.1-1.7l-0.4-6.6v-0.1V49l-1-5.5
			l-0.3-1.4l-1.4-0.2l-7.8-1.3l0.1-0.2v-0.7l-0.4-6.6l-0.1-1.2l-1-0.5l-7.5-3.8l-0.7-0.4l-0.8,0.2l-9.7,3.1l-3.2-0.7l-4.6-5.9
			L112,23.2L112,23.2z"/>
	</g>
</g>
<g id="Layer_8_copy">
	<g id="Layer_1_copy">
		<g id="Layer_3_copy">
		</g>
		<g id="Layer_6_copy">
		</g>
		<g id="Layer_7_copy">
			<polygon opacity="0.4" fill="#000000" enable-background="new    " points="85.4,133.1 92,131.1 97.1,120.5 121.3,119.4 124.1,103.2 112,78.8 
				38.5,79.9 			"/>
		</g>
		<path fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M79.4,83.8c-5.9-3-14.8-2.9-19.6,0.3
			c-3.8,2.5-4,6.2-1.1,9.1c4.9-3.1,13.5-3.1,19.4-0.2c1.3,0.6,2.3,1.4,3.1,2.2c0.1,0,0.1-0.1,0.2-0.1C86.3,91.9,85.4,86.9,79.4,83.8
			z"/>
		<g>
			<g>
				<path fill="#90A6BF" d="M112.9,112.5l-3.1,2.1l-16.6-4.3c-1.9,0.6-3.9,1.2-5.9,1.6l-3.8,9.6l-14.1,0.2l-7.3-9.5
					c-2.2-0.3-4.3-0.8-6.5-1.4l-14.9,4.8l-5.6-2.8l0,0l-5.3-2.7l0.6,9.7l11,5.5l14.9-4.8c2.1,0.6,4.3,1,6.5,1.4l7.3,9.5l14.1-0.2
					l3.8-9.6c2-0.4,4-1,5.9-1.6l16.6,4.3l8.9-5.9l-0.6-9.7L112.9,112.5L112.9,112.5z"/>
			</g>
		</g>
		<path fill="#6D84A5" stroke="#000000" stroke-miterlimit="10" d="M55.7,110.8L55.7,110.8l-14.9,4.7l-0.1-0.1l0.6,9.7l0.1,0.1
			l14.9-4.8l0,0L55.7,110.8z"/>
		<g>
			<g>
				<polygon fill="#6D84A5" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="14,86.5 14.5,96.2 16,104.2 
					31.9,106.9 35.9,101 32.7,97.4 15.4,94.5 				"/>
			</g>
		</g>
		<g>
			<g>
				<path fill="#6D84A5" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M30.1,83c0.4-1.2,1.1-2.4,1.9-3.6
					l-9.5-8.9l0.6,9.7l3.8,3.5L30.1,83z"/>
			</g>
		</g>
		<g>
			<g>
				<polygon fill="#6D84A5" stroke="#000000" stroke-miterlimit="10" points="127.2,92.7 127.8,102.4 114.9,105.1 109.2,99.7 
					111.1,96.2 				"/>
			</g>
		</g>
		<g>
			<g>
				<path fill="#526E94" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M106.7,76.1l-1.5,2.1
					c1.2,1.1,2.3,2.3,3.2,3.5l1.4,0.2l2.2-3.2l-0.6-9.7L106.7,76.1L106.7,76.1z"/>
			</g>
		</g>
		<g>
			<g>
				<path fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M111.5,69.1l-11-5.5l-14.9,4.8
					c-2.1-0.6-4.3-1-6.5-1.4l-7.3-9.5l-14.1,0.2l-3.8,9.6c-2,0.4-4,1-5.9,1.6l-16.6-4.3l-8.9,5.9l9.5,8.9c-0.8,1.2-1.4,2.4-1.9,3.6
					L14,86.4l1.5,8l17.3,2.9c0.9,1.2,2,2.4,3.2,3.5l-6.2,9.1l11,5.5l14.9-4.8c2.1,0.6,4.3,1,6.5,1.4l7.3,9.5l14.1-0.2l3.8-9.6
					c2-0.4,4-1,5.9-1.6l16.6,4.3l8.9-5.9l-9.5-8.9c0.8-1.2,1.4-2.4,1.9-3.6l16.1-3.5l-1.5-8l-17.3-2.9c-0.9-1.2-2-2.4-3.2-3.5
					L111.5,69.1z M81.4,95c-4.9,3.2-13.6,3.3-19.6,0.3s-6.9-8-2.1-11.2s13.6-3.3,19.6-0.3C85.4,86.9,86.3,91.9,81.4,95z"/>
			</g>
		</g>
		<path fill="#F4F4F4" d="M79.1,67l-7.3-9.5l-7.9,0.1L35.7,113l4.9,2.5l14.9-4.8c2.1,0.6,4.3,1,6.5,1.4l0.3,0.3L70,97.5
			c-2.9-0.2-5.7-0.9-8.1-2.1c-6-3-6.9-8-2.1-11.2c4.3-2.8,11.8-3.2,17.6-1.2l7.5-14.8C83,67.7,81.1,67.3,79.1,67z"/>
		<path fill="#6D84A5" d="M77.4,83L77.4,83c-5.1,1.6-9.6,4.2-12.9,8.2C69,90.4,74.2,91,78.1,93c1.3,0.6,2.3,1.4,3.1,2.2
			c0.1,0,0.1-0.1,0.2-0.1c2.1-1.4,3.1-3.1,3.1-4.9V90c0-0.4-0.1-0.8-0.2-1.2c-0.1-0.2-0.1-0.3-0.2-0.5c0-0.1-0.1-0.2-0.1-0.2
			c-0.1-0.1-0.1-0.3-0.2-0.4s-0.1-0.2-0.2-0.3c-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.2-0.2-0.3-0.3
			c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.3-0.2-0.4-0.4c-0.1-0.1-0.2-0.2-0.3-0.3c-0.2-0.1-0.4-0.3-0.6-0.4
			c-0.1-0.1-0.2-0.1-0.3-0.2c-0.3-0.2-0.7-0.4-1-0.6s-0.7-0.3-1-0.5C78,83.2,77.7,83.1,77.4,83z"/>
		<path fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M79.4,83.8c-5.9-3-14.8-2.9-19.6,0.3
			c-3.8,2.5-4,6.2-1.1,9.1c4.9-3.1,13.5-3.1,19.4-0.2c1.3,0.6,2.3,1.4,3.1,2.2c0.1,0,0.1-0.1,0.2-0.1C86.3,91.9,85.4,86.9,79.4,83.8
			z"/>
		<g>
			<g>
				<path fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M112.9,112.5l-3.1,2.1l-16.6-4.3
					c-1.9,0.6-3.9,1.2-5.9,1.6l-3.8,9.6l-14.1,0.2l-7.3-9.5c-2.2-0.3-4.3-0.8-6.5-1.4l-14.9,4.8l-5.6-2.8l0,0l-5.3-2.7l0.6,9.7
					l11,5.5l14.9-4.8c2.1,0.6,4.3,1,6.5,1.4l7.3,9.5l14.1-0.2l3.8-9.6c2-0.4,4-1,5.9-1.6l16.6,4.3l8.9-5.9l-0.6-9.7L112.9,112.5
					L112.9,112.5z"/>
			</g>
		</g>
		<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="62.1,112.2 62.7,121.9 
			70,131.4 69.4,121.7 		"/>
		<polygon fill="#6D84A5" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="83.5,121.5 84.1,131.1 
			87.9,121.5 87.3,111.8 		"/>
		<path fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M93.3,110.3H93l0.6,9.7h0.1l16.6,4.3
			l-0.6-9.7L93.3,110.3z"/>
		<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="16,104.2 31.9,106.9 33.2,105 
			32.7,97.4 15.5,94.5 		"/>
		<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="35.1,112.7 29.8,110 
			30.3,119.7 41.3,125.3 40.8,115.6 		"/>
		<path fill="#E8EBEF" d="M98,64.4l-10.8,3.4l-8,15.9c0,0,0.1,0,0.1,0.1c6,3,6.9,8,2.1,11.2c-2.4,1.6-5.7,2.4-9.1,2.5l-8.5,17
			l5.5,7.1L98,64.4z"/>
		<g>
			<g>
				<path fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" d="M111.5,69.1l-11-5.5l-14.9,4.8
					c-2.1-0.6-4.3-1-6.5-1.4l-7.3-9.5l-14.1,0.2l-3.8,9.6c-2,0.4-4,1-5.9,1.6l-16.6-4.3l-8.9,5.9l9.5,8.9c-0.8,1.2-1.4,2.4-1.9,3.6
					L14,86.4l1.5,8l17.3,2.9c0.9,1.2,2,2.4,3.2,3.5l-6.2,9.1l11,5.5l14.9-4.8c2.1,0.6,4.3,1,6.5,1.4l7.3,9.5l14.1-0.2l3.8-9.6
					c2-0.4,4-1,5.9-1.6l16.6,4.3l8.9-5.9l-9.5-8.9c0.8-1.2,1.4-2.4,1.9-3.6l16.1-3.5l-1.5-8l-17.3-2.9c-0.9-1.2-2-2.4-3.2-3.5
					L111.5,69.1z M81.4,95c-4.9,3.2-13.6,3.3-19.6,0.3s-6.9-8-2.1-11.2s13.6-3.3,19.6-0.3C85.4,86.9,86.3,91.9,81.4,95z"/>
			</g>
		</g>
	</g>
	<g>
		<path d="M71.8,57.5l7.3,9.5l6.5,1.4l14.9-4.8l11,5.5l0.6,9.6l-2.2,3.2l15.9,2.7l1.5,8l0.5,9.7l-12.9,2.8l3.7,3.5l0.6,9.7l-8.9,5.9
			l-16.6-4.3l-5.9,1.6l-3.8,9.6l-14,0.3l-7.3-9.5l-6.5-1.4l-14.9,4.8l-11-5.5l-0.6-9.7l2.2-3.1L16,104.2l-1.5-8.1L14,86.4l12.8-2.7
			L23,80.3l-0.5-9.7l8.9-5.9L48,68.9l5.9-1.6l3.8-9.6L71.8,57.5 M72.8,55.5h-1l-14.1,0.2h-1.3L55.9,57l-3.4,8.7L48,66.9l-16.1-4.1
			L31,62.5L30.3,63l-8.9,5.9l-1,0.6l0.1,1.1l0.5,9.7v0.8l0.6,0.6l0.9,0.9l-9,1.9l-1.7,0.4l0.1,1.7l0.6,9.7v0.1v0.1l1.5,8.1l0.3,1.4
			l1.4,0.2l12.8,2.1l-0.4,0.5l-0.4,0.6v0.7l0.6,9.7l0.1,1.1l1,0.5l11,5.5l0.7,0.4l0.8-0.2l14.4-4.6l5.2,1.1l6.9,8.9l0.6,0.8h1
			l14.1-0.2h1.3l0.5-1.2l3.4-8.7l4.4-1.2l16.1,4.1l0.9,0.2l0.7-0.5l8.9-5.9l1-0.6l-0.1-1.2l-0.6-9.7l-0.1-0.8l-0.6-0.5l-0.9-0.9
			l9.1-1.9l1.7-0.4l-0.1-1.7l-0.5-9.7v-0.1v-0.1l-1.5-8l-0.3-1.4l-1.4-0.2l-12.8-2.2l0.4-0.6l0.4-0.6v-0.7l-0.6-9.6l-0.1-1.2l-1-0.5
			l-11-5.5l-0.7-0.4l-0.8,0.2l-14.4,4.6l-5.2-1.1l-6.9-8.9L72.8,55.5L72.8,55.5z"/>
	</g>
</g>
</svg>
`,image:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="451.20001px" height="541.70001px" viewBox="0 0 451.20001 541.70001" enable-background="new 0 0 451.20001 541.70001"
	 xml:space="preserve">
<g id="Layer_2_1_" display="none">
</g>
<g id="Layer_3">
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="331.29999,487.29999 278.10001,493.60001 254.7,358.70001 
		276.10001,359.79999 413.5,440.89999 	"/>
	<polygon fill="#231F20" points="299.89999,257.60001 299.70001,482.29999 278.10001,493.60001 85.5,377.79999 85.5,80.7 
		106.8,66.6 237.7,145 	"/>
	<polygon fill="#CDD9EE" points="95.7,84.2 213.8,155.39999 226,148.39999 107.2,77.3 	"/>
	<polygon fill="#CDD9EE" points="276.10001,252.3 276.10001,480.5 95.8,372.20001 95.8,89.1 212.8,159 	"/>
	<polygon fill="#6885A9" points="281.20001,269.29999 280.20001,480.60001 292.39999,474.5 291.29999,263.20001 	"/>
	<path fill="#000000" d="M254.8,431.20001c0,8.39999-5.3,12-11.89999,8.10001L124,368.39999C117.5,364.5,112.1,354.5,112.1,346.10001L112,230.5
		c0-8.39999,5.3-12,11.9-8.10001l118.9,70.89999c6.5,3.89999,11.89999,13.89999,11.89999,22.29999L254.8,431.20001z M123.9,234.5
		c-1.3-0.8-2.4,0-2.4,1.60001l0.2,115.60001c0,1.60001,1.1,3.70001,2.4,4.5L243,427.10001c1.3,0.79999,2.39999,0,2.39999-1.60001
		l-0.2-115.60001c0-1.60001-1.10001-3.70001-2.39999-4.5C242.7,305.39999,123.9,234.5,123.9,234.5z M145.3,296
		c-7.89999-4.70001-14.3-16.70001-14.3-26.79999s6.39999-14.39999,14.2-9.79999c7.89999,4.70001,14.3,16.70001,14.3,26.79999
		C159.60001,296.29999,153.2,300.70001,145.3,296z M235.7,410.70001l-104.59999-62.39999v-18.29999l23.7-16.20001L166.7,336.10001
		l38-26l31,58V410.70001z"/>
	<polygon fill="#FFFFFF" points="95.7,84.2 133.3,106.8 156.5,106.9 118.6,84.3 	"/>
	<polygon fill="#FFFFFF" points="143.60001,113 159.60001,122.4 182.7,122.5 166.60001,113 	"/>
	<polygon fill="#8AA4C1" points="219.89999,159.7 279.70001,265.39999 290.60001,259 231.3,153.10001 	"/>
</g>
<g id="Layer_6">
	<path fill="#231F20" d="M219.89999,159.7L211.2,157.3v75.59999c0,2.89999,1.60001,5.60001,4.10001,7l60.8,34.89999l3.60001-9.39999
		L219.89999,159.7z"/>
	<path fill="#CDD9EE" d="M273.5,265.39999L222.8,236c-2.2-1.3-3.60001-3.7-3.60001-6.3l-0.3-59.90001L273.5,265.39999z"/>
	<g id="Layer_4">
	</g>
</g>
<g id="Layer_1_1_" display="none">
	<g display="inline">
		<path fill="#6885A9" d="M846.90002,308.29999C847,309.19998,847,310.09998,847,311L846.90002,308.29999L846.90002,308.29999z"/>
		<path fill="#231F20" d="M849,311h-3.79999c0-0.79999,0-1.60001-0.09998-2.5l-0.29999-2.10001h4.09998L849,311L849,311z"/>
	</g>
	<g display="inline">
		<path fill="#6885A9" d="M846.90002,212.7C847,213.59999,847,214.5,847,215.39999L846.90002,212.7L846.90002,212.7z"/>
		<path fill="#231F20" d="M849,215.39999h-3.79999c0-0.8,0-1.60001-0.09998-2.5l-0.29999-2.10001h4.09998L849,215.39999
			L849,215.39999z"/>
	</g>
	<path display="inline" fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="
		M846.90002,308.29999C847,309.19998,847,310.09998,847,311L846.90002,308.29999L846.90002,308.29999z"/>
	<path display="inline" fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="
		M846.90002,212.7C847,213.59999,847,214.5,847,215.39999L846.90002,212.7L846.90002,212.7z"/>
	<g display="inline">
		<polygon opacity="0.4" fill="#000000" enable-background="new    " points="274,525.29999 239.3,518.5 238.7,218.60001 516.29999,382.39999 		"/>
		<polygon fill="#CCD8EE" points="55.6,498.20001 54.9,498.20001 54.9,498.70001 		"/>
		<polygon fill="#231F20" points="54.4,499.60001 54.4,497.70001 57.5,497.70001 		"/>
		<polygon fill="#CCD8EE" points="55.6,410.29999 54.9,410.29999 54.9,410.70001 		"/>
		<polygon fill="#231F20" points="54.4,411.60001 54.4,409.79999 57.5,409.79999 		"/>
		<polygon fill="#CDD9EE" points="239.3,431.20001 56.9,321.60001 238.7,212.10001 421.70001,321.60001 		"/>
		<polygon fill="#CCD8EE" points="55.6,322.39999 54.9,322.39999 54.9,322.79999 		"/>
		<polygon fill="#B5C5DC" points="54.9,397.39999 239.3,508.20001 239.3,508.20001 239.3,433.70001 54.9,322.79999 		"/>
		<polygon fill="#6885A9" points="267,491.60001 239.3,508.20001 239.3,508.20001 239.3,433.70001 267,417 		"/>
		<path fill="#231F20" d="M46.7,318.10001v83v0.70001L239.3,517.60004l37.99998-22.79999V411L84.1,295.39999L46.7,318.10001z
			 M237.3,504.5L57,396.20001V326.5l180.3,108.29999V504.5z M56.9,321.60001L82.4,306l183,109.5l-26.10001,15.70001L56.9,321.60001z
			 M267.39999,489.29999l-26.10001,15.29999v-69.70001l26.10001-15.29999V489.29999z"/>
	</g>
</g>
<g id="Layer_5">
</g>
</svg>
`,laptop:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="541.1px" height="513.1px" viewBox="0 0 541.1 513.1" enable-background="new 0 0 541.1 513.1" xml:space="preserve">
<g>
	<path opacity="0.4" fill="#000000" enable-background="new    " d="M274.6,471.5l17.2,9.5c1.8,1,3.9,1,5.7,0L538.1,343c3.9-2.2,3.9-7.8,0-10.1
		L344.6,220.8c-3.3-1.9-7.6-0.2-8.5,3.5l-64.3,240.5C271.1,467.4,272.2,470.2,274.6,471.5z"/>
</g>
<g>
	<g>
		<g>
			<polygon fill="#CDD9EE" points="198.2,218.1 38.8,310.1 270.4,443.3 429.3,351.5 			"/>
			<polygon fill="#CDD9EE" points="199.5,18.3 199.5,218.1 429.3,351.5 429.5,151.8 			"/>
			<polygon fill="#4B6E98" points="445.2,177.1 445.3,142.7 429.5,151.8 429.3,327.7 429.3,335.3 429.4,335.3 429.3,351.5 
				429.3,351.5 427.5,352.6 270.4,443.3 270.4,461.5 427,371 427,371 445,360.6 445.1,344.5 445.1,344.5 445.3,177.1 			"/>
			<polygon fill="#6885A9" points="121.5,345.7 197.7,389.7 243.1,363.5 166.9,319.5 			"/>
			<path fill="#231F20" d="M197.7,392l-80.2-46.3l49.4-28.5l80.2,46.3L197.7,392z M125.5,345.7l72.2,41.7l41.4-23.9l-72.2-41.7
				L125.5,345.7z"/>
			<polygon fill="#F0F7FF" points="426.8,186.8 426.8,186.8 426.8,154.3 260.8,251 292.8,269.5 426.8,191.4 			"/>
			<polygon fill="#B5C5DC" points="38.8,327.8 38.8,310.1 270.4,443.3 270.4,461.5 			"/>
			<polygon fill="#B1CAEC" points="199.5,18.3 429.5,151.8 445.3,142.7 215.2,9.2 			"/>
			<polygon fill="#6885A9" points="394.3,350.4 267,277 266.9,277.1 200.1,238.5 124.3,282.2 251.5,355.7 251.6,355.6 318.5,394.2 
							"/>
			<path fill="#231F20" d="M318.5,396.5l-66.8-38.6l-0.1,0.1l-1-0.6l-130.2-75.2l79.8-46.1l66.8,38.6l0.1-0.1l1,0.6l130.2,75.2
				L318.5,396.5z M251.6,353.3l66.8,38.6l71.8-41.5L267,279.3l-0.1,0.1l-66.8-38.6l-71.8,41.5l123.2,71.1L251.6,353.3z"/>
			<polygon fill="#F0F7FF" points="332.3,98.7 201.5,174.9 201.5,216.8 238.9,238.4 405.6,141.2 			"/>
			<g>
				<polygon fill="#231F20" points="431.9,352.7 431.9,352.6 431.6,352.8 				"/>
				<path fill="#231F20" d="M215.6,0l-23.7,13.7v199.8l-160.6,92v26.9l238.5,137.7l1,0.6l182.9-105.4V138.1L215.6,0z M43.2,310.1
					l155.4-89.7l227.1,131.1l-155,89.5L43.2,310.1z M268.7,444.5V458L41.2,326.6v-13L268.7,444.5z M427.9,152.9l-0.2,195.1
					L201.8,217V21.8L427.9,152.9z M203.8,18.3l11.7-6.8l226.1,131.2l-7.9,4.6l-3.8,2.2L203.8,18.3z M272.7,444.5l157.1-90.6l2.1-1.3
					v-2.1V152.9l10.2-5.9l1.5-0.9l-0.2,213.3l-14.5,8.5l-156.2,90L272.7,444.5L272.7,444.5z"/>
			</g>
		</g>
	</g>
</g>
</svg>
`,loadbalancer:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="634.4px" height="548.1px" viewBox="0 0 634.4 548.1" enable-background="new 0 0 634.4 548.1" xml:space="preserve">
<g id="Layer_2_1_">
	<polyline opacity="0.4" fill="#231F20" enable-background="new    " points="279.7,492.1 330.8,486.6 401.9,449.6 435.5,468.2 
		571.8,383.3 472.3,328.3 279.7,492.1 	"/>
</g>
<g id="Layer_1_2_">
	<g id="Layer_1_1_" display="none">
		<polygon display="inline" fill="none" stroke="#A7A9AC" stroke-width="4" stroke-miterlimit="10" points="533.7,391.9 
			318.3,516.3 102.8,391.9 102.8,143.1 318.3,18.8 533.7,143.1 		"/>
	</g>
	<g id="Layer_2_2_">
		<g>
			<g>
				<g>
					<path fill="#CDD9EE" d="M279.7,482.5c-0.3,0-0.7-0.1-1-0.3l-110.1-63.5c-0.8-0.5-1.2-1.4-0.9-2.3l55-184.2
						c0.3-0.9,1-1.4,1.9-1.4c0,0,0,0,0.1,0c0.9,0,1.7,0.7,1.9,1.6l55,247.7c0.2,0.8-0.1,1.6-0.8,2
						C280.5,482.4,280.1,482.5,279.7,482.5z"/>
				</g>
				<g>
					<path fill="#231F20" d="M224.7,232.8l55,247.7l-110-63.5L224.7,232.8 M169.7,417l110.1,63.5L169.7,417 M224.7,228.8
						c-1.8,0-3.3,1.2-3.8,2.9l-55,184.1c-0.2,0.5-0.2,1-0.2,1.5c0,0.3,0.1,0.6,0.2,0.9l0,0l0,0c0.3,0.9,0.9,1.7,1.8,2.2l0,0l0,0l0,0
						l0,0l0,0l0,0l0,0l110,63.6l0,0c0.6,0.4,1.3,0.5,2,0.5c0.3,0,0.5,0,0.8-0.1c0.2,0,0.5-0.1,0.7-0.2c0.8-0.3,1.4-0.8,1.9-1.6
						c0.1-0.1,0.1-0.2,0.2-0.3c0.5-0.9,0.6-1.9,0.4-2.8l-55-247.7c-0.4-1.8-1.9-3.1-3.8-3.1C224.8,228.8,224.7,228.8,224.7,228.8
						L224.7,228.8z"/>
				</g>
			</g>
			<g>
				<g>
					<path fill="#6885A9" d="M279.7,482.5c-0.3,0-0.5-0.1-0.8-0.2c-0.6-0.3-1-0.8-1.1-1.4l-55-247.7c-0.2-0.9,0.2-1.7,1-2.2
						l151.9-87.6c0.3-0.2,0.7-0.3,1-0.3s0.5,0.1,0.8,0.2c0.6,0.3,1,0.8,1.1,1.4l55,247.7c0.2,0.9-0.2,1.7-1,2.2l-151.8,87.6
						C280.4,482.4,280,482.5,279.7,482.5z"/>
				</g>
				<g>
					<path fill="#231F20" d="M376.5,145.2l55,247.7l-71.4,41.2l-80.4,46.4l-36.2-163l-18.8-84.7L376.5,145.2 M376.5,141.2
						c-0.7,0-1.4,0.2-2,0.5l-151.9,87.6c-1.5,0.9-2.3,2.6-1.9,4.3l18.8,84.7l36.2,163c0.3,1.2,1.1,2.3,2.3,2.8
						c0.5,0.2,1.1,0.3,1.6,0.3c0.7,0,1.4-0.2,2-0.5l80.4-46.4l71.4-41.2c1.5-0.9,2.3-2.6,1.9-4.3l-55-247.7
						c-0.3-1.2-1.1-2.3-2.3-2.8C377.6,141.3,377.1,141.2,376.5,141.2L376.5,141.2z"/>
				</g>
			</g>
			<g>
				<polygon fill="#416787" points="431.5,392.9 360.1,434.1 243.5,317.5 224.7,232.8 376.5,145.2 				"/>
			</g>
			<g>
				<polygon fill="#CDD9EE" points="73.9,145 406,336.7 562.7,246.3 230.6,54.5 				"/>
				<path fill="#231F20" d="M406,339.1l-1-0.6L69.9,145l160.7-92.8l1,0.6l335.1,193.5L406,339.1z M77.9,145L406,334.4l152.7-88.2
					L230.6,56.8L77.9,145z"/>
			</g>
			<g>
				<polygon fill="#6885A9" points="406,336.7 73.9,145 73.9,173.3 406,365.1 562.7,274.6 562.7,246.3 				"/>
				<path fill="#231F20" d="M406,367.4l-1-0.6L71.9,174.5v-33L406,334.4l158.7-91.6v32.9l-1,0.6L406,367.4z M75.9,172.2L406,362.8
					l154.7-89.3v-23.7L406,339.1l-1-0.6l-329.1-190C75.9,148.5,75.9,172.2,75.9,172.2z"/>
			</g>
			<g>
				<path fill="#231F20" d="M230.6,54.5l332.1,191.7v28.3L423.2,355l8.4,37.8L360.2,434l-80.4,46.4L169.7,417l48-160.6l-143.8-83
					V145L230.6,54.5 M230.6,43l-5,2.9L68.9,136.3l-5,2.9v5.8v28.3v5.8l5,2.9l136.9,79l-45.7,153.1l-2.3,7.6l6.8,4l110.1,63.5l5,2.9
					l5-2.9l80.4-46.4l71.4-41.2l6.4-3.7l-1.6-7.2l-6.8-30.6l133.2-76.9l5-2.9v-5.8v-28.3v-5.8l-5-2.9L235.6,45.9L230.6,43L230.6,43z
					"/>
			</g>
		</g>
	</g>
</g>
</svg>
`,lock:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="203.9px" height="210px" viewBox="0 0 203.9 210" enable-background="new 0 0 203.9 210" xml:space="preserve">
<g id="Layer_1_1_">
	<path opacity="0.4" fill="#000000" enable-background="new    " d="M115.6,190.6l40-1.8l18.7-11c3-1.8,4.6-4.8,3.6-7.2c-1.3-3-8.9-8-12.5-10.5
		c0.8-2.9-4.5-11.6-21.2-18.6c-40.3-23.4-34,23.6-34,23.6L115.6,190.6z"/>
	<g id="Layer_3">
	</g>
	<g id="Layer_2_1_">
		<g>
			<path fill="#F09938" d="M145.1,103.6v62.5c0,3.2-1,5.4-2.7,6.5l-23.5,13.5c1.6-1,2.6-3.3,2.6-6.5v-62.5c0-5.9-3.6-12.9-8.1-15.5
				L60.3,71c-1.7-1-3.4-1.2-4.7-0.7l0,0l22.5-13c1.5-1.2,3.5-1.3,5.8,0.1l53.2,30.7c2.1,1.2,4,3.4,5.5,6
				C144.1,97.1,145.1,100.5,145.1,103.6z"/>
		</g>
		<g>
			<path fill="#F8D466" d="M121.6,147.3v-30.1c0-5.9-3.6-12.9-8.1-15.5L60.3,71c-1.7-1-3.4-1.2-4.7-0.7l0,0l22.5-13
				c1.5-1.2,3.5-1.3,5.8,0.1l53.2,30.7c2.1,1.2,4,3.4,5.5,6C141.5,114.4,133.8,132.7,121.6,147.3z"/>
		</g>
		<g>
			<path fill="#221F20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M91.3,14.5
				c0.8,0,1.5,0.1,2.4,0.2c0.5,0.1,0.9,0.1,1.4,0.3c1.9,0.4,3.7,1.1,5.7,2.1c0.6,0.3,1.2,0.6,1.7,0.9c9.7,5.5,18.1,17,23.2,29.7
				c0.1,0.4,0.3,0.8,0.5,1.2c0.1,0.1,0.1,0.2,0.1,0.3c2.8,7.4,4.4,15.2,4.4,22.6l0,0v12.7l6.5,3.7c2.1,1.2,4,3.4,5.5,6
				c1.6,2.9,2.6,6.3,2.6,9.5v62.5c0,3.2-1,5.4-2.7,6.5l-23.5,13.5c-0.6,0.5-1.4,0.6-2.3,0.6c-1,0-2.1-0.3-3.2-1l-53.2-30.7
				c-4.5-2.6-8.1-9.5-8.1-15.5v-5V77.1c0-3.6,1.4-6,3.4-6.8l0,0l0,0l11.5-6.6V43.3c0-7,1.4-12.6,3.9-16.8l0,0c0,0,1-2.1,3.2-4.5
				c0.1-0.1,0.1-0.1,0.2-0.2s0.1-0.1,0.1-0.1c0.1-0.1,0.2-0.3,0.3-0.3c0.1-0.1,0.1-0.1,0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1
				c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.1-0.1,0.1-0.1c0.1-0.1,0.2-0.2,0.3-0.3l0.1-0.1c0.1-0.1,0.2-0.1,0.3-0.3
				c0.1-0.1,0.1-0.1,0.1-0.1c0.1-0.1,0.3-0.2,0.4-0.3c0.1-0.1,0.1-0.1,0.1-0.1c0.1-0.1,0.1-0.1,0.3-0.2c0.1-0.1,0.1-0.1,0.2-0.2
				s0.1-0.1,0.3-0.2l0,0c0.1-0.1,0.2-0.1,0.3-0.3l0,0c0,0,0.1,0,0.1-0.1l0,0c0.1-0.1,0.2-0.1,0.3-0.3c0.1-0.1,0.2-0.1,0.3-0.2
				c0.1,0,0.1-0.1,0.1-0.1c0.1-0.1,0.2-0.1,0.3-0.2c0.1-0.1,0.3-0.1,0.4-0.2l0.1-0.1c0.1,0,0.1-0.1,0.1-0.1c0.2-0.1,0.4-0.3,0.6-0.3
				c0.1-0.1,0.1-0.1,0.2-0.1s0.1-0.1,0.2-0.1c0.1-0.1,0.2-0.1,0.3-0.1c0.1-0.1,0.1-0.1,0.2-0.1h0.1c0.1,0,0.1-0.1,0.1-0.1
				c0.1-0.1,0.3-0.1,0.4-0.2s0.2-0.1,0.3-0.1c0.1,0,0.1-0.1,0.1-0.1h0.1c0.1-0.1,0.2-0.1,0.3-0.1c0.1-0.1,0.3-0.1,0.5-0.2
				c0.1,0,0.1-0.1,0.1-0.1s0.1,0,0.1-0.1c0.1,0,0.1-0.1,0.2-0.1l0,0c0.1-0.1,0.3-0.1,0.5-0.2l0,0c0.1,0,0.1-0.1,0.2-0.1H84
				c0.1,0,0.1-0.1,0.2-0.1c0,0,0,0,0.1,0c0.1-0.1,0.3-0.1,0.5-0.1c0.1-0.1,0.3-0.1,0.4-0.1l0,0c0.1,0,0.1,0,0.1,0
				c0.1,0,0.1,0,0.2-0.1s0.3-0.1,0.4-0.1c0.1-0.1,0.3-0.1,0.5-0.1c0.1,0,0.1,0,0.1,0c0.2-0.1,0.3-0.1,0.5-0.1
				c0.2-0.1,0.4-0.1,0.6-0.1C88.9,14.6,90,14.5,91.3,14.5 M87.5,34.4L87.5,34.4L87.5,34.4c-1.9,2.7-2.9,6.6-2.9,11.4v12l28.8,16.6
				v-3.6c0-13.2-8.1-28.6-17.9-34.3c-2.5-1.5-5-2.1-7.1-2.1C88,34.4,87.8,34.4,87.5,34.4 M91.3,11.4c-1.5,0-2.9,0.2-4.3,0.5
				c-0.2,0-0.3,0.1-0.5,0.1c-0.1,0-0.3,0-0.5,0.1c-0.1,0-0.1,0-0.2,0.1c-0.2,0.1-0.3,0.1-0.5,0.1c-0.1,0.1-0.3,0.1-0.5,0.1l-0.2,0.1
				c0,0,0,0-0.1,0h-0.1l0,0l0,0h-0.1c-0.1,0-0.3,0.1-0.3,0.1c-0.1,0.1-0.3,0.1-0.5,0.1h-0.1c-0.1,0-0.1,0.1-0.2,0.1h-0.1L83,12.9
				h-0.1c-0.1,0-0.1,0.1-0.2,0.1l0,0c-0.2,0.1-0.3,0.1-0.5,0.2c0,0-0.1,0-0.1,0.1c-0.1,0-0.1,0.1-0.1,0.1h-0.1l0.1-0.1l0,0
				c-0.1,0-0.1,0.1-0.1,0.1c-0.2,0.1-0.3,0.1-0.5,0.2c-0.1,0.1-0.3,0.1-0.3,0.1l0,0l0,0c-0.1,0-0.1,0.1-0.2,0.1
				c-0.1,0.1-0.2,0.1-0.3,0.1C80.5,14,80.4,14,80.3,14l-0.1,0h-0.1C80,14,80,14.1,80,14.1s-0.1,0-0.1,0.1c-0.1,0.1-0.2,0.1-0.3,0.1
				c-0.1,0.1-0.2,0.1-0.3,0.1c-0.1,0-0.1,0.1-0.1,0.1h-0.1H79c-0.1,0-0.1,0.1-0.2,0.1c-0.3,0.1-0.5,0.3-0.7,0.4
				C78,15,78,15.1,78,15.1h0l-0.1,0.1l0,0c-0.1,0.1-0.3,0.1-0.4,0.3c0,0,0,0-0.1,0c-0.1,0.1-0.3,0.1-0.4,0.3l-0.1,0.1
				c-0.1,0.1-0.3,0.1-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.3l0,0c0,0,0,0-0.1,0c0,0,0,0-0.1,0l0,0l0,0c-0.1,0.1-0.2,0.1-0.3,0.3l0,0
				c-0.1,0.1-0.1,0.1-0.2,0.1L75.4,17c-0.1,0.1-0.2,0.1-0.3,0.2H75c-0.1,0.1-0.1,0.1-0.3,0.2c-0.1,0.1-0.1,0.1-0.1,0.1l0,0l0,0
				c-0.1,0.1-0.3,0.3-0.5,0.4l0,0C74,18,74,18,74,18c0.2-0.2,0-0.1,0,0l0,0h-0.1l0,0c-0.1,0.1-0.2,0.2-0.3,0.3l0,0
				c-0.1,0.1-0.1,0.1-0.1,0.1l-0.1,0.1c-0.1,0.1-0.2,0.2-0.3,0.3l0,0C73,18.9,73,18.9,73,18.9L72.9,19l0,0l0,0
				c-0.1,0.1-0.3,0.3-0.4,0.4l0,0c-0.1,0.1-0.1,0.1-0.1,0.1l0,0l0,0c-0.1,0.1-0.1,0.1-0.2,0.2c-2.3,2.5-3.4,4.6-3.7,5.2
				c-2.8,4.8-4.3,11-4.3,18.3v18.5l-9.8,5.7c-3.2,1.4-5,4.9-5,9.5v57.5v5c0,7,4.3,15,9.6,18.1l53.2,30.7c1.6,0.9,3.2,1.4,4.7,1.4
				c1.4,0,2.7-0.4,3.9-1.1l23.4-13.5l0.1-0.1c2.6-1.7,4.1-4.9,4.1-9.1v-62.5c0-3.5-1.1-7.5-3-11c-1.7-3.2-4.1-5.7-6.6-7.2l-5-2.8
				v-11c0-7.5-1.5-15.7-4.6-23.7l-0.1-0.1c0-0.1-0.1-0.2-0.1-0.3c-0.1-0.4-0.3-0.8-0.5-1.2c-2.6-6.6-6.2-13-10.3-18.3
				c-4.3-5.6-9.2-10.1-14.2-13c-0.6-0.4-1.3-0.7-1.9-1c-2.2-1.1-4.3-1.9-6.5-2.3c-0.5-0.1-1-0.2-1.5-0.3
				C93.2,11.4,92.2,11.4,91.3,11.4L91.3,11.4z M87.6,56V45.8c0-3.3,0.6-6.1,1.6-8.3c1.4,0.2,3,0.7,4.6,1.7
				c8.5,4.9,15.7,18.3,16.4,29.9L87.6,56L87.6,56z"/>
		</g>
		<g>
			<path fill="#F5BD41" d="M121.6,117.2v62.5c0,5.9-3.6,8.7-8.1,6.1l-27.6-15.9L68.8,160l-7.9-4.6l-0.5-0.3
				c-4.5-2.6-8.1-9.5-8.1-15.5V77.1c0-5.9,3.6-8.7,8.1-6.1l16.5,9.5l28.7,16.6l7.9,4.6l0,0C118,104.4,121.6,111.3,121.6,117.2z"/>
		</g>
		<path fill="#F8D466" d="M105.5,97.1l-44.6,58.3l-0.5-0.3c-4.5-2.6-8.1-9.5-8.1-15.5v-27l24.6-32L105.5,97.1z"/>
		<g>
			<g>
				<path fill="#FFFFFF" d="M123.1,101.2c-0.1,0-0.3,0-0.4,0h-0.1H122l0,0c-2.3-0.1-4.5-0.8-6.2-1.8c-2.4-1.4-3.6-3.3-3.2-5.2V70.8
					c0-13-7.9-28.1-17.7-33.8c-2.4-1.4-4.6-2.1-6.8-2.1c-0.1,0-0.3,0-0.5,0c-1.7,2.6-2.6,6.4-2.6,10.8v23.5c0.1,1.5-0.7,2.9-2.4,3.9
					c-0.3,0.2-0.6,0.3-0.9,0.5c-0.2,0.1-0.5,0.2-0.6,0.3c-0.2,0.1-0.5,0.1-0.7,0.2c-0.3,0.1-0.7,0.2-1.1,0.3h-0.1
					c-0.2,0-0.4,0.1-0.6,0.1h-0.1c-0.2,0-0.4,0.1-0.5,0.1h-0.1c-0.2,0-0.3,0-0.5,0h-0.3c-0.1,0-0.3,0-0.4,0V74v0.6h-0.1H76l0,0
					c-2.3-0.1-4.5-0.8-6.2-1.8c-2.3-1.4-3.5-3.2-3.3-5.1V43.3c0-6.8,1.4-12.7,3.9-17.1c0.1-0.1,1-2.3,3.3-4.7l0.2-0.2
					c0.2-0.2,0.4-0.4,0.6-0.6s0.4-0.4,0.6-0.6s0.4-0.4,0.6-0.6s0.5-0.4,0.6-0.6c0.1-0.1,0.2-0.2,0.3-0.3l0.1-0.1v-0.3h0.4
					c0.1-0.1,0.3-0.2,0.3-0.2c0.1-0.1,0.2-0.1,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.3c0.1-0.1,0.3-0.2,0.4-0.3c0,0,0.3-0.2,0.5-0.3
					l0.2-0.1c0.3-0.2,0.6-0.4,1-0.5c0.1-0.1,0.2-0.1,0.3-0.1c0.1-0.1,0.1-0.1,0.3-0.1c0.2-0.1,0.4-0.2,0.6-0.3
					c0.1-0.1,0.2-0.1,0.3-0.1c0.1,0,0.1-0.1,0.2-0.1c0.1-0.1,0.2-0.1,0.3-0.1c0.1-0.1,0.3-0.1,0.5-0.2c0.1-0.1,0.3-0.1,0.5-0.2h0.1
					c0.2-0.1,0.3-0.1,0.5-0.2c0.2-0.1,0.3-0.1,0.5-0.2h0.1c0.1-0.1,0.3-0.1,0.5-0.1c0.1-0.1,0.3-0.1,0.5-0.1l0.2-0.1
					c0.1-0.1,0.3-0.1,0.4-0.1c0.1-0.1,0.3-0.1,0.5-0.1h0.1c0.2-0.1,0.3-0.1,0.5-0.1c0.2-0.1,0.4-0.1,0.6-0.1
					c1.2-0.3,2.5-0.5,3.7-0.5c0.8,0,1.6,0.1,2.5,0.2c2.9,0.4,5.9,1.5,9,3.3c15.7,9.1,28.5,33.5,28.5,54.4v25.4l-0.1-0.1
					c-0.3,1.1-1,2.1-2.3,2.8c-0.3,0.2-0.6,0.3-0.9,0.5c-0.3,0.1-0.5,0.2-0.6,0.3c-0.2,0.1-0.5,0.1-0.7,0.2c-0.3,0.1-0.7,0.2-1.1,0.3
					h-0.1c-0.2,0-0.4,0.1-0.6,0.1h-0.1c-0.2,0-0.4,0.1-0.5,0.1h-0.1c-0.2,0-0.4,0-0.6,0L123.1,101.2z"/>
			</g>
			<g>
				<path fill="#221F20" d="M91.2,14.5c0.8,0,1.5,0.1,2.4,0.2c2.8,0.4,5.7,1.4,8.8,3.2c15.5,9,28.2,33.1,28.2,53.9v24.3l0,0
					c0.1,1.2-0.6,2.5-2.1,3.4c-0.3,0.1-0.6,0.3-0.8,0.4c-0.2,0.1-0.4,0.1-0.6,0.3c-0.2,0.1-0.5,0.1-0.6,0.2c-0.3,0.1-0.6,0.1-1,0.2
					l0,0c-0.2,0.1-0.4,0.1-0.6,0.1c-0.1,0-0.1,0-0.1,0c-0.2,0-0.3,0.1-0.5,0.1c-0.1,0-0.1,0-0.1,0c-0.2,0-0.3,0-0.5,0
					c-0.1,0-0.1,0-0.1,0s-0.1,0-0.2,0s-0.3,0-0.4,0l0,0l0,0l0,0l0,0c-2.3-0.1-4.6-0.6-6.5-1.7c-2.3-1.3-3.3-3-3-4.6V70.9
					c0-13.2-8.1-28.6-17.9-34.3c-2.5-1.5-5-2.1-7.1-2.1c-0.3,0-0.5,0-0.8,0l0,0l0,0c-1.9,2.7-2.9,6.6-2.9,11.4v23.6
					c0.1,1.2-0.6,2.5-2.1,3.3c-0.3,0.1-0.6,0.3-0.8,0.4c-0.2,0.1-0.4,0.1-0.6,0.3c-0.2,0.1-0.5,0.1-0.6,0.2c-0.3,0.1-0.6,0.1-1,0.2
					l0,0C79.5,74,79.3,74,79.1,74C79,74,79,74,79,74c-0.2,0-0.3,0.1-0.5,0.1c-0.1,0-0.1,0-0.1,0c-0.2,0-0.3,0-0.5,0
					c-0.1,0-0.1,0-0.2,0s-0.1,0-0.1,0c-0.1,0-0.3,0-0.4,0l0,0l0,0c0,0,0,0-0.1,0l0,0c-2.3-0.1-4.6-0.6-6.5-1.7c-2.2-1.3-3.2-3-3-4.5
					V43.3c0-7,1.4-12.6,3.9-16.8l0,0c0,0,1-2.1,3.2-4.5c0.1-0.1,0.1-0.1,0.2-0.2c0.2-0.2,0.4-0.4,0.6-0.6s0.4-0.4,0.6-0.5
					c0.2-0.2,0.4-0.4,0.6-0.5c0.2-0.2,0.5-0.4,0.6-0.5s0.3-0.2,0.3-0.3c0.1-0.1,0.3-0.2,0.3-0.3l0,0c0.1-0.1,0.2-0.1,0.3-0.3
					l0.1-0.1c0.1-0.1,0.2-0.1,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.3c0.1-0.1,0.3-0.2,0.4-0.3c0.1-0.1,0.3-0.2,0.4-0.3
					c0.1,0,0.1-0.1,0.2-0.1c0.3-0.2,0.6-0.4,1-0.5c0.1-0.1,0.2-0.1,0.3-0.1c0.1-0.1,0.1-0.1,0.2-0.1c0.2-0.1,0.4-0.2,0.6-0.3
					c0.1-0.1,0.2-0.1,0.3-0.1c0.1,0,0.1-0.1,0.2-0.1c0.1-0.1,0.2-0.1,0.3-0.1c0.1-0.1,0.3-0.1,0.5-0.2c0.1-0.1,0.3-0.1,0.5-0.2l0,0
					c0.1-0.1,0.3-0.1,0.5-0.2l0,0c0.1-0.1,0.3-0.1,0.5-0.1c0,0,0,0,0.1,0c0.1-0.1,0.3-0.1,0.5-0.1c0.1-0.1,0.3-0.1,0.5-0.1
					c0.1,0,0.1,0,0.2-0.1s0.3-0.1,0.4-0.1c0.1-0.1,0.3-0.1,0.5-0.1c0.1,0,0.1,0,0.1,0c0.2-0.1,0.3-0.1,0.5-0.1
					c0.2-0.1,0.4-0.1,0.6-0.1C88.7,14.6,90,14.5,91.2,14.5 M91.2,13.3L91.2,13.3c-1.4,0-2.6,0.1-3.9,0.5c-0.2,0-0.4,0.1-0.5,0.1
					c-0.2,0-0.3,0.1-0.5,0.1c-0.1,0-0.1,0-0.1,0c-0.2,0-0.4,0-0.5,0c-0.1,0.1-0.3,0.1-0.5,0.1l-0.1,0.1H85c-0.2,0.1-0.3,0.1-0.5,0.1
					c-0.1,0.1-0.3,0.1-0.5,0.1l0,0l0,0l0,0c-0.2,0.1-0.3,0.1-0.5,0.2l0,0l0,0c-0.1,0.1-0.3,0.1-0.5,0.2l0,0
					c-0.1,0.1-0.3,0.1-0.5,0.2c-0.2,0.1-0.3,0.1-0.5,0.2c-0.1,0.1-0.2,0.1-0.3,0.1c-0.1,0-0.1,0.1-0.2,0.1c-0.1,0.1-0.2,0.1-0.3,0.1
					c-0.2,0.1-0.4,0.2-0.6,0.3c-0.1,0.1-0.1,0.1-0.3,0.1C80.2,16,80.1,16,80,16c-0.3,0.2-0.7,0.4-1,0.6l-0.1,0.1l-0.1,0.1l0,0l0,0
					c-0.1,0.1-0.3,0.1-0.4,0.2h-0.1l0,0l0,0c-0.1,0.1-0.3,0.2-0.4,0.3c-0.1,0.1-0.3,0.2-0.4,0.3c-0.1,0.1-0.3,0.1-0.3,0.3L77.1,18
					l0,0l0,0h-0.8v0.6c-0.1,0.1-0.2,0.1-0.3,0.2c-0.3,0.2-0.5,0.4-0.7,0.6c-0.3,0.2-0.5,0.4-0.6,0.6c-0.2,0.2-0.4,0.4-0.6,0.6
					s-0.4,0.4-0.6,0.6c-0.1,0.1-0.1,0.1-0.2,0.3c-2.2,2.4-3.2,4.5-3.4,4.8c-2.6,4.5-4,10.5-4,17.4v24.1c-0.3,2.1,1,4.2,3.5,5.7
					c1.7,1,3.7,1.6,5.9,1.8v0.1l1.2,0.1h0.1l0,0l0,0c0.1,0,0.3,0,0.4,0h0.1c0.1,0,0.1,0,0.2,0c0.2,0,0.4,0,0.5,0H78
					c0.1,0,0.1,0,0.1,0c0.2,0,0.4,0,0.6-0.1h0.1h0.1c0.2,0,0.4-0.1,0.6-0.1l0,0h0.1c0.4-0.1,0.8-0.1,1.2-0.3
					c0.3-0.1,0.5-0.1,0.7-0.2c0.3-0.1,0.5-0.2,0.7-0.3c0.4-0.1,0.7-0.3,1-0.5c1.9-1.1,2.8-2.7,2.7-4.5V46c0-4.1,0.8-7.7,2.4-10.2
					c0.1,0,0.1,0,0.1,0c2.1,0,4.2,0.6,6.5,2c9.5,5.5,17.4,20.5,17.4,33.2v23.4c-0.4,2.1,1,4.3,3.5,5.7c1.7,1,3.7,1.6,5.9,1.8v0.1
					l1.2,0.1h0.1l0,0c0.1,0,0.3,0,0.4,0s0.1,0,0.2,0s0.1,0,0.1,0c0.2,0,0.4,0,0.6,0h0.1h0.1c0.2,0,0.4,0,0.6-0.1h0.1h0.1
					c0.2,0,0.4-0.1,0.6-0.1l0,0l0,0l0,0h0.1c0.4-0.1,0.8-0.1,1.2-0.3c0.3-0.1,0.5-0.1,0.7-0.2c0.3-0.1,0.5-0.1,0.7-0.3
					c0.4-0.1,0.7-0.3,1-0.5c1.1-0.6,1.9-1.5,2.3-2.5l0.4,0.3v-2.2V72c0-10.3-3-21.5-8.4-31.9s-12.6-18.5-20.4-23
					c-3.2-1.8-6.3-3-9.2-3.4C92.9,13.3,92,13.3,91.2,13.3L91.2,13.3z"/>
			</g>
		</g>
		<path fill="#F8D466" d="M121.6,117.2v6.1l-35.7,46.5L68.8,160l44.6-58.3C118,104.4,121.6,111.3,121.6,117.2z"/>
		<g>
			<path fill="#221F20" d="M116.7,187.4c-1.1,0-2.3-0.3-3.5-1L60,155.6c-4.6-2.6-8.4-9.9-8.4-16V77.2c0-4.6,2.1-7.7,5.5-7.7
				c1.1,0,2.3,0.3,3.5,1l53.2,30.7c4.6,2.6,8.4,9.9,8.4,16v62.5C122.2,184.4,120,187.4,116.7,187.4z M57.1,70.7
				c-2.6,0-4.3,2.5-4.3,6.5v62.5c0,5.7,3.5,12.5,7.8,14.9l53.2,30.7c1,0.6,2,0.9,2.9,0.9c2.6,0,4.3-2.5,4.3-6.5v-62.5
				c0-5.7-3.5-12.5-7.8-14.9L60,71.6C59,71,58,70.7,57.1,70.7z"/>
		</g>
		<g>
			<g>
				<path fill="#F09938" d="M97.7,120.7c0,5-1.9,8.3-4.9,9V146c0,0.9-0.1,1.7-0.3,2.4c-0.8,2.4-2.8,3.2-5.2,1.8
					c-3.1-1.7-5.5-6.5-5.5-10.6v-16.3c-3-4.2-4.9-9.7-4.9-14.7c0-7.6,4.6-11.2,10.3-8c0.1,0,0.1,0.1,0.2,0.1
					C93,104,97.7,113,97.7,120.7z"/>
			</g>
			<g>
				<path fill="#221F20" d="M89.4,151.5c-0.8,0-1.7-0.3-2.5-0.8c-3.2-1.9-5.9-6.8-5.9-11.2v-16.1c-3.1-4.5-4.9-10-4.9-14.9
					c0-2.9,0.6-5.4,1.9-7.1c1.2-1.7,3-2.7,5-2.7c1.4,0,2.8,0.4,4.3,1.2c0.1,0,0.1,0.1,0.2,0.1c5.9,3.4,10.8,12.6,10.8,20.6
					c0,4.9-1.8,8.4-4.9,9.5V146c0,1-0.1,1.8-0.4,2.6C92.4,150.4,91.1,151.5,89.4,151.5z M83.1,100c-1.6,0-3,0.8-4.1,2.2
					c-1.1,1.5-1.7,3.7-1.7,6.4c0,4.7,1.8,10.1,4.8,14.3l0.1,0.1v16.5c0,3.9,2.3,8.4,5.2,10.1c0.6,0.4,1.3,0.6,1.9,0.6
					c1.1,0,2-0.7,2.5-2.1c0.2-0.6,0.3-1.4,0.3-2.2v-16.8l0.5-0.1c2.8-0.7,4.5-3.9,4.5-8.4c0-7.5-4.6-16.3-10.2-19.5
					c-0.1,0-0.1-0.1-0.1-0.1C85.4,100.4,84.2,100,83.1,100z"/>
			</g>
		</g>
		<g>
			<path fill="#221F20" d="M97.7,120.7c0,5-1.9,8.3-4.9,9V146c0,0.9-0.1,1.7-0.3,2.4c-2-2.3-3.4-5.7-3.4-8.8v-16.3
				c-3-4.2-4.9-9.7-4.9-14.7c0-3.8,1.1-6.6,3-8c0.1,0,0.1,0.1,0.2,0.1C93,104,97.7,113,97.7,120.7z"/>
		</g>
		<g>
			<g>
				<path fill="#D0D2D3" d="M130.5,71.7c0-20.8-12.6-44.8-28.2-53.9c-3.1-1.7-6-2.8-8.8-3.2c-2.1-0.3-4.1-0.2-6,0.3
					c-6.5,1-10.8,4.3-13.4,7.2c1.6-0.7,3.4-1.2,5.5-1.5c1.9-0.5,3.9-0.6,6-0.3c2.8,0.4,5.7,1.4,8.8,3.2c15.5,9,28.2,33.1,28.2,53.9
					v23.3c2.1,0.1,4.3-0.3,5.8-1.2c1.5-0.9,2.2-2.1,2.1-3.4l0,0L130.5,71.7L130.5,71.7z"/>
			</g>
			<g>
				<path fill="#D0D2D3" d="M87.4,34.4L87.4,34.4L87.4,34.4c-1.9,2.7-2.9,6.6-2.9,11.4v23.6c0.1,1.2-0.6,2.5-2.1,3.3
					c-0.3,0.1-0.6,0.3-0.8,0.4c-0.2,0.1-0.4,0.1-0.6,0.3c-0.2,0.1-0.5,0.1-0.6,0.2c-0.3,0.1-0.6,0.1-1,0.2l0,0
					c-0.8,0.1-1.7,0.2-2.6,0.2V51.4c0-4.8,1.1-8.7,2.9-11.4C80.6,38,84.4,34.8,87.4,34.4C87.3,34.4,87.3,34.4,87.4,34.4z"/>
			</g>
		</g>
	</g>
</g>
<g id="Layer_2_2_">
</g>
</svg>
`,mail:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="790.4px" height="622.9px" viewBox="0 0 790.4 622.9" enable-background="new 0 0 790.4 622.9" xml:space="preserve">
<g>
	<g>
		<polygon fill="#FFB21A" points="546.7,200.4 546.7,484.2 546.4,484.4 518.1,500.7 518.1,216.6 518.3,216.5 546.4,200.3 		"/>
		<g>
			<polygon fill="#FFB21A" points="518.3,216.6 518.3,500.7 191.6,312.1 191.6,28 192.9,28.8 518.1,216.5 			"/>
			
				<path fill="#FFC93E" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
				M517,500.4L191.8,312.7L312,247.1l21.6,39.6c7,12.9,23.2,17.7,36.1,10.6l28.1-15.3L517,500.4z"/>
			<path d="M519.1,216.6c-177.3,117.6-150.1,152.1-212,32.7C284.3,205.2,214.2,72,191.6,28C263.7,73.7,463,214,519.1,216.6z"/>
			
				<path fill="#FFC93E" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
				M518.1,216.5l-120.2,65.6l-24.1,13.2c-15.1,8.2-34.1,2.7-42.3-12.4l-4.8-8.9l-12.5-22.8l-2.2-4l-6.5-11.9L272,173.8l-79.1-145
				l167.2,96.6l70.9,40.9l18.3,10.5l26.3,15.2L518.1,216.5z"/>
			
				<polygon fill="#FFD67B" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
				191.6,28.1 518.1,216.6 546.4,200.3 220,11.8 			"/>
			<polygon fill="#F0F7FF" points="200,30.3 241.3,54.1 261.8,43.1 219.8,18.9 			"/>
			<polyline fill="#F0F7FF" points="284.5,56.6 264.8,68 251.8,60.5 271.6,49.1 			"/>
			<polygon fill="#F0F7FF" points="256.1,68 211.7,58.5 211.7,299.3 241.3,333.7 200.8,310.4 197.6,307 197.7,42.3 198.8,34.9 			
				"/>
			<path opacity="0.4" fill="#231F20" enable-background="new    " d="M720.2,372.2l-163.7-98.6v216.7l163.7-98.6
				C727.5,387.2,727.5,376.6,720.2,372.2z"/>
			<path fill="#231F20" d="M220.8,0.5L219.9,0l-38.5,22.2l-0.1,294.8v1l336,193.9l0.9,0.5l38.3-22.1l0.3-294.7l0-1L220.8,0.5z
				 M309,246.2L197.6,307l0.1-264.7L309,246.2z M198.8,34.9l314.6,181.6l-146.1,79.7c-11.1,6-24.9,2-30.9-9.1l-23.4-43l0,0
				L198.8,34.9z M311.1,250.2l20.6,37.7c7.6,14,25.1,19.1,39,11.5l26.2-14.3l110.2,202.1L200.8,310.4L311.1,250.2z M400.9,283
				l114.9-62.7v271.9l-1.2-0.7L400.9,283z M200,30.3l19.8-11.4L538,202.6L518.2,214L200,30.3z M520.3,217.9l2.1-1.2l0.2-0.1l0,0
				l17.7-10.2l-0.2,274.5l-19.8,11.4L520.3,217.9L520.3,217.9z"/>
		</g>
	</g>
</g>
</svg>
`,mailmultiple:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="790.4px" height="622.9px" viewBox="0 0 790.4 622.9" enable-background="new 0 0 790.4 622.9" xml:space="preserve">
<g>
	<g>
		<polygon fill="#FFB21A" points="587.9,207.9 587.9,475.4 587.6,475.6 560.9,491 560.9,223.2 561.1,223.1 587.6,207.8 		"/>
		<g>
			<polygon fill="#FFB21A" points="561.1,223.2 561.1,491 253.2,313.2 253.2,45.4 254.4,46.1 560.9,223.1 			"/>
			
				<path fill="#FFC93E" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
				M559.9,490.7l-306.5-177L366.7,252l20.4,37.4c6.6,12.2,21.9,16.7,34.1,10l26.5-14.4L559.9,490.7z"/>
			<path d="M561.9,223.2C394.8,334,420.4,366.5,362.1,254c-21.5-41.5-87.6-167-108.9-208.6C321.2,88.5,509.1,220.7,561.9,223.2z"/>
			
				<path fill="#FFC93E" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
				M560.9,223.1l-113.3,61.8l-22.7,12.4c-14.3,7.8-32.1,2.5-39.9-11.7l-4.6-8.4l-11.7-21.5l-2-3.7l-6.1-11.2l-31.6-58L254.4,46.1
				l157.6,91l66.8,38.6l17.2,9.9l24.8,14.3L560.9,223.1z"/>
			
				<polygon fill="#FFD67B" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
				253.2,45.5 560.9,223.2 587.6,207.8 279.9,30.1 			"/>
			<polygon fill="#F0F7FF" points="261.1,47.6 300,70 319.3,59.6 279.8,36.8 			"/>
			<polyline fill="#F0F7FF" points="340.7,72.4 322.2,83.1 309.9,76 328.6,65.2 			"/>
			<polygon fill="#F0F7FF" points="314,83.1 272.1,74.2 272.1,301.1 300,333.6 261.8,311.5 258.8,308.4 258.9,58.8 260,51.9 			"/>
			<path opacity="0.4" fill="#231F20" enable-background="new    " d="M751.4,369.8l-154.3-93v204.3l154.3-93
				C758.3,384,758.3,374,751.4,369.8z"/>
			<path fill="#231F20" d="M280.7,19.5l-0.8-0.5l-36.3,20.9l-0.1,277.9v1l316.7,182.8l0.8,0.5l36.1-20.9l0.2-277.8v-1L280.7,19.5z
				 M363.8,251.1l-105,57.3l0.1-249.5L363.8,251.1z M260,51.9l296.6,171.2l-137.8,75.1c-10.4,5.7-23.5,1.8-29.2-8.6l-22.1-40.5l0,0
				L260,51.9z M365.8,254.8l19.4,35.6c7.2,13.2,23.7,18,36.8,10.8l24.7-13.5l103.9,190.5L261.8,311.5L365.8,254.8z M450.5,285.7
				l108.4-59.1v256.3l-1.2-0.7L450.5,285.7z M261.1,47.6l18.7-10.8l299.9,173.1L561,220.7L261.1,47.6z M563,224.4l2-1.1l0.2-0.1l0,0
				l16.7-9.7l-0.2,258.7L563,483V224.4L563,224.4z"/>
		</g>
	</g>
</g>
<g>
	<g>
		<polygon fill="#FFB21A" points="531.3,236.2 531.3,503.7 531.1,503.8 504.4,519.2 504.4,251.5 504.5,251.4 531.1,236 		"/>
		<g>
			<polygon fill="#FFB21A" points="504.5,251.5 504.5,519.2 196.6,341.5 196.6,73.7 197.9,74.4 504.4,251.4 			"/>
			
				<path fill="#FFC93E" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
				M503.3,519L196.8,342l113.3-61.8l20.4,37.4c6.6,12.2,21.9,16.7,34.1,10l26.5-14.4L503.3,519z"/>
			<path d="M505.3,251.5c-167.1,110.8-141.5,143.3-199.8,30.8c-21.5-41.5-87.6-167-108.9-208.6C264.6,116.8,452.5,249,505.3,251.5z"
				/>
			
				<path fill="#FFC93E" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
				M504.4,251.4l-113.3,61.8l-22.7,12.4c-14.3,7.8-32.1,2.5-39.9-11.7l-4.6-8.4L312.2,284l-2-3.7L304,269l-31.6-58L197.9,74.4
				l157.6,91l66.8,38.6l17.2,9.9l24.8,14.3L504.4,251.4z"/>
			
				<polygon fill="#FFD67B" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
				196.6,73.8 504.4,251.5 531.1,236 223.4,58.4 			"/>
			<polygon fill="#F0F7FF" points="204.6,75.8 243.5,98.3 262.8,87.9 223.2,65.1 			"/>
			<polyline fill="#F0F7FF" points="284.2,100.6 265.6,111.3 253.3,104.3 272,93.5 			"/>
			<polygon fill="#F0F7FF" points="257.4,111.3 215.5,102.4 215.5,329.4 243.5,361.9 205.3,339.8 202.3,336.6 202.4,87.1 
				203.4,80.2 			"/>
			<path fill="#231F20" d="M224.1,47.8l-0.8-0.5L187,68.2L186.9,346v1l316.7,182.8l0.8,0.5l36.1-20.9l0.2-277.8v-1L224.1,47.8z
				 M307.3,279.4l-105,57.3l0.1-249.5L307.3,279.4z M203.4,80.2L500,251.3l-137.8,75.1c-10.4,5.7-23.5,1.8-29.2-8.6l-22-40.4l0,0
				L203.4,80.2z M309.3,283.1l19.4,35.6c7.2,13.2,23.7,18,36.8,10.8l24.7-13.5l103.9,190.5L205.3,339.8L309.3,283.1z M393.9,314
				l108.4-59.1v256.3l-1.2-0.7L393.9,314z M204.6,75.8L223.3,65l299.9,173.1L504.5,249L204.6,75.8z M506.5,252.7l2-1.1l0.2-0.1l0,0
				l16.7-9.7l-0.2,258.7l-18.7,10.8V252.7L506.5,252.7z"/>
		</g>
	</g>
</g>
<g>
	<g>
		<polygon fill="#FFB21A" points="474.7,273.9 474.7,541.4 474.5,541.5 447.8,557 447.8,289.2 448,289.1 474.5,273.7 		"/>
		<g>
			<polygon fill="#FFB21A" points="448,289.2 448,557 140,379.2 140,111.4 141.3,112.1 447.8,289.1 			"/>
			
				<path fill="#FFC93E" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
				M446.8,556.7l-306.5-177l113.3-61.8l20.4,37.4c6.6,12.2,21.9,16.7,34.1,10l26.5-14.4L446.8,556.7z"/>
			<path d="M448.8,289.2C281.7,400,307.3,432.5,249,319.9c-21.5-41.5-87.6-167-108.9-208.6C208.1,154.5,395.9,286.7,448.8,289.2z"/>
			
				<path fill="#FFC93E" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
				M447.8,289.1l-113.3,61.8l-22.7,12.4c-14.3,7.8-32.1,2.5-39.9-11.7l-4.6-8.4l-11.7-21.5l-2-3.7l-6.1-11.2l-31.6-58l-74.5-136.7
				l157.6,91l66.8,38.6l17.2,9.9l24.8,14.3L447.8,289.1z"/>
			
				<polygon fill="#FFD67B" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
				140,111.5 447.8,289.2 474.5,273.7 166.8,96.1 			"/>
			<polygon fill="#F0F7FF" points="148,113.5 186.9,136 206.2,125.6 166.7,102.8 			"/>
			<polyline fill="#F0F7FF" points="227.6,138.4 209,149.1 196.8,142 215.4,131.2 			"/>
			<polygon fill="#F0F7FF" points="200.9,149.1 159,140.1 159,367.1 186.9,399.6 148.7,377.5 145.7,374.3 145.8,124.8 146.8,117.9 
							"/>
			<path fill="#231F20" d="M167.5,85.5l-0.8-0.5l-36.3,20.9l-0.1,277.9v1L447,567.5l0.8,0.5l36.1-20.9l0.2-277.8v-1L167.5,85.5z
				 M250.7,317.1l-105,57.3l0.1-249.5L250.7,317.1z M146.8,117.9l296.6,171.2l-137.8,75.1c-10.4,5.7-23.5,1.8-29.2-8.6l-22.1-40.5
				l0,0L146.8,117.9z M252.7,320.8l19.4,35.6c7.2,13.2,23.7,18,36.8,10.8l24.7-13.5l103.9,190.5L148.7,377.5L252.7,320.8z
				 M337.4,351.7l108.4-59.1v256.3l-1.2-0.7L337.4,351.7z M148,113.5l18.7-10.8l299.9,173.1L448,286.6L148,113.5z M449.9,290.4
				l2-1.1l0.2-0.1l0,0l16.7-9.7l-0.2,258.7L449.9,549V290.4L449.9,290.4z"/>
		</g>
	</g>
</g>
</svg>
`,mobiledevice:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="824.7px" height="850.9px" viewBox="0 0 824.7 850.9" enable-background="new 0 0 824.7 850.9" xml:space="preserve">
<g>
	<path fill="#DCE9F9" d="M251.3,596.3v-56.6L216,519.4v53.6c0,20.6,16.7,46.9,37.3,58.8l14.5,8.3
		C257.7,626.2,251.3,610.2,251.3,596.3z"/>
	<g>
		<polygon fill="#CDD9EE" points="503.6,244.5 503.6,685.4 276.5,554.3 244.2,535.7 222.9,523.3 216,519.3 216,78.4 437.9,206.5 
			502.4,243.8 		"/>
		<polygon fill="#E6F0FF" points="314.1,574.7 281.9,556.1 260.5,543.7 253.6,539.8 253.6,100.1 216,78.4 216,519.3 222.9,523.3 
			244.2,535.7 276.5,554.3 503.6,685.4 503.6,684.1 		"/>
		<path fill="#6885A9" d="M538.5,197.2v521.7c0,9.1-3.3,15.5-8.6,18.9l-0.9,0.5l-34.5,19.9v0c5.7-3.3,9.2-9.8,9.2-19.2V217.3
			c0-20.6-16.7-46.9-37.3-58.8L300.4,62.7l-19.6-11.3l-27.5-15.9c-0.4-0.2-0.8-0.5-1.2-0.7c-0.4-0.2-0.8-0.4-1.2-0.6
			c-10.2-5.2-19.2-5.7-25.6-2.2v0l34.1-19.6l0.3-0.2c2.8-1.7,6.1-2.6,9.9-2.6c5.5,0,11.8,1.9,18.6,5.8l24.6,14.2l188.4,108.8
			C521.8,150.2,538.5,176.6,538.5,197.2z"/>
		<path fill="#B4C0D3" d="M503.6,244.5v-27.2c0-20.6-16.7-46.9-37.3-58.8l-213.1-123C232.7,23.6,216,30.6,216,51.2v27.2L503.6,244.5
			z"/>
		<path fill="#DCE9F9" d="M251.3,80.7c0-20.3,11.7-31.1,28.7-29.8l-26.8-15.5C232.7,23.6,216,30.6,216,51.2v27.2l35.4,20.4V80.7
			L251.3,80.7z"/>
		<path fill="#B4C0D3" d="M216,519.4v53.6c0,20.6,16.7,46.9,37.3,58.8l213.1,123c20.6,11.9,37.3,4.8,37.3-15.8v-53.6L216,519.4z"/>
		<path fill="#6885A9" d="M367.4,649.9c0,16.1-13.1,21.6-29.2,12.3c-16.1-9.3-29.2-29.9-29.2-46c0-16.1,13.1-21.6,29.2-12.3
			C354.4,613.2,367.4,633.8,367.4,649.9z"/>
		<path fill="#B0CAE2" d="M338.2,603.9c-3-1.7-5.9-3-8.7-3.7c14.9,9.9,26.5,29.1,26.5,44.3c0,13.1-8.6,19.2-20.5,16
			c0.9,0.6,1.8,1.2,2.7,1.7c16.1,9.3,29.2,3.8,29.2-12.3C367.4,633.8,354.4,613.2,338.2,603.9z"/>
		<path fill="#231F20" d="M352.8,668.9c-4.8,0-10.2-1.7-15.7-4.8c-16.7-9.6-30.3-31.1-30.3-47.9c0-11.6,6.6-19.1,16.8-19.1
			c4.8,0,10.2,1.7,15.7,4.8c16.7,9.6,30.3,31.1,30.3,47.9C369.6,661.5,363,668.9,352.8,668.9z M323.7,601.5
			c-7.8,0-12.4,5.5-12.4,14.7c0,15.4,12.6,35.2,28.1,44.1c4.8,2.8,9.4,4.2,13.5,4.2c7.8,0,12.4-5.5,12.4-14.7
			c0-15.4-12.6-35.2-28.1-44.1C332.3,603,327.7,601.5,323.7,601.5z"/>
		<path fill="#DCE9F9" d="M312.8,29.6l-2.2,5.7l-27.4,14.6l-2.3,1.4l-27.5-15.9c-0.4-0.2-0.8-0.5-1.2-0.7c-0.4-0.2-0.8-0.4-1.2-0.6
			c-10.2-5.2-19.2-5.7-25.6-2.2v0l34.1-19.6l0.3-0.2c2.8-1.7,6.1-2.6,9.9-2.6c5.5,0,11.8,1.9,18.6,5.8L312.8,29.6z"/>
		<path fill="#6885A9" d="M325.1,112.1c0,5.6-4.6,7.5-10.2,4.3c-5.6-3.2-10.2-10.4-10.2-16c0-5.6,4.6-7.5,10.2-4.3
			C320.6,99.3,325.1,106.5,325.1,112.1z"/>
		<path fill="#231F20" d="M320.1,120.4c-2,0-4.1-0.6-6.3-1.9c-6.4-3.7-11.4-11.6-11.4-18.1c0-4.9,3-8.3,7.5-8.3c2,0,4.1,0.6,6.3,1.9
			c6.4,3.7,11.4,11.6,11.4,18.1C327.5,117.1,324.5,120.4,320.1,120.4z M309.9,96.9c-1.8,0-2.7,1.2-2.7,3.5c0,4.8,4.1,11.2,9,14
			c1.4,0.8,2.8,1.3,3.9,1.3c1.8,0,2.7-1.2,2.7-3.5c0-4.8-4.1-11.2-9-14C312.4,97.3,311,96.9,309.9,96.9z"/>
		<path fill="#6885A9" d="M397.4,154.3c0,3.7-3,5-6.8,2.9l-46-26.6c-3.8-2.2-6.8-7-6.8-10.7l0,0c0-3.8,3-5,6.8-2.9l46,26.6
			C394.4,145.7,397.4,150.5,397.4,154.3L397.4,154.3z"/>
		<path fill="#231F20" d="M394,160.6c-1.5,0-3-0.5-4.6-1.4l-46-26.6c-4.5-2.6-8-8.2-8-12.8c0-3.8,2.3-6.3,5.8-6.3
			c1.5,0,3,0.5,4.6,1.4l46,26.6c4.5,2.6,8,8.2,8,12.8C399.8,158.1,397.5,160.6,394,160.6z M341.2,118.3c-0.4,0-1,0-1,1.5
			c0,2.9,2.6,6.9,5.6,8.6l46,26.6c0.8,0.5,1.6,0.7,2.2,0.7c0.4,0,1,0,1-1.5c0-2.9-2.6-6.9-5.6-8.6l-46-26.6
			C342.6,118.6,341.8,118.3,341.2,118.3z"/>
		<path opacity="0.4" fill="#000000" enable-background="new    " d="M746.2,567.7c-32-17.6-198.3-100-198.3-100v251.1c0,8.7-2.5,15.9-7.2,21
			c-1.2,1.4-2.5,2.6-4.1,3.6l-0.7,0.4c0,0,0,0,0,0c-0.1,0-0.1,0.1-0.2,0.1l-10.6,6.1c0,0,193.8-102.3,226.7-121.7
			C784.8,608.9,789.6,591.5,746.2,567.7z"/>
		<polygon fill="#FFFFFF" points="501.2,246.1 231.1,525.2 225.4,522 225.4,429.6 438.4,209.7 		"/>
		<polygon fill="#FFFFFF" points="501,277.1 501.1,328.8 282.7,554.8 251.3,536.7 		"/>
		<polygon fill="#DCE9F9" points="296.8,57.8 323.3,42.7 335.4,49.7 309.9,65.4 		"/>
		<path fill="#231F20" d="M509.6,130.9L509.6,130.9L296,7.5C295,6.8,284.2,0,271.7,0c-3.9,0-7.6,0.7-11,2l-35.8,20.3
			c-2.1,0.9-17,7.8-16.3,28.9l0,521.8c0,0.6,0.4,14.8,5.8,25.2c0.5,0.9,1,1.9,1.4,2.9c4.9,9.9,11.1,22.3,29,35.2l0.1,0.1L463.7,763
			c1,0.6,11.3,7.1,23.5,7.1c0,0,0,0,0,0c6.2,0,11.8-1.7,16.7-5L537,746c0.5-0.3,12.1-6.8,13.1-23.4l0.2-19.3V202
			C550.6,198.9,553.6,161.2,509.6,130.9z M533.4,718.9c0,4.3-0.9,10-5.1,12.7l-22.8,13.1h0c0-0.1,0-0.3,0.1-0.4
			c0.1-0.4,0.1-0.7,0.2-1.1c0-0.3,0.1-0.5,0.1-0.8c0-0.3,0.1-0.5,0.1-0.8c0-0.4,0.1-0.9,0.1-1.3c0-0.4,0-0.9,0-1.3V217.3
			c0-21.3-17.3-48.6-38.5-60.9l-213.1-123c-0.4-0.2-0.8-0.5-1.2-0.7c-0.2-0.1-0.3-0.2-0.5-0.3c-0.1-0.1-0.3-0.1-0.4-0.2
			c-0.1-0.1-0.3-0.1-0.4-0.2c-0.6-0.3-1.2-0.6-1.8-0.9c-0.5-0.2-1-0.4-1.5-0.6c-0.6-0.3-1.3-0.5-1.9-0.8c-0.1,0-0.2-0.1-0.3-0.1
			c-0.1,0-0.2-0.1-0.3-0.1l0,0l19.3-11.1c0,0,0.1,0,0.1-0.1c1.7-1,3.7-1.5,6.2-1.5c4.4,0,9.5,1.7,15,4.8l213.1,123
			c18.2,10.5,33.7,34.6,33.7,52.6V718.9L533.4,718.9z M225.3,522V86.6l275.8,159.2v435.4L225.3,522z M501.1,686.8V739
			c0,0.6,0,1.1,0,1.7c0,0.4,0,0.7-0.1,1.1c0,0.1,0,0.2,0,0.3c-0.1,0.9-0.2,1.7-0.4,2.5c0,0.1,0,0.1,0,0.2c-0.2,1.2-0.5,2.3-0.9,3.3
			l0,0l-6.1,3.5c-1.7,1-4,1.5-6.6,1.5c-4.6,0-9.7-1.6-14.9-4.6L259,625.5c-18.3-10.5-33.7-34.6-33.7-52.6v-45.4L501.1,686.8z
			 M225.3,81.1V51.2c0-4.1,0.8-9.4,4.5-12.3c0,0,0,0,0.1-0.1c0.2-0.1,0.4-0.3,0.6-0.4c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0.2-0.1,0.4-0.2
			c0.1-0.1,0.2-0.1,0.3-0.2l0.2-0.1c0.4-0.2,0.7-0.4,1.1-0.7c3.5-1.8,9.9-4.2,16.1-1.5c0.4,0.2,0.8,0.4,1.3,0.6l0.3,0.1
			c0.2,0.1,0.4,0.2,0.6,0.3c0.1,0.1,0.3,0.1,0.4,0.2c0.2,0.1,0.5,0.3,0.7,0.4l213.1,123c1.9,1.1,3.7,2.3,5.5,3.6
			c17.3,12.6,30.6,35.2,30.6,53.1v23.1L225.3,81.1z"/>
	</g>
</g>
</svg>
`,office:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="51.2px" height="75.6px" viewBox="0 0 51.2 75.6" enable-background="new 0 0 51.2 75.6" xml:space="preserve">
<polygon id="Shadow" fill="#767776" points="31.3,71.8 24.6,71.8 25,44.2 51.2,59.8 "/>
<path fill="#4C934E" stroke="#010202" stroke-width="2" stroke-miterlimit="10" d="M26.5,70.7l14.6-8.8V14.7L24.5,4.8L8,14.7v34.4
	c-0.6-0.9-1.3-1.4-1.8-1.4c-0.4,0-0.8,0.3-1.2,0.7l0,0c-0.1,0.1-0.2,0.2-0.3,0.4l0,0c-0.1,0.1-0.2,0.3-0.3,0.4v0.1
	c-0.1,0.1-0.2,0.3-0.3,0.4c0,0,0,0.1-0.1,0.1c-0.1,0.1-0.1,0.3-0.2,0.4c0,0.1-0.1,0.1-0.1,0.2c-0.1,0.1-0.1,0.3-0.2,0.4
	c0,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.1,0.3-0.2,0.4c0,0.1-0.1,0.2-0.1,0.3S3,52,3,52.2c0,0.1-0.1,0.3-0.1,0.4c0,0.1-0.1,0.2-0.1,0.3
	c0,0.2-0.1,0.3-0.1,0.5c0,0.1,0,0.2-0.1,0.3c0,0.2-0.1,0.4-0.1,0.5s0,0.2,0,0.3c0,0.2,0,0.4-0.1,0.6c0,0.1,0,0.2,0,0.3
	c0,0.3,0,0.6,0,0.9c0,0.3,0,0.5,0,0.8v0.1c0,0.1,0,0.1,0,0.2c0,0.2,0,0.3,0.1,0.4c0,0.1,0,0.1,0,0.2v0.1c0,0.1,0.1,0.2,0.1,0.3
	s0,0.1,0.1,0.2c0,0.1,0.1,0.3,0.2,0.4v0.1c0,0,0,0.1,0.1,0.1v0.1c0,0.1,0.1,0.2,0.1,0.2s0,0,0,0.1v0.1c0,0,0,0.1,0.1,0.1
	c0,0.1,0.1,0.1,0.1,0.2l0.1,0.1c0.1,0.1,0.1,0.2,0.2,0.2l0.1,0.1l0.1,0.1l0,0l0,0l0.1,0.1c0.1,0,0.1,0.1,0.2,0.1l0,0c0,0,0,0,0.1,0
	l0,0c0.1,0.1,0.2,0.1,0.3,0.2c0,0,0.1,0,0.1,0.1c0.1,0,0.1,0.1,0.2,0.1l0,0h0.1l0,0l0,0v1.7C5.2,63.6,5.5,64,6,64h0.4h0.1
	c0.4,0,0.8-0.4,0.8-0.8v-1.8C7.5,61.3,7.8,61.2,8,61v0.9l12.4,7.4c0,0.1,0.1,0.2,0.1,0.2c0.4,1,1.2,1.9,2.3,2.3l0,0v1.7
	c0,0.4,0.4,0.8,0.8,0.8H24h0.1c0.4,0,0.8-0.4,0.8-0.8v-1.8L26.5,70.7"/>
<g id="Structure">
	<g>
		<polygon fill="#FFFFFF" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="24.6,24.7 8,14.7 24.5,4.8 
			41.1,14.7 		"/>
	</g>
	<polygon fill="#E2E2E1" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="8,14.7 8,61.9 24.6,71.8 24.6,24.7 	
		"/>
	<polygon fill="#959596" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="41.1,14.7 41.1,61.9 24.6,71.8 
		24.6,24.7 	"/>
</g>
<g id="Windows">
	<g id="Window">
		<polygon fill="#7E95AC" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="8,16.7 8,21.9 24.6,31.8 24.6,26.7 
					"/>
		<polyline fill="#4A658B" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="24.6,26.7 41.1,16.7 41.1,21.9 
			24.6,31.8 		"/>
	</g>
	<g id="Window_1_">
		<polygon fill="#7E95AC" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="8,24.3 8,29.4 24.6,39.4 24.6,34.2 
					"/>
		<polyline fill="#4A658B" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="24.6,34.2 41.1,24.3 41.1,29.4 
			24.6,39.4 		"/>
	</g>
	<g id="Window_2_">
		<polygon fill="#7E95AC" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="8,31.8 8,37 24.6,46.9 24.6,41.8 		
			"/>
		<polyline fill="#4A658B" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="24.6,41.8 41.1,31.8 41.1,37 
			24.6,46.9 		"/>
	</g>
	<g id="Window_3_">
		<polygon fill="#7E95AC" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="8,39.4 8,44.5 24.6,54.5 24.6,49.3 
					"/>
		<polygon fill="#4A658B" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="24.6,49.3 41.1,39.4 41.1,44.5 
			24.6,54.5 		"/>
	</g>
	<g id="Window_4_">
		<polygon fill="#7E95AC" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="8,46.9 8,52.1 24.6,62 24.6,56.9 		
			"/>
		<polyline fill="#4A658B" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="24.6,56.9 41.1,46.9 41.1,52.1 
			24.6,62 		"/>
	</g>
	<g id="Reflections">
		<g>
			<polygon fill="#A2C2DC" points="17.8,27.7 18.4,22.9 10.9,18.4 10.9,18.4 10.3,23.2 			"/>
			<polygon fill="#A2C2DC" points="16.9,34.8 17.5,30 17.5,30 10,25.5 10,25.5 9.4,30.3 			"/>
			<polygon fill="#A2C2DC" points="16,41.8 16.6,37 16.6,37 9.1,32.5 9.1,32.5 8.5,37.3 			"/>
			<polygon fill="#A2C2DC" points="15.2,48.8 15.8,44 15.8,44 8.3,39.5 8.3,39.5 8,41.4 8,44.5 			"/>
			<polygon fill="#A2C2DC" points="8,52.1 14.3,55.8 14.3,55.8 14.9,51 14.9,51 8,46.9 			"/>
		</g>
		<g>
			<polygon fill="#A2C2DC" points="23.5,26 20,23.9 19.4,28.7 22.9,30.8 			"/>
			<polygon fill="#A2C2DC" points="22.6,33 19.1,30.9 18.5,35.7 22,37.8 			"/>
			<polygon fill="#A2C2DC" points="21.7,40 18.2,37.9 17.6,42.7 21,44.8 			"/>
			<polygon fill="#A2C2DC" points="20.8,47 17.3,44.9 16.7,49.7 20.1,51.8 			"/>
			<polygon fill="#A2C2DC" points="19.9,54 16.4,52 15.8,56.7 19.2,58.8 			"/>
		</g>
	</g>
</g>
<g id="Trees">
	<g id="Tree">
		<g>
			<path fill="#6C6054" d="M23.6,74.5c-0.5,0-0.9-0.4-0.9-0.9v-1.9l0.2,0.1c0.6,0.2,1,0.2,1,0.2s0.4,0,1-0.2l0.2-0.1v1.9
				c0,0.5-0.4,0.9-0.9,0.9H23.6z"/>
			<path fill="#010202" d="M24.9,71.9v1.8c0,0.4-0.4,0.8-0.8,0.8h-0.5c-0.4,0-0.8-0.4-0.8-0.8v-1.8c0.6,0.2,1.1,0.3,1.1,0.3
				S24.3,72.1,24.9,71.9 M22.5,71.5v0.4v1.8c0,0.6,0.5,1,1,1H24c0.6,0,1-0.5,1-1v-1.8v-0.4l-0.3,0.1c-0.5,0.2-1,0.2-1,0.2
				s-0.4,0-1-0.2L22.5,71.5L22.5,71.5z"/>
		</g>
		<path fill="#A3998E" d="M24.3,72c-0.3,0.1-0.5,0.1-0.5,0.1s-0.4,0-0.8-0.2c-0.1,0-0.1,0-0.2,0v1.7c0,0.4,0.4,0.8,0.8,0.8H24
			c0.2-0.2,0.4-0.4,0.4-0.7V72H24.3z"/>
		<g>
			<path fill="#234C29" d="M23.8,72.2c0,0-3.9-0.2-3.9-5.4c0-4.8,2.4-8.7,3.9-8.7s3.9,3.9,3.9,8.7C27.8,72.1,23.9,72.2,23.8,72.2
				L23.8,72.2L23.8,72.2z"/>
			<path fill="#010202" d="M23.8,58.2c1.4,0,3.8,3.8,3.8,8.6c0,5.2-3.8,5.3-3.8,5.3S20,72,20,66.8C20,62,22.4,58.2,23.8,58.2
				 M23.8,57.9c-1.6,0-4.1,4-4.1,8.9c0,5.4,4,5.6,4,5.6c0.1,0,4.1-0.2,4.1-5.6C27.9,61.9,25.4,57.9,23.8,57.9L23.8,57.9z"/>
		</g>
		<path fill="#3E7D3E" d="M20,66.8c0,4.8,3.2,5.3,3.7,5.3c1.2-0.5,2.9-1.9,2.9-5.4c0-3.8-1.4-7-2.7-8.5c0,0,0,0-0.1,0
			C22.4,58.2,20,62,20,66.8z"/>
		<path fill="#4C934E" d="M23.3,72c1-1.2,1.9-3.1,1.9-6.2c0-2.9-0.5-5.5-1.3-7.6C22.4,58.3,20,62,20,66.8C20,70.7,22.2,71.7,23.3,72
			z"/>
	</g>
	<g id="Tree_2_">
		<g>
			<path fill="#6C6054" d="M6,64.1c-0.5,0-0.9-0.4-0.9-0.9v-1.9l0.2,0.1c0.6,0.2,1,0.2,1,0.2s0.4,0,1-0.2l0.2-0.1v1.9
				c0,0.5-0.4,0.9-0.9,0.9H6z"/>
			<path fill="#010202" d="M7.3,61.4v1.8c0,0.4-0.4,0.8-0.8,0.8H6c-0.4,0-0.8-0.4-0.8-0.8v-1.8c0.6,0.2,1.1,0.3,1.1,0.3
				S6.7,61.6,7.3,61.4 M4.9,61v0.4v1.8c0,0.6,0.5,1,1,1h0.5c0.6,0,1-0.5,1-1v-1.8V61l-0.3,0.1c-0.5,0.2-1,0.2-1,0.2s-0.4,0-1-0.2
				L4.9,61L4.9,61z"/>
		</g>
		<path fill="#A3998E" d="M6.7,61.6c-0.3,0.1-0.5,0.1-0.5,0.1s-0.4,0-0.8-0.2c-0.1,0-0.1,0-0.2,0v1.7C5.2,63.6,5.5,64,6,64h0.4
			c0.2-0.2,0.4-0.4,0.4-0.7v-1.7H6.7z"/>
		<g>
			<path fill="#234C29" d="M6.2,61.8c0,0-3.9-0.2-3.9-5.4c0-4.8,2.4-8.7,3.9-8.7s3.9,3.9,3.9,8.7C10.2,61.6,6.3,61.8,6.2,61.8
				L6.2,61.8L6.2,61.8z"/>
			<path fill="#010202" d="M6.2,47.7c1.4,0,3.8,3.8,3.8,8.6c0,5.2-3.8,5.3-3.8,5.3s-3.8-0.1-3.8-5.3C2.4,51.5,4.8,47.7,6.2,47.7
				 M6.2,47.5c-1.6,0-4.1,4-4.1,8.9c0,5.4,4,5.6,4,5.6c0.1,0,4.1-0.2,4.1-5.6C10.3,51.5,7.8,47.5,6.2,47.5L6.2,47.5z"/>
		</g>
		<path fill="#3E7D3E" d="M2.4,56.3c0,4.8,3.2,5.3,3.7,5.3C7.4,61.1,9,59.8,9,56.2c0-3.8-1.4-7-2.7-8.5c0,0,0,0-0.1,0
			C4.8,47.7,2.4,51.5,2.4,56.3z"/>
		<path fill="#4C934E" d="M5.7,61.6c1-1.2,1.9-3.1,1.9-6.2c0-2.9-0.5-5.5-1.3-7.6c-1.4,0.1-3.8,3.8-3.8,8.6
			C2.4,60.3,4.6,61.3,5.7,61.6z"/>
	</g>
</g>
<g id="Doorway">
	<polygon id="Outline_3_" display="none" fill="#FFFFFF" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="
		17.7,61.2 17.7,59.6 12.4,56.4 9.1,59.5 9.1,60 14.5,63.2 	"/>
	<polygon fill="#4A658B" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="12.4,58 12.4,64.4 17.7,67.6 
		17.7,61.2 	"/>
	<polygon display="none" fill="#6C6C6C" points="17.7,59.6 17.7,61.2 14.5,63.2 14.5,62.7 	"/>
	<polygon display="none" fill="#9E9E9E" points="9.1,59.5 9.1,60 14.5,63.2 14.5,62.7 	"/>
	<polygon id="_x3C_Path_x3E_" display="none" fill="#FFFFFF" points="14.5,62.7 9.1,59.5 12.4,56.4 17.7,59.6 	"/>
</g>
<g id="Rooftop">
	<polygon fill="#EAEAEA" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="24.6,22 12.5,14.7 24.5,7.5 
		36.7,14.7 	"/>
	<polygon fill="#959596" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="12.5,14.7 12.5,14.7 14,15.6 
		24.6,9.2 24.6,7.5 24.6,7.5 	"/>
	<polygon fill="#E2E2E1" stroke="#010202" stroke-width="0.25" stroke-miterlimit="10" points="36.7,14.7 36.7,14.7 35.2,15.6 
		24.6,9.2 24.6,7.5 24.6,7.5 	"/>
</g>
</svg>
`,"package-module":`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="201.10001px" height="200.8px" viewBox="0 0 201.10001 200.8" enable-background="new 0 0 201.10001 200.8"
	 xml:space="preserve">
<g id="Layer_1_1_">
	<g id="Layer_3">
		<polygon opacity="0.4" fill="#000000" enable-background="new    " points="100.5,186.5 128.5,186.5 201.10001,144.3 169.10001,126.7 		"/>
	</g>
	<polygon fill="#FAD9A3" points="100.5,97.7 32,56.5 100.3,15.4 169.10001,56.5 	"/>
	<g id="Window">
		<polygon fill="#E2BF80" stroke="#000000" stroke-miterlimit="10" points="32,56.5 32,141.89999 100.5,183 100.5,97.7 		"/>
	</g>
	<g id="Window_1_">
		<polygon fill="#B68C69" stroke="#000000" stroke-miterlimit="10" points="169.10001,56.5 169.10001,141.89999 100.5,183 
			100.5,97.7 		"/>
	</g>
	<g id="Window_3_">
		<path fill="#CEA76A" stroke="#000000" stroke-miterlimit="10" d="M71.1,144.8v11.5c0,1.10001,0.6,2.10001,1.5,2.60001l18.8,11.3
			c0.9,0.60001,2.1-0.10001,2.1-1.2v-12c0-0.89999-0.5-1.7-1.2-2.2l-18.8-11.3C72.4,142.89999,71.1,143.60001,71.1,144.8z"/>
	</g>
	<g>
		<path id="Outline" fill="#000000" d="M100.3,15.4l68.8,41.1v85.39999L100.5,183L32,141.89999V56.5L100.3,15.4 M100.3,11.9l-1.5,0.9L30.5,53.9
			L29,54.8v1.7v85.39999v1.7l1.5,0.89999L99,185.60001l1.5,0.89999l1.5-0.89999l68.5-41.2l1.5-0.89999v-1.7V56.5v-1.7l-1.5-0.9
			l-68.8-41.1L100.3,11.9L100.3,11.9z"/>
	</g>
	<g>
		<g id="Tape">
			<polygon fill="#DEB68B" points="123.9,29.1 55.5,70.3 55.5,104 71.5,113.2 71.5,79.9 140.10001,38.7 			"/>
			<polygon fill="#B68C69" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" points="71.5,113.2 71.5,79.9 55.5,70.3 
				55.5,104 			"/>
		</g>
		<polygon fill="none" stroke="#000000" stroke-miterlimit="10" points="123.9,29.1 55.5,70.3 55.5,104 71.5,113.2 71.5,79.9 
			140.10001,38.7 		"/>
	</g>
</g>
<g id="Layer_2_1_">
</g>
</svg>
`,paymentcard:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="659.70001px" height="441.5px" viewBox="0 0 659.70001 441.5" enable-background="new 0 0 659.70001 441.5"
	 xml:space="preserve">
<g id="Layer_1_1_" display="none">
	<polygon display="inline" fill="none" stroke="#A7A9AC" stroke-width="4" stroke-miterlimit="10" points="551.5,364 336,488.39999 
		120.6,364 120.6,115.2 336,-9.1 551.5,115.2 	"/>
</g>
<g id="Layer_2_1_">
	<g>
		<g>
			<path fill="#05486D" d="M627.5,194.8v27.10001l0,0c0,2-1.20001,3.8-3.59998,5.2L291.60001,419
				c-1.10001,0.60001-2.29999,1.10001-3.60001,1.39999c-5.39999,1.39999-12.5,0.60001-17.60001-2.29999L49.7,290.70001
				c-3.5-2-5.3-4.70001-5.2-7.10001V257.5l0,0c0.1,2.39999,1.8,4.79999,5.2,6.79999l220.7,127.39999
				c6.29999,3.60001,15.70001,4,21.20001,0.89999l13.10001-7.60001l319.20001-184.3C626.59998,199.10001,627.79999,197,627.5,194.8
				L627.5,194.8z"/>
		</g>
		<g>
			<path fill="#31A8F7" d="M270.39999,391.70001c3.29999,3.60001,7.39999,20,0,26.5l-220.7-127.5c-3.5-2-5.3-4.70001-5.2-7.10001
				V257.5l0,0c0.1,2.39999,1.8,4.79999,5.2,6.79999L270.39999,391.70001"/>
		</g>
		<g>
			<path fill="#2582CE" d="M623.90002,200.7L620.30005,202.8L550,243.3l-30,17.3l-149.89999,86.5L291.5,392.5
				c-5.39999,3.10001-14.89999,2.70001-21.10001-0.89999L77.6,280.39999l-27.9-16.10001c-6.3-3.60001-6.9-9.10001-1.5-12.2
				L171.2,181l30-17.3l70.2-40.6l109-62.9c5.39999-3.1,14.89999-2.7,21.20001,0.9l220.69998,127.4
				C628.59998,192.10001,629.29999,197.60001,623.90002,200.7z"/>
		</g>
		<path fill="#31A8F7" d="M520,260.70001l-149.89999,86.5L77.6,280.39999l-27.9-16.10001c-6.3-3.60001-6.9-9.10001-1.5-12.2
			L171.2,181L520,260.70001z"/>
		<polygon fill="#31A8F7" points="620.29999,202.8 550,243.3 201.3,163.7 271.5,123.1 		"/>
		<g>
			<path fill="#231F20" d="M282.39999,396.70001c-4.70001,0-9.39999-1.20001-13-3.29999L48.7,266
				c-3.9-2.29999-6.2-5.39999-6.2-8.60001c0-2.8,1.7-5.3,4.7-7L379.5,58.4c2.70001-1.5,6.29999-2.4,10.20001-2.4
				c4.70001,0,9.39999,1.2,13,3.3L623.40002,186.7c3.90002,2.3,6.20001,5.39999,6.20001,8.60001c0,2.8-1.70001,5.3-4.70001,7
				L292.60001,394.29999C289.89999,395.79999,286.29999,396.70001,282.39999,396.70001z M389.70001,60.1
				c-3.20001,0-6.10001,0.7-8.20001,1.8L49.2,253.8c-1.2,0.7-2.7,1.89999-2.7,3.59999c0,1.70001,1.6,3.70001,4.2,5.20001
				L271.39999,390c3,1.70001,7,2.70001,11,2.70001c3.20001,0,6.10001-0.70001,8.20001-1.79999L622.90002,199
				c1.20001-0.7,2.70001-1.89999,2.70001-3.60001c0-1.7-1.59998-3.7-4.20001-5.2L400.60001,62.8
				C397.70001,61.1,393.70001,60.1,389.70001,60.1z"/>
		</g>
		<g>
			<polygon fill="#FF9600" points="308.70001,248.89999 206,308.10001 135.10001,267.20001 117.1,256.79999 219.8,197.60001 
				268.70001,225.8 			"/>
		</g>
		<g>
			<path fill="#FFE42A" d="M383.39999,119.3c-18,10.39999-19.89999,26.10001-4.39999,35c15.60001,9,42.70001,7.89999,60.70001-2.5
				s19.89999-26.1,4.39999-35C428.5,107.8,401.29999,108.9,383.39999,119.3z"/>
		</g>
		<g>
			<polygon fill="#00579E" points="468.10001,256.29999 271.10001,370 253.8,360 450.79999,246.3 			"/>
		</g>
		<g>
			<path fill="#FFC600" d="M268.70001,225.8c-26.2,27.39999-63.10001,44.40001-104,44.40001c-10.10001,0-20-1-29.5-3l-18-10.39999
				l102.60001-59.3L268.70001,225.8z"/>
		</g>
		<g>
			<path fill="#FFE42A" d="M182.60001,236.39999c-18,10.39999-19.89999,26.10001-4.39999,35s42.7,7.89999,60.7-2.5
				s19.90001-26.10001,4.39999-35C227.7,224.89999,200.60001,226,182.60001,236.39999z"/>
		</g>
		<g>
			<path fill="#231F20" d="M389.70001,58.1c4.20001,0,8.5,1,12,3l220.70001,127.4c3.20001,1.8,4.90002,4.10001,5.09998,6.3l0,0
				v27.10001l0,0c0,2-1.20001,3.8-3.59998,5.2L291.60001,419c-1.10001,0.60001-2.29999,1.10001-3.60001,1.39999
				c-1.70001,0.5-3.60001,0.70001-5.60001,0.70001c-4.20001,0-8.5-1-12-3L49.7,290.70001c-3.5-2-5.3-4.70001-5.2-7.10001V257.5l0,0
				l0,0c-0.1-2,1.1-4,3.6-5.5L380.5,60.2C382.89999,58.8,386.20001,58.1,389.70001,58.1 M389.70001,48.1L389.70001,48.1
				c-5.39999,0-10.29999,1.2-14.20001,3.5L43.2,243.39999c-5.2,3-8.4,8-8.6,13.39999c0,0.20001,0,0.5,0,0.79999v26
				c-0.2,6.29999,3.5,12.10001,10.2,15.89999l220.7,127.39999c4.79999,2.79999,10.89999,4.29999,17,4.29999
				c2.79999,0,5.60001-0.29999,8.10001-1c2.20001-0.60001,4.20001-1.39999,6-2.39999l0,0l332.30002-191.89999
				c5.09998-3,8.20001-7.60001,8.59998-12.8c0-0.39999,0.09998-0.7,0.09998-1.10001v-27.10001
				c0-0.89999-0.09998-1.8-0.29999-2.60001c-1.09998-4.89999-4.5-9.3-9.79999-12.39999L406.60001,52.4
				C401.79999,49.6,395.79999,48.1,389.70001,48.1L389.70001,48.1z"/>
		</g>
		<g>
			<path fill="#FFE42A" d="M625.5,199.5l0.09998-0.10001C625.59998,199.5,625.5,199.5,625.5,199.5z"/>
		</g>
		<g>
			<path fill="#00579E" d="M298.89999,301.10001c4.39999,2.5,4.79999,6.29999,1.10001,8.5l-53,30.60001
				c-3.8,2.20001-10.39999,1.89999-14.7-0.60001l-9.3-5.29999c-4.39999-2.5-4.8-6.29999-1.10001-8.5l53-30.60001
				c3.79999-2.20001,10.39999-1.89999,14.70001,0.60001L298.89999,301.10001z"/>
			<path fill="#00579E" d="M377.89999,255.5c4.39999,2.5,4.79999,6.29999,1.10001,8.5l-53,30.60001
				C322.20001,296.80002,315.60001,296.5,311.29999,294L302,288.60001c-4.39999-2.5-4.79999-6.29999-1.10001-8.5l53-30.60001
				c3.79999-2.2,10.39999-1.89999,14.70001,0.60001L377.89999,255.5z"/>
			<path fill="#00579E" d="M456.89999,209.89999c4.39999,2.5,4.79999,6.3,1.10001,8.5L405,249
				c-3.79999,2.2-10.39999,1.89999-14.70001-0.60001L381,243c-4.39999-2.5-4.79999-6.3-1.10001-8.5l53-30.60001
				c3.79999-2.2,10.39999-1.89999,14.70001,0.60001L456.89999,209.89999z"/>
			<path fill="#00579E" d="M535.90002,164.3c4.40002,2.5,4.79999,6.3,1.09998,8.5l-53,30.60001
				c-3.79999,2.2-10.39999,1.89999-14.70001-0.60001L460,197.40001c-4.39999-2.5-4.79999-6.3-1.10001-8.5l53-30.60001
				c3.80002-2.2,10.39999-1.89999,14.69998,0.60001L535.90002,164.3z"/>
		</g>
	</g>
</g>
</svg>
`,plane:'<?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 248.44 254.73"><defs><clipPath id="clippath"><path id="Fuselage-2" d="M114.24,74.77c-7.54-2.93-40.09-13.55-51.95-16.94s-9.64,1.53-4.52,7.34c0,0,10.52,14.71,18.25,23.47,7.73,8.76,18.32,20.72,24.67,26.22s97.87,57.92,97.87,57.92c0,0,37.84,12.42,45.74,6.78,7.91-5.65-27.76-43.55-27.76-43.55l-102.29-61.25Z" fill="none"/></clipPath><clipPath id="clippath-1"><ellipse id="Intake-2" cx="205.32" cy="113.74" rx="12.26" ry="8.17" transform="translate(31.75 271.74) rotate(-71.3)" fill="none"/></clipPath><clipPath id="clippath-2"><ellipse id="Intake-6" cx="140.4" cy="163.21" rx="12.26" ry="8.17" transform="translate(-59.21 243.85) rotate(-71.3)" fill="none"/></clipPath><clipPath id="clippath-3"><path id="RightWing-3" d="M123.14,121.93L25.5,155.52s14.95,4.75,18.3,4.41,127.28-10.61,127.28-10.61l-47.93-27.39Z" fill="none"/></clipPath></defs><path id="Shadow" d="M64.66,119.61l13.07-12.26s4.59,1.57,3.97,4.59l-6.23,25.57,1,1.66c11.65,3.77,23.31,7.7,27.45,9.3l42.52,25.46,56.3-57.56s4.57,4.3,4.57,8.32-23.13,64.3-25.47,70.43l24.39,14.6s35.67,37.9,27.76,43.55c-7.91,5.65-45.74-6.78-45.74-6.78,0,0-18.25-10.46-39.02-22.52-30.84,2.56-113.02,9.37-115.74,9.65-3.35,.35-18.3-4.41-18.3-4.41l90.23-31.04c-7.95-4.81-13.63-8.38-15.05-9.61-6.35-5.51-16.94-17.46-24.67-26.22-3.63-4.11-7.87-9.53-11.35-14.13-17.26,2.14-44.62,5.54-45.7,5.68-1.58,.2-8.65-2.5-8.65-2.5l43.6-18.03,21.07-13.74Z" fill="#010101" isolation="isolate" opacity=".4"/><g id="OutlineLower"><path d="M120.96,144.14c5.16,0,10.88,1.94,12.94,2.5,3.94,1.08,11,5.15,11,5.15-.07-.02-.13-.04-.2-.05-.12-.05-.25-.1-.38-.14,.1,.03,.19,.08,.28,.12,.03,0,.06,.02,.1,.02,.91,.38,1.69,1,2.33,1.79,1.27,1.58,1.99,3.86,2.05,6.45,.04,1.85-.26,3.85-.94,5.85-1.87,5.53-6.02,9.29-9.87,9.29-.61,0-1.22-.1-1.81-.29h0c-3.59-1.25-22.93-8.51-24.9-20.23-2.24-2.21-3.2-4.84-2.19-6.77,.78-1.5,2.59-2.27,4.81-2.27,.2,0,.41,0,.62,.02,1.7-1.05,3.87-1.43,6.16-1.43m0-3h0c-2.7,0-5.01,.47-6.89,1.41-3.41,.03-6.09,1.44-7.36,3.88-1.5,2.87-.7,6.49,2.08,9.6,1.28,5.48,5.66,10.57,13.02,15.15,5.79,3.6,11.83,5.84,13.61,6.46,.02,0,.05,.02,.07,.03,.89,.3,1.82,.45,2.77,.45,5.22,0,10.45-4.66,12.71-11.32,.77-2.26,1.14-4.64,1.1-6.88-.07-3.25-1.03-6.19-2.71-8.27-.78-.97-1.69-1.74-2.72-2.3-.08-.06-.16-.11-.24-.16-.76-.44-7.52-4.3-11.71-5.44-.28-.08-.64-.18-1.05-.3-2.74-.81-7.83-2.3-12.68-2.3h0Z" fill="#1d1d1b"/><path d="M186.24,94.52c5.16,0,10.88,1.94,12.94,2.5,3.94,1.08,11,5.15,11,5.15-.07-.02-.13-.04-.2-.05-.12-.05-.25-.1-.38-.14,.1,.03,.19,.08,.28,.12,.03,0,.06,.02,.1,.02,.91,.38,1.69,1,2.33,1.79,1.27,1.58,1.99,3.86,2.05,6.45,.04,1.85-.26,3.85-.94,5.85-1.87,5.53-6.02,9.29-9.87,9.29-.61,0-1.22-.1-1.81-.29h0c-3.59-1.25-22.93-8.51-24.9-20.23-2.24-2.21-3.2-4.84-2.19-6.77,.78-1.5,2.59-2.27,4.81-2.27,.2,0,.41,0,.62,.02,1.7-1.05,3.87-1.43,6.16-1.43m0-3h0c-2.7,0-5.01,.47-6.89,1.41-3.41,.03-6.09,1.44-7.36,3.88-1.5,2.87-.7,6.49,2.08,9.6,1.28,5.48,5.66,10.57,13.02,15.15,5.79,3.6,11.83,5.84,13.61,6.46,.02,0,.05,.02,.07,.03,.89,.3,1.82,.45,2.77,.45,5.22,0,10.45-4.66,12.71-11.32,.77-2.26,1.14-4.64,1.1-6.88-.07-3.25-1.03-6.19-2.71-8.27-.78-.97-1.69-1.74-2.72-2.3-.08-.06-.16-.11-.24-.16-.76-.44-7.52-4.3-11.71-5.44-.28-.08-.64-.18-1.05-.3-2.74-.81-7.83-2.3-12.68-2.3h0Z" fill="#1d1d1b"/></g><g id="Plane"><g id="Fuselage"><g clip-path="url(#clippath)"><path id="Midtone" d="M114.24,74.77c-7.54-2.93-40.09-13.55-51.95-16.94s-9.64,1.53-4.52,7.34c0,0,10.52,14.71,18.25,23.47,7.73,8.76,18.32,20.72,24.67,26.22s97.87,57.92,97.87,57.92c0,0,37.84,12.42,45.74,6.78,7.91-5.65-27.76-43.55-27.76-43.55l-102.29-61.25Z" fill="#efefef"/><path id="Shadow-2" d="M198.71,172.84c.05,.02,.13,.04,.22,.07l.1,.03c.11,.04,.25,.08,.41,.13l.13,.04c.16,.05,.35,.11,.55,.17l.26,.08c.16,.05,.32,.1,.5,.15,.11,.03,.22,.07,.34,.1,.21,.06,.43,.13,.66,.2,.15,.04,.3,.09,.45,.14,.25,.08,.52,.16,.79,.24,.15,.05,.32,.09,.48,.14,.22,.07,.45,.13,.68,.2,.18,.05,.35,.1,.54,.16,.26,.08,.54,.16,.81,.24,.26,.08,.53,.15,.8,.23,.3,.09,.6,.17,.91,.26,.22,.06,.46,.13,.69,.19,.25,.07,.5,.14,.75,.21,.25,.07,.49,.14,.74,.2,.28,.08,.56,.15,.85,.23,.36,.1,.73,.2,1.1,.29,.33,.09,.66,.18,1,.26,.27,.07,.54,.14,.81,.21,.28,.07,.55,.14,.83,.21,.28,.07,.55,.14,.83,.21,.31,.08,.62,.15,.94,.23,.39,.09,.78,.19,1.17,.28,.37,.09,.74,.18,1.12,.26,.28,.06,.56,.13,.83,.19,.3,.07,.61,.14,.92,.2,.29,.06,.57,.13,.86,.19,.33,.07,.66,.14,.99,.21,.37,.08,.74,.15,1.11,.23,.41,.08,.82,.16,1.23,.24,.27,.05,.54,.1,.81,.15,.31,.06,.63,.12,.94,.17,.27,.05,.55,.1,.82,.14,.34,.06,.69,.11,1.03,.17,.3,.05,.6,.1,.9,.14,.45,.07,.89,.13,1.33,.19,.24,.03,.48,.06,.72,.09,.32,.04,.63,.08,.95,.12,.24,.03,.48,.05,.72,.08,.34,.04,.68,.07,1.02,.1,.19,.02,.38,.04,.56,.05L79.6,92.7c7.18,8.09,15.67,17.47,21.09,22.17,4.03,3.49,42.3,25.85,69.77,41.74,16.77,9.67,28.1,16.19,28.1,16.19l.06,.02,.09,.03Z" fill="#c7c6c6"/><path id="Highlight" d="M114.24,74.77c-6.23-2.42-29.55-10.1-44.15-14.6l160.1,91.51c-6.95-8.54-13.66-15.67-13.66-15.67l-102.29-61.25Z" fill="#fafafa"/><g id="Windows"><path d="M127.88,107.72l-.07,7.03c0,.81-.9,1.3-1.59,.88l-4.87-2.98c-.31-.19-.5-.53-.5-.9l.04-7.52c0-.8,.87-1.3,1.56-.9l4.36,2.52c.67,.39,1.07,1.1,1.07,1.87Z" fill="#959697" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round"/><path d="M139.15,114.48l-.07,7.03c0,.81-.9,1.3-1.59,.88l-4.87-2.98c-.31-.19-.5-.53-.5-.9l.04-7.52c0-.8,.87-1.3,1.56-.9l4.36,2.52c.67,.39,1.07,1.1,1.07,1.87Z" fill="#959697" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round"/><path d="M150.69,121.15l-.07,7.03c0,.81-.9,1.3-1.59,.88l-4.87-2.98c-.31-.19-.5-.53-.5-.9l.04-7.52c0-.8,.87-1.3,1.56-.9l4.36,2.52c.67,.39,1.07,1.1,1.07,1.87Z" fill="#959697" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round"/><path d="M162.04,127.82l-.07,7.03c0,.81-.9,1.3-1.59,.88l-4.87-2.98c-.31-.19-.5-.53-.5-.9l.04-7.52c0-.8,.87-1.3,1.56-.9l4.36,2.52c.67,.39,1.07,1.1,1.07,1.87Z" fill="#959697" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round"/><path d="M173.4,134.12l-.07,7.03c0,.81-.9,1.3-1.59,.88l-4.87-2.98c-.31-.19-.5-.53-.5-.9l.04-7.52c0-.8,.87-1.3,1.56-.9l4.36,2.52c.67,.39,1.07,1.1,1.07,1.87Z" fill="#959697" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round"/><path d="M116.68,101.42l-.07,7.03c0,.81-.9,1.3-1.59,.88l-4.87-2.98c-.31-.19-.5-.53-.5-.9l.04-7.52c0-.8,.87-1.3,1.56-.9l4.36,2.52c.67,.39,1.07,1.1,1.07,1.87Z" fill="#959697" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round"/><path d="M184.94,140.79l-.07,7.03c0,.81-.9,1.3-1.59,.88l-4.87-2.98c-.31-.19-.5-.53-.5-.9l.04-7.52c0-.8,.87-1.3,1.56-.9l4.36,2.52c.67,.39,1.07,1.1,1.07,1.87Z" fill="#959697" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round"/></g><path id="TailShadow" d="M73.73,85.99c4.73-3.05,11.59-5.7,21.53-6.51-12.39-7.12-39.44-22.63-39.44-22.63l-.45-.06c-3.46,.5-1.28,4.22,2.4,8.39,0,0,8.6,12.03,15.96,20.81Z" fill="#c7c6c6"/><path id="Windscreen" d="M201.88,144.28s5.81,7.26,8.28,14.37c4.49,2,20.02,6.09,26.38,3.84,1.98-2.82,1.41-6.64,1.13-8.19s-8.72-10.91-8.72-10.91c0,0-.65,4.27-1.92,4.98s-15.11-.84-25.14-4.08Z" fill="#222323"/></g></g><g id="Wings"><g id="LeftWing"><g id="Engine"><g id="Engine-2"><g id="Body"><ellipse cx="182.48" cy="102.61" rx="5.6" ry="9.23" transform="translate(7.09 216.93) rotate(-62.44)" fill="#969696"/><path d="M197.58,111.11c2.17-6.41,7.4-10.44,11.67-8.99,.1,.03,.19,.08,.28,.12,.1,.03,.2,.04,.3,.08,0,0-7.07-4.07-11-5.15-3.94-1.08-21.4-7.24-22.47,5-1.17,13.45,21.14,21.82,25.03,23.17-4.27-1.45-5.97-7.82-3.8-14.23Z" fill="#e2e2e1"/></g><g id="Intake"><g clip-path="url(#clippath-1)"><ellipse id="Intake-3" cx="205.32" cy="113.74" rx="12.26" ry="8.17" transform="translate(31.75 271.74) rotate(-71.3)" fill="#7c7c7c"/><ellipse id="Intake-4" cx="198.34" cy="110.8" rx="12.26" ry="8.17" transform="translate(29.79 263.14) rotate(-71.3)" fill="#e2e2e1"/><path d="M209.25,102.12c-4.28-1.45-9.5,2.58-11.67,8.99-2.17,6.41-.47,12.79,3.81,14.23s9.5-2.58,11.67-8.99c2.17-6.41,.47-12.79-3.81-14.23Zm2.76,13.88c-1.88,5.54-6.48,9.63-10.18,8.38-3.69-1.25-5.08-7.36-3.2-12.9,1.88-5.54,6.74-9.47,10.43-8.22,3.69,1.25,4.83,7.21,2.95,12.75Z" fill="#efefef"/><ellipse cx="201.41" cy="111.8" rx="2.61" ry="1.69" transform="translate(22.68 257.13) rotate(-68.15)" fill="#7c7c7c"/></g></g></g></g><path id="LeftWing-2" d="M191.96,121.93s25.67-66.91,25.67-70.94-4.57-8.32-4.57-8.32l-56.72,58,35.62,21.26Z" fill="#fafafa"/></g><g id="RightWing"><g id="Engine-3"><g id="Body-2"><ellipse cx="117.56" cy="152.08" rx="5.6" ry="9.23" transform="translate(-71.66 185.95) rotate(-62.44)" fill="#969696"/><path d="M132.65,160.58c2.17-6.41,7.4-10.44,11.67-8.99,.1,.03,.19,.08,.28,.12,.1,.03,.2,.04,.3,.08,0,0-7.07-4.07-11-5.15-3.94-1.08-21.4-7.24-22.47,5-1.17,13.45,21.14,21.82,25.03,23.17-4.27-1.45-5.97-7.82-3.8-14.23Z" fill="#e2e2e1"/></g><g id="Intake-5"><g clip-path="url(#clippath-2)"><ellipse id="Intake-7" cx="140.4" cy="163.21" rx="12.26" ry="8.17" transform="translate(-59.21 243.85) rotate(-71.3)" fill="#7c7c7c"/><ellipse id="Intake-8" cx="133.42" cy="160.27" rx="12.26" ry="8.17" transform="translate(-61.17 235.25) rotate(-71.3)" fill="#e2e2e1"/><path d="M144.33,151.59c-4.28-1.45-9.5,2.58-11.67,8.99-2.17,6.41-.47,12.79,3.81,14.23s9.5-2.58,11.67-8.99c2.17-6.41,.47-12.79-3.81-14.23Zm2.76,13.88c-1.88,5.54-6.48,9.63-10.18,8.38-3.69-1.25-5.08-7.36-3.2-12.9,1.88-5.54,6.74-9.47,10.43-8.22,3.69,1.25,4.83,7.21,2.95,12.75Z" fill="#efefef"/><ellipse cx="136.49" cy="161.27" rx="2.61" ry="1.69" transform="translate(-63.99 227.93) rotate(-68.15)" fill="#7c7c7c"/></g></g></g><g id="RightWing-2"><g clip-path="url(#clippath-3)"><path id="RightWing-4" d="M123.14,121.93L25.5,155.52s14.95,4.75,18.3,4.41,127.28-10.61,127.28-10.61l-47.93-27.39Z" fill="#efefef"/><path id="Shadow-3" d="M101.81,129.27l39.06,22.55c17.44-1.45,30.2-2.5,30.2-2.5l-47.93-27.39-21.34,7.34Z" fill="#c7c6c6"/></g></g></g></g><g id="Tail"><path id="TailLeft" d="M85.74,64.03l6.28-25.78c.63-3.03-3.97-4.59-3.97-4.59l-13.13,12.33,10.82,18.05Z" fill="#fafafa"/><path id="TailRight" d="M56.46,58.61L10.32,77.69s7.06,2.7,8.65,2.5l59.57-7.4-22.08-14.18Z" fill="#c7c6c6"/><polygon id="TailCenter" points="95.27 79.51 52.34 8.43 43.16 3 55.82 56.84 95.27 79.51" fill="#d60756"/></g></g><g id="OutlineUpper"><g id="Main"><path d="M43.16,3l9.18,5.43,22.64,37.49,13.07-12.26s4.59,1.57,3.97,4.59l-6.23,25.57,1,1.66c11.65,3.77,23.31,7.7,27.45,9.3l42.52,25.46,56.3-57.56s4.57,4.3,4.57,8.32-23.13,64.3-25.47,70.43l24.39,14.6s35.67,37.9,27.76,43.55c-1.46,1.05-3.95,1.47-7.04,1.47-13.58,0-38.7-8.25-38.7-8.25,0,0-18.25-10.46-39.02-22.52-30.84,2.56-113.02,9.37-115.74,9.65-.12,.01-.25,.02-.39,.02-3.99,0-17.9-4.42-17.9-4.42l90.23-31.04c-7.95-4.81-13.63-8.38-15.05-9.61-6.35-5.51-16.94-17.46-24.67-26.22-3.63-4.11-7.87-9.53-11.35-14.13-17.26,2.14-44.62,5.54-45.7,5.68-.06,0-.12,.01-.19,.01-1.88,0-8.46-2.51-8.46-2.51l43.6-18.03c-.65-1.66-.24-2.78,1.88-2.92L43.16,3m0-3c-.63,0-1.25,.2-1.78,.58-.97,.71-1.42,1.93-1.14,3.1l12.04,51.21c-.43,.34-.74,.72-.96,1.06-.28,.44-.55,1.04-.64,1.79L9.17,74.92c-1.14,.47-1.87,1.58-1.85,2.81,.02,1.23,.78,2.32,1.93,2.76,2.13,.81,7.33,2.71,9.53,2.71,.2,0,.38-.01,.56-.03l42.78-5.31,1.21-.15c4.08,5.35,7.59,9.69,10.44,12.92,7.28,8.26,18.29,20.73,24.96,26.51,.77,.66,2.68,2.07,10,6.58l-84.2,28.96c-1.22,.42-2.04,1.58-2.02,2.87,.02,1.29,.86,2.43,2.09,2.82,2.4,.76,14.57,4.56,18.81,4.56,.25,0,.48-.01,.7-.03,2.7-.28,87.25-7.29,114.74-9.57,20.21,11.73,38.04,21.95,38.22,22.05,.18,.1,.36,.18,.56,.25,1.04,.34,25.73,8.4,39.64,8.4,4,0,6.87-.66,8.78-2.03,.95-.68,2.14-1.97,2.36-4.26,.31-3.13-.89-9.3-14.73-26.54-7.33-9.13-14.88-17.17-14.95-17.25-.19-.2-.41-.38-.64-.52l-22.22-13.31c2.25-5.89,7.59-19.92,12.73-33.75,12.04-32.44,12.04-34.36,12.04-35.39,0-5.17-4.95-9.98-5.51-10.51-.58-.54-1.32-.81-2.06-.81-.78,0-1.56,.3-2.15,.9l-54.64,55.87-40.49-24.24c-.15-.09-.3-.16-.46-.22-3.77-1.47-14-4.94-26.26-8.92l5.87-24.1s.02-.07,.02-.1c.8-3.88-2.4-6.83-5.93-8.04-.32-.11-.64-.16-.97-.16-.75,0-1.49,.28-2.05,.81l-10.36,9.73L54.91,6.88c-.26-.42-.61-.78-1.04-1.03L44.69,.42c-.47-.28-1-.42-1.53-.42h0Z" fill="#1d1d1b"/></g><g id="RightWing-5"><path d="M123.14,121.93l47.93,27.39s-123.93,10.26-127.28,10.61c-.12,.01-.25,.02-.39,.02-3.99,0-17.9-4.42-17.9-4.42l97.64-33.59m0-2c-.22,0-.44,.04-.65,.11L24.85,153.63c-.82,.28-1.36,1.05-1.35,1.91,.01,.86,.57,1.62,1.39,1.88,1.45,.46,14.33,4.52,18.51,4.52,.22,0,.42-.01,.6-.03,3.29-.34,126-10.5,127.24-10.6,.87-.07,1.6-.7,1.79-1.56,.19-.86-.2-1.73-.96-2.17l-47.93-27.39c-.31-.17-.65-.26-.99-.26h0Z" fill="#1d1d1b"/></g><g id="TailCenter-2"><path d="M43.16,3l9.18,5.43,42.92,71.08-39.44-22.66L43.16,3m0-2c-.42,0-.83,.13-1.18,.39-.65,.47-.95,1.29-.76,2.07l12.66,53.84c.13,.54,.47,1,.95,1.28l39.44,22.66c.31,.18,.65,.27,1,.27,.52,0,1.04-.21,1.43-.6,.64-.65,.75-1.65,.28-2.43L54.06,7.39c-.17-.28-.41-.52-.69-.69L44.18,1.28c-.31-.19-.67-.28-1.02-.28h0Z" fill="#1d1d1b"/></g><g id="TailRight-2"><path d="M56.46,58.61l22.08,14.18s-57.99,7.2-59.57,7.4c-.06,0-.12,.01-.19,.01-1.88,0-8.46-2.51-8.46-2.51l46.14-19.08m0-2c-.26,0-.52,.05-.76,.15L9.56,75.84c-.76,.31-1.25,1.06-1.24,1.88,.01,.82,.52,1.55,1.29,1.84,1.62,.62,7.08,2.64,9.17,2.64,.16,0,.3,0,.43-.03l59.57-7.4c.84-.1,1.52-.72,1.7-1.54,.19-.82-.16-1.67-.87-2.13l-22.08-14.18c-.33-.21-.7-.32-1.08-.32h0Z" fill="#1d1d1b"/></g><g id="LeftWing-3"><path d="M156.53,99.04l56.49-57.77,.71,.67c.2,.19,4.88,4.64,4.88,9.05,0,4.09-22.3,62.33-24.84,68.96l-.43,1.11-36.82-22.03Z" fill="#fafafa"/><path d="M213.06,42.67s4.57,4.3,4.57,8.32-24.78,68.6-24.78,68.6l-34.71-20.77,54.92-56.16m-.06-2.8l-1.37,1.4-54.92,56.16-1.77,1.81,2.18,1.3,34.71,20.77,2.04,1.22,.85-2.22c5.84-15.23,24.91-65.24,24.91-69.32,0-4.75-4.66-9.28-5.2-9.78l-1.43-1.34h0Z" fill="#1d1d1b"/></g></g></svg>',printer:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="168.39999px" height="154.8px" viewBox="0 0 168.39999 154.8" enable-background="new 0 0 168.39999 154.8"
	 xml:space="preserve">
<g id="Layer_1_1_">
	<g id="Layer_3">
	</g>
	<g id="Layer_6">
	</g>
	<path fill="#D2D3D5" d="M144.5,84c-0.2,2.2-1.39999,4.3-3.5,5.5l-29.2,17.6c-5.8,3.5-13,3.5-18.8,0L27.8,68c-2.3-1.4-3.4-3.6-3.6-6
		v-0.1v34.6c-0.1,2.6,1,5.2,3.6,6.7l65.09999,39.09999c5.8,3.5,13,3.5,18.8,0l29.2-17.6c2.60001-1.5,3.8-4.3,3.5-6.9V84H144.5z"/>
	<path fill="#5D6366" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M58.2,37L27.8,55.3c-4.8,2.9-4.8,9.8,0,12.7
		l65.09999,39.1c5.8,3.5,13,3.5,18.8,0l29.2-17.6c4.8-2.9,4.8-9.8,0-12.7L74.6,37C69.6,33.9,63.3,34,58.2,37z"/>
	<path fill="#E9E9EA" stroke="#000000" stroke-width="0.25" stroke-miterlimit="10" d="M83.7,42.5L71.2,50c-4.6,2.8-4.6,9.5,0,12.3
		L101,80.2c5.7,3.4,12.8,3.4,18.5,0L133,72L83.7,42.5z"/>
	<g>
		<rect x="125.3864" y="62.39583" fill="#717677" width="0" height="10.10001"/>
		<path fill="#717677" d="M101,80.2L94.1,76L62.8,89l8.7,5.2l31.5-13C102.3,80.9,101.6,80.5,101,80.2z"/>
	</g>
	<path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M58.2,37L27.8,55.3c-4.8,2.9-4.8,9.8,0,12.7
		l65.09999,39.1c5.8,3.5,13,3.5,18.8,0l29.2-17.6c4.8-2.9,4.8-9.8,0-12.7L74.6,37C69.6,33.9,63.3,34,58.2,37z"/>
	<path fill="#1E2226" stroke="#000000" stroke-miterlimit="10" d="M36.7,108.7L86,138.3v-17.1c0-3.9-2-7.5-5.4-9.5L41.1,88
		c-1.9-1.2-4.4,0.2-4.4,2.5C36.7,90.5,36.7,108.7,36.7,108.7z"/>
	<path fill="#343A3D" d="M133.10001,72.1l13-26.4c0.5-2.9-0.8-5.7-3.3-7.2l-40.9-24.6c-2.1-1.3-4.9,0-5.3,2.4l-13,26.1
		L133.10001,72.1z"/>
	<g>
		<path fill="#878788" d="M20.9,116.8L20.9,116.8v0.1C20.9,116.9,20.9,116.9,20.9,116.8z"/>
		<path fill="#878788" d="M86,133.10001l-13.4,8.10001c-5.7,3.39999-12.8,3.39999-18.5,0l-29.8-17.9c-2.2-1.3-3.4-3.6-3.5-5.9v5l0,0
			c0,2.4,1.2,4.7,3.5,6.10001l29.8,17.89999c2.8,1.7,6,2.5,9.1,2.60001l0,0l0,0c3.2,0,6.5-0.8,9.4-2.60001L86,138.3l0,0l0,0
			V133.10001z"/>
	</g>
	<path fill="#5F6568" stroke="#000000" stroke-miterlimit="10" d="M80.7,111.7L52,94.5l-15.2,9.1h-0.1l-12.5,7.6
		c-4.6,2.8-4.6,9.5,0,12.3L54,141.39999c5.7,3.39999,12.8,3.39999,18.5,0l9.1-5.5l0,0l4.3-2.5v-12C86,117.3,84,113.7,80.7,111.7z"/>
	<path fill="#E9E9EA" d="M86,121.2c0-3.9-2-7.5-5.4-9.5L58.4,98.4l-31.8,19.1l35.6,21.39999L86,124.6V121.2z"/>
	<g>
		<path fill="#000000" d="M108.6,11l33.9,20.4l-2.60001,5.3l2.89999,1.8c2.5,1.5,3.8,4.4,3.3,7.2l-13,26.4l-3.7-2.2l3.7,2.2l0,0l7.8,4.7
			c2.39999,1.4,3.5,3.8,3.60001,6.2l0,0l0,0l0,0v-0.1v0.1v0.1v4.7c0,0.2,0,0.5,0,0.7v29.2c0.2,2.6-1,5.4-3.5,6.9l-29.2,17.6
			c-2.9,1.7-6.1,2.60001-9.4,2.60001s-6.5-0.89999-9.4-2.60001l-6.9-4.10001v0.10001l0,0l0,0l-13.4,8.10001
			c-2.9,1.7-6.1,2.60001-9.3,2.60001h-0.1l0,0l0,0c-3.2,0-6.3-0.89999-9.1-2.60001l-29.8-17.89999c-2.3-1.4-3.5-3.8-3.5-6.1l0,0v-5
			c0-0.2,0-0.4,0-0.6v-0.1l0,0c0,0,0,0,0,0.1c0,0,0,0,0-0.1l0,0c0.1-2.2,1.3-4.4,3.4-5.7l8.3-5l-4.8-2.9c-2.5-1.5-3.7-4.2-3.6-6.7
			V66.8c0-0.1,0-0.2,0-0.4c0,0,0-3.8,0-4.6v-0.1l0,0c0-2.5,1.2-4.9,3.6-6.4L58.2,37c2.5-1.5,5.4-2.3,8.2-2.3c2.8,0,5.7,0.8,8.2,2.3
			l9,5.4l13-26.1c0.3-1.8,1.9-2.9,3.5-2.9c0.6,0,1.2,0.2,1.8,0.5l4.1,2.4L108.6,11 M25.8,66.1C25.8,66.1,25.7,66.1,25.8,66.1
			C25.7,66.1,25.7,66.1,25.8,66.1C25.7,66.1,25.8,66.1,25.8,66.1 M26.5,67l0.1,0.1C26.6,67,26.6,67,26.5,67
			c-0.1-0.1-0.2-0.1-0.2-0.2l0,0C26.4,66.8,26.5,66.9,26.5,67 M27.8,68c-0.3-0.2-0.6-0.4-0.8-0.6l0,0C27.3,67.6,27.5,67.8,27.8,68
			 M144.5,83.3v0.1v0.1c0,0.1,0,0.1,0,0.2v0.5v-0.7C144.5,83.5,144.5,83.4,144.5,83.3 M144.3,84.7L144.3,84.7
			C144.3,84.6,144.3,84.6,144.3,84.7C144.39999,84.6,144.39999,84.6,144.3,84.7C144.3,84.6,144.3,84.7,144.3,84.7 M144.10001,85.5
			L144.10001,85.5c0-0.1,0-0.1,0-0.1l0,0V85.5 M143.8,86.4L143.8,86.4L143.8,86.4c0,0,0-0.1,0.10001-0.1v-0.1l0,0
			C143.8,86.2,143.8,86.3,143.8,86.4 M143.3,87.2L143.3,87.2L143.3,87.2c0-0.1,0.10001-0.1,0.10001-0.2c0,0,0-0.1,0.10001-0.1
			C143.39999,87,143.39999,87.1,143.3,87.2 M142.7,88L142.7,88L142.7,88c0.10001-0.1,0.10001-0.2,0.2-0.2c0,0,0-0.1,0.10001-0.1
			C142.89999,87.7,142.8,87.9,142.7,88 M142,88.7L142,88.7L142,88.7c0.10001-0.1,0.2-0.2,0.39999-0.3c0,0,0,0,0.10001-0.1
			C142.3,88.4,142.10001,88.6,142,88.7 M140.89999,89.5L140.89999,89.5L140.89999,89.5L140.89999,89.5L140.89999,89.5
			c0.3-0.2,0.5-0.3,0.8-0.5l0,0C141.5,89.1,141.2,89.3,140.89999,89.5 M21.1,119.2L21.1,119.2L21.1,119.2 M21.4,120
			C21.4,120,21.4,120.1,21.4,120C21.4,120.1,21.4,120,21.4,120L21.4,120L21.4,120 M21.8,120.8C21.8,120.9,21.8,120.9,21.8,120.8
			C21.8,120.9,21.8,120.9,21.8,120.8L21.8,120.8L21.8,120.8 M22.3,121.6l0.1,0.1C22.4,121.7,22.4,121.7,22.3,121.6l-0.1-0.1
			C22.3,121.5,22.3,121.6,22.3,121.6 M23,122.3c0.1,0.1,0.1,0.1,0.2,0.2C23.1,122.5,23.1,122.4,23,122.3s-0.1-0.1-0.2-0.2
			C22.9,122.2,22.9,122.3,23,122.3 M24.2,123.3l0.1,0.1C24.3,123.3,24.2,123.3,24.2,123.3c-0.2-0.1-0.4-0.3-0.7-0.5
			C23.7,123,23.9,123.1,24.2,123.3 M24.2,61.6v0.1l0,0C24.2,61.8,24.2,61.7,24.2,61.6L24.2,61.6 M107.8,8.2l-1,1.9l-1.7,3.4
			l-2.2-1.3c-0.9-0.5-1.9-0.8-2.8-0.8c-2.6,0-4.8,1.8-5.4,4.2l-11.9,24l-7.1-4.3c-2.8-1.7-6-2.6-9.2-2.6c-3.3,0-6.5,0.9-9.2,2.6
			L26.8,53.6c-2.3,1.4-3.8,3.5-4.3,6h-0.2v2c0,0,0,0,0,0.1v0.1v4.6c0,0.1,0,0.3,0,0.4v29.6c-0.2,3.5,1.6,6.7,4.5,8.5l1.9,1.2
			l-5.5,3.3c-2.4,1.4-3.9,3.7-4.3,6.4l-0.1,0.1v0.9v0.1c0,0.2,0,0.4,0,0.6v4.9c0,3.2,1.7,6.2,4.4,7.8l29.8,18
			c2.9,1.7,6.2,2.7,9.6,2.8l0.5,0.3l0.6-0.3c3.5-0.10001,6.9-1,10-2.89999L86.2,140.5l5.7,3.39999
			c3.1,1.89999,6.7,2.89999,10.4,2.89999s7.3-1,10.4-2.89999l29.2-17.6c3-1.8,4.8-5.2,4.5-8.7V88.7c0-0.2,0-0.5,0-0.7v-4.7v-0.2
			v-0.1l0,0c-0.10001-3.3-1.8-6.2-4.5-7.9l-6.3-3.8l12.2-24.7l0.10001-0.3L148,46c0.7-3.7-1-7.4-4.2-9.3l-1.39999-0.8l1.8-3.6
			l0.8-1.7l-1.60001-1L109.6,9.3L107.8,8.2L107.8,8.2z"/>
	</g>
	<path opacity="0.4" fill="#5D6366" enable-background="new    " d="M80.7,111.7L58.4,98.4l-16.2,9.7l35.7,21.4l8.1-4.9v-3.4
		C86,117.3,84,113.7,80.7,111.7z"/>
	<path fill="none" stroke="#000000" stroke-miterlimit="10" d="M86,121.2c0-3.9-2-7.5-5.4-9.5L58.4,98.4l-31.8,19.1l35.6,21.39999
		L86,124.6V121.2z"/>
	<g>
		<path fill="#A8A8A8" d="M142.89999,87.7c0,0,0.10001-0.1,0.10001-0.2C143,87.6,143,87.7,142.89999,87.7z"/>
		<path fill="#A8A8A8" d="M141.7,89c0.10001,0,0.10001-0.1,0.2-0.2C141.8,88.9,141.7,88.9,141.7,89z"/>
		<path fill="#A8A8A8" d="M144.3,84.7C144.3,84.6,144.3,84.6,144.3,84.7C144.3,84.6,144.3,84.6,144.3,84.7z"/>
		<path fill="#A8A8A8" d="M143.39999,87c0,0,0-0.1,0.10001-0.1L143.39999,87z"/>
		<path fill="#A8A8A8" d="M144.10001,85.5C144.10001,85.4,144.10001,85.4,144.10001,85.5
			C144.10001,85.4,144.10001,85.4,144.10001,85.5z"/>
		<path fill="#A8A8A8" d="M143.8,86.3C143.8,86.2,143.8,86.2,143.8,86.3C143.8,86.2,143.8,86.2,143.8,86.3z"/>
		<path fill="#A8A8A8" d="M142.5,88.2c-0.10001,0.1-0.10001,0.1-0.2,0.2C142.39999,88.3,142.5,88.3,142.5,88.2z"/>
		<path fill="#A8A8A8" d="M100.4,109.6c0.5,0.1,1,0.1,1.5,0.1C101.3,109.6,100.9,109.6,100.4,109.6z"/>
		<path fill="#A8A8A8" d="M106.1,109.2c-1.4,0.3-2.9,0.4-4.3,0.4C103.3,109.7,104.7,109.6,106.1,109.2z"/>
		<path fill="#A8A8A8" d="M110.5,107.7c0.4-0.2,0.8-0.4,1.2-0.7C111.3,107.3,110.9,107.5,110.5,107.7z"/>
		<path fill="#A8A8A8" d="M144.5,88.6c0,0.2,0,0.4-0.10001,0.6l0,0l0,0c-0.3,2-1.5,3.9-3.5,5.1l-29.2,17.6
			c-3.5,2.1-7.4,2.9-11.3,2.5v30.39999c3.9,0.39999,7.8-0.39999,11.3-2.5l29.2-17.6c2.60001-1.5,3.8-4.3,3.5-6.9V88.6H144.5z"/>
		<path fill="#A8A8A8" d="M109.2,108.3c0.3-0.1,0.6-0.3,0.9-0.4C109.8,108.1,109.5,108.2,109.2,108.3z"/>
		<path fill="#A8A8A8" d="M107.8,108.8c0.3-0.1,0.6-0.2,1-0.3C108.4,108.6,108.1,108.7,107.8,108.8z"/>
		<path fill="#A8A8A8" d="M106.3,109.2c0.4-0.1,0.8-0.2,1.2-0.3C107.1,109,106.7,109.1,106.3,109.2z"/>
	</g>
	<g>
		<path fill="#868687" d="M144.5,83.1V83V83.1L144.5,83.1z"/>
		<path fill="#868687" d="M144.5,83.5v0.9v-0.5c-0.2,2.2-1.39999,4.4-3.5,5.7l-29.2,17.6c-5.8,3.5-13,3.5-18.8,0L27.8,68
			c-2.4-1.4-3.6-3.9-3.6-6.3l0,0v4.8c0,0.1,0,0.3,0,0.4c0.1,2.4,1.3,4.7,3.6,6L92.89999,112c5.8,3.5,13,3.5,18.8,0l29.2-17.6
			c2-1.2,3.10001-3.1,3.5-5.1l0,0l0,0C144.5,88.9,144.5,88.4,144.5,88v-4.7C144.5,83.3,144.5,83.4,144.5,83.5z"/>
	</g>
	<g>
		<rect x="102.08109" y="38.11023" fill="#717677" width="0" height="30.70004"/>
		<path fill="#717677" d="M71.2,62.3c-2.9-1.8-4-5.1-3.2-8L30.7,69.7l26.4,15.8l31.3-13L71.2,62.3z"/>
	</g>
	<g>
		<path fill="#3B4044" d="M100,114.2v-4.9"/>
		<path fill="#3B4044" d="M111.6,111.8l29.2-17.6c2-1.2,3.10001-3.1,3.5-5.1l0,0l0,0c0.10001-0.4,0.10001-0.9,0.10001-1.3v-4.7
			c0,0.1,0,0.2,0,0.2v0.9v-0.5c-0.2,2.2-1.39999,4.4-3.5,5.7l-29.2,17.6c-3.6,2.1-7.7,3-11.7,2.5v4.9
			C104,114.7,108.1,113.9,111.6,111.8z"/>
	</g>
	<g>
		<path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M144.5,83.1V83V83.1L144.5,83.1z"/>
		<path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M144.5,83.5v0.9v-0.5
			c-0.2,2.2-1.39999,4.4-3.5,5.7l-29.2,17.6c-5.8,3.5-13,3.5-18.8,0L27.8,68c-2.4-1.4-3.6-3.9-3.6-6.3l0,0v4.8c0,0.1,0,0.3,0,0.4
			c0.1,2.4,1.3,4.7,3.6,6L92.89999,112c5.8,3.5,13,3.5,18.8,0l29.2-17.6c2-1.2,3.10001-3.1,3.5-5.1l0,0l0,0
			C144.5,88.9,144.5,88.4,144.5,88v-4.7C144.5,83.3,144.5,83.4,144.5,83.5z"/>
	</g>
	<ellipse fill="#C9C9C9" stroke="#000000" stroke-miterlimit="10" cx="54.5" cy="50.7" rx="5.3" ry="3.8"/>
	<ellipse fill="#51AD44" stroke="#000000" stroke-miterlimit="10" cx="45.3" cy="56.5" rx="3.4" ry="2.5"/>
	<ellipse fill="#FC9603" stroke="#000000" stroke-miterlimit="10" cx="37.6" cy="61.4" rx="3.4" ry="2.5"/>
	<path fill="#343A3D" stroke="#000000" stroke-miterlimit="10" d="M83.7,42.5L71.2,50c-4.6,2.8-4.6,9.5,0,12.3L101,80.2
		c5.7,3.4,12.8,3.4,18.5,0L133,72L83.7,42.5z"/>
	<polygon fill="#FFFFFF" stroke="#000000" stroke-miterlimit="10" points="121.1,74.5 142.5,31.4 108.6,11 87.3,54.1 	"/>
	<path opacity="0.3" enable-background="new    " d="M165.7,115.6l-21.2-13.5v15.8c0.2,2.6-1,5.4-3.5,6.9l-29.2,17.60001
		c-3,1.8-6.4,2.7-9.7,2.60001l-1.5,2.10001l29.3-2.2l36.09999-20.3C169.3,122.5,169.2,117.5,165.7,115.6z"/>
	<polygon opacity="0.4" fill="#5D6366" enable-background="new    " points="89.7,49.3 87.3,54.1 121.1,74.5 123.5,69.6 	"/>
</g>
</svg>
`,pyramid:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="552.5px" height="447.5px" viewBox="0 0 552.5 447.5" enable-background="new 0 0 552.5 447.5" xml:space="preserve">
<polygon opacity="0.4" fill="#000000" enable-background="new    " points="309.20001,414.89999 274.5,408.10001 273.89999,168.2 551.5,272 "/>
<g>
	<path fill="#6885A9" d="M882.09998,197.89999c0.09998,0.89999,0.09998,1.8,0.09998,2.7L882.09998,197.89999L882.09998,197.89999z"
		/>
	<path fill="#231F20" d="M884.20001,200.60001h-3.79999c0-0.8,0-1.60001-0.09998-2.5L880,196h4.09998L884.20001,200.60001
		L884.20001,200.60001z"/>
</g>
<g>
	<path fill="#6885A9" d="M882.09998,102.3c0.09998,0.9,0.09998,1.8,0.09998,2.7L882.09998,102.3L882.09998,102.3z"/>
	<path fill="#231F20" d="M884.20001,105h-3.79999c0-0.8,0-1.6-0.09998-2.5l-0.29999-2.1h4.09998L884.20001,105L884.20001,105z"/>
</g>
<path fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="M882.09998,197.89999
	c0.09998,0.89999,0.09998,1.8,0.09998,2.7L882.09998,197.89999L882.09998,197.89999z"/>
<path fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="M882.09998,102.3
	c0.09998,0.9,0.09998,1.8,0.09998,2.7L882.09998,102.3L882.09998,102.3z"/>
<g>
	<polygon fill="#6885A9" points="85.3,287.39999 275,103.8 464.70001,287.39999 275,401.5 	"/>
	<path fill="#231F20" d="M275,110l182.39999,176.60001L275,396.29999L92.7,286.60001L275,110 M275,97.5l-6.29999,6.1L86.4,280.10001
		l-8.4,8.10001l10,6L270.39999,404L275,406.79999L279.60001,404L462,294.29999l10-6l-8.39999-8.10001L281.29999,103.6L275,97.5
		L275,97.5z"/>
</g>
<polygon fill="#CDD9EE" points="275,396.29999 275,110 92.7,286.60001 "/>
<rect x="272.20001" y="104.6" fill="#231F20" width="5.70001" height="298.5"/>
<polygon fill="#FFFFFF" points="272.20001,157.8 97.1,289.29999 92.7,286.60001 272.20001,113.5 "/>
</svg>
`,queue:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="77.3px" height="63px" viewBox="0 0 77.3 63" enable-background="new 0 0 77.3 63" xml:space="preserve">
<g id="Layer_3">
</g>
<g id="Layer_4">
	<polygon fill="#4F6587" stroke="#010202" stroke-linejoin="round" stroke-miterlimit="10" points="36.5,10.8 6.6,28.8 6.6,39.9 
		36.5,22 	"/>
	<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="35.1,10.1 36.5,10.7 6.6,28.8 
		6.6,39.9 5.2,39.2 5.2,28.1 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="36.5,15.8 33.8,28.6 42.3,54.3 37.9,58.9 45.9,58.9 77.3,39.9 	"/>
	<polygon fill="#93A6C6" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="36.5,57.8 6.6,39.9 36.5,22 
		66.3,39.8 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="20.5,39.9 6.6,39.9 13.5,36.2 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="20.4,43 38.5,53.8 60.9,40.3 42.9,29.4 	"/>
	<polygon fill="#FFFFFF" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="36.5,49.9 13.5,36.2 36.5,22.4 
		59.4,36.2 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="20.4,36.5 38.5,47.3 58.2,35.4 40.1,24.6 	"/>
	<polygon fill="#FFFFFF" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="36.5,43.3 13.5,29.5 36.5,15.8 
		59.4,29.5 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="20.5,29.9 38.6,40.8 58.4,28.9 40.3,18.1 	"/>
	<polygon fill="#FFFFFF" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="36.5,36.3 13.5,22.6 36.5,8.8 
		59.4,22.6 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="20.5,22.9 38.6,33.8 58.4,21.9 40.3,11.1 	"/>
	<polygon fill="#FFFFFF" points="36.4,29.5 13.5,15.8 36.4,2 59.3,15.8 	"/>
	<polygon fill="#4F6587" stroke="#010202" stroke-linejoin="round" stroke-miterlimit="10" points="67.7,29.3 37.9,47.4 37.9,58.4 
		67.7,40.5 	"/>
	<polygon fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="36.4,29.5 13.5,15.8 36.4,2 
		59.3,15.8 	"/>
	<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="66.3,28.6 67.7,29.3 37.9,47.4 
		37.9,58.4 36.5,57.8 36.5,46.7 	"/>
</g>
<g id="Layer_6">
</g>
<g id="Layer_5">
</g>
</svg>
`,router:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="518px" height="477px" viewBox="0 0 518 477" enable-background="new 0 0 518 477" xml:space="preserve">
<g>
	<path fill="#6885A9" d="M860.40002,247.39999c0.09998,0.89999,0.09998,1.8,0.09998,2.7v-2.7H860.40002z"/>
	<path fill="#231F20" d="M862.40002,250.10001h-3.79999c0-0.8,0-1.60001-0.09998-2.5L858.30005,245.5h4.09998V250.10001
		L862.40002,250.10001z"/>
</g>
<g>
	<path fill="#6885A9" d="M860.40002,151.8c0.09998,0.89999,0.09998,1.8,0.09998,2.7v-2.7H860.40002z"/>
	<path fill="#231F20" d="M862.40002,154.5h-3.79999c0-0.8,0-1.60001-0.09998-2.5l-0.20001-2.10001h4.09998V154.5L862.40002,154.5z"
		/>
</g>
<path fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="M860.40002,247.39999
	c0.09998,0.89999,0.09998,1.8,0.09998,2.7v-2.7H860.40002z"/>
<path fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="M860.40002,151.8
	c0.09998,0.89999,0.09998,1.8,0.09998,2.7v-2.7H860.40002z"/>
<g>
	<path fill="#000000" d="M242.7,256.79999H239c-5.8,0-10.5-4.7-10.5-10.5V47.2c0-5.8,4.7-10.5,10.5-10.5h3.8c5.8,0,10.5,4.7,10.5,10.5V246.3
		C253.2,252.10001,248.5,256.79999,242.7,256.79999z"/>
	<path fill="#000000" d="M396.89999,343.5h-3.79999c-5.79999,0-10.5-4.70001-10.5-10.5V133.89999c0-5.8,4.70001-10.5,10.5-10.5h3.79999
		c5.79999,0,10.5,4.7,10.5,10.5V333C407.39999,338.79999,402.70001,343.5,396.89999,343.5z"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="358,422.39999 277.29999,443.10001 206.8,153.3 508.29999,334.5 	"/>
	<polygon fill="#CCD8EE" points="69.7,405.20001 69,405.20001 69,405.70001 	"/>
	<polygon fill="#CCD8EE" points="69.7,317.29999 69,317.29999 69,317.70001 	"/>
	<polygon fill="#CDD9EE" points="277.29999,355.79999 71,228.60001 206.8,146.7 413.70001,273.79999 	"/>
	<polygon fill="#CCD8EE" points="69.7,229.39999 69,229.39999 69,229.8 	"/>
	<polygon fill="#B5C5DC" points="69,304.39999 277.29999,432.79999 277.29999,432.79999 277.29999,358.20001 69,229.8 	"/>
	<polygon fill="#FFFFFF" points="291,347.5 114.5,237.10001 235.8,164.10001 206.8,146.7 71,228.60001 277.29999,355.79999 	"/>
	<polygon fill="#6885A9" points="415.70001,349.5 277.29999,432.79999 277.29999,432.79999 277.29999,358.20001 415.70001,275 	"/>
	<path fill="#231F20" d="M423.89999,270.20001L206.8,137l-145,87.39999L60.8,225v83v0.70001L277.29999,442l146.60001-88.20001
		V270.20001z M206.8,146.7l206.90001,127.00002l-136.39999,82L71,228.60001L206.8,146.7z M413.60001,278.60001v69.69998
		l-134.30002,80.79999v-69.70001L413.60001,278.60001z M275.20001,359.39999v69.69998L71,303.20001v-69.7L275.20001,359.39999z"/>
	<polygon fill="#000000" points="253.2,389.29999 134.3,315.60001 134.3,304.60001 253.2,378.29999 	"/>
	<polygon fill="#000000" points="118.6,305.89999 107.2,298.79999 107.2,287.79999 118.6,294.89999 	"/>
	<polygon fill="#000000" points="100.4,294.70001 89,287.60001 89,276.60001 100.4,283.70001 	"/>
</g>
</svg>
`,server:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="543.52399px" height="508.85101px" viewBox="0 0 543.52399 508.85101" enable-background="new 0 0 543.52399 508.85101"
	 xml:space="preserve">
<g>
	<path fill="#6885A9" d="M883.11401,267.181c0.08801,0.90201,0.146,1.80701,0.146,2.71701V267.181H883.11401z"/>
	<path fill="#231F20" d="M885.15302,269.897h-3.78497c0-0.76099-0.04498-1.58801-0.138-2.53201l-0.20398-2.077h4.12701v4.60901
		H885.15302z"/>
</g>
<g>
	<path fill="#6885A9" d="M883.11401,171.61301c0.08801,0.901,0.146,1.806,0.146,2.716v-2.716H883.11401z"/>
	<path fill="#231F20" d="M885.15302,174.32899h-3.78497c0-0.761-0.04498-1.588-0.138-2.53l-0.20398-2.078h4.12701v4.608H885.15302z"
		/>
</g>
<path fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="M883.11401,267.181
	c0.08801,0.90201,0.146,1.80701,0.146,2.71701V267.181H883.11401z"/>
<path fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="M883.11401,171.61301
	c0.08801,0.901,0.146,1.806,0.146,2.716v-2.716H883.11401z"/>
<g>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="305.28299,478.491 271.47198,471.892 130.942,93.046 541.10901,341.38 
			"/>
	<polygon fill="#365E7F" points="439.84601,280.875 272.50101,380.00101 100.278,279.59698 95.105,283.30499 271.47501,389.09698 
		446.50699,285.11301 	"/>
	<polygon fill="#CCD8EE" points="92.693,284.379 91.992,284.379 91.992,284.79099 	"/>
	<polygon fill="#231F20" points="91.492,285.66501 91.492,283.879 94.531,283.879 	"/>
	<polygon fill="#B5C5DC" points="91.992,356.29001 271.46899,462.599 271.47501,462.595 271.47501,391.09698 91.992,284.80099 	"/>
	<polygon fill="#6885A9" points="450.95901,356.29001 271.48199,462.599 271.47501,462.595 271.47501,391.09698 
		450.95901,284.80099 	"/>
	<polygon fill="#CCD8EE" points="92.693,200.05701 91.992,200.05701 91.992,200.47099 	"/>
	<polygon fill="#231F20" points="91.492,201.347 91.492,199.55701 94.523,199.55701 	"/>
	<polygon fill="#CDD9EE" points="271.47501,220.131 93.952,114.995 270.91599,9.986 448.992,114.999 	"/>
	<polygon fill="#365E7F" points="437.78201,192.67 270.91501,291.49399 104.61,193.00101 91.986,200.47701 271.47501,306.776 
		450.965,200.47701 	"/>
	<polygon fill="#B5C5DC" points="91.992,271.96799 271.46899,378.28 271.47501,378.27399 271.47501,306.776 91.992,200.48 	"/>
	<polygon fill="#6885A9" points="450.95901,271.96799 271.48199,378.28 271.47501,378.27399 271.47501,306.776 450.95901,200.48 	
		"/>
	<polygon fill="#CCD8EE" points="92.693,115.738 91.992,115.738 91.992,116.15 	"/>
	<polygon fill="#B5C5DC" points="91.992,187.64999 271.46899,293.95801 271.47501,293.95401 271.47501,222.455 91.992,116.158 	"/>
	<polygon fill="#FFFFFF" points="284.79199,212.244 136.248,123.133 299.108,26.611 270.91599,9.986 93.952,114.995 
		271.47501,220.131 	"/>
	<polygon fill="#6885A9" points="450.95901,187.64999 271.48199,293.95801 271.47501,293.95401 271.47501,222.455 
		450.95901,116.158 	"/>
	<g>
		<g opacity="0.8" fill="#000000">
			<polygon fill="#EAF4FF" points="155.935,222.96001 197.61501,181.27901 155.842,156.539 114.165,198.216 			"/>
		</g>
		<g opacity="0.8" fill="#000000">
			<polygon fill="#EAF4FF" points="185.95399,240.89301 227.82899,199.01801 206.84399,186.589 164.96899,228.464 			"/>
		</g>
	</g>
	<g>
		<g opacity="0.8" fill="#000000">
			<polygon fill="#EAF4FF" points="155.88499,307.41501 197.702,265.59601 155.79201,240.774 113.977,282.59 			"/>
		</g>
		<g opacity="0.8" fill="#000000">
			<polygon fill="#EAF4FF" points="186.002,325.40701 228.017,283.39301 206.963,270.92499 164.95,312.936 			"/>
		</g>
	</g>
	<g>
		<g opacity="0.8" fill="#000000">
			<polygon fill="#EAF4FF" points="155.927,391.58499 197.62801,349.88 155.83299,325.12799 114.134,366.827 			"/>
		</g>
		<g opacity="0.8" fill="#000000">
			<polygon fill="#EAF4FF" points="185.961,409.526 227.85899,367.63 206.864,355.194 164.966,397.091 			"/>
		</g>
	</g>
	<g>
		<polygon fill="#000000" points="139.892,172.061 121.992,161.46001 121.992,177.88699 139.892,188.489 		"/>
	</g>
	<g>
		<polygon fill="#000000" points="164.24699,187.416 146.347,176.814 146.347,193.241 164.24699,203.84399 		"/>
	</g>
	<g>
		<polygon fill="#000000" points="139.892,256.32401 121.992,245.724 121.992,262.14999 139.892,272.75299 		"/>
	</g>
	<g>
		<polygon fill="#000000" points="164.24699,271.67999 146.347,261.078 146.347,277.505 164.24699,288.10699 		"/>
	</g>
	<g>
		<polygon fill="#000000" points="139.892,342.37201 121.992,331.76999 121.992,348.198 139.892,358.79999 		"/>
	</g>
	<g>
		<polygon fill="#000000" points="164.24699,357.728 146.347,347.12601 146.347,363.552 164.24699,374.155 		"/>
	</g>
	<g>
		<polygon fill="#000000" points="247.64799,248.724 171.384,203.55901 171.384,196.63499 247.679,241.77 		"/>
	</g>
	<g>
		<polygon fill="#000000" points="247.64799,332.82101 171.384,287.65399 171.384,280.73199 247.679,325.86801 		"/>
	</g>
	<g>
		<polygon fill="#000000" points="247.64799,416.91901 171.384,371.75299 171.384,364.82901 247.679,409.96399 		"/>
	</g>
	<path fill="#231F20" d="M458.95599,111.589L270.90399,0.691L84.971,111.021l-0.979,0.582v79.60601l5.133,2.855l-5.133,2.85699
		v77.67l5.036,3.504l-5.039,2.63599v80.116l187.483,111.043l186.504-110.461l0.98001-0.582V282.716l-4.578-3.13501l4.578-3.207
		v-80.453l-5.133-2.85699l5.133-2.855L458.95599,111.589L458.95599,111.589z M270.91599,9.986l178.07498,105.013L271.47501,220.131
		L93.952,114.995L270.91599,9.986z M448.95901,119.667v66.844L273.47601,290.452v-66.856L448.95901,119.667z M269.47501,223.59599
		v66.855L93.992,186.511v-66.844L269.47501,223.59599z M93.992,270.828v-66.83899l175.483,103.92599v66.85901L93.992,270.828z
		 M269.47501,459.09299l-175.483-103.944v-66.84l175.483,103.92599V459.09299L269.47501,459.09299z M95.105,283.30499l5.173-3.70801
		l170.17299,100.40399c0.026,0.01599,0.056,0.01999,0.08301,0.035c0.10999,0.05899,0.22501,0.10699,0.34299,0.14499
		c0.04901,0.01401,0.09698,0.02701,0.147,0.039c0.151,0.035,0.30499,0.061,0.45999,0.061c0.035,0,0.069-0.01199,0.10501-0.01401
		c0.108-0.008,0.216-0.01999,0.32101-0.043c0.077-0.01801,0.151-0.04099,0.22699-0.06799
		c0.06799-0.02301,0.13599-0.05301,0.202-0.086c0.05399-0.02499,0.112-0.03699,0.164-0.06799l167.345-99.12601l6.66101,4.23801
		L271.47501,388.772L95.105,283.30499z M448.95901,355.14899l-175.483,103.944v-66.85699L448.95901,288.31V355.14899
		L448.95901,355.14899z M448.95901,270.828l-175.483,103.94598v-66.85901l175.483-103.92599V270.828L448.95901,270.828z
		 M271.47501,304.452L93.952,199.31799l6.903-4.093l169.595,100.45299c0.16299,0.09601,0.33701,0.164,0.51599,0.211
		c0.15601,0.04099,0.31601,0.06,0.47699,0.06201c0.008,0,0.01599,0.004,0.02301,0.004c0,0,0,0,0.00101,0
		c0.005,0,0.01001,0.00201,0.01501,0.00201c0.353,0,0.70599-0.09399,1.01999-0.27899l169.59302-100.452l6.90201,4.092
		L271.47501,304.452z"/>
</g>
</svg>
`,speech:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="206.8px" height="210.60001px" viewBox="0 0 206.8 210.60001" enable-background="new 0 0 206.8 210.60001"
	 xml:space="preserve">
<g id="Rooftop_1_" opacity="0.1">
	<path fill="#1E1E1E" d="M114.3,208.39999l-61.2-36.8c-3.2-1.89999-3.2-6.5,0-8.39999L80.3,146.8c1.6-0.89999,3.5-0.89999,5,0
		l66.8,40c3.2,1.89999,3.2,6.5,0,8.39999l-22,13.2C125.3,211.3,119.2,211.3,114.3,208.39999z"/>
</g>
<polygon display="none" fill="#CDD9EE" points="101.6,268.70001 -80.8,159.10001 101,49.6 284,159.10001 "/>
<g>
	<path fill="#8E8E8E" d="M143.10001,153.39999c-0.10001,0.10001-0.2,0.10001-0.3,0.2l-4.7,2.8L127.3,163
		c-1,0.60001-2.2,0.89999-3.4,0.89999c-1.2,0-2.3-0.3-3.3-0.89999L58,125.4L30.4,142v-33.2l-0.5-0.3c-3.4-2.1-5.6-5.8-5.6-9.9V25
		c0-2.4,1.3-4.6,3.4-5.7l15-9c1.1-0.9,2.6-1.4,4-1.4c1.2,0,2.3,0.3,3.3,0.9l15,9c0.2-2.2,1.4-4.2,3.4-5.2l15-9
		c1.1-0.9,2.6-1.4,4-1.4c1.2,0,2.3,0.3,3.3,0.9l90.69999,54.5C184.79999,60.7,187,64.4,187,68.5v73.60001
		c0,2.39999-1.3,4.60001-3.5,5.8l-3.89999,2.3l0.8,22.89999L162.5,184L143.10001,153.39999z"/>
	<path fill="#000000" d="M87.4,4.8c0.9,0,1.7,0.2,2.6,0.7L180.7,60c3,1.8,4.8,5.1,4.8,8.6v73.6c0,2-1.2,3.7-2.8,4.5l-4.7,2.8l0.8,22.89999L163,182
		l-19.5-30.8c-0.39999,0.39999-0.89999,0.8-1.39999,1.10001l-4.7,2.8l-10.9,6.60001l0,0c-0.8,0.5-1.7,0.7-2.6,0.7s-1.7-0.2-2.6-0.7
		l-25.1-15.10001l-43.3-26l5,3l-26.1,15.7v-31.4l-1.2-0.7c-3-1.8-4.8-5.1-4.8-8.6V24.9c0-2,1.1-3.6,2.6-4.4l0,0l0,0l0,0l15.1-9.1
		c0.9-0.7,2-1.1,3.1-1.1c0.9,0,1.7,0.2,2.6,0.7l17.3,10.4v-2.1c0-2,1.1-3.6,2.6-4.4l0,0l0,0l0,0l15.1-9.1
		C85.2,5.2,86.3,4.8,87.4,4.8 M87.4,1.8c-1.7,0-3.4,0.6-4.8,1.6l-14.9,8.9c-1.7,0.9-3,2.4-3.6,4.2l-13.3-8c-1.3-0.8-2.7-1.1-4.1-1.1
		C45,7.4,43.3,8,41.9,9L27,17.9c-2.6,1.4-4.2,4.1-4.2,7v73.6c0,4.5,2.3,8.7,6.1,11v29.7v5.3l4.5-2.7L58,127.1l36.7,22.1L119.8,164.3
		c1.2,0.8,2.7,1.10001,4.1,1.10001s2.9-0.39999,4.1-1.10001l10.9-6.60001l3.7-2.2l17.89999,28.10001l1.60001,2.5l2.5-1.5
		L180.49998,175l1.5-0.89999l-0.10001-1.8l-0.7-21.10001l3.10001-1.8c2.7-1.39999,4.3-4.10001,4.3-7.10001V68.6
		c0-4.5-2.39999-8.8-6.3-11.1L91.5,3C90.3,2.2,88.9,1.8,87.4,1.8L87.4,1.8z"/>
</g>
<g id="Speech_Bubble_1_3_">
	<path fill="#BBB8B9" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" d="M140,65.6L49.2,11.1
		c-1.9-1.2-4.1-0.8-5.7,0.4l-15.1,9.1c1.5-0.8,3.3-0.9,4.9,0.1L124,75.2c3,1.8,4.8,5.1,4.8,8.6v73.6c0,1.89999-1,3.39999-2.4,4.3
		l0,0l10.9-6.60001l4.7-2.8c1.60001-0.8,2.8-2.39999,2.8-4.5V74.2C144.8,70.7,143,67.4,140,65.6z"/>
	<path fill="#E0E0E0" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" d="M124.1,75.2L33.4,20.7
		c-3.3-2-7.6,0.4-7.6,4.3v73.6c0,3.5,1.8,6.8,4.8,8.6l1.2,0.7v31.39999L53,120.6l43.3,26.00001l25.1,15.10001
		c3.3,2,7.6-0.39999,7.6-4.3V83.8C128.89999,80.2,127.1,77,124.1,75.2z"/>
	<polygon fill="#7F95AC" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" points="33.5,44.9 33.5,52.5 102.7,94 
		102.7,86.5 	"/>
	<polygon fill="#7F95AC" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" points="33.5,63.5 33.5,71 114.9,119.9 
		114.9,112.3 	"/>
	<polygon fill="#7F95AC" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" points="33.5,82 33.5,89.6 84.6,120.3 
		84.6,112.8 	"/>
	<path fill="#8E8E8E" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" d="M143.60001,69.5l-16.2,9l0,0
		c1,1.6,1.5,3.4,1.5,5.3v73.59999c0,1.89999-1,3.39999-2.4,4.3l0,0l10.9-6.60001l4.7-2.8c1.60001-0.8,2.8-2.39999,2.8-4.5V74.2
		C144.8,72.5,144.39999,70.9,143.60001,69.5z"/>
</g>
<polygon fill="#777777" points="162.10001,156.10001 163,182 178.89999,172.39999 178.10001,149.5 "/>
<g id="Shadow">
	<path fill="#5B5B5B" d="M71.4,101.6"/>
	<polyline opacity="0.5" fill="#1E1E1E" enable-background="new    " points="71.4,101.6 90.5,134.8 128.89999,158.5 
		144.89999,148.89999 144.2,145.3 71.4,101.6 	"/>
</g>
<g id="Speech_Bubble_1_2_">
	<polygon fill="#777777" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" points="162.10001,156.10001 163,182 
		178.89999,172.39999 178.10001,149.5 	"/>
	<path fill="#BBB8B9" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" d="M180.7,60.1L90,5.5c-1.9-1.2-4.1-0.8-5.7,0.4
		L69.2,15c1.5-0.8,3.3-0.9,4.9,0.1l90.69999,54.5c3,1.8,4.8,5.1,4.8,8.6v73.59999c0,1.89999-1,3.39999-2.39999,4.3l0,0
		l10.89999-6.60001l4.7-2.8c1.60001-0.8,2.8-2.39999,2.8-4.5V68.6C185.60001,65.1,183.7,61.9,180.7,60.1z"/>
	<path fill="#FFFFFF" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" d="M164.8,69.6L74.1,15.1
		c-3.3-2-7.6,0.4-7.6,4.3V93c0,3.5,1.8,6.8,4.8,8.6L137,141l26,41l-0.89999-25.89999c3.3,2,7.60001-0.39999,7.60001-4.3V78.2
		C169.7,74.7,167.8,71.4,164.8,69.6z"/>
	<polygon fill="#7F95AC" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" points="86.6,46.5 86.6,54 155.8,95.6 
		155.8,88 	"/>
	<polygon fill="#7F95AC" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" points="74.3,57.9 74.3,65.4 
		155.60001,114.3 155.60001,106.8 	"/>
	<polygon fill="#7F95AC" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" points="104.7,95 104.7,102.5 155.8,133.3 
		155.8,125.7 	"/>
	<path fill="#8E8E8E" stroke="#000000" stroke-width="1.25" stroke-miterlimit="10" d="M184.39999,63.9l-16.2,9l0,0
		c1,1.6,1.5,3.4,1.5,5.3v73.6c0,1.89999-1,3.39999-2.39999,4.3l0,0L178.2,149.5l4.7-2.8c1.60001-0.8,2.8-2.39999,2.8-4.5V68.6
		C185.60001,66.9,185.10001,65.3,184.39999,63.9z"/>
</g>
<polygon fill="#8E8E8E" points="31.9,139.3 58,123.6 53,120.6 "/>
</svg>
`,sphere:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="242.3px" height="192.2px" viewBox="0 0 242.3 192.2" enable-background="new 0 0 242.3 192.2" xml:space="preserve">
<path opacity="0.4" fill="#000000" enable-background="new    " d="M135,101.8c-4,0-7.9,0.1-11.7,0.4v69.69999c3.8,0.2,7.7,0.39999,11.7,0.39999
	c45.39999,0,82.2-15.8,82.2-35.2C217.2,117.5,180.39999,101.8,135,101.8z"/>
<circle fill="#DAE2EF" cx="121.6" cy="95.8" r="75.4"/>
<path fill="#6D85A6" d="M188,91.2c0-38.4-30.5-69.6-68.6-70.7c-38.7,1.1-70,31.3-73,69.5c0,0.4,0,0.8,0,1.2
	c0,39.09999,31.7,70.8,70.8,70.8S188,130.3,188,91.2z"/>
<path fill="#B8C5DA" d="M175.60001,77.9c0-16.5-6-31.6-15.89999-43.3c-11.3-8.5-25.2-13.7-40.4-14.2C100,21,82.5,28.8,69.5,41.3l0,0
	C56.5,53.8,47.9,70.9,46.4,90l0,0c0,0.4,0,0.8,0,1.2c0,4.9,0.5,9.7,1.4,14.3c10.5,23.2,33.8,39.3,60.9,39.3
	C145.7,144.8,175.60001,114.8,175.60001,77.9z"/>
<path fill="#CFD9EC" d="M69.5,41.3L69.5,41.3C59.3,51,51.9,63.5,48.4,77.5C58.4,94.6,76.9,106,98,106c31.8,0,57.5-25.7,57.5-57.5
	c0-6.6-1.10001-12.9-3.2-18.8c-9.8-5.6-21-9-33-9.4C100,21,82.5,28.8,69.5,41.3z"/>
<circle id="Outline" fill="none" stroke="#000000" stroke-width="3" stroke-miterlimit="10" cx="121.6" cy="95.8" r="75.4"/>
</svg>
`,storage:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="567.11798px" height="554.586px" viewBox="0 0 567.11798 554.586" enable-background="new 0 0 567.11798 554.586"
	 xml:space="preserve">
<g>
	<g>
		<path opacity="0.4" fill="#000000" enable-background="new    " d="M527.86102,367.26199c-0.36298,64.24399-90.61798,115.673-201.591,114.87
			c-110.974-0.802-200.64101-53.53201-200.27901-117.776c0.363-64.242,90.618-115.67099,201.592-114.869
			C438.556,250.291,528.22302,303.01999,527.86102,367.26199z"/>
		<path fill="#6885A9" d="M282.742,391.043c-94.838-0.60599-171.5-35.40298-171.23-77.72101l-0.459,71.86301
			c-0.31,48.51401,76.32001,88.33301,171.15799,88.939c94.83701,0.60599,171.97-38.23099,172.27899-86.745l0.45901-71.86301
			C454.67999,357.83301,377.57999,391.64801,282.742,391.043z"/>
		<path fill="#C3D5EA" d="M203.291,463.79199c7.40401,2.017,15.125,3.76599,23.117,5.224l0.52699-82.47501
			c-7.993-1.27899-15.715-2.81201-23.121-4.577L203.291,463.79199z"/>
		<path fill="#C3D5EA" d="M111.513,313.32101l-0.459,71.86301c-0.198,31.039,31.10001,58.51801,78.511,74.44699l0.519-81.306
			C142.661,364.392,111.34,340.397,111.513,313.32101z"/>
		<path fill="#6885A9" d="M283.42599,283.97299c-94.838-0.60599-171.5-35.403-171.23-77.72101l-0.459,71.86301
			c-0.31,48.51401,76.32001,88.336,171.15802,88.94101c94.83701,0.60599,171.97-38.233,172.27899-86.74701l0.45901-71.86301
			C455.36401,250.76401,378.26401,284.57901,283.42599,283.97299z"/>
		<path fill="#C3D5EA" d="M190.24899,352.56201l0.519-81.30701c-47.423-13.931-78.744-37.92801-78.571-65.00299l-0.459,71.86301
			C111.539,309.155,142.838,336.633,190.24899,352.56201z"/>
		<path fill="#C3D5EA" d="M203.97501,356.72198c7.40401,2.017,15.125,3.76599,23.117,5.224l0.52699-82.47601
			c-7.993-1.27802-15.715-2.811-23.121-4.57599L203.97501,356.72198z"/>
		<path fill="#CDD9EE" d="M456.35001,96.32c-0.31,48.514-77.44199,87.35099-172.27902,86.745
			c-94.838-0.606-171.468-40.425-171.158-88.939c0.31-48.513,77.442-87.35,172.28001-86.744
			C380.03101,7.988,456.66,47.807,456.35001,96.32z"/>
		<path fill="#365E7F" d="M283.59601,257.48801c-81.293-0.51901-149.2-29.851-166.74699-68.77301
			c-3.002,5.62199-4.614,11.492-4.652,17.536c-0.27,42.31801,76.391,77.11601,171.22998,77.72099
			c94.83701,0.60599,171.93701-33.209,172.20801-75.528c0.039-6.04401-1.49799-11.93401-4.42801-17.59399
			C433.164,229.545,364.88699,258.00699,283.59601,257.48801z"/>
		<path fill="#365E7F" d="M282.89001,367.97c-82.55899-0.52701-151.30901-30.77301-167.526-70.60098
			c-2.483,5.138-3.816,10.47299-3.851,15.952c-0.27,42.31799,76.39101,77.116,171.23,77.72101
			c94.83701,0.60599,171.93698-33.20901,172.20798-75.52798c0.035-5.479-1.23001-10.83099-3.647-16
			C434.578,339.133,365.448,368.49799,282.89001,367.97z"/>
		<path fill="#FFFFFF" d="M303.319,181.01801c4.69699,0.03,9.23999,0.214,13.83899,0.045
			c-83.953-4.157-149.661-42.692-149.381-86.586c0.28-43.893,66.47301-81.256,150.47301-84.34
			c-4.59601-0.229-9.246-0.059-13.94199-0.089c-10.565-0.133-20.99301,0.337-31.16599,1.34
			c6.54199-0.684,13.22299-1.162,20.02301-1.411c-4.59601-0.229-9.246-0.059-13.94199-0.089
			c-86.541-1.086-164.121,37.954-164.41701,84.251c-0.296,46.298,76.54399,86.164,163.42799,86.71899
			c4.69699,0.03,9.23999,0.214,13.83899,0.045"/>
		<path fill="#6885A9" d="M284.07101,183.06599c-94.838-0.606-171.468-40.425-171.158-88.939l-0.479,74.906
			c-0.31,48.51401,76.32,88.33401,171.15799,88.94c94.83701,0.60599,171.97-38.23199,172.27902-86.746l0.478-74.906
			C456.04001,144.834,378.90799,183.67101,284.07101,183.06599z"/>
		<path fill="#C3D5EA" d="M190.94501,243.479l0.479-74.90601c-47.411-15.92799-78.709-43.407-78.511-74.447l-0.479,74.906
			C112.236,200.07201,143.535,227.55099,190.94501,243.479z"/>
		<path fill="#C3D5EA" d="M227.78799,252.862l0.479-74.90601c-7.992-1.45799-15.71201-3.207-23.117-5.22301l-0.479,74.90599
			C212.076,249.655,219.797,251.40401,227.78799,252.862z"/>
		<path fill="none" d="M190.76801,271.255c4.439,1.30499,9.022,2.51999,13.73,3.64001l0.174-27.256
			c-4.707-1.283-9.289-2.66901-13.72701-4.16L190.76801,271.255z"/>
		<path fill="none" d="M190.084,378.32599c4.439,1.30399,9.022,2.517,13.73,3.63901l0.161-25.24301
			c-4.707-1.28201-9.289-2.668-13.72701-4.16L190.084,378.32599z"/>
		<path fill="#231F20" d="M459.07401,190.96899c3.862-7.645,3.71301-19.22701,3.70401-19.69901l0.478-74.832
			c0.255-2.146,2.98801-32.005-37.21799-59.653C382.91,7.128,323.51199,0.314,304.29099,0.191
			C304.23001,0.189,298.84,0.003,285.19199,0c-13.646-0.171-19.03201-0.054-19.07199-0.053
			c-19.248-0.123-78.728,5.932-122.231,35.036c-40.556,27.132-38.205,57.024-37.97701,59.173l-0.478,74.80201
			c-0.015,0.50101-0.313,12.08099,3.452,19.77499c-4.201,9.25101-3.711,17.22501-3.69,17.474l-0.459,71.86301
			c-0.068,10.62399,2.251,16.793,3.073,18.64001c-0.857,1.86401-3.245,8.203-3.326,21l-0.416,65.46301
			c-0.061,0.93201-1.303,23.06,15.828,42.50299c27.916,31.681,76.05701,50.39999,143.116,55.638
			c0.09698,0.005,6.52899,0.276,14.51901,0.327c1.48099,0.009,3.02399,0.008,4.58301-0.00101
			c1.55701,0.03,3.10001,0.04999,4.582,0.06c7.995,0.05099,14.44101-0.14001,14.55801-0.14301
			c67.09-4.379,115.466-22.48199,143.784-53.80402c17.379-19.22198,16.41901-41.36499,16.37201-42.22299l0.41901-65.53702
			c0.082-12.798-2.22501-19.16602-3.05801-21.04102c0.84601-1.836,3.24301-7.97501,3.311-18.599l0.45401-71.769
			C462.564,208.242,463.15601,200.27299,459.07401,190.96899z M112.946,385.19601l0.351-54.996
			c6.913,14.97,23.14999,28.689,47.411,39.70001c32.56999,14.784,75.90401,23.08701,122.02,23.38199
			c46.11499,0.29501,89.55099-7.45401,122.30701-21.82101c24.39999-10.70001,40.811-24.211,47.91501-39.09201l-0.35101,54.995
			c-0.302,47.267-76.73102,85.23502-170.37299,84.63699C188.582,471.405,112.644,432.46301,112.946,385.19601z M285.17899,9.623
			c93.582,0.598,169.47299,39.485,169.172,86.685c-0.302,47.201-76.68301,85.11501-170.26498,84.51799
			c-93.58301-0.59801-169.474-39.485-169.173-86.686C115.214,46.939,191.595,9.025,285.17899,9.623z M161.968,158.595
			c32.582,16.92999,75.94099,26.41699,122.089,26.711c46.14801,0.295,89.62399-8.63699,122.41901-25.14999
			c24.36499-12.26801,40.75299-27.698,47.85901-44.65l-0.35599,55.70701c-0.03299,5.183-0.983,10.255-2.76901,15.17599
			l-0.095-0.18201l-1.68201,3.608c-8.57901,18.39999-29.52798,35.07401-58.98898,46.952
			c-30.17401,12.164-68.116,18.728-106.83499,18.48c-38.72-0.24699-76.575-7.295-106.591-19.84399
			c-29.30701-12.25301-50.042-29.19301-58.38499-47.701l-1.636-3.629l-0.097,0.181c-1.723-4.94299-2.608-10.02701-2.575-15.21001
			l0.356-55.707C121.572,130.37801,137.761,146.01601,161.968,158.595z M453.634,208.43201
			c-0.125,19.48801-17.65701,37.879-49.36801,51.78699C371.97,274.383,329.06,282.02301,283.44,281.73199
			c-45.621-0.29099-88.42999-8.479-120.54199-23.05402c-31.53-14.312-48.826-32.92599-48.702-52.414
			c0.027-4.25301,0.91-8.505,2.621-12.687c7.904,14.92,23.10899,28.586,44.717,39.813
			c32.567,16.924,75.911,26.40701,122.04399,26.702s89.59399-8.634,122.375-25.14
			c21.74899-10.95,37.12701-24.42101,45.22101-39.23799C452.83301,199.91499,453.66101,204.179,453.634,208.43201z
			 M161.39301,262.83099c32.57001,14.78299,75.905,23.08801,122.01999,23.38199
			c46.11499,0.29501,89.55099-7.45599,122.30701-21.82101c24.39999-10.701,40.811-24.211,47.91501-39.091l-0.35101,54.995
			c-0.302,47.26901-76.73102,85.237-170.37299,84.63901c-93.64301-0.59799-169.58099-39.54001-169.27901-86.80899l0.351-54.995
			C120.895,238.101,137.131,251.819,161.39301,262.83099z M452.95001,315.50201c-0.125,19.487-17.65701,37.879-49.36801,51.78601
			c-32.29501,14.164-75.20599,21.80499-120.82599,21.513c-45.621-0.29099-88.42999-8.48001-120.54199-23.05499
			c-31.53-14.311-48.826-32.92599-48.702-52.41299c0.023-3.63199,0.672-7.27301,1.931-10.86801
			c9.261,18.33099,29.677,34.90799,58.091,47.035c30.69299,13.10001,69.52499,20.45599,109.341,20.70999
			s78.73898-6.60501,109.59601-19.31201c28.56699-11.763,49.19299-28.077,58.68701-46.289
			C452.37201,308.22101,452.97299,311.87,452.95001,315.50201z"/>
	</g>
</g>
</svg>
`,"switch-module":`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="701.40002px" height="477px" viewBox="0 0 701.40002 477" enable-background="new 0 0 701.40002 477" xml:space="preserve">
<g>
	<path fill="#6885A9" d="M1043.80005,247.39999c0.09998,0.89999,0.09998,1.8,0.09998,2.7v-2.7H1043.80005z"/>
	<path fill="#231F20" d="M1045.80005,250.10001H1042c0-0.8,0-1.60001-0.09998-2.5l-0.19995-2.10001h4.09998V250.10001
		L1045.80005,250.10001z"/>
</g>
<g>
	<path fill="#6885A9" d="M1043.80005,151.8c0.09998,0.89999,0.09998,1.8,0.09998,2.7v-2.7H1043.80005z"/>
	<path fill="#231F20" d="M1045.80005,154.5H1042c0-0.8,0-1.60001-0.09998-2.5l-0.19995-2.10001h4.09998V154.5L1045.80005,154.5z"/>
</g>
<path fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="M1043.80005,247.39999
	c0.09998,0.89999,0.09998,1.8,0.09998,2.7v-2.7H1043.80005z"/>
<path fill="#B2CBED" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" d="M1043.80005,151.8
	c0.09998,0.89999,0.09998,1.8,0.09998,2.7v-2.7H1043.80005z"/>
<g>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="478.89999,414.29999 370.60001,442.10001 297.20001,52.2 
		701.40002,295.20001 	"/>
	<polygon fill="#CCD8EE" points="92.4,391.29999 91.4,391.29999 91.4,391.89999 	"/>
	<polygon fill="#CCD8EE" points="92.4,273.39999 91.4,273.39999 91.4,274 	"/>
	<polygon fill="#CDD9EE" points="370.60001,325 94.1,154.5 297.20001,43.4 574.5,213.7 	"/>
	<polygon fill="#CCD8EE" points="92.4,155.5 91.4,155.5 91.4,156.10001 	"/>
	<polygon fill="#B5C5DC" points="91.4,256.10001 370.60001,428.20001 370.60001,428.20001 370.60001,328.20001 91.4,156.10001 	"/>
	<polygon fill="#FFFFFF" points="389,313.89999 152.3,165.89999 336,66.7 297.20001,43.4 94.1,154.5 370.60001,325 	"/>
	<polygon fill="#6885A9" points="577.20001,315.29999 370.60001,428.20001 370.60001,428.20001 370.60001,328.20001 
		577.20001,215.39999 	"/>
	<path fill="#231F20" d="M588.20001,209l-291-178.5L81.7,148.89999l-1.3,0.8V261v0.89999l290.29999,178.69998l217.60001-119.5
		L588.20001,209z M297.20001,43.4L574.5,213.70001L370.60001,325L94.1,154.5L297.20001,43.4z M574.5,220.3v93.40001
		L373.39999,423.29999v-93.5L574.5,220.3z M367.89999,329.79999v93.5L94.2,254.5V161L367.89999,329.79999z"/>
	<polygon fill="#000000" points="182.7,292.89999 159,278.10001 159,255.10001 182.7,269.89999 	"/>
	<polygon fill="#000000" points="144.8,269.60001 121.1,254.8 121.1,231.89999 144.8,246.7 	"/>
	<polygon fill="#000000" points="258.39999,340.89999 234.60001,326.10001 234.60001,303.20001 258.39999,318 	"/>
	<polygon fill="#000000" points="220.5,317.70001 196.8,302.89999 196.8,279.89999 220.5,294.70001 	"/>
	<polygon fill="#000000" points="335.29999,388.20001 311.60001,373.39999 311.60001,350.5 335.29999,365.29999 	"/>
	<polygon fill="#000000" points="297.39999,365 273.70001,350.20001 273.70001,327.20001 297.39999,342 	"/>
	<polygon fill="#000000" points="182.39999,259.60001 158.7,244.8 158.7,221.89999 182.39999,236.7 	"/>
	<polygon fill="#000000" points="144.60001,236.39999 120.9,221.60001 120.9,198.60001 144.60001,213.39999 	"/>
	<polygon fill="#000000" points="258.10001,307.70001 234.39999,292.89999 234.39999,270 258.10001,284.79999 	"/>
	<polygon fill="#000000" points="220.3,284.39999 196.5,269.60001 196.5,246.7 220.3,261.5 	"/>
	<polygon fill="#000000" points="335,355 311.29999,340.20001 311.29999,317.29999 335,332.10001 	"/>
	<polygon fill="#000000" points="297.20001,331.70001 273.5,316.89999 273.5,294 297.20001,308.79999 	"/>
</g>
</svg>
`,tower:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="260.39999px" height="517.70001px" viewBox="0 0 260.39999 517.70001" enable-background="new 0 0 260.39999 517.70001"
	 xml:space="preserve">
<g id="Layer_1_1_" display="none">
	<polygon display="inline" fill="none" stroke="#A7A9AC" stroke-width="4" stroke-miterlimit="10" points="345.60001,375.39999 
		130.2,499.79999 -85.2,375.39999 -85.2,126.7 130.2,2.3 345.60001,126.7 	"/>
</g>
<g id="Layer_2_1_">
	<path fill="#5A5B5B" d="M217.10001,444.10001l-9.39999-51.5l-9-49.39999l0,0l0,0l0,0l-22.5-123.7l0,0l-7.5-41.2l0,0
		l-5.39999-29.60001l-0.7-1c-0.2-0.5-0.5-1-1-1.39999l-0.10001-0.10001l-16.2-9.3l0.7-0.39999l-15.7-9.1l-15.7,9.1l0.7,0.39999
		l-15.7,9.10001L99,146l0,0l0,0c-0.9,0.60001-1.5,1.5-1.7,2.5l0,0l-12.9,70.89999l0,0L61.7,343.20001l0,0l0,0l0,0l-9,49.39999
		l-9.4,51.5c-0.4,2,1,3.89999,3,4.29999c0.2,0,0.4,0.10001,0.7,0.10001c1.7,0,3.3-1.20001,3.6-3l8.5-46.39999l67.5,39v54.79999
		c0,2,1.7,3.70001,3.7,3.70001s3.7-1.70001,3.7-3.70001V438l67.5-39l8.5,46.39999c0.3,1.79999,1.89999,3,3.60001,3
		c0.2,0,0.39999,0,0.7-0.10001C216.10001,448,217.5,446.10001,217.10001,444.10001z M126.5,276.89999L98.5,230.5l28,16.2V276.89999z
		 M133.89999,246.7l28-16.2l-28,46.39999V246.7z M92,218.2l5.1-28.2l23.8,44.89999L92,218.2z M119.6,279.70001l-35.1-20.29999
		l5.3-29.10001L119.6,279.70001z M170.60001,230.39999l5.3,29.10001l-35.09999,20.29999L170.60001,230.39999z M139.5,234.89999
		L163.3,190l5.10001,28.2L139.5,234.89999z M133.89999,229.7v-28.60001l21.8-12.60001L133.89999,229.7z M126.5,229.7l-21.8-41.2
		l21.8,12.60001V229.7z M126.5,292.20001V323.5l-34.2-51.10001L126.5,292.20001z M133.89999,292.20001l34.2-19.79999l-34.2,51.10001
		V292.20001z M160.89999,177l-20.60001,11.89999l17.3-29.89999L160.89999,177z M99.5,177l3.2-17.3l17.2,29.10001L99.5,177z
		 M118.3,324.5L77,300.70001L82.4,271L118.3,324.5z M178,271l5.39999,29.70001l-41.3,23.89999L178,271z M133.89999,185.2v-18.60001
		l16.2-9.3L133.89999,185.2z M126.5,185.39999l-17-28.7l17,9.8V185.39999z M126.5,337.79999v32.10001L86.1,314.5L126.5,337.79999z
		 M133.89999,337.79999L174.29999,314.5l-40.39999,55.39999V337.79999z M133.89999,160.5v-17.2l4-2.3l14.89999,8.60001
		L133.89999,160.5z M122.6,141l4,2.3v17.2l-18.9-10.89999L122.6,141z M75,311.70001l42,57.60001l-47.5-27.39999L75,311.70001z
		 M185.5,311.70001l5.5,30.20001l-47.5,27.39999L185.5,311.70001z M126.5,383.39999v40.89999L78,355.39999L126.5,383.39999z
		 M133.89999,383.39999l48.5-28l-48.5,68.89999V383.39999z M67.4,353.20001l50.1,71.20001l-57.1-33L67.4,353.20001z
		 M142.89999,424.29999L193,353.09998l7,38.20001L142.89999,424.29999z"/>
	<path fill="#808285" d="M130,127.4l-15.5,8.9l0.7,0.39999L99.5,145.8L99,146l0,0l0,0c-0.9,0.60001-1.5,1.5-1.7,2.5l0,0
		l-12.9,70.89999l0,0L61.7,343.20001l0,0l0,0l0,0l-9,49.39999l-9.4,51.5c-0.4,2,1,3.89999,3,4.29999c0.2,0,0.4,0.10001,0.7,0.10001
		c1.7,0,3.3-1.20001,3.6-3l8.5-46.39999l67.5,39v54.79999c0,2,1.5,3.5,3.39999,3.70001V127.4L130,127.4z M102.7,159.60001
		l17.2,29.10001L99.5,177L102.7,159.60001z M97.2,190l23.8,44.89999l-29-16.7L97.2,190z M89.8,230.39999l29.8,49.39999
		l-35.1-20.29999L89.8,230.39999z M82.4,271l35.9,53.60001L77,300.70001L82.4,271z M75,311.70001l42,57.60001l-47.5-27.39999
		L75,311.70001z M60.5,391.39999l7-38.20001l50.1,71.19998L60.5,391.39999z M126.5,424.29999L78,355.39999l48.5,28V424.29999z
		 M126.5,369.89999L86.1,314.5l40.4,23.29999V369.89999z M126.5,323.5l-34.2-51.10001l34.2,19.79999V323.5z M126.5,276.89999
		L98.5,230.5l28,16.2V276.89999z M126.5,229.7l-21.8-41.2l21.8,12.60001V229.7z M126.5,185.39999l-17-28.7l17,9.8V185.39999z
		 M126.5,160.5l-18.9-10.89999L122.5,141l4,2.3V160.5L126.5,160.5z"/>
	<g>
		<polygon fill="#808285" points="130.2,145.3 107.3,132 123.2,10 130.2,14 		"/>
	</g>
	<g>
		<polygon fill="#5A5B5B" points="130.2,145.3 153.2,132 137.2,10 130.2,14 		"/>
	</g>
	<g>
		<polygon fill="#BCBEC0" points="130.2,5.9 123.2,10 130.2,14 137.2,10 		"/>
	</g>
</g>
<path opacity="0.25" fill="#000000" enable-background="new    " d="M203.3,447.29999c5.39999,12.79999-18.5,30.20001-58.59999,32
	S63.4,466.60001,58,453.70001s19.8-30.5,59.9-32.20001S197.89999,434.5,203.3,447.29999z"/>
</svg>
`,"truck-2":'<?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 243.55 218.14"><defs><clipPath id="clippath"><path d="M38.75,134.54c.02-5.36,1.91-9.13,4.96-10.9" fill="none"/></clipPath></defs><g id="Body"><g id="RearWheel"><path id="Shadow" d="M2.57,121.67l74.24-41.81c1.59-.92,3.55-.93,5.14-.02l154.15,87.89c3.45,1.97,3.48,6.92,.05,8.93l-67.96,38.83c-5.98,3.5-13.37,3.54-19.38,.11L2.6,130.6c-3.45-1.97-3.47-6.94-.04-8.94Z" fill="#010101" isolation="isolate" opacity=".4"/><path d="M176.15,196.5c.03-9.07-6.35-20.12-14.25-24.68-3.8-2.19-7.25-2.47-9.82-1.17h0l-.2,.1s-.1,.05-.15,.08l-13.56,7.35v.02c-2.98,1.29-4.89,4.6-4.9,9.52-.03,9.07,6.35,20.12,14.25,24.68,3.98,2.3,7.58,2.5,10.18,.99l13.09-7.17c.73-.25,1.4-.62,2.01-1.1h.02c2.07-1.67,3.33-4.61,3.34-8.61Z" fill="#2b2b2b"/><ellipse cx="147.6" cy="196.25" rx="6.48" ry="11.19" transform="translate(-78.62 100.74) rotate(-30.16)" fill="#efefef"/></g><g id="RearWheel-2"><path d="M233.98,168.48c.03-9.07-6.35-20.12-14.25-24.68-3.8-2.19-7.25-2.47-9.82-1.17h0l-.2,.1s-.1,.05-.15,.08l-13.56,7.35v.02c-2.98,1.29-4.89,4.6-4.9,9.52-.03,9.07,6.35,20.12,14.25,24.68,3.98,2.3,7.58,2.5,10.18,.99l13.09-7.17c.73-.25,1.4-.62,2.01-1.1h.02c2.07-1.67,3.33-4.61,3.34-8.61Z" fill="#2b2b2b"/><ellipse cx="205.44" cy="168.23" rx="6.48" ry="11.19" transform="translate(-56.71 126) rotate(-30.16)" fill="#efefef"/></g><g id="UnderCarriage"><g isolation="isolate"><polygon points="232.98 144.78 163.69 185.51 35.16 111.3 104.45 70.58 232.98 144.78" fill="#999"/><g><path d="M163.65,202.81c-.17,0-.34-.04-.5-.13-.31-.18-.5-.51-.5-.87l.05-16.3c0-.35,.19-.68,.49-.86l69.29-40.72c.16-.09,.33-.14,.51-.14s.34,.04,.5,.13c.31,.18,.5,.51,.5,.87l-.05,16.3c0,.35-.19,.68-.49,.86l-69.29,40.72c-.16,.09-.33,.14-.51,.14Z" fill="#727372"/><path d="M232.98,144.78l-.05,16.3-69.29,40.72,.05-16.3,69.29-40.72m0-2c-.35,0-.7,.09-1.01,.28l-69.29,40.72c-.61,.36-.98,1.01-.99,1.72l-.05,16.3c0,.72,.38,1.38,1,1.74,.31,.18,.65,.27,1,.27s.7-.09,1.01-.28l69.29-40.72c.61-.36,.98-1.01,.99-1.72l.05-16.3c0-.72-.38-1.38-1-1.74-.31-.18-.65-.27-1-.27h0Zm0,4h0Z" fill="#1d1d1b"/></g><g><path d="M163.65,202.81c-.17,0-.35-.04-.5-.13L34.62,128.47c-.31-.18-.5-.51-.5-.87l.05-16.3c0-.36,.19-.69,.5-.86,.15-.09,.33-.13,.5-.13s.35,.04,.5,.13l128.53,74.21c.31,.18,.5,.51,.5,.87l-.05,16.3c0,.36-.19,.69-.5,.86-.15,.09-.33,.13-.5,.13Z" fill="#727372"/><path d="M35.16,111.3l128.53,74.21-.05,16.3L35.12,127.6l.05-16.3m0-2c-.34,0-.69,.09-1,.27-.62,.36-1,1.01-1,1.73l-.05,16.3c0,.72,.38,1.38,1,1.74l128.53,74.21c.31,.18,.65,.27,1,.27s.69-.09,1-.27c.62-.36,1-1.01,1-1.73l.05-16.3c0-.72-.38-1.38-1-1.74L36.16,109.57c-.31-.18-.65-.27-1-.27h0Z" fill="#1d1d1b"/></g></g></g><g isolation="isolate"><g isolation="isolate"><g clip-path="url(#clippath)"><g isolation="isolate"><path d="M40.77,126.52c.79-1.23,1.78-2.2,2.94-2.88" fill="#5f6060"/><path d="M103.86,88.69c-1.16,.68-2.16,1.64-2.94,2.88" fill="#5f6060"/><path d="M40.13,127.68c.19-.41,.41-.8,.64-1.16" fill="#606261"/><path d="M100.92,91.56c-.23,.36-.45,.75-.64,1.16" fill="#606261"/><path d="M39.72,128.65c.12-.33,.26-.66,.41-.97" fill="#626363"/><path d="M100.27,92.73c-.15,.31-.28,.63-.41,.97" fill="#626363"/><path d="M39.42,129.54c.09-.31,.19-.61,.3-.89" fill="#646564"/><path d="M99.87,93.69c-.11,.29-.21,.59-.3,.89" fill="#646564"/><path d="M39.2,130.41c.07-.3,.14-.59,.23-.87" fill="#656666"/><path d="M99.57,94.59c-.08,.28-.16,.57-.23,.87" fill="#656666"/><path d="M39.03,131.24c.05-.28,.1-.56,.17-.83" fill="#676868"/><path d="M99.34,95.46c-.06,.27-.12,.55-.17,.83" fill="#676868"/><path d="M38.91,132.05c.03-.28,.08-.55,.12-.81" fill="#686969"/><path d="M99.18,96.29c-.05,.27-.09,.54-.12,.81" fill="#686969"/><path d="M38.82,132.87c.02-.28,.05-.55,.08-.82" fill="#6a6b6b"/><path d="M99.06,97.1c-.03,.27-.06,.54-.08,.82" fill="#6a6b6b"/><path d="M38.77,133.67c.01-.27,.03-.54,.05-.8" fill="#6b6c6c"/><path d="M98.97,97.92c-.02,.26-.04,.53-.05,.8" fill="#6b6c6c"/><path d="M38.75,134.5c0-.28,0-.55,.02-.82" fill="#6d6e6e"/><path d="M98.92,98.72c-.01,.27-.02,.54-.02,.82" fill="#6d6e6e"/><path d="M38.75,134.54v-.05" fill="#6e6f6f"/><path d="M98.9,99.54v.05" fill="#6e6f6f"/></g></g></g><g id="FrontWheel"><g><path d="M59.57,160.05c-2.18,0-4.5-.7-6.91-2.09-8.16-4.71-14.78-16.17-14.75-25.55,.01-5.04,1.95-8.79,5.33-10.35,.03-.02,.06-.04,.1-.06l13.91-7.53c.06-.03,.13-.06,.19-.08,1.13-.54,2.38-.81,3.73-.81,2.17,0,4.49,.7,6.89,2.08,8.16,4.71,14.78,16.17,14.75,25.55-.01,4.11-1.31,7.42-3.66,9.33-.04,.04-.09,.08-.14,.11-.65,.5-1.37,.9-2.16,1.19l-13.02,7.13c-1.24,.72-2.67,1.09-4.25,1.09h0Z" fill="#2b2b2b"/><path d="M61.16,114.57c1.92,0,4.09,.62,6.39,1.95,7.9,4.56,14.27,15.61,14.25,24.68-.01,4-1.27,6.94-3.34,8.59h-.02c-.6,.49-1.28,.86-2.01,1.11l-13.09,7.17c-1.09,.64-2.37,.97-3.77,.97-1.93,0-4.11-.63-6.41-1.96-7.9-4.56-14.27-15.61-14.25-24.68,.01-4.92,1.92-8.23,4.91-9.52v-.02l13.56-7.35s.1-.05,.15-.08l.2-.11h0c1.02-.5,2.17-.77,3.43-.77m0-2c-1.48,0-2.85,.3-4.1,.89-.1,.03-.2,.08-.29,.13l-.2,.11c-.07,.04-.12,.07-.17,.09l-13.55,7.34s-.07,.04-.11,.06c-3.7,1.74-5.82,5.81-5.84,11.22-.03,9.86,6.67,21.47,15.25,26.42,2.56,1.48,5.05,2.23,7.41,2.23,1.74,0,3.34-.41,4.75-1.23l12.94-7.08c.87-.32,1.68-.77,2.4-1.34,.02-.01,.03-.03,.05-.04h0c2.62-2.1,4.08-5.7,4.09-10.15,.03-9.86-6.67-21.46-15.25-26.42-2.55-1.47-5.03-2.22-7.39-2.22h0Z" fill="#1d1d1b"/></g><ellipse cx="53.25" cy="140.95" rx="6.48" ry="11.19" transform="translate(-63.61 45.84) rotate(-30.16)" fill="#efefef"/></g><g><path d="M66.36,72.58l-.17,58.24-10.39-6c-9.39-5.42-17.02-1.07-17.06,9.72L5.34,115.25l.05-17.39L24.9,48.64l41.46,23.94Z" fill="#b6c5dd"/><polygon points="13.8 76.64 66.26 107.18 66.36 72.58 24.9 48.64 13.8 76.64"/></g><polygon points="66.36 72.58 126.51 37.62 126.34 95.87 66.2 130.82 66.36 72.58" fill="#6885aa"/><polygon points="24.9 48.64 85.05 13.69 126.51 37.62 66.36 72.58 24.9 48.64" fill="#cdd9ee"/></g><polygon id="Front" points="172.44 199.11 172.71 105.68 240.21 66.16 240.55 159.76 172.44 199.11" fill="#6885aa" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><polygon id="Side" points="62.8 135.81 63.07 42.37 172.71 105.68 172.44 199.11 62.8 135.81" fill="#b6c5dd" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><polygon id="Top" points="63.07 42.37 130.82 3 240.21 66.16 172.71 105.68 63.07 42.37" fill="#cdd9ee" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><polygon points="172.44 173.78 62.8 112.04 62.8 93.31 172.44 155.05 172.44 173.78" fill="#d60756" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="2"/><line x1="210.24" y1="84.22" x2="210.24" y2="177.28" fill="#6885aa" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><path d="M130.82,3l109.39,63.16,.34,93.61-7.07,4.09c.32,1.57,.51,3.13,.51,4.63-.01,4-1.27,6.94-3.34,8.59h-.02c-.6,.49-1.28,.86-2.01,1.11l-13.09,7.17c-1.09,.64-2.37,.97-3.77,.97-1.93,0-4.11-.63-6.41-1.96-1.14-.66-2.24-1.46-3.3-2.36l-25.92,14.98c-.11,3.75-1.33,6.53-3.32,8.11h-.02c-.6,.49-1.28,.86-2.01,1.11l-13.09,7.17c-1.09,.64-2.37,.97-3.77,.97-1.93,0-4.11-.63-6.41-1.96-7.9-4.56-14.27-15.61-14.25-24.68,0-1.18,.13-2.26,.34-3.25l-57.65-33.28-12.61,6.91c-1.09,.64-2.37,.97-3.77,.97-1.93,0-4.11-.63-6.41-1.96-7.9-4.56-14.27-15.61-14.25-24.68,0-.2,.02-.37,.03-.56-.12,.85-.18,1.74-.18,2.69L5.34,115.25l.05-17.39L24.9,48.64,85.05,13.69l13.74,7.93L130.82,3m0-3c-.52,0-1.04,.14-1.51,.41l-30.53,17.74-12.23-7.06c-.46-.27-.98-.4-1.5-.4-.52,0-1.04,.14-1.51,.41L23.39,46.05c-.58,.34-1.03,.86-1.28,1.49L2.6,96.75c-.14,.35-.21,.72-.21,1.1l-.05,17.39c0,1.07,.57,2.07,1.5,2.61l32.42,18.72c1.51,9.11,7.72,18.69,15.4,23.13,2.71,1.57,5.37,2.36,7.91,2.36,1.92,0,3.68-.46,5.24-1.36l11.1-6.08,54.43,31.42c-.05,.55-.07,1.1-.07,1.66-.03,10.19,6.89,22.17,15.75,27.29,2.71,1.57,5.37,2.36,7.91,2.36,1.92,0,3.68-.46,5.24-1.36l12.86-7.04c.94-.36,1.81-.85,2.59-1.46,.02-.02,.04-.03,.06-.05h0c2.42-1.93,3.89-4.9,4.32-8.65l22.79-13.17c.69,.5,1.38,.95,2.06,1.34,2.71,1.57,5.37,2.36,7.91,2.36,1.92,0,3.68-.46,5.24-1.36l12.86-7.04c.94-.36,1.81-.85,2.59-1.46,.02-.02,.04-.03,.06-.05h0c2.87-2.29,4.45-6.17,4.47-10.93,0-.98-.07-2.01-.2-3.08l5.27-3.04c.93-.54,1.5-1.53,1.5-2.61l-.34-93.61c0-1.07-.58-2.05-1.5-2.59L132.32,.4c-.46-.27-.98-.4-1.5-.4h0Z" fill="#1d1d1b"/></svg>',truck:'<?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.81 260.55"><path id="Shadow" d="M13.75,167.78l71.39-40.21c1.53-.89,3.41-.9,4.95-.02l148.23,84.51c3.31,1.89,3.34,6.66,.05,8.59l-65.35,37.34c-5.75,3.36-12.85,3.41-18.64,.11L13.78,176.38c-3.32-1.89-3.34-6.67-.04-8.59Z" fill="#010101" isolation="isolate" opacity=".4"/><g id="Body"><g id="RearWheel"><path d="M54.3,164.15c.03-9.07-6.35-20.12-14.25-24.68-3.8-2.19-7.25-2.47-9.82-1.17h0l-.2,.1s-.1,.05-.15,.08l-13.56,7.35v.02c-2.98,1.29-4.89,4.6-4.9,9.52-.03,9.07,6.35,20.12,14.25,24.68,3.98,2.3,7.58,2.5,10.18,.99l13.09-7.17c.73-.25,1.4-.62,2.01-1.1h.02c2.07-1.67,3.33-4.61,3.34-8.61Z" fill="#2b2b2b"/><ellipse cx="25.76" cy="163.9" rx="6.48" ry="11.19" transform="translate(-78.87 35.13) rotate(-30.16)" fill="#efefef"/></g><g id="UnderCarriage"><g isolation="isolate"><polygon points="192.03 177.2 139.18 207.91 10.65 133.71 63.5 102.99 192.03 177.2" fill="#999"/><polygon points="192.03 177.2 191.98 193.5 139.13 224.21 139.18 207.91 192.03 177.2" fill="#8e8f8f"/><polygon points="139.18 207.91 139.13 224.21 10.6 150.01 10.65 133.71 139.18 207.91" fill="#727372"/></g></g><g id="FrontWheel"><path d="M156.26,223.64c.03-9.07-6.35-20.12-14.25-24.68-3.8-2.19-7.25-2.47-9.82-1.17h0l-.2,.1s-.1,.05-.15,.08l-13.56,7.35v.02c-2.98,1.29-4.89,4.6-4.9,9.52-.03,9.07,6.35,20.12,14.25,24.68,3.98,2.3,7.58,2.5,10.18,.99l13.09-7.17c.73-.25,1.4-.62,2.01-1.1h.02c2.07-1.67,3.33-4.61,3.34-8.61Z" fill="#2b2b2b"/><ellipse cx="127.67" cy="223.1" rx="6.48" ry="11.19" transform="translate(-94.81 94.35) rotate(-30.16)" fill="#efefef"/></g><g id="Side"><polygon points="3 135.81 3.26 42.37 112.91 105.68 112.64 199.11 3 135.81" fill="#b6c5dd"/></g><polygon id="Top" points="3.26 42.37 71.02 3 180.4 66.16 112.91 105.68 3.26 42.37" fill="#cdd9ee"/><polygon id="Front" points="112.64 199.11 112.91 105.68 180.4 66.16 180.75 159.76 112.64 199.11" fill="#6885aa"/><polygon points="112.64 173.78 3 112.04 3 93.31 112.64 155.05 112.64 173.78" fill="#d60756" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="2"/><g id="Outline"><polygon id="Side-2" points="3 135.81 3.26 42.37 112.91 105.68 112.64 199.11 3 135.81" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><polygon id="Front-2" points="112.64 199.11 112.91 105.68 180.4 66.16 180.75 159.76 112.64 199.11" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line id="Undercarriage" x1="112.91" y1="209.74" x2="10.6" y2="150.01" fill="#727372" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g></g><g id="Cab"><g id="Front-3"><polygon id="Front-4" points="157.32 168.17 174.24 232.24 233.54 196.91 216.77 133.07 157.32 168.17" fill="#859ebb"/><polyline points="213.89 134.78 160.31 166.65 170.65 206.06 224.65 174.88 214.31 135.48"/><polygon points="180.53 200.35 201.92 188.01 217.1 146.1 214.31 135.48 213.89 134.78 201.66 142.05 180.53 200.35" fill="#6885aa"/><polygon points="170.35 204.93 170.65 206.06 175.71 203.14 196.8 144.94 190.8 148.51 170.35 204.93" fill="#6885aa"/><polygon points="213.89 134.78 160.31 166.65 170.65 206.06 224.65 174.88 213.89 134.78" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="2"/></g><polygon id="Roof" points="119.75 146.66 179.29 111.22 216.77 133.07 157.32 168.17 119.75 146.66" fill="#cdd9ee"/><g id="Grill"><polygon id="Grill-2" points="173.33 248.41 233.54 213.29 233.54 196.91 174.24 232.24 173.33 248.41" fill="#a8a7a7"/><polygon points="174.24 232.24 233.54 196.91 233.54 213.29 173.33 248.41 174.24 232.24" fill="#6885aa"/><g id="Lights"><g><polygon points="177.6 233.23 189.1 226.37 189.1 236.57 177.71 243.22 177.6 233.23" fill="#fff"/><path d="M188.1,228.13v7.86l-9.41,5.49-.09-7.7,9.5-5.66m2-3.52l-13.51,8.05,.14,12.28,13.37-7.8v-12.53h0Z" fill="#1d1d1b"/></g><g><polygon points="219.2 208.27 231.12 201.17 231.12 211.9 219.27 218.81 219.2 208.27" fill="#fff"/><path d="M230.12,202.93v8.4l-9.87,5.76-.05-8.24,9.92-5.91m2-3.52l-13.93,8.3,.09,12.84,13.84-8.08v-13.07h0Z" fill="#1d1d1b"/></g></g></g><g id="Side-3"><path id="RightSide" d="M154.87,165.83l-15.66-9.04-17.14-9.89c-1.81-1.05-3.29-.21-3.29,1.88l-.08,26.6-.07,24.89,9.6,5.54c4.21,2.44,8,6.6,10.75,11.36,2.76,4.77,4.45,10.15,4.44,15l11.06,6.38,16.72,9.65c1.97,1.14,3.4-.18,2.9-2.66l.14-13.3-15.39-60.58c-.47-2.35-2.11-4.75-3.98-5.83" fill="#b6c5dd"/><path id="SideWindow" d="M167.59,206.06l-8.74-34.41c-.47-2.35-2.11-4.75-3.98-5.83l-15.66-9.04-17.14-9.89c-1.81-1.05-3.29-.21-3.29,1.88l-.08,26.6v2.4l48.88,28.28Z"/></g><g id="Outline-2"><polyline id="Roof-2" points="157.32 168.17 120.46 147.06 181.9 110.59" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><polyline id="RightSide-2" points="216.77 133.07 157.32 168.17 174.24 232.24 174.24 250.27" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><g id="RightSide-3"><path d="M120.81,148.49c.07,.03,.16,.07,.27,.13l17.14,9.89,15.66,9.04c1.37,.79,2.66,2.72,3.02,4.49v.05l.02,.05,15.33,60.33-.14,13.04v.21l.04,.21c.04,.22,.06,.4,.06,.53l-16.72-9.65-10.08-5.82c-.23-4.73-1.87-9.95-4.68-14.83-3.04-5.26-7.11-9.55-11.48-12.09l-8.59-4.96,.07-23.73,.08-26.6c0-.11,0-.21,.02-.28m-.2-2.05c-1.08,0-1.81,.85-1.82,2.33l-.08,26.6-.07,24.89,9.6,5.54c4.21,2.44,8,6.6,10.75,11.36,2.76,4.77,4.45,10.15,4.44,15l11.06,6.38,16.72,9.65c.49,.28,.94,.41,1.34,.41,1.22,0,1.94-1.21,1.56-3.07l.14-13.3-15.39-60.58c-.47-2.35-2.11-4.75-3.98-5.83l-15.66-9.04-17.14-9.89c-.53-.31-1.03-.45-1.47-.45h0Z" fill="#1d1d1b"/></g></g></g><g id="Outline-3"><path d="M71.02,3l109.39,63.16,.17,45.82,36.2,21.1,16.77,63.84v16.38l-60.17,35.1h-.02l-.02,.02h0c-.23,.13-.49,.2-.79,.2-.4,0-.85-.13-1.34-.41l-16.72-9.65-6.66-3.85-9.67,5.62-.35,.2c-1.09,.64-2.37,.97-3.77,.97-1.93,0-4.11-.63-6.41-1.96-7.9-4.56-14.27-15.61-14.25-24.68,0-.52,.03-1.01,.07-1.49,.02-.28,.07-.53,.1-.8,.03-.17,.05-.35,.08-.52,.06-.34,.14-.67,.22-.99,.02-.06,.03-.12,.05-.17,.1-.36,.21-.71,.34-1.04l-64.67-37.34c-.57,.71-1.22,1.3-1.96,1.73l-11.71,6.8h0c-1.09,.63-2.36,.96-3.76,.96-1.93,0-4.11-.63-6.41-1.96-7.9-4.56-14.27-15.61-14.25-24.68,0-1.68,.23-3.18,.65-4.47l-1.51-.87,.03-9.79-7.63-4.41,.26-93.44L71.02,3m66.78,237.52h0m0,0h0M71.02,0c-.52,0-1.04,.14-1.51,.41L1.76,39.78c-.92,.54-1.49,1.52-1.49,2.59L0,135.8c0,1.07,.57,2.07,1.5,2.61l6.13,3.54-.02,8.06c0,.91,.41,1.76,1.09,2.32-.15,.96-.23,1.97-.23,3.02-.03,10.19,6.89,22.17,15.75,27.29,2.71,1.57,5.37,2.36,7.91,2.36,1.86,0,3.57-.43,5.1-1.27,.06-.03,.12-.06,.18-.09l11.71-6.8c.31-.18,.61-.38,.9-.6l60.71,35.05c-.02,.08-.03,.17-.05,.25-.03,.14-.05,.31-.07,.47l-.02,.14-.02,.17c-.04,.26-.07,.52-.1,.8-.05,.59-.08,1.16-.08,1.74-.03,10.19,6.89,22.17,15.75,27.29,2.71,1.57,5.37,2.36,7.91,2.36,1.85,0,3.56-.43,5.09-1.27,.12-.06,.23-.12,.34-.19l.2-.12,8.17-4.74,5.16,2.98,16.72,9.65c.93,.54,1.89,.81,2.84,.81,.75,0,1.48-.18,2.12-.51,.06-.03,.12-.06,.17-.09h.02l.02-.02h0l60.17-35.1c.92-.54,1.49-1.52,1.49-2.59v-16.38c0-.26-.03-.51-.1-.76l-16.77-63.84c-.2-.77-.7-1.43-1.39-1.83l-34.72-20.24-.16-44.1c0-1.07-.58-2.05-1.5-2.59L72.52,.4c-.46-.27-.98-.4-1.5-.4h0Z" fill="#1d1d1b"/></g></svg>',user:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="676.88898px" height="638.62799px" viewBox="0 0 676.88898 638.62799" enable-background="new 0 0 676.88898 638.62799"
	 xml:space="preserve">
<g>
	<path opacity="0.4" fill="#000000" enable-background="new    " d="M415.931,481.16L415.931,481.16"/>
	<g>
		<path fill="#231F20" d="M411.659,479.13199l3.51099,2.02802l3.51501-2.02802"/>
	</g>
</g>
<g>
	<g>
		<path fill="#C3D5EA" d="M396.936,181.847c0,48.927-39.66299,65.692-88.59201,37.44301c-48.927-28.248-88.59-90.812-88.59-139.739
			s39.66299-65.692,88.59-37.443C357.27399,70.355,396.936,132.918,396.936,181.847z"/>
		<path fill="#FAFCFF" d="M243.83501,91.772c0-42.682,30.18599-60.883,70.37199-46.082c-1.93799-1.246-3.892-2.445-5.862-3.583
			c-48.927-28.248-88.59-11.484-88.59,37.443c0,48.92799,39.66299,111.49199,88.59,139.739
			c6.24701,3.606,12.33899,6.474,18.21899,8.63901C280.371,198.24001,243.83501,138.729,243.83501,91.772z"/>
		<path fill="#365E7F" d="M245.715,163.673l-28.313,16.13699l0.00301,0.004c0.42799-0.23399,0.868-0.452,1.304-0.675
			c0.242-0.12399,0.478-0.254,0.72301-0.37399c0.832-0.408,1.67799-0.79401,2.535-1.16299c0.28-0.12,0.56599-0.233,0.849-0.34801
			c0.63901-0.263,1.286-0.515,1.94099-0.755c0.308-0.114,0.61501-0.226,0.925-0.33501c0.79201-0.276,1.593-0.537,2.40401-0.78
			c0.13901-0.04201,0.276-0.089,0.41499-0.13c0.957-0.28,1.927-0.532,2.908-0.767c0.26199-0.063,0.528-0.119,0.79201-0.179
			c0.774-0.175,1.554-0.336,2.34399-0.483c0.26601-0.049,0.532-0.101,0.8-0.147c2.07899-0.36,4.209-0.62601,6.388-0.79601
			c0.22701-0.017,0.457-0.03101,0.686-0.047c0.92799-0.063,1.86301-0.11,2.80901-0.138c0.19901-0.006,0.396-0.01601,0.597-0.02
			c2.295-0.05099,4.638,0,7.028,0.153c0.186,0.013,0.375,0.02699,0.563,0.03999c1.091,0.078,2.19,0.175,3.299,0.295
			c0.078,0.009,0.15399,0.013,0.233,0.02c0.00101,0.00101,0.00201,0.002,0.00201,0.002c-2.883-3.722-5.638-7.53799-8.25-11.427
			C247.68401,162.37,246.68401,163,245.715,163.673z"/>
		<path fill="#C3D5EA" d="M430.01001,379.423c-0.01099-0.36301-0.02399-0.72699-0.04001-1.09
			c-0.04901-1.21799-0.11401-2.439-0.19601-3.66699c-0.01401-0.17599-0.021-0.35199-0.034-0.53
			c-0.10001-1.38199-0.22299-2.77301-0.36401-4.168c-0.03699-0.353-0.077-0.707-0.11401-1.06201
			c-0.12799-1.177-0.26999-2.35699-0.42899-3.54099c-0.034-0.271-0.06601-0.539-0.104-0.80899
			c-0.19299-1.409-0.41-2.82401-0.64401-4.242c-0.05301-0.31699-0.10999-0.63501-0.164-0.952
			c-0.20499-1.19101-0.42401-2.384-0.655-3.582c-0.06299-0.31601-0.12201-0.634-0.18301-0.95001
			c-0.289-1.43799-0.595-2.883-0.923-4.32901c-0.05499-0.241-0.11401-0.483-0.168-0.72601c-0.29099-1.255-0.595-2.513-0.91501-3.772
			c-0.08401-0.332-0.16699-0.66599-0.25201-0.99899c-0.38199-1.47501-0.77899-2.952-1.19901-4.431
			c-0.02701-0.09799-0.05801-0.19601-0.08499-0.29501c-0.39999-1.39099-0.81699-2.784-1.24899-4.17899
			c-0.10101-0.32401-0.202-0.64999-0.30301-0.97501c-0.94601-2.99799-1.96799-6.00101-3.06201-9.005
			c-0.10901-0.29401-0.215-0.58801-0.32401-0.88101c-0.53699-1.45099-1.08499-2.90302-1.65399-4.354
			c-0.021-0.04999-0.04001-0.10001-0.06-0.14999c-0.60599-1.54401-1.23499-3.086-1.88199-4.62799
			c-0.09601-0.23401-0.19699-0.46899-0.29501-0.703c-0.60001-1.42099-1.21399-2.841-1.845-4.26001
			c-0.05301-0.11801-0.104-0.237-0.15601-0.35599c-0.698-1.561-1.41599-3.11899-2.14999-4.67599
			c-0.06601-0.14401-0.13599-0.28601-0.20401-0.42899c-0.689-1.452-1.392-2.89999-2.11099-4.34698
			c-0.07101-0.142-0.14099-0.28201-0.21201-0.42499c-0.79001-1.582-1.59698-3.15799-2.42401-4.733
			c-0.00299-0.005-0.00601-0.009-0.008-0.01401c-0.80801-1.54001-1.63901-3.07401-2.48001-4.604
			c-0.078-0.14099-0.15302-0.28101-0.233-0.42099c-1.72-3.11301-3.51001-6.207-5.36801-9.27701
			c-0.069-0.11301-0.13599-0.22601-0.207-0.33899c-1.88-3.099-3.82901-6.173-5.841-9.21701
			c-0.04501-0.06699-0.08899-0.133-0.13199-0.20001c-2.04599-3.08801-4.15601-6.146-6.32999-9.164
			c-0.00201-0.00299-0.00299-0.00699-0.008-0.01001c-7.69699-10.692-16.17499-20.91299-25.26001-30.397
			c-14.496,1.974-32.23599-2.183-51.39899-13.248c-19.16101-11.063-36.901-27.38899-51.39499-46.099
			c-0.07901-0.009-0.15701-0.01601-0.23599-0.02299c-1.10899-0.12-2.20799-0.217-3.299-0.295
			c-0.188-0.013-0.37601-0.02699-0.563-0.03999c-2.39-0.153-4.733-0.20399-7.028-0.153c-0.201,0.005-0.399,0.01401-0.597,0.02
			c-0.946,0.028-1.881,0.07401-2.80901,0.138c-0.229,0.01601-0.45799,0.02901-0.686,0.047c-2.179,0.16901-4.308,0.436-6.388,0.79601
			c-0.26801,0.047-0.534,0.097-0.8,0.147c-0.78999,0.147-1.57001,0.30901-2.34399,0.483c-0.26401,0.06-0.53,0.11501-0.79201,0.179
			c-0.98199,0.235-1.952,0.487-2.908,0.767c-0.14,0.041-0.27699,0.088-0.41499,0.13c-0.812,0.244-1.612,0.505-2.40401,0.78
			c-0.31,0.108-0.619,0.22099-0.925,0.33501c-0.65401,0.24001-1.30099,0.493-1.94099,0.755
			c-0.284,0.11501-0.57001,0.228-0.849,0.34801c-0.858,0.369-1.70399,0.754-2.535,1.16299c-0.245,0.12-0.481,0.25-0.72301,0.37399
			c-19.92799,10.16901-32.105,32.05099-32.105,63.817V409.56l243.48099,140.573V383.53
			C430.08701,382.168,430.05499,380.798,430.01001,379.423z"/>
		<path fill="#FAFCFF" d="M209.16901,420.41199V253.80901c0-31.765,12.177-53.64799,32.105-63.817
			c0.242-0.123,0.479-0.254,0.72301-0.37399c0.832-0.408,1.67799-0.795,2.535-1.16299c0.28-0.12,0.56599-0.23199,0.849-0.34801
			c0.64-0.26199,1.286-0.515,1.94099-0.755c0.30701-0.114,0.61501-0.226,0.925-0.33501c0.79201-0.276,1.592-0.537,2.40401-0.78
			c0.13901-0.04201,0.276-0.089,0.416-0.13c0.95599-0.27901,1.92599-0.532,2.907-0.76601c0.26199-0.063,0.528-0.119,0.793-0.179
			c0.77299-0.175,1.554-0.33501,2.343-0.48199c0.26599-0.049,0.53201-0.101,0.79999-0.147c2.07901-0.36,4.20901-0.62601,6.388-0.795
			c0.22699-0.01801,0.457-0.03101,0.686-0.047c0.21301-0.01601,0.43201-0.019,0.64499-0.032
			c-3.00201-3.38901-5.89999-6.884-8.67801-10.46899c-0.07901-0.009-0.15701-0.01601-0.23599-0.02299
			c-1.10899-0.12-2.20799-0.217-3.299-0.295c-0.188-0.013-0.37601-0.02699-0.563-0.03999c-2.39-0.153-4.733-0.20399-7.028-0.153
			c-0.201,0.005-0.399,0.01401-0.597,0.02c-0.946,0.028-1.881,0.07401-2.80901,0.138c-0.229,0.01601-0.45799,0.02901-0.686,0.047
			c-2.179,0.16901-4.308,0.436-6.388,0.79601c-0.26801,0.047-0.534,0.097-0.8,0.147c-0.78999,0.147-1.57001,0.30901-2.34399,0.483
			c-0.26401,0.06-0.53,0.11501-0.79201,0.179c-0.98199,0.235-1.952,0.487-2.908,0.767c-0.14,0.041-0.27699,0.088-0.41499,0.13
			c-0.812,0.244-1.612,0.505-2.40401,0.78c-0.31,0.108-0.619,0.22099-0.925,0.33501c-0.65401,0.24001-1.30099,0.493-1.94099,0.755
			c-0.284,0.11501-0.57001,0.228-0.849,0.34801c-0.858,0.369-1.70399,0.754-2.535,1.16299c-0.245,0.12-0.481,0.25-0.72301,0.37399
			c-19.92799,10.16901-32.105,32.05099-32.105,63.817V409.56l243.48099,140.573v-2.17297L209.16901,420.41199z"/>
		<path fill="#6885A9" d="M430.08701,162.862c0,23.118-8.85699,39.05499-23.36301,46.45399l-29.52899,17.063l-0.095-0.121
			c12.401-8.08501,19.83701-23.231,19.83701-44.41299c0-38.41501-24.453-85.244-58.647-117.256
			c-4.09-3.836-8.32001-7.455-12.66501-10.812c-5.58401-4.334-11.366-8.255-17.28-11.668c-0.23499-0.141-0.479-0.273-0.71399-0.404
			c-25.14999-14.328-47.78799-16.726-63.799-8.969l28.37502-16.227c1.59799-1.081,3.271-2.04,5.02899-2.877
			c16.142-7.681,38.961-5.114,64.259,9.485c0.461,0.264,0.922,0.537,1.383,0.819c5.237,3.103,10.37,6.59,15.34299,10.426
			c4.59698,3.526,9.06299,7.333,13.37799,11.385C405.70801,77.77,430.08701,124.505,430.08701,162.862z"/>
		<path fill="#E9F2FF" d="M342.87799,23.937L342.06,25.244l-30.69598,16.462h-3.73199
			c-25.14999-14.328-47.78799-16.726-63.799-8.969l28.37498-16.227c1.59698-1.081,3.271-2.04,5.02899-2.877
			c16.142-7.681,38.961-5.114,64.259,9.485C341.95599,23.382,342.41699,23.654,342.87799,23.937z"/>
		<path fill="#E9F2FF" d="M371.599,45.749l-2.116,0.602l-30.44101,16.406l-0.75201,1.833c-4.09-3.836-8.32001-7.455-12.66501-10.812
			l0.94-1.645l29.86099-16.773l1.79501-0.996C362.81799,37.888,367.285,41.697,371.599,45.749z"/>
		<g>
			<path fill="#6885A9" d="M239.26199,35.357L239.26199,35.357L239.26199,35.357z"/>
		</g>
		<path fill="#6885A9" d="M395.263,215.937L377.189,226.37999l-0.08701-0.12199c0.10101-0.067,0.194-0.14301,0.29501-0.209
			c-5.09601,3.392-11.034,5.588-17.66101,6.489c9.08801,9.48599,17.57001,19.702,25.26801,30.397
			c0.005,0.00299,0.00601,0.00699,0.008,0.01001c2.17401,3.01901,4.285,6.07599,6.32999,9.164
			c0.043,0.06699,0.08701,0.133,0.13199,0.20001c2.01199,3.04401,3.95999,6.11801,5.841,9.21701
			c0.07101,0.11401,0.138,0.22601,0.207,0.33899c1.858,3.07001,3.64801,6.16299,5.36801,9.27701
			c0.07999,0.13901,0.15399,0.28,0.233,0.42099c0.841,1.53,1.673,3.064,2.48001,4.604c0.00201,0.005,0.005,0.009,0.008,0.01401
			c0.827,1.57501,1.634,3.151,2.42401,4.733c0.07101,0.14301,0.14099,0.28299,0.21201,0.42499
			c0.71899,1.44699,1.423,2.896,2.11099,4.34702c0.06699,0.14301,0.138,0.285,0.20401,0.42899
			c0.73499,1.55701,1.453,3.116,2.14999,4.67599c0.052,0.11801,0.103,0.237,0.15601,0.35599
			c0.63199,1.41901,1.246,2.83801,1.845,4.26001c0.09799,0.23401,0.19901,0.46899,0.29501,0.703
			c0.647,1.54099,1.276,3.08401,1.88199,4.62799c0.01999,0.04999,0.03799,0.10001,0.06,0.14999
			c0.57001,1.45099,1.117,2.90302,1.65399,4.354c0.10901,0.29401,0.215,0.58801,0.32401,0.88101
			c1.09399,3.004,2.116,6.008,3.06201,9.005c0.10101,0.32401,0.202,0.64999,0.30301,0.97501
			c0.43201,1.39499,0.849,2.78799,1.24899,4.17899c0.02701,0.10001,0.05801,0.19699,0.08499,0.29501
			c0.42099,1.48001,0.81699,2.95599,1.19901,4.431c0.08499,0.33401,0.168,0.66599,0.25201,0.99899
			c0.32001,1.259,0.62399,2.517,0.91501,3.772c0.05499,0.242,0.11401,0.48499,0.168,0.72501
			c0.328,1.44601,0.634,2.89001,0.923,4.32901c0.061,0.31601,0.121,0.634,0.18301,0.95001c0.23099,1.198,0.45001,2.392,0.655,3.582
			c0.05301,0.31699,0.10999,0.63501,0.164,0.952c0.23401,1.41901,0.45099,2.832,0.64401,4.242
			c0.03799,0.271,0.07101,0.539,0.104,0.80899c0.159,1.185,0.29999,2.36401,0.42899,3.54099
			c0.03699,0.35501,0.077,0.70801,0.11401,1.06201c0.14099,1.39499,0.26501,2.78699,0.36401,4.168
			c0.013,0.17801,0.01999,0.353,0.034,0.53c0.082,1.22699,0.147,2.448,0.19601,3.66699
			c0.01599,0.36401,0.02899,0.72699,0.04001,1.09c0.04501,1.37601,0.077,2.745,0.077,4.10501v166.603l33.14899-19.11499V364.41101
			C463.23499,316.48099,435.52802,259.04001,395.263,215.937z"/>
		<path fill="#231F20" d="M409.995,218.282l1.22501-0.70799c18.23099-9.41901,28.26599-28.83701,28.26599-54.711
			c0-25.423-9.73401-54.779-27.409-82.659c-17.53-27.652-40.92801-50.815-65.883-65.223C329.22,5.18,312.30099,0,297.26599,0
			c-8.80499,0-16.905,1.731-24.07401,5.143c-2.04599,0.975-4.04401,2.108-5.94299,3.37L239.431,24.428
			c-18.754,9.246-29.07899,28.807-29.07899,55.12099c0,24.521,8.892,52.30099,25.194,79.09801L212.81,171.60501
			c-22.96201,12.625-35.60699,37.964-35.60699,71.35001v172.03101l252.87799,145.99896l42.55402-24.53802V364.41101
			C472.63699,318.44699,448.85501,263.36301,409.995,218.282z M273.14001,18.14l0.11899-0.074
			c1.52499-1.03,3.13501-1.952,4.785-2.738c5.64099-2.684,12.108-4.046,19.22299-4.046c13.056,0,28.02499,4.658,43.28699,13.468
			c48.332,27.904,87.65201,89.861,87.65201,138.11099c0,21.52701-7.93399,37.429-22.341,44.77899l-10.24899,5.92101v-0.002
			l-6.70999,3.877c0.38101-0.532,0.74799-1.076,1.10599-1.63c0.034-0.049,0.06699-0.099,0.10001-0.149
			c0.34698-0.541,0.68399-1.09399,1.01099-1.65401c0.03699-0.061,0.07199-0.121,0.10901-0.183
			c0.328-0.56599,0.64401-1.14301,0.952-1.73c0.026-0.049,0.052-0.10001,0.078-0.149c0.315-0.608,0.621-1.22501,0.91699-1.856
			c0.00299-0.008,0.00601-0.01601,0.01099-0.02299c1.79501-3.851,3.18201-8.099,4.12701-12.715
			c0.03101-0.149,0.06299-0.29601,0.09299-0.446c0.11801-0.595,0.22299-1.19701,0.327-1.804
			c0.04599-0.263,0.09-0.526,0.13199-0.79201c0.08499-0.54201,0.16501-1.089,0.241-1.64101
			c0.048-0.35001,0.09201-0.70399,0.133-1.058c0.06-0.49699,0.116-0.996,0.16699-1.5c0.04501-0.436,0.08099-0.877,0.11801-1.319
			c0.03699-0.44701,0.07501-0.892,0.10599-1.34399c0.03699-0.55499,0.061-1.118,0.08701-1.681
			c0.01599-0.358,0.03699-0.711,0.04901-1.073c0.03101-0.939,0.04901-1.886,0.04901-2.84599
			c0-49.448-40.16501-112.866-89.53198-141.367c-2.96899-1.714-5.92899-3.276-8.87201-4.684
			c-0.66599-0.318-1.32901-0.617-1.99301-0.921c-0.31299-0.143-0.62799-0.295-0.94101-0.435
			c-11.71701-5.216-23.07599-7.936-33.36499-7.936c-1.022,0-2.02701,0.034-3.01999,0.085c-0.14499,0.008-0.28699,0.02-0.431,0.029
			c-0.845,0.051-1.681,0.119-2.505,0.208c-0.077,0.008-0.15701,0.01-0.233,0.019L273.14001,18.14z M355.638,231.03799
			c-0.328,0.01801-0.65799,0.036-0.98999,0.049c-0.60199,0.022-1.20599,0.037-1.819,0.03999c-0.08401,0-0.168,0.004-0.254,0.004
			c-10.483,0.00101-22.19901-3.008-34.30899-8.75101c-1.039-0.493-2.08099-1.002-3.12601-1.536
			c-0.04901-0.02499-0.09799-0.049-0.147-0.07401c-0.276-0.142-0.552-0.29401-0.82999-0.439
			c-1.621-0.845-3.24701-1.729-4.87799-2.67c-1.008-0.58099-2.01099-1.185-3.01501-1.798
			c-0.258-0.157-0.51599-0.31599-0.77301-0.476c-0.97699-0.605-1.953-1.22099-2.92401-1.855
			c-0.10901-0.071-0.216-0.145-0.32501-0.216c-0.87201-0.57201-1.741-1.159-2.60699-1.754c-0.32101-0.22-0.642-0.442-0.96301-0.666
			c-0.841-0.588-1.681-1.185-2.51801-1.793c-0.349-0.255-0.698-0.515-1.047-0.77299c-0.642-0.476-1.285-0.95799-1.923-1.446
			c-0.41199-0.314-0.82501-0.63-1.23499-0.94901c-0.681-0.53-1.35901-1.06799-2.03601-1.61099
			c-0.55701-0.448-1.112-0.90199-1.66599-1.358c-0.46201-0.382-0.92499-0.765-1.38699-1.15401
			c-0.479-0.403-0.957-0.806-1.43301-1.215c-0.66101-0.57001-1.32001-1.145-1.97699-1.72701
			c-0.548-0.487-1.09399-0.98-1.64001-1.474c-0.40799-0.371-0.81601-0.743-1.22198-1.12c-0.47198-0.436-0.94299-0.87-1.41101-1.312
			c-0.71899-0.67799-1.435-1.366-2.14801-2.061c-0.42999-0.418-0.85699-0.842-1.28299-1.265
			c-0.50601-0.502-1.009-1.008-1.51099-1.51801c-0.42099-0.427-0.841-0.855-1.259-1.286
			c-0.70901-0.73399-1.414-1.474-2.11499-2.22301c-0.302-0.32001-0.60101-0.64301-0.89899-0.966
			c-0.82999-0.89799-1.65601-1.80099-2.474-2.71899c-0.082-0.092-0.164-0.186-0.245-0.278
			c-0.84698-0.95399-1.68701-1.91901-2.521-2.895c-0.117-0.138-0.23599-0.27499-0.353-0.41299
			c-0.91501-1.076-1.823-2.16499-2.72198-3.26601c-0.01199-0.015-0.02301-0.02901-0.035-0.045
			c-0.939-1.15199-1.86899-2.31799-2.78799-3.49699v-0.205l-0.491-0.425c-0.23599-0.306-0.46899-0.612-0.703-0.918
			c-0.35999-0.47099-0.71799-0.942-1.07501-1.41701c-0.28-0.373-0.55899-0.74699-0.83501-1.123
			c-0.355-0.48-0.70799-0.96201-1.061-1.44501c-0.272-0.37399-0.54201-0.74699-0.812-1.123
			c-0.35899-0.50101-0.713-1.004-1.06599-1.507c-0.252-0.358-0.507-0.715-0.756-1.07401c-0.55901-0.804-1.11099-1.612-1.655-2.42
			c-17.644-26.205-28.73801-55.7-28.73801-81.329c0-22.328,8.31799-38.14,22.989-45.18l0.033,0.062
			c5.69901-2.762,12.24899-4.163,19.46799-4.163c10.608,0,22.47699,3.074,34.73898,8.953c1.83801,0.881,3.68399,1.826,5.534,2.831
			c0.04999,0.027,0.10001,0.052,0.14999,0.08c0.952,0.518,1.90399,1.052,2.85699,1.603
			c48.332,27.904,87.651,89.85999,87.651,138.11099c0,1.118-0.02701,2.215-0.069,3.3c-0.013,0.353-0.034,0.701-0.04999,1.05099
			c-0.03799,0.73599-0.08401,1.464-0.14099,2.18401c-0.03101,0.388-0.06299,0.77499-0.09799,1.158
			c-0.069,0.728-0.14999,1.44501-0.23901,2.155c-0.04001,0.314-0.07199,0.634-0.11401,0.94501
			c-0.13599,0.98-0.289,1.94501-0.46201,2.89301c-0.048,0.254-0.103,0.50101-0.151,0.752c-0.14401,0.739-0.298,1.47099-0.46701,2.19
			c-0.06601,0.27699-0.133,0.55299-0.202,0.828c-0.19101,0.767-0.39499,1.52499-0.61301,2.26801
			c-0.04501,0.14799-0.08499,0.299-0.12799,0.44701c-2.979,9.789-8.35501,17.405-15.96301,22.466
			c-0.00299,0.00301-0.008,0.006-0.013,0.009c-4.879,3.246-10.55099,5.325-16.86099,6.185
			c-0.95001,0.12801-1.922,0.22501-2.90399,0.3C356.267,230.998,355.95499,231.02,355.638,231.03799z M246.646,165.30701
			l0.14301-0.09c0.429-0.299,0.87801-0.59801,1.36501-0.908c1.52901,2.235,3.114,4.45599,4.73801,6.64301
			c-0.838-0.052-1.66299-0.078-2.491-0.106c-0.356-0.013-0.718-0.03799-1.073-0.04601c-1.196-0.02499-2.379-0.026-3.547,0
			l-0.60899,0.02c-0.97099,0.02901-1.92999,0.077-2.881,0.14301l-0.70399,0.048c-1.089,0.08501-2.173,0.19501-3.248,0.327
			c-0.34599,0.04401-0.68401,0.103-1.02901,0.14999c-0.67799,0.095-1.36099,0.183-2.02699,0.295L246.646,165.30701z
			 M428.20599,546.875L188.485,408.474V242.95599c0-29.84601,11.03799-51.91501,31.08099-62.142l0.302-0.157
			c0.13-0.069,0.259-0.13699,0.39301-0.202c0.765-0.375,1.588-0.754,2.44901-1.12399c0.179-0.077,0.36-0.14999,0.541-0.222
			l0.28-0.114c0.618-0.254,1.243-0.49699,1.87601-0.73c0.298-0.11,0.595-0.21899,0.894-0.323
			c0.76601-0.26601,1.53999-0.519,2.33-0.755l0.399-0.125c0.87399-0.255,1.79601-0.498,2.819-0.743l0.769-0.173
			c0.75101-0.16901,1.507-0.326,2.274-0.46899l0.776-0.14301c0.283-0.049,0.577-0.082,0.86301-0.12801
			c0.735-0.117,1.468-0.237,2.215-0.32899c1.035-0.12801,2.082-0.23399,3.136-0.317l0.66701-0.045
			c0.903-0.062,1.814-0.10699,2.737-0.13499l0.291-0.00999l0.291-0.009c2.047-0.045,4.16,0.00301,6.286,0.125
			c0.19099,0.011,0.381,0.013,0.573,0.024l0.55499,0.03999c0.886,0.063,1.782,0.147,2.683,0.24001
			c11.76601,15.06799,25.158,28.019,39.28099,38.07899c0.34799,0.24899,0.69601,0.49899,1.04599,0.743
			c0.49899,0.35001,0.99799,0.69701,1.5,1.039c0.677,0.464,1.35501,0.91901,2.03601,1.369c0.35501,0.235,0.70901,0.47,1.065,0.7
			c0.86499,0.563,1.733,1.112,2.604,1.65199c0.285,0.177,0.57199,0.353,0.858,0.528c1.013,0.619,2.02802,1.228,3.04901,1.81799
			c1.07999,0.62399,2.15799,1.22301,3.23599,1.806c0.32001,0.173,0.63901,0.338,0.95999,0.506
			c0.767,0.408,1.535,0.80901,2.302,1.196c0.34799,0.175,0.69699,0.34399,1.04401,0.51601
			c0.76001,0.37399,1.51801,0.74001,2.27499,1.09399c0.314,0.147,0.62799,0.291,0.94,0.43401
			c0.82999,0.379,1.65799,0.746,2.48599,1.10001c0.228,0.09801,0.45801,0.198,0.68701,0.295
			c1.026,0.43201,2.047,0.845,3.06601,1.23801c0.02499,0.00999,0.04901,0.02,0.07599,0.03
			c9.84698,3.78799,19.35999,5.758,28.10101,5.758c0.185,0,0.36401-0.011,0.54901-0.013c0.103-0.00101,0.207-0.005,0.31-0.007
			c0.823-0.013,1.64099-0.03999,2.44501-0.08501c0.23599-0.013,0.47-0.032,0.70401-0.049c0.70001-0.049,1.38901-0.11,2.073-0.183
			c0.11899-0.013,0.24399-0.01801,0.36301-0.032c0.89801,0.94299,1.79501,1.89,2.68301,2.849
			c0.00601,0.007,0.013,0.01401,0.01999,0.02c2.20499,2.386,4.375,4.81799,6.50699,7.29401c0.005,0.005,0.009,0.009,0.013,0.01401
			c1.039,1.207,2.07101,2.42599,3.091,3.65199c0.03101,0.03799,0.06299,0.07401,0.09299,0.112
			c0.979,1.17799,1.948,2.367,2.909,3.562c0.07101,0.089,0.14301,0.175,0.21399,0.263c0.91199,1.13699,1.81299,2.284,2.70801,3.436
			c0.11401,0.147,0.23099,0.29201,0.345,0.43999c0.85999,1.112,1.70801,2.23199,2.552,3.35599
			c0.14099,0.18799,0.284,0.37299,0.42499,0.56201c0.978,1.30801,1.94299,2.625,2.896,3.95001l0.12701,0.17599l0.00201,0.00201
			c2.08701,2.90302,4.16101,5.909,6.16699,8.935l0.13199,0.20001c1.992,3.01199,3.94299,6.09201,5.81,9.16699l0.19601,0.32401
			c1.84,3.03699,3.633,6.13699,5.34201,9.228l0.22,0.40201c0.82199,1.492,1.63101,2.987,2.41901,4.48801l0.02701,0.05099
			l0.04501,0.08499c0.814,1.54999,1.608,3.103,2.38901,4.664l0.207,0.418c0.716,1.436,1.414,2.875,2.09799,4.31601l0.202,0.42499
			c0.729,1.54599,1.44199,3.09299,2.12601,4.62201l0.16199,0.37201c0.62799,1.40799,1.23599,2.81699,1.827,4.21701l0.298,0.707
			c0.64099,1.52899,1.26501,3.05801,1.867,4.58801l1.74899-0.68701l-1.69101,0.83701c0.565,1.43799,1.10901,2.87799,1.64099,4.315
			l0.323,0.875c1.082,2.97,2.103,5.974,3.03101,8.92099l0.30301,0.97101c0.427,1.384,0.841,2.763,1.233,4.133l0.08899,0.29999
			c0.41599,1.466,0.80899,2.927,1.18799,4.38901l0.25101,0.98999c0.31699,1.24701,0.61801,2.491,0.90399,3.729l0.16699,0.72198
			c0.32401,1.42899,0.62799,2.858,0.91199,4.27499l0.18201,0.944c0.23001,1.186,0.44501,2.367,0.647,3.53601l0.164,0.94901
			c0.23099,1.39999,0.44501,2.797,0.638,4.20001l0.10101,0.79099c0.15601,1.17099,0.297,2.33499,0.422,3.487l0.11401,1.05499
			c0.138,1.379,0.26199,2.75201,0.358,4.11801l0.034,0.51999c0.08099,1.20901,0.14401,2.41101,0.194,3.63599
			c0.01401,0.35001,0.02701,0.702,0.03799,1.05499c0.04999,1.58099,0.07501,2.866,0.07501,4.04401L428.20599,546.875
			L428.20599,546.875z M461.35501,529.92999L431.966,546.87701V383.52899c0-1.22-0.02301-2.54501-0.07501-4.16299
			c-0.013-0.36899-0.026-0.73901-0.04199-1.10901c-0.04999-1.23499-0.11401-2.47101-0.20099-3.728l-0.03201-0.526
			c-0.10101-1.39999-0.22601-2.80801-0.36899-4.229l-0.11401-1.07101c-0.06601-0.595-0.146-1.19199-0.215-1.789
			c-0.07401-0.59698-0.138-1.19299-0.21701-1.789l-0.03201-0.259c-0.02399-0.19101-0.04901-0.38199-0.07501-0.565
			c-0.194-1.42599-0.41299-2.85699-0.65201-4.297l-0.16501-0.961c-0.20801-1.203-0.42899-2.40799-0.664-3.625l-0.185-0.957
			c-0.29099-1.45499-0.60199-2.914-0.93201-4.37799l-0.08401-0.36401l-0.08499-0.367
			c-0.29401-1.267-0.60199-2.53699-0.92401-3.81201l-0.255-1.00699c-0.38501-1.48901-0.78699-2.979-1.20901-4.46799
			l-0.08899-0.30499c-0.40302-1.40302-0.82501-2.811-1.26099-4.22101l-0.306-0.98199c-0.94699-3.005-1.98599-6.061-3.08899-9.091
			l-0.327-0.88c-0.54001-1.46301-1.09399-2.92499-1.69101-4.452l-0.035-0.08899c-0.60999-1.556-1.246-3.112-1.896-4.66101
			l-0.29999-0.71399c-0.60599-1.43201-1.22501-2.862-1.862-4.298l-0.15399-0.35199c-0.70401-1.57199-1.42599-3.142-2.159-4.69699
			l-0.21201-0.44699c-0.69299-1.46201-1.40302-2.922-2.12399-4.37399l-0.215-0.43201
			c-0.78201-1.565-1.58099-3.12601-2.39801-4.68399l-0.07199-0.13501c-0.806-1.53799-1.63599-3.07001-2.47601-4.59601
			l-0.23401-0.42499c-0.76199-1.38-1.54999-2.76401-2.34601-4.146c-1.00201-1.741-2.01999-3.47699-3.05701-5.19l-0.00299-0.005
			c-0.00201-0.00101-0.00201-0.00201-0.00299-0.004l-0.20401-0.336c-1.30399-2.147-2.66199-4.297-4.04001-6.435
			c-0.612-0.95001-1.22-1.905-1.841-2.84399l-0.133-0.20099c-1.026-1.547-2.07101-3.09201-3.12601-4.62201
			c-1.056-1.52899-2.121-3.04099-3.19-4.52701l-0.11401-0.19501l-0.07401-0.06601c-0.92401-1.28101-1.86099-2.55399-2.80499-3.82001
			c-0.37399-0.5-0.754-0.99301-1.13101-1.48999c-0.56799-0.752-1.13699-1.505-1.71301-2.25101
			c-0.483-0.62601-0.97299-1.245-1.461-1.866c-0.474-0.605-0.94901-1.21001-1.42899-1.811c-0.548-0.689-1.103-1.371-1.659-2.054
			c-0.422-0.51601-0.841-1.034-1.26501-1.548c-0.60699-0.735-1.21799-1.466-1.832-2.194
			c-0.37399-0.44299-0.74799-0.88699-1.125-1.327c-0.66101-0.776-1.32599-1.548-1.995-2.31599
			c-0.32599-0.37399-0.65302-0.746-0.979-1.117c-0.71899-0.81599-1.44199-1.629-2.16901-2.436
			c-0.271-0.30099-0.54501-0.60001-0.81699-0.899c-0.78-0.85899-1.564-1.715-2.35501-2.563
			c-0.05301-0.05701-0.10599-0.117-0.159-0.175c0.103-0.021,0.20401-0.049,0.306-0.071
			c4.673-1.01199,8.94901-2.674,12.78101-4.94099l0.05801,0.07899v-0.00101l2.517-1.453l15.73001-9.09
			c41.01801,44.37302,66.44998,100.23099,66.44998,146.09598v165.51904H461.35501z"/>
	</g>
	<path opacity="0.4" fill="#000000" enable-background="new    " d="M472.63699,536.44702c0,0,87.90799-36.36499,65.31601-101.23401
		c100.763-39.767,12.03699-133.42999-72.121-105.83499L472.63699,536.44702z"/>
</g>
</svg>
`,vm:`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="91.6px" height="84.4px" viewBox="0 0 91.6 84.4" enable-background="new 0 0 91.6 84.4" xml:space="preserve">
<g id="Layer_4">
	<g>
		<path d="M43.7,3.5l29.8,18.1v36.9l-29.9,18L14.1,58.3V21.2L43.7,3.5 M43.7,2c-0.3,0-0.5,0.1-0.8,0.2L13.3,19.9
			c-0.5,0.3-0.7,0.8-0.7,1.3v37.1c0,0.5,0.3,1,0.7,1.3l29.5,18.2c0.2,0.1,0.5,0.2,0.8,0.2s0.5-0.1,0.8-0.2l29.9-18
			c0.5-0.3,0.7-0.8,0.7-1.3V21.6c0-0.5-0.3-1-0.7-1.3L44.5,2.2C44.3,2.1,44,2,43.7,2L43.7,2z"/>
	</g>
	<polygon opacity="0.4" fill="#4F6587" enable-background="new    " points="43.6,76.5 14.1,58.3 43.7,40.6 73.5,58.5 	"/>
	<polygon fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="43.7,3.5 73.5,21.6 73.5,58.5 
		43.7,40.6 	"/>
	<polygon opacity="0.4" fill="#4F6587" enable-background="new    " points="43.7,3.5 73.5,21.6 73.5,58.5 43.7,40.6 	"/>
	<polygon fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="43.6,76.5 14.1,58.3 43.7,40.6 
		73.5,58.5 	"/>
	<polygon opacity="0.4" fill="#4F6587" enable-background="new    " points="43.7,3.5 14.1,21.3 14.1,58.3 43.7,40.6 	"/>
	<polygon opacity="0.4" fill="#000000" enable-background="new    " points="44.9,71.3 22,57.5 44.8,43.8 67.9,57.5 	"/>
	<g>
		<polygon fill="#4F6587" stroke="#010202" stroke-linejoin="round" stroke-miterlimit="10" points="67.8,41.8 43.6,56.5 43.6,65.3 
			67.8,50.8 		"/>
		<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="19.5,41.8 43.6,56.5 43.6,65.3 
			19.5,50.8 		"/>
		<polygon fill="#CED8EB" points="43.6,56.4 19.5,41.8 43.4,27.5 67.8,41.8 		"/>
		<polygon fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="43.6,56.4 19.5,41.8 43.4,27.5 
			67.8,41.8 		"/>
	</g>
	<g>
		<polygon fill="#4F6587" stroke="#010202" stroke-linejoin="round" stroke-miterlimit="10" points="67.8,29.5 43.6,44.1 43.6,53 
			67.8,38.5 		"/>
		<polygon fill="#CED8EB" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="19.5,29.5 43.6,44.1 43.6,53 
			19.5,38.5 		"/>
		<polygon fill="#CED8EB" points="43.6,44.1 19.5,29.5 43.4,15.1 67.8,29.5 		"/>
		<polygon fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="43.6,44.1 19.5,29.5 43.4,15.1 
			67.8,29.5 		"/>
	</g>
	<polygon opacity="0.3" fill="#CED8EB" enable-background="new    " points="14.1,21.2 43.6,39.6 43.6,76.5 14.1,58.3 	"/>
	<polygon fill="#FFFFFF" points="43.7,6.1 71.4,22.9 73.5,21.6 43.7,3.5 14.1,21.2 16.2,22.5 	"/>
	<polygon opacity="0.5" fill="#EDF0F4" enable-background="new    " points="43.6,39.6 14.1,21.2 43.7,3.5 73.5,21.6 	"/>
	<polygon fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="43.6,39.6 14.1,21.2 43.7,3.5 
		73.5,21.6 	"/>
	<polyline opacity="0.4" fill="#000000" enable-background="new    " points="43.6,77.9 59.5,76.8 91.6,57.4 73.5,47.8 73.5,58.5 	"/>
	<polyline opacity="0.4" fill="#000000" enable-background="new    " points="43.6,52.9 49.9,52.3 67.6,41.6 65.1,40.1 43.6,52.9 	"/>
	<polygon fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" points="14.1,21.2 43.6,39.6 43.6,76.5 
		14.1,58.3 	"/>
	<polygon opacity="0.3" fill="#556377" enable-background="new    " points="73.5,21.6 43.6,39.6 43.6,76.5 73.5,58.5 	"/>
	<polygon fill="none" stroke="#010202" stroke-linejoin="round" stroke-miterlimit="10" points="73.5,21.6 43.6,39.6 43.6,76.5 
		73.5,58.5 	"/>
</g>
</svg>
`,browser:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="515.6px" height="523.4px" viewBox="0 0 515.6 523.4" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="393.1,227.6 503.6,291.4 122.5,511.4 12.0,447.6"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="50.1,210.0 74.9,224.3 74.9,457.5 50.1,443.2"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="417.8,26.3 74.9,224.3 74.9,457.5 417.8,259.5"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="393.1,12.0 417.8,26.3 74.9,224.3 50.1,210.0"/>
	<polygon fill="#FFFFFF" points="404.5,49.4 88.2,232.0 88.2,434.4 404.5,251.8"/>
	<polygon fill="#4B6E98" points="404.5,49.4 88.2,232.0 88.2,267.2 404.5,84.6"/>
	<polygon fill="#FFFFFF" points="111.1,229.8 99.6,236.4 99.6,249.6 111.1,243.0"/>
	<polygon fill="#FFC600" points="133.9,216.6 122.5,223.2 122.5,236.4 133.9,229.8"/>
	<polygon fill="#8FB8F0" points="156.8,203.4 145.4,210.0 145.4,223.2 156.8,216.6"/>
	<polygon fill="#FFFFFF" points="393.1,70.3 181.6,192.4 181.6,205.6 393.1,83.5"/>
	<polygon fill="#FFC600" points="193.0,185.8 181.6,192.4 181.6,205.6 193.0,199.0"/>
	<polygon fill="#0070D9" points="393.1,106.6 99.6,276.0 99.6,335.4 393.1,166.0"/>
	<polygon fill="#FFFFFF" points="208.2,230.9 111.1,287.0 111.1,311.2 208.2,255.1"/>
	<polygon fill="#B5C5DC" points="393.1,181.4 99.6,350.8 99.6,366.2 393.1,196.8"/>
	<polygon fill="#B5C5DC" points="341.6,235.3 99.6,375.0 99.6,390.4 341.6,250.7"/>
	<polygon fill="#B5C5DC" points="284.5,292.5 99.6,399.2 99.6,414.6 284.5,307.9"/>
	<polygon fill="#231F20" points="299.7,226.5 299.7,301.3 316.8,271.6 330.2,296.9 343.5,282.6 330.2,257.3 353.0,244.1"/>
</svg>
`,"camera-small":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="668.3px" height="416.4px" viewBox="0 0 668.3 416.4" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="233.7,32.4 656.3,276.4 434.6,404.4 12.0,160.4"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="285.7,203.2 493.5,323.2 493.5,330.4 285.7,210.4"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="548.9,291.2 493.5,323.2 493.5,330.4 548.9,298.4"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="341.1,171.2 548.9,291.2 493.5,323.2 285.7,203.2"/>
	<polygon fill="#1D7A47" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="60.5,128.4 233.7,228.4 233.7,248.4 60.5,148.4"/>
	<polygon fill="#16623A" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="406.9,128.4 233.7,228.4 233.7,248.4 406.9,148.4"/>
	<polygon fill="#2FA866" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="233.7,28.4 406.9,128.4 233.7,228.4 60.5,128.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="244.1,162.4 271.8,178.4 271.8,198.4 244.1,182.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="354.9,130.4 271.8,178.4 271.8,198.4 354.9,150.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="327.2,114.4 354.9,130.4 271.8,178.4 244.1,162.4"/>
	<polygon fill="#FFC600" points="244.1,56.4 236.0,58.8 227.0,58.0 220.6,54.3 219.2,49.1 223.3,44.4 231.4,42.0 240.4,42.8 246.8,46.6 248.2,51.7"/>
	<polygon fill="#FFC600" points="109.0,134.4 100.9,136.8 91.9,136.0 85.5,132.3 84.1,127.1 88.2,122.4 96.3,120.0 105.3,120.8 111.7,124.6 113.1,129.7"/>
	<polygon fill="#FFC600" points="379.2,134.4 371.1,136.8 362.1,136.0 355.7,132.3 354.3,127.1 358.4,122.4 366.5,120.0 375.5,120.8 381.9,124.6 383.3,129.7"/>
	<polygon fill="#FFC600" points="244.1,212.4 236.0,214.8 227.0,214.0 220.6,210.3 219.2,205.1 223.3,200.4 231.4,198.0 240.4,198.8 246.8,202.6 248.2,207.7"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="129.8,88.4 233.7,148.4 233.7,188.4 129.8,128.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="337.6,88.4 233.7,148.4 233.7,188.4 337.6,128.4"/>
	<polygon fill="#4A4F59" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="233.7,28.4 337.6,88.4 233.7,148.4 129.8,88.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="179.3,52.8 177.6,41.6 177.6,85.6 179.3,96.8"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="289.8,47.2 284.8,58.1 284.8,102.1 289.8,91.2"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="187.6,63.1 179.3,52.8 179.3,96.8 187.6,107.1"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="284.8,58.1 273.5,67.4 273.5,111.4 284.8,102.1"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="201.4,71.0 187.6,63.1 187.6,107.1 201.4,115.0"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="273.5,67.4 257.5,73.9 257.5,117.9 273.5,111.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="219.1,75.8 201.4,71.0 201.4,115.0 219.1,119.8"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="257.5,73.9 238.6,76.8 238.6,120.8 257.5,117.9"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="238.6,76.8 219.1,75.8 219.1,119.8 238.6,120.8"/>
	<polygon fill="#4A4F59" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="273.5,67.4 257.5,73.9 238.6,76.8 219.1,75.8 201.4,71.0 187.6,63.1 179.3,52.8 177.6,41.6 182.6,30.7 193.9,21.4 209.9,14.9 228.8,12.0 248.3,13.0 266.0,17.8 279.9,25.7 288.1,36.0 289.8,47.2 284.8,58.1"/>
	<polygon fill="#0070D9" points="261.4,60.4 248.7,65.3 233.7,67.0 218.7,65.3 206.0,60.4 197.5,53.1 194.5,44.4 197.5,35.7 206.0,28.4 218.7,23.5 233.7,21.8 248.7,23.5 261.4,28.4 269.9,35.7 272.9,44.4 269.9,53.1"/>
	<polygon fill="#FFFFFF" points="241.3,40.0 233.7,41.8 226.1,40.0 222.9,35.6 226.1,31.2 233.7,29.4 241.3,31.2 244.5,35.6"/>
</svg>
`,cpu:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="675.6px" height="406.8px" viewBox="0 0 675.6 406.8" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="337.8,18.6 663.6,206.7 337.8,394.8 12.0,206.7"/>
	<polygon fill="#2D4663" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="61.5,171.5 337.8,331.0 337.8,350.8 61.5,191.3"/>
	<polygon fill="#223650" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="614.1,171.5 337.8,331.0 337.8,350.8 614.1,191.3"/>
	<polygon fill="#3A5877" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="337.8,12.0 614.1,171.5 337.8,331.0 61.5,171.5"/>
	<polygon fill="#FFC600" points="317.8,31.2 330.2,38.4 317.8,45.5 305.4,38.4"/>
	<polygon fill="#FFC600" points="568.3,175.9 580.7,183.0 568.3,190.2 556.0,183.0"/>
	<polygon fill="#FFC600" points="357.8,31.2 370.2,38.4 357.8,45.5 345.4,38.4"/>
	<polygon fill="#FFC600" points="107.3,175.9 119.6,183.0 107.3,190.2 94.9,183.0"/>
	<polygon fill="#FFC600" points="293.0,45.5 305.4,52.7 293.0,59.8 280.6,52.7"/>
	<polygon fill="#FFC600" points="543.6,190.2 556.0,197.3 543.6,204.5 531.2,197.3"/>
	<polygon fill="#FFC600" points="382.6,45.5 395.0,52.7 382.6,59.8 370.2,52.7"/>
	<polygon fill="#FFC600" points="132.0,190.2 144.4,197.3 132.0,204.5 119.6,197.3"/>
	<polygon fill="#FFC600" points="268.3,59.8 280.6,67.0 268.3,74.1 255.9,67.0"/>
	<polygon fill="#FFC600" points="518.8,204.5 531.2,211.6 518.8,218.8 506.4,211.6"/>
	<polygon fill="#FFC600" points="407.3,59.8 419.7,67.0 407.3,74.1 395.0,67.0"/>
	<polygon fill="#FFC600" points="156.8,204.5 169.2,211.6 156.8,218.8 144.4,211.6"/>
	<polygon fill="#FFC600" points="243.5,74.1 255.9,81.3 243.5,88.5 231.1,81.3"/>
	<polygon fill="#FFC600" points="494.0,218.8 506.4,225.9 494.0,233.1 481.6,225.9"/>
	<polygon fill="#FFC600" points="432.1,74.1 444.5,81.3 432.1,88.5 419.7,81.3"/>
	<polygon fill="#FFC600" points="181.6,218.8 194.0,225.9 181.6,233.1 169.2,225.9"/>
	<polygon fill="#FFC600" points="218.7,88.4 231.1,95.6 218.7,102.7 206.3,95.6"/>
	<polygon fill="#FFC600" points="469.3,233.1 481.6,240.2 469.3,247.4 456.9,240.2"/>
	<polygon fill="#FFC600" points="456.9,88.4 469.3,95.6 456.9,102.7 444.5,95.6"/>
	<polygon fill="#FFC600" points="206.3,233.1 218.7,240.2 206.3,247.4 194.0,240.2"/>
	<polygon fill="#FFC600" points="194.0,102.7 206.3,109.9 194.0,117.0 181.6,109.9"/>
	<polygon fill="#FFC600" points="444.5,247.4 456.9,254.5 444.5,261.7 432.1,254.5"/>
	<polygon fill="#FFC600" points="481.6,102.7 494.0,109.9 481.6,117.0 469.3,109.9"/>
	<polygon fill="#FFC600" points="231.1,247.4 243.5,254.5 231.1,261.7 218.7,254.5"/>
	<polygon fill="#FFC600" points="169.2,117.0 181.6,124.2 169.2,131.3 156.8,124.2"/>
	<polygon fill="#FFC600" points="419.7,261.7 432.1,268.8 419.7,276.0 407.3,268.8"/>
	<polygon fill="#FFC600" points="506.4,117.0 518.8,124.2 506.4,131.3 494.0,124.2"/>
	<polygon fill="#FFC600" points="255.9,261.7 268.3,268.8 255.9,276.0 243.5,268.8"/>
	<polygon fill="#FFC600" points="144.4,131.3 156.8,138.5 144.4,145.6 132.0,138.5"/>
	<polygon fill="#FFC600" points="395.0,276.0 407.3,283.1 395.0,290.3 382.6,283.1"/>
	<polygon fill="#FFC600" points="531.2,131.3 543.6,138.5 531.2,145.6 518.8,138.5"/>
	<polygon fill="#FFC600" points="280.6,276.0 293.0,283.1 280.6,290.3 268.3,283.1"/>
	<polygon fill="#FFC600" points="119.6,145.6 132.0,152.8 119.6,159.9 107.3,152.8"/>
	<polygon fill="#FFC600" points="370.2,290.3 382.6,297.4 370.2,304.6 357.8,297.4"/>
	<polygon fill="#FFC600" points="556.0,145.6 568.3,152.8 556.0,159.9 543.6,152.8"/>
	<polygon fill="#FFC600" points="305.4,290.3 317.8,297.4 305.4,304.6 293.0,297.4"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="126.3,136.3 337.8,258.4 337.8,293.6 126.3,171.5"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="549.3,136.3 337.8,258.4 337.8,293.6 549.3,171.5"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="337.8,14.2 549.3,136.3 337.8,258.4 126.3,136.3"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="337.8,40.6 503.6,136.3 337.8,232.0 172.0,136.3"/>
	<polygon fill="#0070D9" points="337.8,80.2 379.7,104.4 337.8,128.6 295.9,104.4"/>
	<polygon fill="#0070D9" points="282.5,112.1 324.5,136.3 282.5,160.5 240.6,136.3"/>
	<polygon fill="#0070D9" points="393.1,112.1 435.0,136.3 393.1,160.5 351.1,136.3"/>
	<polygon fill="#0070D9" points="337.8,144.0 379.7,168.2 337.8,192.4 295.9,168.2"/>
</svg>
`,daemon:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="618.4px" height="382.8px" viewBox="0 0 618.4 382.8" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="309.2,27.6 606.4,199.2 309.2,370.8 12.0,199.2"/>
	<polygon fill="#0070D9" points="103.0,183.1 111.8,157.5 130.0,133.7 156.6,112.7 190.5,95.6 230.0,83.1 273.3,75.8 318.2,74.1 362.8,78.1 404.8,87.5 442.3,101.9 473.4,120.7 496.8,143.0 511.3,167.6 516.2,193.5 511.3,219.3 496.8,244.0 473.4,266.2 442.3,285.0 404.8,299.5 362.8,308.9 318.2,312.9 273.3,311.2 230.0,303.9 190.5,291.4 174.1,304.9 168.5,268.1 225.2,262.8 208.8,276.3 242.2,286.9 278.8,293.1 316.9,294.5 354.5,291.2 390.1,283.2 421.8,270.9 448.2,255.0 467.9,236.2 480.2,215.4 484.4,193.5 480.2,171.6 467.9,150.7 448.2,131.9 421.8,116.0 390.1,103.8 354.5,95.8 316.9,92.5 278.8,93.9 242.2,100.1 208.8,110.7 180.1,125.2 157.5,142.9 142.2,163.1 134.7,184.7"/>
	<polygon fill="#3A5877" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="174.1,90.0 309.2,168.0 309.2,272.0 174.1,194.0"/>
	<polygon fill="#2D4663" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="444.3,90.0 309.2,168.0 309.2,272.0 444.3,194.0"/>
	<polygon fill="#4B6E98" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="309.2,12.0 444.3,90.0 309.2,168.0 174.1,90.0"/>
	<polygon fill="#FFFFFF" points="412.8,129.0 331.7,175.8 331.7,183.6 412.8,136.8"/>
	<polygon fill="#FFFFFF" points="390.3,160.2 331.7,194.0 331.7,201.8 390.3,168.0"/>
	<polygon fill="#2DCB6B" points="349.7,201.8 331.7,212.2 331.7,225.2 349.7,214.8"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="290.9,34.6 290.1,23.2 290.1,49.2 290.9,60.6"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="349.2,28.6 342.4,39.3 342.4,65.3 349.2,54.6"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="264.4,46.4 252.2,37.5 252.2,63.5 264.4,72.4"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="377.6,48.9 361.2,55.3 361.2,81.3 377.6,74.9"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="255.1,65.0 236.1,61.9 236.1,87.9 255.1,91.0"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="255.8,68.9 255.1,65.0 255.1,91.0 255.8,94.9"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="382.4,66.1 379.9,75.0 379.9,101.0 382.4,92.1"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="257.2,72.7 255.8,68.9 255.8,94.9 257.2,98.7"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="379.9,75.0 360.2,74.6 360.2,100.6 379.9,101.0"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="360.2,74.6 357.5,78.2 357.5,104.2 360.2,100.6"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="357.5,78.2 354.0,81.6 354.0,107.6 357.5,104.2"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="247.9,87.1 240.8,79.1 240.8,105.1 247.9,113.1"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="270.9,86.1 266.4,83.2 266.4,109.2 270.9,112.1"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="266.4,83.2 247.9,87.1 247.9,113.1 266.4,109.2"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="276.0,88.7 270.9,86.1 270.9,112.1 276.0,114.7"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="339.6,89.8 333.8,91.8 333.8,117.8 339.6,115.8"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="333.8,91.8 327.6,93.4 327.6,119.4 333.8,117.8"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="355.2,96.9 339.6,89.8 339.6,115.8 355.2,122.9"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="366.2,90.5 355.2,96.9 355.2,122.9 366.2,116.5"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="300.8,94.9 294.1,94.0 294.1,120.0 300.8,120.9"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="307.5,95.2 300.8,94.9 300.8,120.9 307.5,121.2"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="294.1,94.0 283.1,103.5 283.1,129.5 294.1,120.0"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="312.9,106.2 307.5,95.2 307.5,121.2 312.9,132.2"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="283.1,103.5 269.2,99.4 269.2,125.4 283.1,129.5"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="328.3,104.8 312.9,106.2 312.9,132.2 328.3,130.8"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="354.0,81.6 366.2,90.5 355.2,96.9 339.6,89.8 333.8,91.8 327.6,93.4 328.3,104.8 312.9,106.2 307.5,95.2 300.8,94.9 294.1,94.0 283.1,103.5 269.2,99.4 276.0,88.7 270.9,86.1 266.4,83.2 247.9,87.1 240.8,79.1 257.2,72.7 255.8,68.9 255.1,65.0 236.1,61.9 238.5,53.0 258.3,53.4 261.0,49.8 264.4,46.4 252.2,37.5 263.2,31.1 278.8,38.2 284.6,36.2 290.9,34.6 290.1,23.2 305.5,21.8 310.9,32.8 317.7,33.1 324.3,34.0 335.3,24.5 349.2,28.6 342.4,39.3 347.5,41.9 352.0,44.8 370.6,40.9 377.6,48.9 361.2,55.3 362.7,59.1 363.3,63.0 382.4,66.1 379.9,75.0 360.2,74.6 357.5,78.2"/>
	<polygon fill="#231F20" points="322.7,71.8 314.2,74.7 304.3,74.7 295.7,71.8 290.8,66.9 290.8,61.1 295.7,56.2 304.3,53.3 314.2,53.3 322.7,56.2 327.7,61.1 327.7,66.9"/>
</svg>
`,"display-small":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="641.3px" height="661.2px" viewBox="0 0 641.3 661.2" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="479.7,292.8 629.3,379.2 161.6,649.2 12.0,562.8"/>
	<polygon fill="#C99A00" points="225.6,423.3 241.2,432.3 241.2,482.7 225.6,473.7"/>
	<polygon fill="#C99A00" points="256.7,423.3 241.2,432.3 241.2,482.7 256.7,473.7"/>
	<polygon fill="#FFC600" points="241.2,414.3 256.7,423.3 241.2,432.3 225.6,423.3"/>
	<polygon fill="#C99A00" points="263.0,401.7 278.6,410.7 278.6,461.1 263.0,452.1"/>
	<polygon fill="#C99A00" points="294.2,401.7 278.6,410.7 278.6,461.1 294.2,452.1"/>
	<polygon fill="#FFC600" points="278.6,392.7 294.2,401.7 278.6,410.7 263.0,401.7"/>
	<polygon fill="#C99A00" points="300.4,380.1 316.0,389.1 316.0,439.5 300.4,430.5"/>
	<polygon fill="#C99A00" points="331.6,380.1 316.0,389.1 316.0,439.5 331.6,430.5"/>
	<polygon fill="#FFC600" points="316.0,371.1 331.6,380.1 316.0,389.1 300.4,380.1"/>
	<polygon fill="#C99A00" points="337.8,358.5 353.4,367.5 353.4,417.9 337.8,408.9"/>
	<polygon fill="#C99A00" points="369.0,358.5 353.4,367.5 353.4,417.9 369.0,408.9"/>
	<polygon fill="#FFC600" points="353.4,349.5 369.0,358.5 353.4,367.5 337.8,358.5"/>
	<polygon fill="#004E9A" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="74.4,246.0 99.3,260.4 99.3,526.8 74.4,512.4"/>
	<polygon fill="#0A5FBF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="504.6,26.4 99.3,260.4 99.3,526.8 504.6,292.8"/>
	<polygon fill="#0070D9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="479.7,12.0 504.6,26.4 99.3,260.4 74.4,246.0"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="476.5,64.2 127.4,265.8 127.4,467.4 476.5,265.8"/>
	<polygon fill="#8FB8F0" points="457.8,111.0 146.1,291.0 146.1,309.0 457.8,129.0"/>
	<polygon fill="#FFFFFF" points="333.1,222.6 146.1,330.6 146.1,345.0 333.1,237.0"/>
	<polygon fill="#FFFFFF" points="286.4,274.8 146.1,355.8 146.1,370.2 286.4,289.2"/>
	<polygon fill="#8FB8F0" points="171.0,402.6 146.1,417.0 146.1,445.8 171.0,431.4"/>
	<polygon fill="#8FB8F0" points="205.3,364.8 180.4,379.2 180.4,426.0 205.3,411.6"/>
	<polygon fill="#8FB8F0" points="239.6,323.4 214.6,337.8 214.6,406.2 239.6,391.8"/>
	<polygon fill="#8FB8F0" points="273.9,318.0 248.9,332.4 248.9,386.4 273.9,372.0"/>
	<polygon fill="#FFC600" points="308.2,276.6 283.2,291.0 283.2,366.6 308.2,352.2"/>
	<polygon fill="#231F20" points="117.1,499.6 109.6,503.9 109.6,512.6 117.1,508.3"/>
	<polygon fill="#231F20" points="117.1,254.8 109.6,259.1 109.6,267.8 117.1,263.5"/>
	<polygon fill="#231F20" points="494.3,281.8 486.8,286.1 486.8,294.8 494.3,290.5"/>
	<polygon fill="#231F20" points="494.3,37.0 486.8,41.3 486.8,50.0 494.3,45.7"/>
</svg>
`,"fpga-diode-left":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="698.5px" height="435.4px" viewBox="0 0 698.5 435.4" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="349.2,34.0 686.5,228.7 349.2,423.4 12.0,228.7"/>
	<polygon fill="#B5C5DC" points="598.8,206.7 617.9,217.7 617.9,228.7 598.8,217.7"/>
	<polygon fill="#6885A9" points="625.5,213.3 617.9,217.7 617.9,228.7 625.5,224.3"/>
	<polygon fill="#CDD9EE" points="606.4,202.3 625.5,213.3 617.9,217.7 598.8,206.7"/>
	<polygon fill="#B5C5DC" points="73.0,213.3 80.6,217.7 80.6,228.7 73.0,224.3"/>
	<polygon fill="#6885A9" points="99.6,206.7 80.6,217.7 80.6,228.7 99.6,217.7"/>
	<polygon fill="#CDD9EE" points="92.0,202.3 99.6,206.7 80.6,217.7 73.0,213.3"/>
	<polygon fill="#B5C5DC" points="577.9,218.8 596.9,229.8 596.9,240.8 577.9,229.8"/>
	<polygon fill="#6885A9" points="604.5,225.4 596.9,229.8 596.9,240.8 604.5,236.4"/>
	<polygon fill="#CDD9EE" points="585.5,214.4 604.5,225.4 596.9,229.8 577.9,218.8"/>
	<polygon fill="#B5C5DC" points="93.9,225.4 101.5,229.8 101.5,240.8 93.9,236.4"/>
	<polygon fill="#6885A9" points="120.6,218.8 101.5,229.8 101.5,240.8 120.6,229.8"/>
	<polygon fill="#CDD9EE" points="113.0,214.4 120.6,218.8 101.5,229.8 93.9,225.4"/>
	<polygon fill="#B5C5DC" points="556.9,230.9 576.0,241.9 576.0,252.9 556.9,241.9"/>
	<polygon fill="#6885A9" points="583.6,237.5 576.0,241.9 576.0,252.9 583.6,248.5"/>
	<polygon fill="#CDD9EE" points="564.5,226.5 583.6,237.5 576.0,241.9 556.9,230.9"/>
	<polygon fill="#B5C5DC" points="114.9,237.5 122.5,241.9 122.5,252.9 114.9,248.5"/>
	<polygon fill="#6885A9" points="141.6,230.9 122.5,241.9 122.5,252.9 141.6,241.9"/>
	<polygon fill="#CDD9EE" points="133.9,226.5 141.6,230.9 122.5,241.9 114.9,237.5"/>
	<polygon fill="#B5C5DC" points="535.9,243.0 555.0,254.0 555.0,265.0 535.9,254.0"/>
	<polygon fill="#6885A9" points="562.6,249.6 555.0,254.0 555.0,265.0 562.6,260.6"/>
	<polygon fill="#CDD9EE" points="543.6,238.6 562.6,249.6 555.0,254.0 535.9,243.0"/>
	<polygon fill="#B5C5DC" points="135.8,249.6 143.5,254.0 143.5,265.0 135.8,260.6"/>
	<polygon fill="#6885A9" points="162.5,243.0 143.5,254.0 143.5,265.0 162.5,254.0"/>
	<polygon fill="#CDD9EE" points="154.9,238.6 162.5,243.0 143.5,254.0 135.8,249.6"/>
	<polygon fill="#B5C5DC" points="515.0,255.1 534.0,266.1 534.0,277.1 515.0,266.1"/>
	<polygon fill="#6885A9" points="541.7,261.7 534.0,266.1 534.0,277.1 541.7,272.7"/>
	<polygon fill="#CDD9EE" points="522.6,250.7 541.7,261.7 534.0,266.1 515.0,255.1"/>
	<polygon fill="#B5C5DC" points="156.8,261.7 164.4,266.1 164.4,277.1 156.8,272.7"/>
	<polygon fill="#6885A9" points="183.5,255.1 164.4,266.1 164.4,277.1 183.5,266.1"/>
	<polygon fill="#CDD9EE" points="175.9,250.7 183.5,255.1 164.4,266.1 156.8,261.7"/>
	<polygon fill="#B5C5DC" points="494.0,267.2 513.1,278.2 513.1,289.2 494.0,278.2"/>
	<polygon fill="#6885A9" points="520.7,273.8 513.1,278.2 513.1,289.2 520.7,284.8"/>
	<polygon fill="#CDD9EE" points="501.7,262.8 520.7,273.8 513.1,278.2 494.0,267.2"/>
	<polygon fill="#B5C5DC" points="177.8,273.8 185.4,278.2 185.4,289.2 177.8,284.8"/>
	<polygon fill="#6885A9" points="204.4,267.2 185.4,278.2 185.4,289.2 204.4,278.2"/>
	<polygon fill="#CDD9EE" points="196.8,262.8 204.4,267.2 185.4,278.2 177.8,273.8"/>
	<polygon fill="#B5C5DC" points="473.1,279.3 492.1,290.3 492.1,301.3 473.1,290.3"/>
	<polygon fill="#6885A9" points="499.7,285.9 492.1,290.3 492.1,301.3 499.7,296.9"/>
	<polygon fill="#CDD9EE" points="480.7,274.9 499.7,285.9 492.1,290.3 473.1,279.3"/>
	<polygon fill="#B5C5DC" points="198.7,285.9 206.3,290.3 206.3,301.3 198.7,296.9"/>
	<polygon fill="#6885A9" points="225.4,279.3 206.3,290.3 206.3,301.3 225.4,290.3"/>
	<polygon fill="#CDD9EE" points="217.8,274.9 225.4,279.3 206.3,290.3 198.7,285.9"/>
	<polygon fill="#B5C5DC" points="452.1,291.4 471.2,302.4 471.2,313.4 452.1,302.4"/>
	<polygon fill="#6885A9" points="478.8,298.0 471.2,302.4 471.2,313.4 478.8,309.0"/>
	<polygon fill="#CDD9EE" points="459.7,287.0 478.8,298.0 471.2,302.4 452.1,291.4"/>
	<polygon fill="#B5C5DC" points="219.7,298.0 227.3,302.4 227.3,313.4 219.7,309.0"/>
	<polygon fill="#6885A9" points="246.3,291.4 227.3,302.4 227.3,313.4 246.3,302.4"/>
	<polygon fill="#CDD9EE" points="238.7,287.0 246.3,291.4 227.3,302.4 219.7,298.0"/>
	<polygon fill="#B5C5DC" points="431.2,303.5 450.2,314.5 450.2,325.5 431.2,314.5"/>
	<polygon fill="#6885A9" points="457.8,310.1 450.2,314.5 450.2,325.5 457.8,321.1"/>
	<polygon fill="#CDD9EE" points="438.8,299.1 457.8,310.1 450.2,314.5 431.2,303.5"/>
	<polygon fill="#B5C5DC" points="240.6,310.1 248.3,314.5 248.3,325.5 240.6,321.1"/>
	<polygon fill="#6885A9" points="267.3,303.5 248.3,314.5 248.3,325.5 267.3,314.5"/>
	<polygon fill="#CDD9EE" points="259.7,299.1 267.3,303.5 248.3,314.5 240.6,310.1"/>
	<polygon fill="#B5C5DC" points="410.2,315.6 429.3,326.6 429.3,337.6 410.2,326.6"/>
	<polygon fill="#6885A9" points="436.9,322.2 429.3,326.6 429.3,337.6 436.9,333.2"/>
	<polygon fill="#CDD9EE" points="417.8,311.2 436.9,322.2 429.3,326.6 410.2,315.6"/>
	<polygon fill="#B5C5DC" points="261.6,322.2 269.2,326.6 269.2,337.6 261.6,333.2"/>
	<polygon fill="#6885A9" points="288.3,315.6 269.2,326.6 269.2,337.6 288.3,326.6"/>
	<polygon fill="#CDD9EE" points="280.6,311.2 288.3,315.6 269.2,326.6 261.6,322.2"/>
	<polygon fill="#B5C5DC" points="389.2,327.7 408.3,338.7 408.3,349.7 389.2,338.7"/>
	<polygon fill="#6885A9" points="415.9,334.3 408.3,338.7 408.3,349.7 415.9,345.3"/>
	<polygon fill="#CDD9EE" points="396.9,323.3 415.9,334.3 408.3,338.7 389.2,327.7"/>
	<polygon fill="#B5C5DC" points="282.5,334.3 290.2,338.7 290.2,349.7 282.5,345.3"/>
	<polygon fill="#6885A9" points="309.2,327.7 290.2,338.7 290.2,349.7 309.2,338.7"/>
	<polygon fill="#CDD9EE" points="301.6,323.3 309.2,327.7 290.2,338.7 282.5,334.3"/>
	<polygon fill="#B5C5DC" points="368.3,339.8 387.3,350.8 387.3,361.8 368.3,350.8"/>
	<polygon fill="#6885A9" points="395.0,346.4 387.3,350.8 387.3,361.8 395.0,357.4"/>
	<polygon fill="#CDD9EE" points="375.9,335.4 395.0,346.4 387.3,350.8 368.3,339.8"/>
	<polygon fill="#B5C5DC" points="303.5,346.4 311.1,350.8 311.1,361.8 303.5,357.4"/>
	<polygon fill="#6885A9" points="330.2,339.8 311.1,350.8 311.1,361.8 330.2,350.8"/>
	<polygon fill="#CDD9EE" points="322.6,335.4 330.2,339.8 311.1,350.8 303.5,346.4"/>
	<polygon fill="#2D4663" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="73.0,171.5 349.2,331.0 349.2,366.2 73.0,206.7"/>
	<polygon fill="#223650" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="625.5,171.5 349.2,331.0 349.2,366.2 625.5,206.7"/>
	<polygon fill="#3A5877" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="349.2,12.0 625.5,171.5 349.2,331.0 73.0,171.5"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="349.2,45.0 568.3,171.5 349.2,298.0 130.1,171.5"/>
	<polygon fill="#B5C5DC" points="349.2,51.6 393.1,76.9 349.2,102.2 305.4,76.9"/>
	<polygon fill="#0070D9" points="292.1,84.6 335.9,109.9 292.1,135.2 248.3,109.9"/>
	<polygon fill="#B5C5DC" points="234.9,117.6 278.7,142.9 234.9,168.2 191.1,142.9"/>
	<polygon fill="#FFC600" points="177.8,150.6 221.6,175.9 177.8,201.2 133.9,175.9"/>
	<polygon fill="#FFC600" points="520.7,150.6 564.5,175.9 520.7,201.2 476.9,175.9"/>
	<polygon fill="#B5C5DC" points="463.5,183.6 507.4,208.9 463.5,234.2 419.7,208.9"/>
	<polygon fill="#0070D9" points="406.4,216.6 450.2,241.9 406.4,267.2 362.6,241.9"/>
	<polygon fill="#B5C5DC" points="349.2,249.6 393.1,274.9 349.2,300.2 305.4,274.9"/>
	<polygon fill="#231F20" points="444.5,115.4 454.0,120.9 261.6,232.0 252.1,226.5"/>
	<polygon fill="#0070D9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="351.1,130.8 427.3,174.8 316.8,194.6"/>
	<polygon fill="#231F20" points="274.9,170.4 358.8,218.8 347.3,225.4 263.5,177.0"/>
</svg>
`,"fpga-diode-right":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="698.5px" height="435.4px" viewBox="0 0 698.5 435.4" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="349.2,34.0 686.5,228.7 349.2,423.4 12.0,228.7"/>
	<polygon fill="#B5C5DC" points="598.8,206.7 617.9,217.7 617.9,228.7 598.8,217.7"/>
	<polygon fill="#6885A9" points="625.5,213.3 617.9,217.7 617.9,228.7 625.5,224.3"/>
	<polygon fill="#CDD9EE" points="606.4,202.3 625.5,213.3 617.9,217.7 598.8,206.7"/>
	<polygon fill="#B5C5DC" points="73.0,213.3 80.6,217.7 80.6,228.7 73.0,224.3"/>
	<polygon fill="#6885A9" points="99.6,206.7 80.6,217.7 80.6,228.7 99.6,217.7"/>
	<polygon fill="#CDD9EE" points="92.0,202.3 99.6,206.7 80.6,217.7 73.0,213.3"/>
	<polygon fill="#B5C5DC" points="577.9,218.8 596.9,229.8 596.9,240.8 577.9,229.8"/>
	<polygon fill="#6885A9" points="604.5,225.4 596.9,229.8 596.9,240.8 604.5,236.4"/>
	<polygon fill="#CDD9EE" points="585.5,214.4 604.5,225.4 596.9,229.8 577.9,218.8"/>
	<polygon fill="#B5C5DC" points="93.9,225.4 101.5,229.8 101.5,240.8 93.9,236.4"/>
	<polygon fill="#6885A9" points="120.6,218.8 101.5,229.8 101.5,240.8 120.6,229.8"/>
	<polygon fill="#CDD9EE" points="113.0,214.4 120.6,218.8 101.5,229.8 93.9,225.4"/>
	<polygon fill="#B5C5DC" points="556.9,230.9 576.0,241.9 576.0,252.9 556.9,241.9"/>
	<polygon fill="#6885A9" points="583.6,237.5 576.0,241.9 576.0,252.9 583.6,248.5"/>
	<polygon fill="#CDD9EE" points="564.5,226.5 583.6,237.5 576.0,241.9 556.9,230.9"/>
	<polygon fill="#B5C5DC" points="114.9,237.5 122.5,241.9 122.5,252.9 114.9,248.5"/>
	<polygon fill="#6885A9" points="141.6,230.9 122.5,241.9 122.5,252.9 141.6,241.9"/>
	<polygon fill="#CDD9EE" points="133.9,226.5 141.6,230.9 122.5,241.9 114.9,237.5"/>
	<polygon fill="#B5C5DC" points="535.9,243.0 555.0,254.0 555.0,265.0 535.9,254.0"/>
	<polygon fill="#6885A9" points="562.6,249.6 555.0,254.0 555.0,265.0 562.6,260.6"/>
	<polygon fill="#CDD9EE" points="543.6,238.6 562.6,249.6 555.0,254.0 535.9,243.0"/>
	<polygon fill="#B5C5DC" points="135.8,249.6 143.5,254.0 143.5,265.0 135.8,260.6"/>
	<polygon fill="#6885A9" points="162.5,243.0 143.5,254.0 143.5,265.0 162.5,254.0"/>
	<polygon fill="#CDD9EE" points="154.9,238.6 162.5,243.0 143.5,254.0 135.8,249.6"/>
	<polygon fill="#B5C5DC" points="515.0,255.1 534.0,266.1 534.0,277.1 515.0,266.1"/>
	<polygon fill="#6885A9" points="541.7,261.7 534.0,266.1 534.0,277.1 541.7,272.7"/>
	<polygon fill="#CDD9EE" points="522.6,250.7 541.7,261.7 534.0,266.1 515.0,255.1"/>
	<polygon fill="#B5C5DC" points="156.8,261.7 164.4,266.1 164.4,277.1 156.8,272.7"/>
	<polygon fill="#6885A9" points="183.5,255.1 164.4,266.1 164.4,277.1 183.5,266.1"/>
	<polygon fill="#CDD9EE" points="175.9,250.7 183.5,255.1 164.4,266.1 156.8,261.7"/>
	<polygon fill="#B5C5DC" points="494.0,267.2 513.1,278.2 513.1,289.2 494.0,278.2"/>
	<polygon fill="#6885A9" points="520.7,273.8 513.1,278.2 513.1,289.2 520.7,284.8"/>
	<polygon fill="#CDD9EE" points="501.7,262.8 520.7,273.8 513.1,278.2 494.0,267.2"/>
	<polygon fill="#B5C5DC" points="177.8,273.8 185.4,278.2 185.4,289.2 177.8,284.8"/>
	<polygon fill="#6885A9" points="204.4,267.2 185.4,278.2 185.4,289.2 204.4,278.2"/>
	<polygon fill="#CDD9EE" points="196.8,262.8 204.4,267.2 185.4,278.2 177.8,273.8"/>
	<polygon fill="#B5C5DC" points="473.1,279.3 492.1,290.3 492.1,301.3 473.1,290.3"/>
	<polygon fill="#6885A9" points="499.7,285.9 492.1,290.3 492.1,301.3 499.7,296.9"/>
	<polygon fill="#CDD9EE" points="480.7,274.9 499.7,285.9 492.1,290.3 473.1,279.3"/>
	<polygon fill="#B5C5DC" points="198.7,285.9 206.3,290.3 206.3,301.3 198.7,296.9"/>
	<polygon fill="#6885A9" points="225.4,279.3 206.3,290.3 206.3,301.3 225.4,290.3"/>
	<polygon fill="#CDD9EE" points="217.8,274.9 225.4,279.3 206.3,290.3 198.7,285.9"/>
	<polygon fill="#B5C5DC" points="452.1,291.4 471.2,302.4 471.2,313.4 452.1,302.4"/>
	<polygon fill="#6885A9" points="478.8,298.0 471.2,302.4 471.2,313.4 478.8,309.0"/>
	<polygon fill="#CDD9EE" points="459.7,287.0 478.8,298.0 471.2,302.4 452.1,291.4"/>
	<polygon fill="#B5C5DC" points="219.7,298.0 227.3,302.4 227.3,313.4 219.7,309.0"/>
	<polygon fill="#6885A9" points="246.3,291.4 227.3,302.4 227.3,313.4 246.3,302.4"/>
	<polygon fill="#CDD9EE" points="238.7,287.0 246.3,291.4 227.3,302.4 219.7,298.0"/>
	<polygon fill="#B5C5DC" points="431.2,303.5 450.2,314.5 450.2,325.5 431.2,314.5"/>
	<polygon fill="#6885A9" points="457.8,310.1 450.2,314.5 450.2,325.5 457.8,321.1"/>
	<polygon fill="#CDD9EE" points="438.8,299.1 457.8,310.1 450.2,314.5 431.2,303.5"/>
	<polygon fill="#B5C5DC" points="240.6,310.1 248.3,314.5 248.3,325.5 240.6,321.1"/>
	<polygon fill="#6885A9" points="267.3,303.5 248.3,314.5 248.3,325.5 267.3,314.5"/>
	<polygon fill="#CDD9EE" points="259.7,299.1 267.3,303.5 248.3,314.5 240.6,310.1"/>
	<polygon fill="#B5C5DC" points="410.2,315.6 429.3,326.6 429.3,337.6 410.2,326.6"/>
	<polygon fill="#6885A9" points="436.9,322.2 429.3,326.6 429.3,337.6 436.9,333.2"/>
	<polygon fill="#CDD9EE" points="417.8,311.2 436.9,322.2 429.3,326.6 410.2,315.6"/>
	<polygon fill="#B5C5DC" points="261.6,322.2 269.2,326.6 269.2,337.6 261.6,333.2"/>
	<polygon fill="#6885A9" points="288.3,315.6 269.2,326.6 269.2,337.6 288.3,326.6"/>
	<polygon fill="#CDD9EE" points="280.6,311.2 288.3,315.6 269.2,326.6 261.6,322.2"/>
	<polygon fill="#B5C5DC" points="389.2,327.7 408.3,338.7 408.3,349.7 389.2,338.7"/>
	<polygon fill="#6885A9" points="415.9,334.3 408.3,338.7 408.3,349.7 415.9,345.3"/>
	<polygon fill="#CDD9EE" points="396.9,323.3 415.9,334.3 408.3,338.7 389.2,327.7"/>
	<polygon fill="#B5C5DC" points="282.5,334.3 290.2,338.7 290.2,349.7 282.5,345.3"/>
	<polygon fill="#6885A9" points="309.2,327.7 290.2,338.7 290.2,349.7 309.2,338.7"/>
	<polygon fill="#CDD9EE" points="301.6,323.3 309.2,327.7 290.2,338.7 282.5,334.3"/>
	<polygon fill="#B5C5DC" points="368.3,339.8 387.3,350.8 387.3,361.8 368.3,350.8"/>
	<polygon fill="#6885A9" points="395.0,346.4 387.3,350.8 387.3,361.8 395.0,357.4"/>
	<polygon fill="#CDD9EE" points="375.9,335.4 395.0,346.4 387.3,350.8 368.3,339.8"/>
	<polygon fill="#B5C5DC" points="303.5,346.4 311.1,350.8 311.1,361.8 303.5,357.4"/>
	<polygon fill="#6885A9" points="330.2,339.8 311.1,350.8 311.1,361.8 330.2,350.8"/>
	<polygon fill="#CDD9EE" points="322.6,335.4 330.2,339.8 311.1,350.8 303.5,346.4"/>
	<polygon fill="#2D4663" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="73.0,171.5 349.2,331.0 349.2,366.2 73.0,206.7"/>
	<polygon fill="#223650" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="625.5,171.5 349.2,331.0 349.2,366.2 625.5,206.7"/>
	<polygon fill="#3A5877" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="349.2,12.0 625.5,171.5 349.2,331.0 73.0,171.5"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="349.2,45.0 568.3,171.5 349.2,298.0 130.1,171.5"/>
	<polygon fill="#B5C5DC" points="349.2,51.6 393.1,76.9 349.2,102.2 305.4,76.9"/>
	<polygon fill="#0070D9" points="292.1,84.6 335.9,109.9 292.1,135.2 248.3,109.9"/>
	<polygon fill="#B5C5DC" points="234.9,117.6 278.7,142.9 234.9,168.2 191.1,142.9"/>
	<polygon fill="#FFC600" points="177.8,150.6 221.6,175.9 177.8,201.2 133.9,175.9"/>
	<polygon fill="#FFC600" points="520.7,150.6 564.5,175.9 520.7,201.2 476.9,175.9"/>
	<polygon fill="#B5C5DC" points="463.5,183.6 507.4,208.9 463.5,234.2 419.7,208.9"/>
	<polygon fill="#0070D9" points="406.4,216.6 450.2,241.9 406.4,267.2 362.6,241.9"/>
	<polygon fill="#B5C5DC" points="349.2,249.6 393.1,274.9 349.2,300.2 305.4,274.9"/>
	<polygon fill="#231F20" points="444.5,115.4 454.0,120.9 261.6,232.0 252.1,226.5"/>
	<polygon fill="#0070D9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="278.7,172.6 354.9,216.6 389.2,152.8"/>
	<polygon fill="#231F20" points="358.8,122.0 442.6,170.4 431.2,177.0 347.3,128.6"/>
</svg>
`,fpga:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="698.5px" height="435.4px" viewBox="0 0 698.5 435.4" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="349.2,34.0 686.5,228.7 349.2,423.4 12.0,228.7"/>
	<polygon fill="#B5C5DC" points="598.8,206.7 617.9,217.7 617.9,228.7 598.8,217.7"/>
	<polygon fill="#6885A9" points="625.5,213.3 617.9,217.7 617.9,228.7 625.5,224.3"/>
	<polygon fill="#CDD9EE" points="606.4,202.3 625.5,213.3 617.9,217.7 598.8,206.7"/>
	<polygon fill="#B5C5DC" points="73.0,213.3 80.6,217.7 80.6,228.7 73.0,224.3"/>
	<polygon fill="#6885A9" points="99.6,206.7 80.6,217.7 80.6,228.7 99.6,217.7"/>
	<polygon fill="#CDD9EE" points="92.0,202.3 99.6,206.7 80.6,217.7 73.0,213.3"/>
	<polygon fill="#B5C5DC" points="577.9,218.8 596.9,229.8 596.9,240.8 577.9,229.8"/>
	<polygon fill="#6885A9" points="604.5,225.4 596.9,229.8 596.9,240.8 604.5,236.4"/>
	<polygon fill="#CDD9EE" points="585.5,214.4 604.5,225.4 596.9,229.8 577.9,218.8"/>
	<polygon fill="#B5C5DC" points="93.9,225.4 101.5,229.8 101.5,240.8 93.9,236.4"/>
	<polygon fill="#6885A9" points="120.6,218.8 101.5,229.8 101.5,240.8 120.6,229.8"/>
	<polygon fill="#CDD9EE" points="113.0,214.4 120.6,218.8 101.5,229.8 93.9,225.4"/>
	<polygon fill="#B5C5DC" points="556.9,230.9 576.0,241.9 576.0,252.9 556.9,241.9"/>
	<polygon fill="#6885A9" points="583.6,237.5 576.0,241.9 576.0,252.9 583.6,248.5"/>
	<polygon fill="#CDD9EE" points="564.5,226.5 583.6,237.5 576.0,241.9 556.9,230.9"/>
	<polygon fill="#B5C5DC" points="114.9,237.5 122.5,241.9 122.5,252.9 114.9,248.5"/>
	<polygon fill="#6885A9" points="141.6,230.9 122.5,241.9 122.5,252.9 141.6,241.9"/>
	<polygon fill="#CDD9EE" points="133.9,226.5 141.6,230.9 122.5,241.9 114.9,237.5"/>
	<polygon fill="#B5C5DC" points="535.9,243.0 555.0,254.0 555.0,265.0 535.9,254.0"/>
	<polygon fill="#6885A9" points="562.6,249.6 555.0,254.0 555.0,265.0 562.6,260.6"/>
	<polygon fill="#CDD9EE" points="543.6,238.6 562.6,249.6 555.0,254.0 535.9,243.0"/>
	<polygon fill="#B5C5DC" points="135.8,249.6 143.5,254.0 143.5,265.0 135.8,260.6"/>
	<polygon fill="#6885A9" points="162.5,243.0 143.5,254.0 143.5,265.0 162.5,254.0"/>
	<polygon fill="#CDD9EE" points="154.9,238.6 162.5,243.0 143.5,254.0 135.8,249.6"/>
	<polygon fill="#B5C5DC" points="515.0,255.1 534.0,266.1 534.0,277.1 515.0,266.1"/>
	<polygon fill="#6885A9" points="541.7,261.7 534.0,266.1 534.0,277.1 541.7,272.7"/>
	<polygon fill="#CDD9EE" points="522.6,250.7 541.7,261.7 534.0,266.1 515.0,255.1"/>
	<polygon fill="#B5C5DC" points="156.8,261.7 164.4,266.1 164.4,277.1 156.8,272.7"/>
	<polygon fill="#6885A9" points="183.5,255.1 164.4,266.1 164.4,277.1 183.5,266.1"/>
	<polygon fill="#CDD9EE" points="175.9,250.7 183.5,255.1 164.4,266.1 156.8,261.7"/>
	<polygon fill="#B5C5DC" points="494.0,267.2 513.1,278.2 513.1,289.2 494.0,278.2"/>
	<polygon fill="#6885A9" points="520.7,273.8 513.1,278.2 513.1,289.2 520.7,284.8"/>
	<polygon fill="#CDD9EE" points="501.7,262.8 520.7,273.8 513.1,278.2 494.0,267.2"/>
	<polygon fill="#B5C5DC" points="177.8,273.8 185.4,278.2 185.4,289.2 177.8,284.8"/>
	<polygon fill="#6885A9" points="204.4,267.2 185.4,278.2 185.4,289.2 204.4,278.2"/>
	<polygon fill="#CDD9EE" points="196.8,262.8 204.4,267.2 185.4,278.2 177.8,273.8"/>
	<polygon fill="#B5C5DC" points="473.1,279.3 492.1,290.3 492.1,301.3 473.1,290.3"/>
	<polygon fill="#6885A9" points="499.7,285.9 492.1,290.3 492.1,301.3 499.7,296.9"/>
	<polygon fill="#CDD9EE" points="480.7,274.9 499.7,285.9 492.1,290.3 473.1,279.3"/>
	<polygon fill="#B5C5DC" points="198.7,285.9 206.3,290.3 206.3,301.3 198.7,296.9"/>
	<polygon fill="#6885A9" points="225.4,279.3 206.3,290.3 206.3,301.3 225.4,290.3"/>
	<polygon fill="#CDD9EE" points="217.8,274.9 225.4,279.3 206.3,290.3 198.7,285.9"/>
	<polygon fill="#B5C5DC" points="452.1,291.4 471.2,302.4 471.2,313.4 452.1,302.4"/>
	<polygon fill="#6885A9" points="478.8,298.0 471.2,302.4 471.2,313.4 478.8,309.0"/>
	<polygon fill="#CDD9EE" points="459.7,287.0 478.8,298.0 471.2,302.4 452.1,291.4"/>
	<polygon fill="#B5C5DC" points="219.7,298.0 227.3,302.4 227.3,313.4 219.7,309.0"/>
	<polygon fill="#6885A9" points="246.3,291.4 227.3,302.4 227.3,313.4 246.3,302.4"/>
	<polygon fill="#CDD9EE" points="238.7,287.0 246.3,291.4 227.3,302.4 219.7,298.0"/>
	<polygon fill="#B5C5DC" points="431.2,303.5 450.2,314.5 450.2,325.5 431.2,314.5"/>
	<polygon fill="#6885A9" points="457.8,310.1 450.2,314.5 450.2,325.5 457.8,321.1"/>
	<polygon fill="#CDD9EE" points="438.8,299.1 457.8,310.1 450.2,314.5 431.2,303.5"/>
	<polygon fill="#B5C5DC" points="240.6,310.1 248.3,314.5 248.3,325.5 240.6,321.1"/>
	<polygon fill="#6885A9" points="267.3,303.5 248.3,314.5 248.3,325.5 267.3,314.5"/>
	<polygon fill="#CDD9EE" points="259.7,299.1 267.3,303.5 248.3,314.5 240.6,310.1"/>
	<polygon fill="#B5C5DC" points="410.2,315.6 429.3,326.6 429.3,337.6 410.2,326.6"/>
	<polygon fill="#6885A9" points="436.9,322.2 429.3,326.6 429.3,337.6 436.9,333.2"/>
	<polygon fill="#CDD9EE" points="417.8,311.2 436.9,322.2 429.3,326.6 410.2,315.6"/>
	<polygon fill="#B5C5DC" points="261.6,322.2 269.2,326.6 269.2,337.6 261.6,333.2"/>
	<polygon fill="#6885A9" points="288.3,315.6 269.2,326.6 269.2,337.6 288.3,326.6"/>
	<polygon fill="#CDD9EE" points="280.6,311.2 288.3,315.6 269.2,326.6 261.6,322.2"/>
	<polygon fill="#B5C5DC" points="389.2,327.7 408.3,338.7 408.3,349.7 389.2,338.7"/>
	<polygon fill="#6885A9" points="415.9,334.3 408.3,338.7 408.3,349.7 415.9,345.3"/>
	<polygon fill="#CDD9EE" points="396.9,323.3 415.9,334.3 408.3,338.7 389.2,327.7"/>
	<polygon fill="#B5C5DC" points="282.5,334.3 290.2,338.7 290.2,349.7 282.5,345.3"/>
	<polygon fill="#6885A9" points="309.2,327.7 290.2,338.7 290.2,349.7 309.2,338.7"/>
	<polygon fill="#CDD9EE" points="301.6,323.3 309.2,327.7 290.2,338.7 282.5,334.3"/>
	<polygon fill="#B5C5DC" points="368.3,339.8 387.3,350.8 387.3,361.8 368.3,350.8"/>
	<polygon fill="#6885A9" points="395.0,346.4 387.3,350.8 387.3,361.8 395.0,357.4"/>
	<polygon fill="#CDD9EE" points="375.9,335.4 395.0,346.4 387.3,350.8 368.3,339.8"/>
	<polygon fill="#B5C5DC" points="303.5,346.4 311.1,350.8 311.1,361.8 303.5,357.4"/>
	<polygon fill="#6885A9" points="330.2,339.8 311.1,350.8 311.1,361.8 330.2,350.8"/>
	<polygon fill="#CDD9EE" points="322.6,335.4 330.2,339.8 311.1,350.8 303.5,346.4"/>
	<polygon fill="#2D4663" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="73.0,171.5 349.2,331.0 349.2,366.2 73.0,206.7"/>
	<polygon fill="#223650" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="625.5,171.5 349.2,331.0 349.2,366.2 625.5,206.7"/>
	<polygon fill="#3A5877" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="349.2,12.0 625.5,171.5 349.2,331.0 73.0,171.5"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="349.2,45.0 568.3,171.5 349.2,298.0 130.1,171.5"/>
	<polygon fill="#B5C5DC" points="349.2,51.6 393.1,76.9 349.2,102.2 305.4,76.9"/>
	<polygon fill="#0070D9" points="292.1,84.6 335.9,109.9 292.1,135.2 248.3,109.9"/>
	<polygon fill="#B5C5DC" points="234.9,117.6 278.7,142.9 234.9,168.2 191.1,142.9"/>
	<polygon fill="#FFC600" points="177.8,150.6 221.6,175.9 177.8,201.2 133.9,175.9"/>
	<polygon fill="#0070D9" points="406.4,84.6 450.2,109.9 406.4,135.2 362.6,109.9"/>
	<polygon fill="#B5C5DC" points="349.2,117.6 393.1,142.9 349.2,168.2 305.4,142.9"/>
	<polygon fill="#FFC600" points="292.1,150.6 335.9,175.9 292.1,201.2 248.3,175.9"/>
	<polygon fill="#B5C5DC" points="234.9,183.6 278.7,208.9 234.9,234.2 191.1,208.9"/>
	<polygon fill="#B5C5DC" points="463.5,117.6 507.4,142.9 463.5,168.2 419.7,142.9"/>
	<polygon fill="#FFC600" points="406.4,150.6 450.2,175.9 406.4,201.2 362.6,175.9"/>
	<polygon fill="#B5C5DC" points="349.2,183.6 393.1,208.9 349.2,234.2 305.4,208.9"/>
	<polygon fill="#0070D9" points="292.1,216.6 335.9,241.9 292.1,267.2 248.3,241.9"/>
	<polygon fill="#FFC600" points="520.7,150.6 564.5,175.9 520.7,201.2 476.9,175.9"/>
	<polygon fill="#B5C5DC" points="463.5,183.6 507.4,208.9 463.5,234.2 419.7,208.9"/>
	<polygon fill="#0070D9" points="406.4,216.6 450.2,241.9 406.4,267.2 362.6,241.9"/>
	<polygon fill="#B5C5DC" points="349.2,249.6 393.1,274.9 349.2,300.2 305.4,274.9"/>
	<polygon fill="#8FB8F0" points="300.6,79.6 515.9,203.9 512.1,206.1 296.8,81.8"/>
	<polygon fill="#8FB8F0" points="397.8,79.6 401.6,81.8 186.3,206.1 182.5,203.9"/>
	<polygon fill="#8FB8F0" points="243.5,112.6 458.8,236.9 455.0,239.1 239.7,114.8"/>
	<polygon fill="#8FB8F0" points="455.0,112.6 458.8,114.8 243.5,239.1 239.7,236.9"/>
	<polygon fill="#8FB8F0" points="186.3,145.6 401.6,269.9 397.8,272.1 182.5,147.8"/>
	<polygon fill="#8FB8F0" points="512.1,145.6 515.9,147.8 300.6,272.1 296.8,269.9"/>
</svg>
`,"kernel-ip":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="713.7px" height="435.4px" viewBox="0 0 713.7 435.4" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="356.9,25.2 701.7,224.3 356.9,423.4 12.0,224.3"/>
	<polygon fill="#3A5877" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="80.6,171.5 356.9,331.0 356.9,357.4 80.6,197.9"/>
	<polygon fill="#2D4663" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="633.1,171.5 356.9,331.0 356.9,357.4 633.1,197.9"/>
	<polygon fill="#4B6E98" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="356.9,12.0 633.1,171.5 356.9,331.0 80.6,171.5"/>
	<polygon fill="#C99A00" points="589.3,202.3 602.6,210.0 602.6,227.6 589.3,219.9"/>
	<polygon fill="#C99A00" points="617.9,201.2 602.6,210.0 602.6,227.6 617.9,218.8"/>
	<polygon fill="#FFC600" points="604.5,193.5 617.9,201.2 602.6,210.0 589.3,202.3"/>
	<polygon fill="#C99A00" points="95.8,201.2 111.1,210.0 111.1,227.6 95.8,218.8"/>
	<polygon fill="#C99A00" points="124.4,202.3 111.1,210.0 111.1,227.6 124.4,219.9"/>
	<polygon fill="#FFC600" points="109.2,193.5 124.4,202.3 111.1,210.0 95.8,201.2"/>
	<polygon fill="#C99A00" points="553.1,223.2 566.4,230.9 566.4,248.5 553.1,240.8"/>
	<polygon fill="#C99A00" points="581.7,222.1 566.4,230.9 566.4,248.5 581.7,239.7"/>
	<polygon fill="#FFC600" points="568.3,214.4 581.7,222.1 566.4,230.9 553.1,223.2"/>
	<polygon fill="#C99A00" points="132.0,222.1 147.3,230.9 147.3,248.5 132.0,239.7"/>
	<polygon fill="#C99A00" points="160.6,223.2 147.3,230.9 147.3,248.5 160.6,240.8"/>
	<polygon fill="#FFC600" points="145.4,214.4 160.6,223.2 147.3,230.9 132.0,222.1"/>
	<polygon fill="#C99A00" points="516.9,244.1 530.2,251.8 530.2,269.4 516.9,261.7"/>
	<polygon fill="#C99A00" points="545.5,243.0 530.2,251.8 530.2,269.4 545.5,260.6"/>
	<polygon fill="#FFC600" points="532.1,235.3 545.5,243.0 530.2,251.8 516.9,244.1"/>
	<polygon fill="#C99A00" points="168.2,243.0 183.5,251.8 183.5,269.4 168.2,260.6"/>
	<polygon fill="#C99A00" points="196.8,244.1 183.5,251.8 183.5,269.4 196.8,261.7"/>
	<polygon fill="#FFC600" points="181.6,235.3 196.8,244.1 183.5,251.8 168.2,243.0"/>
	<polygon fill="#C99A00" points="480.7,265.0 494.0,272.7 494.0,290.3 480.7,282.6"/>
	<polygon fill="#C99A00" points="509.3,263.9 494.0,272.7 494.0,290.3 509.3,281.5"/>
	<polygon fill="#FFC600" points="495.9,256.2 509.3,263.9 494.0,272.7 480.7,265.0"/>
	<polygon fill="#C99A00" points="204.4,263.9 219.7,272.7 219.7,290.3 204.4,281.5"/>
	<polygon fill="#C99A00" points="233.0,265.0 219.7,272.7 219.7,290.3 233.0,282.6"/>
	<polygon fill="#FFC600" points="217.8,256.2 233.0,265.0 219.7,272.7 204.4,263.9"/>
	<polygon fill="#C99A00" points="444.5,285.9 457.8,293.6 457.8,311.2 444.5,303.5"/>
	<polygon fill="#C99A00" points="473.1,284.8 457.8,293.6 457.8,311.2 473.1,302.4"/>
	<polygon fill="#FFC600" points="459.7,277.1 473.1,284.8 457.8,293.6 444.5,285.9"/>
	<polygon fill="#C99A00" points="240.6,284.8 255.9,293.6 255.9,311.2 240.6,302.4"/>
	<polygon fill="#C99A00" points="269.2,285.9 255.9,293.6 255.9,311.2 269.2,303.5"/>
	<polygon fill="#FFC600" points="254.0,277.1 269.2,285.9 255.9,293.6 240.6,284.8"/>
	<polygon fill="#C99A00" points="408.3,306.8 421.6,314.5 421.6,332.1 408.3,324.4"/>
	<polygon fill="#C99A00" points="436.9,305.7 421.6,314.5 421.6,332.1 436.9,323.3"/>
	<polygon fill="#FFC600" points="423.5,298.0 436.9,305.7 421.6,314.5 408.3,306.8"/>
	<polygon fill="#C99A00" points="276.8,305.7 292.1,314.5 292.1,332.1 276.8,323.3"/>
	<polygon fill="#C99A00" points="305.4,306.8 292.1,314.5 292.1,332.1 305.4,324.4"/>
	<polygon fill="#FFC600" points="290.2,298.0 305.4,306.8 292.1,314.5 276.8,305.7"/>
	<polygon fill="#C99A00" points="372.1,327.7 385.4,335.4 385.4,353.0 372.1,345.3"/>
	<polygon fill="#C99A00" points="400.7,326.6 385.4,335.4 385.4,353.0 400.7,344.2"/>
	<polygon fill="#FFC600" points="387.3,318.9 400.7,326.6 385.4,335.4 372.1,327.7"/>
	<polygon fill="#C99A00" points="313.0,326.6 328.3,335.4 328.3,353.0 313.0,344.2"/>
	<polygon fill="#C99A00" points="341.6,327.7 328.3,335.4 328.3,353.0 341.6,345.3"/>
	<polygon fill="#FFC600" points="326.4,318.9 341.6,327.7 328.3,335.4 313.0,326.6"/>
	<polygon fill="#0070D9" points="458.8,106.1 470.2,112.7 356.9,178.1 345.4,171.5"/>
	<polygon fill="#0070D9" points="356.9,164.9 368.3,171.5 254.9,236.9 243.5,230.3"/>
	<polygon fill="#0070D9" points="254.9,106.1 368.3,171.5 356.9,178.1 243.5,112.7"/>
	<polygon fill="#0070D9" points="356.9,164.9 470.2,230.3 458.8,236.9 345.4,171.5"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="424.5,73.0 458.8,92.8 458.8,132.4 424.5,112.6"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="493.1,73.0 458.8,92.8 458.8,132.4 493.1,112.7"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="458.8,53.2 493.1,73.0 458.8,92.8 424.5,73.0"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="220.6,73.0 254.9,92.8 254.9,132.4 220.6,112.7"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="289.2,73.0 254.9,92.8 254.9,132.4 289.2,112.6"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="254.9,53.2 289.2,73.0 254.9,92.8 220.6,73.0"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="424.5,190.8 458.8,210.5 458.8,250.1 424.5,230.3"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="493.1,190.8 458.8,210.5 458.8,250.1 493.1,230.3"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="458.8,170.9 493.1,190.8 458.8,210.5 424.5,190.8"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="220.6,190.8 254.9,210.5 254.9,250.1 220.6,230.3"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="289.2,190.8 254.9,210.5 254.9,250.1 289.2,230.3"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="254.9,170.9 289.2,190.8 254.9,210.5 220.6,190.8"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="299.7,114.3 356.9,147.3 356.9,204.5 299.7,171.5"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="414.0,114.3 356.9,147.3 356.9,204.5 414.0,171.5"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="356.9,81.3 414.0,114.3 356.9,147.3 299.7,114.3"/>
</svg>
`,"kernel-tcp":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="713.7px" height="435.4px" viewBox="0 0 713.7 435.4" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="356.9,25.2 701.7,224.3 356.9,423.4 12.0,224.3"/>
	<polygon fill="#3A5877" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="80.6,171.5 356.9,331.0 356.9,357.4 80.6,197.9"/>
	<polygon fill="#2D4663" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="633.1,171.5 356.9,331.0 356.9,357.4 633.1,197.9"/>
	<polygon fill="#4B6E98" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="356.9,12.0 633.1,171.5 356.9,331.0 80.6,171.5"/>
	<polygon fill="#C99A00" points="589.3,202.3 602.6,210.0 602.6,227.6 589.3,219.9"/>
	<polygon fill="#C99A00" points="617.9,201.2 602.6,210.0 602.6,227.6 617.9,218.8"/>
	<polygon fill="#FFC600" points="604.5,193.5 617.9,201.2 602.6,210.0 589.3,202.3"/>
	<polygon fill="#C99A00" points="95.8,201.2 111.1,210.0 111.1,227.6 95.8,218.8"/>
	<polygon fill="#C99A00" points="124.4,202.3 111.1,210.0 111.1,227.6 124.4,219.9"/>
	<polygon fill="#FFC600" points="109.2,193.5 124.4,202.3 111.1,210.0 95.8,201.2"/>
	<polygon fill="#C99A00" points="553.1,223.2 566.4,230.9 566.4,248.5 553.1,240.8"/>
	<polygon fill="#C99A00" points="581.7,222.1 566.4,230.9 566.4,248.5 581.7,239.7"/>
	<polygon fill="#FFC600" points="568.3,214.4 581.7,222.1 566.4,230.9 553.1,223.2"/>
	<polygon fill="#C99A00" points="132.0,222.1 147.3,230.9 147.3,248.5 132.0,239.7"/>
	<polygon fill="#C99A00" points="160.6,223.2 147.3,230.9 147.3,248.5 160.6,240.8"/>
	<polygon fill="#FFC600" points="145.4,214.4 160.6,223.2 147.3,230.9 132.0,222.1"/>
	<polygon fill="#C99A00" points="516.9,244.1 530.2,251.8 530.2,269.4 516.9,261.7"/>
	<polygon fill="#C99A00" points="545.5,243.0 530.2,251.8 530.2,269.4 545.5,260.6"/>
	<polygon fill="#FFC600" points="532.1,235.3 545.5,243.0 530.2,251.8 516.9,244.1"/>
	<polygon fill="#C99A00" points="168.2,243.0 183.5,251.8 183.5,269.4 168.2,260.6"/>
	<polygon fill="#C99A00" points="196.8,244.1 183.5,251.8 183.5,269.4 196.8,261.7"/>
	<polygon fill="#FFC600" points="181.6,235.3 196.8,244.1 183.5,251.8 168.2,243.0"/>
	<polygon fill="#C99A00" points="480.7,265.0 494.0,272.7 494.0,290.3 480.7,282.6"/>
	<polygon fill="#C99A00" points="509.3,263.9 494.0,272.7 494.0,290.3 509.3,281.5"/>
	<polygon fill="#FFC600" points="495.9,256.2 509.3,263.9 494.0,272.7 480.7,265.0"/>
	<polygon fill="#C99A00" points="204.4,263.9 219.7,272.7 219.7,290.3 204.4,281.5"/>
	<polygon fill="#C99A00" points="233.0,265.0 219.7,272.7 219.7,290.3 233.0,282.6"/>
	<polygon fill="#FFC600" points="217.8,256.2 233.0,265.0 219.7,272.7 204.4,263.9"/>
	<polygon fill="#C99A00" points="444.5,285.9 457.8,293.6 457.8,311.2 444.5,303.5"/>
	<polygon fill="#C99A00" points="473.1,284.8 457.8,293.6 457.8,311.2 473.1,302.4"/>
	<polygon fill="#FFC600" points="459.7,277.1 473.1,284.8 457.8,293.6 444.5,285.9"/>
	<polygon fill="#C99A00" points="240.6,284.8 255.9,293.6 255.9,311.2 240.6,302.4"/>
	<polygon fill="#C99A00" points="269.2,285.9 255.9,293.6 255.9,311.2 269.2,303.5"/>
	<polygon fill="#FFC600" points="254.0,277.1 269.2,285.9 255.9,293.6 240.6,284.8"/>
	<polygon fill="#C99A00" points="408.3,306.8 421.6,314.5 421.6,332.1 408.3,324.4"/>
	<polygon fill="#C99A00" points="436.9,305.7 421.6,314.5 421.6,332.1 436.9,323.3"/>
	<polygon fill="#FFC600" points="423.5,298.0 436.9,305.7 421.6,314.5 408.3,306.8"/>
	<polygon fill="#C99A00" points="276.8,305.7 292.1,314.5 292.1,332.1 276.8,323.3"/>
	<polygon fill="#C99A00" points="305.4,306.8 292.1,314.5 292.1,332.1 305.4,324.4"/>
	<polygon fill="#FFC600" points="290.2,298.0 305.4,306.8 292.1,314.5 276.8,305.7"/>
	<polygon fill="#C99A00" points="372.1,327.7 385.4,335.4 385.4,353.0 372.1,345.3"/>
	<polygon fill="#C99A00" points="400.7,326.6 385.4,335.4 385.4,353.0 400.7,344.2"/>
	<polygon fill="#FFC600" points="387.3,318.9 400.7,326.6 385.4,335.4 372.1,327.7"/>
	<polygon fill="#C99A00" points="313.0,326.6 328.3,335.4 328.3,353.0 313.0,344.2"/>
	<polygon fill="#C99A00" points="341.6,327.7 328.3,335.4 328.3,353.0 341.6,345.3"/>
	<polygon fill="#FFC600" points="326.4,318.9 341.6,327.7 328.3,335.4 313.0,326.6"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="263.5,72.5 313.0,101.1 313.0,123.1 263.5,94.5"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="393.1,54.9 313.0,101.1 313.0,123.1 393.1,76.9"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="343.5,26.3 393.1,54.9 313.0,101.1 263.5,72.5"/>
	<polygon fill="#0070D9" points="334.0,42.8 364.5,60.4 322.6,84.6 292.1,67.0"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="320.7,83.5 370.2,112.1 370.2,156.1 320.7,127.5"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="450.2,65.9 370.2,112.1 370.2,156.1 450.2,109.9"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="400.7,37.3 450.2,65.9 370.2,112.1 320.7,83.5"/>
	<polygon fill="#0070D9" points="391.1,53.8 421.6,71.4 379.7,95.6 349.2,78.0"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="377.8,94.5 427.3,123.1 427.3,189.1 377.8,160.5"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="507.4,76.9 427.3,123.1 427.3,189.1 507.4,142.9"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="457.8,48.3 507.4,76.9 427.3,123.1 377.8,94.5"/>
	<polygon fill="#0070D9" points="448.3,64.8 478.8,82.4 436.9,106.6 406.4,89.0"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="435.0,105.5 484.5,134.1 484.5,222.1 435.0,193.5"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="564.5,87.9 484.5,134.1 484.5,222.1 564.5,175.9"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="515.0,59.3 564.5,87.9 484.5,134.1 435.0,105.5"/>
	<polygon fill="#0070D9" points="505.5,75.8 535.9,93.4 494.0,117.6 463.5,100.0"/>
	<polygon fill="#0070D9" points="223.5,133.0 393.1,230.9 402.2,225.6 415.9,252.9 368.7,245.0 377.8,239.7 208.2,141.8"/>
	<polygon fill="#FFC600" points="370.2,279.3 200.6,181.4 209.8,176.1 162.5,168.2 176.2,195.5 185.4,190.2 354.9,288.1"/>
</svg>
`,"nic-settings":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="728.6px" height="395.8px" viewBox="0 0 728.6 395.8" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="223.1,346.4 187.9,360.7 146.3,367.1 103.4,364.9 64.4,354.4 33.9,336.8 15.8,314.3 12.0,289.6 23.1,265.6 47.8,245.2 83.1,230.9 124.7,224.5 167.6,226.7 206.6,237.2 237.0,254.8 255.2,277.3 258.9,302.0 247.8,326.0"/>
	<polygon fill="#000000" opacity="0.15" points="326.0,20.8 716.6,246.3 478.4,383.8 87.8,158.3"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="171.7,156.1 381.3,277.1 381.3,292.5 171.7,171.5"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="402.2,265.0 381.3,277.1 381.3,292.5 402.2,280.4"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="192.6,144.0 402.2,265.0 381.3,277.1 171.7,156.1"/>
	<polygon fill="#231F20" points="209.8,155.0 212.6,156.6 192.6,168.2 189.8,166.5"/>
	<polygon fill="#231F20" points="228.8,166.0 231.7,167.6 211.7,179.2 208.8,177.5"/>
	<polygon fill="#231F20" points="247.9,177.0 250.7,178.7 230.7,190.2 227.9,188.5"/>
	<polygon fill="#231F20" points="266.9,188.0 269.8,189.7 249.8,201.2 246.9,199.5"/>
	<polygon fill="#231F20" points="286.0,199.0 288.8,200.7 268.8,212.2 266.0,210.5"/>
	<polygon fill="#231F20" points="305.0,210.0 307.9,211.6 287.9,223.2 285.0,221.5"/>
	<polygon fill="#231F20" points="324.1,221.0 327.0,222.6 306.9,234.2 304.1,232.5"/>
	<polygon fill="#231F20" points="343.1,232.0 346.0,233.6 326.0,245.2 323.1,243.5"/>
	<polygon fill="#231F20" points="362.2,243.0 365.1,244.6 345.1,256.2 342.2,254.5"/>
	<polygon fill="#231F20" points="381.3,254.0 384.1,255.6 364.1,267.2 361.2,265.5"/>
	<polygon fill="#231F20" points="400.3,265.0 403.2,266.6 383.2,278.2 380.3,276.5"/>
	<polygon fill="#145A32" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="145.0,116.5 468.9,303.5 468.9,318.9 145.0,131.9"/>
	<polygon fill="#0E4727" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="649.9,199.0 468.9,303.5 468.9,318.9 649.9,214.4"/>
	<polygon fill="#1F7A45" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="326.0,12.0 649.9,199.0 468.9,303.5 145.0,116.5"/>
	<polygon fill="#5DBB84" points="314.6,40.6 383.2,80.2 379.7,82.2 311.1,42.6"/>
	<polygon fill="#5DBB84" points="299.3,49.4 367.9,89.0 364.5,91.0 295.9,51.4"/>
	<polygon fill="#5DBB84" points="299.3,159.4 375.5,203.4 372.1,205.4 295.9,161.4"/>
	<polygon fill="#231F20" points="270.7,79.1 286.0,87.9 286.0,96.7 270.7,87.9"/>
	<polygon fill="#231F20" points="295.5,82.4 286.0,87.9 286.0,96.7 295.5,91.2"/>
	<polygon fill="#231F20" points="280.3,73.6 295.5,82.4 286.0,87.9 270.7,79.1"/>
	<polygon fill="#231F20" points="251.7,90.1 266.9,98.9 266.9,107.7 251.7,98.9"/>
	<polygon fill="#231F20" points="276.5,93.4 266.9,98.9 266.9,107.7 276.5,102.2"/>
	<polygon fill="#231F20" points="261.2,84.6 276.5,93.4 266.9,98.9 251.7,90.1"/>
	<polygon fill="#231F20" points="284.1,97.8 299.3,106.6 299.3,115.4 284.1,106.6"/>
	<polygon fill="#231F20" points="308.9,101.1 299.3,106.6 299.3,115.4 308.9,109.9"/>
	<polygon fill="#231F20" points="293.6,92.3 308.9,101.1 299.3,106.6 284.1,97.8"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="303.1,106.6 394.6,159.4 394.6,192.4 303.1,139.6"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="470.8,115.4 394.6,159.4 394.6,192.4 470.8,148.4"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="379.3,62.6 470.8,115.4 394.6,159.4 303.1,106.6"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="375.5,80.2 440.3,117.6 398.4,141.8 333.6,104.4"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="371.7,203.4 417.5,229.8 417.5,249.6 371.7,223.2"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="463.2,203.4 417.5,229.8 417.5,249.6 463.2,223.2"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="417.5,177.0 463.2,203.4 417.5,229.8 371.7,203.4"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="463.2,216.6 474.6,223.2 474.6,335.4 463.2,328.8"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="667.0,112.1 474.6,223.2 474.6,335.4 667.0,224.3"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="655.6,105.5 667.0,112.1 474.6,223.2 463.2,216.6"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="642.3,166.0 558.4,214.4 558.4,260.6 642.3,212.2"/>
	<polygon fill="#FFC600" points="632.7,195.7 568.0,233.1 568.0,248.5 632.7,211.1"/>
	<polygon fill="#6885A9" points="632.7,189.1 568.0,226.5 568.0,233.1 632.7,195.7"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="636.6,142.9 623.2,150.6 623.2,163.8 636.6,156.1"/>
	<polygon fill="#0070D9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="590.8,169.3 577.5,177.0 577.5,190.2 590.8,182.5"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="508.9,254.0 522.2,261.7 522.2,281.5 508.9,273.8"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="537.5,252.9 522.2,261.7 522.2,281.5 537.5,272.7"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="524.1,245.2 537.5,252.9 522.2,261.7 508.9,254.0"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="517.5,75.2 523.2,78.5 523.2,256.7 517.5,253.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="528.9,75.2 523.2,78.5 523.2,256.7 528.9,253.4"/>
	<polygon fill="#4A4F59" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="523.2,71.9 528.9,75.2 523.2,78.5 517.5,75.2"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="108.1,216.7 108.1,202.0 108.1,232.8 108.1,247.5"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="192.9,209.8 185.0,223.7 185.0,254.5 192.9,240.6"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="68.6,234.4 53.7,222.5 53.7,253.3 68.6,265.2"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="233.7,239.0 213.1,247.6 213.1,278.4 233.7,269.8"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="54.7,262.1 30.5,257.6 30.5,288.4 54.7,292.9"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="55.6,267.9 54.7,262.1 54.7,292.9 55.6,298.7"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="240.4,263.6 236.9,276.4 236.9,307.2 240.4,294.4"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="57.8,273.6 55.6,267.9 55.6,298.7 57.8,304.4"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="236.9,276.4 211.5,276.4 211.5,307.2 236.9,307.2"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="211.5,276.4 207.5,281.8 207.5,312.6 211.5,307.2"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="207.5,281.8 202.3,286.8 202.3,317.6 207.5,312.6"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="47.5,293.7 37.3,282.2 37.3,313.0 47.5,324.5"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="78.3,293.6 71.6,289.2 71.6,320.0 78.3,324.4"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="71.6,289.2 47.5,293.7 47.5,324.5 71.6,320.0"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="85.9,297.5 78.3,293.6 78.3,324.4 85.9,328.3"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="180.9,299.2 172.2,302.2 172.2,333.0 180.9,330.0"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="217.3,298.7 201.4,307.8 201.4,338.6 217.3,329.5"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="172.2,302.2 162.9,304.5 162.9,335.3 172.2,333.0"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="201.4,307.8 180.9,299.2 180.9,330.0 201.4,338.6"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="122.8,306.7 112.9,305.4 112.9,336.2 122.8,337.5"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="132.9,307.2 122.8,306.7 122.8,337.5 132.9,338.0"/>
	<polygon fill="#A87F00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="112.9,305.4 98.0,317.3 98.0,348.1 112.9,336.2"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="140.8,321.2 132.9,307.2 132.9,338.0 140.8,352.0"/>
	<polygon fill="#D9A400" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="98.0,317.3 78.1,311.4 78.1,342.2 98.0,348.1"/>
	<polygon fill="#C09100" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="162.9,319.2 140.8,321.2 140.8,352.0 162.9,350.0"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="202.3,286.8 217.3,298.7 201.4,307.8 180.9,299.2 172.2,302.2 162.9,304.5 162.9,319.2 140.8,321.2 132.9,307.2 122.8,306.7 112.9,305.4 98.0,317.3 78.1,311.4 85.9,297.5 78.3,293.6 71.6,289.2 47.5,293.7 37.3,282.2 57.8,273.6 55.6,267.9 54.7,262.1 30.5,257.6 34.0,244.8 59.4,244.8 63.4,239.4 68.6,234.4 53.7,222.5 69.5,213.4 90.0,222.0 98.8,219.0 108.1,216.7 108.1,202.0 130.2,200.0 138.0,214.0 148.1,214.5 158.0,215.8 172.9,203.9 192.9,209.8 185.0,223.7 192.6,227.6 199.3,232.0 223.5,227.5 233.7,239.0 213.1,247.6 215.3,253.3 216.3,259.1 240.4,263.6 236.9,276.4 211.5,276.4 207.5,281.8"/>
	<polygon fill="#231F20" points="157.4,273.2 148.6,276.8 138.2,278.4 127.5,277.9 117.7,275.3 110.1,270.9 105.5,265.2 104.6,259.0 107.4,253.0 113.6,247.9 122.4,244.4 132.8,242.8 143.5,243.3 153.2,245.9 160.9,250.3 165.4,256.0 166.3,262.2 163.6,268.2"/>
</svg>
`,nic:`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="652.7px" height="395.8px" viewBox="0 0 652.7 395.8" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="250.2,20.8 640.7,246.3 402.6,383.8 12.0,158.3"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="95.8,156.1 305.4,277.1 305.4,292.5 95.8,171.5"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="326.4,265.0 305.4,277.1 305.4,292.5 326.4,280.4"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="116.8,144.0 326.4,265.0 305.4,277.1 95.8,156.1"/>
	<polygon fill="#231F20" points="133.9,155.0 136.8,156.6 116.8,168.2 113.9,166.5"/>
	<polygon fill="#231F20" points="153.0,166.0 155.8,167.6 135.8,179.2 133.0,177.5"/>
	<polygon fill="#231F20" points="172.0,177.0 174.9,178.7 154.9,190.2 152.0,188.5"/>
	<polygon fill="#231F20" points="191.1,188.0 194.0,189.7 173.9,201.2 171.1,199.5"/>
	<polygon fill="#231F20" points="210.1,199.0 213.0,200.7 193.0,212.2 190.1,210.5"/>
	<polygon fill="#231F20" points="229.2,210.0 232.1,211.6 212.1,223.2 209.2,221.5"/>
	<polygon fill="#231F20" points="248.3,221.0 251.1,222.6 231.1,234.2 228.2,232.5"/>
	<polygon fill="#231F20" points="267.3,232.0 270.2,233.6 250.2,245.2 247.3,243.5"/>
	<polygon fill="#231F20" points="286.4,243.0 289.2,244.6 269.2,256.2 266.4,254.5"/>
	<polygon fill="#231F20" points="305.4,254.0 308.3,255.6 288.3,267.2 285.4,265.5"/>
	<polygon fill="#231F20" points="324.5,265.0 327.3,266.6 307.3,278.2 304.5,276.5"/>
	<polygon fill="#145A32" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="69.2,116.5 393.1,303.5 393.1,318.9 69.2,131.9"/>
	<polygon fill="#0E4727" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="574.1,199.0 393.1,303.5 393.1,318.9 574.1,214.4"/>
	<polygon fill="#1F7A45" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="250.2,12.0 574.1,199.0 393.1,303.5 69.2,116.5"/>
	<polygon fill="#5DBB84" points="238.7,40.6 307.3,80.2 303.9,82.2 235.3,42.6"/>
	<polygon fill="#5DBB84" points="223.5,49.4 292.1,89.0 288.6,91.0 220.1,51.4"/>
	<polygon fill="#5DBB84" points="223.5,159.4 299.7,203.4 296.3,205.4 220.1,161.4"/>
	<polygon fill="#231F20" points="194.9,79.1 210.1,87.9 210.1,96.7 194.9,87.9"/>
	<polygon fill="#231F20" points="219.7,82.4 210.1,87.9 210.1,96.7 219.7,91.2"/>
	<polygon fill="#231F20" points="204.4,73.6 219.7,82.4 210.1,87.9 194.9,79.1"/>
	<polygon fill="#231F20" points="175.9,90.1 191.1,98.9 191.1,107.7 175.9,98.9"/>
	<polygon fill="#231F20" points="200.6,93.4 191.1,98.9 191.1,107.7 200.6,102.2"/>
	<polygon fill="#231F20" points="185.4,84.6 200.6,93.4 191.1,98.9 175.9,90.1"/>
	<polygon fill="#231F20" points="208.2,97.8 223.5,106.6 223.5,115.4 208.2,106.6"/>
	<polygon fill="#231F20" points="233.0,101.1 223.5,106.6 223.5,115.4 233.0,109.9"/>
	<polygon fill="#231F20" points="217.8,92.3 233.0,101.1 223.5,106.6 208.2,97.8"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="227.3,106.6 318.7,159.4 318.7,192.4 227.3,139.6"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="395.0,115.4 318.7,159.4 318.7,192.4 395.0,148.4"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="303.5,62.6 395.0,115.4 318.7,159.4 227.3,106.6"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="299.7,80.2 364.5,117.6 322.6,141.8 257.8,104.4"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="295.9,203.4 341.6,229.8 341.6,249.6 295.9,223.2"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="387.3,203.4 341.6,229.8 341.6,249.6 387.3,223.2"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="341.6,177.0 387.3,203.4 341.6,229.8 295.9,203.4"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="387.3,216.6 398.8,223.2 398.8,335.4 387.3,328.8"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="591.2,112.1 398.8,223.2 398.8,335.4 591.2,224.3"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="579.8,105.5 591.2,112.1 398.8,223.2 387.3,216.6"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="566.4,166.0 482.6,214.4 482.6,260.6 566.4,212.2"/>
	<polygon fill="#FFC600" points="556.9,195.7 492.1,233.1 492.1,248.5 556.9,211.1"/>
	<polygon fill="#6885A9" points="556.9,189.1 492.1,226.5 492.1,233.1 556.9,195.7"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="560.7,142.9 547.4,150.6 547.4,163.8 560.7,156.1"/>
	<polygon fill="#0070D9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="515.0,169.3 501.7,177.0 501.7,190.2 515.0,182.5"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="433.1,254.0 446.4,261.7 446.4,281.5 433.1,273.8"/>
	<polygon fill="#C99A00" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="461.6,252.9 446.4,261.7 446.4,281.5 461.6,272.7"/>
	<polygon fill="#FFC600" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="448.3,245.2 461.6,252.9 446.4,261.7 433.1,254.0"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="441.6,75.2 447.4,78.5 447.4,256.7 441.6,253.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="453.1,75.2 447.4,78.5 447.4,256.7 453.1,253.4"/>
	<polygon fill="#4A4F59" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="447.4,71.9 453.1,75.2 447.4,78.5 441.6,75.2"/>
</svg>
`,"raspberry-pi-zero-2":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="663.1px" height="402.0px" viewBox="0 0 663.1 402.0" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="240.6,21.0 651.1,258.0 422.5,390.0 12.0,153.0"/>
	<polygon fill="#1D7A47" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="84.7,102.0 422.5,297.0 422.5,318.0 84.7,123.0"/>
	<polygon fill="#16623A" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="578.4,207.0 422.5,297.0 422.5,318.0 578.4,228.0"/>
	<polygon fill="#2FA866" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="240.6,12.0 578.4,207.0 422.5,297.0 84.7,102.0"/>
	<polygon fill="#3A5877" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="110.7,48.0 178.3,87.0 178.3,96.0 110.7,57.0"/>
	<polygon fill="#2D4663" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="230.2,57.0 178.3,87.0 178.3,96.0 230.2,66.0"/>
	<polygon fill="#4B6E98" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="162.7,18.0 230.2,57.0 178.3,87.0 110.7,48.0"/>
	<polygon fill="#FFC600" points="186.1,40.5 191.3,43.5 154.9,64.5 149.7,61.5"/>
	<polygon fill="#FFC600" points="193.9,45.0 199.1,48.0 162.7,69.0 157.5,66.0"/>
	<polygon fill="#FFC600" points="201.7,49.5 206.9,52.5 170.5,73.5 165.3,70.5"/>
	<polygon fill="#FFC600" points="209.5,54.0 214.6,57.0 178.3,78.0 173.1,75.0"/>
	<polygon fill="#FFC600" points="253.6,40.5 245.4,43.2 235.9,43.2 227.6,40.5 222.9,35.7 222.9,30.3 227.6,25.5 235.9,22.8 245.4,22.8 253.6,25.5 258.4,30.3 258.4,35.7"/>
	<polygon fill="#231F20" points="246.3,36.3 241.9,37.6 237.0,37.2 233.4,35.1 232.6,32.3 234.9,29.7 239.4,28.4 244.3,28.8 247.8,30.9 248.6,33.7"/>
	<polygon fill="#FFC600" points="134.1,109.5 125.9,112.2 116.4,112.2 108.1,109.5 103.4,104.7 103.4,99.3 108.1,94.5 116.4,91.8 125.9,91.8 134.1,94.5 138.9,99.3 138.9,104.7"/>
	<polygon fill="#231F20" points="126.8,105.3 122.4,106.6 117.4,106.2 113.9,104.1 113.1,101.3 115.4,98.7 119.9,97.4 124.8,97.8 128.3,99.9 129.1,102.7"/>
	<polygon fill="#FFC600" points="555.0,214.5 546.8,217.2 537.3,217.2 529.0,214.5 524.3,209.7 524.3,204.3 529.0,199.5 537.3,196.8 546.8,196.8 555.0,199.5 559.8,204.3 559.8,209.7"/>
	<polygon fill="#231F20" points="547.7,210.3 543.3,211.6 538.3,211.2 534.8,209.1 534.0,206.3 536.3,203.7 540.7,202.4 545.7,202.8 549.2,204.9 550.0,207.7"/>
	<polygon fill="#FFC600" points="435.5,283.5 427.3,286.2 417.7,286.2 409.5,283.5 404.8,278.7 404.8,273.3 409.5,268.5 417.7,265.8 427.3,265.8 435.5,268.5 440.2,273.3 440.2,278.7"/>
	<polygon fill="#231F20" points="428.2,279.3 423.8,280.6 418.8,280.2 415.3,278.1 414.5,275.3 416.8,272.7 421.2,271.4 426.2,271.8 429.7,273.9 430.5,276.7"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="240.6,37.5 500.4,187.5 500.4,204.0 240.6,54.0"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="526.4,172.5 500.4,187.5 500.4,204.0 526.4,189.0"/>
	<polygon fill="#4A4F59" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="266.6,22.5 526.4,172.5 500.4,187.5 240.6,37.5"/>
	<polygon fill="#FFC600" points="266.9,25.6 274.1,29.8 266.9,34.0 259.6,29.8"/>
	<polygon fill="#FFC600" points="253.9,33.1 261.2,37.3 253.9,41.5 246.6,37.3"/>
	<polygon fill="#FFC600" points="279.9,33.1 287.1,37.3 279.9,41.5 272.6,37.3"/>
	<polygon fill="#FFC600" points="266.9,40.6 274.1,44.8 266.9,49.0 259.6,44.8"/>
	<polygon fill="#FFC600" points="292.9,40.6 300.1,44.8 292.9,49.0 285.6,44.8"/>
	<polygon fill="#FFC600" points="279.9,48.1 287.1,52.3 279.9,56.5 272.6,52.3"/>
	<polygon fill="#FFC600" points="305.8,48.1 313.1,52.3 305.8,56.5 298.6,52.3"/>
	<polygon fill="#FFC600" points="292.9,55.6 300.1,59.8 292.9,64.0 285.6,59.8"/>
	<polygon fill="#FFC600" points="318.8,55.6 326.1,59.8 318.8,64.0 311.6,59.8"/>
	<polygon fill="#FFC600" points="305.8,63.1 313.1,67.3 305.8,71.5 298.6,67.3"/>
	<polygon fill="#FFC600" points="331.8,63.1 339.1,67.3 331.8,71.5 324.5,67.3"/>
	<polygon fill="#FFC600" points="318.8,70.6 326.1,74.8 318.8,79.0 311.6,74.8"/>
	<polygon fill="#FFC600" points="344.8,70.6 352.1,74.8 344.8,79.0 337.5,74.8"/>
	<polygon fill="#FFC600" points="331.8,78.1 339.1,82.3 331.8,86.5 324.5,82.3"/>
	<polygon fill="#FFC600" points="357.8,78.1 365.1,82.3 357.8,86.5 350.5,82.3"/>
	<polygon fill="#FFC600" points="344.8,85.6 352.1,89.8 344.8,94.0 337.5,89.8"/>
	<polygon fill="#FFC600" points="370.8,85.6 378.1,89.8 370.8,94.0 363.5,89.8"/>
	<polygon fill="#FFC600" points="357.8,93.1 365.1,97.3 357.8,101.5 350.5,97.3"/>
	<polygon fill="#FFC600" points="383.8,93.1 391.1,97.3 383.8,101.5 376.5,97.3"/>
	<polygon fill="#FFC600" points="370.8,100.6 378.1,104.8 370.8,109.0 363.5,104.8"/>
	<polygon fill="#FFC600" points="396.8,100.6 404.0,104.8 396.8,109.0 389.5,104.8"/>
	<polygon fill="#FFC600" points="383.8,108.1 391.1,112.3 383.8,116.5 376.5,112.3"/>
	<polygon fill="#FFC600" points="409.8,108.1 417.0,112.3 409.8,116.5 402.5,112.3"/>
	<polygon fill="#FFC600" points="396.8,115.6 404.0,119.8 396.8,124.0 389.5,119.8"/>
	<polygon fill="#FFC600" points="422.8,115.6 430.0,119.8 422.8,124.0 415.5,119.8"/>
	<polygon fill="#FFC600" points="409.8,123.1 417.0,127.3 409.8,131.5 402.5,127.3"/>
	<polygon fill="#FFC600" points="435.7,123.1 443.0,127.3 435.7,131.5 428.5,127.3"/>
	<polygon fill="#FFC600" points="422.8,130.6 430.0,134.8 422.8,139.0 415.5,134.8"/>
	<polygon fill="#FFC600" points="448.7,130.6 456.0,134.8 448.7,139.0 441.5,134.8"/>
	<polygon fill="#FFC600" points="435.7,138.1 443.0,142.3 435.7,146.5 428.5,142.3"/>
	<polygon fill="#FFC600" points="461.7,138.1 469.0,142.3 461.7,146.5 454.5,142.3"/>
	<polygon fill="#FFC600" points="448.7,145.6 456.0,149.8 448.7,154.0 441.5,149.8"/>
	<polygon fill="#FFC600" points="474.7,145.6 482.0,149.8 474.7,154.0 467.4,149.8"/>
	<polygon fill="#FFC600" points="461.7,153.1 469.0,157.3 461.7,161.5 454.5,157.3"/>
	<polygon fill="#FFC600" points="487.7,153.1 495.0,157.3 487.7,161.5 480.4,157.3"/>
	<polygon fill="#FFC600" points="474.7,160.6 482.0,164.8 474.7,169.0 467.4,164.8"/>
	<polygon fill="#FFC600" points="500.7,160.6 508.0,164.8 500.7,169.0 493.4,164.8"/>
	<polygon fill="#FFC600" points="487.7,168.1 495.0,172.3 487.7,176.5 480.4,172.3"/>
	<polygon fill="#FFC600" points="513.7,168.1 521.0,172.3 513.7,176.5 506.4,172.3"/>
	<polygon fill="#FFC600" points="500.7,175.6 508.0,179.8 500.7,184.0 493.4,179.8"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="251.0,135.0 318.6,174.0 318.6,195.0 251.0,156.0"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="386.1,135.0 318.6,174.0 318.6,195.0 386.1,156.0"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="318.6,96.0 386.1,135.0 318.6,174.0 251.0,135.0"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="318.6,106.5 367.9,135.0 318.6,163.5 269.2,135.0"/>
	<polygon fill="#8BE3B0" points="417.3,180.0 423.8,183.7 366.6,216.7 360.1,213.0"/>
	<polygon fill="#8BE3B0" points="366.6,209.2 393.9,225.0 387.4,228.8 360.1,213.0"/>
	<polygon fill="#8BE3B0" points="438.1,192.0 444.6,195.7 387.4,228.8 380.9,225.0"/>
	<polygon fill="#8BE3B0" points="438.1,192.0 465.4,207.8 458.9,211.5 431.6,195.7"/>
	<polygon fill="#8BE3B0" points="458.9,204.0 465.4,207.8 408.2,240.7 401.7,237.0"/>
	<polygon fill="#8BE3B0" points="408.2,233.2 435.5,249.0 429.0,252.7 401.7,237.0"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="113.3,109.5 170.5,142.5 170.5,160.5 113.3,127.5"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="204.3,123.0 170.5,142.5 170.5,160.5 204.3,141.0"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="147.1,90.0 204.3,123.0 170.5,142.5 113.3,109.5"/>
	<polygon fill="#231F20" points="119.8,118.6 164.0,144.2 164.0,151.3 119.8,125.8"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="269.2,201.0 310.8,225.0 310.8,241.5 269.2,217.5"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="344.6,205.5 310.8,225.0 310.8,241.5 344.6,222.0"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="303.0,181.5 344.6,205.5 310.8,225.0 269.2,201.0"/>
	<polygon fill="#231F20" points="275.7,210.1 304.3,226.6 304.3,232.3 275.7,215.8"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="347.2,246.0 388.7,270.0 388.7,286.5 347.2,262.5"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="422.5,250.5 388.7,270.0 388.7,286.5 422.5,267.0"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="380.9,226.5 422.5,250.5 388.7,270.0 347.2,246.0"/>
	<polygon fill="#231F20" points="353.6,255.1 382.2,271.6 382.2,277.4 353.6,260.8"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="427.7,246.0 453.7,261.0 453.7,273.0 427.7,258.0"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="536.8,213.0 453.7,261.0 453.7,273.0 536.8,225.0"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="510.8,198.0 536.8,213.0 453.7,261.0 427.7,246.0"/>
	<polygon fill="#231F20" points="529.0,220.5 461.5,259.5 461.5,265.5 529.0,226.5"/>
</svg>
`,"raspberry-pi":`<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="668.0px" height="402.4px" viewBox="0 0 668.0 402.4" xml:space="preserve">
	<polygon fill="#000000" opacity="0.15" points="278.7,18.6 656.0,236.4 389.2,390.4 12.0,172.6"/>
	<polygon fill="#1D7A47" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="65.3,135.2 389.2,322.2 389.2,337.6 65.3,150.6"/>
	<polygon fill="#16623A" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="602.6,199.0 389.2,322.2 389.2,337.6 602.6,214.4"/>
	<polygon fill="#2FA866" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="278.7,12.0 602.6,199.0 389.2,322.2 65.3,135.2"/>
	<polygon fill="#FFC600" points="288.3,32.9 282.2,34.9 275.2,34.9 269.2,32.9 265.7,29.4 265.7,25.4 269.2,21.9 275.2,19.9 282.2,19.9 288.3,21.9 291.7,25.4 291.7,29.4"/>
	<polygon fill="#231F20" points="282.9,29.8 279.7,30.8 276.0,30.4 273.5,29.0 272.9,26.9 274.5,25.0 277.8,24.0 281.4,24.4 284.0,25.8 284.6,27.9"/>
	<polygon fill="#FFC600" points="101.5,140.7 95.5,142.7 88.5,142.7 82.5,140.7 79.0,137.2 79.0,133.2 82.5,129.7 88.5,127.7 95.5,127.7 101.5,129.7 105.0,133.2 105.0,137.2"/>
	<polygon fill="#231F20" points="96.2,137.6 92.9,138.6 89.3,138.2 86.7,136.8 86.2,134.7 87.8,132.8 91.1,131.8 94.7,132.2 97.3,133.6 97.9,135.7"/>
	<polygon fill="#FFC600" points="509.3,160.5 503.2,162.5 496.3,162.5 490.2,160.5 486.7,157.0 486.7,153.0 490.2,149.5 496.3,147.5 503.2,147.5 509.3,149.5 512.8,153.0 512.8,157.0"/>
	<polygon fill="#231F20" points="503.9,157.4 500.7,158.4 497.1,158.0 494.5,156.6 493.9,154.5 495.6,152.6 498.8,151.6 502.4,152.0 505.0,153.4 505.6,155.5"/>
	<polygon fill="#FFC600" points="322.6,268.3 316.5,270.3 309.5,270.3 303.5,268.3 300.0,264.8 300.0,260.8 303.5,257.3 309.5,255.3 316.5,255.3 322.6,257.3 326.0,260.8 326.0,264.8"/>
	<polygon fill="#231F20" points="317.2,265.2 314.0,266.2 310.3,265.8 307.7,264.4 307.2,262.3 308.8,260.4 312.1,259.4 315.7,259.8 318.3,261.2 318.9,263.3"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="309.2,48.3 499.7,158.3 499.7,170.4 309.2,60.4"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="518.8,147.3 499.7,158.3 499.7,170.4 518.8,159.4"/>
	<polygon fill="#4A4F59" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="328.3,37.3 518.8,147.3 499.7,158.3 309.2,48.3"/>
	<polygon fill="#FFC600" points="328.5,39.6 333.8,42.7 328.5,45.8 323.1,42.7"/>
	<polygon fill="#FFC600" points="318.9,45.1 324.3,48.2 318.9,51.3 313.6,48.2"/>
	<polygon fill="#FFC600" points="338.0,45.1 343.3,48.2 338.0,51.3 332.7,48.2"/>
	<polygon fill="#FFC600" points="328.5,50.6 333.8,53.7 328.5,56.8 323.1,53.7"/>
	<polygon fill="#FFC600" points="347.5,50.6 352.9,53.7 347.5,56.8 342.2,53.7"/>
	<polygon fill="#FFC600" points="338.0,56.1 343.3,59.2 338.0,62.3 332.7,59.2"/>
	<polygon fill="#FFC600" points="357.0,56.1 362.4,59.2 357.0,62.3 351.7,59.2"/>
	<polygon fill="#FFC600" points="347.5,61.6 352.9,64.7 347.5,67.8 342.2,64.7"/>
	<polygon fill="#FFC600" points="366.6,61.6 371.9,64.7 366.6,67.8 361.2,64.7"/>
	<polygon fill="#FFC600" points="357.0,67.1 362.4,70.2 357.0,73.3 351.7,70.2"/>
	<polygon fill="#FFC600" points="376.1,67.1 381.4,70.2 376.1,73.3 370.8,70.2"/>
	<polygon fill="#FFC600" points="366.6,72.6 371.9,75.7 366.6,78.8 361.2,75.7"/>
	<polygon fill="#FFC600" points="385.6,72.6 391.0,75.7 385.6,78.8 380.3,75.7"/>
	<polygon fill="#FFC600" points="376.1,78.1 381.4,81.2 376.1,84.3 370.8,81.2"/>
	<polygon fill="#FFC600" points="395.1,78.1 400.5,81.2 395.1,84.3 389.8,81.2"/>
	<polygon fill="#FFC600" points="385.6,83.6 391.0,86.7 385.6,89.8 380.3,86.7"/>
	<polygon fill="#FFC600" points="404.7,83.6 410.0,86.7 404.7,89.8 399.3,86.7"/>
	<polygon fill="#FFC600" points="395.1,89.1 400.5,92.2 395.1,95.3 389.8,92.2"/>
	<polygon fill="#FFC600" points="414.2,89.1 419.5,92.2 414.2,95.3 408.9,92.2"/>
	<polygon fill="#FFC600" points="404.7,94.6 410.0,97.7 404.7,100.8 399.3,97.7"/>
	<polygon fill="#FFC600" points="423.7,94.6 429.1,97.7 423.7,100.8 418.4,97.7"/>
	<polygon fill="#FFC600" points="414.2,100.1 419.5,103.2 414.2,106.3 408.9,103.2"/>
	<polygon fill="#FFC600" points="433.3,100.1 438.6,103.2 433.3,106.3 427.9,103.2"/>
	<polygon fill="#FFC600" points="423.7,105.6 429.1,108.7 423.7,111.8 418.4,108.7"/>
	<polygon fill="#FFC600" points="442.8,105.6 448.1,108.7 442.8,111.8 437.4,108.7"/>
	<polygon fill="#FFC600" points="433.3,111.1 438.6,114.2 433.3,117.3 427.9,114.2"/>
	<polygon fill="#FFC600" points="452.3,111.1 457.6,114.2 452.3,117.3 447.0,114.2"/>
	<polygon fill="#FFC600" points="442.8,116.6 448.1,119.7 442.8,122.8 437.4,119.7"/>
	<polygon fill="#FFC600" points="461.8,116.6 467.2,119.7 461.8,122.8 456.5,119.7"/>
	<polygon fill="#FFC600" points="452.3,122.1 457.6,125.2 452.3,128.3 447.0,125.2"/>
	<polygon fill="#FFC600" points="471.4,122.1 476.7,125.2 471.4,128.3 466.0,125.2"/>
	<polygon fill="#FFC600" points="461.8,127.6 467.2,130.7 461.8,133.8 456.5,130.7"/>
	<polygon fill="#FFC600" points="480.9,127.6 486.2,130.7 480.9,133.8 475.5,130.7"/>
	<polygon fill="#FFC600" points="471.4,133.1 476.7,136.2 471.4,139.3 466.0,136.2"/>
	<polygon fill="#FFC600" points="490.4,133.1 495.7,136.2 490.4,139.3 485.1,136.2"/>
	<polygon fill="#FFC600" points="480.9,138.6 486.2,141.7 480.9,144.8 475.5,141.7"/>
	<polygon fill="#FFC600" points="499.9,138.6 505.3,141.7 499.9,144.8 494.6,141.7"/>
	<polygon fill="#FFC600" points="490.4,144.1 495.7,147.2 490.4,150.3 485.1,147.2"/>
	<polygon fill="#FFC600" points="509.5,144.1 514.8,147.2 509.5,150.3 504.1,147.2"/>
	<polygon fill="#FFC600" points="499.9,149.6 505.3,152.7 499.9,155.8 494.6,152.7"/>
	<polygon fill="#8BE3B0" points="259.7,58.2 313.0,89.0 309.6,91.0 256.3,60.2"/>
	<polygon fill="#8BE3B0" points="250.2,63.7 303.5,94.5 300.1,96.5 246.7,65.7"/>
	<polygon fill="#8BE3B0" points="240.6,69.2 294.0,100.0 290.5,102.0 237.2,71.2"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="252.1,133.0 316.8,170.4 316.8,188.0 252.1,150.6"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="381.6,133.0 316.8,170.4 316.8,188.0 381.6,150.6"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="316.8,95.6 381.6,133.0 316.8,170.4 252.1,133.0"/>
	<polygon fill="#FFFFFF" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="316.8,103.3 368.3,133.0 316.8,162.7 265.4,133.0"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="335.9,179.2 381.6,205.6 381.6,216.6 335.9,190.2"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="427.3,179.2 381.6,205.6 381.6,216.6 427.3,190.2"/>
	<polygon fill="#4A4F59" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="381.6,152.8 427.3,179.2 381.6,205.6 335.9,179.2"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="93.9,140.7 128.2,160.5 128.2,178.1 93.9,158.3"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="164.4,139.6 128.2,160.5 128.2,178.1 164.4,157.2"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="130.1,119.8 164.4,139.6 128.2,160.5 93.9,140.7"/>
	<polygon fill="#231F20" points="98.7,147.4 123.5,161.7 123.5,171.4 98.7,157.1"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="143.5,171.5 173.9,189.1 173.9,204.5 143.5,186.9"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="210.1,168.2 173.9,189.1 173.9,204.5 210.1,183.6"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="179.7,150.6 210.1,168.2 173.9,189.1 143.5,171.5"/>
	<polygon fill="#231F20" points="148.2,178.2 169.2,190.3 169.2,197.8 148.2,185.7"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="185.4,195.7 215.9,213.3 215.9,228.7 185.4,211.1"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="252.1,192.4 215.9,213.3 215.9,228.7 252.1,207.8"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="221.6,174.8 252.1,192.4 215.9,213.3 185.4,195.7"/>
	<polygon fill="#231F20" points="190.1,202.4 211.1,214.5 211.1,222.0 190.1,209.9"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="257.8,226.5 288.3,244.1 288.3,270.5 257.8,252.9"/>
	<polygon fill="#231F20" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="328.3,221.0 288.3,244.1 288.3,270.5 328.3,247.4"/>
	<polygon fill="#4A4F59" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="297.8,203.4 328.3,221.0 288.3,244.1 257.8,226.5"/>
	<polygon fill="#8FB8F0" points="263.5,237.5 282.5,248.5 282.5,259.5 263.5,248.5"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="459.7,145.1 530.2,185.8 530.2,247.4 459.7,206.7"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="591.2,150.6 530.2,185.8 530.2,247.4 591.2,212.2"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="520.7,109.9 591.2,150.6 530.2,185.8 459.7,145.1"/>
	<polygon fill="#231F20" points="585.5,173.7 535.9,202.3 535.9,233.1 585.5,204.5"/>
	<polygon fill="#FFC600" points="585.5,197.9 535.9,226.5 535.9,233.1 585.5,204.5"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="400.7,174.8 471.2,215.5 471.2,281.5 400.7,240.8"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="520.7,186.9 471.2,215.5 471.2,281.5 520.7,252.9"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="450.2,146.2 520.7,186.9 471.2,215.5 400.7,174.8"/>
	<polygon fill="#231F20" points="515.0,228.7 476.9,250.7 476.9,269.4 515.0,247.4"/>
	<polygon fill="#231F20" points="515.0,195.7 476.9,217.7 476.9,236.4 515.0,214.4"/>
	<polygon fill="#0070D9" points="515.0,244.1 476.9,266.1 476.9,269.4 515.0,247.4"/>
	<polygon fill="#B5C5DC" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="341.6,208.9 412.1,249.6 412.1,315.6 341.6,274.9"/>
	<polygon fill="#6885A9" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="461.6,221.0 412.1,249.6 412.1,315.6 461.6,287.0"/>
	<polygon fill="#CDD9EE" stroke="#231F20" stroke-width="4" stroke-linejoin="round" stroke-miterlimit="10" points="391.1,180.3 461.6,221.0 412.1,249.6 341.6,208.9"/>
	<polygon fill="#231F20" points="455.9,262.8 417.8,284.8 417.8,303.5 455.9,281.5"/>
	<polygon fill="#231F20" points="455.9,229.8 417.8,251.8 417.8,270.5 455.9,248.5"/>
</svg>
`},schema:{$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://raw.githubusercontent.com/nokri-mohammed/packetplay/main/schema/scene.schema.json",$comment:"This is schema version 1. A breaking change will add schema/v2/ while v1 stays.",title:"Scene",description:"An packetplay scene: nodes, links, tracks and chapters of steps. The same model is used for YAML and JSON files.",type:"object",additionalProperties:!1,required:["title","nodes","links","chapters"],properties:{$schema:{type:"string",description:"Optional schema reference, so JSON files can point at this schema."},version:{type:"integer",minimum:1,description:"Schema version this scene is written for. Missing means 1."},title:{type:"string",minLength:1,description:"Title of the scene, shown above the diagram."},grid:{type:"string",enum:["iso","none"],default:"iso",description:"Background grid: iso (isometric tiles, the default) or none."},nodes:{type:"object",description:"Boxes in the diagram, keyed by node id.",additionalProperties:{$ref:"#/$defs/node"}},groups:{type:"object",description:"Named areas that nodes can belong to, keyed by group id.",additionalProperties:{$ref:"#/$defs/group"}},links:{type:"array",description:"Connections between nodes, as pairs of node ids. Messages travel along links.",items:{$ref:"#/$defs/link"}},tracks:{type:"object",description:"Message categories with a label and a colour, keyed by track id.",additionalProperties:{$ref:"#/$defs/track"}},chapters:{type:"array",description:"Ordered chapters, each with a list of steps.",items:{$ref:"#/$defs/chapter"}}},$defs:{node:{type:"object",additionalProperties:!1,required:["label","icon"],description:"One node in the diagram.",properties:{label:{type:"string",description:"Text shown under the icon."},icon:{type:"string",enum:["block","browser","cache","camera-small","cardterminal","cloud","cpu","cronjob","cube","daemon","desktop","diamond","display-small","dns","document","firewall","fpga","fpga-diode-left","fpga-diode-right","function-module","image","kernel-ip","kernel-tcp","laptop","loadbalancer","lock","mail","mailmultiple","mobiledevice","nic","nic-settings","office","package-module","paymentcard","plane","printer","pyramid","queue","raspberry-pi","raspberry-pi-zero-2","router","server","speech","sphere","storage","switch-module","tower","truck","truck-2","user","vm"],description:"File name stem of an SVG in icons/isoflow/ or icons/custom/."},sub:{type:"string",description:"Small second line under the label."},group:{type:"string",description:"Id of the group this node belongs to."},hidden:{type:"boolean",description:"Not shown until a step reveals it."},at:{type:"array",description:"Optional manual position [i, j] in isometric tile coordinates. Fractions are allowed.",minItems:2,maxItems:2,items:{type:"number",minimum:0}}}},group:{type:"object",additionalProperties:!1,required:["label"],description:"A named area around some nodes.",properties:{label:{type:"string",description:"Text shown on the group."}}},link:{type:"array",description:"A connection between two node ids.",minItems:2,maxItems:2,items:{type:"string"}},track:{type:"object",additionalProperties:!1,required:["label","color"],description:"A message category.",properties:{label:{type:"string",description:"Name shown in the legend."},color:{description:"A named colour or a hex colour such as #3b82f6.",anyOf:[{type:"string",enum:["blue","orange","green","red","purple","yellow","pink","teal","gray"]},{type:"string",pattern:"^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"}]}}},chapter:{type:"object",additionalProperties:!1,required:["title","steps"],description:"A group of steps that tells one part of the story.",properties:{title:{type:"string",description:"Chapter title."},desc:{type:"string",description:"Optional text shown when the chapter starts."},steps:{type:"array",description:"Steps in order.",items:{$ref:"#/$defs/stepOrParallel"}}}},stepOrParallel:{description:"A single step, or a parallel block of steps.",oneOf:[{$ref:"#/$defs/step"},{$ref:"#/$defs/parallel"}]},parallel:{type:"object",additionalProperties:!1,required:["parallel"],description:"Steps that run at the same time.",properties:{parallel:{type:"array",minItems:1,description:"The steps to run together.",items:{$ref:"#/$defs/step"}}}},step:{type:"object",additionalProperties:!1,required:["from","to"],description:"One message travelling from a node to another.",properties:{from:{type:"string",description:"Id of the node the message starts at."},to:{type:"string",description:"Id of the node the message ends at."},via:{type:"array",items:{type:"string"},description:"Node ids the route must pass through, in order."},track:{type:"string",description:"Id of the track (colour and legend entry)."},label:{type:"string",description:"Short text on the message."},desc:{type:"string",description:"Longer explanation shown in the caption panel."},data:{type:"object",additionalProperties:!0,description:"Key/value pairs shown on the data card."},at:{type:"object",description:"Per-node changes while the message passes, keyed by node id.",additionalProperties:{$ref:"#/$defs/hop"}},mode:{type:"string",enum:["packet","flow"],description:"packet: one message hops along the route. flow: a continuous stream."},both:{type:"boolean",description:"Show the traffic in both directions."},pause:{type:"boolean",description:"Pause the player after this step."},reveal:{type:"array",items:{type:"string"},description:"Nodes that appear when this step's message arrives."},typing:{type:"string",minLength:1,maxLength:80,description:"Text typed at the source node before the message is sent."}}},hop:{type:"object",additionalProperties:!1,description:"What changes at a node when the message arrives.",properties:{set:{type:"object",additionalProperties:!0,description:"Data values to change on the card at this node."},desc:{type:"string",description:"Explanation shown when the message reaches this node."}}}}}};var u2=[new URL("../icons/isoflow/",import.meta.url),new URL("../icons/custom/",import.meta.url)];function js(t){try{return Hh(t).filter((e)=>e.endsWith(".svg")).map((e)=>e.slice(0,-4))}catch{return[]}}var As,Ds=new Map;function d2(){return As??=(Zt?Object.keys(Zt.icons):u2.flatMap(js)).sort(),[...As]}function Jh(t,e){let n=`${e}__`;return t.replace(/(\sid=)(["'])([^"']*)\2/g,(i,o,r,s)=>`${o}${r}${n}${s}${r}`).replace(/url\(\s*(["']?)#([^)"']*)\1\s*\)/g,(i,o,r)=>`url(${o}#${n}${r}${o})`).replace(/([\s:]href=)(["'])#([^"']*)\2/g,(i,o,r,s)=>`${o}${r}#${n}${s}${r}`)}function Ps(t){if(!d2().includes(t))throw Error(`Unknown icon "${t}"`);let e=Ds.get(t);if(e)return e;let n=Zt?.icons[t]??Gh(new URL(`${t}.svg`,u2.find((f)=>js(f).includes(t))??u2[0]),"utf8"),i=n.match(/<svg\b[^>]*>/),o=n.lastIndexOf("</svg>");if(!i||i.index===void 0||o<0)throw Error(`Icon "${t}" is not a valid SVG`);let r=i[0].match(/\sviewBox="([^"]*)"/)?.[1]?.trim(),s=r?.split(/[\s,]+/).map(Number),[,,l,a]=s??[];if(!r||!s||s.length!==4||s.some((f)=>!Number.isFinite(f)))throw Error(`Icon "${t}" has no valid viewBox`);let c=n.slice(i.index+i[0].length,o).replace(/<!--[\s\S]*?-->/g,"").trim(),u={name:t,width:l,height:a,viewBox:r,body:Jh(c,t)};return Ds.set(t,u),u}import{existsSync as J1,mkdtempSync as Yh,readdirSync as Os,renameSync as Wh,rmSync as Ns,statSync as Zh}from"fs";import{homedir as Qh,tmpdir as Xh}from"os";import{basename as tg,dirname as eg,extname as Rs,join as Ct}from"path";class it extends Error{}var Pe=(t,e)=>{if(e===void 0)throw new it(`${t} needs a number`);let n=Number(e);if(e.trim()===""||!Number.isFinite(n))throw new it(`${t} needs a number, got "${e}"`);return n};function ng(t){let e=Rs(t).toLowerCase();return e===".mp4"?"mp4":e===".gif"?"gif":void 0}function Vs(t){let e=[],n,i,o,r=1,s=1280,l=0,a,c=1,u=!1,f;for(let m=0;m<t.length;m++){let p=t[m],g=()=>t[++m];if(p==="-o"||p==="--out"){if(n=g(),n===void 0)throw new it(`${p} needs a file name`)}else if(p==="--format"){if(i=g(),i===void 0)throw new it("--format needs mp4 or gif")}else if(p==="--fps")o=Pe(p,g());else if(p==="--speed")r=Pe(p,g());else if(p==="--width")s=Pe(p,g());else if(p==="--from")l=Pe(p,g());else if(p==="--to")a=Pe(p,g());else if(p==="--scale")c=Pe(p,g());else if(p==="--follow")u=!0;else if(p==="--zoom")f=Pe(p,g());else if(p.startsWith("-"))throw new it(`unknown option ${p}`);else e.push(p)}if(e.length!==1)throw new it("export needs one scene file");if(!n)throw new it("export needs -o <out.mp4|out.gif>");if(i!==void 0&&i!=="mp4"&&i!=="gif")throw new it("--format must be mp4 or gif");let d=i??ng(n);if(!d)throw new it("cannot tell the format: use an .mp4 or .gif file name, or --format mp4|gif");let h=o??(d==="gif"?15:30);if(!(h>=1&&h<=120))throw new it("--fps must be between 1 and 120");if(!(r>0&&r<=16))throw new it("--speed must be above 0 and at most 16");if(!Number.isInteger(s)||s<64||s>7680)throw new it("--width must be a whole number from 64 to 7680");if(!(l>=0))throw new it("--from must be 0 or more");if(a!==void 0&&!(a>l))throw new it("--to must be greater than --from");if(!(c>=0.5&&c<=4))throw new it("--scale must be between 0.5 and 4");if(f!==void 0&&!u)throw new it("--zoom needs --follow");if(f!==void 0&&!(f>=0.2&&f<=1.6))throw new it("--zoom must be between 0.2 and 1.6");return{file:e[0],out:n,format:d,fps:h,speed:r,width:s,from:l,to:a,scale:c,follow:u,zoom:f??1}}function ig(t){return Math.max(2,Math.round(t*9/16/2)*2)}function og(t,e){let n=Math.min(e.from*1000,t),i=Math.min((e.to??t/1000)*1000,t),o=Math.max(0,i-n);return{frames:Math.max(1,Math.round(o/e.speed/1000*e.fps)),timeAt:(s)=>Math.min(t,n+s*1000/e.fps*e.speed)}}var h2=["-y","-hide_banner","-loglevel","error"];function rg(t){let e=Rs(t);return Ct(eg(t),`.${tg(t,e)}.partial${e}`)}function sg(t,e){return[...h2,"-f","image2pipe","-framerate",String(e),"-c:v","png","-i","-","-vf","scale=trunc(iw/2)*2:trunc(ih/2)*2","-c:v","libx264","-pix_fmt","yuv420p","-crf","20","-movflags","+faststart",t]}function lg(t,e,n){return[...h2,"-framerate",String(e),"-i",t,"-vf","palettegen=stats_mode=diff",n]}function ag(t,e,n,i){return[...h2,"-framerate",String(e),"-i",t,"-i",n,"-lavfi","paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle","-loop","0",i]}var Ts=(t)=>Number(/(?:chromium|chromium_headless_shell)-(\d+)/.exec(t)?.[1]??0),Is=(t,e)=>Ts(e)-Ts(t),cg=(t)=>/headless[-_]shell/.test(t);function pg(t){let e=t.env("CHROME_PATH");if(e&&t.exists(e))return{path:e,shell:cg(e)};let n=t.which("chrome-headless-shell");if(n)return{path:n,shell:!0};let i=t.playwrightShell().sort(Is)[0];if(i)return{path:i,shell:!0};for(let r of["google-chrome","chromium","chromium-browser"]){let s=t.which(r);if(s)return{path:s,shell:!1}}let o=t.playwright().sort(Is)[0];return o?{path:o,shell:!1}:void 0}function zs(t,e,n){let i=Ct(Qh(),".cache","ms-playwright");if(!J1(i))return[];let o=[];for(let r of Os(i)){if(!t.test(r))continue;for(let s of Os(Ct(i,r))){if(!e.test(s))continue;let l=Ct(i,r,s,n);if(J1(l))o.push(l)}}return o}function fg(){return{env:(t)=>process.env[t],which:(t)=>Bun.which(t),exists:(t)=>J1(t),playwrightShell:()=>zs(/^chromium_headless_shell-\d+$/,/^chrome-headless-shell/,"chrome-headless-shell"),playwright:()=>zs(/^chromium-\d+$/,/^chrome-linux/,"chrome")}}var ug="No Chrome found. The lightest install is chrome-headless-shell (no npm browser package is needed); Chrome or Chromium also work. Install one (for example `sudo apt install chromium`) or set CHROME_PATH to its executable.",dg="ffmpeg not found. Install it (for example `sudo apt install ffmpeg`) and make sure it is on PATH.";class g2{ws;id=0;pending=new Map;waiters=[];sessionId;constructor(t){this.ws=t;t.addEventListener("message",(e)=>{let n=JSON.parse(String(e.data));if(n.id!==void 0){let i=this.pending.get(n.id);if(!i)return;if(this.pending.delete(n.id),n.error)i.fail(Error(`${n.error.message}`));else i.ok(n.result)}else if(n.method)this.waiters=this.waiters.filter((i)=>i.method===n.method?(i.ok(),!1):!0)}),t.addEventListener("close",()=>{for(let e of this.pending.values())e.fail(Error("Chrome closed the connection"));this.pending.clear()})}static open(t){return new Promise((e,n)=>{let i=new WebSocket(t);i.addEventListener("open",()=>e(new g2(i))),i.addEventListener("error",()=>n(Error("could not connect to Chrome")))})}send(t,e={}){let n=++this.id;return new Promise((i,o)=>{this.pending.set(n,{ok:i,fail:o}),this.ws.send(JSON.stringify({id:n,method:t,params:e,...this.sessionId?{sessionId:this.sessionId}:{}}))})}once(t){return new Promise((e)=>this.waiters.push({method:t,ok:e}))}close(){try{this.ws.close()}catch{}}}var qs=(t)=>new Promise((e)=>setTimeout(e,t));async function Bs(t,e,n){let i;try{return await Promise.race([t,new Promise((o,r)=>i=setTimeout(()=>r(Error(`timed out ${n}`)),e))])}finally{if(i)clearTimeout(i)}}async function Ks(t,e){let n=pg(fg()),i=Bun.which("ffmpeg");if(!n)throw Error(ug);if(!i)throw Error(dg);let o=Yh(Ct(Xh(),"packetplay-export-")),r=rg(e.out),s,l,a,c=()=>{l?.close();try{s?.kill("SIGKILL")}catch{}try{a?.kill("SIGKILL")}catch{}try{Ns(o,{recursive:!0,force:!0})}catch{}try{Ns(r,{force:!0})}catch{}},u=(h)=>()=>{c(),process.exit(h)},f=u(130),d=u(143);process.on("SIGINT",f),process.on("SIGTERM",d);try{await Bun.write(Ct(o,"page.html"),t);let h=Ct(o,"profile"),m=ig(e.width),p=[n.path,...n.shell?[]:["--headless=new"],"--remote-debugging-port=0","--remote-allow-origins=*",`--user-data-dir=${h}`,"--no-first-run","--no-default-browser-check","--disable-gpu","--hide-scrollbars","--mute-audio","--force-color-profile=srgb","--disable-background-timer-throttling","--disable-renderer-backgrounding",...process.getuid?.()===0?["--no-sandbox"]:[],"about:blank"];s=Bun.spawn(p,{stdout:"ignore",stderr:"ignore"});let g=Ct(h,"DevToolsActivePort"),y="";for(let j=0;j<100&&!y;j++){if(s.exitCode!==null)throw Error("Chrome exited before it was ready");if(J1(g)){let[V,W]=(await Bun.file(g).text()).split(`
`);if(V&&W)y=`ws://127.0.0.1:${V}${W}`}if(!y)await qs(100)}if(!y)throw Error("Chrome did not start in time");l=await Bs(g2.open(y),1e4,"connecting to Chrome");let{targetId:v}=await l.send("Target.createTarget",{url:"about:blank"}),{sessionId:w}=await l.send("Target.attachToTarget",{targetId:v,flatten:!0});l.sessionId=w,await l.send("Page.enable"),await l.send("Emulation.setDeviceMetricsOverride",{width:e.width,height:m,deviceScaleFactor:e.scale,mobile:!1});let C=l.once("Page.loadEventFired");await l.send("Page.navigate",{url:"file://"+Ct(o,"page.html")+"#export"}),await Bs(C,20000,"loading the page");let F=0;for(let j=0;j<50&&F<=0;j++){let V=await l.send("Runtime.evaluate",{expression:"window.__packetplay ? window.__packetplay.durationMs : 0",returnByValue:!0});if(F=Number(V.result?.value??0),F<=0)await qs(100)}if(F<=0)throw Error("the page did not expose window.__packetplay");if(e.follow)await l.send("Runtime.evaluate",{expression:`window.__packetplay.setFollow(true, ${e.zoom})`,returnByValue:!0});let x=og(F,e),A=Ct(o,"f%06d.png");if(e.format==="mp4")a=Bun.spawn([i,...sg(r,e.fps)],{stdin:"pipe",stdout:"ignore",stderr:"pipe"});let M=(j)=>process.stderr.write(`\rframe ${j} of ${x.frames}`);for(let j=0;j<x.frames;j++){await l.send("Runtime.evaluate",{expression:`window.__packetplay.seek(${x.timeAt(j)})`,returnByValue:!0});let V=await l.send("Page.captureScreenshot",{format:"png"}),W=Buffer.from(V.data,"base64");if(a){let q=a.stdin;await q.write(W),await q.flush()}else await Bun.write(Ct(o,`f${String(j+1).padStart(6,"0")}.png`),W);M(j+1)}process.stderr.write(`
`),l.close();try{s.kill("SIGKILL")}catch{}if(a){await a.stdin.end();let[j,V]=await Promise.all([a.exited,new Response(a.stderr).text()]);if(j!==0)throw Error(`ffmpeg failed: ${V.trim()}`)}else{let j=Ct(o,"palette.png");for(let V of[lg(A,e.fps,j),ag(A,e.fps,j,r)]){a=Bun.spawn([i,...V],{stdout:"ignore",stderr:"pipe"});let[W,q]=await Promise.all([a.exited,new Response(a.stderr).text()]);if(W!==0)throw Error(`ffmpeg failed: ${q.trim()}`)}}return Wh(r,e.out),{out:e.out,bytes:Zh(e.out).size,frames:x.frames}}finally{process.off("SIGINT",f),process.off("SIGTERM",d),c()}}import{readFile as hg}from"fs/promises";import{basename as gg,extname as mg}from"path";var m2=1;class y2 extends Error{}function yg(t,e){let n=e==="json"?JSON.parse(t):p2(t);if(typeof n!=="object"||n===null||Array.isArray(n))throw Error("file is empty or not a scene");let i=n.version;if(typeof i==="number"&&Number.isInteger(i)&&i>m2)throw new y2(`scene version ${i} is not supported: this packetplay understands version ${m2} and older (update packetplay)`);return n}async function Us(t){let e=gg(t),n=mg(t).toLowerCase(),i;if(n===".yaml"||n===".yml")i="yaml";else if(n===".json")i="json";else throw Error(`${e}: unsupported file type "${n||"(none)"}". Use .yaml, .yml or .json.`);let o;try{o=await hg(t,"utf8")}catch(r){throw Error(`${e}: cannot read file (${r.code??"error"})`)}try{return yg(o,i)}catch(r){if(r instanceof y2)throw Error(`${e}: ${r.message}`);if(r.message==="file is empty or not a scene")throw Error(`${e}: file is empty or not a scene`);if(r instanceof c2){let s=r.linePos?.[0]?.line,l=s?`line ${s}`:"unknown line";throw Error(`${e}: invalid YAML at ${l}: ${r.message.split(`
`)[0]}`)}throw Error(`${e}: invalid JSON: ${r.message}`)}}var Y1=141.5,W1=81.9,v2=70.75,w2=40.95;var Z1=96;var Qe=(t,e)=>(t-e)*70.75,Xe=(t,e)=>(t+e)*40.95;function k2(t){let e=t.map((i)=>i.i),n=t.map((i)=>i.j);return{i0:Math.min(...e)-1,j0:Math.min(...n)-1,i1:Math.max(...e)+1,j1:Math.max(...n)+1}}var Hs=(t,e)=>e.i>=t.i0&&e.i<=t.i1&&e.j>=t.j0&&e.j<=t.j1;function Gs(t){let e=Object.keys(t.nodes),n=t.nodes,i={},o=(E)=>{let P=i[E];if(!P)throw Error(`layout: node "${E}" has no tile`);return P},r=(E)=>n[E]?.at,s=(E)=>n[E]?.group,l=new Set;for(let E of e){let P=r(E);if(P)i[E]={i:P[0],j:P[1]};else l.add(E)}let a=Object.fromEntries(e.map((E)=>[E,[]]));for(let[E,P]of t.links)a[E]?.push(P),a[P]?.push(E);let c=new Set;for(let E of e)if(!l.has(E))c.add(`${o(E).i},${o(E).j}`);let u=new Set(e.filter((E)=>!l.has(E))),f=(E,P)=>{let G=new Set(e.map(s).filter((U)=>!!U));for(let U of G){let vt=e.filter((pt)=>s(pt)===U&&u.has(pt)).map((pt)=>o(pt));if(s(E)===U){let pt=k2([...vt,P]);for(let wt of e)if(wt!==E&&u.has(wt)&&s(wt)!==U&&Hs(pt,o(wt)))return!0}else if(vt.length>0&&Hs(k2(vt),P))return!0}return!1},d=(E,P,G)=>{for(let U=0;U<=e.length*2+2;U++){let vt=U*2;for(let pt of U===0?[G]:[G+vt,G-vt]){if(c.has(`${P},${pt}`))continue;if(f(E,{i:P,j:pt}))continue;return pt}}for(let U=G;;U+=2)if(!c.has(`${P},${U}`))return U},h=(E,P,G)=>{let U=d(E,P,G);i[E]={i:P,j:U},c.add(`${P},${U}`),u.add(E)},m=0;for(let E of e){if(!l.has(E)||E in i)continue;let P={[E]:null},G={[E]:0},U=[E],vt=0;for(let pt=0;pt<U.length;pt++){let wt=U[pt],Kc=m+2*(G[wt]??0),Zn=0,vo=P[wt];if(vo)Zn=o(vo).j;else{let Jt=e.find((i1)=>u.has(i1)&&l.has(i1)&&s(i1)&&s(i1)===s(wt));if(Jt)Zn=o(Jt).j}h(wt,Kc,Zn);for(let Jt of a[wt]??[]){if(!l.has(Jt)||Jt in G)continue;G[Jt]=(G[wt]??0)+1,P[Jt]=wt,vt=Math.max(vt,G[Jt]??0),U.push(Jt)}}m+=2*(vt+1)}let p=[...l].map((E)=>o(E).j);if(p.length){let E=Math.min(...p);for(let P of l)o(P).j-=E}let g={};for(let E of Object.keys(t.groups??{})){let P=e.filter((G)=>s(G)===E).map((G)=>o(G));if(P.length)g[E]=k2(P)}let y=(E)=>[[Qe(E.i0,E.j0),Xe(E.i0,E.j0)],[Qe(E.i1,E.j0),Xe(E.i1,E.j0)],[Qe(E.i1,E.j1),Xe(E.i1,E.j1)],[Qe(E.i0,E.j1),Xe(E.i0,E.j1)]],v=48,w=[0],C=[0];for(let E of e){let P=o(E),G=Qe(P.i,P.j),U=Xe(P.i,P.j);w.push(G-v,G+v),C.push(U-v,U+v+40)}for(let E of Object.values(g))for(let[P,G]of y(E))w.push(P),C.push(G);let F=Math.min(...w),x=Math.max(...w),A=Math.min(...C),M=Math.max(...C),j=80-F,V=80-A,W={};for(let E of e){let P=o(E);W[E]={x:Qe(P.i,P.j)+j,y:Xe(P.i,P.j)+V,i:P.i,j:P.j}}let q={};for(let[E,P]of Object.entries(g))q[E]={...P,points:y(P).map(([G,U])=>[G+j,U+V])};return{width:x-F+160,height:M-A+160,nodes:W,groups:q,origin:{x:j,y:V}}}function Q1(t,e){return`${t}--${e}`}function V0(t,e,n){let i=t.nodes[e],o=t.nodes[n];if(!i||!o)throw Error(`Layout has no position for lane "${Q1(e,n)}"`);let r=o.x-i.x,s=o.y-i.y,l=Math.hypot(r,s)||1,a=r/l,c=s/l,u=-c*8,f=a*8,d=i.x+u,h=i.y+f,m=o.x+u,p=o.y+f;return{id:Q1(e,n),x1:d,y1:h,x2:m,y2:p,ax1:d+a*44,ay1:h+c*44,ax2:m-a*44,ay2:p-c*44}}function b2(t){if(Math.hypot(t.x2-t.x1,t.y2-t.y1)>=88)return{x1:t.ax1,y1:t.ay1,x2:t.ax2,y2:t.ay2};let n=(t.x1+t.x2)/2,i=(t.y1+t.y2)/2;return{x1:n,y1:i,x2:n,y2:i}}function kg(t,e,n){let i=new Map,o=new Set([e]),r=[e];for(let l=0;l<r.length;l++){let a=r[l];if(a===n)break;for(let c of t.get(a)??[]){if(o.has(c))continue;o.add(c),i.set(c,a),r.push(c)}}if(!o.has(n))throw Error(`no route from "${e}" to "${n}"`);let s=[n];for(let l=n;l!==e;)l=i.get(l),s.push(l);return s.reverse()}function X1(t,e){if(e.from===e.to)throw Error(`from and to are the same node "${e.from}"`);let n=new Map,i=(s,l)=>{let a=n.get(s);if(a)a.push(l);else n.set(s,[l])};for(let[s,l]of t.links)i(s,l),i(l,s);let o=[e.from,...e.via??[],e.to],r=[o[0]];for(let s=1;s<o.length;s++)r.push(...kg(n,o[s-1],o[s]).slice(1));return r}var vg=0.07,wg=350,Js=650,Ys=4300,bg=450,Fg=80,Cg=500,_g="#6b7280",Ws={blue:"#3b82f6",orange:"#f97316",green:"#22c55e",red:"#ef4444",purple:"#a855f7",yellow:"#eab308",pink:"#ec4899",teal:"#14b8a6",gray:"#6b7280"};function Qs(t){if(Object.hasOwn(Ws,t))return Ws[t];if(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t))return t.toLowerCase();throw Error(`unknown colour "${t}"`)}function xg(t){return Math.max(wg,Math.round(t/vg))}function Zs(t,e,n,i,o,r,s){let l=X1(t,n),a=n.mode??"packet",c=n.track??null,u=c!==null?t.tracks?.[c]:void 0,f=u?Qs(u.color):_g,d=l.length-1,h=n.typing??"",m=h.length>0?h.length*Fg+Cg:0,p=s+m,g=[];for(let A=0;A<d;A++)g.push(b2(V0(e,l[A],l[A+1])));let y=g.map((A)=>xg(Math.hypot(A.x2-A.x1,A.y2-A.y1))),v=y.map((A,M)=>n.both?Math.max(A,y[d-1-M]):A),w=[],C=p;for(let A=0;A<d;A++){let M=l[A],j=l[A+1],V=V0(e,j,M),W=g[A],q=b2(V),E={...n.data??{}};for(let U=0;U<=A;U++){let vt=n.at?.[l[U]]?.set;if(vt)Object.assign(E,vt)}let P={from:M,to:j,link:Q1(M,j),x1:W.x1,y1:W.y1,x2:W.x2,y2:W.y2,back:{link:V.id,x1:q.x1,y1:q.y1,x2:q.x2,y2:q.y2},durMs:v[A],startMs:a==="flow"?p:C,endMs:a==="flow"?p+Ys:C+v[A],data:E},G=n.at?.[j]?.desc;if(G!==void 0)P.note=G;w.push(P),C=P.endMs+Js}let F=w[w.length-1],x=a==="flow"?p+Ys:F?F.endMs+Js:p;return{id:i,chapter:o,step:r,label:n.label??"",desc:n.desc??"",track:c,color:f,mode:a,both:n.both??!1,pause:n.pause??!1,path:l,hops:w,typingMs:m,typing:h,startMs:s,endMs:x}}function Xs(t,e){let n=Object.entries(t.tracks??{}).map(([u,f])=>({id:u,label:f.label,color:Qs(f.color)})),i=[],o=[],r=[],s=0,l=(u,f)=>{let d=f.hops[f.hops.length-1];if(!d)return;for(let h of u.reveal??[])r.push({node:h,atMs:d.endMs,stepId:f.id})};t.chapters.forEach((u,f)=>{let d=[];u.steps.forEach((m,p)=>{let g=`c${f+1}s${p+1}`,y=s,v=y;if("parallel"in m)m.parallel.forEach((w,C)=>{let F=Zs(t,e,w,`${g}p${C+1}`,f,p,y);d.push(F),l(w,F),v=Math.max(v,F.endMs)});else{let w=Zs(t,e,m,g,f,p,y);d.push(w),l(m,w),v=w.endMs}s=v+bg}),o.push(...d);let h=d[0];i.push({index:f,title:u.title,desc:u.desc??"",startMs:h?h.startMs:s,endMs:d.length?Math.max(...d.map((m)=>m.endMs)):s,steps:d})});let a=o.length?Math.max(...o.map((u)=>u.endMs)):0,c=Object.entries(t.nodes).filter(([,u])=>u.hidden===!0).map(([u])=>u);return{title:t.title,totalMs:a,hidden:c,reveals:r,tracks:n,chapters:i,steps:o}}var Nt=(t)=>t.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),_t=(t)=>String(Math.round(t*100)/100),F2='font-family="system-ui, sans-serif"',Eg='<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,1 L10,5 L0,9 Z" fill="currentColor"/></marker>';function tl(t,e,n={}){let i=n.icons??Ps,o=Nt(t.title),r=Object.entries(t.nodes),s=Z1/2,a=[...new Set(r.map(([,h])=>h.icon))].sort().map((h)=>{let m=i(h);return`<symbol id="icon-${Nt(h)}" viewBox="${Nt(m.viewBox)}">${m.body}</symbol>`}),c=Object.entries(t.groups??{}).map(([h,m])=>{let p=e.groups[h];if(!p)throw Error(`Layout has no region for group "${h}"`);let g=p.points.map(([v,w])=>`${_t(v)},${_t(w)}`).join(" "),y=p.points[0];return`<polygon data-group="${Nt(h)}" points="${g}" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="6 4"/><text class="group-label" x="${_t(y[0])}" y="${_t(y[1]+22)}" text-anchor="middle" ${F2} font-size="14" fill="currentColor" fill-opacity="0.8">${Nt(m.label)}</text>`}),u=(h,m)=>{let p=V0(e,h,m);return`<line data-link="${Nt(p.id)}" x1="${_t(p.ax1)}" y1="${_t(p.ay1)}" x2="${_t(p.ax2)}" y2="${_t(p.ay2)}" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#arrow)"/>`},f=t.links.flatMap(([h,m])=>[u(h,m),u(m,h)]),d=r.map(([h,m])=>{let p=e.nodes[h];if(!p)throw Error(`Layout has no position for node "${h}"`);let g=m.sub?`<text class="sub" y="${s+38}" text-anchor="middle" ${F2} font-size="12" fill="currentColor" fill-opacity="0.7">${Nt(m.sub)}</text>`:"";return`<g data-node="${Nt(h)}" transform="translate(${_t(p.x)},${_t(p.y)})"><use href="#icon-${Nt(m.icon)}" x="${-s}" y="${-s}" width="${Z1}" height="${Z1}"/><text class="label" y="${s+20}" text-anchor="middle" ${F2} font-size="15" fill="currentColor">${Nt(m.label)}</text>`+g+"</g>"});return[`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${_t(e.width)} ${_t(e.height)}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${o}">`,`<title>${o}</title>`,`<defs>${a.join("")}${Eg}</defs>`,'<g class="scene">',`<g class="groups">${c.join("")}</g>`,`<g class="links">${f.join("")}</g>`,`<g class="nodes">${d.join("")}</g>`,"</g>","</svg>",""].join(`
`)}var $g=(t)=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),el=(t)=>"data:image/svg+xml,"+`<svg xmlns='http://www.w3.org/2000/svg' width='${Y1}' height='${W1}' viewBox='0 0 ${Y1} ${W1}'><polygon points='${v2},0 ${Y1},${w2} ${v2},${W1} 0,${w2}' fill='none' stroke='${t}' stroke-opacity='0.15' stroke-width='1'/></svg>`.replace(/</g,"%3C").replace(/>/g,"%3E"),Mg=`
:root{--grid-img:url("${el("black")}")}
@media (prefers-color-scheme: dark){:root{--grid-img:url("${el("white")}")}}
:root{--bg:#f6f6f4;--fg:#141414;--muted:#6e6e72;--panel:#ffffff;--line:#e4e4e1;--accent:#161616;--on-accent:#ffffff;--fill:#f0f0ee;--fill-strong:#e8e8e5;--note:#2563eb;--focus:#161616;--shadow:0 1px 2px rgba(20,20,20,.04),0 8px 24px rgba(20,20,20,.04);--knob:0 1px 3px rgba(20,20,20,.16),0 2px 8px rgba(20,20,20,.06);--card-bg:#ffffff;--r-card:20px;--r-row:16px;--r-full:999px;--t:160ms}
@media (prefers-color-scheme: dark){:root{--bg:#0e0e10;--fg:#f2f2f0;--muted:#a0a0a6;--panel:#1a1a1d;--line:#2c2c30;--accent:#f2f2f0;--on-accent:#141414;--fill:#242427;--fill-strong:#2e2e32;--note:#60a5fa;--focus:#f2f2f0;--shadow:0 1px 2px rgba(0,0,0,.3),0 8px 24px rgba(0,0,0,.25);--knob:0 1px 3px rgba(0,0,0,.5),0 2px 8px rgba(0,0,0,.3);--card-bg:#1a1a1d}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:500 16px/1.45 ui-rounded,"SF Pro Rounded",system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1100px;margin:0 auto;padding:10px 12px}
h1{font-size:1.25rem;font-weight:600;margin:0 0 8px}
.stage{position:relative;height:min(70vh,640px);min-height:320px;overflow:hidden;background:var(--panel);border:1px solid var(--line);border-radius:var(--r-card);box-shadow:var(--shadow);color:var(--fg);touch-action:none;cursor:grab;user-select:none}
.stage.drag{cursor:grabbing}
.stage .grid{position:absolute;inset:0;pointer-events:none;background-repeat:repeat;background-image:var(--grid-img)}
.stage svg{position:absolute;inset:0;display:block;width:100%;height:100%}
.zoombar{position:absolute;left:10px;top:10px;display:flex;gap:2px;align-items:center;padding:2px;background:var(--panel);border-radius:var(--r-full);box-shadow:var(--knob);cursor:default}
.zoombar button{min-height:32px;min-width:32px;padding:0 10px;background:transparent;border-radius:var(--r-full);font-size:.85rem}
.zoombar button:hover{background:var(--fill)}
.zoombar button[aria-pressed="true"]{background:var(--accent);color:var(--on-accent);box-shadow:var(--knob)}
#zoom-label{min-width:3.2em;text-align:center;font-size:.8rem;color:var(--muted)}
.stage svg .group-label{font-size:calc(14px * var(--ts-group,1))}.stage svg .sub{font-size:calc(12px * var(--ts-sub,1))}.stage svg .label{font-size:calc(15px * var(--ts-label,1))}.stage svg .label{transform:translateY(calc((var(--ts-label,1) - 1) * 11px))}.stage svg .sub{opacity:var(--sub-op,1);transition:opacity .15s;transform:translateY(calc((var(--ts-label,1) - 1) * 11px + (var(--ts-sub,1) - 1) * 9px))}
.pk-bg{fill:var(--card-bg);stroke-width:1.5}
.pk-tx{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.pk-row{fill:var(--fg)}
.caption{margin:8px 0;padding:8px 14px;background:var(--panel);border:1px solid var(--line);border-radius:var(--r-card);box-shadow:var(--shadow);min-height:7em}
.caption h2{font-size:.85rem;margin:0;color:var(--muted);font-weight:600}
.caption .step{font-size:1.05rem;font-weight:600;margin:2px 0 0}
.caption p{margin:2px 0 0;font-size:.95rem;line-height:1.4}
.caption .note{color:var(--note)}
.legend{list-style:none;display:flex;flex-wrap:wrap;gap:2px 12px;margin:0 0 8px;padding:0;color:var(--muted);font-size:.82rem}
.legend .dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;vertical-align:-1px}
.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px;background:var(--panel);border:1px solid var(--line);border-radius:var(--r-card);box-shadow:var(--shadow)}
.bar{position:relative;flex:1 1 200px;order:3;height:28px;min-width:0;background:var(--fill);border-radius:var(--r-full);cursor:pointer;touch-action:none;user-select:none}
.bar .seg{position:absolute;top:0;bottom:0;border-right:2px solid var(--panel);background:color-mix(in srgb,var(--accent) 8%,transparent)}
.bar .mark{position:absolute;top:50%;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;border:2px solid var(--panel)}
.bar .playhead{position:absolute;top:-3px;bottom:-3px;width:4px;margin-left:-2px;background:var(--accent);border-radius:var(--r-full);box-shadow:var(--knob)}
#btn-play{order:1}
#btn-restart{order:2}
.speeds{order:4;display:flex;gap:2px;padding:3px;background:var(--fill-strong);border-radius:var(--r-full)}
button{font:inherit;color:var(--fg);background:transparent;border:0;cursor:pointer;transition:transform var(--t) ease,background-color var(--t) ease,box-shadow var(--t) ease}
.icon{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;padding:0}
.icon svg{width:18px;height:18px;display:block}
#btn-play{width:40px;height:40px;background:var(--accent);color:var(--on-accent);box-shadow:var(--knob)}
#btn-restart{width:40px;height:40px;background:var(--fill)}
#btn-restart:hover{background:var(--fill-strong)}
.icon:hover{transform:scale(1.06)}
.icon:active{transform:scale(.86)}
#btn-play .i-pause,#btn-play[data-state="playing"] .i-play{display:none}
#btn-play[data-state="playing"] .i-pause{display:block}
.speeds button{height:32px;min-width:44px;padding:0 12px;border-radius:var(--r-full);font-size:.85rem;color:var(--muted)}
.speeds button:hover{color:var(--fg)}
.speeds button:active{transform:scale(.95)}
.speeds button[aria-pressed="true"]{background:var(--accent);color:var(--on-accent);box-shadow:var(--knob)}
button:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
.bar:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
html.export main{max-width:none;height:100vh;padding:8px 12px;display:flex;flex-direction:column}
html.export .stage{flex:1 1 0;height:auto;min-height:0}
html.export .zoombar,html.export .controls{display:none}
html.export .caption{flex:none}
@media (max-width:640px){.bar{flex-basis:100%;order:5}.speeds{margin-left:auto}}
@media (prefers-reduced-motion: reduce){button{transition:none}.icon:hover,.icon:active,.speeds button:active{transform:none}}
`,nl=(t,e)=>`<svg class="${t}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${e}</svg>`,Lg=nl("i-play",'<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/>'),Sg=nl("i-pause",'<rect x="6" y="5" width="4.2" height="14" rx="1.4"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4"/>'),Ag='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4.5v4.6h4.6"/></svg>',Dg="Shortcuts: Space play or pause, Left and Right hop, N and P message, [ and ] chapter, + and - speed, Home restart, F follow camera";async function C2(t){let e=Gs(t),n=tl(t,e),i=Xs(t,e),o;if(Zt)o=Zt.player;else{let c=await Bun.build({entrypoints:[new URL("./player.ts",import.meta.url).pathname],target:"browser",minify:!0});if(!c.success||!c.outputs[0])throw Error("Player bundle failed: "+c.logs.map((u)=>u.message).join("; "));o=await c.outputs[0].text()}let r=o.replace(/<\/script/gi,"<\\/script"),s=JSON.stringify(i).replace(/</g,"\\u003c"),l=$g(t.title),a=[0.5,1,1.5,2].map((c)=>`<button type="button" data-speed="${c}" aria-pressed="${c===1}" aria-label="Speed ${c} times">${c}x</button>`).join("");return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${l}</title>
<script>if(location.hash==="#export")document.documentElement.classList.add("export")</script>
<style>${Mg}</style>
</head>
<body>
<main>
<h1>${l}</h1>
<div class="stage" id="stage" data-w="${e.width}" data-h="${e.height}" data-ox="${e.origin.x}" data-oy="${e.origin.y}">
${t.grid==="none"?"":'<div class="grid" id="grid"></div>'}
${n}<div class="zoombar" role="group" aria-label="Zoom">
<button type="button" id="zoom-out" aria-label="Zoom out">-</button>
<span id="zoom-label" aria-live="off">100%</span>
<button type="button" id="zoom-in" aria-label="Zoom in">+</button>
<button type="button" id="zoom-fit">Fit</button>
<button type="button" id="zoom-follow" aria-pressed="false" aria-keyshortcuts="F" title="Follow the packet (F)">Follow</button>
</div>
</div>
<section class="caption" aria-live="polite" aria-label="Caption">
<h2 id="cap-chapter"></h2>
<p id="cap-chapter-desc"></p>
<p class="step" id="cap-step"></p>
<p id="cap-step-desc"></p>
<p class="note" id="cap-note"></p>
</section>
<ul class="legend" id="legend" aria-label="Legend"></ul>
<div class="controls" role="group" aria-label="Playback controls">
<button type="button" class="icon" id="btn-play" data-state="paused" aria-label="Play" aria-keyshortcuts="Space ArrowLeft ArrowRight N P [ ] + - Home F" title="${Dg}">${Lg}${Sg}</button>
<button type="button" class="icon" id="btn-restart" aria-label="Restart" title="Restart (Home)">${Ag}</button>
<div class="bar" id="bar" role="slider" tabindex="0" aria-label="Timeline"></div>
<span class="speeds" role="group" aria-label="Speed">${a}</span>
</div>
</main>
<script type="application/json" id="timeline-data">${s}</script>
<script>${r}</script>
</body>
</html>
`}var zc=Zc(Nc(),1);import{readFileSync as d_}from"fs";var h_=Zt?.schema??JSON.parse(d_(new URL("../schema/scene.schema.json",import.meta.url),"utf8")),g_=new zc.default({allErrors:!0,strict:!0}),Tc=g_.compile(h_);function mo(t){return t.split("/").slice(1).map((e)=>e.replace(/~1/g,"/").replace(/~0/g,"~")).reduce((e,n)=>/^\d+$/.test(n)?`${e}[${n}]`:e?`${e}.${n}`:n,"")}function m_(t){let e=mo(t);return e?`"${e}"`:"the scene"}function Ic(t){let e=m_(t.instancePath),n=t.params;switch(t.keyword){case"additionalProperties":return`${e}: unknown key "${n.additionalProperty}"`;case"required":return`${e}: missing required key "${n.missingProperty}"`;case"type":return`${e}: must be of type ${n.type}`;case"enum":return`${e}: must be one of ${n.allowedValues.join(", ")}`;case"minItems":return`${e}: must have at least ${n.limit} item${n.limit===1?"":"s"}`;case"maxItems":return`${e}: must have at most ${n.limit} items`;case"oneOf":return`${e}: is neither a valid step nor a valid parallel block`;default:return`${e}: ${t.message??"is invalid"}`}}function y_(t){if(Tc(t))return[];let e=Tc.errors??[],n=[],i=new Set,o=(r,s)=>{let l=r+"|"+s;if(!i.has(l))i.add(l),n.push({path:r,message:s})};for(let r of e){if(r.keyword==="oneOf")continue;o(mo(r.instancePath),Ic(r))}for(let r of e)if(r.keyword==="oneOf")o(mo(r.instancePath),Ic(r));return n}var k_=new Set(["blue","orange","green","red","purple","yellow","pink","teal","gray"]),jt=(t)=>typeof t==="object"&&t!==null&&!Array.isArray(t);function v_(t){let e=[],n=jt(t.nodes)?t.nodes:{},i=jt(t.groups)?t.groups:{},o=jt(t.tracks)?t.tracks:{},r=(d,h)=>typeof h==="string"&&Object.hasOwn(d,h);for(let[d,h]of Object.entries(n))if(jt(h)&&h.group!==void 0&&!r(i,h.group))e.push({path:`nodes.${d}.group`,message:`node "${d}": group "${h.group}" does not exist`});for(let[d,h]of Object.entries(o)){let m=jt(h)?h.color:void 0;if(typeof m==="string"&&!k_.has(m)&&!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(m))e.push({path:`tracks.${d}.color`,message:`track "${d}": colour "${m}" is not a named colour or a hex value`})}(Array.isArray(t.links)?t.links:[]).forEach((d,h)=>{if(!Array.isArray(d))return;let m=h+1;d.forEach((y,v)=>{if(!r(n,y))e.push({path:`links[${h}][${v}]`,message:`link ${m}: node "${y}" does not exist`})});let[p,g]=d;if(p===g&&r(n,p))e.push({path:`links[${h}]`,message:`link ${m}: node "${p}" is linked to itself`})});let l=Array.isArray(t.links)&&t.links.every((d)=>Array.isArray(d)&&d.length===2&&d.every((h)=>r(n,h))),a=(d,h,m,p)=>{let g=`chapter ${h+1}, step ${m+1}`,y=!0,v=[d.from,d.to];if(["from","to"].forEach((C,F)=>{if(!r(n,v[F]))y=!1,e.push({path:`${p}.${C}`,message:`${g}: node "${v[F]}" does not exist`})}),d.track!==void 0&&!r(o,d.track))e.push({path:`${p}.track`,message:`${g}: track "${d.track}" does not exist`});if((Array.isArray(d.via)?d.via:[]).forEach((C,F)=>{if(!r(n,C))y=!1,e.push({path:`${p}.via[${F}]`,message:`${g}: via node "${C}" does not exist`})}),!y)return null;if(d.from===d.to)return e.push({path:p,message:`${g}: from and to are the same node "${d.from}"`}),null;if(!l)return null;try{return X1(t,d)}catch(C){return e.push({path:p,message:`${g}: ${C.message}`}),null}},c=new Set,u=(d,h,m,p)=>{let g=`chapter ${h+1}, step ${m+1}`,y=a(d,h,m,p),v=Array.isArray(d.via)?d.via:[],w=y??[d.from,...v,d.to],C=new Set;for(let x of w){if(C.has(x)||!r(n,x)||!jt(n[x])||n[x].hidden!==!0)continue;if(!c.has(x))C.add(x),e.push({path:p,message:`${g}: node "${x}" is used before it is revealed`})}(Array.isArray(d.reveal)?d.reveal:[]).forEach((x,A)=>{let M=`${p}.reveal[${A}]`;if(!r(n,x))e.push({path:M,message:`${g}: reveal node "${x}" does not exist`});else if(!jt(n[x])||n[x].hidden!==!0)e.push({path:M,message:`${g}: reveal node "${x}" is not hidden`});else if(c.has(x))e.push({path:M,message:`${g}: node "${x}" is already revealed`});else c.add(x)})};return(Array.isArray(t.chapters)?t.chapters:[]).forEach((d,h)=>{if(!jt(d)||!Array.isArray(d.steps))return;d.steps.forEach((m,p)=>{if(!jt(m))return;let g=`chapters[${h}].steps[${p}]`;if(Array.isArray(m.parallel))m.parallel.forEach((y,v)=>{if(jt(y))u(y,h,p,`${g}.parallel[${v}]`)});else u(m,h,p,g)})}),e}function qc(t){let e=y_(t);if(jt(t))try{e.push(...v_(t))}catch{}return e}var Rc=`Usage:
  packetplay build <file> [-o <out.html>] [--json]
  packetplay validate <file> [--json]
  packetplay convert <file> --to json|yaml [-o <out>]
  packetplay export <file> -o <out.mp4|out.gif> [--format mp4|gif] [--fps N] [--speed X]
                   [--width PX] [--from SEC] [--to SEC] [--scale X]
                   [--follow [--zoom N]]
  packetplay icons
  packetplay --help

build     Turn a scene file (.yaml, .yml or .json) into one self-contained HTML page.
validate  Check a scene file and write no HTML.
convert   Write the same scene as JSON or YAML (stdout when no -o is given).
export    Render the animation to an MP4 or GIF, frame by frame (needs Chrome and ffmpeg).
          Defaults: 30 fps (gif 15), speed 1, width 1280 (16:9), scale 1.
          --follow keeps the packet at the centre of the frame at zoom N (default 1).
icons     List the icon names a scene can use, one per line.
--json    With build or validate, print one JSON object instead of text.
`;class kt extends Error{}function yo(t){let e={positional:[]};for(let n=0;n<t.length;n++){let i=t[n];if(i==="-o"||i==="--out"){let o=t[++n];if(o===void 0)throw new kt(`${i} needs a file name`);e.out=o}else if(i==="--to"){let o=t[++n];if(o===void 0)throw new kt("--to needs json or yaml");e.to=o}else if(i==="--json")e.json=!0;else if(i.startsWith("-"))throw new kt(`unknown option ${i}`);else e.positional.push(i)}return e}class ko extends Error{issues;constructor(t){super(t.map((e)=>e.message).join(`
`));this.issues=t}}async function Wn(t){let e=await Us(t),n=qc(e);if(n.length>0)throw new ko(n.map((i)=>({message:`${t}: ${i.message}`,path:i.path})));return e}function Vc(t){let e=0;for(let n of t.chapters)for(let i of n.steps)e+=Array.isArray(i.parallel)?i.parallel.length:1;return e}function __(t,e){if(e==="json")return JSON.stringify(t,null,2)+`
`;let{$schema:n,...i}=t;return(typeof n==="string"?`# yaml-language-server: $schema=${n}
`:"")+f2(i)}async function x_(t){let[e,...n]=t;if(e==="--help"||e==="-h")return console.log(Rc),0;let i=!1;try{if(e==="build"){let o=yo(n),r=o.positional[0];if(!r||o.positional.length>1)throw new kt("build needs one scene file");i=o.json===!0;let s=o.out??C_(b_(r),w_(r,F_(r))+".html"),l=await Wn(r),a=await C2(l);if(await Bc(s,a),o.json)console.log(JSON.stringify({ok:!0,title:l.title,nodes:Object.keys(l.nodes).length,steps:Vc(l),out:s}));else console.log(`Wrote ${s} (${Buffer.byteLength(a)} bytes)`);return 0}if(e==="validate"){let o=yo(n),r=o.positional[0];if(!r||o.positional.length>1)throw new kt("validate needs one scene file");if(o.out||o.to)throw new kt("validate takes only a scene file and --json");i=o.json===!0;let s=await Wn(r),l=Object.keys(s.nodes).length,a=Vc(s);if(o.json)console.log(JSON.stringify({ok:!0,title:s.title,nodes:l,steps:a}));else console.log(`ok: ${s.title} (${l} nodes, ${a} steps)`);return 0}if(e==="export"){let o;try{o=Vs(n)}catch(l){if(l instanceof it)throw new kt(l.message);throw l}let r=await C2(await Wn(o.file)),s=await Ks(r,o);return console.log(`Wrote ${s.out} (${s.bytes} bytes, ${s.frames} frames)`),0}if(e==="icons"){if(n.length>0)throw new kt("icons takes no arguments");for(let o of d2())console.log(o);return 0}if(e==="convert"){let o=yo(n),r=o.positional[0];if(!r||o.positional.length>1)throw new kt("convert needs one scene file");if(o.json)throw new kt("--json works only with build and validate");if(o.to!=="json"&&o.to!=="yaml")throw new kt("convert needs --to json or --to yaml");let s=__(await Wn(r),o.to);if(o.out)await Bc(o.out,s),console.log(`Wrote ${o.out}`);else process.stdout.write(s);return 0}throw new kt(e?`unknown command "${e}"`:"missing command")}catch(o){if(o instanceof kt)return console.error(`${o.message}

${Rc}`),2;let r=o instanceof ko?o.issues:[{message:o.message}];if(i)console.log(JSON.stringify({ok:!1,issues:r}));else for(let s of r)console.error(s.message);return 1}}process.exit(await x_(process.argv.slice(2)));
