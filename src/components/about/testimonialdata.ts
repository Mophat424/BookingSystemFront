// src/components/about/testimonialdata.ts
import placeholder1 from '../../assets/images/event (1).jpg'; // Temporary placeholder
import placeholder2 from '../../assets/images/concert (1).jpg'; // Temporary placeholder

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
};

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Event Attendee',
    image: placeholder1,
    content: 'EventMaster made booking my concert tickets so easy and quick!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Event Organizer',
    image: placeholder2,
    content: 'Managing events with EventMaster has saved me hours of work.',
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Concert Goer',
    image: placeholder1,
    content: 'The dashboard is amazing for tracking my event schedules.',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Festival Planner',
    image: placeholder2,
    content: 'Highly recommend for organizing large-scale events!',
  },
  {
    id: 5,
    name: 'David Wilson',
    role: 'Attendee',
    image: placeholder1,
    content: 'The user experience is top-notch and very intuitive.',
  },
  {
    id: 6,
    name: 'Sophia Lee',
    role: 'Event Coordinator',
    image: placeholder2,
    content: 'EventMaster keeps my team aligned and on schedule.',
  },
];