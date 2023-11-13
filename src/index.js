import React from 'react';

import { createRoot } from 'react-dom/client';

import Course01 from './jsx/Course01.jsx';

const container = document.getElementById('app-root-2023-kurssipaketti-course01');
const root = createRoot(container);
root.render(<Course01 />);
