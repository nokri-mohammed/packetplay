#!/usr/bin/env bun
// @bun
var V4=Object.create;var{getPrototypeOf:U4,defineProperty:ws,getOwnPropertyNames:K4}=Object;var ks=Object.prototype.hasOwnProperty;function H4(t){return this[t]}var G4,J4,Y4=(t,e,n)=>{var r=t!=null&&typeof t==="object";if(r){var i=e?G4??=new WeakMap:J4??=new WeakMap,s=i.get(t);if(s)return s}n=t!=null?V4(U4(t)):{};let o=e||!t||!t.__esModule||!ks.call(t,"default")?ws(n,"default",{value:t,enumerable:!0}):n;if(t&&typeof t==="object"||typeof t==="function"){for(let l of K4(t))if(!ks.call(o,l))ws(o,l,{get:H4.bind(t,l),enumerable:!0})}if(r)i.set(t,o);return o};var v=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var i1=import.meta.require;var q=v(function(r5){var Qn=Symbol.for("yaml.alias"),bs=Symbol.for("yaml.document"),s1=Symbol.for("yaml.map"),_s=Symbol.for("yaml.pair"),Xn=Symbol.for("yaml.scalar"),o1=Symbol.for("yaml.seq"),Yt=Symbol.for("yaml.node.type"),W4=(t)=>!!t&&typeof t==="object"&&t[Yt]===Qn,Z4=(t)=>!!t&&typeof t==="object"&&t[Yt]===bs,Q4=(t)=>!!t&&typeof t==="object"&&t[Yt]===s1,X4=(t)=>!!t&&typeof t==="object"&&t[Yt]===_s,xs=(t)=>!!t&&typeof t==="object"&&t[Yt]===Xn,t5=(t)=>!!t&&typeof t==="object"&&t[Yt]===o1;function $s(t){if(t&&typeof t==="object")switch(t[Yt]){case s1:case o1:return!0}return!1}function e5(t){if(t&&typeof t==="object")switch(t[Yt]){case Qn:case s1:case Xn:case o1:return!0}return!1}var n5=(t)=>(xs(t)||$s(t))&&!!t.anchor;r5.ALIAS=Qn;r5.DOC=bs;r5.MAP=s1;r5.NODE_TYPE=Yt;r5.PAIR=_s;r5.SCALAR=Xn;r5.SEQ=o1;r5.hasAnchor=n5;r5.isAlias=W4;r5.isCollection=$s;r5.isDocument=Z4;r5.isMap=Q4;r5.isNode=e5;r5.isPair=X4;r5.isScalar=xs;r5.isSeq=t5});var k0=v(function(k5){var it=q(),ft=Symbol("break visit"),Ls=Symbol("skip children"),Nt=Symbol("remove node");function l1(t,e){let n=Ms(e);if(it.isDocument(t)){if(qe(null,t.contents,n,Object.freeze([t]))===Nt)t.contents=null}else qe(null,t,n,Object.freeze([]))}l1.BREAK=ft;l1.SKIP=Ls;l1.REMOVE=Nt;function qe(t,e,n,r){let i=Cs(t,e,n,r);if(it.isNode(i)||it.isPair(i))return Ss(t,r,i),qe(t,i,n,r);if(typeof i!=="symbol"){if(it.isCollection(e)){r=Object.freeze(r.concat(e));for(let s=0;s<e.items.length;++s){let o=qe(s,e.items[s],n,r);if(typeof o==="number")s=o-1;else if(o===ft)return ft;else if(o===Nt)e.items.splice(s,1),s-=1}}else if(it.isPair(e)){r=Object.freeze(r.concat(e));let s=qe("key",e.key,n,r);if(s===ft)return ft;else if(s===Nt)e.key=null;let o=qe("value",e.value,n,r);if(o===ft)return ft;else if(o===Nt)e.value=null}}return i}async function a1(t,e){let n=Ms(e);if(it.isDocument(t)){if(await Re(null,t.contents,n,Object.freeze([t]))===Nt)t.contents=null}else await Re(null,t,n,Object.freeze([]))}a1.BREAK=ft;a1.SKIP=Ls;a1.REMOVE=Nt;async function Re(t,e,n,r){let i=await Cs(t,e,n,r);if(it.isNode(i)||it.isPair(i))return Ss(t,r,i),Re(t,i,n,r);if(typeof i!=="symbol"){if(it.isCollection(e)){r=Object.freeze(r.concat(e));for(let s=0;s<e.items.length;++s){let o=await Re(s,e.items[s],n,r);if(typeof o==="number")s=o-1;else if(o===ft)return ft;else if(o===Nt)e.items.splice(s,1),s-=1}}else if(it.isPair(e)){r=Object.freeze(r.concat(e));let s=await Re("key",e.key,n,r);if(s===ft)return ft;else if(s===Nt)e.key=null;let o=await Re("value",e.value,n,r);if(o===ft)return ft;else if(o===Nt)e.value=null}}return i}function Ms(t){if(typeof t==="object"&&(t.Collection||t.Node||t.Value))return Object.assign({Alias:t.Node,Map:t.Node,Scalar:t.Node,Seq:t.Node},t.Value&&{Map:t.Value,Scalar:t.Value,Seq:t.Value},t.Collection&&{Map:t.Collection,Seq:t.Collection},t);return t}function Cs(t,e,n,r){if(typeof n==="function")return n(t,e,r);if(it.isMap(e))return n.Map?.(t,e,r);if(it.isSeq(e))return n.Seq?.(t,e,r);if(it.isPair(e))return n.Pair?.(t,e,r);if(it.isScalar(e))return n.Scalar?.(t,e,r);if(it.isAlias(e))return n.Alias?.(t,e,r);return}function Ss(t,e,n){let r=e[e.length-1];if(it.isCollection(r))r.items[t]=n;else if(it.isPair(r))if(t==="key")r.key=n;else r.value=n;else if(it.isDocument(r))r.contents=n;else{let i=it.isAlias(r)?"alias":"scalar";throw Error(`Cannot replace node with ${i} parent`)}}k5.visit=l1;k5.visitAsync=a1});var tr=v(function(M5){var Fs=q(),x5=k0(),$5={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},L5=(t)=>t.replace(/[!,[\]{}]/g,(e)=>$5[e]);class bt{constructor(t,e){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},bt.defaultYaml,t),this.tags=Object.assign({},bt.defaultTags,e)}clone(){let t=new bt(this.yaml,this.tags);return t.docStart=this.docStart,t}atDocument(){let t=new bt(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:bt.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},bt.defaultTags);break}return t}add(t,e){if(this.atNextDocument)this.yaml={explicit:bt.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},bt.defaultTags),this.atNextDocument=!1;let n=t.trim().split(/[ \t]+/),r=n.shift();switch(r){case"%TAG":{if(n.length!==2){if(e(0,"%TAG directive should contain exactly two parts"),n.length<2)return!1}let[i,s]=n;return this.tags[i]=s,!0}case"%YAML":{if(this.yaml.explicit=!0,n.length!==1)return e(0,"%YAML directive should contain exactly one part"),!1;let[i]=n;if(i==="1.1"||i==="1.2")return this.yaml.version=i,!0;else{let s=/^\d+\.\d+$/.test(i);return e(6,`Unsupported YAML version ${i}`,s),!1}}default:return e(0,`Unknown directive ${r}`,!0),!1}}tagName(t,e){if(t==="!")return"!";if(t[0]!=="!")return e(`Not a valid tag: ${t}`),null;if(t[1]==="<"){let s=t.slice(2,-1);if(s==="!"||s==="!!")return e(`Verbatim tags aren't resolved, so ${t} is invalid.`),null;if(t[t.length-1]!==">")e("Verbatim tags must end with a >");return s}let[,n,r]=t.match(/^(.*!)([^!]*)$/s);if(!r)e(`The ${t} tag has no suffix`);let i=this.tags[n];if(i)try{return i+decodeURIComponent(r)}catch(s){return e(String(s)),null}if(n==="!")return t;return e(`Could not resolve tag: ${t}`),null}tagString(t){for(let[e,n]of Object.entries(this.tags))if(t.startsWith(n))return e+L5(t.substring(n.length));return t[0]==="!"?t:`!<${t}>`}toString(t){let e=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],n=Object.entries(this.tags),r;if(t&&n.length>0&&Fs.isNode(t.contents)){let i={};x5.visit(t.contents,(s,o)=>{if(Fs.isNode(o)&&o.tag)i[o.tag]=!0}),r=Object.keys(i)}else r=[];for(let[i,s]of n){if(i==="!!"&&s==="tag:yaml.org,2002:")continue;if(!t||r.some((o)=>o.startsWith(s)))e.push(`%TAG ${i} ${s}`)}return e.join(`
`)}}bt.defaultYaml={explicit:!1,version:"1.2"};bt.defaultTags={"!!":"tag:yaml.org,2002:"};M5.Directives=bt});var c1=v(function(A5){var Es=q(),S5=k0();function F5(t){if(/[\x00-\x19\s,[\]{}]/.test(t)){let n=`Anchor must not contain whitespace or control characters: ${JSON.stringify(t)}`;throw Error(n)}return!0}function As(t){let e=new Set;return S5.visit(t,{Value(n,r){if(r.anchor)e.add(r.anchor)}}),e}function Ps(t,e){for(let n=1;;++n){let r=`${t}${n}`;if(!e.has(r))return r}}function E5(t,e){let n=[],r=new Map,i=null;return{onAnchor:(s)=>{n.push(s),i??(i=As(t));let o=Ps(e,i);return i.add(o),o},setAnchors:()=>{for(let s of n){let o=r.get(s);if(typeof o==="object"&&o.anchor&&(Es.isScalar(o.node)||Es.isCollection(o.node)))o.node.anchor=o.anchor;else{let l=Error("Failed to resolve repeated object (this should not happen)");throw l.source=s,l}}},sourceObjects:r}}A5.anchorIsValid=F5;A5.anchorNames=As;A5.createNodeAnchors=E5;A5.findNewAnchor=Ps});var er=v(function(j5){function b0(t,e,n,r){if(r&&typeof r==="object")if(Array.isArray(r))for(let i=0,s=r.length;i<s;++i){let o=r[i],l=b0(t,r,String(i),o);if(l===void 0)delete r[i];else if(l!==o)r[i]=l}else if(r instanceof Map)for(let i of Array.from(r.keys())){let s=r.get(i),o=b0(t,r,i,s);if(o===void 0)r.delete(i);else if(o!==s)r.set(i,o)}else if(r instanceof Set)for(let i of Array.from(r)){let s=b0(t,r,i,i);if(s===void 0)r.delete(i);else if(s!==i)r.delete(i),r.add(s)}else for(let[i,s]of Object.entries(r)){let o=b0(t,r,i,s);if(o===void 0)delete r[i];else if(o!==s)r[i]=o}return t.call(e,n,r)}j5.applyReviver=b0});var te=v(function(z5){var I5=q();function Os(t,e,n){if(Array.isArray(t))return t.map((r,i)=>Os(r,String(i),n));if(t&&typeof t.toJSON==="function"){if(!n||!I5.hasAnchor(t))return t.toJSON(e,n);let r={aliasCount:0,count:1,res:void 0};n.anchors.set(t,r),n.onCreate=(s)=>{r.res=s,delete n.onCreate};let i=t.toJSON(e,n);if(n.onCreate)n.onCreate(i);return i}if(typeof t==="bigint"&&!n?.keep)return Number(t);return t}z5.toJS=Os});var u1=v(function(V5){var R5=er(),Ns=q(),B5=te();class Ts{constructor(t){Object.defineProperty(this,Ns.NODE_TYPE,{value:t})}clone(){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));if(this.range)t.range=this.range.slice();return t}toJS(t,{mapAsMap:e,maxAliasCount:n,onAnchor:r,reviver:i}={}){if(!Ns.isDocument(t))throw TypeError("A document argument is required");let s={anchors:new Map,doc:t,keep:!0,mapAsMap:e===!0,mapKeyWarned:!1,maxAliasCount:typeof n==="number"?n:100},o=B5.toJS(this,"",s);if(typeof r==="function")for(let{count:l,res:a}of s.anchors.values())r(a,l);return typeof i==="function"?R5.applyReviver(i,{"":o},"",o):o}}V5.NodeBase=Ts});var _0=v(function(Y5){var K5=c1(),H5=k0(),Be=q(),G5=u1(),J5=te();class js extends G5.NodeBase{constructor(t){super(Be.ALIAS);this.source=t,Object.defineProperty(this,"tag",{set(){throw Error("Alias nodes cannot have tags")}})}resolve(t,e){if(e?.maxAliasCount===0)throw ReferenceError("Alias resolution is disabled");let n;if(e?.aliasResolveCache)n=e.aliasResolveCache;else if(n=[],H5.visit(t,{Node:(i,s)=>{if(Be.isAlias(s)||Be.hasAnchor(s))n.push(s)}}),e)e.aliasResolveCache=n;let r=void 0;for(let i of n){if(i===this)break;if(i.anchor===this.source)r=i}if(r&&e){let{anchors:i,doc:s,maxAliasCount:o}=e,l=i.get(r);if(!l)J5.toJS(r,null,e),l=i.get(r);if(l?.res===void 0)throw ReferenceError("This should not happen: Alias anchor was not resolved?");if(o>=0){if(l.count+=1,l.aliasCount===0)l.aliasCount=f1(s,r,i);if(l.count*l.aliasCount>o)throw ReferenceError("Excessive alias count indicates a resource exhaustion attack")}}return r}toJSON(t,e){if(!e)return{source:this.source};let n=this.resolve(e.doc,e);if(!n){let r=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw ReferenceError(r)}return e.anchors.get(n).res}toString(t,e,n){let r=`*${this.source}`;if(t){if(K5.anchorIsValid(this.source),t.options.verifyAliasOrder&&!t.anchors.has(this.source)){let i=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw Error(i)}if(t.implicitKey)return`${r} `}return r}}function f1(t,e,n){if(Be.isAlias(e)){let r=e.resolve(t),i=n&&r&&n.get(r);return i?i.count*i.aliasCount:0}else if(Be.isCollection(e)){let r=0;for(let i of e.items){let s=f1(t,i,n);if(s>r)r=s}return r}else if(Be.isPair(e)){let r=f1(t,e.key,n),i=f1(t,e.value,n);return Math.max(r,i)}return 1}Y5.Alias=js});var nt=v(function(e6){var Z5=q(),Q5=u1(),X5=te(),t6=(t)=>!t||typeof t!=="function"&&typeof t!=="object";class Ce extends Q5.NodeBase{constructor(t){super(Z5.SCALAR);this.value=t}toJSON(t,e){return e?.keep?this.value:X5.toJS(this.value,t,e)}toString(){return String(this.value)}}Ce.BLOCK_FOLDED="BLOCK_FOLDED";Ce.BLOCK_LITERAL="BLOCK_LITERAL";Ce.PLAIN="PLAIN";Ce.QUOTE_DOUBLE="QUOTE_DOUBLE";Ce.QUOTE_SINGLE="QUOTE_SINGLE";e6.Scalar=Ce;e6.isScalarValue=t6});var x0=v(function(a6){var i6=_0(),Se=q(),Ds=nt(),s6="tag:yaml.org,2002:";function o6(t,e,n){if(e){let r=n.filter((s)=>s.tag===e),i=r.find((s)=>!s.format)??r[0];if(!i)throw Error(`Tag ${e} not found`);return i}return n.find((r)=>r.identify?.(t)&&!r.format)}function l6(t,e,n){if(Se.isDocument(t))t=t.contents;if(Se.isNode(t))return t;if(Se.isPair(t)){let u=n.schema[Se.MAP].createNode?.(n.schema,null,n);return u.items.push(t),u}if(t instanceof String||t instanceof Number||t instanceof Boolean||typeof BigInt<"u"&&t instanceof BigInt)t=t.valueOf();let{aliasDuplicateObjects:r,onAnchor:i,onTagObj:s,schema:o,sourceObjects:l}=n,a=void 0;if(r&&t&&typeof t==="object")if(a=l.get(t),a)return a.anchor??(a.anchor=i(t)),new i6.Alias(a.anchor);else a={anchor:null,node:null},l.set(t,a);if(e?.startsWith("!!"))e=s6+e.slice(2);let c=o6(t,e,o.tags);if(!c){if(t&&typeof t.toJSON==="function")t=t.toJSON();if(!t||typeof t!=="object"){let u=new Ds.Scalar(t);if(a)a.node=u;return u}c=t instanceof Map?o[Se.MAP]:(Symbol.iterator in Object(t))?o[Se.SEQ]:o[Se.MAP]}if(s)s(c),delete n.onTagObj;let f=c?.createNode?c.createNode(n.schema,t,n):typeof c?.nodeClass?.from==="function"?c.nodeClass.from(n.schema,t,n):new Ds.Scalar(t);if(e)f.tag=e;else if(!c.default)f.tag=c.tag;if(a)a.node=f;return f}a6.createNode=l6});var d1=v(function(d6){var u6=x0(),Tt=q(),f6=u1();function nr(t,e,n){let r=n;for(let i=e.length-1;i>=0;--i){let s=e[i];if(typeof s==="number"&&Number.isInteger(s)&&s>=0){let o=[];o[s]=r,r=o}else r=new Map([[s,r]])}return u6.createNode(r,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw Error("This should not happen, please report a bug.")},schema:t,sourceObjects:new Map})}var Is=(t)=>t==null||typeof t==="object"&&!!t[Symbol.iterator]().next().done;class zs extends f6.NodeBase{constructor(t,e){super(t);Object.defineProperty(this,"schema",{value:e,configurable:!0,enumerable:!1,writable:!0})}clone(t){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));if(t)e.schema=t;if(e.items=e.items.map((n)=>Tt.isNode(n)||Tt.isPair(n)?n.clone(t):n),this.range)e.range=this.range.slice();return e}addIn(t,e){if(Is(t))this.add(e);else{let[n,...r]=t,i=this.get(n,!0);if(Tt.isCollection(i))i.addIn(r,e);else if(i===void 0&&this.schema)this.set(n,nr(this.schema,r,e));else throw Error(`Expected YAML collection at ${n}. Remaining path: ${r}`)}}deleteIn(t){let[e,...n]=t;if(n.length===0)return this.delete(e);let r=this.get(e,!0);if(Tt.isCollection(r))return r.deleteIn(n);else throw Error(`Expected YAML collection at ${e}. Remaining path: ${n}`)}getIn(t,e){let[n,...r]=t,i=this.get(n,!0);if(r.length===0)return!e&&Tt.isScalar(i)?i.value:i;else return Tt.isCollection(i)?i.getIn(r,e):void 0}hasAllNullValues(t){return this.items.every((e)=>{if(!Tt.isPair(e))return!1;let n=e.value;return n==null||t&&Tt.isScalar(n)&&n.value==null&&!n.commentBefore&&!n.comment&&!n.tag})}hasIn(t){let[e,...n]=t;if(n.length===0)return this.has(e);let r=this.get(e,!0);return Tt.isCollection(r)?r.hasIn(n):!1}setIn(t,e){let[n,...r]=t;if(r.length===0)this.set(n,e);else{let i=this.get(n,!0);if(Tt.isCollection(i))i.setIn(r,e);else if(i===void 0&&this.schema)this.set(n,nr(this.schema,r,e));else throw Error(`Expected YAML collection at ${n}. Remaining path: ${r}`)}}}d6.Collection=zs;d6.collectionFromPath=nr;d6.isEmptyPath=Is});var $0=v(function(v6){var m6=(t)=>t.replace(/^(?!$)(?: $)?/gm,"#");function rr(t,e){if(/^\n+$/.test(t))return t.substring(1);return e?t.replace(/^(?! *$)/gm,e):t}var y6=(t,e,n)=>t.endsWith(`
`)?rr(n,e):n.includes(`
`)?`
`+rr(n,e):(t.endsWith(" ")?"":" ")+n;v6.indentComment=rr;v6.lineComment=y6;v6.stringifyComment=m6});var Rs=v(function(x6){function _6(t,e,n="flow",{indentAtStart:r,lineWidth:i=80,minContentWidth:s=20,onFold:o,onOverflow:l}={}){if(!i||i<0)return t;if(i<s)s=0;let a=Math.max(1+s,1+i-e.length);if(t.length<=a)return t;let c=[],f={},u=i-e.length;if(typeof r==="number")if(r>i-Math.max(2,s))c.push(0);else u=i-r;let d=void 0,h=void 0,g=!1,p=-1,m=-1,y=-1;if(n==="block"){if(p=qs(t,p,e.length),p!==-1)u=p+a}for(let k;k=t[p+=1];){if(n==="quoted"&&k==="\\"){switch(m=p,t[p+1]){case"x":p+=3;break;case"u":p+=5;break;case"U":p+=9;break;default:p+=1}y=p}if(k===`
`){if(n==="block")p=qs(t,p,e.length);u=p+e.length+a,d=void 0}else{if(k===" "&&h&&h!==" "&&h!==`
`&&h!=="\t"){let x=t[p+1];if(x&&x!==" "&&x!==`
`&&x!=="\t")d=p}if(p>=u)if(d)c.push(d),u=d+a,d=void 0;else if(n==="quoted"){while(h===" "||h==="\t")h=k,k=t[p+=1],g=!0;let x=p>y+1?p-2:m-1;if(f[x])return t;c.push(x),f[x]=!0,u=x+a,d=void 0}else g=!0}h=k}if(g&&l)l();if(c.length===0)return t;if(o)o();let w=t.slice(0,c[0]);for(let k=0;k<c.length;++k){let x=c[k],_=c[k+1]||t.length;if(x===0)w=`
${e}${t.slice(0,_)}`;else{if(n==="quoted"&&f[x])w+=`${t[x]}\\`;w+=`
${e}${t.slice(x+1,_)}`}}return w}function qs(t,e,n){let r=e,i=e+1,s=t[i];while(s===" "||s==="\t")if(e<i+n)s=t[++e];else{do s=t[++e];while(s&&s!==`
`);r=e,i=e+1,s=t[i]}return r}x6.FOLD_BLOCK="block";x6.FOLD_FLOW="flow";x6.FOLD_QUOTED="quoted";x6.foldFlowLines=_6});var M0=v(function(A6){var Ft=nt(),ee=Rs(),h1=(t,e)=>({indentAtStart:e?t.indent.length:t.indentAtStart,lineWidth:t.options.lineWidth,minContentWidth:t.options.minContentWidth}),g1=(t)=>/^(%|---|\.\.\.)/m.test(t);function S6(t,e,n){if(!e||e<0)return!1;let r=e-n,i=t.length;if(i<=r)return!1;for(let s=0,o=0;s<i;++s)if(t[s]===`
`){if(s-o>r)return!0;if(o=s+1,i-o<=r)return!1}return!0}function L0(t,e){let n=JSON.stringify(t);if(e.options.doubleQuotedAsJSON)return n;let{implicitKey:r}=e,i=e.options.doubleQuotedMinMultiLineLength,s=e.indent||(g1(t)?"  ":""),o="",l=0;for(let a=0,c=n[a];c;c=n[++a]){if(c===" "&&n[a+1]==="\\"&&n[a+2]==="n")o+=n.slice(l,a)+"\\ ",a+=1,l=a,c="\\";if(c==="\\")switch(n[a+1]){case"u":{o+=n.slice(l,a);let f=n.substr(a+2,4);switch(f){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:if(f.substr(0,2)==="00")o+="\\x"+f.substr(2);else o+=n.substr(a,6)}a+=5,l=a+1}break;case"n":if(r||n[a+2]==='"'||n.length<i)a+=1;else{o+=n.slice(l,a)+`

`;while(n[a+2]==="\\"&&n[a+3]==="n"&&n[a+4]!=='"')o+=`
`,a+=2;if(o+=s,n[a+2]===" ")o+="\\";a+=1,l=a+1}break;default:a+=1}}return o=l?o+n.slice(l):n,r?o:ee.foldFlowLines(o,s,ee.FOLD_QUOTED,h1(e,!1))}function ir(t,e){if(e.options.singleQuote===!1||e.implicitKey&&t.includes(`
`)||/[ \t]\n|\n[ \t]/.test(t))return L0(t,e);let n=e.indent||(g1(t)?"  ":""),r="'"+t.replace(/'/g,"''").replace(/\n+/g,`$&
${n}`)+"'";return e.implicitKey?r:ee.foldFlowLines(r,n,ee.FOLD_FLOW,h1(e,!1))}function Ve(t,e){let{singleQuote:n}=e.options,r;if(n===!1)r=L0;else{let i=t.includes('"'),s=t.includes("'");if(i&&!s)r=ir;else if(s&&!i)r=L0;else r=n?ir:L0}return r(t,e)}var sr;try{sr=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{sr=/\n+(?!\n|$)/g}function p1({comment:t,type:e,value:n},r,i,s){let{blockQuote:o,commentString:l,lineWidth:a}=r.options;if(!o||/\n[\t ]+$/.test(n))return Ve(n,r);let c=r.indent||(r.forceBlockIndent||g1(n)?"  ":""),f=o==="literal"?!0:o==="folded"||e===Ft.Scalar.BLOCK_FOLDED?!1:e===Ft.Scalar.BLOCK_LITERAL?!0:!S6(n,a,c.length);if(!n)return f?`|
`:`>
`;let u,d;for(d=n.length;d>0;--d){let _=n[d-1];if(_!==`
`&&_!=="\t"&&_!==" ")break}let h=n.substring(d),g=h.indexOf(`
`);if(g===-1)u="-";else if(n===h||g!==h.length-1){if(u="+",s)s()}else u="";if(h){if(n=n.slice(0,-h.length),h[h.length-1]===`
`)h=h.slice(0,-1);h=h.replace(sr,`$&${c}`)}let p=!1,m,y=-1;for(m=0;m<n.length;++m){let _=n[m];if(_===" ")p=!0;else if(_===`
`)y=m;else break}let w=n.substring(0,y<m?y+1:m);if(w)n=n.substring(w.length),w=w.replace(/\n+/g,`$&${c}`);let x=(p?c?"2":"1":"")+u;if(t){if(x+=" "+l(t.replace(/ ?[\r\n]+/g," ")),i)i()}if(!f){let _=n.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`),S=!1,A=h1(r,!0);if(o!=="folded"&&e!==Ft.Scalar.BLOCK_FOLDED)A.onOverflow=()=>{S=!0};let L=ee.foldFlowLines(`${w}${_}${h}`,c,ee.FOLD_BLOCK,A);if(!S)return`>${x}
${c}${L}`}return n=n.replace(/\n+/g,`$&${c}`),`|${x}
${c}${w}${n}${h}`}function F6(t,e,n,r){let{type:i,value:s}=t,{actualString:o,implicitKey:l,indent:a,indentStep:c,inFlow:f}=e;if(l&&s.includes(`
`)||f&&/[[\]{},]/.test(s))return Ve(s,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(s))return l||f||!s.includes(`
`)?Ve(s,e):p1(t,e,n,r);if(!l&&!f&&i!==Ft.Scalar.PLAIN&&s.includes(`
`))return p1(t,e,n,r);if(g1(s)){if(a==="")return e.forceBlockIndent=!0,p1(t,e,n,r);else if(l&&a===c)return Ve(s,e)}let u=s.replace(/\n+/g,`$&
${a}`);if(o){let d=(p)=>p.default&&p.tag!=="tag:yaml.org,2002:str"&&p.test?.test(u),{compat:h,tags:g}=e.doc.schema;if(g.some(d)||h?.some(d))return Ve(s,e)}return l?u:ee.foldFlowLines(u,a,ee.FOLD_FLOW,h1(e,!1))}function E6(t,e,n,r){let{implicitKey:i,inFlow:s}=e,o=typeof t.value==="string"?t:Object.assign({},t,{value:String(t.value)}),{type:l}=t;if(l!==Ft.Scalar.QUOTE_DOUBLE){if(/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value))l=Ft.Scalar.QUOTE_DOUBLE}let a=(f)=>{switch(f){case Ft.Scalar.BLOCK_FOLDED:case Ft.Scalar.BLOCK_LITERAL:return i||s?Ve(o.value,e):p1(o,e,n,r);case Ft.Scalar.QUOTE_DOUBLE:return L0(o.value,e);case Ft.Scalar.QUOTE_SINGLE:return ir(o.value,e);case Ft.Scalar.PLAIN:return F6(o,e,n,r);default:return null}},c=a(l);if(c===null){let{defaultKeyType:f,defaultStringType:u}=e.options,d=i&&f||u;if(c=a(d),c===null)throw Error(`Unsupported default string type ${d}`)}return c}A6.stringifyString=E6});var C0=v(function(q6){var O6=c1(),ne=q(),N6=$0(),T6=M0();function j6(t,e){let n=Object.assign({blockQuote:!0,commentString:N6.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},t.schema.toStringOptions,e),r;switch(n.collectionStyle){case"block":r=!1;break;case"flow":r=!0;break;default:r=null}return{anchors:new Set,doc:t,flowCollectionPadding:n.flowCollectionPadding?" ":"",indent:"",indentStep:typeof n.indent==="number"?" ".repeat(n.indent):"  ",inFlow:r,options:n}}function D6(t,e){if(e.tag){let i=t.filter((s)=>s.tag===e.tag);if(i.length>0)return i.find((s)=>s.format===e.format)??i[0]}let n=void 0,r;if(ne.isScalar(e)){r=e.value;let i=t.filter((s)=>s.identify?.(r));if(i.length>1){let s=i.filter((o)=>o.test);if(s.length>0)i=s}n=i.find((s)=>s.format===e.format)??i.find((s)=>!s.format)}else r=e,n=t.find((i)=>i.nodeClass&&r instanceof i.nodeClass);if(!n){let i=r?.constructor?.name??(r===null?"null":typeof r);throw Error(`Tag not resolved for ${i} value`)}return n}function I6(t,e,{anchors:n,doc:r}){if(!r.directives)return"";let i=[],s=(ne.isScalar(t)||ne.isCollection(t))&&t.anchor;if(s&&O6.anchorIsValid(s))n.add(s),i.push(`&${s}`);let o=t.tag??(e.default?null:e.tag);if(o)i.push(r.directives.tagString(o));return i.join(" ")}function z6(t,e,n,r){if(ne.isPair(t))return t.toString(e,n,r);if(ne.isAlias(t)){if(e.doc.directives)return t.toString(e);if(e.resolvedAliases?.has(t))throw TypeError("Cannot stringify circular structure without alias nodes");else{if(e.resolvedAliases)e.resolvedAliases.add(t);else e.resolvedAliases=new Set([t]);t=t.resolve(e.doc)}}let i=void 0,s=ne.isNode(t)?t:e.doc.createNode(t,{onTagObj:(a)=>i=a});i??(i=D6(e.doc.schema.tags,s));let o=I6(s,i,e);if(o.length>0)e.indentAtStart=(e.indentAtStart??0)+o.length+1;let l=typeof i.stringify==="function"?i.stringify(s,e,n,r):ne.isScalar(s)?T6.stringifyString(s,e,n,r):s.toString(e,n,r);if(!o)return l;return ne.isScalar(s)||l[0]==="{"||l[0]==="["?`${o} ${l}`:`${o}
${e.indent}${l}`}q6.createStringifyContext=j6;q6.stringify=z6});var Us=v(function(U6){var Wt=q(),Bs=nt(),Vs=C0(),S0=$0();function V6({key:t,value:e},n,r,i){let{allNullValues:s,doc:o,indent:l,indentStep:a,options:{commentString:c,indentSeq:f,simpleKeys:u}}=n,d=Wt.isNode(t)&&t.comment||null;if(u){if(d)throw Error("With simple keys, key nodes cannot have comments");if(Wt.isCollection(t)||!Wt.isNode(t)&&typeof t==="object")throw Error("With simple keys, collection cannot be used as a key value")}let h=!u&&(!t||d&&e==null&&!n.inFlow||Wt.isCollection(t)||(Wt.isScalar(t)?t.type===Bs.Scalar.BLOCK_FOLDED||t.type===Bs.Scalar.BLOCK_LITERAL:typeof t==="object"));n=Object.assign({},n,{allNullValues:!1,implicitKey:!h&&(u||!s),indent:l+a});let g=!1,p=!1,m=Vs.stringify(t,n,()=>g=!0,()=>p=!0);if(!h&&!n.inFlow&&m.length>1024){if(u)throw Error("With simple keys, single line scalar must not span more than 1024 characters");h=!0}if(n.inFlow){if(s||e==null){if(g&&r)r();return m===""?"?":h?`? ${m}`:m}}else if(s&&!u||e==null&&h){if(m=`? ${m}`,d&&!g)m+=S0.lineComment(m,n.indent,c(d));else if(p&&i)i();return m}if(g)d=null;if(h){if(d)m+=S0.lineComment(m,n.indent,c(d));m=`? ${m}
${l}:`}else if(m=`${m}:`,d)m+=S0.lineComment(m,n.indent,c(d));let y,w,k;if(Wt.isNode(e))y=!!e.spaceBefore,w=e.commentBefore,k=e.comment;else if(y=!1,w=null,k=null,e&&typeof e==="object")e=o.createNode(e);if(n.implicitKey=!1,!h&&!d&&Wt.isScalar(e))n.indentAtStart=m.length+1;if(p=!1,!f&&a.length>=2&&!n.inFlow&&!h&&Wt.isSeq(e)&&!e.flow&&!e.tag&&!e.anchor)n.indent=n.indent.substring(2);let x=!1,_=Vs.stringify(e,n,()=>x=!0,()=>p=!0),S=" ";if(d||y||w){if(S=y?`
`:"",w){let A=c(w);S+=`
${S0.indentComment(A,n.indent)}`}if(_===""&&!n.inFlow){if(S===`
`&&k)S=`

`}else S+=`
${n.indent}`}else if(!h&&Wt.isCollection(e)){let A=_[0],L=_.indexOf(`
`),j=L!==-1,H=n.inFlow??e.flow??e.items.length===0;if(j||!H){let Z=!1;if(j&&(A==="&"||A==="!")){let V=_.indexOf(" ");if(A==="&"&&V!==-1&&V<L&&_[V+1]==="!")V=_.indexOf(" ",V+1);if(V===-1||L<V)Z=!0}if(!Z)S=`
${n.indent}`}}else if(_===""||_[0]===`
`)S="";if(m+=S+_,n.inFlow){if(x&&r)r()}else if(k&&!x)m+=S0.lineComment(m,n.indent,c(k));else if(p&&i)i();return m}U6.stringifyPair=V6});var or=v(function(J6){var Ks=i1("process");function H6(t,...e){if(t==="debug")console.log(...e)}function G6(t,e){if(t==="debug"||t==="warn")if(typeof Ks.emitWarning==="function")Ks.emitWarning(e);else console.warn(e)}J6.debug=H6;J6.warn=G6});var w1=v(function(Q6){var v1=q(),Hs=nt(),m1="<<",y1={identify:(t)=>t===m1||typeof t==="symbol"&&t.description===m1,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new Hs.Scalar(Symbol(m1)),{addToJSMap:Gs}),stringify:()=>m1},Z6=(t,e)=>(y1.identify(e)||v1.isScalar(e)&&(!e.type||e.type===Hs.Scalar.PLAIN)&&y1.identify(e.value))&&t?.doc.schema.tags.some((n)=>n.tag===y1.tag&&n.default);function Gs(t,e,n){let r=Js(t,n);if(v1.isSeq(r))for(let i of r.items)lr(t,e,i);else if(Array.isArray(r))for(let i of r)lr(t,e,i);else lr(t,e,r)}function lr(t,e,n){let r=Js(t,n);if(!v1.isMap(r))throw Error("Merge sources must be maps or map aliases");let i=r.toJSON(null,t,Map);for(let[s,o]of i)if(e instanceof Map){if(!e.has(s))e.set(s,o)}else if(e instanceof Set)e.add(s);else if(!Object.prototype.hasOwnProperty.call(e,s))Object.defineProperty(e,s,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}function Js(t,e){return t&&v1.isAlias(e)?e.resolve(t.doc,t):e}Q6.addMergeToJSMap=Gs;Q6.isMergeKey=Z6;Q6.merge=y1});var cr=v(function(o8){var n8=or(),Ys=w1(),r8=C0(),Ws=q(),ar=te();function i8(t,e,{key:n,value:r}){if(Ws.isNode(n)&&n.addToJSMap)n.addToJSMap(t,e,r);else if(Ys.isMergeKey(t,n))Ys.addMergeToJSMap(t,e,r);else{let i=ar.toJS(n,"",t);if(e instanceof Map)e.set(i,ar.toJS(r,i,t));else if(e instanceof Set)e.add(i);else{let s=s8(n,i,t),o=ar.toJS(r,s,t);if(s in e)Object.defineProperty(e,s,{value:o,writable:!0,enumerable:!0,configurable:!0});else e[s]=o}}return e}function s8(t,e,n){if(e===null)return"";if(typeof e!=="object")return String(e);if(Ws.isNode(t)&&n?.doc){let r=r8.createStringifyContext(n.doc,{});r.anchors=new Set;for(let s of n.anchors.keys())r.anchors.add(s.anchor);r.inFlow=!0,r.inStringifyKey=!0;let i=t.toString(r);if(!n.mapKeyWarned){let s=JSON.stringify(i);if(s.length>40)s=s.substring(0,36)+'..."';n8.warn(n.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${s}. Set mapAsMap: true to use object keys.`),n.mapKeyWarned=!0}return i}return JSON.stringify(e)}o8.addPairToJSMap=i8});var re=v(function(f8){var Zs=x0(),a8=Us(),c8=cr(),k1=q();function u8(t,e,n){let r=Zs.createNode(t,void 0,n),i=Zs.createNode(e,void 0,n);return new b1(r,i)}class b1{constructor(t,e=null){Object.defineProperty(this,k1.NODE_TYPE,{value:k1.PAIR}),this.key=t,this.value=e}clone(t){let{key:e,value:n}=this;if(k1.isNode(e))e=e.clone(t);if(k1.isNode(n))n=n.clone(t);return new b1(e,n)}toJSON(t,e){let n=e?.mapAsMap?new Map:{};return c8.addPairToJSMap(e,n,this)}toString(t,e,n){return t?.doc?a8.stringifyPair(this,t,e,n):JSON.stringify(this)}}f8.Pair=b1;f8.createPair=u8});var ur=v(function(y8){var Fe=q(),Qs=C0(),_1=$0();function h8(t,e,n){return(e.inFlow??t.flow?m8:g8)(t,e,n)}function g8({comment:t,items:e},n,{blockItemPrefix:r,flowChars:i,itemIndent:s,onChompKeep:o,onComment:l}){let{indent:a,options:{commentString:c}}=n,f=Object.assign({},n,{indent:s,type:null}),u=!1,d=[];for(let g=0;g<e.length;++g){let p=e[g],m=null;if(Fe.isNode(p)){if(!u&&p.spaceBefore)d.push("");if(x1(n,d,p.commentBefore,u),p.comment)m=p.comment}else if(Fe.isPair(p)){let w=Fe.isNode(p.key)?p.key:null;if(w){if(!u&&w.spaceBefore)d.push("");x1(n,d,w.commentBefore,u)}}u=!1;let y=Qs.stringify(p,f,()=>m=null,()=>u=!0);if(m)y+=_1.lineComment(y,s,c(m));if(u&&m)u=!1;d.push(r+y)}let h;if(d.length===0)h=i.start+i.end;else{h=d[0];for(let g=1;g<d.length;++g){let p=d[g];h+=p?`
${a}${p}`:`
`}}if(t){if(h+=`
`+_1.indentComment(c(t),a),l)l()}else if(u&&o)o();return h}function m8({items:t},e,{flowChars:n,itemIndent:r}){let{indent:i,indentStep:s,flowCollectionPadding:o,options:{commentString:l}}=e;r+=s;let a=Object.assign({},e,{indent:r,inFlow:!0,type:null}),c=!1,f=0,u=[];for(let g=0;g<t.length;++g){let p=t[g],m=null;if(Fe.isNode(p)){if(p.spaceBefore)u.push("");if(x1(e,u,p.commentBefore,!1),p.comment)m=p.comment}else if(Fe.isPair(p)){let w=Fe.isNode(p.key)?p.key:null;if(w){if(w.spaceBefore)u.push("");if(x1(e,u,w.commentBefore,!1),w.comment)c=!0}let k=Fe.isNode(p.value)?p.value:null;if(k){if(k.comment)m=k.comment;if(k.commentBefore)c=!0}else if(p.value==null&&w?.comment)m=w.comment}if(m)c=!0;let y=Qs.stringify(p,a,()=>m=null);if(c||(c=u.length>f||y.includes(`
`)),g<t.length-1)y+=",";else if(e.options.trailingComma){if(e.options.lineWidth>0)c||(c=u.reduce((w,k)=>w+k.length+2,2)+(y.length+2)>e.options.lineWidth);if(c)y+=","}if(m)y+=_1.lineComment(y,r,l(m));u.push(y),f=u.length}let{start:d,end:h}=n;if(u.length===0)return d+h;else{if(!c){let g=u.reduce((p,m)=>p+m.length+2,2);c=e.options.lineWidth>0&&g>e.options.lineWidth}if(c){let g=d;for(let p of u)g+=p?`
${s}${i}${p}`:`
`;return`${g}
${i}${h}`}else return`${d}${o}${u.join(" ")}${o}${h}`}}function x1({indent:t,options:{commentString:e}},n,r,i){if(r&&i)r=r.replace(/^\n+/,"");if(r){let s=_1.indentComment(e(r),t);n.push(s.trimStart())}}y8.stringifyCollection=h8});var se=v(function(x8){var w8=ur(),k8=cr(),b8=d1(),ie=q(),$1=re(),_8=nt();function F0(t,e){let n=ie.isScalar(e)?e.value:e;for(let r of t)if(ie.isPair(r)){if(r.key===e||r.key===n)return r;if(ie.isScalar(r.key)&&r.key.value===n)return r}return}class Xs extends b8.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(t){super(ie.MAP,t);this.items=[]}static from(t,e,n){let{keepUndefined:r,replacer:i}=n,s=new this(t),o=(l,a)=>{if(typeof i==="function")a=i.call(e,l,a);else if(Array.isArray(i)&&!i.includes(l))return;if(a!==void 0||r)s.items.push($1.createPair(l,a,n))};if(e instanceof Map)for(let[l,a]of e)o(l,a);else if(e&&typeof e==="object")for(let l of Object.keys(e))o(l,e[l]);if(typeof t.sortMapEntries==="function")s.items.sort(t.sortMapEntries);return s}add(t,e){let n;if(ie.isPair(t))n=t;else if(!t||typeof t!=="object"||!("key"in t))n=new $1.Pair(t,t?.value);else n=new $1.Pair(t.key,t.value);let r=F0(this.items,n.key),i=this.schema?.sortMapEntries;if(r){if(!e)throw Error(`Key ${n.key} already set`);if(ie.isScalar(r.value)&&_8.isScalarValue(n.value))r.value.value=n.value;else r.value=n.value}else if(i){let s=this.items.findIndex((o)=>i(n,o)<0);if(s===-1)this.items.push(n);else this.items.splice(s,0,n)}else this.items.push(n)}delete(t){let e=F0(this.items,t);if(!e)return!1;return this.items.splice(this.items.indexOf(e),1).length>0}get(t,e){let r=F0(this.items,t)?.value;return(!e&&ie.isScalar(r)?r.value:r)??void 0}has(t){return!!F0(this.items,t)}set(t,e){this.add(new $1.Pair(t,e),!0)}toJSON(t,e,n){let r=n?new n:e?.mapAsMap?new Map:{};if(e?.onCreate)e.onCreate(r);for(let i of this.items)k8.addPairToJSMap(e,r,i);return r}toString(t,e,n){if(!t)return JSON.stringify(this);for(let r of this.items)if(!ie.isPair(r))throw Error(`Map items must all be pairs; found ${JSON.stringify(r)} instead`);if(!t.allNullValues&&this.hasAllNullValues(!1))t=Object.assign({},t,{allNullValues:!0});return w8.stringifyCollection(this,t,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:t.indent||"",onChompKeep:n,onComment:e})}}x8.YAMLMap=Xs;x8.findPair=F0});var Ue=v(function(S8){var M8=q(),to=se(),C8={collection:"map",default:!0,nodeClass:to.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(t,e){if(!M8.isMap(t))e("Expected a mapping for this tag");return t},createNode:(t,e,n)=>to.YAMLMap.from(t,e,n)};S8.map=C8});var oe=v(function(T8){var E8=x0(),A8=ur(),P8=d1(),M1=q(),O8=nt(),N8=te();class eo extends P8.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(t){super(M1.SEQ,t);this.items=[]}add(t){this.items.push(t)}delete(t){let e=L1(t);if(typeof e!=="number")return!1;return this.items.splice(e,1).length>0}get(t,e){let n=L1(t);if(typeof n!=="number")return;let r=this.items[n];return!e&&M1.isScalar(r)?r.value:r}has(t){let e=L1(t);return typeof e==="number"&&e<this.items.length}set(t,e){let n=L1(t);if(typeof n!=="number")throw Error(`Expected a valid index, not ${t}.`);let r=this.items[n];if(M1.isScalar(r)&&O8.isScalarValue(e))r.value=e;else this.items[n]=e}toJSON(t,e){let n=[];if(e?.onCreate)e.onCreate(n);let r=0;for(let i of this.items)n.push(N8.toJS(i,String(r++),e));return n}toString(t,e,n){if(!t)return JSON.stringify(this);return A8.stringifyCollection(this,t,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(t.indent||"")+"  ",onChompKeep:n,onComment:e})}static from(t,e,n){let{replacer:r}=n,i=new this(t);if(e&&Symbol.iterator in Object(e)){let s=0;for(let o of e){if(typeof r==="function"){let l=e instanceof Set?o:String(s++);o=r.call(e,l,o)}i.items.push(E8.createNode(o,void 0,n))}}return i}}function L1(t){let e=M1.isScalar(t)?t.value:t;if(e&&typeof e==="string")e=Number(e);return typeof e==="number"&&Number.isInteger(e)&&e>=0?e:null}T8.YAMLSeq=eo});var Ke=v(function(z8){var D8=q(),no=oe(),I8={collection:"seq",default:!0,nodeClass:no.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(t,e){if(!D8.isSeq(t))e("Expected a sequence for this tag");return t},createNode:(t,e,n)=>no.YAMLSeq.from(t,e,n)};z8.seq=I8});var E0=v(function(V8){var R8=M0(),B8={identify:(t)=>typeof t==="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:(t)=>t,stringify(t,e,n,r){return e=Object.assign({actualString:!0},e),R8.stringifyString(t,e,n,r)}};V8.string=B8});var C1=v(function(K8){var ro=nt(),io={identify:(t)=>t==null,createNode:()=>new ro.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new ro.Scalar(null),stringify:({source:t},e)=>typeof t==="string"&&io.test.test(t)?t:e.options.nullStr};K8.nullTag=io});var fr=v(function(J8){var G8=nt(),so={identify:(t)=>typeof t==="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:(t)=>new G8.Scalar(t[0]==="t"||t[0]==="T"),stringify({source:t,value:e},n){if(t&&so.test.test(t)){let r=t[0]==="t"||t[0]==="T";if(e===r)return t}return e?n.options.trueStr:n.options.falseStr}};J8.boolTag=so});var He=v(function(Z8){function W8({format:t,minFractionDigits:e,tag:n,value:r}){if(typeof r==="bigint")return String(r);let i=typeof r==="number"?r:Number(r);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let s=Object.is(r,-0)?"-0":JSON.stringify(r);if(!t&&e&&(!n||n==="tag:yaml.org,2002:float")&&/^-?\d/.test(s)&&!s.includes("e")){let o=s.indexOf(".");if(o<0)o=s.length,s+=".";let l=e-(s.length-o-1);while(l-- >0)s+="0"}return s}Z8.stringifyNumber=W8});var pr=v(function(r7){var X8=nt(),dr=He(),t7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:(t)=>t.slice(-3).toLowerCase()==="nan"?NaN:t[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:dr.stringifyNumber},e7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:(t)=>parseFloat(t),stringify(t){let e=Number(t.value);return isFinite(e)?e.toExponential():dr.stringifyNumber(t)}},n7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(t){let e=new X8.Scalar(parseFloat(t)),n=t.indexOf(".");if(n!==-1&&t[t.length-1]==="0")e.minFractionDigits=t.length-n-1;return e},stringify:dr.stringifyNumber};r7.float=n7;r7.floatExp=e7;r7.floatNaN=t7});var gr=v(function(u7){var oo=He(),S1=(t)=>typeof t==="bigint"||Number.isInteger(t),hr=(t,e,n,{intAsBigInt:r})=>r?BigInt(t):parseInt(t.substring(e),n);function lo(t,e,n){let{value:r}=t;if(S1(r)&&r>=0)return n+r.toString(e);return oo.stringifyNumber(t)}var l7={identify:(t)=>S1(t)&&t>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(t,e,n)=>hr(t,2,8,n),stringify:(t)=>lo(t,8,"0o")},a7={identify:S1,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(t,e,n)=>hr(t,0,10,n),stringify:oo.stringifyNumber},c7={identify:(t)=>S1(t)&&t>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(t,e,n)=>hr(t,2,16,n),stringify:(t)=>lo(t,16,"0x")};u7.int=a7;u7.intHex=c7;u7.intOct=l7});var ao=v(function(k7){var h7=Ue(),g7=C1(),m7=Ke(),y7=E0(),v7=fr(),mr=pr(),yr=gr(),w7=[h7.map,m7.seq,y7.string,g7.nullTag,v7.boolTag,yr.intOct,yr.int,yr.intHex,mr.floatNaN,mr.floatExp,mr.float];k7.schema=w7});var uo=v(function(S7){var _7=nt(),x7=Ue(),$7=Ke();function co(t){return typeof t==="bigint"||Number.isInteger(t)}var F1=({value:t})=>JSON.stringify(t),L7=[{identify:(t)=>typeof t==="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:(t)=>t,stringify:F1},{identify:(t)=>t==null,createNode:()=>new _7.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:F1},{identify:(t)=>typeof t==="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:(t)=>t==="true",stringify:F1},{identify:co,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(t,e,{intAsBigInt:n})=>n?BigInt(t):parseInt(t,10),stringify:({value:t})=>co(t)?t.toString():JSON.stringify(t)},{identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:(t)=>parseFloat(t),stringify:F1}],M7={default:!0,tag:"",test:/^/,resolve(t,e){return e(`Unresolved plain scalar ${JSON.stringify(t)}`),t}},C7=[x7.map,$7.seq].concat(L7,M7);S7.schema=C7});var wr=v(function(P7){var A0=i1("buffer"),vr=nt(),E7=M0(),A7={identify:(t)=>t instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(t,e){if(typeof A0.Buffer==="function")return A0.Buffer.from(t,"base64");else if(typeof atob==="function"){let n=atob(t.replace(/[\n\r]/g,"")),r=new Uint8Array(n.length);for(let i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),t},stringify({comment:t,type:e,value:n},r,i,s){if(!n)return"";let o=n,l;if(typeof A0.Buffer==="function")l=o instanceof A0.Buffer?o.toString("base64"):A0.Buffer.from(o.buffer).toString("base64");else if(typeof btoa==="function"){let a="";for(let c=0;c<o.length;++c)a+=String.fromCharCode(o[c]);l=btoa(a)}else throw Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=vr.Scalar.BLOCK_LITERAL),e!==vr.Scalar.QUOTE_DOUBLE){let a=Math.max(r.options.lineWidth-r.indent.length,r.options.minContentWidth),c=Math.ceil(l.length/a),f=Array(c);for(let u=0,d=0;u<c;++u,d+=a)f[u]=l.substr(d,a);l=f.join(e===vr.Scalar.BLOCK_LITERAL?`
`:" ")}return E7.stringifyString({comment:t,type:e,value:l},r,i,s)}};P7.binary=A7});var A1=v(function(D7){var E1=q(),kr=re(),N7=nt(),T7=oe();function fo(t,e){if(E1.isSeq(t))for(let n=0;n<t.items.length;++n){let r=t.items[n];if(E1.isPair(r))continue;else if(E1.isMap(r)){if(r.items.length>1)e("Each pair must have its own sequence indicator");let i=r.items[0]||new kr.Pair(new N7.Scalar(null));if(r.commentBefore)i.key.commentBefore=i.key.commentBefore?`${r.commentBefore}
${i.key.commentBefore}`:r.commentBefore;if(r.comment){let s=i.value??i.key;s.comment=s.comment?`${r.comment}
${s.comment}`:r.comment}r=i}t.items[n]=E1.isPair(r)?r:new kr.Pair(r)}else e("Expected a sequence for this tag");return t}function po(t,e,n){let{replacer:r}=n,i=new T7.YAMLSeq(t);i.tag="tag:yaml.org,2002:pairs";let s=0;if(e&&Symbol.iterator in Object(e))for(let o of e){if(typeof r==="function")o=r.call(e,String(s++),o);let l,a;if(Array.isArray(o))if(o.length===2)l=o[0],a=o[1];else throw TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){let c=Object.keys(o);if(c.length===1)l=c[0],a=o[l];else throw TypeError(`Expected tuple with one key, not ${c.length} keys`)}else l=o;i.items.push(kr.createPair(l,a,n))}return i}var j7={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:fo,createNode:po};D7.createPairs=po;D7.pairs=j7;D7.resolvePairs=fo});var _r=v(function(V7){var ho=q(),br=te(),P0=se(),R7=oe(),go=A1();class Ee extends R7.YAMLSeq{constructor(){super();this.add=P0.YAMLMap.prototype.add.bind(this),this.delete=P0.YAMLMap.prototype.delete.bind(this),this.get=P0.YAMLMap.prototype.get.bind(this),this.has=P0.YAMLMap.prototype.has.bind(this),this.set=P0.YAMLMap.prototype.set.bind(this),this.tag=Ee.tag}toJSON(t,e){if(!e)return super.toJSON(t);let n=new Map;if(e?.onCreate)e.onCreate(n);for(let r of this.items){let i,s;if(ho.isPair(r))i=br.toJS(r.key,"",e),s=br.toJS(r.value,i,e);else i=br.toJS(r,"",e);if(n.has(i))throw Error("Ordered maps must not include duplicate keys");n.set(i,s)}return n}static from(t,e,n){let r=go.createPairs(t,e,n),i=new this;return i.items=r.items,i}}Ee.tag="tag:yaml.org,2002:omap";var B7={collection:"seq",identify:(t)=>t instanceof Map,nodeClass:Ee,default:!1,tag:"tag:yaml.org,2002:omap",resolve(t,e){let n=go.resolvePairs(t,e),r=[];for(let{key:i}of n.items)if(ho.isScalar(i))if(r.includes(i.value))e(`Ordered maps must not include duplicate keys: ${i.value}`);else r.push(i.value);return Object.assign(new Ee,n)},createNode:(t,e,n)=>Ee.from(t,e,n)};V7.YAMLOMap=Ee;V7.omap=B7});var ko=v(function(H7){var mo=nt();function yo({value:t,source:e},n){if(e&&(t?vo:wo).test.test(e))return e;return t?n.options.trueStr:n.options.falseStr}var vo={identify:(t)=>t===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new mo.Scalar(!0),stringify:yo},wo={identify:(t)=>t===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new mo.Scalar(!1),stringify:yo};H7.falseTag=wo;H7.trueTag=vo});var bo=v(function(X7){var Y7=nt(),xr=He(),W7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:(t)=>t.slice(-3).toLowerCase()==="nan"?NaN:t[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:xr.stringifyNumber},Z7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:(t)=>parseFloat(t.replace(/_/g,"")),stringify(t){let e=Number(t.value);return isFinite(e)?e.toExponential():xr.stringifyNumber(t)}},Q7={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(t){let e=new Y7.Scalar(parseFloat(t.replace(/_/g,""))),n=t.indexOf(".");if(n!==-1){let r=t.substring(n+1).replace(/_/g,"");if(r[r.length-1]==="0")e.minFractionDigits=r.length}return e},stringify:xr.stringifyNumber};X7.float=Q7;X7.floatExp=Z7;X7.floatNaN=W7});var xo=v(function(lu){var _o=He(),O0=(t)=>typeof t==="bigint"||Number.isInteger(t);function P1(t,e,n,{intAsBigInt:r}){let i=t[0];if(i==="-"||i==="+")e+=1;if(t=t.substring(e).replace(/_/g,""),r){switch(n){case 2:t=`0b${t}`;break;case 8:t=`0o${t}`;break;case 16:t=`0x${t}`;break}let o=BigInt(t);return i==="-"?BigInt(-1)*o:o}let s=parseInt(t,n);return i==="-"?-1*s:s}function $r(t,e,n){let{value:r}=t;if(O0(r)){let i=r.toString(e);return r<0?"-"+n+i.substr(1):n+i}return _o.stringifyNumber(t)}var ru={identify:O0,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(t,e,n)=>P1(t,2,2,n),stringify:(t)=>$r(t,2,"0b")},iu={identify:O0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(t,e,n)=>P1(t,1,8,n),stringify:(t)=>$r(t,8,"0")},su={identify:O0,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(t,e,n)=>P1(t,0,10,n),stringify:_o.stringifyNumber},ou={identify:O0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(t,e,n)=>P1(t,2,16,n),stringify:(t)=>$r(t,16,"0x")};lu.int=su;lu.intBin=ru;lu.intHex=ou;lu.intOct=iu});var Lr=v(function(pu){var T1=q(),O1=re(),N1=se();class Ae extends N1.YAMLMap{constructor(t){super(t);this.tag=Ae.tag}add(t){let e;if(T1.isPair(t))e=t;else if(t&&typeof t==="object"&&"key"in t&&"value"in t&&t.value===null)e=new O1.Pair(t.key,null);else e=new O1.Pair(t,null);if(!N1.findPair(this.items,e.key))this.items.push(e)}get(t,e){let n=N1.findPair(this.items,t);return!e&&T1.isPair(n)?T1.isScalar(n.key)?n.key.value:n.key:n}set(t,e){if(typeof e!=="boolean")throw Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof e}`);let n=N1.findPair(this.items,t);if(n&&!e)this.items.splice(this.items.indexOf(n),1);else if(!n&&e)this.items.push(new O1.Pair(t))}toJSON(t,e){return super.toJSON(t,e,Set)}toString(t,e,n){if(!t)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},t,{allNullValues:!0}),e,n);else throw Error("Set items must all have null values")}static from(t,e,n){let{replacer:r}=n,i=new this(t);if(e&&Symbol.iterator in Object(e))for(let s of e){if(typeof r==="function")s=r.call(e,s,s);i.items.push(O1.createPair(s,null,n))}return i}}Ae.tag="tag:yaml.org,2002:set";var du={collection:"map",identify:(t)=>t instanceof Set,nodeClass:Ae,default:!1,tag:"tag:yaml.org,2002:set",createNode:(t,e,n)=>Ae.from(t,e,n),resolve(t,e){if(T1.isMap(t))if(t.hasAllNullValues(!0))return Object.assign(new Ae,t);else e("Set items must all have null values");else e("Expected a mapping for this tag");return t}};pu.YAMLSet=Ae;pu.set=du});var Cr=v(function(wu){var mu=He();function Mr(t,e){let n=t[0],r=n==="-"||n==="+"?t.substring(1):t,i=(o)=>e?BigInt(o):Number(o),s=r.replace(/_/g,"").split(":").reduce((o,l)=>o*i(60)+i(l),i(0));return n==="-"?i(-1)*s:s}function $o(t){let{value:e}=t,n=(o)=>o;if(typeof e==="bigint")n=(o)=>BigInt(o);else if(isNaN(e)||!isFinite(e))return mu.stringifyNumber(t);let r="";if(e<0)r="-",e*=n(-1);let i=n(60),s=[e%i];if(e<60)s.unshift(0);else if(e=(e-s[0])/i,s.unshift(e%i),e>=60)e=(e-s[0])/i,s.unshift(e);return r+s.map((o)=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var yu={identify:(t)=>typeof t==="bigint"||Number.isInteger(t),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(t,e,{intAsBigInt:n})=>Mr(t,n),stringify:$o},vu={identify:(t)=>typeof t==="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:(t)=>Mr(t,!1),stringify:$o},Lo={identify:(t)=>t instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(t){let e=t.match(Lo.test);if(!e)throw Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,n,r,i,s,o,l]=e.map(Number),a=e[7]?Number((e[7]+"00").substr(1,3)):0,c=Date.UTC(n,r-1,i,s||0,o||0,l||0,a),f=e[8];if(f&&f!=="Z"){let u=Mr(f,!1);if(Math.abs(u)<30)u*=60;c-=60000*u}return new Date(c)},stringify:({value:t})=>t?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""};wu.floatTime=vu;wu.intTime=yu;wu.timestamp=Lo});var Co=v(function(Ou){var xu=Ue(),$u=C1(),Lu=Ke(),Mu=E0(),Cu=wr(),Mo=ko(),Sr=bo(),j1=xo(),Su=w1(),Fu=_r(),Eu=A1(),Au=Lr(),Fr=Cr(),Pu=[xu.map,Lu.seq,Mu.string,$u.nullTag,Mo.trueTag,Mo.falseTag,j1.intBin,j1.intOct,j1.int,j1.intHex,Sr.floatNaN,Sr.floatExp,Sr.float,Cu.binary,Su.merge,Fu.omap,Eu.pairs,Au.set,Fr.intTime,Fr.floatTime,Fr.timestamp];Ou.schema=Pu});var Do=v(function(Bu){var Ao=Ue(),Tu=C1(),Po=Ke(),ju=E0(),Du=fr(),Er=pr(),Ar=gr(),Iu=ao(),zu=uo(),Oo=wr(),N0=w1(),No=_r(),To=A1(),So=Co(),jo=Lr(),D1=Cr(),Fo=new Map([["core",Iu.schema],["failsafe",[Ao.map,Po.seq,ju.string]],["json",zu.schema],["yaml11",So.schema],["yaml-1.1",So.schema]]),Eo={binary:Oo.binary,bool:Du.boolTag,float:Er.float,floatExp:Er.floatExp,floatNaN:Er.floatNaN,floatTime:D1.floatTime,int:Ar.int,intHex:Ar.intHex,intOct:Ar.intOct,intTime:D1.intTime,map:Ao.map,merge:N0.merge,null:Tu.nullTag,omap:No.omap,pairs:To.pairs,seq:Po.seq,set:jo.set,timestamp:D1.timestamp},qu={"tag:yaml.org,2002:binary":Oo.binary,"tag:yaml.org,2002:merge":N0.merge,"tag:yaml.org,2002:omap":No.omap,"tag:yaml.org,2002:pairs":To.pairs,"tag:yaml.org,2002:set":jo.set,"tag:yaml.org,2002:timestamp":D1.timestamp};function Ru(t,e,n){let r=Fo.get(e);if(r&&!t)return n&&!r.includes(N0.merge)?r.concat(N0.merge):r.slice();let i=r;if(!i)if(Array.isArray(t))i=[];else{let s=Array.from(Fo.keys()).filter((o)=>o!=="yaml11").map((o)=>JSON.stringify(o)).join(", ");throw Error(`Unknown schema "${e}"; use one of ${s} or define customTags array`)}if(Array.isArray(t))for(let s of t)i=i.concat(s);else if(typeof t==="function")i=t(i.slice());if(n)i=i.concat(N0.merge);return i.reduce((s,o)=>{let l=typeof o==="string"?Eo[o]:o;if(!l){let a=JSON.stringify(o),c=Object.keys(Eo).map((f)=>JSON.stringify(f)).join(", ");throw Error(`Unknown custom tag ${a}; use one of ${c}`)}if(!s.includes(l))s.push(l);return s},[])}Bu.coreKnownTags=qu;Bu.getTags=Ru});var Nr=v(function(Yu){var Pr=q(),Ku=Ue(),Hu=Ke(),Gu=E0(),I1=Do(),Ju=(t,e)=>t.key<e.key?-1:t.key>e.key?1:0;class Or{constructor({compat:t,customTags:e,merge:n,resolveKnownTags:r,schema:i,sortMapEntries:s,toStringDefaults:o}){this.compat=Array.isArray(t)?I1.getTags(t,"compat"):t?I1.getTags(null,t):null,this.name=typeof i==="string"&&i||"core",this.knownTags=r?I1.coreKnownTags:{},this.tags=I1.getTags(e,this.name,n),this.toStringOptions=o??null,Object.defineProperty(this,Pr.MAP,{value:Ku.map}),Object.defineProperty(this,Pr.SCALAR,{value:Gu.string}),Object.defineProperty(this,Pr.SEQ,{value:Hu.seq}),this.sortMapEntries=typeof s==="function"?s:s===!0?Ju:null}clone(){let t=Object.create(Or.prototype,Object.getOwnPropertyDescriptors(this));return t.tags=this.tags.slice(),t}}Yu.Schema=Or});var Io=v(function(Xu){var Zu=q(),Tr=C0(),T0=$0();function Qu(t,e){let n=[],r=e.directives===!0;if(e.directives!==!1&&t.directives){let a=t.directives.toString(t);if(a)n.push(a),r=!0;else if(t.directives.docStart)r=!0}if(r)n.push("---");let i=Tr.createStringifyContext(t,e),{commentString:s}=i.options;if(t.commentBefore){if(n.length!==1)n.unshift("");let a=s(t.commentBefore);n.unshift(T0.indentComment(a,""))}let o=!1,l=null;if(t.contents){if(Zu.isNode(t.contents)){if(t.contents.spaceBefore&&r)n.push("");if(t.contents.commentBefore){let f=s(t.contents.commentBefore);n.push(T0.indentComment(f,""))}i.forceBlockIndent=!!t.comment,l=t.contents.comment}let a=l?void 0:()=>o=!0,c=Tr.stringify(t.contents,i,()=>l=null,a);if(l)c+=T0.lineComment(c,"",s(l));if((c[0]==="|"||c[0]===">")&&n[n.length-1]==="---")n[n.length-1]=`--- ${c}`;else n.push(c)}else n.push(Tr.stringify(t.contents,i));if(t.directives?.docEnd)if(t.comment){let a=s(t.comment);if(a.includes(`
`))n.push("..."),n.push(T0.indentComment(a,""));else n.push(`... ${a}`)}else n.push("...");else{let a=t.comment;if(a&&o)a=a.replace(/^\n+/,"");if(a){if((!o||l)&&n[n.length-1]!=="")n.push("");n.push(T0.indentComment(s(a),""))}}return n.join(`
`)+`
`}Xu.stringifyDocument=Qu});var j0=v(function(cf){var ef=_0(),Ge=d1(),_t=q(),nf=re(),rf=te(),sf=Nr(),of=Io(),jr=c1(),lf=er(),af=x0(),Dr=tr();class Ir{constructor(t,e,n){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,_t.NODE_TYPE,{value:_t.DOC});let r=null;if(typeof e==="function"||Array.isArray(e))r=e;else if(n===void 0&&e)n=e,e=void 0;let i=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},n);this.options=i;let{version:s}=i;if(n?._directives){if(this.directives=n._directives.atDocument(),this.directives.yaml.explicit)s=this.directives.yaml.version}else this.directives=new Dr.Directives({version:s});this.setSchema(s,n),this.contents=t===void 0?null:this.createNode(t,r,n)}clone(){let t=Object.create(Ir.prototype,{[_t.NODE_TYPE]:{value:_t.DOC}});if(t.commentBefore=this.commentBefore,t.comment=this.comment,t.errors=this.errors.slice(),t.warnings=this.warnings.slice(),t.options=Object.assign({},this.options),this.directives)t.directives=this.directives.clone();if(t.schema=this.schema.clone(),t.contents=_t.isNode(this.contents)?this.contents.clone(t.schema):this.contents,this.range)t.range=this.range.slice();return t}add(t){if(Je(this.contents))this.contents.add(t)}addIn(t,e){if(Je(this.contents))this.contents.addIn(t,e)}createAlias(t,e){if(!t.anchor){let n=jr.anchorNames(this);t.anchor=!e||n.has(e)?jr.findNewAnchor(e||"a",n):e}return new ef.Alias(t.anchor)}createNode(t,e,n){let r=void 0;if(typeof e==="function")t=e.call({"":t},"",t),r=e;else if(Array.isArray(e)){let p=(y)=>typeof y==="number"||y instanceof String||y instanceof Number,m=e.filter(p).map(String);if(m.length>0)e=e.concat(m);r=e}else if(n===void 0&&e)n=e,e=void 0;let{aliasDuplicateObjects:i,anchorPrefix:s,flow:o,keepUndefined:l,onTagObj:a,tag:c}=n??{},{onAnchor:f,setAnchors:u,sourceObjects:d}=jr.createNodeAnchors(this,s||"a"),h={aliasDuplicateObjects:i??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:a,replacer:r,schema:this.schema,sourceObjects:d},g=af.createNode(t,c,h);if(o&&_t.isCollection(g))g.flow=!0;return u(),g}createPair(t,e,n={}){let r=this.createNode(t,null,n),i=this.createNode(e,null,n);return new nf.Pair(r,i)}delete(t){return Je(this.contents)?this.contents.delete(t):!1}deleteIn(t){if(Ge.isEmptyPath(t)){if(this.contents==null)return!1;return this.contents=null,!0}return Je(this.contents)?this.contents.deleteIn(t):!1}get(t,e){return _t.isCollection(this.contents)?this.contents.get(t,e):void 0}getIn(t,e){if(Ge.isEmptyPath(t))return!e&&_t.isScalar(this.contents)?this.contents.value:this.contents;return _t.isCollection(this.contents)?this.contents.getIn(t,e):void 0}has(t){return _t.isCollection(this.contents)?this.contents.has(t):!1}hasIn(t){if(Ge.isEmptyPath(t))return this.contents!==void 0;return _t.isCollection(this.contents)?this.contents.hasIn(t):!1}set(t,e){if(this.contents==null)this.contents=Ge.collectionFromPath(this.schema,[t],e);else if(Je(this.contents))this.contents.set(t,e)}setIn(t,e){if(Ge.isEmptyPath(t))this.contents=e;else if(this.contents==null)this.contents=Ge.collectionFromPath(this.schema,Array.from(t),e);else if(Je(this.contents))this.contents.setIn(t,e)}setSchema(t,e={}){if(typeof t==="number")t=String(t);let n;switch(t){case"1.1":if(this.directives)this.directives.yaml.version="1.1";else this.directives=new Dr.Directives({version:"1.1"});n={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":if(this.directives)this.directives.yaml.version=t;else this.directives=new Dr.Directives({version:t});n={resolveKnownTags:!0,schema:"core"};break;case null:if(this.directives)delete this.directives;n=null;break;default:{let r=JSON.stringify(t);throw Error(`Expected '1.1', '1.2' or null as first argument, but found: ${r}`)}}if(e.schema instanceof Object)this.schema=e.schema;else if(n)this.schema=new sf.Schema(Object.assign(n,e));else throw Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:t,jsonArg:e,mapAsMap:n,maxAliasCount:r,onAnchor:i,reviver:s}={}){let o={anchors:new Map,doc:this,keep:!t,mapAsMap:n===!0,mapKeyWarned:!1,maxAliasCount:typeof r==="number"?r:100},l=rf.toJS(this.contents,e??"",o);if(typeof i==="function")for(let{count:a,res:c}of o.anchors.values())i(c,a);return typeof s==="function"?lf.applyReviver(s,{"":l},"",l):l}toJSON(t,e){return this.toJS({json:!0,jsonArg:t,mapAsMap:!1,onAnchor:e})}toString(t={}){if(this.errors.length>0)throw Error("Document with errors cannot be stringified");if("indent"in t&&(!Number.isInteger(t.indent)||Number(t.indent)<=0)){let e=JSON.stringify(t.indent);throw Error(`"indent" option must be a positive integer, not ${e}`)}return of.stringifyDocument(this,t)}}function Je(t){if(_t.isCollection(t))return!0;throw Error("Expected a YAML collection as document contents")}cf.Document=Ir});var D0=v(function(df){class z1 extends Error{constructor(t,e,n,r){super();this.name=t,this.code=n,this.message=r,this.pos=e}}class zo extends z1{constructor(t,e,n){super("YAMLParseError",t,e,n)}}class qo extends z1{constructor(t,e,n){super("YAMLWarning",t,e,n)}}var ff=(t,e)=>(n)=>{if(n.pos[0]===-1)return;n.linePos=n.pos.map((l)=>e.linePos(l));let{line:r,col:i}=n.linePos[0];n.message+=` at line ${r}, column ${i}`;let s=i-1,o=t.substring(e.lineStarts[r-1],e.lineStarts[r]).replace(/[\n\r]+$/,"");if(s>=60&&o.length>80){let l=Math.min(s-39,o.length-79);o="\u2026"+o.substring(l),s-=l-1}if(o.length>80)o=o.substring(0,79)+"\u2026";if(r>1&&/^ *$/.test(o.substring(0,s))){let l=t.substring(e.lineStarts[r-2],e.lineStarts[r-1]);if(l.length>80)l=l.substring(0,79)+`\u2026
`;o=l+o}if(/[^ ]/.test(o)){let l=1,a=n.linePos[1];if(a?.line===r&&a.col>i)l=Math.max(1,Math.min(a.col-i,80-s));let c=" ".repeat(s)+"^".repeat(l);n.message+=`:

${o}
${c}
`}};df.YAMLError=z1;df.YAMLParseError=zo;df.YAMLWarning=qo;df.prettifyError=ff});var I0=v(function(vf){function yf(t,{flow:e,indicator:n,next:r,offset:i,onError:s,parentIndent:o,startOnNewline:l}){let a=!1,c=l,f=l,u="",d="",h=!1,g=!1,p=null,m=null,y=null,w=null,k=null,x=null,_=null;for(let L of t){if(g){if(L.type!=="space"&&L.type!=="newline"&&L.type!=="comma")s(L.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space");g=!1}if(p){if(c&&L.type!=="comment"&&L.type!=="newline")s(p,"TAB_AS_INDENT","Tabs are not allowed as indentation");p=null}switch(L.type){case"space":if(!e&&(n!=="doc-start"||r?.type!=="flow-collection")&&L.source.includes("\t"))p=L;f=!0;break;case"comment":{if(!f)s(L,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let j=L.source.substring(1)||" ";if(!u)u=j;else u+=d+j;d="",c=!1;break}case"newline":if(c){if(u)u+=L.source;else if(!x||n!=="seq-item-ind")a=!0}else d+=L.source;if(c=!0,h=!0,m||y)w=L;f=!0;break;case"anchor":if(m)s(L,"MULTIPLE_ANCHORS","A node can have at most one anchor");if(L.source.endsWith(":"))s(L.offset+L.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0);m=L,_??(_=L.offset),c=!1,f=!1,g=!0;break;case"tag":{if(y)s(L,"MULTIPLE_TAGS","A node can have at most one tag");y=L,_??(_=L.offset),c=!1,f=!1,g=!0;break}case n:if(m||y)s(L,"BAD_PROP_ORDER",`Anchors and tags must be after the ${L.source} indicator`);if(x)s(L,"UNEXPECTED_TOKEN",`Unexpected ${L.source} in ${e??"collection"}`);x=L,c=n==="seq-item-ind"||n==="explicit-key-ind",f=!1;break;case"comma":if(e){if(k)s(L,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`);k=L,c=!1,f=!1;break}default:s(L,"UNEXPECTED_TOKEN",`Unexpected ${L.type} token`),c=!1,f=!1}}let S=t[t.length-1],A=S?S.offset+S.source.length:i;if(g&&r&&r.type!=="space"&&r.type!=="newline"&&r.type!=="comma"&&(r.type!=="scalar"||r.source!==""))s(r.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space");if(p&&(c&&p.indent<=o||r?.type==="block-map"||r?.type==="block-seq"))s(p,"TAB_AS_INDENT","Tabs are not allowed as indentation");return{comma:k,found:x,spaceBefore:a,comment:u,hasNewline:h,anchor:m,tag:y,newlineAfterProp:w,end:A,start:_??A}}vf.resolveProps=yf});var q1=v(function(kf){function zr(t){if(!t)return null;switch(t.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(t.source.includes(`
`))return!0;if(t.end){for(let e of t.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of t.items){for(let n of e.start)if(n.type==="newline")return!0;if(e.sep){for(let n of e.sep)if(n.type==="newline")return!0}if(zr(e.key)||zr(e.value))return!0}return!1;default:return!0}}kf.containsNewline=zr});var qr=v(function($f){var _f=q1();function xf(t,e,n){if(e?.type==="flow-collection"){let r=e.end[0];if(r.indent===t&&(r.source==="]"||r.source==="}")&&_f.containsNewline(e))n(r,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}$f.flowIndentCheck=xf});var Rr=v(function(Cf){var Ro=q();function Mf(t,e,n){let{uniqueKeys:r}=t.options;if(r===!1)return!1;let i=typeof r==="function"?r:(s,o)=>s===o||Ro.isScalar(s)&&Ro.isScalar(o)&&s.value===o.value;return e.some((s)=>i(s.key,n))}Cf.mapIncludes=Mf});var Ho=v(function(Of){var Bo=re(),Ff=se(),Vo=I0(),Ef=q1(),Uo=qr(),Af=Rr(),Ko="All mapping items must start at the same column";function Pf({composeNode:t,composeEmptyNode:e},n,r,i,s){let l=new(s?.nodeClass??Ff.YAMLMap)(n.schema);if(n.atRoot)n.atRoot=!1;let a=r.offset,c=null;for(let f of r.items){let{start:u,key:d,sep:h,value:g}=f,p=Vo.resolveProps(u,{indicator:"explicit-key-ind",next:d??h?.[0],offset:a,onError:i,parentIndent:r.indent,startOnNewline:!0}),m=!p.found;if(m){if(d){if(d.type==="block-seq")i(a,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key");else if("indent"in d&&d.indent!==r.indent)i(a,"BAD_INDENT",Ko)}if(!p.anchor&&!p.tag&&!h){if(c=p.end,p.comment)if(l.comment)l.comment+=`
`+p.comment;else l.comment=p.comment;continue}if(p.newlineAfterProp||Ef.containsNewline(d))i(d??u[u.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else if(p.found?.indent!==r.indent)i(a,"BAD_INDENT",Ko);n.atKey=!0;let y=p.end,w=d?t(n,d,p,i):e(n,y,u,null,p,i);if(n.schema.compat)Uo.flowIndentCheck(r.indent,d,i);if(n.atKey=!1,Af.mapIncludes(n,l.items,w))i(y,"DUPLICATE_KEY","Map keys must be unique");let k=Vo.resolveProps(h??[],{indicator:"map-value-ind",next:g,offset:w.range[2],onError:i,parentIndent:r.indent,startOnNewline:!d||d.type==="block-scalar"});if(a=k.end,k.found){if(m){if(g?.type==="block-map"&&!k.hasNewline)i(a,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings");if(n.options.strict&&p.start<k.found.offset-1024)i(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key")}let x=g?t(n,g,k,i):e(n,a,h,null,k,i);if(n.schema.compat)Uo.flowIndentCheck(r.indent,g,i);a=x.range[2];let _=new Bo.Pair(w,x);if(n.options.keepSourceTokens)_.srcToken=f;l.items.push(_)}else{if(m)i(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values");if(k.comment)if(w.comment)w.comment+=`
`+k.comment;else w.comment=k.comment;let x=new Bo.Pair(w);if(n.options.keepSourceTokens)x.srcToken=f;l.items.push(x)}}if(c&&c<a)i(c,"IMPOSSIBLE","Map comment with trailing content");return l.range=[r.offset,a,c??a],l}Of.resolveBlockMap=Pf});var Go=v(function(zf){var Tf=oe(),jf=I0(),Df=qr();function If({composeNode:t,composeEmptyNode:e},n,r,i,s){let l=new(s?.nodeClass??Tf.YAMLSeq)(n.schema);if(n.atRoot)n.atRoot=!1;if(n.atKey)n.atKey=!1;let a=r.offset,c=null;for(let{start:f,value:u}of r.items){let d=jf.resolveProps(f,{indicator:"seq-item-ind",next:u,offset:a,onError:i,parentIndent:r.indent,startOnNewline:!0});if(!d.found)if(d.anchor||d.tag||u)if(u?.type==="block-seq")i(d.end,"BAD_INDENT","All sequence items must start at the same column");else i(a,"MISSING_CHAR","Sequence item without - indicator");else{if(c=d.end,d.comment)l.comment=d.comment;continue}let h=u?t(n,u,d,i):e(n,d.end,f,null,d,i);if(n.schema.compat)Df.flowIndentCheck(r.indent,u,i);a=h.range[2],l.items.push(h)}return l.range=[r.offset,a,c??a],l}zf.resolveBlockSeq=If});var Ye=v(function(Bf){function Rf(t,e,n,r){let i="";if(t){let s=!1,o="";for(let l of t){let{source:a,type:c}=l;switch(c){case"space":s=!0;break;case"comment":{if(n&&!s)r(l,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let f=a.substring(1)||" ";if(!i)i=f;else i+=o+f;o="";break}case"newline":if(i)o+=a;s=!0;break;default:r(l,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=a.length}}return{comment:i,offset:e}}Bf.resolveEnd=Rf});var Wo=v(function(Zf){var Uf=q(),Kf=re(),Jo=se(),Hf=oe(),Gf=Ye(),Yo=I0(),Jf=q1(),Yf=Rr(),Br="Block collections are not allowed within flow collections",Vr=(t)=>t&&(t.type==="block-map"||t.type==="block-seq");function Wf({composeNode:t,composeEmptyNode:e},n,r,i,s){let o=r.start.source==="{",l=o?"flow map":"flow sequence",c=new(s?.nodeClass??(o?Jo.YAMLMap:Hf.YAMLSeq))(n.schema);c.flow=!0;let f=n.atRoot;if(f)n.atRoot=!1;if(n.atKey)n.atKey=!1;let u=r.offset+r.start.source.length;for(let m=0;m<r.items.length;++m){let y=r.items[m],{start:w,key:k,sep:x,value:_}=y,S=Yo.resolveProps(w,{flow:l,indicator:"explicit-key-ind",next:k??x?.[0],offset:u,onError:i,parentIndent:r.indent,startOnNewline:!1});if(!S.found){if(!S.anchor&&!S.tag&&!x&&!_){if(m===0&&S.comma)i(S.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${l}`);else if(m<r.items.length-1)i(S.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${l}`);if(S.comment)if(c.comment)c.comment+=`
`+S.comment;else c.comment=S.comment;u=S.end;continue}if(!o&&n.options.strict&&Jf.containsNewline(k))i(k,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(m===0){if(S.comma)i(S.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${l}`)}else{if(!S.comma)i(S.start,"MISSING_CHAR",`Missing , between ${l} items`);if(S.comment){let A="";t:for(let L of w)switch(L.type){case"comma":case"space":break;case"comment":A=L.source.substring(1);break t;default:break t}if(A){let L=c.items[c.items.length-1];if(Uf.isPair(L))L=L.value??L.key;if(L.comment)L.comment+=`
`+A;else L.comment=A;S.comment=S.comment.substring(A.length+1)}}}if(!o&&!x&&!S.found){let A=_?t(n,_,S,i):e(n,S.end,x,null,S,i);if(c.items.push(A),u=A.range[2],Vr(_))i(A.range,"BLOCK_IN_FLOW",Br)}else{n.atKey=!0;let A=S.end,L=k?t(n,k,S,i):e(n,A,w,null,S,i);if(Vr(k))i(L.range,"BLOCK_IN_FLOW",Br);n.atKey=!1;let j=Yo.resolveProps(x??[],{flow:l,indicator:"map-value-ind",next:_,offset:L.range[2],onError:i,parentIndent:r.indent,startOnNewline:!1});if(j.found){if(!o&&!S.found&&n.options.strict){if(x)for(let V of x){if(V===j.found)break;if(V.type==="newline"){i(V,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}if(S.start<j.found.offset-1024)i(j.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else if(_)if("source"in _&&_.source?.[0]===":")i(_,"MISSING_CHAR",`Missing space after : in ${l}`);else i(j.start,"MISSING_CHAR",`Missing , or : between ${l} items`);let H=_?t(n,_,j,i):j.found?e(n,j.end,x,null,j,i):null;if(H){if(Vr(_))i(H.range,"BLOCK_IN_FLOW",Br)}else if(j.comment)if(L.comment)L.comment+=`
`+j.comment;else L.comment=j.comment;let Z=new Kf.Pair(L,H);if(n.options.keepSourceTokens)Z.srcToken=y;if(o){let V=c;if(Yf.mapIncludes(n,V.items,L))i(A,"DUPLICATE_KEY","Map keys must be unique");V.items.push(Z)}else{let V=new Jo.YAMLMap(n.schema);V.flow=!0,V.items.push(Z);let C=(H??L).range;V.range=[L.range[0],C[1],C[2]],c.items.push(V)}u=H?H.range[2]:j.end}}let d=o?"}":"]",[h,...g]=r.end,p=u;if(h?.source===d)p=h.offset+h.source.length;else{let m=l[0].toUpperCase()+l.substring(1),y=f?`${m} must end with a ${d}`:`${m} in block collection must be sufficiently indented and end with a ${d}`;if(i(u,f?"MISSING_CHAR":"BAD_INDENT",y),h&&h.source.length!==1)g.unshift(h)}if(g.length>0){let m=Gf.resolveEnd(g,p,n.options.strict,i);if(m.comment)if(c.comment)c.comment+=`
`+m.comment;else c.comment=m.comment;c.range=[r.offset,p,m.offset]}else c.range=[r.offset,p,p];return c}Zf.resolveFlowCollection=Wf});var Zo=v(function(ld){var Xf=q(),td=nt(),ed=se(),nd=oe(),rd=Ho(),id=Go(),sd=Wo();function Ur(t,e,n,r,i,s){let o=n.type==="block-map"?rd.resolveBlockMap(t,e,n,r,s):n.type==="block-seq"?id.resolveBlockSeq(t,e,n,r,s):sd.resolveFlowCollection(t,e,n,r,s),l=o.constructor;if(i==="!"||i===l.tagName)return o.tag=l.tagName,o;if(i)o.tag=i;return o}function od(t,e,n,r,i){let s=r.tag,o=!s?null:e.directives.tagName(s.source,(d)=>i(s,"TAG_RESOLVE_FAILED",d));if(n.type==="block-seq"){let{anchor:d,newlineAfterProp:h}=r,g=d&&s?d.offset>s.offset?d:s:d??s;if(g&&(!h||h.offset<g.offset))i(g,"MISSING_CHAR","Missing newline after block sequence props")}let l=n.type==="block-map"?"map":n.type==="block-seq"?"seq":n.start.source==="{"?"map":"seq";if(!s||!o||o==="!"||o===ed.YAMLMap.tagName&&l==="map"||o===nd.YAMLSeq.tagName&&l==="seq")return Ur(t,e,n,i,o);let a=e.schema.tags.find((d)=>d.tag===o&&d.collection===l);if(!a){let d=e.schema.knownTags[o];if(d?.collection===l)e.schema.tags.push(Object.assign({},d,{default:!1})),a=d;else{if(d)i(s,"BAD_COLLECTION_TYPE",`${d.tag} used for ${l} collection, but expects ${d.collection??"scalar"}`,!0);else i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${o}`,!0);return Ur(t,e,n,i,o)}}let c=Ur(t,e,n,i,o,a),f=a.resolve?.(c,(d)=>i(s,"TAG_RESOLVE_FAILED",d),e.options)??c,u=Xf.isNode(f)?f:new td.Scalar(f);if(u.range=c.range,u.tag=o,a?.format)u.format=a.format;return u}ld.composeCollection=od});var Hr=v(function(dd){var Kr=nt();function cd(t,e,n){let r=e.offset,i=ud(e,t.options.strict,n);if(!i)return{value:"",type:null,comment:"",range:[r,r,r]};let s=i.mode===">"?Kr.Scalar.BLOCK_FOLDED:Kr.Scalar.BLOCK_LITERAL,o=e.source?fd(e.source):[],l=o.length;for(let p=o.length-1;p>=0;--p){let m=o[p][1];if(m===""||m==="\r")l=p;else break}if(l===0){let p=i.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"",m=r+i.length;if(e.source)m+=e.source.length;return{value:p,type:s,comment:i.comment,range:[r,m,m]}}let a=e.indent+i.indent,c=e.offset+i.length,f=0;for(let p=0;p<l;++p){let[m,y]=o[p];if(y===""||y==="\r"){if(i.indent===0&&m.length>a)a=m.length}else{if(m.length<a)n(c+m.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator");if(i.indent===0)a=m.length;if(f=p,a===0&&!t.atRoot)n(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=m.length+y.length+1}for(let p=o.length-1;p>=l;--p)if(o[p][0].length>a)l=p+1;let u="",d="",h=!1;for(let p=0;p<f;++p)u+=o[p][0].slice(a)+`
`;for(let p=f;p<l;++p){let[m,y]=o[p];c+=m.length+y.length+1;let w=y[y.length-1]==="\r";if(w)y=y.slice(0,-1);if(y&&m.length<a){let x=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;n(c-y.length-(w?2:1),"BAD_INDENT",x),m=""}if(s===Kr.Scalar.BLOCK_LITERAL)u+=d+m.slice(a)+y,d=`
`;else if(m.length>a||y[0]==="\t"){if(d===" ")d=`
`;else if(!h&&d===`
`)d=`

`;u+=d+m.slice(a)+y,d=`
`,h=!0}else if(y==="")if(d===`
`)u+=`
`;else d=`
`;else u+=d+y,d=" ",h=!1}switch(i.chomp){case"-":break;case"+":for(let p=l;p<o.length;++p)u+=`
`+o[p][0].slice(a);if(u[u.length-1]!==`
`)u+=`
`;break;default:u+=`
`}let g=r+i.length+e.source.length;return{value:u,type:s,comment:i.comment,range:[r,g,g]}}function ud({offset:t,props:e},n,r){if(e[0].type!=="block-scalar-header")return r(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:i}=e[0],s=i[0],o=0,l="",a=-1;for(let d=1;d<i.length;++d){let h=i[d];if(!l&&(h==="-"||h==="+"))l=h;else{let g=Number(h);if(!o&&g)o=g;else if(a===-1)a=t+d}}if(a!==-1)r(a,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,f="",u=i.length;for(let d=1;d<e.length;++d){let h=e[d];switch(h.type){case"space":c=!0;case"newline":u+=h.source.length;break;case"comment":if(n&&!c)r(h,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");u+=h.source.length,f=h.source.substring(1);break;case"error":r(h,"UNEXPECTED_TOKEN",h.message),u+=h.source.length;break;default:{let g=`Unexpected token in block scalar header: ${h.type}`;r(h,"UNEXPECTED_TOKEN",g);let p=h.source;if(p&&typeof p==="string")u+=p.length}}}return{mode:s,indent:o,chomp:l,comment:f,length:u}}function fd(t){let e=t.split(/\n( *)/),n=e[0],r=n.match(/^( *)/),s=[r?.[1]?[r[1],n.slice(r[1].length)]:["",n]];for(let o=1;o<e.length;o+=2)s.push([e[o],e[o+1]]);return s}dd.resolveBlockScalar=cd});var Jr=v(function(_d){var Gr=nt(),hd=Ye();function gd(t,e,n){let{offset:r,type:i,source:s,end:o}=t,l,a,c=(d,h,g)=>n(r+d,h,g);switch(i){case"scalar":l=Gr.Scalar.PLAIN,a=md(s,c);break;case"single-quoted-scalar":l=Gr.Scalar.QUOTE_SINGLE,a=yd(s,c);break;case"double-quoted-scalar":l=Gr.Scalar.QUOTE_DOUBLE,a=vd(s,c);break;default:return n(t,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[r,r+s.length,r+s.length]}}let f=r+s.length,u=hd.resolveEnd(o,f,e,n);return{value:a,type:l,comment:u.comment,range:[r,f,u.offset]}}function md(t,e){let n="";switch(t[0]){case"\t":n="a tab character";break;case",":n="flow indicator character ,";break;case"%":n="directive indicator character %";break;case"|":case">":{n=`block scalar indicator ${t[0]}`;break}case"@":case"`":{n=`reserved character ${t[0]}`;break}}if(n)e(0,"BAD_SCALAR_START",`Plain value cannot start with ${n}`);return Qo(t)}function yd(t,e){if(t[t.length-1]!=="'"||t.length===1)e(t.length,"MISSING_CHAR","Missing closing 'quote");return Qo(t.slice(1,-1)).replace(/''/g,"'")}function Qo(t){let e=/(.*?)\r?\n/sy,n=e.exec(t);if(!n)return t;let r,i;try{r=new RegExp("(?<![ \t])[ \t]+$"),i=new RegExp("^[ \t]+|(?<![ \t])[ \t]+$","g")}catch{r=/[ \t]+$/,i=/^[ \t]+|[ \t]+$/g}let s=n[1].replace(r,""),o=" ",l=e.lastIndex;while(n=e.exec(t)){let c=n[1].replace(i,"");if(c==="")if(o===`
`)s+=o;else o=`
`;else s+=o+c,o=" ";l=e.lastIndex}let a=/[ \t]*(.*)/sy;return a.lastIndex=l,n=a.exec(t),s+o+(n?.[1]??"")}function vd(t,e){let n="";for(let r=1;r<t.length-1;++r){let i=t[r];if(i==="\r"&&t[r+1]===`
`)continue;if(i===`
`){let{fold:s,offset:o}=wd(t,r);n+=s,r=o}else if(i==="\\"){let s=t[++r],o=kd[s];if(o)n+=o;else if(s===`
`){s=t[r+1];while(s===" "||s==="\t")s=t[++r+1]}else if(s==="\r"&&t[r+1]===`
`){s=t[++r+1];while(s===" "||s==="\t")s=t[++r+1]}else if(s==="x"||s==="u"||s==="U"){let l=s==="x"?2:s==="u"?4:8;n+=bd(t,r+1,l,e),r+=l}else{let l=t.substr(r-1,2);e(r-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${l}`),n+=l}}else if(i===" "||i==="\t"){let s=r,o=t[r+1];while(o===" "||o==="\t")o=t[++r+1];if(o!==`
`&&!(o==="\r"&&t[r+2]===`
`))n+=r>s?t.slice(s,r+1):i}else n+=i}if(t[t.length-1]!=='"'||t.length===1)e(t.length,"MISSING_CHAR",'Missing closing "quote');return n}function wd(t,e){let n="",r=t[e+1];while(r===" "||r==="\t"||r===`
`||r==="\r"){if(r==="\r"&&t[e+2]!==`
`)break;if(r===`
`)n+=`
`;e+=1,r=t[e+1]}if(!n)n=" ";return{fold:n,offset:e}}var kd={"0":"\x00",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"\t",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","\t":"\t"};function bd(t,e,n,r){let i=t.substr(e,n),o=i.length===n&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;try{return String.fromCodePoint(o)}catch{let l=t.substr(e-2,n+2);return r(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${l}`),l}}_d.resolveFlowScalar=gd});var t2=v(function(Fd){var Pe=q(),Xo=nt(),$d=Hr(),Ld=Jr();function Md(t,e,n,r){let{value:i,type:s,comment:o,range:l}=e.type==="block-scalar"?$d.resolveBlockScalar(t,e,r):Ld.resolveFlowScalar(e,t.options.strict,r),a=n?t.directives.tagName(n.source,(u)=>r(n,"TAG_RESOLVE_FAILED",u)):null,c;if(t.options.stringKeys&&t.atKey)c=t.schema[Pe.SCALAR];else if(a)c=Cd(t.schema,i,a,n,r);else if(e.type==="scalar")c=Sd(t,i,e,r);else c=t.schema[Pe.SCALAR];let f;try{let u=c.resolve(i,(d)=>r(n??e,"TAG_RESOLVE_FAILED",d),t.options);f=Pe.isScalar(u)?u:new Xo.Scalar(u)}catch(u){let d=u instanceof Error?u.message:String(u);r(n??e,"TAG_RESOLVE_FAILED",d),f=new Xo.Scalar(i)}if(f.range=l,f.source=i,s)f.type=s;if(a)f.tag=a;if(c.format)f.format=c.format;if(o)f.comment=o;return f}function Cd(t,e,n,r,i){if(n==="!")return t[Pe.SCALAR];let s=[];for(let l of t.tags)if(!l.collection&&l.tag===n)if(l.default&&l.test)s.push(l);else return l;for(let l of s)if(l.test?.test(e))return l;let o=t.knownTags[n];if(o&&!o.collection)return t.tags.push(Object.assign({},o,{default:!1,test:void 0})),o;return i(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${n}`,n!=="tag:yaml.org,2002:str"),t[Pe.SCALAR]}function Sd({atKey:t,directives:e,schema:n},r,i,s){let o=n.tags.find((l)=>(l.default===!0||t&&l.default==="key")&&l.test?.test(r))||n[Pe.SCALAR];if(n.compat){let l=n.compat.find((a)=>a.default&&a.test?.test(r))??n[Pe.SCALAR];if(o.tag!==l.tag){let a=e.tagString(o.tag),c=e.tagString(l.tag),f=`Value may be parsed as either ${a} or ${c}`;s(i,"TAG_RESOLVE_FAILED",f,!0)}}return o}Fd.composeScalar=Md});var e2=v(function(Pd){function Ad(t,e,n){if(e){n??(n=e.length);for(let r=n-1;r>=0;--r){let i=e[r];switch(i.type){case"space":case"comment":case"newline":t-=i.source.length;continue}i=e[++r];while(i?.type==="space")t+=i.source.length,i=e[++r];break}}return t}Pd.emptyScalarPosition=Ad});var i2=v(function(Rd){var Nd=_0(),Td=q(),jd=Zo(),n2=t2(),Dd=Ye(),Id=e2(),zd={composeNode:r2,composeEmptyNode:Yr};function r2(t,e,n,r){let i=t.atKey,{spaceBefore:s,comment:o,anchor:l,tag:a}=n,c,f=!0;switch(e.type){case"alias":if(c=qd(t,e,r),l||a)r(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":if(c=n2.composeScalar(t,e,a,r),l)c.anchor=l.source.substring(1);break;case"block-map":case"block-seq":case"flow-collection":try{if(c=jd.composeCollection(zd,t,e,n,r),l)c.anchor=l.source.substring(1)}catch(u){let d=u instanceof Error?u.message:String(u);r(e,"RESOURCE_EXHAUSTION",d)}break;default:{let u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;r(e,"UNEXPECTED_TOKEN",u),f=!1}}if(c??(c=Yr(t,e.offset,void 0,null,n,r)),l&&c.anchor==="")r(l,"BAD_ALIAS","Anchor cannot be an empty string");if(i&&t.options.stringKeys&&(!Td.isScalar(c)||typeof c.value!=="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str"))r(a??e,"NON_STRING_KEY","With stringKeys, all keys must be strings");if(s)c.spaceBefore=!0;if(o)if(e.type==="scalar"&&e.source==="")c.comment=o;else c.commentBefore=o;if(t.options.keepSourceTokens&&f)c.srcToken=e;return c}function Yr(t,e,n,r,{spaceBefore:i,comment:s,anchor:o,tag:l,end:a},c){let f={type:"scalar",offset:Id.emptyScalarPosition(e,n,r),indent:-1,source:""},u=n2.composeScalar(t,f,l,c);if(o){if(u.anchor=o.source.substring(1),u.anchor==="")c(o,"BAD_ALIAS","Anchor cannot be an empty string")}if(i)u.spaceBefore=!0;if(s)u.comment=s,u.range[2]=a;return u}function qd({options:t},{offset:e,source:n,end:r},i){let s=new Nd.Alias(n.substring(1));if(s.source==="")i(e,"BAD_ALIAS","Alias cannot be an empty string");if(s.source.endsWith(":"))i(e+n.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let o=e+n.length,l=Dd.resolveEnd(r,o,t.strict,i);if(s.range=[e,o,l.offset],l.comment)s.comment=l.comment;return s}Rd.composeEmptyNode=Yr;Rd.composeNode=r2});var o2=v(function(Jd){var Ud=j0(),s2=i2(),Kd=Ye(),Hd=I0();function Gd(t,e,{offset:n,start:r,value:i,end:s},o){let l=Object.assign({_directives:e},t),a=new Ud.Document(void 0,l),c={atKey:!1,atRoot:!0,directives:a.directives,options:a.options,schema:a.schema},f=Hd.resolveProps(r,{indicator:"doc-start",next:i??s?.[0],offset:n,onError:o,parentIndent:0,startOnNewline:!0});if(f.found){if(a.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!f.hasNewline)o(f.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")}a.contents=i?s2.composeNode(c,i,f,o):s2.composeEmptyNode(c,f.end,r,null,f,o);let u=a.contents.range[2],d=Kd.resolveEnd(s,u,!1,o);if(d.comment)a.comment=d.comment;return a.range=[n,u,d.offset],a}Jd.composeDoc=Gd});var Wr=v(function(ep){var Wd=i1("process"),Zd=tr(),Qd=j0(),z0=D0(),l2=q(),Xd=o2(),tp=Ye();function q0(t){if(typeof t==="number")return[t,t+1];if(Array.isArray(t))return t.length===2?t:[t[0],t[1]];let{offset:e,source:n}=t;return[e,e+(typeof n==="string"?n.length:1)]}function a2(t){let e="",n=!1,r=!1;for(let i=0;i<t.length;++i){let s=t[i];switch(s[0]){case"#":e+=(e===""?"":r?`

`:`
`)+(s.substring(1)||" "),n=!0,r=!1;break;case"%":if(t[i+1]?.[0]!=="#")i+=1;n=!1;break;default:if(!n)r=!0;n=!1}}return{comment:e,afterEmptyLine:r}}class c2{constructor(t={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(e,n,r,i)=>{let s=q0(e);if(i)this.warnings.push(new z0.YAMLWarning(s,n,r));else this.errors.push(new z0.YAMLParseError(s,n,r))},this.directives=new Zd.Directives({version:t.version||"1.2"}),this.options=t}decorate(t,e){let{comment:n,afterEmptyLine:r}=a2(this.prelude);if(n){let i=t.contents;if(e)t.comment=t.comment?`${t.comment}
${n}`:n;else if(r||t.directives.docStart||!i)t.commentBefore=n;else if(l2.isCollection(i)&&!i.flow&&i.items.length>0){let s=i.items[0];if(l2.isPair(s))s=s.key;let o=s.commentBefore;s.commentBefore=o?`${n}
${o}`:n}else{let s=i.commentBefore;i.commentBefore=s?`${n}
${s}`:n}}if(e){for(let i=0;i<this.errors.length;++i)t.errors.push(this.errors[i]);for(let i=0;i<this.warnings.length;++i)t.warnings.push(this.warnings[i])}else t.errors=this.errors,t.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:a2(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(t,e=!1,n=-1){for(let r of t)yield*this.next(r);yield*this.end(e,n)}*next(t){if(Wd.env.LOG_STREAM)console.dir(t,{depth:null});switch(t.type){case"directive":this.directives.add(t.source,(e,n,r)=>{let i=q0(t);i[0]+=e,this.onError(i,"BAD_DIRECTIVE",n,r)}),this.prelude.push(t.source),this.atDirectives=!0;break;case"document":{let e=Xd.composeDoc(this.options,this.directives,t,this.onError);if(this.atDirectives&&!e.directives.docStart)this.onError(t,"MISSING_CHAR","Missing directives-end/doc-start indicator line");if(this.decorate(e,!1),this.doc)yield this.doc;this.doc=e,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(t.source);break;case"error":{let e=t.source?`${t.message}: ${JSON.stringify(t.source)}`:t.message,n=new z0.YAMLParseError(q0(t),"UNEXPECTED_TOKEN",e);if(this.atDirectives||!this.doc)this.errors.push(n);else this.doc.errors.push(n);break}case"doc-end":{if(!this.doc){this.errors.push(new z0.YAMLParseError(q0(t),"UNEXPECTED_TOKEN","Unexpected doc-end without preceding document"));break}this.doc.directives.docEnd=!0;let e=tp.resolveEnd(t.end,t.offset+t.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),e.comment){let n=this.doc.comment;this.doc.comment=n?`${n}
${e.comment}`:e.comment}this.doc.range[2]=e.offset;break}default:this.errors.push(new z0.YAMLParseError(q0(t),"UNEXPECTED_TOKEN",`Unsupported token ${t.type}`))}}*end(t=!1,e=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(t){let n=Object.assign({_directives:this.directives},this.options),r=new Qd.Document(void 0,n);if(this.atDirectives)this.onError(e,"MISSING_CHAR","Missing directives-end indicator line");r.range=[0,e,e],this.decorate(r,!1),yield r}}}ep.Composer=c2});var d2=v(function(up){var rp=Hr(),ip=Jr(),sp=D0(),u2=M0();function op(t,e=!0,n){if(t){let r=(i,s,o)=>{let l=typeof i==="number"?i:Array.isArray(i)?i[0]:i.offset;if(n)n(l,s,o);else throw new sp.YAMLParseError([l,l+1],s,o)};switch(t.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return ip.resolveFlowScalar(t,e,r);case"block-scalar":return rp.resolveBlockScalar({options:{strict:e}},t,r)}}return null}function lp(t,e){let{implicitKey:n=!1,indent:r,inFlow:i=!1,offset:s=-1,type:o="PLAIN"}=e,l=u2.stringifyString({type:o,value:t},{implicitKey:n,indent:r>0?" ".repeat(r):"",inFlow:i,options:{blockQuote:!0,lineWidth:-1}}),a=e.end??[{type:"newline",offset:-1,indent:r,source:`
`}];switch(l[0]){case"|":case">":{let c=l.indexOf(`
`),f=l.substring(0,c),u=l.substring(c+1)+`
`,d=[{type:"block-scalar-header",offset:s,indent:r,source:f}];if(!f2(d,a))d.push({type:"newline",offset:-1,indent:r,source:`
`});return{type:"block-scalar",offset:s,indent:r,props:d,source:u}}case'"':return{type:"double-quoted-scalar",offset:s,indent:r,source:l,end:a};case"'":return{type:"single-quoted-scalar",offset:s,indent:r,source:l,end:a};default:return{type:"scalar",offset:s,indent:r,source:l,end:a}}}function ap(t,e,n={}){let{afterKey:r=!1,implicitKey:i=!1,inFlow:s=!1,type:o}=n,l="indent"in t?t.indent:null;if(r&&typeof l==="number")l+=2;if(!o)switch(t.type){case"single-quoted-scalar":o="QUOTE_SINGLE";break;case"double-quoted-scalar":o="QUOTE_DOUBLE";break;case"block-scalar":{let c=t.props[0];if(c.type!=="block-scalar-header")throw Error("Invalid block scalar header");o=c.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:o="PLAIN"}let a=u2.stringifyString({type:o,value:e},{implicitKey:i||l===null,indent:l!==null&&l>0?" ".repeat(l):"",inFlow:s,options:{blockQuote:!0,lineWidth:-1}});switch(a[0]){case"|":case">":cp(t,a);break;case'"':Zr(t,a,"double-quoted-scalar");break;case"'":Zr(t,a,"single-quoted-scalar");break;default:Zr(t,a,"scalar")}}function cp(t,e){let n=e.indexOf(`
`),r=e.substring(0,n),i=e.substring(n+1)+`
`;if(t.type==="block-scalar"){let s=t.props[0];if(s.type!=="block-scalar-header")throw Error("Invalid block scalar header");s.source=r,t.source=i}else{let{offset:s}=t,o="indent"in t?t.indent:-1,l=[{type:"block-scalar-header",offset:s,indent:o,source:r}];if(!f2(l,"end"in t?t.end:void 0))l.push({type:"newline",offset:-1,indent:o,source:`
`});for(let a of Object.keys(t))if(a!=="type"&&a!=="offset")delete t[a];Object.assign(t,{type:"block-scalar",indent:o,props:l,source:i})}}function f2(t,e){if(e)for(let n of e)switch(n.type){case"space":case"comment":t.push(n);break;case"newline":return t.push(n),!0}return!1}function Zr(t,e,n){switch(t.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":t.type=n,t.source=e;break;case"block-scalar":{let r=t.props.slice(1),i=e.length;if(t.props[0].type==="block-scalar-header")i-=t.props[0].source.length;for(let s of r)s.offset+=i;delete t.props,Object.assign(t,{type:n,source:e,end:r});break}case"block-map":case"block-seq":{let i={type:"newline",offset:t.offset+e.length,indent:t.indent,source:`
`};delete t.items,Object.assign(t,{type:n,source:e,end:[i]});break}default:{let r="indent"in t?t.indent:-1,i="end"in t&&Array.isArray(t.end)?t.end.filter((s)=>s.type==="space"||s.type==="comment"||s.type==="newline"):[];for(let s of Object.keys(t))if(s!=="type"&&s!=="offset")delete t[s];Object.assign(t,{type:n,indent:r,source:e,end:i})}}}up.createScalarToken=lp;up.resolveAsScalar=op;up.setScalarValue=ap});var p2=v(function(gp){var hp=(t)=>("type"in t)?B1(t):R1(t);function B1(t){switch(t.type){case"block-scalar":{let e="";for(let n of t.props)e+=B1(n);return e+t.source}case"block-map":case"block-seq":{let e="";for(let n of t.items)e+=R1(n);return e}case"flow-collection":{let e=t.start.source;for(let n of t.items)e+=R1(n);for(let n of t.end)e+=n.source;return e}case"document":{let e=R1(t);if(t.end)for(let n of t.end)e+=n.source;return e}default:{let e=t.source;if("end"in t&&t.end)for(let n of t.end)e+=n.source;return e}}}function R1({start:t,key:e,sep:n,value:r}){let i="";for(let s of t)i+=s.source;if(e)i+=B1(e);if(n)for(let s of n)i+=s.source;if(r)i+=B1(r);return i}gp.stringify=hp});var m2=v(function(vp){var Qr=Symbol("break visit"),yp=Symbol("skip children"),h2=Symbol("remove item");function Oe(t,e){if("type"in t&&t.type==="document")t={start:t.start,value:t.value};g2(Object.freeze([]),t,e)}Oe.BREAK=Qr;Oe.SKIP=yp;Oe.REMOVE=h2;Oe.itemAtPath=(t,e)=>{let n=t;for(let[r,i]of e){let s=n?.[r];if(s&&"items"in s)n=s.items[i];else return}return n};Oe.parentCollection=(t,e)=>{let n=Oe.itemAtPath(t,e.slice(0,-1)),r=e[e.length-1][0],i=n?.[r];if(i&&"items"in i)return i;throw Error("Parent collection not found")};function g2(t,e,n){let r=n(e,t);if(typeof r==="symbol")return r;for(let i of["key","value"]){let s=e[i];if(s&&"items"in s){for(let o=0;o<s.items.length;++o){let l=g2(Object.freeze(t.concat([[i,o]])),s.items[o],n);if(typeof l==="number")o=l-1;else if(l===Qr)return Qr;else if(l===h2)s.items.splice(o,1),o-=1}if(typeof r==="function"&&i==="key")r=r(e,t)}}return typeof r==="function"?r(e,t):r}vp.visit=Oe});var V1=v(function(Mp){var Xr=d2(),kp=p2(),bp=m2(),ti="\uFEFF",ei="\x02",ni="\x18",ri="\x1F",_p=(t)=>!!t&&("items"in t),xp=(t)=>!!t&&(t.type==="scalar"||t.type==="single-quoted-scalar"||t.type==="double-quoted-scalar"||t.type==="block-scalar");function $p(t){switch(t){case ti:return"<BOM>";case ei:return"<DOC>";case ni:return"<FLOW_END>";case ri:return"<SCALAR>";default:return JSON.stringify(t)}}function Lp(t){switch(t){case ti:return"byte-order-mark";case ei:return"doc-mode";case ni:return"flow-error-end";case ri:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(t[0]){case" ":case"\t":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}Mp.createScalarToken=Xr.createScalarToken;Mp.resolveAsScalar=Xr.resolveAsScalar;Mp.setScalarValue=Xr.setScalarValue;Mp.stringify=kp.stringify;Mp.visit=bp.visit;Mp.BOM=ti;Mp.DOCUMENT=ei;Mp.FLOW_END=ni;Mp.SCALAR=ri;Mp.isCollection=_p;Mp.isScalar=xp;Mp.prettyToken=$p;Mp.tokenType=Lp});var si=v(function(Bp){var R0=V1();function Et(t){switch(t){case void 0:case" ":case`
`:case"\r":case"\t":return!0;default:return!1}}var y2=new Set("0123456789ABCDEFabcdef"),qp=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),U1=new Set(",[]{}"),Rp=new Set(` ,[]{}
\r	`),ii=(t)=>!t||Rp.has(t);class v2{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(t,e=!1){if(t){if(typeof t!=="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+t:t,this.lineEndPos=null}this.atEnd=!e;let n=this.next??"stream";while(n&&(e||this.hasChars(1)))n=yield*this.parseNext(n)}atLineEnd(){let t=this.pos,e=this.buffer[t];while(e===" "||e==="\t")e=this.buffer[++t];if(!e||e==="#"||e===`
`)return!0;if(e==="\r")return this.buffer[t+1]===`
`;return!1}charAt(t){return this.buffer[this.pos+t]}continueScalar(t){let e=this.buffer[t];if(this.indentNext>0){let n=0;while(e===" ")e=this.buffer[++n+t];if(e==="\r"){let r=this.buffer[n+t+1];if(r===`
`||!r&&!this.atEnd)return t+n+1}return e===`
`||n>=this.indentNext||!e&&!this.atEnd?t+n:-1}if(e==="-"||e==="."){let n=this.buffer.substr(t,3);if((n==="---"||n==="...")&&Et(this.buffer[t+3]))return-1}return t}getLine(){let t=this.lineEndPos;if(typeof t!=="number"||t!==-1&&t<this.pos)t=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=t;if(t===-1)return this.atEnd?this.buffer.substring(this.pos):null;if(this.buffer[t-1]==="\r")t-=1;return this.buffer.substring(this.pos,t)}hasChars(t){return this.pos+t<=this.buffer.length}setNext(t){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=t,null}peek(t){return this.buffer.substr(this.pos,t)}*parseNext(t){switch(t){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let t=this.getLine();if(t===null)return this.setNext("stream");if(t[0]===R0.BOM)yield*this.pushCount(1),t=t.substring(1);if(t[0]==="%"){let e=t.length,n=t.indexOf("#");while(n!==-1){let i=t[n-1];if(i===" "||i==="\t"){e=n-1;break}else n=t.indexOf("#",n+1)}while(!0){let i=t[e-1];if(i===" "||i==="\t")e-=1;else break}let r=(yield*this.pushCount(e))+(yield*this.pushSpaces(!0));return yield*this.pushCount(t.length-r),this.pushNewline(),"stream"}if(this.atLineEnd()){let e=yield*this.pushSpaces(!0);return yield*this.pushCount(t.length-e),yield*this.pushNewline(),"stream"}return yield R0.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let t=this.charAt(0);if(!t&&!this.atEnd)return this.setNext("line-start");if(t==="-"||t==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let e=this.peek(3);if((e==="---"||e==="...")&&Et(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,e==="---"?"doc":"stream"}if(this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Et(this.charAt(1)))this.indentNext=this.indentValue;return yield*this.parseBlockStart()}*parseBlockStart(){let[t,e]=this.peek(2);if(!e&&!this.atEnd)return this.setNext("block-start");if((t==="-"||t==="?"||t===":")&&Et(e)){let n=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=n,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let t=this.getLine();if(t===null)return this.setNext("doc");let e=yield*this.pushIndicators();switch(t[e]){case"#":yield*this.pushCount(t.length-e);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(ii),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return e+=yield*this.parseBlockScalarHeader(),e+=yield*this.pushSpaces(!0),yield*this.pushCount(t.length-e),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let t,e,n=-1;do{if(t=yield*this.pushNewline(),t>0)e=yield*this.pushSpaces(!1),this.indentValue=n=e;else e=0;e+=yield*this.pushSpaces(!0)}while(t+e>0);let r=this.getLine();if(r===null)return this.setNext("flow");if(n!==-1&&n<this.indentNext&&r[0]!=="#"||n===0&&(r.startsWith("---")||r.startsWith("..."))&&Et(r[3])){if(!(n===this.indentNext-1&&this.flowLevel===1&&(r[0]==="]"||r[0]==="}")))return this.flowLevel=0,yield R0.FLOW_END,yield*this.parseLineStart()}let i=0;while(r[i]===",")i+=yield*this.pushCount(1),i+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(i+=yield*this.pushIndicators(),r[i]){case void 0:return"flow";case"#":return yield*this.pushCount(r.length-i),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(ii),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let s=this.charAt(1);if(this.flowKey||Et(s)||s===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let t=this.charAt(0),e=this.buffer.indexOf(t,this.pos+1);if(t==="'")while(e!==-1&&this.buffer[e+1]==="'")e=this.buffer.indexOf("'",e+2);else while(e!==-1){let i=0;while(this.buffer[e-1-i]==="\\")i+=1;if(i%2===0)break;e=this.buffer.indexOf('"',e+1)}let n=this.buffer.substring(0,e),r=n.indexOf(`
`,this.pos);if(r!==-1){while(r!==-1){let i=this.continueScalar(r+1);if(i===-1)break;r=n.indexOf(`
`,i)}if(r!==-1)e=r-(n[r-1]==="\r"?2:1)}if(e===-1){if(!this.atEnd)return this.setNext("quoted-scalar");e=this.buffer.length}return yield*this.pushToIndex(e+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let t=this.pos;while(!0){let e=this.buffer[++t];if(e==="+")this.blockScalarKeep=!0;else if(e>"0"&&e<="9")this.blockScalarIndent=Number(e)-1;else if(e!=="-")break}return yield*this.pushUntil((e)=>Et(e)||e==="#")}*parseBlockScalar(){let t=this.pos-1,e=0,n;t:for(let i=this.pos;n=this.buffer[i];++i)switch(n){case" ":e+=1;break;case`
`:t=i,e=0;break;case"\r":{let s=this.buffer[i+1];if(!s&&!this.atEnd)return this.setNext("block-scalar");if(s===`
`)break}default:break t}if(!n&&!this.atEnd)return this.setNext("block-scalar");if(e>=this.indentNext){if(this.blockScalarIndent===-1)this.indentNext=e;else this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let i=this.continueScalar(t+1);if(i===-1)break;t=this.buffer.indexOf(`
`,i)}while(t!==-1);if(t===-1){if(!this.atEnd)return this.setNext("block-scalar");t=this.buffer.length}}let r=t+1;n=this.buffer[r];while(n===" ")n=this.buffer[++r];if(n==="\t"){while(n==="\t"||n===" "||n==="\r"||n===`
`)n=this.buffer[++r];t=r-1}else if(!this.blockScalarKeep)do{let i=t-1,s=this.buffer[i];if(s==="\r")s=this.buffer[--i];let o=i;while(s===" ")s=this.buffer[--i];if(s===`
`&&i>=this.pos&&i+1+e>o)t=i;else break}while(!0);return yield R0.SCALAR,yield*this.pushToIndex(t+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let t=this.flowLevel>0,e=this.pos-1,n=this.pos-1,r;while(r=this.buffer[++n])if(r===":"){let i=this.buffer[n+1];if(Et(i)||t&&U1.has(i))break;e=n}else if(Et(r)){let i=this.buffer[n+1];if(r==="\r")if(i===`
`)n+=1,r=`
`,i=this.buffer[n+1];else e=n;if(i==="#"||t&&U1.has(i))break;if(r===`
`){let s=this.continueScalar(n+1);if(s===-1)break;n=Math.max(n,s-2)}}else{if(t&&U1.has(r))break;e=n}if(!r&&!this.atEnd)return this.setNext("plain-scalar");return yield R0.SCALAR,yield*this.pushToIndex(e+1,!0),t?"flow":"doc"}*pushCount(t){if(t>0)return yield this.buffer.substr(this.pos,t),this.pos+=t,t;return 0}*pushToIndex(t,e){let n=this.buffer.slice(this.pos,t);if(n)return yield n,this.pos+=n.length,n.length;else if(e)yield"";return 0}*pushIndicators(){let t=0;t:while(!0){switch(this.charAt(0)){case"!":t+=yield*this.pushTag(),t+=yield*this.pushSpaces(!0);continue t;case"&":t+=yield*this.pushUntil(ii),t+=yield*this.pushSpaces(!0);continue t;case"-":case"?":case":":{let e=this.flowLevel>0,n=this.charAt(1);if(Et(n)||e&&U1.has(n)){if(!e)this.indentNext=this.indentValue+1;else if(this.flowKey)this.flowKey=!1;t+=yield*this.pushCount(1),t+=yield*this.pushSpaces(!0);continue t}}}break t}return t}*pushTag(){if(this.charAt(1)==="<"){let t=this.pos+2,e=this.buffer[t];while(!Et(e)&&e!==">")e=this.buffer[++t];return yield*this.pushToIndex(e===">"?t+1:t,!1)}else{let t=this.pos+1,e=this.buffer[t];while(e)if(qp.has(e))e=this.buffer[++t];else if(e==="%"&&y2.has(this.buffer[t+1])&&y2.has(this.buffer[t+2]))e=this.buffer[t+=3];else break;return yield*this.pushToIndex(t,!1)}}*pushNewline(){let t=this.buffer[this.pos];if(t===`
`)return yield*this.pushCount(1);else if(t==="\r"&&this.charAt(1)===`
`)return yield*this.pushCount(2);else return 0}*pushSpaces(t){let e=this.pos-1,n;do n=this.buffer[++e];while(n===" "||t&&n==="\t");let r=e-this.pos;if(r>0)yield this.buffer.substr(this.pos,r),this.pos=e;return r}*pushUntil(t){let e=this.pos,n=this.buffer[e];while(!t(n))n=this.buffer[++e];return yield*this.pushToIndex(e,!1)}}Bp.Lexer=v2});var oi=v(function(Up){class w2{constructor(){this.lineStarts=[],this.addNewLine=(t)=>this.lineStarts.push(t),this.linePos=(t)=>{let e=0,n=this.lineStarts.length;while(e<n){let i=e+n>>1;if(this.lineStarts[i]<t)e=i+1;else n=i}if(this.lineStarts[e]===t)return{line:e+1,col:1};if(e===0)return{line:0,col:t};let r=this.lineStarts[e-1];return{line:e,col:t-r+1}}}}Up.LineCounter=w2});var li=v(function(Jp){var Hp=i1("process"),k2=V1(),Gp=si();function le(t,e){for(let n=0;n<t.length;++n)if(t[n].type===e)return!0;return!1}function b2(t){for(let e=0;e<t.length;++e)switch(t[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function x2(t){switch(t?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function K1(t){switch(t.type){case"document":return t.start;case"block-map":{let e=t.items[t.items.length-1];return e.sep??e.start}case"block-seq":return t.items[t.items.length-1].start;default:return[]}}function We(t){if(t.length===0)return[];let e=t.length;t:while(--e>=0)switch(t[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break t}while(t[++e]?.type==="space");return t.splice(e,t.length)}function H1(t,e){if(e.length<1e5)Array.prototype.push.apply(t,e);else for(let n=0;n<e.length;++n)t.push(e[n])}function _2(t){if(t.start.type==="flow-seq-start"){for(let e of t.items)if(e.sep&&!e.value&&!le(e.start,"explicit-key-ind")&&!le(e.sep,"map-value-ind")){if(e.key)e.value=e.key;if(delete e.key,x2(e.value))if(e.value.end)H1(e.value.end,e.sep);else e.value.end=e.sep;else H1(e.start,e.sep);delete e.sep}}}class $2{constructor(t){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Gp.Lexer,this.onNewLine=t}*parse(t,e=!1){if(this.onNewLine&&this.offset===0)this.onNewLine(0);for(let n of this.lexer.lex(t,e))yield*this.next(n);if(!e)yield*this.end()}*next(t){if(this.source=t,Hp.env.LOG_TOKENS)console.log("|",k2.prettyToken(t));if(this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=t.length;return}let e=k2.tokenType(t);if(!e){let n=`Not a YAML token: ${t}`;yield*this.pop({type:"error",offset:this.offset,message:n,source:t}),this.offset+=t.length}else if(e==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=e,yield*this.step(),e){case"newline":if(this.atNewLine=!0,this.indent=0,this.onNewLine)this.onNewLine(this.offset+t.length);break;case"space":if(this.atNewLine&&t[0]===" ")this.indent+=t.length;break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":if(this.atNewLine)this.indent+=t.length;break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=t.length}}*end(){while(this.stack.length>0)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let t=this.peek(1);if(this.type==="doc-end"&&t?.type!=="doc-end"){while(this.stack.length>0)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!t)return yield*this.stream();switch(t.type){case"document":return yield*this.document(t);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(t);case"block-scalar":return yield*this.blockScalar(t);case"block-map":return yield*this.blockMap(t);case"block-seq":return yield*this.blockSequence(t);case"flow-collection":return yield*this.flowCollection(t);case"doc-end":return yield*this.documentEnd(t)}yield*this.pop()}peek(t){return this.stack[this.stack.length-t]}*pop(t){let e=t??this.stack.pop();if(!e)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield e;else{let n=this.peek(1);if(e.type==="block-scalar")e.indent="indent"in n?n.indent:0;else if(e.type==="flow-collection"&&n.type==="document")e.indent=0;if(e.type==="flow-collection")_2(e);switch(n.type){case"document":n.value=e;break;case"block-scalar":n.props.push(e);break;case"block-map":{let r=n.items[n.items.length-1];if(r.value){n.items.push({start:[],key:e,sep:[]}),this.onKeyLine=!0;return}else if(r.sep)r.value=e;else{Object.assign(r,{key:e,sep:[]}),this.onKeyLine=!r.explicitKey;return}break}case"block-seq":{let r=n.items[n.items.length-1];if(r.value)n.items.push({start:[],value:e});else r.value=e;break}case"flow-collection":{let r=n.items[n.items.length-1];if(!r||r.value)n.items.push({start:[],key:e,sep:[]});else if(r.sep)r.value=e;else Object.assign(r,{key:e,sep:[]});return}default:yield*this.pop(),yield*this.pop(e)}if((n.type==="document"||n.type==="block-map"||n.type==="block-seq")&&(e.type==="block-map"||e.type==="block-seq")){let r=e.items[e.items.length-1];if(r&&!r.sep&&!r.value&&r.start.length>0&&b2(r.start)===-1&&(e.indent===0||r.start.every((i)=>i.type!=="comment"||i.indent<e.indent))){if(n.type==="document")n.end=r.start;else n.items.push({start:r.start});e.items.splice(-1,1)}}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let t={type:"document",offset:this.offset,start:[]};if(this.type==="doc-start")t.start.push(this.sourceToken);this.stack.push(t);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(t){if(t.value)return yield*this.lineEnd(t);switch(this.type){case"doc-start":{if(b2(t.start)!==-1)yield*this.pop(),yield*this.step();else t.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":t.start.push(this.sourceToken);return}let e=this.startBlockValue(t);if(e)this.stack.push(e);else yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(t){if(this.type==="map-value-ind"){let e=K1(this.peek(2)),n=We(e),r;if(t.end)r=t.end,r.push(this.sourceToken),delete t.end;else r=[this.sourceToken];let i={type:"block-map",offset:t.offset,indent:t.indent,items:[{start:n,key:t,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=i}else yield*this.lineEnd(t)}*blockScalar(t){switch(this.type){case"space":case"comment":case"newline":t.props.push(this.sourceToken);return;case"scalar":if(t.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let e=this.source.indexOf(`
`)+1;while(e!==0)this.onNewLine(this.offset+e),e=this.source.indexOf(`
`,e)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(t){let e=t.items[t.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,e.value){let n="end"in e.value?e.value.end:void 0;if((Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment")n?.push(this.sourceToken);else t.items.push({start:[this.sourceToken]})}else if(e.sep)e.sep.push(this.sourceToken);else e.start.push(this.sourceToken);return;case"space":case"comment":if(e.value)t.items.push({start:[this.sourceToken]});else if(e.sep)e.sep.push(this.sourceToken);else{if(this.atIndentedComment(e.start,t.indent)){let r=t.items[t.items.length-2]?.value?.end;if(Array.isArray(r)){H1(r,e.start),r.push(this.sourceToken),t.items.pop();return}}e.start.push(this.sourceToken)}return}if(this.indent>=t.indent){let n=!this.onKeyLine&&this.indent===t.indent,r=n&&(e.sep||e.explicitKey)&&this.type!=="seq-item-ind",i=[];if(r&&e.sep&&!e.value){let s=[];for(let o=0;o<e.sep.length;++o){let l=e.sep[o];switch(l.type){case"newline":s.push(o);break;case"space":break;case"comment":if(l.indent>t.indent)s.length=0;break;default:s.length=0}}if(s.length>=2)i=e.sep.splice(s[1])}switch(this.type){case"anchor":case"tag":if(r||e.value)i.push(this.sourceToken),t.items.push({start:i}),this.onKeyLine=!0;else if(e.sep)e.sep.push(this.sourceToken);else e.start.push(this.sourceToken);return;case"explicit-key-ind":if(!e.sep&&!e.explicitKey)e.start.push(this.sourceToken),e.explicitKey=!0;else if(r||e.value)i.push(this.sourceToken),t.items.push({start:i,explicitKey:!0});else this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]});this.onKeyLine=!0;return;case"map-value-ind":if(e.explicitKey)if(!e.sep)if(le(e.start,"newline"))Object.assign(e,{key:null,sep:[this.sourceToken]});else{let s=We(e.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]})}else if(e.value)t.items.push({start:[],key:null,sep:[this.sourceToken]});else if(le(e.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:i,key:null,sep:[this.sourceToken]}]});else if(x2(e.key)&&!le(e.sep,"newline")){let s=We(e.start),{key:o,sep:l}=e;l.push(this.sourceToken),delete e.key,delete e.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:o,sep:l}]})}else if(i.length>0)e.sep=e.sep.concat(i,this.sourceToken);else e.sep.push(this.sourceToken);else if(!e.sep)Object.assign(e,{key:null,sep:[this.sourceToken]});else if(e.value||r)t.items.push({start:i,key:null,sep:[this.sourceToken]});else if(le(e.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]});else e.sep.push(this.sourceToken);this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let s=this.flowScalar(this.type);if(r||e.value)t.items.push({start:i,key:s,sep:[]}),this.onKeyLine=!0;else if(e.sep)this.stack.push(s);else Object.assign(e,{key:s,sep:[]}),this.onKeyLine=!0;return}default:{let s=this.startBlockValue(t);if(s){if(s.type==="block-seq"){if(!e.explicitKey&&e.sep&&!le(e.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else if(n)t.items.push({start:i});this.stack.push(s);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(t){let e=t.items[t.items.length-1];switch(this.type){case"newline":if(e.value){let n="end"in e.value?e.value.end:void 0;if((Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment")n?.push(this.sourceToken);else t.items.push({start:[this.sourceToken]})}else e.start.push(this.sourceToken);return;case"space":case"comment":if(e.value)t.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(e.start,t.indent)){let r=t.items[t.items.length-2]?.value?.end;if(Array.isArray(r)){H1(r,e.start),r.push(this.sourceToken),t.items.pop();return}}e.start.push(this.sourceToken)}return;case"anchor":case"tag":if(e.value||this.indent<=t.indent)break;e.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==t.indent)break;if(e.value||le(e.start,"seq-item-ind"))t.items.push({start:[this.sourceToken]});else e.start.push(this.sourceToken);return}if(this.indent>t.indent){let n=this.startBlockValue(t);if(n){this.stack.push(n);return}}yield*this.pop(),yield*this.step()}*flowCollection(t){let e=t.items[t.items.length-1];if(this.type==="flow-error-end"){let n;do yield*this.pop(),n=this.peek(1);while(n?.type==="flow-collection")}else if(t.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":if(!e||e.sep)t.items.push({start:[this.sourceToken]});else e.start.push(this.sourceToken);return;case"map-value-ind":if(!e||e.value)t.items.push({start:[],key:null,sep:[this.sourceToken]});else if(e.sep)e.sep.push(this.sourceToken);else Object.assign(e,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":if(!e||e.value)t.items.push({start:[this.sourceToken]});else if(e.sep)e.sep.push(this.sourceToken);else e.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let r=this.flowScalar(this.type);if(!e||e.value)t.items.push({start:[],key:r,sep:[]});else if(e.sep)this.stack.push(r);else Object.assign(e,{key:r,sep:[]});return}case"flow-map-end":case"flow-seq-end":t.end.push(this.sourceToken);return}let n=this.startBlockValue(t);if(n)this.stack.push(n);else yield*this.pop(),yield*this.step()}else{let n=this.peek(2);if(n.type==="block-map"&&(this.type==="map-value-ind"&&n.indent===t.indent||this.type==="newline"&&!n.items[n.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&n.type!=="flow-collection"){let r=K1(n),i=We(r);_2(t);let s=t.end.splice(1,t.end.length);s.push(this.sourceToken);let o={type:"block-map",offset:t.offset,indent:t.indent,items:[{start:i,key:t,sep:s}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(t)}}flowScalar(t){if(this.onNewLine){let e=this.source.indexOf(`
`)+1;while(e!==0)this.onNewLine(this.offset+e),e=this.source.indexOf(`
`,e)+1}return{type:t,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(t){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let e=K1(t),n=We(e);return n.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;let e=K1(t),n=We(e);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(t,e){if(this.type!=="comment")return!1;if(this.indent<=e)return!1;return t.every((n)=>n.type==="newline"||n.type==="space")}*documentEnd(t){if(this.type!=="doc-mode"){if(t.end)t.end.push(this.sourceToken);else t.end=[this.sourceToken];if(this.type==="newline")yield*this.pop()}}*lineEnd(t){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:if(t.end)t.end.push(this.sourceToken);else t.end=[this.sourceToken];if(this.type==="newline")yield*this.pop()}}}Jp.Parser=$2});var F2=v(function(rh){var L2=Wr(),Wp=j0(),B0=D0(),Zp=or(),Qp=q(),Xp=oi(),M2=li();function C2(t){let e=t.prettyErrors!==!1;return{lineCounter:t.lineCounter||e&&new Xp.LineCounter||null,prettyErrors:e}}function th(t,e={}){let{lineCounter:n,prettyErrors:r}=C2(e),i=new M2.Parser(n?.addNewLine),s=new L2.Composer(e),o=Array.from(s.compose(i.parse(t)));if(r&&n)for(let l of o)l.errors.forEach(B0.prettifyError(t,n)),l.warnings.forEach(B0.prettifyError(t,n));if(o.length>0)return o;return Object.assign([],{empty:!0},s.streamInfo())}function S2(t,e={}){let{lineCounter:n,prettyErrors:r}=C2(e),i=new M2.Parser(n?.addNewLine),s=new L2.Composer(e),o=null;for(let l of s.compose(i.parse(t),!0,t.length))if(!o)o=l;else if(o.options.logLevel!=="silent"){o.errors.push(new B0.YAMLParseError(l.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}if(r&&n)o.errors.forEach(B0.prettifyError(t,n)),o.warnings.forEach(B0.prettifyError(t,n));return o}function eh(t,e,n){let r=void 0;if(typeof e==="function")r=e;else if(n===void 0&&e&&typeof e==="object")n=e;let i=S2(t,n);if(!i)return null;if(i.warnings.forEach((s)=>Zp.warn(i.options.logLevel,s)),i.errors.length>0)if(i.options.logLevel!=="silent")throw i.errors[0];else i.errors=[];return i.toJS(Object.assign({reviver:r},n))}function nh(t,e,n){let r=null;if(typeof e==="function"||Array.isArray(e))r=e;else if(n===void 0&&e)n=e;if(typeof n==="string")n=n.length;if(typeof n==="number"){let i=Math.round(n);n=i<1?void 0:i>8?{indent:8}:{indent:i}}if(t===void 0){let{keepUndefined:i}=n??e??{};if(!i)return}if(Qp.isDocument(t)&&!r)return t.toString(n);return new Wp.Document(t,r,n).toString(n)}rh.parse=eh;rh.parseAllDocuments=th;rh.parseDocument=S2;rh.stringify=nh});var K0=v(function(rl){Object.defineProperty(rl,"__esModule",{value:!0});rl.regexpCode=rl.getEsmExportName=rl.getProperty=rl.safeStringify=rl.stringify=rl.strConcat=rl.addCodeArg=rl.str=rl._=rl.nil=rl._Code=rl.Name=rl.IDENTIFIER=rl._CodeOrName=void 0;class tn{}rl._CodeOrName=tn;rl.IDENTIFIER=/^[a-z$_][a-z$_0-9]*$/i;class t0 extends tn{constructor(t){super();if(!rl.IDENTIFIER.test(t))throw Error("CodeGen: name must be a valid identifier");this.str=t}toString(){return this.str}emptyStr(){return!1}get names(){return{[this.str]:1}}}rl.Name=t0;class Pt extends tn{constructor(t){super();this._items=typeof t==="string"?[t]:t}toString(){return this.str}emptyStr(){if(this._items.length>1)return!1;let t=this._items[0];return t===""||t==='""'}get str(){var t;return(t=this._str)!==null&&t!==void 0?t:this._str=this._items.reduce((e,n)=>`${e}${n}`,"")}get names(){var t;return(t=this._names)!==null&&t!==void 0?t:this._names=this._items.reduce((e,n)=>{if(n instanceof t0)e[n.str]=(e[n.str]||0)+1;return e},{})}}rl._Code=Pt;rl.nil=new Pt("");function el(t,...e){let n=[t[0]],r=0;while(r<e.length)Li(n,e[r]),n.push(t[++r]);return new Pt(n)}rl._=el;var $i=new Pt("+");function nl(t,...e){let n=[U0(t[0])],r=0;while(r<e.length)n.push($i),Li(n,e[r]),n.push($i,U0(t[++r]));return Fg(n),new Pt(n)}rl.str=nl;function Li(t,e){if(e instanceof Pt)t.push(...e._items);else if(e instanceof t0)t.push(e);else t.push(Pg(e))}rl.addCodeArg=Li;function Fg(t){let e=1;while(e<t.length-1){if(t[e]===$i){let n=Eg(t[e-1],t[e+1]);if(n!==void 0){t.splice(e-1,3,n);continue}t[e++]="+"}e++}}function Eg(t,e){if(e==='""')return t;if(t==='""')return e;if(typeof t=="string"){if(e instanceof t0||t[t.length-1]!=='"')return;if(typeof e!="string")return`${t.slice(0,-1)}${e}"`;if(e[0]==='"')return t.slice(0,-1)+e.slice(1);return}if(typeof e=="string"&&e[0]==='"'&&!(t instanceof t0))return`"${t}${e.slice(1)}`;return}function Ag(t,e){return e.emptyStr()?t:t.emptyStr()?e:nl`${t}${e}`}rl.strConcat=Ag;function Pg(t){return typeof t=="number"||typeof t=="boolean"||t===null?t:U0(Array.isArray(t)?t.join(","):t)}function Og(t){return new Pt(U0(t))}rl.stringify=Og;function U0(t){return JSON.stringify(t).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}rl.safeStringify=U0;function Ng(t){return typeof t=="string"&&rl.IDENTIFIER.test(t)?new Pt(`.${t}`):el`[${t}]`}rl.getProperty=Ng;function Tg(t){if(typeof t=="string"&&rl.IDENTIFIER.test(t))return new Pt(`${t}`);throw Error(`CodeGen: invalid export name: ${t}, use explicit $id name mapping`)}rl.getEsmExportName=Tg;function jg(t){return new Pt(t.toString())}rl.regexpCode=jg});var Fi=v(function(ll){Object.defineProperty(ll,"__esModule",{value:!0});ll.ValueScope=ll.ValueScopeName=ll.Scope=ll.varKinds=ll.UsedValueState=void 0;var J=K0();class sl extends Error{constructor(t){super(`CodeGen: "code" for ${t} not defined`);this.value=t.value}}var nn;(function(t){t[t.Started=0]="Started",t[t.Completed=1]="Completed"})(nn||(ll.UsedValueState=nn={}));ll.varKinds={const:new J.Name("const"),let:new J.Name("let"),var:new J.Name("var")};class Ci{constructor({prefixes:t,parent:e}={}){this._names={},this._prefixes=t,this._parent=e}toName(t){return t instanceof J.Name?t:this.name(t)}name(t){return new J.Name(this._newName(t))}_newName(t){let e=this._names[t]||this._nameGroup(t);return`${t}${e.index++}`}_nameGroup(t){var e,n;if(((n=(e=this._parent)===null||e===void 0?void 0:e._prefixes)===null||n===void 0?void 0:n.has(t))||this._prefixes&&!this._prefixes.has(t))throw Error(`CodeGen: prefix "${t}" is not allowed in this scope`);return this._names[t]={prefix:t,index:0}}}ll.Scope=Ci;class Si extends J.Name{constructor(t,e){super(e);this.prefix=t}setValue(t,{property:e,itemIndex:n}){this.value=t,this.scopePath=J._`.${new J.Name(e)}[${n}]`}}ll.ValueScopeName=Si;var Yg=J._`\n`;class ol extends Ci{constructor(t){super(t);this._values={},this._scope=t.scope,this.opts={...t,_n:t.lines?Yg:J.nil}}get(){return this._scope}name(t){return new Si(t,this._newName(t))}value(t,e){var n;if(e.ref===void 0)throw Error("CodeGen: ref must be passed in value");let r=this.toName(t),{prefix:i}=r,s=(n=e.key)!==null&&n!==void 0?n:e.ref,o=this._values[i];if(o){let c=o.get(s);if(c)return c}else o=this._values[i]=new Map;o.set(s,r);let l=this._scope[i]||(this._scope[i]=[]),a=l.length;return l[a]=e.ref,r.setValue(e,{property:i,itemIndex:a}),r}getValue(t,e){let n=this._values[t];if(!n)return;return n.get(e)}scopeRefs(t,e=this._values){return this._reduceValues(e,(n)=>{if(n.scopePath===void 0)throw Error(`CodeGen: name "${n}" has no value`);return J._`${t}${n.scopePath}`})}scopeCode(t=this._values,e,n){return this._reduceValues(t,(r)=>{if(r.value===void 0)throw Error(`CodeGen: name "${r}" has no value`);return r.value.code},e,n)}_reduceValues(t,e,n={},r){let i=J.nil;for(let s in t){let o=t[s];if(!o)continue;let l=n[s]=n[s]||new Map;o.forEach((a)=>{if(l.has(a))return;l.set(a,nn.Started);let c=e(a);if(c){let f=this.opts.es5?ll.varKinds.var:ll.varKinds.const;i=J._`${i}${f} ${a} = ${c};${this.opts._n}`}else if(c=r===null||r===void 0?void 0:r(a))i=J._`${i}${c}${this.opts._n}`;else throw new sl(a);l.set(a,nn.Completed)})}return i}}ll.ValueScope=ol});var D=v(function(dt){Object.defineProperty(dt,"__esModule",{value:!0});dt.or=dt.and=dt.not=dt.CodeGen=dt.operators=dt.varKinds=dt.ValueScopeName=dt.ValueScope=dt.Scope=dt.Name=dt.regexpCode=dt.stringify=dt.getProperty=dt.nil=dt.strConcat=dt.str=dt._=void 0;var F=K0(),Q=Fi(),ce=K0();Object.defineProperty(dt,"_",{enumerable:!0,get:function(){return ce._}});Object.defineProperty(dt,"str",{enumerable:!0,get:function(){return ce.str}});Object.defineProperty(dt,"strConcat",{enumerable:!0,get:function(){return ce.strConcat}});Object.defineProperty(dt,"nil",{enumerable:!0,get:function(){return ce.nil}});Object.defineProperty(dt,"getProperty",{enumerable:!0,get:function(){return ce.getProperty}});Object.defineProperty(dt,"stringify",{enumerable:!0,get:function(){return ce.stringify}});Object.defineProperty(dt,"regexpCode",{enumerable:!0,get:function(){return ce.regexpCode}});Object.defineProperty(dt,"Name",{enumerable:!0,get:function(){return ce.Name}});var cn=Fi();Object.defineProperty(dt,"Scope",{enumerable:!0,get:function(){return cn.Scope}});Object.defineProperty(dt,"ValueScope",{enumerable:!0,get:function(){return cn.ValueScope}});Object.defineProperty(dt,"ValueScopeName",{enumerable:!0,get:function(){return cn.ValueScopeName}});Object.defineProperty(dt,"varKinds",{enumerable:!0,get:function(){return cn.varKinds}});dt.operators={GT:new F._Code(">"),GTE:new F._Code(">="),LT:new F._Code("<"),LTE:new F._Code("<="),EQ:new F._Code("==="),NEQ:new F._Code("!=="),NOT:new F._Code("!"),OR:new F._Code("||"),AND:new F._Code("&&"),ADD:new F._Code("+")};class ue{optimizeNodes(){return this}optimizeNames(t,e){return this}}class cl extends ue{constructor(t,e,n){super();this.varKind=t,this.name=e,this.rhs=n}render({es5:t,_n:e}){let n=t?Q.varKinds.var:this.varKind,r=this.rhs===void 0?"":` = ${this.rhs}`;return`${n} ${this.name}${r};`+e}optimizeNames(t,e){if(!t[this.name.str])return;if(this.rhs)this.rhs=n0(this.rhs,t,e);return this}get names(){return this.rhs instanceof F._CodeOrName?this.rhs.names:{}}}class Pi extends ue{constructor(t,e,n){super();this.lhs=t,this.rhs=e,this.sideEffects=n}render({_n:t}){return`${this.lhs} = ${this.rhs};`+t}optimizeNames(t,e){if(this.lhs instanceof F.Name&&!t[this.lhs.str]&&!this.sideEffects)return;return this.rhs=n0(this.rhs,t,e),this}get names(){let t=this.lhs instanceof F.Name?{}:{...this.lhs.names};return an(t,this.rhs)}}class ul extends Pi{constructor(t,e,n,r){super(t,n,r);this.op=e}render({_n:t}){return`${this.lhs} ${this.op}= ${this.rhs};`+t}}class fl extends ue{constructor(t){super();this.label=t,this.names={}}render({_n:t}){return`${this.label}:`+t}}class dl extends ue{constructor(t){super();this.label=t,this.names={}}render({_n:t}){return`break${this.label?` ${this.label}`:""};`+t}}class pl extends ue{constructor(t){super();this.error=t}render({_n:t}){return`throw ${this.error};`+t}get names(){return this.error.names}}class hl extends ue{constructor(t){super();this.code=t}render({_n:t}){return`${this.code};`+t}optimizeNodes(){return`${this.code}`?this:void 0}optimizeNames(t,e){return this.code=n0(this.code,t,e),this}get names(){return this.code instanceof F._CodeOrName?this.code.names:{}}}class un extends ue{constructor(t=[]){super();this.nodes=t}render(t){return this.nodes.reduce((e,n)=>e+n.render(t),"")}optimizeNodes(){let{nodes:t}=this,e=t.length;while(e--){let n=t[e].optimizeNodes();if(Array.isArray(n))t.splice(e,1,...n);else if(n)t[e]=n;else t.splice(e,1)}return t.length>0?this:void 0}optimizeNames(t,e){let{nodes:n}=this,r=n.length;while(r--){let i=n[r];if(i.optimizeNames(t,e))continue;Xg(t,i.names),n.splice(r,1)}return n.length>0?this:void 0}get names(){return this.nodes.reduce((t,e)=>Ne(t,e.names),{})}}class fe extends un{render(t){return"{"+t._n+super.render(t)+"}"+t._n}}class gl extends un{}class H0 extends fe{}H0.kind="else";class Qt extends fe{constructor(t,e){super(e);this.condition=t}render(t){let e=`if(${this.condition})`+super.render(t);if(this.else)e+="else "+this.else.render(t);return e}optimizeNodes(){super.optimizeNodes();let t=this.condition;if(t===!0)return this.nodes;let e=this.else;if(e){let n=e.optimizeNodes();e=this.else=Array.isArray(n)?new H0(n):n}if(e){if(t===!1)return e instanceof Qt?e:e.nodes;if(this.nodes.length)return this;return new Qt(kl(t),e instanceof Qt?[e]:e.nodes)}if(t===!1||!this.nodes.length)return;return this}optimizeNames(t,e){var n;if(this.else=(n=this.else)===null||n===void 0?void 0:n.optimizeNames(t,e),!(super.optimizeNames(t,e)||this.else))return;return this.condition=n0(this.condition,t,e),this}get names(){let t=super.names;if(an(t,this.condition),this.else)Ne(t,this.else.names);return t}}Qt.kind="if";class e0 extends fe{}e0.kind="for";class ml extends e0{constructor(t){super();this.iteration=t}render(t){return`for(${this.iteration})`+super.render(t)}optimizeNames(t,e){if(!super.optimizeNames(t,e))return;return this.iteration=n0(this.iteration,t,e),this}get names(){return Ne(super.names,this.iteration.names)}}class yl extends e0{constructor(t,e,n,r){super();this.varKind=t,this.name=e,this.from=n,this.to=r}render(t){let e=t.es5?Q.varKinds.var:this.varKind,{name:n,from:r,to:i}=this;return`for(${e} ${n}=${r}; ${n}<${i}; ${n}++)`+super.render(t)}get names(){let t=an(super.names,this.from);return an(t,this.to)}}class Ei extends e0{constructor(t,e,n,r){super();this.loop=t,this.varKind=e,this.name=n,this.iterable=r}render(t){return`for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})`+super.render(t)}optimizeNames(t,e){if(!super.optimizeNames(t,e))return;return this.iterable=n0(this.iterable,t,e),this}get names(){return Ne(super.names,this.iterable.names)}}class rn extends fe{constructor(t,e,n){super();this.name=t,this.args=e,this.async=n}render(t){return`${this.async?"async ":""}function ${this.name}(${this.args})`+super.render(t)}}rn.kind="func";class sn extends un{render(t){return"return "+super.render(t)}}sn.kind="return";class vl extends fe{render(t){let e="try"+super.render(t);if(this.catch)e+=this.catch.render(t);if(this.finally)e+=this.finally.render(t);return e}optimizeNodes(){var t,e;return super.optimizeNodes(),(t=this.catch)===null||t===void 0||t.optimizeNodes(),(e=this.finally)===null||e===void 0||e.optimizeNodes(),this}optimizeNames(t,e){var n,r;return super.optimizeNames(t,e),(n=this.catch)===null||n===void 0||n.optimizeNames(t,e),(r=this.finally)===null||r===void 0||r.optimizeNames(t,e),this}get names(){let t=super.names;if(this.catch)Ne(t,this.catch.names);if(this.finally)Ne(t,this.finally.names);return t}}class on extends fe{constructor(t){super();this.error=t}render(t){return`catch(${this.error})`+super.render(t)}}on.kind="catch";class ln extends fe{render(t){return"finally"+super.render(t)}}ln.kind="finally";class wl{constructor(t,e={}){this._values={},this._blockStarts=[],this._constants={},this.opts={...e,_n:e.lines?`
`:""},this._extScope=t,this._scope=new Q.Scope({parent:t}),this._nodes=[new gl]}toString(){return this._root.render(this.opts)}name(t){return this._scope.name(t)}scopeName(t){return this._extScope.name(t)}scopeValue(t,e){let n=this._extScope.value(t,e);return(this._values[n.prefix]||(this._values[n.prefix]=new Set)).add(n),n}getScopeValue(t,e){return this._extScope.getValue(t,e)}scopeRefs(t){return this._extScope.scopeRefs(t,this._values)}scopeCode(){return this._extScope.scopeCode(this._values)}_def(t,e,n,r){let i=this._scope.toName(e);if(n!==void 0&&r)this._constants[i.str]=n;return this._leafNode(new cl(t,i,n)),i}const(t,e,n){return this._def(Q.varKinds.const,t,e,n)}let(t,e,n){return this._def(Q.varKinds.let,t,e,n)}var(t,e,n){return this._def(Q.varKinds.var,t,e,n)}assign(t,e,n){return this._leafNode(new Pi(t,e,n))}add(t,e){return this._leafNode(new ul(t,dt.operators.ADD,e))}code(t){if(typeof t=="function")t();else if(t!==F.nil)this._leafNode(new hl(t));return this}object(...t){let e=["{"];for(let[n,r]of t){if(e.length>1)e.push(",");if(e.push(n),n!==r||this.opts.es5)e.push(":"),F.addCodeArg(e,r)}return e.push("}"),new F._Code(e)}if(t,e,n){if(this._blockNode(new Qt(t)),e&&n)this.code(e).else().code(n).endIf();else if(e)this.code(e).endIf();else if(n)throw Error('CodeGen: "else" body without "then" body');return this}elseIf(t){return this._elseNode(new Qt(t))}else(){return this._elseNode(new H0)}endIf(){return this._endBlockNode(Qt,H0)}_for(t,e){if(this._blockNode(t),e)this.code(e).endFor();return this}for(t,e){return this._for(new ml(t),e)}forRange(t,e,n,r,i=this.opts.es5?Q.varKinds.var:Q.varKinds.let){let s=this._scope.toName(t);return this._for(new yl(i,s,e,n),()=>r(s))}forOf(t,e,n,r=Q.varKinds.const){let i=this._scope.toName(t);if(this.opts.es5){let s=e instanceof F.Name?e:this.var("_arr",e);return this.forRange("_i",0,F._`${s}.length`,(o)=>{this.var(i,F._`${s}[${o}]`),n(i)})}return this._for(new Ei("of",r,i,e),()=>n(i))}forIn(t,e,n,r=this.opts.es5?Q.varKinds.var:Q.varKinds.const){if(this.opts.ownProperties)return this.forOf(t,F._`Object.keys(${e})`,n);let i=this._scope.toName(t);return this._for(new Ei("in",r,i,e),()=>n(i))}endFor(){return this._endBlockNode(e0)}label(t){return this._leafNode(new fl(t))}break(t){return this._leafNode(new dl(t))}return(t){let e=new sn;if(this._blockNode(e),this.code(t),e.nodes.length!==1)throw Error('CodeGen: "return" should have one node');return this._endBlockNode(sn)}try(t,e,n){if(!e&&!n)throw Error('CodeGen: "try" without "catch" and "finally"');let r=new vl;if(this._blockNode(r),this.code(t),e){let i=this.name("e");this._currNode=r.catch=new on(i),e(i)}if(n)this._currNode=r.finally=new ln,this.code(n);return this._endBlockNode(on,ln)}throw(t){return this._leafNode(new pl(t))}block(t,e){if(this._blockStarts.push(this._nodes.length),t)this.code(t).endBlock(e);return this}endBlock(t){let e=this._blockStarts.pop();if(e===void 0)throw Error("CodeGen: not in self-balancing block");let n=this._nodes.length-e;if(n<0||t!==void 0&&n!==t)throw Error(`CodeGen: wrong number of nodes: ${n} vs ${t} expected`);return this._nodes.length=e,this}func(t,e=F.nil,n,r){if(this._blockNode(new rn(t,e,n)),r)this.code(r).endFunc();return this}endFunc(){return this._endBlockNode(rn)}optimize(t=1){while(t-- >0)this._root.optimizeNodes(),this._root.optimizeNames(this._root.names,this._constants)}_leafNode(t){return this._currNode.nodes.push(t),this}_blockNode(t){this._currNode.nodes.push(t),this._nodes.push(t)}_endBlockNode(t,e){let n=this._currNode;if(n instanceof t||e&&n instanceof e)return this._nodes.pop(),this;throw Error(`CodeGen: not in block "${e?`${t.kind}/${e.kind}`:t.kind}"`)}_elseNode(t){let e=this._currNode;if(!(e instanceof Qt))throw Error('CodeGen: "else" without "if"');return this._currNode=e.else=t,this}get _root(){return this._nodes[0]}get _currNode(){let t=this._nodes;return t[t.length-1]}set _currNode(t){let e=this._nodes;e[e.length-1]=t}}dt.CodeGen=wl;function Ne(t,e){for(let n in e)t[n]=(t[n]||0)+(e[n]||0);return t}function an(t,e){return e instanceof F._CodeOrName?Ne(t,e.names):t}function n0(t,e,n){if(t instanceof F.Name)return r(t);if(!i(t))return t;return new F._Code(t._items.reduce((s,o)=>{if(o instanceof F.Name)o=r(o);if(o instanceof F._Code)s.push(...o._items);else s.push(o);return s},[]));function r(s){let o=n[s.str];if(o===void 0||e[s.str]!==1)return s;return delete e[s.str],o}function i(s){return s instanceof F._Code&&s._items.some((o)=>o instanceof F.Name&&e[o.str]===1&&n[o.str]!==void 0)}}function Xg(t,e){for(let n in e)t[n]=(t[n]||0)-(e[n]||0)}function kl(t){return typeof t=="boolean"||typeof t=="number"||t===null?!t:F._`!${Ai(t)}`}dt.not=kl;var tm=bl(dt.operators.AND);function em(...t){return t.reduce(tm)}dt.and=em;var nm=bl(dt.operators.OR);function rm(...t){return t.reduce(nm)}dt.or=rm;function bl(t){return(e,n)=>e===F.nil?n:n===F.nil?e:F._`${Ai(e)} ${t} ${Ai(n)}`}function Ai(t){return t instanceof F.Name?t:F._`(${t})`}});var z=v(function(Al){Object.defineProperty(Al,"__esModule",{value:!0});Al.checkStrictMode=Al.getErrorPath=Al.Type=Al.useFunc=Al.setEvaluated=Al.evaluatedPropsToName=Al.mergeEvaluated=Al.eachItem=Al.unescapeJsonPointer=Al.escapeJsonPointer=Al.escapeFragment=Al.unescapeFragment=Al.schemaRefOrVal=Al.schemaHasRulesButRef=Al.schemaHasRules=Al.checkUnknownRules=Al.alwaysValidSchema=Al.toHash=void 0;var P=D(),Ll=K0();function lm(t){let e={};for(let n of t)e[n]=!0;return e}Al.toHash=lm;function am(t,e){if(typeof e=="boolean")return e;if(Object.keys(e).length===0)return!0;return Ml(t,e),!Cl(e,t.self.RULES.all)}Al.alwaysValidSchema=am;function Ml(t,e=t.schema){let{opts:n,self:r}=t;if(!n.strictSchema)return;if(typeof e==="boolean")return;let i=r.RULES.keywords;for(let s in e)if(!i[s])El(t,`unknown keyword: "${s}"`)}Al.checkUnknownRules=Ml;function Cl(t,e){if(typeof t=="boolean")return!t;for(let n in t)if(e[n])return!0;return!1}Al.schemaHasRules=Cl;function cm(t,e){if(typeof t=="boolean")return!t;for(let n in t)if(n!=="$ref"&&e.all[n])return!0;return!1}Al.schemaHasRulesButRef=cm;function um({topSchemaRef:t,schemaPath:e},n,r,i){if(!i){if(typeof n=="number"||typeof n=="boolean")return n;if(typeof n=="string")return P._`${n}`}return P._`${t}${e}${P.getProperty(r)}`}Al.schemaRefOrVal=um;function fm(t){return Sl(decodeURIComponent(t))}Al.unescapeFragment=fm;function dm(t){return encodeURIComponent(Ni(t))}Al.escapeFragment=dm;function Ni(t){if(typeof t=="number")return`${t}`;return t.replace(/~/g,"~0").replace(/\//g,"~1")}Al.escapeJsonPointer=Ni;function Sl(t){return t.replace(/~1/g,"/").replace(/~0/g,"~")}Al.unescapeJsonPointer=Sl;function pm(t,e){if(Array.isArray(t))for(let n of t)e(n);else e(t)}Al.eachItem=pm;function xl({mergeNames:t,mergeToName:e,mergeValues:n,resultToName:r}){return(i,s,o,l)=>{let a=o===void 0?s:o instanceof P.Name?(s instanceof P.Name?t(i,s,o):e(i,s,o),o):s instanceof P.Name?(e(i,o,s),s):n(s,o);return l===P.Name&&!(a instanceof P.Name)?r(i,a):a}}Al.mergeEvaluated={props:xl({mergeNames:(t,e,n)=>t.if(P._`${n} !== true && ${e} !== undefined`,()=>{t.if(P._`${e} === true`,()=>t.assign(n,!0),()=>t.assign(n,P._`${n} || {}`).code(P._`Object.assign(${n}, ${e})`))}),mergeToName:(t,e,n)=>t.if(P._`${n} !== true`,()=>{if(e===!0)t.assign(n,!0);else t.assign(n,P._`${n} || {}`),Ti(t,n,e)}),mergeValues:(t,e)=>t===!0?!0:{...t,...e},resultToName:Fl}),items:xl({mergeNames:(t,e,n)=>t.if(P._`${n} !== true && ${e} !== undefined`,()=>t.assign(n,P._`${e} === true ? true : ${n} > ${e} ? ${n} : ${e}`)),mergeToName:(t,e,n)=>t.if(P._`${n} !== true`,()=>t.assign(n,e===!0?!0:P._`${n} > ${e} ? ${n} : ${e}`)),mergeValues:(t,e)=>t===!0?!0:Math.max(t,e),resultToName:(t,e)=>t.var("items",e)})};function Fl(t,e){if(e===!0)return t.var("props",!0);let n=t.var("props",P._`{}`);if(e!==void 0)Ti(t,n,e);return n}Al.evaluatedPropsToName=Fl;function Ti(t,e,n){Object.keys(n).forEach((r)=>t.assign(P._`${e}${P.getProperty(r)}`,!0))}Al.setEvaluated=Ti;var $l={};function hm(t,e){return t.scopeValue("func",{ref:e,code:$l[e.code]||($l[e.code]=new Ll._Code(e.code))})}Al.useFunc=hm;var Oi;(function(t){t[t.Num=0]="Num",t[t.Str=1]="Str"})(Oi||(Al.Type=Oi={}));function gm(t,e,n){if(t instanceof P.Name){let r=e===Oi.Num;return n?r?P._`"[" + ${t} + "]"`:P._`"['" + ${t} + "']"`:r?P._`"/" + ${t}`:P._`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`}return n?P.getProperty(t).toString():"/"+Ni(t)}Al.getErrorPath=gm;function El(t,e,n=t.opts.strictSchema){if(!n)return;if(e=`strict mode: ${e}`,n===!0)throw Error(e);t.self.logger.warn(e)}Al.checkStrictMode=El});var $t=v(function(Ol){Object.defineProperty(Ol,"__esModule",{value:!0});var B=D(),Om={data:new B.Name("data"),valCxt:new B.Name("valCxt"),instancePath:new B.Name("instancePath"),parentData:new B.Name("parentData"),parentDataProperty:new B.Name("parentDataProperty"),rootData:new B.Name("rootData"),dynamicAnchors:new B.Name("dynamicAnchors"),vErrors:new B.Name("vErrors"),errors:new B.Name("errors"),this:new B.Name("this"),self:new B.Name("self"),scope:new B.Name("scope"),json:new B.Name("json"),jsonPos:new B.Name("jsonPos"),jsonLen:new B.Name("jsonLen"),jsonPart:new B.Name("jsonPart")};Ol.default=Om});var G0=v(function(Dl){Object.defineProperty(Dl,"__esModule",{value:!0});Dl.extendErrors=Dl.resetErrorsCount=Dl.reportExtraError=Dl.reportError=Dl.keyword$DataError=Dl.keywordError=void 0;var E=D(),de=z(),ct=$t();Dl.keywordError={message:({keyword:t})=>E.str`must pass "${t}" keyword validation`};Dl.keyword$DataError={message:({keyword:t,schemaType:e})=>e?E.str`"${t}" keyword must be ${e} ($data)`:E.str`"${t}" keyword is invalid ($data)`};function Tm(t,e=Dl.keywordError,n,r){let{it:i}=t,{gen:s,compositeRule:o,allErrors:l}=i,a=jl(t,e,n);if(r!==null&&r!==void 0?r:o||l)Nl(s,a);else Tl(i,E._`[${a}]`)}Dl.reportError=Tm;function jm(t,e=Dl.keywordError,n){let{it:r}=t,{gen:i,compositeRule:s,allErrors:o}=r,l=jl(t,e,n);if(Nl(i,l),!(s||o))Tl(r,ct.default.vErrors)}Dl.reportExtraError=jm;function Dm(t,e){t.assign(ct.default.errors,e),t.if(E._`${ct.default.vErrors} !== null`,()=>t.if(e,()=>t.assign(E._`${ct.default.vErrors}.length`,e),()=>t.assign(ct.default.vErrors,null)))}Dl.resetErrorsCount=Dm;function Im({gen:t,keyword:e,schemaValue:n,data:r,errsCount:i,it:s}){if(i===void 0)throw Error("ajv implementation error");let o=t.name("err");t.forRange("i",i,ct.default.errors,(l)=>{if(t.const(o,E._`${ct.default.vErrors}[${l}]`),t.if(E._`${o}.instancePath === undefined`,()=>t.assign(E._`${o}.instancePath`,E.strConcat(ct.default.instancePath,s.errorPath))),t.assign(E._`${o}.schemaPath`,E.str`${s.errSchemaPath}/${e}`),s.opts.verbose)t.assign(E._`${o}.schema`,n),t.assign(E._`${o}.data`,r)})}Dl.extendErrors=Im;function Nl(t,e){let n=t.const("err",e);t.if(E._`${ct.default.vErrors} === null`,()=>t.assign(ct.default.vErrors,E._`[${n}]`),E._`${ct.default.vErrors}.push(${n})`),t.code(E._`${ct.default.errors}++`)}function Tl(t,e){let{gen:n,validateName:r,schemaEnv:i}=t;if(i.$async)n.throw(E._`new ${t.ValidationError}(${e})`);else n.assign(E._`${r}.errors`,e),n.return(!1)}var Te={keyword:new E.Name("keyword"),schemaPath:new E.Name("schemaPath"),params:new E.Name("params"),propertyName:new E.Name("propertyName"),message:new E.Name("message"),schema:new E.Name("schema"),parentSchema:new E.Name("parentSchema")};function jl(t,e,n){let{createErrors:r}=t.it;if(r===!1)return E._`{}`;return zm(t,e,n)}function zm(t,e,n={}){let{gen:r,it:i}=t,s=[qm(i,n),Rm(t,n)];return Bm(t,e,s),r.object(...s)}function qm({errorPath:t},{instancePath:e}){let n=e?E.str`${t}${de.getErrorPath(e,de.Type.Str)}`:t;return[ct.default.instancePath,E.strConcat(ct.default.instancePath,n)]}function Rm({keyword:t,it:{errSchemaPath:e}},{schemaPath:n,parentSchema:r}){let i=r?e:E.str`${e}/${t}`;if(n)i=E.str`${i}${de.getErrorPath(n,de.Type.Str)}`;return[Te.schemaPath,i]}function Bm(t,{params:e,message:n},r){let{keyword:i,data:s,schemaValue:o,it:l}=t,{opts:a,propertyName:c,topSchemaRef:f,schemaPath:u}=l;if(r.push([Te.keyword,i],[Te.params,typeof e=="function"?e(t):e||E._`{}`]),a.messages)r.push([Te.message,typeof n=="function"?n(t):n]);if(a.verbose)r.push([Te.schema,o],[Te.parentSchema,E._`${f}${u}`],[ct.default.data,s]);if(c)r.push([Te.propertyName,c])}});var Ul=v(function(Bl){Object.defineProperty(Bl,"__esModule",{value:!0});Bl.boolOrEmptySchema=Bl.topBoolOrEmptySchema=void 0;var zl=G0(),ql=D(),Gm=$t(),Jm={message:"boolean schema is false"};function Ym(t){let{gen:e,schema:n,validateName:r}=t;if(n===!1)Rl(t,!1);else if(typeof n=="object"&&n.$async===!0)e.return(Gm.default.data);else e.assign(ql._`${r}.errors`,null),e.return(!0)}Bl.topBoolOrEmptySchema=Ym;function Wm(t,e){let{gen:n,schema:r}=t;if(r===!1)n.var(e,!1),Rl(t);else n.var(e,!0)}Bl.boolOrEmptySchema=Wm;function Rl(t,e){let{gen:n,data:r}=t;zl.reportError({gen:n,keyword:"false schema",data:r,schema:!1,schemaCode:!1,schemaValue:!1,params:{},it:t},Jm,void 0,e)}});var Di=v(function(Kl){Object.defineProperty(Kl,"__esModule",{value:!0});Kl.getRules=Kl.isJSONType=void 0;var Qm=["string","number","integer","boolean","null","object","array"],Xm=new Set(Qm);function ty(t){return typeof t=="string"&&Xm.has(t)}Kl.isJSONType=ty;function ey(){let t={number:{type:"number",rules:[]},string:{type:"string",rules:[]},array:{type:"array",rules:[]},object:{type:"object",rules:[]}};return{types:{...t,integer:!0,boolean:!0,null:!0},rules:[{rules:[]},t.number,t.string,t.array,t.object],post:{rules:[]},all:{},keywords:{}}}Kl.getRules=ey});var Ii=v(function(Yl){Object.defineProperty(Yl,"__esModule",{value:!0});Yl.shouldUseRule=Yl.shouldUseGroup=Yl.schemaHasRulesForType=void 0;function ry({schema:t,self:e},n){let r=e.RULES.types[n];return r&&r!==!0&&Gl(t,r)}Yl.schemaHasRulesForType=ry;function Gl(t,e){return e.rules.some((n)=>Jl(t,n))}Yl.shouldUseGroup=Gl;function Jl(t,e){var n;return t[e.keyword]!==void 0||((n=e.definition.implements)===null||n===void 0?void 0:n.some((r)=>t[r]!==void 0))}Yl.shouldUseRule=Jl});var J0=v(function(n9){Object.defineProperty(n9,"__esModule",{value:!0});n9.reportTypeError=n9.checkDataTypes=n9.checkDataType=n9.coerceAndCheckDataType=n9.getJSONTypes=n9.getSchemaTypes=n9.DataType=void 0;var Zl=Di(),Ql=Ii(),Xl=G0(),M=D(),dn=z(),r0;(function(t){t[t.Correct=0]="Correct",t[t.Wrong=1]="Wrong"})(r0||(n9.DataType=r0={}));function oy(t){let e=t9(t.type);if(e.includes("null")){if(t.nullable===!1)throw Error("type: null contradicts nullable: false")}else{if(!e.length&&t.nullable!==void 0)throw Error('"nullable" cannot be used without "type"');if(t.nullable===!0)e.push("null")}return e}n9.getSchemaTypes=oy;function t9(t){let e=Array.isArray(t)?t:t?[t]:[];if(e.every(Zl.isJSONType))return e;throw Error("type must be JSONType or JSONType[]: "+e.join(","))}n9.getJSONTypes=t9;function ly(t,e){let{gen:n,data:r,opts:i}=t,s=ay(e,i.coerceTypes),o=e.length>0&&!(s.length===0&&e.length===1&&Ql.schemaHasRulesForType(t,e[0]));if(o){let l=qi(e,r,i.strictNumbers,r0.Wrong);n.if(l,()=>{if(s.length)cy(t,e,s);else Ri(t)})}return o}n9.coerceAndCheckDataType=ly;var e9=new Set(["string","number","integer","boolean","null"]);function ay(t,e){return e?t.filter((n)=>e9.has(n)||e==="array"&&n==="array"):[]}function cy(t,e,n){let{gen:r,data:i,opts:s}=t,o=r.let("dataType",M._`typeof ${i}`),l=r.let("coerced",M._`undefined`);if(s.coerceTypes==="array")r.if(M._`${o} == 'object' && Array.isArray(${i}) && ${i}.length == 1`,()=>r.assign(i,M._`${i}[0]`).assign(o,M._`typeof ${i}`).if(qi(e,i,s.strictNumbers),()=>r.assign(l,i)));r.if(M._`${l} !== undefined`);for(let c of n)if(e9.has(c)||c==="array"&&s.coerceTypes==="array")a(c);r.else(),Ri(t),r.endIf(),r.if(M._`${l} !== undefined`,()=>{r.assign(i,l),uy(t,l)});function a(c){switch(c){case"string":r.elseIf(M._`${o} == "number" || ${o} == "boolean"`).assign(l,M._`"" + ${i}`).elseIf(M._`${i} === null`).assign(l,M._`""`);return;case"number":r.elseIf(M._`${o} == "boolean" || ${i} === null
              || (${o} == "string" && ${i} && ${i} == +${i})`).assign(l,M._`+${i}`);return;case"integer":r.elseIf(M._`${o} === "boolean" || ${i} === null
              || (${o} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(l,M._`+${i}`);return;case"boolean":r.elseIf(M._`${i} === "false" || ${i} === 0 || ${i} === null`).assign(l,!1).elseIf(M._`${i} === "true" || ${i} === 1`).assign(l,!0);return;case"null":r.elseIf(M._`${i} === "" || ${i} === 0 || ${i} === false`),r.assign(l,null);return;case"array":r.elseIf(M._`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${i} === null`).assign(l,M._`[${i}]`)}}}function uy({gen:t,parentData:e,parentDataProperty:n},r){t.if(M._`${e} !== undefined`,()=>t.assign(M._`${e}[${n}]`,r))}function zi(t,e,n,r=r0.Correct){let i=r===r0.Correct?M.operators.EQ:M.operators.NEQ,s;switch(t){case"null":return M._`${e} ${i} null`;case"array":s=M._`Array.isArray(${e})`;break;case"object":s=M._`${e} && typeof ${e} == "object" && !Array.isArray(${e})`;break;case"integer":s=o(M._`!(${e} % 1) && !isNaN(${e})`);break;case"number":s=o();break;default:return M._`typeof ${e} ${i} ${t}`}return r===r0.Correct?s:M.not(s);function o(l=M.nil){return M.and(M._`typeof ${e} == "number"`,l,n?M._`isFinite(${e})`:M.nil)}}n9.checkDataType=zi;function qi(t,e,n,r){if(t.length===1)return zi(t[0],e,n,r);let i,s=dn.toHash(t);if(s.array&&s.object){let o=M._`typeof ${e} != "object"`;i=s.null?o:M._`!${e} || ${o}`,delete s.null,delete s.array,delete s.object}else i=M.nil;if(s.number)delete s.integer;for(let o in s)i=M.and(i,zi(o,e,n,r));return i}n9.checkDataTypes=qi;var fy={message:({schema:t})=>`must be ${t}`,params:({schema:t,schemaValue:e})=>typeof t=="string"?M._`{type: ${t}}`:M._`{type: ${e}}`};function Ri(t){let e=dy(t);Xl.reportError(e,fy)}n9.reportTypeError=Ri;function dy(t){let{gen:e,data:n,schema:r}=t,i=dn.schemaRefOrVal(t,r,"type");return{gen:e,keyword:"type",data:n,schema:r.type,schemaCode:i,schemaValue:i,parentSchema:r,params:{},it:t}}});var a9=v(function(o9){Object.defineProperty(o9,"__esModule",{value:!0});o9.assignDefaults=void 0;var Lt=D(),s9=z();function wy(t,e){let{properties:n,items:r}=t.schema;if(e==="object"&&n)for(let i in n)i9(t,i,n[i].default);else if(e==="array"&&Array.isArray(r))r.forEach((i,s)=>i9(t,s,i.default))}o9.assignDefaults=wy;function i9(t,e,n){let{gen:r,compositeRule:i,data:s,opts:o}=t;if(n===void 0)return;let l=Lt._`${s}${Lt.getProperty(e)}`;if(i){s9.checkStrictMode(t,`default is ignored for: ${l}`);return}let a=Lt._`${l} === undefined`;if(o.useDefaults==="empty")a=Lt._`${a} || ${l} === null || ${l} === ""`;r.if(a,Lt._`${l} = ${Lt.stringify(n)}`)}});var Mt=v(function(d9){Object.defineProperty(d9,"__esModule",{value:!0});d9.validateUnion=d9.validateArray=d9.usePattern=d9.callValidateCode=d9.schemaProperties=d9.allSchemaProperties=d9.noPropertyInData=d9.propertyInData=d9.isOwnProperty=d9.hasPropFunc=d9.reportMissingProp=d9.checkMissingProp=d9.checkReportMissingProp=void 0;var N=D(),i0=z(),pe=$t(),c9=z();function ky(t,e){let{gen:n,data:r,it:i}=t;n.if(Vi(n,r,e,i.opts.ownProperties),()=>{t.setParams({missingProperty:N._`${e}`},!0),t.error()})}d9.checkReportMissingProp=ky;function by({gen:t,data:e,it:{opts:n}},r,i){return N.or(...r.map((s)=>N.and(Vi(t,e,s,n.ownProperties),N._`${i} = ${s}`)))}d9.checkMissingProp=by;function _y(t,e){t.setParams({missingProperty:e},!0),t.error()}d9.reportMissingProp=_y;function u9(t){return t.scopeValue("func",{ref:Object.prototype.hasOwnProperty,code:N._`Object.prototype.hasOwnProperty`})}d9.hasPropFunc=u9;function Bi(t,e,n){return N._`${u9(t)}.call(${e}, ${n})`}d9.isOwnProperty=Bi;function xy(t,e,n,r){let i=N._`${e}${N.getProperty(n)} !== undefined`;return r?N._`${i} && ${Bi(t,e,n)}`:i}d9.propertyInData=xy;function Vi(t,e,n,r){let i=N._`${e}${N.getProperty(n)} === undefined`;return r?N.or(i,N.not(Bi(t,e,n))):i}d9.noPropertyInData=Vi;function f9(t){return t?Object.keys(t).filter((e)=>e!=="__proto__"):[]}d9.allSchemaProperties=f9;function $y(t,e){return f9(e).filter((n)=>!i0.alwaysValidSchema(t,e[n]))}d9.schemaProperties=$y;function Ly({schemaCode:t,data:e,it:{gen:n,topSchemaRef:r,schemaPath:i,errorPath:s},it:o},l,a,c){let f=c?N._`${t}, ${e}, ${r}${i}`:e,u=[[pe.default.instancePath,N.strConcat(pe.default.instancePath,s)],[pe.default.parentData,o.parentData],[pe.default.parentDataProperty,o.parentDataProperty],[pe.default.rootData,pe.default.rootData]];if(o.opts.dynamicRef)u.push([pe.default.dynamicAnchors,pe.default.dynamicAnchors]);let d=N._`${f}, ${n.object(...u)}`;return a!==N.nil?N._`${l}.call(${a}, ${d})`:N._`${l}(${d})`}d9.callValidateCode=Ly;var My=N._`new RegExp`;function Cy({gen:t,it:{opts:e}},n){let r=e.unicodeRegExp?"u":"",{regExp:i}=e.code,s=i(n,r);return t.scopeValue("pattern",{key:s.toString(),ref:s,code:N._`${i.code==="new RegExp"?My:c9.useFunc(t,i)}(${n}, ${r})`})}d9.usePattern=Cy;function Sy(t){let{gen:e,data:n,keyword:r,it:i}=t,s=e.name("valid");if(i.allErrors){let l=e.let("valid",!0);return o(()=>e.assign(l,!1)),l}return e.var(s,!0),o(()=>e.break()),s;function o(l){let a=e.const("len",N._`${n}.length`);e.forRange("i",0,a,(c)=>{t.subschema({keyword:r,dataProp:c,dataPropType:i0.Type.Num},s),e.if(N.not(s),l)})}}d9.validateArray=Sy;function Fy(t){let{gen:e,schema:n,keyword:r,it:i}=t;if(!Array.isArray(n))throw Error("ajv implementation error");if(n.some((a)=>i0.alwaysValidSchema(i,a))&&!i.opts.unevaluated)return;let o=e.let("valid",!1),l=e.name("_valid");e.block(()=>n.forEach((a,c)=>{let f=t.subschema({keyword:r,schemaProp:c,compositeRule:!0},l);if(e.assign(o,N._`${o} || ${l}`),!t.mergeValidEvaluated(f,l))e.if(N.not(o))})),t.result(o,()=>t.reset(),()=>t.error(!0))}d9.validateUnion=Fy});var k9=v(function(v9){Object.defineProperty(v9,"__esModule",{value:!0});v9.validateKeywordUsage=v9.validSchemaType=v9.funcKeywordCode=v9.macroKeywordCode=void 0;var K=D(),je=$t(),g9=Mt(),m9=G0();function By(t,e){let{gen:n,keyword:r,schema:i,parentSchema:s,it:o}=t,l=e.macro.call(o.self,i,s,o),a=y9(n,r,l);if(o.opts.validateSchema!==!1)o.self.validateSchema(l,!0);let c=n.name("valid");t.subschema({schema:l,schemaPath:K.nil,errSchemaPath:`${o.errSchemaPath}/${r}`,topSchemaRef:a,compositeRule:!0},c),t.pass(c,()=>t.error(!0))}v9.macroKeywordCode=By;function Vy(t,e){var n;let{gen:r,keyword:i,schema:s,parentSchema:o,$data:l,it:a}=t;Ky(a,e);let c=!l&&e.compile?e.compile.call(a.self,s,o,a):e.validate,f=y9(r,i,c),u=r.let("valid");t.block$data(u,d),t.ok((n=e.valid)!==null&&n!==void 0?n:u);function d(){if(e.errors===!1){if(p(),e.modifying)h9(t);m(()=>t.error())}else{let y=e.async?h():g();if(e.modifying)h9(t);m(()=>Uy(t,y))}}function h(){let y=r.let("ruleErrs",null);return r.try(()=>p(K._`await `),(w)=>r.assign(u,!1).if(K._`${w} instanceof ${a.ValidationError}`,()=>r.assign(y,K._`${w}.errors`),()=>r.throw(w))),y}function g(){let y=K._`${f}.errors`;return r.assign(y,null),p(K.nil),y}function p(y=e.async?K._`await `:K.nil){let w=a.opts.passContext?je.default.this:je.default.self,k=!(("compile"in e)&&!l||e.schema===!1);r.assign(u,K._`${y}${g9.callValidateCode(t,f,w,k)}`,e.modifying)}function m(y){var w;r.if(K.not((w=e.valid)!==null&&w!==void 0?w:u),y)}}v9.funcKeywordCode=Vy;function h9(t){let{gen:e,data:n,it:r}=t;e.if(r.parentData,()=>e.assign(n,K._`${r.parentData}[${r.parentDataProperty}]`))}function Uy(t,e){let{gen:n}=t;n.if(K._`Array.isArray(${e})`,()=>{n.assign(je.default.vErrors,K._`${je.default.vErrors} === null ? ${e} : ${je.default.vErrors}.concat(${e})`).assign(je.default.errors,K._`${je.default.vErrors}.length`),m9.extendErrors(t)},()=>t.error())}function Ky({schemaEnv:t},e){if(e.async&&!t.$async)throw Error("async keyword in sync schema")}function y9(t,e,n){if(n===void 0)throw Error(`keyword "${e}" failed to compile`);return t.scopeValue("keyword",typeof n=="function"?{ref:n}:{ref:n,code:K.stringify(n)})}function Hy(t,e,n=!1){return!e.length||e.some((r)=>r==="array"?Array.isArray(t):r==="object"?t&&typeof t=="object"&&!Array.isArray(t):typeof t==r||n&&typeof t>"u")}v9.validSchemaType=Hy;function Gy({schema:t,opts:e,self:n,errSchemaPath:r},i,s){if(Array.isArray(i.keyword)?!i.keyword.includes(s):i.keyword!==s)throw Error("ajv implementation error");let o=i.dependencies;if(o===null||o===void 0?void 0:o.some((l)=>!Object.prototype.hasOwnProperty.call(t,l)))throw Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);if(i.validateSchema){if(!i.validateSchema(t[s])){let a=`keyword "${s}" value is invalid at path "${r}": `+n.errorsText(i.validateSchema.errors);if(e.validateSchema==="log")n.logger.error(a);else throw Error(a)}}}v9.validateKeywordUsage=Gy});var x9=v(function(b9){Object.defineProperty(b9,"__esModule",{value:!0});b9.extendSubschemaMode=b9.extendSubschemaData=b9.getSubschema=void 0;var rt=D(),pn=z();function Zy(t,{keyword:e,schemaProp:n,schema:r,schemaPath:i,errSchemaPath:s,topSchemaRef:o}){if(e!==void 0&&r!==void 0)throw Error('both "keyword" and "schema" passed, only one allowed');if(e!==void 0){let l=t.schema[e];return n===void 0?{schema:l,schemaPath:rt._`${t.schemaPath}${rt.getProperty(e)}`,errSchemaPath:`${t.errSchemaPath}/${e}`}:{schema:l[n],schemaPath:rt._`${t.schemaPath}${rt.getProperty(e)}${rt.getProperty(n)}`,errSchemaPath:`${t.errSchemaPath}/${e}/${pn.escapeFragment(n)}`}}if(r!==void 0){if(i===void 0||s===void 0||o===void 0)throw Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');return{schema:r,schemaPath:i,topSchemaRef:o,errSchemaPath:s}}throw Error('either "keyword" or "schema" must be passed')}b9.getSubschema=Zy;function Qy(t,e,{dataProp:n,dataPropType:r,data:i,dataTypes:s,propertyName:o}){if(i!==void 0&&n!==void 0)throw Error('both "data" and "dataProp" passed, only one allowed');let{gen:l}=e;if(n!==void 0){let{errorPath:c,dataPathArr:f,opts:u}=e,d=l.let("data",rt._`${e.data}${rt.getProperty(n)}`,!0);a(d),t.errorPath=rt.str`${c}${pn.getErrorPath(n,r,u.jsPropertySyntax)}`,t.parentDataProperty=rt._`${n}`,t.dataPathArr=[...f,t.parentDataProperty]}if(i!==void 0){let c=i instanceof rt.Name?i:l.let("data",i,!0);if(a(c),o!==void 0)t.propertyName=o}if(s)t.dataTypes=s;function a(c){t.data=c,t.dataLevel=e.dataLevel+1,t.dataTypes=[],e.definedProperties=new Set,t.parentData=e.data,t.dataNames=[...e.dataNames,c]}}b9.extendSubschemaData=Qy;function Xy(t,{jtdDiscriminator:e,jtdMetadata:n,compositeRule:r,createErrors:i,allErrors:s}){if(r!==void 0)t.compositeRule=r;if(i!==void 0)t.createErrors=i;if(s!==void 0)t.allErrors=s;t.jtdDiscriminator=e,t.jtdMetadata=n}b9.extendSubschemaMode=Xy});var Ui=v(function(VM,$9){$9.exports=function t(e,n){if(e===n)return!0;if(e&&n&&typeof e=="object"&&typeof n=="object"){if(e.constructor!==n.constructor)return!1;var r,i,s;if(Array.isArray(e)){if(r=e.length,r!=n.length)return!1;for(i=r;i--!==0;)if(!t(e[i],n[i]))return!1;return!0}if(e.constructor===RegExp)return e.source===n.source&&e.flags===n.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===n.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===n.toString();if(s=Object.keys(e),r=s.length,r!==Object.keys(n).length)return!1;for(i=r;i--!==0;)if(!Object.prototype.hasOwnProperty.call(n,s[i]))return!1;for(i=r;i--!==0;){var o=s[i];if(!t(e[o],n[o]))return!1}return!0}return e!==e&&n!==n}});var M9=v(function(UM,L9){var he=L9.exports=function(t,e,n){if(typeof e=="function")n=e,e={};n=e.cb||n;var r=typeof n=="function"?n:n.pre||function(){},i=n.post||function(){};hn(e,r,i,t,"",t)};he.keywords={additionalItems:!0,items:!0,contains:!0,additionalProperties:!0,propertyNames:!0,not:!0,if:!0,then:!0,else:!0};he.arrayKeywords={items:!0,allOf:!0,anyOf:!0,oneOf:!0};he.propsKeywords={$defs:!0,definitions:!0,properties:!0,patternProperties:!0,dependencies:!0};he.skipKeywords={default:!0,enum:!0,const:!0,required:!0,maximum:!0,minimum:!0,exclusiveMaximum:!0,exclusiveMinimum:!0,multipleOf:!0,maxLength:!0,minLength:!0,pattern:!0,format:!0,maxItems:!0,minItems:!0,uniqueItems:!0,maxProperties:!0,minProperties:!0};function hn(t,e,n,r,i,s,o,l,a,c){if(r&&typeof r=="object"&&!Array.isArray(r)){e(r,i,s,o,l,a,c);for(var f in r){var u=r[f];if(Array.isArray(u)){if(f in he.arrayKeywords)for(var d=0;d<u.length;d++)hn(t,e,n,u[d],i+"/"+f+"/"+d,s,i,f,r,d)}else if(f in he.propsKeywords){if(u&&typeof u=="object")for(var h in u)hn(t,e,n,u[h],i+"/"+f+"/"+nv(h),s,i,f,r,h)}else if(f in he.keywords||t.allKeys&&!(f in he.skipKeywords))hn(t,e,n,u,i+"/"+f,s,i,f,r)}n(r,i,s,o,l,a,c)}}function nv(t){return t.replace(/~/g,"~0").replace(/\//g,"~1")}});var Y0=v(function(A9){Object.defineProperty(A9,"__esModule",{value:!0});A9.getSchemaRefs=A9.resolveUrl=A9.normalizeId=A9._getFullPath=A9.getFullPath=A9.inlineRef=void 0;var C9=z(),rv=Ui(),iv=M9(),sv=new Set(["type","format","pattern","maxLength","minLength","maxProperties","minProperties","maxItems","minItems","maximum","minimum","uniqueItems","multipleOf","required","enum","const"]);function ov(t,e=!0){if(typeof t=="boolean")return!0;if(e===!0)return!Ki(t);if(!e)return!1;return S9(t)<=e}A9.inlineRef=ov;var lv=new Set(["$ref","$recursiveRef","$recursiveAnchor","$dynamicRef","$dynamicAnchor"]);function Ki(t){for(let e in t){if(lv.has(e))return!0;let n=t[e];if(Array.isArray(n)&&n.some(Ki))return!0;if(typeof n=="object"&&Ki(n))return!0}return!1}function S9(t){let e=0;for(let n in t){if(n==="$ref")return 1/0;if(e++,sv.has(n))continue;if(typeof t[n]=="object")C9.eachItem(t[n],(r)=>e+=S9(r));if(e===1/0)return 1/0}return e}function F9(t,e="",n){if(n!==!1)e=s0(e);let r=t.parse(e);return E9(t,r)}A9.getFullPath=F9;function E9(t,e){return t.serialize(e).split("#")[0]+"#"}A9._getFullPath=E9;var av=/#\/?$/;function s0(t){return t?t.replace(av,""):""}A9.normalizeId=s0;function cv(t,e,n){return n=s0(n),t.resolve(e,n)}A9.resolveUrl=cv;var uv=/^[a-z_][-a-z0-9._]*$/i;function fv(t,e){if(typeof t=="boolean")return{};let{schemaId:n,uriResolver:r}=this.opts,i=s0(t[n]||e),s={"":i},o=F9(r,i,!1),l={},a=new Set;return iv(t,{allKeys:!0},(u,d,h,g)=>{if(g===void 0)return;let p=o+d,m=s[g];if(typeof u[n]=="string")m=y.call(this,u[n]);w.call(this,u.$anchor),w.call(this,u.$dynamicAnchor),s[d]=m;function y(k){let x=this.opts.uriResolver.resolve;if(k=s0(m?x(m,k):k),a.has(k))throw f(k);a.add(k);let _=this.refs[k];if(typeof _=="string")_=this.refs[_];if(typeof _=="object")c(u,_.schema,k);else if(k!==s0(p))if(k[0]==="#")c(u,l[k],k),l[k]=u;else this.refs[k]=p;return k}function w(k){if(typeof k=="string"){if(!uv.test(k))throw Error(`invalid anchor "${k}"`);y.call(this,`#${k}`)}}}),l;function c(u,d,h){if(d!==void 0&&!rv(u,d))throw f(h)}function f(u){return Error(`reference "${u}" resolves to more than one schema`)}}A9.getSchemaRefs=fv});var W0=v(function(G9){Object.defineProperty(G9,"__esModule",{value:!0});G9.getData=G9.KeywordCxt=G9.validateFunctionCode=void 0;var mn=Ul(),gn=J0(),l0=Ii(),ge=J0(),j9=a9(),It=k9(),o0=x9(),b=D(),T=$t(),D9=Y0(),ot=z(),Dt=G0();function yv(t){if(q9(t)){if(R9(t),z9(t)){kv(t);return}}I9(t,()=>mn.topBoolOrEmptySchema(t))}G9.validateFunctionCode=yv;function I9({gen:t,validateName:e,schema:n,schemaEnv:r,opts:i},s){if(i.code.es5)t.func(e,b._`${T.default.data}, ${T.default.valCxt}`,r.$async,()=>{t.code(b._`"use strict"; ${O9(n,i)}`),wv(t,i),t.code(s)});else t.func(e,b._`${T.default.data}, ${vv(i)}`,r.$async,()=>t.code(O9(n,i)).code(s))}function vv(t){return b._`{${T.default.instancePath}="", ${T.default.parentData}, ${T.default.parentDataProperty}, ${T.default.rootData}=${T.default.data}${t.dynamicRef?b._`, ${T.default.dynamicAnchors}={}`:b.nil}}={}`}function wv(t,e){t.if(T.default.valCxt,()=>{if(t.var(T.default.instancePath,b._`${T.default.valCxt}.${T.default.instancePath}`),t.var(T.default.parentData,b._`${T.default.valCxt}.${T.default.parentData}`),t.var(T.default.parentDataProperty,b._`${T.default.valCxt}.${T.default.parentDataProperty}`),t.var(T.default.rootData,b._`${T.default.valCxt}.${T.default.rootData}`),e.dynamicRef)t.var(T.default.dynamicAnchors,b._`${T.default.valCxt}.${T.default.dynamicAnchors}`)},()=>{if(t.var(T.default.instancePath,b._`""`),t.var(T.default.parentData,b._`undefined`),t.var(T.default.parentDataProperty,b._`undefined`),t.var(T.default.rootData,T.default.data),e.dynamicRef)t.var(T.default.dynamicAnchors,b._`{}`)})}function kv(t){let{schema:e,opts:n,gen:r}=t;I9(t,()=>{if(n.$comment&&e.$comment)V9(t);if(Lv(t),r.let(T.default.vErrors,null),r.let(T.default.errors,0),n.unevaluated)bv(t);B9(t),Sv(t)});return}function bv(t){let{gen:e,validateName:n}=t;t.evaluated=e.const("evaluated",b._`${n}.evaluated`),e.if(b._`${t.evaluated}.dynamicProps`,()=>e.assign(b._`${t.evaluated}.props`,b._`undefined`)),e.if(b._`${t.evaluated}.dynamicItems`,()=>e.assign(b._`${t.evaluated}.items`,b._`undefined`))}function O9(t,e){let n=typeof t=="object"&&t[e.schemaId];return n&&(e.code.source||e.code.process)?b._`/*# sourceURL=${n} */`:b.nil}function _v(t,e){if(q9(t)){if(R9(t),z9(t)){xv(t,e);return}}mn.boolOrEmptySchema(t,e)}function z9({schema:t,self:e}){if(typeof t=="boolean")return!t;for(let n in t)if(e.RULES.all[n])return!0;return!1}function q9(t){return typeof t.schema!="boolean"}function xv(t,e){let{schema:n,gen:r,opts:i}=t;if(i.$comment&&n.$comment)V9(t);Mv(t),Cv(t);let s=r.const("_errs",T.default.errors);B9(t,s),r.var(e,b._`${s} === ${T.default.errors}`)}function R9(t){ot.checkUnknownRules(t),$v(t)}function B9(t,e){if(t.opts.jtd)return N9(t,[],!1,e);let n=gn.getSchemaTypes(t.schema),r=gn.coerceAndCheckDataType(t,n);N9(t,n,!r,e)}function $v(t){let{schema:e,errSchemaPath:n,opts:r,self:i}=t;if(e.$ref&&r.ignoreKeywordsWithRef&&ot.schemaHasRulesButRef(e,i.RULES))i.logger.warn(`$ref: keywords ignored in schema at path "${n}"`)}function Lv(t){let{schema:e,opts:n}=t;if(e.default!==void 0&&n.useDefaults&&n.strictSchema)ot.checkStrictMode(t,"default is ignored in the schema root")}function Mv(t){let e=t.schema[t.opts.schemaId];if(e)t.baseId=D9.resolveUrl(t.opts.uriResolver,t.baseId,e)}function Cv(t){if(t.schema.$async&&!t.schemaEnv.$async)throw Error("async schema in sync schema")}function V9({gen:t,schemaEnv:e,schema:n,errSchemaPath:r,opts:i}){let s=n.$comment;if(i.$comment===!0)t.code(b._`${T.default.self}.logger.log(${s})`);else if(typeof i.$comment=="function"){let o=b.str`${r}/$comment`,l=t.scopeValue("root",{ref:e.root});t.code(b._`${T.default.self}.opts.$comment(${s}, ${o}, ${l}.schema)`)}}function Sv(t){let{gen:e,schemaEnv:n,validateName:r,ValidationError:i,opts:s}=t;if(n.$async)e.if(b._`${T.default.errors} === 0`,()=>e.return(T.default.data),()=>e.throw(b._`new ${i}(${T.default.vErrors})`));else{if(e.assign(b._`${r}.errors`,T.default.vErrors),s.unevaluated)Fv(t);e.return(b._`${T.default.errors} === 0`)}}function Fv({gen:t,evaluated:e,props:n,items:r}){if(n instanceof b.Name)t.assign(b._`${e}.props`,n);if(r instanceof b.Name)t.assign(b._`${e}.items`,r)}function N9(t,e,n,r){let{gen:i,schema:s,data:o,allErrors:l,opts:a,self:c}=t,{RULES:f}=c;if(s.$ref&&(a.ignoreKeywordsWithRef||!ot.schemaHasRulesButRef(s,f))){i.block(()=>K9(t,"$ref",f.all.$ref.definition));return}if(!a.jtd)Ev(t,e);i.block(()=>{for(let d of f.rules)u(d);u(f.post)});function u(d){if(!l0.shouldUseGroup(s,d))return;if(d.type){if(i.if(ge.checkDataType(d.type,o,a.strictNumbers)),T9(t,d),e.length===1&&e[0]===d.type&&n)i.else(),ge.reportTypeError(t);i.endIf()}else T9(t,d);if(!l)i.if(b._`${T.default.errors} === ${r||0}`)}}function T9(t,e){let{gen:n,schema:r,opts:{useDefaults:i}}=t;if(i)j9.assignDefaults(t,e.type);n.block(()=>{for(let s of e.rules)if(l0.shouldUseRule(r,s))K9(t,s.keyword,s.definition,e.type)})}function Ev(t,e){if(t.schemaEnv.meta||!t.opts.strictTypes)return;if(Av(t,e),!t.opts.allowUnionTypes)Pv(t,e);Ov(t,t.dataTypes)}function Av(t,e){if(!e.length)return;if(!t.dataTypes.length){t.dataTypes=e;return}e.forEach((n)=>{if(!U9(t.dataTypes,n))Hi(t,`type "${n}" not allowed by context "${t.dataTypes.join(",")}"`)}),Tv(t,e)}function Pv(t,e){if(e.length>1&&!(e.length===2&&e.includes("null")))Hi(t,"use allowUnionTypes to allow union type keyword")}function Ov(t,e){let n=t.self.RULES.all;for(let r in n){let i=n[r];if(typeof i=="object"&&l0.shouldUseRule(t.schema,i)){let{type:s}=i.definition;if(s.length&&!s.some((o)=>Nv(e,o)))Hi(t,`missing type "${s.join(",")}" for keyword "${r}"`)}}}function Nv(t,e){return t.includes(e)||e==="number"&&t.includes("integer")}function U9(t,e){return t.includes(e)||e==="integer"&&t.includes("number")}function Tv(t,e){let n=[];for(let r of t.dataTypes)if(U9(e,r))n.push(r);else if(e.includes("integer")&&r==="number")n.push("integer");t.dataTypes=n}function Hi(t,e){let n=t.schemaEnv.baseId+t.errSchemaPath;e+=` at "${n}" (strictTypes)`,ot.checkStrictMode(t,e,t.opts.strictTypes)}class Gi{constructor(t,e,n){if(It.validateKeywordUsage(t,e,n),this.gen=t.gen,this.allErrors=t.allErrors,this.keyword=n,this.data=t.data,this.schema=t.schema[n],this.$data=e.$data&&t.opts.$data&&this.schema&&this.schema.$data,this.schemaValue=ot.schemaRefOrVal(t,this.schema,n,this.$data),this.schemaType=e.schemaType,this.parentSchema=t.schema,this.params={},this.it=t,this.def=e,this.$data)this.schemaCode=t.gen.const("vSchema",H9(this.$data,t));else if(this.schemaCode=this.schemaValue,!It.validSchemaType(this.schema,e.schemaType,e.allowUndefined))throw Error(`${n} value must be ${JSON.stringify(e.schemaType)}`);if("code"in e?e.trackErrors:e.errors!==!1)this.errsCount=t.gen.const("_errs",T.default.errors)}result(t,e,n){this.failResult(b.not(t),e,n)}failResult(t,e,n){if(this.gen.if(t),n)n();else this.error();if(e){if(this.gen.else(),e(),this.allErrors)this.gen.endIf()}else if(this.allErrors)this.gen.endIf();else this.gen.else()}pass(t,e){this.failResult(b.not(t),void 0,e)}fail(t){if(t===void 0){if(this.error(),!this.allErrors)this.gen.if(!1);return}if(this.gen.if(t),this.error(),this.allErrors)this.gen.endIf();else this.gen.else()}fail$data(t){if(!this.$data)return this.fail(t);let{schemaCode:e}=this;this.fail(b._`${e} !== undefined && (${b.or(this.invalid$data(),t)})`)}error(t,e,n){if(e){this.setParams(e),this._error(t,n),this.setParams({});return}this._error(t,n)}_error(t,e){(t?Dt.reportExtraError:Dt.reportError)(this,this.def.error,e)}$dataError(){Dt.reportError(this,this.def.$dataError||Dt.keyword$DataError)}reset(){if(this.errsCount===void 0)throw Error('add "trackErrors" to keyword definition');Dt.resetErrorsCount(this.gen,this.errsCount)}ok(t){if(!this.allErrors)this.gen.if(t)}setParams(t,e){if(e)Object.assign(this.params,t);else this.params=t}block$data(t,e,n=b.nil){this.gen.block(()=>{this.check$data(t,n),e()})}check$data(t=b.nil,e=b.nil){if(!this.$data)return;let{gen:n,schemaCode:r,schemaType:i,def:s}=this;if(n.if(b.or(b._`${r} === undefined`,e)),t!==b.nil)n.assign(t,!0);if(i.length||s.validateSchema){if(n.elseIf(this.invalid$data()),this.$dataError(),t!==b.nil)n.assign(t,!1)}n.else()}invalid$data(){let{gen:t,schemaCode:e,schemaType:n,def:r,it:i}=this;return b.or(s(),o());function s(){if(n.length){if(!(e instanceof b.Name))throw Error("ajv implementation error");let l=Array.isArray(n)?n:[n];return b._`${ge.checkDataTypes(l,e,i.opts.strictNumbers,ge.DataType.Wrong)}`}return b.nil}function o(){if(r.validateSchema){let l=t.scopeValue("validate$data",{ref:r.validateSchema});return b._`!${l}(${e})`}return b.nil}}subschema(t,e){let n=o0.getSubschema(this.it,t);o0.extendSubschemaData(n,this.it,t),o0.extendSubschemaMode(n,t);let r={...this.it,...n,items:void 0,props:void 0};return _v(r,e),r}mergeEvaluated(t,e){let{it:n,gen:r}=this;if(!n.opts.unevaluated)return;if(n.props!==!0&&t.props!==void 0)n.props=ot.mergeEvaluated.props(r,t.props,n.props,e);if(n.items!==!0&&t.items!==void 0)n.items=ot.mergeEvaluated.items(r,t.items,n.items,e)}mergeValidEvaluated(t,e){let{it:n,gen:r}=this;if(n.opts.unevaluated&&(n.props!==!0||n.items!==!0))return r.if(e,()=>this.mergeEvaluated(t,b.Name)),!0}}G9.KeywordCxt=Gi;function K9(t,e,n,r){let i=new Gi(t,n,e);if("code"in n)n.code(i,r);else if(i.$data&&n.validate)It.funcKeywordCode(i,n);else if("macro"in n)It.macroKeywordCode(i,n);else if(n.compile||n.validate)It.funcKeywordCode(i,n)}var jv=/^\/(?:[^~]|~0|~1)*$/,Dv=/^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;function H9(t,{dataLevel:e,dataNames:n,dataPathArr:r}){let i,s;if(t==="")return T.default.rootData;if(t[0]==="/"){if(!jv.test(t))throw Error(`Invalid JSON-pointer: ${t}`);i=t,s=T.default.rootData}else{let c=Dv.exec(t);if(!c)throw Error(`Invalid JSON-pointer: ${t}`);let f=+c[1];if(i=c[2],i==="#"){if(f>=e)throw Error(a("property/index",f));return r[e-f]}if(f>e)throw Error(a("data",f));if(s=n[e-f],!i)return s}let o=s,l=i.split("/");for(let c of l)if(c)s=b._`${s}${b.getProperty(ot.unescapeJsonPointer(c))}`,o=b._`${o} && ${s}`;return o;function a(c,f){return`Cannot access ${c} ${f} levels up, current level is ${e}`}}G9.getData=H9});var yn=v(function(W9){Object.defineProperty(W9,"__esModule",{value:!0});class Y9 extends Error{constructor(t){super("validation failed");this.errors=t,this.ajv=this.validation=!0}}W9.default=Y9});var Z0=v(function(Q9){Object.defineProperty(Q9,"__esModule",{value:!0});var a0=Y0();class Z9 extends Error{constructor(t,e,n,r){super(r||`can't resolve reference ${n} from id ${e}`);this.missingRef=a0.resolveUrl(t,e,n),this.missingSchema=a0.normalizeId(a0.getFullPath(t,this.missingRef))}}Q9.default=Z9});var X0=v(function(ea){Object.defineProperty(ea,"__esModule",{value:!0});ea.resolveSchema=ea.getCompilingSchema=ea.resolveRef=ea.compileSchema=ea.SchemaEnv=void 0;var X=D(),Bv=yn(),De=$t(),tt=Y0(),vn=z(),X9=W0();class Q0{constructor(t){var e;this.refs={},this.dynamicAnchors={};let n;if(typeof t.schema=="object")n=t.schema;this.schema=t.schema,this.schemaId=t.schemaId,this.root=t.root||this,this.baseId=(e=t.baseId)!==null&&e!==void 0?e:tt.normalizeId(n===null||n===void 0?void 0:n[t.schemaId||"$id"]),this.schemaPath=t.schemaPath,this.localRefs=t.localRefs,this.meta=t.meta,this.$async=n===null||n===void 0?void 0:n.$async,this.refs={}}}ea.SchemaEnv=Q0;function Yi(t){let e=ta.call(this,t);if(e)return e;let n=tt.getFullPath(this.opts.uriResolver,t.root.baseId),{es5:r,lines:i}=this.opts.code,{ownProperties:s}=this.opts,o=new X.CodeGen(this.scope,{es5:r,lines:i,ownProperties:s}),l;if(t.$async)l=o.scopeValue("Error",{ref:Bv.default,code:X._`require("ajv/dist/runtime/validation_error").default`});let a=o.scopeName("validate");t.validateName=a;let c={gen:o,allErrors:this.opts.allErrors,data:De.default.data,parentData:De.default.parentData,parentDataProperty:De.default.parentDataProperty,dataNames:[De.default.data],dataPathArr:[X.nil],dataLevel:0,dataTypes:[],definedProperties:new Set,topSchemaRef:o.scopeValue("schema",this.opts.code.source===!0?{ref:t.schema,code:X.stringify(t.schema)}:{ref:t.schema}),validateName:a,ValidationError:l,schema:t.schema,schemaEnv:t,rootId:n,baseId:t.baseId||n,schemaPath:X.nil,errSchemaPath:t.schemaPath||(this.opts.jtd?"":"#"),errorPath:X._`""`,opts:this.opts,self:this},f;try{this._compilations.add(t),X9.validateFunctionCode(c),o.optimize(this.opts.code.optimize);let u=o.toString();if(f=`${o.scopeRefs(De.default.scope)}return ${u}`,this.opts.code.process)f=this.opts.code.process(f,t);let h=Function(`${De.default.self}`,`${De.default.scope}`,f)(this,this.scope.get());if(this.scope.value(a,{ref:h}),h.errors=null,h.schema=t.schema,h.schemaEnv=t,t.$async)h.$async=!0;if(this.opts.code.source===!0)h.source={validateName:a,validateCode:u,scopeValues:o._values};if(this.opts.unevaluated){let{props:g,items:p}=c;if(h.evaluated={props:g instanceof X.Name?void 0:g,items:p instanceof X.Name?void 0:p,dynamicProps:g instanceof X.Name,dynamicItems:p instanceof X.Name},h.source)h.source.evaluated=X.stringify(h.evaluated)}return t.validate=h,t}catch(u){if(delete t.validate,delete t.validateName,f)this.logger.error("Error compiling schema, function code:",f);throw u}finally{this._compilations.delete(t)}}ea.compileSchema=Yi;function Vv(t,e,n){var r;n=tt.resolveUrl(this.opts.uriResolver,e,n);let i=t.refs[n];if(i)return i;let s=Hv.call(this,t,n);if(s===void 0){let o=(r=t.localRefs)===null||r===void 0?void 0:r[n],{schemaId:l}=this.opts;if(o)s=new Q0({schema:o,schemaId:l,root:t,baseId:e})}if(s===void 0)return;return t.refs[n]=Uv.call(this,s)}ea.resolveRef=Vv;function Uv(t){if(tt.inlineRef(t.schema,this.opts.inlineRefs))return t.schema;return t.validate?t:Yi.call(this,t)}function ta(t){for(let e of this._compilations)if(Kv(e,t))return e}ea.getCompilingSchema=ta;function Kv(t,e){return t.schema===e.schema&&t.root===e.root&&t.baseId===e.baseId}function Hv(t,e){let n;while(typeof(n=this.refs[e])=="string")e=n;return n||this.schemas[e]||wn.call(this,t,e)}function wn(t,e){let n=this.opts.uriResolver.parse(e),r=tt._getFullPath(this.opts.uriResolver,n),i=tt.getFullPath(this.opts.uriResolver,t.baseId,void 0);if(Object.keys(t.schema).length>0&&r===i)return Ji.call(this,n,t);let s=tt.normalizeId(r),o=this.refs[s]||this.schemas[s];if(typeof o=="string"){let l=wn.call(this,t,o);if(typeof(l===null||l===void 0?void 0:l.schema)!=="object")return;return Ji.call(this,n,l)}if(typeof(o===null||o===void 0?void 0:o.schema)!=="object")return;if(!o.validate)Yi.call(this,o);if(s===tt.normalizeId(e)){let{schema:l}=o,{schemaId:a}=this.opts,c=l[a];if(c)i=tt.resolveUrl(this.opts.uriResolver,i,c);return new Q0({schema:l,schemaId:a,root:t,baseId:i})}return Ji.call(this,n,o)}ea.resolveSchema=wn;var Gv=new Set(["properties","patternProperties","enum","dependencies","definitions"]);function Ji(t,{baseId:e,schema:n,root:r}){var i;if(((i=t.fragment)===null||i===void 0?void 0:i[0])!=="/")return;for(let l of t.fragment.slice(1).split("/")){if(typeof n==="boolean")return;let a=n[vn.unescapeFragment(l)];if(a===void 0)return;n=a;let c=typeof n==="object"&&n[this.opts.schemaId];if(!Gv.has(l)&&c)e=tt.resolveUrl(this.opts.uriResolver,e,c)}let s;if(typeof n!="boolean"&&n.$ref&&!vn.schemaHasRulesButRef(n,this.RULES)){let l=tt.resolveUrl(this.opts.uriResolver,e,n.$ref);s=wn.call(this,r,l)}let{schemaId:o}=this.opts;if(s=s||new Q0({schema:n,schemaId:o,root:r,baseId:e}),s.schema!==s.root.schema)return s;return}});var ra=v(function(WM,Qv){Qv.exports={$id:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",description:"Meta-schema for $data reference (JSON AnySchema extension proposal)",type:"object",required:["$data"],properties:{$data:{type:"string",anyOf:[{format:"relative-json-pointer"},{format:"json-pointer"}]}},additionalProperties:!1}});var es=v(function(ZM,fa){var Xv=RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu),Zi=RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u),tw=RegExp.prototype.test.bind(/^\d*$/u),Ie=RegExp.prototype.test.bind(/^[\da-f]{2}$/iu),Qi=RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu),sa=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u),Xi=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u),ew=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u),pt=Array(256);for(let e=0;e<256;e++)pt[e]="%"+"0123456789ABCDEF"[e>>4]+"0123456789ABCDEF"[e&15];function lt(t){if(t<2048)return pt[192|t>>6]+pt[128|t&63];if(t<65536)return pt[224|t>>12]+pt[128|t>>6&63]+pt[128|t&63];return pt[240|t>>18]+pt[128|t>>12&63]+pt[128|t>>6&63]+pt[128|t&63]}function nw(t){let e="",n=0,r=0;for(r=0;r<t.length;r++){if(n=t[r].charCodeAt(0),n===48)continue;if(!(n>=48&&n<=57||n>=65&&n<=70||n>=97&&n<=102))return"";e+=t[r];break}for(r+=1;r<t.length;r++){if(n=t[r].charCodeAt(0),!(n>=48&&n<=57||n>=65&&n<=70||n>=97&&n<=102))return"";e+=t[r]}return e}var rw=RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/),iw=RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/),sw=RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/),ow=RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);function lw(t){if(t.length===0)return!1;for(let e=0;e<t.length;e++){if(sw(t[e]))continue;if(t[e]==="%"&&e+2<t.length&&Ie(t.slice(e+1,e+3))){e+=2;continue}return!1}return!0}function ia(t){let e=-1,n=0,r=-1,i=0;for(let l=0;l<t.length;l++)if(t[l]==="0"){if(r===-1)r=l;if(i++,i>n)n=i,e=r}else r=-1,i=0;if(n<2)return t.join(":");let s=t.slice(0,e).join(":"),o=t.slice(e+n).join(":");return s+"::"+o}function aw(t){let e=t.indexOf("::");if(e!==-1&&t.indexOf("::",e+1)!==-1)return;let n=e===-1?t.split(":"):t.slice(0,e).split(":"),r=e===-1?[]:t.slice(e+2).split(":");if(e!==-1){if(n.length===1&&n[0]==="")n.length=0;if(r.length===1&&r[0]==="")r.length=0}let i=n.concat(r),s=0;for(let l=0;l<i.length;l++){let a=i[l];if(a==="")return;if(a.indexOf(".")!==-1){if(l!==i.length-1||e!==-1&&r.length===0||!Zi(a))return;s+=2;continue}if(!rw(a))return;i[l]=parseInt(a,16).toString(16),s++}if(e===-1){if(s!==8)return;return ia(i)}if(s>=8)return;let o=i.slice(0,n.length);for(let l=s;l<8;l++)o.push("0");for(let l=n.length;l<i.length;l++)o.push(i[l]);return ia(o)}function Wi(t){let e=t[0]==="["&&t[t.length-1]==="]";if((t[0]==="["||t[t.length-1]==="]")&&!e)return{host:t,isIPV6:!1,error:!0};let r=e?t.slice(1,-1):t;if(e&&iw(r))return r=r.toLowerCase(),{host:`[${r}]`,escapedHost:r,isIPV6:!1,isIPVFuture:!0};if(cw(r,":")<2)return{host:t,isIPV6:!1,error:e};let i="",s=r.indexOf("%");if(s!==-1){let l=r.slice(s,s+3).toLowerCase()==="%25"?3:1;if(i=r.slice(s+l),!lw(i))return{host:t,isIPV6:!1,error:!0};r=r.slice(0,s)}let o=aw(r);if(o===void 0)return{host:t,isIPV6:!1,error:!0};return{host:o+(i?"%"+i:""),escapedHost:o+(i?"%25"+i:""),isIPV6:!0}}function cw(t,e){let n=0;for(let r=0;r<t.length;r++)if(t[r]===e)n++;return n}function oa(t){let e=t,n=[],r=-1,i=0;while(i=e.length){if(i===1)if(e===".")break;else if(e==="/"){n.push("/");break}else{n.push(e);break}else if(i===2){if(e[0]==="."){if(e[1]===".")break;else if(e[1]==="/"){e=e.slice(2);continue}}else if(e[0]==="/"){if(e[1]==="."||e[1]==="/"){n.push("/");break}}}else if(i===3){if(e==="/.."){if(n.length!==0)n.pop();n.push("/");break}}if(e[0]==="."){if(e[1]==="."){if(e[2]==="/"){e=e.slice(3);continue}}else if(e[1]==="/"){e=e.slice(2);continue}}else if(e[0]==="/"){if(e[1]==="."){if(e[2]==="/"){e=e.slice(2);continue}else if(e[2]==="."){if(e[3]==="/"){if(e=e.slice(3),n.length!==0)n.pop();continue}}}}if((r=e.indexOf("/",1))===-1){n.push(e);break}else n.push(e.slice(0,r)),e=e.slice(r)}return n.join("")}function uw(t){if(t===""||t[0]==="/")return oa(t);let e=t.split("/"),n=e.length-1,r=[],i=!1;for(let s=0;s<=n;s++){let o=e[s];if(o==="."||o===".."){if(o==="..")if(r.length!==0&&r[r.length-1]!=="..")r.pop();else r.push("..");i=s===n}else r.push(o)}if(i&&r[r.length-1]!=="..")r.push("");if(r.length===0||r[0]===""||r[0].includes(":"))r.unshift(".");return r.join("/")}var fw={"@":"%40","/":"%2F","?":"%3F","#":"%23",":":"%3A"},dw=/[@/?#:]/g,pw=/[@/?#]/g;function la(t,e){let n=e?pw:dw;return n.lastIndex=0,t.replace(n,(r)=>fw[r])}function aa(t,e=!1){if(t.indexOf("%")===-1)return t;let n="";for(let r=0;r<t.length;r++){if(t[r]==="%"&&r+2<t.length){let i=t.slice(r+1,r+3);if(Ie(i)){let s=i.toUpperCase(),o=String.fromCharCode(parseInt(s,16));if(e&&Qi(o))n+=o;else n+="%"+s;r+=2;continue}}n+=t[r]}return n}function hw(t){let e="";for(let n=0;n<t.length;n++){let r=t[n];if(r==="%"&&n+2<t.length){let i=t.slice(n+1,n+3);if(Ie(i)){let s=i.toUpperCase(),o=String.fromCharCode(parseInt(s,16));if(o!=="."&&Qi(o))e+=o;else e+="%"+s;n+=2;continue}}if(sa(r))e+=r;else{let i=t.charCodeAt(n);if(i<128)e+=ua(i)?r:pt[i];else if(i<55296||i>57343)e+=lt(i);else if(i<=56319&&n+1<t.length){let s=t.charCodeAt(n+1);if(s>=56320&&s<=57343)e+=lt(65536+(i-55296<<10)+(s-56320)),n++;else e+=lt(65533)}else e+=lt(65533)}}return e}function gw(t,e=!1){let n="",r=e&&t[0]!=="/";for(let i=0;i<t.length;i++){let s=t[i];if(s==="%"&&i+2<t.length){let o=t.slice(i+1,i+3);if(Ie(o)){n+="%"+o.toUpperCase(),i+=2;continue}}if(s==="/")r=!1;if(sa(s)&&(s!==":"||!r))n+=s;else{let o=t.charCodeAt(i);if(o<128)n+=pt[o];else if(o<55296||o>57343)n+=lt(o);else if(o<=56319&&i+1<t.length){let l=t.charCodeAt(i+1);if(l>=56320&&l<=57343)n+=lt(65536+(o-55296<<10)+(l-56320)),i++;else n+=lt(65533)}else n+=lt(65533)}}return n}function ts(t,e){let n="";for(let r=0;r<t.length;r++){let i=t[r];if(i==="%"&&r+2<t.length){let s=t.slice(r+1,r+3);if(Ie(s)){n+="%"+s.toUpperCase(),r+=2;continue}}if(e(i))n+=i;else{let s=t.charCodeAt(r);if(s<128)n+=pt[s];else if(s<55296||s>57343)n+=lt(s);else if(s<=56319&&r+1<t.length){let o=t.charCodeAt(r+1);if(o>=56320&&o<=57343)n+=lt(65536+(s-55296<<10)+(o-56320)),r++;else n+=lt(65533)}else n+=lt(65533)}}return n}function ca(t){return ts(t,ew)}function mw(t){return ts(t,Xi)}function yw(t){return ts(t,Xi)}function ua(t){return t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122||t===42||t===43||t===45||t===46||t===47||t===64||t===95}function vw(t){let e="";for(let n=0;n<t.length;n++){let r=t[n];if(r==="%"&&n+2<t.length){let i=t.slice(n+1,n+3);if(Ie(i)){let s=i.toUpperCase(),o=String.fromCharCode(parseInt(s,16));if(Qi(o))e+=o;else e+="%"+s;n+=2;continue}}if(Xi(r))e+=r;else{let i=t.charCodeAt(n);if(i<128)e+=ua(i)?r:pt[i];else if(i<55296||i>57343)e+=lt(i);else if(i<=56319&&n+1<t.length){let s=t.charCodeAt(n+1);if(s>=56320&&s<=57343)e+=lt(65536+(i-55296<<10)+(s-56320)),n++;else e+=lt(65533)}else e+=lt(65533)}}return e}function ww(t){let e="";for(let n=0;n<t.length;n++){if(t[n]==="%"&&n+2<t.length){let r=t.slice(n+1,n+3);if(Ie(r)){e+="%"+r.toUpperCase(),n+=2;continue}}e+=escape(t[n])}return e}function kw(t){let e=[];if(t.userinfo!==void 0)e.push(ca(t.userinfo)),e.push("@");if(t.host!==void 0){let n=t.host;if(!Zi(n)){let r=Wi(n);if(r.isIPV6!==!0&&r.isIPVFuture!==!0)n=aa(n,!0),r=Wi(n);if(r.isIPV6===!0||r.isIPVFuture===!0)n=`[${r.escapedHost}]`;else n=la(n,!1)}e.push(n)}if(typeof t.port==="number"||typeof t.port==="string"){let n=String(t.port);if(!tw(n))throw TypeError("URI port is malformed.");e.push(":"),e.push(n)}return e.length?e.join(""):void 0}fa.exports={nonSimpleDomain:ow,recomposeAuthority:kw,reescapeHostDelimiters:la,normalizePercentEncoding:aa,normalizePathEncoding:hw,serializePathEncoding:gw,normalizeQueryFragmentEncoding:vw,encodeUserinfo:ca,encodeQuery:mw,encodeFragment:yw,escapePreservingEscapes:ww,removeDotSegments:oa,removeDotSegmentsRelative:uw,isIPv4:Zi,isUUID:Xv,normalizeIPv6:Wi,stringArrayToHexStripped:nw}});var ma=v(function(QM,ga){var{isUUID:bw}=es(),_w=/^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu,xw=["http","https","ws","wss","urn","urn:uuid"];function $w(t){return xw.indexOf(t)!==-1}function ns(t){if(t.secure===!0)return!0;else if(t.secure===!1)return!1;else if(t.scheme)return t.scheme.length===3&&(t.scheme[0]==="w"||t.scheme[0]==="W")&&(t.scheme[1]==="s"||t.scheme[1]==="S")&&(t.scheme[2]==="s"||t.scheme[2]==="S");else return!1}function da(t){if(!t.host)t.error=t.error||"HTTP URIs must have a host.";return t}function pa(t){let e=String(t.scheme).toLowerCase()==="https";if(t.port===(e?443:80)||t.port==="")t.port=void 0;if(!t.path)t.path="/";return t}function Lw(t){return t.secure=ns(t),t.resourceName=(t.path||"/")+(t.query?"?"+t.query:""),t.path=void 0,t.query=void 0,t}function Mw(t){if(t.port===(ns(t)?443:80)||t.port==="")t.port=void 0;if(typeof t.secure==="boolean")t.scheme=t.secure?"wss":"ws",t.secure=void 0;if(t.resourceName){let e=t.resourceName.indexOf("?"),n=e===-1?t.resourceName:t.resourceName.slice(0,e);t.path=n&&n!=="/"?n:void 0,t.query=e===-1?void 0:t.resourceName.slice(e+1),t.resourceName=void 0}return t.fragment=void 0,t}function Cw(t,e){if(!t.path)return t.error="URN can not be parsed",t;let n=t.path.match(_w);if(n&&n[0]===t.path){let r=e.scheme||t.scheme||"urn";t.nid=n[1].toLowerCase(),t.nss=n[2];let i=`${r}:${e.nid||t.nid}`,s=rs(i);if(t.path=void 0,s)t=s.parse(t,e)}else t.error=t.error||"URN can not be parsed.";return t}function Sw(t,e){if(t.nid===void 0)throw Error("URN without nid cannot be serialized");let n=e.scheme||t.scheme||"urn",r=t.nid.toLowerCase(),i=`${n}:${e.nid||r}`,s=rs(i);if(s)t=s.serialize(t,e);let o=t,l=t.nss;return o.path=`${r||e.nid}:${l}`,e.skipEscape=!0,o}function Fw(t,e){let n=t;if(n.uuid=n.nss,n.nss=void 0,!e.tolerant&&(!n.uuid||!bw(n.uuid)))n.error=n.error||"UUID is not valid.";return n}function Ew(t){let e=t;return e.nss=(t.uuid||"").toLowerCase(),e}var ha={scheme:"http",domainHost:!0,parse:da,serialize:pa},Aw={scheme:"https",domainHost:ha.domainHost,parse:da,serialize:pa},kn={scheme:"ws",domainHost:!0,parse:Lw,serialize:Mw},Pw={scheme:"wss",domainHost:kn.domainHost,parse:kn.parse,serialize:kn.serialize},Ow={scheme:"urn",parse:Cw,serialize:Sw,skipNormalize:!0},Nw={scheme:"urn:uuid",parse:Fw,serialize:Ew,skipNormalize:!0},bn={http:ha,https:Aw,ws:kn,wss:Pw,urn:Ow,"urn:uuid":Nw};Object.setPrototypeOf(bn,null);function rs(t){return t&&(bn[t]||bn[t.toLowerCase()])||void 0}ga.exports={wsIsSecure:ns,SCHEMES:bn,isValidSchemeName:$w,getSchemeHandler:rs}});var Ea=v(function(XM,Ln){var{normalizeIPv6:ba,removeDotSegments:e1,removeDotSegmentsRelative:_a,recomposeAuthority:Tw,normalizePercentEncoding:is,normalizePathEncoding:jw,serializePathEncoding:ya,normalizeQueryFragmentEncoding:va,encodeQuery:Dw,encodeFragment:Iw,reescapeHostDelimiters:zw,isIPv4:xa,nonSimpleDomain:qw}=es(),{SCHEMES:$a,getSchemeHandler:ss}=ma(),La=/^[A-Za-z][A-Za-z0-9+.-]*$/u,Rw=/[\0-\x20"#/:<>?@[\\\]^`{|}\x7F]/u;function wa(t){let e=String(t);if(!La.test(e))throw TypeError("URI scheme is malformed.");return e}function Bw(t,e){if(typeof t==="string")t=Zw(t,e);else if(typeof t==="object")t=xn(ze(t,e),e);return t}function Vw(t,e,n){let r=n?Object.assign({scheme:"null"},n):{scheme:"null"},{parsed:i,malformedAuthorityOrPort:s,malformedPercentEncoding:o,malformedSchemeSpecific:l,malformedHost:a,malformedScheme:c}=_n(t,r),{parsed:f,malformedAuthorityOrPort:u,malformedPercentEncoding:d,malformedSchemeSpecific:h,malformedHost:g,malformedScheme:p}=_n(e,r);if(s||u||o||d||l||h||a||g||c||p)throw Error(i.error||f.error||"URI is malformed.");let m=Ma(i,f,r,!0),y=ss(n&&n.scheme||m.scheme),w=m.host,k=w!==void 0&&w!==""&&(xa(w)||ba(w).isIPV6);if(Sa(m,n||{},y,k))throw Error("URI host is malformed.");Ca(m,n||{},y,k);let x=w&&w.indexOf("%")!==-1&&!/\P{ASCII}/u.test(w);if(m.error&&!x)throw Error(m.error);return r.skipEscape=!0,ze(m,r)}function Ma(t,e,n,r){let i={};if(!r)t=xn(ze(t,n),n),e=xn(ze(e,n),n);if(n=n||{},!n.tolerant&&e.scheme)i.scheme=e.scheme,i.userinfo=e.userinfo,i.host=e.host,i.port=e.port,i.path=e1(e.path||""),i.query=e.query;else{if(e.userinfo!==void 0||e.host!==void 0||e.port!==void 0)i.userinfo=e.userinfo,i.host=e.host,i.port=e.port,i.path=e1(e.path||""),i.query=e.query;else{if(!e.path)if(i.path=t.path,e.query!==void 0)i.query=e.query;else i.query=t.query;else{if(e.path[0]==="/")i.path=e1(e.path);else{let s=t.userinfo!==void 0||t.host!==void 0||t.port!==void 0;if(s&&!t.path)i.path="/"+e.path;else if(!t.path)i.path=e.path;else i.path=t.path.slice(0,t.path.lastIndexOf("/")+1)+e.path;i.path=t.scheme===void 0&&!s&&i.path[0]!=="/"?_a(i.path):e1(i.path)}i.query=e.query}i.userinfo=t.userinfo,i.host=t.host,i.port=t.port}i.scheme=t.scheme}return i.fragment=e.fragment,i}function Uw(t,e,n){let r=ka(t,n),i=ka(e,n);return r!==void 0&&i!==void 0&&r===i}function ze(t,e){let n={host:t.host,scheme:t.scheme,userinfo:t.userinfo,port:t.port,path:t.path,query:t.query,nid:t.nid,nss:t.nss,uuid:t.uuid,fragment:t.fragment,reference:t.reference,resourceName:t.resourceName,secure:t.secure,error:""},r=Object.assign({},e),i=[];if(n.scheme)n.scheme=wa(n.scheme);let s=ss(r.scheme||n.scheme);if(s&&s.serialize)s.serialize(n,r);let o=n.userinfo!==void 0||n.host!==void 0||n.port!==void 0,l=(n.scheme===void 0||r.reference==="suffix")&&!o,a=!r.skipEscape&&l;if(n.path!==void 0)if(!r.skipEscape)n.path=ya(n.path,a);else n.path=is(n.path);if(r.reference!=="suffix"&&n.scheme)n.scheme=wa(n.scheme),i.push(n.scheme,":");let c=Tw(n);if(c!==void 0){if(r.reference!=="suffix")i.push("//");if(i.push(c),n.path&&n.path[0]!=="/")i.push("/")}if(n.path!==void 0){let f=n.path;if(!r.absolutePath&&(!s||!s.absolutePath))f=l&&f[0]!=="/"?_a(f):e1(f);if(l)f=ya(f,!0);if(c===void 0&&f[0]==="/"&&f[1]==="/")f="/%2F"+f.slice(2);i.push(f)}if(n.query!==void 0)i.push("?",Dw(n.query));if(n.fragment!==void 0)i.push("#",Iw(n.fragment));return i.join("")}var Kw=/^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u,Hw=/^(?:[^#/:?]+:)?\/\/([^/?#]*)/,Gw=/^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;function Jw(t,e){if(e[2]!==void 0&&t.path&&t.path[0]!=="/")return'URI path must start with "/" when authority is present.';if(typeof t.port==="number"&&(t.port<0||t.port>65535))return"URI port is malformed.";return}function t1(t){if(t===void 0)return!1;let e=t.indexOf("%");while(e!==-1){if(e+2>=t.length||!/^[\da-f]{2}$/iu.test(t.slice(e+1,e+3)))return!0;e=t.indexOf("%",e+3)}return!1}function $n(t){return t[0]==="["&&t[t.length-1]==="]"}function Yw(t){let e=t[4];return t1(t[3])||e!==void 0&&!$n(e)&&t1(e)||t1(t[6])||t1(t[7])||t1(t[8])}function Ca(t,e,n,r){if(Sa(t,e,n,r))return t.error=t.error||"URI host is malformed.",!0;if(!e.unicodeSupport&&(!n||!n.unicodeSupport)&&t.host&&!$n(t.host)&&(e.domainHost||n&&n.domainHost)&&r===!1&&qw(t.host)){let i;try{i=new URL("http://"+t.host)}catch(s){return t.error=t.error||"Host's domain name can not be converted to ASCII: "+s,!0}if(!Ww(i))return t.error=t.error||"URI host is malformed.",!0;t.host=i.hostname}return!1}function Sa(t,e,n,r){return Boolean(t.host&&r===!1&&!$n(t.host)&&(e.domainHost||n&&n.domainHost)&&Rw.test(t.host))}function Ww(t){return t.username===""&&t.password===""&&t.port===""&&t.pathname==="/"&&t.search===""&&t.hash===""&&t.hostname!==""}function _n(t,e){let n=Object.assign({},e),r={scheme:void 0,userinfo:void 0,host:"",port:void 0,path:"",query:void 0,fragment:void 0},i=!1,s=!1,o=!1,l=!1,a=!1,c=!1,f=!1;if(n.reference==="suffix")if(n.scheme)t=n.scheme+":"+t;else t="//"+t;let u=t.match(Hw);if(u!==null&&u[1].indexOf("\\")!==-1)r.error="URI authority must not contain a literal backslash.",i=!0;let d=t.match(Gw);if(d!==null){let g=d[1],p=g.replace(/[\t\n\r]/g,"");if(p.length>=2){if(p.slice(0,2)!=="//")r.error=r.error||"URI authority must not contain a literal backslash.",i=!0;else if(g.length!==p.length)r.error=r.error||"URI authority introducer must not contain whitespace.",i=!0}}let h=t.match(Kw);if(h){if(r.scheme=h[1],r.userinfo=h[3],r.host=h[4],r.port=parseInt(h[5],10),r.path=h[6]||"",r.query=h[7],r.fragment=h[8],r.scheme!==void 0)if(La.test(r.scheme))r.scheme=r.scheme.toLowerCase();else r.error=r.error||"URI scheme is malformed.",c=!0;if(s=Yw(h),s)r.error=r.error||"URI contains malformed percent-encoding.";if(isNaN(r.port))r.port=h[5];let g=Jw(r,h);if(g!==void 0)r.error=r.error||g,i=!0;if(r.host)if(xa(r.host)===!1){let y=$n(r.host),w=r.host.indexOf("[")!==-1||r.host.indexOf("]")!==-1,k=ba(r.host);if(f=k.isIPV6||k.isIPVFuture===!0,a=w&&(!y||k.error===!0),r.host=f?k.host:k.host.toLowerCase(),a)r.error=r.error||"URI host is malformed.",i=!0}else f=!0;if(r.scheme===void 0&&r.userinfo===void 0&&r.host===void 0&&r.port===void 0&&r.query===void 0&&!r.path)r.reference="same-document";else if(r.scheme===void 0)r.reference="relative";else if(r.fragment===void 0)r.reference="absolute";else r.reference="uri";if(n.reference&&n.reference!=="suffix"&&n.reference!==r.reference)r.error=r.error||"URI is not a "+n.reference+" reference.";let p=ss(n.scheme||r.scheme);if(!a)l=Ca(r,n,p,f);if(t.indexOf("%")!==-1&&r.host!==void 0&&!a){let m=f?r.host:is(r.host,!0);if(!f)m=is(m.toLowerCase());r.host=f||n.scheme!=="null"?zw(m,f):m}if(!p||p&&!p.skipNormalize){if(r.path)r.path=jw(r.path);if(r.query)r.query=va(r.query);if(r.fragment)r.fragment=va(r.fragment)}if(p&&p.parse){if(p.parse(r,n),p===$a.urn&&r.nid===void 0)o=!0}}else r.error=r.error||"URI can not be parsed.";return{parsed:r,malformedAuthorityOrPort:i,malformedPercentEncoding:s,malformedSchemeSpecific:o,malformedHost:l,malformedScheme:c}}function xn(t,e){return _n(t,e).parsed}function Zw(t,e){return Fa(t,e).normalized}function Fa(t,e){let{parsed:n,malformedAuthorityOrPort:r,malformedPercentEncoding:i,malformedSchemeSpecific:s,malformedHost:o,malformedScheme:l}=_n(t,e);return{normalized:r||i||s||o||l?t:ze(n,e),malformedAuthorityOrPort:r,malformedPercentEncoding:i,malformedSchemeSpecific:s,malformedHost:o,malformedScheme:l}}function ka(t,e){if(typeof t!=="string"&&typeof t!=="object")return;let n;try{n=typeof t==="string"?t:ze(t,e)}catch{return}let{normalized:r,malformedAuthorityOrPort:i,malformedPercentEncoding:s,malformedSchemeSpecific:o,malformedHost:l,malformedScheme:a}=Fa(n,e);return i||s||o||l||a?void 0:r}var os={SCHEMES:$a,normalize:Bw,resolve:Vw,resolveComponent:Ma,equal:Uw,serialize:ze,parse:xn};Ln.exports=os;Ln.exports.default=os;Ln.exports.fastUri=os});var Oa=v(function(Pa){Object.defineProperty(Pa,"__esModule",{value:!0});var Aa=Ea();Aa.code='require("ajv/dist/runtime/uri").default';Pa.default=Aa});var Va=v(function(Xt){Object.defineProperty(Xt,"__esModule",{value:!0});Xt.CodeGen=Xt.Name=Xt.nil=Xt.stringify=Xt.str=Xt._=Xt.KeywordCxt=void 0;var Xw=W0();Object.defineProperty(Xt,"KeywordCxt",{enumerable:!0,get:function(){return Xw.KeywordCxt}});var u0=D();Object.defineProperty(Xt,"_",{enumerable:!0,get:function(){return u0._}});Object.defineProperty(Xt,"str",{enumerable:!0,get:function(){return u0.str}});Object.defineProperty(Xt,"stringify",{enumerable:!0,get:function(){return u0.stringify}});Object.defineProperty(Xt,"nil",{enumerable:!0,get:function(){return u0.nil}});Object.defineProperty(Xt,"Name",{enumerable:!0,get:function(){return u0.Name}});Object.defineProperty(Xt,"CodeGen",{enumerable:!0,get:function(){return u0.CodeGen}});var tk=yn(),Ia=Z0(),za=Di(),zt=X0(),qa=D(),qt=Y0(),me=J0(),c0=z(),Na=ra(),ek=Oa(),Ra=(t,e)=>new RegExp(t,e);Ra.code="new RegExp";var nk=["removeAdditional","useDefaults","coerceTypes"],rk=new Set(["validate","serialize","parse","wrapper","root","schema","keyword","pattern","formats","validate$data","func","obj","Error"]),ik={errorDataPath:"",format:"`validateFormats: false` can be used instead.",nullable:'"nullable" keyword is supported by default.',jsonPointers:"Deprecated jsPropertySyntax can be used instead.",extendRefs:"Deprecated ignoreKeywordsWithRef can be used instead.",missingRefs:"Pass empty schema with $id that should be ignored to ajv.addSchema.",processCode:"Use option `code: {process: (code, schemaEnv: object) => string}`",sourceCode:"Use option `code: {source: true}`",strictDefaults:"It is default now, see option `strict`.",strictKeywords:"It is default now, see option `strict`.",uniqueItems:'"uniqueItems" keyword is always validated.',unknownFormats:"Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",cache:"Map is used as cache, schema object as key.",serialize:"Map is used as cache, schema object as key.",ajvErrors:"It is default now."},sk={ignoreKeywordsWithRef:"",jsPropertySyntax:"",unicode:'"minLength"/"maxLength" account for unicode characters by default.'},Ta=200;function ok(t){var e,n,r,i,s,o,l,a,c,f,u,d,h,g,p,m,y,w,k,x,_,S,A,L,j;let H=t.strict,Z=(e=t.code)===null||e===void 0?void 0:e.optimize,V=Z===!0||Z===void 0?1:Z||0,C=(r=(n=t.code)===null||n===void 0?void 0:n.regExp)!==null&&r!==void 0?r:Ra,O=(i=t.uriResolver)!==null&&i!==void 0?i:ek.default;return{strictSchema:(o=(s=t.strictSchema)!==null&&s!==void 0?s:H)!==null&&o!==void 0?o:!0,strictNumbers:(a=(l=t.strictNumbers)!==null&&l!==void 0?l:H)!==null&&a!==void 0?a:!0,strictTypes:(f=(c=t.strictTypes)!==null&&c!==void 0?c:H)!==null&&f!==void 0?f:"log",strictTuples:(d=(u=t.strictTuples)!==null&&u!==void 0?u:H)!==null&&d!==void 0?d:"log",strictRequired:(g=(h=t.strictRequired)!==null&&h!==void 0?h:H)!==null&&g!==void 0?g:!1,code:t.code?{...t.code,optimize:V,regExp:C}:{optimize:V,regExp:C},loopRequired:(p=t.loopRequired)!==null&&p!==void 0?p:Ta,loopEnum:(m=t.loopEnum)!==null&&m!==void 0?m:Ta,meta:(y=t.meta)!==null&&y!==void 0?y:!0,messages:(w=t.messages)!==null&&w!==void 0?w:!0,inlineRefs:(k=t.inlineRefs)!==null&&k!==void 0?k:!0,schemaId:(x=t.schemaId)!==null&&x!==void 0?x:"$id",addUsedSchema:(_=t.addUsedSchema)!==null&&_!==void 0?_:!0,validateSchema:(S=t.validateSchema)!==null&&S!==void 0?S:!0,validateFormats:(A=t.validateFormats)!==null&&A!==void 0?A:!0,unicodeRegExp:(L=t.unicodeRegExp)!==null&&L!==void 0?L:!0,int32range:(j=t.int32range)!==null&&j!==void 0?j:!0,uriResolver:O}}class Mn{constructor(t={}){this.schemas={},this.refs={},this.formats=Object.create(null),this._compilations=new Set,this._loading={},this._cache=new Map,t=this.opts={...t,...ok(t)};let{es5:e,lines:n}=this.opts.code;this.scope=new qa.ValueScope({scope:{},prefixes:rk,es5:e,lines:n}),this.logger=dk(t.logger);let r=t.validateFormats;if(t.validateFormats=!1,this.RULES=za.getRules(),ja.call(this,ik,t,"NOT SUPPORTED"),ja.call(this,sk,t,"DEPRECATED","warn"),this._metaOpts=uk.call(this),t.formats)ak.call(this);if(this._addVocabularies(),this._addDefaultMetaSchema(),t.keywords)ck.call(this,t.keywords);if(typeof t.meta=="object")this.addMetaSchema(t.meta);lk.call(this),t.validateFormats=r}_addVocabularies(){this.addKeyword("$async")}_addDefaultMetaSchema(){let{$data:t,meta:e,schemaId:n}=this.opts,r=Na;if(n==="id")r={...Na},r.id=r.$id,delete r.$id;if(e&&t)this.addMetaSchema(r,r[n],!1)}defaultMeta(){let{meta:t,schemaId:e}=this.opts;return this.opts.defaultMeta=typeof t=="object"?t[e]||t:void 0}validate(t,e){let n;if(typeof t=="string"){if(n=this.getSchema(t),!n)throw Error(`no schema with key or ref "${t}"`)}else n=this.compile(t);let r=n(e);if(!("$async"in n))this.errors=n.errors;return r}compile(t,e){let n=this._addSchema(t,e);return n.validate||this._compileSchemaEnv(n)}compileAsync(t,e){if(typeof this.opts.loadSchema!="function")throw Error("options.loadSchema should be a function");let{loadSchema:n}=this.opts;return r.call(this,t,e);async function r(c,f){await i.call(this,c.$schema);let u=this._addSchema(c,f);return u.validate||s.call(this,u)}async function i(c){if(c&&!this.getSchema(c))await r.call(this,{$ref:c},!0)}async function s(c){try{return this._compileSchemaEnv(c)}catch(f){if(!(f instanceof Ia.default))throw f;return o.call(this,f),await l.call(this,f.missingSchema),s.call(this,c)}}function o({missingSchema:c,missingRef:f}){if(this.refs[c])throw Error(`AnySchema ${c} is loaded but ${f} cannot be resolved`)}async function l(c){let f=await a.call(this,c);if(!this.refs[c])await i.call(this,f.$schema);if(!this.refs[c])this.addSchema(f,c,e)}async function a(c){let f=this._loading[c];if(f)return f;try{return await(this._loading[c]=n(c))}finally{delete this._loading[c]}}}addSchema(t,e,n,r=this.opts.validateSchema){if(Array.isArray(t)){for(let s of t)this.addSchema(s,void 0,n,r);return this}let i;if(typeof t==="object"){let{schemaId:s}=this.opts;if(i=t[s],i!==void 0&&typeof i!="string")throw Error(`schema ${s} must be string`)}return e=qt.normalizeId(e||i),this._checkUnique(e),this.schemas[e]=this._addSchema(t,n,e,r,!0),this}addMetaSchema(t,e,n=this.opts.validateSchema){return this.addSchema(t,e,!0,n),this}validateSchema(t,e){if(typeof t=="boolean")return!0;let n;if(n=t.$schema,n!==void 0&&typeof n!="string")throw Error("$schema must be a string");if(n=n||this.opts.defaultMeta||this.defaultMeta(),!n)return this.logger.warn("meta-schema not available"),this.errors=null,!0;let r=this.validate(n,t);if(!r&&e){let i="schema is invalid: "+this.errorsText();if(this.opts.validateSchema==="log")this.logger.error(i);else throw Error(i)}return r}getSchema(t){let e;while(typeof(e=Da.call(this,t))=="string")t=e;if(e===void 0){let{schemaId:n}=this.opts,r=new zt.SchemaEnv({schema:{},schemaId:n});if(e=zt.resolveSchema.call(this,r,t),!e)return;this.refs[t]=e}return e.validate||this._compileSchemaEnv(e)}removeSchema(t){if(t instanceof RegExp)return this._removeAllSchemas(this.schemas,t),this._removeAllSchemas(this.refs,t),this;switch(typeof t){case"undefined":return this._removeAllSchemas(this.schemas),this._removeAllSchemas(this.refs),this._cache.clear(),this;case"string":{let e=Da.call(this,t);if(typeof e=="object")this._cache.delete(e.schema);return delete this.schemas[t],delete this.refs[t],this}case"object":{let e=t;this._cache.delete(e);let n=t[this.opts.schemaId];if(n)n=qt.normalizeId(n),delete this.schemas[n],delete this.refs[n];return this}default:throw Error("ajv.removeSchema: invalid parameter")}}addVocabulary(t){for(let e of t)this.addKeyword(e);return this}addKeyword(t,e){let n;if(typeof t=="string"){if(n=t,typeof e=="object")this.logger.warn("these parameters are deprecated, see docs for addKeyword"),e.keyword=n}else if(typeof t=="object"&&e===void 0){if(e=t,n=e.keyword,Array.isArray(n)&&!n.length)throw Error("addKeywords: keyword must be string or non-empty array")}else throw Error("invalid addKeywords parameters");if(hk.call(this,n,e),!e)return c0.eachItem(n,(i)=>ls.call(this,i)),this;mk.call(this,e);let r={...e,type:me.getJSONTypes(e.type),schemaType:me.getJSONTypes(e.schemaType)};return c0.eachItem(n,r.type.length===0?(i)=>ls.call(this,i,r):(i)=>r.type.forEach((s)=>ls.call(this,i,r,s))),this}getKeyword(t){let e=this.RULES.all[t];return typeof e=="object"?e.definition:!!e}removeKeyword(t){let{RULES:e}=this;delete e.keywords[t],delete e.all[t];for(let n of e.rules){let r=n.rules.findIndex((i)=>i.keyword===t);if(r>=0)n.rules.splice(r,1)}return this}addFormat(t,e){if(typeof e=="string")e=new RegExp(e);return this.formats[t]=e,this}errorsText(t=this.errors,{separator:e=", ",dataVar:n="data"}={}){if(!t||t.length===0)return"No errors";return t.map((r)=>`${n}${r.instancePath} ${r.message}`).reduce((r,i)=>r+e+i)}$dataMetaSchema(t,e){let n=this.RULES.all;t=JSON.parse(JSON.stringify(t));for(let r of e){let i=r.split("/").slice(1),s=t;for(let o of i)s=s[o];for(let o in n){let l=n[o];if(typeof l!="object")continue;let{$data:a}=l.definition,c=s[o];if(a&&c)s[o]=Ba(c)}}return t}_removeAllSchemas(t,e){for(let n in t){let r=t[n];if(!e||e.test(n)){if(typeof r=="string")delete t[n];else if(r&&!r.meta)this._cache.delete(r.schema),delete t[n]}}}_addSchema(t,e,n,r=this.opts.validateSchema,i=this.opts.addUsedSchema){let s,{schemaId:o}=this.opts;if(typeof t=="object")s=t[o];else if(this.opts.jtd)throw Error("schema must be object");else if(typeof t!="boolean")throw Error("schema must be object or boolean");let l=this._cache.get(t);if(l!==void 0)return l;n=qt.normalizeId(s||n);let a=qt.getSchemaRefs.call(this,t,n);if(l=new zt.SchemaEnv({schema:t,schemaId:o,meta:e,baseId:n,localRefs:a}),this._cache.set(l.schema,l),i&&!n.startsWith("#")){if(n)this._checkUnique(n);this.refs[n]=l}if(r)this.validateSchema(t,!0);return l}_checkUnique(t){if(this.schemas[t]||this.refs[t])throw Error(`schema with key or id "${t}" already exists`)}_compileSchemaEnv(t){if(t.meta)this._compileMetaSchema(t);else zt.compileSchema.call(this,t);if(!t.validate)throw Error("ajv implementation error");return t.validate}_compileMetaSchema(t){let e=this.opts;this.opts=this._metaOpts;try{zt.compileSchema.call(this,t)}finally{this.opts=e}}}Mn.ValidationError=tk.default;Mn.MissingRefError=Ia.default;Xt.default=Mn;function ja(t,e,n,r="error"){for(let i in t){let s=i;if(s in e)this.logger[r](`${n}: option ${i}. ${t[s]}`)}}function Da(t){return t=qt.normalizeId(t),this.schemas[t]||this.refs[t]}function lk(){let t=this.opts.schemas;if(!t)return;if(Array.isArray(t))this.addSchema(t);else for(let e in t)this.addSchema(t[e],e)}function ak(){for(let t in this.opts.formats){let e=this.opts.formats[t];if(e)this.addFormat(t,e)}}function ck(t){if(Array.isArray(t)){this.addVocabulary(t);return}this.logger.warn("keywords option as map is deprecated, pass array");for(let e in t){let n=t[e];if(!n.keyword)n.keyword=e;this.addKeyword(n)}}function uk(){let t={...this.opts};for(let e of nk)delete t[e];return t}var fk={log(){},warn(){},error(){}};function dk(t){if(t===!1)return fk;if(t===void 0)return console;if(t.log&&t.warn&&t.error)return t;throw Error("logger must implement log, warn and error methods")}var pk=/^[a-z_$][a-z0-9_$:-]*$/i;function hk(t,e){let{RULES:n}=this;if(c0.eachItem(t,(r)=>{if(n.keywords[r])throw Error(`Keyword ${r} is already defined`);if(!pk.test(r))throw Error(`Keyword ${r} has invalid name`)}),!e)return;if(e.$data&&!(("code"in e)||("validate"in e)))throw Error('$data keyword must have "code" or "validate" function')}function ls(t,e,n){var r;let i=e===null||e===void 0?void 0:e.post;if(n&&i)throw Error('keyword with "post" flag cannot have "type"');let{RULES:s}=this,o=i?s.post:s.rules.find(({type:a})=>a===n);if(!o)o={type:n,rules:[]},s.rules.push(o);if(s.keywords[t]=!0,!e)return;let l={keyword:t,definition:{...e,type:me.getJSONTypes(e.type),schemaType:me.getJSONTypes(e.schemaType)}};if(e.before)gk.call(this,o,l,e.before);else o.rules.push(l);s.all[t]=l,(r=e.implements)===null||r===void 0||r.forEach((a)=>this.addKeyword(a))}function gk(t,e,n){let r=t.rules.findIndex((i)=>i.keyword===n);if(r>=0)t.rules.splice(r,0,e);else t.rules.push(e),this.logger.warn(`rule ${n} is not defined`)}function mk(t){let{metaSchema:e}=t;if(e===void 0)return;if(t.$data&&this.opts.$data)e=Ba(e);t.validateSchema=this.compile(e,!0)}var yk={$ref:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"};function Ba(t){return{anyOf:[t,yk]}}});var Ka=v(function(Ua){Object.defineProperty(Ua,"__esModule",{value:!0});var kk={keyword:"id",code(){throw Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID')}};Ua.default=kk});var En=v(function(Ga){Object.defineProperty(Ga,"__esModule",{value:!0});Ga.callRef=Ga.getValidate=void 0;var _k=Z0(),Sn=Mt(),Y=D(),f0=$t(),Fn=X0(),ye=z(),xk={keyword:"$ref",schemaType:"string",code(t){let{gen:e,schema:n,it:r}=t,{baseId:i,schemaEnv:s,validateName:o,opts:l,self:a}=r,{root:c}=s;if((n==="#"||n==="#/")&&i===c.baseId)return u();let f=Fn.resolveRef.call(a,c,i,n);if(f===void 0)throw new _k.default(r.opts.uriResolver,i,n);if(f instanceof Fn.SchemaEnv)return d(f);return h(f);function u(){if(s===c)return Cn(t,o,s,s.$async);let g=e.scopeValue("root",{ref:c});return Cn(t,Y._`${g}.validate`,c,c.$async)}function d(g){let p=Ha(t,g);Cn(t,p,g,g.$async)}function h(g){let p=e.scopeValue("schema",l.code.source===!0?{ref:g,code:Y.stringify(g)}:{ref:g}),m=e.name("valid"),y=t.subschema({schema:g,dataTypes:[],schemaPath:Y.nil,topSchemaRef:p,errSchemaPath:n},m);t.mergeEvaluated(y),t.ok(m)}}};function Ha(t,e){let{gen:n}=t;return e.validate?n.scopeValue("validate",{ref:e.validate}):Y._`${n.scopeValue("wrapper",{ref:e})}.validate`}Ga.getValidate=Ha;function Cn(t,e,n,r){let{gen:i,it:s}=t,{allErrors:o,schemaEnv:l,opts:a}=s,c=a.passContext?f0.default.this:Y.nil;if(r)f();else u();function f(){if(!l.$async)throw Error("async schema referenced by sync schema");let g=i.let("valid");i.try(()=>{if(i.code(Y._`await ${Sn.callValidateCode(t,e,c)}`),h(e),!o)i.assign(g,!0)},(p)=>{if(i.if(Y._`!(${p} instanceof ${s.ValidationError})`,()=>i.throw(p)),d(p),!o)i.assign(g,!1)}),t.ok(g)}function u(){t.result(Sn.callValidateCode(t,e,c),()=>h(e),()=>d(e))}function d(g){let p=Y._`${g}.errors`;i.assign(f0.default.vErrors,Y._`${f0.default.vErrors} === null ? ${p} : ${f0.default.vErrors}.concat(${p})`),i.assign(f0.default.errors,Y._`${f0.default.vErrors}.length`)}function h(g){var p;if(!s.opts.unevaluated)return;let m=(p=n===null||n===void 0?void 0:n.validate)===null||p===void 0?void 0:p.evaluated;if(s.props!==!0)if(m&&!m.dynamicProps){if(m.props!==void 0)s.props=ye.mergeEvaluated.props(i,m.props,s.props)}else{let y=i.var("props",Y._`${g}.evaluated.props`);s.props=ye.mergeEvaluated.props(i,y,s.props,Y.Name)}if(s.items!==!0)if(m&&!m.dynamicItems){if(m.items!==void 0)s.items=ye.mergeEvaluated.items(i,m.items,s.items)}else{let y=i.var("items",Y._`${g}.evaluated.items`);s.items=ye.mergeEvaluated.items(i,y,s.items,Y.Name)}}}Ga.callRef=Cn;Ga.default=xk});var Wa=v(function(Ya){Object.defineProperty(Ya,"__esModule",{value:!0});var Mk=Ka(),Ck=En(),Sk=["$schema","$id","$defs","$vocabulary",{keyword:"$comment"},"definitions",Mk.default,Ck.default];Ya.default=Sk});var Qa=v(function(Za){Object.defineProperty(Za,"__esModule",{value:!0});var we=D(),ve=we.operators,An={maximum:{okStr:"<=",ok:ve.LTE,fail:ve.GT},minimum:{okStr:">=",ok:ve.GTE,fail:ve.LT},exclusiveMaximum:{okStr:"<",ok:ve.LT,fail:ve.GTE},exclusiveMinimum:{okStr:">",ok:ve.GT,fail:ve.LTE}},Ek={message:({keyword:t,schemaCode:e})=>we.str`must be ${An[t].okStr} ${e}`,params:({keyword:t,schemaCode:e})=>we._`{comparison: ${An[t].okStr}, limit: ${e}}`},Ak={keyword:Object.keys(An),type:"number",schemaType:"number",$data:!0,error:Ek,code(t){let{keyword:e,data:n,schemaCode:r}=t;t.fail$data(we._`${n} ${An[e].fail} ${r} || isNaN(${n})`)}};Za.default=Ak});var t3=v(function(Xa){Object.defineProperty(Xa,"__esModule",{value:!0});var Rt=D(),Ok={message:({schemaCode:t})=>Rt.str`must be multiple of ${t}`,params:({schemaCode:t})=>Rt._`{multipleOf: ${t}}`},Nk={keyword:"multipleOf",type:"number",schemaType:"number",$data:!0,error:Ok,code(t){let{gen:e,data:n,schemaCode:r,it:i}=t,s=i.opts.multipleOfPrecision,o=e.let("res"),l=s?Rt._`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}`:Rt._`${o} !== parseInt(${o})`;t.fail$data(Rt._`(${r} === 0 || (${o} = ${n}/${r}, ${l}))`)}};Xa.default=Nk});var r3=v(function(n3){Object.defineProperty(n3,"__esModule",{value:!0});function e3(t){let e=t.length,n=0,r=0,i;while(r<e)if(n++,i=t.charCodeAt(r++),i>=55296&&i<=56319&&r<e){if(i=t.charCodeAt(r),(i&64512)===56320)r++}return n}n3.default=e3;e3.code='require("ajv/dist/runtime/ucs2length").default'});var o3=v(function(s3){Object.defineProperty(s3,"__esModule",{value:!0});var ht=D(),i3=z(),Dk=r3(),Ik={message({keyword:t,schemaCode:e}){return ht.str`must NOT have ${t==="maxLength"?"more":"fewer"} than ${e} characters`},params:({schemaCode:t})=>ht._`{limit: ${t}}`},zk={keyword:["maxLength","minLength"],type:"string",schemaType:"number",$data:!0,error:Ik,code(t){let{keyword:e,data:n,schemaCode:r,it:i}=t,s=e==="maxLength"?ht.operators.GT:ht.operators.LT,o=i.opts.unicode===!1?ht._`${n}.length`:ht._`${i3.useFunc(t.gen,Dk.default)}(${n})`;t.fail$data(ht._`${o} ${s} ${r}`)}};s3.default=zk});var u3=v(function(c3){Object.defineProperty(c3,"__esModule",{value:!0});var l3=Mt(),a3=z(),Ct=D(),Rk={message:({schemaCode:t})=>Ct.str`must match pattern "${t}"`,params:({schemaCode:t})=>Ct._`{pattern: ${t}}`},Bk={keyword:"pattern",type:"string",schemaType:"string",$data:!0,error:Rk,code(t){let{gen:e,data:n,$data:r,schema:i,schemaCode:s,it:o}=t,l=o.opts.unicodeRegExp?"u":"";if(r){let{regExp:a}=o.opts.code,c=a.code==="new RegExp"?Ct._`new RegExp`:a3.useFunc(e,a),f=e.let("valid");e.try(()=>e.assign(f,Ct._`${c}(${s}, ${l}).test(${n})`),()=>e.assign(f,!1)),t.fail$data(Ct._`!${f}`)}else{let a=l3.usePattern(t,i);t.fail$data(Ct._`!${a}.test(${n})`)}}};c3.default=Bk});var d3=v(function(f3){Object.defineProperty(f3,"__esModule",{value:!0});var Bt=D(),Uk={message({keyword:t,schemaCode:e}){return Bt.str`must NOT have ${t==="maxProperties"?"more":"fewer"} than ${e} properties`},params:({schemaCode:t})=>Bt._`{limit: ${t}}`},Kk={keyword:["maxProperties","minProperties"],type:"object",schemaType:"number",$data:!0,error:Uk,code(t){let{keyword:e,data:n,schemaCode:r}=t,i=e==="maxProperties"?Bt.operators.GT:Bt.operators.LT;t.fail$data(Bt._`Object.keys(${n}).length ${i} ${r}`)}};f3.default=Kk});var g3=v(function(h3){Object.defineProperty(h3,"__esModule",{value:!0});var Vt=Mt(),Ut=D(),p3=z(),Gk={message:({params:{missingProperty:t}})=>Ut.str`must have required property '${t}'`,params:({params:{missingProperty:t}})=>Ut._`{missingProperty: ${t}}`},Jk={keyword:"required",type:"object",schemaType:"array",$data:!0,error:Gk,code(t){let{gen:e,schema:n,schemaCode:r,data:i,$data:s,it:o}=t,{opts:l}=o;if(!s&&n.length===0)return;let a=n.length>=l.loopRequired;if(o.allErrors)c();else f();if(l.strictRequired){let h=t.parentSchema.properties,{definedProperties:g}=t.it;for(let p of n)if((h===null||h===void 0?void 0:h[p])===void 0&&!g.has(p)){let m=o.schemaEnv.baseId+o.errSchemaPath,y=`required property "${p}" is not defined at "${m}" (strictRequired)`;p3.checkStrictMode(o,y,o.opts.strictRequired)}}function c(){if(a||s)t.block$data(Ut.nil,u);else for(let h of n)Vt.checkReportMissingProp(t,h)}function f(){let h=e.let("missing");if(a||s){let g=e.let("valid",!0);t.block$data(g,()=>d(h,g)),t.ok(g)}else e.if(Vt.checkMissingProp(t,n,h)),Vt.reportMissingProp(t,h),e.else()}function u(){e.forOf("prop",r,(h)=>{t.setParams({missingProperty:h}),e.if(Vt.noPropertyInData(e,i,h,l.ownProperties),()=>t.error())})}function d(h,g){t.setParams({missingProperty:h}),e.forOf(h,r,()=>{e.assign(g,Vt.propertyInData(e,i,h,l.ownProperties)),e.if(Ut.not(g),()=>{t.error(),e.break()})},Ut.nil)}}};h3.default=Jk});var y3=v(function(m3){Object.defineProperty(m3,"__esModule",{value:!0});var Kt=D(),Wk={message({keyword:t,schemaCode:e}){return Kt.str`must NOT have ${t==="maxItems"?"more":"fewer"} than ${e} items`},params:({schemaCode:t})=>Kt._`{limit: ${t}}`},Zk={keyword:["maxItems","minItems"],type:"array",schemaType:"number",$data:!0,error:Wk,code(t){let{keyword:e,data:n,schemaCode:r}=t,i=e==="maxItems"?Kt.operators.GT:Kt.operators.LT;t.fail$data(Kt._`${n}.length ${i} ${r}`)}};m3.default=Zk});var Pn=v(function(w3){Object.defineProperty(w3,"__esModule",{value:!0});var v3=Ui();v3.code='require("ajv/dist/runtime/equal").default';w3.default=v3});var _3=v(function(b3){Object.defineProperty(b3,"__esModule",{value:!0});var d0=J0(),R=D(),k3=z(),tb=Pn(),eb={message:({params:{i:t,j:e}})=>R.str`must NOT have duplicate items (items ## ${e} and ${t} are identical)`,params:({params:{i:t,j:e}})=>R._`{i: ${t}, j: ${e}}`},nb={keyword:"uniqueItems",type:"array",schemaType:"boolean",$data:!0,error:eb,code(t){let{gen:e,data:n,$data:r,schema:i,parentSchema:s,schemaCode:o,it:l}=t;if(!r&&!i)return;let a=e.let("valid"),c=s.items?d0.getSchemaTypes(s.items):[];t.block$data(a,f,R._`${o} === false`),t.ok(a);function f(){let g=e.let("i",R._`${n}.length`),p=e.let("j");t.setParams({i:g,j:p}),e.assign(a,!0),e.if(R._`${g} > 1`,()=>(u()?d:h)(g,p))}function u(){return c.length>0&&!c.some((g)=>g==="object"||g==="array")}function d(g,p){let m=e.name("item"),y=d0.checkDataTypes(c,m,l.opts.strictNumbers,d0.DataType.Wrong),w=e.const("indices",R._`{}`);e.for(R._`;${g}--;`,()=>{if(e.let(m,R._`${n}[${g}]`),e.if(y,R._`continue`),c.length>1)e.if(R._`typeof ${m} == "string"`,R._`${m} += "_"`);e.if(R._`typeof ${w}[${m}] == "number"`,()=>{e.assign(p,R._`${w}[${m}]`),t.error(),e.assign(a,!1).break()}).code(R._`${w}[${m}] = ${g}`)})}function h(g,p){let m=k3.useFunc(e,tb.default),y=e.name("outer");e.label(y).for(R._`;${g}--;`,()=>e.for(R._`${p} = ${g}; ${p}--;`,()=>e.if(R._`${m}(${n}[${g}], ${n}[${p}])`,()=>{t.error(),e.assign(a,!1).break(y)})))}}};b3.default=nb});var L3=v(function($3){Object.defineProperty($3,"__esModule",{value:!0});var p0=D(),x3=z(),ib=Pn(),sb={message:"must be equal to constant",params:({schemaCode:t})=>p0._`{allowedValue: ${t}}`},ob={keyword:"const",$data:!0,error:sb,code(t){let{gen:e,data:n,$data:r,schemaCode:i,schema:s}=t;if(r||s&&typeof s=="object")t.fail$data(p0._`!${x3.useFunc(e,ib.default)}(${n}, ${i})`);else t.fail(p0._`${s} !== ${n}`)}};$3.default=ob});var S3=v(function(C3){Object.defineProperty(C3,"__esModule",{value:!0});var Ht=D(),M3=z(),ab=Pn(),cb={message:"must be equal to one of the allowed values",params:({schemaCode:t})=>Ht._`{allowedValues: ${t}}`},ub={keyword:"enum",schemaType:"array",$data:!0,error:cb,code(t){let{gen:e,data:n,$data:r,schema:i,schemaCode:s,it:o}=t;if(!r&&i.length===0)throw Error("enum must have non-empty array");let l=i.length>=o.opts.loopEnum,a,c=()=>a!==null&&a!==void 0?a:a=M3.useFunc(e,ab.default),f;if(l||r)f=e.let("valid"),t.block$data(f,u);else{if(!Array.isArray(i))throw Error("ajv implementation error");let h=e.const("vSchema",s);f=Ht.or(...i.map((g,p)=>d(h,p)))}t.pass(f);function u(){e.assign(f,!1),e.forOf("v",s,(h)=>e.if(Ht._`${c()}(${n}, ${h})`,()=>e.assign(f,!0).break()))}function d(h,g){let p=i[g];return typeof p==="object"&&p!==null?Ht._`${c()}(${n}, ${h}[${g}])`:Ht._`${n} === ${p}`}}};C3.default=ub});var E3=v(function(F3){Object.defineProperty(F3,"__esModule",{value:!0});var db=Qa(),pb=t3(),hb=o3(),gb=u3(),mb=d3(),yb=g3(),vb=y3(),wb=_3(),kb=L3(),bb=S3(),_b=[db.default,pb.default,hb.default,gb.default,mb.default,yb.default,vb.default,wb.default,{keyword:"type",schemaType:["string","array"]},{keyword:"nullable",schemaType:"boolean"},kb.default,bb.default];F3.default=_b});var as=v(function(P3){Object.defineProperty(P3,"__esModule",{value:!0});P3.validateAdditionalItems=void 0;var gt=D(),h0=z(),$b={message:({params:{len:t}})=>gt.str`must NOT have more than ${t} items`,params:({params:{len:t}})=>gt._`{limit: ${t}}`},Lb={keyword:"additionalItems",type:"array",schemaType:["boolean","object"],before:"uniqueItems",error:$b,code(t){let{parentSchema:e,it:n}=t,{items:r}=e;if(!Array.isArray(r)){h0.checkStrictMode(n,'"additionalItems" is ignored when "items" is not an array of schemas');return}A3(t,r)}};function A3(t,e){let{gen:n,schema:r,data:i,keyword:s,it:o}=t;o.items=!0;let l=n.const("len",gt._`${i}.length`);if(r===!1)t.setParams({len:e.length}),t.pass(gt._`${l} <= ${e.length}`);else if(typeof r=="object"&&!h0.alwaysValidSchema(o,r)){let c=n.var("valid",gt._`${l} <= ${e.length}`);n.if(gt.not(c),()=>a(c)),t.ok(c)}function a(c){n.forRange("i",e.length,l,(f)=>{if(t.subschema({keyword:s,dataProp:f,dataPropType:h0.Type.Num},c),!o.allErrors)n.if(gt.not(c),()=>n.break())})}}P3.validateAdditionalItems=A3;P3.default=Lb});var cs=v(function(j3){Object.defineProperty(j3,"__esModule",{value:!0});j3.validateTuple=void 0;var On=D(),ke=z(),N3=Mt(),Cb={keyword:"items",type:"array",schemaType:["object","array","boolean"],before:"uniqueItems",code(t){let{schema:e,it:n}=t;if(Array.isArray(e))return T3(t,"additionalItems",e);if(n.items=!0,ke.alwaysValidSchema(n,e))return;t.ok(N3.validateArray(t))}};function T3(t,e,n=t.schema){let{gen:r,parentSchema:i,data:s,keyword:o,it:l}=t;if(f(i),l.opts.unevaluated&&n.length&&l.items!==!0)l.items=ke.mergeEvaluated.items(r,n.length,l.items);let a=r.name("valid"),c=r.const("len",On._`${s}.length`);n.forEach((u,d)=>{if(ke.alwaysValidSchema(l,u))return;r.if(On._`${c} > ${d}`,()=>t.subschema({keyword:o,schemaProp:d,dataProp:d},a)),t.ok(a)});function f(u){let{opts:d,errSchemaPath:h}=l,g=n.length,p=g===u.minItems&&(g===u.maxItems||u[e]===!1);if(d.strictTuples&&!p){let m=`"${o}" is ${g}-tuple, but minItems or maxItems/${e} are not specified or different at path "${h}"`;ke.checkStrictMode(l,m,d.strictTuples)}}}j3.validateTuple=T3;j3.default=Cb});var q3=v(function(z3){Object.defineProperty(z3,"__esModule",{value:!0});var I3=cs(),Fb={keyword:"prefixItems",type:"array",schemaType:["array"],before:"uniqueItems",code:(t)=>I3.validateTuple(t,"items")};z3.default=Fb});var K3=v(function(U3){Object.defineProperty(U3,"__esModule",{value:!0});var Nn=D(),R3=z(),B3=Mt(),V3=as(),Ab={message:({params:{len:t}})=>Nn.str`must NOT have more than ${t} items`,params:({params:{len:t}})=>Nn._`{limit: ${t}}`},Pb={keyword:"items",type:"array",schemaType:["object","boolean"],before:"uniqueItems",error:Ab,code(t){let{schema:e,parentSchema:n,it:r}=t,{prefixItems:i}=n;if(r.items=!0,R3.alwaysValidSchema(r,e))return;if(i)V3.validateAdditionalItems(t,i);else t.ok(B3.validateArray(t))}};U3.default=Pb});var G3=v(function(H3){Object.defineProperty(H3,"__esModule",{value:!0});var W=D(),be=z(),Nb={message:({params:{min:t,max:e}})=>e===void 0?W.str`must contain at least ${t} valid item(s)`:W.str`must contain at least ${t} and no more than ${e} valid item(s)`,params:({params:{min:t,max:e}})=>e===void 0?W._`{minContains: ${t}}`:W._`{minContains: ${t}, maxContains: ${e}}`},Tb={keyword:"contains",type:"array",schemaType:["object","boolean"],before:"uniqueItems",trackErrors:!0,error:Nb,code(t){let{gen:e,schema:n,parentSchema:r,data:i,it:s}=t,o,l,{minContains:a,maxContains:c}=r;if(s.opts.next)o=a===void 0?1:a,l=c;else o=1;let f=e.const("len",W._`${i}.length`);if(t.setParams({min:o,max:l}),l===void 0&&o===0){be.checkStrictMode(s,'"minContains" == 0 without "maxContains": "contains" keyword ignored');return}if(l!==void 0&&o>l){be.checkStrictMode(s,'"minContains" > "maxContains" is always invalid'),t.fail();return}if(be.alwaysValidSchema(s,n)){let p=W._`${f} >= ${o}`;if(l!==void 0)p=W._`${p} && ${f} <= ${l}`;t.pass(p);return}s.items=!0;let u=e.name("valid");if(l===void 0&&o===1)h(u,()=>e.if(u,()=>e.break()));else if(o===0){if(e.let(u,!0),l!==void 0)e.if(W._`${i}.length > 0`,d)}else e.let(u,!1),d();t.result(u,()=>t.reset());function d(){let p=e.name("_valid"),m=e.let("count",0);h(p,()=>e.if(p,()=>g(m)))}function h(p,m){e.forRange("i",0,f,(y)=>{t.subschema({keyword:"contains",dataProp:y,dataPropType:be.Type.Num,compositeRule:!0},p),m()})}function g(p){if(e.code(W._`${p}++`),l===void 0)e.if(W._`${p} >= ${o}`,()=>e.assign(u,!0).break());else if(e.if(W._`${p} > ${l}`,()=>e.assign(u,!1).break()),o===1)e.assign(u,!0);else e.if(W._`${p} >= ${o}`,()=>e.assign(u,!0))}}};H3.default=Tb});var Tn=v(function(Z3){Object.defineProperty(Z3,"__esModule",{value:!0});Z3.validateSchemaDeps=Z3.validatePropertyDeps=Z3.error=void 0;var g0=D(),J3=z(),Gt=Mt();Z3.error={message:({params:{property:t,depsCount:e,deps:n}})=>g0.str`must have ${e===1?"property":"properties"} ${n} when property ${t} is present`,params:({params:{property:t,depsCount:e,deps:n,missingProperty:r}})=>g0._`{property: ${t},
    missingProperty: ${r},
    depsCount: ${e},
    deps: ${n}}`};var Db={keyword:"dependencies",type:"object",schemaType:"object",error:Z3.error,code(t){let[e,n]=Ib(t);Y3(t,e),W3(t,n)}};function Ib({schema:t}){let e={},n={};for(let r in t){if(r==="__proto__")continue;let i=Array.isArray(t[r])?e:n;i[r]=t[r]}return[e,n]}function Y3(t,e=t.schema){let{gen:n,data:r,it:i}=t;if(Object.keys(e).length===0)return;let s=n.let("missing");for(let o in e){let l=e[o];if(l.length===0)continue;let a=Gt.propertyInData(n,r,o,i.opts.ownProperties);if(t.setParams({property:o,depsCount:l.length,deps:l.join(", ")}),i.allErrors)n.if(a,()=>{for(let c of l)Gt.checkReportMissingProp(t,c)});else n.if(g0._`${a} && (${Gt.checkMissingProp(t,l,s)})`),Gt.reportMissingProp(t,s),n.else()}}Z3.validatePropertyDeps=Y3;function W3(t,e=t.schema){let{gen:n,data:r,keyword:i,it:s}=t,o=n.name("valid");for(let l in e){if(J3.alwaysValidSchema(s,e[l]))continue;n.if(Gt.propertyInData(n,r,l,s.opts.ownProperties),()=>{let a=t.subschema({keyword:i,schemaProp:l},o);t.mergeValidEvaluated(a,o)},()=>n.var(o,!0)),t.ok(o)}}Z3.validateSchemaDeps=W3;Z3.default=Db});var nc=v(function(ec){Object.defineProperty(ec,"__esModule",{value:!0});var jn=D(),tc=z(),Rb={message:"property name must be valid",params:({params:t})=>jn._`{propertyName: ${t.propertyName}}`},Bb={keyword:"propertyNames",type:"object",schemaType:["object","boolean"],error:Rb,code(t){let{gen:e,schema:n,data:r,it:i}=t;if(tc.alwaysValidSchema(i,n))return;let s=e.name("valid");e.forIn("key",r,(o)=>{t.setParams({propertyName:o}),t.subschema({keyword:"propertyNames",data:o,dataTypes:["string"],propertyName:o,compositeRule:!0},s),e.if(jn.not(s),()=>{if(t.error(!0),!i.allErrors)e.break()})}),t.ok(s)}};ec.default=Bb});var us=v(function(rc){Object.defineProperty(rc,"__esModule",{value:!0});var _e=Mt(),et=D(),Ub=$t(),xe=z(),Kb={message:"must NOT have additional properties",params:({params:t})=>et._`{additionalProperty: ${t.additionalProperty}}`},Hb={keyword:"additionalProperties",type:["object"],schemaType:["boolean","object"],allowUndefined:!0,trackErrors:!0,error:Kb,code(t){let{gen:e,schema:n,parentSchema:r,data:i,errsCount:s,it:o}=t;if(!s)throw Error("ajv implementation error");let{allErrors:l,opts:a}=o;if(o.props=!0,a.removeAdditional!=="all"&&xe.alwaysValidSchema(o,n))return;let c=_e.allSchemaProperties(r.properties),f=_e.allSchemaProperties(r.patternProperties);u(),t.ok(et._`${s} === ${Ub.default.errors}`);function u(){e.forIn("key",i,(m)=>{if(!c.length&&!f.length)g(m);else e.if(d(m),()=>g(m))})}function d(m){let y;if(c.length>8){let w=xe.schemaRefOrVal(o,r.properties,"properties");y=_e.isOwnProperty(e,w,m)}else if(c.length)y=et.or(...c.map((w)=>et._`${m} === ${w}`));else y=et.nil;if(f.length)y=et.or(y,...f.map((w)=>et._`${_e.usePattern(t,w)}.test(${m})`));return et.not(y)}function h(m){e.code(et._`delete ${i}[${m}]`)}function g(m){if(a.removeAdditional==="all"||a.removeAdditional&&n===!1){h(m);return}if(n===!1){if(t.setParams({additionalProperty:m}),t.error(),!l)e.break();return}if(typeof n=="object"&&!xe.alwaysValidSchema(o,n)){let y=e.name("valid");if(a.removeAdditional==="failing")p(m,y,!1),e.if(et.not(y),()=>{t.reset(),h(m)});else if(p(m,y),!l)e.if(et.not(y),()=>e.break())}}function p(m,y,w){let k={keyword:"additionalProperties",dataProp:m,dataPropType:xe.Type.Str};if(w===!1)Object.assign(k,{compositeRule:!0,createErrors:!1,allErrors:!1});t.subschema(k,y)}}};rc.default=Hb});var lc=v(function(oc){Object.defineProperty(oc,"__esModule",{value:!0});var sc=W0(),Dn=Mt(),m0=z(),ic=us(),Jb={keyword:"properties",type:"object",schemaType:"object",code(t){let{gen:e,schema:n,parentSchema:r,data:i,it:s}=t;if(s.opts.removeAdditional==="all"&&r.additionalProperties===void 0)ic.default.code(new sc.KeywordCxt(s,ic.default,"additionalProperties"));let o=Dn.allSchemaProperties(n);for(let u of o)s.definedProperties.add(u);if(s.opts.unevaluated&&o.length&&s.props!==!0)s.props=m0.mergeEvaluated.props(e,m0.toHash(o),s.props);let l=o.filter((u)=>!m0.alwaysValidSchema(s,n[u]));if(l.length===0)return;let a=e.name("valid");for(let u of l){if(c(u))f(u);else{if(e.if(Dn.propertyInData(e,i,u,s.opts.ownProperties)),f(u),!s.allErrors)e.else().var(a,!0);e.endIf()}t.it.definedProperties.add(u),t.ok(a)}function c(u){return s.opts.useDefaults&&!s.compositeRule&&n[u].default!==void 0}function f(u){t.subschema({keyword:"properties",schemaProp:u,dataProp:u},a)}}};oc.default=Jb});var cc=v(function(ac){Object.defineProperty(ac,"__esModule",{value:!0});var In=Mt(),$e=D(),zn=z(),qn=z(),Wb={keyword:"patternProperties",type:"object",schemaType:"object",code(t){let{gen:e,schema:n,data:r,parentSchema:i,it:s}=t,{opts:o}=s,l=In.allSchemaProperties(n),a=l.filter((p)=>zn.alwaysValidSchema(s,n[p]));if(l.length===0||a.length===l.length&&(!s.opts.unevaluated||s.props===!0))return;let c=o.strictSchema&&!o.allowMatchingProperties&&i.properties,f=e.name("valid");if(s.props!==!0&&!(s.props instanceof $e.Name))s.props=qn.evaluatedPropsToName(e,s.props);let{props:u}=s;d();function d(){for(let p of l){if(c)h(p);if(s.allErrors)g(p);else e.var(f,!0),g(p),e.if(f)}}function h(p){for(let m in c)if(new RegExp(p).test(m))zn.checkStrictMode(s,`property ${m} matches pattern ${p} (use allowMatchingProperties)`)}function g(p){e.forIn("key",r,(m)=>{e.if($e._`${In.usePattern(t,p)}.test(${m})`,()=>{let y=a.includes(p);if(!y)t.subschema({keyword:"patternProperties",schemaProp:p,dataProp:m,dataPropType:qn.Type.Str},f);if(s.opts.unevaluated&&u!==!0)e.assign($e._`${u}[${m}]`,!0);else if(!y&&!s.allErrors)e.if($e.not(f),()=>e.break())})})}}};ac.default=Wb});var dc=v(function(fc){Object.defineProperty(fc,"__esModule",{value:!0});var uc=z(),Qb={keyword:"not",schemaType:["object","boolean"],trackErrors:!0,code(t){let{gen:e,schema:n,it:r}=t;if(uc.alwaysValidSchema(r,n)){t.fail();return}let i=e.name("valid");t.subschema({keyword:"not",compositeRule:!0,createErrors:!1,allErrors:!1},i),t.failResult(i,()=>t.reset(),()=>t.error())},error:{message:"must NOT be valid"}};fc.default=Qb});var gc=v(function(hc){Object.defineProperty(hc,"__esModule",{value:!0});var pc=Mt(),t_={keyword:"anyOf",schemaType:"array",trackErrors:!0,code:pc.validateUnion,error:{message:"must match a schema in anyOf"}};hc.default=t_});var vc=v(function(yc){Object.defineProperty(yc,"__esModule",{value:!0});var Le=D(),mc=z(),n_={message:"must match exactly one schema in oneOf",params:({params:t})=>Le._`{passingSchemas: ${t.passing}}`},r_={keyword:"oneOf",schemaType:"array",trackErrors:!0,error:n_,code(t){let{gen:e,schema:n,parentSchema:r,it:i}=t;if(!Array.isArray(n))throw Error("ajv implementation error");if(i.opts.discriminator&&r.discriminator)return;let s=n,o=e.let("valid",!1),l=e.let("passing",null),a=e.name("_valid");t.setParams({passing:l}),e.block(c),t.result(o,()=>t.reset(),()=>t.error(!0));function c(){s.forEach((f,u)=>{let d;if(mc.alwaysValidSchema(i,f))e.var(a,!0);else d=t.subschema({keyword:"oneOf",schemaProp:u,compositeRule:!0},a);if(u>0)e.if(Le._`${a} && ${o}`).assign(o,!1).assign(l,Le._`[${l}, ${u}]`).else();e.if(a,()=>{if(e.assign(o,!0),e.assign(l,u),d)t.mergeEvaluated(d,Le.Name)})})}}};yc.default=r_});var bc=v(function(kc){Object.defineProperty(kc,"__esModule",{value:!0});var wc=z(),s_={keyword:"allOf",schemaType:"array",code(t){let{gen:e,schema:n,it:r}=t;if(!Array.isArray(n))throw Error("ajv implementation error");let i=e.name("valid");n.forEach((s,o)=>{if(wc.alwaysValidSchema(r,s))return;let l=t.subschema({keyword:"allOf",schemaProp:o},i);t.ok(i),t.mergeEvaluated(l)})}};kc.default=s_});var $c=v(function(xc){Object.defineProperty(xc,"__esModule",{value:!0});var Me=D(),Rn=z(),l_={message:({params:t})=>Me.str`must match "${t.ifClause}" schema`,params:({params:t})=>Me._`{failingKeyword: ${t.ifClause}}`},a_={keyword:"if",schemaType:["object","boolean"],trackErrors:!0,error:l_,code(t){let{gen:e,parentSchema:n,it:r}=t;if(n.then===void 0&&n.else===void 0)Rn.checkStrictMode(r,'"if" without "then" and "else" is ignored');let i=_c(r,"then"),s=_c(r,"else");if(!i&&!s)return;let o=e.let("valid",!0),l=e.name("_valid");if(a(),t.reset(),i&&s){let f=e.let("ifClause");t.setParams({ifClause:f}),e.if(l,c("then",f),c("else",f))}else if(i)e.if(l,c("then"));else e.if(Me.not(l),c("else"));t.pass(o,()=>t.error(!0));function a(){let f=t.subschema({keyword:"if",compositeRule:!0,createErrors:!1,allErrors:!1},l);t.mergeEvaluated(f)}function c(f,u){return()=>{let d=t.subschema({keyword:f},l);if(e.assign(o,l),t.mergeValidEvaluated(d,o),u)e.assign(u,Me._`${f}`);else t.setParams({ifClause:f})}}}};function _c(t,e){let n=t.schema[e];return n!==void 0&&!Rn.alwaysValidSchema(t,n)}xc.default=a_});var Cc=v(function(Mc){Object.defineProperty(Mc,"__esModule",{value:!0});var Lc=z(),u_={keyword:["then","else"],schemaType:["object","boolean"],code({keyword:t,parentSchema:e,it:n}){if(e.if===void 0)Lc.checkStrictMode(n,`"${t}" without "if" is ignored`)}};Mc.default=u_});var Fc=v(function(Sc){Object.defineProperty(Sc,"__esModule",{value:!0});var d_=as(),p_=q3(),h_=cs(),g_=K3(),m_=G3(),y_=Tn(),v_=nc(),w_=us(),k_=lc(),b_=cc(),__=dc(),x_=gc(),$_=vc(),L_=bc(),M_=$c(),C_=Cc();function S_(t=!1){let e=[__.default,x_.default,$_.default,L_.default,M_.default,C_.default,v_.default,w_.default,y_.default,k_.default,b_.default];if(t)e.push(p_.default,g_.default);else e.push(d_.default,h_.default);return e.push(m_.default),e}Sc.default=S_});var fs=v(function(Pc){Object.defineProperty(Pc,"__esModule",{value:!0});Pc.dynamicAnchor=void 0;var y0=D(),E_=$t(),Bn=X0(),Ec=En(),A_={keyword:"$dynamicAnchor",schemaType:"string",code:(t)=>Ac(t,t.schema)};function Ac(t,e){let{gen:n,it:r}=t;r.schemaEnv.root.dynamicAnchors[e]=!0;let i=y0._`${E_.default.dynamicAnchors}${y0.getProperty(e)}`,s=r.errSchemaPath==="#"?r.validateName:P_(t);n.if(y0._`!${i}`,()=>n.assign(i,s))}Pc.dynamicAnchor=Ac;function P_(t){let{schemaEnv:e,schema:n,self:r}=t.it,{root:i,baseId:s,localRefs:o,meta:l}=e.root,{schemaId:a}=r.opts,c=new Bn.SchemaEnv({schema:n,schemaId:a,root:i,baseId:s,localRefs:o,meta:l});return Bn.compileSchema.call(r,c),Ec.getValidate(t,c)}Pc.default=A_});var ds=v(function(Tc){Object.defineProperty(Tc,"__esModule",{value:!0});Tc.dynamicRef=void 0;var Vn=D(),N_=$t(),Un=En(),T_={keyword:"$dynamicRef",schemaType:"string",code:(t)=>Nc(t,t.schema)};function Nc(t,e){let{gen:n,keyword:r,it:i}=t;if(e[0]!=="#")throw Error(`"${r}" only supports hash fragment reference`);let s=e.slice(1);if(i.allErrors)o();else{let a=n.let("valid",!1);o(a),t.ok(a)}function o(a){if(i.schemaEnv.root.dynamicAnchors[s]){let c=n.let("_v",Vn._`${N_.default.dynamicAnchors}${Vn.getProperty(s)}`);n.if(c,l(c,a),l(i.validateName,a))}else l(i.validateName,a)()}function l(a,c){return c?()=>n.block(()=>{Un.callRef(t,a),n.let(c,!0)}):()=>Un.callRef(t,a)}}Tc.dynamicRef=Nc;Tc.default=T_});var qc=v(function(zc){Object.defineProperty(zc,"__esModule",{value:!0});var Dc=fs(),Ic=z(),D_={keyword:"$recursiveAnchor",schemaType:"boolean",code(t){if(t.schema)Dc.dynamicAnchor(t,"");else Ic.checkStrictMode(t.it,"$recursiveAnchor: false is ignored")}};zc.default=D_});var Vc=v(function(Bc){Object.defineProperty(Bc,"__esModule",{value:!0});var Rc=ds(),z_={keyword:"$recursiveRef",schemaType:"string",code:(t)=>Rc.dynamicRef(t,t.schema)};Bc.default=z_});var Kc=v(function(Uc){Object.defineProperty(Uc,"__esModule",{value:!0});var R_=fs(),B_=ds(),V_=qc(),U_=Vc(),K_=[R_.default,B_.default,V_.default,U_.default];Uc.default=K_});var Gc=v(function(Hc){Object.defineProperty(Hc,"__esModule",{value:!0});var Kn=Tn(),G_={keyword:"dependentRequired",type:"object",schemaType:"object",error:Kn.error,code:(t)=>Kn.validatePropertyDeps(t)};Hc.default=G_});var Wc=v(function(Yc){Object.defineProperty(Yc,"__esModule",{value:!0});var Jc=Tn(),Y_={keyword:"dependentSchemas",type:"object",schemaType:"object",code:(t)=>Jc.validateSchemaDeps(t)};Yc.default=Y_});var Xc=v(function(Qc){Object.defineProperty(Qc,"__esModule",{value:!0});var Zc=z(),Z_={keyword:["maxContains","minContains"],type:"array",schemaType:"number",code({keyword:t,parentSchema:e,it:n}){if(e.contains===void 0)Zc.checkStrictMode(n,`"${t}" without "contains" is ignored`)}};Qc.default=Z_});var e4=v(function(t4){Object.defineProperty(t4,"__esModule",{value:!0});var X_=Gc(),tx=Wc(),ex=Xc(),nx=[X_.default,tx.default,ex.default];t4.default=nx});var r4=v(function(n4){Object.defineProperty(n4,"__esModule",{value:!0});var at=D(),Hn=z(),ix=$t(),sx={message:"must NOT have unevaluated properties",params:({params:t})=>at._`{unevaluatedProperty: ${t.unevaluatedProperty}}`},ox={keyword:"unevaluatedProperties",type:"object",schemaType:["boolean","object"],trackErrors:!0,error:sx,code(t){let{gen:e,schema:n,data:r,errsCount:i,it:s}=t;if(!i)throw Error("ajv implementation error");let{allErrors:o,props:l}=s;if(l instanceof at.Name)e.if(at._`${l} !== true`,()=>e.forIn("key",r,(u)=>e.if(c(l,u),()=>a(u))));else if(l!==!0)e.forIn("key",r,(u)=>l===void 0?a(u):e.if(f(l,u),()=>a(u)));s.props=!0,t.ok(at._`${i} === ${ix.default.errors}`);function a(u){if(n===!1){if(t.setParams({unevaluatedProperty:u}),t.error(),!o)e.break();return}if(!Hn.alwaysValidSchema(s,n)){let d=e.name("valid");if(t.subschema({keyword:"unevaluatedProperties",dataProp:u,dataPropType:Hn.Type.Str},d),!o)e.if(at.not(d),()=>e.break())}}function c(u,d){return at._`!${u} || !${u}[${d}]`}function f(u,d){let h=[];for(let g in u)if(u[g]===!0)h.push(at._`${d} !== ${g}`);return at.and(...h)}}};n4.default=ox});var s4=v(function(i4){Object.defineProperty(i4,"__esModule",{value:!0});var mt=D(),Gn=z(),ax={message:({params:{len:t}})=>mt.str`must NOT have more than ${t} items`,params:({params:{len:t}})=>mt._`{limit: ${t}}`},cx={keyword:"unevaluatedItems",type:"array",schemaType:["boolean","object"],error:ax,code(t){let{gen:e,schema:n,data:r,it:i}=t,s=i.items||0;if(s===!0)return;let o=e.const("len",mt._`${r}.length`);if(n===!1)t.setParams({len:s}),t.fail(mt._`${o} > ${s}`);else if(typeof n=="object"&&!Gn.alwaysValidSchema(i,n)){let a=e.var("valid",mt._`${o} <= ${s}`);e.if(mt.not(a),()=>l(a,s)),t.ok(a)}i.items=!0;function l(a,c){e.forRange("i",c,o,(f)=>{if(t.subschema({keyword:"unevaluatedItems",dataProp:f,dataPropType:Gn.Type.Num},a),!i.allErrors)e.if(mt.not(a),()=>e.break())})}}};i4.default=cx});var l4=v(function(o4){Object.defineProperty(o4,"__esModule",{value:!0});var fx=r4(),dx=s4(),px=[fx.default,dx.default];o4.default=px});var c4=v(function(a4){Object.defineProperty(a4,"__esModule",{value:!0});var I=D(),gx={message:({schemaCode:t})=>I.str`must match format "${t}"`,params:({schemaCode:t})=>I._`{format: ${t}}`},mx={keyword:"format",type:["number","string"],schemaType:"string",$data:!0,error:gx,code(t,e){let{gen:n,data:r,$data:i,schema:s,schemaCode:o,it:l}=t,{opts:a,errSchemaPath:c,schemaEnv:f,self:u}=l;if(!a.validateFormats)return;if(i)d();else h();function d(){let g=n.scopeValue("formats",{ref:u.formats,code:a.code.formats}),p=n.const("fDef",I._`${g}[${o}]`),m=n.let("fType"),y=n.let("format");n.if(I._`typeof ${p} == "object" && !(${p} instanceof RegExp)`,()=>n.assign(m,I._`${p}.type || "string"`).assign(y,I._`${p}.validate`),()=>n.assign(m,I._`"string"`).assign(y,p)),t.fail$data(I.or(w(),k()));function w(){if(a.strictSchema===!1)return I.nil;return I._`${o} && !${y}`}function k(){let x=f.$async?I._`(${p}.async ? await ${y}(${r}) : ${y}(${r}))`:I._`${y}(${r})`,_=I._`(typeof ${y} == "function" ? ${x} : ${y}.test(${r}))`;return I._`${y} && ${y} !== true && ${m} === ${e} && !${_}`}}function h(){let g=u.formats[s];if(!g){w();return}if(g===!0)return;let[p,m,y]=k(g);if(p===e)t.pass(x());function w(){if(a.strictSchema===!1){u.logger.warn(_());return}throw Error(_());function _(){return`unknown format "${s}" ignored in schema at path "${c}"`}}function k(_){let S=_ instanceof RegExp?I.regexpCode(_):a.code.formats?I._`${a.code.formats}${I.getProperty(s)}`:void 0,A=n.scopeValue("formats",{key:s,ref:_,code:S});if(typeof _=="object"&&!(_ instanceof RegExp))return[_.type||"string",_.validate,I._`${A}.validate`];return["string",_,A]}function x(){if(typeof g=="object"&&!(g instanceof RegExp)&&g.async){if(!f.$async)throw Error("async format in sync schema");return I._`await ${y}(${r})`}return typeof m=="function"?I._`${y}(${r})`:I._`${y}.test(${r})`}}}};a4.default=mx});var f4=v(function(u4){Object.defineProperty(u4,"__esModule",{value:!0});var vx=c4(),wx=[vx.default];u4.default=wx});var h4=v(function(d4){Object.defineProperty(d4,"__esModule",{value:!0});d4.contentVocabulary=d4.metadataVocabulary=void 0;d4.metadataVocabulary=["title","description","default","deprecated","readOnly","writeOnly","examples"];d4.contentVocabulary=["contentMediaType","contentEncoding","contentSchema"]});var m4=v(function(g4){Object.defineProperty(g4,"__esModule",{value:!0});var _x=Wa(),xx=E3(),$x=Fc(),Lx=Kc(),Mx=e4(),Cx=l4(),Sx=f4(),Jn=h4(),Fx=[Lx.default,_x.default,xx.default,(0,$x.default)(!0),Sx.default,Jn.metadataVocabulary,Jn.contentVocabulary,Mx.default,Cx.default];g4.default=Fx});var k4=v(function(v4){Object.defineProperty(v4,"__esModule",{value:!0});v4.DiscrError=void 0;var y4;(function(t){t.Tag="tag",t.Mapping="mapping"})(y4||(v4.DiscrError=y4={}))});var x4=v(function(_4){Object.defineProperty(_4,"__esModule",{value:!0});var St=D(),v0=k4(),Yn=X0(),Ax=Z0(),b4=z(),Px={message:({params:{discrError:t,tagName:e}})=>t===v0.DiscrError.Tag?`tag "${e}" must be string`:`value of tag "${e}" must be in oneOf`,params:({params:{discrError:t,tag:e,tagName:n}})=>St._`{error: ${t}, tag: ${n}, tagValue: ${e}}`},Ox={keyword:"discriminator",type:"object",schemaType:"object",error:Px,code(t){let{gen:e,data:n,schema:r,parentSchema:i,it:s}=t,{oneOf:o}=i;if(!s.opts.discriminator)throw Error("discriminator: requires discriminator option");let l=r.propertyName;if(typeof l!="string")throw Error("discriminator: requires propertyName");if(r.mapping)throw Error("discriminator: mapping is not supported");if(!o)throw Error("discriminator: requires oneOf keyword");let a=e.let("valid",!1),c=e.const("tag",St._`${n}${St.getProperty(l)}`);e.if(St._`typeof ${c} == "string"`,()=>f(),()=>t.error(!1,{discrError:v0.DiscrError.Tag,tag:c,tagName:l})),t.ok(a);function f(){let h=d();e.if(!1);for(let g in h)e.elseIf(St._`${c} === ${g}`),e.assign(a,u(h[g]));e.else(),t.error(!1,{discrError:v0.DiscrError.Mapping,tag:c,tagName:l}),e.endIf()}function u(h){let g=e.name("valid"),p=t.subschema({keyword:"oneOf",schemaProp:h},g);return t.mergeEvaluated(p,St.Name),g}function d(){var h;let g={},p=y(i),m=!0;for(let x=0;x<o.length;x++){let _=o[x];if((_===null||_===void 0?void 0:_.$ref)&&!b4.schemaHasRulesButRef(_,s.self.RULES)){let A=_.$ref;if(_=Yn.resolveRef.call(s.self,s.schemaEnv.root,s.baseId,A),_ instanceof Yn.SchemaEnv)_=_.schema;if(_===void 0)throw new Ax.default(s.opts.uriResolver,s.baseId,A)}let S=(h=_===null||_===void 0?void 0:_.properties)===null||h===void 0?void 0:h[l];if(typeof S!="object")throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);m=m&&(p||y(_)),w(S,x)}if(!m)throw Error(`discriminator: "${l}" must be required`);return g;function y({required:x}){return Array.isArray(x)&&x.includes(l)}function w(x,_){if(x.const)k(x.const,_);else if(x.enum)for(let S of x.enum)k(S,_);else throw Error(`discriminator: "properties/${l}" must have "const" or "enum"`)}function k(x,_){if(typeof x!="string"||x in g)throw Error(`discriminator: "${l}" values must be unique strings`);g[x]=_}}}};_4.default=Ox});var $4=v(function(sS,Tx){Tx.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/schema",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/core":!0,"https://json-schema.org/draft/2020-12/vocab/applicator":!0,"https://json-schema.org/draft/2020-12/vocab/unevaluated":!0,"https://json-schema.org/draft/2020-12/vocab/validation":!0,"https://json-schema.org/draft/2020-12/vocab/meta-data":!0,"https://json-schema.org/draft/2020-12/vocab/format-annotation":!0,"https://json-schema.org/draft/2020-12/vocab/content":!0},$dynamicAnchor:"meta",title:"Core and Validation specifications meta-schema",allOf:[{$ref:"meta/core"},{$ref:"meta/applicator"},{$ref:"meta/unevaluated"},{$ref:"meta/validation"},{$ref:"meta/meta-data"},{$ref:"meta/format-annotation"},{$ref:"meta/content"}],type:["object","boolean"],$comment:"This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.",properties:{definitions:{$comment:'"definitions" has been replaced by "$defs".',type:"object",additionalProperties:{$dynamicRef:"#meta"},deprecated:!0,default:{}},dependencies:{$comment:'"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',type:"object",additionalProperties:{anyOf:[{$dynamicRef:"#meta"},{$ref:"meta/validation#/$defs/stringArray"}]},deprecated:!0,default:{}},$recursiveAnchor:{$comment:'"$recursiveAnchor" has been replaced by "$dynamicAnchor".',$ref:"meta/core#/$defs/anchorString",deprecated:!0},$recursiveRef:{$comment:'"$recursiveRef" has been replaced by "$dynamicRef".',$ref:"meta/core#/$defs/uriReferenceString",deprecated:!0}}}});var L4=v(function(oS,jx){jx.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/applicator",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/applicator":!0},$dynamicAnchor:"meta",title:"Applicator vocabulary meta-schema",type:["object","boolean"],properties:{prefixItems:{$ref:"#/$defs/schemaArray"},items:{$dynamicRef:"#meta"},contains:{$dynamicRef:"#meta"},additionalProperties:{$dynamicRef:"#meta"},properties:{type:"object",additionalProperties:{$dynamicRef:"#meta"},default:{}},patternProperties:{type:"object",additionalProperties:{$dynamicRef:"#meta"},propertyNames:{format:"regex"},default:{}},dependentSchemas:{type:"object",additionalProperties:{$dynamicRef:"#meta"},default:{}},propertyNames:{$dynamicRef:"#meta"},if:{$dynamicRef:"#meta"},then:{$dynamicRef:"#meta"},else:{$dynamicRef:"#meta"},allOf:{$ref:"#/$defs/schemaArray"},anyOf:{$ref:"#/$defs/schemaArray"},oneOf:{$ref:"#/$defs/schemaArray"},not:{$dynamicRef:"#meta"}},$defs:{schemaArray:{type:"array",minItems:1,items:{$dynamicRef:"#meta"}}}}});var M4=v(function(lS,Dx){Dx.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/unevaluated",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/unevaluated":!0},$dynamicAnchor:"meta",title:"Unevaluated applicator vocabulary meta-schema",type:["object","boolean"],properties:{unevaluatedItems:{$dynamicRef:"#meta"},unevaluatedProperties:{$dynamicRef:"#meta"}}}});var C4=v(function(aS,Ix){Ix.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/content",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/content":!0},$dynamicAnchor:"meta",title:"Content vocabulary meta-schema",type:["object","boolean"],properties:{contentEncoding:{type:"string"},contentMediaType:{type:"string"},contentSchema:{$dynamicRef:"#meta"}}}});var S4=v(function(cS,zx){zx.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/core",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/core":!0},$dynamicAnchor:"meta",title:"Core vocabulary meta-schema",type:["object","boolean"],properties:{$id:{$ref:"#/$defs/uriReferenceString",$comment:"Non-empty fragments not allowed.",pattern:"^[^#]*#?$"},$schema:{$ref:"#/$defs/uriString"},$ref:{$ref:"#/$defs/uriReferenceString"},$anchor:{$ref:"#/$defs/anchorString"},$dynamicRef:{$ref:"#/$defs/uriReferenceString"},$dynamicAnchor:{$ref:"#/$defs/anchorString"},$vocabulary:{type:"object",propertyNames:{$ref:"#/$defs/uriString"},additionalProperties:{type:"boolean"}},$comment:{type:"string"},$defs:{type:"object",additionalProperties:{$dynamicRef:"#meta"}}},$defs:{anchorString:{type:"string",pattern:"^[A-Za-z_][-A-Za-z0-9._]*$"},uriString:{type:"string",format:"uri"},uriReferenceString:{type:"string",format:"uri-reference"}}}});var F4=v(function(uS,qx){qx.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/format-annotation",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/format-annotation":!0},$dynamicAnchor:"meta",title:"Format vocabulary meta-schema for annotation results",type:["object","boolean"],properties:{format:{type:"string"}}}});var E4=v(function(fS,Rx){Rx.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/meta-data",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/meta-data":!0},$dynamicAnchor:"meta",title:"Meta-data vocabulary meta-schema",type:["object","boolean"],properties:{title:{type:"string"},description:{type:"string"},default:!0,deprecated:{type:"boolean",default:!1},readOnly:{type:"boolean",default:!1},writeOnly:{type:"boolean",default:!1},examples:{type:"array",items:!0}}}});var A4=v(function(dS,Bx){Bx.exports={$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://json-schema.org/draft/2020-12/meta/validation",$vocabulary:{"https://json-schema.org/draft/2020-12/vocab/validation":!0},$dynamicAnchor:"meta",title:"Validation vocabulary meta-schema",type:["object","boolean"],properties:{type:{anyOf:[{$ref:"#/$defs/simpleTypes"},{type:"array",items:{$ref:"#/$defs/simpleTypes"},minItems:1,uniqueItems:!0}]},const:!0,enum:{type:"array",items:!0},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/$defs/nonNegativeInteger"},minLength:{$ref:"#/$defs/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},maxItems:{$ref:"#/$defs/nonNegativeInteger"},minItems:{$ref:"#/$defs/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},maxContains:{$ref:"#/$defs/nonNegativeInteger"},minContains:{$ref:"#/$defs/nonNegativeInteger",default:1},maxProperties:{$ref:"#/$defs/nonNegativeInteger"},minProperties:{$ref:"#/$defs/nonNegativeIntegerDefault0"},required:{$ref:"#/$defs/stringArray"},dependentRequired:{type:"object",additionalProperties:{$ref:"#/$defs/stringArray"}}},$defs:{nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{$ref:"#/$defs/nonNegativeInteger",default:0},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}}}});var O4=v(function(P4){Object.defineProperty(P4,"__esModule",{value:!0});var Vx=$4(),Ux=L4(),Kx=M4(),Hx=C4(),Gx=S4(),Jx=F4(),Yx=E4(),Wx=A4(),Zx=["/properties"];function Qx(t){return[Vx,Ux,Kx,Hx,Gx,e(this,Jx),Yx,e(this,Wx)].forEach((n)=>this.addMetaSchema(n,void 0,!1)),this;function e(n,r){return t?n.$dataMetaSchema(r,Zx):r}}P4.default=Qx});var N4=v(function(yt,hs){Object.defineProperty(yt,"__esModule",{value:!0});yt.MissingRefError=yt.ValidationError=yt.CodeGen=yt.Name=yt.nil=yt.stringify=yt.str=yt._=yt.KeywordCxt=yt.Ajv2020=void 0;var t$=Va(),e$=m4(),n$=x4(),r$=O4(),ps="https://json-schema.org/draft/2020-12/schema";class n1 extends t$.default{constructor(t={}){super({...t,dynamicRef:!0,next:!0,unevaluated:!0})}_addVocabularies(){if(super._addVocabularies(),e$.default.forEach((t)=>this.addVocabulary(t)),this.opts.discriminator)this.addKeyword(n$.default)}_addDefaultMetaSchema(){super._addDefaultMetaSchema();let{$data:t,meta:e}=this.opts;if(!e)return;r$.default.call(this,t),this.refs["http://json-schema.org/schema"]=ps}defaultMeta(){return this.opts.defaultMeta=super.defaultMeta()||(this.getSchema(ps)?ps:void 0)}}yt.Ajv2020=n1;hs.exports=yt=n1;hs.exports.Ajv2020=n1;Object.defineProperty(yt,"__esModule",{value:!0});yt.default=n1;var i$=W0();Object.defineProperty(yt,"KeywordCxt",{enumerable:!0,get:function(){return i$.KeywordCxt}});var w0=D();Object.defineProperty(yt,"_",{enumerable:!0,get:function(){return w0._}});Object.defineProperty(yt,"str",{enumerable:!0,get:function(){return w0.str}});Object.defineProperty(yt,"stringify",{enumerable:!0,get:function(){return w0.stringify}});Object.defineProperty(yt,"nil",{enumerable:!0,get:function(){return w0.nil}});Object.defineProperty(yt,"Name",{enumerable:!0,get:function(){return w0.Name}});Object.defineProperty(yt,"CodeGen",{enumerable:!0,get:function(){return w0.CodeGen}});var s$=yn();Object.defineProperty(yt,"ValidationError",{enumerable:!0,get:function(){return s$.default}});var o$=Z0();Object.defineProperty(yt,"MissingRefError",{enumerable:!0,get:function(){return o$.default}})});import{writeFile as z4}from"fs/promises";import{basename as m$,dirname as y$,extname as v$,join as w$}from"path";var ah=Wr(),ch=j0(),uh=Nr(),ai=D0(),fh=_0(),ae=q(),dh=re(),ph=nt(),hh=se(),gh=oe(),qL=V1(),mh=si(),yh=oi(),vh=li(),G1=F2(),E2=k0();var wh=ah.Composer,kh=ch.Document,bh=uh.Schema,{YAMLError:_h,YAMLParseError:ci,YAMLWarning:xh}=ai,$h=fh.Alias,{isAlias:Lh,isCollection:Mh,isDocument:Ch,isMap:Sh,isNode:Fh,isPair:Eh,isScalar:Ah,isSeq:Ph}=ae,Oh=dh.Pair,Nh=ph.Scalar,Th=hh.YAMLMap,jh=gh.YAMLSeq;var Dh=mh.Lexer,Ih=yh.LineCounter,zh=vh.Parser,{parse:ui,parseAllDocuments:qh,parseDocument:Rh,stringify:fi}=G1,{visit:Bh,visitAsync:Vh}=E2;import{readdirSync as Uh,readFileSync as Kh}from"fs";var Zt={player:'var K=typeof window<"u",Ke=K?window:null,$e=K?document:null,ee={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},J={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},M={NONE:0,AUTO:1,FORCE:2},I={replace:0,none:1,blend:2},tr=Symbol(),bs=Symbol(),ys=Symbol(),ft=Symbol(),_s=Symbol(),b=0.00000000001,Pe=1000000000000,te=1000,Ie=240,mt="";var Fe=["perspective","translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY"],sn=Fe.reduce((e,t)=>({...e,[t]:t+"("}),{}),k=()=>{},rn=(e)=>e;var be={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:Ie,loop:0,reversed:!1,alternate:!1,autoplay:!0,persist:!1,duration:te,delay:0,loopDelay:0,ease:"out(2)",composition:I.replace,modifier:rn,onBegin:k,onBeforeUpdate:k,onUpdate:k,onLoop:k,onPause:k,onComplete:k,onRender:k},ht={current:null,root:$e},v={defaults:be,precision:4,timeScale:1,tickThreshold:200,editor:null},gt={version:"4.5.0",engine:null};if(K){if(!Ke.AnimeJS)Ke.AnimeJS=[];Ke.AnimeJS.push(gt)}var W=Date.now,Ts=Array.isArray;var We=(e)=>typeof e==="function",ne=(e)=>typeof e>"u";var an=Math.floor;var on=Math.round,V=(e,t,n)=>e<t?t:e>n?n:e,_=(e,t)=>{if(t<0)return e;if(!t)return on(e);let n=10**t;return on(e*n)/n};var ye=(e,t,n)=>n===1?t:n===0?e:e+(t-e)*n,xt=(e)=>e===1/0?Pe:e===-1/0?-Pe:e,bt=(e)=>e<=b?b:xt(_(e,11)),ce=(e)=>Ts(e)?[...e]:e;var w=(e,t,n,s="_prev",r="_next")=>{let o=e._head,i=r;if(n)o=e._tail,i=s;while(o){let c=o[i];t(o),o=c}},le=(e,t,n="_prev",s="_next")=>{let r=t[n],o=t[s];r?r[s]=o:e._head=o,o?o[n]=r:e._tail=r,t[n]=null,t[s]=null},ue=(e,t,n,s="_prev",r="_next")=>{let o=e._tail;while(o&&n&&n(o,t))o=o[s];let i=o?o[r]:e._head;o?o[r]=t:e._head=t,i?i[s]=t:e._tail=t,t[s]=o,t[r]=i};var cn=(e)=>{let t=mt;for(let n=0,s=Fe.length;n<s;n++){let r=Fe[n],o=e[r];if(o!==void 0){if(r==="translateX"){let i=e.translateY;if(i!==void 0){let c=e.translateZ;if(c!==void 0)t+=`translate3d(${o},${i},${c}) `,n+=2;else t+=`translate(${o},${i}) `,n+=1;continue}}if(r==="scaleX"&&e.scale===void 0){let i=e.scaleY;if(i!==void 0){let c=e.scaleZ;if(c!==void 0)t+=`scale3d(${o},${i},${c}) `,n+=2;else t+=`scale(${o},${i}) `,n+=1;continue}}t+=`${sn[r]}${o}) `}if(r==="rotateZ"){if(e.rotate3d!==void 0)t+=`rotate3d(${e.rotate3d}) `}}if(e.matrix!==void 0)t+=`matrix(${e.matrix}) `;if(e.matrix3d!==void 0)t+=`matrix3d(${e.matrix3d}) `;return t};var G=(e,t)=>ne(e)?t:e;var Ms=()=>({t:J.NUMBER,n:0,u:null,o:null,d:null,s:null});var Er=Ms(),ln=(e,t,n)=>{let{_modifier:s,_fromNumbers:r,_toNumbers:o,_strings:i}=e,c=i[0];for(let u=0,l=o.length;u<l;u++){let f=s(_(ye(r[u],o[u],t),n)),a=i[u+1];c+=`${a?f+a:f}`,e._numbers[u]=f}return c};var De=(e,t,n,s,r)=>{let{parent:o,duration:i,completed:c,iterationDuration:u,iterationCount:l,_currentIteration:f,_loopDelay:a,_reversed:m,_alternate:h,_hasChildren:d,_delay:x,_currentTime:D}=e,Q=x+u,E=t-x,U=V(D,-x,i),N=V(E,-x,i),y=E-D,P=N>0,X=N>=i,oe=i<=b,ge=r===M.FORCE,Ae=0,ie=E,ot=0;if(l>1){let qe=u+(X?0:a),H=~~(N/qe);if(e._currentIteration=V(H,0,l),X)e._currentIteration--;Ae=e._currentIteration%2,ie=N-H*qe||0}let Ue=m^(h&&Ae),qt=e._ease,q=X?Ue?0:i:Ue?u-ie:ie;if(qt)q=u*qt(q/u)||0;let ae=(o?o.backwards:E<D)?!Ue:!!Ue;if(e._currentTime=E,e._iterationTime=q,e.backwards=ae,P&&!e.began){if(e.began=!0,!n&&!(o&&(ae||!o.began)))e.onBegin(e)}else if(E<=0)e.began=!1;if(!n&&!d&&P&&e._currentIteration!==f)e.onLoop(e);if(ge||r===M.AUTO&&(t>=(o&&x>0?0:x)&&t<=Q||t<=x&&U>x||t>=Q&&U!==i)||q>=Q&&U!==i||q<=x&&U>0&&!X||t<=U&&U===i&&c||X&&!c&&oe){if(P){if(e.computeDeltaTime(U),!n)e.onBeforeUpdate(e)}if(!d){let qe=ge||(ae?y*-1:y)>=v.tickThreshold,H=_(e._offset+(o?o._offset:0)+x+q,12),p=e._head,j,ze,zt,it,at=0;while(p){let Yt=p._composition,ct=p._currentTime,Jt=p._changeDuration,lt=p._absoluteStartTime+p._changeDuration,T=p._nextRep,B=p._prevRep,Xt=Yt!==I.none,ut=B?B._absoluteStartTime+B._changeDuration:0,Ce=B&&B.parent!==p.parent,Kt=!T||T._isOverridden?lt:T.parent===p.parent?lt+T._delay:T._absoluteStartTime<T._absoluteUpdateStartTime?T._absoluteStartTime:T._absoluteUpdateStartTime;if((qe||(ct!==Jt||H<=Kt||B&&!Ce&&(!T||T.parent!==p.parent))&&(ct!==0||H>=p._absoluteStartTime||Ce&&!p._hasFromValue&&!B._isOverridden&&H>=ut||T&&!T._isOverridden&&T.parent===p.parent&&T._currentTime!==0&&q<T._startTime))&&(!B||Ce||q>=p._startTime)&&(!Xt||!p._isOverridden&&(!p._isOverlapped||H<=lt)&&(!T||T._isOverridden||H<=Kt)&&(!B||(B._isOverridden||(!Ce?H>=ut+p._delay:H>=p._absoluteStartTime||!p._hasFromValue&&H>=ut))))){let xs=p._currentTime=V(q-p._startTime,0,Jt),z=p._ease(xs/p._updateDuration),xe=p._modifier,Ye=p._valueType,Le=p._tweenType,Wt=Le===ee.OBJECT,Gt=Ye===J.NUMBER,pt=Gt&&Wt||z===0||z===1?-1:v.precision,Y,Re;if(Gt)Y=Re=xe(_(ye(p._fromNumber,p._toNumber,z),pt));else if(Ye===J.UNIT)Re=xe(_(ye(p._fromNumber,p._toNumber,z),pt)),Y=`${Re}${p._unit}`;else if(Ye===J.COLOR){let C=p._numbers,Je=p._fromNumbers,Xe=p._toNumbers,dt=1-z,Zt=Je[0],Qt=Je[1],jt=Je[2],en=Xe[0],tn=Xe[1],nn=Xe[2];if(C[0]=xe(Math.sqrt(Zt*Zt*dt+en*en*z)),C[1]=xe(Math.sqrt(Qt*Qt*dt+tn*tn*z)),C[2]=xe(Math.sqrt(jt*jt*dt+nn*nn*z)),C[3]=xe(ye(Je[3],Xe[3],z)),!p._setter||s)Y=`rgba(${_(C[0],0)},${_(C[1],0)},${_(C[2],0)},${C[3]})`}else if(Ye===J.COMPLEX)Y=ln(p,z,pt);if(Xt)p._number=Re;if(!s&&Yt!==I.blend){let C=p.property;if(j=p.target,p._setter)p._setter(j,Re,p);else if(Wt)j[C]=Y;else if(Le===ee.ATTRIBUTE)j.setAttribute(C,Y);else if(ze=j.style,Le===ee.TRANSFORM){if(j!==zt)zt=j,it=j[ft];it[C]=Y,at=1}else if(Le===ee.CSS)ze[C]=Y;else if(Le===ee.CSS_VAR)ze.setProperty(C,Y);if(P)ot=1}else p._value=Y}else if(ct&&B&&!Ce&&q<p._startTime)p._currentTime=0;if(at&&p._renderTransforms)ze.transform=cn(it),at=0;p=p._next}if(!n&&ot)e.onRender(e)}if(!n&&P)e.onUpdate(e)}if(o&&oe){if(!n&&(o.began&&!ae&&E>0&&!c||ae&&E<=b&&c))e.onComplete(e),e.completed=!ae}else if(P&&X){if(l===1/0)e._startTime+=e.duration;else if(e._currentIteration>=l-1){if(e.paused=!0,!c&&!d){if(e.completed=!0,!n&&!(o&&(ae||!o.began)))e.onComplete(e),e._resolve(e)}}}else e.completed=!1;return ot},se=(e,t,n,s,r)=>{let o=e._currentIteration;if(De(e,t,n,s,r),e._hasChildren){let i=e,c=i.backwards,u=s?t:i._iterationTime,l=W(),f=0,a=!0;if(!s&&i._currentIteration!==o){let m=i.iterationDuration;if(w(i,(h)=>{if(!c){if(!h.completed&&!h.backwards&&h._currentTime<h.iterationDuration)De(h,m,n,1,M.FORCE);h.began=!1,h.completed=!1}else{let d=h.duration,x=h._offset+h._delay,D=x+d;if(!n&&d<=b&&(!x||D===m))h.onComplete(h)}}),!n)i.onLoop(i)}if(w(i,(m)=>{let h=_((u-m._offset)*m._speed,12);if(c&&h>m._delay+m.duration)return;let d=m._fps<i._fps?m.requestTick(l):r;if(f+=De(m,h,n,s,d),!m.completed&&a)a=!1},c),!n&&f)i.onRender(i);if((a||c)&&i._currentTime>=i.duration){if(i.paused=!0,!i.completed){if(i.completed=!0,!n)i.onComplete(i),i._resolve(i)}}}};class Ne{constructor(e=0){this.deltaTime=0,this._currentTime=e,this._lastTickTime=e,this._startTime=e,this._lastTime=e,this._frameDuration=te/Ie,this._fps=Ie,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(e){let t=+e,n=t<b?b:t,s=te/n;if(n>be.frameRate)be.frameRate=n;this._fps=n,this._frameDuration=s}get speed(){return this._speed}set speed(e){let t=+e;this._speed=t<b?b:t}requestTick(e){let t=this._frameDuration,n=e-this._lastTickTime,s=t*0.25,r=s<4?s:4;if(n+r<t)return M.NONE;return this._lastTickTime=n>=t?e-n%t:e,M.AUTO}computeDeltaTime(e){let t=e-this._lastTime;return this.deltaTime=t,this._lastTime=e,t}}var pe={animation:null,update:k},un=(e)=>{let t=pe.animation;if(!t)t={duration:b,computeDeltaTime:k,_offset:0,_delay:0,_head:null,_tail:null},pe.animation=t,pe.update=()=>{e.forEach((n)=>{for(let s in n){let r=n[s],o=r._head;if(o){let i=o._valueType,c=i===J.COMPLEX||i===J.COLOR?ce(o._fromNumbers):null,u=o._fromNumber,l=r._tail;while(l&&l!==o){if(c)for(let f=0,a=l._numbers.length;f<a;f++)c[f]+=l._numbers[f];else u+=l._number;l=l._prevAdd}o._toNumber=u,o._toNumbers=c}}}),De(t,1,1,0,M.FORCE)};return t};var pn=(()=>K?requestAnimationFrame:setImmediate)(),vs=(()=>K?cancelAnimationFrame:clearImmediate)();class dn extends Ne{constructor(e){super(e);this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=be,this.paused=!0,this.reqId=0}update(){let e=this._currentTime=W();if(this.requestTick(e)){this.computeDeltaTime(e);let t=this._speed,n=this._fps,s=this._head;while(s){let r=s._next;if(!s.paused)se(s,(e-s._startTime)*s._speed*t,0,0,s._fps<n?s.requestTick(e):M.AUTO);else if(le(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled)s.cancel();s=r}pe.update()}}wake(){if(this.useDefaultMainLoop&&!this.reqId)this.requestTick(W()),this.reqId=pn(fn);return this}pause(){if(!this.reqId)return;return this.paused=!0,Ss()}resume(){if(!this.paused)return;return this.paused=!1,w(this,(e)=>e.resetTime()),this.wake()}get speed(){return this._speed*(v.timeScale===1?1:te)}set speed(e){let t=e*v.timeScale;if(this._speed===t)return;this._speed=t,w(this,(n)=>n.speed=n._speed)}get timeUnit(){return v.timeScale===1?"ms":"s"}set timeUnit(e){let n=e==="s",s=n?0.001:1;if(v.timeScale!==s){v.timeScale=s,v.tickThreshold=200*s;let r=n?0.001:te;this.defaults.duration*=r,this._speed*=r}}get precision(){return v.precision}set precision(e){v.precision=e}}var S=(()=>{let e=new dn(W());if(K)gt.engine=e,$e.addEventListener("visibilitychange",()=>{if(!e.pauseOnDocumentHidden)return;$e.hidden?e.pause():e.resume()});return e})(),fn=()=>{if(S._head)S.reqId=pn(fn),S.update();else S.reqId=0},Ss=()=>(vs(S.reqId),S.reqId=0,S);var Ge={_rep:new WeakMap,_add:new Map},_t=(e,t,n="_rep")=>{let s=Ge[n],r=s.get(e);if(!r)r={},s.set(e,r);return r[t]?r[t]:r[t]={_head:null,_tail:null}},ws=(e,t)=>e._isOverridden||e._absoluteStartTime>t._absoluteStartTime,yt=(e)=>{e._isOverlapped=1,e._isOverridden=1,e._changeDuration=b,e._currentTime=b},mn=(e,t)=>{let n=e._composition;if(n===I.replace){let s=e._absoluteStartTime;ue(t,e,ws,"_prevRep","_nextRep");let r=e._prevRep;if(r){let{parent:o,_absoluteEndTime:i}=r;if(e.parent.id!==o.id&&o.iterationCount>1&&i+(o.duration-o.iterationDuration)>s){yt(r);let l=r._prevRep;while(l&&l.parent.id===o.id)yt(l),l=l._prevRep}let c=e._absoluteUpdateStartTime;if(i>c){let l=r._startTime,f=i-(l+r._updateDuration),a=_(c-f-l,12);if(r._changeDuration=a,r._currentTime=a,r._isOverlapped=1,a<b)yt(r)}let u=e.parent.parent;if(!u||u!==o.parent){let l=!0;if(w(o,(f)=>{if(!f._isOverlapped)l=!1}),l){let f=o.parent;if(f){let a=!0;if(w(f,(m)=>{if(m!==o)w(m,(h)=>{if(!h._isOverlapped)a=!1})}),a)f.cancel()}else o.cancel()}}}}else if(n===I.blend){let s=_t(e.target,e.property,"_add"),r=un(Ge._add),o=s._head;if(!o)o={...e},o._composition=I.replace,o._updateDuration=b,o._startTime=0,o._numbers=ce(e._fromNumbers),o._number=0,o._next=null,o._prev=null,ue(s,o),ue(r,o);let i=e._toNumber;if(e._fromNumber=o._fromNumber-i,e._toNumber=0,e._numbers=ce(e._fromNumbers),e._number=0,o._fromNumber=i,e._toNumbers.length){let c=ce(e._toNumbers);c.forEach((u,l)=>{e._fromNumbers[l]=o._fromNumbers[l]-u,e._toNumbers[l]=0}),o._fromNumbers=c}ue(s,e,null,"_prevAdd","_nextAdd")}return e},hn=(e)=>{let t=e._composition;if(t!==I.none){let{target:n,property:s}=e,i=Ge._rep.get(n)[s];if(le(i,e,"_prevRep","_nextRep"),t===I.blend){let c=Ge._add,u=c.get(n);if(!u)return;let l=u[s],f=pe.animation;le(l,e,"_prevAdd","_nextAdd");let a=l._head;if(a&&a===l._tail){le(l,a,"_prevAdd","_nextAdd"),le(f,a);let m=!0;for(let h in u)if(u[h]._head){m=!1;break}if(m)c.delete(n)}}}return e};var gn=(e)=>(e.paused=!0,e.began=!1,e.completed=!1,e),Tt=(e)=>{if(!e._cancelled)return e;if(e._hasChildren)w(e,Tt);else w(e,(t)=>{if(t._composition!==I.none)mn(t,_t(t.target,t.property))});return e._cancelled=0,e},xn=0,Es=(e,t)=>e._priority>t._priority;class Mt extends Ne{constructor(e={},t=null,n=0){super(0);++xn;let{id:s,delay:r,duration:o,reversed:i,alternate:c,loop:u,loopDelay:l,autoplay:f,frameRate:a,playbackRate:m,priority:h,onComplete:d,onLoop:x,onPause:D,onBegin:Q,onBeforeUpdate:E,onUpdate:U}=e;if(ht.current)ht.current.register(this);let N=t?0:S._lastTickTime,y=t?t.defaults:v.defaults,P=We(r)||ne(r)?y.delay:+r,X=We(o)||ne(o)?1/0:+o,oe=G(u,y.loop),ge=G(l,y.loopDelay),Ae=oe===!0||oe===1/0||oe<0?1/0:oe+1,ie=0;if(t)ie=n;else{if(!S.reqId)S.requestTick(W());ie=(S._lastTickTime-S._startTime)*v.timeScale}this.id=!ne(s)?s:xn,this.parent=t,this.duration=xt((X+ge)*Ae-ge)||b,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=Q||y.onBegin,this.onBeforeUpdate=E||y.onBeforeUpdate,this.onUpdate=U||y.onUpdate,this.onLoop=x||y.onLoop,this.onPause=D||y.onPause,this.onComplete=d||y.onComplete,this.iterationDuration=X,this.iterationCount=Ae,this._autoplay=t?!1:G(f,y.autoplay),this._offset=ie,this._delay=P,this._loopDelay=ge,this._iterationTime=0,this._currentIteration=0,this._resolve=k,this._running=!1,this._reversed=+G(i,y.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=G(c,y.alternate),this._prev=null,this._next=null,this._lastTickTime=N,this._startTime=N,this._lastTime=N,this._fps=G(a,y.frameRate),this._speed=G(m,y.playbackRate),this._priority=+G(h,1)}get cancelled(){return!!this._cancelled}set cancelled(e){e?this.cancel():this.reset(!0).play()}get currentTime(){return V(_(this._currentTime,v.precision),-this._delay,this.duration)}set currentTime(e){let t=this.paused;if(this.pause().seek(+e),!t)this.resume()}get iterationCurrentTime(){return V(_(this._iterationTime,v.precision),0,this.iterationDuration)}set iterationCurrentTime(e){this.currentTime=this.iterationDuration*this._currentIteration+e}get progress(){return V(_(this._currentTime/this.duration,10),0,1)}set progress(e){this.currentTime=this.duration*e}get iterationProgress(){return V(_(this._iterationTime/this.iterationDuration,10),0,1)}set iterationProgress(e){let t=this.iterationDuration;this.currentTime=t*this._currentIteration+t*e}get currentIteration(){return this._currentIteration}set currentIteration(e){this.currentTime=this.iterationDuration*V(+e,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(e){e?this.reverse():this.play()}get speed(){return super.speed}set speed(e){super.speed=e,this.resetTime()}reset(e=!1){if(Tt(this),this._reversed&&!this._reverse)this.reversed=!1;if(this._iterationTime=this.iterationDuration,se(this,0,1,~~e,M.FORCE),gn(this),this._hasChildren)w(this,gn);return this}init(e=!1){if(this.fps=this._fps,this.speed=this._speed,!e&&this._hasChildren)se(this,this.duration,1,~~e,M.FORCE);this.reset(e);let t=this._autoplay;if(t===!0)this.resume();else if(t&&!ne(t.linked))t.link(this);return this}resetTime(){let e=1/(this._speed*S._speed);return this._startTime=W()-(this._currentTime+this._delay)*e,this}pause(){if(this.paused)return this;return this.paused=!0,this.onPause(this),this}resume(){if(!this.paused)return this;if(this.paused=!1,this.duration<=b&&!this._hasChildren)se(this,b,0,0,M.FORCE);else{if(!this._running)ue(S,this,Es),S._hasChildren=!0,this._running=!0;this.resetTime(),this._startTime-=12,S.wake()}return this}restart(){return this.reset().resume()}seek(e,t=0,n=0){Tt(this),this.completed=!1;let s=this.paused;return this.paused=!0,se(this,e+this._delay,~~t,~~n,M.AUTO),s?this:this.resume()}alternate(){let e=this._reversed,t=this.iterationCount,n=this.iterationDuration,s=t===1/0?an(Pe/n):t;if(this._reversed=+(this._alternate&&!(s%2)?e:!e),t===1/0)this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress;else this.seek(n*s-this._currentTime);return this.resetTime(),this}play(){if(this._reversed)this.alternate();return this.resume()}reverse(){if(!this._reversed)this.alternate();return this.resume()}cancel(){if(this._hasChildren)w(this,(e)=>e.cancel(),!0);else w(this,hn);return this._cancelled=1,this.pause()}stretch(e){let t=this.duration,n=bt(e);if(t===n)return this;let s=e/t,r=e<=b;return this.duration=r?b:n,this.iterationDuration=r?b:bt(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){se(this,0,1,0,M.AUTO);let e=this._autoplay;if(e&&e.linked&&e.linked===this)e.revert();return this.cancel()}complete(e=0){return this.seek(this.duration,e).cancel()}then(e=k){let t=this.then,n=()=>{this.then=null,e(this),this.then=t,this._resolve=k};return new Promise((s)=>{if(this._resolve=()=>s(n()),this.completed)this._resolve();return this})}}var vt=(e)=>new Mt(e,null,0).init();var bn=4300;var _e=80;var de=[0.5,1,1.5,2],St=650,Te=(e,t,n)=>e+(t-e)*n;function ks(e,t){let n=null,s=null;for(let r of e.steps)if(r.startMs<=t&&t<r.endMs)n=r;else if(r.endMs<=t)s=r;return n??s}function As(e,t){let n=-1;for(let o=0;o<e.hops.length;o++)if(e.hops[o].startMs<=t)n=o;if(n<0)n=0;let s=e.hops[n];if(!s)return null;let r=Math.min(1,Math.max(0,(t-s.startMs)/s.durMs));return{index:n,hop:s,f:r}}var Tn=(e,t)=>e.length>t?e.slice(0,t-1)+"\u2026":e,Mn=(e)=>Tn(e,22);function vn(e,t=4,n=26){let s=Object.entries(e),r=s.slice(0,t).map(([o,i])=>{let c=typeof i==="object"&&i!==null?JSON.stringify(i):String(i);return Tn(`${o}: ${c}`,n)});if(s.length>t)r.push(`+${s.length-t} more`);return r}var Ze=60;function wt(e,t,n,s,r){let o=e-n/2;if(r===1)return{x:o,y:t-Ze-s,tetherY:t-Ze};return{x:o,y:t+Ze,tetherY:t+Ze}}var yn=300,Cs=25;function Sn(e,t){let n=t.startMs+t.typingMs;if(e<n||e>t.endMs)return null;let s=(e-n)/yn,r=(t.endMs-e)/yn,o=Math.min(1,Math.max(0,Math.min(s,r)));return{hops:t.hops,opacity:o,offset:-e/Cs}}var Ls=600;function wn(e,t){return Math.min(1,Math.max(0,(e-t)/Ls))}var Rs=700,$s=900,Ps=[0,250],Oe=0.6;function En(e,t){let n=(e-t)/Rs,s=1;if(n>=0&&n<Oe)s=0.6+0.55*Math.sin(n/Oe*Math.PI/2);else if(n>=Oe&&n<1)s=1.15-0.15*Math.sin((n-Oe)/(1-Oe)*Math.PI/2);let r=[];for(let o of Ps){let i=(e-t-o)/$s;if(i>=0&&i<1)r.push({r:48+102*i,opacity:0.8*(1-i)})}return{scale:s,rings:r}}var Qe=650,Is=6;function Fs(e,t){if(e<t||e>t+Qe)return{dx:0,dy:0};let n=(e-t)/Qe;return{dx:0,dy:-Is*Math.sin(Math.PI*n)+0}}function kn(e){let t=new Map,n=(s,r)=>{let o=t.get(s);if(o)o.push(r);else t.set(s,[r])};for(let s of e.steps){if(s.mode!=="packet")continue;if(s.typing.length>0)n(s.path[0],s.startMs+s.typing.length*_e);for(let r of s.hops)n(r.to,r.endMs)}for(let s of t.values())s.sort((r,o)=>r-o);return t}function An(e,t){let n=-1,s=!1;for(let r of e??[])if(r<=t)n=r,s=!0;return s?Fs(t,n):{dx:0,dy:0}}var Ds=400;function Cn(e,t){if(t.typingMs<=0||e<t.startMs||e>=t.startMs+t.typingMs)return null;let n=e-t.startMs,s=t.typing.length*_e,r=n>=s,o=Math.min(t.typing.length,Math.floor(n/_e));return{text:t.typing.slice(0,o),caret:!r&&Math.floor(n/Ds)%2===0,sent:r}}function Ln(e,t){let n=t,s=ks(e,n),r=s?s.chapter:0,o=e.chapters[r],i="";if(s){for(let a of s.hops)if(a.endMs<=n&&a.note!==void 0)i=a.note}let c={chapterTitle:o?.title??"",chapterDesc:o?.desc??"",stepLabel:s?.label??"",stepDesc:s?.desc??"",note:i},u=[],l=[];for(let a of e.steps){if(!(a.startMs<=n&&n<a.endMs))continue;if(n<a.startMs+a.typingMs)continue;if(a.mode==="flow"){l.push({stepId:a.id,path:a.path,color:a.color,both:a.both,progress:(n-a.startMs-a.typingMs)/(a.endMs-a.startMs-a.typingMs)});continue}let m=As(a,n);if(!m)continue;let{index:h,hop:d,f:x}=m,D=Te(d.x1,d.x2,x),Q=Te(d.y1,d.y2,x),E=a.hops[h+1];if(E!==void 0&&n>=d.endMs&&n<d.endMs+Qe)continue;let N=E!==void 0&&n>=d.endMs+Qe;if(u.push({stepId:a.id,x:N?E.x1:Te(d.x1,d.x2,x),y:N?E.y1:Te(d.y1,d.y2,x),color:a.color,direction:1,label:a.label,data:d.data}),a.both){let y=a.hops[a.hops.length-1-h],P=N?a.hops[a.hops.length-2-h]:void 0;u.push({stepId:a.id,x:P?P.back.x1:Te(y.back.x1,y.back.x2,x),y:P?P.back.y1:Te(y.back.y1,y.back.y2,x),color:a.color,direction:-1,label:a.label,data:{}})}}let f=[];for(let a of e.steps)for(let m of a.hops)if(m.endMs<=n&&n<m.endMs+St)f.push({node:m.to,color:a.color,ageMs:n-m.endMs});return{chapter:r,stepId:s?s.id:null,caption:c,packets:u,flows:l,pulses:f}}function Rn(e,t){let n=new Set;if(t==="hop")for(let s of e.steps)for(let r of s.hops)n.add(r.startMs);else if(t==="message")for(let s of e.steps)n.add(s.startMs);else for(let s of e.chapters)n.add(s.startMs);return[...n].sort((s,r)=>s-r)}function $n(e,t,n){for(let s of Rn(e,n))if(s>t)return s;return e.totalMs}function Pn(e,t,n){let s=0;for(let r of Rn(e,n))if(r<t-300)s=r;return s}function In(e,t){return Math.min(Math.max(t,0),e.totalMs)}function Et(e,t){let n=de.indexOf(e);if(n<0)n=0,de.forEach((s,r)=>{if(Math.abs(s-e)<Math.abs(de[n]-e))n=r});return de[Math.min(de.length-1,Math.max(0,n+t))]}var _n={" ":"toggle",ArrowRight:"nextHop",ArrowLeft:"prevHop",n:"nextMessage",p:"prevMessage","]":"nextChapter","[":"prevChapter","+":"faster","=":"faster","-":"slower",Home:"restart"};function Fn(e){return Object.hasOwn(_n,e)?_n[e]:null}function Dn(e){let t=(n)=>e.totalMs>0?n/e.totalMs*100:0;return{chapters:e.chapters.map((n)=>({index:n.index,title:n.title,startPct:t(n.startMs),endPct:t(n.endMs)})),dots:e.steps.map((n)=>({stepId:n.id,pct:t(n.startMs),color:n.color,chapter:n.chapter}))}}function Nn(e,t){return Math.min(Math.max(t,0),1)*e.totalMs}var we=2000,On=36,Ns=140,L=(e)=>{let t=document.getElementById(e);if(!t)throw Error(`missing element #${e}`);return t},g=JSON.parse(L("timeline-data").textContent??"{}"),he=document.querySelector("#stage svg"),re=matchMedia("(prefers-reduced-motion: reduce)").matches,Be=g.steps.length,nt=Math.max(1,re?Be*we:g.totalMs),Lt=(e)=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),Hn=141.5,Bn=81.9,Os=0.2,Hs=1.6,O=L("stage"),kt=document.getElementById("grid"),Bs=L("zoom-label"),je=(e)=>Number(O.dataset[e]??0),Vn=je("w"),Un=je("h"),qn={x:je("ox"),y:je("oy")},A=1,fe=0,me=0,ve=0,Se=0,ns=(e)=>Math.max(Os,Math.min(Hs,e));function Ee(){if(os.setAttribute("transform",`translate(${fe.toFixed(2)} ${me.toFixed(2)}) scale(${A.toFixed(4)})`),Bs.textContent=`${Math.round(A*100)}%`,kt)kt.style.backgroundSize=`${Hn*A}px ${Bn*A}px`,kt.style.backgroundPosition=`${fe+qn.x*A-Hn*A/2}px ${me+qn.y*A-Bn*A/2}px`}function ss(){let e=O.getBoundingClientRect();if(e.width<=0||e.height<=0)return!1;return ve=e.width,Se=e.height,he.setAttribute("viewBox",`0 0 ${ve} ${Se}`),!0}function rs(){if(!ss())return;A=ns(Math.min(ve/Vn,Se/Un)*0.92),fe=(ve-Vn*A)/2,me=(Se-Un*A)/2,Ee()}function st(e,t,n){let s=ns(A*n),r=(e-fe)/A,o=(t-me)/A;fe=e-r*s,me=t-o*s,A=s}var Vs="http://www.w3.org/2000/svg",os=he.querySelector("g.scene"),Ft=document.createElementNS(Vs,"g");Ft.setAttribute("pointer-events","none");os.appendChild(Ft);var rt=new Map;for(let e of he.querySelectorAll("g[data-node]")){let t=/translate\\(([-\\d.]+),([-\\d.]+)\\)/.exec(e.getAttribute("transform")??""),n=e.getAttribute("data-node");if(t&&n)rt.set(n,{x:Number(t[1]),y:Number(t[2])})}var Dt=new Map(g.steps.map((e)=>[e.id,e]));function zn(e,t,n){for(let r=0;r<e.length;r++){let o=t[r+1];if(n<=o){let i=t[r],c=o===i?0:(n-i)/(o-i),u=e[r];return{x:u.x1+(u.x2-u.x1)*c,y:u.y1+(u.y2-u.y1)*c}}}let s=e[e.length-1];return{x:s.x2,y:s.y2}}function Yn(e){let t=[0];for(let n of e)t.push(t[t.length-1]+Math.hypot(n.x2-n.x1,n.y2-n.y1));return t}function Us(e,t,n,s){let r=Dt.get(e);if(!r||r.hops.length===0)return"";let o=r.hops.map((d)=>({x1:d.x1,y1:d.y1,x2:d.x2,y2:d.y2})),i=[...r.hops].reverse().map((d)=>({x1:d.back.x1,y1:d.back.y1,x2:d.back.x2,y2:d.back.y2})),c=Yn(o),u=Yn(i),l=c[c.length-1],a=s*bn/1000*Ns%On,m=(d)=>`<rect x="${(d.x-7).toFixed(1)}" y="${(d.y-4.5).toFixed(1)}" width="14" height="9" rx="2" fill="${t}" fill-opacity="0.9"/>`,h="";for(let d=a;d<=l;d+=On)if(h+=m(zn(o,c,d)),n)h+=m(zn(i,u,d));return h}var et=12,Rt=7.3,At=20,Jn=16;function is(e){let t=e.length===4?"#"+[...e.slice(1)].map((r)=>r+r).join(""):e,n=parseInt(t.slice(1),16);return(0.299*(n>>16&255)+0.587*(n>>8&255)+0.114*(n&255))/255>0.6?"#0f172a":"#ffffff"}function qs(e,t,n,s,r,o){let i=Mn(s),c=vn(r),u=Math.max(i.length,...c.map((D)=>D.length),8),l=Math.round(u*Rt+16),f=At+(c.length>0?c.length*Jn+8:0),a=wt(e,t,l,f,o),m=a.x.toFixed(1),h=a.y.toFixed(1),d=`pk${zs++}`,x=`<line x1="${e.toFixed(1)}" y1="${t.toFixed(1)}" x2="${e.toFixed(1)}" y2="${a.tetherY.toFixed(1)}" stroke="${n}" stroke-opacity="0.5" stroke-width="1.5"/>`;return x+=`<circle cx="${e.toFixed(1)}" cy="${t.toFixed(1)}" r="5" fill="${n}"/>`,x+=`<clipPath id="${d}"><rect x="${m}" y="${h}" width="${l}" height="${f}" rx="6"/></clipPath>`,x+=`<rect class="pk-bg" x="${m}" y="${h}" width="${l}" height="${f}" rx="6" stroke="${n}"/>`,x+=`<g clip-path="url(#${d})"><rect x="${m}" y="${h}" width="${l}" height="${At}" fill="${n}"/></g>`,x+=`<text class="pk-tx" font-size="${et}" font-weight="700" fill="${is(n)}" x="${(a.x+8).toFixed(1)}" y="${(a.y+14).toFixed(1)}">${Lt(i)}</text>`,c.forEach((D,Q)=>{x+=`<text class="pk-tx pk-row" font-size="${et}" x="${(a.x+8).toFixed(1)}" y="${(a.y+At+6+Jn*(Q+0.75)).toFixed(1)}">${Lt(D)}</text>`}),x}var zs=0,as=["stroke","stroke-width","stroke-dasharray","stroke-linecap","stroke-dashoffset","stroke-opacity","marker-end"],Xn=new Map;function Ys(e){let t=Xn.get(e);if(t)return t;let n=he.querySelector("marker#arrow");if(!n)return"url(#arrow)";let s="arrow-"+e.replace(/[^a-zA-Z0-9]/g,""),r=n.cloneNode(!0);return r.setAttribute("id",s),r.querySelector("path")?.setAttribute("fill",e),n.parentNode?.appendChild(r),Xn.set(e,`url(#${s})`),`url(#${s})`}var cs=new Map;for(let e of he.querySelectorAll("line[data-link]")){let t=e.getAttribute("data-link");if(!t)continue;let n=as.map((s)=>e.getAttribute(s));cs.set(t,{el:e,orig:n,base:Number(e.getAttribute("stroke-opacity")??1)})}function Kn(e,t){let n=new Map,s=t?[t]:g.steps;for(let r of s){let o=t?{hops:r.hops,opacity:1,offset:0}:Sn(e,r);if(!o||o.opacity<=0)continue;for(let i of o.hops)if(n.set(i.link,{color:r.color,opacity:o.opacity,offset:o.offset}),r.both)n.set(i.back.link,{color:r.color,opacity:o.opacity,offset:o.offset})}for(let[r,o]of cs){let i=n.get(r);if(!i){as.forEach((c,u)=>{let l=o.orig[u];if(l===null||l===void 0)o.el.removeAttribute(c);else o.el.setAttribute(c,l)});continue}o.el.setAttribute("stroke",i.color),o.el.setAttribute("stroke-width","3"),o.el.setAttribute("stroke-dasharray","2 9"),o.el.setAttribute("stroke-linecap","round"),o.el.setAttribute("stroke-dashoffset",i.offset.toFixed(1)),o.el.setAttribute("stroke-opacity",(o.base+(1-o.base)*i.opacity).toFixed(3)),o.el.setAttribute("marker-end",Ys(i.color))}}var Js=new Set(g.hidden??[]),$t=new Map((g.reveals??[]).map((e)=>[e.node,{atMs:e.atMs,stepId:e.stepId}])),ls=new Map;for(let e of Js){let t=[];for(let n of he.querySelectorAll("[data-node],[data-link]")){if(n.getAttribute("data-node")===e)t.push(n);let s=n.getAttribute("data-link");if(s!==null&&s.split("--").includes(e))t.push(n)}ls.set(e,t)}function Wn(e){let t=new Map;for(let[n,s]of ls){let r=e(n);for(let o of s)t.set(o,Math.min(t.get(o)??1,r))}for(let[n,s]of t)n.setAttribute("opacity",s.toFixed(3))}var us=new Map;for(let e of he.querySelectorAll("g[data-node]")){let t=e.getAttribute("data-node");if(t)us.set(t,{el:e,icon:e.querySelector("use"),orig:e.getAttribute("transform")??""})}var Xs=kn(g);function Gn(e){let t="";for(let[n,s]of us){let r=$t.get(n),o=e!==null&&r?En(e,r.atMs):{scale:1,rings:[]},i=e!==null&&!re?An(Xs.get(n),e):{dx:0,dy:0},c=s.orig;if(o.scale!==1)c+=` scale(${o.scale.toFixed(3)})`;if(s.el.setAttribute("transform",c),s.icon)if(i.dx!==0||i.dy!==0)s.icon.setAttribute("transform",`translate(${i.dx.toFixed(2)} ${i.dy.toFixed(2)})`);else s.icon.removeAttribute("transform");let u=rt.get(n),l=r?Dt.get(r.stepId)?.color??"#6b7280":"#6b7280";if(!u)continue;for(let f of o.rings)t+=`<circle cx="${u.x}" cy="${u.y}" r="${f.r.toFixed(1)}" fill="none" stroke="${l}" stroke-width="4" stroke-opacity="${f.opacity.toFixed(3)}"/>`}return t}function Zn(e,t,n){let s=rt.get(e.path[0]);if(!s)return"";let r=Math.max(110,Math.round(e.typing.length*Rt+28)),o=26,i=wt(s.x,s.y,r,o,1),c=i.x.toFixed(1),u=i.y.toFixed(1),l=`<rect class="pk-bg" x="${c}" y="${u}" width="${r}" height="${o}" rx="13" stroke="${e.color}" stroke-width="${n?3.5:1.5}"/>`;if(l+=`<text class="pk-tx pk-row" font-size="${et}" x="${(i.x+12).toFixed(1)}" y="${(i.y+17).toFixed(1)}" xml:space="preserve">${Lt(t.text)}</text>`,t.caret){let f=i.x+12+t.text.length*Rt+1;l+=`<rect x="${f.toFixed(1)}" y="${(i.y+6).toFixed(1)}" width="1.5" height="14" fill="${e.color}"/>`}if(t.sent){let f=i.x+r-4;l+=`<rect x="${(f-44).toFixed(1)}" y="${(i.y-22).toFixed(1)}" width="44" height="18" rx="5" fill="${e.color}"/>`,l+=`<text class="pk-tx" font-size="${et-1}" font-weight="700" fill="${is(e.color)}" x="${(f-22).toFixed(1)}" y="${(i.y-9).toFixed(1)}" text-anchor="middle">Enter</text>`}return l}function Qn(e,t){if(t)return t.typingMs>0?Zn(t,{text:t.typing,caret:!1,sent:!0},!1):"";let n="";for(let s of g.steps){let r=e===null?null:Cn(e,s);if(!r)continue;let o=e-s.startMs-s.typing.length*_e;n+=Zn(s,r,r.sent&&o<250)}return n}function jn(e,t){let n=t;for(let s of e.pulses){let r=rt.get(s.node);if(!r)continue;let o=Math.min(1,s.ageMs/St);n+=`<circle cx="${r.x}" cy="${r.y}" r="${(48+40*o).toFixed(1)}" fill="none" stroke="${s.color}" stroke-width="4" stroke-opacity="${(1-o).toFixed(2)}"/>`}for(let s of e.flows)n+=Us(s.stepId,s.color,s.both,s.progress);for(let s of e.packets)n+=qs(s.x,s.y,s.color,s.label,s.data,s.direction);Ft.innerHTML=n}var He={chapter:L("cap-chapter"),chapterDesc:L("cap-chapter-desc"),step:L("cap-step"),stepDesc:L("cap-step-desc"),note:L("cap-note")},es="";function Ks(e){let t=JSON.stringify(e);if(t===es)return;es=t,He.chapter.textContent=e.chapterTitle,He.chapterDesc.textContent=e.chapterDesc,He.step.textContent=e.stepLabel,He.stepDesc.textContent=e.stepDesc,He.note.textContent=e.note}var Ws=L("legend");for(let e of g.tracks){let t=document.createElement("li"),n=document.createElement("span");n.className="dot",n.style.background=e.color,t.append(n,document.createTextNode(e.label)),Ws.appendChild(t)}var F=L("bar"),Nt=Dn(g),Ot=document.createElement("div");Ot.className="playhead";for(let e of Nt.chapters){let t=document.createElement("div");t.className="seg",t.style.left=`${e.startPct}%`,t.style.width=`${Math.max(0,e.endPct-e.startPct)}%`,t.title=e.title,F.appendChild(t)}for(let e of Nt.dots){let t=document.createElement("div");t.className="mark",t.style.left=`${e.pct}%`,t.style.background=e.color,F.appendChild(t)}F.appendChild(Ot);F.setAttribute("aria-valuemin","0");F.setAttribute("aria-valuemax",String(Math.round(g.totalMs)));function ps(e){if(!re)return e;let t=Math.min(Be-1,Math.floor(e/we));return g.steps[t]?.startMs??0}function Ht(e){if(!re)return In(g,e);if(Be===0)return 0;if(e>=g.totalMs)return nt;let t=0;for(let n of g.steps)if(n.startMs<=e+0.5&&n.startMs>t)t=n.startMs;return Math.max(0,g.steps.findIndex((n)=>n.startMs===t))*we}var Gs=re?g.steps.flatMap((e,t)=>e.pause?[(t+1)*we-1]:[]):g.steps.filter((e)=>e.pause).map((e)=>e.endMs);function Zs(e){let t=Math.max(0,Math.min(Be-1,Math.floor(e/we))),n=g.steps[t],s=g.chapters[n?n.chapter:0],r=n?.hops[n.hops.length-1];return{chapter:n?n.chapter:0,stepId:n?n.id:null,caption:{chapterTitle:s?.title??"",chapterDesc:s?.desc??"",stepLabel:n?.label??"",stepDesc:n?.desc??"",note:r?.note??""},packets:n&&r?[{stepId:n.id,x:r.x2,y:r.y2,color:n.color,direction:1,label:n.label,data:r.data}]:[],flows:[],pulses:n&&r?[{node:r.to,color:n.color,ageMs:0}]:[]}}var R=vt({duration:nt,autoplay:!1,onUpdate:()=>Qs(),onComplete:()=>{R.pause(),ke()}}),Pt=0,Ct=!1;function Bt(e){let t=re?Zs(e):Ln(g,e);if(re){let r=Math.max(0,Math.min(Be-1,Math.floor(e/we)));Gn(null),jn(t,Qn(null,g.steps[r]??null)),Kn(0,g.steps[r]??null),Wn((o)=>{let i=$t.get(o),c=i?Dt.get(i.stepId):void 0;return c&&g.steps.indexOf(c)<=r?1:0})}else jn(t,Gn(e)+Qn(e,null)),Kn(e,null),Wn((r)=>{let o=$t.get(r);return o?wn(e,o.atMs):0});Ks(t.caption);let n=ps(e),s=g.totalMs>0?n/g.totalMs*100:0;Ot.style.left=`${s}%`,F.setAttribute("aria-valuenow",String(Math.round(n))),F.setAttribute("aria-valuetext",[t.caption.chapterTitle,t.caption.stepLabel].filter(Boolean).join(": "))}function Qs(){if(Ct)return;Ct=!0;let e=R.currentTime;if(!R.paused){for(let t of Gs)if(Pt<t&&t<=e){R.pause(),R.seek(t),e=t;break}}Pt=e,Bt(e),ke(),Ct=!1}function Ve(e){let t=Math.max(0,Math.min(nt,e));Pt=t,R.seek(t),Bt(t),ke()}function js(){if(!R.paused)R.pause();else{if(R.currentTime>=nt-1)Ve(0);R.play()}ke()}function Me(e,t){let n=ps(R.currentTime),s=re&&e==="hop"?"message":e,r=t===1?$n(g,n,s):Pn(g,n,s);Ve(Ht(r))}function ds(e){switch(e){case"toggle":return js();case"nextHop":return Me("hop",1);case"prevHop":return Me("hop",-1);case"nextMessage":return Me("message",1);case"prevMessage":return Me("message",-1);case"nextChapter":return Me("chapter",1);case"prevChapter":return Me("chapter",-1);case"faster":return It(Et(tt,1));case"slower":return It(Et(tt,-1));case"restart":return Ve(0)}}var tt=1,ts=L("btn-play"),fs=[...document.querySelectorAll("[data-speed]")];function It(e){tt=e,R.speed=e,ke()}function ke(){let e=!R.paused;ts.dataset.state=e?"playing":"paused",ts.setAttribute("aria-label",e?"Pause":"Play");for(let t of fs)t.setAttribute("aria-pressed",String(Number(t.dataset.speed)===tt))}var er={"btn-play":"toggle","btn-restart":"restart","btn-prev-chapter":"prevChapter","btn-prev-message":"prevMessage","btn-prev-hop":"prevHop","btn-next-hop":"nextHop","btn-next-message":"nextMessage","btn-next-chapter":"nextChapter"};for(let[e,t]of Object.entries(er))document.getElementById(e)?.addEventListener("click",()=>ds(t));for(let e of fs)e.addEventListener("click",()=>{let t=Number(e.dataset.speed);if(de.includes(t))It(t)});document.addEventListener("keydown",(e)=>{if(e.ctrlKey||e.metaKey||e.altKey)return;let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"))return;if(e.key===" "&&t&&t.tagName==="BUTTON")return;let n=Fn(e.key);if(!n)return;e.preventDefault(),ds(n)});var Vt=!1;function ms(e,t){let n=F.getBoundingClientRect();if(n.width<=0)return;let s=(e-n.left)/n.width,r=Nn(g,s);if(t){let o=1/0;for(let i of Nt.dots){let c=Math.abs(i.pct/100*n.width-(e-n.left));if(c<10&&c<o)o=c,r=g.steps.find((u)=>u.id===i.stepId).startMs}}Ve(Ht(r))}F.addEventListener("pointerdown",(e)=>{Vt=!0,F.setPointerCapture(e.pointerId),ms(e.clientX,!0)});F.addEventListener("pointermove",(e)=>{if(Vt)ms(e.clientX,!1)});var hs=()=>{Vt=!1};F.addEventListener("pointerup",hs);F.addEventListener("pointercancel",hs);var Ut=(e)=>{let t=O.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}};O.addEventListener("wheel",(e)=>{e.preventDefault();let t=Ut(e);st(t.x,t.y,e.deltaY<0?1.1:0.9090909090909091),Ee()},{passive:!1});var Z=new Map;O.addEventListener("pointerdown",(e)=>{if(e.target.closest(".zoombar"))return;Z.set(e.pointerId,Ut(e)),O.setPointerCapture(e.pointerId),O.classList.add("drag")});O.addEventListener("pointermove",(e)=>{let t=Z.get(e.pointerId);if(!t)return;let n=[...Z.values()],s=Ut(e);if(Z.set(e.pointerId,s),Z.size===1)fe+=s.x-t.x,me+=s.y-t.y;else if(Z.size===2){let r=[...Z.values()],[o,i]=n,[c,u]=r,l=Math.hypot(i.x-o.x,i.y-o.y),f=Math.hypot(u.x-c.x,u.y-c.y),a={x:(o.x+i.x)/2,y:(o.y+i.y)/2},m={x:(c.x+u.x)/2,y:(c.y+u.y)/2};if(l>0)st(a.x,a.y,f/l);fe+=m.x-a.x,me+=m.y-a.y}Ee()});var gs=(e)=>{if(Z.delete(e.pointerId),Z.size===0)O.classList.remove("drag")};O.addEventListener("pointerup",gs);O.addEventListener("pointercancel",gs);L("zoom-in").addEventListener("click",()=>{st(ve/2,Se/2,1.25),Ee()});L("zoom-out").addEventListener("click",()=>{st(ve/2,Se/2,0.8),Ee()});L("zoom-fit").addEventListener("click",rs);new ResizeObserver(()=>{if(ss())Ee()}).observe(O);window.__packetplay={durationMs:g.totalMs,seek:(e)=>{R.pause(),Ve(Ht(e))}};rs();Bt(0);ke();\n',icons:{block:`<?xml version="1.0" encoding="utf-8"?>
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
`},schema:{$schema:"https://json-schema.org/draft/2020-12/schema",$id:"https://raw.githubusercontent.com/nokri-mohammed/packetplay/main/schema/scene.schema.json",$comment:"This is schema version 1. A breaking change will add schema/v2/ while v1 stays.",title:"Scene",description:"An packetplay scene: nodes, links, tracks and chapters of steps. The same model is used for YAML and JSON files.",type:"object",additionalProperties:!1,required:["title","nodes","links","chapters"],properties:{$schema:{type:"string",description:"Optional schema reference, so JSON files can point at this schema."},version:{type:"integer",minimum:1,description:"Schema version this scene is written for. Missing means 1."},title:{type:"string",minLength:1,description:"Title of the scene, shown above the diagram."},grid:{type:"string",enum:["iso","none"],default:"iso",description:"Background grid: iso (isometric tiles, the default) or none."},nodes:{type:"object",description:"Boxes in the diagram, keyed by node id.",additionalProperties:{$ref:"#/$defs/node"}},groups:{type:"object",description:"Named areas that nodes can belong to, keyed by group id.",additionalProperties:{$ref:"#/$defs/group"}},links:{type:"array",description:"Connections between nodes, as pairs of node ids. Messages travel along links.",items:{$ref:"#/$defs/link"}},tracks:{type:"object",description:"Message categories with a label and a colour, keyed by track id.",additionalProperties:{$ref:"#/$defs/track"}},chapters:{type:"array",description:"Ordered chapters, each with a list of steps.",items:{$ref:"#/$defs/chapter"}}},$defs:{node:{type:"object",additionalProperties:!1,required:["label","icon"],description:"One node in the diagram.",properties:{label:{type:"string",description:"Text shown under the icon."},icon:{type:"string",enum:["block","browser","cache","cardterminal","cloud","cronjob","cube","desktop","diamond","dns","document","firewall","function-module","image","kernel-ip","kernel-tcp","laptop","loadbalancer","lock","mail","mailmultiple","mobiledevice","nic","nic-settings","office","package-module","paymentcard","plane","printer","pyramid","queue","router","server","speech","sphere","storage","switch-module","tower","truck","truck-2","user","vm"],description:"File name stem of an SVG in icons/isoflow/ or icons/custom/."},sub:{type:"string",description:"Small second line under the label."},group:{type:"string",description:"Id of the group this node belongs to."},hidden:{type:"boolean",description:"Not shown until a step reveals it."},at:{type:"array",description:"Optional manual position [i, j] in isometric tile coordinates. Fractions are allowed.",minItems:2,maxItems:2,items:{type:"number",minimum:0}}}},group:{type:"object",additionalProperties:!1,required:["label"],description:"A named area around some nodes.",properties:{label:{type:"string",description:"Text shown on the group."}}},link:{type:"array",description:"A connection between two node ids.",minItems:2,maxItems:2,items:{type:"string"}},track:{type:"object",additionalProperties:!1,required:["label","color"],description:"A message category.",properties:{label:{type:"string",description:"Name shown in the legend."},color:{description:"A named colour or a hex colour such as #3b82f6.",anyOf:[{type:"string",enum:["blue","orange","green","red","purple","yellow","pink","teal","gray"]},{type:"string",pattern:"^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"}]}}},chapter:{type:"object",additionalProperties:!1,required:["title","steps"],description:"A group of steps that tells one part of the story.",properties:{title:{type:"string",description:"Chapter title."},desc:{type:"string",description:"Optional text shown when the chapter starts."},steps:{type:"array",description:"Steps in order.",items:{$ref:"#/$defs/stepOrParallel"}}}},stepOrParallel:{description:"A single step, or a parallel block of steps.",oneOf:[{$ref:"#/$defs/step"},{$ref:"#/$defs/parallel"}]},parallel:{type:"object",additionalProperties:!1,required:["parallel"],description:"Steps that run at the same time.",properties:{parallel:{type:"array",minItems:1,description:"The steps to run together.",items:{$ref:"#/$defs/step"}}}},step:{type:"object",additionalProperties:!1,required:["from","to"],description:"One message travelling from a node to another.",properties:{from:{type:"string",description:"Id of the node the message starts at."},to:{type:"string",description:"Id of the node the message ends at."},via:{type:"array",items:{type:"string"},description:"Node ids the route must pass through, in order."},track:{type:"string",description:"Id of the track (colour and legend entry)."},label:{type:"string",description:"Short text on the message."},desc:{type:"string",description:"Longer explanation shown in the caption panel."},data:{type:"object",additionalProperties:!0,description:"Key/value pairs shown on the data card."},at:{type:"object",description:"Per-node changes while the message passes, keyed by node id.",additionalProperties:{$ref:"#/$defs/hop"}},mode:{type:"string",enum:["packet","flow"],description:"packet: one message hops along the route. flow: a continuous stream."},both:{type:"boolean",description:"Show the traffic in both directions."},pause:{type:"boolean",description:"Pause the player after this step."},reveal:{type:"array",items:{type:"string"},description:"Nodes that appear when this step's message arrives."},typing:{type:"string",minLength:1,maxLength:80,description:"Text typed at the source node before the message is sent."}}},hop:{type:"object",additionalProperties:!1,description:"What changes at a node when the message arrives.",properties:{set:{type:"object",additionalProperties:!0,description:"Data values to change on the card at this node."},desc:{type:"string",description:"Explanation shown when the message reaches this node."}}}}}};var di=[new URL("../icons/isoflow/",import.meta.url),new URL("../icons/custom/",import.meta.url)];function O2(t){try{return Uh(t).filter((e)=>e.endsWith(".svg")).map((e)=>e.slice(0,-4))}catch{return[]}}var A2,P2=new Map;function pi(){return A2??=(Zt?Object.keys(Zt.icons):di.flatMap(O2)).sort(),[...A2]}function Hh(t,e){let n=`${e}__`;return t.replace(/(\sid=)(["'])([^"']*)\2/g,(r,i,s,o)=>`${i}${s}${n}${o}${s}`).replace(/url\(\s*(["']?)#([^)"']*)\1\s*\)/g,(r,i,s)=>`url(${i}#${n}${s}${i})`).replace(/([\s:]href=)(["'])#([^"']*)\2/g,(r,i,s,o)=>`${i}${s}#${n}${o}${s}`)}function N2(t){if(!pi().includes(t))throw Error(`Unknown icon "${t}"`);let e=P2.get(t);if(e)return e;let n=Zt?.icons[t]??Kh(new URL(`${t}.svg`,di.find((u)=>O2(u).includes(t))??di[0]),"utf8"),r=n.match(/<svg\b[^>]*>/),i=n.lastIndexOf("</svg>");if(!r||r.index===void 0||i<0)throw Error(`Icon "${t}" is not a valid SVG`);let s=r[0].match(/\sviewBox="([^"]*)"/)?.[1]?.trim(),o=s?.split(/[\s,]+/).map(Number),[,,l,a]=o??[];if(!s||!o||o.length!==4||o.some((u)=>!Number.isFinite(u)))throw Error(`Icon "${t}" has no valid viewBox`);let c=n.slice(r.index+r[0].length,i).replace(/<!--[\s\S]*?-->/g,"").trim(),f={name:t,width:l,height:a,viewBox:s,body:Hh(c,t)};return P2.set(t,f),f}import{existsSync as J1,mkdtempSync as Gh,readdirSync as T2,rmSync as Jh,statSync as Yh}from"fs";import{homedir as Wh,tmpdir as Zh}from"os";import{extname as Qh,join as At}from"path";class st extends Error{}var Ze=(t,e)=>{if(e===void 0)throw new st(`${t} needs a number`);let n=Number(e);if(e.trim()===""||!Number.isFinite(n))throw new st(`${t} needs a number, got "${e}"`);return n};function Xh(t){let e=Qh(t).toLowerCase();return e===".mp4"?"mp4":e===".gif"?"gif":void 0}function R2(t){let e=[],n,r,i,s=1,o=1280,l=0,a,c=1;for(let d=0;d<t.length;d++){let h=t[d],g=()=>t[++d];if(h==="-o"||h==="--out"){if(n=g(),n===void 0)throw new st(`${h} needs a file name`)}else if(h==="--format"){if(r=g(),r===void 0)throw new st("--format needs mp4 or gif")}else if(h==="--fps")i=Ze(h,g());else if(h==="--speed")s=Ze(h,g());else if(h==="--width")o=Ze(h,g());else if(h==="--from")l=Ze(h,g());else if(h==="--to")a=Ze(h,g());else if(h==="--scale")c=Ze(h,g());else if(h.startsWith("-"))throw new st(`unknown option ${h}`);else e.push(h)}if(e.length!==1)throw new st("export needs one scene file");if(!n)throw new st("export needs -o <out.mp4|out.gif>");if(r!==void 0&&r!=="mp4"&&r!=="gif")throw new st("--format must be mp4 or gif");let f=r??Xh(n);if(!f)throw new st("cannot tell the format: use an .mp4 or .gif file name, or --format mp4|gif");let u=i??(f==="gif"?15:30);if(!(u>=1&&u<=120))throw new st("--fps must be between 1 and 120");if(!(s>0&&s<=16))throw new st("--speed must be above 0 and at most 16");if(!Number.isInteger(o)||o<64||o>7680)throw new st("--width must be a whole number from 64 to 7680");if(!(l>=0))throw new st("--from must be 0 or more");if(a!==void 0&&!(a>l))throw new st("--to must be greater than --from");if(!(c>=0.5&&c<=4))throw new st("--scale must be between 0.5 and 4");return{file:e[0],out:n,format:f,fps:u,speed:s,width:o,from:l,to:a,scale:c}}function tg(t){return Math.max(2,Math.round(t*9/16/2)*2)}function eg(t,e){let n=Math.min(e.from*1000,t),r=Math.min((e.to??t/1000)*1000,t),i=Math.max(0,r-n);return{frames:Math.max(1,Math.round(i/e.speed/1000*e.fps)),timeAt:(o)=>Math.min(t,n+o*1000/e.fps*e.speed)}}var hi=["-y","-hide_banner","-loglevel","error"];function ng(t,e){return[...hi,"-f","image2pipe","-framerate",String(e),"-c:v","png","-i","-","-vf","scale=trunc(iw/2)*2:trunc(ih/2)*2","-c:v","libx264","-pix_fmt","yuv420p","-crf","20","-movflags","+faststart",t]}function rg(t,e,n){return[...hi,"-framerate",String(e),"-i",t,"-vf","palettegen=stats_mode=diff",n]}function ig(t,e,n,r){return[...hi,"-framerate",String(e),"-i",t,"-i",n,"-lavfi","paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle","-loop","0",r]}var j2=(t)=>Number(/(?:chromium|chromium_headless_shell)-(\d+)/.exec(t)?.[1]??0),D2=(t,e)=>j2(e)-j2(t),sg=(t)=>/headless[-_]shell/.test(t);function og(t){let e=t.env("CHROME_PATH");if(e&&t.exists(e))return{path:e,shell:sg(e)};let n=t.which("chrome-headless-shell");if(n)return{path:n,shell:!0};let r=t.playwrightShell().sort(D2)[0];if(r)return{path:r,shell:!0};for(let s of["google-chrome","chromium","chromium-browser"]){let o=t.which(s);if(o)return{path:o,shell:!1}}let i=t.playwright().sort(D2)[0];return i?{path:i,shell:!1}:void 0}function I2(t,e,n){let r=At(Wh(),".cache","ms-playwright");if(!J1(r))return[];let i=[];for(let s of T2(r)){if(!t.test(s))continue;for(let o of T2(At(r,s))){if(!e.test(o))continue;let l=At(r,s,o,n);if(J1(l))i.push(l)}}return i}function lg(){return{env:(t)=>process.env[t],which:(t)=>Bun.which(t),exists:(t)=>J1(t),playwrightShell:()=>I2(/^chromium_headless_shell-\d+$/,/^chrome-headless-shell/,"chrome-headless-shell"),playwright:()=>I2(/^chromium-\d+$/,/^chrome-linux/,"chrome")}}var ag="No Chrome found. The lightest install is chrome-headless-shell (no npm browser package is needed); Chrome or Chromium also work. Install one (for example `sudo apt install chromium`) or set CHROME_PATH to its executable.",cg="ffmpeg not found. Install it (for example `sudo apt install ffmpeg`) and make sure it is on PATH.";class gi{ws;id=0;pending=new Map;waiters=[];sessionId;constructor(t){this.ws=t;t.addEventListener("message",(e)=>{let n=JSON.parse(String(e.data));if(n.id!==void 0){let r=this.pending.get(n.id);if(!r)return;if(this.pending.delete(n.id),n.error)r.fail(Error(`${n.error.message}`));else r.ok(n.result)}else if(n.method)this.waiters=this.waiters.filter((r)=>r.method===n.method?(r.ok(),!1):!0)}),t.addEventListener("close",()=>{for(let e of this.pending.values())e.fail(Error("Chrome closed the connection"));this.pending.clear()})}static open(t){return new Promise((e,n)=>{let r=new WebSocket(t);r.addEventListener("open",()=>e(new gi(r))),r.addEventListener("error",()=>n(Error("could not connect to Chrome")))})}send(t,e={}){let n=++this.id;return new Promise((r,i)=>{this.pending.set(n,{ok:r,fail:i}),this.ws.send(JSON.stringify({id:n,method:t,params:e,...this.sessionId?{sessionId:this.sessionId}:{}}))})}once(t){return new Promise((e)=>this.waiters.push({method:t,ok:e}))}close(){try{this.ws.close()}catch{}}}var z2=(t)=>new Promise((e)=>setTimeout(e,t));async function q2(t,e,n){let r;try{return await Promise.race([t,new Promise((i,s)=>r=setTimeout(()=>s(Error(`timed out ${n}`)),e))])}finally{if(r)clearTimeout(r)}}async function B2(t,e){let n=og(lg()),r=Bun.which("ffmpeg");if(!n)throw Error(ag);if(!r)throw Error(cg);let i=Gh(At(Zh(),"packetplay-export-")),s,o,l,a=()=>{o?.close();try{s?.kill("SIGKILL")}catch{}try{l?.kill("SIGKILL")}catch{}try{Jh(i,{recursive:!0,force:!0})}catch{}},c=(d)=>()=>{a(),process.exit(d)},f=c(130),u=c(143);process.on("SIGINT",f),process.on("SIGTERM",u);try{await Bun.write(At(i,"page.html"),t);let d=At(i,"profile"),h=tg(e.width),g=[n.path,...n.shell?[]:["--headless=new"],"--remote-debugging-port=0","--remote-allow-origins=*",`--user-data-dir=${d}`,"--no-first-run","--no-default-browser-check","--disable-gpu","--hide-scrollbars","--mute-audio","--force-color-profile=srgb","--disable-background-timer-throttling","--disable-renderer-backgrounding",...process.getuid?.()===0?["--no-sandbox"]:[],"about:blank"];s=Bun.spawn(g,{stdout:"ignore",stderr:"ignore"});let p=At(d,"DevToolsActivePort"),m="";for(let L=0;L<100&&!m;L++){if(s.exitCode!==null)throw Error("Chrome exited before it was ready");if(J1(p)){let[j,H]=(await Bun.file(p).text()).split(`
`);if(j&&H)m=`ws://127.0.0.1:${j}${H}`}if(!m)await z2(100)}if(!m)throw Error("Chrome did not start in time");o=await q2(gi.open(m),1e4,"connecting to Chrome");let{targetId:y}=await o.send("Target.createTarget",{url:"about:blank"}),{sessionId:w}=await o.send("Target.attachToTarget",{targetId:y,flatten:!0});o.sessionId=w,await o.send("Page.enable"),await o.send("Emulation.setDeviceMetricsOverride",{width:e.width,height:h,deviceScaleFactor:e.scale,mobile:!1});let k=o.once("Page.loadEventFired");await o.send("Page.navigate",{url:"file://"+At(i,"page.html")+"#export"}),await q2(k,20000,"loading the page");let x=0;for(let L=0;L<50&&x<=0;L++){let j=await o.send("Runtime.evaluate",{expression:"window.__packetplay ? window.__packetplay.durationMs : 0",returnByValue:!0});if(x=Number(j.result?.value??0),x<=0)await z2(100)}if(x<=0)throw Error("the page did not expose window.__packetplay");let _=eg(x,e),S=At(i,"f%06d.png");if(e.format==="mp4")l=Bun.spawn([r,...ng(e.out,e.fps)],{stdin:"pipe",stdout:"ignore",stderr:"pipe"});let A=(L)=>process.stderr.write(`\rframe ${L} of ${_.frames}`);for(let L=0;L<_.frames;L++){await o.send("Runtime.evaluate",{expression:`window.__packetplay.seek(${_.timeAt(L)})`,returnByValue:!0});let j=await o.send("Page.captureScreenshot",{format:"png"}),H=Buffer.from(j.data,"base64");if(l){let Z=l.stdin;await Z.write(H),await Z.flush()}else await Bun.write(At(i,`f${String(L+1).padStart(6,"0")}.png`),H);A(L+1)}process.stderr.write(`
`),o.close();try{s.kill("SIGKILL")}catch{}if(l){await l.stdin.end();let[L,j]=await Promise.all([l.exited,new Response(l.stderr).text()]);if(L!==0)throw Error(`ffmpeg failed: ${j.trim()}`)}else{let L=At(i,"palette.png");for(let j of[rg(S,e.fps,L),ig(S,e.fps,L,e.out)]){l=Bun.spawn([r,...j],{stdout:"ignore",stderr:"pipe"});let[H,Z]=await Promise.all([l.exited,new Response(l.stderr).text()]);if(H!==0)throw Error(`ffmpeg failed: ${Z.trim()}`)}}return{out:e.out,bytes:Yh(e.out).size,frames:_.frames}}finally{process.off("SIGINT",f),process.off("SIGTERM",u),a()}}import{readFile as ug}from"fs/promises";import{basename as fg,extname as dg}from"path";var mi=1;class yi extends Error{}function pg(t,e){let n=e==="json"?JSON.parse(t):ui(t);if(typeof n!=="object"||n===null||Array.isArray(n))throw Error("file is empty or not a scene");let r=n.version;if(typeof r==="number"&&Number.isInteger(r)&&r>mi)throw new yi(`scene version ${r} is not supported: this packetplay understands version ${mi} and older (update packetplay)`);return n}async function V2(t){let e=fg(t),n=dg(t).toLowerCase(),r;if(n===".yaml"||n===".yml")r="yaml";else if(n===".json")r="json";else throw Error(`${e}: unsupported file type "${n||"(none)"}". Use .yaml, .yml or .json.`);let i;try{i=await ug(t,"utf8")}catch(s){throw Error(`${e}: cannot read file (${s.code??"error"})`)}try{return pg(i,r)}catch(s){if(s instanceof yi)throw Error(`${e}: ${s.message}`);if(s.message==="file is empty or not a scene")throw Error(`${e}: file is empty or not a scene`);if(s instanceof ci){let o=s.linePos?.[0]?.line,l=o?`line ${o}`:"unknown line";throw Error(`${e}: invalid YAML at ${l}: ${s.message.split(`
`)[0]}`)}throw Error(`${e}: invalid JSON: ${s.message}`)}}var Y1=141.5,W1=81.9,wi=70.75,ki=40.95;var Z1=96;var Qe=(t,e)=>(t-e)*70.75,Xe=(t,e)=>(t+e)*40.95;function vi(t){let e=t.map((r)=>r.i),n=t.map((r)=>r.j);return{i0:Math.min(...e)-1,j0:Math.min(...n)-1,i1:Math.max(...e)+1,j1:Math.max(...n)+1}}var U2=(t,e)=>e.i>=t.i0&&e.i<=t.i1&&e.j>=t.j0&&e.j<=t.j1;function K2(t){let e=Object.keys(t.nodes),n=t.nodes,r={},i=(C)=>{let O=r[C];if(!O)throw Error(`layout: node "${C}" has no tile`);return O},s=(C)=>n[C]?.at,o=(C)=>n[C]?.group,l=new Set;for(let C of e){let O=s(C);if(O)r[C]={i:O[0],j:O[1]};else l.add(C)}let a=Object.fromEntries(e.map((C)=>[C,[]]));for(let[C,O]of t.links)a[C]?.push(O),a[O]?.push(C);let c=new Set;for(let C of e)if(!l.has(C))c.add(`${i(C).i},${i(C).j}`);let f=new Set(e.filter((C)=>!l.has(C))),u=(C,O)=>{let G=new Set(e.map(o).filter((U)=>!!U));for(let U of G){let wt=e.filter((ut)=>o(ut)===U&&f.has(ut)).map((ut)=>i(ut));if(o(C)===U){let ut=vi([...wt,O]);for(let kt of e)if(kt!==C&&f.has(kt)&&o(kt)!==U&&U2(ut,i(kt)))return!0}else if(wt.length>0&&U2(vi(wt),O))return!0}return!1},d=(C,O,G)=>{for(let U=0;U<=e.length*2+2;U++){let wt=U*2;for(let ut of U===0?[G]:[G+wt,G-wt]){if(c.has(`${O},${ut}`))continue;if(u(C,{i:O,j:ut}))continue;return ut}}for(let U=G;;U+=2)if(!c.has(`${O},${U}`))return U},h=(C,O,G)=>{let U=d(C,O,G);r[C]={i:O,j:U},c.add(`${O},${U}`),f.add(C)},g=0;for(let C of e){if(!l.has(C)||C in r)continue;let O={[C]:null},G={[C]:0},U=[C],wt=0;for(let ut=0;ut<U.length;ut++){let kt=U[ut],B4=g+2*(G[kt]??0),Zn=0,vs=O[kt];if(vs)Zn=i(vs).j;else{let Jt=e.find((r1)=>f.has(r1)&&l.has(r1)&&o(r1)&&o(r1)===o(kt));if(Jt)Zn=i(Jt).j}h(kt,B4,Zn);for(let Jt of a[kt]??[]){if(!l.has(Jt)||Jt in G)continue;G[Jt]=(G[kt]??0)+1,O[Jt]=kt,wt=Math.max(wt,G[Jt]??0),U.push(Jt)}}g+=2*(wt+1)}let p=[...l].map((C)=>i(C).j);if(p.length){let C=Math.min(...p);for(let O of l)i(O).j-=C}let m={};for(let C of Object.keys(t.groups??{})){let O=e.filter((G)=>o(G)===C).map((G)=>i(G));if(O.length)m[C]=vi(O)}let y=(C)=>[[Qe(C.i0,C.j0),Xe(C.i0,C.j0)],[Qe(C.i1,C.j0),Xe(C.i1,C.j0)],[Qe(C.i1,C.j1),Xe(C.i1,C.j1)],[Qe(C.i0,C.j1),Xe(C.i0,C.j1)]],w=48,k=[0],x=[0];for(let C of e){let O=i(C),G=Qe(O.i,O.j),U=Xe(O.i,O.j);k.push(G-w,G+w),x.push(U-w,U+w+40)}for(let C of Object.values(m))for(let[O,G]of y(C))k.push(O),x.push(G);let _=Math.min(...k),S=Math.max(...k),A=Math.min(...x),L=Math.max(...x),j=80-_,H=80-A,Z={};for(let C of e){let O=i(C);Z[C]={x:Qe(O.i,O.j)+j,y:Xe(O.i,O.j)+H,i:O.i,j:O.j}}let V={};for(let[C,O]of Object.entries(m))V[C]={...O,points:y(O).map(([G,U])=>[G+j,U+H])};return{width:S-_+160,height:L-A+160,nodes:Z,groups:V,origin:{x:j,y:H}}}function Q1(t,e){return`${t}--${e}`}function V0(t,e,n){let r=t.nodes[e],i=t.nodes[n];if(!r||!i)throw Error(`Layout has no position for lane "${Q1(e,n)}"`);let s=i.x-r.x,o=i.y-r.y,l=Math.hypot(s,o)||1,a=s/l,c=o/l,f=-c*8,u=a*8,d=r.x+f,h=r.y+u,g=i.x+f,p=i.y+u;return{id:Q1(e,n),x1:d,y1:h,x2:g,y2:p,ax1:d+a*44,ay1:h+c*44,ax2:g-a*44,ay2:p-c*44}}function bi(t){if(Math.hypot(t.x2-t.x1,t.y2-t.y1)>=88)return{x1:t.ax1,y1:t.ay1,x2:t.ax2,y2:t.ay2};let n=(t.x1+t.x2)/2,r=(t.y1+t.y2)/2;return{x1:n,y1:r,x2:n,y2:r}}function hg(t,e,n){let r=new Map,i=new Set([e]),s=[e];for(let l=0;l<s.length;l++){let a=s[l];if(a===n)break;for(let c of t.get(a)??[]){if(i.has(c))continue;i.add(c),r.set(c,a),s.push(c)}}if(!i.has(n))throw Error(`no route from "${e}" to "${n}"`);let o=[n];for(let l=n;l!==e;)l=r.get(l),o.push(l);return o.reverse()}function X1(t,e){if(e.from===e.to)throw Error(`from and to are the same node "${e.from}"`);let n=new Map,r=(o,l)=>{let a=n.get(o);if(a)a.push(l);else n.set(o,[l])};for(let[o,l]of t.links)r(o,l),r(l,o);let i=[e.from,...e.via??[],e.to],s=[i[0]];for(let o=1;o<i.length;o++)s.push(...hg(n,i[o-1],i[o]).slice(1));return s}var gg=0.07,mg=350,H2=650,G2=4300,yg=450,vg=80,wg=500,kg="#6b7280",J2={blue:"#3b82f6",orange:"#f97316",green:"#22c55e",red:"#ef4444",purple:"#a855f7",yellow:"#eab308",pink:"#ec4899",teal:"#14b8a6",gray:"#6b7280"};function W2(t){if(Object.hasOwn(J2,t))return J2[t];if(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t))return t.toLowerCase();throw Error(`unknown colour "${t}"`)}function bg(t){return Math.max(mg,Math.round(t/gg))}function Y2(t,e,n,r,i,s,o){let l=X1(t,n),a=n.mode??"packet",c=n.track??null,f=c!==null?t.tracks?.[c]:void 0,u=f?W2(f.color):kg,d=l.length-1,h=n.typing??"",g=h.length>0?h.length*vg+wg:0,p=o+g,m=[];for(let A=0;A<d;A++)m.push(bi(V0(e,l[A],l[A+1])));let y=m.map((A)=>bg(Math.hypot(A.x2-A.x1,A.y2-A.y1))),w=y.map((A,L)=>n.both?Math.max(A,y[d-1-L]):A),k=[],x=p;for(let A=0;A<d;A++){let L=l[A],j=l[A+1],H=V0(e,j,L),Z=m[A],V=bi(H),C={...n.data??{}};for(let U=0;U<=A;U++){let wt=n.at?.[l[U]]?.set;if(wt)Object.assign(C,wt)}let O={from:L,to:j,link:Q1(L,j),x1:Z.x1,y1:Z.y1,x2:Z.x2,y2:Z.y2,back:{link:H.id,x1:V.x1,y1:V.y1,x2:V.x2,y2:V.y2},durMs:w[A],startMs:a==="flow"?p:x,endMs:a==="flow"?p+G2:x+w[A],data:C},G=n.at?.[j]?.desc;if(G!==void 0)O.note=G;k.push(O),x=O.endMs+H2}let _=k[k.length-1],S=a==="flow"?p+G2:_?_.endMs+H2:p;return{id:r,chapter:i,step:s,label:n.label??"",desc:n.desc??"",track:c,color:u,mode:a,both:n.both??!1,pause:n.pause??!1,path:l,hops:k,typingMs:g,typing:h,startMs:o,endMs:S}}function Z2(t,e){let n=Object.entries(t.tracks??{}).map(([f,u])=>({id:f,label:u.label,color:W2(u.color)})),r=[],i=[],s=[],o=0,l=(f,u)=>{let d=u.hops[u.hops.length-1];if(!d)return;for(let h of f.reveal??[])s.push({node:h,atMs:d.endMs,stepId:u.id})};t.chapters.forEach((f,u)=>{let d=[];f.steps.forEach((g,p)=>{let m=`c${u+1}s${p+1}`,y=o,w=y;if("parallel"in g)g.parallel.forEach((k,x)=>{let _=Y2(t,e,k,`${m}p${x+1}`,u,p,y);d.push(_),l(k,_),w=Math.max(w,_.endMs)});else{let k=Y2(t,e,g,m,u,p,y);d.push(k),l(g,k),w=k.endMs}o=w+yg}),i.push(...d);let h=d[0];r.push({index:u,title:f.title,desc:f.desc??"",startMs:h?h.startMs:o,endMs:d.length?Math.max(...d.map((g)=>g.endMs)):o,steps:d})});let a=i.length?Math.max(...i.map((f)=>f.endMs)):0,c=Object.entries(t.nodes).filter(([,f])=>f.hidden===!0).map(([f])=>f);return{title:t.title,totalMs:a,hidden:c,reveals:s,tracks:n,chapters:r,steps:i}}var jt=(t)=>t.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),xt=(t)=>String(Math.round(t*100)/100),_i='font-family="system-ui, sans-serif"',_g='<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,1 L10,5 L0,9 Z" fill="currentColor"/></marker>';function Q2(t,e,n={}){let r=n.icons??N2,i=jt(t.title),s=Object.entries(t.nodes),o=Z1/2,a=[...new Set(s.map(([,h])=>h.icon))].sort().map((h)=>{let g=r(h);return`<symbol id="icon-${jt(h)}" viewBox="${jt(g.viewBox)}">${g.body}</symbol>`}),c=Object.entries(t.groups??{}).map(([h,g])=>{let p=e.groups[h];if(!p)throw Error(`Layout has no region for group "${h}"`);let m=p.points.map(([w,k])=>`${xt(w)},${xt(k)}`).join(" "),y=p.points[0];return`<polygon data-group="${jt(h)}" points="${m}" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="6 4"/><text class="group-label" x="${xt(y[0])}" y="${xt(y[1]+22)}" text-anchor="middle" ${_i} font-size="14" fill="currentColor" fill-opacity="0.8">${jt(g.label)}</text>`}),f=(h,g)=>{let p=V0(e,h,g);return`<line data-link="${jt(p.id)}" x1="${xt(p.ax1)}" y1="${xt(p.ay1)}" x2="${xt(p.ax2)}" y2="${xt(p.ay2)}" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#arrow)"/>`},u=t.links.flatMap(([h,g])=>[f(h,g),f(g,h)]),d=s.map(([h,g])=>{let p=e.nodes[h];if(!p)throw Error(`Layout has no position for node "${h}"`);let m=g.sub?`<text class="sub" y="${o+38}" text-anchor="middle" ${_i} font-size="12" fill="currentColor" fill-opacity="0.7">${jt(g.sub)}</text>`:"";return`<g data-node="${jt(h)}" transform="translate(${xt(p.x)},${xt(p.y)})"><use href="#icon-${jt(g.icon)}" x="${-o}" y="${-o}" width="${Z1}" height="${Z1}"/><text class="label" y="${o+20}" text-anchor="middle" ${_i} font-size="15" fill="currentColor">${jt(g.label)}</text>`+m+"</g>"});return[`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${xt(e.width)} ${xt(e.height)}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${i}">`,`<title>${i}</title>`,`<defs>${a.join("")}${_g}</defs>`,'<g class="scene">',`<g class="groups">${c.join("")}</g>`,`<g class="links">${u.join("")}</g>`,`<g class="nodes">${d.join("")}</g>`,"</g>","</svg>",""].join(`
`)}var xg=(t)=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),X2=(t)=>"data:image/svg+xml,"+`<svg xmlns='http://www.w3.org/2000/svg' width='${Y1}' height='${W1}' viewBox='0 0 ${Y1} ${W1}'><polygon points='${wi},0 ${Y1},${ki} ${wi},${W1} 0,${ki}' fill='none' stroke='${t}' stroke-opacity='0.15' stroke-width='1'/></svg>`.replace(/</g,"%3C").replace(/>/g,"%3E"),$g=`
:root{--grid-img:url("${X2("black")}")}
@media (prefers-color-scheme: dark){:root{--grid-img:url("${X2("white")}")}}
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
#zoom-label{min-width:3.2em;text-align:center;font-size:.8rem;color:var(--muted)}
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
`,tl=(t,e)=>`<svg class="${t}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${e}</svg>`,Lg=tl("i-play",'<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/>'),Mg=tl("i-pause",'<rect x="6" y="5" width="4.2" height="14" rx="1.4"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4"/>'),Cg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4.5v4.6h4.6"/></svg>',Sg="Shortcuts: Space play or pause, Left and Right hop, N and P message, [ and ] chapter, + and - speed, Home restart";async function xi(t){let e=K2(t),n=Q2(t,e),r=Z2(t,e),i;if(Zt)i=Zt.player;else{let c=await Bun.build({entrypoints:[new URL("./player.ts",import.meta.url).pathname],target:"browser",minify:!0});if(!c.success||!c.outputs[0])throw Error("Player bundle failed: "+c.logs.map((f)=>f.message).join("; "));i=await c.outputs[0].text()}let s=i.replace(/<\/script/gi,"<\\/script"),o=JSON.stringify(r).replace(/</g,"\\u003c"),l=xg(t.title),a=[0.5,1,1.5,2].map((c)=>`<button type="button" data-speed="${c}" aria-pressed="${c===1}" aria-label="Speed ${c} times">${c}x</button>`).join("");return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${l}</title>
<script>if(location.hash==="#export")document.documentElement.classList.add("export")</script>
<style>${$g}</style>
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
<button type="button" class="icon" id="btn-play" data-state="paused" aria-label="Play" aria-keyshortcuts="Space ArrowLeft ArrowRight N P [ ] + - Home" title="${Sg}">${Lg}${Mg}</button>
<button type="button" class="icon" id="btn-restart" aria-label="Restart" title="Restart (Home)">${Cg}</button>
<div class="bar" id="bar" role="slider" tabindex="0" aria-label="Timeline"></div>
<span class="speeds" role="group" aria-label="Speed">${a}</span>
</div>
</main>
<script type="application/json" id="timeline-data">${o}</script>
<script>${s}</script>
</body>
</html>
`}var D4=Y4(N4(),1);import{readFileSync as c$}from"fs";var u$=Zt?.schema??JSON.parse(c$(new URL("../schema/scene.schema.json",import.meta.url),"utf8")),f$=new D4.default({allErrors:!0,strict:!0}),T4=f$.compile(u$);function gs(t){return t.split("/").slice(1).map((e)=>e.replace(/~1/g,"/").replace(/~0/g,"~")).reduce((e,n)=>/^\d+$/.test(n)?`${e}[${n}]`:e?`${e}.${n}`:n,"")}function d$(t){let e=gs(t);return e?`"${e}"`:"the scene"}function j4(t){let e=d$(t.instancePath),n=t.params;switch(t.keyword){case"additionalProperties":return`${e}: unknown key "${n.additionalProperty}"`;case"required":return`${e}: missing required key "${n.missingProperty}"`;case"type":return`${e}: must be of type ${n.type}`;case"enum":return`${e}: must be one of ${n.allowedValues.join(", ")}`;case"minItems":return`${e}: must have at least ${n.limit} item${n.limit===1?"":"s"}`;case"maxItems":return`${e}: must have at most ${n.limit} items`;case"oneOf":return`${e}: is neither a valid step nor a valid parallel block`;default:return`${e}: ${t.message??"is invalid"}`}}function p$(t){if(T4(t))return[];let e=T4.errors??[],n=[],r=new Set,i=(s,o)=>{let l=s+"|"+o;if(!r.has(l))r.add(l),n.push({path:s,message:o})};for(let s of e){if(s.keyword==="oneOf")continue;i(gs(s.instancePath),j4(s))}for(let s of e)if(s.keyword==="oneOf")i(gs(s.instancePath),j4(s));return n}var h$=new Set(["blue","orange","green","red","purple","yellow","pink","teal","gray"]),Ot=(t)=>typeof t==="object"&&t!==null&&!Array.isArray(t);function g$(t){let e=[],n=Ot(t.nodes)?t.nodes:{},r=Ot(t.groups)?t.groups:{},i=Ot(t.tracks)?t.tracks:{},s=(d,h)=>typeof h==="string"&&Object.hasOwn(d,h);for(let[d,h]of Object.entries(n))if(Ot(h)&&h.group!==void 0&&!s(r,h.group))e.push({path:`nodes.${d}.group`,message:`node "${d}": group "${h.group}" does not exist`});for(let[d,h]of Object.entries(i)){let g=Ot(h)?h.color:void 0;if(typeof g==="string"&&!h$.has(g)&&!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(g))e.push({path:`tracks.${d}.color`,message:`track "${d}": colour "${g}" is not a named colour or a hex value`})}(Array.isArray(t.links)?t.links:[]).forEach((d,h)=>{if(!Array.isArray(d))return;let g=h+1;d.forEach((y,w)=>{if(!s(n,y))e.push({path:`links[${h}][${w}]`,message:`link ${g}: node "${y}" does not exist`})});let[p,m]=d;if(p===m&&s(n,p))e.push({path:`links[${h}]`,message:`link ${g}: node "${p}" is linked to itself`})});let l=Array.isArray(t.links)&&t.links.every((d)=>Array.isArray(d)&&d.length===2&&d.every((h)=>s(n,h))),a=(d,h,g,p)=>{let m=`chapter ${h+1}, step ${g+1}`,y=!0,w=[d.from,d.to];if(["from","to"].forEach((x,_)=>{if(!s(n,w[_]))y=!1,e.push({path:`${p}.${x}`,message:`${m}: node "${w[_]}" does not exist`})}),d.track!==void 0&&!s(i,d.track))e.push({path:`${p}.track`,message:`${m}: track "${d.track}" does not exist`});if((Array.isArray(d.via)?d.via:[]).forEach((x,_)=>{if(!s(n,x))y=!1,e.push({path:`${p}.via[${_}]`,message:`${m}: via node "${x}" does not exist`})}),!y)return null;if(d.from===d.to)return e.push({path:p,message:`${m}: from and to are the same node "${d.from}"`}),null;if(!l)return null;try{return X1(t,d)}catch(x){return e.push({path:p,message:`${m}: ${x.message}`}),null}},c=new Set,f=(d,h,g,p)=>{let m=`chapter ${h+1}, step ${g+1}`,y=a(d,h,g,p),w=Array.isArray(d.via)?d.via:[],k=y??[d.from,...w,d.to],x=new Set;for(let S of k){if(x.has(S)||!s(n,S)||!Ot(n[S])||n[S].hidden!==!0)continue;if(!c.has(S))x.add(S),e.push({path:p,message:`${m}: node "${S}" is used before it is revealed`})}(Array.isArray(d.reveal)?d.reveal:[]).forEach((S,A)=>{let L=`${p}.reveal[${A}]`;if(!s(n,S))e.push({path:L,message:`${m}: reveal node "${S}" does not exist`});else if(!Ot(n[S])||n[S].hidden!==!0)e.push({path:L,message:`${m}: reveal node "${S}" is not hidden`});else if(c.has(S))e.push({path:L,message:`${m}: node "${S}" is already revealed`});else c.add(S)})};return(Array.isArray(t.chapters)?t.chapters:[]).forEach((d,h)=>{if(!Ot(d)||!Array.isArray(d.steps))return;d.steps.forEach((g,p)=>{if(!Ot(g))return;let m=`chapters[${h}].steps[${p}]`;if(Array.isArray(g.parallel))g.parallel.forEach((y,w)=>{if(Ot(y))f(y,h,p,`${m}.parallel[${w}]`)});else f(g,h,p,m)})}),e}function I4(t){let e=p$(t);if(Ot(t))try{e.push(...g$(t))}catch{}return e}var q4=`Usage:
  packetplay build <file> [-o <out.html>] [--json]
  packetplay validate <file> [--json]
  packetplay convert <file> --to json|yaml [-o <out>]
  packetplay export <file> -o <out.mp4|out.gif> [--format mp4|gif] [--fps N] [--speed X]
                   [--width PX] [--from SEC] [--to SEC] [--scale X]
  packetplay icons
  packetplay --help

build     Turn a scene file (.yaml, .yml or .json) into one self-contained HTML page.
validate  Check a scene file and write no HTML.
convert   Write the same scene as JSON or YAML (stdout when no -o is given).
export    Render the animation to an MP4 or GIF, frame by frame (needs Chrome and ffmpeg).
          Defaults: 30 fps (gif 15), speed 1, width 1280 (16:9), scale 1.
icons     List the icon names a scene can use, one per line.
--json    With build or validate, print one JSON object instead of text.
`;class vt extends Error{}function ms(t){let e={positional:[]};for(let n=0;n<t.length;n++){let r=t[n];if(r==="-o"||r==="--out"){let i=t[++n];if(i===void 0)throw new vt(`${r} needs a file name`);e.out=i}else if(r==="--to"){let i=t[++n];if(i===void 0)throw new vt("--to needs json or yaml");e.to=i}else if(r==="--json")e.json=!0;else if(r.startsWith("-"))throw new vt(`unknown option ${r}`);else e.positional.push(r)}return e}class ys extends Error{issues;constructor(t){super(t.map((e)=>e.message).join(`
`));this.issues=t}}async function Wn(t){let e=await V2(t),n=I4(e);if(n.length>0)throw new ys(n.map((r)=>({message:`${t}: ${r.message}`,path:r.path})));return e}function R4(t){let e=0;for(let n of t.chapters)for(let r of n.steps)e+=Array.isArray(r.parallel)?r.parallel.length:1;return e}function k$(t,e){if(e==="json")return JSON.stringify(t,null,2)+`
`;let{$schema:n,...r}=t;return(typeof n==="string"?`# yaml-language-server: $schema=${n}
`:"")+fi(r)}async function b$(t){let[e,...n]=t;if(e==="--help"||e==="-h")return console.log(q4),0;let r=!1;try{if(e==="build"){let i=ms(n),s=i.positional[0];if(!s||i.positional.length>1)throw new vt("build needs one scene file");r=i.json===!0;let o=i.out??w$(y$(s),m$(s,v$(s))+".html"),l=await Wn(s),a=await xi(l);if(await z4(o,a),i.json)console.log(JSON.stringify({ok:!0,title:l.title,nodes:Object.keys(l.nodes).length,steps:R4(l),out:o}));else console.log(`Wrote ${o} (${Buffer.byteLength(a)} bytes)`);return 0}if(e==="validate"){let i=ms(n),s=i.positional[0];if(!s||i.positional.length>1)throw new vt("validate needs one scene file");if(i.out||i.to)throw new vt("validate takes only a scene file and --json");r=i.json===!0;let o=await Wn(s),l=Object.keys(o.nodes).length,a=R4(o);if(i.json)console.log(JSON.stringify({ok:!0,title:o.title,nodes:l,steps:a}));else console.log(`ok: ${o.title} (${l} nodes, ${a} steps)`);return 0}if(e==="export"){let i;try{i=R2(n)}catch(l){if(l instanceof st)throw new vt(l.message);throw l}let s=await xi(await Wn(i.file)),o=await B2(s,i);return console.log(`Wrote ${o.out} (${o.bytes} bytes, ${o.frames} frames)`),0}if(e==="icons"){if(n.length>0)throw new vt("icons takes no arguments");for(let i of pi())console.log(i);return 0}if(e==="convert"){let i=ms(n),s=i.positional[0];if(!s||i.positional.length>1)throw new vt("convert needs one scene file");if(i.json)throw new vt("--json works only with build and validate");if(i.to!=="json"&&i.to!=="yaml")throw new vt("convert needs --to json or --to yaml");let o=k$(await Wn(s),i.to);if(i.out)await z4(i.out,o),console.log(`Wrote ${i.out}`);else process.stdout.write(o);return 0}throw new vt(e?`unknown command "${e}"`:"missing command")}catch(i){if(i instanceof vt)return console.error(`${i.message}

${q4}`),2;let s=i instanceof ys?i.issues:[{message:i.message}];if(r)console.log(JSON.stringify({ok:!1,issues:s}));else for(let o of s)console.error(o.message);return 1}}process.exit(await b$(process.argv.slice(2)));
