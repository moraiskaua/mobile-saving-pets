export const formatCPF = (cpf: string) => {
  return cpf
    .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto depois do terceiro dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto depois do sexto dígito
    .replace(/(\d{3})(\d{1,2})/, '$1-$2'); // Adiciona um hífen depois do nono dígito
};

export const formatPhone = (phone: string) => {
  return phone
    .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
    .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses em torno dos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona um hífen depois do quinto dígito
};
