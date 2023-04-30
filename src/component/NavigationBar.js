import { Link } from 'react-router-dom';

import '../style.css';

function NavigationBar({ pageName }) {
  function getItemCount(){
    const items = localStorage.getItem("items")
    const parsedItem = JSON.parse(items);
    if ( items === null ){
        return 0
    } else {
        return parsedItem.length;
    }
  }
  return (
    <>
      <header className='navbar'>
          <div className='navbar__title navbar__item'>{pageName}</div>
          <Link to="/" className='navbar__item'>Create Item</Link>
          <Link to="/list_page" className='navbar__item'>View Item<span id="itemCount" style={{color: "red"}}> ({getItemCount()})</span></Link>
      </header>
      <div style={{marginBottom: 60}}/>
    </>
  );
}

export default NavigationBar;
