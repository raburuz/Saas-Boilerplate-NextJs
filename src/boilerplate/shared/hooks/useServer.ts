"use client"

/* REACT */
import { useTransition } from "react";



/* HOOK */
export const useServer = () => {

  const [ isPending, startTransition ] = useTransition();
  
  const executeAsync = <T>( 
      promise : Promise<{ ok: boolean; message: string } & T>, 
      msg?: {
        success?: ( result: { message: string } & T ) => void,
        error?: ( error: string ) => void,
      }
    ) => {

    startTransition( async () => { 

        const response = await promise;

        const ok = response.ok;
        const message = response.message;

        //Error
        if(!ok && msg?.error) return msg.error(message);  
        
        //Success
        if(msg?.success) return msg.success(response);

    })
      
  }

  return {
    isPending,
    executeAsync,
  }
  
}
