"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ng_mocks_1 = require("ng-mocks");
const core_1 = require("@angular/core");
const utils_1 = require("./../utils/utils");
/**
 * Break a module up into its individual references.
 * @param ngModule
 * @returns references to the parts of the module
 */
function resolveModule(ngModule) {
    let ngMod = null;
    if (typeof ngModule === 'object') {
        ngMod = ngModule;
    }
    else if (typeof ngModule === 'function') {
        ngMod = utils_1.resolveNgModule(ngModule) || {};
    }
    else {
        throw new Error('Plumbline doesn\'t know how to resolve module: ' + ngModule);
    }
    if (ngMod.imports === void 0) {
        ngMod.imports = [];
    }
    if (ngMod.providers === void 0) {
        ngMod.providers = [];
    }
    if (ngMod.declarations === void 0) {
        ngMod.declarations = [];
    }
    if (ngMod.exports === void 0) {
        ngMod.exports = [];
    }
    if (ngMod.entryComponents === void 0) {
        ngMod.entryComponents = [];
    }
    if (ngMod.schemas === void 0) {
        ngMod.schemas = [];
    }
    return ngMod;
}
exports.resolveModule = resolveModule;
/**
 * Completely copy the module pieces
 * @param ngModule
 * @returns complete clone of module
 */
