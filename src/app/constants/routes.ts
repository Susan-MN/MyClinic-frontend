/**
 * Centralized application route path constants to ensure a single source of truth
 * for navigation and guard configuration throughout the app.
 */
export const RoutePaths = {
  Root: '',
  ChooseRole: 'choose-role',
  UserDashboard: 'user-dashboard',
  DoctorDashboard: 'doctor-dashboard',
  AdminDashboard: 'admin-dashboard',
} as const;

export type AppRoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];
