// export const OnSale = 'OnSale' as const
// export const SoldOut = 'SoldOut' as const
// export type ItemStatus = typeof OnSale | typeof SoldOut

export enum ItemStatus {
  OnSale = 'OnSale',
  SoldOut = 'SoldOut',
}
