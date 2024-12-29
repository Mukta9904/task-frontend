import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <h1 className="text-lg font-bold mb-4">Task Management</h1>
      <nav className="space-y-2">
        <Link href="/dashboard" className={`block py-2 px-4 hover:bg-gray-700 rounded-lg border-gray-300 ${pathname === '/dashboard' ? 'bg-gray-700' : ''}`}>Dashboard</Link>
        <Link href="/tasks" className={`block py-2 px-4 hover:bg-gray-700 rounded-lg border-gray-300 ${pathname === '/tasks' ? 'bg-gray-700' : ''}`}>Task List</Link>
      
      </nav>
    </aside>
  );
};

export default Sidebar;
