import { DocumentRequest } from "@/types/documentRequest";
import { Check, X } from "lucide-react";

interface StatusStepperProps {
  request: DocumentRequest;
}

const normalSteps = [
  { key: "PENDING", label: "Pending", description: "Request submitted" },
  {
    key: "ACCEPTED_PROCESSING",
    label: "Accepted",
    description: "Being processed",
  },
  {
    key: "READY_FOR_PICKUP",
    label: "Ready for pickup",
    description: "Document is ready",
  },
  { key: "COMPLETED", label: "Completed", description: "Document received" },
];

const rejectedSteps = [
  { key: "PENDING", label: "Pending", description: "Request submitted" },
  {
    key: "ACCEPTED_PROCESSING",
    label: "Accepted",
    description: "Being processed",
  },
  { key: "REJECTED", label: "Rejected", description: null },
];

const statusOrder = [
  "PENDING",
  "ACCEPTED_PROCESSING",
  "READY_FOR_PICKUP",
  "COMPLETED",
];

export function StatusStepper({ request }: StatusStepperProps) {
  const isRejected = request.status === "REJECTED";
  const steps = isRejected ? rejectedSteps : normalSteps;
  const currentIndex = statusOrder.indexOf(request.status);

  return (
    <div className="flex flex-col bg-secondary p-4 rounded-2xl border">
      {steps.map((step, index) => {
        // if this is true check
        // the cirle of the current step
        const isCompleted = isRejected
          ? ["PENDING", "ACCEPTED_PROCESSING"].includes(step.key)
          : statusOrder.indexOf(step.key) <= currentIndex;

        const isCurrent = step.key === request.status;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.key} className="flex gap-3 items-start ">
            {/* icon and line connector */}
            <div className="flex flex-col items-center">
              {/* Circle with check */}
              <div
                className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center
                  ${
                    isCompleted
                      ? "bg-blue-600"
                      : isCurrent && isRejected
                        ? "bg-red-100 border-2 border-red-500"
                        : "bg-white border-2 border-gray-300"
                  }`}
              >
                {isCompleted && <Check size={12} className="text-white" />}
                {isCurrent && isRejected && (
                  <X size={12} className="text-red-500" />
                )}
              </div>

              {/* line connector */}
              {!isLast && (
                <div
                  className={`w-0.5 h-10 ${isCompleted ? "bg-blue-600" : "bg-gray-200"}`}
                />
              )}
            </div>

            {/* status and description */}
            <div className={`pt-0.5 ${isLast ? "pb-0" : "pb-3"}`}>
              <p
                className={`text-sm font-medium mb-0.5
                  ${
                    isCurrent && isRejected
                      ? "text-red-500"
                      : isCompleted || isCurrent
                        ? "text-gray-900"
                        : "text-gray-400"
                  }`}
              >
                {step.label}
              </p>

              {step.description && (
                <p className="text-xs text-gray-500 m-0">{step.description}</p>
              )}

              {isCurrent &&
                isRejected &&
                request.remarks &&
                request.remarks.length > 0 && (
                  <ul className="mt-1 pl-3.5 list-disc">
                    {request.remarks.map((reason, i) => (
                      <li key={i} className="text-xs text-red-500 mb-0.5">
                        {reason}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
