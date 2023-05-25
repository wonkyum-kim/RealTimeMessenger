import getUsers from '../actions/getUsers';
import Sidebar from '../components/sidebar/Sidebar';
import UserList from './components/UserList';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const otherUsers = await getUsers();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        <UserList otherUsers={otherUsers} />
        {children}
      </div>
    </Sidebar>
  );
}