function copyModule(ngModule) {
    let imports = ngModule.imports === void 0 ? [] : ngModule.imports;
    let providers = ngModule.providers === void 0 ? [] : ngModule.providers;
    let declarations = ngModule.declarations === void 0 ? [] : ngModule.declarations;
    let exports = ngModule.exports === void 0 ? [] : ngModule.exports;
    let entryComponents = ngModule.entryComponents === void 0 ? [] : ngModule.entryComponents;
    let schemas = ngModule.schemas === void 0 ? [] : ngModule.schemas;
    return {
        imports: [].concat(imports),
        providers: [].concat(providers),
        declarations: [].concat(declarations),
        exports: [].concat(exports),
        entryComponents: [].concat(entryComponents),
        schemas: [].concat(schemas)
    };
}
exports.copyModule = copyModule;
class Tester {
    constructor(testComponent, options = {}) {
        this.completeModule = {
            imports: [],
            declarations: [],
            providers: [],
            exports: [],
            entryComponents: [],
            schemas: []
        };
        this.cacheModule = {
            imports: new Map(),
            declarations: new Map(),
            providers: new Map(),
            exports: new Map(),
            entryComponents: new Map(),
            schemas: new Map()
        };
        this.baseModule = {
            imports: new Set(),
            declarations: new Set(),
            providers: new Set(),
            exports: new Set(),
            entryComponents: new Set(),
            schemas: new Set()
        };
        this.testComponent = testComponent;
        this.options = typeof options === 'object' ? options : {};
        this.mockModule = this.options.mockModule ? this.options.mockModule : null;
        this.mountModule = this.options.mountModule ? this.options.mountModule : null;
        // list of things not to mock
        this.dontMock = [];
        this.dontMock.push(...Array.isArray(this.options.dontMock) ? this.options.dontMock : []);
    }
    getCompleteModule() {
        // Process the test component in question first
        this.processModule({
            declarations: [this.testComponent]
        }, true);
        // Process the mount module next
        let mountModule = this.mountModule ? copyModule(resolveModule(this.mountModule)) : {
            imports: [],
            declarations: [],
            providers: [],
            exports: [],
            entryComponents: [],
            schemas: []
        };
        // Process the mock module next
        let mockModule = this.mockModule ? copyModule(resolveModule(this.mockModule)) : {
            imports: [],
            declarations: [],
            providers: [],
            exports: [],
            entryComponents: [],
            schemas: []
        };
        // Combine the schemas
        this.completeModule.schemas = mountModule.schemas.concat(mockModule.schemas);
        // Process both modules
        this.processModule(mountModule, true);
        this.processModule(mockModule, false);
        let completeModule = this.completeModule;
        return completeModule;
    }
    processModule(mod, dontmock) {
        // Clear declarations
        while ((mod.imports && mod.imports.length > 0) ||
            (mod.declarations && mod.declarations.length > 0) ||
            (mod.providers && mod.providers.length > 0)) {
            while (mod.providers && mod.providers.length > 0) {
                let providers = mod.providers.shift();
                this.mockProv(providers, mod, dontmock);
            }
            let imports = mod.imports;
            mod.imports = [];
            if (imports) {
                this.baseImp(imports, dontmock);
            }
            let declarations = mod.declarations;
            mod.declarations = [];
            if (declarations) {
                this.baseDec(declarations, dontmock, this.completeModule.imports);
            }
        }
    }
    // ++++++++++++++++++++++++++++++++++++++++
    //   Declarations
    // ++++++++++++++++++++++++++++++++++++++++
    // Check the cache for this particular declaration or list of declarations
    listDec(thing, dontmock, addedImports = [], runningList = []) {
        let resmod = createPropImport(thing, {
            declarations: [],
            imports: [],
            exports: [],
            entryComponents: [],
            schemas: this.completeModule.schemas
        });
        let resobj = resolveModule(resmod);
        // do not cache the test component in question
        if (thing === this.testComponent) {
            return resmod;
        }
        // check to see if declaration is in cache
        if (this.cacheModule.declarations.has(thing)) {
            // Add the cached module containing the declaration to imports
            resobj.imports.push(this.cacheModule.declarations.get(thing));
            resobj.exports.push(this.cacheModule.declarations.get(thing));
            return resmod;
        }
        // Breakdown arrays
        if (Array.isArray(thing)) {
            thing.forEach((single) => {
                if (single && !runningList.includes(single)) {
                    let tempDec = resolveModule(this.listDec(single, dontmock, addedImports, runningList));
                    resobj.imports.push(...tempDec.imports);
                    resobj.declarations.push(...tempDec.declarations);
                    resobj.exports.push(...tempDec.exports);
                }
            });
        }
        else {
            let pointer = null;
            // use the regular component if we specify
            if (this.dontMock.includes(thing) || dontmock) {
                pointer = thing;
            }
            else { // actually mock the component
                try {
                    pointer = createMockDeclaration(thing);
                }
                catch (e) {
                    throw new Error('Plumbline had trouble mocking ' +
                        ((thing && thing.name) ? thing.name : thing) + '.\n' + e);
                }
            }
            resobj.declarations.push(pointer);
            resobj.exports.push(pointer);
            runningList.push(thing);
        }
        // Cache all declarations traversed under this response module
        runningList.forEach((single) => {
            this.cacheModule.declarations.set(single, resmod);
        });
        resobj.imports.push(...addedImports);
        return resmod;
    }
    // Check the cache for this particular declaration or list of declarations
    cacheDec(thing, dontmock, addedImports = []) {
        // do not cache the test component in question
        if (thing === this.testComponent) {
            return [];
        }
        // check to see if declaration is in cache
        if (!this.cacheModule.declarations.has(thing)) {
            // Breakdown arrays
            if (Array.isArray(thing)) {
                let decList = [];
                thing.forEach((single) => {
                    decList.push(...this.cacheDec(single, dontmock, addedImports));
                });
                return decList;
            }
            let pointer = null;
            // use the regular component if we specify
            if (this.dontMock.includes(thing) || dontmock) {
                pointer = thing;
            }
            else { // actually mock the component
                try {
                    pointer = createMockDeclaration(thing);
                }
                catch (e) {
                    throw new Error('Plumbline had trouble mocking ' +
                        ((thing && thing.name) ? thing.name : thing) + '.\n' + e);
                }
            }
            pointer = createPropImport(thing, {
                declarations: [pointer],
                imports: addedImports,
                exports: [pointer],
                schemas: this.completeModule.schemas
            });
            this.cacheModule.declarations.set(thing, pointer);
            return [pointer];
        }
        else { // return a module wrapper for declarations already in cache
            return [this.cacheModule.declarations.get(thing)];
        }
    }
    // Mocking declaration components
    baseDec(thingList, dontmock, addedImports = []) {
        thingList.forEach((thing) => {
            // Exit if the base module already has the declaration
            if (this.baseModule.declarations.has(thing)) {
                return;
            }
            // directly mount the test component
            if (thing === this.testComponent) {
                if (this.cacheModule.declarations.has(thing)) {
                    return;
                }
                this.completeModule.declarations.push(thing);
                this.cacheModule.declarations.set(thing, thing);
                this.baseModule.declarations.add(thing);
                return;
            }
            // Breakdown arrays
            if (Array.isArray(thing)) {
                this.baseDec(thing, dontmock, addedImports);
                return;
            }
            // let pointerList = this.cacheDec(thing, dontmock, addedImports);
            // if (pointerList.length > 0) {
            //     this.completeModule.imports.push(...pointerList);
            //     this.baseModule.declarations.add(thing);
            // }
            if (thing) {
                let pointerList = this.listDec(thing, dontmock, addedImports);
                this.completeModule.imports.push(pointerList);
                this.baseModule.declarations.add(thing);
            }
        });
    }
    // ++++++++++++++++++++++++++++++++++++++++
    //   Providers
    // ++++++++++++++++++++++++++++++++++++++++
    // Mocking provide providers
    mockProv(thing, mod, dontmock) {
        // Stop if provider is in cache
        if (this.cacheModule.providers.has(thing)) {
            return;
        }
        if (Array.isArray(thing)) {
            thing.forEach((single) => {
                mod.providers.push(single);
            });
            return;
        }
        let provide;
        if (typeof thing === 'function') {
            provide = thing;
        }
        else {
            provide = thing.provide;
        }
        let pointer = null;
        // Use the regular provider if we specify or it is already mocked
        if (this.dontMock.includes(provide) || dontmock || provide !== thing) {
            pointer = thing;
            this.completeModule.providers.push(pointer);
        }
        else {
            pointer = { provide: provide, useValue: createMockProvider(provide) };
            this.completeModule.providers.push(pointer);
        }
        this.cacheModule.providers.set(thing, pointer);
        // this.cacheModule.providers.set(provide, pointer);
    }
    // ++++++++++++++++++++++++++++++++++++++++
    //   Imports
    // ++++++++++++++++++++++++++++++++++++++++
    cacheImp(thing, dontmock = false, exportmock = false) {
        // Stop if import is in cache
        if (!this.cacheModule.imports.has(thing)) {
            // Breakdown arrays
            if (Array.isArray(thing)) {
                let impList = [];
                thing.forEach((single) => {
                    impList.push(...this.cacheImp(single, dontmock));
                });
                return impList;
            }
            // Todo: May need to adjust the ngModule case in the future
            if (utils_1.isModuleWithProviders(thing)) {
                let leftoverMod = copyModule(resolveModule(thing));
                delete leftoverMod['ngModule'];
                let baselineMod = [this.cacheImp(thing.ngModule, dontmock)];
                //if (dontmock)
                //    baselineMod.push(this.cacheImp(leftoverMod, dontmock));
                return baselineMod;
            }
            let pointer = null;
            // Use the regular import if we specify
            if (this.dontMock.includes(thing) || exportmock) {
                pointer = thing;
            }
            else {
                let copied = copyModule(resolveModule(thing));
                // Cache the imports
                let imps = [];
                copied.imports.forEach((single) => {
                    let resSingle = this.cacheImp(single, dontmock);
                    imps.push(...resSingle);
                });
                copied.imports = [].concat(imps);
                // Cache the declarations and wrap them all in NgModules
                let decls = [];
                if (copied.declarations) {
                    let resSingle1 = this.listDec(copied.declarations, dontmock, imps);
                    decls.push(resSingle1);
                    // Move dependencies into the queue for top layer processing
                    this.baseDec(copied.declarations, dontmock, imps);
                }
                // Move the declarations to imports encased in NgModules
                copied.imports.push(...decls);
                copied.declarations = [];
                // Cache the exports
                let expts = [];
                copied.exports.forEach((single) => {
                    if (utils_1.isNgModule(single)) {
                        let resSingle = this.cacheImp(single, dontmock, true);
                        expts.push(...resSingle);
                    }
                    else if (single) {
                        let resSingle = this.listDec(single, dontmock, imps);
                        expts.push(resSingle);
                    }
                });
                copied.exports = expts;
                copied.schemas = this.completeModule.schemas;
                // Leave out entryComponents when mocking
                if (!dontmock) {
                    copied.entryComponents = [];
                }
                pointer = createPropImport(thing, copied);
                // pointer = createMockImport(thing);
            }
            // Create a container for the module
            pointer = createPropImport(thing, {
                imports: [pointer],
                exports: [pointer],
                schemas: this.completeModule.schemas
            });
            this.cacheModule.imports.set(thing, pointer);
            return [pointer];
        }
        else {
            return [this.cacheModule.imports.get(thing)];
        }
    }
    // Mocking import modules
    baseImp(thingList, dontmock) {
        thingList.forEach((thing) => {
            // Breakdown arrays
            if (Array.isArray(thing)) {
                this.baseImp(thing, dontmock);
                return;
            }
            let pointerList = this.cacheImp(thing, dontmock);
            this.completeModule.imports.push(...pointerList);
        });
    }
}
exports.Tester = Tester;
function createMockDeclaration(inDeclaration) {
    return ng_mocks_1.MockDeclaration(inDeclaration);
}
exports.createMockDeclaration = createMockDeclaration;
function createMockImport(inImport) {
    let MockModuleContainer = class MockModuleContainer {
    };
    MockModuleContainer = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [],
            exports: [],
            entryComponents: [],
            providers: [],
            schemas: []
        }),
        ng_mocks_1.MockOf(inImport)
    ], MockModuleContainer);
    return MockModuleContainer;
}
exports.createMockImport = createMockImport;
function createPropImport(inImport, propImport) {
    let modA = {
        imports: [],
        declarations: [],
        exports: [],
        entryComponents: [],
        providers: [],
        schemas: []
    };
    if (propImport) {
        modA.imports = propImport.imports ? propImport.imports : [];
        modA.declarations = propImport.declarations ? propImport.declarations : [];
        modA.exports = propImport.exports ? propImport.exports : [];
        modA.entryComponents = propImport.entryComponents ? propImport.entryComponents : [];
        modA.providers = propImport.providers ? propImport.providers : [];
        modA.schemas = propImport.schemas ? propImport.schemas : [];
    }
    let MockModuleContainer = class MockModuleContainer {
    };
    MockModuleContainer = __decorate([
        core_1.NgModule(modA),
        ng_mocks_1.MockOf(inImport)
    ], MockModuleContainer);
    return MockModuleContainer;
}
exports.createPropImport = createPropImport;
function createMockProvider(mockedClass) {
    class MockProvider {
        constructor(mockOf, mockProperties) {
            this.mockOf = mockOf;
            Object.assign(this, mockProperties === void 0 ? {} : mockProperties);
        }
    }
    let methods = getClassMethods(mockedClass);
    methods.forEach((m) => {
        // mock and replace all functions of this class
        MockProvider.prototype[m] = () => {
            // send an understandable message if this function is vital to component operation
            return 'Plumbline::mount function called: ' + mockedClass.constructor.name + '.' + m;
        };
    });
    // methods.forEach(m => spyOn(mockedClass.prototype, m));
    return new MockProvider(mockedClass);
}
exports.createMockProvider = createMockProvider;
function getClassMethods(className) {
    // todo - add a check if it is an object or not
    let ret = new Set();
    function methods(obj) {
        if (obj) {
            let ps = Object.getOwnPropertyNames(obj);
            ps.forEach(p => {
                if (obj[p] instanceof Function) {
                    ret.add(p);
                }
                else {
                    // Can add properties if needed
                }
            });
            try {
                methods(Object.getPrototypeOf(obj));
            }
            catch (e) {
                return;
            }
        }
    }
    try {
        methods(className.prototype);
    }
    catch (e) {
        return [];
    }
    return Array.from(ret);
}
