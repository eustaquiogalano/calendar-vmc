import { DocumentRequest, NewDocumentRequest } from "@/types/documentRequest";

export function validateRequest(
  request: NewDocumentRequest,
  userRequests: DocumentRequest[],
): boolean {
  const matchingRequest = userRequests.find((requestItem) => {
    return request.document === requestItem.document;
  });

  // request is new and valid
  if (!matchingRequest) {
    console.log("no matching document found, adding to list");
    return true;
  }

  // request is already in the list but was rejected or completed, so it can be added again
  if (
    matchingRequest &&
    (matchingRequest.status === "REJECTED" ||
      matchingRequest.status === "COMPLETED")
  ) {
    console.log("found rejected or completed document, adding to list");
    return true;
  }

  console.log("here", matchingRequest);

  // if the request has a match found and is not rejected, it is invalid and cannot be added to the list
  console.log(`currently ${matchingRequest.status}, not added to list`);
  return false;
}
