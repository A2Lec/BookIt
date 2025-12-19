import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create departments
  const deptTech = await prisma.department.create({
    data: { name: 'Technique', description: 'Équipe technique' },
  });

  const deptRH = await prisma.department.create({
    data: { name: 'Ressources Humaines', description: 'Équipe RH' },
  });

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@test.fr',
      password: await bcrypt.hash('admin123', 10),
      firstName: 'Admin',
      lastName: 'Test',
      role: 'ADMIN',
      departmentId: deptTech.id,
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@test.fr',
      password: await bcrypt.hash('manager123', 10),
      firstName: 'Manager',
      lastName: 'Test',
      role: 'MANAGER',
      departmentId: deptTech.id,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@test.fr',
      password: await bcrypt.hash('user123', 10),
      firstName: 'User',
      lastName: 'Test',
      role: 'USER',
      departmentId: deptRH.id,
    },
  });

  // Create resources
  const room1 = await prisma.resource.create({
    data: {
      name: 'Salle de réunion A',
      description: 'Grande salle avec table de 10 personnes',
      category: 'ROOM',
      capacity: 10,
      location: 'Étage 2',
      departmentId: deptTech.id,
      features: { projector: true, wifi: true, whiteboard: true },
    },
  });

  const room2 = await prisma.resource.create({
    data: {
      name: 'Salle de réunion B',
      description: 'Petite salle de réunion',
      category: 'ROOM',
      capacity: 4,
      location: 'Étage 1',
      features: { wifi: true },
    },
  });

  const vehicle = await prisma.resource.create({
    data: {
      name: 'Van de service',
      description: 'Transport pour déplacements',
      category: 'VEHICLE',
      capacity: 5,
      location: 'Parking',
      requiresApproval: true,
    },
  });

  const equipment = await prisma.resource.create({
    data: {
      name: 'Projecteur 4K',
      description: 'Projecteur haute résolution',
      category: 'EQUIPMENT',
      location: 'Réserve',
    },
  });

  // Create sample bookings
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(12, 0, 0, 0);

  await prisma.booking.create({
    data: {
      resourceId: room1.id,
      userId: manager.id,
      startTime: tomorrow,
      endTime: tomorrowEnd,
      title: 'Réunion d\'équipe',
      notes: 'Réunion de planification hebdomadaire',
      status: 'CONFIRMED',
    },
  });

  console.log('Seed completed!');
  console.log('Test accounts:');
  console.log(`  - admin@test.fr / admin123 (ADMIN)`);
  console.log(`  - manager@test.fr / manager123 (MANAGER)`);
  console.log(`  - user@test.fr / user123 (USER)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
