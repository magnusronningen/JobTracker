import { useState } from "react";
import type {
  CreateJobApplication,
  JobApplication,
} from "../types/JobApplication";
import type { Status } from "../types/JobApplication";

type JobApplicationFormProps = {
  initialApplication?: JobApplication;
  onSubmit: (application: CreateJobApplication) => void;
};

function JobApplicationForm({
  onSubmit,
  initialApplication,
}: JobApplicationFormProps) {
  const [company, setCompany] = useState(initialApplication?.company ?? "");

  const [position, setPosition] = useState(initialApplication?.position ?? "");

  const [location, setLocation] = useState(initialApplication?.location ?? "");

  const [jobUrl, setJobUrl] = useState(initialApplication?.jobUrl ?? "");

  const [dateApplied, setDateApplied] = useState(
    initialApplication?.dateApplied?.split("T")[0] ?? "",
  );

  const [deadline, setDeadline] = useState(
    initialApplication?.deadline?.split("T")[0] ?? "",
  );

  const [status, setStatus] = useState<Status>(
    initialApplication?.status ?? "Interested",
  );

  const [notes, setNotes] = useState(initialApplication?.notes ?? "");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const application: CreateJobApplication = {
      company,
      position: position || null,
      location: location || null,
      jobUrl: jobUrl || null,
      dateApplied: dateApplied || null,
      deadline: deadline || null,
      status,
      notes: notes || null,
    };

    onSubmit(application);

    if (!initialApplication) {
      setCompany("");
      setPosition("");
      setLocation("");
      setJobUrl("");
      setDateApplied("");
      setDeadline("");
      setStatus("Interested");
      setNotes("");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Bedrift</label>

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="F.eks. Sopra Steria"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Stilling</label>

          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="F.eks. Frontend-utvikler"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Sted</label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="F.eks. Oslo"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Jobbannonse</label>

          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Søknadsdato</label>

          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Søknadsfrist</label>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className={inputClass}
          >
            <option value="Interested">Interessert</option>
            <option value="Applied">Søkt</option>
            <option value="Interview">Intervju</option>
            <option value="Offer">Tilbud</option>
            <option value="Rejected">Avslag</option>
            <option value="Withdrawn">Trukket</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Notater</label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Skriv eventuelle notater..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          {initialApplication ? "Lagre endringer" : "Legg til søknad"}
        </button>
      </div>
    </form>
  );
}

export default JobApplicationForm;
