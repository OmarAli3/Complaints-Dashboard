import { useEffect, useState } from "react";
import { ComplaintModel } from "../models/ComplaintModel";
import ComplaintService from "../services/ComplaintService";

export const useComplaints = () => {
  const [complaints, setComplaints] = useState<ComplaintModel[]>([]);

  useEffect(() => {
    ComplaintService.getComplaints().then((data) => setComplaints(data));
  }, []);

  return complaints;
};
