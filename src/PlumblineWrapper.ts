import PlumblineAdapter from './PlumblineAdapter';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import Rendering from './models/Rendering';

export class PlumblineWrapper<T>
{
    private renderer: any = null;
    private renderPromise: Promise<Rendering> = null;
    private rendering: Rendering = null;
    private currentElement: DebugElement = null;


    constructor() {
        // Generate a renderer for mount operation
        this.renderer = (new PlumblineAdapter()).createRenderer({mode: 'mount'});
    }

    /**
     * Create PlumblineWrapper
     * @param nodes
     * @param testComponent
     * @param testModule
     * @param options
     * @returns {PlumblineWrapper<T>}
     */
    create(nodes: any, testComponent: T, testModule: any, options: any): PlumblineWrapper<T> {
        this.renderPromise = this.renderer.render(
            nodes,
            options ? options : {},
            testComponent,
            testModule ? testModule : {});
        return this;
    }

    private existing(unrendering: Promise<Rendering>,
                     rendering: Rendering,
                     current: DebugElement): PlumblineWrapper<T> {
        this.renderPromise = unrendering;
        this.rendering = rendering;
        this.currentElement = current;
        return this;
    }

    /**
     * Render the Component
     * @returns {Promise<PlumblineWrapper<T>>}
     */
    async render(): Promise<PlumblineWrapper<T>> {
        return new Promise<PlumblineWrapper<T>>((resolve: any, reject: any) => {
            this.renderPromise.then((rendering) => {
                this.rendering = rendering;
                this.currentElement = this.rendering.element;
                this.renderPromise = null;
                resolve(this);
            });
        });
    }

    private checkRender(): void {
        if (this.rendering == null) {
            throw new Error('Use render() and await on PlumblineWrapper ' +
                'to complete the rendering process.');
        }
    }


    /**
     * Get ElementRef of PlumblineWrapper
     * @return ElementRef of current PlumblineWrapper
     */
    element(): any {
        this.checkRender();
        return this.currentElement.nativeNode;
    }

    /**
     * Find child element within PlumblineWrapper
     * @return child elements matched
     */
    find(cssOrDirective: any): Array<PlumblineWrapper<T>> {
        this.checkRender();
        let query = null;
        if (typeof cssOrDirective === 'string') {
            query = By.css(cssOrDirective);
        } else {
            query = By.directive(cssOrDirective);
        }

        let matches = this.currentElement.queryAll(query);
        if (matches.length && matches[0] === this.currentElement) {
            throw new Error(`Don't use 'find' to search for your test component, ` +
                `it is automatically returned by the mount renderer`);
        }

        let wrapperArray: Array<PlumblineWrapper<T>> = [];
        matches.forEach((elem) => {
            wrapperArray.push((new PlumblineWrapper<T>()).existing(this.renderPromise,
                this.rendering, elem));
        });
        return wrapperArray;
    }

    /**
     * Find parent element of PlumblineWrapper
     * @return parent of PlumblineWrapper
     */
    parent(): PlumblineWrapper<T> {
        return (new PlumblineWrapper<T>()).existing(this.renderPromise,
            this.rendering, this.currentElement.parent);
    }

    /**
     * Get the instance of this Component in TestBed
     * @returns instance of Component in TestBed
     */
    instance(): T {
        this.checkRender();
        return this.rendering.instance;
    }

    /**
     * Get the bindings that were used in this Component instance
     * @returns bindings used to create this Component
     */
    bindings(): any {
        this.checkRender();
        return this.rendering.bindings;
    }

    /**
     * Get the fixture generated by TestBed
     * @returns fixture for Component generated by TestBed
     */
    fixture(): any {
        this.checkRender();
        return this.rendering.fixture;
    }

    /**
     * Wait for the instance and DOM to update
     */
    async update(): Promise<PlumblineWrapper<T>> {
        return new Promise<PlumblineWrapper<T>>((resolve: any, reject: any) => {
            this.checkRender();
            this.rendering.instance.ngOnChanges();
            this.rendering.fixture.detectChanges();
            return this.rendering.fixture.whenStable().then(() => {
                resolve(this);
            });
        });
    }

    tester(): any {
        return this.rendering.tester;
    }

    /**
     * Get the module used in this Component instance test
     * @returns complete module put together by PlumblineWrapper
     */
    module(): any {
        return this.rendering.tester.completeModule;
    }
}
