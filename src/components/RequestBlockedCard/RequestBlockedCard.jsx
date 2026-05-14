import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { IoWarningOutline } from "react-icons/io5";

function RequestBlockedCard({ setIsActive, twclass }) {
  return (
    <Card className={twclass}>
      <CardHeader className="flex items-center gap-2 border-b-1 pb-4">
        <IoWarningOutline size={30} className="text-yellow-500" />
        <h2>Request Blocked</h2>
      </CardHeader>
      <CardContent className="p-4">
        <p>
          The document you are trying to request is already in the Request List.
          Please wait for the current request to be processed before making a
          new request for the same document.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="h-fit w-full p-2" onClick={() => setIsActive(false)}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RequestBlockedCard;
