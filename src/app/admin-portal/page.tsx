import { Metadata } from 'next';
import AdminLoginPage from '@/app/admin/login/page';

export const metadata: Metadata = {
  title: 'Admin Portal | Kavini Dhyasree',
  description: 'Secure administrative management portal.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPortalPage() {
  return <AdminLoginPage />;
}
