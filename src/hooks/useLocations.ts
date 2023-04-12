import { useEffect, useState } from "react";
import { CityModel } from "../models/CityModel";
import { GovernorateModel } from "../models/GovernorateModel";
import CitiesService from "../services/CitiesService";
import GovernoratesService from "../services/GovernoratesService";

export const useLocations = () => {
  const [governorates, setGovernorates] = useState<GovernorateModel[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);

  useEffect(() => {
    GovernoratesService.getGovernorates().then((data) => setGovernorates(data));
  }, []);

  useEffect(() => {
    setGovernorateCities();
  }, []);

  const setGovernorateCities = (governorateId?: string) => {
    CitiesService.getCities(governorateId).then((data) => setCities(data));
  };

  return { governorates, cities, setGovernorateCities };
};
