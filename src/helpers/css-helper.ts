//export type CSSMediaQueryValues = 1260 | 1188 | 1064 | 860 | 750 | 500;
export enum CSSMediaQueryValues {
    _1260 = 1260,
    _1188 = 1188,
    _1064 = 1064,
    _860 = 860,
    _750 = 750,
    _500 = 500
}

export type CSSMediaQueryProps = {
    [key in CSSMediaQueryValues]: `@media (max-width: ${key}px)`
};

/**
 * Object with mediaquery fields
 */
export const mqMax = Object.values(CSSMediaQueryValues)
    .filter((key) => !isNaN(Number(key)))
    .reduce((prev, curr) => {
        prev[curr] = `@media (max-width: ${curr}px)`;
        return prev;
    }, {}) as CSSMediaQueryProps;

