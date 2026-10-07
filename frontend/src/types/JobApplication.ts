export type JobApplication = {
  id: number;
  company: string;
  position: string | null;
  location: string | null;
  jobUrl: string | null;
  dateApplied: string | null;
  deadline: string | null;
  status: Status;
  notes: string | null;
};

export type CreateJobApplication = {
  company: string;
  position: string | null;
  location: string | null;
  jobUrl: string | null;
  dateApplied: string | null;
  deadline: string | null;
  status: Status;
  notes: string | null;
};

export type Status =
  | "Interested"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";
