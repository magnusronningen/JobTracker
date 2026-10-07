import type { Status } from "../types/JobApplication";

type StatusBadgeProps = {
  status: Status;
};

function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles: Record<Status, string> = {
    Interested: "bg-gray-100 text-gray-700",
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Withdrawn: "bg-gray-100 text-gray-500",
  };

  const statusLabels: Record<Status, string> = {
    Interested: "Interessert",
    Applied: "Søkt",
    Interview: "Intervju",
    Offer: "Tilbud",
    Rejected: "Avslag",
    Withdrawn: "Trukket",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export default StatusBadge;
