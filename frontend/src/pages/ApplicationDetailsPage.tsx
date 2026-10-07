import { Link, useNavigate, useParams } from "react-router-dom";
import JobApplicationService from "../services/JobApplicationService";
import type {
  CreateJobApplication,
  JobApplication,
} from "../types/JobApplication";
import { useEffect, useState } from "react";
import JobApplicationForm from "../components/JobApplicationForm";
import DetailedApplicationCard from "../components/DetailedApplicationCard";

function ApplicationDetailsPage() {
  const { id } = useParams();
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadApplication() {
      if (!id) return;

      try {
        const loadedApplication =
          await JobApplicationService.getApplicationById(Number(id));
        setApplication(loadedApplication);
      } catch (error) {
        console.error("Kunne ikke hente jobsøknad", error);
      }
    }

    loadApplication();
  }, [id]);

  async function handleUpdate(updatedApplication: CreateJobApplication) {
    if (!application) return;

    try {
      await JobApplicationService.updateApplication({
        ...updatedApplication,
        id: application.id,
      });

      const updated = await JobApplicationService.getApplicationById(
        application.id,
      );

      setApplication(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Kunne ikke oppdatere jobbsøknad", error);
    }
  }

  async function handleDelete() {
    if (!application) return;

    const confirmed = window.confirm(
      "Er du sikker på at du vil slette søknad?",
    );

    if (!confirmed) return;

    try {
      await JobApplicationService.deleteApplication(application.id);
      navigate("/");
    } catch (error) {
      console.error("Kunne ikke slette søknad", error);
    }
  }

  // TODO: håndter feil ved innlasting av søknad
  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 p-10">
        <p className="text-gray-500">Laster søknad...</p>
      </div>
    );
  }

  return (
    // Header with link back to homescreen
    <div className="min-h-screen text-gray-900 bg-gray-100">
      <header className="border-b border-blue-200 bg-[rgb(17,23,41)]">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/20"
          >
            Tilbake til søknader
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <DetailedApplicationCard application={application} />

        <div className="rounded-2xl shadow-sm p-4 bg-white my-4 flex justify-end gap-3 border border-gray-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white"
          >
            {isEditing ? "Avbryt redigering" : "Rediger søknad"}
          </button>

          {/* TODO: Lag funksjon for sletting av søknad */}
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white"
          >
            Slett søknad
          </button>
        </div>

        {isEditing && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Rediger søknad</h2>
            <JobApplicationForm
              initialApplication={application}
              onSubmit={handleUpdate}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default ApplicationDetailsPage;
