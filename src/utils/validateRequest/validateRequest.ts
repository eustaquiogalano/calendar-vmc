interface DocumentRequest {
  id: string;
  document: string;
  purpose: string;
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export function validateRequest(
  request: DocumentRequest,
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

  // request is already in the list but was rejected, so it can be added again
  if (matchingRequest && matchingRequest.status === "REJECTED") {
    console.log("found rejected document, adding to list");
    return true;
  }

  console.log("here", matchingRequest);

  // if the request has a match found and is not rejected, it is invalid and cannot be added to the list
  console.log(`currently ${matchingRequest.status}, not added to list`);
  return false;
}
