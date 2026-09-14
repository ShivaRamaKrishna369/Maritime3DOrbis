# Maritime3DOrbis

## 3D Maritime Industrial Equipment Inspection Dashboard

Maritime3DOrbis is a web-based 3D industrial equipment inspection dashboard designed to visualize and inspect maritime machinery components through an interactive 3D interface.

The project provides a digital control-room-style interface where users can select equipment components, inspect engineering information, and interact with a 3D model.

## Features

- Interactive 3D equipment visualization
- GLB/GLTF model rendering using Three.js
- Industrial maritime dashboard interface
- Component list with multiple equipment parts
- Component selection and identification
- Selected component highlighting
- Camera focus on selected components
- Camera reset functionality
- Zoom and rotate controls
- Engineering information panel
- Equipment status display
- Dark industrial control-room design
- Responsive dashboard layout

## Technologies Used

- HTML
- CSS
- JavaScript
- Three.js
- Vite
- GLTFLoader
- OrbitControls
- GitHub
- Vercel

## Project Structure

```text
Maritime3DOrbis-Web/
│
├── public/
│   └── models/
│       └── pump.glb
│
├── src/
│   ├── main.js
│   └── style.css
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/ShivaRamaKrishna369/Maritime3DOrbis.git
```

Open the project folder:

```bash
cd Maritime3DOrbis
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## How It Works

1. The 3D pump model is loaded from the public models directory.
2. The dashboard displays available equipment components.
3. Clicking a component selects it.
4. The selected component is highlighted in the 3D model.
5. The camera automatically focuses on the selected component.
6. Engineering data and equipment status are displayed in the information panel.
7. Users can rotate, zoom, and inspect the model interactively.

## Purpose

The purpose of Maritime3DOrbis is to demonstrate how 3D visualization can support:

- Maritime equipment inspection
- Industrial machinery understanding
- Digital twin concepts
- Component identification
- Engineering education
- Maintenance and monitoring interfaces

## Future Improvements

- Real-time sensor data integration
- Live pressure, temperature, flow, and vibration monitoring
- Equipment fault detection
- Maintenance history
- Component replacement tracking
- User authentication
- Database integration
- Multiple 3D equipment models
- Digital twin analytics
- AI-assisted fault diagnosis

## Author

**ShivaRamaKrishna369**

## License

This project is intended for educational, demonstration, and development purposes.
