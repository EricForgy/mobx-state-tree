import {IJsonPatch} from "./json-patch"
import {IDisposer} from "./utils"
import {getNode} from "./node"

export * from "./json-patch"
export {
    ModelFactory,
    createFactory,
    action,
    map,
    isModelFactory
} from "./factories"

export type IActionCall = {
    name: string;
    path: string;
    args: any[];
}

export type IActionCallOptions = {
    supressPatches?: boolean
    dryRun?: boolean
}

export function onAction(target: Object, callback: (action: IActionCall) => void): IDisposer {
    // TODO
    return () => {}
}

export function onPatch(target: Object, callback: (patch: IJsonPatch) => void): IDisposer {
    return getNode(target).onPatch(callback)
}

export function onSnapshot(target: Object, callback: (snapshot: any) => void): IDisposer {
    return getNode(target).onSnapshot(callback)
}

export function subscribe(target: Object, callback: (snapshot: any) => void): IDisposer {
    return onSnapshot(target, callback)
}

export function applyPatch(target: Object, patch: IJsonPatch) {
    return getNode(target).applyPatch(patch)
}

export function applyAction(target: Object, action: IActionCall, options?: IActionCallOptions): IJsonPatch[] {
    // TODO
    return []
}

export function intercept(target: Object, interceptor: (change) => Object | null): IDisposer {
    // TODO
    return () => {}
}

export function getSnapshot(target: Object): any {
    return getNode(target).snapshot
}

export function getParent(target: Object): any {
    return getNode(target).parent
}

export function getPath(target: Object): string {
    return getNode(target).path
}

export function getPathParts(target: Object): string[] {
    return getNode(target).pathParts
}

export function isRoot(target: Object): boolean {
    return getNode(target).isRoot
}

export function resolve(target: Object, path: string): any {
    // TODO
    return null
}

export function getEnvironment(target: Object): Object {
    return getNode(target).environment
}