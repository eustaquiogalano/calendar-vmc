import { forwardRef } from "react";
import style from "./DeleteEventDialog.module.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoWarningOutline } from "react-icons/io5";

interface DeleteRequestDialogProps {
  onDeletion: () => void;
}

const DeleteRequestDialog = forwardRef<
  HTMLDialogElement,
  DeleteRequestDialogProps
>(function DeleteRequestDialog({ onDeletion }, ref) {
  return (
    <dialog className={style["confirmation-dialog"]} ref={ref}>
      <Card className="border-2 border-destructive">
        <CardHeader className="flex flex-col items-center px-5">
          <IoWarningOutline size={30} className="text-destructive" />
          <CardTitle className="text-center">Confirm Deletion</CardTitle>
        </CardHeader>

        <CardContent className="px-5">
          <p>Do you want to delete the request?</p>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 px-5">
          <Button
            variant="destructive"
            className=" w-[50%] h-fit p-2"
            onClick={() => {
              onDeletion();
              (ref as React.RefObject<HTMLDialogElement>).current?.close();
            }}
          >
            Delete
          </Button>
          <Button
            variant="outline"
            className="w-[50%] h-fit p-2"
            onClick={() =>
              (ref as React.RefObject<HTMLDialogElement>).current?.close()
            }
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </dialog>
  );
});

export default DeleteRequestDialog;
