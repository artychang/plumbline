"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlumblineRenderer_1 = require("./PlumblineRenderer");
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
     *. Create a fully mounted renderer
     */
    createMountRenderer(options) {
        return null;
    }
    /**
    *. Create a shallow renderer
    */
    createShallowRenderer(optionsRender) {
        return {
            render(element, options, testComponent, testModule) {
                let renderer = new PlumblineRenderer_1.default(testComponent, testModule);
                return renderer.render(element, options);
            }
        };
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
