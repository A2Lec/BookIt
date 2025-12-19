// Mock data pour les tests sans backend
export const mockUsers = [
  { id: 'user1', email: 'admin@test.fr', firstName: 'Admin', lastName: 'Test', role: 'ADMIN', departmentId: 'dept1' },
  { id: 'user2', email: 'manager@test.fr', firstName: 'Manager', lastName: 'Test', role: 'MANAGER', departmentId: 'dept1' },
  { id: 'user3', email: 'user@test.fr', firstName: 'User', lastName: 'Test', role: 'USER', departmentId: 'dept2' },
];

export const mockDepartments = [
  { id: 'dept1', name: 'Technique', description: 'Équipe technique' },
  { id: 'dept2', name: 'RH', description: 'Ressources Humaines' },
];

export const mockResources = [
  {
    id: 'res1',
    name: 'Salle de réunion A',
    description: 'Grande salle avec table de 10 personnes',
    category: 'ROOM',
    capacity: 10,
    location: 'Étage 2',
    status: 'AVAILABLE',
    features: { projector: true, wifi: true, whiteboard: true },
    departmentId: 'dept1',
    requiresApproval: false,
  },
  {
    id: 'res2',
    name: 'Salle de réunion B',
    description: 'Petite salle',
    category: 'ROOM',
    capacity: 4,
    location: 'Étage 1',
    status: 'AVAILABLE',
    features: { wifi: true },
    departmentId: 'dept1',
  },
  {
    id: 'res3',
    name: 'Van de service',
    description: 'Transport',
    category: 'VEHICLE',
    capacity: 5,
    location: 'Parking',
    status: 'AVAILABLE',
    departmentId: 'dept1',
    requiresApproval: true,
  },
  {
    id: 'res4',
    name: 'Projecteur 4K',
    description: 'Haute résolution',
    category: 'EQUIPMENT',
    location: 'Réserve',
    status: 'AVAILABLE',
  },
];

export const mockBookings = [
  {
    id: 'book1',
    resourceId: 'res1',
    userId: 'user2',
    title: 'Réunion d\'équipe',
    description: 'Planification hebdomadaire',
    startTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(new Date().getTime() + 26 * 60 * 60 * 1000).toISOString(),
    status: 'CONFIRMED',
    isRecurring: false,
  },
  {
    id: 'book2',
    resourceId: 'res2',
    userId: 'user3',
    title: 'Entretien RH',
    startTime: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(new Date().getTime() + 49 * 60 * 60 * 1000).toISOString(),
    status: 'CONFIRMED',
    isRecurring: false,
  },
];

export const mockNotifications = [
  {
    id: 'notif1',
    userId: 'user3',
    type: 'booking_confirmed',
    message: 'Votre réservation a été confirmée',
    isRead: false,
    relatedBookingId: 'book2',
    createdAt: new Date().toISOString(),
  },
];
