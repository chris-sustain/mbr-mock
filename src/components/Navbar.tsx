import { NavLink } from 'react-router';

export default function () {
  return (
    <nav>
      <NavLink to="/counter">counter</NavLink>
      <NavLink to="/">search</NavLink>
      <NavLink to="/edit">edit</NavLink>
    </nav>
  );
}