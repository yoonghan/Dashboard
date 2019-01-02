/**
 * Add padding to reformat values.
 **/
export function padder(value:string|number, padWith:string, inLength:number) {
  let str = `${value}`;
  while (str.length < inLength) {
      str = padWith + str;
  }
  return str;
}
