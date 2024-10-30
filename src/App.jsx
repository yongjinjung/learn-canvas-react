import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <ul>
        <li>LinHome</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <Outlet />
    </>
  );
}
