import { useEffect, useState } from "react";
import type {
  JobApplication,
  CreateJobApplication,
  Status,
} from "../types/JobApplication";
import JobApplicationCard from "../components/JobApplicationCard";
import JobApplicationForm from "../components/JobApplicationForm";
import jobApplicationService from "../services/JobApplicationService";
import Header from "../components/Header";

function HomePage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [sortBy, setSortBy] = useState<"newest" | "dateApplied">("newest");
  // Hent alle søknader når appen starter
  useEffect(() => {
    async function loadApplications() {
      try {
        const loadedApplications =
          await jobApplicationService.getAllApplications();

        setApplications(loadedApplications);
      } catch (error) {
        console.error("Kunne ikke hente jobbsøknader", error);
      }
    }

    loadApplications();
  }, []);

  // Legg til søknad
  async function addApplication(application: CreateJobApplication) {
    try {
      const savedApplication =
        await jobApplicationService.createApplication(application);

      setApplications((prev) => [...prev, savedApplication]);
    } catch (error) {
      console.error("Kunne ikke lagre jobbsøknad", error);
    }
  }

  const filteredApplications =
    statusFilter === "All"
      ? applications
      : applications.filter(
          (application) => application.status === statusFilter,
        );

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id;
    }

    if (!a.dateApplied) return 1;
    if (!b.dateApplied) return -1;

    return (
      new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* New application */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Ny jobbsøknad</h2>

          <p className="mt-1 mb-6 text-sm text-gray-500">
            Legg til en ny jobbsøknad i oversikten.
          </p>

          {/* Button to open modal */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            + Ny søknad
          </button>

          {/* Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Ny jobbsøknad</h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Legg til en ny jobbsøknad.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <JobApplicationForm
                  onSubmit={async (application) => {
                    await addApplication(application);
                    setIsFormOpen(false);
                  }}
                />
              </div>
            </div>
          )}

          {/* <JobApplicationForm
            onSubmit={addApplication}
          /> */}
        </section>

        {/* Applications */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Mine søknader</h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredApplications.length}{" "}
                {filteredApplications.length === 1 ? "søknad" : "søknader"}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <label
                htmlFor="status-filter"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Sorter på status
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as Status | "All")
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-2"
              >
                <option value="All">Alle statuser</option>
                <option value="Interested">Interessert</option>
                <option value="Applied">Søkt</option>
                <option value="Interview">Intervju</option>
                <option value="Offer">Tilbud</option>
                <option value="Rejected">Avslag</option>
                <option value="Withdrawn">Trukket</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApplications.map((application) => (
              <JobApplicationCard
                key={application.id}
                application={application}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
