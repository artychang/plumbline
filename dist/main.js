(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlumblineWrapper = exports.mount = void 0;
var mount_1 = __webpack_require__(/*! ./lib/mount */ "./src/lib/mount.ts");
Object.defineProperty(exports, "mount", { enumerable: true, get: function () { return mount_1.mount; } });
var PlumblineWrapper_1 = __webpack_require__(/*! ./lib/PlumblineWrapper */ "./src/lib/PlumblineWrapper.ts");
Object.defineProperty(exports, "PlumblineWrapper", { enumerable: true, get: function () { return PlumblineWrapper_1.PlumblineWrapper; } });


/***/ }),

/***/ "./src/lib/PlumblineAdapter.ts":
/*!*************************************!*\
  !*** ./src/lib/PlumblineAdapter.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PlumblineRenderer_1 = __webpack_require__(/*! ./PlumblineRenderer */ "./src/lib/PlumblineRenderer.ts");
/**
 * Adapter future support for different Angular versions
 */
class PlumblineAdapter {
    constructor() {
        this.MODES = {
            MOUNT: 'mount',
            SHALLOW: 'shallow'
        };
        this.options = {};
    }
    /**
     *. Create a mounted renderer
     */
    createMountRenderer(optionsRender) {
        return {
            render(element, options, testComponent, testModule) {
                let renderer = new PlumblineRenderer_1.default(testComponent, testModule);
                return renderer.render(element, options);
            }
        };
    }
    /**
    *. Create a shallow renderer
    */
    createShallowRenderer(optionsRender) {
        return null;
    }
    createRenderer(options) {
        switch (options.mode) {
            case this.MODES.MOUNT: return this.createMountRenderer(options);
            case this.MODES.SHALLOW: return this.createShallowRenderer(options);
            default:
                throw new Error(`Plumbline Adapter Error: incorrect mode : ${options.mode}`);
        }
    }
}
exports.default = PlumblineAdapter;


/***/ }),

/***/ "./src/lib/PlumblineRenderer.ts":
/*!**************************************!*\
  !*** ./src/lib/PlumblineRenderer.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
const common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
const Renderer_1 = __webpack_require__(/*! ./models/Renderer */ "./src/lib/models/Renderer.ts");
const Tester_1 = __webpack_require__(/*! ./models/Tester */ "./src/lib/models/Tester.ts");
class PlumblineRenderer {
    constructor(testComponent, testModule) {
        this.neverMock = [common_1.CommonModule, platform_browser_1.BrowserModule];
        this.tester = new Tester_1.Tester(testComponent, testModule);
        this.tester.dontMock.push(...this.neverMock);
    }
    render(html, renderOptions) {
        let renderer = new Renderer_1.default(this.tester);
        return renderer.render(html, renderOptions);
    }
}
exports.default = PlumblineRenderer;


/***/ }),

