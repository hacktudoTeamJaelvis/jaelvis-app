var d1 = new Date ();
var d2 = new Date ( d1 );
const HALF_AN_HOUR_AGO = d2.setMinutes ( d1.getMinutes() - 30 );

export default [
  {
    id: '01',
    description: 'Leite',
    missing_since: null,
    good_until: new Date('2018-11-11'),
    image_url: null,
  },
  {
    id: '02',
    description: 'Pão de forma',
    missing_since: null,
    good_until: new Date('2018-11-11'),
    image_url: null,
  },
  {
    id: '03',
    description: 'Maneteiga',
    missing_since: new Date(),
    good_until: new Date('2018-11-11'),
    image_url: null,
  },
  {
    id: '04',
    description: 'Queijo',
    missing_since: HALF_AN_HOUR_AGO,
    good_until: new Date('2018-11-11'),
    image_url: null,
  },
  {
    id: '05',
    description: null,
    missing_since: null,
    good_until: null,
    image_url: null,
  },
]