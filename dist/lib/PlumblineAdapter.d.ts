/**
 * Adapter future support for different Angular versions
 */
export default class PlumblineAdapter {
    options: any;
    MODES: any;
    constructor();
    /**
     *. Create a mounted renderer
     */
    createMountRenderer(optionsRender: any): any;
    /**
    *. Create a shallow renderer
    */
    createShallowRenderer(optionsRender: any): any;
    createRenderer(options: any): any;
}
