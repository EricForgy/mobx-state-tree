import {IType, Type} from "../core"
import {invariant, isPrimitive, fail} from "../utils"

export class CoreType<T> extends Type<T, T> {
    readonly checker: (value: any) => boolean

    constructor(name: any, checker: any) {
        super(name)
        this.checker = checker
    }

    describe() {
        return this.name
    }

    create(value: any) {
        invariant(isPrimitive(value), `Not a primitive: '${value}'`)
        invariant(this.checker(value), `Value is not assignable to '` + this.name + `'`)
        return value
    }

    is(thing: any): thing is T {
        return isPrimitive(thing) && this.checker(thing)
    }
}

// tslint:disable-next-line:variable-name
export const string: IType<string, string> = new CoreType<string>("string", (v: any) => typeof v === "string")
// tslint:disable-next-line:variable-name
export const number: IType<number, number> = new CoreType<number>("number", (v: any) => typeof v === "number")
// tslint:disable-next-line:variable-name
export const boolean: IType<boolean, boolean> = new CoreType<boolean>("boolean", (v: any) => typeof v === "boolean")
// tslint:disable-next-line:variable-name
export const DatePrimitive: IType<Date, Date> = new CoreType<Date>("Date", (v: any) => v instanceof Date)

export function getPrimitiveFactoryFromValue(value: any): IType<any, any> {
    switch (typeof value) {
        case "string":
            return string
        case "number":
            return number
        case "boolean":
            return boolean
        case "object":
            if (value instanceof Date)
                return DatePrimitive
    }
    return fail("Cannot determine primtive type from value " + value)
}