
interface MainNavBarProps {
    children: React.ReactNode;
  }
  
const MainNavBar = ({ children }:MainNavBarProps) => {
    return (
      <div className="p-4">
        {children}
      </div>
    );
  };
  
  export default MainNavBar;