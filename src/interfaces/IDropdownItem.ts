export interface IDropdownItem {
  id: string,
  name: string,
  children?: IDropdownItem[],
  value?: string | number
}
