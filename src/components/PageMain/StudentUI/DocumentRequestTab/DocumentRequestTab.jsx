import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useUser } from "../../../../context/UserContext";

import style from "./DocumentRequestTab.module.css";

import ConfirmationDialog from "./ConfirmationDialog/ConfirmationDialog";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "lucide-react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DocumentRequestTab() {
  const { addRequest, deleteRequest } = useUser();
  const { currentUser } = useOutletContext();
  const [deleteionID, setDeletionID] = useState();
  const [document, setDocument] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const { setLoading } = useUser();
  const dialogRef = useRef();

  async function submitRequest(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    await addRequest({
      status: "PENDING",
      id: crypto.randomUUID(),
      document,
      purpose,
      date: format(date, "yyyy-MM-dd"),
      type: "request",
    });

    resetStates();
  }

  async function handleDeleteRequest() {
    await deleteRequest(currentUser, deleteionID);
    setLoading((prev) => ++prev);
    setDeletionID("");
  }

  function resetStates() {
    setDocument("");
    setPurpose("");
    setDate("");
  }

  return (
    <>
      <section
        className={`${style["document-request-tab__section"]} ${style["document-request-tab__create-request"]}`}
      >
        <h2>Create Request</h2>
        <form
          onSubmit={submitRequest}
          className={style["document-request-tab__request-form"]}
        >
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Select Document:
                  </FieldLabel>
                  <select
                    className="border-2 "
                    required
                    onChange={(e) => {
                      setDocument(e.target.value);
                    }}
                    value={document}
                    name="document"
                    id="document"
                  >
                    <option value="" disabled></option>
                    <option value="Diploma">Diploma</option>
                    <option value="Registration Form (CTC)">
                      Registration Form (CTC)
                    </option>
                    <option value="Transcript of Records">
                      Transcript of Records
                    </option>
                  </select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Document's Purpose:
                  </FieldLabel>
                  <Input
                    required
                    onChange={(e) => {
                      setPurpose(e.target.value);
                    }}
                    value={purpose}
                    type="text"
                    name="purpose"
                    id="purpose"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                    Date:
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!date}
                        className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator></FieldSeparator>

            <Field>
              <Button type="submit">Submit Request</Button>
            </Field>
          </FieldGroup>
        </form>
      </section>

      <section
        className={`${style["document-request-tab__section"]} ${style["document-request-tab__pending-request"]}`}
      >
        <h2>Request List</h2>

        <div className={style["document-request-tab__pending-list"]}>
          {currentUser &&
            currentUser.requestedDocuments.map((request) => {
              return (
                <Card className="border-2 h-fit shrink-0">
                  <CardHeader>
                    <CardTitle>{`${request.document}`}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Document:</span>
                      <span>{request.document}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purpose:</span>
                      <span>{request.purpose}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{request.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{request.status}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setDeletionID(request.id);
                        dialogRef.current.showModal();
                      }}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>

        <ConfirmationDialog ref={dialogRef} onConfirm={handleDeleteRequest} />
      </section>
    </>
  );
}

export default DocumentRequestTab;