/***/ "./src/lib/PlumblineWrapper.ts":
/*!*************************************!*\
  !*** ./src/lib/PlumblineWrapper.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlumblineWrapper = void 0;
const PlumblineAdapter_1 = __webpack_require__(/*! ./PlumblineAdapter */ "./src/lib/PlumblineAdapter.ts");
const platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
class PlumblineWrapper {
    constructor() {
        this.renderer = null;
        this.renderPromise = null;
        this.rendering = null;
        this.currentElement = null;
        // Generate a renderer for mount operation
        this.renderer = (new PlumblineAdapter_1.default()).createRenderer({ mode: 'mount' });
    }
    /**
     * Create PlumblineWrapper
     * @param nodes
     * @param testComponent
     * @param testModule
     * @param options
     * @returns {PlumblineWrapper<T>}
     */
    create(nodes, testComponent, testModule, options) {
        this.renderPromise = this.renderer.render(nodes, options ? options : {}, testComponent, testModule ? testModule : {});
        return this;
    }
    existing(unrendering, rendering, current) {
        this.renderPromise = unrendering;
        this.rendering = rendering;
        this.currentElement = current;
        return this;
    }
    /**
     * Render the Component
     * @returns {Promise<PlumblineWrapper<T>>}
     */
    async render() {
        return new Promise((resolve, reject) => {
            this.renderPromise.then((rendering) => {
                this.rendering = rendering;
                this.currentElement = this.rendering.element;
                this.renderPromise = null;
                resolve(this);
            });
        });
    }
    checkRender() {
        if (this.rendering == null) {
            throw new Error('Use render() and await on PlumblineWrapper ' +
                'to complete the rendering process.');
        }
    }
    /**
     * Get ElementRef of PlumblineWrapper
     * @return ElementRef of current PlumblineWrapper
     */
    element() {
        this.checkRender();
        return this.currentElement.nativeNode;
    }
    /**
     * Find child element within PlumblineWrapper
     * @return child elements matched
     */
    find(cssOrDirective) {
        this.checkRender();
        let query = null;
        if (typeof cssOrDirective === 'string') {
            query = platform_browser_1.By.css(cssOrDirective);
        }
        else {
            query = platform_browser_1.By.directive(cssOrDirective);
        }
        let matches = this.currentElement.queryAll(query);
        if (matches.length && matches[0] === this.currentElement) {
            throw new Error(`Don't use 'find' to search for your test component, ` +
                `it is automatically returned by the mount renderer`);
        }
        let wrapperArray = [];
        matches.forEach((elem) => {
            wrapperArray.push((new PlumblineWrapper()).existing(this.renderPromise, this.rendering, elem));
        });
        return wrapperArray;
    }
    /**
     * Find parent element of PlumblineWrapper
     * @return parent of PlumblineWrapper
     */
    parent() {
        return (new PlumblineWrapper()).existing(this.renderPromise, this.rendering, this.currentElement.parent);
    }
    /**
     * Get the instance of this Component in TestBed
     * @returns instance of Component in TestBed
     */
    instance(component) {
        this.checkRender();
        if (!component) {
            // Give the root instance for no arguments
            return this.rendering.instance;
        }
        else {
            try {
                // Give the current element instance for specific component
                return this.currentElement.injector.get(component);
            }
            catch (e) {
                throw new Error('Plumbline could not inject ' +
                    component.name + ' directive onto DOM element ' +
                    this.currentElement.name);
            }
        }
    }
    /**
     * Get the bindings that were used in this Component instance
     * @returns bindings used to create this Component
     */
    bindings() {
        this.checkRender();
        return this.rendering.bindings;
    }
    /**
     * Get the fixture generated by TestBed
     * @returns fixture for Component generated by TestBed
     */
    fixture() {
        this.checkRender();
        return this.rendering.fixture;
    }
    /**
     * Wait for the instance and DOM to update
     */
    async update() {
        return new Promise((resolve, reject) => {
            this.checkRender();
            if (this.rendering.instance.ngOnChanges) {
                this.rendering.instance.ngOnChanges();
            }
            this.rendering.fixture.detectChanges();
            return this.rendering.fixture.whenStable().then(() => {
                resolve(this);
            });
        });
    }
    tester() {
        return this.rendering.tester;
    }
    /**
     * Get the module used in this Component instance test
     * @returns complete module put together by PlumblineWrapper
     */
    module() {
        return this.rendering.tester.completeModule;
    }
}
exports.PlumblineWrapper = PlumblineWrapper;


/***/ }),

/***/ "./src/lib/models/Renderer.ts":
/*!************************************!*\
  !*** ./src/lib/models/Renderer.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = __webpack_require__(/*! @angular/core/testing */ "./node_modules/@angular/core/fesm2015/testing.js");
const Rendering_1 = __webpack_require__(/*! ./Rendering */ "./src/lib/models/Rendering.ts");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/lib/utils/utils.ts");
const initComponent_1 = __webpack_require__(/*! ../utils/initComponent */ "./src/lib/utils/initComponent.ts");
class Renderer {
    constructor(tester) {
        this.completeModule = null;
        this.renderModule = null;
        this.tester = tester;
        this.completeModule = this.tester.getCompleteModule();
    }
    // Render the entire TestBed of the component + markup
    render(html, optionsIn) {
        // Options for binding and future customization
        let options = Object.assign({ detectChanges: true, bind: {} }, optionsIn);
        // Initialize the markup for the component
        let curComponent = html ? initComponent_1.initComponent(html, options.bind) :
            this.tester.testComponent;
        // Generate the complete module from all the pieces
        let copiedSetup = this.completeModule;
        let configTestingSettings = {
            imports: copiedSetup.imports,
            providers: copiedSetup.providers.map((p) => {
                return this.spyProvider(p);
            }),
            declarations: copiedSetup.declarations.concat([curComponent]),
            schemas: copiedSetup.schemas,
        };
        this.renderModule = configTestingSettings;
        // Start Testing Module using autogenerated custom config settings
        return new Promise((resolve, reject) => {
            /*
            // Detect javascript errors and track them in Jasmine
            if (!("plumbline" in console)) {
                (<any> console).plumbline = {};

                let __error = console.error;
                console.error = function(...args) {

                    // Assert no javascript errors in plumbline
                    if ((<any> console).plumbline.active) {
                        let fullMessage = '';
                        args.forEach((message) => { fullMessage += message + ' '; });
                        expect('javascript errors').toBe('none', fullMessage);
                    }

                    // Still report errors in the debug console
                    __error.apply(console, args);
                };
            }
            */
            try {
                // Initialize TestBed for this Component
                testing_1.TestBed.configureTestingModule(configTestingSettings)
                    .compileComponents().then(() => {
                    let fixture = testing_1.TestBed.createComponent(curComponent);
                    if (options.detectChanges) {
                        fixture.detectChanges();
                    }
                    // Return a Rendering object
                    resolve(new Rendering_1.default(this.tester, fixture, options.bind));
                });
            }
            catch (err) {
                console.log(configTestingSettings);
                console.error(err);
            }
        });
    }
    // Spy on all providers
    spyProvider(providerIn) {
        // for arrays, breakdown the individual providers
        if (Array.isArray(providerIn)) {
            return providerIn.map((p) => {
                return this.spyProvider(p);
            });
        }
        else {
            // Check for providers that come in {provide, useValue} form
            if (utils_1.isValueProvider(providerIn)) {
                let provide = providerIn.provide;
                let useValue = providerIn.useValue;
                if (provide && !this.tester.dontMock.includes(provide)) {
                    // go through all the objects functions and spyOn the,
                    Object.keys(useValue).forEach(function (key) {
                        if (typeof useValue[key] === 'function') {
                            spyOn(useValue, key).and.callThrough();
                        }
                    });
                    return { provide, useValue };
                }
            }
            else {
                return providerIn;
            }
        }
    }
}
exports.default = Renderer;


