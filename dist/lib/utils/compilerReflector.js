"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JitReflector = exports.MODULE_SUFFIX = void 0;
const compiler_1 = require("@angular/compiler");
const core_1 = require("@angular/core");
exports.MODULE_SUFFIX = '';
const builtinExternalReferences = createBuiltinExternalReferencesMap();
class JitReflector {
    constructor() {
        this.builtinExternalReferences = new Map();
        this.reflectionCapabilities = new core_1.ɵReflectionCapabilities();
    }
    componentModuleUrl(type, cmpMetadata) {
        const moduleId = cmpMetadata.moduleId;
        if (typeof moduleId === 'string') {
            const scheme = compiler_1.getUrlScheme(moduleId);
            return scheme ? moduleId : `package:${moduleId}${exports.MODULE_SUFFIX}`;
        }
        else if (moduleId !== null && moduleId !== void 0) {
            throw compiler_1.syntaxError(`moduleId should be a string in "${core_1.ɵstringify(type)}". ` +
                `See https://goo.gl/wIDDiL for more information.\n` +
                `If you're using Webpack you should inline the template ` +
                `and the styles, see https://goo.gl/X2J8zc.`);
        }
        return `./${core_1.ɵstringify(type)}`;
    }
    parameters(typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    }
    tryAnnotations(typeOrFunc) { return this.annotations(typeOrFunc); }
    annotations(typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    }
    shallowAnnotations(typeOrFunc) {
        throw new Error('Not supported in JIT mode');
    }
    propMetadata(typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    }
    hasLifecycleHook(type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    }
    // guards(type: any): {[key: string]: any} { return this.reflectionCapabilities.guards(type); }
    resolveExternalReference(ref) {
        return builtinExternalReferences.get(ref) || ref.runtime;
    }
}
exports.JitReflector = JitReflector;
function createBuiltinExternalReferencesMap() {
    const map = new Map();
    map.set(compiler_1.Identifiers.ANALYZE_FOR_ENTRY_COMPONENTS, core_1.ANALYZE_FOR_ENTRY_COMPONENTS);
    map.set(compiler_1.Identifiers.ElementRef, core_1.ElementRef);
    map.set(compiler_1.Identifiers.NgModuleRef, core_1.NgModuleRef);
    map.set(compiler_1.Identifiers.ViewContainerRef, core_1.ViewContainerRef);
    map.set(compiler_1.Identifiers.ChangeDetectorRef, core_1.ChangeDetectorRef);
    map.set(compiler_1.Identifiers.QueryList, core_1.QueryList);
    map.set(compiler_1.Identifiers.TemplateRef, core_1.TemplateRef);
    map.set(compiler_1.Identifiers.CodegenComponentFactoryResolver, core_1.ɵCodegenComponentFactoryResolver);
    map.set(compiler_1.Identifiers.ComponentFactoryResolver, core_1.ComponentFactoryResolver);
    map.set(compiler_1.Identifiers.ComponentFactory, core_1.ComponentFactory);
    map.set(compiler_1.Identifiers.ComponentRef, core_1.ComponentRef);
    map.set(compiler_1.Identifiers.NgModuleFactory, core_1.NgModuleFactory);
    map.set(compiler_1.Identifiers.createModuleFactory, core_1.ɵcmf);
    map.set(compiler_1.Identifiers.moduleDef, core_1.ɵmod);
    map.set(compiler_1.Identifiers.moduleProviderDef, core_1.ɵmpd);
    map.set(compiler_1.Identifiers.RegisterModuleFactoryFn, core_1.ɵregisterModuleFactory);
    map.set(compiler_1.Identifiers.Injector, core_1.Injector);
    map.set(compiler_1.Identifiers.ViewEncapsulation, core_1.ViewEncapsulation);
    map.set(compiler_1.Identifiers.ChangeDetectionStrategy, core_1.ChangeDetectionStrategy);
    map.set(compiler_1.Identifiers.SecurityContext, core_1.SecurityContext);
    map.set(compiler_1.Identifiers.LOCALE_ID, core_1.LOCALE_ID);
    map.set(compiler_1.Identifiers.TRANSLATIONS_FORMAT, core_1.TRANSLATIONS_FORMAT);
    map.set(compiler_1.Identifiers.inlineInterpolate, core_1.ɵinlineInterpolate);
    map.set(compiler_1.Identifiers.interpolate, core_1.ɵinterpolate);
    map.set(compiler_1.Identifiers.EMPTY_ARRAY, core_1.ɵEMPTY_ARRAY);
    map.set(compiler_1.Identifiers.EMPTY_MAP, core_1.ɵEMPTY_MAP);
    map.set(compiler_1.Identifiers.Renderer, core_1.Renderer2);
    map.set(compiler_1.Identifiers.viewDef, core_1.ɵvid);
    map.set(compiler_1.Identifiers.elementDef, core_1.ɵeld);
    map.set(compiler_1.Identifiers.anchorDef, core_1.ɵand);
    map.set(compiler_1.Identifiers.textDef, core_1.ɵted);
    map.set(compiler_1.Identifiers.directiveDef, core_1.ɵdid);
    map.set(compiler_1.Identifiers.providerDef, core_1.ɵprd);
    map.set(compiler_1.Identifiers.queryDef, core_1.ɵqud);
    map.set(compiler_1.Identifiers.pureArrayDef, core_1.ɵpad);
    map.set(compiler_1.Identifiers.pureObjectDef, core_1.ɵpod);
    map.set(compiler_1.Identifiers.purePipeDef, core_1.ɵppd);
    map.set(compiler_1.Identifiers.pipeDef, core_1.ɵpid);
    map.set(compiler_1.Identifiers.nodeValue, core_1.ɵnov);
    map.set(compiler_1.Identifiers.ngContentDef, core_1.ɵncd);
    map.set(compiler_1.Identifiers.unwrapValue, core_1.ɵunv);
    map.set(compiler_1.Identifiers.createRendererType2, core_1.ɵcrt);
    map.set(compiler_1.Identifiers.createComponentFactory, core_1.ɵccf);
    return map;
}
