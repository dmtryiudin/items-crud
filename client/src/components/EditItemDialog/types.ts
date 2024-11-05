import { Item } from "../ItemCard/types";

export type EditItemDialogProps = {
  mode: "create" | "edit";
  item?: Item;
  isOpened: boolean;
  close: () => void;
  refresh: () => void;
};
