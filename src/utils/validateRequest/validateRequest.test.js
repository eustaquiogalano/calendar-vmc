import { describe, it, expect, beforeEach } from "vitest";
import { validateRequest } from "./validateRequest";
import mockStudentDatabase from "@/mocks/students.mock";

const userRequests = mockStudentDatabase[0].requestedDocuments;

const request = {
  id: crypto.randomUUID(),
  document: "Diploma",
  purpose: "Job Application",
  date: "2026-01-01",
  status: "PENDING",
  type: "request",
};

describe("storage management", () => {
  it("Validate a request", () => {
    validateRequest(request, userRequests);
  });

  it("Validate a request that is new", () => {
    const newRequest = {
      ...request,
      document: "Enrollment Certificate",
    };

    expect(validateRequest(newRequest, userRequests)).toBe(true);
  });

  it("Validate a request that is already in the list", () => {
    const existingRequest = {
      ...request,
      document: "Diploma",
    };

    expect(validateRequest(existingRequest, userRequests)).toBe(false);
  });

  it("Validate a request that is already in the list, but rejected", () => {
    const existingRejectedRequest = {
      ...request,
    };

    const rejected = [
      ...userRequests,
      { document: "Diploma", status: "REJECTED" },
    ];
    console.log("here", rejected);

    expect(validateRequest(existingRejectedRequest, rejected)).toBe(true);
  });
});
