import { useState } from "react";
import { useUser } from "../../../../context/UserContext";

import style from "./DocumentRequestTab.module.css";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, Loader } from "lucide-react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { validateRequest } from "@/utils/validateRequest/validateRequest.ts";
import RequestBlockedCard from "@/components/RequestBlockedCard/RequestBlockedCard";
import { useDocumentRequest } from "@/context/DocumentRequestContext";
import StudentRequestCard from "@/components/StudentRequestCard/StudentRequestCard";
import { supabase } from "@/supabase-client.ts";

function DocumentRequestTab() {
  const { requests, addRequest, deleteRequest, loading } = useDocumentRequest();
  const { currentUser } = useUser();

  const [deleteionID, setDeletionID] = useState("");
  const [document, setDocument] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);

  console.log(loading);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!currentUser) return;

    const form = e.target as HTMLFormElement;

    // checks validity of the form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // creates a request object with the form data
    // and a random id
    const request = {
      studentId: currentUser.id,
      document,
      purpose,
      date: format(date!, "yyyy-MM-dd"),
      status: "PENDING" as const,
      announcementType: "request" as const,
    };

    // validate the request if it can be added or not
    // this returns a boolean
    const isRequestValid = validateRequest(request, requests);

    // if the request is valid, add it to the list of requests
    isRequestValid ? await addRequest(request) : setIsActive(true);

    // TRIGGERS EMAIL NOTIFICATOIN
    // TO BE DELETED AFTER SURVEY
    await supabase.functions.invoke("send-status-email", {
      body: {
        studentEmail: currentUser.email,
        studentName: `Student`,
        document: document,
        status: "For survey purpose only.",
        remarks: ["For Survey purpose only"],
      },
    });

    // resetthe input and states
    resetStates();
  }

  async function handleDelete() {
    deleteRequest(deleteionID);
    setDeletionID("");
  }

  function resetStates() {
    setDocument("");
    setPurpose("");
    setDate("");
  }

  function getMinWorkingDate() {
    const date = new Date();
    let workingDaysAdded = 0;

    while (workingDaysAdded < 7) {
      date.setDate(date.getDate() + 1);
      const day = date.getDay();
      // skip Saturday (6) and Sunday (0)
      if (day !== 0 && day !== 6) {
        workingDaysAdded++;
      }
    }

    return date;
  }

  const minWorkingDate = getMinWorkingDate();

  return (
    <>
      <section
        className={`${style["document-request-tab__section"]} ${style["document-request-tab__create-request"]}`}
      >
        <RequestBlockedCard
          twclass={`${isActive ? "" : "hidden"}`}
          setIsActive={setIsActive}
        />
        <div className={`${isActive ? "hidden" : ""} flex flex-col gap-4`}>
          <h2 className="text-xl font-bold">Create Request</h2>
          <form
            onSubmit={handleSubmit}
            className={style["document-request-tab__request-form"]}
          >
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      Select Document:
                    </FieldLabel>
                    <Select
                      onValueChange={(value) => setDocument(value)}
                      value={document}
                      name="document"
                      required
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Diploma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Registration Form (CTC)">
                            Registration Form (CTC)
                          </SelectItem>
                          <SelectItem value="Transcript of Records">
                            Transcript of Records
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          defaultMonth={date}
                          disabled={(day) => {
                            const dayOfWeek = day.getDay();
                            const isWeekend =
                              dayOfWeek === 0 || dayOfWeek === 6;
                            const isBeforeMinDate = day < minWorkingDate;
                            return isWeekend || isBeforeMinDate;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator></FieldSeparator>

              <Field>
                <Button
                  disabled={loading}
                  className={` h-fit p-2`}
                  type="submit"
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </section>

      {/* Request List */}
      <section
        className={`${style["document-request-tab__section"]} ${style["document-request-tab__pending-request"]}`}
      >
        <h2 className="text-xl font-bold">Request List</h2>

        <div className={style["document-request-tab__pending-list"]}>
          {currentUser &&
            requests.map((request) => {
              return (
                <StudentRequestCard
                  request={request}
                  handleDelete={handleDelete}
                  setDeletionID={setDeletionID}
                />
              );
            })}
        </div>
      </section>
    </>
  );
}

export default DocumentRequestTab;
