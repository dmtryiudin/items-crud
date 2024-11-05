import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import styles from "./styles.module.scss";
import { EditItemDialogProps } from "./types";
import { useForm } from "react-hook-form";
import { Item } from "../ItemCard/types";
import { protectedApi } from "../../utils/api";
import { ErrorBanner } from "../ErrorBanner";

export const EditItemDialog: FC<EditItemDialogProps> = ({
  mode,
  item,
  isOpened,
  close,
  refresh,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Item, "id">>({
    defaultValues: useMemo(() => {
      if (mode === "edit") {
        return {
          name: item?.name,
          price: item?.price,
        };
      }
    }, [item, mode]),
  });

  useEffect(() => {
    if (mode === "edit") {
      reset({
        name: item?.name,
        price: item?.price,
      });
    }
  }, [item, mode]);

  const ref = useRef(null);

  const closeHandler = () => {
    close();
    reset();
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        closeHandler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const editSubmitHandler = async (data: Omit<Item, "id">) => {
    setIsLoading(true);
    try {
      await protectedApi.put(`/items/${item?.id}`, {
        ...data,
        price: +data.price,
      });
      refresh();
      close();
      reset();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const createSubmitHandler = async (data: Omit<Item, "id">) => {
    setIsLoading(true);
    try {
      await protectedApi.post(`/items`, {
        ...data,
        price: +data.price,
      });
      refresh();
      close();
      reset();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={[
        styles.wrapper,
        isOpened ? styles.opened : styles.closed,
      ].join(" ")}
    >
      <form
        className={styles.contentWrapper}
        ref={ref}
        onSubmit={handleSubmit(
          mode === "edit" ? editSubmitHandler : createSubmitHandler
        )}
      >
        <ErrorBanner
          isOpened={!!isError}
          close={() => setIsError(false)}
          text={"Something went wrong"}
        />
        <Input
          error={errors.name?.message}
          label="Name"
          placeholder="Name"
          {...register("name", {
            maxLength: {
              value: 70,
              message: "Max length is 70",
            },
          })}
        />
        <Input
          error={errors.price?.message}
          label="Price"
          placeholder="Price"
          type="number"
          {...register("price", {
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: "Should be a positive number",
            },
          })}
        />
        <div className={styles.buttonsWrapper}>
          <Button isLoading={isLoading} type="submit">
            {mode === "edit" ? "Edit" : "Create"}
          </Button>
          <Button variant="secondary" type="reset" onClick={closeHandler}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
