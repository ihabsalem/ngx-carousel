export interface NgxCarouselsConfig {
    grid?: { xs: number, sm: number, md: number, lg: number, xl: number };
    slidePerScroll?: number;
    marginBetweenCards?: number;
    RTL?: boolean;
    cardWidth: number;
}

export const NgxMediaQuery = {
    XS: 576,
    SM: 768,
    MD: 992,
    LG: 1400,
    XL: 0
};
