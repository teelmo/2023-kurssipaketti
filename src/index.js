import React from 'react';

import { createRoot } from 'react-dom/client';

import Course01 from './jsx/Course01.jsx';

import Course02 from './jsx/Course02.jsx';

const containerCourse01 = document.getElementById('app-root-2023-kurssipaketti-course01');
if (containerCourse01) {
  const rootCourse01 = createRoot(containerCourse01);
  rootCourse01.render(<Course01 />);
}

const containerCourse02 = document.getElementById('app-root-2023-kurssipaketti-course02');
if (containerCourse02) {
  const rootCourse02 = createRoot(containerCourse02);
  rootCourse02.render(<Course02 />);
}
