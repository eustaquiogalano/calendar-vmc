import style from "./IncomingRequestTab.module.css";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";
// import RejectRequestDialog from "@/components/RejectRequestDialog/RejectRequestDialog";
import { useRef, useState } from "react";
// import { LoaderCircle } from "lucide-react";
import { useDocumentRequest } from "@/context/DocumentRequestContext";
// import { Separator } from "@/components/ui/separator";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
import IncomingRequestCard from "@/components/IncomingRequestCard/IncomingRequestCard";
import { DocumentRequest } from "@/types/documentRequest";

// const reasons = [
//   "Incomplete requirements",
//   "Incorrect information",
//   "Duplicate request",
//   "Outstanding balance",
//   "Invalid document request",
// ];

function IncomingRequestTab() {
  const { requests, updateRequestStatus, loading } = useDocumentRequest();
  // const rejectionDialogRef = useRef<HTMLDialogElement | null>(null);
  // const [student, setStudent] = useState();
  const [requestID, setRequestID] = useState("");
  const [activeRejectPanel, setActiveRejectPanel] = useState<string | null>(
    null,
  );
  const handleRequestRejection = async (
    remarks: DocumentRequest["remarks"],
  ) => {
    await updateRequestStatus(requestID, "REJECTED", remarks);
  };

  const handleRequestAcceptance = async (requestID: string) => {
    await updateRequestStatus(requestID, "ACCEPTED_PROCESSING", []);
  };

  return (
    <section
      className={`${style["incoming-request__section"]} gap-[.5rem] text:sm md:text-2xl font-bold`}
    >
      <h2>Incoming Requests</h2>

      <div className={`${style["incoming-request__request-list"]} md:p-[1rem]`}>
        {requests
          .filter((request) => {
            if (
              request.status !== "ACCEPTED_PROCESSING" &&
              request.status !== "READY_FOR_PICKUP" &&
              request.status !== "REJECTED" &&
              request.status !== "COMPLETED"
            ) {
              return request;
            }
          })
          .map((request) => {
            return (
              // <Card
              //   key={request.id}
              //   className="border-2 shrink-0 flex flex-col justify-between"
              // >
              //   <CardHeader className="">
              //     <CardTitle className="text-sm md:text-base">
              //       <div className="flex justify-between">
              //         <span className="text-muted-foreground">Last Name:</span>
              //         <span className=" text-right">
              //           {`${request.student?.lastName}`}
              //         </span>
              //       </div>

              //       <div className="flex justify-between">
              //         <span className="text-muted-foreground">First Name:</span>
              //         <span className=" text-right">
              //           {`${request.student?.firstName}`}
              //         </span>
              //       </div>

              //       <div className="flex justify-between">
              //         <span className="text-muted-foreground">
              //           Middle Name:
              //         </span>
              //         <span className=" text-right">
              //           {`${request.student?.middleName}`}
              //         </span>
              //       </div>

              //       <div className="flex justify-between">
              //         <span className="text-muted-foreground">Year Level:</span>
              //         <span className=" text-right">
              //           {`${request.student?.yearLevel}`}
              //         </span>
              //       </div>

              //       <div className="flex justify-between">
              //         <span className="text-muted-foreground">Course:</span>
              //         <span className=" text-right">
              //           {`${request.student?.course}`}
              //         </span>
              //       </div>

              //       <div className="flex justify-between">
              //         <span className="text-muted-foreground">ID#:</span>
              //         <span className=" text-right">
              //           {`${request.student?.idNumber}`}
              //         </span>
              //       </div>
              //     </CardTitle>
              //   </CardHeader>
              //   <CardContent className="p-3 text-sm md:text-base">
              //     <div className="flex justify-between">
              //       <span className="text-muted-foreground">Document:</span>
              //       <span className=" text-right">{request.document}</span>
              //     </div>
              //     <div className="flex justify-between">
              //       <span className="text-muted-foreground">Purpose:</span>
              //       <span>{request.purpose}</span>
              //     </div>
              //     <div className="flex justify-between">
              //       <span className="text-muted-foreground">Date:</span>
              //       <span>{request.date}</span>
              //     </div>
              //   </CardContent>
              //   <CardFooter className="flex flex-col gap-2">
              //     <div className="flex w-full gap-2 ">
              //       <Button
              //         disabled={loading}
              //         variant="default"
              //         className="flex-1 h-fit p-2"
              //         onClick={() => {
              //           handleRequestAcceptance(request.id);
              //         }}
              //       >
              //         {loading ? (
              //           <LoaderCircle className="animate-spin" />
              //         ) : (
              //           "Accept"
              //         )}
              //       </Button>
              //       <Button
              //         variant="destructive"
              //         className="flex-1 h-fit p-2"
              //         onClick={() => {
              //           setStudent(student);
              //           setRequestID(request.id);
              //           // rejectionDialogRef.current?.showModal();
              //           setActiveRejectPanel((prev) =>
              //             prev === request.id ? null : request.id,
              //           );
              //         }}
              //       >
              //         {loading ? (
              //           <LoaderCircle className="animate-spin" />
              //         ) : (
              //           "Reject"
              //         )}
              //       </Button>
              //     </div>
              //     {activeRejectPanel === request.id && (
              //       <>
              //         <Separator />

              //         <div className="space-y-5 rounded-lg border bg-muted/30 p-4">
              //           <div>
              //             <h4 className="font-medium">Reason for Rejection</h4>

              //             <p className="text-muted-foreground text-sm">
              //               Select one or more reasons.
              //             </p>
              //           </div>

              //           <div className="space-y-3">
              //             {reasons.map((reason) => (
              //               <div
              //                 key={reason}
              //                 className="flex items-center space-x-3"
              //               >
              //                 <Checkbox id={reason} />

              //                 <Label htmlFor={reason}>{reason}</Label>
              //               </div>
              //             ))}
              //           </div>

              //           <div className="space-y-2">
              //             <Label htmlFor="remarks">
              //               Additional Remarks (Optional)
              //             </Label>

              //             <Textarea
              //               id="remarks"
              //               placeholder="Enter additional remarks..."
              //             />
              //           </div>

              //           <div className="flex justify-around gap-2">
              //             <Button
              //               variant="outline"
              //               className="flex-1 h-fit p-2"
              //               onClick={() => setActiveRejectPanel(null)}
              //             >
              //               Cancel
              //             </Button>

              //             <Button
              //               variant="destructive"
              //               className="flex-1 h-fit p-2"
              //               onClick={() => {
              //                 rejectionDialogRef.current?.showModal();
              //               }}
              //             >
              //               Continue
              //             </Button>
              //           </div>
              //         </div>
              //       </>
              //     )}
              //   </CardFooter>
              // </Card>

              // <Card
              //   key={request.id}
              //   className="border-2 shrink-0 w-full p-0 h-fit flex justify-between "
              // >
              //   <div className="flex flex-col  md:flex-row">
              //     <CardContent className="p-4 flex-1">
              //       <div className="flex flex-col md:flex-row h-fit justify-between items-start gap-4">
              //         {/* Left — Student Info */}
              //         <div className="flex flex-col gap-1 text-sm flex-1">
              //           <p className="text-muted-foreground text-xs uppercase tracking-wide font-medium mb-1">
              //             Student Info
              //           </p>
              //           <span className="font-semibold text-base">
              //             {`${request.student?.lastName}, ${request.student?.firstName} ${request.student?.middleName} ${request.student?.suffix}`}
              //           </span>
              //           <div className="flex gap-2">
              //             <span className="text-muted-foreground">
              //               Year Level:
              //             </span>
              //             <span className="font-medium">
              //               {request.student?.yearLevel}
              //             </span>
              //           </div>
              //           <div className="flex gap-2">
              //             <span className="text-muted-foreground">Course:</span>
              //             <span className="font-medium">
              //               {request.student?.course}
              //             </span>
              //           </div>
              //           <div className="flex gap-2">
              //             <span className="text-muted-foreground">ID#:</span>
              //             <span className="font-medium">
              //               {request.student?.idNumber}
              //             </span>
              //           </div>
              //         </div>

              //         {/* Center — Request Details */}
              //         <div className="flex flex-col gap-1 text-sm flex-1">
              //           <p className="text-muted-foreground text-xs uppercase tracking-wide font-medium mb-1">
              //             Request Details
              //           </p>
              //           <div className="flex gap-2">
              //             <span className="text-muted-foreground">
              //               Document:
              //             </span>
              //             <span className="font-medium">
              //               {request.document}
              //             </span>
              //           </div>
              //           <div className="flex gap-2">
              //             <span className="text-muted-foreground">
              //               Purpose:
              //             </span>
              //             <span className="font-medium">{request.purpose}</span>
              //           </div>
              //           <div className="flex gap-2">
              //             <span className="text-muted-foreground">Date:</span>
              //             <span className="font-medium">{request.date}</span>
              //           </div>
              //         </div>

              //         {/* Right — Actions */}
              //       </div>
              //     </CardContent>

              //     <CardFooter
              //       className={`${activeRejectPanel === request.id && "bg-transparent"} flex md:border-0 md:rounded-none md:w-[30%] lg:w-[20%]`}
              //     >
              //       <div className="flex md:flex-col gap-2  w-full  h-full">
              //         <Button
              //           disabled={loading}
              //           variant="default"
              //           className="flex-1"
              //           onClick={() => handleRequestAcceptance(request.id)}
              //         >
              //           {loading ? (
              //             <LoaderCircle className="animate-spin" />
              //           ) : (
              //             "Accept"
              //           )}
              //         </Button>
              //         <Button
              //           variant="destructive"
              //           className="flex-1"
              //           onClick={() => {
              //             setRequestID(request.id);
              //             setActiveRejectPanel((prev) =>
              //               prev === request.id ? null : request.id,
              //             );
              //           }}
              //         >
              //           {loading ? (
              //             <LoaderCircle className="animate-spin" />
              //           ) : (
              //             "Reject"
              //           )}
              //         </Button>
              //       </div>
              //     </CardFooter>
              //   </div>

              //   {/* Reject Panel */}
              //   {activeRejectPanel === request.id && (
              //     <>
              //       {/* <Separator className=" md:hidden" /> */}
              //       <div className="space-y-5 w-full p-4">
              //         <div>
              //           <h4 className="font-medium">Reason for Rejection</h4>
              //           <p className="text-muted-foreground text-sm">
              //             Select one or more reasons.
              //           </p>
              //         </div>
              //         <div className="space-y-3">
              //           {reasons.map((reason) => (
              //             <div
              //               key={reason}
              //               className="flex items-center space-x-3"
              //             >
              //               <Checkbox id={reason} />
              //               <Label htmlFor={reason}>{reason}</Label>
              //             </div>
              //           ))}
              //         </div>
              //         <div className="space-y-2">
              //           <Label htmlFor="remarks">
              //             Additional Remarks (Optional)
              //           </Label>
              //           <Textarea
              //             id="remarks"
              //             placeholder="Enter additional remarks..."
              //           />
              //         </div>
              //         <div className="flex justify-around gap-2">
              //           <Button
              //             variant="outline"
              //             className="flex-1 h-fit p-2"
              //             onClick={() => setActiveRejectPanel(null)}
              //           >
              //             Cancel
              //           </Button>
              //           <Button
              //             variant="destructive"
              //             className="flex-1 h-fit p-2"
              //             onClick={() => {
              //               rejectionDialogRef.current?.showModal();
              //             }}
              //           >
              //             Continue
              //           </Button>
              //         </div>
              //       </div>
              //     </>
              //   )}
              // </Card>

              <IncomingRequestCard
                key={request.id}
                request={request}
                loading={loading}
                activeRejectPanel={activeRejectPanel}
                setActiveRejectPanel={setActiveRejectPanel}
                handleRequestAcceptance={handleRequestAcceptance}
                handleRequestRejection={handleRequestRejection}
                setRequestID={setRequestID}
              />
            );
          })}
      </div>

      {/* <RejectRequestDialog
        ref={rejectionDialogRef}
        onRejection={handleRequestRejection}
      /> */}
    </section>
  );
}

export default IncomingRequestTab;
