import './Header.css';

const Header = ({username})=>{

    return(
        <>
        <h2>Hi, {username}</h2>
        <button>toggle</button>
        </>
      
    )

}
export default Header