import { planConfig } from "./plans";


export const paymentConfig = planConfig.mode === "payment" ? planConfig : null;