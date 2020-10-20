import Rendering from './Rendering';
import { Tester } from './Tester';
export default class Renderer {
    tester: Tester<any>;
    completeModule: any;
    renderModule: any;
    constructor(tester: Tester<any>);
    render(html: any, optionsIn: any): Promise<Rendering>;
    spyProvider(providerIn: any): any;
}
