import { FC, useState } from "react";
import { Item } from "./types";
import styles from "./styles.module.scss";
import { ErrorBanner } from "../ErrorBanner";
import { Button } from "../Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { protectedApi } from "../../utils/api";
import { EditItemDialog } from "../EditItemDialog";

export const ItemCard: FC<Item & { refresh: () => Promise<void> }> = ({
  id,
  name,
  price,
  refresh,
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const deleteHandler = async () => {
    setIsDeleteLoading(true);
    try {
      await protectedApi.delete(`/items/${id}`);
      await refresh();
    } catch {
      setIsError(true);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);

  return (
    <>
      <EditItemDialog
        refresh={refresh}
        close={() => setIsDialogOpened(false)}
        isOpened={isDialogOpened}
        mode={"edit"}
        item={{ id, name, price }}
      />
      <div className={styles.wrapper}>
        <ErrorBanner
          text={"Something went wrong. Try again later."}
          isOpened={isError}
          close={() => setIsError(false)}
        />
        <div className={styles.mainContent}>
          <div className={styles.textsWrapper}>
            <span>{name}</span>
            <span className={styles.price}>(${price})</span>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button onClick={() => setIsDialogOpened(true)}>
              <MdEdit size={20} color="white" />
              <span>Edit</span>
            </Button>
            <Button
              variant="danger"
              isLoading={isDeleteLoading}
              onClick={deleteHandler}
            >
              <MdDelete size={20} color="white" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
