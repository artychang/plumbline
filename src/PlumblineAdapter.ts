import PlumblineRenderer from './PlumblineRenderer';
import Rendering from './models/Rendering';

/**
 * Adapter future support for different Angular versions
 */
export default class PlumblineAdapter
{

    options: any;
    MODES: any = {
        MOUNT: 'mount',
        SHALLOW: 'shallow'
    };

    constructor() {
        this.options = {};
    }

    /**
     *. Create a mounted renderer
     */
    createMountRenderer(optionsRender: any): any  {
        return {
            render(element: any,
                   options: any,
                   testComponent: any,
                   testModule: any): Promise<Rendering> {
                let renderer = new PlumblineRenderer(testComponent, testModule);
                return renderer.render(element, options);
            }
        };
    }

    /**
	*. Create a shallow renderer
	*/
    createShallowRenderer(optionsRender: any) {
        return null;
    }

    createRenderer(options: any) {
        switch (options.mode) {
            case this.MODES.MOUNT: return this.createMountRenderer(options);
            case this.MODES.SHALLOW: return this.createShallowRenderer(options);
            default:
                throw new Error(`Plumbline Adapter Error: incorrect mode : ${options.mode}`);
        }
    }

}
