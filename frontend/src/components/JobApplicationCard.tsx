import { Link } from "react-router-dom";
import type { JobApplication } from "../types/JobApplication";
import StatusBadge from "./StatusBadge";

type JobApplicationCardProps = {
  application: JobApplication;
};

function JobApplicationCard({ application }: JobApplicationCardProps) {
  return (
    <Link
      to={`/applications/${application.id}`}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {application.company}
          </h3>

          <p className="mt-1 text-gray-600">{application.position}</p>
        </div>

        <StatusBadge status={application.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
        {application.location && <span>📍 {application.location}</span>}

        <span>
          Søkt:{" "}
          {application.dateApplied
            ? new Date(application.dateApplied).toLocaleDateString("nb-NO")
            : "Ikke oppgitt"}
        </span>
      </div>
    </Link>
  );
}

export default JobApplicationCard;
