export function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

export function maskCNPJ(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
    .slice(0, 18);
}

export function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

export function maskCEP(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{1,3})$/, "$1-$2")
    .slice(0, 9);
}

export function maskAgency(value: string) {
  return value
    .replace(/\D/g, "")   
    .slice(0, 4);        
}

export function maskBankAccount(value: string) {
  return value
    .replace(/\D/g, "")                       
    .replace(/(\d{6})(\d)/, "$1-$2")         
    .slice(0, 8);                            
}

export function maskNumber(value: string) {
  return value
    .replace(/\D/g, "");                   
}
