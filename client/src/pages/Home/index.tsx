import { useEffect, useState } from "react";
import { Button, EditItemDialog, ItemCard } from "../../components";
import styles from "./styles.module.scss";
import { Item } from "../../components/ItemCard/types";
import { protectedApi } from "../../utils/api";
import { FaPlus } from "react-icons/fa";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./transition.scss";
import { ClipLoader } from "react-spinners";

export const Home = () => {
  const [items, setItems] = useState<Array<Item> | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const refreshItems = async () => {
    try {
      const { data } = await protectedApi.get("/items");
      setItems(data);
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    refreshItems();
  }, []);

  return (
    <>
      <EditItemDialog
        isOpened={isModalOpened}
        close={() => setIsModalOpened(false)}
        mode="create"
        refresh={refreshItems}
      />
      {items !== null ? (
        <>
          {items.length ? (
            <TransitionGroup className={styles.wrapper}>
              {items.map((el) => {
                return (
                  <CSSTransition key={el.id} timeout={500} classNames="item">
                    <ItemCard {...el} refresh={refreshItems} />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          ) : (
            <div className={styles.contentAccessFeedback}>No items found</div>
          )}
        </>
      ) : (
        <div className={styles.contentAccessFeedback}>
          <ClipLoader
            color={"#0891b2"}
            loading
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div className={styles.createButton}>
        <Button onClick={() => setIsModalOpened(true)}>
          <FaPlus />
          <span>Create new</span>
        </Button>
      </div>
    </>
  );
};
