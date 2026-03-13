import { z } from "zod";

export const surveySchema = z.object({
  // Ship Particulars
  name: z.string().min(1, "Nom du navire requis"),
  imo: z.string().min(1, "IMO requis").regex(/^\d{7}$/, "IMO doit faire 7 chiffres"),
  callSign: z.string().optional(),
  owner: z.string().min(1, "Owner requis"),
  charterer: z.string().optional(),
  master: z.string().optional(),
  chiefEngineer: z.string().optional(),
  
  // Survey Details
  date: z.string().optional(),
  time: z.string().optional(),
  type: z.enum(["ONHIRE SURVEY", "OFFHIRE SURVEY", "BUNKERING REPORT"]),
  status: z.enum(["Draft", "Completed", "Pending"]).default("Draft"),
  placeOfSurvey: z.string().optional(),
  placeOfDelivery: z.string().optional(),
  draftFwd: z.coerce.number().optional(),
  draftAft: z.coerce.number().optional(),
  voy: z.string().optional(),
  list: z.coerce.number().optional(),
  erTemp: z.coerce.number().optional(),
  thermometer: z.string().optional(),
  
  // Certificates
  portOfRegistry: z.string().optional(),
  grossTons: z.coerce.number().optional(),
  netTons: z.coerce.number().optional(),
  placeOfRedelivery: z.string().optional(),
  redeliveryDate: z.string().optional(),
  
  // Fuel Data (from FuelCalculator)
  fuelEntries: z.array(z.object({})).optional(),
  finalHFO: z.coerce.number().optional(),
  finalMGO: z.coerce.number().optional(),
  
  // Metadata
  userId: z.string(),
  createdAt: z.string().optional()
});

export type SurveyType = z.infer<typeof surveySchema>;

