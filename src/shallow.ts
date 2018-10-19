import {ShallowWrapper} from './ShallowWrapper';

export function shallow<T>(
    node: any,
    testComponent: any,
    testModule?: any,
    options?: any): Promise<ShallowWrapper<T>>
{
    return (new ShallowWrapper<T>()).create(node, testComponent, testModule, options).render();
}