/***/ }),

/***/ "./src/lib/models/Rendering.ts":
/*!*************************************!*\
  !*** ./src/lib/models/Rendering.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
class Rendering {
    constructor(tester, fixture, bindings) {
        this.tester = tester;
        this.fixture = fixture;
        // Find the element in the markup
        if (this.fixture.componentInstance instanceof this.tester.testComponent) {
            this.element = this.fixture.debugElement;
        }
        else {
            this.element = this.fixture.debugElement.query(platform_browser_1.By.directive(this.tester.testComponent));
        }
        // Throw an error if the element was not found
        if (!this.element) {
            throw new Error(this.tester.testComponent.name + ' not found in html/template/markup');
        }
        this.instance = this.element.injector.get(this.tester.testComponent);
        this.bindings = bindings;
    }
}
exports.default = Rendering;


/***/ }),

/***/ "./src/lib/models/Tester.ts":
/*!**********************************!*\
  !*** ./src/lib/models/Tester.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockProvider = exports.createPropImport = exports.createMockImport = exports.createMockDeclaration = exports.Tester = exports.copyModule = exports.resolveModule = void 0;
const ng_mocks_1 = __webpack_require__(/*! ng-mocks */ "./node_modules/ng-mocks/dist/index.js");
const core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
const utils_1 = __webpack_require__(/*! ./../utils/utils */ "./src/lib/utils/utils.ts");
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
                    let baselineMod = [this.cacheImp(thing.ngModule, dontmock)];
                    // if (dontmock)
                    //    baselineMod.push(this.cacheImp(copied, dontmock));
                    return baselineMod;
                }
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


/***/ }),

/***/ "./src/lib/mount.ts":
/*!**************************!*\
  !*** ./src/lib/mount.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mount = void 0;
const PlumblineWrapper_1 = __webpack_require__(/*! ./PlumblineWrapper */ "./src/lib/PlumblineWrapper.ts");
function mount(node, testComponent, testModule, options) {
    return (new PlumblineWrapper_1.PlumblineWrapper()).create(node, testComponent, testModule, options).render();
}
exports.mount = mount;


/***/ }),

/***/ "./src/lib/utils/compilerReflector.ts":
/*!********************************************!*\
  !*** ./src/lib/utils/compilerReflector.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
const compiler_1 = __webpack_require__(/*! @angular/compiler */ "./node_modules/@angular/compiler/fesm2015/compiler.js");
const core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
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


/***/ }),

/***/ "./src/lib/utils/initComponent.ts":
/*!****************************************!*\
  !*** ./src/lib/utils/initComponent.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initComponent = void 0;
const core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
function spyBindings(bindings) {
    Object.keys(bindings).forEach(function (key) {
        if (typeof bindings[key] === 'function') {
            spyOn(bindings, key).and.callThrough();
        }
    });
    return bindings;
}
function initComponent(template, bindings) {
    let RenderComponent = class RenderComponent {
    };
    RenderComponent = __decorate([
        core_1.Component({ template: template })
    ], RenderComponent);
    Object.assign(RenderComponent.prototype, spyBindings(bindings));
    // Enable two-way binding that overwrites & updates input
    Object.keys(bindings).forEach((key) => {
        Object.defineProperty(RenderComponent.prototype, key, {
            get: () => bindings[key],
            set: (v) => { bindings[key] = v; }
        });
    });
    return RenderComponent;
}
exports.initComponent = initComponent;


/***/ }),

/***/ "./src/lib/utils/utils.ts":
/*!********************************!*\
  !*** ./src/lib/utils/utils.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveNgModule = exports.isNgModule = exports.isModuleWithProviders = exports.isClassProvider = exports.isValueProvider = exports.directiveResolver = exports.pipeResolver = exports.jitReflector = void 0;
const compilerReflector_1 = __webpack_require__(/*! ./compilerReflector */ "./src/lib/utils/compilerReflector.ts");
const compiler_1 = __webpack_require__(/*! @angular/compiler */ "./node_modules/@angular/compiler/fesm2015/compiler.js");
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


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/arthurchang/Desktop/Projects/plumbline/plumbline/src/index.ts */"./src/index.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map