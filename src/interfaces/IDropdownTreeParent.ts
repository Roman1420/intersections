import { type IDropdownItem } from './IDropdownItem';
import { type IDropdownTreeChild } from './IDropdownTreeChild';

export interface IDropdownTreeParent extends IDropdownItem {
  key: string,
  children: IDropdownTreeChild[],
  itsId: string | number,
  statistic_db_id: string | number
}
