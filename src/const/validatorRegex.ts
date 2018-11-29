export const IP_VALIDATION_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

export function isIPAddressValid(ipAddress:string):boolean {
  return !IP_VALIDATION_REGEX.test(ipAddress.replace(/\s/g, ''));
}
