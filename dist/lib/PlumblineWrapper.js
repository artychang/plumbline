"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlumblineWrapper = void 0;
const PlumblineAdapter_1 = require("./PlumblineAdapter");
const platform_browser_1 = require("@angular/platform-browser");
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
