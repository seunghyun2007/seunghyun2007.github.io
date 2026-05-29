import type { Project } from './types'

export const PROJECTS: Project[] = [
  {
    id: 'esp32-rc-plane',
    title: 'ESP32 RC Plane',
    summary:
      'My first big hands-on electronics and programming project. I built a remote-controlled plane using an ESP32 microcontroller, learning about aerodynamics, control systems, and wireless communication along the way.',
    stack: ['ESP32', 'C++', 'CAD', 'Embedded Systems'],
    image: '/assets/planeNcar.jpeg',
    notionUrl:
      'https://messy-lancer-b5f.notion.site/ESP32-RC-Plane-2be819f52866804ba86efb5c2db0bcef?pvs=74',
    featured: true,
    tags: ['hardware', 'electronics'],
  },
  {
    id: 'ap-physics-notes',
    title: 'AP Physics I & II Notes',
    summary:
      'I self-studied AP Physics I & II in 4 weeks, creating notes and experiments to understand key concepts in mechanics, electricity, magnetism, and waves.',
    stack: ['GoodNotes', 'Self-study', 'Physics'],
    image: '/assets/physics1physics2.png',
    externalUrl: 'https://web.goodnotes.com/s/ER3lSUV0MHVgxGXeP7gFpC',
    externalLabel: 'View notes on GoodNotes',
    tags: ['academic', 'physics'],
  },
  {
    id: 'arduino-projects',
    title: 'Arduino Projects',
    summary:
      'I followed several Arduino tutorials to understand microcontrollers, sensors, and actuators. This helped me prepare for my main ESP32 project.',
    stack: ['Arduino', 'C++', 'Sensors'],
    image: '/assets/arduinopic.jpeg',
    notionUrl:
      'https://messy-lancer-b5f.notion.site/Arduino-Projects-2be819f5286680098e21eae9f1025d8d?pvs=73',
    tags: ['hardware', 'electronics'],
  },
  {
    id: 'coming-soon',
    title: 'More coming soon...',
    summary: 'I will continue adding more projects over time.',
    stack: [],
    image: '/assets/face2.jpeg',
    tags: [],
    comingSoon: true,
  },
]

export const FEATURED_PROJECT = PROJECTS.find((p) => p.featured)
