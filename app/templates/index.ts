import { Plugin } from '@webvoxel/core';

export class MyPlugin extends Plugin {
    constructor() {
        super('<%= name %>');
    }

    public init(): void {}
}