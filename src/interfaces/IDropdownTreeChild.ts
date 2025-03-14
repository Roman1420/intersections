import { type IDropdownItem } from './IDropdownItem';

export interface IDropdownTreeChild extends IDropdownItem {
  key: string,
  itsId: string | number,
  title: string,
  zoneIds: string[],
  statistic_db_id: string | number
}
