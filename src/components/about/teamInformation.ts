import { Member } from '../../utils/interface';

const membersInfo: Member[] = [
  {
    name: 'Marina Golubeva',
    country: 'Russia',
    role: 'Mentor',
    bio: 'Was born in 1978 in Uzbekistan. In 2000 graduated from the Mathematical Faculty of Volgograd State Pedagogical University with a red diploma. In 2022,  graduated from the RS school courses, after which went there as a mentor.',
    id: 'marina',
    github: 'https://github.com/golubeva-webmaster',
    contribution: [
      'Sensitive management',
      'Guidance on the Right Path (constructive criticism)',
      'Strengthening the morale of the team',
    ],
  },
  {
    name: 'Viktoriya Kryuchkova',
    country: 'Russia',
    role: 'Team Lead',
    bio: "Was born in 1994 in the small town Shakhty in the south of Russia. In 2024, completed a master's degree at Moscow City Pedagogical University with a focus on the German language. Worked in the field of logistics but realized that it wasn't the right fit. In 2022, decided to make a radical change in career path and started studying frontend development at RS School.",
    id: 'victoriya',
    github: 'https://github.com/Vikki100621',
    contribution: ['Application design', 'Routing', 'Product filter and Basket'],
  },
  {
    name: 'Alexey Gorbenko',
    country: 'Russia',
    role: 'JS developer',
    bio: 'Was born in 1981 in Rostov-on-Don, Russia. Started getting interested in programming in 2019, studying at Rostov-on-Don College of Radioelectronics, Information and Industrial Technologies as a software technician. In 2022 I learnt about RS School and started studying there.',
    id: 'alexei',
    github: 'https://github.com/a-v-gor',
    contribution: ['Configuring Webpack', 'User registration', 'Slider and pagination'],
  },
  {
    name: 'Valery Matskevich',
    country: 'Belarus',
    role: 'JS developer',
    bio: 'Was born in 1993 in Minsk, Belarus. In 2015 was graduated from the Academy of Public Administration under the Aegis of the President of the Republic of Belarus with a degree in law. In 2021 interested in the IT field and graduated from the tester courses, but in 2022 learned about the RS school and decided to try myself as a JS developer.',
    id: 'valery',
    github: 'https://github.com/ValeryMatskevich',
    contribution: ['Login and user page', 'Changing user data', 'Creating an About Us page'],
  },
];

export default membersInfo;
