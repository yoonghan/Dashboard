import *as React from 'react';
import { storiesOf } from '@storybook/react';
import SortableTable from '../src/components/SortableTable';

const data = [
  {id:0, name:'Cupcake', calories: 1000, fat: 3.7, carbs: 67, protein: 4.3},
  {id:1, name:'Donut', calories: 14, fat: 3.7, carbs: 67, protein: 4.3},
  {id:2, name:'Eclair', calories: 12, fat: 3.7, carbs: 67, protein: 4.3},
  {id:3, name:'Frozen yoghurt', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {id:4, name:'Gingerbread', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {id:5, name:'Honeycomb', calories: 9, fat: 3.7, carbs: 67, protein: 4.3},
  {id:6, name:'Ice cream sandwich', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {id:7, name:'Jelly Bean', calories: 11, fat: 3.7, carbs: 67, protein: 4.3},
  {id:8, name:'KitKat', calories: 391, fat: 3.7, carbs: 6, protein: 4.3},
  {id:9, name:'Lollipop', calories: 10, fat: 3.7, carbs: 67, protein: 4.3},
  {id:10, name:'Marshmallow', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {id:11, name:'Nougat', calories: 17, fat: 3.7, carbs: 67, protein: 4.3},
  {id:12, name:'Oreo', calories: 29, fat: 3.7, carbs: 67, protein: 4.3}
];
const header = [
  { uniqueDataKey: 'name', numeric: false, label: 'Dessert (100g serving)' },
  { uniqueDataKey: 'calories', numeric: true, label: 'Calories' },
  { uniqueDataKey: 'fat', numeric: true, label: 'Fat (g)' },
  { uniqueDataKey: 'carbs', numeric: true, label: 'Carbs (g)' },
  { uniqueDataKey: 'protein', numeric: true, label: 'Protein (g)' },
]

storiesOf('Tables', module)
  .add('Sortable Table w/ Pagination', () => (
    <SortableTable data={data} header={header} defaultRowsPerPage={5} withPagination={true}/>
  ))
  .add('Sortable Table', () => (
    <SortableTable data={data} header={header} withPagination={false}/>
  ));
