import type { JobApplication } from "../types/JobApplication";
import StatusBadge from "./StatusBadge";

type DetailedApplicationCardProps = {
  application: JobApplication;
};

function DetailedApplicationCard({
  application,
}: DetailedApplicationCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Company and position */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {application.company}
          </h1>

          <p className="mt-2 text-lg text-gray-600">{application.position}</p>
        </div>

        {/* Status */}
        <StatusBadge status={application.status} />
      </div>

      {/* Application information */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {/* Location */}
        <div>
          <p className="text-sm font-medium text-gray-500">Sted</p>

          <p className="mt-1">{application.location || "Ikke oppgitt"}</p>
        </div>

        {/* Date */}
        <div>
          <p className="text-sm font-medium text-gray-500">Søknadsdato</p>

          <p className="mt-1">
            {application.dateApplied
              ? new Date(application.dateApplied).toLocaleDateString("nb-NO")
              : "Ikke oppgitt"}
          </p>
        </div>

        {/* Deadline date */}
        <div>
          <p className="text-sm font-medium text-gray-500">Søknadsfrist</p>

          <p className="mt-1">
            {application.deadline
              ? new Date(application.deadline).toLocaleDateString("nb-NO")
              : "Ikke oppgitt"}
          </p>
        </div>

        {/* URL to ad */}

        <div>
          <p className="text-sm font-medium text-gray-500">Jobbannonse</p>
          {application.jobUrl ? (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-blue-600 hover:text-blue-700"
            >
              Åpne jobbannonse →
            </a>
          ) : (
            <p className="mt-1 text-gray-400">Ingen link lagt til</p>
          )}
        </div>
      </div>

      {/* Notes */}
      {application.notes && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm font-medium text-gray-500">Notater</p>

          <p className="mt-2 whitespace-pre-wrap text-gray-700">
            {application.notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default DetailedApplicationCard;
