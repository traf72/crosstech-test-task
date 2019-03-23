// @flow

export type StrOrNum = string | number;
export type Primitive = StrOrNum | boolean;

export type Enum = {
    [Primitive]: Primitive
}

export type CatalogItem = {
    id: Primitive,
    name: string,
}

export type Catalog = CatalogItem[];
