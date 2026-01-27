export type Category = {
  name: 'Sunmica' | 'Panels';
  subcategories: string[];
};

export const categories: Category[] = [
  {
    name: 'Sunmica',
    subcategories: [
      '1mm – Kridha',
      '0.8mm – Rockstar',
      'Doorskin – Rockstar',
      '1.3mm – Thermoluxe',
      'Pastels – Trustlam',
    ],
  },
  {
    name: 'Panels',
    subcategories: ['Louvers', 'Sheets', 'Iris Curve'],
  },
];
