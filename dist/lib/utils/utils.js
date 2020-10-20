"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveNgModule = exports.isNgModule = exports.isModuleWithProviders = exports.isClassProvider = exports.isValueProvider = exports.directiveResolver = exports.pipeResolver = exports.jitReflector = void 0;
const compilerReflector_1 = require("./compilerReflector");
const compiler_1 = require("@angular/compiler");
let jitReflector = new compilerReflector_1.JitReflector();
exports.jitReflector = jitReflector;
let pipeResolver = new compiler_1.PipeResolver(jitReflector);
exports.pipeResolver = pipeResolver;
let directiveResolver = new compiler_1.DirectiveResolver(jitReflector);
exports.directiveResolver = directiveResolver;
let ngModuleResolver = new compiler_1.NgModuleResolver(jitReflector);
function isValueProvider(provider) {
    return 'useValue' in provider;
}
exports.isValueProvider = isValueProvider;
function isClassProvider(provider) {
    return 'useClass' in provider;
}
exports.isClassProvider = isClassProvider;
function isModuleWithProviders(thing) {
    return 'ngModule' in thing;
}
exports.isModuleWithProviders = isModuleWithProviders;
function isNgModule(thing) {
    return ngModuleResolver.isNgModule(thing);
}
exports.isNgModule = isNgModule;
function resolveNgModule(thing) {
    return ngModuleResolver.resolve(thing);
}
exports.resolveNgModule = resolveNgModule;
