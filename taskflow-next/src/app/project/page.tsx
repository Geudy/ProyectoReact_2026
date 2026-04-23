import React from 'react';
import { Card } from '../../components/molecules/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Proyectos',
	description: 'Listado de proyectos en TaskFlow',
};

const mockProjects = [
	{ id: '1', name: 'TaskFlow UI', description: 'Frontend de la aplicación de gestión de tareas.', progress: 70 },
	{ id: '2', name: 'TaskFlow Backend', description: 'API y lógica de negocio para TaskFlow.', progress: 40 },
	{ id: '3', name: 'TaskFlow DevOps', description: 'Automatización y despliegue continuo.', progress: 20 },
];

export default function ProjectPage() {
	return (
		<main>
			<h2>Proyectos</h2>
			<div style={{ display: 'flex', gap: 16 }}>
				{mockProjects.map(p => (
					<Card key={p.id} title={p.name}>
						<p>{p.description}</p>
						<p>Progreso: {p.progress}%</p>
					</Card>
				))}
			</div>
		</main>
	);
}
