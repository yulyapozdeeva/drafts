module.exports=function(e){var t={};function s(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,s),a.l=!0,a.exports}return s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(r,a,function(t){return e[t]}.bind(null,a));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=3)}([function(e,t){e.exports=require("vscode")},function(e,t,s){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.BemHelper=t.ClassNameCases=void 0,function(e){e.Any="any",e.Kebab="kebab",e.Snake="snake",e.Camel="camel",e.Pascal="pascal",e.ShoutingSnake="shoutingSnake"}(r=t.ClassNameCases||(t.ClassNameCases={}));t.BemHelper=class{constructor(){this.elementSeparator="__",this.modifierSeparator="--",this.classPropertyValueRegex=/[\s]+class(Name)?(:[\w]*)?=["'`]{1}([^"'`])+["'`]{1}/g,this.classNameRegex=/["'`]{1}(.*)["'`]{1}/,this.ignoredParentClasses=[],this.languageProviders=[],this.classNameProviders=[]}generateStyleSheet(e,t){this.resetRegex();let s="",r={};return e.forEach(e=>{if(t)s=`${s}.${e}{}`;else{let t=e.split(this.elementSeparator)[0].split(this.modifierSeparator)[0],s=e.split(this.elementSeparator)[1]?e.split(this.elementSeparator)[1].split(this.modifierSeparator)[0]:null,a=e.split(this.modifierSeparator)[1];t&&(r.hasOwnProperty(t)||(r[t]={},r[t].__BLOCK__MODIFIER__=[]),s&&!r[t].hasOwnProperty(s)&&(r[t][s]=[]),a&&(s?r[t][s].includes(a)||r[t][s].push(a):r[t].__BLOCK__MODIFIER__.push(a)))}}),t||Object.keys(r).forEach(e=>{s=`${s}.${e}{`,Object.keys(r[e]).filter(e=>"__BLOCK__MODIFIER__"!==e).forEach(t=>{s=`${s}&${this.elementSeparator}${t}{`,r[e][t].forEach(e=>{s=`${s}&${this.modifierSeparator}${e}{}`}),s+="}"}),r[e].__BLOCK__MODIFIER__.forEach(e=>{s=`${s}&${this.modifierSeparator}${e}{}`}),s+="}"}),s}getClasses(e,t,s){this.resetRegex();let r=[];if(this.languageProviders.filter(e=>!t||e.languages.includes(t)).flatMap(e=>e.htmlIgnorePatterns).forEach(t=>{e=e.replace(t," ")}),null===this.classPropertyValueRegex)return r;let a;for(;a=this.classPropertyValueRegex.exec(e);){let e=this.classNameRegex.exec(a[0]);if(null===e||e.length<2)return r;e[1].split(" ").forEach(e=>{""!==e&&(r.includes(e)||r.push(e))})}return r=r.filter(e=>!this.ignoredParentClasses.includes(e)),s?r.flatMap(e=>e.split(this.elementSeparator).flatMap(e=>e.split(this.modifierSeparator))):r}getPrecedingClassName(e,t,s,r,a){let i=this.getClasses(e,a).filter(e=>!this.ignoredParentClasses.includes(e));if(s||(s="explicit-only"),"first-parent"===s){const e=i.pop();if(!e)return;return e.split(this.elementSeparator)[0]}if("prefer-explicit"===s){const s=this.getPrecedingClassName(e,t,"first-parent",!1,a);return this.getPrecedingClassName(e,t,"explicit-only",!1,a)||s}let o=t?i:i.filter(e=>!e.includes(this.elementSeparator));return o=r?o:o.filter(e=>!e.includes(this.modifierSeparator)),o.pop()}getClassCaseType(e){return this.resetRegex(),e=e.replace(this.elementSeparator,"").replace(this.modifierSeparator,""),this.classNameProviders.forEach(t=>{if(e.match(t.nameMatchRegex))return t.name}),r.Any}createClass(e){let t="";return t=e.element&&e.modifier?`${e.block}${this.elementSeparator}${e.element}${this.modifierSeparator}${e.modifier}`:!e.element&&e.modifier?`${e.block}${this.modifierSeparator}${e.modifier}`:e.element&&!e.modifier?`${e.block}${this.elementSeparator}${e.element}`:e.block,t}convertStringToCase(e,t){var s;this.resetRegex();let r=e,a=e.replace(/-/g," ").replace(/_/g," ").split("").map(e=>e.match(/^[A-Z]$/)?" "+e:e).join("").toLowerCase().trim().split(" ").filter(e=>e);const i=null===(s=this.classNameProviders.find(e=>e.name===t))||void 0===s?void 0:s.convertWordsToClassName;return i&&(r=i(a)),r}convertClass(e,t){this.resetRegex();let s=e.includes(this.modifierSeparator)?e.split(this.modifierSeparator)[e.split(this.modifierSeparator).length-1]:"",r=e.includes(this.elementSeparator)?e.split(this.elementSeparator)[e.split(this.elementSeparator).length-1].split(this.modifierSeparator)[0]:"",a=e.split(this.elementSeparator)[0],i={block:this.convertStringToCase(a,t),element:this.convertStringToCase(r,t),modifier:this.convertStringToCase(s,t)};return this.createClass(i)}isBemClass(e){return!(!this.modifierSeparator.includes(this.elementSeparator)&&!this.elementSeparator.includes(this.modifierSeparator))||!(e.split(this.elementSeparator).length>2||e.split(this.modifierSeparator).length>3)}isCaseMatch(e,t){this.resetRegex(),e=this.elementSeparator.length>this.modifierSeparator.length?e.replace(this.elementSeparator,"").replace(this.modifierSeparator,""):e.replace(this.modifierSeparator,"").replace(this.elementSeparator,"");const s=this.classNameProviders.find(e=>e.name===t);return!!s&&!!e.match(s.nameMatchRegex)}getClassPropertyWord(e){let t="class";return this.languageProviders.forEach(s=>{s.languages.includes(e)&&(t=s.classAttributeLabel)}),t}registerLanguageProvider(e,t){if(0!==this.languageProviders.filter(t=>t.languages===e.languages).length&&t)throw new Error("Cannot register duplicate language provider for language: "+e.languages);this.languageProviders.push(e)}registerClassNameProvider(e){this.classNameProviders.push(e)}resetRegex(){this.classPropertyValueRegex.lastIndex=0,this.classNameProviders.forEach(e=>{e.nameMatchRegex.lastIndex=0}),this.classNameRegex.lastIndex=0}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getConfigValue=void 0;const r=s(0);t.getConfigValue=function(e,t){let s=r.workspace.getConfiguration().get(e);return void 0!==s?s:t}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const r=s(0),a=s(4),i=s(5),o=s(6),n=s(2),l=s(1),c=s(7),d=s(8),u=new l.BemHelper;c.defaultLanguageProviders.forEach(e=>u.registerLanguageProvider(e)),d.defaultClassNameProviders.forEach(e=>u.registerClassNameProvider(e));const g=new i.BemHelperCodeActionsProvider(u);function m(e){!function(e){const t=new a.BemCommandProvider(u);let s=n.getConfigValue("bemHelper.elementSeparator","__"),i=n.getConfigValue("bemHelper.modifierSeparator","--");t.setBemSeparators(s,i),e.subscriptions.push(r.commands.registerCommand("extension.bemHelper.insertModifiedElement",()=>{t.insertElementAtCursor(!0)}),r.commands.registerCommand("extension.bemHelper.insertElement",()=>{t.insertElementAtCursor(!1)}),r.commands.registerCommand("extension.bemHelper.generateStyleSheet",()=>{t.generateStyleSheetForCurrentDocument()}),r.commands.registerCommand("extension.bemHelper.generateStyleSheetFromSelection",()=>{t.generateStyleSheetForSelection()}),r.commands.registerCommand("extension.bemHelper.convertSelectionToCase",()=>{t.convertSelectionToCase()}))}(e),function(e){const t=new o.BemDiagnosticProvider(u),s=r.languages.createDiagnosticCollection(t.diagnosticCollectionName);r.window.activeTextEditor&&(t.updateDiagnostics(r.window.activeTextEditor.document,s),i.BemHelperCodeActionsProvider.diagnostics=t.errors);e.subscriptions.push(r.workspace.onDidSaveTextDocument(e=>{t.updateDiagnostics(e,s),i.BemHelperCodeActionsProvider.diagnostics=t.errors}),r.workspace.onDidOpenTextDocument(e=>{t.updateDiagnostics(e,s),i.BemHelperCodeActionsProvider.diagnostics=t.errors}),r.window.onDidChangeActiveTextEditor(e=>{e&&t.updateDiagnostics(e.document,s),i.BemHelperCodeActionsProvider.diagnostics=t.errors})),n.getConfigValue("bemHelper.responsiveLinting",!1)&&e.subscriptions.push(r.workspace.onDidChangeTextDocument(e=>{e&&(t.updateDiagnostics(e.document,s),i.BemHelperCodeActionsProvider.diagnostics=t.errors)}))}(e),function(e){e.subscriptions.push(r.languages.registerCodeActionsProvider("*",g,{providedCodeActionKinds:i.BemHelperCodeActionsProvider.providedCodeActionKinds}))}(e)}t.activate=m,t.deactivate=function(){},t.activate=m},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BemCommandProvider=void 0;const r=s(0),a=s(1),i=s(2);t.BemCommandProvider=class{constructor(e){this.loadIgnoredClasses=()=>{this.bemHelper.ignoredParentClasses=i.getConfigValue("bemHelper.ignoreClassNames",["material-icons"])},this.bemHelper=e,this.loadIgnoredClasses()}setBemSeparators(e,t){this.bemHelper.elementSeparator=e,this.bemHelper.modifierSeparator=t}convertSelectionToCase(){let e=r.window.activeTextEditor;e?r.window.showQuickPick([a.ClassNameCases.Kebab.valueOf(),a.ClassNameCases.Snake.valueOf(),a.ClassNameCases.Pascal.valueOf(),a.ClassNameCases.Camel.valueOf(),a.ClassNameCases.ShoutingSnake.valueOf()],{placeHolder:"Choose a class case"}).then(t=>{if(!t)return void r.window.showErrorMessage("No class case selected.");if(!e)return;let s=e.document.getText(e.selection),a=this.bemHelper.convertClass(s,t);e.insertSnippet(new r.SnippetString(""+a))}):r.window.showErrorMessage("No active text editor. Please open a file")}generateStyleSheetForCurrentDocument(){let e=r.window.activeTextEditor;if(!e)return void r.window.showErrorMessage("No active text editor. Please open a file");let t=e.document.getText();this.generateStyleSheetForText(t)}generateStyleSheetForSelection(){let e=r.window.activeTextEditor,t=e.document.getText(e.selection);e?this.generateStyleSheetForText(t):r.window.showErrorMessage("No active text editor. Please open a file")}async generateStyleSheetForText(e){const t=await r.window.showQuickPick(["scss","less","css"],{placeHolder:"Choose a type of stylesheet to generate"});if(!t)return void r.window.showErrorMessage("No stylesheet type selected.");const s=await r.window.showQuickPick(["To new editor","To clipboard"],{placeHolder:"Where do you want to generate the new stylesheet?"});if(!s)return void r.window.showErrorMessage("No output type selected.");const a=r.window.setStatusBarMessage(`Generating ${t}...`);this.loadIgnoredClasses();let o=this.bemHelper.getClasses(e);if(!o||0===o.length)return void r.window.showErrorMessage("No classes found to generate stylesheet from.");i.getConfigValue("bemHelper.sortGeneratedStylesheets",!1)&&(o=o.sort());const n=this.bemHelper.generateStyleSheet(o,"css"===t);if("To clipboard"===s)return void r.env.clipboard.writeText(n);const l=await r.workspace.openTextDocument({language:t,content:n});r.window.showTextDocument(l).then(()=>{r.commands.executeCommand("editor.action.formatDocument")}).then(a.dispose())}insertElementAtCursor(e){let t=r.window.activeTextEditor;const s=i.getConfigValue("bemHelper.blockSelectionMode","prefer-explicit");if(this.loadIgnoredClasses(),void 0===t)return void r.window.showErrorMessage("No active text editor. Please open a file");const a=t.document.languageId;let o=this.bemHelper.getPrecedingClassName(t.document.getText(new r.Range(0,0,t.selection.active.line,t.selection.active.character)),!1,s,!1,a);if(null===o)return void r.window.showErrorMessage("Could not find any classes in current file.");const n=this.bemHelper.getClassPropertyWord(t.document.languageId);let l="";const c=i.getConfigValue("bemHelper.newLineAfterInsert",!0);l=e?`<\${3:div} ${n}="${o}${this.bemHelper.elementSeparator}$1 ${o}${this.bemHelper.elementSeparator}$1${this.bemHelper.modifierSeparator}$2">$4</$3>${c?"\n":""}$0`:`<\${2:div} ${n}="${o}${this.bemHelper.elementSeparator}$1">$3</$2>${c?"\n":""}$0`,t.insertSnippet(new r.SnippetString(l))}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BemHelperCodeActionsProvider=void 0;const r=s(0),a=s(1),i=s(2);class o{constructor(e){this.bemHelper=e}provideQuickFixes(e,t){let s=[];if(!this.isQuickFixable(e))return s;let r=t.getText(e.range);if("depth"===e.code)return s;if("case"===e.code){let o=i.getConfigValue("bemHelper.classNameCase",a.ClassNameCases.Any);if(o===a.ClassNameCases.Any)return s;s.push(this.createFix(t,e.range,this.bemHelper.convertClass(r,o),r.length))}return s}isQuickFixable(e){return!0}provideCodeActions(e,t){let s=[];return o.diagnostics.forEach(r=>{if(t.contains(r.range)){let t=this.provideQuickFixes(r,e);s=s.concat(...t)}}),s}createFix(e,t,s,a){const i=new r.CodeAction("Convert to "+s,r.CodeActionKind.QuickFix);return i.edit=new r.WorkspaceEdit,i.edit.replace(e.uri,new r.Range(t.start,t.start.translate(0,a)),s),i}}t.BemHelperCodeActionsProvider=o,o.providedCodeActionKinds=[r.CodeActionKind.QuickFix],o.diagnostics=[]},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BemDiagnosticProvider=void 0;const r=s(0),a=s(1),i=s(2);t.BemDiagnosticProvider=class{constructor(e){this.diagnosticCollectionName="BemHelper",this.errors=[],this.bemHelper=e;let t=i.getConfigValue("bemHelper.elementSeparator","__"),s=i.getConfigValue("bemHelper.modifierSeparator","--");this.bemHelper.elementSeparator=t,this.bemHelper.modifierSeparator=s}getClassNameDepthProblems(e,t){let s=[],a=this.bemHelper.getClasses(e);return a?(a.forEach(a=>{if(!this.bemHelper.isBemClass(a)){let i=-1;if(""===a)return;for(;-1!==(i=e.indexOf(a,i+1))&&e.length>=i;){const e=t.document.positionAt(i),o=t.document.positionAt(i+a.length);s.push({code:"depth",message:"BEM - classes must only consist of block and element.",range:new r.Range(e,o),severity:r.DiagnosticSeverity.Warning,source:"bem helper",relatedInformation:[new r.DiagnosticRelatedInformation(new r.Location(t.document.uri,new r.Range(new r.Position(e.line,e.character),new r.Position(o.line,o.character))),""+a)]})}}}),s):s}getClassNameCaseProblems(e,t,s,a){let i=[],o=this.bemHelper.getClasses(e,void 0,!0);if(!o)return i;for(const n of o){if(i.length>=a)break;if(s.find(e=>this.bemHelper.isCaseMatch(n,e)))continue;let o=-1;if(""===n)return[];for(;-1!==(o=e.indexOf(n,o+1))&&e.length>=o;){const e=t.document.positionAt(o),a=t.document.positionAt(o+n.length);let l=new r.Range(new r.Position(e.line,0),new r.Position(e.line,1e3));t.document.getText(l).match(this.bemHelper.classPropertyValueRegex)&&i.push({code:"case",message:`BEM - Class names must be in ${s.join(" or ")} case`,range:new r.Range(e,a),severity:r.DiagnosticSeverity.Warning,source:"bem helper",relatedInformation:[new r.DiagnosticRelatedInformation(new r.Location(t.document.uri,new r.Range(new r.Position(e.line,e.character),new r.Position(a.line,a.character))),""+n)]})}}return i.slice(0,a)}updateDiagnostics(e,t){var s;let o=r.window.activeTextEditor;if(void 0===o)return;let n=i.getConfigValue("bemHelper.maxWarningsCount",100);const l=e.getText();let c=new Array;i.getConfigValue("bemHelper.showDepthWarnings",!1)&&(c=c.concat(this.getClassNameDepthProblems(l,o)));const d=r.workspace.getConfiguration().get("bemHelper.classNameCase"),u=null!==(s=null==d?void 0:d.split(",").map(e=>e).filter(e=>e))&&void 0!==s?s:[a.ClassNameCases.Any];u.includes(a.ClassNameCases.Any)||(c=c.concat(this.getClassNameCaseProblems(l,o,u,n))),c.length>0?t.set(e.uri,c):t.clear(),this.errors=c}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultLanguageProviders=t.SvelteLanguageProvider=t.TwigLanguageProvider=t.RazorLanguageProvider=t.PhpLanguageProvider=t.JavascriptReactLanguageProvider=t.TypescriptReactLanguageProvider=t.HtmlLanguageProvider=void 0;class r{constructor(){this.languages=["html"],this.classAttributeLabel="class",this.htmlIgnorePatterns=[]}}t.HtmlLanguageProvider=r;class a{constructor(){this.languages=["typescriptreact"],this.classAttributeLabel="className",this.htmlIgnorePatterns=[/\${.*}/g]}}t.TypescriptReactLanguageProvider=a;class i{constructor(){this.languages=["javascriptreact"],this.classAttributeLabel="className",this.htmlIgnorePatterns=[/\${.*}/g]}}t.JavascriptReactLanguageProvider=i;class o{constructor(){this.languages=["php"],this.classAttributeLabel="class",this.htmlIgnorePatterns=[/<\?php\s+.*\?>/g]}}t.PhpLanguageProvider=o;class n{constructor(){this.languages=["razor","cshtml","aspnetcorerazor"],this.classAttributeLabel="class",this.htmlIgnorePatterns=[/[\w\d-_]*@((\(.*\))|([\w\d-_]+))[\s]?/g]}}t.RazorLanguageProvider=n;class l{constructor(){this.languages=["twig"],this.classAttributeLabel="class",this.htmlIgnorePatterns=[/\{\{[\d\w_\-=\s'"`|]*\}\}/g,/\{\%[\d\w_\-=\s'"`|]*\%\}/g]}}t.TwigLanguageProvider=l;class c{constructor(){this.languages=["svelte"],this.classAttributeLabel="class",this.htmlIgnorePatterns=[/\{[^{}]*\}/g]}}t.SvelteLanguageProvider=c,t.defaultLanguageProviders=[new r,new n,new i,new o,new a,new l,new c]},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultClassNameProviders=t.AnyCase=t.PascalCase=t.CamelCase=t.ShoutingSnakeCase=t.SnakeCase=t.KebabCase=void 0;class r{constructor(){this.nameMatchRegex=/^[a-z0-9-]+$/,this.name="kebab",this.convertWordsToClassName=e=>e.join("-")}}t.KebabCase=r;class a{constructor(){this.nameMatchRegex=/^[a-z0-9_]+$/,this.name="snake",this.convertWordsToClassName=e=>e.join("_")}}t.SnakeCase=a;class i{constructor(){this.nameMatchRegex=/^[A-Z0-9_]+$/,this.name="shoutingSnake",this.convertWordsToClassName=e=>e.join("_").toUpperCase()}}t.ShoutingSnakeCase=i;class o{constructor(){this.nameMatchRegex=/^[a-z]{1}[a-zA-Z0-9]+$/,this.name="camel",this.convertWordsToClassName=e=>e.map((e,t)=>0===t?e:`${e[0].toUpperCase()}${e.slice(1)}`).join("")}}t.CamelCase=o;class n{constructor(){this.nameMatchRegex=/^[A-Z]{1}[a-zA-Z0-9]+$/,this.name="pascal",this.convertWordsToClassName=e=>e.map(e=>`${e[0].toUpperCase()}${e.slice(1)}`).join("")}}t.PascalCase=n;class l{constructor(){this.nameMatchRegex=/.*/,this.name="any",this.convertWordsToClassName=e=>e.join()}}t.AnyCase=l,t.defaultClassNameProviders=[new r,new a,new i,new o,new n,new l]}]);
//# sourceMappingURL=extension.js.map