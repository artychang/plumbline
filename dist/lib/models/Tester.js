"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockProvider = exports.createPropImport = exports.createMockImport = exports.createMockDeclaration = exports.Tester = exports.copyModule = exports.resolveModule = void 0;
const ng_mocks_1 = require("ng-mocks");
const mock_of_1 = require("ng-mocks/dist/lib/common/mock-of");
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
    // @param thing - component declarations
    // @return - a singular module reference to containing declarations
    // and all required imports in one package
    decToImportRef(thing, dontmock, addedImports = [], postProcessDecs = []) {
        // Create a single import reference package
        let resmod = createPropImport(thing, {
            declarations: [],
            imports: [],
            exports: [],
            entryComponents: [],
            schemas: this.completeModule.schemas
        });
        let resobj = resolveModule(resmod);
        // Throw back an empty import reference
        if (postProcessDecs.includes(thing)) {
            return resmod;
        }
        // check to see if declaration is in cache
        // caching is only done after each complete module
        if (this.cacheModule.declarations.has(thing)) {
            // Add the cached module containing the declaration to imports
            resobj.imports.push(this.cacheModule.declarations.get(thing));
            resobj.exports.push(this.cacheModule.declarations.get(thing));
            return resmod;
        }
        // Breakdown arrays recursively
        if (Array.isArray(thing)) {
            thing.forEach((single) => {
                if (single) {
                    let tempDec = resolveModule(this.decToImportRef(single, dontmock, addedImports, postProcessDecs));
                    // Assign the module properties to this aggregate module
                    resobj.imports.push(...tempDec.imports);
                    resobj.declarations.push(...tempDec.declarations);
                    resobj.exports.push(...tempDec.exports);
                }
            });
        }
        else {
            // Prepare a single declaration conversion
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
            // Assign the module properties to this aggregate module
            resobj.imports.push(...addedImports);
            resobj.declarations.push(pointer);
            resobj.exports.push(pointer);
            postProcessDecs.push(thing);
        }
        // Cache all declarations traversed under this response module
        // Overwrite all declarations to point to the final module
        // Keep this last!
        postProcessDecs.forEach((single) => {
            this.cacheModule.declarations.set(single, resmod);
        });
        return resmod;
    }
    // Mocking declaration components
    baseDec(thingList, dontmock, addedImports = []) {
        thingList.forEach((thing) => {
            if (!thing) {
                return;
            }
            // Breakdown arrays within declarations
            if (Array.isArray(thing)) {
                this.baseDec(thing, dontmock, addedImports);
                return;
            }
            // Exit if the base module already has the declaration
            // Monitor base module and prioritize its declarations
            if (this.baseModule.declarations.has(thing)) {
                return;
            }
            // directly mount the test component
            if (thing === this.testComponent) {
                if (this.cacheModule.declarations.has(thing)) {
                    return;
                }
                /*
                // Create a single import reference package
                let resmod = createPropImport(thing, {
                    declarations: [],
                    imports: [],
                    exports: [],
                    entryComponents: [],
                    schemas: this.completeModule.schemas
                });
                */
                this.completeModule.declarations.push(thing);
                this.baseModule.declarations.add(thing);
                // this.cacheModule.declarations.set(thing, resmod);
                return;
            }
            // Otherwise convert the rest of the declarations into import references
            let tempMod = this.decToImportRef(thing, dontmock, addedImports);
            let tempObj = resolveModule(tempMod);
            // tempObj.declarations.push(this.testComponent);
            this.completeModule.imports.push(tempMod);
            this.baseModule.declarations.add(thing);
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
    // Create single import module
    // @param thing - module to be imported
    // @return - reference to the module
    impToImportRef(thing, dontmock = false, exportmock = false) {
        if (!thing) {
            return [];
        }
        // Breakdown arrays within this list recursively
        if (Array.isArray(thing)) {
            let impList = [];
            thing.forEach((single) => {
                impList.push(...this.impToImportRef(single, dontmock));
            });
            return impList;
        }
        // Create if import is in cache
        if (!this.cacheModule.imports.has(thing)) {
            // Handle the special ModuleWithProviders case
            if (utils_1.isModuleWithProviders(thing)) {
                let copied = copyModule(resolveModule(thing));
                if (dontmock) {
                    let pointer1 = null;
                    pointer1 = createPropImport(thing, copied);
                    // Create a container for the module
                    pointer1 = createPropImport(thing, {
                        imports: [pointer1],
                        exports: [pointer1],
                        schemas: this.completeModule.schemas
                    });
                    this.cacheModule.imports.set(thing, pointer1);
                    return [pointer1];
                }
                else {
                    delete copied['ngModule'];
                    let baselineMod = [this.impToImportRef(thing.ngModule, dontmock)];
                    // if (dontmock)
                    //    baselineMod.push(this.impToImportRef(copied, dontmock));
                    return baselineMod;
                }
            }
            let pointer = null;
            // Use the regular import if we specify no mock
            if (this.dontMock.includes(thing) || exportmock) {
                pointer = thing;
            }
            else {
                // Replicate the module if mocking
                let copied = copyModule(resolveModule(thing));
                // Cache the imports
                let imps = [];
                copied.imports.forEach((single) => {
                    imps.push(...this.impToImportRef(single, dontmock));
                });
                copied.imports = [].concat(imps);
                // Cache the declarations and wrap them all in NgModules
                let decls = [];
                if (copied.declarations) {
                    decls.push(this.decToImportRef(copied.declarations, dontmock, imps));
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
                        expts.push(...this.impToImportRef(single, dontmock, true));
                    }
                    else if (single) {
                        expts.push(this.decToImportRef(single, dontmock, imps));
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
            // Cache exists yield the reference instead
            return [this.cacheModule.imports.get(thing)];
        }
    }
    // Create list of import modules - starting point
    // @param thingList - list of modules to import
    baseImp(thingList, dontmock) {
        // Convert modules to references to be imported
        let pointerList = this.impToImportRef(thingList, dontmock);
        this.completeModule.imports.push(...pointerList);
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
        mock_of_1.MockOf(inImport)
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
        mock_of_1.MockOf(inImport)
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
