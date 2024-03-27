

/**
 * To Use this validators use
 * yup.mixed().test('error_name', 'message', validation_function)
 */
export const isImage = (file:any) => {
  if(!file) return true;
  return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
}

export const isSizeLessThanXMB = (file:any, megabyte:number) => {
  if(!file) return true;
  const mb = megabyte * 1000000;
  return file.size < mb;
}

export const isDigit = (value:any) => {
  return /^[0-9]+$/.test(value);
}

export const isIncludeInArray = (value:any[] | undefined, array:any[]) => {
  if(!value) return true;
  if(value.length === 0) return true;

  const validElements = array.map((data)=>data.key);
  return value.every(element=> validElements.includes(element));  
}

export const isIncludeInKey = (value:any, array:any[]) => {
  const validElements = array.map((data)=>data.key);
  return validElements.includes(value);
}

export const maxLength=(value:string | null | undefined, max:number )=>{
  if(!value) return true;
  return value.length <= max;
}

export const minLength=(value:string | null | undefined, min:number )=>{
  if(!value) return true;
  return value.length >= min;
}

export const isNotEmptyString = (value:string) => {
    return value.trim().length !== 0;
}

export const isValidEmail = (value:string) => {
    if(!value) return true;

    const splitEmail = value.split('.');
    const domain = splitEmail.at(-1) ?? null;

    //Haven't domain
    if(!domain) return false;
    //Domain have only characters
    if(!domain.match(/^[A-Za-z]+$/))return false;
    //Isn't domain between 2 and 3 characters
    if(!(domain.length >= 2 && domain.length <= 3)) return false;
    //Check if email don't have
    if(!value.includes('@')) return false;
    if(!value.includes('.')) return false;
    return true;
}