import {PlumblineWrapper} from './PlumblineWrapper';

export function mount<T>(
    node: any,
    testComponent: any,
    testModule?: any,
    options?: any): Promise<PlumblineWrapper<T>>
{
    console.log('mount PlumblineWrapper');
    return (new PlumblineWrapper<T>()).create(node, testComponent, testModule, options).render();
}
