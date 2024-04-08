export const useEditModalController = () => {
  const options = [
    { value: 'ABANDONO', label: 'Abandono' },
    { value: 'AGRESSAO', label: 'Agressão' },
    { value: 'NEGLIGENCIA', label: 'Negligência' },
    { value: 'EXPLORACAO', label: 'Exploração' },
    { value: 'OUTROS', label: 'Outros' },
  ];

  return { options };
};
