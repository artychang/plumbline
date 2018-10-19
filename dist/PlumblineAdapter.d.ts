import Rendering from './models/Rendering';
/**
 * Adapter future support for different Angular versions
 */
export default class PlumblineAdapter {
    options: any;
    MODES: any;
    constructor();
    /**
     *. Create a fully mounted renderer
     */
    createMountRenderer(options: any): any;
    /**
    *. Create a shallow renderer
    */
    createShallowRenderer(optionsRender: any): {
        render(element: any, options: any, testComponent: any, testModule: any): Promise<Rendering>;
    };
    createRenderer(options: any): any;
}
